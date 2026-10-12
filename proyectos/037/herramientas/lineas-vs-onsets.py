#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/037/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-037.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-037"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-037.ts
TOMAS = {"hk08": (117, 17), "md10": (429, 21), "ct08": (805, 46)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk08", 125, "El error", 0.83, "primera sílaba"),
    ("hk08", 137, "que cometen", 1.29, "onset de −54,7 dB; desde 1,20 oye «porque cometen» (el final de «error» pegado) y desde 1,29 «que cometen»"),
    ("hk08", 147, "las familias", 1.61, "onset de −63 dB (45 dB de subida); desde 1,55 oye «las familias al»"),
    ("hk08", 172, "al buscar campestre.", 2.47, "onset de −64 dB tras 0,14 s de silencio; desde 2,35 oye ya «al buscar campestres»"),
    ("md10", 437, "Compran", 0.975, "primera sílaba (la voz tiene un soplido a 0,04 y 0,47 s que la compuerta de voz deja fuera)"),
    ("md10", 448, "lejos,", 1.33, "el DTW la pone en 1,32 s; desde 1,25 oye «lejos se alcanzan»; el onset más próximo es débil (1,405 s, 8 dB)"),
    ("md10", 464, "se cansan del viaje,", 1.895, "/s/ tras un valle de −65 dB; desde 1,80-1,95 oye «se alcanzan del»; «cansan» empieza en 2,205 s (cortando desde ahí oye «cansan del viaje»)"),
    ("md10", 507, "compran viejo", 3.315, "tras 0,2 s de silencio (3,12-3,31); desde 3,315 oye «compran viejo y tienen»"),
    ("md10", 531, "y tienen que pagar", 4.15, "desde 4,15-4,26 oye «y tiene que»"),
    ("md10", 553, "dos veces", 4.84, "desde 4,95 oye «dos veces en»; desde 4,83 «a lograr dos» (el final de «pagar»)"),
    ("md10", 569, "en remodelación.", 5.35, "desde 5,37 oye «en remodelación»; desde 5,32 «de la ciudad» (el final de «veces»)"),
    ("ct08", 813, "No cometas", 1.80, "primera sílaba (onset de 44 dB tras 1,44 s de silencio)"),
    ("ct08", 829, "el mismo error.", 2.33, "onset en 2,33 s; desde 2,33 oye «del mismo radar» (la «e» de «el» pegada a «cometas»)"),
    ("ct08", 862, "Haz clic en el enlace", 3.43, "la voz vuelve en 3,42 s tras una pausa de 0,3 s; desde 3,42 oye «haz clic en»"),
    ("ct08", 892, "y ven a", 4.44, "desde 4,40 oye «y ven a»"),
    ("ct08", 908, "conocerla.", 4.99, "desde 4,96 oye «conocerla.»; el onset fuerte, de 33 dB, cae en 5,04 s"),
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
