#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""hoja-planos.py — una fila por plano de metraje-025.ts con 5 fotogramas CRUDOS de su tramo (de `desde` a `desde + dur − 1`), para ver el contenido antes de renderizar.
Uso: uv run proyectos/025/herramientas/hoja-planos.py <salida.png> [ancho=150]   (la tabla PLANOS es la de `saltos-luma.py`)"""
import io, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw
RAIZ = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(Path(__file__).parent))
V = RAIZ / "remotion" / "public" / "recorrido-025"
import importlib.util
spec = importlib.util.spec_from_file_location("saltos", Path(__file__).parent / "saltos-luma.py"); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
salida = sys.argv[1]; w = int(sys.argv[2]) if len(sys.argv) > 2 else 150
N = 5
def cuadro(clip, f):
    png = subprocess.run(["ffmpeg","-nostdin","-v","error","-i",str(V/f"{clip}.mp4"),"-vf",f"select=eq(n\\,{f})","-frames:v","1","-f","image2pipe","-vcodec","png","-"],capture_output=True,check=True).stdout
    return Image.open(io.BytesIO(png)).convert("RGB")
h = int(w * 2304 / 1296)
hoja = Image.new("RGB", (N * w, len(m.PLANOS) * h), (16,16,16))
for i, (pid, clip, d, dur) in enumerate(m.PLANOS):
    for k in range(N):
        f = d + round(k * (dur - 1) / (N - 1))
        im = cuadro(clip, f).resize((w, h)); dr = ImageDraw.Draw(im)
        dr.rectangle((0,0,w,14), fill=(0,0,0)); dr.text((3,1), f"{pid[:14]} {clip} {f/30:.2f}s", fill=(255,255,0))
        hoja.paste(im, (k * w, i * h))
hoja.save(salida)
