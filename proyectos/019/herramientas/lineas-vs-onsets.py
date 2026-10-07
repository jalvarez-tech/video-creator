#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/019/herramientas/lineas-vs-onsets.py

POR QUÉ EXISTE. `subs-vs-voz.py` mide sobre el render, y con música debajo el detector se pierde onsets suaves
(en el 019 dio «está en los metros» 8 f pronto cuando estaba a 0,5) y confunde la primera sílaba de una toma. Aquí
se mide sobre el WAV de la toma, donde los valles se ven (−65 dB entre palabras), y se comprueba contra lo que se
oye de verdad: el segundo en que EMPIEZA la primera palabra de cada línea está escrito a mano en `LINEAS`, sacado de
los onsets de la energía (`proyectos/017/herramientas/onsets-voz.py`) y de `palabras-desde.py` (qué palabra es la
primera que oye whisper desde ese instante). Un «onset más cercano» NO es la palabra: en «a veces está en | cómo
entra» el más cercano a «cómo» es el «en» de la línea anterior (4,285 s), y «cómo» empieza en 4,450.

Da, por línea: el frame de la composición en que suena su palabra (`en + t·30 − desde`), cuántos frames antes entra la
línea (lo bueno, 0-3: la línea funde 5 f) y a cuántos ms de la palabra cae el onset de energía más próximo (si es
> 40 ms, la palabra no empieza con un onset: una /r/ vibrante, una vocal pegada a otra; se dice en la nota).
Si cambia una línea de `subtitulos-019.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-019"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-019.ts
TOMAS = {"hk05": (92, 5), "md08": (571, 22), "ct05": (1041, 19)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# Cada segundo está comprobado a mano con `onsets-voz.py` (el arranque de la sílaba tras un valle) y `palabras-desde.py` (qué palabra
# es la primera que oye whisper desde ese instante: cortar la toma en el candidato y ver si la palabra sigue entera).
LINEAS = [
    ("hk05", 94, "¿Y si pudieras", 0.255, "la primera línea no entra antes de que la imagen sea opaca (f92); whisper oye «y si pudieras» desde 0,20-0,30 y «si pudieras» desde 0,34: la «y» es el primer arranque"),
    ("hk05", 111, "vivir en altura", 0.850, "sigue a la /s/ de «pudieras» sin pausa: valle somero (−29 dB); whisper oye «vivir en altura sin» desde 0,80 a 0,92"),
    ("hk05", 141, "sin sentir que vives", 1.870, ""),
    ("hk05", 168, "dentro de una", 2.750, "whisper oye «dentro de una torre» desde 2,75 y «entre una torre» desde 2,85; el onset de 2,920 es el «tro»"),
    ("hk05", 185, "torre?", 3.330, "tras el cierre de la /t/ (valle −62 dB)"),
    ("md08", 571, "La doble altura", 0.765, "la primera línea no entra antes de que la imagen sea opaca (f571, el final de la disolvencia)"),
    ("md08", 587, "permite que", 1.325, "whisper oye «permiten que la luz» desde 1,30-1,325 y «permite que la luz» desde 1,40"),
    ("md08", 612, "la luz", 2.180, "«que» y «la» pegadas: whisper oye «que la luz y» hasta 2,14 y «la luz y ventilación» desde 2,20; el valle de 2,140 es el de la /l/ (la palabra empieza entre 2,14 y 2,20)"),
    ("md08", 630, "y ventilación ingresen", 2.780, "tras una pausa de 200 ms"),
    ("md08", 671, "a la vivienda.", 4.140, "«a la» va pegada al «-sen» de «ingresen», sin onset (whisper oye «en la vivienda» desde 4,03 y «a la vivienda» desde 4,10 a 4,15)"),
    ("ct05", 1042, "Si encaja con", 0.705, "la primera línea no entra antes de que la imagen sea opaca (f1041, el final de la disolvencia)"),
    ("ct05", 1053, "lo que estás buscando,", 1.090, "«lo» sigue a «con» sin pausa: los onsets 1,030 y 1,155 lo flanquean (whisper oye «con lo que estás» desde 0,92 a 1,15 y «lo que estás» desde 1,25)"),
    ("ct05", 1095, "escríbeme.", 2.515, "tras una pausa de 180 ms (2,33-2,51)"),
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
