#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
energia-render.py — la ENERGÍA del audio de un render, fotograma a fotograma, para ver qué pasa EN un corte.

Uso (desde la raíz del repo):
  uv run proyectos/019/herramientas/energia-render.py proyectos/019/pruebas-720p/019-recorrido-720p.mp4 696 708

Imprime, cada 5 ms entre dos frames de la composición (30 fps), la energía de la banda 80-3000 Hz (ventanas de 6 ms) en dB y una barra.

POR QUÉ EXISTE. `golpes-render.py` da, alrededor de cada frame previsto (±0,2 s), el instante en que EMPIEZA la mayor subida. Donde nada más sube a la vez
es una buena medida; donde hay una rampa de la música (el ducking que se suelta tras una voz) o una voz que entra, la mayor subida es la de la rampa
o la de la voz y el detector retrocede por ella: en el 019 dio el golpe del f703 a −4,7 f, y mirada la traza el golpe suena en f702,9 (un salto de +6 dB
sobre la rampa). Aquí se mira la traza entera y se ve cuál es cuál.
"""
import subprocess
import sys

import numpy as np
from scipy.signal import butter, sosfilt

FPS = 30


def main() -> None:
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    ruta, f0, f1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-vn", "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    b = sosfilt(butter(4, [80, 3000], btype="band", fs=48000, output="sos"), y)
    w = int(0.006 * 48000)
    for t in np.arange(f0 / FPS, f1 / FPS, 0.005):
        i = int(t * 48000)
        e = 20 * np.log10(np.sqrt(np.mean(b[i : i + w] ** 2) + 1e-12))
        print(f"f{t * FPS:7.2f}  {e:6.1f} dB  " + "#" * int(max(0, e + 60)))


if __name__ == "__main__":
    main()
