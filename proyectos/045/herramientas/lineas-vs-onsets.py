#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/045/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-045.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-045"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-045.ts
TOMAS = {"hk01": (111, 15), "md01": (623, 9), "ct01": (1114, 11)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale del perfil de energía de la voz sola (`perfil-voz.py`, 20 ms) y de `palabras-desde.py` (qué palabra es la primera que oye whisper desde ese
# instante: ojo, devuelve la palabra que CONTIENE o SIGUE a ese instante; el «onset más cercano» NO es la palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 120, "El tiempo es el activo", 0.83, "primera sílaba: «El» a −21 dB tras 0,76 s de silencio y un resoplido de −46 dB (0,75-0,81 s); whisper la pone en 0,00 s"),
    ("hk01", 150, "más valioso", 1.85, "tras la pausa de 1,75-1,82 s (−46…−62 dB); desde 1,85 oye «más valioso de los seres», desde 1,70 «activo más valioso»"),
    ("hk01", 180, "de los seres humanos", 2.82, "tras la pausa de 2,75-2,80 s (−37…−44 dB); desde 2,835 oye «de los seres humanos y», desde 2,945 «los seres»"),
    ("hk01", 209, "y te ayudamos a optimizarlo,", 3.805, "tras la pausa de 3,62-3,77 s (−52…−64 dB); desde 3,805 oye «y te ayudamos a optimizarlo,»"),
    ("hk01", 250, "incluyendo un", 5.18, "tras la pausa de 5,10-5,15 s; desde 5,165 oye «incluyendo un aseo semanal.»"),
    ("hk01", 271, "aseo semanal.", 5.87, "«un» a 5,78 s; desde 5,78 oye «un asedio semanal» y desde 5,90 «hace dos semanas» (POR CONFIRMAR AL OÍDO)"),
    ("md01", 632, "De esta manera tendrás", 0.62, "primera sílaba: «De» a −47 → −12 dB; el chasquido de labios de 0,55 s (−37 dB) no es voz"),
    ("md01", 673, "todo ordenado", 1.99, "tras la pausa de 1,80-1,98 s (−43…−58 dB): la «t» sale a 1,99-2,00 s; desde 1,99 oye «ordenado y aprovecharás» (POR CONFIRMAR AL OÍDO)"),
    ("md01", 704, "y aprovecharás el tiempo", 3.04, "tras la pausa de 2,96-3,03 s (−52…−57 dB); la «y» va pegada a la «a»: onset de 39,8 dB a 3,045 s"),
    ("md01", 728, "en lo que", 3.81, "tras la pausa de 3,75-3,78 s (−56 dB); desde 3,81 oye «y lo que es mejor.» («en» como «y»)"),
    ("md01", 740, "eres mejor.", 4.235, "tras la pausa de 4,17-4,21 s (−56 dB); onset de 38,8 dB"),
    ("ct01", 1123, "Si quieres un", 0.70, "primera sílaba: «Si» a −32 → −17 dB; el chasquido de 0,63 s (−31 dB) no es voz"),
    ("ct01", 1135, "acompañamiento personalizado", 1.09, "tras «un» (0,90-1,05 s; pausa de 1,06 s a −45 dB); onset de 25,9 dB a 1,09 s; 6 sílabas de 1,10 a 1,62 s; desde 1,09 oye «acompañamiento personalizado. Durante toda tu»"),
    ("ct01", 1170, "durante toda tu estancia,", 2.26, "tras la pausa de 2,14-2,22 s; desde 2,23 oye «durante toda la testancia» (POR CONFIRMAR AL OÍDO: «tu estancia»)"),
    ("ct01", 1211, "contáctanos.", 3.62, "tras la pausa de 3,54-3,58 s (−54 dB): 4 sílabas a 3,62 · 3,90 · 4,06 · 4,30 s; desde 3,60 oye «contactanos.» (el DTW la pone en 3,90 s)"),
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
