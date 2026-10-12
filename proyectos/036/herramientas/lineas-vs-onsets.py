#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/036/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-036.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-036"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-036.ts
TOMAS = {"hk11": (114, 0), "md08": (474, 9), "ct07": (1072, 13)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola) y de `palabras-desde.py` (qué palabra es la primera que oye
# whisper desde ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk11", 126, "El ruido,", 0.445, "primera sílaba (onset de 46 dB tras un valle de −67)"),
    ("hk11", 150, "el tráfico,", 1.235, "onset tras la pausa de 1,08-1,24 s; desde 1,20 oye «el tráfico»"),
    ("hk11", 177, "el afán.", 2.13, "onset tras la pausa de 1,97-2,13 s; desde 2,10 oye «el afán. Llegas a tu hogar»"),
    ("hk11", 197, "Llegas a tu hogar", 2.795, "onset tras un valle de −65 dB; desde 2,77 oye «Llegas a tu hogar»"),
    ("hk11", 218, "donde", 3.51, "desde 3,48 oye «guardan de todo» (la cola de «hogar»); desde 3,54 «donde todo cambia»"),
    ("hk11", 224, "todo cambia.", 3.72, "desde 3,68 oye «de todo» (la cola de «donde»); desde 3,74 «todo cambia»"),
    ("hk11", 253, "Ven,", 4.67, "onset tras la pausa de 4,41-4,68 s (−67 dB)"),
    ("hk11", 260, "te muestro", 4.91, "desde 4,88 oye «de nuestro»; desde 4,93 «Te muestro por qué»"),
    ("hk11", 268, "por qué.", 5.21, "onset de 5,22 s; desde 5,16 y 5,20 oye «por qué»"),
    ("md08", 486, "Jacuzzi,", 0.72, "primera sílaba"),
    ("md08", 505, "asado", 1.36, "la «a» va pegada a «-zzi»: desde 1,36 oye ya «has dado» y la /s/ está en 1,44-1,54 s"),
    ("md08", 523, "con tu familia", 1.975, "onset de 1,975 s; desde 1,82-2,00 oye «con tu familia» (la cola de «asado» no se lee)"),
    ("md08", 551, "y la", 2.90, "onset tras la pausa de 2,75-2,90 s; desde 2,98 y 3,00 oye «y la vista»"),
    ("md08", 555, "vista ideal.", 3.015, "desde 3,00 oye «y la vista», desde 3,02 «vista ideal»"),
    ("ct07", 1081, "Tu familia merece", 0.765, "primera sílaba (el chasquido de 0,39-0,52 s queda fuera de la ventana de voz)"),
    ("ct07", 1111, "respirar distinto.", 1.77, "desde 1,74 oye «de respirar» (la cola de «merece»); desde 1,80 «respirar distinto»"),
    ("ct07", 1153, "Agenda tu visita", 3.15, "onset tras la pausa de 2,91-3,15 s"),
    ("ct07", 1175, "ahora.", 3.875, "onset de 46 dB tras un valle de −67: desde 3,80 oye «Ahora, haz clic»"),
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
