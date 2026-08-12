#!/usr/bin/env python3
"""
_comun.py — lo que comparten heygen.py, grok.py y elevenlabs.py.

Los tres son clientes HTTP de una API de pago, con la misma forma: leer la clave
del .env, llamar, sondear un render y bajarse un archivo. Antes cada uno tenia su
propia copia de `cargar_env` (tres veces la misma funcion, y las tres con el
mismo fallo de parseo) y su propia descarga sin timeout ni atomicidad.

Sigue sin dependencias externas: solo libreria estandar, como los tres scripts.

Que resuelve, en concreto:
  · .env  — `export CLAVE=v`, comillas y comentarios en linea ya no corrompen el
            valor. Antes `CLAVE=abc # mia` devolvia "abc # mia", la API daba 401
            y el mensaje te mandaba a rotar una clave que estaba bien.
  · red   — distingue el error FATAL (401/403/422: reintentar no arregla nada)
            del TRANSITORIO (5xx, 429, timeout), y solo reintenta el segundo, con
            espera creciente y respetando `Retry-After`. Antes cualquier corte de
            red durante un sondeo de 15 minutos mataba un render YA PAGADO.
  · disco — descarga y escritura ATOMICAS (archivo temporal + rename). Antes un
            corte dejaba un .mp4 truncado en la ruta final: ffprobe lo lee y
            Remotion lo compone, asi que el fallo aparecia mucho mas tarde.
"""
import json
import os
import random
import sys
import time
import urllib.error
import urllib.request

# Reintentar aqui SI tiene sentido: son fallos de transporte o de carga, no de
# la peticion. El resto (401 clave mala, 422 parametros, 403 sin creditos) es
# determinista: reintentarlo solo gasta tiempo y repite el mismo error.
CODIGOS_TRANSITORIOS = frozenset({408, 425, 429, 500, 502, 503, 504})

# IDENTIFICARSE NO ES CORTESIA, ES REQUISITO — y se descubre tarde. Con el
# User-Agent por defecto de urllib (`Python-urllib/3.x`) Cloudflare responde 403
# con `error code: 1010` (bloqueo por firma del cliente) ANTES de que la peticion
# llegue al servicio, asi que la clave puede estar perfecta y el mensaje te manda
# a rotarla. Paso con la API de Pexels y otra vez con su CDN de imagenes.
#
# Va aqui y no en cada script porque el problema es del transporte, no del
# servicio: cualquier CDN detras de Cloudflare hace lo mismo. Que heygen, grok y
# elevenlabs funcionen hoy sin esto es suerte, no diseno.
AGENTE = "video-creator/1.0 (scripts de manuales/edicion-video)"


class ErrorHTTP(Exception):
    """Error definitivo de la API. Cada script lo traduce a SU mensaje util."""

    def __init__(self, codigo, cuerpo, cabeceras=None):
        super().__init__(f"HTTP {codigo}: {cuerpo[:400]}")
        self.codigo = codigo
        self.cuerpo = cuerpo
        self.cabeceras = cabeceras or {}


def raiz_proyecto():
    """scripts/ -> edicion-video/ -> manuales/ -> raiz del repo."""
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", "..", ".."))


def _valor(bruto):
    """
    El valor de una linea de .env, sin comillas y sin comentario final.

    El comentario solo cuenta si va DESPUES de un espacio: una '#' pegada al
    valor puede ser parte de la propia clave o de un color hex (#FAFAFA).
    """
    v = bruto.strip()
    if v[:1] in ('"', "'"):
        cita = v[0]
        fin = v.find(cita, 1)
        return v[1:fin] if fin > 0 else v[1:]
    for i, c in enumerate(v):
        if c == "#" and i > 0 and v[i - 1] in " \t":
            return v[:i].rstrip()
    return v


def cargar_env(prefijo):
    """
    Variables del .env de la raiz que empiezan por `prefijo`, con las del
    entorno pisando a las del archivo (para poder hacer `CLAVE=... comando`).
    """
    valores = {}
    env_path = os.path.join(raiz_proyecto(), ".env")
    if os.path.isfile(env_path):
        with open(env_path, encoding="utf-8") as f:
            for linea in f:
                linea = linea.strip()
                if not linea or linea.startswith("#") or "=" not in linea:
                    continue
                if linea.startswith("export "):
                    linea = linea[len("export "):].lstrip()
                k, _, v = linea.partition("=")
                valores[k.strip()] = _valor(v)
    for k, v in os.environ.items():
        if k.startswith(prefijo):
            valores[k] = v
    return valores


def _espera(intento, cabeceras):
    """Espera antes del siguiente intento: `Retry-After` si lo hay, si no 2^n."""
    ra = cabeceras.get("Retry-After") if cabeceras is not None else None
    if ra:
        try:
            return min(60.0, float(ra))
        except (TypeError, ValueError):
            pass
    # Jitter para no sincronizar reintentos; aqui no hay determinismo que romper
    # (esto no es el render: es una llamada de red).
    return min(30.0, (2 ** intento) + random.uniform(0, 1))


# Metodos SEGUROS de reintentar: repetirlos no crea nada ni cobra nada.
METODOS_IDEMPOTENTES = frozenset({"GET", "HEAD", "OPTIONS"})


def pide(url, metodo="GET", cabeceras=None, cuerpo=None, timeout=120,
         binario=False, intentos=4, aviso=None, reintentable=None):
    """
    Una peticion HTTP con reintentos SOLO en los fallos transitorios.

    ⚠️ POR DEFECTO NO SE REINTENTAN LAS ESCRITURAS. Un POST a esta clase de APIs
    LANZA UN RENDER QUE SE COBRA (grok /videos/generations, heygen /video/generate,
    elevenlabs /text-to-speech factura por caracteres). Un 503 no dice si el
    servidor llegó a procesarlo, así que reintentar puede pagar dos, tres o cuatro
    veces lo mismo. Fallar y que lo relance una persona es mucho más barato.
    `reintentable=True` fuerza el reintento para un POST que SÍ sepas idempotente.

    Devuelve `(datos, cabeceras)`: bytes si `binario`, si no el JSON parseado.
    Las cabeceras se devuelven como el objeto de urllib, NO como dict: su `.get()`
    es insensible a mayusculas, y los servidores mandan `Retry-After`,
    `retry-after` o `X-Character-Count` indistintamente.

    Lanza `ErrorHTTP` en los fallos definitivos, para que cada script escriba su
    propio mensaje segun el codigo.
    """
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    seguro = reintentable if reintentable is not None else (metodo.upper() in METODOS_IDEMPOTENTES)
    maximo = intentos if seguro else 1
    ultimo, cab = None, None
    for intento in range(maximo):
        req = urllib.request.Request(url, data=datos, method=metodo)
        req.add_header("User-Agent", AGENTE)
        for k, v in (cabeceras or {}).items():
            req.add_header(k, v)
        if datos is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                bruto = r.read()
                return (bruto if binario else json.loads(bruto.decode())), r.headers
        except urllib.error.HTTPError as e:
            # Leer el cuerpo del error puede fallar (conexion cortada). Si pasa,
            # el codigo HTTP sigue siendo la informacion util: no la perdamos
            # detras de un traceback de socket que no dice nada.
            try:
                cuerpo_err = e.read().decode(errors="replace")
            except OSError as lectura:
                cuerpo_err = f"(no se pudo leer el cuerpo del error: {lectura})"
            if e.code not in CODIGOS_TRANSITORIOS or intento == maximo - 1:
                raise ErrorHTTP(e.code, cuerpo_err, e.headers) from None
            ultimo, cab = f"HTTP {e.code}", e.headers
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            if intento == maximo - 1:
                raise ErrorHTTP(0, f"error de red: {e}") from None
            ultimo, cab = f"red ({e})", None
        s = _espera(intento, cab)
        (aviso or (lambda m: print(m, file=sys.stderr)))(
            f"   ⚠ {ultimo} — reintento {intento + 1}/{maximo - 1} en {s:.0f}s"
        )
        time.sleep(s)
    raise ErrorHTTP(0, "agotados los reintentos")  # pragma: no cover


def escribe_atomico(destino, datos):
    """
    Escribe bytes con temporal + rename: o esta entero o no esta.
    Sin esto, un Ctrl-C a mitad deja un archivo corto que parece valido.
    """
    destino = os.path.abspath(destino)
    os.makedirs(os.path.dirname(destino) or ".", exist_ok=True)
    tmp = destino + ".parcial"
    with open(tmp, "wb") as f:
        f.write(datos)
    os.replace(tmp, destino)
    return len(datos)


def descarga(url, destino, timeout=300, cabeceras=None):
    """
    Descarga a disco de forma atomica y con timeout (a diferencia de
    `urlretrieve`, que no acepta ninguno). Si el servidor declara Content-Length
    y lo recibido no cuadra, falla en vez de dejar un archivo a medias.

    Manda `User-Agent` (ver `AGENTE`): los CDN detras de Cloudflare rechazan con
    403 al cliente que no se identifica, y aqui eso salia como «no se pudo bajar»
    en bucle sobre veinte archivos seguidos.
    """
    destino = os.path.abspath(destino)
    os.makedirs(os.path.dirname(destino) or ".", exist_ok=True)
    tmp = destino + ".parcial"
    req = urllib.request.Request(url, headers={"User-Agent": AGENTE, **(cabeceras or {})})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            declarado = r.headers.get("Content-Length")
            escrito = 0
            with open(tmp, "wb") as f:
                while True:
                    trozo = r.read(1 << 16)
                    if not trozo:
                        break
                    f.write(trozo)
                    escrito += len(trozo)
        if declarado and int(declarado) != escrito:
            raise IOError(f"descarga incompleta: {escrito} de {declarado} bytes")
        os.replace(tmp, destino)
        return escrito
    except BaseException:
        if os.path.exists(tmp):
            os.remove(tmp)
        raise
