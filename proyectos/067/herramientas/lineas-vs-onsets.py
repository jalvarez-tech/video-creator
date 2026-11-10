#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — (067) ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/067/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-067.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-067"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-067.ts
TOMAS = {"hk02": (96, 12), "md01": (462, 12), "ct05": (950, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra) y de `envolvente-voz.py` (las pausas de 0,1-0,2 s).
# Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 99, "Si estás buscando", 0.50, "primera sílaba («Si»: la energía sube de −67 a −25 dB en 15 ms); la línea entra con la imagen (opaca desde el f96)"),
    ("hk02", 115, "lo más barato", 1.075, "onset de 1,075 s («lo», tras «buscando»); desde 1,07 oye «lo más barato de la zona»"),
    ("hk02", 135, "de la zona,", 1.685, "onset de 1,685 s («de», valle −66 dB tras «barato»)"),
    ("hk02", 161, "con todo respeto,", 2.565, "onset de 2,565 s tras la pausa de la coma (valle −70 dB, 2,40-2,56 s)"),
    ("hk02", 195, "este no es", 3.73, "onset de 3,730 s («es-», tras la pausa de la coma, valle −70 dB)"),
    ("hk02", 207, "para ti.", 4.14, "onset de 4,140 s («pa-», valle −72 dB entre «es» y «para»)"),
    ("md01", 465, "Aprendí a reconocer al", 0.525, "primera sílaba («A-»: de −76 a −14 dB en 5 ms; el soplo de antes está a −40…−60 dB del pico); la línea entra con la imagen (opaca desde el f462)"),
    ("md01", 497, "comprador serio", 1.59, "onset de 1,590 s («com-»; valle −68 dB tras «al»); desde 1,59 oye «compreador serio desde la primera»"),
    ("md01", 525, "desde la primera fase.", 2.56, "onset de 2,560 s («des-»; valle −72 dB tras «serio»); desde 2,56 oye «de la primera fase»"),
    ("md01", 576, "No habla de metros,", 4.195, "onset de 4,195 s («No», tras la pausa del punto, valle −71 dB); desde 4,195 oye «No habla de metros, habla»"),
    ("md01", 610, "habla de lo que quiere", 5.325, "onset de 5,325 s («ha-», tras la pausa de la coma de 5,10-5,30 s: la energía de 4,94-5,08 es el «tros» de «metros»)"),
    ("md01", 633, "dejar de sentir.", 6.1, "≈ 6,06-6,16 s: «dejar» sin valle profundo propio (la energía a 6,04 s baja a −31 dB y vuelve a −12); desde 6,26 oye «de sentir.»: la línea entra 0-1,5 f antes"),
    ("ct05", 952, "5.000 metros,", 0.465, "primera sílaba («cin-»: de −69 a −30 dB; ella dice «cinco mil»); la línea entra con la imagen (opaca desde el f950)"),
    ("ct05", 972, "infinitas posibilidades.", 1.14, "onset de 1,140 s («in-», un soplo de −27 dB tras la pausa de la coma de 1,04-1,12 s); desde 1,14 oye «infinitas posibilidades»; «fi» sube a 1,18 s"),
    ("ct05", 1026, "haz clic", 2.94, "onset de 2,940 s tras la pausa del punto (valle −67 dB); desde 2,94 oye «¡Haz clic en el enlace»"),
    ("ct05", 1036, "en el enlace", 3.28, "onset de 3,280 s («en», pegado a «clic»; valle −50 dB); desde 3,28 oye «en el enlace y hablemos»"),
    ("ct05", 1053, "y hablemos.", 3.88, "onset de 3,880 s tras la pausa tras «enlace» (valle −63 dB): la «y» de «y hablemos»; «hablemos» sube a 4,175 s"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-067.ts


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
