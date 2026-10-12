#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""luma-bordes.py — la luma media (72 % de arriba, sin la franja de subtítulos) de los fotogramas de BORDE de cada plano, antes y después del color.

Uso: uv run proyectos/038/herramientas/luma-bordes.py <carpeta_antes> <carpeta_despues> <f1,f2,…>

Es lo que `medir-color.py` no enseña: el nivel de cada lado de un corte. «Que ningún corte salte en luma» se arregla bajando o subiendo la exposición del
plano que se sale, y para saber cuánto hace falta se mira la luma del primero y del último fotograma de cada plano, no la del fotograma de mitad.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def luma(carpeta: Path, f: int) -> float:
    a = np.asarray(Image.open(carpeta / f"Recorrido038-f{f:05d}.png").convert("RGB"), dtype=float)
    a = a[: int(a.shape[0] * 0.72)]
    return float((0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]).mean())


antes, despues = Path(sys.argv[1]), Path(sys.argv[2])
for f in [int(x) for x in sys.argv[3].split(",")]:
    print(f"f{f:5d}  antes {luma(antes, f):6.1f} · después {luma(despues, f):6.1f}")
