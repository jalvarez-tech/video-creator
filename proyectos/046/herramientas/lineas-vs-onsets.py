#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/046/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-046.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-046"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-046.ts. Se mide sobre la voz SOLA cruda (`<toma>.wav`).
TOMAS = {"hk03": (0, 0), "md02": (435, 20), "md03": (543, 18), "ct02": (1086, 22)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk03", 17, "Cuando llegas a una ciudad", 0.570, "primera sílaba (onset de 40 dB desde el silencio)"),
    ("hk03", 41, "que no es", 1.435, "desde 1,40 oye «que no es la tuya»; desde 1,20 «ciudad que no es la»"),
    ("hk03", 47, "la tuya,", 1.650, "desde 1,65 oye «la tuya, el acompañamiento»; sin onset propio (la «la» pegada a «es»)"),
    ("hk03", 59, "el acompañamiento", 1.965, "onset de 26,7 dB desde −45 dB: la «el» tras «tuya»; whisper la oye desde 1,80-2,25 como «el acompañamiento»"),
    ("hk03", 88, "personalizado es una", 2.995, "desde 2,95 oye «personalizado, es una plusvalía»"),
    ("hk03", 126, "plusvalía", 4.245, "desde 4,10 oye «una plusbalía»; el onset de «plus» sube a 4,245 s"),
    ("hk03", 144, "indispensable.", 4.845, "onset de 4,845 s tras «valía»"),
    ("md02", 436, "Te acompañamos desde el", 0.695, "primera sílaba (onset de 54 dB); el chasquido de 0,285 s (12 dB sobre −69 dB) no es voz"),
    ("md02", 464, "día uno", 1.670, "desde 1,55 oye «el día uno con atención»; desde 1,70 ya empieza en «con»"),
    ("md02", 484, "con atención personalizada.", 2.345, "tras la pausa de 2,20-2,34 s; desde 2,30 oye «con atención personalizada.»"),
    ("md03", 545, "Contamos con", 0.680, "primera sílaba (onset de 46 dB); el chasquido de 0,25 s (16 dB) no es voz"),
    ("md03", 567, "chef privado,", 1.460, "desde 1,25 oye «con chef privado»; onset de 1,46 s"),
    ("md03", 599, "tours, masajes y transporte", 2.560, "tras la pausa de 2,09-2,56 s; desde 2,30-2,50 oye «tours, masajes y transporte y»"),
    ("md03", 662, "y las", 4.595, "desde 4,50 oye «y las mejores experiencias de»"),
    ("md03", 668, "mejores experiencias", 4.820, "desde 4,70 oye «las mejores experiencias de la»; onset de 4,82 s"),
    ("md03", 692, "de la ciudad de Medellín.", 5.595, "desde 5,60 oye «de la ciudad de Medellín.»"),
    ("ct02", 1087, "Si quieres un apartamento amoblado", 0.780, "primera sílaba (onset de 41 dB desde −68 dB); POR CONFIRMAR AL OÍDO «amoblado»"),
    ("ct02", 1136, "que tenga acompañamiento personalizado,", 2.430, "tras la pausa de 2,20-2,44 s; desde 2,40 oye «que tenga acompañamiento»"),
    ("ct02", 1196, "escríbeme.", 4.400, "la «es» sube a 4,40 s antes de la pausa corta; la «crí» a 4,605 s (desde 4,60 oye «cría mi»)"),
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
