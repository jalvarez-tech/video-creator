#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/020/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-020.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-020"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-020.ts
TOMAS = {"hk03": (76, 21), "md14": (565, 15), "ct06": (1089, 23)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# Cada segundo está comprobado a mano con `onsets-voz.py` (el arranque de la sílaba tras un valle) y `palabras-desde.py` (qué palabra
# es la primera que oye whisper desde ese instante: cortar la toma en el candidato y ver si la palabra sigue entera).
LINEAS = [
    ("hk03", 78, "Si estás buscando", 0.810, "la primera línea no entra antes de que la imagen sea opaca (f76, el final de la disolvencia); la voz arranca tras −71,7 dB"),
    ("hk03", 95, "un apartamento totalmente", 1.380, "«un» sigue a «buscando» sin pausa y sin onset propio (los onsets 1,245 y 1,610 lo flanquean): whisper oye «un apartamento» desde 1,38 a 1,54, «en un apartamento» desde 1,30 y «apartamento» desde 1,58"),
    ("hk03", 128, "terminado,", 2.510, "onset de 2,510 s tras el «-te» de «totalmente»: whisper oye «terminado, este» desde 2,50 (desde 2,05 y 2,20 oye «totalmente terminado»)"),
    ("hk03", 164, "este probablemente", 3.685, "tras la pausa de 340 ms (3,34-3,68 s, valle −68 dB)"),
    ("hk03", 210, "no es", 5.240, "tras un valle de −61 dB; whisper oye «no es para ti» desde 4,90 hasta 5,24 y «es para ti» desde 5,40"),
    ("hk03", 221, "para ti.", 5.615, "tras un valle de −62 dB; whisper oye «para ti» desde 5,50"),
    ("md14", 566, "No estás viendo", 0.570, "la primera línea no entra antes de que la imagen sea opaca (f565, el final de la disolvencia)"),
    ("md14", 581, "un apartamento", 1.100, "«un» pegado a «viendo»: whisper oye «un apartamento sin terminar» desde 1,10 y «apartamento» desde 1,30; el onset de 0,970 es el «vien-»"),
    ("md14", 613, "sin terminar,", 2.175, "tras un valle de −61 dB; whisper oye «sin terminar» desde 1,52 hasta 2,175 y «terminar» desde 2,30"),
    ("md14", 641, "estás viendo uno", 3.110, "tras la pausa de 310 ms (2,80-3,11 s, valle −69,5 dB)"),
    ("md14", 674, "que todavía puedes", 4.200, "whisper oye «que todavía puedes definir» desde 3,95 hasta 4,20 y «todavía» desde 4,31"),
    ("md14", 708, "definir.", 5.345, "«puedes» y «definir» van pegados: el onset de 5,085 es el «-des» de «puedes» (whisper oye «de finis» desde 5,085 a 5,345); el «de-» de «definir» arranca en 5,345"),
    ("ct06", 1091, "Si es el reto,", 0.860, "la primera línea no entra antes de que la imagen sea opaca (f1089, el final de la disolvencia); la voz arranca a 0,86 s (`limites-voz.py`)"),
    ("ct06", 1118, "escríbeme", 1.785, "tras la pausa de 180 ms (1,60-1,78 s, valle −60 dB)"),
    ("ct06", 1124, "y agendamos una visita.", 2.010, "tras «escríbeme» sin pausa (valle −52 dB); el DTW de whisper la ponía en 2,38 s (11 f tarde)"),
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
