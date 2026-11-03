#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
perfil-cancion.py — la forma de una canción ENTERA: su energía RMS (dB) cada N segundos, con una barra, para ver dónde están la intro, las mesetas y las caídas antes de elegir el tramo.

Uso (desde la raíz del repo):
  uv run proyectos/065/herramientas/perfil-cancion.py "archivos/musica/deadmau5 - Strobe.mp3" [--paso 5] [--desde 0] [--hasta fin]

El RMS es de banda ancha y relativo a la propia pista (dBFS de la mezcla decodificada a mono): sirve para COMPARAR tramos dentro de una canción, no para fijar el nivel de la pieza (eso es `medir-pista.py`, que mide LUFS).
"""
import argparse
import subprocess

import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("pista")
ap.add_argument("--paso", type=float, default=5.0)
ap.add_argument("--desde", type=float, default=0.0)
ap.add_argument("--hasta", type=float, default=None)
a = ap.parse_args()

SR = 24000
raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", a.pista, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
dur = len(y) / SR
hasta = a.hasta if a.hasta is not None else dur
t = a.desde
while t < hasta - 1e-6:
    seg = y[int(t * SR) : int(min(t + a.paso, dur) * SR)]
    if len(seg) == 0:
        break
    rms = 20 * np.log10(np.sqrt(np.mean(seg**2)) + 1e-9)
    pico = 20 * np.log10(np.max(np.abs(seg)) + 1e-9)
    barra = "#" * max(0, int((rms + 50) * 1.2))
    print(f"{t:7.1f}s {int(t)//60}:{t%60:04.1f}  rms {rms:6.1f}  pico {pico:6.1f}  {barra}")
    t += a.paso
print(f"duración {dur:.2f} s")
