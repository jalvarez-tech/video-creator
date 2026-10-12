#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
envolvente-voz.py — la energía de la voz (banda 300-3400 Hz) cada 20 ms, para decidir DÓNDE acaba una frase.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/envolvente-voz.py remotion/public/recorrido-038/ct09.wav --desde 2.2 --hasta 3.2

POR QUÉ EXISTE. En las tomas de «5 Cta» Isabella dice la frase que se usa y, sin pausa, el principio de la llamada al
clic («…todos caben cómodos, haz clic en el enlace…»): el corte tiene que caer en el hueco entre las dos, y `limites-voz.py`
solo da pausas de ≥ 150 ms. Aquí se ve la forma: el nivel por ventana, relativo al pico de la toma, y se marcan los valles.
Imprime «t  dB  barra»; un valle por debajo de −30 dB del pico es un silencio, entre −20 y −30 un respiro dentro de la frase.
"""
import argparse
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("--desde", type=float, default=0.0)
ap.add_argument("--hasta", type=float, default=None)
ap.add_argument("--paso", type=float, default=0.02)
a = ap.parse_args()

x, sr = sf.read(a.audio)
if x.ndim > 1:
    x = x.mean(axis=1)
y = sosfilt(butter(4, [300, 3400], btype="band", fs=sr, output="sos"), x)
vent = int(0.02 * sr)
paso = int(a.paso * sr)
niveles = []
for i in range(0, len(y) - vent, paso):
    rms = np.sqrt(np.mean(y[i : i + vent] ** 2)) + 1e-9
    niveles.append((i / sr, 20 * np.log10(rms)))
pico = max(n for _, n in niveles)
hasta = a.hasta if a.hasta is not None else len(y) / sr
for t, n in niveles:
    if a.desde <= t <= hasta:
        rel = n - pico
        barra = "#" * max(0, int((rel + 60) / 2))
        print(f"{t:6.2f}  {rel:6.1f}  {barra}")
