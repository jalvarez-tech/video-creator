#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "soundfile"]
# ///
"""
voz-tratada.py — ¿la voz tratada de Isabella llega a su nivel SIN saturar? Medido sobre los WAV de la toma, antes y después.

Uso (desde la raíz del repo, con `remotion/public/recorrido-020/` repuesto por `node proyectos/020/normalizar.mjs`):
  uv run proyectos/020/herramientas/voz-tratada.py

POR QUÉ EXISTE. En la revisión 1 del final el usuario pidió «más decibeles sin saturar» para la voz de Isabella. Una ganancia sola no llega sin saturar (HK03 +9,4 dB, MD14 +4,1 y CT06 +2,7
obligan al limitador a bajar 6,3 · 3,4 · 5,5 dB) y por eso la receta (`normalizar.mjs`, `VOZ_TRATADA`) usa paso alto + compresor suave + ganancia + limitador. Aquí se mide, por toma:

  · el NIVEL de su ventana de voz (ebur128, integrado) antes y después, y el PICO REAL (dBTP) de lo que suena: tiene que quedar a ≤ −1 dBTP;
  · cuánto trabaja el COMPRESOR (reducción de los picos locales de 5 ms, percentil 95 y máximo) y cuánto el LIMITADOR (máximo): el limitador, por debajo de ≈ 3 dB, no se
    oye; a partir de 4-5 dB empieza a ahogar las consonantes;
  · el DESFASE entre la voz tratada y la original (correlación cruzada en ±40 ms): el limitador lleva `latency=1` y no retrasa; el paso alto (un IIR) mueve la fase unas
    pocas muestras (medido: −1 a −3, o sea 0,02-0,06 ms; un fotograma son 1.600 muestras): se tolera hasta 5. Más que eso movería la voz respecto de su boca y de sus subtítulos.

Los números de la cadena (umbral, razón, ganancia, techo) son los de `VOZ_TRATADA` de `normalizar.mjs`: si se cambian allí, se cambian aquí también.
Sale con 1 si una toma queda fuera de [−15,0 ± 0,3 LUFS · pico ≤ −1 dBTP · limitador ≤ 4 dB (el máximo es de un transitorio suelto: HK03 da 3,6) · desfase ≤ 5 muestras].
"""
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-020"
OBJETIVO, TECHO, RAZON, SOBRE = -15.0, -2.5, 2.5, 6.0
# toma: (ventana de voz [s0 − 0,10, s1 + 0,15] de `limites-voz.py`, nivel de la toma original, ganancia)
TOMAS = {
    "hk03": ((0.71, 6.19), -23.5, 10.6),
    "md14": ((0.47, 5.92), -18.7, 5.3),
    "ct06": ((0.76, 3.85), -15.7, 3.8),
}
TOLERANCIA_LUFS, PICO_MAX, LIMITADOR_MAX, DESFASE_MAX = 0.3, -1.0, 4.0, 5


def ffmpeg(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", *args], capture_output=True, text=True)


def nivel(ruta: Path, t0: float, t1: float) -> tuple[float, float]:
    r = ffmpeg("-ss", str(t0), "-t", str(t1 - t0), "-i", str(ruta), "-af", "ebur128=peak=true", "-f", "null", "-").stderr
    i = float(re.search(r"Integrated loudness:.*?I:\s+(-?[\d.]+) LUFS", r, re.S).group(1))
    p = float(re.search(r"True peak:.*?Peak:\s+(-?[\d.]+) dBFS", r, re.S).group(1))
    return i, p


def cadena(toma: str, hasta: str) -> np.ndarray:
    """La cadena de `normalizar.mjs` aplicada a la toma, parada tras `hasta` ('compresor', 'ganancia' o 'limitador')."""
    (_, niv, g) = TOMAS[toma]
    umbral = 10 ** ((niv + SOBRE) / 20)
    f = ["highpass=f=100", f"acompressor=threshold={umbral:.4f}:ratio={RAZON}:attack=10:release=150:knee=4:makeup=1"]
    if hasta in ("ganancia", "limitador"):
        f.append(f"volume={g}dB")
    if hasta == "limitador":
        f.append(f"alimiter=limit={10 ** (TECHO / 20):.4f}:attack=5:release=50:level=0:latency=1")
    tmp = Path(f"/tmp/voz-tratada-{toma}-{hasta}.wav")
    r = ffmpeg("-y", "-v", "error", "-i", str(VOCES / f"{toma}.wav"), "-af", ",".join(f), "-c:a", "pcm_f32le", "-ar", "48000", str(tmp))
    if r.returncode:
        sys.exit(r.stderr)
    y, _ = sf.read(tmp)
    return y


def reduccion(antes: np.ndarray, despues: np.ndarray) -> tuple[float, float]:
    """Reducción (dB) de los picos locales de 5 ms: percentil 95 y máximo, donde hay voz."""
    n = min(len(antes), len(despues)) // 240 * 240
    a = np.abs(antes[:n]).reshape(-1, 240).max(axis=1)
    b = np.abs(despues[:n]).reshape(-1, 240).max(axis=1)
    m = a > 0.05
    r = -20 * np.log10(np.maximum(b[m] / a[m], 1e-9))
    return float(np.percentile(r, 95)), float(r.max())


def desfase(a: np.ndarray, b: np.ndarray, centro: float) -> int:
    """Muestras de retraso de `b` respecto de `a` (positivo = llega tarde), en ±40 ms, sobre 0,5 s de voz."""
    i0 = int(centro * 48000)
    x = a[i0 : i0 + 24000]
    mejor, lag_mejor = -1.0, 0
    for lag in range(-1920, 1921, 1):
        y = b[i0 + lag : i0 + lag + 24000]
        if len(y) < len(x):
            continue
        c = float(np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y) + 1e-12))
        if c > mejor:
            mejor, lag_mejor = c, lag
    return lag_mejor


def main() -> None:
    malas = 0
    print(f"{'toma':5s} | {'antes':>7s} → {'después':>8s} LUFS | {'pico real':>9s} | {'compresor p95/máx':>18s} | {'limitador máx':>13s} | desfase")
    for toma, ((t0, t1), _, _) in TOMAS.items():
        original, tratada = VOCES / f"{toma}.wav", VOCES / f"{toma}-alta.wav"
        if not tratada.exists():
            sys.exit(f"falta {tratada}: node proyectos/020/normalizar.mjs")
        l0, _ = nivel(original, t0, t1)
        l1, p1 = nivel(tratada, t0, t1)
        y0, _ = sf.read(original)
        comp = cadena(toma, "compresor")
        pre = cadena(toma, "ganancia")
        post = cadena(toma, "limitador")
        c95, cmax = reduccion(y0, comp)  # lo que baja el compresor (con el paso alto, que casi no mueve los picos)
        _, lmax = reduccion(pre, post)  # lo que baja el limitador
        t, _ = sf.read(tratada)
        lag = desfase(y0, t, (t0 + t1) / 2)
        mal = abs(l1 - OBJETIVO) > TOLERANCIA_LUFS or p1 > PICO_MAX or lmax > LIMITADOR_MAX or abs(lag) > DESFASE_MAX
        malas += mal
        print(f"{toma:5s} | {l0:7.1f} → {l1:8.1f}      | {p1:6.1f} dB | {c95:8.1f} / {cmax:6.1f} dB | {lmax:10.1f} dB | {lag:+d} muestras{'  ← FUERA' if mal else ''}")
    print(f"\n{'❌' if malas else '✅'} {malas} toma(s) fuera de [{OBJETIVO:+.1f} ± {TOLERANCIA_LUFS} LUFS · pico ≤ {PICO_MAX:+.1f} dBTP · limitador ≤ {LIMITADOR_MAX} dB · desfase ≤ {DESFASE_MAX} muestras]")
    sys.exit(1 if malas else 0)


if __name__ == "__main__":
    main()
