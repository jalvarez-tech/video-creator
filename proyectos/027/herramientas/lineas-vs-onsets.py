#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/027/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-027.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-027"

# toma → (WAV de su voz, en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-027.ts. Las tres tomas ya se publicaron (V6, V7, V10).
TOMAS = {"hk2": ("hk2", 0, 5), "md3": ("md3", 442, 18), "ct": ("rc14", 866, 1344)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# Los segundos son los que la V6 (HK2), la V7 (MD3) y la V10 (CT4) llevaron a su palabra con la energía de la voz sola y cortes acotados entre pausas (R31): son de la FUENTE,
# así que valen tal cual; lo que cambia es el `en` y el `desde` de cada plano en esta pieza.
LINEAS = [
    ("hk2", 6, "Si para ti", 0.380, "primera toma: entra a corte; la voz (energía) arranca a 0,38 s (la /s/ de «Si»; el onset vocálico es de 0,505 s) — V6"),
    ("hk2", 22, "un apartamento", 0.900, "DTW 0,90 s; los onsets 0,775 y 1,010 s: «para» y «ti» van pegados a «un»; sin onset propio — V6"),
    ("hk2", 36, "sin balcón,", 1.380, "DTW 1,38 s; onset más próximo 1,450 s (la «s» fricativa de «sin» empieza antes que su vocal) — V6"),
    ("hk2", 63, "no es opción,", 2.260, "onset 2,260 s tras un valle de −43,5 dB — V6"),
    ("hk2", 93, "mira esto.", 3.265, "onset 3,265 s tras un valle de −53,7 dB (la pausa de 3,06-3,26 s) — V6"),
    ("md3", 457, "Cuenta con", 1.090, "la voz arranca a 1,09 s (`limites-voz.py`) — V7"),
    ("md3", 468, "dos habitaciones", 1.480, "DTW 1,48 s — V7"),
    ("md3", 484, "independientes,", 2.000, "DTW 2,06 s; los cortes empiezan por «independiente» desde 1,98 s — V7"),
    ("md3", 520, "balcón", 3.210, "voz tras la pausa de 3,01-3,21 s (`limites-voz.py`) — V7"),
    ("md3", 528, "y ubicación junto a", 3.480, "DTW 3,68 s es 0,2 s TARDE: valle de −43 dB en 3,40-3,44 s y la «y» sube a los 3,48 s — V7"),
    ("md3", 569, "City Plaza.", 4.830, "onsets 4,79 y 4,91 s; DTW de «City» 4,87 s — V7"),
    ("ct", 893, "Si te gustó", 45.700, "valle de −63 dB en 45,38 s; la «S» de «Si» sube a −27 dB (45,70 s); la voz (energía) arranca a 45,215 s (un soplo a −46 dB) — V10"),
    ("ct", 910, "este apartamento", 46.270, "«es-te» = los picos de 46,33 y 46,50 s; el pico de 46,20 s es el «tó» tónico; sin onset propio — V10"),
    ("ct", 936, "y deseas tener", 47.135, "valle de −45 dB en 47,11 s y onset de +28 dB a 47,135 s (la «y») — V10"),
    ("ct", 968, "más información,", 48.195, "«más» sube a 48,195 s (valle de −42 dB en 48,33 s antes de «in-») — V10"),
    ("ct", 988, "contáctame.", 48.885, "valle de −54,6 dB en 48,87 s y onset de +37 dB a 48,885 s; la voz acaba a 49,35 s — V10"),
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
