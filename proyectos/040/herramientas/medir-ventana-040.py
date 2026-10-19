#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""medir-ventana-040.py — el movimiento de cada ventana de dron del plan: media, dispersión (σ/μ), pendiente y máximo/media.

Uso (desde la raíz del repo):
  uv run proyectos/040/herramientas/medir-ventana-040.py dr202:1.5:108 dr209:13.0:102 …     (clip : desde en s : frames de la comp)

Movimiento = diferencia media entre fotogramas consecutivos (gris, 108×192) del clip normalizado: no es velocidad real, pero un tirón o una parada
se ven como un salto. Uniforme: σ/μ < 0,09, pendiente casi nula y máximo < 1,2× la media (034: `ventana-fina.py`). Estos drones son vuelos lentos con cielo (poca
textura): la media es baja (0,5-1,4) y lo que importa es la DISPERSIÓN.
"""
import subprocess, sys
import numpy as np
cache = {}
def serie(clip):
    if clip not in cache:
        raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",f"remotion/public/recorrido-040/{clip}.mp4","-vf","scale=108:192,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
        f = np.frombuffer(raw, dtype=np.uint8).reshape(-1,192,108).astype(float)
        cache[clip] = np.array([np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)])
    return cache[clip]
print(f"{'ventana':22s} {'media':>6s} {'σ/μ':>6s} {'pend.':>6s} {'máx/μ':>6s}")
for spec in sys.argv[1:]:
    clip, desde, n = spec.split(":")
    a, n = int(round(float(desde)*30)), int(n)
    w = serie(clip)[a:a+n-1]
    mu = w.mean(); pend = np.polyfit(np.arange(len(w)), w, 1)[0]*len(w)/mu
    print(f"{spec:22s} {mu:6.2f} {w.std()/mu:6.3f} {pend:+6.2f} {w.max()/mu:6.2f}")
