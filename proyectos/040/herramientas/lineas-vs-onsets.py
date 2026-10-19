#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/040/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-040.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-040"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-040.ts
TOMAS = {"hk05": (108, 0), "md04": (585, 19), "ct02": (935, 3)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk05", 116, "Imagina despertar", 0.305, "primera sílaba (onset de 63 dB desde el silencio)"),
    ("hk05", 143, "todos los días con", 1.205, "desde 1,205 oye «todos los días con»; «despertar» acaba antes (0,875-1,015 s)"),
    ("hk05", 164, "esta vista", 1.900, "«con» acaba hacia 1,90 s; la «t» de «esta» cierra de 1,95 a 2,04 s: desde 1,92 oye «esta vista y tener»"),
    ("hk05", 188, "y tener más de", 2.700, "la «ta» de «vista» suena a 2,45-2,55 s y hay silencio a 2,60-2,65 s; la «y» arranca a 2,70 s (desde 2,60 oye «y tener más de»)"),
    ("hk05", 217, "3.000 metros cuadrados", 3.655, "tras la pausa de 3,60 s; desde 3,655 oye «3000 metros cuadrados para»"),
    ("hk05", 256, "para tu proyecto.", 4.960, "tras la pausa de 4,45-4,95 s; desde 4,96 oye «para tu proyecto»"),
    ("md04", 594, "Este es el tipo", 0.950, "primera sílaba (onset de 56 dB desde el silencio; whisper la sitúa a 0,0 s: su DTW no vale en esta toma)"),
    ("md04", 611, "de lote que compras", 1.500, "tras «tipo» (1,345 s); desde 1,34 oye «tipo de lote que»; desde 1,50 oye «de lote…» (garabateado)"),
    ("md04", 646, "para construir tu", 2.710, "desde 2,71 oye «para construir tu casa»"),
    ("md04", 669, "casa soñada.", 3.470, "desde 3,47 oye «casa sonar»; «tu» acaba en 3,375-3,47 s"),
    ("ct02", 943, "Si quieres conocerlo,", 0.400, "primera sílaba (onset de 56 dB desde el silencio)"),
    ("ct02", 979, "escríbeme lote", 1.605, "tras la pausa de 1,44-1,60 s; desde 1,56 oye «Escríeme elote y te envío»"),
    ("ct02", 1009, "y te envío", 2.595, "desde 2,55 oye «y te envió toda la»"),
    ("ct02", 1024, "toda la información.", 3.085, "desde 3,04 oye «toda la información»"),
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
