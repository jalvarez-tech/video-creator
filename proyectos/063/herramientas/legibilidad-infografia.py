#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow", "scipy"]
# ///
"""
legibilidad-infografia.py — ¿se lee la infografía «Lo que sí tiene» y la fila de rótulos de la mitad SOBRE el dron y sobre Isabella? Medido sobre stills a 1080×1920 (`stills-multiples.mjs … 1 … angle`).

Uso (desde la raíz del repo):
  uv run proyectos/063/herramientas/legibilidad-infografia.py proyectos/063/pruebas-720p/stills-1080b lista:500 triada:780 triada:708

Método (el de `legibilidad.py`): en cada caja de texto del LAYOUT de `infografia-063.ts`, los píxeles de texto (blanco: luma ≥ 215; oro: cerca de #c6a878) se excluyen y se dilatan 3 px; del FONDO que queda se toma el percentil 95 y el 99 de
luminancia relativa (sRGB) y se compara con el blanco y con el oro: contraste = (L_texto + 0,05) / (L_fondo + 0,05). El texto de la lista es opaco (100 %); el de los rótulos, también.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation

ORO = (0xC6, 0xA8, 0x78)
# cajas (y0, y1) de la lista y de la fila de rótulos, de `infografia-063.ts`; x 100-980
LISTA = {"título": (673, 774), "acueducto": (842, 949), "escrituras": (992, 1099), "área": (1142, 1247)}
TRIADA = {"rótulos": (1340, 1392)}


def lin(c):
    c = np.asarray(c, dtype=float) / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lum(a):
    l = lin(a)
    return 0.2126 * l[..., 0] + 0.7152 * l[..., 1] + 0.0722 * l[..., 2]


def main() -> None:
    carpeta = Path(sys.argv[1])
    L_ORO = float(0.2126 * lin(ORO[0]) + 0.7152 * lin(ORO[1]) + 0.0722 * lin(ORO[2]))
    print(f"{'frame':>6s} {'caja':10s} | {'fondo p95':>9s} {'blanco':>8s} {'oro':>7s} | {'fondo p99':>9s} {'blanco':>8s} {'oro':>7s}")
    for spec in sys.argv[2:]:
        modo, f = spec.split(":")
        cajas = LISTA if modo == "lista" else TRIADA
        a = np.asarray(Image.open(carpeta / f"Recorrido063-f{int(f):05d}.png").convert("RGB"), dtype=float)
        for nombre, (y0, y1) in cajas.items():
            c = a[y0:y1, 100:980]
            blanco = c.min(axis=2) >= 215
            oro = (np.abs(c - np.array(ORO)).sum(axis=2) < 70)
            texto = binary_dilation(blanco | oro, iterations=3)
            fondo = lum(c)[~texto]
            if fondo.size < 100:
                print(f"{f:>6s} {nombre:10s} | (sin fondo medible)")
                continue
            p95, p99 = np.percentile(fondo, [95, 99])
            cb = lambda L: (L + 0.05) / (p + 0.05)  # noqa: E731
            fila = []
            for p in (p95, p99):
                fila.append((p, (1.0 + 0.05) / (p + 0.05), (L_ORO + 0.05) / (p + 0.05)))
            print(f"{f:>6s} {nombre:10s} | {fila[0][0]:9.3f} {fila[0][1]:6.1f}:1 {fila[0][2]:5.1f}:1 | {fila[1][0]:9.3f} {fila[1][1]:6.1f}:1 {fila[1][2]:5.1f}:1")


if __name__ == "__main__":
    main()
