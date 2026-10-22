#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile", "matplotlib"]
# ///
"""
medir-pista.py — los GOLPES de una canción y su sonoridad, para cortar un montaje al compás.

Uso (desde la raíz del repo):
  uv run proyectos/017/herramientas/medir-pista.py remotion/public/recorrido-017/musica-017.wav --desde 175.6 --dur 50
  uv run proyectos/017/herramientas/medir-pista.py "ruta/Cancion.mp3" --desde 140.8 --dur 50 --png out.png

Es lo que se hizo a mano con «Time» en el 017, ya en un script. Para CADA pista candidata
sirve para ver, antes de montar nada, dónde caen sus golpes de frase y qué arco de energía
tiene la ventana que se va a usar:

  · decodifica con ffmpeg (el MP3 se decodifica ENTERO antes de recortar: el retardo del
    códec no cuenta) a mono 48 kHz;
  · energía en la banda 80-3000 Hz (ventana de 6 ms, salto de 1 ms) y GOLPES = subidas de
    ≥ 6 dB en 15 ms. El instante que imprime es el de «empieza a subir» (el oído coloca el
    golpe unos 12 ms después; el render de Remotion saca el audio 42 ms TARDE: ver
    `RETARDO_AUDIO` en metraje-017.ts);
  · la sonoridad (ebur128) de cada tramo de 5 s: dice dónde está la meseta y dónde cae.

EL PULSO Y LA FRASE SE LEEN EN LA LISTA, no los adivina el script: en «Time» los golpes de frase
(los que empiezan tras un respiro) caen cada 7,6 s —8 pulsos de 0,95 s— y entre ellos hay decenas
de golpes menores (cada nota del arpegio, a 0,476 s). Un estimador automático del BPM se probó
(autocorrelación y ajuste de fase) y confundía el pulso con sus divisores: el BPM de cada pista,
medido con librosa, está en `Music/catalogo-musica.md`, y la rejilla de un montaje se ancla en los
golpes de FRASE que se vean aquí (ver `FRASES` en `metraje-017.ts`).

⚠️ Mide la ventana, no la canción entera: el `--desde` del catálogo de música
(`Music/catalogo-musica.md`) es el punto de partida, y el golpe de ENTRADA de esa ventana
cae 30 ms después. Lo que NO mide: si el golpe «suena bien» como primera nota (el oído).
"""
import argparse
import subprocess
import sys

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt


def decodifica(ruta: str) -> tuple[np.ndarray, int]:
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-ac", "1", "-ar", "48000", "-f", "f32le", "-"],
        capture_output=True,
        check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64), 48000


def lufs(ruta: str, desde: float, dur: float) -> str:
    """Sonoridad integrada de un tramo (`-ss` DELANTE de `-i`: detrás mide la canción desde el principio)."""
    r = subprocess.run(
        ["ffmpeg", "-nostdin", "-hide_banner", "-ss", str(desde), "-t", str(dur), "-i", ruta, "-af", "ebur128=peak=true", "-f", "null", "-"],
        capture_output=True,
        text=True,
    ).stderr
    i = p = "?"
    en_resumen = False
    for linea in r.splitlines():
        if "Integrated loudness" in linea:
            en_resumen = True
        if en_resumen and linea.strip().startswith("I:"):
            i = linea.split()[1]
        if en_resumen and linea.strip().startswith("Peak:"):
            p = linea.split()[1]
    return f"{i} LUFS · pico {p} dBFS"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pista")
    ap.add_argument("--desde", type=float, default=0.0, help="segundo de la canción en que empieza la ventana")
    ap.add_argument("--dur", type=float, default=50.0, help="segundos de ventana")
    ap.add_argument("--umbral", type=float, default=6.0, help="dB de subida en 15 ms para contar un golpe")
    ap.add_argument("--png", help="guarda una imagen de la energía con los golpes")
    ap.add_argument("--json", help="guarda los golpes (segundo de la CANCIÓN y fuerza en dB por 15 ms) en un JSON: es el que lee la puerta de la pieza")
    a = ap.parse_args()

    y, sr = decodifica(a.pista)
    sos = butter(4, [80, 3000], btype="band", fs=sr, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.006 * sr), int(0.001 * sr)
    e = np.sqrt(np.convolve(b**2, np.ones(win) / win, mode="valid")[::hop] + 1e-12)
    db = 20 * np.log10(e)
    t = np.arange(len(db)) * hop / sr

    i0, i1 = int(a.desde * 1000), int((a.desde + a.dur) * 1000)
    seg = db[i0:i1]
    if len(seg) < 100:
        sys.exit("la ventana cae fuera de la canción")
    sub = seg[15:] - seg[:-15]
    picos, _ = find_peaks(sub, height=a.umbral, distance=350)
    golpes = []
    for p in picos:
        k = p
        while k > 0 and seg[k] > seg[k - 1] - 0.05:
            k -= 1
        golpes.append((a.desde + k / 1000, float(sub[p])))

    if a.json:
        import json as _json
        from pathlib import Path as _Path

        _Path(a.json).parent.mkdir(parents=True, exist_ok=True)
        _Path(a.json).write_text(
            _json.dumps(
                {"pista": a.pista, "desde": a.desde, "dur": a.dur, "umbral_db": a.umbral, "golpes": [{"t": round(tg, 3), "db": round(f, 1)} for tg, f in golpes]},
                ensure_ascii=False,
                indent=1,
            ),
            encoding="utf-8",
        )
    print(f"\n{a.pista}\nventana {a.desde:.3f}-{a.desde + a.dur:.3f} s · {len(golpes)} golpes de ≥ {a.umbral:g} dB")
    print("\n  golpe en la canción | en la ventana | fuerza (dB/15 ms)")
    for tg, f in golpes:
        marca = "  ◀ fuerte" if f >= 9 else ""
        print(f"        {tg:9.3f} s   |   {tg - a.desde:7.3f} s  |  {f:5.1f}{marca}")

    print("\n  sonoridad por tramos de 5 s:")
    for k in range(0, int(a.dur), 5):
        print(f"    {k:3d}-{k + 5:3d} s   {lufs(a.pista, a.desde + k, min(5, a.dur - k))}")
    print(f"    ventana entera  {lufs(a.pista, a.desde, a.dur)}")

    if a.png:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots(figsize=(14, 4))
        ax.plot(t[i0:i1] - a.desde, seg, lw=0.6)
        for tg, f in golpes:
            ax.axvline(tg - a.desde, color="#c33" if f >= 9 else "#caa", lw=1.0 if f >= 9 else 0.5)
        ax.set_xlabel("s desde el inicio de la ventana")
        ax.set_ylabel("dB (80-3000 Hz)")
        plt.tight_layout()
        plt.savefig(a.png, dpi=80)
        print(f"\n  imagen: {a.png}")


if __name__ == "__main__":
    main()
