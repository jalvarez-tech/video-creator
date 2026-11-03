#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/066/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-066.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-066"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-066.ts
TOMAS = {"hk05": (72, 18), "md03": (611, 12), "ct04": (1062, 12)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk05", 94, "En Medellín se construyen", 1.35, "primera sílaba («En»: el valle previo es de −72 dB, tras una inhalación a −50 dB); la línea entra con la imagen (opaca desde el f72); desde 1,35 oye «En Medellín se construyen miles»"),
    ("hk05", 129, "miles de apartamentos", 2.545, "onset de 2,545 s («mi-»; desde 2,545 oye «miles de apartamentos cada año»; desde 2,385 oye «de miles de apartamentos»). El DTW la ponía en 2,44 s (3 f pronto)"),
    ("hk05", 155, "cada año,", 3.38, "onset de 3,380 s tras el valle de −70 dB; desde 3,38 oye «caño lotes de 5 mil» (empieza en «ca-da a-ño») y desde 3,65 ya «el caño»"),
    ("hk05", 192, "lotes de 5.000 metros,", 4.64, "onset de 4,640 s tras la pausa de 1 s (valle −69 dB); desde 4,64 oye «lotes de 5000 metros, con»"),
    ("hk05", 228, "con esta vista,", 5.83, "onset de 5,830 s tras «metros» (valle −69 dB); desde 5,83 oye «con esta vista muy pocos». El DTW la ponía en 6,20 s (11 f tarde)"),
    ("hk05", 266, "muy pocos.", 7.075, "onset de 7,075 s tras la pausa (valle −67 dB); desde 7,075 oye «muy pocos»; po·cos = 7,52 · 7,765 s"),
    ("md03", 613, "Hay una versión", 0.50, "primera sílaba («Hay»: la energía sube 46 dB en 20 ms desde el valle de −68 dB); la línea entra con la imagen (opaca desde el f611)"),
    ("md03", 630, "de tu vida", 1.05, "«de» pegado a «versión» (onset suave de 1,050 s, subida de 15 dB); desde 0,925 oye «Siente tu vida donde ya» y desde 1,185 «tu vida donde ya no»: POR CONFIRMAR AL OÍDO"),
    ("md03", 649, "donde ya no tienes", 1.71, "onset de 1,710 s tras el valle de −52 dB; desde 1,71 oye «donde ya no tienes que»"),
    ("md03", 671, "que salir a buscar", 2.44, "onset de 2,440 s (valle −67 dB); desde 2,44 oye «que salir a buscar paz»; desde 2,18, «tienes que salir a buscar»"),
    ("md03", 702, "paz", 3.48, "onset de 3,480 s (valle −63 dB, subida de 45 dB); desde 3,48 oye «pas los fines de semana»; desde 3,23, «Carpaz los fines»: POR CONFIRMAR AL OÍDO"),
    ("md03", 710, "los fines de semana", 3.72, "onset de 3,720 s; desde 3,72 oye «los fines de semana, porque»"),
    ("md03", 746, "porque ya vives", 4.92, "onset de 4,920 s tras la pausa de 3,8-4,4 s (valle −61 dB); desde 4,92 oye «porque ya vives dentro de»"),
    ("md03", 765, "dentro de ella.", 5.605, "onset de 5,605 s (valle −61 dB); desde 5,605 oye «dentro de ella.»"),
    ("ct04", 1075, "Si deseas más información,", 0.855, "primera sílaba («Si»: el valle previo es de −70 dB); la línea entra con la imagen (opaca desde el f1062); desde 0,86 oye «Si deseas más información, haz»"),
    ("ct04", 1119, "haz clic", 2.325, "onset de 2,325 s tras la pausa (valle −68 dB); desde 2,33 oye «¡Haz clic en el enlace!»"),
    ("ct04", 1128, "en el enlace.", 2.62, "onset de 2,630 s («en»; clic = 2,495 s); desde 2,58 whisper devuelve texto inventado: se lee por los onsets"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-066.ts


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
