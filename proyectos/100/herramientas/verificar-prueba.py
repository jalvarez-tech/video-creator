#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "pyloudnorm"]
# ///
"""
verificar-prueba.py — lo que se OYE en la prueba del 100, medido sobre el render (y la música sola, reconstruida del plan).

Uso (desde la raíz):
  node proyectos/100/herramientas/datos-prueba.mjs proyectos/100/pruebas-720p/datos-prueba.json
  uv run proyectos/100/herramientas/verificar-prueba.py proyectos/100/pruebas-720p/100-otra-vez.mp4 proyectos/100/pruebas-720p/datos-prueba.json

Comprueba:
  1. pico verdadero < −1 dBTP y pico de muestra < −1 dBFS en la mezcla del render;
  2. la MÚSICA nunca calla: la música sola (la fuente × `nivelMusica` del plan, frame a frame) no baja de −45 LUFS momentáneos
     (400 ms) antes del fundido final;
  3. las VOCES parejas: cada voz, sola (su WAV × su ganancia, en su ventana medida), y la mezcla del render en esa ventana;
     y cuánto queda la música por debajo de cada una;
  4. R33: cada corte seco tiene un golpe en el AUDIO DEL RENDER a ≤ 2 f.
Sale con 1 si falla 1, 2 o 4.
"""
import json
import subprocess
import sys

import numpy as np
import pyloudnorm as pyln
from scipy.signal import butter, find_peaks, sosfilt

video, datos_json = sys.argv[1], sys.argv[2]
d = json.load(open(datos_json))
SR = 48000
FPS = d["fps"]
PUB = "remotion/public/"


def lee(ruta, ss=None, t=None, canales=2):
    cmd = ["ffmpeg", "-nostdin", "-v", "error"]
    if ss is not None:
        cmd += ["-ss", f"{ss:.6f}"]
    if t is not None:
        cmd += ["-t", f"{t:.6f}"]
    cmd += ["-i", ruta, "-map", "0:a:0", "-ac", str(canales), "-ar", str(SR), "-f", "f32le", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64).reshape(-1, canales)


fallos = 0
mezcla = lee(video)
med = pyln.Meter(SR)
dbfs = lambda x: 20 * np.log10(max(x, 1e-12))

# 1 · picos
pico = np.abs(mezcla).max()
ebu = subprocess.run(["ffmpeg", "-nostdin", "-i", video, "-map", "0:a:0", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
tp = float([l for l in ebu.splitlines() if "Peak:" in l][-1].split()[1])
integ = float([l for l in ebu.splitlines() if l.strip().startswith("I:")][-1].split()[1])
ok = tp < -1 and dbfs(pico) < -1
fallos += not ok
print(f"{'✅' if ok else '❌'} picos: verdadero {tp:.1f} dBTP · muestra {dbfs(pico):.1f} dBFS · mezcla {integ:.1f} LUFS")

# 2 · la música sola
dur = d["duracion"] / FPS
mus = lee(PUB + d["musicaSrc"], d["inicioMusica"], dur)
n = len(mus)
fr = np.arange(n) / SR * FPS
g = np.interp(fr, np.arange(len(d["musica"])), d["musica"])
mus_g = mus * g[:, None]
ventana = int(0.4 * SR)
paso = int(0.1 * SR)
mom = []
for i in range(0, n - ventana, paso):
    trozo = mus_g[i : i + ventana]
    mom.append((i / SR, med.integrated_loudness(trozo) if np.abs(trozo).max() > 0 else -120))
fin_fundido = (d["duracion"] - 60) / FPS
antes = [x for x in mom if x[0] + 0.4 <= fin_fundido]
peor = min(antes, key=lambda x: x[1])
ok = peor[1] > -45
fallos += not ok
print(f"{'✅' if ok else '❌'} la música sola nunca calla: mínimo {peor[1]:.1f} LUFS momentáneos en {peor[0]:.1f} s (f{int(peor[0] * FPS)}), antes del fundido final")
partes = [("ruptura", 0, 262), ("subida", 262, 538), ("pleno", 538, 1292), ("bajada", 1292, 1491), ("outro", 1491, 1740)]
print("   música sola por partes: " + " · ".join(f"{p} {med.integrated_loudness(mus_g[int(a / FPS * SR):int(b / FPS * SR)]):.1f}" for p, a, b in partes) + " LUFS")

# 3 · las voces
print("   voz (sola) · mezcla en su ventana · música en su ventana:")
for v in d["voces"]:
    w = v["ventana"]
    if not w or w["f0"] is None:
        continue
    f0, f1 = max(w["f0"], v["en"]), min(w["f1"], v["en"] + v["dur"])
    if f1 - f0 < 12:
        continue
    s0 = v["desde"] + (f0 - v["en"]) / FPS
    voz = lee(PUB + v["src"], s0, (f1 - f0) / FPS, 1)[:, 0] * v["ganancia"]
    a, b = int(f0 / FPS * SR), int(f1 / FPS * SR)
    lv = med.integrated_loudness(np.stack([voz, voz], 1)[: b - a]) if len(voz) > SR * 0.4 else float("nan")
    lm = med.integrated_loudness(mezcla[a:b]) if b - a > SR * 0.4 else float("nan")
    lmu = med.integrated_loudness(mus_g[a:b]) if b - a > SR * 0.4 else float("nan")
    print(f"   {v['id']:<16} f{f0}-{f1}  voz {lv:6.1f} · mezcla {lm:6.1f} · música {lmu:6.1f} ({lv - lmu:+.1f} LU) · pico voz {dbfs(np.abs(voz).max()):.1f} dBFS")

# 4 · R33: golpes en el audio del render junto a cada corte
m1 = mezcla.mean(1)
sos = butter(4, [80, 3000], btype="band", fs=SR, output="sos")
bb = sosfilt(sos, m1)
win, hop = int(0.006 * SR), int(0.001 * SR)
e = np.sqrt(np.convolve(bb**2, np.ones(win) / win, mode="valid")[::hop] + 1e-12)
db = 20 * np.log10(e)
sub = db[15:] - db[:-15]
picos, _ = find_peaks(sub, height=6.0, distance=80)
ons = []
for p in picos:
    k = p
    while k > 0 and db[k] > db[k - 1] - 0.05:
        k -= 1
    ons.append((k / 1000.0 * FPS, float(sub[p])))
lejos = 0
linea = []
for c in d["cortes"]:
    cerca = [o for o in ons if abs(o[0] - c["f"]) <= 2]
    if not cerca:
        lejos += 1
        linea.append(f"{c['id']}@f{c['f']} SIN golpe")
    else:
        o = max(cerca, key=lambda x: x[1])
        linea.append(f"{c['id']}@f{c['f']} {o[0] - c['f']:+.1f} f {o[1]:.0f} dB")
fallos += lejos > 0
print(f"{'✅' if not lejos else '❌'} R33, golpes en el audio del render: " + " · ".join(linea))
sys.exit(1 if fallos else 0)
