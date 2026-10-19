#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""ventanas-prueba.py — el fotograma 16:9 COMPLETO de un clip en varios instantes, con las ventanas 9:16 candidatas dibujadas encima.

Uso (desde la raíz del repo):
  uv run proyectos/042/herramientas/ventanas-prueba.py <clip.MOV|MP4> <salida.jpg> --t 10.6 11.8 12.9 --centros 0.35 0.45 0.55 [--alto 1.0]

POR QUÉ EXISTE. El encargo de la V17 pide «antes de fiarte del seguimiento, mira el fotograma completo de cada clip» y «mira el borde de cada
plano: que no entren placas de carros, teles encendidas, inodoros ni destellos de lente». Un recorte de 9:16 solo enseña lo que queda DENTRO;
esto enseña el cuadro entero con la franja de cada candidata (un color por centro, su número arriba), en el primer, el del medio y el último
instante del tramo, para ver qué entra por cada borde mientras la cámara se mueve. La ventana elegida va a `MANUAL` de `encuadre.py`.
"""
import argparse
import io
import subprocess

from PIL import Image, ImageDraw

COLORES = [(255, 60, 60), (255, 200, 0), (0, 220, 120), (0, 170, 255), (220, 90, 255), (255, 255, 255), (255, 130, 0)]

a = argparse.ArgumentParser()
a.add_argument("clip")
a.add_argument("salida")
a.add_argument("--t", nargs="+", type=float, required=True)
a.add_argument("--centros", nargs="+", type=float, default=[0.3, 0.4, 0.5, 0.6, 0.7])
a.add_argument("--alto", type=float, default=1.0, help="alto de la ventana como fracción del alto del clip (1 = completo)")
a.add_argument("--ancho", type=int, default=960, help="ancho de cada fotograma en la hoja")
x = a.parse_args()

filas = []
for t in x.t:
    png = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", x.clip, "-frames:v", "1", "-vf", f"scale={x.ancho}:-2", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True,
        check=True,
    ).stdout
    im = Image.open(io.BytesIO(png)).convert("RGB")
    W, H = im.size
    d = ImageDraw.Draw(im)
    oh = H * x.alto
    ow = oh * 9 / 16
    for k, c in enumerate(x.centros):
        col = COLORES[k % len(COLORES)]
        x0 = max(0, min(W - ow, c * W - ow / 2))
        y0 = (H - oh) / 2
        d.rectangle((x0, y0, x0 + ow, y0 + oh), outline=col, width=3)
        d.rectangle((x0 + 2, y0 + 2 + 18 * k, x0 + 52, y0 + 18 + 18 * k), fill=(0, 0, 0))
        d.text((x0 + 5, y0 + 4 + 18 * k), f"{c:.2f}", fill=col)
    d.rectangle((0, H - 20, 70, H), fill=(0, 0, 0))
    d.text((4, H - 17), f"t={t:.2f}s", fill=(255, 255, 0))
    filas.append(im)
hoja = Image.new("RGB", (filas[0].width, sum(f.height for f in filas)), (0, 0, 0))
y = 0
for f in filas:
    hoja.paste(f, (0, y))
    y += f.height
hoja.save(x.salida, quality=85)
print(x.salida)
