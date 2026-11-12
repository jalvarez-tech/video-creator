#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""tiras-clips.py — una fila por clip normalizado con un fotograma cada PASO s y su segundo debajo.

  uv run proyectos/076/herramientas/tiras-clips.py salida.png [--paso 0.5] [--ancho 80] clip1 clip2 …   (nombres de `remotion/public/recorrido-076/<nombre>.mp4`)
"""
import subprocess, sys, io
from pathlib import Path
from PIL import Image, ImageDraw
a = sys.argv[1:]
salida = a.pop(0)
paso, ancho = 0.5, 80
if "--paso" in a: i = a.index("--paso"); paso = float(a[i+1]); del a[i:i+2]
if "--ancho" in a: i = a.index("--ancho"); ancho = int(a[i+1]); del a[i:i+2]
alto = int(ancho * 16 / 9)
RAIZ = Path(__file__).resolve().parents[3]
filas = []
for n in a:
    ruta = RAIZ / "remotion/public/recorrido-076" / f"{n}.mp4"
    dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(ruta)],capture_output=True,text=True).stdout)
    t, cuadros = 0.0, []
    while t < dur - 0.05:
        r = subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",f"{t:.3f}","-i",str(ruta),"-frames:v","1","-vf",f"scale={ancho}:{alto}","-f","image2pipe","-vcodec","png","-"],capture_output=True)
        cuadros.append((t, Image.open(io.BytesIO(r.stdout)).convert("RGB")))
        t += paso
    filas.append((n, dur, cuadros))
cols = max(len(f[2]) for f in filas)
W = 60 + cols * ancho
H = len(filas) * (alto + 14)
img = Image.new("RGB", (W, H), (20, 20, 20))
d = ImageDraw.Draw(img)
for k, (n, dur, cuadros) in enumerate(filas):
    y = k * (alto + 14)
    d.text((4, y + 4), f"{n.upper()}\n{dur:.1f}s", fill=(255, 220, 80))
    for j, (t, c) in enumerate(cuadros):
        x = 60 + j * ancho
        img.paste(c, (x, y))
        d.text((x + 2, y + alto), f"{t:.1f}", fill=(200, 200, 200))
img.save(salida)
print(salida, img.size)
