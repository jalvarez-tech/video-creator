#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
pico-audio.py — el pico de muestra de un MP4/WAV, en dB, y dónde cae, más el máximo de cada tramo de 4 s.

Uso (desde la raíz del repo):
  uv run proyectos/045/herramientas/pico-audio.py proyectos/045/pruebas-720p/045-recorrido.mp4

POR QUÉ EXISTE (045, V27). `ebur128=peak=true` da el pico de TODA la pieza pero no dónde: la prueba 1 midió 0,0 dBFS y esto dijo «37,23 s» (el f1117: el golpe de 15,5 dB en que entra el CTA, más fuerte
que todo el bloque 5 de la canción, con la ganancia que la pieza le da). La música sola no pasa de −0,5 dBFS en ningún tramo: si pasa, el MP4 satura al decodificarse (el AAC se pasa unas décimas).
"""
import subprocess
import sys

import numpy as np

raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", sys.argv[1], "-ac", "2", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
y = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)
m = np.abs(y).max(axis=1)
print("pico de muestra %.2f dBFS en %.2f s" % (20 * np.log10(m.max()), np.argmax(m) / 48000))
for a in range(0, int(len(m) / 48000) + 1, 4):
    seg = m[a * 48000 : (a + 4) * 48000]
    if len(seg):
        print(f"  {a:3d}-{a + 4:3d} s  {20 * np.log10(seg.max() + 1e-9):6.2f} dBFS")
