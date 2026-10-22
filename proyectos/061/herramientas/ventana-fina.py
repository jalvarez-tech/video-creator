# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
ventana-fina.py — dentro de un tramo, las 6 ventanas de N fotogramas más uniformes (paso de 0,1 s).

Uso (desde la raíz del repo):
  uv run proyectos/061/herramientas/ventana-fina.py dr99 17.0 26.0 71   (clip, desde, hasta, N frames)

POR QUÉ EXISTE. Un plano de dron que ACELERA o se queda quieto y da un tirón se ve mal en un reel (revisión 1 del 030: «la primera hay una parte
que se acelera y no se ve» y «cambia la toma de 0:24»). El movimiento es la diferencia media absoluta entre fotogramas consecutivos (gris,
108×192 o 135×240) —no es velocidad real, pero un tirón o una parada se ven como un salto de este número— y la nitidez, la varianza del laplaciano.
Un plano «uniforme» tiene una dispersión del movimiento < 0,18 (mejor < 0,06), pendiente casi nula y un máximo < 1,35× la media.
"""
import subprocess, sys, numpy as np
clip, a0, a1, vent = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), int(sys.argv[4])
raw=subprocess.run(["ffmpeg","-nostdin","-v","error","-ss",str(a0),"-t",str(a1-a0),"-i",f"remotion/public/recorrido-061/{clip}.mp4","-vf","scale=108:192,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
f=np.frombuffer(raw,dtype=np.uint8).reshape(-1,192,108).astype(float)
m=np.array([np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)])
res=[]
for a in range(0,len(m)-vent,3):
    w=m[a:a+vent]; x=np.arange(vent)
    res.append((w.std()/w.mean(), a0+a/30, w.mean(), np.polyfit(x,w,1)[0]*vent/w.mean(), w.max()/w.mean()))
res.sort()
print(f"{clip} {a0}-{a1} s, ventana {vent} f: las 6 más uniformes")
for r in res[:6]: print(f"  desde {r[1]:6.2f} s  mov {r[2]:4.1f}  disp {r[0]:.3f}  pend {r[3]:+.2f}  máx× {r[4]:.2f}")
