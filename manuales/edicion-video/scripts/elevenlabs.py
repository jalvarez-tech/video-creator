#!/usr/bin/env python3
"""
elevenlabs.py — Integracion de ElevenLabs (texto -> voz) con video-creator.
Sin dependencias externas (solo libreria estandar de Python 3).
Hermano de heygen.py (avatar) y grok.py (b-roll).

Subcomandos:
  voces               Lista tus voces (incluidas las clonadas) -> copiar voice_id
  modelos             Lista los modelos TTS disponibles en tu cuenta
  hablar              Genera un audio desde texto y lo guarda
  guion               Genera un audio por CADA LINEA de un guion `id|texto`,
                      CON request stitching (el formato que consume generar-vo.sh)
  cuota               Cuantos caracteres te quedan este mes

QUE ES ESTE SCRIPT Y QUE NO ES.
  El skill oficial `.agents/skills/text-to-speech/` (elevenlabs/skills) es la
  DOCUMENTACION de la API: modelos, ajustes de voz, formatos, streaming. Este
  script es la HERRAMIENTA DE PIPELINE del proyecto: locuta un guion por tomas y
  encaja con generar-vo.sh, que es quien cronometra el plan de la noticia.
  Cuando dudes de un parametro, mira el skill; cuando quieras locutar un
  proyecto, usa esto. Stdlib a proposito, como heygen.py y grok.py: el sistema
  no arrastra dependencias de Python para tres llamadas HTTP.

POR QUE ESTE SCRIPT Y NO HEYGEN para la voz en off:
  HeyGen solo genera VIDEO de avatar; para quedarte con la voz hay que renderizar
  el avatar entero y tirar la imagen. En el formato `video-noticias` no hay avatar
  en pantalla, asi que eso es pagar por un render que no se usa. ElevenLabs
  devuelve el audio directamente y se factura por caracteres.

La API key se lee de ELEVENLABS_API_KEY (entorno o .env de la raiz). Nunca se
imprime, ni entera ni truncada.

Doc: manuales/video-noticias/SKILL.md §8 · skill oficial: .agents/skills/text-to-speech/
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE = "https://api.elevenlabs.io"

# Modelo por defecto. `eleven_multilingual_v2` es el que el skill oficial marca
# para "long-form content", que es lo que es una locucion. Alternativa:
# `eleven_v3` (mas rango emocional, y el unico que admite `language_code`).
# Usa `modelos` para ver lo que tu cuenta tiene disponible HOY en vez de fiarte
# de este valor: los nombres de modelo cambian.
MODELO_DEF = "eleven_multilingual_v2"

# MP3 128k: el unico formato disponible en TODOS los planes, incluido `starter`.
# Los sin perdida (`wav_44100`, `pcm_44100`) exigen Pro y devuelven 403 por abajo:
# no los pongas de default o la primera locucion de una cuenta nueva falla.
# Con plan Pro, `--formato wav_44100` ahorra una generacion con perdida antes de
# mezclar; a 128 kbps sobre una voz hablada la diferencia es inaudible.
FORMATO_DEF = "mp3_44100_128"

# Ajustes de voz POR CASO DE USO, tal y como los documenta el skill oficial
# (references/voice-settings.md). El preset importa mas de lo que parece: con
# los valores conversacionales (stability 0.4) una locucion informativa cambia
# de tono entre frases, y ese vaiven es justo lo que delata a un TTS.
PRESETS = {
    "noticias":      {"stability": 0.8, "similarity_boost": 0.6,  "style": 0.0},
    "narracion":     {"stability": 0.7, "similarity_boost": 0.5,  "style": 0.0},
    "conversacion":  {"stability": 0.4, "similarity_boost": 0.75, "style": 0.3},
    "personaje":     {"stability": 0.3, "similarity_boost": 0.8,  "style": 0.5},
}
PRESET_DEF = "noticias"


def cargar_env():
    """Lee .env de la raiz del proyecto (scripts/ -> edicion-video/ -> manuales/ -> root)."""
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", ".."))
    env_path = os.path.join(root, ".env")
    valores = {}
    if os.path.isfile(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                valores[k.strip()] = v.strip().strip('"').strip("'")
    # Las variables de entorno tienen prioridad sobre el .env
    for k, v in os.environ.items():
        if k.startswith("ELEVENLABS_"):
            valores[k] = v
    return valores


ENV = cargar_env()

# Contador de caracteres facturados en esta ejecucion (cabecera x-character-count).
GASTO = {"caracteres": 0}


def api_key():
    k = ENV.get("ELEVENLABS_API_KEY", "").strip()
    if not k:
        sys.exit(
            "ERROR: falta ELEVENLABS_API_KEY.\n"
            "  1) cp .env.example .env   2) pega tu clave (elevenlabs.io -> perfil -> API Keys)\n"
            "  o bien: export ELEVENLABS_API_KEY=...\n"
            "  Guia paso a paso: skill `setup-api-key` de .agents/skills/"
        )
    return k


def pedir(method, path, body=None, query=None, binario=False):
    url = BASE + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("xi-api-key", api_key())
    req.add_header("Accept", "audio/mpeg" if binario else "application/json")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            # Coste real de la llamada, segun la propia API (no una estimacion).
            n = r.headers.get("x-character-count")
            if n:
                try:
                    GASTO["caracteres"] += int(n)
                except ValueError:
                    pass
            raw = r.read()
            return raw if binario else json.loads(raw.decode())
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode(errors="replace")
        if e.code == 401:
            sys.exit("ERROR 401: clave invalida o sin permisos. Revisa ELEVENLABS_API_KEY en .env.")
        if e.code == 403 and "output_format" in cuerpo:
            sys.exit(
                f"ERROR 403: tu plan no permite ese --formato.\n"
                f"  Los formatos sin perdida (wav_*, pcm_*) exigen plan Pro o superior.\n"
                f"  Usa --formato mp3_44100_128 (todos los planes) o mp3_44100_192 (Creator+).\n"
                f"  Detalle: {cuerpo}"
            )
        if e.code == 403:
            sys.exit(f"ERROR 403 (permiso o plan insuficiente): {cuerpo}")
        if e.code == 422:
            sys.exit(f"ERROR 422 (parametros invalidos — revisa voice_id y model_id): {cuerpo}")
        if e.code == 429:
            sys.exit(f"ERROR 429 (rate limit o cuota agotada). Detalle: {cuerpo}")
        sys.exit(f"ERROR HTTP {e.code}: {cuerpo}")
    except urllib.error.URLError as e:
        sys.exit(f"ERROR de red: {e}")


def cmd_voces(args):
    voces = pedir("GET", "/v1/voices").get("voices", []) or []
    filtro = (args.buscar or "").lower()
    print("\n=== VOCES ===")
    n = 0
    for v in voces:
        nombre = v.get("name", "")
        if filtro and filtro not in nombre.lower():
            continue
        cat = v.get("category", "")
        labels = v.get("labels", {}) or {}
        extra = " ".join(f"{k}={x}" for k, x in labels.items() if k in ("accent", "gender", "age", "use_case"))
        marca = "  <- TUYA" if cat in ("cloned", "professional") else ""
        print(f"  {str(v.get('voice_id','')):24}  {nombre:28}  [{cat}]  {extra}{marca}")
        n += 1
    print(f"\n{n} voces. Copia el voice_id a .env como  ELEVENLABS_VOICE_ID=...")
    print("Las 'cloned'/'professional' son TUYAS; el resto es catalogo de stock.")


def cmd_modelos(args):
    modelos = pedir("GET", "/v1/models")
    print("\n=== MODELOS ===")
    for m in modelos:
        idm = m.get("model_id", "")
        idiomas = sorted({(l.get("language_id") or "") for l in (m.get("languages") or [])})
        es = " ✅es" if "es" in idiomas else ""
        print(f"  {idm:34}  {m.get('name','')}{es}")
        if args.verboso and idiomas:
            print(f"      idiomas ({len(idiomas)}): {','.join(idiomas)}")
    print(f"\nPor defecto este script usa: {MODELO_DEF} (cambialo con --modelo)")
    print("Tip: `eleven_v3` da mas rango emocional y admite --idioma; multilingual_v2 no.")


def cmd_cuota(args):
    u = pedir("GET", "/v1/user/subscription")
    usado = u.get("character_count", 0)
    tope = u.get("character_limit", 0)
    print(f"\nCaracteres: {usado:,} usados de {tope:,}  ->  quedan {max(0, tope - usado):,}")
    print(f"Plan: {u.get('tier','?')}")


def ajustes(args):
    """Preset del caso de uso + overrides explicitos del usuario."""
    v = dict(PRESETS[args.preset])
    if args.estabilidad is not None:
        v["stability"] = args.estabilidad
    if args.similitud is not None:
        v["similarity_boost"] = args.similitud
    if args.estilo is not None:
        v["style"] = args.estilo
    if args.velocidad is not None:
        v["speed"] = args.velocidad
    v["use_speaker_boost"] = True
    return v


def sintetiza(texto, voz, args, previo=None, siguiente=None):
    """
    Devuelve los bytes del audio. Un solo lugar donde se arma el payload.

    `previo`/`siguiente` son REQUEST STITCHING (skill oficial §Request Stitching):
    le dicen al modelo que hay texto antes y despues de este fragmento. Sin esto,
    generar un guion frase a frase produce saltos de tono y pausas raras en cada
    juntura — que es exactamente lo que se oye al concatenar los clips despues.
    """
    body = {"text": texto, "model_id": args.modelo, "voice_settings": ajustes(args)}
    if previo:
        body["previous_text"] = previo
    if siguiente:
        body["next_text"] = siguiente
    # `language_code` guia pronunciacion y normalizacion, pero NO lo admite
    # multilingual_v2 (lo ignora o da 422). Solo se manda si el usuario lo pide.
    if args.idioma:
        body["language_code"] = args.idioma
    if args.normalizar != "auto":
        body["apply_text_normalization"] = args.normalizar
    return pedir(
        "POST",
        f"/v1/text-to-speech/{voz}",
        body=body,
        query={"output_format": args.formato},
        binario=True,
    )


def resuelve_voz(args):
    voz = args.voz or ENV.get("ELEVENLABS_VOICE_ID")
    if not voz:
        sys.exit("ERROR: falta voice_id (--voz o ELEVENLABS_VOICE_ID en .env). Listalo con: elevenlabs.py voces")
    return voz


def ext_de(formato):
    return "wav" if formato.startswith("wav") else "mp3" if formato.startswith("mp3") else "bin"


def cmd_hablar(args):
    texto = args.texto
    if args.texto_archivo:
        with open(args.texto_archivo) as f:
            texto = f.read().strip()
    if not texto:
        sys.exit('ERROR: da el texto con --texto "..." o --texto-archivo <ruta>')

    voz = resuelve_voz(args)
    print(f"Sintetizando {len(texto)} caracteres · voz {voz[:8]}… · {args.modelo} · preset {args.preset}")
    audio = sintetiza(texto, voz, args)
    os.makedirs(os.path.dirname(os.path.abspath(args.salida)) or ".", exist_ok=True)
    with open(args.salida, "wb") as f:
        f.write(audio)
    print(f"Guardado: {args.salida}  ({len(audio):,} bytes)")
    if GASTO["caracteres"]:
        print(f"Facturado: {GASTO['caracteres']:,} caracteres")


def lee_guion(ruta):
    lineas = []
    with open(ruta) as f:
        for raw in f:
            raw = raw.strip()
            if not raw or raw.startswith("#"):
                continue
            idl, _, texto = raw.partition("|")
            lineas.append((idl.strip(), texto.strip()))
    return lineas


def cmd_guion(args):
    """
    Locuta un guion `id|texto` (una linea por toma) a archivos sueltos.

    Por que una linea = un archivo, y no el guion entero de una vez: el formato
    `video-noticias` cronometra CADA TOMA con la duracion real de SU linea. Con
    un unico audio habria que segmentarlo despues a oido, que es justo el paso
    manual que este sistema evita.

    Y por que eso no suena a trozos pegados: cada llamada lleva el texto anterior
    y el siguiente (request stitching), asi que el modelo mantiene la entonacion
    a traves de los cortes aunque genere cada frase por separado.
    """
    voz = resuelve_voz(args)
    os.makedirs(args.salida, exist_ok=True)
    lineas = lee_guion(args.guion)
    con_voz = [(i, idl, t) for i, (idl, t) in enumerate(lineas) if t]

    total_chars = sum(len(t) for _, _, t in con_voz)
    print(f"\n{len(lineas)} lineas ({len(con_voz)} con voz) · {total_chars:,} caracteres")
    print(f"voz {voz[:8]}… · {args.modelo} · preset {args.preset} · {args.formato} · stitching ON")
    if args.simular:
        print("(--simular: no se llama a la API, no se gasta cuota)")
    print("")

    ext = ext_de(args.formato)
    for pos, (i, idl, texto) in enumerate(con_voz, 1):
        destino = os.path.join(args.salida, f"{i + 1:03d}-{idl}.{ext}")
        # Vecinos REALES del guion: dan continuidad de entonacion entre tomas.
        previo = con_voz[pos - 2][2] if pos >= 2 else None
        siguiente = con_voz[pos][2] if pos < len(con_voz) else None
        if args.simular:
            print(f"  {i+1:3}. {idl:22} {len(texto):4} car.  -> {os.path.basename(destino)}")
            continue
        audio = sintetiza(texto, voz, args, previo=previo, siguiente=siguiente)
        with open(destino, "wb") as fh:
            fh.write(audio)
        print(f"  {i+1:3}. {idl:22} {len(texto):4} car.  -> {os.path.basename(destino)}")

    for i, (idl, texto) in enumerate(lineas):
        if not texto:
            print(f"  {i+1:3}. {idl:22} (silencio — lo genera generar-vo.sh)")

    if not args.simular:
        print(f"\nOK: {args.salida}")
        if GASTO["caracteres"]:
            print(f"Facturado: {GASTO['caracteres']:,} caracteres")
        print("\nSiguiente — montar la pista y cronometrar el plan:")
        print(f"  bash manuales/video-noticias/scripts/generar-vo.sh <guion> --motor elevenlabs --partes {args.salida}")


def main():
    p = argparse.ArgumentParser(description="ElevenLabs (texto a voz) para video-creator")
    sub = p.add_subparsers(dest="cmd", required=True)

    pv = sub.add_parser("voces", help="Lista tus voces (clonadas y de catalogo)")
    pv.add_argument("--buscar", help="Filtra por nombre")

    pm = sub.add_parser("modelos", help="Lista los modelos TTS disponibles")
    pm.add_argument("--verboso", action="store_true", help="Muestra los idiomas de cada modelo")

    sub.add_parser("cuota", help="Caracteres restantes del plan")

    def comunes(sp):
        sp.add_argument("--voz", help="voice_id (o ELEVENLABS_VOICE_ID en .env)")
        sp.add_argument("--modelo", default=MODELO_DEF, help=f"model_id (def. {MODELO_DEF})")
        sp.add_argument("--preset", choices=sorted(PRESETS), default=PRESET_DEF,
                        help=f"ajustes por caso de uso (def. {PRESET_DEF})")
        sp.add_argument("--formato", default=FORMATO_DEF, help=f"output_format (def. {FORMATO_DEF})")
        sp.add_argument("--idioma", help="language_code ISO-639-1, p.ej. 'es'. NO lo admite multilingual_v2")
        sp.add_argument("--normalizar", choices=["auto", "on", "off"], default="auto",
                        help="apply_text_normalization: como lee numeros y fechas (def. auto)")
        # Overrides sueltos: por defecto None para que mande el preset.
        sp.add_argument("--estabilidad", type=float, help="0-1; baja=expresiva, alta=plana")
        sp.add_argument("--similitud", type=float, help="0-1; parecido a la voz original")
        sp.add_argument("--estilo", type=float, help="0-1; exageracion de estilo")
        sp.add_argument("--velocidad", type=float, help="0.25-4.0; ritmo")

    ph = sub.add_parser("hablar", help="Genera un audio desde texto")
    comunes(ph)
    ph.add_argument("--texto", help="El texto a locutar")
    ph.add_argument("--texto-archivo", help="Archivo con el texto")
    ph.add_argument("--salida", default="out/voz.wav", help="Ruta del audio")

    pg = sub.add_parser("guion", help="Genera un audio por linea de un guion id|texto (con stitching)")
    comunes(pg)
    pg.add_argument("guion", help="Archivo `id|texto`, una linea por toma")
    pg.add_argument("--salida", required=True, help="Carpeta donde dejar los audios")
    pg.add_argument("--simular", action="store_true", help="Muestra que haria SIN llamar a la API")

    args = p.parse_args()
    {"voces": cmd_voces, "modelos": cmd_modelos, "cuota": cmd_cuota, "hablar": cmd_hablar, "guion": cmd_guion}[
        args.cmd
    ](args)


if __name__ == "__main__":
    main()
