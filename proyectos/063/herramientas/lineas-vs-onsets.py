#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
lineas-vs-onsets.py — ¿cada línea de subtítulo entra 0-3 f ANTES de su palabra? Medido sobre la voz SOLA de cada toma.

Uso (desde la raíz del repo):
  uv run proyectos/063/herramientas/lineas-vs-onsets.py

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
Si cambia una línea de `subtitulos-063.ts`, cámbiala aquí también: la puerta no cruza este archivo.
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, find_peaks, sosfilt

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-063"

# toma → (en de su plano en la composición, `desde` de su plano en frames de la fuente a 30 fps), de metraje-063.ts
TOMAS = {"hk01": (91, 75), "md01": (555, 96), "ct02": (1117, 109)}

# (toma, frame en que entra la línea, texto, segundo de la fuente en que empieza su primera palabra, nota)
# El segundo de cada palabra sale de `onsets-voz.py` (energía de la voz sola), de `palabras-desde.py` (qué palabra es la primera que oye whisper desde ese instante; el «onset más cercano» NO es la palabra) y de la
# envolvente de energía (`envolvente-voz.py`: el valle de una /p/, /k/ o /t/ marca el límite de una palabra). Los de las líneas que abren una toma son su primera sílaba.
LINEAS = [
    ("hk01", 102, "El error no es", 2.90, "primera sílaba («El»: la energía sube de −72 a −12 dB en 20 ms); la línea entra con la imagen (opaca desde el f91)"),
    ("hk01", 118, "comprar un", 3.44, "onset de 3,440 s («com-», tras el valle de 3,38-3,43 s; la /p/ cierra en 3,58-3,64 s y «prar» sube a 3,66 s)"),
    ("hk01", 132, "lote barato,", 3.915, "onset de 3,915 s («lo-»; «un» = 3,80 s); desde 4,03 oye «lo te barato»; «ba·ra·to» = 4,21 · 4,42 · 4,645 s"),
    ("hk01", 162, "es comprarlo sin", 4.915, "onset de 4,915 s tras la pausa de 4,72-4,91 s; desde 4,915 oye «es comprarlo sin todas las»"),
    ("hk01", 193, "todas las", 5.925, "onset de 5,925 s tras la pausa de 5,74-5,90 s (valle −55 dB); «to-das» = 5,925 · 6,085 s"),
    ("hk01", 206, "acometidas legales.", 6.37, "onset de 6,370 s («a-», tras el dip de 6,34 s entre «las» y «a»; la /k/ de «co» cierra en 6,42-6,46 s y abre a 6,47 s); desde 6,47 oye «cometidas legales»"),
    ("hk01", 248, "Ven, te enseño", 7.755, "onset de 7,755 s («Ven», tras la pausa de 7,17-7,75 s; la «v» es floja, −31 dB, y la vocal sube a 7,84 s)"),
    ("hk01", 277, "cómo evitar esto.", 8.72, "«có-» = ráfaga de la /k/ a 8,74 s tras el cierre de 8,60-8,72 s (valle −30 dB); «e-vi-tar es-to» = 8,865 · 9,11 · 9,215 s; el DTW la ponía en 8,56 s"),
    ("md01", 567, "Antes de enamorarte", 3.635, "primera sílaba («An-»: −55 → −14 dB en 20 ms); la línea entra con la imagen (opaca desde el f555)"),
    ("md01", 591, "de un lote,", 4.445, "onset de 4,445 s (valle −68 dB tras la pausa; «de» largo, 0,4 s); un corte aislado de 4,40-5,20 s oye «de un lote»"),
    ("md01", 616, "empieza con", 5.28, "onset de 5,280 s («em-», /e/ corta + /m/); cortes aislados de 5,2-6,45 s y 3,5-6,45 s oyen «empieza con tres cosas»; ver la nota de «empieza» en subtitulos-063.ts"),
    ("md01", 633, "tres cosas:", 5.825, "onset de 5,825 s («tres», tras «con» = 5,67 s); «co-sas» = 6,06 · 6,30 s"),
    ("md01", 661, "ubicación,", 6.755, "onset de 6,755 s tras la pausa de 6,36-6,76 s; «u-bi-ca-ción» = 6,755 · 6,965 · 7,14 s"),
    ("md01", 685, "agua y", 7.565, "onset de 7,565 s (valle −71 dB tras la pausa de 7,32-7,50 s); «a-gua» = 7,565 · 7,725 s"),
    ("md01", 704, "escrituras.", 8.21, "onset de 8,210 s («es-», tras «y» = 8,025 s); «cri» = 8,35 s; acaba a 8,43 s y sigue una pausa de 380 ms"),
    ("md01", 722, "Y este lote empieza", 8.80, "onset de 8,800 s («Y», tras la pausa de 8,43-8,80 s; −57 → −25 dB); «este» sube a 8,84 s"),
    ("md01", 749, "con todas esas cosas", 9.69, "onset de 9,690 s («con», tras el cierre de la /k/ en 9,665 s); «empieza» = nasal 9,385-9,465 · cierre de /p/ 9,525 · «pie» 9,545 s; «to-das» = 9,94 s; «e-sas» = 10,12 s; «co-sas» = 10,30 s"),
    ("md01", 776, "sobre la mesa.", 10.585, "onset de 10,585 s («so-», tras la pausa de 10,50-10,57 s); «bre» = 10,73 s; «la» = 10,87 s; «me-sa» = 10,995 s"),
    ("ct02", 1129, "¿Quieres saber si", 4.05, "primera sílaba («Quie-»: −71 → −6 dB en 20 ms); la línea entra con la imagen (opaca desde el f1117)"),
    ("ct02", 1148, "este lote se ajusta", 4.695, "onset de 4,695 s («es-», valle −69 dB; «si» = 4,54 s); desde 4,54 oye «si este lote se ajusta»"),
    ("ct02", 1167, "a tu presupuesto?", 5.34, "«a» a 5,34 s (energía −10,8 dB entre dos valles); «tu» a 5,45 s; el cierre de la /p/ de «presupuesto» (5,52 s) y «pre-» a 5,575 s; desde 5,33 oye «tu presupuesto, escríbeme»"),
    ("ct02", 1205, "Escríbeme", 6.60, "onset de 6,605 s («Es-», tras 0,3 s de silencio; «crí» = 6,74-6,87 s); desde 6,605 oye «escríbeme y te envío toda»"),
    ("ct02", 1231, "y te envío toda", 7.455, "onset de 7,455 s tras la pausa de 7,32-7,48 s; «te» = 7,565 s; «en» = 7,725 s; «ví-o» = 7,985 s (tras el cierre de 7,88-7,96 s)"),
    ("ct02", 1254, "la información.", 8.22, "«la» a 8,20-8,28 s (−8 dB) tras «toda» = 7,985-8,16 s; «in-» a 8,38 s, «for» 8,535 s, «ma» 8,66 s; desde 8,38 oye «información»"),
]
ADELANTO_MIN, ADELANTO_MAX = -0.5, 3.0  # frames; −0,5 para la primera línea, que no puede preceder a su imagen; −1,6 por «los detalles.» (1,5 f tras su «los», 1 f ANTES de «detalles»), declarado en subtitulos-063.ts


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
