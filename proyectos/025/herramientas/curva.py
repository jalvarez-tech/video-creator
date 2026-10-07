#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""curva.py — sonoridad (RMS de 1 s, en dB relativos) cada 0,5 s de una ventana de una canción: ¿dónde empieza la caída?
Uso: uv run proyectos/025/herramientas/curva.py "ruta.mp3" --desde 165.232 --hasta 215 --paso 0.5"""
import argparse, subprocess
import numpy as np
a = argparse.ArgumentParser(); a.add_argument("ruta"); a.add_argument("--desde", type=float, default=0); a.add_argument("--hasta", type=float, default=60); a.add_argument("--paso", type=float, default=0.5)
x = a.parse_args(); SR = 48000
raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",x.ruta,"-ac","1","-ar",str(SR),"-f","f32le","-"],capture_output=True,check=True).stdout
y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
t = x.desde
while t < x.hasta:
    s = y[int(t*SR):int((t+1)*SR)]
    r = 20*np.log10(np.sqrt(np.mean(s**2))+1e-9) if len(s) else -99
    print(f"{t-x.desde:6.1f} s (cancion {t:8.3f})  {r:6.1f} dB  " + "#"*max(0,int((r+60)/1.5)))
    t += x.paso
