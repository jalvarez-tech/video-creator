#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""luma-frames.py <carpeta_antes> <carpeta_despues> f1,f2,… — la luma media (72 % de arriba, sin la franja de subtítulos) y los percentiles 5/50/95 de cada fotograma, antes y después de graduar."""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
def luma(carp, f):
    a = np.asarray(Image.open(Path(carp) / f"Recorrido067-f{f:05d}.png").convert("RGB"), dtype=float)
    a = a[: int(a.shape[0] * 0.72)]
    y = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    return y.mean(), np.percentile(y, [5, 50, 95]).round(0)
antes, despues = sys.argv[1], sys.argv[2]
for f in [int(x) for x in sys.argv[3].split(",")]:
    a, pa = luma(antes, f)
    d, pd = luma(despues, f)
    print(f"f{f:5d} antes {a:6.1f} p5/50/95 {pa} | después {d:6.1f} {pd}")
