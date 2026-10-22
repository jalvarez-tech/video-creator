#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
perfil-energia.py — la energía (80-3000 Hz, ventana de 6 ms) de un golpe en el RENDER y en la FUENTE, frame a frame.

Uso (desde la raíz del repo):
  uv run proyectos/058/herramientas/perfil-energia.py proyectos/058/pruebas-720p/058-recorrido.mp4 remotion/public/recorrido-058/musica-058.wav 158.06667 374 392
  (render, wav de la canción, INICIO_MUSICA en s, frame inicial, frame final)

POR QUÉ EXISTE. `golpes-render.py` dio −4,9 f en un corte del 058 (y −5,0 f en uno del 056) por «retroceder hasta donde la energía deja de bajar». Aquí se
pone la fuente (con la resta de 42 ms del render) al lado del render: si las dos columnas suben y bajan en los mismos frames y solo difieren en una
constante (la ganancia), el golpe suena a su sitio y el desfase del detector es un artefacto.
"""
import sys, subprocess, numpy as np
from scipy.signal import butter, sosfilt
def dec(p, a, b):
    raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",str(a),"-t",str(b-a),"-i",p,"-ac","1","-ar","48000","-f","f32le","-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw,dtype=np.float32).astype(np.float64)
def env(y):
    sos = butter(4,[80,3000],btype="band",fs=48000,output="sos"); b=sosfilt(sos,y)
    w=int(0.006*48000); e=np.sqrt(np.convolve(b**2,np.ones(w)/w,mode="valid")+1e-12); return 20*np.log10(e)
render, wav, ini, f0, f1 = sys.argv[1], sys.argv[2], float(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
a, b = f0/30, f1/30
r = dec(render, a, b)
# fuente: la misma ventana menos el retardo del render (42 ms)
s = dec(wav, ini + a - 0.042, ini + b - 0.042)
er, es = env(r), env(s)
print("frame | render dB | fuente dB   (80-3000 Hz, ventana 6 ms, al inicio de cada frame)")
for f in range(f0, f1):
    i = int((f-f0)/30*48000)
    print(f"{f:5d} | {er[i]:7.1f} | {es[i]:7.1f}")
