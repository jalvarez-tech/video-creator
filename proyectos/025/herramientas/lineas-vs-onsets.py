#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/025/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-025.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-025"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-025.ts
TOMAS = {"hk09": (105, 14), "md11": (495, 19), "ct03": (847, 111)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo sale de `trozos-editoriales.mjs --audio` (DTW de whisper anclado a la energía) y se compara con los onsets de la voz sola
# (`onsets-voz.py`). `palabras-desde.py` (cortes) solo dice la IDENTIDAD de la palabra que empieza ahí, no su segundo.
LINEAS = [
    ("hk09", 118, "Esta propiedad", 0.945, "la voz (energía) arranca a 0,945 s (`limites-voz.py`: 0,95; onset 0,945 tras −66 dB); el corte desde 0,945 s empieza por «Esta propiedad»"),
    ("hk09", 139, "tiene sentido", 1.675, "DTW 1,54 s es 0,14 s PRONTO: onset 1,675 s; los cortes desde 1,60-1,70 s empiezan por «tiene sentido»"),
    ("hk09", 160, "para un comprador", 2.380, "DTW 2,14 s es 0,24 s PRONTO: onset 2,38 s (valle de −46,6 dB); los cortes desde 2,30-2,42 s empiezan por «para un comprador»; desde 2,645 s ya pierden «para un»"),
    ("hk09", 187, "muy específico.", 3.280, "DTW 3,00 s es 0,28 s PRONTO: sin onset (continua desde «comprador»); el corte desde 3,30 s da «muy específico» y desde 3,33 s «específico»: «muy» empieza a ≈ 3,28 s; «específico» sube a 3,59 s"),
    ("md11", 504, "¿Alguien que valora", 1.000, "la voz arranca a 1,00 s tras 0,91 s de silencio (`limites-voz.py`); onsets 1,000 · 1,185 · 1,350 = al-guien-que: no hay «eres» delante; los cortes desde 1,00 y 1,185 s empiezan por «alguien»"),
    ("md11", 527, "la arquitectura", 1.770, "DTW 1,66-1,78 s; los cortes desde 1,70 y 1,76 s oyen «de la arquitectura» y desde 1,82 s «arquitectura»: «la» empieza a ≈ 1,77 s (sin valle: viene pegada a «valora»)"),
    ("md11", 558, "y prefiere crear", 2.800, "DTW 2,46 s es 0,34 s PRONTO: valle de −63,5 dB y «y» sube a 2,80 s; los cortes desde 2,435 y 2,80 s empiezan por «y prefiera crear»"),
    ("md11", 594, "sus propios", 3.990, "DTW 3,64 s es 0,35 s PRONTO: valle de −59,5 dB y «sus» sube a 3,99 s (el corte desde 3,99 s da «es propiedad»: la /u/ pegada); «crear» ocupa 3,39-3,9 s"),
    ("md11", 613, "acabados?", 4.630, "DTW 4,42 s es 0,2 s PRONTO: valle de −55,6 dB y «a-» sube a 4,63 s (los cortes desde 4,63 s ya dan «por favor»: la palabra se pierde, el onset es el de la 1.ª sílaba)"),
    ("ct03", 853, "escríbeme", 3.965, "la 2.ª mitad arranca a 3,965 s tras 0,40 s de silencio (3,56-3,96 s); el corte desde 3,965 s empieza por «escríbeme»; `desde` 111 f = 3,70 s"),
    ("ct03", 876, "y ven a conocerlo.", 4.735, "DTW 4,48 s es 0,26 s PRONTO: valle de −57 dB y «y» sube a 4,735 s; los cortes desde 4,40 y 4,735 s empiezan por «y ven a conocerlo»"),
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
