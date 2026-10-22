# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
movimiento.py — el perfil de movimiento y de nitidez de un tramo de un clip normalizado.

Uso (desde la raíz del repo):
  uv run proyectos/060/herramientas/movimiento.py remotion/public/recorrido-060/dr97.mp4 <desde_s> <dur_s> "etiqueta"

POR QUÉ EXISTE. Un plano de dron que ACELERA o se queda quieto y da un tirón se ve mal en un reel (revisión 1 del 030: «la primera hay una parte
que se acelera y no se ve» y «cambia la toma de 0:24»). El movimiento es la diferencia media absoluta entre fotogramas consecutivos (gris,
108×192 o 135×240) —no es velocidad real, pero un tirón o una parada se ven como un salto de este número— y la nitidez, la varianza del laplaciano.
Un plano «uniforme» tiene una dispersión del movimiento < 0,18 (mejor < 0,06), pendiente casi nula y un máximo < 1,35× la media.
"""
import subprocess, sys, numpy as np
# movimiento = diferencia media absoluta entre fotogramas consecutivos (gris, 135x240) y nitidez = varianza del laplaciano
def frames(ruta, ss, t, w=135, h=240):
    raw=subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",str(ss),"-t",str(t),"-i",ruta,"-vf",f"scale={w}:{h},format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    return np.frombuffer(raw,dtype=np.uint8).reshape(-1,h,w).astype(float)
def perfil(ruta, ss, t, etiqueta, paso=5):
    f=frames(ruta,ss,t)
    d=[np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)]
    lap=[ (np.roll(x,1,0)+np.roll(x,-1,0)+np.roll(x,1,1)+np.roll(x,-1,1)-4*x)[1:-1,1:-1].var() for x in f]
    print(f"{etiqueta}  ({ss:.2f}-{ss+t:.2f} s, {len(f)} f)")
    print("  seg  movimiento  nitidez")
    for i in range(0,len(d),paso):
        print(f"  {ss+i/30:5.2f}   {np.mean(d[i:i+paso]):6.2f}    {np.mean(lap[i:i+paso]):7.1f}")
ruta=sys.argv[1]; ss=float(sys.argv[2]); t=float(sys.argv[3]); perfil(ruta, ss, t, sys.argv[4] if len(sys.argv)>4 else "")
