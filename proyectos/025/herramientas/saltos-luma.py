#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
saltos-luma.py — el salto de luma media (sin graduar) en cada EMPALME de metraje-025.ts, medido sobre los clips normalizados.

Uso (desde la raíz del repo):  uv run proyectos/025/herramientas/saltos-luma.py

El último fotograma de un plano y el primero del siguiente, tal como saldrían a CORTE (los de la fuente a `desde` y a `desde + dur − 1`). La luma es la media del 72 % de
arriba del cuadro (la franja de subtítulos queda fuera). Un salto de más de ±8 a corte se lee como un parpadeo: ese plano entra con disolvencia (`desde` ≥ 12 f) y no se gradúa más.
Si cambia el plan, se rehace la tabla PLANOS (clip, desde en frames de la fuente, dur en frames de la comp).
"""
import subprocess, sys, io
from pathlib import Path
import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parents[3]
V = RAIZ / "remotion" / "public" / "recorrido-025"
# (id, clip, desde en frames de la fuente a 30 fps, dur en frames de la comp)
PLANOS = [
    ("c01-fachada", "rc23", 0, 105),
    ("c02-hook", "hk09", 14, 125),
    ("c03-ventanal", "rc04", 90, 70),
    ("c04-bloques", "rc02", 165, 74),
    ("c05-abierto", "rc07", 210, 121),
    ("c06-mitad", "md11", 19, 139),
    ("c07-alcoba", "rc13", 270, 54),
    ("c08-deck", "rc10", 60, 56),
    ("c09-vista", "dr153", 105, 103),
    ("c10-cta", "ct03", 111, 69),
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
