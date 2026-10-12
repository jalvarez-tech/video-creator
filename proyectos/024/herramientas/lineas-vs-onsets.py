#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/024/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-024.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-024"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-024.ts
TOMAS = {"hk1": (0, 4), "md2": (424, 12), "ct1": (881, 97)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo sale de `trozos-editoriales.mjs --audio` (DTW de whisper anclado a la energía) y se compara con los onsets de la voz sola
# (`onsets-voz.py`). `palabras-desde.py` (cortes) solo dice la IDENTIDAD de la palabra que empieza ahí, no su segundo.
LINEAS = [
    ("hk1", 7, "76 metros", 0.360, "primera toma de Isabella: entra a corte; la voz (energía) arranca a 0,36 s (`limites-voz.py`: «se-ten-ta y seis»)"),
    ("hk1", 44, "pueden sentirse", 1.645, "DTW 1,46 s es 0,19 s PRONTO: la energía tiene un valle de −53 dB tras «metros,» y «pueden» sube a 1,645 s (los cortes desde 1,58 y 1,70 s empiezan por «pueden»)"),
    ("hk1", 66, "muy diferentes", 2.400, "DTW 2,32 s; la «muy» es débil (subida de 9,5 dB sobre −27 dB) y los cortes desde 2,38 y 2,42 s empiezan por «muy» y desde 2,46 s por «diferentes»"),
    ("hk1", 86, "cuando están", 3.050, "voz tras la pausa (valle de −53 dB) de 2,95-3,05 s; DTW 3,06 s"),
    ("hk1", 102, "bien distribuidos.", 3.555, "DTW 3,66 s es 0,1 s TARDE: valle de −54 dB y «bien» sube a 3,555 s; «distribuidos» a 3,72 s (los cortes desde 3,70 s empiezan por «bien»)"),
    ("md2", 432, "Aquí el balcón", 0.650, "la voz arranca a 0,65 s (`limites-voz.py`)"),
    ("md2", 458, "se convierte en", 1.600, "DTW 1,42 s es 0,18 s PRONTO: «balcón» ocupa 1,30-1,58 s (valle de −56 dB antes) y «se» sube a 1,62 s; los cortes desde 1,62 s empiezan por «se convierte»"),
    ("md2", 483, "una extensión", 2.425, "DTW 2,52 s es 0,1 s TARDE: «una» sube a 2,425 s (valle de −48 dB tras «en»); los cortes desde 2,60 s empiezan por «extensión»"),
    ("md2", 516, "de la", 3.500, "DTW 3,28 s es 0,2 s PRONTO: valle de −49 dB y «de la» sube a 3,50 s (los cortes desde 3,46-3,54 s empiezan por «de la»)"),
    ("md2", 522, "zona social.", 3.730, "onset 3,73 s tras «de la»; los cortes desde 3,70 s ya pierden la «zona»"),
    ("ct1", 889, "Si quieres", 3.520, "la 2.ª frase arranca a 3,52 s tras 0,38 s de silencio (3,14-3,52 s); `desde` 97 f = 3,23 s"),
    ("ct1", 895, "más información,", 3.740, "DTW 3,66 s es 0,08 s PRONTO; «más» ≈ 3,74-3,84 s (los cortes desde 3,84 s empiezan por «más» y desde 3,88 s por «información»)"),
    ("ct1", 924, "contáctame.", 4.720, "valle de −45 dB en 4,60-4,70 s (la oclusiva de «con-»); la voz sube a 4,72 s; DTW 4,76 s; los cortes desde 4,60 s empiezan por «contáctame»"),
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
