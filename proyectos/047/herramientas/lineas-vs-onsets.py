#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/047/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-047.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-047"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-047.ts
TOMAS = {"hk02": (90, 12), "md04": (534, 15), "md05": (657, 17), "ct03": (1168, 17)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 91, "El tiempo es el activo", 0.44, "primera sílaba, suave (−22 dB; «tiem-» sube a 0,465 s con 43 dB); whisper la pone en 0,00 s"),
    ("hk02", 120, "más valioso", 1.45, "tras un valle de −56 dB; desde 1,45 oye «más valioso de los»; el DTW la daba en 1,56 s"),
    ("hk02", 139, "de los seres humanos.", 2.09, "desde 2,09 oye «de los seres humanos.»"),
    ("hk02", 183, "Te ayudamos a optimizarlo,", 3.55, "tras la pausa de 3,14-3,54 s (el DTW ponía «Te» en 3,28 s: es ruido a −50 dB)"),
    ("hk02", 222, "incluyéndote", 4.87, "tras la pausa de 4,80-4,87 s; desde 4,87 oye «Incluyéndote un aseo semanal.»"),
    ("hk02", 247, "un aseo semanal.", 5.70, "desde 5,70 oye «un aseo semanal.» (el DTW la daba en 5,54 s)"),
    ("md04", 535, "$14.800.000", 0.54, "primera sílaba («Ca-»); desde 0,54 oye «14 millones 800 que»"),
    ("md04", 578, "que incluyen experiencias", 2.04, "desde 2,04 oye «que incluyen experiencias pensadas»"),
    ("md04", 610, "pensadas para ti.", 3.115, "desde 3,115 oye «pensadas para ti.» (el alineador la daba en 3,43 s tomando una oclusiva por una pausa)"),
    ("md05", 658, "Además, esta unidad cuenta con", 0.585, "primera sílaba («A-»); desde 0,585 oye «Además, esta unidad cuenta»"),
    ("md05", 703, "diferentes tipos de", 2.16, "desde 2,16 oye «diferentes tipos de amenidades.»"),
    ("md05", 727, "amenidades.", 2.955, "onset de 2,955 s; desde 2,85 y 2,955 whisper inventa texto (queda muy poca voz)"),
    ("ct03", 1169, "Cuando llegas a una ciudad", 0.60, "primera sílaba (onset desde el silencio)"),
    ("ct03", 1189, "que no es la tuya,", 1.325, "desde 1,325 oye «que no es la»"),
    ("ct03", 1213, "el acompañamiento", 2.13, "tras la coma de 2,00-2,20 s; desde 2,13 oye «el acompañamiento personalizado es»"),
    ("ct03", 1243, "personalizado", 3.12, "desde 3,12 oye «personalizado, es una plusvalía»"),
    ("ct03", 1270, "es una plusvalía", 4.025, "tras la coma de 4,00 s; desde 4,025 oye «es una plusvalía que»"),
    ("ct03", 1302, "que vale la pena", 5.09, "el cierre de la «k» de «que» (0,12 s sin voz) antecede al estallido de 5,09 s; desde 5,09 oye «que vale la pena»"),
    ("ct03", 1316, "conocer.", 5.56, "desde 5,495 «para conocer» (inventa «para»); whisper pone «conocer» en 5,58 s"),
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
