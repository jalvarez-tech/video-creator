#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
onsets-voz.py — dónde EMPIEZA de verdad cada sílaba de una voz, para llevar un subtítulo a su palabra.

Uso (desde la raíz del repo):
  uv run proyectos/017/herramientas/onsets-voz.py remotion/public/recorrido-017/md09.wav --cerca 0.82 2.06 3.02 3.58
  uv run proyectos/017/herramientas/onsets-voz.py voz.wav --desde 2.7 --hasta 5.5

POR QUÉ EXISTE. `trozos-editoriales.mjs` casa el guion con el DTW de whisper-small, que marca el
FINAL de cada token. En el 017 puso 5 de 17 líneas entre 0,2 y 0,45 s ANTES de su palabra: tras una
pausa de menos de 0,12 s (que el ancla `--audio` no ve) y dentro de una cifra («317 metros», 0,22 s
pronto; «para desarrollar», 0,31 s; «el interior», 0,45 s). Aquí se mide la ENERGÍA de la voz
(banda 300-3400 Hz, ventanas de 20 ms con salto de 5 ms) y cada ONSET es el instante en que sube la
energía tras un valle de ≥ 5 dB de prominencia y una subida de ≥ 8 dB: el arranque de una sílaba.

Cómo se usa: con la línea que da `trozos-editoriales.mjs --tabla` (segundo de la fuente de cada
línea), `--cerca` imprime los onsets que hay en [−0,25, +0,40] s alrededor. La palabra es el onset
que sigue a un valle PROFUNDO (≤ −50 dB: una pausa) más cercano. Dentro de una frase continua los
valles son menos profundos (−30/−45 dB) y solo se distingue por el número de sílabas: ahí, parte el
tramo en el valle más profundo y vuelve a transcribirlo (`primeras-palabras`: ffmpeg -ss/-to + 
`transcribir.mjs`) para saber QUÉ palabras caen a cada lado. Se comprueba al final contra el render
con `subs-vs-voz.py`.

⚠️ El audio tiene que ser la voz SOLA (el WAV de la toma), no el render: con música debajo los
valles no se ven.
"""
import argparse

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt


def onsets(ruta: str) -> list[tuple[float, float, float]]:
    y, sr = sf.read(ruta)
    if y.ndim > 1:
        y = y.mean(axis=1)
    sos = butter(4, [300, 3400], btype="band", fs=sr, output="sos")
    b = sosfilt(sos, y.astype(np.float64))
    hop, win = int(0.005 * sr), int(0.020 * sr)
    e = np.array([np.sqrt(np.mean(b[i : i + win] ** 2) + 1e-14) for i in range(0, len(b) - win, hop)])
    db = 20 * np.log10(e)
    t = (np.arange(len(db)) * hop + win / 2) / sr
    dbs = np.convolve(db, np.ones(3) / 3, mode="same")
    valles, _ = find_peaks(-dbs, prominence=5, distance=int(0.06 / 0.005))
    salida = []
    for v in valles:
        j = min(len(dbs) - 1, v + 30)
        sube = dbs[v:j].max() - dbs[v]
        if sube < 8:
            continue
        umbral = dbs[v] + 0.4 * sube
        k = v
        while k < j and dbs[k] < umbral:
            k += 1
        salida.append((float(t[k]), float(dbs[v]), float(sube)))
    return salida


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("audio")
    ap.add_argument("--cerca", type=float, nargs="*", help="segundos de la fuente de cada línea, para ver sus onsets cercanos")
    ap.add_argument("--desde", type=float, default=0.0)
    ap.add_argument("--hasta", type=float, default=1e9)
    a = ap.parse_args()
    todos = onsets(a.audio)
    if a.cerca:
        for c in a.cerca:
            cerca = [o for o in todos if -0.25 <= o[0] - c <= 0.40]
            print(f"estimado {c:6.2f} s: " + (" · ".join(f"{o[0]:.3f} (valle {o[1]:.0f} dB)" for o in cerca) or "ningún onset"))
    else:
        print("onset (s) | valle (dB) | subida (dB)")
        for o in todos:
            if a.desde <= o[0] <= a.hasta:
                print(f"  {o[0]:7.3f} | {o[1]:7.1f}    | {o[2]:5.1f}")


if __name__ == "__main__":
    main()
