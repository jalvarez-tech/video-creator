#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile", "matplotlib"]
# ///
"""
espectro.py — un espectrograma de la voz con el eje de tiempo en segundos de la FUENTE, para ver a ojo dónde acaba una palabra y empieza la siguiente (las pausas son bandas negras) y qué vocal suena.

Uso (desde la raíz del repo):
  uv run proyectos/065/herramientas/espectro.py remotion/public/recorrido-065/hk03.wav salida.png --desde 8.1 --hasta 12.5 [--fmax 5000] [--marcas 9.545 9.82 …]

`--marcas` dibuja líneas verticales (los instantes que se quieren comprobar). Es lo que se usa para llevar cada línea de subtítulo a su palabra cuando whisper y los arranques de sílaba no bastan (R31).
"""
import argparse
import numpy as np
import soundfile as sf
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.signal import spectrogram

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("salida")
ap.add_argument("--desde", type=float, default=0.0)
ap.add_argument("--hasta", type=float, default=None)
ap.add_argument("--fmax", type=float, default=5000)
ap.add_argument("--marcas", type=float, nargs="*", default=[])
a = ap.parse_args()
x, sr = sf.read(a.audio)
if x.ndim > 1:
    x = x.mean(axis=1)
hasta = a.hasta if a.hasta is not None else len(x) / sr
seg = x[int(a.desde * sr) : int(hasta * sr)]
f, t, S = spectrogram(seg, fs=sr, nperseg=int(0.025 * sr), noverlap=int(0.020 * sr), window="hann")
S = 10 * np.log10(S + 1e-12)
m = f <= a.fmax
anchura = max(10, (hasta - a.desde) * 3.2)
fig, ax = plt.subplots(figsize=(anchura, 4.2))
ax.imshow(S[m], origin="lower", aspect="auto", extent=[a.desde + t[0], a.desde + t[-1], 0, a.fmax], vmin=S.max() - 70, vmax=S.max(), cmap="magma")
for z in a.marcas:
    ax.axvline(z, color="cyan", lw=0.8)
ax.set_xticks(np.arange(np.ceil(a.desde * 10) / 10, hasta, 0.1 if (hasta - a.desde) <= 6 else 0.25))
ax.tick_params(axis="x", labelsize=7, rotation=90)
ax.set_ylabel("Hz")
plt.tight_layout()
plt.savefig(a.salida, dpi=80)
print(a.salida)
