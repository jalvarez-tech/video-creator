#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
encuadre.py — la ventana vertical (9:16) que recorre un clip apaisado (16:9): siguiendo a la presentadora, o a mano si no hay nadie.

Uso (desde la raíz del repo):
  uv run proyectos/037/herramientas/encuadre.py            (todos los clips de proyectos/037/medidas/)
  uv run proyectos/037/herramientas/encuadre.py IMG_9531   (uno, y enseña la trayectoria)

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
MEDIDAS = RAIZ / "proyectos" / "037" / "medidas"
SALIDA = RAIZ / "proyectos" / "037" / "encuadre-037.json"

MUESTREO = 5.0  # fotogramas por segundo de las medidas
ANCHO_VENTANA = 9 / 16 * 1080 / 1920  # fracción del ANCHO de un clip 16:9 que cubre una ventana 9:16 a altura completa
ZONA = 0.12  # media zona muerta, como fracción del tamaño de la ventana: dentro de ella la cámara no se mueve
VEL_MAX = 0.14  # fracción del ancho del clip por segundo (≈ 0,45 ventanas/s): un paneo lento
ACEL_MAX = VEL_MAX * 1.2  # fracción del ancho por s²: llega a la velocidad máxima en ≈ 0,8 s
SUAVIZADO = 0.55  # s: constante de tiempo del seguimiento (arranque y frenado suaves)
PASO_CLAVES = 0.25  # s entre claves de salida
CARA_EN_VENTANA = 0.36  # si la ventana es más baja que el cuadro: la cara a esta fracción de su alto, desde arriba

# Altura de la ventana (fracción del alto del clip; 1 = altura completa), por clip. Solo en clips 4K: en un 1080p cerrarla ablanda.
# V17: la mitad (MD06, 4K) se cierra al 60 % del alto: ella sale sentada y pequeña en la sala de la terraza (la cara al 5 % del alto) y así
# su cara pasa al 8 % del cuadro; más cerrada sería un 1080p ampliado.
# V20: el hook (HK08, IMG_9418) se cierra al 60 %: ella mide el 33 % del alto del cuadro frente al garaje (la cara, ≈ 4 %), y con la ventana al 60 % pasa a ser
# el 55 % del alto de la ventana. La mitad (MD10) y el CTA (CT08) son planos medios de ella (el 71-76 % del alto): ventana de altura completa.
ALTURAS = {"IMG_9418": 0.60}

# Ajustes por clip, a ojo y mirando el fotograma completo (lo único que la medida de Vision no puede saber: qué hay DETRÁS de ella).
#   izq_max  el borde izquierdo de la ventana no pasa de este valor (fracción del ancho): deja fuera algo de la derecha.
#   izq_min  el borde izquierdo de la ventana no baja de este valor: deja fuera algo de la izquierda.
# MD06 (IMG_9448): la tele ENCENDIDA de la pared del fondo está a ≥ 0,66 del ancho (0,66-0,73 al principio y se va a la derecha mientras la
# cámara se desliza); con el borde izquierdo en ≤ 0,46 y la ventana de 0,19 el borde derecho no pasa de 0,65.
# V20: CT08 (IMG_9437): a la izquierda de ella hay una pared de lamas negras y blancas (un patrón de alta frecuencia) hasta x ≈ 0,38; con el borde izquierdo en
# ≥ 0,33 solo asoma un 15 % de la ventana y ella queda en el tercio izquierdo con el valle a la derecha.
# HK08 (IMG_9418): el sol da un destello blanco sobre el cristal del balcón (x ≈ 0,52-0,60, y ≈ 0,22-0,30 del cuadro) que con la ventana al 60 % entra por la
# esquina superior derecha; con el borde superior en ≥ 0,335 (`arriba_min`) queda fuera y, a partir de 2,4 s, cuando el destello sube por el cuadro (el sol
# a ≈ 0,35 de alto, x ≈ 0,62 en 4,2 s), el borde baja con una rampa hasta 0,372: ella pasa a tener su cabeza a ≈ 10-17 % del alto desde arriba.
AJUSTES: dict[str, dict] = {"IMG_9437": {"izq_min": 0.33}, "IMG_9418": {"arriba_min": [[0.0, 0.335], [2.4, 0.335], [3.6, 0.372], [4.4, 0.372]]}}

# Clips SIN Isabella: la ventana a mano. {clip: [[t, centro de la ventana (fracción del ancho del clip)], …]}, interpolado en línea recta.
# Cada centro sale de mirar el fotograma completo con cinco ventanas de prueba (`herramientas/ventanas-prueba.py`) en el primer, el del medio y
# el último instante del tramo que se usa, y elegir la que deja el sujeto del plano entero y nada que sobre en el borde (placas, teles
# encendidas, inodoros, destellos).
MANUAL = {
    # DR71: la fachada de frente y el dron SE ALEJA despacio (movimiento muy lento y uniforme de 4 a 11 s). A x ≥ 0,50 entran la camioneta y el coche blanco con sus
    # placas amarillas: la ventana va a la izquierda (el ala de las ventanas grandes y la ladera) y no pasa de 0,46 por la derecha.
    "DJI_20260414173037_0071_D": [[0.0, 0.30], [19.1, 0.30]],
    # DR82: el dron gira de la casa (pequeña, a la derecha) al valle y la carretera que sube a ella; tramo de 6,0 a 9,5 s (dispersión 0,03). Sin placas legibles.
    "DJI_20260414173650_0082_D": [[0.0, 0.62], [16.1, 0.62]],
    # RC01 (IMG_9430): ella llega por la sala hacia la cámara, de la puerta de vidrio al ventanal con el valle; la tele del muro (a x ≈ 0,88) queda fuera.
    "IMG_9430": [[0.0, 0.47], [4.8, 0.47]],
    # RC28 (IMG_9510): del jardín con el ciprés, por la puerta, a la alcoba principal; la ventana acompaña el giro de la cámara. A partir de 3,2 s hay una persona sentada a la izquierda.
    "IMG_9510": [[0.0, 0.42], [1.2, 0.44], [2.2, 0.58], [4.8, 0.60]],
    # RC13 (IMG_9477): el vestier (espejo redondo, lavamanos de piedra, armario); a partir de ≈ 2,5 s asoma el inodoro por la izquierda (en 2,9 s ocupa x 0,30-0,435): el plano
    # acaba en 2,5 s (disuelve al valle) y con el borde izquierdo en 0,39 (centro 0,55) el inodoro no llega a entrar.
    "IMG_9477": [[0.0, 0.55], [4.8, 0.55]],
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
            tope_arriba = AJUSTES.get(clip, {}).get("arriba_min")
            if isinstance(tope_arriba, list):  # claves [t, y]: el borde superior baja a medida que el destello sube por el cuadro
                tope_arriba = float(np.interp(tk, [k[0] for k in tope_arriba], [k[1] for k in tope_arriba]))
            if tope_arriba is not None and ys:
                yt = max(yt, tope_arriba)
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
