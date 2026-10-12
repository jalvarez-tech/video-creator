#!/usr/bin/env python3
"""
plan-rampas.py — la línea de tiempo de UN plano continuo con rampas de velocidad, cuadrada con los golpes de la canción.

Uso (desde la raíz del repo):
  python3 proyectos/028/herramientas/plan-rampas.py                       (el plan de abajo, tal cual, con la entrada de la música de abajo)
  python3 proyectos/028/herramientas/plan-rampas.py --cuadra 176.552      (mueve las fronteras dentro de su margen para que cada cambio caiga
                                                                            en un golpe; la música entra con ESE golpe en el f0)
  python3 proyectos/028/herramientas/plan-rampas.py --cuadra 176.552 --ts  (además imprime las mesetas como las quiere `metraje-028.ts`)

POR QUÉ EXISTE. El 028 es una sola toma (RC14) acelerada en los tránsitos y a velocidad 1 en los destinos. Cada cambio de velocidad es un
instante que se VE (la cámara arranca o frena): es un «corte» sin corte y tiene que caer en un golpe de la música, como un corte del formato.
La cuenta (fuente consumida = frames × velocidad, más las rampas) no se hace de cabeza. `metraje-028.ts` es quien manda (este script decide
las fronteras; la puerta comprueba el plan de verdad) y los dos construyen las rampas con la MISMA regla, escrita aquí y allí.

EL PLAN, en frames de la FUENTE (RC14 normalizado a 30 fps): mesetas de `a` a `b` a velocidad `v`. Entre dos mesetas de distinta velocidad
hay una RAMPA de escalones de 2 f que cambian de 0,5 en 0,5; la paga la meseta RÁPIDA (sale de su fuente): así un destino empieza a velocidad 1
justo en su frontera. Cada frontera tiene un MARGEN (lo que se puede mover sin cambiar lo que se ve: mirado en las hojas de contactos).

CÓMO CUADRA. Programación dinámica sobre las fronteras: estado = (frontera de fuente, frame de la comp en que cae); coste = distancia en frames
al golpe fuerte más cercano (tope 6), más medio frame si el golpe mide menos de 12 dB. El arranque de cada meseta es el instante que se ve: el
de un destino es cuando la cámara ya va a velocidad 1 (acaba la rampa de bajada); el de un tránsito, cuando empieza a acelerar.
"""
import json
import sys

FPS = 30
PASO_RAMPA = 2  # frames de la comp por escalón
SALTO_RAMPA = 0.5  # cuánto cambia la velocidad en cada escalón
ATAQUE = 0.012  # el oído coloca el golpe 12 ms después de que su energía empiece a subir
RETARDO_AUDIO = 0.042  # el audio del render llega 42 ms tarde (medido en el 016, confirmado desde el 017)
FUERTE = 9.0  # dB/15 ms: un golpe en el que puede caer un cambio
MUY_FUERTE = 12.0

# (nombre, a, b, v, margen de la frontera de ENTRADA en frames de fuente (lo, hi), por qué) — a y b ya son las fronteras CUADRADAS
# (`--cuadra 174.780`, 2026-10-08): las que copia `metraje-028.ts`. Las de partida, antes de cuadrar, están en la salida guardada.
PLAN = [
    ("puerta", 15, 40, 2.0, None, "la puerta se abre y ella asoma: el f0"),
    ("hook", 40, 209, 1.0, (40, 48), "habla (1,82-6,31 s): velocidad 1, la voz manda"),
    ("sala", 209, 294, 3.0, (202, 216), "detrás de ella por la sala hacia el balcón"),
    ("corredera", 294, 360, 1.5, (294, 318), "cruza la corredera y sale al balcón"),
    ("malla", 360, 406, 2.5, (348, 366), "el giro sobre la baranda con la malla negra"),
    ("vista", 406, 488, 1.0, (404, 412), "LA VISTA: ciudad, montaña y cielo"),
    ("vuelta", 488, 596, 3.0, (472, 488), "barrido de vuelta y la sala hasta la cocina"),
    ("isla", 596, 682, 1.0, (596, 618), "su mano sobre la isla de la cocina"),
    ("puerta-bano", 682, 768, 3.0, (666, 684), "el giro por la columna y la puerta"),
    ("bano-vestier", 768, 882, 1.5, (756, 768), "el baño, el barrido y el vestier"),
    ("giro-alcoba", 882, 929, 3.0, (866, 884), "el giro hacia la alcoba"),
    ("alcoba-sec", 929, 1044, 1.0, (912, 936), "la alcoba secundaria: ella ante el ventanal, viene hacia la cámara y pasa a su lado"),
    ("regreso", 1044, 1300, 4.0, (990, 1045), "vuelve por la cocina hasta la otra alcoba"),
    ("cta", 1300, 1494, 1.0, (1300, 1335), "entra en la alcoba del ventanal de esquina, llega, se gira y habla: el CTA (45,22-49,35 s)"),
]
INICIO = 174.8333333  # segundo de la canción que suena en el f0


def escalones(v0, v1):
    """Las velocidades intermedias de una rampa de v0 a v1 (sin los extremos), de 0,5 en 0,5."""
    n = int(round(abs(v1 - v0) / SALTO_RAMPA)) - 1
    if n <= 0:
        return []
    paso = (v1 - v0) / (n + 1)
    return [v0 + paso * (k + 1) for k in range(n)]


# frames por escalón de la rampa de BAJADA de una meseta, si no es PASO_RAMPA: la llegada a la alcoba del CTA no tiene golpe en el que frenar
# (la canción ya va hacia su final), así que frena despacio, como quien entra andando en un cuarto.
PASO_BAJA = {"regreso": 4}


def meseta(prev_v, v, next_v, a, b, nombre=""):
    """Los cortes de UNA meseta (con sus rampas si es la rápida) y cuánto dura en la comp. None si no cabe."""
    paso_baja = PASO_BAJA.get(nombre, PASO_RAMPA)
    cortes = []
    fuente = float(a)
    for vv in escalones(prev_v, v) if prev_v < v else []:
        cortes.append(("sube", fuente, PASO_RAMPA, vv))
        fuente += PASO_RAMPA * vv
    salida = escalones(v, next_v) if next_v < v else []
    fin_meseta = b - sum(paso_baja * vv for vv in salida)
    dur = round((fin_meseta - fuente) / v)
    if dur < 2:
        return None
    cortes.append(("meseta", fuente, dur, v))
    fuente += dur * v
    for vv in salida:
        cortes.append(("baja", fuente, paso_baja, vv))
        fuente += paso_baja * vv
    return cortes, sum(c[2] for c in cortes)


def construye(plan):
    # la fuente se ARRASTRA de una meseta a la siguiente (como en metraje-028.ts): el redondeo de cada duración mueve la frontera, no la toma
    out, f = [], 0
    fuente = plan[0][1]
    for i, p in enumerate(plan):
        prev_v = plan[i - 1][3] if i else p[3]
        next_v = plan[i + 1][3] if i + 1 < len(plan) else p[3]
        r = meseta(prev_v, p[3], next_v, fuente, p[2], p[0])
        if r is None:
            raise SystemExit(f"{p[0]}: la meseta no cabe")
        cortes, dur = r
        out.append((p, f, cortes))
        f += dur
        fuente = cortes[-1][1] + cortes[-1][2] * cortes[-1][3]
    return out, f


def golpes():
    d = json.load(open("proyectos/028/musica/golpes-028.json"))
    return [(g["t"], g["db"]) for g in d["golpes"] if g["db"] >= FUERTE]


def frame_golpe(t, inicio):
    return (t + ATAQUE - inicio + RETARDO_AUDIO) * FPS


def mas_cercano(frame, gs, inicio):
    return min(((frame_golpe(t, inicio) - frame, t, db) for t, db in gs), key=lambda x: abs(x[0]))


def coste(frame, gs, inicio):
    d, _, db = mas_cercano(frame, gs, inicio)
    return min(abs(d), 6.0) + (0.5 if db < MUY_FUERTE else 0.0)


def cuadra(plan, inicio):
    """
    Programación dinámica sobre las fronteras de fuente. Estado tras la meseta i-1: (dónde quedó la fuente, frame de la comp). La fuente se
    arrastra (como en `metraje-028.ts`), así que la meseta i arranca donde acabó la anterior y no exactamente en su frontera nominal.
    Devuelve el plan con las fronteras movidas y el coste.
    """
    gs = golpes()
    n = len(plan)
    capas = [{(float(plan[0][1]), 0): (0.0, None, None)}]
    elegidas = [{}]
    for i in range(1, n):
        lo, hi = plan[i][4]
        nueva, eleccion = {}, {}
        pv = plan[i - 2][3] if i >= 2 else plan[i - 1][3]
        for (fuente, f_prev), (c_prev, _, _) in capas[-1].items():
            for x in range(lo, hi + 1):
                r = meseta(pv, plan[i - 1][3], plan[i][3], fuente, x, plan[i - 1][0])
                if r is None:
                    continue
                cortes, dur = r
                fin = cortes[-1][1] + cortes[-1][2] * cortes[-1][3]
                f = f_prev + dur
                c = c_prev + coste(f, gs, inicio)
                clave = (round(fin * 2) / 2, f)
                if clave not in nueva or c < nueva[clave][0]:
                    nueva[clave] = (c, fuente, f_prev)
                    eleccion[clave] = x
        capas.append(nueva)
        elegidas.append(eleccion)
    mejor = min(capas[-1].items(), key=lambda kv: kv[1][0])
    clave = mejor[0]
    xs = []
    for i in range(n - 1, 0, -1):
        xs.append(elegidas[i][clave])
        _, fp, fprev = capas[i][clave]
        clave = (round(fp * 2) / 2, fprev) if i > 1 else None
        if i > 1:
            # la clave anterior se guardó con la fuente redondeada a medio frame: búscala
            clave = next(k for k in capas[i - 1] if abs(k[0] - fp) < 1e-9 and k[1] == fprev) if (round(fp * 2) / 2, fprev) not in capas[i - 1] else (round(fp * 2) / 2, fprev)
    xs.reverse()  # xs[j] = frontera entre la meseta j y la j+1
    nuevo = []
    for i, p in enumerate(plan):
        a = plan[0][1] if i == 0 else xs[i - 1]
        b = xs[i] if i < n - 1 else p[2]
        nuevo.append((p[0], a, b, p[3], p[4], p[5]))
    return nuevo, mejor[1][0]


def tabla(plan, inicio):
    gs = golpes()
    filas, total = construye(plan)
    n_cortes = sum(len(c) for _, _, c in filas)
    print(f"{n_cortes} cortes · {total} f ({total / FPS:.2f} s) · la canción suena desde {inicio:.3f} s en el f0\n")
    print(f"{'meseta':14s} {'fuente (s)':>13s} {'×':>4s}  {'comp (f)':>11s}  {'comp (s)':>11s}   golpe en el arranque")
    for p, f, cortes in filas:
        fin = f + sum(c[2] for c in cortes)
        fuente_fin = cortes[-1][1] + cortes[-1][2] * cortes[-1][3]
        d, t, db = mas_cercano(f, gs, inicio)
        print(f"{p[0]:14s} {p[1] / FPS:5.2f}-{fuente_fin / FPS:5.2f}  {p[3]:4.1f}  {f:4d}-{fin:4d}  {f / FPS:5.2f}-{fin / FPS:5.2f}   {d:+5.1f} f · {t:.3f} s ({db:4.1f} dB)  {p[5]}")
    return total


if __name__ == "__main__":
    if "--cuadra" in sys.argv:
        t0 = float(sys.argv[sys.argv.index("--cuadra") + 1])
        # la canción entra con ESE golpe sonando en el f0: el segundo de la canción en el f0, en frames enteros (el intérprete redondea `desde`)
        INICIO = round((t0 + ATAQUE + RETARDO_AUDIO) * FPS) / FPS
        PLAN, c = cuadra(PLAN, INICIO)
        print(f"coste {c:.1f}")
    total = tabla(PLAN, INICIO)
    if "--ts" in sys.argv:
        print()
        for p in PLAN:
            print(f'  ["{p[0]}", {p[1]}, {p[2]}, {p[3]}],')
