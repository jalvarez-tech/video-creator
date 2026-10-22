#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/059/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-059.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-059"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-059.ts
TOMAS = {"hk04": (86, 12), "md09": (492, 17), "ct03": (924, 3)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk04", 97, "Sabes que el estrés", 0.78, "primera sílaba («Sa-»: el valle previo es de −50 dB); la línea entra con la imagen (opaca desde el f86)"),
    ("hk04", 118, "a veces no viene", 1.495, "onset de 1,495 s («a»; el valle de 1,22-1,31 s es la /t/ de «trés»); veces = 1,69-1,86 s: desde 1,73 oye «A veces» y desde 1,90 ya no. Corregido: antes 1,25 s"),
    ("hk04", 138, "solo del trabajo,", 2.18, "onset de 2,180 s («so-»); desde 2,00 y 2,18 oye «eso es lo del trabajo»; desde 2,30, «el trabajo, a veces viene donde»"),
    ("hk04", 170, "a veces viene", 3.225, "onset de 3,225 s tras la pausa de 3,0-3,22 s (valle −63 dB)"),
    ("hk04", 185, "de donde vives.", 3.78, "sin onset propio («de» pegado a «viene»); desde 3,70 oye «¿Dónde vives?»; desde 3,80, «de donde vives. No sé por»"),
    ("md09", 503, "Zona de trabajo", 0.98, "primera sílaba (valle previo −50 dB); desde 0,98 oye «zona de trabajo separada, porque»"),
    ("md09", 525, "separada,", 1.71, "onset de 1,710 s (valle −33 dB, tras «trabajo»); whisper se hace un lío con los cortes de 1,5-1,7 s («para trabajar…»): el onset manda"),
    ("md09", 554, "porque trabajar", 2.66, "tras la pausa de 2,4-2,66 s; desde 2,60 oye «porque trabajar desde la cama ya»; el onset de 2,795 s es la «que» (el cierre de la /k/, valle −54 dB)"),
    ("md09", 568, "desde la cama", 3.12, "desde 3,12 y 3,275 oye «desde la cama, ya no es»; desde 3,05, «a trabajar desde la cama»"),
    ("md09", 598, "ya no es", 4.12, "onset de 4,160 s (valle −58 dB; parada de 3,9-4,06 s); desde 4,05-4,20 oye «Ya no es una opción»"),
    ("md09", 610, "una opción.", 4.535, "onset de 4,535 s; desde 4,60 oye solo «opción»"),
    ("ct03", 934, "Si estás buscando", 0.46, "primera sílaba (la «Si» arranca a los 0,46 s; palabras-desde desde 0,40-0,46 oye «Si estás buscando paz y»)"),
    ("ct03", 958, "paz y comodidad,", 1.26, "desde 1,265 oye «paz y como dirían»; desde 1,40 ya no oye «paz»; onset de 1,265 s (valle −55 dB: la oclusiva de la /p/)"),
    ("ct03", 999, "Escríbeme", 2.62, "onset de 2,620 s tras la pausa (valle −61 dB); desde 2,62 oye «escríeme y te oye todos»"),
    ("ct03", 1014, "y te doy todos", 3.15, "«y te» sin onset propio; desde 3,05 y 3,20 oye «y te oye todos los»; desde 3,29, «te oye todos»"),
    ("ct03", 1030, "los detalles.", 3.66, "«los» sin onset propio; desde 3,40 oye «y todos los detalles»; el onset de 3,545 s es «de-»"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-059.ts


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
