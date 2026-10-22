#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/054/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-054.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-054"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-054.ts
TOMAS = {"hk01": (83, 24), "md04": (400, 17), "ct06": (903, 23)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 91, "El lujo real", 1.06, "primera sílaba (sube a 1,06 s desde −37 dB de viento); whisper la pone en 0,00 s"),
    ("hk01", 112, "no es tener", 1.84, "tras un valle de −52 dB; desde 1,40 oye «real no es tener»; el DTW la daba en 1,64 s (6 f pronto)"),
    ("hk01", 134, "una torre con vista,", 2.50, "desde 2,05 oye «es tener una torre con visa»; el DTW la daba en 2,22 s"),
    ("hk01", 154, "es no tener", 3.165, "tras la pausa de la coma (valle de −51 dB); desde 3,10 oye «Es no tener vecinas encima.»; el DTW la daba en 3,48 s (9 f tarde)"),
    ("hk01", 171, "vecinos encima.", 3.765, "onset de 3,765 s tras −51 dB (la /b/ de «ve-»); el DTW la daba en 3,96 s"),
    ("md04", 406, "Está a los", 0.82, "primera sílaba (sube a 0,82 s desde −46 dB); whisper la pone en 0,00 s y la oye «Hace los» / «Hasta los»"),
    ("md04", 423, "50 minutos", 1.32, "desde 1,32 oye «50 minutos de Medellín con una»; el DTW la daba en 1,12 s (6 f pronto)"),
    ("md04", 439, "de Medellín", 1.86, "desde 1,86 oye «de Medellín, con una administración de»"),
    ("md04", 466, "con una administración", 2.77, "tras la pausa de 2,60-2,77 s; desde 2,77 oye «Con una administración de 120.000.»"),
    ("md04", 495, "de 120.000.", 3.725, "onset de 3,725 s; desde 3,825 oye «Siento mentir» (son «ciento veinte mil»: el estallido de «cien» es 3,825)"),
    ("ct06", 911, "Si valoras espacio", 1.02, "primera sílaba (sube a 1,02 s desde −44 dB)"),
    ("ct06", 928, "y privacidad,", 1.615, "tras la pausa de −64 dB; desde 1,615 oye «y privacidad, este espacio te va»"),
    ("ct06", 966, "este espacio", 2.855, "tras la pausa de −69 dB; el DTW la daba en 3,04 s"),
    ("ct06", 982, "te va a encantar.", 3.405, "onset de 3,405 s; el DTW la daba en 3,40 s"),
    ("ct06", 1013, "Escríbeme", 4.42, "onset de 4,42 s tras −71 dB; desde 4,42 oye «Escríeme y agendemos una visita.»"),
    ("ct06", 1027, "y agendemos", 4.90, "desde 4,90 oye «y agendemos una visita.»; desde 5,04 «gendemos»"),
    ("ct06", 1043, "una visita.", 5.42, "desde 5,45 oye «una visita.»; desde 5,37 «es una visita» (el «-mos» de «agendemos»)"),
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
