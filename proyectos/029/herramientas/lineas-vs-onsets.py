#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/029/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-029.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-029"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-029.ts
TOMAS = {"ct14": (60, 27), "ct07": (128, 22), "ct01": (215, 22), "ct09": (315, 19), "ct16": (399, 13), "ct18": (497, 14)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("ct14", 61, "La infancia", 0.945, "primera sílaba"),
    ("ct14", 79, "pasa rápido.", 1.54, "«pasa»: whisper oye «para» desde 1,50 y «pasa» desde 1,53"),
    ("ct07", 129, "Tu familia merece", 0.765, "primera sílaba"),
    ("ct07", 159, "respirar distinto.", 1.81, "«respirar»: desde 1,70 y 1,76 oye «de respirar»; desde 1,80 «respirar»"),
    ("ct01", 215, "Diseño moderno,", 0.745, "primera sílaba"),
    ("ct01", 246, "naturaleza", 1.785, "onset de −74 dB"),
    ("ct01", 258, "y privacidad.", 2.20, "desde 2,16 oye «alesa y privacidad»; desde 2,20 «y privacidad»"),
    ("ct09", 315, "Una casa donde", 0.675, "primera sílaba"),
    ("ct09", 346, "todos caben", 1.70, "desde 1,66 oye «de todos»; desde 1,70 «todos»"),
    ("ct09", 361, "cómodos.", 2.19, "«cómodos»: desde 2,17 oye «incómodos», desde 2,22 «como»; vocal pegada a la «n» de «caben»: sin onset"),
    ("ct16", 399, "Esta no es solo", 0.425, "primera sílaba"),
    ("ct16", 426, "una casa,", 1.36, "desde 1,36 oye «una casa, es patrimonio»"),
    ("ct16", 449, "es patrimonio.", 2.14, "desde 2,14 oye «es patrimonio»"),
    ("ct18", 497, "Volver no es una idea,", 0.495, "primera sílaba: la imagen es opaca en f497 y su primer frame de voz es f498"),
    ("ct18", 545, "es una dirección.", 2.13, "desde 2,13 oye «es una dirección»"),
    ("ct18", 577, "Haz clic en el enlace", 3.17, "desde 3,14 oye «has clic»; desde 3,17 «haz clic»"),
    ("ct18", 605, "y agendemos", 4.125, "desde 4,125 oye «y agendemos su visita»"),
    ("ct18", 627, "su visita.", 4.84, "desde 4,78 oye «de Musubicita»; desde 4,83 «su visita»"),
    ("ct18", 654, "Puede ser virtual", 5.775, "desde 5,775 oye «Puede ser virtual o»"),
    ("ct18", 673, "o presencial.", 6.39, "desde 6,39 oye «o presencial»"),
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
