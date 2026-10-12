#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
saltos-luma.py — el salto de luma media (sin graduar) en cada EMPALME de metraje-028.ts, medido sobre los clips normalizados.

Uso (desde la raíz del repo):  uv run proyectos/028/herramientas/saltos-luma.py

El último fotograma de un plano y el primero del siguiente, tal como saldrían a CORTE (los de la fuente a `desde` y a `desde + dur − 1`). La luma es la media del 72 % de
arriba del cuadro (la franja de subtítulos queda fuera). Un salto de más de ±8 a corte se lee como un parpadeo: ese plano entra con disolvencia (`desde` ≥ 12 f) y no se gradúa más.
Si cambia el plan, se rehace la tabla PLANOS (clip, desde en frames de la fuente, dur en frames de la comp).
"""
import subprocess, sys, io
from pathlib import Path
import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parents[3]
V = RAIZ / "remotion" / "public" / "recorrido-027"
# (id, clip, desde en frames de la fuente a 30 fps, dur en frames de la comp)
PLANOS = [
    ("c02-hook", "hk2", 5, 150),
    ("c03-cocina", "rc14", 556, 122),
    ("c04-estufa", "rc06", 300, 69),
    ("c05-isla", "rc09", 768, 50),
    ("c06-corredera", "rc09", 912, 51),
    ("c07-mitad", "md3", 18, 158),
    ("c08-alcoba", "rc07", 195, 63),
    ("c09-hacia-bano", "rc09", 102, 64),
    ("c10-bano", "rc02", 0, 59),
    ("c11-vista", "rc08", 12, 80),
    ("c12-cta", "rc14", 1344, 151),
]

def cuadro(clip: str, f: int) -> float:
    png = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(V / f"{clip}.mp4"), "-vf", f"select=eq(n\\,{f})", "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True, check=True).stdout
    a = np.asarray(Image.open(io.BytesIO(png)).convert("RGB"), dtype=float)
    a = a[: int(a.shape[0] * 0.72)]
    return float((0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]).mean())

def main() -> None:
    ult, pri = {}, {}
    for pid, clip, d, dur in PLANOS:
        pri[pid] = cuadro(clip, d)
        ult[pid] = cuadro(clip, d + dur - 1)
    print(f"{'empalme':38s} {'último':>7s} → {'primero':>7s} = salto a corte")
    for (a, *_), (b, *_) in zip(PLANOS, PLANOS[1:]):
        s = pri[b] - ult[a]
        print(f"{a + ' → ' + b:38s} {ult[a]:7.1f} → {pri[b]:7.1f} = {s:+6.1f}{'   ← > ±8: disolvencia' if abs(s) > 8 else ''}")
    print("\nluma de cada plano (primero · último):")
    for pid, *_ in PLANOS:
        print(f"  {pid:16s} {pri[pid]:6.1f} · {ult[pid]:6.1f}")

if __name__ == "__main__":
    main()
