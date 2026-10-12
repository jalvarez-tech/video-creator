#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/026/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-026.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-026"

# toma → (WAV de su voz, en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-026.ts. El hook y el CTA son dos tramos del MISMO WAV (RC14).
TOMAS = {"hk": ("rc14", 0, 48), "md2": ("md2", 533, 12), "ct": ("rc14", 1023, 1344)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# Los segundos salen de la ENERGÍA de la voz sola de RC14 (`onsets-voz.py`: valles de −58/−60 dB entre frases y 20 + 24 picos de sílaba) y de cortes ACOTADOS entre pausas
# (`transcribir.mjs` sobre 1,70-2,90 · 3,15-4,05 · 4,00-5,50 · 5,50-6,50 s: «Hay apartamentos para vivir.» · «Y hay otros.» · «que te dan más posibilidades.» · «¡Bente monstruo!»). Los cortes
# desde un instante (`palabras-desde.py`) NO sirven tras una pausa larga: whisper pierde las primeras palabras (desde 2,65 s dijo «y hay otros» cuando «y hay otros» está a 3,29 s). El DTW de whisper iba entre 0,1 y 0,4 s pronto.
LINEAS = [
    ("hk", 6, "Hay apartamentos", 1.815, "primera toma: entra a corte; la voz (energía) arranca a 1,815 s tras −64 dB (`limites-voz.py`: 1,82 s); la línea entra 1 f antes del primer sonido"),
    ("hk", 25, "para vivir", 2.450, "«a-par-ta-men-tos» son los picos de 2,06-2,64 s; «para vivir» se pega a ellos (la ventana 1,70-2,90 s oye «Hay apartamentos para vivir.»); sin onset propio (vocal pegada a la «s»)"),
    ("hk", 51, "y hay otros", 3.290, "valle de −60 dB en 2,75-3,24 s y onset de +39 dB a 3,29 s; la ventana 3,15-4,05 s oye «Y hay otros.»"),
    ("hk", 74, "que te dan", 4.080, "valle de −58 dB (4,06 s) y onset a 4,08 s; la ventana 4,00-5,50 s oye «que te dan más posibilidades.»"),
    ("hk", 93, "más posibilidades.", 4.690, "valle de −59 dB en 4,67 s y onset a 4,69 s («más» tras «dan»)"),
    ("hk", 119, "Ven,", 5.575, "valle de −59 dB en 5,51 s y onset de +32 dB a 5,575 s; la ventana 5,50-6,50 s oye «¡Bente monstruo!» («ven, te muestro»)"),
    ("hk", 126, "te muestro.", 5.790, "valle de −54 dB en 5,77 s y onset a 5,79 s («te»); «mues-» a 5,89 s y «-tro» a 6,23 s"),
    ("md2", 541, "Aquí el balcón", 0.650, "la voz arranca a 0,65 s (`limites-voz.py`)"),
    ("md2", 567, "se convierte en", 1.600, "DTW 1,42 s es 0,18 s PRONTO: «balcón» ocupa 1,30-1,58 s (valle de −56 dB antes) y «se» sube a 1,62 s; los cortes desde 1,62 s empiezan por «se convierte»"),
    ("md2", 592, "una extensión", 2.425, "DTW 2,52 s es 0,1 s TARDE: «una» sube a 2,425 s (valle de −48 dB tras «en»); los cortes desde 2,60 s empiezan por «extensión»"),
    ("md2", 625, "de la", 3.500, "DTW 3,28 s es 0,2 s PRONTO: valle de −49 dB y «de la» sube a 3,50 s (los cortes desde 3,46-3,54 s empiezan por «de la»)"),
    ("md2", 631, "zona social.", 3.730, "onset 3,73 s tras «de la»; los cortes desde 3,70 s ya pierden la «zona»"),
    ("ct", 1050, "Si te gustó", 45.700, "valle de −63 dB en 45,38 s; el sonido de las 8 primeras sílabas («Si te gus-tó es-te a-par») son los picos de 45,70-46,61 s; la «S» de «Si» sube a −27 dB (45,70 s); la voz (energía) arranca a 45,215 s (un soplo a −46 dB)"),
    ("ct", 1067, "este apartamento", 46.270, "«es-te» = los picos de 46,33 y 46,50 s; el pico de 46,20 s es el «tó» tónico (/o/: F1 ≈ 640, F2 ≈ 1.130 Hz); sin onset propio (vocal pegada a la «ó»)"),
    ("ct", 1093, "y deseas tener", 47.135, "valle de −45 dB en 47,11 s y onset de +28 dB a 47,135 s (la «y»); DTW 47,20 s"),
    ("ct", 1125, "más información,", 48.195, "«más» sube a 48,195 s (−30 dB; valle de −42 dB en 48,33 s antes de «in-»); DTW 47,90 s es 0,3 s PRONTO"),
    ("ct", 1145, "contáctame.", 48.885, "valle de −54,6 dB en 48,87 s y onset de +37 dB a 48,885 s; la voz acaba a 49,35 s y de ahí queda ambiente a −52 dB; DTW 48,94 s"),
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
    ons = {toma: onsets(VOCES / f"{wav}.wav") for toma, (wav, _, _) in TOMAS.items()}
    print(f"{'línea':26s} {'entra':>5s} | {'palabra':>8s} → {'frame':>7s} | {'adelanto':>8s} | onset más próximo")
    malas = 0
    for toma, frame, texto, t, nota in LINEAS:
        _, en, desde = TOMAS[toma]
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
