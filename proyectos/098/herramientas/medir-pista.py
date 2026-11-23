#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "matplotlib"]
# ///
"""
medir-pista.py — la pieza del 098 («Tu Estás Aquí», Samy Galí, piano) medida segundo a segundo.

Uso (desde la raíz del repo):
  uv run proyectos/098/herramientas/medir-pista.py <pista> [--png salida.png] [--json salida.json] [--desde 0 --hasta 267]

Imprime y guarda:
  · la SONORIDAD relativa (RMS de 1 s a saltos de 0,5 s, en dB): dónde la pieza crece, se calma o respira;
  · los GOLPES: subidas de ≥ 12 dB en ventanas de 15 ms sobre la media de los 90 ms anteriores, banda 80-3000 Hz (la vara
    del 097, para que los dos vídeos de MAS se corten con la misma), con su fuerza;
  · los RESPIROS: tramos de ≥ 0,6 s en que la sonoridad cae ≥ 10 dB bajo la mediana de la pieza (un corte de frase).
Con `--png`, la envolvente, los golpes fuertes y un espectrograma de 0-5 kHz (la voz cantada se ve como armónicos que se
deslizan por encima de 1 kHz; el piano, como rayas horizontales que se apagan).

LO QUE NO HACE: no oye. La voz cantada se comprueba aparte, con whisper sobre la pista.
"""
import argparse
import json
import subprocess

import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000


def decodifica(ruta: str) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pista")
    ap.add_argument("--png")
    ap.add_argument("--json")
    ap.add_argument("--desde", type=float, default=0)
    ap.add_argument("--hasta", type=float, default=None)
    ap.add_argument("--umbral", type=float, default=12.0)
    a = ap.parse_args()

    y = decodifica(a.pista)
    dur = len(y) / SR
    # Sonoridad: RMS de 1 s a saltos de 0,5 s.
    paso = 0.5
    son = []
    t = 0.0
    while t + 1 <= dur:
        s = y[int(t * SR) : int((t + 1) * SR)]
        son.append((round(t + 0.5, 2), round(float(20 * np.log10(np.sqrt(np.mean(s**2)) + 1e-9)), 1)))
        t += paso
    # Golpes: ventanas de 15 ms (saltos de 5 ms) en 80-3000 Hz; subida sobre la media de las 90 ms anteriores.
    sos = butter(4, [80, 3000], btype="band", fs=SR, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.015 * SR), int(0.005 * SR)
    cb = np.concatenate(([0.0], np.cumsum(b**2)))
    ini = np.arange(0, len(b) - win + 1, hop)
    e = 10 * np.log10((cb[ini + win] - cb[ini]) / win + 1e-12)
    golpes = []
    atras = int(0.09 / 0.005)
    ultimo = -1.0
    for i in range(atras, len(e)):
        base = 10 * np.log10(np.mean(10 ** (e[i - atras : i] / 10)) + 1e-12)
        sube = e[i] - base
        ts = ini[i] / SR
        if sube >= a.umbral and ts - ultimo > 0.12:
            golpes.append((round(ts, 3), round(float(sube), 1), round(float(e[i]), 1)))
            ultimo = ts
    # Respiros.
    med = float(np.median([v for _, v in son]))
    respiros = []
    dentro = None
    for t, v in son:
        if v <= med - 10:
            dentro = dentro if dentro is not None else t
        else:
            if dentro is not None and t - dentro >= 0.6:
                respiros.append((dentro, t))
            dentro = None

    hasta = a.hasta if a.hasta is not None else dur
    print(f"duración {dur:.2f} s · mediana de la sonoridad {med:.1f} dB")
    print("\nSONORIDAD (cada 2 s):")
    linea = []
    for t, v in son:
        if a.desde <= t <= hasta and abs((t * 2) % 4) < 1e-6:
            linea.append(f"{t:6.1f}:{v:6.1f}")
            if len(linea) == 8:
                print("  " + "  ".join(linea))
                linea = []
    if linea:
        print("  " + "  ".join(linea))
    print(f"\nGOLPES ≥ {a.umbral} dB ({len(golpes)} en la pieza):")
    for g in golpes:
        if a.desde <= g[0] <= hasta:
            print(f"  {g[0]:8.3f} s  +{g[1]:4.1f} dB  ({g[2]:.1f})")
    print("\nRESPIROS (≥ 10 dB bajo la mediana, ≥ 0,6 s):")
    for r in respiros:
        print(f"  {r[0]:.1f}-{r[1]:.1f} s")

    if a.json:
        with open(a.json, "w") as f:
            json.dump({"pista": a.pista, "duracion": dur, "mediana": med, "sonoridad": son, "golpes": golpes, "respiros": respiros}, f, indent=1)
    if a.png:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        from scipy.signal import spectrogram

        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(26, 9), sharex=True, gridspec_kw={"height_ratios": [1, 1.4]})
        ts = [t for t, _ in son]
        ax1.plot(ts, [v for _, v in son], lw=1)
        for g in golpes:
            if g[1] >= 15:
                ax1.axvline(g[0], color="r", lw=0.4, alpha=0.6)
        ax1.set_xticks(np.arange(0, dur, 5))
        ax1.grid(alpha=0.3)
        ax1.set_ylabel("dB (RMS 1 s)")
        dec = 4
        yy = y[::dec]
        f, tt, S = spectrogram(yy, fs=SR / dec, nperseg=2048, noverlap=1536)
        m = f <= 5000
        ax2.pcolormesh(tt, f[m], 10 * np.log10(S[m] + 1e-12), shading="auto", cmap="magma", vmin=-110, vmax=-40)
        ax2.set_ylabel("Hz")
        ax2.set_xlim(a.desde, hasta)
        plt.tight_layout()
        plt.savefig(a.png, dpi=70)
        print(f"\nPNG: {a.png}")


if __name__ == "__main__":
    main()
