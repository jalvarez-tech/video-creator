#!/usr/bin/env python3
"""
heygen.py — Integracion de HeyGen con el sistema video-creator.
Sin dependencias externas (solo libreria estandar de Python 3).

Subcomandos:
  avatares            Lista tus avatares y talking photos (para copiar avatar_id)
  voces               Lista voces (filtra con --idioma), para copiar voice_id
  generar             Genera un video de avatar desde texto y lo descarga

La API key se lee de la variable de entorno HEYGEN_API_KEY o del archivo .env
en la raiz de video-creator. Nunca se imprime.

Doc: manuales/edicion-video/heygen.md
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

BASE = "https://api.heygen.com"


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
        if k.startswith("HEYGEN_"):
            valores[k] = v
    return valores


ENV = cargar_env()


def api_key():
    k = ENV.get("HEYGEN_API_KEY", "").strip()
    if not k:
        sys.exit(
            "ERROR: falta HEYGEN_API_KEY.\n"
            "  1) cp .env.example .env   2) pega tu clave (app.heygen.com -> Settings -> API)\n"
            "  o bien: export HEYGEN_API_KEY=..."
        )
    return k


def pedir(method, path, body=None, query=None):
    url = BASE + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-Api-Key", api_key())
    req.add_header("Accept", "application/json")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode(errors="replace")
        if e.code == 429:
            retry = e.headers.get("Retry-After", "?")
            sys.exit(f"ERROR 429 (rate limit). Reintenta en {retry}s.")
        sys.exit(f"ERROR HTTP {e.code}: {cuerpo}")
    except urllib.error.URLError as e:
        sys.exit(f"ERROR de red: {e}")


def cmd_avatares(args):
    d = pedir("GET", "/v2/avatars").get("data", {}) or {}
    avatars = d.get("avatars", []) or []
    photos = d.get("talking_photos", []) or []
    print(f"\n=== AVATARES DE VIDEO ({len(avatars)}) — usa 'avatar_id' ===")
    for a in avatars:
        print(f"  {str(a.get('avatar_id','')):46}  {a.get('avatar_name','')}  [{a.get('gender','')}]")
    print(f"\n=== TALKING PHOTOS ({len(photos)}) — usa 'talking_photo_id' ===")
    for p in photos:
        print(f"  {str(p.get('talking_photo_id','')):46}  {p.get('talking_photo_name','')}")
    print("\nTip: copia TU avatar_id y pegalo en .env como  HEYGEN_AVATAR_ID=...")


def cmd_voces(args):
    voces = (pedir("GET", "/v2/voices").get("data", {}) or {}).get("voices", []) or []
    idi = (args.idioma or "").lower()
    n = 0
    print("\n=== VOCES ===")
    for v in voces:
        if idi and idi not in v.get("language", "").lower():
            continue
        print(f"  {str(v.get('voice_id','')):35}  {v.get('name',''):22}  {v.get('language','')}  [{v.get('gender','')}]")
        n += 1
    suf = f" ({args.idioma})" if idi else ""
    print(f"\n{n} voces{suf}. Copia el voice_id a .env como  HEYGEN_VOICE_ID=...")


DIMS = {
    "16:9": (1920, 1080),
    "9:16": (1080, 1920),
    "1:1": (1080, 1080),
    "4:5": (1080, 1350),
    "720p": (1280, 720),
}


def cmd_generar(args):
    texto = args.texto
    if args.texto_archivo:
        with open(args.texto_archivo) as f:
            texto = f.read().strip()
    if not texto:
        sys.exit('ERROR: da el guion con --texto "..." o --texto-archivo <ruta>')
    if len(texto) > 5000:
        sys.exit(f"ERROR: el texto tiene {len(texto)} caracteres (max 5000). Trocea el guion.")

    avatar = args.avatar or ENV.get("HEYGEN_AVATAR_ID")
    voz = args.voz or ENV.get("HEYGEN_VOICE_ID")
    if not avatar:
        sys.exit("ERROR: falta avatar_id (--avatar o HEYGEN_AVATAR_ID en .env). Listalo con: heygen.py avatares")
    if not voz:
        sys.exit("ERROR: falta voice_id (--voz o HEYGEN_VOICE_ID en .env). Listalo con: heygen.py voces")

    w, h = DIMS.get(args.formato, DIMS["16:9"])
    payload = {
        "test": not args.final,
        "title": args.titulo,
        "caption": False,
        "dimension": {"width": w, "height": h},
        "video_inputs": [
            {
                "character": {"type": "avatar", "avatar_id": avatar, "avatar_style": "normal"},
                "voice": {"type": "text", "input_text": texto, "voice_id": voz, "speed": args.velocidad},
                "background": {"type": "color", "value": args.fondo},
            }
        ],
    }
    modo = "FINAL (consume creditos, SIN marca de agua)" if args.final else "TEST (gratis, CON marca de agua)"
    print(f"Generando [{modo}] · {args.formato} {w}x{h} · avatar {avatar[:14]}... · voz {voz[:14]}...")

    resp = pedir("POST", "/v2/video/generate", body=payload)
    vid = (resp.get("data") or {}).get("video_id")
    if not vid:
        sys.exit(f"ERROR: sin video_id en la respuesta: {resp}")
    print(f"video_id: {vid} — esperando render (polling cada 8s)...")

    t0 = time.time()
    timeout = 15 * 60
    while True:
        st = (pedir("GET", "/v1/video_status.get", query={"video_id": vid}).get("data", {})) or {}
        estado = st.get("status")
        if estado == "completed":
            url = st.get("video_url")
            dur = st.get("duration")
            print(f"OK, listo ({dur}s). Descargando...")
            os.makedirs(os.path.dirname(os.path.abspath(args.salida)), exist_ok=True)
            urllib.request.urlretrieve(url, args.salida)
            print(f"Guardado: {args.salida}")
            print("Siguiente: usalo como talking-head en Remotion (ver manuales/edicion-video/heygen.md).")
            return
        if estado == "failed":
            sys.exit(f"ERROR: la generacion fallo: {st.get('error')}")
        if time.time() - t0 > timeout:
            sys.exit(f"ERROR: timeout (>15 min). Ultimo estado: {estado}. video_id={vid}")
        print(f"   ... {estado}")
        time.sleep(8)


def main():
    p = argparse.ArgumentParser(description="Integracion HeyGen para video-creator")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("avatares", help="Lista avatares y talking photos")

    pv = sub.add_parser("voces", help="Lista voces")
    pv.add_argument("--idioma", help="Filtra por idioma (p. ej. Spanish)")

    g = sub.add_parser("generar", help="Genera un video de avatar desde texto")
    g.add_argument("--texto", help="Guion (texto directo)")
    g.add_argument("--texto-archivo", help="Ruta a un .md/.txt con el guion")
    g.add_argument("--avatar", help="avatar_id (o HEYGEN_AVATAR_ID en .env)")
    g.add_argument("--voz", help="voice_id (o HEYGEN_VOICE_ID en .env)")
    g.add_argument("--formato", default="16:9", choices=list(DIMS), help="Aspect ratio (def. 16:9)")
    g.add_argument("--titulo", default="video-creator")
    g.add_argument("--fondo", default="#FAFAFA", help="Color de fondo hex (def. #FAFAFA)")
    g.add_argument("--velocidad", type=float, default=1.0, help="Velocidad de voz 0.5-1.5")
    g.add_argument("--final", action="store_true", help="Salida FINAL (consume creditos, sin marca de agua)")
    g.add_argument("--salida", default="proyectos/001/avatar/heygen.mp4", help="Ruta de salida MP4")

    args = p.parse_args()
    {"avatares": cmd_avatares, "voces": cmd_voces, "generar": cmd_generar}[args.cmd](args)


if __name__ == "__main__":
    main()
