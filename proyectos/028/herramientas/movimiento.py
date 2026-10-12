#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""movimiento.py — cuánto se mueve la imagen en cada segundo de un clip (diferencia media entre fotogramas, a 108×192 en gris).

Uso: uv run proyectos/028/herramientas/movimiento.py remotion/public/recorrido-028/rc14.mp4 [paso_s=0.5]

Sirve para decidir dónde acelerar un plano continuo: un tramo de tránsito (pared, pasillo, giro) se mueve mucho y no enseña nada nuevo;
un tramo que se detiene en algo (la vista, la isla) se mueve poco. No decide solo: se lee junto a la hoja de contactos."""
import subprocess, sys
import numpy as np

src = sys.argv[1]
paso = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5
W, H = 108, 192
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))  # d[i] = cambio entre el fotograma i y el i+1
fps = 30
n = int(paso * fps)
for i in range(0, len(d), n):
    v = d[i:i + n].mean()
    print(f"{i / fps:6.2f}-{(i + n) / fps:6.2f} s  {v:6.2f}  {'#' * int(v * 2)}")
