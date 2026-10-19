#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/041/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-041.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-041"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-041.ts
TOMAS = {"hk07": (115, 4), "md01": (519, 4), "ct01": (986, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk07", 122, "3.428 metros cuadrados", 0.415, "primera sílaba (onset de 73 dB desde −85 dB); antes, 0,3 s de ruido grave a −68 dBFS"),
    ("hk07", 177, "por 800 millones.", 2.270, "desde 2,27 oye «por 800 millones»"),
    ("hk07", 235, "Vente, te muestro", 4.185, "tras la pausa de 3,95-4,18 s; desde 4,185 oye «Vente, muestro» y desde 4,395 «Te muestro»"),
    ("hk07", 251, "todo lo que", 4.735, "valle de −80 dB tras «muestro»; desde 4,735 oye «todo lo que estás comprando»"),
    ("hk07", 270, "estás comprando.", 5.380, "desde 5,355 oye «que estás comprando» y desde 5,45 solo «comprando»: «estás» empieza entre las dos"),
    ("md01", 526, "Dos accesos", 0.410, "primera sílaba (onset de 65 dB; el principio, un murmullo grave de /d/)"),
    ("md01", 556, "para un mismo lote,", 1.435, "tras la pausa de 1,24-1,40 s; desde 1,10-1,38 oye «para un mismo lote»"),
    ("md01", 592, "una por la parcelación,", 2.615, "tras la pausa de «lote,»; desde 2,185 y 2,615 oye «una por la parcelación y»"),
    ("md01", 635, "y otra por", 4.055, "desde 4,055 y 4,10 oye «y otros por la vía»"),
    ("md01", 647, "la vía veredal.", 4.470, "desde 4,385 oye «por la vía heredal» y desde 4,47 «y ahora y dale»: «la» empieza hacia 4,47"),
    ("ct01", 993, "Si quieres conocerlo,", 0.675, "primera sílaba (onset de 56 dB desde el silencio)"),
    ("ct01", 1025, "escríbeme lote", 1.765, "tras la pausa de 1,60-1,76 s; desde 1,905 oye «críeme elote»: «es-» empieza antes"),
    ("ct01", 1049, "y te envío", 2.535, "desde 2,535 oye «y te envió toda la»"),
    ("ct01", 1069, "toda la información.", 3.210, "desde 3,21 oye «toda la información»"),
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
