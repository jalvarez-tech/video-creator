#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
silabas.py — los NÚCLEOS SILÁBICOS de una voz (picos de energía suavizada), para contar sílabas y llevar un subtítulo a su palabra.

Uso (desde la raíz del repo):
  uv run proyectos/058/herramientas/silabas.py remotion/public/recorrido-058/hk02.wav 0.05 3.75 0.6      (wav, desde, hasta, prominencia en dB)

POR QUÉ EXISTE. En el 058 el DTW de whisper puso líneas 3-9 f pronto a mitad de frase y `palabras-desde.py` devolvió texto inventado en tramos
cortos. `onsets-voz.py` da los valles de las oclusivas (/p/, /d/, /k/), pero no todas las palabras empiezan por una. Aquí: energía en 250-3000 Hz
cada 5 ms, suavizada 40 ms, y los picos con la prominencia dada: con 0,6 dB salen ≈ 26 picos en una frase de 27 sílabas. Se cuenta desde una
pausa conocida (una coma, el valle de −60 dB tras una palabra) y se reparten las sílabas de cada palabra sobre los picos. Es un APOYO: dos
sílabas pegadas dan un solo pico, y una palabra sin onset propio queda a ±3 f.
"""
import sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, find_peaks
p, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
prom = float(sys.argv[4]) if len(sys.argv) > 4 else 2.5
x, sr = sf.read(p)
if x.ndim > 1: x = x.mean(axis=1)
sos = butter(4, [250, 3000], btype="band", fs=sr, output="sos")
y = sosfilt(sos, x)
h = int(sr*0.005)
n = len(y)//h
e = np.array([np.sqrt(np.mean(y[i*h:(i+1)*h]**2)+1e-12) for i in range(n)])
# suavizado de 40 ms
k = 8
es = np.convolve(e, np.ones(k)/k, mode="same")
db = 20*np.log10(es)
i0, i1 = int(a/0.005), int(b/0.005)
pk, props = find_peaks(db[i0:i1], prominence=prom, distance=int(0.06/0.005))
print(f"{len(pk)} picos de energía (nucleos silábicos) entre {a} y {b} s:")
print(" ".join(f"{(i0+i)*0.005:.3f}" for i in pk))
