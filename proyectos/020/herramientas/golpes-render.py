#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
golpes-render.py — ¿cae cada golpe de la música EN EL CORTE QUE LE TOCA, medido sobre el audio del RENDER?

Uso (desde la raíz del repo):
  uv run proyectos/020/herramientas/golpes-render.py proyectos/020/pruebas-720p/020-recorrido-720p.mp4 231 459 917 1145b

Cada número es el frame de la composición en que el plan PREVÉ el golpe (el `en` de un plano en un
pulso: `pulso(n)` de metraje-020.ts, o `node proyectos/020/revisar-020.mjs` y la tabla de pulsos). Un
`b` detrás (`1145b`) busca una CAÍDA en vez de una subida (la resolución de piano del CTA).

Mide la energía del audio del MP4 (banda 80-3000 Hz, ventanas de 6 ms) y, alrededor de cada frame
previsto (±0,2 s), da el instante en que EMPIEZA la subida (o la bajada) más fuerte. La diferencia se
cuenta contra `previsto − 0,36 f` (el oído coloca el golpe 12 ms después de que su energía empieza a
subir: `ATAQUE` de metraje-020.ts). Bien = 0,0 ± 1 f. En el 017: los golpes 8, 16 y 32 caen a 0,0 f de su
corte; el de caída del 40 llega 2,7 f tarde porque la caída es más suave que una subida y el detector
la ve más tarde (la voz de Isabella entra a continuación, no hay corte que se desfase).

Una subida desde el silencio (el golpe de apertura, en el frame 0) da «94 dB»: es la entrada de la
música, no una medición de fase.
"""
import subprocess
import sys

import numpy as np
from scipy.signal import butter, sosfilt

FPS = 30
ATAQUE_F = 0.012 * FPS  # 12 ms en frames


def audio_de(ruta: str) -> tuple[np.ndarray, int]:
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-vn", "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64), 48000


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    y, sr = audio_de(sys.argv[1])
    sos = butter(4, [80, 3000], btype="band", fs=sr, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.006 * sr), int(0.001 * sr)
    e = np.array([np.sqrt(np.mean(b[i : i + win] ** 2) + 1e-12) for i in range(0, len(b) - win, hop)])
    db = 20 * np.log10(e)
    t = np.arange(len(db)) * hop / sr

    def cerca(t0: float, sube: bool, ancho: float = 0.2) -> tuple[float, float]:
        i0, i1 = max(0, int((t0 - ancho) * 1000)), int((t0 + ancho) * 1000)
        seg = db[i0:i1]
        d = (seg[15:] - seg[:-15]) if sube else (seg[:-15] - seg[15:])
        j = int(np.argmax(d))
        k = j
        while k > 0 and ((seg[k] > seg[k - 1] - 0.05) if sube else (seg[k] < seg[k - 1] + 0.05)):
            k -= 1
        return t[i0 + k], d[j]

    print("previsto (frame) | detectado: inicio de la subida/caída (frame) | diferencia (frames; bien = 0,0 ± 1)")
    for arg in sys.argv[2:]:
        sube = not arg.endswith("b")
        prevision = float(arg.rstrip("b"))
        tt, d = cerca(prevision / FPS, sube)
        print(f"  f{prevision:7.1f}   {'subida' if sube else 'caída '} detectada en f{tt * FPS:7.1f} ({d:4.1f} dB)   dif = {tt * FPS - (prevision - ATAQUE_F):+5.1f} f")


if __name__ == "__main__":
    main()
