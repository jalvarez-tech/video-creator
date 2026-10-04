#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
formantes.py — ¿QUÉ VOCAL ES? F1/F2/F3 de una voz por LPC, para cerrar una palabra dudosa que whisper y la gramática no cierran.

Uso (desde la raíz del repo; el WAV es la voz SOLA de la toma, sin música):
  uv run proyectos/018/herramientas/formantes.py remotion/public/recorrido-018/ct01.wav 1.58 2.12 10
  (argumentos: <wav> <desde_s> <hasta_s> [paso_ms=10])

POR QUÉ EXISTE. En el CT01 del 018 («Si buscas algo diferente a/en un apartamento») la «a»/«en» es una vocal de ≈ 0,1 s pegada al «te» de
«diferente»: la energía no la distingue (no hay valle), whisper-small oye «en» con confianza 0,75 y el catálogo había escrito «(a)» por
gramática. Sin un oído delante, la pregunta «¿qué vocal suena ahí?» se contesta MIDIENDO: una /a/ tiene F1 alta y F2 baja (la de Isabella:
F1 ≈ 725-780 Hz y F2 ≈ 1.440-1.600 en «par» y «a-» de «apartamento»), una /e/ tiene F1 media y F2 alta (F1 ≈ 600, F2 ≈ 2.300-2.400). La vocal
de ese hueco midió F1 ≈ 605 y F2 ≈ 2.340-2.390 con tres combinaciones de orden y ventana: una [e], no una /a/ → «en».

CÓMO LEERLO. Imprime, cada `paso_ms`, la energía (dB) y los tres primeros polos del LPC (orden 12 a 10 kHz, ventana de 30 ms, preénfasis
0,97). Compara SIEMPRE contra vocales conocidas de la MISMA toma (las /a/ de otras palabras): el espacio vocálico cambia de una voz a otra y
de un contexto a otro (una /a/ entre labiales baja la F2). Los segmentos con consonante nasal salen con F1 ≈ 350-450 y F2 ≈ 700-800 y mucha
energía por debajo de 500 Hz: no son vocales. No sustituye al oído de quien conoce la frase: da una medida para que la pregunta llegue con
datos. Una vocal pegada a otra o con coarticulación fuerte puede salirse; por eso se mira una ventana, no un fotograma.
"""
import sys

import numpy as np
import soundfile as sf
from scipy.signal import lfilter, resample_poly


def levinson(r: np.ndarray, orden: int) -> np.ndarray:
    """Coeficientes del filtro de predicción lineal (autocorrelación + Levinson-Durbin)."""
    a = np.array([1.0])
    e = r[0]
    for i in range(1, orden + 1):
        acc = r[i] + np.dot(a[1:], r[i - 1 : 0 : -1]) if i > 1 else r[1]
        k = -acc / e
        a = np.concatenate([a, [0.0]])
        a = a + k * a[::-1]
        e *= 1 - k * k
    return a


def formantes(seg: np.ndarray, fs: int, orden: int = 12) -> list[tuple[float, float]]:
    x = lfilter([1, -0.97], [1], seg) * np.hamming(len(seg))
    r = np.correlate(x, x, "full")[len(x) - 1 : len(x) + orden]
    if r[0] <= 1e-12:
        return []
    a = levinson(r, orden)
    salida = []
    for z in np.roots(a):
        if np.imag(z) > 0.01:
            f = np.angle(z) * fs / (2 * np.pi)
            bw = -np.log(abs(z)) * fs / np.pi
            if 150 < f < 4800 and bw < 450:
                salida.append((f, bw))
    return sorted(salida)


def main() -> None:
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    wav, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
    paso = float(sys.argv[4]) / 1000 if len(sys.argv) > 4 else 0.01
    y, sr = sf.read(wav)
    if y.ndim > 1:
        y = y.mean(axis=1)
    fs = 10000
    y = resample_poly(y, fs, sr)
    vent = int(0.030 * fs)
    print(f"{'t (s)':>6s} {'dB':>6s} | {'F1':>5s} {'F2':>5s} {'F3':>5s}")
    t = t0
    while t < t1:
        i = int(t * fs)
        seg = y[i : i + vent]
        if len(seg) < vent:
            break
        db = 20 * np.log10(np.sqrt(np.mean(seg**2)) + 1e-9)
        f = formantes(seg, fs)
        tres = [f"{v[0]:5.0f}" for v in f[:3]] + ["    -"] * (3 - len(f[:3]))
        print(f"{t + 0.015:6.3f} {db:6.1f} | {' '.join(tres)}")
        t += paso


if __name__ == "__main__":
    main()
