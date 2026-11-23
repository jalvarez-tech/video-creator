#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
medir-cancion.py — el mapa de «Lo harás otra vez» (pista) para el 100: sonoridad, golpes y dónde hay VOZ CANTADA.

Uso (desde la raíz):
  uv run proyectos/100/herramientas/medir-cancion.py "archivos/musica/Lo harás otra vez - Elevation Worship (pista).mp3" proyectos/100/musica/mapa-cancion.json

Escribe un JSON con:
  · `rms`: RMS de 1 s a saltos de 0,5 s (dBFS, banda entera) — las partes de la canción;
  · `voz`: la proporción de energía en la banda de la voz cantada (300-3400 Hz) frente al total, y su «modulación» a 4-8 Hz
    (la sílaba): una pista instrumental pura tiene la banda de voz sin modulación silábica; un coro o una voz guía sí la tienen;
  · `golpes`: subidas de ≥ 6 dB en 15 ms de la banda 80-3000 Hz (el detector de `proyectos/028/herramientas/golpes-json.py`),
    con su fuerza. Es lo que manda en los cortes de imagen.
No oye: lo de la voz es una sospecha que se confirma con whisper sobre la pista y escuchando.
"""
import json
import subprocess
import sys

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

ruta, salida = sys.argv[1], sys.argv[2]
SR = 48000
raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
dur = len(y) / SR

# 1 · sonoridad por partes
paso, ventana = int(0.5 * SR), int(1.0 * SR)
rms = []
for i in range(0, len(y) - ventana, paso):
    seg = y[i : i + ventana]
    rms.append([round(i / SR, 1), round(float(20 * np.log10(np.sqrt(np.mean(seg**2)) + 1e-12)), 1)])

# 2 · banda de voz y su modulación silábica (envolvente a 4-8 Hz)
voz_sos = butter(4, [300, 3400], btype="band", fs=SR, output="sos")
yv = sosfilt(voz_sos, y)
hop = int(0.01 * SR)
env = np.sqrt(np.convolve(yv**2, np.ones(hop) / hop, mode="same")[::hop] + 1e-12)  # 100 Hz
env_db = 20 * np.log10(env)
voz = []
for i in range(0, len(env) - 300, 100):  # ventanas de 3 s a saltos de 1 s
    e = env[i : i + 300]
    e = e - e.mean()
    esp = np.abs(np.fft.rfft(e * np.hanning(len(e)))) ** 2
    fr = np.fft.rfftfreq(len(e), d=0.01)
    sil = esp[(fr >= 3.5) & (fr <= 8)].sum()
    lenta = esp[(fr >= 0.3) & (fr < 3.5)].sum() + 1e-12
    voz.append([i / 100, round(float(sil / lenta), 3), round(float(env_db[i : i + 300].mean()), 1)])

# 3 · golpes
sos = butter(4, [80, 3000], btype="band", fs=SR, output="sos")
b = sosfilt(sos, y)
win, hop1 = int(0.006 * SR), int(0.001 * SR)
e = np.sqrt(np.convolve(b**2, np.ones(win) / win, mode="valid")[::hop1] + 1e-12)
db = 20 * np.log10(e)
sub = db[15:] - db[:-15]
picos, _ = find_peaks(sub, height=6.0, distance=120)
golpes = []
for p in picos:
    k = p
    while k > 0 and db[k] > db[k - 1] - 0.05:
        k -= 1
    golpes.append({"t": round(k / 1000.0, 3), "db": round(float(sub[p]), 1), "nivel": round(float(db[p + 15]), 1)})

json.dump({"pista": ruta, "dur": round(dur, 3), "rms": rms, "voz": voz, "golpes": golpes}, open(salida, "w"), indent=0, ensure_ascii=False)
print(f"{dur:.1f} s · {len(golpes)} golpes ≥ 6 dB · {sum(1 for g in golpes if g['db'] >= 12)} ≥ 12 dB")
