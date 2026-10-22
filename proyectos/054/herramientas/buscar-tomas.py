# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
buscar-tomas.py — ¿de qué clip y de qué instante sale cada plano de un vídeo ya editado?

Uso (desde la raíz del repo):
  uv run proyectos/054/herramientas/buscar-tomas.py > proyectos/054/medidas/busqueda-fotogramas.txt

Para cada 0,5 s del original (`03.mp4` de «videos editados»), busca entre TODOS los recorridos y las tomas del 2-sep (a su 9:16 real, sin recorte)
el fotograma más parecido (MSE de gris 54×96, 72 % superior, normalizado en media y desviación: ignora los subtítulos y los cambios de brillo)
y dice el clip, el instante y el error. Error ≈ 0 = el mismo plano al píxel; ≈ 0,3 o más = no hay ningún clip así (el editor tuvo otro). La
velocidad del plano sale de cuánto avanza el instante del clip por cada 0,5 s del original (0,5 = ×1; 0,7 = ×1,4).
"""
import subprocess, sys, glob, os
import numpy as np
V = "/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Tierra Grata - Las Palmas/Videos"
W, H = 54, 96
def dec(path, fps, ss=None, vf_extra=""):
    cmd = ["ffmpeg", "-nostdin", "-v", "error", "-i", path, "-an", "-vf", f"{vf_extra}fps={fps},scale={W}:{H}:flags=area,setsar=1,format=gray", "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    n = len(raw)//(W*H)
    return np.frombuffer(raw, dtype=np.uint8)[:n*W*H].reshape(n, H, W).astype(np.float32)
orig = dec("/Volumes/SSK SSD/Work/Propiedades Luxur/Apartamento - Tierra Grata - Las Palmas/videos editados/03.mp4", 2)
clips = {}
for p in sorted(glob.glob(V + "/4 Recorrido/*.mp4")) + [V+"/1 Hooks/Img 9508.mp4", V+"/1 Hooks/Img 9496.mp4", V+"/5 Cta/Img 9501.mp4", V+"/5 Cta/Img 9492.mp4"]:
    clips[os.path.basename(p)] = dec(p, 10)   # 10 fps
sel = slice(0, int(H*0.72))
def norm(a):
    a = a[:, sel, :]
    a = a - a.mean(axis=(1,2), keepdims=True)
    s = a.std(axis=(1,2), keepdims=True) + 1e-3
    return a / s
no = norm(orig)
nc = {k: norm(v) for k, v in clips.items()}
for i in range(len(orig)):
    t = i/2
    best = (1e9, None, None)
    for k, c in nc.items():
        d = ((c - no[i])**2).mean(axis=(1,2))
        j = int(d.argmin())
        if d[j] < best[0]: best = (d[j], k, j/10)
    print(f"{t:5.1f}  {best[1]:22s} {best[2]:6.1f}  err={best[0]:.3f}")
