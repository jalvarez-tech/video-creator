#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""mov-dron.py — los tramos de movimiento UNIFORME de un dron, medidos sobre el CLIP ENTERO (16:9) a 192×108.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/mov-dron.py "<clip.MP4>" [ventana_frames=75] [--top 6]

El movimiento es la diferencia media absoluta entre fotogramas consecutivos (gris): no es velocidad real, pero un tirón o una parada se
ven como un salto de este número. Un tramo uniforme tiene dispersión (σ/media) < 0,06 y pendiente casi nula; lo que SE MIDE aquí es el
cuadro entero, y la ventana 9:16 que se elija después puede ver menos (un tramo puede ser uniforme en 16:9 y no en su recorte).
Imprime también el perfil grueso del clip (media cada 2 s) para ver si acelera o frena.
"""
import subprocess
import sys

import numpy as np

clip = sys.argv[1]
vent = int(sys.argv[2]) if len(sys.argv) > 2 and not sys.argv[2].startswith("--") else 75
top = int(sys.argv[sys.argv.index("--top") + 1]) if "--top" in sys.argv else 6
raw = subprocess.run(
    ["ffmpeg", "-nostdin", "-v", "error", "-i", clip, "-vf", "scale=192:108,format=gray", "-f", "rawvideo", "-"],
    capture_output=True,
    check=True,
).stdout
f = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 108, 192).astype(float)
m = np.array([np.abs(f[i + 1] - f[i]).mean() for i in range(len(f) - 1)])
fps = 30000 / 1001
print(f"{clip.split('/')[-1]}: {len(f)} f · {len(f) / fps:.1f} s · movimiento medio {m.mean():.2f}")
print("perfil (media cada 2 s): " + " ".join(f"{m[i:i + 60].mean():.1f}" for i in range(0, len(m), 60)))
res = []
for a in range(0, len(m) - vent, 8):
    w = m[a : a + vent]
    media = max(w.mean(), 1e-6)
    pend = np.polyfit(np.arange(vent), w, 1)[0] * vent / media
    res.append((a / fps, media, w.std() / media, pend, w.max() / media))
buenas = sorted([r for r in res if r[1] >= 0.6], key=lambda r: r[2])[:top]
print(f"mejores ventanas de {vent} f ({vent / fps:.2f} s) por dispersión (σ/media):")
for r in buenas:
    print(f"   desde {r[0]:5.1f} s  mov {r[1]:4.2f}  disp {r[2]:.3f}  pend {r[3]:+.2f}  máx× {r[4]:.2f}")
