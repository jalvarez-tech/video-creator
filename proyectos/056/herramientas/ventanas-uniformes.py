# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
ventanas-uniformes.py — las ventanas de N fotogramas de movimiento uniforme de cada clip normalizado.

Uso (desde la raíz del repo):
  uv run proyectos/056/herramientas/ventanas-uniformes.py 100 dr97 dr96 dr98   (N frames, luego los clips de remotion/public/recorrido-056/)

POR QUÉ EXISTE. Un plano de dron que ACELERA o se queda quieto y da un tirón se ve mal en un reel (revisión 1 del 030: «la primera hay una parte
que se acelera y no se ve» y «cambia la toma de 0:24»). El movimiento es la diferencia media absoluta entre fotogramas consecutivos (gris,
108×192 o 135×240) —no es velocidad real, pero un tirón o una parada se ven como un salto de este número— y la nitidez, la varianza del laplaciano.
Un plano «uniforme» tiene una dispersión del movimiento < 0,18 (mejor < 0,06), pendiente casi nula y un máximo < 1,35× la media.
"""
import subprocess, sys, numpy as np
def mov(ruta):
    raw=subprocess.run(["ffmpeg","-nostdin","-v","error","-i",ruta,"-vf","scale=108:192,format=gray","-f","rawvideo","-"],capture_output=True,check=True).stdout
    f=np.frombuffer(raw,dtype=np.uint8).reshape(-1,192,108).astype(float)
    return np.array([np.abs(f[i+1]-f[i]).mean() for i in range(len(f)-1)])
VENT=int(sys.argv[1]); 
for clip in sys.argv[2:]:
    m=mov(f"remotion/public/recorrido-056/{clip}.mp4"); n=len(m)
    res=[]
    for a in range(0,n-VENT,15):
        w=m[a:a+VENT]; 
        # uniformidad: pendiente casi nula y poca dispersión; el máximo no debe pasar 1,4× la media
        x=np.arange(VENT); pend=np.polyfit(x,w,1)[0]*VENT/ max(w.mean(),1e-6)
        res.append((a/30, w.mean(), w.std()/max(w.mean(),1e-6), pend, w.max()/max(w.mean(),1e-6)))
    # ventanas con movimiento 2-8, dispersión < 0,18, pendiente |p| < 0,25 y máximo < 1,35× la media
    buenas=[r for r in res if 2.0<=r[1]<=8.0 and r[2]<0.18 and abs(r[3])<0.25 and r[4]<1.35]
    print(f"{clip}: {len(buenas)} ventanas de {VENT} f uniformes")
    for r in buenas[:40]: print(f"   desde {r[0]:5.1f} s  mov {r[1]:4.1f}  disp {r[2]:.2f}  pend {r[3]:+.2f}  máx× {r[4]:.2f}")
