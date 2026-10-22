#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/056/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-056.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-056"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-056.ts
TOMAS = {"hk04": (73, 12), "md02": (457, 12), "ct01": (875, 44)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk04", 84, "Descubre la", 0.80, "primera sílaba («Des-»: el valle previo es de −59 dB); la línea entra con la imagen (opaca desde el f73)"),
    ("hk04", 104, "privacidad de", 1.51, "onset tras el valle de 1,44-1,50 s; desde 1,275 oye «de vivir en un» (la «la» está antes): POR CONFIRMAR «privacidad»"),
    ("hk04", 122, "vivir en un", 2.10, "sin onset propio (tras «de» pegado); desde 2,2 oye «en un condominio de solo seis»"),
    ("hk04", 135, "condominio de", 2.525, "onset tras un valle de −52 dB; desde 2,525 oye «…vinieron solo seis casas» (se pierde el principio)"),
    ("hk04", 157, "solo seis casas.", 3.28, "onset tras un valle de −51 dB; desde 3,28 oye «de estas casas»"),
    ("md02", 469, "Los condominios de", 0.815, "primera sílaba (valle previo de −66 dB)"),
    ("md02", 491, "menos de 10", 1.62, "«menos» sin onset propio (la /m/ nasal es suave); desde el DTW (centro 1,70 s) y tras el «de» de 1,46"),
    ("md02", 509, "unidades privadas", 2.20, "«unidades» sin onset propio tras «10»; desde 2,24 (DTW) y antes del onset de «privadas» (2,585)"),
    ("md02", 538, "se valorizan", 3.18, "onset tras el valle de 3,04-3,18 s (−59 dB)"),
    ("md02", 551, "diferente.", 3.61, "onset de 3,610 s (valle −52 dB)"),
    ("ct01", 886, "Si realmente buscas", 1.845, "primera sílaba (valle de −90 dB)"),
    ("ct01", 915, "tranquilidad,", 2.87, "onset de 2,870 s (valle −52 dB); DTW centro 2,82"),
    ("ct01", 934, "esta casa es", 3.50, "onset de 3,500 s (valle −65 dB)"),
    ("ct01", 953, "para ti.", 4.14, "onset de 4,140 s (valle −57 dB)"),
    ("ct01", 968, "Escríbeme.", 4.625, "tras la pausa de 4,24-4,62 s (valle −86 dB)"),
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
