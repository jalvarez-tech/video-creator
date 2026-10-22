#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/061/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-061.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-061"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-061.ts
TOMAS = {"hk04": (73, 6), "md04": (473, 14), "ct01": (929, 6)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk04", 84, "Te presento este estudio", 0.59, "primera sílaba («Te»: el valle previo es de −76 dB; antes, 0,14-0,31 s, hay un ruido de −45 dB que no es voz); la línea entra con la imagen (opaca desde el f73)"),
    ("hk04", 133, "en Laureles,", 2.24, "onset de 2,240 s («en»; F1 ≈ 560, F2 ≈ 2.200-2.580 de 2,255 a 2,355 s); el DTW de whisper daba 2,00 s (7 f pronto)"),
    ("hk04", 153, "habilitado para", 2.89, "onset de 2,890 s tras la pausa de 2,74-2,86 s (valle −73 dB); desde 3,40 oye «para rentas cortas»"),
    ("hk04", 180, "rentas cortas", 3.80, "onset de 3,800 s (valle −61 dB: la /r/ de «ra|ren»); desde 3,55 oye «rentas cortas» (el «ra» de «para» aún suena) y desde 3,70 «cuantas cortas»; el DTW daba 3,52 s (7 f pronto)"),
    ("hk04", 195, "en Medellín.", 4.30, "«en» sin onset propio, entre 4,26 y 4,35 s: desde 4,35 oye «en la edad», desde 4,25 «¡Suscríbete!» (cortado en «tas»); onset de 4,260 s tras «cortas»"),
    ("md04", 485, "En Medellín hay muchos", 0.88, "primera sílaba (valle previo −75 dB)"),
    ("md04", 523, "proyectos inmobiliarios,", 2.165, "onset de 2,165 s (valle −61 dB: la /p/); desde 2,165 oye «proyectos inmobiliarios pero pocos permiten» y desde 2,01 «muchos proyectos»; el DTW daba 2,04 s (4 f pronto)"),
    ("md04", 567, "pero pocos permiten", 3.59, "onset de 3,590 s tras la pausa de 3,40-3,59 s (valle −75 dB); «pocos» 3,860 y «permiten» 4,430 s (desde 4,43 oye «permites rentas cortas»)"),
    ("md04", 602, "rentas cortas.", 4.775, "onset de 4,775 s; desde 4,775 oye «rentas cortas.» y desde 4,685 «de rentas cortas»"),
    ("ct01", 940, "Haz clic en el botón", 0.57, "primera sílaba («Haz»: valle previo −77 dB; antes, 0,18-0,45 s, hay un ruido de −45 dB que no es voz)"),
    ("ct01", 967, "y agendemos", 1.505, "onset de 1,505 s («y»; valle −53 dB tras «botón»); desde 1,45 oye «todo y agendemos», desde 1,55 «y agendemos una visita»; el DTW daba 1,78 s (8 f tarde)"),
    ("ct01", 994, "una visita.", 2.41, "onset de 2,410 s; desde 2,41 oye «una visita puede ser virtual»; desde 2,19, «vendemos una visita»"),
    ("ct01", 1023, "Puede ser virtual o presencial.", 3.34, "onset de 3,340 s tras la pausa (valle −77 dB); «virtual» 3,550 s (6 f después: por eso va en la misma línea)"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-061.ts


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
