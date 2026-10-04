#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow", "scipy"]
# ///
"""
legibilidad.py — ¿se lee el texto blanco SIN sombra sobre ESTE metraje? Medido igual que la pieza aprobada (017).

Uso (desde la raíz del repo; los stills a 1080×1920 los deja `stills-multiples.mjs Recorrido019 1 <carpeta> <frames> angle`):
  uv run proyectos/019/herramientas/legibilidad.py proyectos/019/pruebas-720p/stills-1080 125 195 620 690 1090 1110

Método (el del 018, `aprendizajes.md` §3): en cada fotograma, la franja del texto (y 1380-1640); los píxeles de texto (luma ≥ 225, dilatados
3 px) se excluyen; y se compara el blanco al 90 % (la opacidad de los subtítulos) contra el percentil 90 y el 99 del FONDO, en luminancia relativa
sRGB: contraste = (L_texto + 0,05) / (L_fondo + 0,05). No hay umbral universal para un texto sin sombra sobre vídeo: lo que se compara es esta pieza
contra la aprobada (017: 2,9-3,7 : 1 al p90 y 2,6-3,0 al p99; 018: 2,8-4,1 y 2,3-3,5).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation

OPACIDAD = 0.9


def lin(c: np.ndarray) -> np.ndarray:
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def main() -> None:
    carpeta = Path(sys.argv[1])
    print(f"{'frame':>6s} | {'p90 fondo':>9s} {'contraste p90':>13s} | {'p99 fondo':>9s} {'contraste p99':>13s}")
    todos90, todos99 = [], []
    for f in sys.argv[2:]:
        a = np.asarray(Image.open(carpeta / f"Recorrido019-f{int(f):05d}.png").convert("RGB"), dtype=float)
        franja = a[1380:1640]
        luma = 0.2126 * franja[..., 0] + 0.7152 * franja[..., 1] + 0.0722 * franja[..., 2]
        texto = binary_dilation(luma >= 225, iterations=3)
        fondo = ~texto
        L = 0.2126 * lin(franja[..., 0]) + 0.7152 * lin(franja[..., 1]) + 0.0722 * lin(franja[..., 2])
        p90, p99 = np.percentile(L[fondo], [90, 99])
        # el texto blanco al 90 % sobre ese fondo: 0,9·1 + 0,1·L_fondo
        t90 = OPACIDAD + (1 - OPACIDAD) * p90
        t99 = OPACIDAD + (1 - OPACIDAD) * p99
        c90, c99 = (t90 + 0.05) / (p90 + 0.05), (t99 + 0.05) / (p99 + 0.05)
        todos90.append(c90)
        todos99.append(c99)
        print(f"{int(f):6d} | {p90:9.3f} {c90:11.2f} :1 | {p99:9.3f} {c99:11.2f} :1")
    print(f"\n  p90: {min(todos90):.1f}-{max(todos90):.1f} : 1 · p99: {min(todos99):.1f}-{max(todos99):.1f} : 1   (017: 2,9-3,7 / 2,6-3,0 · 018: 2,8-4,1 / 2,3-3,5)")


if __name__ == "__main__":
    main()
