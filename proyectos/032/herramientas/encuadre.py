#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
encuadre.py — la ventana vertical (9:16) que recorre un clip apaisado (16:9): siguiendo a la presentadora, o a mano si no hay nadie.

Uso (desde la raíz del repo):
  uv run proyectos/032/herramientas/encuadre.py            (todos los clips de proyectos/032/medidas/)
  uv run proyectos/032/herramientas/encuadre.py IMG_9531   (uno, y enseña la trayectoria)

POR QUÉ EXISTE. Los 19 clips de «5 Cta» son 16:9 (1920×1080 o 3840×2160) y el reel es 9:16: de cada fotograma
solo cabe una franja del 31,6 % del ancho a ALTURA COMPLETA. Un recorte fijo en el centro corta a Isabella en
cuanto camina (9426, 9427, 9524, 9531), así que la franja la sigue, como un operador de cámara:

  · la posición sale de las medidas de `seguir-sujeto.swift` (Vision de Apple, 5 fotogramas por segundo): el centro
    de la CARA y, donde no la ve, el del CUERPO; lo que falta se interpola;
  · la ventana NO persigue cada fotograma (se vería nerviosa): solo se mueve cuando Isabella sale de una ZONA
    MUERTA (±ZONA × el ancho de la ventana) y entonces la alcanza con un límite de velocidad y de aceleración, para
    que el arranque y el frenado sean suaves. Quieta ella, plano de trípode; caminando, un paneo lento;
  · la salida son claves cada 0,25 s (`x` = borde izquierdo de la ventana como fracción del ANCHO del clip), que
    `normalizar.mjs` convierte en la expresión del filtro `crop` de ffmpeg.

Lo que NO hace: no decide el encuadre vertical (la ventana va a altura completa; el acercamiento es el `zoom` de cada
corte del plan) ni mira si hay algo indeseable dentro de la franja (la tele encendida del 9442-9444, p. ej.: eso se
mira en los fotogramas).

  · V2 (rev. 1 del 029, al rehacer el reel con dron, hook, recorridos, mitad y CTA): tres cosas más.
      - ALTURA: la ventana no tiene que ser de altura completa. En los clips de Hooks y Mitad Isabella sale pequeña (la cara mide el 4 %
        del alto: 77 px en el cuadro final); en un 4K se puede cerrar la ventana al 62 % del alto (753×1339 px, ×1,43 al cuadro de
        1080×1920) y su cara pasa al 6,5 %. En un 1080p no (×3,3).
      - la ventana sigue a Isabella TAMBIÉN en vertical (su cara a ≈ 36 % del alto de la ventana) cuando la ventana es más baja que el cuadro.
      - MANUAL: los clips SIN Isabella (el dron, los recorridos) no tienen a quién seguir: su ventana se escribe a mano, como claves
        [t, centro]; un recorrido ya se mueve por sí solo (el que lo grabó andaba), así que casi todos van quietos.
"""
import json
import sys
from pathlib import Path

import numpy as np

RAIZ = Path(__file__).resolve().parents[3]
MEDIDAS = RAIZ / "proyectos" / "032" / "medidas"
SALIDA = RAIZ / "proyectos" / "032" / "encuadre-032.json"

MUESTREO = 5.0  # fotogramas por segundo de las medidas
ANCHO_VENTANA = 9 / 16 * 1080 / 1920  # fracción del ANCHO de un clip 16:9 que cubre una ventana 9:16 a altura completa
ZONA = 0.12  # media zona muerta, como fracción del tamaño de la ventana: dentro de ella la cámara no se mueve
VEL_MAX = 0.14  # fracción del ancho del clip por segundo (≈ 0,45 ventanas/s): un paneo lento
ACEL_MAX = VEL_MAX * 1.2  # fracción del ancho por s²: llega a la velocidad máxima en ≈ 0,8 s
SUAVIZADO = 0.55  # s: constante de tiempo del seguimiento (arranque y frenado suaves)
PASO_CLAVES = 0.25  # s entre claves de salida
CARA_EN_VENTANA = 0.36  # si la ventana es más baja que el cuadro: la cara a esta fracción de su alto, desde arriba

# Altura de la ventana (fracción del alto del clip; 1 = altura completa), por clip. Solo en clips 4K: en un 1080p cerrarla ablanda.
# V16: la mitad (MD01, 4K) se cierra al 64 % del alto: ella sale de cuerpo entero al 40 % del alto y así se le ve la cara.
ALTURAS = {"IMG_9428": 0.64}

# Ajustes por clip, a ojo y mirando el fotograma completo (lo único que la medida de Vision no puede saber: qué hay DETRÁS de ella).
#   izq_max  el borde izquierdo de la ventana no pasa de este valor (fracción del ancho): deja fuera algo de la derecha.
#   izq_min  el borde izquierdo de la ventana no baja de este valor: deja fuera algo de la izquierda.
# HK02 (IMG_9403): el sol del cielo deja un destello vertical de lente a ≈ 0,40-0,44 del ancho, a la izquierda de Isabella; con el borde
# izquierdo en ≥ 0,46 queda fuera y ella, a ≈ 0,57, sigue dentro (a un 40 % de la ventana).
AJUSTES: dict[str, dict] = {"IMG_9403": {"izq_min": 0.46}}

# Clips SIN Isabella: la ventana a mano. {clip: [[t, centro de la ventana (fracción del ancho del clip)], …]}, interpolado en línea recta.
# Cada centro sale de mirar el fotograma completo con siete ventanas de prueba (centros 0,20 · 0,30 · … · 0,80) en tres instantes del tramo
# que se usa, y elegir la que deja el sujeto del plano entero y nada que sobre en el borde.
MANUAL = {
    "DJI_20260414173436_0078_D": [[0.0, 0.62], [22.0, 0.62]],  # DR78: el dron pasa en lateral por la fachada; del muro de piedra con los papiros a la terraza
    "IMG_9509": [[0.0, 0.53], [9.0, 0.53]],  # RC27: el jardín con la palmera y la casa al fondo
    "IMG_9506": [[0.0, 0.50], [6.0, 0.50]],  # RC24: la mesa del comedor puesta y el cuadro de hojas (la tele queda fuera, a la izquierda)
    "IMG_9493": [[0.0, 0.60], [7.0, 0.60]],  # RC18: la palma y la sala de la terraza con el valle
    "IMG_9468": [[0.0, 0.47], [5.0, 0.47]],  # RC08: el sillón reclinable junto al ventanal con el valle
    "IMG_9469": [[0.0, 0.52], [6.0, 0.52]],  # RC09: la cama de la alcoba principal y su cabecero
    "IMG_9480": [[0.0, 0.66], [5.0, 0.66]],  # RC14: el lavamanos de cobre (a 0,62 entraba el inodoro por la izquierda al final del tramo)
    "IMG_9505": [[0.0, 0.45], [6.0, 0.45]],  # RC23: el telescopio, las sillas y el valle al atardecer (la vista)
}


def trayectoria_del_sujeto(medidas: list[dict]) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Instantes, centro horizontal y centro vertical (0-1) de la presentadora; la cara manda y el cuerpo rellena."""
    t, x, y = [], [], []
    for k, m in enumerate(medidas):
        c = m["cara"] or m["cuerpo"]
        t.append(k / MUESTREO)
        if c is None:
            x.append(np.nan)
            y.append(np.nan)
        else:
            x.append(c[0] + c[2] / 2)
            # La cara da su centro; el cuerpo, su cabeza: a un 10 % de la altura del cuerpo desde arriba.
            y.append(c[1] + c[3] / 2 if m["cara"] else c[1] + 0.10 * c[3])
    t, x, y = np.array(t), np.array(x), np.array(y)
    buenos = ~np.isnan(x)
    if not buenos.any():
        return t, np.full_like(t, 0.5), np.full_like(t, 0.4)
    return t, np.interp(t, t[buenos], x[buenos]), np.interp(t, t[buenos], y[buenos])


def sigue(t: np.ndarray, objetivo_t: np.ndarray, dur: float, ventana: float) -> np.ndarray:
    """La cámara virtual en UN eje: zona muerta + seguimiento suavizado con tope de velocidad y de aceleración.
    `ventana` es el tamaño de la ventana en ese eje (fracción del clip). Devuelve el CENTRO de la ventana a 60 Hz."""
    dt = 1 / 60
    ts = np.arange(0, dur + dt, dt)
    objetivo = np.interp(ts, t, objetivo_t)
    mitad = ventana / 2
    # Arranca centrada en donde está ella al principio (un clip no nace con un paneo para encontrarla).
    cam = float(np.clip(objetivo[0], mitad, 1 - mitad))
    vel = 0.0
    camino = []
    for obj in objetivo:
        obj = float(np.clip(obj, mitad, 1 - mitad))
        error = obj - cam
        zona = ZONA * ventana
        # Fuera de la zona muerta el objetivo es el BORDE de la zona (no el centro): la cámara se detiene en cuanto ella vuelve a estar dentro.
        deseo = 0.0 if abs(error) <= zona else error - np.sign(error) * zona
        vel_deseada = float(np.clip(deseo / SUAVIZADO, -VEL_MAX, VEL_MAX))
        # Aceleración limitada: el arranque y el frenado no son escalones.
        vel += float(np.clip(vel_deseada - vel, -ACEL_MAX * dt, ACEL_MAX * dt))
        cam = float(np.clip(cam + vel * dt, mitad, 1 - mitad))
        camino.append(cam)
    return ts, np.array(camino)


def muestrea(ts: np.ndarray, camino: np.ndarray, dur: float) -> list[tuple[float, float]]:
    return [(round(float(tk), 3), float(np.interp(tk, ts, camino))) for tk in np.arange(0, dur + 1e-6, PASO_CLAVES)]


def main() -> None:
    quiero = sys.argv[1:]
    salida = json.loads(SALIDA.read_text()) if SALIDA.exists() else {}
    for archivo in sorted(MEDIDAS.glob("*-sujeto.json")):
        clip = archivo.name.replace("-sujeto.json", "")
        if quiero and clip not in quiero:
            continue
        medidas = json.loads(archivo.read_text())
        dur = (len(medidas) - 1) / MUESTREO + 0.2
        alto = ALTURAS.get(clip, 1.0)
        ancho = ANCHO_VENTANA * alto
        t, x, y = trayectoria_del_sujeto(medidas)
        ts, cx = sigue(t, x, dur, ancho)
        # Vertical: solo si la ventana es más baja que el cuadro. El objetivo es el CENTRO de la ventana que deja la cara a CARA_EN_VENTANA.
        if alto < 1.0:
            _, cy = sigue(t, y + (0.5 - CARA_EN_VENTANA) * alto, dur, alto)
            ys = dict(muestrea(ts, cy, dur))
        else:
            ys = {}
        claves = []
        for tk, c in muestrea(ts, cx, dur):
            xl = c - ancho / 2
            tope = AJUSTES.get(clip, {}).get("izq_max")
            if tope is not None:
                xl = min(xl, tope)
            suelo = AJUSTES.get(clip, {}).get("izq_min")
            if suelo is not None:
                xl = max(xl, suelo)
            yt = (ys[tk] - alto / 2) if ys else 0.0
            claves.append([tk, round(xl, 4), round(yt, 4)])
        salida[clip] = {"ancho": round(ancho, 5), "alto": alto, "claves": claves}
        if quiero:
            izq = [c[1] for c in claves]
            print(f"{clip}: ella {x[0]:.2f}→{x[len(x)//2]:.2f}→{x[-1]:.2f} · ventana {alto:.0%} del alto · borde izq {izq[0]:.3f}→{izq[len(izq)//2]:.3f}→{izq[-1]:.3f}")
    # A mano: los clips sin Isabella (siempre se reescriben: son datos de este archivo).
    for clip, pts in MANUAL.items():
        if quiero and clip not in quiero:
            continue
        ts_, cs_ = zip(*pts)
        fin = ts_[-1]
        claves = [[round(float(tk), 3), round(float(np.interp(tk, ts_, cs_)) - ANCHO_VENTANA / 2, 4), 0.0] for tk in np.arange(0, fin + 1e-6, PASO_CLAVES)]
        salida[clip] = {"ancho": round(ANCHO_VENTANA, 5), "alto": 1.0, "claves": claves}
    SALIDA.write_text(json.dumps(salida, indent=1))
    print(f"{len(salida)} clips en {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
