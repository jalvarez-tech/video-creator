#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""perfil-dron.py — el movimiento de un dron normalizado, en tramos de 0,5 s (diferencia media entre fotogramas + escala hacia delante).

Uso (desde la raíz del repo):
  uv run proyectos/040/herramientas/perfil-dron.py dr234 [dr236 …]

`flujo.py` solo ve desplazamientos (paneos): un dron que AVANZA o BAJA hacia delante escala la imagen y da 0. Aquí, además de la diferencia media
(`movimiento.py`), se estima el factor de escala entre fotogramas separados 6 f (el mejor entre 0,97 y 1,03 por mínimo error) y el brillo medio:
escala > 1 = avance, < 1 = retroceso; el brillo dice cuándo el cielo se apaga (los drones de esta pieza son del atardecer).
"""
import subprocess, sys
import numpy as np

W, H = 108, 192
def cuadros(clip):
    raw = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",f"remotion/public/recorrido-040/{clip}.mp4","-vf",f"scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw,dtype=np.uint8).reshape(-1,H,W).astype(float)

def escalar(img, k):
    # re-muestreo por el centro con el factor k (nearest/bilinear básico)
    ys = (np.arange(H)-H/2)/k + H/2
    xs = (np.arange(W)-W/2)/k + W/2
    y0 = np.clip(np.round(ys).astype(int),0,H-1); x0 = np.clip(np.round(xs).astype(int),0,W-1)
    return img[np.ix_(y0,x0)]

def escala(a, b):
    mejores = []
    for k in np.linspace(0.97,1.03,25):
        e = np.abs(escalar(a,k)[20:-20,10:-10]-b[20:-20,10:-10]).mean()
        mejores.append((e,k))
    return min(mejores)[1]

for clip in sys.argv[1:]:
    f = cuadros(clip); n = len(f)
    print(f"== {clip}: {n} f, {n/30:.2f} s")
    dif = np.array([np.abs(f[i+1]-f[i]).mean() for i in range(n-1)])
    for a in range(0, n-6, 15):
        w = dif[a:a+15]
        k = escala(f[a], f[a+6])
        print(f"  {a/30:5.2f} s  dif {w.mean():5.2f} (σ/μ {w.std()/max(w.mean(),1e-6):.2f})  escala/6f {k:.4f}  brillo {f[a].mean():5.1f}")
