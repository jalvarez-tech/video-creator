#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
legibilidad-infografia.py — ¿se lee la infografía del 064 sobre el dron? Contraste WCAG del blanco y del oro contra el fondo YA con el velo.

Uso (desde la raíz del repo):
  uv run proyectos/064/herramientas/legibilidad-infografia.py <still-sin-velo.png> <alfa del velo> [--franja 735 1185]

Toma un fotograma del plano de fondo SIN la infografía ni el velo (a cualquier escala), mezcla el velo negro en sRGB (como lo hace el navegador:
canal × (1 − alfa)) y mide, en la franja donde caen los textos (y 735-1185 de 1920), el contraste del blanco y del oro `#c6a878` contra el fondo en
los percentiles 90 y 99 de luminancia (el peor caso: los píxeles más claros del fondo). Criterio: ≥ 4,5 : 1 (texto normal) con el p90 y ≥ 3 : 1 con el p99.
"""
import sys

import numpy as np
from PIL import Image

ruta, alfa = sys.argv[1], float(sys.argv[2])
y0, y1 = (735, 1185)
if "--franja" in sys.argv:
    i = sys.argv.index("--franja")
    y0, y1 = int(sys.argv[i + 1]), int(sys.argv[i + 2])
im = Image.open(ruta).convert("RGB")
w, h = im.size
a = np.asarray(im, dtype=float) / 255.0
a = a[int(y0 / 1920 * h) : int(y1 / 1920 * h)]
a = a * (1 - alfa)  # el velo, mezclado en sRGB
lin = np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)
L = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]


def lum(hexa: str) -> float:
    c = np.array([int(hexa[i : i + 2], 16) / 255 for i in (1, 3, 5)])
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return float(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])


for nombre, color in (("blanco", "#ffffff"), ("oro #c6a878", "#c6a878")):
    Lt = lum(color)
    p90, p99 = np.percentile(L, 90), np.percentile(L, 99)
    print(f"{ruta.split('/')[-1]:28} velo {alfa:.2f} · {nombre:12} p90 {(Lt + 0.05) / (p90 + 0.05):5.1f} : 1 · p99 {(Lt + 0.05) / (p99 + 0.05):5.1f} : 1  (luminancia de fondo p90 {p90:.3f}, p99 {p99:.3f})")
