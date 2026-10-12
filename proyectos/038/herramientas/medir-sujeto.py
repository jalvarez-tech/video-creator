#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""medir-sujeto.py — deja `proyectos/038/medidas/<clip>-sujeto.json` con la cara y el cuerpo de Isabella a 5 fotogramas por segundo (Vision de Apple, local).

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/medir-sujeto.py IMG_9406 IMG_9445 IMG_9427     (los clips de proyectos/038/original/)

Extrae los fotogramas a 960 px de ancho (la cara de Isabella en un 1080p ya mide ≈ 50 px ahí) y llama a `seguir-sujeto.swift`.
"""
import glob
import os
import subprocess
import sys
import tempfile

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
ORIGEN = os.path.join(RAIZ, "proyectos", "038", "original")
SALIDA = os.path.join(RAIZ, "proyectos", "038", "medidas")
SWIFT = os.path.join(RAIZ, "proyectos", "038", "herramientas", "seguir-sujeto.swift")

for clip in sys.argv[1:]:
    ruta = next(iter(glob.glob(os.path.join(ORIGEN, clip + ".*"))), None)
    if not ruta:
        sys.exit(f"no existe {clip} en {ORIGEN}")
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", ruta, "-vf", "fps=5,scale=960:-2", os.path.join(tmp, f"{clip}_%04d.png")],
            check=True,
        )
        r = subprocess.run(["swift", SWIFT, tmp], capture_output=True, text=True)
        if r.returncode != 0 or not r.stdout.strip():
            sys.exit(f"Vision falló en {clip}: {r.stderr[-300:]}")
        os.makedirs(SALIDA, exist_ok=True)
        destino = os.path.join(SALIDA, f"{clip}-sujeto.json")
        with open(destino, "w", encoding="utf8") as f:
            f.write(r.stdout)
        n = r.stdout.count('"f"')
        print(f"✅ {destino} ({n} fotogramas)")
