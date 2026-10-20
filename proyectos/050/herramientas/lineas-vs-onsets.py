#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/050/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-050.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-050"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-050.ts
TOMAS = {"hk02": (0, 9), "md04": (448, 6), "ct02": (932, 9)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 4, "El tiempo es el activo", 0.465, "primera palabra («El», 42,9 dB desde −65 dB); desde 0,45 oye «El tiempo es el activo», desde 0,65 «tiempo es el activo más»"),
    ("hk02", 35, "más valioso", 1.450, "tras un valle de −56 dB; desde 1,40-1,70 oye «más valioso de los seres», desde 1,76 «valioso de los seres humanos»"),
    ("hk02", 53, "de los seres humanos.", 2.090, "«va-lio-so» = 1,65 · 1,81 · 1,94 (13 dB, suave); «de» a 2,09 s: desde 1,94 oye «de los seres humanos y», desde 2,45 «seres humanos»"),
    ("hk02", 90, "Te ayudamos a optimizarlo,", 3.300, "«Te» suave tras la pausa de 2,95-3,28 s: onset de solo 13 dB a 3,28 s; desde 3,20 y 3,28 oye «Ya ayudamos», desde 3,50 «Te ayudamos a optimizarlo»"),
    ("hk02", 137, "incluyéndote un", 4.870, "tras «optimizarlo,»; desde 4,80 oye «incluyéndote un aseo semanal.», desde 4,87 «Incluyéndote»; desde 5,04 pierde la primera sílaba («Incluso llenéote»)"),
    ("hk02", 166, "aseo semanal.", 5.830, "desde 5,70 oye «un aseo semanal.», desde 5,80 «Naseo semanal» (pierde la «a»), desde 5,93 «de Manal»: «aseo» empieza a ≈ 5,83 s"),
    ("md04", 457, "$14.800.000", 0.555, "«Ca-» (subida de 32,9 dB sobre un suelo de −55 dB); la línea entra 2 f antes (el acento va 60 f antes de «experiencias»)"),
    ("md04", 502, "que incluyen", 2.040, "desde 2,0 oye «que incluyen experiencias»; desde 2,10 «incluyen»"),
    ("md04", 517, "experiencias", 2.490, "desde 2,40 oye «de experiencias» (resto de «incluyen»), desde 2,50 «experiencias pensadas para ti»"),
    ("md04", 545, "pensadas para ti.", 3.430, "desde 3,10 y 3,20 oye «pensadas para ti», desde 3,43 «pensadas para ti.», desde 3,50 «para ti.»"),
    ("ct02", 946, "Si quieres un apartamento amoblado", 0.780, "primera sílaba (41 dB desde −68 dB); el onset de 0,425 s (15 dB) es una respiración"),
    ("ct02", 995, "que tenga acompañamiento personalizado,", 2.430, "tras la pausa de 2,20-2,44 s (onset de 51 dB desde −68 dB)"),
    ("ct02", 1055, "escríbeme.", 4.430, "«es-» (−15 dB a 4,45 s, onset de 44 dB a 4,41 s), un valle y «crí» a 4,605 s; desde 4,41 oye «Escribí.», desde 4,50 «Escribeme.»"),
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
