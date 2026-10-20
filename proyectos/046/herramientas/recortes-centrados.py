#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow", "numpy"]
# ///
"""Hoja de recortes 608x1080 de varios clips: una fila por clip, un fotograma por segundo.
Uso: recortes.py salida.png X clip1 clip2 ...  (X = borde izquierdo del recorte, 656 centra)"""
import subprocess, sys, io
from PIL import Image, ImageDraw
salida, X = sys.argv[1], int(sys.argv[2])
clips = sys.argv[3:]
W = 150
filas = []
for c in clips:
    dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",c],capture_output=True,text=True).stdout)
    n = int(dur)
    imgs = []
    for t in range(0, n+1):
        tt = min(t, dur-0.05)
        r = subprocess.run(["ffmpeg","-v","error","-ss",str(tt),"-i",c,"-frames:v","1","-vf",f"crop=608:1080:{X}:0,scale={W}:-1","-f","image2pipe","-vcodec","png","-"],capture_output=True)
        im = Image.open(io.BytesIO(r.stdout)).convert("RGB")
        d = ImageDraw.Draw(im); d.rectangle([0,0,30,12],fill=(0,0,0)); d.text((2,1),f"{t}s",fill=(255,255,0))
        imgs.append(im)
    H = imgs[0].height
    fila = Image.new("RGB",(W*min(len(imgs),14)+0, H*((len(imgs)+13)//14)),(20,20,20))
    for i,im in enumerate(imgs): fila.paste(im,((i%14)*W,(i//14)*H))
    d = ImageDraw.Draw(fila); d.rectangle([0,H-14,90,H],fill=(0,0,0)); d.text((2,H-13),c.split("/")[-1],fill=(0,255,0))
    filas.append(fila)
Wt = max(f.width for f in filas); Ht = sum(f.height for f in filas)
hoja = Image.new("RGB",(Wt,Ht),(20,20,20)); y=0
for f in filas: hoja.paste(f,(0,y)); y+=f.height
hoja.save(salida)
print(salida, hoja.size)
