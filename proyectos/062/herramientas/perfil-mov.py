#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""perfil-mov.py — el movimiento medio (diferencia entre fotogramas consecutivos, gris 192×108) de un clip ENTERO, por tramos de 1 s.
Uso: uv run proyectos/062/herramientas/perfil-mov.py "<clip>" [paso_s=1]"""
import subprocess, sys
import numpy as np
ruta = sys.argv[1]; paso = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
fps = subprocess.run(["ffprobe","-v","error","-select_streams","v:0","-show_entries","stream=avg_frame_rate","-of","csv=p=0",ruta],capture_output=True,text=True).stdout.strip()
n, d = (float(x) for x in fps.split("/")); fps = n / d
raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",ruta,"-vf","scale=192:108,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
f = np.frombuffer(raw, dtype=np.uint8).reshape(-1,108,192).astype(float)
m = np.array([np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)])
k = int(paso*fps)
print(ruta.split("/")[-1], f"{len(f)/fps:.1f} s")
print("  " + " ".join(f"{i*paso:4.1f}:{m[i*k:(i+1)*k].mean():4.1f}" for i in range(int(len(m)/k))))
