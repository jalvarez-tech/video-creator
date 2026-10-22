#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/060/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-060.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-060"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-060.ts
TOMAS = {"hk03": (92, 12), "md05": (619, 27), "ct03": (1422, 16)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` y `envolvente-voz.py` (energía de la voz sola, sílaba a sílaba); el DTW de whisper iba de 4 a 11 f PRONTO en seis líneas de este rodaje. Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk03", 99, "Tu plata en el banco", 0.64, "primera sílaba («Tu»: el valle previo es de −70 dB); la línea entra con la imagen (opaca desde el f92)"),
    ("hk03", 135, "pierde valor", 1.86, "onset de 1,86 s tras la pausa de 1,69-1,86 s (valle −50 dB); el DTW decía 1,50 s (11 f pronto)"),
    ("hk03", 153, "cada mes.", 2.465, "explosión de la /k/ de «ca-» a 2,465 s tras su cierre (2,40-2,46 s, −55 dB); el DTW decía 2,30 s"),
    ("hk03", 182, "Este estudio", 3.44, "primera sílaba tras la pausa de 2,96-3,45 s (valle −76 dB)"),
    ("hk03", 211, "de 24 metros cuadrados", 4.40, "«de» (POR CONFIRMAR: whisper no lo oye): sílaba breve a 4,40 s entre dos valles; «veinti-» arranca a 4,52 s; el DTW decía 4,04 s (10 f pronto)"),
    ("hk03", 255, "en Laureles", 5.865, "onset de 5,865 s tras la pausa de 5,80-5,86 s (valle −69 dB); el DTW decía 5,58 s (8 f pronto)"),
    ("hk03", 284, "ya está generando", 6.82, "onset de 6,82 s tras la pausa de 6,56-6,80 s; el DTW decía 6,48 s (10 f pronto)"),
    ("hk03", 304, "dólares.", 7.495, "onset de 7,495 s (valle −58 dB tras «generando»)"),
    ("md05", 631, "La renta tradicional", 1.31, "primera sílaba (valle previo −60 dB)"),
    ("md05", 668, "deja el 0,5 %", 2.555, "onset de 2,555 s (valle −56 dB tras «tradicional»); el DTW decía 2,18 s (11 f pronto)"),
    ("md05", 692, "de rentabilidad mensual.", 3.37, "«de» débil entre 3,335 y 3,40 s (el hueco de la cifra no se puede cerrar: ver medidas/formantes-mitad.txt); «ren-» arranca a 3,615 s"),
    ("md05", 761, "Esta inversión", 5.635, "primera sílaba tras la pausa de 4,98-5,64 s (valle −77 dB)"),
    ("md05", 795, "deja más del 1 %.", 6.785, "onset de 6,785 s (valle −45 dB); el DTW decía 6,44 s (10 f pronto)"),
    ("md05", 830, "Ven,", 8.02, "«ven» débil a 8,02 s tras la pausa de 7,90-8,00 s; entra 2,6 f antes para que haya 12 f hasta la línea siguiente"),
    ("md05", 842, "te muestro cómo.", 8.325, "onset de 8,325 s tras la pausa de 8,14-8,30 s (valle −57 dB); «mues-» 8,535 · «-tro» 8,835 · «có-mo» 9,015"),
    ("ct03", 1434, "Si deseas que te envíe", 0.96, "primera sílaba (valle previo −66 dB)"),
    ("ct03", 1465, "la rentabilidad mensual,", 1.98, "«la» sin onset propio tras «envíe» (dip de 1,98 s a −17 dB); «ren-» arranca a 2,215 s"),
    ("ct03", 1509, "haz clic en el enlace", 3.455, "onset de 3,455 s tras la pausa de 3,14-3,44 s (valle −77 dB)"),
    ("ct03", 1539, "y escríbeme", 4.485, "«y es-» a 4,485 s tras el dip de 4,40-4,46 s (POR CONFIRMAR «escríbeme»: ver medidas/formantes-cta.txt)"),
    ("ct03", 1559, "un mensaje.", 5.115, "«un» nasal sin onset detectable a ≈ 5,115 s (F2 ≈ 700-880 Hz); «men-» ≈ 5,215 s y «-je» 5,495 s"),
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
