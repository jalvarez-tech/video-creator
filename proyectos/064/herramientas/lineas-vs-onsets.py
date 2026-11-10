#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/064/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-064.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-064"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-064.ts
TOMAS = {"hk02": (117, 196), "hk02b": (327, 413), "hk05": (573, 205), "ct03": (1007, 184)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra) y de `sibilantes.py` (las /s/ finales de «barrios», «enlace» y «agendemos»).
# Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 130, "¿Un lote", 6.97, "primera sílaba: la energía sube de −54 a −21 dB en 10 ms (tras ≈ 7 s de ruido de sala a −45…−60 dB); la línea entra con la imagen (opaca desde el f117)"),
    ("hk02", 140, "cerca de Medellín", 7.30, "entre los onsets de 7,25 y 7,385 s; desde 7,25 y 7,385 oye «cerca de Medellín por» y desde 7,535 «KMG por 350»"),
    ("hk02", 168, "por 350 millones?", 8.29, "onset de 8,290 s (valle −69 dB: «por» arranca tras «Medellín»); desde 8,29 oye «por 350 millones y» y desde 8,47 ya «350 millones»"),
    ("hk02", 234, "Sí, y tiene", 10.46, "onset de 10,460 s tras la pausa de 9,9-10,4 s (valle −68 dB); desde 10,46 oye «Sí, y tiene 3.244»"),
    ("hk02", 256, "3.244 metros", 11.2, "«tres mil…»: desde 11,25 oye «3244 metros cuadrados» y desde 11,305 «tres mil doscientos cuarenta»; desde 11,0 todavía «tiene 3,244»"),
    ("hk02", 303, "cuadrados.", 12.775, "onset de 12,775 s (valle −75 dB tras la /t/ de «metros»); desde 12,775 oye «cuadrados. Vente muestro» y desde 12,55 todavía «2 metros cuadrados»"),
    ("hk02b", 331, "Ven, te muestro.", 13.925, "«Ven» arranca a los 13,925 s (la energía sube de −35 a −20 dB en 20 ms) tras un soplo de −50…−40 dB a 13,83-13,91 s; desde 13,84 oye «20 muestros» y desde 14,115 «te muestro»; plano B (a corte)"),
    ("hk05", 586, "No necesitas estar", 7.28, "primera sílaba: la energía sube de −59 a −17 dB en 70 ms tras ≈ 7 s de ruido de sala; la línea entra con la imagen (opaca desde el f573)"),
    ("hk05", 612, "a tres horas", 8.17, "desde 8,12 oye «estará tres horas de» y desde 8,16 «a tres horas de»; desde 8,22 ya «tres horas de Medellín»"),
    ("hk05", 629, "de Medellín", 8.735, "onset de 8,735 s; desde 8,60 y 8,70 oye «de Medellín para tener» y desde 8,80 ya «Medellín para tener»"),
    ("hk05", 654, "para tener 3.244 metros cuadrados.", 9.565, "onset de 9,565 s tras la pausa de 9,33-9,57 s (valle −70 dB); desde 9,565 oye «para tener tres mil»"),
    ("ct03", 1020, "Si estás buscando", 6.57, "primera sílaba: la energía sube de −47 a −25 dB en 10 ms (tras un soplo de ruido de sala); la línea entra con la imagen (opaca desde el f1007)"),
    ("ct03", 1040, "tierra cerca de Medellín,", 7.28, "onset de 7,280 s (valle −64 dB); desde 7,28 oye «Tierra cerca de Mederín» y desde 7,42 ya «cerrar cerca»"),
    ("ct03", 1088, "escríbeme", 8.86, "onset de 8,855 s tras la pausa de 8,52-8,86 s (valle −71 dB); desde 8,80 oye «escríbeme y te envió» y desde 8,95 ya «y te envió»"),
    ("ct03", 1107, "y te envío", 9.515, "onset de 9,515 s tras la pausa de 9,45-9,51 s (valle −77 dB); desde 9,40 y 9,52 oye «y te envió todos» y desde 9,58 ya «te envió todos»"),
    ("ct03", 1126, "todos los detalles", 10.12, "onset de 10,120 s (valle −71 dB); desde 10,12 oye «todos los detalles para»"),
    ("ct03", 1158, "para que conozcas", 11.19, "onset de 11,190 s tras la pausa de 11,1-11,2 s (valle −73 dB); desde 11,19 oye «para que conozca si»"),
    ("ct03", 1181, "este asombroso lote.", 11.955, "onset de 11,955 s (valle −63 dB); desde 11,955 oye «estas son los olote» y desde 12,115 «Estás un plazolote»: POR CONFIRMAR AL OÍDO «asombroso»"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-064.ts


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
    ons = {toma: onsets(VOCES / f"{toma.rstrip('b') if toma == 'hk02b' else toma}.wav") for toma in TOMAS}
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
