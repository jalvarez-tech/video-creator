#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
perfil-voz.py — el perfil de energía de una voz (banda 300-3400 Hz / banda ancha, en dB) cada N s, para ver dónde empieza y acaba de hablar de verdad.

Uso (desde la raíz del repo):
  uv run proyectos/045/herramientas/perfil-voz.py remotion/public/recorrido-045/hk01.wav 0.6 1.1 0.025
  (argumentos: <wav> <desde_s> <hasta_s> [paso_s=0.05]; imprime `t:dB_banda/dB_total`)

POR QUÉ EXISTE (045, V27). whisper pone la primera palabra de toda toma en 0,00 s (R29) y `limites-voz.py` da 0,00 s sin `--margen` y 1,03 s con `--margen 40` en HK01 (se come
el «El» flojo): el catálogo decía «la voz empieza casi en el f0» y no era cierto (0,82 s). Aquí se ve la forma: el silencio (−60 dB), el resoplido o el chasquido de labios (−31…−47 dB) y
la primera sílaba (−21…−12 dB), y las pausas (−45…−65 dB) que separan las palabras. Es la medida con la que `VENTANA_VOZ` de `normalizar.mjs` y las líneas de los subtítulos se llevaron
a su palabra, junto con `onsets-voz.py` y `palabras-desde.py` (R31).
"""
import sys

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

w, sr = sf.read(sys.argv[1])
d, h = float(sys.argv[2]), float(sys.argv[3])
paso = float(sys.argv[4]) if len(sys.argv) > 4 else 0.05
if w.ndim > 1:
    w = w.mean(axis=1)
b = sosfilt(butter(4, [300, 3400], btype="band", fs=sr, output="sos"), w)
n = int(0.02 * sr)
t = d
out = []
while t < h:
    i = int(t * sr)
    seg, segf = b[i : i + n], w[i : i + n]
    if len(seg) == 0:
        break
    out.append(f"{t:.3f}:{10 * np.log10(np.mean(seg**2) + 1e-12):.0f}/{10 * np.log10(np.mean(segf**2) + 1e-12):.0f}")
    t += paso
print(" ".join(out))
