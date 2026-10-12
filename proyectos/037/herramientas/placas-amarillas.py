#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""placas-amarillas.py — ¿queda algún píxel amarillo de placa colombiana (R alto, G medio-alto, B bajo) en un clip? Cuenta por fotograma y dice dónde.

Uso (desde la raíz del repo):
  uv run proyectos/037/herramientas/placas-amarillas.py remotion/public/recorrido-037/hk08.mp4 [--cada 3] [--sin-tapar proyectos/037/original/IMG_9418.MOV]

POR QUÉ EXISTE. El hook (HK08) se tapa con recuadros que siguen las dos placas (`TAPAR` de `normalizar.mjs`); las claves salen de medidas a mano y un recuadro que
llega un fotograma tarde deja ver el borde amarillo. Esto lo comprueba SOBRE EL CLIP YA NORMALIZADO, fotograma a fotograma, sin fiarse del ojo.
Las placas colombianas de servicio particular son amarillas (H 45-60°, S alta, V alta): se cuentan los píxeles con R > 200, 140 < G < 230, B < 90 y R − B > 140,
y se agrupan las que quedan juntas (≥ 12 píxeles en una caja de 40 px).
"""
import argparse
import io
import subprocess

import numpy as np
from PIL import Image

a = argparse.ArgumentParser()
a.add_argument("clip")
a.add_argument("--cada", type=int, default=3, help="un fotograma de cada N")
a.add_argument("--ancho", type=int, default=648)
x = a.parse_args()

raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", x.clip, "-vf", f"scale={x.ancho}:-2,format=rgb24", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
w = x.ancho
h = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", x.clip], capture_output=True, text=True).stdout.strip().split(",")
alto = round(w * int(h[1]) / int(h[0]) / 2) * 2
n = len(raw) // (w * alto * 3)
f = np.frombuffer(raw[: n * w * alto * 3], dtype=np.uint8).reshape(n, alto, w, 3).astype(int)
print(f"{x.clip}: {n} fotogramas de {w}×{alto}")
malos = 0
for i in range(0, n, x.cada):
    r, g, b = f[i, :, :, 0], f[i, :, :, 1], f[i, :, :, 2]
    m = (r > 200) & (g > 140) & (g < 230) & (b < 90) & (r - b > 140)
    c = int(m.sum())
    if c >= 12:
        ys, xs = np.nonzero(m)
        malos += 1
        print(f"  f{i:4d} ({i / 30:5.2f} s): {c:4d} px amarillos en x {xs.min() / w:.2f}-{xs.max() / w:.2f}, y {ys.min() / alto:.2f}-{ys.max() / alto:.2f}")
print("LIMPIO: ningún fotograma con amarillo de placa" if not malos else f"{malos} fotogramas con amarillo")
