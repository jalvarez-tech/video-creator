#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/049/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-049.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-049"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-049.ts
TOMAS = {"hk06": (100, 9), "md06": (516, 6), "ct03": (937, 9)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk06", 110, "Si quieres construir", 0.665, "primera sílaba; los chasquidos de 0,03 y 0,545 s (−48/−55 dB) no son voz"),
    ("hk06", 125, "rodeado de la naturaleza,", 1.185, "la V15 midió 1,185 s; desde 1,15 oye «y rodada naturaleza»"),
    ("hk06", 171, "pero con", 2.710, "tras la pausa de 2,52-2,71 s; desde 2,70 oye «pero con agua de energía»"),
    ("hk06", 179, "agua y energía", 2.980, "la V15 midió ≈ 2,98 s; desde 2,85 oye «con agua y energía»"),
    ("hk06", 197, "disponibles,", 3.565, "desde 3,50 «fríais, foniles» (whisper pierde la palabra); onset a 3,565 s"),
    ("hk06", 233, "vente, te muestro.", 4.740, "tras la pausa de 4,45-4,78 s; desde 4,70 oye «¡Bente maestro!»"),
    ("md06", 525, "Tener", 0.540, "primera sílaba (onset de 73,5 dB desde el silencio)"),
    ("md06", 534, "dos entradas", 0.840, "desde 0,84 oye «Las dos entradas»; desde 0,78 «De todas entradas»"),
    ("md06", 560, "puede cambiar por completo", 1.710, "tras la pausa de ≈ 1,4-1,71 s; desde 1,60 y 1,71 oye «puede cambiar por completo la»"),
    ("md06", 591, "la forma en la que", 2.730, "desde 2,73 oye «la forma en la que»"),
    ("md06", 625, "disfrutas un lote.", 3.890, "desde 3,89 oye «que disfrutas un lote.» («que» pegado: 40 ms de margen)"),
    ("ct03", 949, "Haz clic", 0.730, "primera sílaba (onset de 61 dB desde el silencio)"),
    ("ct03", 959, "en el botón", 1.070, "desde 1,07 oye «que es en el botón»; desde 1,20 «en el botón y agendemos»"),
    ("ct03", 985, "y agendemos", 1.945, "tras el silencio de 0,1 s a −65 dB; desde 1,945 oye «y agendemos una visita.»"),
    ("ct03", 997, "una visita.", 2.335, "desde 2,335 oye «una visita.»"),
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
