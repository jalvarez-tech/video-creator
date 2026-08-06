#!/usr/bin/env python3
"""
grok.py — Generacion de b-roll e imagenes con Grok Imagine (API directa de xAI).
Sin dependencias externas (solo libreria estandar de Python 3).

Subcomandos:
  modelos             Lista los modelos de tu cuenta (sirve para verificar clave y creditos)
  imagen              Texto -> imagen, y la descarga
  video               Texto -> video, o imagen -> video, y lo descarga

Va DIRECTO a api.x.ai (no pasa por RunAPI). La clave se lee de XAI_API_KEY
(variable de entorno o .env en la raiz de video-creator). Nunca se imprime.

Por que descarga siempre: las URLs que devuelve la API son temporales. La regla
del proyecto es guardar el archivo en el mismo paso que se genera
(ver manuales/director-video/SKILL.md, contrato §3h).

Doc: manuales/edicion-video/SKILL.md
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

BASE = "https://api.x.ai/v1"


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
        if k.startswith("XAI_"):
            valores[k] = v
    return valores


ENV = cargar_env()


def api_key():
    k = ENV.get("XAI_API_KEY", "").strip()
    if not k:
        sys.exit(
            "ERROR: falta XAI_API_KEY.\n"
            "  1) cp .env.example .env   2) pega tu clave de https://console.x.ai\n"
            "  o bien: export XAI_API_KEY=...\n"
            "  OJO: empieza por 'xai-'. No es la de Groq (gsk_) ni la de RunAPI."
        )
    return k


def pedir(method, path, body=None, timeout=120):
    url = BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + api_key())
    req.add_header("Accept", "application/json")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode(errors="replace")
        if e.code == 401:
            sys.exit("ERROR 401: la clave no es valida. Revisa XAI_API_KEY (console.x.ai).")
        if e.code == 403 and "credit" in cuerpo.lower():
            sys.exit(
                "ERROR 403: la clave es valida pero tu equipo de xAI NO TIENE CREDITOS.\n"
                "  Compralos en https://console.x.ai  ->  Billing.\n"
                f"  Respuesta: {cuerpo[:200]}"
            )
        if e.code == 429:
            sys.exit("ERROR 429 (rate limit). Espera y reintenta.")
        sys.exit(f"ERROR HTTP {e.code}: {cuerpo}")
    except urllib.error.URLError as e:
        sys.exit(f"ERROR de red: {e}")


def descargar(url, salida):
    """Descarga a disco AHORA. Las URLs de la API caducan."""
    os.makedirs(os.path.dirname(os.path.abspath(salida)), exist_ok=True)
    urllib.request.urlretrieve(url, salida)
    tam = os.path.getsize(salida)
    print(f"Guardado: {salida}  ({tam/1_000_000:.1f} MB)")


def guardar_prompt(salida, payload):
    """Deja el JSON de la llamada junto al material, para poder regenerar."""
    carpeta = os.path.dirname(os.path.abspath(salida))
    prompts = os.path.join(os.path.dirname(carpeta), "prompts")
    os.makedirs(prompts, exist_ok=True)
    base = os.path.splitext(os.path.basename(salida))[0]
    ruta = os.path.join(prompts, base + ".json")
    with open(ruta, "w") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"Prompt guardado: {ruta}")


def extras(args):
    """Campos adicionales que la doc de xAI no fija (p. ej. aspect_ratio).
    Se pasan tal cual para poder probarlos sin tocar el script."""
    if not args.extra:
        return {}
    try:
        d = json.loads(args.extra)
    except json.JSONDecodeError as e:
        sys.exit(f"ERROR: --extra no es JSON valido: {e}")
    if not isinstance(d, dict):
        sys.exit("ERROR: --extra tiene que ser un objeto JSON, p. ej. '{\"aspect_ratio\":\"9:16\"}'")
    return d


def cmd_modelos(args):
    data = pedir("GET", "/models").get("data", []) or []
    ids = sorted(str(m.get("id", "")) for m in data)
    imagine = [i for i in ids if "imagine" in i]
    print(f"\n=== MODELOS DE LA CUENTA ({len(ids)}) ===")
    for i in ids:
        marca = "  <- Grok Imagine" if i in imagine else ""
        print(f"  {i}{marca}")
    if not imagine:
        print("\nAviso: no aparece ningun modelo 'imagine' en esta cuenta.")


def cmd_imagen(args):
    payload = {"model": args.modelo, "prompt": args.prompt}
    payload.update(extras(args))
    print(f"Generando imagen [{args.modelo}]...")
    resp = pedir("POST", "/images/generations", body=payload)

    items = resp.get("data") or []
    if not items:
        sys.exit(f"ERROR: respuesta sin 'data': {json.dumps(resp)[:400]}")
    item = items[0]

    if item.get("url"):
        descargar(item["url"], args.salida)
    elif item.get("b64_json"):
        import base64
        os.makedirs(os.path.dirname(os.path.abspath(args.salida)), exist_ok=True)
        with open(args.salida, "wb") as f:
            f.write(base64.b64decode(item["b64_json"]))
        print(f"Guardado: {args.salida}")
    else:
        sys.exit(f"ERROR: sin 'url' ni 'b64_json': {json.dumps(item)[:400]}")
    guardar_prompt(args.salida, payload)


def _url_del_video(estado):
    """La doc situa la URL en .video.url; toleramos variantes."""
    v = estado.get("video")
    if isinstance(v, dict) and v.get("url"):
        return v["url"]
    if isinstance(v, str) and v.startswith("http"):
        return v
    if estado.get("url"):
        return estado["url"]
    data = estado.get("data")
    if isinstance(data, list) and data and isinstance(data[0], dict) and data[0].get("url"):
        return data[0]["url"]
    return None


def cmd_video(args):
    payload = {"model": args.modelo, "prompt": args.prompt, "duration": args.duracion}
    if args.imagen:
        # imagen -> video. La imagen fuente fija el encuadre: es la via fiable
        # para conseguir 9:16 mientras la API no documente aspect_ratio.
        payload["image"] = {"url": args.imagen}
    payload.update(extras(args))

    modo = "imagen -> video" if args.imagen else "texto -> video"
    print(f"Generando video [{args.modelo}] · {modo} · {args.duracion}s")
    print(f"Coste aprox: {args.duracion} s x tarifa por segundo de {args.modelo} (ver console.x.ai).")

    resp = pedir("POST", "/videos/generations", body=payload)
    rid = resp.get("request_id") or resp.get("id")
    if not rid:
        sys.exit(f"ERROR: sin request_id en la respuesta: {json.dumps(resp)[:400]}")
    print(f"request_id: {rid} — esperando render (polling cada {args.intervalo}s)...")

    t0 = time.time()
    while True:
        est = pedir("GET", f"/videos/{rid}")
        status = str(est.get("status", "")).lower()
        if status == "done":
            url = _url_del_video(est)
            if not url:
                sys.exit(f"ERROR: status=done pero no encuentro la URL: {json.dumps(est)[:400]}")
            print("OK, listo. Descargando (la URL caduca, por eso se baja ya)...")
            descargar(url, args.salida)
            guardar_prompt(args.salida, payload)
            print("Siguiente: mide con ffprobe y colocalo segun el contrato (director-video §3h).")
            return
        if status in ("failed", "expired"):
            sys.exit(f"ERROR: la generacion termino en '{status}': {json.dumps(est)[:400]}")
        if time.time() - t0 > args.timeout:
            sys.exit(f"ERROR: timeout (>{args.timeout}s). Ultimo status: {status}. request_id={rid}")
        print(f"   ... {status or 'en curso'}")
        time.sleep(args.intervalo)


def main():
    p = argparse.ArgumentParser(description="Grok Imagine (API directa de xAI) para video-creator")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("modelos", help="Lista los modelos de la cuenta (verifica clave y creditos)")

    i = sub.add_parser("imagen", help="Texto -> imagen")
    i.add_argument("prompt", help="Descripcion de la imagen")
    i.add_argument("--modelo", default="grok-imagine-image", help="def. grok-imagine-image (calidad: grok-imagine-image-quality)")
    i.add_argument("--salida", default="proyectos/001/broll/grok/raw/imagen.jpg", help="Ruta de salida")
    i.add_argument("--extra", help='JSON con campos extra, p. ej. \'{"aspect_ratio":"9:16"}\'')

    v = sub.add_parser("video", help="Texto -> video, o imagen -> video")
    v.add_argument("prompt", help="Descripcion del plano (una intencion, no adjetivos apilados)")
    v.add_argument("--imagen", help="URL publica de la imagen de partida (imagen -> video)")
    v.add_argument("--modelo", default="grok-imagine-video-1.5", help="def. grok-imagine-video-1.5")
    v.add_argument("--duracion", type=int, default=6, help="Segundos, hasta 15 (def. 6)")
    v.add_argument("--salida", default="proyectos/001/broll/grok/raw/shot-01.mp4", help="Ruta de salida MP4")
    v.add_argument("--intervalo", type=int, default=5, help="Segundos entre sondeos (def. 5)")
    v.add_argument("--timeout", type=int, default=900, help="Segundos maximos de espera (def. 900)")
    v.add_argument("--extra", help='JSON con campos extra, p. ej. \'{"aspect_ratio":"9:16"}\'')

    args = p.parse_args()
    {"modelos": cmd_modelos, "imagen": cmd_imagen, "video": cmd_video}[args.cmd](args)


if __name__ == "__main__":
    main()
