"""Mide cada vídeo de una carpeta con ffprobe y guarda un JSON por carpeta.

Uso (desde la raíz): uv run proyectos/097/herramientas/medir.py <carpeta> <salida.json>

Por qué: antes de contar un solo frame hay que saber la resolución, el fps, la
rotación y la transferencia REALES (R01, R19, R21): el iPhone graba en HLG y
guarda la orientación como metadato, no en los píxeles.
"""
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path


def hora_local(tags: dict):
    """El iPhone guarda la hora local con su desfase («…T15:58:18-0500»); el DJI, en UTC
    («…T20:26:15.000000Z»). Para poner los dos en una misma cronología, el UTC se pasa
    a la hora local de esta máquina, con el mismo formato que el del iPhone."""
    h = tags.get("com.apple.quicktime.creationdate") or tags.get("creation_time")
    if h and h.endswith("Z"):
        d = datetime.fromisoformat(h.replace("Z", "+00:00")).astimezone()
        return d.strftime("%Y-%m-%dT%H:%M:%S%z")
    return h


def probe(ruta: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(ruta)],
        capture_output=True, text=True, check=True,
    ).stdout
    d = json.loads(out)
    v = next(s for s in d["streams"] if s["codec_type"] == "video")
    a = next((s for s in d["streams"] if s["codec_type"] == "audio"), None)
    rot = 0
    for sd in v.get("side_data_list", []):
        if "rotation" in sd:
            rot = int(sd["rotation"])
    num, den = (int(x) for x in v["avg_frame_rate"].split("/"))
    w, h = int(v["width"]), int(v["height"])
    # lo que se VE: con rotación de ±90 se intercambian ancho y alto
    vw, vh = (h, w) if abs(rot) % 180 == 90 else (w, h)
    return {
        "archivo": ruta.name,
        "duracion": round(float(d["format"]["duration"]), 3),
        "ancho": vw, "alto": vh,
        "orientacion": "horizontal" if vw > vh else ("vertical" if vh > vw else "cuadrado"),
        "rotacion": rot,
        "fps": round(num / den, 3) if den else None,
        "codec": v["codec_name"],
        "transferencia": v.get("color_transfer"),
        "hdr": v.get("color_transfer") in ("arib-std-b67", "smpte2084"),
        "audio": bool(a),
        "audio_canales": a.get("channels") if a else 0,
        # Pista de audio espacial del iPhone (APAC): ffmpeg no la decodifica y, si la
        # elige por su cuenta, falla al extraer el audio. Hay que pedir `-map 0:a:0`.
        "audio_espacial": any(s.get("codec_tag_string") == "apac" for s in d["streams"] if s["codec_type"] == "audio"),
        "creado": hora_local(d["format"].get("tags", {})),
        # SAR distinto de 1:1 = píxeles no cuadrados (anamórfico): hay que escalar antes de recortar.
        "sar": v.get("sample_aspect_ratio", "1:1"),
        "bytes": int(d["format"]["size"]),
    }


carpeta, salida = Path(sys.argv[1]), Path(sys.argv[2])
filas = [probe(p) for p in sorted({*carpeta.glob("*.MOV"), *carpeta.glob("*.mov"), *carpeta.glob("*.MP4"), *carpeta.glob("*.mp4")})]
salida.parent.mkdir(parents=True, exist_ok=True)
salida.write_text(json.dumps(filas, indent=1, ensure_ascii=False))
total = sum(f["duracion"] for f in filas)
print(f"{len(filas)} vídeos · {total/60:.1f} min")
for f in filas:
    print(f"{f['archivo']}  {f['duracion']:7.2f} s  {f['ancho']}x{f['alto']} {f['orientacion'][:5]}  rot {f['rotacion']:4d}  "
          f"{f['fps']} fps  {f['transferencia']}  audio {f['audio_canales']}  {f['creado']}")
