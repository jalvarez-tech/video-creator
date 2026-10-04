#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
subs-vs-voz.py — ¿cae cada línea de subtítulo sobre su palabra EN EL RENDER?

Uso (desde la raíz del repo):
  uv run proyectos/017/herramientas/subs-vs-voz.py proyectos/017/pruebas-720p/017-recorrido-720p.mp4 58 80 105 130 149 166 574 588 …

Los números son los frames en que ENTRA cada línea (`trozos[].desde` de subtitulos-017.ts). Para
sacarlos del plan:
  node -e "…" o, más cómodo, `node proyectos/017/revisar-017.mjs` y mirar la tabla del plan.

Extrae el audio del render, mide los onsets de la voz (banda 300-3400 Hz, valle → subida de ≥ 8 dB,
el mismo detector que `onsets-voz.py`) y, de cada línea, da el onset más cercano dentro de ±0,3 s:
la diferencia en frames (positivo = la línea entra ANTES de la palabra; con el fundido de 5 f de
cada línea, entre 0 y +3 es lo bueno). Con música alta debajo un onset puede quedar tapado: se avisa
como «sin onset claro» y se mira en el frame.

Es la comprobación del 017: 16 de 17 líneas a ±2,2 f (mediana +1,6 f).

⚠️ Sobre el MP4 CON música, la PRIMERA sílaba de una toma puede no verse (el detector mide la
segunda): en el 017 «Este» dio +4,2 f cuando la voz sola la pone a 0,0. Ante un valor raro, vuelve a
medir sobre la voz SOLA renderizada por el motor (`HAY_MUSICA = false` en `audio-017.ts`, y
`npx remotion render src/index.ts Recorrido017 voz.wav --codec=wav`; este script acepta el WAV) y
cruza con el WAV de la toma antes de mover una línea. Ver `aprendizajes.md` §10.
"""
import subprocess
import sys

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt


def audio_de(ruta: str) -> tuple[np.ndarray, int]:
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-vn", "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64), 48000


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    ruta, frames = sys.argv[1], [int(x) for x in sys.argv[2:]]
    y, sr = audio_de(ruta)
    sos = butter(4, [300, 3400], btype="band", fs=sr, output="sos")
    b = sosfilt(sos, y)
    hop, win = int(0.005 * sr), int(0.020 * sr)
    e = np.array([np.sqrt(np.mean(b[i : i + win] ** 2) + 1e-14) for i in range(0, len(b) - win, hop)])
    db = 20 * np.log10(e)
    t = (np.arange(len(db)) * hop + win / 2) / sr
    dbs = np.convolve(db, np.ones(3) / 3, mode="same")
    valles, _ = find_peaks(-dbs, prominence=5, distance=int(0.06 / 0.005))
    ons = []
    for v in valles:
        j = min(len(dbs) - 1, v + 30)
        sube = dbs[v:j].max() - dbs[v]
        if sube < 8:
            continue
        k = v
        while k < j and dbs[k] < dbs[v] + 0.4 * sube:
            k += 1
        ons.append(t[k])
    ons = np.array(ons)
    difs = []
    print("frame de la línea | onset de voz más cercano (frame) | la palabra suena …")
    for f in frames:
        cerca = ons[(ons > f / 30 - 0.30) & (ons < f / 30 + 0.30)]
        if len(cerca) == 0:
            print(f"  f{f:5d} | sin onset claro")
            continue
        o = cerca[np.argmin(np.abs(cerca - f / 30))] * 30
        difs.append(o - f)
        print(f"  f{f:5d} | f{o:7.1f} | {o - f:+5.1f} f {'después' if o > f else 'antes'} de que entre la línea")
    if difs:
        print(f"\nmediana {np.median(difs):+.1f} f · rango [{min(difs):+.1f}, {max(difs):+.1f}] f (positivo = la línea entra ANTES de la palabra)")


if __name__ == "__main__":
    main()
