#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/057/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-057.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-057"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-057.ts
TOMAS = {"hk01": (72, 15), "md06": (460, 12), "ct02": (905, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 85, "¿Buscas un lugar", 0.92, "primera sílaba («Bus-»: el valle previo es de −42 dB); la línea entra con la imagen (opaca desde el f72)"),
    ("hk01", 102, "donde realmente se respire", 1.58, "desde 1,58 oye «donde realmente se respire paz»; el onset de 1,58 s sigue a «lu-gar» (1,41); «don-de» sin onset propio"),
    ("hk01", 138, "paz?", 2.77, "onset de 2,770 s (valle −59 dB: el respiro antes de «paz»); desde 2,77 oye «paz, este apartamento»"),
    ("hk01", 154, "Este apartamento", 3.23, "onset de 3,230 s (valle −64 dB, tras la pausa); desde 3,23 oye «Este apartamento es eso.»"),
    ("hk01", 174, "es eso.", 3.98, "onset de 3,975 s (valle −57 dB); desde 3,975 oye «de eso»"),
    ("md06", 470, "¿Cuándo fue la", 0.72, "primera sílaba (el valle previo, −32 dB; la toma empieza con ella entrando al cuadro)"),
    ("md06", 484, "última vez que", 1.25, "onset de 1,250 s (valle −42 dB); desde 1,25 oye «es que llegaste a casa» (whisper pierde «última»)"),
    ("md06", 502, "llegaste a casa", 1.88, "«lle-» sin onset propio (la /ʝ/ es suave); entre el «que» de 1,72 y el onset de 2,03 («a casa y sentiste que»)"),
    ("md06", 528, "y sentiste que", 2.74, "onset de 2,740 s (valle −63 dB: el respiro tras «casa»)"),
    ("md06", 545, "de verdad", 3.31, "onset de 3,310 s, tras el «que» (3,175) y su valle de 3,22-3,29 s; POR CONFIRMAR «de verdad» (whisper se come el «de»)"),
    ("md06", 562, "descansaste?", 3.865, "onset de 3,865 s (valle −59 dB: el respiro tras «verdad»)"),
    ("ct02", 916, "Agenda tu visita", 0.76, "primera sílaba (la toma empieza con ella entrando al cuadro)"),
    ("ct02", 943, "y vive la experiencia", 1.72, "onset de 1,720 s (valle −34 dB tras «visita»); desde 1,72 oye «y ve la experiencia de»: POR CONFIRMAR «vive»"),
    ("ct02", 969, "de la tranquilidad", 2.60, "«de la» sin onset propio tras «experiencia» (el dip de 2,44-2,46); desde 2,6 oye «de la tranquilidad en persona»"),
    ("ct02", 991, "en persona.", 3.34, "onset de 3,340 s (valle −64 dB, tras «tranquilidad»); desde 3,34 oye «perdona»"),
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
