#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/023/herramientas/lineas-vs-onsets.py

POR QUÉ EXISTE. `subs-vs-voz.py` mide sobre el render, y con música debajo el detector se pierde onsets suaves
(en el 020 dio «está en los metros» 8 f pronto cuando estaba a 0,5) y confunde la primera sílaba de una toma. Aquí
se mide sobre el WAV de la toma, donde los valles se ven (−65 dB entre palabras), y se comprueba contra lo que se
oye de verdad: el segundo en que EMPIEZA la primera palabra de cada línea está escrito a mano en `LINEAS`, sacado de
los onsets de la energía (`proyectos/017/herramientas/onsets-voz.py`) y de `palabras-desde.py` (qué palabra es la
primera que oye whisper desde ese instante). Un «onset más cercano» NO es la palabra: en «a veces está en | cómo
entra» el más cercano a «cómo» es el «en» de la línea anterior (4,285 s), y «cómo» empieza en 4,450.

Da, por línea: el frame de la composición en que suena su palabra (`en + t·30 − desde`), cuántos frames antes entra la
línea (lo bueno, 0-3: la línea funde 5 f) y a cuántos ms de la palabra cae el onset de energía más próximo (si es
> 40 ms, la palabra no empieza con un onset: una /r/ vibrante, una vocal pegada a otra; se dice en la nota).
Si cambia una línea de `subtitulos-023.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-023"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-023.ts
TOMAS = {"hk3": (0, 0), "md3": (523, 15), "ct2": (996, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo sale de `trozos-editoriales.mjs --audio` (DTW de whisper anclado a la energía) y se compara con los onsets de la voz sola
# (`onsets-voz.py`). OJO: el barrido de `palabras-desde.py` (cortes cada 40 ms) NO afinó nada en esta pieza: whisper devuelve las mismas palabras
# en ventanas de ±0,2 s y a veces pierde la primera con un corte más temprano que otro; no se usa como medida de tiempo, solo de identidad.
LINEAS = [
    ("hk3", 22, "Si quieres", 0.720, "primera toma de Isabella: entra a corte; la voz (energía) arranca a 0,72 s (`limites-voz.py`)"),
    ("hk3", 29, "un apartamento", 0.960, "DTW 0,96 s"),
    ("hk3", 48, "para vivir", 1.600, "DTW 1,60 s"),
    ("hk3", 72, "o considerar para", 2.440, "DTW 2,10 s es 0,34 s PRONTO: la energía tiene un silencio de −45/−52 dB en 2,24-2,40 s (la pausa tras «vivir») y la «o» suena a los 2,44 s"),
    ("hk3", 104, "renta corta,", 3.500, "DTW 3,22 s es la «ra» de «para»; la energía da «para» a 3,14 s y «ren-» a 3,50 s tras un valle de −37 dB"),
    ("hk3", 135, "mira esto.", 4.490, "voz tras la pausa de 4,11-4,49 s (`limites-voz.py`)"),
    ("md3", 541, "Cuenta con", 1.090, "la voz arranca a 1,09 s (`limites-voz.py`)"),
    ("md3", 552, "dos habitaciones", 1.480, "DTW 1,48 s"),
    ("md3", 568, "independientes,", 2.000, "DTW 2,06 s; los cortes con `palabras-desde.py` empiezan por «independiente» desde 1,98 s y traen «implementaciones» antes de 1,90 s"),
    ("md3", 604, "balcón", 3.210, "voz tras la pausa de 3,01-3,21 s (`limites-voz.py`)"),
    ("md3", 612, "y ubicación junto a", 3.480, "DTW 3,68 s es 0,2 s TARDE: valle de −43 dB en 3,40-3,44 s (tras «balcón») y la «y» sube a los 3,48 s"),
    ("md3", 653, "City Plaza.", 4.830, "onsets 4,79 y 4,91 s; DTW de «City» 4,87 s"),
    ("ct2", 1013, "Si te gusta", 0.950, "la voz arranca a 0,95 s tras 850 ms de silencio (el clic de 0,03 s queda fuera del plano)"),
    ("ct2", 1024, "esta vista,", 1.320, "DTW 1,32 s"),
    ("ct2", 1041, "contáctanos", 1.940, "DTW 2,24 s es 0,3 s TARDE: valle de −40/−46 dB en 1,82-1,90 s y la voz sube a 1,94 s; los cortes desde 1,94 s empiezan por «contacta»"),
    ("ct2", 1076, "y agendemos", 3.060, "voz tras una micropausa (el DTW pone la «y» en 2,84 s)"),
    ("ct2", 1090, "una visita.", 3.540, "onset 3,565 s tras «agendemos»; DTW 3,50 s"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen


def onsets(ruta: Path) -> np.ndarray:
    y, sr = sf.read(ruta)
    if y.ndim > 1:
        y = y.mean(axis=1)
    b = sosfilt(butter(4, [300, 3400], btype="band", fs=sr, output="sos"), y.astype(np.float64))
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
        k = v
        while k < j and dbs[k] < dbs[v] + 0.4 * sube:
            k += 1
        salida.append(t[k])
    return np.array(salida)


def main() -> None:
    ons = {toma: onsets(VOCES / f"{toma}.wav") for toma in TOMAS}
    print(f"{'línea':26s} {'entra':>5s} | {'palabra':>8s} → {'frame':>7s} | {'adelanto':>8s} | onset más próximo")
    malas = 0
    for toma, frame, texto, t, nota in LINEAS:
        en, desde = TOMAS[toma]
        f_palabra = en + t * 30 - desde
        adelanto = f_palabra - frame
        cerca = ons[toma][np.argmin(np.abs(ons[toma] - t))]
        mal = not (ADELANTO_MIN <= adelanto <= ADELANTO_MAX)
        malas += mal
        marca = "  ← FUERA de 0-3 f" if mal else ""
        sin_onset = f" · ⚠ a {abs(cerca - t) * 1000:.0f} ms ({nota})" if abs(cerca - t) > 0.04 else ""
        print(f"{texto:26s} {frame:5d} | {t:7.3f}s → f{f_palabra:7.1f} | {adelanto:+7.1f} f | {cerca:6.3f} s ({(cerca - t) * 1000:+4.0f} ms){sin_onset}{marca}")
    print(f"\n{'❌' if malas else '✅'} {malas} línea(s) fuera de [{ADELANTO_MIN:+.1f}, {ADELANTO_MAX:+.1f}] f")
    sys.exit(1 if malas else 0)


if __name__ == "__main__":
    main()
