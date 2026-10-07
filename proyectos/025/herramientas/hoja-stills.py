#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-stills.py — una hoja de contactos con los PNG de una carpeta, con su frame escrito.
Uso: uv run proyectos/025/herramientas/hoja-stills.py <carpeta> <salida.png> [columnas=9] [ancho=200]"""
import re, sys, glob
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 9
w = int(sys.argv[4]) if len(sys.argv) > 4 else 200
fs = sorted(glob.glob(f"{d}/*.png"), key=lambda f: int(re.findall(r"\d+", f.split("/")[-1])[-1]))
ims = [Image.open(f).convert("RGB") for f in fs]
h = int(w * ims[0].height / ims[0].width)
filas = (len(ims) + cols - 1) // cols
hoja = Image.new("RGB", (cols * w, filas * h), (16, 16, 16))
for i, (f, im) in enumerate(zip(fs, ims)):
    t = im.resize((w, h))
    dr = ImageDraw.Draw(t)
    n = re.findall(r"\d+", f.split("/")[-1])[-1].lstrip("0") or "0"
    dr.rectangle((0, 0, 44, 15), fill=(0, 0, 0))
    dr.text((3, 2), "f" + n, fill=(255, 255, 0))
    hoja.paste(t, ((i % cols) * w, (i // cols) * h))
hoja.save(out)
print(out, hoja.size)
