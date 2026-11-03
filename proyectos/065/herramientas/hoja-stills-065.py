#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""hoja-stills-065.py — junta los PNG f####.png de una carpeta en una hoja con su número de frame y su segundo.
Uso: uv run proyectos/065/herramientas/hoja-stills-065.py <carpeta> <salida.png> [columnas=6] [ancho=180] [f1,f2,…]"""
import re
import sys
from pathlib import Path
from PIL import Image, ImageDraw
carpeta, salida = Path(sys.argv[1]), sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 6
ancho = int(sys.argv[4]) if len(sys.argv) > 4 else 180
sel = set(int(x) for x in sys.argv[5].split(",")) if len(sys.argv) > 5 else None
fs = sorted(carpeta.glob("*.png"), key=lambda p: int(re.search(r"f(\d+)", p.stem).group(1)))
fs = [p for p in fs if sel is None or int(re.search(r"f(\d+)", p.stem).group(1)) in sel]
ims = []
for p in fs:
    n = int(re.search(r"f(\d+)", p.stem).group(1))
    im = Image.open(p).convert("RGB")
    h = int(ancho * im.size[1] / im.size[0])
    im = im.resize((ancho, h), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 92, 13), fill=(0, 0, 0))
    d.text((3, 1), f"f{n} {n/30:.1f}s", fill=(255, 255, 0))
    ims.append(im)
h = max(i.size[1] for i in ims)
filas = (len(ims) + cols - 1) // cols
hoja = Image.new("RGB", (cols * ancho, filas * h), (20, 20, 20))
for i, im in enumerate(ims):
    hoja.paste(im, ((i % cols) * ancho, (i // cols) * h))
hoja.save(salida)
print(salida, hoja.size)
