#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""uniformes-dron.py — las ventanas de N fotogramas de movimiento uniforme de un clip 16:9 ENTERO (sin normalizar).

Uso (desde la raíz del repo):
  uv run proyectos/041/herramientas/uniformes-dron.py 75 "<ruta DJI_….MP4>" [otro.MP4 …]

Igual que `ventanas-uniformes.py` (movimiento = diferencia media entre fotogramas consecutivos, gris a 192×108; uniforme = dispersión < 0,18,
pendiente |p| < 0,25 y máximo < 1,35× la media), pero sobre el clip original apaisado y a su fps (el DJI va a 29,97). El 033 encontró así un tramo de
dispersión 0,013 que no se habría visto mirando el primer fotograma. Los segundos son del clip fuente.
"""
import subprocess
import sys

import numpy as np


def mov(ruta: str) -> tuple[np.ndarray, float]:
    fps = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=avg_frame_rate", "-of", "csv=p=0", ruta], capture_output=True, text=True
    ).stdout.strip()
    n, d = (float(x) for x in fps.split("/"))
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-vf", "scale=192:108,format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True
    ).stdout
    f = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 108, 192).astype(float)
    return np.array([np.abs(f[i + 1] - f[i]).mean() for i in range(len(f) - 1)]), n / d


VENT = int(sys.argv[1])
for ruta in sys.argv[2:]:
    m, fps = mov(ruta)
    res = []
    for a in range(0, len(m) - VENT, 15):
        w = m[a : a + VENT]
        pend = np.polyfit(np.arange(VENT), w, 1)[0] * VENT / max(w.mean(), 1e-6)
        res.append((a / fps, w.mean(), w.std() / max(w.mean(), 1e-6), pend, w.max() / max(w.mean(), 1e-6)))
    import os
    MOVMIN = float(os.environ.get("MOVMIN", "0.5"))
    DISP = float(os.environ.get("DISP", "0.18"))
    buenas = [r for r in res if MOVMIN <= r[1] <= 12.0 and r[2] < DISP and abs(r[3]) < 0.25 and r[4] < 1.35]
    print(f"{ruta.split('/')[-1]} ({len(m) / fps:.1f} s): {len(buenas)} ventanas de {VENT} f uniformes")
    for r in sorted(buenas, key=lambda r: r[2])[:int(os.environ.get("TOPN", "6"))]:
        print(f"   desde {r[0]:5.1f} s  mov {r[1]:4.1f}  disp {r[2]:.3f}  pend {r[3]:+.2f}  máx× {r[4]:.2f}")
