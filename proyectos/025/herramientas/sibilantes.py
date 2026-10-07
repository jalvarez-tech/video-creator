#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""sibilantes.py — energía de la banda de las /s/ (4-9 kHz) frente a la de la voz (300-3400 Hz), cada 20 ms: ¿hay una fricativa
entre dos sílabas? Sirve para distinguir «habitación» de «visitación» (la 2.ª sílaba lleva /s/) o «balcón» de «alcohol».
Uso: uv run proyectos/025/herramientas/sibilantes.py voz.wav --desde 0.5 --hasta 2.0"""
import argparse
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
a = argparse.ArgumentParser(); a.add_argument("wav"); a.add_argument("--desde", type=float, default=0); a.add_argument("--hasta", type=float, default=99)
x = a.parse_args(); y, sr = sf.read(x.wav); y = y if y.ndim == 1 else y.mean(1)
def banda(lo, hi): return sosfilt(butter(4, [lo, hi], "band", fs=sr, output="sos"), y)
s, v = banda(4000, 9000), banda(300, 3400)
w = int(0.02 * sr); t = x.desde
print(" t(s)   voz(dB)  /s/(dB)  razon(s-v)")
while t < min(x.hasta, len(y) / sr - 0.02):
    i = int(t * sr); ev = 20 * np.log10(np.sqrt(np.mean(v[i:i+w]**2)) + 1e-9); es = 20 * np.log10(np.sqrt(np.mean(s[i:i+w]**2)) + 1e-9)
    print(f"{t:5.2f}  {ev:7.1f}  {es:7.1f}  {es-ev:6.1f} " + ("#" * max(0, int((es + 70) / 2)) ))
    t += 0.02
