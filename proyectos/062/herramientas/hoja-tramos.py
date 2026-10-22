#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""hoja-tramos.py — una fila por TRAMO («clip:desde:hasta», segundos del archivo normalizado de remotion/public/recorrido-062/) con N fotogramas CRUDOS repartidos de `desde` a `hasta`, para
ver qué contiene un plano antes de decidirlo, y el movimiento medio de cada tramo (diferencia entre fotogramas consecutivos, gris 192×108) y el sentido del desplazamiento horizontal.
Uso (desde la raíz del repo):
  uv run proyectos/062/herramientas/hoja-tramos.py <salida.png> <N> <ancho> rc09:0.3:3.2 rc10:1.6:4.5 …"""
import io, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

RAIZ = Path(__file__).resolve().parents[3]
V = RAIZ / "remotion" / "public" / "recorrido-062"
salida, n, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
tramos = sys.argv[4:]
h = int(w * 2304 / 1296)


def cuadro(clip, t):
    png = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", str(V / f"{clip}.mp4"), "-frames:v", "1", "-vf", f"scale={w}:{h}", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert("RGB")


def movimiento(clip, a, b):
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{a:.3f}", "-t", f"{b-a:.3f}", "-i", str(V / f"{clip}.mp4"), "-vf", "scale=192:108,format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
    f = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 108, 192).astype(float)
    if len(f) < 3:
        return 0.0, 0.0
    m = np.mean([np.abs(f[i + 1] - f[i]).mean() for i in range(len(f) - 1)])
    # desplazamiento horizontal: correlación de los perfiles de columnas entre el primer y el último tercio (signo = hacia dónde se mueve la imagen)
    p0 = f[: max(2, len(f) // 4)].mean(axis=(0, 1)); p1 = f[-max(2, len(f) // 4) :].mean(axis=(0, 1))
    best, bd = 1e18, 0
    for d in range(-40, 41):
        a0 = p0[max(0, d) : 192 + min(0, d)]; a1 = p1[max(0, -d) : 192 + min(0, -d)]
        e = np.abs(a0 - a1).mean()
        if e < best:
            best, bd = e, d
    return m, bd


hoja = Image.new("RGB", (n * w, len(tramos) * h), (16, 16, 16))
for r, tr in enumerate(tramos):
    clip, a, b = tr.split(":"); a, b = float(a), float(b)
    m, d = movimiento(clip, a, b)
    for k in range(n):
        t = a + (b - a) * k / max(1, n - 1)
        im = cuadro(clip, min(t, b - 0.02)); dr = ImageDraw.Draw(im)
        dr.rectangle((0, 0, w, 13), fill=(0, 0, 0))
        dr.text((3, 1), f"{clip} {t:.2f}s" + (f" mov{m:.1f} dx{d:+d}" if k == 0 else ""), fill=(255, 255, 0))
        hoja.paste(im, (k * w, r * h))
    print(f"{tr}: movimiento {m:.2f} · dx {d:+d}")
hoja.save(salida)
print(salida, hoja.size)
