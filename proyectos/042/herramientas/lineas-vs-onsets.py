#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/042/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-042.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-042"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-042.ts
TOMAS = {"hk01": (75, 0), "md03": (509, 15), "ct04": (901, 13)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 75, "Encontré", 0.075, "primera sílaba (tras un valle de −86 dB): suena 2,25 f después del corte; la línea entra con la imagen"),
    ("hk01", 92, "un lote", 0.595, "onset débil (vocal pegada a «-tré»); desde 0,36 oye «dentro de un lote donde»"),
    ("hk01", 106, "donde puedes tener", 1.065, "desde 1,065 oye «donde puedes tener privacidad»"),
    ("hk01", 134, "privacidad,", 1.985, "onset tras un valle de −84 dB; desde 1,985 oye «privacidad naturaleza»"),
    ("hk01", 157, "naturaleza", 2.77, "onset tras un valle de −84 dB; desde 2,77 oye «naturaleza y dos accesos»"),
    ("hk01", 184, "y dos accesos,", 3.655, "onset tras un valle de −83 dB; desde 3,655 oye «y dos accesos, y está»"),
    ("hk01", 213, "y está en", 4.635, "onset tras un valle de −77 dB; desde 4,635 oye «y está en el Carmen»"),
    ("hk01", 233, "El Carmen de Viboral.", 5.29, "«el» sin onset propio (vocal pegada a «en»); desde 5,25-5,33 oye «El Carmen de»"),
    ("md03", 509, "Si llevas meses", 0.505, "primera sílaba (la de la V18)"),
    ("md03", 535, "buscando tu lugar", 1.385, "tras el valle de 1,34-1,38 s; desde 1,38 oye «buscando tu lugar» (la de la V18)"),
    ("md03", 556, "para tu casa campestre,", 2.115, "onset tras un valle de −84 dB; desde 2,08 oye «para tu casa» (la de la V18)"),
    ("md03", 600, "acabas de encontrarlo.", 3.56, "tras la pausa de 3,32-3,54 s; desde 3,52 oye «Acaba de encontrarlo» (la de la V18)"),
    ("ct04", 901, "Si tienes un proyecto", 0.47, "primera sílaba (la de la V15)"),
    ("ct04", 922, "en mente,", 1.165, "desde 1,03 oye «proyecto en mente»; desde 1,15 «Exactamente» (ya dentro de «en mente»)"),
    ("ct04", 948, "escríbeme", 2.03, "tras la pausa de 1,83-2,03 s; desde 1,40 oye «Escríbeme y hablamos»"),
    ("ct04", 976, "y hablamos más", 2.97, "tras la pausa de 2,66-2,97 s; desde 3,20 oye «vamos más»"),
    ("ct04", 992, "sobre este lote.", 3.50, "desde 3,35 oye «más sobre este lote»; desde 3,48 «sobre este lote»"),
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
