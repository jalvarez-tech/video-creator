#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""luma-clip.py — la luma media (72 % de arriba, como `medir-color.py`) de un clip NORMALIZADO a lo largo de un tramo, cada `paso` segundos.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/luma-clip.py rc18 0 3.2 0.2 [rc12 3.8 6.6 0.2 …]     (clip de remotion/public/recorrido-038/, desde, hasta, paso)

Sirve para elegir DÓNDE empieza y acaba un plano antes de graduar: un corte seco salta en luma si el último fotograma de un plano y el primero del siguiente
tienen niveles distintos, y eso se decide con el tramo (y con el orden), no solo con la exposición de cada plano. La luma es la del fotograma SIN graduar.
"""
import subprocess
import sys

import numpy as np

args = sys.argv[1:]
while args:
    clip, t0, t1, paso = args[0], float(args[1]), float(args[2]), float(args[3])
    args = args[4:]
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t0:.3f}", "-t", f"{t1 - t0:.3f}", "-i", f"remotion/public/recorrido-038/{clip}.mp4", "-vf", f"fps={1 / paso:.4f},scale=108:192,format=rgb24", "-f", "rawvideo", "-"],
        capture_output=True,
        check=True,
    ).stdout
    f = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 192, 108, 3).astype(float)[:, : int(192 * 0.72)]
    y = (0.2126 * f[..., 0] + 0.7152 * f[..., 1] + 0.0722 * f[..., 2]).mean(axis=(1, 2))
    print(f"{clip}: " + " ".join(f"{t0 + i * paso:.1f}s={v:.0f}" for i, v in enumerate(y)))
