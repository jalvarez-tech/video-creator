#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/021/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-021.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-021"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-021.ts
TOMAS = {"hk06": (0, 0), "md01": (554, 35), "ct02": (1162, 172)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# Cada segundo está comprobado a mano con `onsets-voz.py` (el arranque de la sílaba tras un valle) y `palabras-desde.py` (qué palabra
# es la primera que oye whisper desde ese instante: cortar la toma en el candidato y ver si la palabra sigue entera).
LINEAS = [
    ("hk06", 16, "Mira lo que ocurre", 0.595, "REV. 2: el hook es el primer plano (f0, a corte) y su primera línea entra con su voz; la voz arranca tras −69,9 dB; «Mirá» en whisper, con el acento en la 2.ª sílaba"),
    ("hk06", 37, "cuando arquitectura", 1.310, "onset débil (8,6 dB tras un valle de −31,6 dB): «cuando» sigue a «ocurre» sin pausa; whisper oye «ocurre cuando arquitectura» desde 0,97 y 1,145 y «cuando arquitectura y naturaleza» desde 1,31"),
    ("hk06", 83, "y naturaleza", 2.830, "tras un valle de −53,9 dB; whisper oye «y naturaleza dejan de» desde 2,83"),
    ("hk06", 113, "dejan de estar", 3.820, "tras un valle de −49,5 dB; whisper oye «Dejan de estar separadas.» desde 3,82"),
    ("hk06", 129, "separadas.", 4.350, "tras un valle de −55,2 dB; whisper oye «separadas.» desde 4,19 y 4,35 y «para eso» desde 4,475 (ya dentro de la palabra)"),
    ("md01", 555, "Los patios y vacíos", 1.250, "la primera línea no entra antes de que la imagen sea opaca (f554); la voz arranca a 1,25 s (`limites-voz.py`): whisper oye «Los patios y vacíos hacen desaparecer» desde 1,20, 1,30 y 1,40"),
    ("md01", 593, "hacen desaparecer esa", 2.530, "tras la pausa de 170 ms (2,36-2,53 s, valle −64,9 dB); whisper oye «hacen desaparecer esa frontera» desde 2,53"),
    ("md01", 625, "frontera", 3.600, "«esa» y «frontera» van pegados (el onset de 3,535 es «esa» y el de 3,670 el «-on-» de «frontera»): whisper oye «la frontera entre interior» desde 3,535 y «entera» desde 3,67, ya dentro"),
    ("md01", 649, "entre interior,", 4.400, "tras la pausa de 240 ms (4,16-4,40 s); «entre» no trae onset propio (el de 4,565 es «in-»): whisper oye «entre interior» desde 3,85 y 4,40 e «interior» desde 4,56"),
    ("md01", 688, "paisaje y", 5.690, "tras la pausa de 450 ms (5,25-5,70 s, valle −66 dB)"),
    ("md01", 718, "arquitectura.", 6.710, "«y» y «arquitectura» van pegados: el onset de 6,485 es la «y»; whisper oye «arquitectura.» desde 6,71 e «y arquitectura» desde 6,485"),
    ("ct02", 1162, "escríbeme", 5.815, "la toma entra a media frase: la primera línea no entra antes de que la imagen sea opaca (f1162); la voz arranca tras la pausa de 210 ms (5,60-5,81 s, valle −67,7 dB) que sigue a «millones,»"),
    ("ct02", 1181, "y ven a conocerlo.", 6.400, "tras «escríbeme» sin pausa; «y ven» sin onset propio (el de 6,575 es «ven»): whisper oye «y ven a conocerlo.» desde 6,30, 6,40 y 6,45"),
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
