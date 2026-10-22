#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/058/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-058.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-058"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-058.ts
TOMAS = {"hk02": (84, 0), "md07": (493, 12), "ct01": (934, 17)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola: los valles profundos de las oclusivas) y de `silabas.py` (los núcleos silábicos); el DTW de whisper va 3-9 f pronto a mitad de frase.
# Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk02", 87, "Este es un apartamento", 0.115, "primera sílaba («Es-»: valle previo de −62 dB); la línea entra con la imagen (a corte, f84)"),
    ("hk02", 110, "pensado para", 0.905, "onset de 0,905 s (valle −47 dB); desde 0,905 whisper oye «pensado para descansar…»"),
    ("hk02", 137, "descansar,", 1.795, "onset de 1,795 s (valle −58 dB: la /d/); desde 1,455 oye «para descansar, no para sobrevivir»"),
    ("hk02", 157, "no para sobrevivir", 2.445, "tras la coma (valle −63 dB); desde 2,445 oye «No para sobrevivir al caos.»"),
    ("hk02", 181, "al caos.", 3.27, "«al» (núcleo a 3,30 s) sin onset propio (la /l/ pegada a la «r» de «sobrevivir»); «caos» empieza en 3,46 s (valle −54 dB)"),
    ("md07", 494, "Lo que cabe en", 0.425, "primera sílaba (valle previo de −63 dB)"),
    ("md07", 503, "60 metros cuadrados", 0.74, "«sesenta» tras el valle de −54 dB a 0,74 s; whisper (DTW) lo pone en 0,75"),
    ("md07", 547, "en Palmazera", 2.23, "el «en» tras el valle de −57 dB a 2,23 s; «Pal-» a 2,38 s; whisper oye «Palmacera» (confianza 0,29)"),
    ("md07", 569, "te va a cambiar", 2.975, "tras la pausa de 2,975 s (valle −62 dB); el DTW coincide (2,99)"),
    ("md07", 584, "la idea del", 3.50, "«la» sin onset propio tras «cambiar» (núcleo a 3,38-3,48 s); el DTW lo pone en 3,56; ±3 f"),
    ("md07", 599, "apartamento pequeño.", 3.96, "«a-» sin onset propio tras «del»; el DTW da 3,96 y «pequeño» empieza en 4,53 s (valle −56 dB); ±3 f"),
    ("ct01", 935, "Escríbeme", 0.605, "primera sílaba (valle previo de −58 dB)"),
    ("ct01", 954, "y te cuento", 1.255, "onset de 1,255 s (valle −52 dB); «te» a 1,365 s (valle −59 dB)"),
    ("ct01", 970, "por qué este lugar", 1.78, "onset de 1,780 s (la /p/: valle −54 dB)"),
    ("ct01", 997, "se siente", 2.68, "onset de 2,680 s (valle −63 dB: la pausa tras «lugar»)"),
    ("ct01", 1005, "diferente", 2.965, "onset de 2,965 s (la /d/: valle −60 dB)"),
    ("ct01", 1020, "desde que entras.", 3.465, "onset de 3,465 s (la /d/: valle −57 dB)"),
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
