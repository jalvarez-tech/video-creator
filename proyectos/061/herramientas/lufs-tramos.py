#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""lufs-tramos.py — sonoridad integrada (ebur128, LUFS) y pico de uno o varios tramos de un WAV.

Uso (desde la raíz del repo):
  uv run proyectos/061/herramientas/lufs-tramos.py remotion/public/recorrido-061/musica-061.wav 142.1:3.9 148.9:7.4 162.0:6.9
  (cada tramo es <desde_s>:<duración_s>, en segundos del WAV)

Sirve para fijar `LUFS_SOLA` de `audio-061.ts`: lo que mide la canción SIN normalizar en cada tramo donde suena sola (el dron, el recorrido 1 y el
recorrido 2); la ganancia de cada tramo (`gananciaHasta(LUFS, −15)`) la deja a −15 LUFS, el nivel de la voz.
"""
import re
import subprocess
import sys

wav = sys.argv[1]
for t in sys.argv[2:]:
    desde, dur = t.split(":")
    r = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-ss", desde, "-t", dur, "-i", wav, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    i = re.findall(r"\n\s+I:\s+(-?[\d.]+) LUFS", r)
    p = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r)
    print(f"{desde:>8s} s +{dur:>5s} s  →  {i[-1] if i else '?':>6s} LUFS · pico {p[-1] if p else '?'} dBFS")
