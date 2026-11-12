#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-puntos.py — una hoja con los fotogramas `clip@segundo` que se le pidan (clips normalizados de `remotion/public/recorrido-076/`).

  uv run proyectos/076/herramientas/hoja-puntos.py salida.png [--ancho 200] [--cols 6] rc11@5.6 rc11@6.9 zs05@3.0 …
"""
import subprocess, sys, io
from pathlib import Path
from PIL import Image, ImageDraw
a = sys.argv[1:]
salida = a.pop(0)
ancho, cols = 200, 6
if "--ancho" in a: i = a.index("--ancho"); ancho = int(a[i+1]); del a[i:i+2]
if "--cols" in a: i = a.index("--cols"); cols = int(a[i+1]); del a[i:i+2]
alto = int(ancho * 16 / 9)
RAIZ = Path(__file__).resolve().parents[3]
cel = []
for p in a:
    n, t = p.split("@")
    ruta = RAIZ / "remotion/public/recorrido-076" / f"{n}.mp4"
    r = subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",t,"-i",str(ruta),"-frames:v","1","-vf",f"scale={ancho}:{alto}","-f","image2pipe","-vcodec","png","-"],capture_output=True)
    cel.append((p, Image.open(io.BytesIO(r.stdout)).convert("RGB")))
filas = (len(cel) + cols - 1) // cols
img = Image.new("RGB", (cols * ancho, filas * (alto + 14)), (20, 20, 20))
d = ImageDraw.Draw(img)
for k, (p, c) in enumerate(cel):
    x, y = (k % cols) * ancho, (k // cols) * (alto + 14)
    img.paste(c, (x, y)); d.text((x + 3, y + alto + 1), p, fill=(255, 220, 80))
img.save(salida); print(salida, img.size)
