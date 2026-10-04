#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
buscar-entrada.py — ¿en qué segundo de qué canción hay que entrar para que su CAÍDA caiga donde entra el CTA?

Uso (desde la raíz del repo):
  uv run proyectos/020/herramientas/buscar-entrada.py                          (toda la biblioteca de Luxur)
  uv run proyectos/020/herramientas/buscar-entrada.py --cta 33 40 --top 3       (el CTA entra entre los 33 y los 40 s)
  uv run proyectos/020/herramientas/buscar-entrada.py "ruta/a/Cancion.mp3" --cta 35 38

POR QUÉ EXISTE. El catálogo de música da un `desde` por duración de vídeo (el golpe que abre y el clímax hacia el 75 %), pero un
reel de Los Patios pide otra cosa: un GOLPE en el frame 0 y una CAÍDA o RESOLUCIÓN justo en el instante en que entra el CTA
(la voz de Isabella queda a solas sobre un lecho suave: en el 017 y el 018 fue un piano). Con 43 pistas y varios cientos de golpes
cada una, mirarlo a mano es lo que se hizo en el 017 («miré ocho candidatas»). Aquí se hace entero:

  · golpes = subidas de ≥ 6 dB en 15 ms de la banda 80-3000 Hz (el detector de `medir-pista.py`); entra un golpe FUERTE (≥ 9 dB);
  · sonoridad = RMS de 1 s a saltos de 0,1 s (en dB, relativa: sirve para comparar dentro de una pista);
  · para cada golpe fuerte como entrada `s0`, se busca entre `s0 + cta_min` y `s0 + cta_max` el instante `t` con la mayor CAÍDA
    sostenida: sonoridad media de [t−5, t−1] menos la de [t+0,5, t+4,5] (una caída que no se recupera);
  · puntúa la caída (tope 14 dB), que la meseta anterior sea estable y suene como el golpe de entrada (que el frame 0 no sea el
    punto más bajo de la pieza) y que haya golpes fuertes en la meseta para cortar a ellos.

LO QUE NO HACE: no oye. Un golpe medido puede ser una nota que no suena bien como primera nota, y una caída puede ser un fundido
a silencio en el que el CTA no se lee. Lo que sale de aquí son CANDIDATOS: se miran con `medir-pista.py --png` y se oyen.
"""
import argparse
import os
import subprocess
import sys
from pathlib import Path

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

BIBLIOTECA = Path(os.environ.get("BIBLIOTECA_MUSICA", Path.home() / "Work" / "Propiedades Luxur" / "Music"))
SR = 48000


def decodifica(ruta: Path) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", str(ruta), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True,
        check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)


def analiza(ruta: Path, cta: tuple[float, float], top: int):
    y = decodifica(ruta)
    dur = len(y) / SR
    sos = butter(4, [80, 3000], btype="band", fs=SR, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.006 * SR), int(0.001 * SR)
    cb = np.concatenate(([0.0], np.cumsum(b**2)))
    ini_e = np.arange(0, len(b) - win + 1, hop)
    e = np.sqrt((cb[ini_e + win] - cb[ini_e]) / win + 1e-12)
    db = 20 * np.log10(e)  # un valor por ms
    sub = db[15:] - db[:-15]
    picos, _ = find_peaks(sub, height=6.0, distance=350)
    golpes = []
    for p in picos:
        k = p
        while k > 0 and db[k] > db[k - 1] - 0.05:
            k -= 1
        golpes.append((k / 1000.0, float(sub[p])))
    # Sonoridad: RMS de 1 s cada 0,1 s, de la señal completa (dB relativos).
    paso = int(0.1 * SR)
    ventana = SR
    c = np.concatenate(([0.0], np.cumsum(y**2)))  # media móvil por sumas acumuladas (la convolución directa tardaría minutos)
    inicios = np.arange(0, len(y) - ventana + 1, paso)
    cuad = (c[inicios + ventana] - c[inicios]) / ventana
    L = 10 * np.log10(cuad + 1e-12)
    t_L = np.arange(len(L)) * 0.1 + 0.5  # centro de cada ventana
    activo = L[L > L.max() - 40]
    suelo = np.percentile(activo, 30) if len(activo) else L.min()

    def media(a, z):
        m = (t_L >= a) & (t_L < z)
        return float(L[m].mean()) if m.any() else float("nan")

    cand = []
    for (s0, f) in golpes:
        if f < 9.0 or s0 + cta[1] + 5 > dur - 1:
            continue
        despues = media(s0 + 0.3, s0 + 3.0)
        if np.isnan(despues) or despues < suelo:  # el golpe de entrada tiene que dejar la música ARRIBA
            continue
        mejor = None
        for t in np.arange(s0 + cta[0], s0 + cta[1] + 1e-9, 0.1):
            antes = media(t - 5.0, t - 1.0)
            tras = media(t + 0.5, t + 4.5)
            caida = antes - tras
            m = (t_L >= s0 + 3.0) & (t_L < t - 1.0)
            if m.sum() < 20:
                continue
            estab = float(L[m].std())
            if mejor is None or caida > mejor[0]:
                mejor = (caida, t, estab, antes, tras)
        if mejor is None:
            continue
        caida, t, estab, antes, tras = mejor
        fuertes = [g for g in golpes if s0 <= g[0] <= t and g[1] >= 9.0]
        # La meseta suena como la entrada: el golpe no puede ser una pieza más alta que lo que sigue (ni la meseta, un susurro).
        nivel_ok = min(0.0, (antes - despues) + 3.0)  # penaliza si la meseta está > 3 dB por debajo del arranque
        puntos = min(caida, 14.0) - 0.8 * estab + 2.0 * nivel_ok + min(len(fuertes), 12) * 0.15
        cand.append(dict(s0=s0, fuerza=f, t_caida=t - s0, caida=caida, estab=estab, antes=antes, tras=tras, fuertes=len(fuertes), puntos=puntos))
    cand.sort(key=lambda c: -c["puntos"])
    # Quita candidatos casi iguales (mismo segundo de caída ± 2 s) para que los `top` sean distintos.
    out = []
    for c in cand:
        if all(abs((c["s0"] + c["t_caida"]) - (o["s0"] + o["t_caida"])) > 2.0 for o in out):
            out.append(c)
        if len(out) >= top:
            break
    return dur, out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pistas", nargs="*", help="archivos de audio (por defecto, toda la biblioteca de Luxur)")
    ap.add_argument("--cta", nargs=2, type=float, default=[33.0, 40.0], metavar=("MIN", "MAX"), help="s desde la entrada en que cae el CTA")
    ap.add_argument("--top", type=int, default=2, help="candidatos por pista")
    ap.add_argument("--excluye", nargs="*", default=["Hans Zimmer - Time", "Return to Oasis"], help="pistas ya usadas (tachadas)")
    a = ap.parse_args()
    pistas = [Path(p) for p in a.pistas] or sorted(BIBLIOTECA.glob("*.mp3"))
    print(f"CTA entre {a.cta[0]:g} y {a.cta[1]:g} s tras la entrada · golpe de entrada ≥ 9 dB · {len(pistas)} pistas\n")
    print(f"{'pista':58s} {'entrada':>8s} {'golpe':>6s} {'cae en':>7s} {'caída':>6s} {'meseta σ':>9s} {'antes→tras':>12s} {'golpes':>6s} {'pts':>5s}")
    for p in pistas:
        if any(x in p.name for x in a.excluye):
            continue
        try:
            dur, cs = analiza(p, tuple(a.cta), a.top)
        except Exception as ex:  # noqa: BLE001
            print(f"{p.stem[:58]:58s}  error: {ex}", file=sys.stderr)
            continue
        if not cs:
            print(f"{p.stem[:58]:58s}  — sin candidato (no hay golpe fuerte con caída en esa ventana)")
            continue
        for i, c in enumerate(cs):
            nombre = p.stem[:58] if i == 0 else ""
            print(
                f"{nombre:58s} {c['s0']:8.3f} {c['fuerza']:5.1f}d {c['t_caida']:6.1f}s {c['caida']:5.1f}d {c['estab']:8.1f}d "
                f"{c['antes']:5.1f}→{c['tras']:5.1f}d {c['fuertes']:6d} {c['puntos']:5.1f}"
            )


if __name__ == "__main__":
    main()
