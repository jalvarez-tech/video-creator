#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""perfil-inicio.py — la energía (dBFS, ventanas de 50 ms) de un tramo de una toma, para ver qué hay ANTES de la primera sílaba.

Uso: uv run proyectos/040/herramientas/perfil-inicio.py md04 0 1.3
"""
import subprocess, sys
import numpy as np
t, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",f"remotion/public/recorrido-040/{t}.wav","-f","f32le","-ac","1","-ar","48000","-"],capture_output=True).stdout
y = np.frombuffer(raw, dtype=np.float32)
for i in np.arange(a, b, 0.05):
    s = y[int(i*48000):int((i+0.05)*48000)]
    print(f"{i:4.2f} {20*np.log10(np.sqrt((s**2).mean())+1e-9):6.1f}", end=" | ")
print()
