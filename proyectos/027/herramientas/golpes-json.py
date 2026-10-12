#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""golpes-json.py — escribe proyectos/027/musica/golpes-027.json con los golpes (≥ 6 dB en 15 ms, 80-3000 Hz: el detector de medir-pista.py y buscar-cortes.py) de la canción en la ventana pedida.
Uso: uv run proyectos/027/herramientas/golpes-json.py "ruta.mp3" 66 126 proyectos/027/musica/golpes-027.json"""
import json, subprocess, sys
import numpy as np
from scipy.signal import butter, find_peaks, sosfilt
ruta, d0, d1, salida = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",ruta,"-ac","1","-ar","48000","-f","f32le","-"],capture_output=True,check=True).stdout
y = np.frombuffer(raw,dtype=np.float32).astype(np.float64); sr = 48000
sos = butter(4,[80,3000],btype="band",fs=sr,output="sos"); b = sosfilt(sos,y)
win,hop = int(0.006*sr), int(0.001*sr)
e = np.sqrt(np.convolve(b**2,np.ones(win)/win,mode="valid")[::hop]+1e-12); db = 20*np.log10(e)
sub = db[15:]-db[:-15]; picos,_ = find_peaks(sub,height=6.0,distance=350)
g=[]
for p in picos:
    k=p
    while k>0 and db[k]>db[k-1]-0.05: k-=1
    t=k/1000.0
    if d0 <= t <= d1: g.append({"t":round(t,3),"db":round(float(sub[p]),1)})
json.dump({"pista":"proyectos/027/original/musica-ivory.mp3","desde":d0,"dur":round(d1-d0,1),"umbral_db":6.0,"golpes":g},open(salida,"w"),indent=1,ensure_ascii=False)
print(len(g),"golpes en",d0,"-",d1)
