#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
verificar-prueba.py — lo que se OYE en una prueba del 099, medido sobre el render (no sobre el plan).

Uso (desde la raíz del repo):
  uv run proyectos/099/herramientas/verificar-prueba.py proyectos/099/pruebas-720p/099-prueba-720p.mp4

Mide:
  1. el pico de muestra y el verdadero (ebur128) de la mezcla entera: tiene que quedar < −1 dBFS;
  2. que la música NUNCA calla: el RMS más bajo en ventanas de 200 ms, del frame 0 al principio del fundido final
     (f1765), no puede caer a silencio (umbral −50 dBFS);
  3. que las voces quedan parejas: la sonoridad de cada ventana de voz medida (`voces-099.ts`, f0-f1) en la MEZCLA
     (voz + música), con la dispersión entre la más alta y la más baja.
"""
import json
import re
import subprocess
import sys

import numpy as np

FPS = 30
FUNDIDO = 1765
video = sys.argv[1]

# Las ventanas de voz, del plan (generado por medir-voces.mjs).
ts = open("remotion/src/proyectos/099/voces-099.ts", encoding="utf8").read()
voces = json.loads(ts[ts.index("= {") + 2 : ts.rindex("}") + 1])

def ebur(args):
    r = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", *args, "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"], capture_output=True, text=True)
    s = r.stderr[r.stderr.rfind("Summary:") :]
    i = re.search(r"I:\s+(-?[\d.]+|-inf) LUFS", s)
    p = re.search(r"Peak:\s+(-?[\d.]+|-inf) dBFS", s)
    return (float(i.group(1)) if i and i.group(1) != "-inf" else -99.0, float(p.group(1)) if p and p.group(1) != "-inf" else -99.0)

# 1 · picos
I, TP = ebur(["-i", video])
pcm = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", video, "-map", "0:a:0", "-ac", "2", "-ar", "48000", "-f", "f32le", "-"], capture_output=True).stdout
x = np.frombuffer(pcm, dtype=np.float32).reshape(-1, 2)
pico_muestra = 20 * np.log10(np.max(np.abs(x)) + 1e-12)
print(f"1 · mezcla: {I:.1f} LUFS · pico verdadero {TP:.2f} dBTP · pico de muestra {pico_muestra:.2f} dBFS  {'OK' if TP < -1 and pico_muestra < -1 else 'PASA DE −1'}")

# 2 · la música nunca calla
m = x.mean(axis=1)
h = int(48000 * 0.2)
fin = int(FUNDIDO / FPS * 48000)
rms = [20 * np.log10(np.sqrt(np.mean(m[i : i + h] ** 2)) + 1e-12) for i in range(0, fin - h, h)]
k = int(np.argmin(rms))
print(f"2 · RMS más bajo antes del fundido: {rms[k]:.1f} dBFS en {k * 0.2:.1f} s (f{int(k * 0.2 * FPS)})  {'OK' if rms[k] > -50 else 'CALLA'}")

# 3 · las voces en la mezcla
filas = []
for vid, v in voces.items():
    if v["f0"] is None:
        continue
    a, b = v["f0"] / FPS, (v["f1"] + 1) / FPS
    li, lp = ebur(["-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", video])
    filas.append((vid, li, lp))
    print(f"   {vid:12s} f{v['f0']:>4}-f{v['f1']:<4} {li:6.1f} LUFS · pico {lp:6.2f} dBTP")
vals = [li for _, li, _ in filas if li > -90]
print(f"3 · voces en la mezcla: de {min(vals):.1f} a {max(vals):.1f} LUFS (dispersión {max(vals) - min(vals):.1f} LU)")
