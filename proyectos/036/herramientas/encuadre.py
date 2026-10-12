#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
encuadre.py — la ventana vertical (9:16) que recorre un clip apaisado (16:9): siguiendo a la presentadora, o a mano si no hay nadie.

Uso (desde la raíz del repo):
  uv run proyectos/036/herramientas/encuadre.py            (todos los clips de proyectos/036/medidas/)
  uv run proyectos/036/herramientas/encuadre.py IMG_9531   (uno, y enseña la trayectoria)

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
MEDIDAS = RAIZ / "proyectos" / "036" / "medidas"
SALIDA = RAIZ / "proyectos" / "036" / "encuadre-036.json"

MUESTREO = 5.0  # fotogramas por segundo de las medidas
ANCHO_VENTANA = 9 / 16 * 1080 / 1920  # fracción del ANCHO de un clip 16:9 que cubre una ventana 9:16 a altura completa
ZONA = 0.12  # media zona muerta, como fracción del tamaño de la ventana: dentro de ella la cámara no se mueve
VEL_MAX = 0.14  # fracción del ancho del clip por segundo (≈ 0,45 ventanas/s): un paneo lento
ACEL_MAX = VEL_MAX * 1.2  # fracción del ancho por s²: llega a la velocidad máxima en ≈ 0,8 s
SUAVIZADO = 0.55  # s: constante de tiempo del seguimiento (arranque y frenado suaves)
PASO_CLAVES = 0.25  # s entre claves de salida
CARA_EN_VENTANA = 0.36  # si la ventana es más baja que el cuadro: la cara a esta fracción de su alto, desde arriba

# Altura de la ventana (fracción del alto del clip; 1 = altura completa), por clip. Solo en clips 4K: en un 1080p cerrarla ablanda.
# V19: el CTA (CT07, 4K) se cierra al 85 % del alto: Isabella de pie ante el vidrio con la cara al 7 % del alto; así pasa al 8,2 % y el valle de
# detrás sigue entrando. El hook (HK11, 4K) va a altura completa: ella camina hacia la cámara (la cara pasa del 4,6 % al 12 %) y la sala es
# parte de la frase. La mitad (MD08) es 1080p: altura completa.
ALTURAS = {"IMG_9436": 0.85}

# Ajustes por clip, a ojo y mirando el fotograma completo (lo único que la medida de Vision no puede saber: qué hay DETRÁS de ella).
#   izq_max  el borde izquierdo de la ventana no pasa de este valor (fracción del ancho): deja fuera algo de la derecha.
#   izq_min  el borde izquierdo de la ventana no baja de este valor: deja fuera algo de la izquierda.
AJUSTES: dict[str, dict] = {}

# Clips SIN Isabella: la ventana a mano. {clip: [[t, centro de la ventana (fracción del ancho del clip)], …]}, interpolado en línea recta.
# Cada centro sale de mirar el fotograma completo con ventanas de prueba (`herramientas/ventanas-prueba.py`) en el primer, el del medio y el
# último instante del tramo que se usa, y elegir la que deja el sujeto del plano entero y nada que sobre en el borde (placas, teles
# encendidas, inodoros, destellos). En los drones la ventana se mueve en LÍNEA RECTA dentro del tramo: velocidad constante, como el vuelo.
MANUAL = {
    # DR75 (22,4-26,17 s): la casa en su cerro en pasada lateral; deriva a la derecha (centro 0,50 → 0,54) y la ventana la acompaña a velocidad constante
    "DJI_20260414173256_0075_D": [[0.0, 0.495], [22.4, 0.495], [26.2, 0.545], [34.9, 0.545]],
    # DR81: dos tramos. La VISTA (8,8-14,17 s): el valle con la cordillera, ventana en ≈ 0,55 (la tierra roja sale por la derecha antes de 8,8 s y
    # el cerro entra por la izquierda después de 14,2). El giro del dron ACELERA de 13 a 17 px cada 3 f (a 1080 de ancho) entre 8,2 y 10,1 s y
    # sigue a 17-18 hasta 14,1 (`flujo.py`, px POR FOTOGRAMA): la ventana se desplaza en cada instante (velocidad del giro − 17) y la velocidad
    # APARENTE queda en 17 todo el plano: un contragiro de ≈ 0,04 del ancho del clip en el primer segundo y medio, que no se lee como un movimiento propio. La ÓRBITA (17,3-20,73 s): el dron gira a velocidad constante (dispersión 0,028 sobre
    # el 16:9 entero) y la casa cruza el cuadro ACELERANDO al acercarse al borde (0,169 del ancho por segundo hasta 19,6 s, 0,236 al final: la
    # perspectiva del giro). Una ventana en línea recta se desacompasaba en los extremos (`movimiento.py`: 3,5 → 1,2 → 3,7); esta sigue la posición
    # MEDIDA de la casa (correlación con una plantilla cada 0,1 s, `seguir-casa.py` del scratchpad; ajuste cúbico, error ≤ 0,004), así la casa queda
    # quieta y el paisaje gira detrás al ritmo del dron. El coche blanco del garaje mide ≈ 75 px en 4K: su placa no se lee.
    "DJI_20260414173617_0081_D": [[0.0, 0.55]] + [[8.3, 0.55], [8.4, 0.5465], [8.5, 0.5431], [8.6, 0.5399], [8.7, 0.5368], [8.8, 0.534], [8.9, 0.5313], [9.0, 0.5286], [9.1, 0.526], [9.2, 0.5234], [9.3, 0.521], [9.4, 0.5188], [9.5, 0.5167], [9.6, 0.5149], [9.7, 0.5132], [9.8, 0.5117], [9.9, 0.5103], [10.0, 0.5093], [10.1, 0.5087], [10.2, 0.5083], [10.3, 0.5082], [10.4, 0.5083], [10.5, 0.5085], [10.6, 0.5088], [10.7, 0.5091], [10.8, 0.5095], [10.9, 0.5098], [11.0, 0.5102], [11.1, 0.5104], [11.2, 0.5106], [11.3, 0.5107], [11.4, 0.5108], [11.5, 0.5108], [11.6, 0.5108], [11.7, 0.5108], [11.8, 0.5108], [11.9, 0.5108], [12.0, 0.5108], [12.1, 0.5108], [12.2, 0.5108], [12.3, 0.5108], [12.4, 0.5108], [12.5, 0.5108], [12.6, 0.5108], [12.7, 0.5108], [12.8, 0.5109], [12.9, 0.5111], [13.0, 0.5114], [13.1, 0.5118], [13.2, 0.5124], [13.3, 0.513], [13.4, 0.5137], [13.5, 0.5146], [13.6, 0.5154], [13.7, 0.5163], [13.8, 0.5172], [13.9, 0.5181], [14.0, 0.519], [14.1, 0.5203], [14.2, 0.5217]] + [[14.4, 0.5217]] + [[17.2, 0.2038], [17.3, 0.2225], [17.4, 0.2409], [17.5, 0.2589], [17.6, 0.2767], [17.7, 0.2941], [17.8, 0.3114], [17.9, 0.3284], [18.0, 0.3452], [18.1, 0.3619], [18.2, 0.3784], [18.3, 0.3948], [18.4, 0.4111], [18.5, 0.4274], [18.6, 0.4436], [18.7, 0.4598], [18.8, 0.476], [18.9, 0.4923], [19.0, 0.5086], [19.1, 0.5251], [19.2, 0.5416], [19.3, 0.5583], [19.4, 0.5752], [19.5, 0.5923], [19.6, 0.6096], [19.7, 0.6271], [19.8, 0.6449], [19.9, 0.6631], [20.0, 0.6815], [20.1, 0.7003], [20.2, 0.7195], [20.3, 0.7391], [20.4, 0.7592], [20.5, 0.7797], [20.6, 0.8006], [20.7, 0.8221], [20.8, 0.8418]] + [[25.4, 0.8418]],
    # DR79 (14,8-18,37 s): la casa en contrapicado, sus volúmenes blanco y de piedra con el cerro encima. La terraza del garaje (≥ 0,68 del ancho)
    # con la camioneta, el Mini y sus PLACAS legibles queda fuera: la ventana (0,32-0,64) no la alcanza en todo el tramo.
    "DJI_20260414173501_0079_D": [[0.0, 0.48], [18.6, 0.48]],
    # RC17 (6,9-9,9 s): el barrido de la sala a la terraza de vidrio con el valle; la tele ENCENDIDA (≥ 0,66 desde 7,0 s) queda fuera
    "IMG_9492": [[0.0, 0.35], [10.2, 0.35]],
    # RC11 (1,0-4,6 s): las pampas, el marco de la puerta y la cama de la alcoba
    "IMG_9472": [[0.0, 0.55], [6.5, 0.55]],
    # RC05 (1,5-4,67 s): el lavamanos martillado; la cámara se aleja y él se desplaza a la derecha (centro ≈ 0,24 → 0,47): la ventana lo acompaña
    "IMG_9464": [[0.0, 0.24], [1.5, 0.24], [4.67, 0.47], [5.0, 0.47]],
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
