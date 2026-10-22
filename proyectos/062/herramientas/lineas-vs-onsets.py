#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/062/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-062.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-062"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-062.ts
TOMAS = {"hk02": (95, 0), "md02": (483, 12), "ct02": (934, 24)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra) y de `sibilantes.py` (las /s/ finales de «barrios», «enlace» y «agendemos»).
# Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 110, "Medellín, ya es", 0.52, "primera sílaba («Me-»: la energía sube de −34 a −17 dB en 40 ms); la línea entra con la imagen (opaca desde el f95)"),
    ("hk02", 134, "el tercer mercado", 1.365, "onset de 1,365 s («el»); desde 1,35 oye «es el tercer mercado más»; desde 1,5, «el tercer becajo»"),
    ("hk02", 160, "más grande de", 2.23, "onset de 2,230 s («más»; tras «mer-ca-do», con la /k/ en el valle de 1,87-1,96 s); desde 2,20 oye «más grande de renta corta» y desde 2,37, «grande de renta corta de». El DTW la ponía en 2,06 s (5 f pronto)"),
    ("hk02", 180, "renta corta", 2.865, "onset de 2,865 s («ren-»); desde 2,84 oye «renta corta de latinoamérica»; desde 3,03 ya «Santa Corta»"),
    ("hk02", 195, "de Latinoamérica.", 3.375, "onset de 3,375 s («de»; desde 3,35 oye «es latinoamerica» y desde 3,50 «Latinoamérica»); el DTW la ponía en 3,44 s"),
    ("md02", 496, "Laureles", 0.87, "primera sílaba («Lau-»: el valle previo es de −73 dB); desde 0,84 oye «Laurel es uno de los»"),
    ("md02", 508, "es uno de los", 1.27, "«es» pegado a «Laureles» (sin onset propio; el onset de 1,080 s es «re»); desde 1,20 oye «es uno de los mejores»"),
    ("md02", 535, "mejores barrios", 2.195, "onset de 2,195 s («me-»; valle −42 dB); cortes aislados de 1,45-2,38 s y 2,0-2,9 s oyen «…los mejores» y «mejores barrios»"),
    ("md02", 557, "con mayor ocupación", 2.905, "onset de 2,905 s tras la /s/ de «barrios» (2,80-2,86 s) y la pausa (valle −63 dB); desde 2,92 oye «como es la ocupación»; o·cu·pa·ción = 3,35 · 3,475 · 3,63 · 3,925 s"),
    ("md02", 587, "en la ciudad de Medellín.", 3.925, "onset de 3,925 s tras la pausa de «ocupación» (valle −64 dB); desde 3,75 y 4,00 oye «en la ciudad de Medellín»"),
    ("ct02", 946, "¿Y tú qué esperas", 1.24, "primera sílaba (la «Y» arranca a los 1,24 s tras el soplo de −47 dB); desde 1,20 oye «y tú que esperas para»"),
    ("ct02", 971, "para conocerlo?", 2.09, "onset de 2,090 s («pa-»; es·pe·ras = 1,645 · 1,725 · 1,89 s); co·no·cer·lo desde 2,315 s; el DTW la ponía en 1,80 s (8 f pronto)"),
    ("ct02", 1000, "Haz clic en el enlace", 3.035, "onset de 3,035 s tras la pausa (valle −75 dB); desde 3,00 oye «Haz clic en el enlace»"),
    ("ct02", 1028, "y agendemos", 3.98, "«y» tras la /s/ de «enlace» (3,92-3,96 s) y antes de la pausa de 4,14-4,22 s; «agendemos» = a 4,24 · gen 4,365 · de 4,51 s + /s/ a 4,68-4,70; desde 3,85 oye «y agendemos una visita»"),
    ("ct02", 1050, "una visita.", 4.72, "onset de 4,720 s tras la /s/ de «agendemos»; vi·si·ta = 5,085 · 5,18 · 5,275 s"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-062.ts


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
