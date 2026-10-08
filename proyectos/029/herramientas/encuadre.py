#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
encuadre.py — la ventana vertical (9:16) que recorre un clip apaisado (16:9) siguiendo a la presentadora.

Uso (desde la raíz del repo):
  uv run proyectos/029/herramientas/encuadre.py            (todos los clips de proyectos/029/medidas/)
  uv run proyectos/029/herramientas/encuadre.py IMG_9531   (uno, y enseña la trayectoria)

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
"""
import json
import sys
from pathlib import Path

import numpy as np

RAIZ = Path(__file__).resolve().parents[3]
MEDIDAS = RAIZ / "proyectos" / "029" / "medidas"
SALIDA = RAIZ / "proyectos" / "029" / "encuadre-029.json"

MUESTREO = 5.0  # fotogramas por segundo de las medidas
ANCHO_VENTANA = 9 / 16 * 1080 / 1920  # fracción del ANCHO de un clip 16:9 que cubre una ventana 9:16 a altura completa
ZONA = 0.12  # media zona muerta, como fracción del ancho de la ventana: dentro de ella la cámara no se mueve
VEL_MAX = 0.14  # fracción del ancho del clip por segundo (≈ 0,45 ventanas/s): un paneo lento
ACEL_MAX = VEL_MAX * 1.2  # fracción del ancho por s²: llega a la velocidad máxima en ≈ 0,8 s
SUAVIZADO = 0.55  # s: constante de tiempo del seguimiento (arranque y frenado suaves)
PASO_CLAVES = 0.25  # s entre claves de salida

# Ajustes por clip, a ojo y mirando el fotograma completo (lo único que la medida de Vision no puede saber: qué hay DETRÁS de ella).
#   izq_max  el borde izquierdo de la ventana no pasa de este valor (fracción del ancho): deja fuera algo de la derecha.
# IMG_9516 (ct14, la terraza de la sala): a la derecha, tras la palmera, hay una tele encendida (x ≈ 0,49-0,56) y, más allá, dos personas
# sentadas en la otra sala. Con la ventana pegada a ella la tele entra por el borde (0,22-0,54); con izq_max 0,165 la tele salía entera pero ella quedaba al 81 % del ancho y medio cortada por la derecha; con 0,2 la ventana acababa en 0,516 y aún se veía un filo de la tele en los primeros frames; con 0,185 acaba en 0,501 (el 4 % del ancho) y ella queda al 62-71 %, cerca del tercio.
AJUSTES = {"IMG_9516": {"izq_max": 0.185}}


def trayectoria_del_sujeto(medidas: list[dict]) -> tuple[np.ndarray, np.ndarray]:
    """Instantes y centro horizontal (0-1) de la presentadora; la cara manda y el cuerpo rellena."""
    t, x = [], []
    for k, m in enumerate(medidas):
        c = m["cara"] or m["cuerpo"]
        t.append(k / MUESTREO)
        x.append(np.nan if c is None else c[0] + c[2] / 2)
    t, x = np.array(t), np.array(x)
    buenos = ~np.isnan(x)
    if not buenos.any():
        return t, np.full_like(t, 0.5)
    return t, np.interp(t, t[buenos], x[buenos])


def sigue(t: np.ndarray, x: np.ndarray, dur: float) -> list[list[float]]:
    """La cámara virtual: zona muerta + seguimiento suavizado con tope de velocidad. Devuelve [[t, borde_izq]]."""
    dt = 1 / 60
    ts = np.arange(0, dur + dt, dt)
    objetivo = np.interp(ts, t, x)
    mitad = ANCHO_VENTANA / 2
    # Arranca centrada en donde está ella al principio (un clip no nace con un paneo para encontrarla).
    cam = float(np.clip(objetivo[0], mitad, 1 - mitad))
    vel = 0.0
    camino = []
    for obj in objetivo:
        obj = float(np.clip(obj, mitad, 1 - mitad))
        error = obj - cam
        zona = ZONA * ANCHO_VENTANA
        # Fuera de la zona muerta el objetivo es el BORDE de la zona (no el centro): la cámara se detiene en cuanto ella vuelve a estar dentro.
        deseo = 0.0 if abs(error) <= zona else error - np.sign(error) * zona
        vel_deseada = float(np.clip(deseo / SUAVIZADO, -VEL_MAX, VEL_MAX))
        # Aceleración limitada: el arranque y el frenado no son escalones.
        vel += float(np.clip(vel_deseada - vel, -ACEL_MAX * dt, ACEL_MAX * dt))
        cam = float(np.clip(cam + vel * dt, mitad, 1 - mitad))
        camino.append(cam)
    camino = np.array(camino)
    claves = []
    for tk in np.arange(0, dur + 1e-6, PASO_CLAVES):
        claves.append([round(float(tk), 3), round(float(np.interp(tk, ts, camino)) - mitad, 4)])
    return claves


def main() -> None:
    quiero = sys.argv[1:]
    salida = json.loads(SALIDA.read_text()) if SALIDA.exists() else {}
    for archivo in sorted(MEDIDAS.glob("*-sujeto.json")):
        clip = archivo.name.replace("-sujeto.json", "")
        if quiero and clip not in quiero:
            continue
        medidas = json.loads(archivo.read_text())
        dur = (len(medidas) - 1) / MUESTREO + 0.2
        t, x = trayectoria_del_sujeto(medidas)
        claves = sigue(t, x, dur)
        tope = AJUSTES.get(clip, {}).get("izq_max")
        if tope is not None:
            claves = [[tk, min(xl, tope)] for tk, xl in claves]
        izq = [c[1] for c in claves]
        salida[clip] = {"ancho": round(ANCHO_VENTANA, 5), "claves": claves}
        if quiero:
            print(f"{clip}: ella {x[0]:.2f}→{x[len(x)//2]:.2f}→{x[-1]:.2f} · ventana (borde izq) {izq[0]:.3f}→{izq[len(izq)//2]:.3f}→{izq[-1]:.3f}")
    SALIDA.write_text(json.dumps(salida, indent=1))
    print(f"{len(salida)} clips en {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
