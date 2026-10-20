#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/048/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-048.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-048"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-048.ts
TOMAS = {"hk01": (0, 0), "md03": (517, 10), "ct03": (1118, 9)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 29, "El tiempo es el", 1.010, "primera sílaba (onset de 53 dB desde −62); el blip de 0,84 s (−22 dB) no es voz"),
    ("hk01", 50, "activo más valioso", 1.720, "desde 1,70 oye «activo más valioso»; desde 1,75 pierde «activo»"),
    ("hk01", 84, "de los seres humanos", 2.835, "desde 2,835 oye «de los seres humanos y»"),
    ("hk01", 113, "y te ayudamos", 3.805, "desde 3,805 oye «y te ayudamos a optimizarlo»"),
    ("hk01", 125, "a optimizarlo,", 4.220, "desde 4,25 y 4,30 oye «optimizarlo, incluyendo un»: la «a» va pegada a «ayudamos»"),
    ("hk01", 154, "incluyendo un", 5.165, "desde 5,165 oye «incluyendo un aseo semanal»"),
    ("hk01", 177, "aseo semanal.", 5.930, "desde 5,90 oye «hace dos semanas»; desde 5,86 «un asedio semanal»: POR CONFIRMAR AL OÍDO"),
    ("md03", 526, "Contamos con", 0.680, "primera sílaba (onset de 46 dB desde −66)"),
    ("md03", 550, "chef privado,", 1.460, "desde 1,265 oye «con chef privado»; desde 1,46 «privado»: «chef» ≈ 1,40-1,46"),
    ("md03", 581, "tours, masajes", 2.500, "desde 2,475 y 2,56 oye «tours, masajes y transporte»"),
    ("md03", 608, "y transporte", 3.400, "desde 3,34-3,54 oye «y transporte y las mejores»"),
    ("md03", 639, "y las mejores", 4.420, "desde 4,42 y 4,50 oye «y las mejores experiencias»"),
    ("md03", 665, "experiencias", 5.295, "desde 5,295 oye «experiencias de la ciudad de»"),
    ("md03", 680, "de la ciudad de Medellín.", 5.795, "desde 5,795 oye «de la ciudad de Medellín.»"),
    ("ct03", 1126, "Cuando llegas a", 0.600, "primera sílaba (onset de 16 dB desde −57; sube a los 0,62)"),
    ("ct03", 1140, "una ciudad que", 1.050, "desde 0,93 oye «Si llegas a una»; desde 1,095 «no es la tuya»: «una» ≈ 1,0-1,1"),
    ("ct03", 1155, "no es la tuya,", 1.575, "desde 1,575 oye «que no es la tuya,»; «no» ≈ 1,57-1,65"),
    ("ct03", 1179, "el acompañamiento", 2.355, "desde 2,355 oye «El acompañamiento personalizado es una»"),
    ("ct03", 1202, "personalizado", 3.120, "desde 3,12 oye «personalizado, es una plusvalía que»"),
    ("ct03", 1232, "es una plusvalía", 4.120, "desde 4,10 oye «es una plusvalía que»; desde 4,16 pierde «es»"),
    ("ct03", 1260, "que vale la pena", 5.050, "desde 5,05 oye «que vale la pena»"),
    ("ct03", 1280, "conocer.", 5.720, "desde 5,72 oye «conocer.»"),
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
