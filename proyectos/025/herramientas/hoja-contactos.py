#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
hoja-contactos.py — una hoja con un fotograma cada N segundos de un MP4, con su hora.

Uso (desde la raíz del repo):
  uv run proyectos/025/herramientas/hoja-contactos.py proyectos/025/pruebas-720p/025-recorrido-720p.mp4 proyectos/025/pruebas-720p/hoja.png
  uv run proyectos/025/herramientas/hoja-contactos.py <mp4> <png> [paso_s=1.5] [columnas=8] [ancho_px=200]

POR QUÉ NO `fps=1/N`. Con una cadencia de salida tan baja (0,67 fps) el filtro `fps` de ffmpeg
elige el ÚLTIMO fotograma de una ventana de ±N/2 s alrededor de cada hora, no el de esa hora: en el
017 la casilla «1,5 s» enseñaba el fotograma 64 (2,1 s). Aquí se selecciona por NÚMERO de fotograma
(`select=not(mod(n,paso·fps))`), que es exacto y no acumula deriva en un vídeo a fps constante
(los MP4 de Remotion lo son). La hoja es un entregable: sus etiquetas tienen que ser ciertas.
"""
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src, salida = sys.argv[1], sys.argv[2]
    paso = float(sys.argv[3]) if len(sys.argv) > 3 else 1.5
    cols = int(sys.argv[4]) if len(sys.argv) > 4 else 8
    ancho = int(sys.argv[5]) if len(sys.argv) > 5 else 200

    # El alto y los fps salen del propio vídeo (no se supone 9:16 ni 30 fps).
    dim = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate", "-of", "csv=p=0:s=,", src],
        capture_output=True, check=True, text=True,
    ).stdout.strip().split(",")
    w0, h0 = int(dim[0]), int(dim[1])
    num, _, den = dim[2].partition("/")
    fps = float(num) / float(den or 1)
    alto = round(ancho * h0 / w0)
    cada = max(1, round(paso * fps))  # fotogramas entre dos casillas

    raw = subprocess.run(
        [
            "ffmpeg", "-nostdin", "-v", "error", "-i", src, "-an", "-fps_mode", "vfr",
            "-vf", f"select='not(mod(n\\,{cada}))',scale={ancho}:{alto}:flags=bilinear",
            "-f", "rawvideo", "-pix_fmt", "rgb24", "-",
        ],
        capture_output=True, check=True,
    ).stdout
    n = len(raw) // (ancho * alto * 3)
    fr = np.frombuffer(raw, dtype=np.uint8)[: n * ancho * alto * 3].reshape(n, alto, ancho, 3)

    filas = (n + cols - 1) // cols
    hoja = Image.new("RGB", (cols * (ancho + 3), filas * (alto + 3)), (15, 15, 15))
    d = ImageDraw.Draw(hoja)
    try:
        f = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 15)
    except OSError:
        f = ImageFont.load_default()
    for i in range(n):
        x, y = (i % cols) * (ancho + 3), (i // cols) * (alto + 3)
        hoja.paste(Image.fromarray(fr[i]), (x, y))
        d.rectangle([x, y, x + 46, y + 19], fill=(0, 0, 0))
        d.text((x + 3, y + 2), f"{i * cada / fps:4.1f}s", fill=(255, 255, 0), font=f)
    hoja.save(salida)
    print(f"{n} fotogramas → {salida}")


if __name__ == "__main__":
    main()
