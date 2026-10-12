#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/022/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-022.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-022"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-022.ts
TOMAS = {"hk2": (0, 0), "md1": (566, 3), "ct1": (1081, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo sale de `trozos-editoriales.mjs --audio` (DTW de whisper anclado a la energía) y se compara con los onsets de la voz sola
# (`onsets-voz.py`). OJO: el barrido de `palabras-desde.py` (cortes cada 40 ms) NO afinó nada en esta pieza: whisper devuelve las mismas palabras
# en ventanas de ±0,2 s y a veces pierde la primera con un corte más temprano que otro; no se usa como medida de tiempo, solo de identidad.
LINEAS = [
    ("hk2", 11, "Si para ti", 0.380, "primera toma de Isabella: entra a corte; la voz (energía) arranca a 0,38 s (la /s/ de «Si»; el onset vocálico es de 0,505 s)"),
    ("hk2", 27, "un apartamento", 0.900, "DTW 0,90 s; los onsets 0,775 y 1,010 s: «para» y «ti» van pegados a «un»; sin onset propio"),
    ("hk2", 41, "sin balcón,", 1.380, "DTW 1,38 s; onset más próximo 1,450 s (la «s» fricativa de «sin» empieza antes que su vocal)"),
    ("hk2", 68, "no es opción,", 2.260, "onset 2,260 s tras un valle de −43,5 dB"),
    ("hk2", 98, "mira esto.", 3.265, "onset 3,265 s tras un valle de −53,7 dB (la pausa de 3,06-3,26 s)"),
    ("md1", 579, "Aquí cada habitación", 0.540, "la voz arranca a 0,54 s tras −68,9 dB (`limites-voz.py`)"),
    ("md1", 614, "tiene su baño", 1.700, "DTW 1,70 s; onset más próximo 1,585 s"),
    ("md1", 635, "y su vestier,", 2.400, "DTW 2,40 s; onsets 2,570 s y 2,700 s"),
    ("md1", 666, "además de estar conectada", 3.440, "onset 3,455 s tras un valle de −63,1 dB (la pausa antes de «además»)"),
    ("md1", 700, "con la zona social", 4.580, "DTW 4,58 s; onsets 4,435 s y 4,750 s"),
    ("md1", 725, "y el balcón.", 5.400, "DTW 5,40 s; onset 5,395 s tras un valle de −46 dB"),
    ("ct1", 1089, "Estamos en la", 0.660, "la voz arranca a 0,655 s tras −69,3 dB"),
    ("ct1", 1104, "Loma del Escobero,", 1.160, "DTW 1,16 s; onset más próximo 0,990 s y 1,710 s: sin onset propio"),
    ("ct1", 1135, "en Envigado.", 2.200, "DTW 2,20 s; onset 2,350 s"),
    ("ct1", 1169, "Si quieres más información,", 3.340, "onset 3,395 s tras la pausa de 2,8-3,4 s (valle −57,5 dB)"),
    ("ct1", 1212, "contáctame.", 4.760, "DTW 4,76 s; onsets 4,730 s y 4,910 s"),
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
