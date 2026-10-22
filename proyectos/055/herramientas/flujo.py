# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
flujo.py — el desplazamiento GLOBAL de un plano por fotograma (correlación de fase), para paneos y subidas al cielo.

Uso (desde la raíz del repo):
  uv run proyectos/055/herramientas/flujo.py dr103 22.0 28.3 [paso=10]            (clip de remotion/public/recorrido-055/, desde, hasta)
  FW=540 FH=960 uv run proyectos/055/herramientas/flujo.py rc01 6.1 8.6 6         (más resolución: el desplazamiento sale en px de 540 de ancho)

POR QUÉ EXISTE. `movimiento.py` y `ventana-fina.py` miden la diferencia media entre fotogramas: cuando un dron sube al cielo,
entra una zona sin textura y esa diferencia BAJA aunque la cámara vaya igual de rápido (034: DR103 y DR107). Aquí se mide cuántos
píxeles se mueve el cuadro entero entre dos fotogramas (dx, dy): constante = velocidad constante. Resolución de 1 px a la escala
de análisis (por eso FW/FH). No sirve para un avance hacia delante (la imagen escala, no se desplaza): ahí, `movimiento.py`.
"""
import subprocess, sys, numpy as np
clip,t0,t1=sys.argv[1],float(sys.argv[2]),float(sys.argv[3]); paso=int(sys.argv[4]) if len(sys.argv)>4 else 10
W,H=int(__import__("os").environ.get("FW","216")),int(__import__("os").environ.get("FH","384"))
raw=subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",str(t0),"-t",str(t1-t0),"-i",f"remotion/public/recorrido-055/{clip}.mp4","-vf",f"scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
f=np.frombuffer(raw,dtype=np.uint8).reshape(-1,H,W).astype(float)
win=np.outer(np.hanning(H),np.hanning(W))
def corr(a,b):
    A=np.fft.fft2((a-a.mean())*win); B=np.fft.fft2((b-b.mean())*win)
    R=A*np.conj(B); R/=np.abs(R)+1e-9; r=np.fft.ifft2(R).real
    y,x=np.unravel_index(np.argmax(r),r.shape)
    if y>H//2: y-=H
    if x>W//2: x-=W
    return x,y,r.max()
d=[corr(f[i+1],f[i]) for i in range(len(f)-1)]
mag=np.array([np.hypot(x,y) for x,y,_ in d])
for i in range(0,len(d),paso):
    seg=d[i:i+paso]
    print(f"{t0+i/30:6.2f}  dx {np.mean([s[0] for s in seg]):5.2f}  dy {np.mean([s[1] for s in seg]):5.2f}  |d| {np.mean(mag[i:i+paso]):5.2f}  pico {np.mean([s[2] for s in seg]):.3f}")
