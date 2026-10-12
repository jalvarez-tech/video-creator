#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-clip.py — una hoja de fotogramas (cuadro 16:9 ENTERO, con su segundo) de un tramo de un clip, para elegir el tramo y la ventana.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/hoja-clip.py <clip> <salida.jpg> --t0 0 --t1 8 --paso 0.5 [--cols 4] [--ancho 330] [--centros 0.4 0.5]

Dibuja, si se piden, la ventana 9:16 (a altura completa) de cada `--centros`, para ver qué entra por cada borde en cada instante.
"""
import argparse
import io
import subprocess

from PIL import Image, ImageDraw

COLORES = [(255, 60, 60), (0, 220, 120), (0, 170, 255), (255, 200, 0)]
a = argparse.ArgumentParser()
a.add_argument("clip")
a.add_argument("salida")
a.add_argument("--t0", type=float, default=0.0)
a.add_argument("--t1", type=float, default=5.0)
a.add_argument("--paso", type=float, default=0.5)
a.add_argument("--cols", type=int, default=4)
a.add_argument("--ancho", type=int, default=330)
a.add_argument("--centros", nargs="*", type=float, default=[])
x = a.parse_args()

tiles = []
t = x.t0
while t <= x.t1 + 1e-6:
    png = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", x.clip, "-frames:v", "1", "-vf", f"scale={x.ancho}:-2", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True,
    ).stdout
    if png:
        im = Image.open(io.BytesIO(png)).convert("RGB")
        W, H = im.size
        d = ImageDraw.Draw(im)
        ow = H * 9 / 16
        for k, c in enumerate(x.centros):
            x0 = max(0, min(W - ow, c * W - ow / 2))
            d.rectangle((x0, 0, x0 + ow, H - 1), outline=COLORES[k % 4], width=2)
        d.rectangle((0, H - 15, 48, H), fill=(0, 0, 0))
        d.text((3, H - 13), f"{t:.2f}s", fill=(255, 255, 0))
        tiles.append(im)
    t += x.paso
if not tiles:
    raise SystemExit("sin fotogramas")
w, h = tiles[0].size
filas = (len(tiles) + x.cols - 1) // x.cols
hoja = Image.new("RGB", (w * x.cols, h * filas), (0, 0, 0))
for i, im in enumerate(tiles):
    hoja.paste(im, ((i % x.cols) * w, (i // x.cols) * h))
hoja.save(x.salida, quality=85)
print(x.salida, f"{len(tiles)} fotogramas")
