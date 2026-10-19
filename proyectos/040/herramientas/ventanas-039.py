#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""ventanas-040.py — las ventanas de movimiento UNIFORME de varios drones normalizados, para una duración fuente dada.

Uso (desde la raíz del repo):
  uv run proyectos/040/herramientas/ventanas-040.py <N_fuente_frames> [mov_min=0] [clip clip …]
Para cada clip, las 3 ventanas de N fotogramas con menor dispersión (paso 0,1 s) cuyo movimiento medio sea ≥ mov_min.
Movimiento = diferencia media entre fotogramas consecutivos (gris 108×192): no es velocidad real, pero un tirón o una parada se ven como un salto.
Uniforme: dispersión (σ/μ) < 0,09, pendiente casi nula y máximo < 1,2× la media (034: `ventana-fina.py`).
Para un plano a ×v de N frames de comp, N_fuente = N·v: a mayor velocidad, más fuente y menos sitios donde cabe.
"""
import subprocess, sys
import numpy as np
N = int(sys.argv[1]); MMIN = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
clips = sys.argv[3:] or ["dr96","dr97","dr98","dr99","dr100","dr101","dr102","dr103","dr104","dr105","dr106","dr107","dr108","dr109"]
for c in clips:
    raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",f"remotion/public/recorrido-040/{c}.mp4","-vf","scale=108:192,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    f = np.frombuffer(raw,dtype=np.uint8).reshape(-1,192,108).astype(float)
    m = np.array([np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)])
    res=[]
    for a in range(0,len(m)-N,3):
        w=m[a:a+N]; mu=w.mean()
        if mu<MMIN or mu<=0: continue
        disp=w.std()/mu; x=np.arange(N); slope=np.polyfit(x,w,1)[0]*N/mu; mx=w.max()/mu
        res.append((disp,a/30,mu,slope,mx))
    res.sort()
    top=[]
    for r in res:
        if all(abs(r[1]-t[1])>0.8 for t in top): top.append(r)
        if len(top)==3: break
    print(f"{c:6}", " | ".join(f"{t[1]:5.2f}-{t[1]+N/30:5.2f}s μ{t[2]:4.1f} σ/μ{t[0]:.2f} pend{t[3]:+.2f} máx{t[4]:.2f}" for t in top) or "—")
