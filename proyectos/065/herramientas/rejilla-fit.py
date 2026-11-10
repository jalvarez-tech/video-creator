#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
rejilla-fit.py — ajusta una recta (periodo y fase) a los golpes MEDIDOS de una canción de pulso constante y dice, para cada pulso, en qué frame de la pieza cae
y qué golpe medido tiene más cerca (con su desvío y su fuerza).

Uso (desde la raíz del repo):
  uv run proyectos/065/herramientas/rejilla-fit.py proyectos/065/musica/golpes-548-604.json --entrada 554.937 --inicio 554.8667 --desde 554.5 --hasta 600 [--fps 30]

`--inicio` es el INICIO_MUSICA de la pieza (segundo de la canción que suena en el frame 0); el frame de un golpe es (t + 0,012 − inicio + 0,042) × fps (el oído coloca el golpe 12 ms
después de que empiece a subir y el render saca el audio 42 ms tarde: `metraje-NNN.ts`, `golpeExacto`).
"""
import argparse, json
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("json")
ap.add_argument("--entrada", type=float, required=True)
ap.add_argument("--inicio", type=float, required=True)
ap.add_argument("--desde", type=float, default=None)
ap.add_argument("--hasta", type=float, default=None)
ap.add_argument("--fps", type=float, default=30.0)
a = ap.parse_args()
g = json.load(open(a.json))["golpes"]
d0 = a.desde if a.desde is not None else a.entrada - 0.5
d1 = a.hasta if a.hasta is not None else 1e9
sel = [x for x in g if d0 <= x["t"] <= d1]
t = np.array([x["t"] for x in sel]); db = np.array([x["db"] for x in sel])
P0 = 0.46875
n = np.round((t - a.entrada) / P0)
A = np.vstack([n, np.ones_like(n)]).T
b, c = np.linalg.lstsq(A, t, rcond=None)[0]
res = (t - (c + b * n)) * 1000
print(f"periodo {b:.5f} s · {60/b:.2f} BPM · fase {c:.4f} · desvío medio {np.abs(res).mean():.1f} ms · máx {np.abs(res).max():.1f} ms · {len(t)} golpes")
fr = lambda tt: (tt + 0.012 - a.inicio + 0.042) * a.fps
print("pulso | t ideal | frame ideal | golpe medido | desvío | fuerza | frame medido")
k = 0
while True:
    ti = c + b * (k + round((a.entrada - c) / b))
    if ti > (d1 if d1 < 1e8 else t.max()):
        break
    j = int(np.argmin(np.abs(t - ti)))
    print(f"{k:4d} | {ti:.3f} | {fr(ti):7.1f} | {t[j]:.3f} | {(t[j]-ti)*1000:+4.0f} ms | {db[j]:4.1f} dB | {fr(t[j]):7.1f}")
    k += 1
