#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""recortes.py — una región de un clip (a su resolución) en varios instantes, con una rejilla de coordenadas normalizadas, para fijar a mano un recuadro.

Uso (desde la raíz del repo):
  uv run proyectos/046/herramientas/recortes.py <clip> <salida.png> --region x0 y0 x1 y1 --t 0.9 2.2 3.6 [--ancho 640]
  (la región en fracciones del cuadro, origen ARRIBA a la izquierda; la rejilla marca cada 0,02 en x y en y)

POR QUÉ EXISTE. El hook (HK08) lleva la placa amarilla del Mini justo a su lado en todo el tramo y hay que taparla (`TAPAR` de `normalizar.mjs`): para eso se
necesita su posición exacta fotograma a fotograma, y un recorte al 100 % con una rejilla la da.
"""
import argparse
import io
import subprocess

from PIL import Image, ImageDraw

a = argparse.ArgumentParser()
a.add_argument("clip")
a.add_argument("salida")
a.add_argument("--region", nargs=4, type=float, required=True)
a.add_argument("--t", nargs="+", type=float, required=True)
a.add_argument("--ancho", type=int, default=640)
x = a.parse_args()
x0, y0, x1, y1 = x.region
ims = []
for t in x.t:
    png = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", x.clip, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True, check=True).stdout
    im = Image.open(io.BytesIO(png)).convert("RGB")
    W, H = im.size
    r = im.crop((int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H)))
    k = x.ancho / r.width
    r = r.resize((x.ancho, int(r.height * k)), Image.LANCZOS)
    d = ImageDraw.Draw(r)
    paso = 0.02
    i = 0
    xx = (int(x0 / paso) + 1) * paso
    while xx < x1:
        px = (xx - x0) / (x1 - x0) * r.width
        d.line((px, 0, px, 10 if i % 5 else 22), fill=(255, 255, 0))
        if i % 5 == 0:
            d.text((px + 2, 10), f"{xx:.2f}", fill=(255, 255, 0))
        xx += paso
        i += 1
    yy = (int(y0 / paso) + 1) * paso
    i = 0
    while yy < y1:
        py = (yy - y0) / (y1 - y0) * r.height
        d.line((0, py, 10 if i % 5 else 22, py), fill=(0, 255, 255))
        if i % 5 == 0:
            d.text((24, py - 5), f"{yy:.2f}", fill=(0, 255, 255))
        yy += paso
        i += 1
    d.text((r.width - 60, r.height - 14), f"t={t:.2f}", fill=(255, 255, 255))
    ims.append(r)
fila = Image.new("RGB", (sum(i.width for i in ims), max(i.height for i in ims)))
px = 0
for im in ims:
    fila.paste(im, (px, 0))
    px += im.width
fila.save(x.salida)
print(fila.size)
