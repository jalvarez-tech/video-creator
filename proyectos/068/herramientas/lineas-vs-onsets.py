#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/068/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-068.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-068"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-068.ts
TOMAS = {"hk04": (73, 0), "md02": (457, 0), "ct01": (875, 0)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra) y de `perfil-voz.py` (los valles de las oclusivas). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk04", 83, "El verdadero", 0.365, "primera sílaba («El»: la voz sube de −42 a −17 dB en 40 ms); la línea entra con la imagen (opaca desde el f73)"),
    ("hk04", 98, "estatus", 0.86, "onset de 0,860 s («es-»; el valle de 0,96-1,04 s es la /t/ de «ta»); «es-ta-tus» = 0,860 · 1,075 · 1,315 s"),
    ("hk04", 119, "no es la fachada", 1.55, "onset de 1,550 s («no»; valle de 1,52-1,56 s = la /n/); desde 1,55 oye «no es la fachada»"),
    ("hk04", 146, "que muestras, es la", 2.45, "onset de 2,450 s («que»; fachada = 1,935 · 2,105 · 2,305 s); desde 2,45 oye «muestras. Es la privacidad»"),
    ("hk04", 173, "privacidad", 3.355, "onset de 3,355 s («pri-»; desde 3,355 oye «privacidad que puedes tener»)"),
    ("hk04", 191, "que puedes tener.", 3.955, "onset de 3,955 s («que»; desde 3,955 oye «que puedes tener»)"),
    ("md02", 459, "Imagina que el éxito", 0.095, "primera sílaba («I-»: el valle previo es de −40 dB); desde 0,095 oye «Imagina que el éxito»"),
    ("md02", 488, "por fin se siente", 1.06, "onset de 1,060 s («por»); desde 1,06 oye «por fin se siente»"),
    ("md02", 515, "como se ve", 1.98, "onset de 1,980 s («co-»); desde 1,98 oye «como se ve en»"),
    ("md02", 548, "en silencio,", 3.075, "onset de 3,075 s («en» tras la pausa de 2,68-3,08 s); desde 3,075 oye «en silencio, con la»"),
    ("md02", 573, "con la montaña", 3.91, "onset de 3,910 s («con» tras la pausa de 3,55-3,96 s); desde 3,745 y 3,910 oye «con la montaña al»"),
    ("md02", 586, "al frente", 4.335, "onset de 4,335 s («al»; mon-ta-ña = 4,0-4,3 s); desde 4,335 oye «al frente y sin»"),
    ("md02", 608, "y sin nadie", 5.05, "onset de 5,050 s («y»); «nadie» POR CONFIRMAR (whisper le da 0,31 de confianza); desde 5,05 oye «y sin ajeche»"),
    ("md02", 622, "que te apure.", 5.545, "onset de 5,545 s («que»; «que»/«se» POR CONFIRMAR); desde 5,545 oye «que tapura»; a-pu-re = 5,665 · 5,825 · 5,950 s"),
    ("ct01", 893, "Tu bosque privado", 0.64, "primera sílaba («Tu»: la voz sube de −53 a −22 dB en 40 ms tras el viento); «bosque» POR CONFIRMAR (la /s/ de 0,84-0,88 s no la tendría «refugio»)"),
    ("ct01", 925, "a solo 20 minutos", 1.695, "onset de 1,695 s («a»); desde 1,695 oye «a solo 20 minutos»"),
    ("ct01", 951, "de Medellín,", 2.56, "onset de 2,560 s («de»); desde 2,56 oye «de Medellín, escríbeme y»"),
    ("ct01", 980, "escríbeme", 3.52, "«es» a 3,52 s tras la pausa de 3,28-3,50 s (la /k/ de «cri» cierra de 3,60 a 3,74 s y «crí» sube a 3,76 s); onset detectado en 3,540 s"),
    ("ct01", 1005, "y agendemos", 4.365, "«y» a 4,365 s (11 dB) y «a-» a 4,485 s tras la pausa de 4,22-4,40 s; «agendemos» POR CONFIRMAR (whisper: «hajandemos»); /s/ final a 4,86 s"),
    ("ct01", 1026, "una visita.", 5.05, "«una» ≈ 5,05 s (sin onset propio: pegada a la /s/ de «-mos»); vi-si-ta = 5,185 · 5,26 · 5,345 s"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-068.ts


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
