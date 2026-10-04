#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
rejilla.py — ¿la canción tiene un PULSO (una recta de golpes) o FRASES? Y, si tiene pulso, cuál y con qué desvío.

Uso (desde la raíz del repo):
  uv run proyectos/020/herramientas/rejilla.py "ruta/Cancion.mp3" --desde 178.057 --hasta 213 [--bpm 120]

En el 018 la rejilla de «Return to Oasis» se halló «con una peineta sobre la envolvente» y a mano; aquí es un script, para
que dos canciones se comparen con la misma vara:

  · golpes = los de `medir-pista.py` (subidas de ≥ 6 dB en 15 ms, banda 80-3000 Hz), con su fuerza;
  · barre periodos de 0,25 a 1,30 s (a saltos de 0,05 ms); para cada uno, la FASE que más golpes alinea, y puntúa con una campana
    de 20 ms (cada golpe pesa lo que su fuerza menos 5 dB): cuántos golpes caen a ≤ 15 ms de la recta;
  · imprime los mejores periodos (con sus múltiplos y divisores, que el barrido confunde: el 1.º es el pulso y el doble o la mitad
    son lecturas del mismo compás) y, para el mejor, el desvío medio de los golpes FUERTES (≥ 9 dB) respecto de la recta.

CÓMO SE LEE. Un pulso de verdad deja ≥ 70 % de los golpes fuertes a ≤ 15 ms de la recta y un desvío medio ≤ 15 ms. Si no
llega, la canción va por FRASES (golpes de frase tras un respiro, como *Time*): la rejilla se ancla en esos golpes, no en una recta.
Y, como aprendió el 018 (aprendizajes §1), aunque haya pulso NO todo pulso SUENA: un corte seco se comprueba además sobre el audio
del render (`golpes-render.py`).
"""
import argparse
import subprocess

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

SR = 48000


def golpes_de(ruta: str, desde: float, hasta: float):
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True
    ).stdout
    y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    sos = butter(4, [80, 3000], btype="band", fs=SR, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.006 * SR), int(0.001 * SR)
    cb = np.concatenate(([0.0], np.cumsum(b**2)))
    ini = np.arange(0, len(b) - win + 1, hop)
    db = 20 * np.log10(np.sqrt((cb[ini + win] - cb[ini]) / win + 1e-12))
    i0, i1 = int(desde * 1000), int(hasta * 1000)
    seg = db[i0:i1]
    sub = seg[15:] - seg[:-15]
    picos, _ = find_peaks(sub, height=6.0, distance=350)
    out = []
    for p in picos:
        k = p
        while k > 0 and seg[k] > seg[k - 1] - 0.05:
            k -= 1
        out.append((desde + k / 1000.0, float(sub[p])))
    return out


def ajusta(t: np.ndarray, w: np.ndarray, periodos: np.ndarray, sigma: float = 0.020):
    mejor = []
    for T in periodos:
        ang = 2 * np.pi * (t % T) / T
        # fase = argumento de la suma ponderada de fasores
        fase = np.angle(np.sum(w * np.exp(1j * ang)))
        res = ((ang - fase + np.pi) % (2 * np.pi) - np.pi) * T / (2 * np.pi)
        puntos = float(np.sum(w * np.exp(-0.5 * (res / sigma) ** 2)))
        mejor.append((puntos, T, fase * T / (2 * np.pi) % T))
    return sorted(mejor, reverse=True)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pista")
    ap.add_argument("--desde", type=float, required=True)
    ap.add_argument("--hasta", type=float, required=True)
    ap.add_argument("--bpm", type=float, help="BPM del catálogo: solo informa de su periodo, su mitad y su doble para compararlos")
    a = ap.parse_args()

    g = golpes_de(a.pista, a.desde, a.hasta)
    t = np.array([x[0] for x in g])
    f = np.array([x[1] for x in g])
    w = np.maximum(f - 5.0, 0.0)
    print(f"{a.pista}\nventana {a.desde:.3f}-{a.hasta:.3f} s · {len(g)} golpes ≥ 6 dB ({int((f >= 9).sum())} fuertes)")
    periodos = np.arange(0.25, 1.30, 0.00005)
    r = ajusta(t, w, periodos)
    # Los mejores periodos DISTINTOS (separa los que difieren < 1,5 %).
    vistos = []
    for puntos, T, fase in r:
        if all(abs(T - v[1]) / v[1] > 0.015 for v in vistos):
            vistos.append((puntos, T, fase))
        if len(vistos) >= 5:
            break
    print("\n  periodo (s) · BPM · puntos · fase (s) · golpes ≥ 9 dB a ≤ 15 ms de la recta · desvío medio de los fuertes")
    fuertes = f >= 9.0
    for puntos, T, fase in vistos:
        res = ((t - fase + T / 2) % T) - T / 2
        ok = np.abs(res[fuertes]) <= 0.015
        print(
            f"   {T:8.4f}  · {60 / T:6.2f} · {puntos:6.1f} · {fase:6.4f} · {int(ok.sum()):3d}/{int(fuertes.sum()):3d} ({100 * ok.mean():4.0f} %) · "
            f"{1000 * np.abs(res[fuertes]).mean():5.1f} ms"
        )
    if a.bpm:
        print(f"\n  catálogo: {a.bpm:g} BPM = {60 / a.bpm:.4f} s (y su mitad {30 / a.bpm:.4f} s / doble {120 / a.bpm:.4f} s)")
    # Intervalos entre golpes fuertes consecutivos: ¿hay una frase regular?
    tf = t[fuertes]
    if len(tf) > 3:
        d = np.diff(tf)
        print(f"\n  intervalos entre golpes fuertes: mediana {np.median(d):.3f} s · p25 {np.percentile(d, 25):.3f} · p75 {np.percentile(d, 75):.3f}")


if __name__ == "__main__":
    main()
