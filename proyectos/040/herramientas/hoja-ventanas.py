#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""hoja-ventanas.py — una hoja con el PRIMER y el ÚLTIMO fotograma de cada ventana del plan (clip normalizado, desde, frames).

Uso: uv run proyectos/040/herramientas/hoja-ventanas.py salida.png dr202:1.5:108 dr209:13.0:102 …
"""
import subprocess, sys, tempfile, os
salida = sys.argv[1]
tmp = tempfile.mkdtemp()
arch = []
for i, spec in enumerate(sys.argv[2:]):
    clip, desde, n = spec.split(":")
    d, n = float(desde), int(n)
    for k, t in enumerate((d, d + (n - 1) / 30)):
        f = os.path.join(tmp, f"{i:02d}{k}.png")
        subprocess.run(["ffmpeg","-nostdin","-y","-v","error","-ss",f"{t:.3f}","-i",f"remotion/public/recorrido-040/{clip}.mp4","-frames:v","1","-vf","scale=216:384",f],check=True)
        arch.append(f)
n = len(sys.argv[2:])
ins = []
for f in arch: ins += ["-i", f]
# columnas = ventanas, filas = primer / último
rows = []
filtro = "".join(f"[{j}:v]" for j in range(len(arch)))
orden = [2*i for i in range(n)] + [2*i+1 for i in range(n)]
filtro = "".join(f"[{j}:v]" for j in orden) + f"xstack=inputs={len(arch)}:layout=" + "|".join(
    (f"{(p % n)*216}_{(p // n)*384}") for p in range(len(arch)))
subprocess.run(["ffmpeg","-nostdin","-y","-v","error",*ins,"-filter_complex",filtro,salida],check=True)
print("ok", salida)
