#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""perfil-voz.py — la energía de la banda de voz (300-3400 Hz) cada 40 ms en filas de 10 (0,4 s por fila), relativa al pico de la toma.
Uso: uv run proyectos/068/herramientas/perfil-voz.py remotion/public/recorrido-068/ct01.wav [--paso 0.04]
Cada número es −dB bajo el pico (00 = el pico); un valle de 30 o más es un silencio, de 20 a 30 un respiro dentro de la frase."""
import argparse
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("--paso", type=float, default=0.04)
a = ap.parse_args()
x, sr = sf.read(a.audio)
if x.ndim > 1:
    x = x.mean(axis=1)
y = sosfilt(butter(4, [300, 3400], btype="band", fs=sr, output="sos"), x)
n = int(a.paso * sr)
rms = np.array([np.sqrt(np.mean(y[i : i + n] ** 2)) + 1e-12 for i in range(0, len(y) - n, n)])
db = 20 * np.log10(rms / rms.max())
for i in range(0, len(db), 10):
    print(f"{i * a.paso:5.2f} | " + " ".join(f"{min(99, int(round(-v))):02d}" for v in db[i : i + 10]))
