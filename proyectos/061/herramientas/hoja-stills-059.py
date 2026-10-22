#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-stills-061.py — monta una hoja con los stills de `stills-multiples.mjs` (Recorrido061-fNNNNN.png), con su frame y su hora.
Uso (desde la raíz del repo): uv run proyectos/061/herramientas/hoja-stills-061.py <carpeta> <salida.png> <columnas> <ancho_px> <f1,f2,…>"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

carpeta, salida, cols, w, lista = Path(sys.argv[1]), sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), [int(x) for x in sys.argv[5].split(",")]
h = int(w * 16 / 9)
filas = (len(lista) + cols - 1) // cols
hoja = Image.new("RGB", (cols * w, filas * h), (16, 16, 16))
for i, f in enumerate(lista):
    p = carpeta / f"Recorrido061-f{f:05d}.png"
    im = Image.open(p).convert("RGB").resize((w, h), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, w, 14), fill=(0, 0, 0))
    d.text((3, 2), f"f{f} · {f/30:.2f} s", fill=(255, 255, 0))
    hoja.paste(im, ((i % cols) * w, (i // cols) * h))
hoja.save(salida)
print(salida, hoja.size)
