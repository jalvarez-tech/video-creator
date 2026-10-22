#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
buscar-cortes-060.py (V42, Quadrato) — la rejilla de cortes de la estructura DRON · HOOK · 3 de paseo · MITAD · 2 + VISTA · CTA sobre los golpes MEDIDOS de una canción de PULSO
(«Light Fills the Room», ~88 BPM, plana: sin crescendo ni caída, así que cualquier tramo vale y lo que manda es que CADA corte caiga en un golpe fuerte).

Parte de `buscar-cortes-039.py` (la misma canción con 12 planos), pero:
  · lee los golpes ya medidos (`medir-pista.py --json`), no vuelve a decodificar;
  · el corte 0 es el golpe de ENTRADA (el frame 3: `INICIO_MUSICA` se redondea a un frame y el golpe suena en el f3, como en el 056);
  · el último corte (el CTA) entra A CORTE: Isabella habla a ≥ 10 f de él (el golpe suena entero y la música baja con curva DESPUÉS, antes de su primera palabra);
  · la toma del CTA no pide caída: la canción se apaga bajo la tarjeta (`FIN_MUSICA`).

Los frames de cada corte son los de `golpe()` de `metraje-060.ts`: round((t + 0,012 de ataque + 0,042 de retardo del render − INICIO) · 30).

Uso (desde la raíz del repo):
  uv run proyectos/060/herramientas/buscar-cortes-060.py proyectos/060/musica/golpes-cancion-entera.json
Variables de entorno:
  R        9 rangos [min,max] de duración en frames: dron (su duración es el frame del golpe del hook) · hook · paseo ×3 · mitad · bloque 5 ×2 · vista
  MINC     golpe mínimo (dB) de los cortes secos (por defecto 12)
  MIND     golpe mínimo de las disolvencias (por defecto = MINC)
  START_MIN  golpe mínimo del frame 0 (por defecto 17)
  E0       «lo,hi»: segundos de la canción donde puede entrar (por defecto 15,172)
  TIPOS    una letra por corte (hook y mitad = d: la disolvencia ACABA en el golpe; el resto, c)
  TOP      cuántas se imprimen
"""
import json
import os
import sys

R = json.loads(os.environ.get("R", "[[80,106],[250,253],[66,100],[66,100],[66,100],[256,260],[66,100],[66,100],[95,140]]"))
NOBJ = [90, 251, 85, 85, 85, 258, 82, 82, 110]  # duraciones objetivo (f) para ordenar las soluciones
MINC = float(os.environ.get("MINC", "12"))
MIND = float(os.environ.get("MIND", str(MINC)))
START_MIN = float(os.environ.get("START_MIN", "17"))
E0 = [float(x) for x in os.environ.get("E0", "157,172").split(",")]
TOP = int(os.environ.get("TOP", "12"))
# cortes: 0 = frame 0 (golpe de entrada) · 1 = hook (d) · 2,3,4 = paseo (c) · 5 = mitad (d) · 6 = bloque 5 (c) · 7 = bloque 5 (c) · 8 = vista (c) · 9 = CTA (c)
TIPOS = os.environ.get("TIPOS", "cdcccdcccd")
ATAQUE, RETARDO = 0.012, 0.042

golpes = json.load(open(sys.argv[1]))["golpes"]
G = [(g["t"], g["db"]) for g in golpes]


def minimo(i):
    return MIND if TIPOS[i] == "d" else MINC


def busca(e0t):
    inicio = round((e0t - 0.046) * 30) / 30
    fr = lambda t: round((t + ATAQUE + RETARDO - inicio) * 30)  # noqa: E731
    cand = [(fr(t), t, db) for t, db in G if t >= e0t and db >= min(MINC, MIND)]
    por_frame = {}
    for f, t, db in cand:
        por_frame.setdefault(f, (t, db))
    frames = sorted(por_frame)
    out = []

    def rec(k, cortes):
        # k = índice del corte que se elige (1..9); cortes[0] = frame 0
        if k == 10:
            out.append(list(cortes))
            return
        lo, hi = (R[0][0], R[0][1]) if k == 1 else (cortes[-1] + R[k - 1][0], cortes[-1] + R[k - 1][1])
        for f in frames:
            if f < lo:
                continue
            if f > hi:
                break
            t, db = por_frame[f]
            if db < minimo(k):
                continue
            if k == 9:
                # la vista (plano 8) tiene que ser MÁS LARGA que los dos del bloque 5 y que cualquier plano del paseo
                d = [cortes[i] - cortes[i - 1] for i in range(2, 9)]
                if not (f - cortes[8] >= 0):
                    continue
            cortes.append(f)
            rec(k + 1, cortes)
            cortes.pop()

    rec(1, [3])
    return inicio, por_frame, out


res = []
for t, db in G:
    if not (E0[0] <= t <= E0[1]) or db < START_MIN:
        continue
    inicio, pf, sols = busca(t)
    for c in sols:
        durs = [c[1]] + [c[i] - c[i - 1] for i in range(2, 10)]
        # la vista (último plano del bloque 5) es el más largo de su bloque y de los 3 del paseo
        if not (durs[8] > durs[7] + 8 and durs[8] > durs[6] + 8):
            continue
        dbs = [pf[f][1] for f in c[1:]]
        desv = sum(abs(durs[i] - NOBJ[i]) for i in range(9))
        res.append((min(dbs), -desv, t, db, inicio, c, durs, dbs))

# ALL=1: imprime TODAS las soluciones de las entradas pedidas (E0 estrecho), ordenadas por golpe mínimo y desviación
if os.environ.get("ALL"):
    res.sort(key=lambda r: (-(r[0] // 1), -r[1]))
    for r in res[: int(os.environ.get("MAXALL", "40"))]:
        mn, nd, t, db, inicio, c, durs, dbs = r
        print(f"entrada {t:.3f} · mín {mn:.1f} dB · cortes {c} · planos {durs} · golpes {[round(x, 1) for x in dbs]}")
    sys.exit(0)

# una solución por entrada (la de menor desviación entre las de mayor golpe mínimo)
mejor = {}
for r in res:
    k = r[2]
    clave = (round(r[0], 0), r[1])
    if k not in mejor or (r[0] // 1, r[1]) > (mejor[k][0] // 1, mejor[k][1]):
        mejor[k] = r
orden = sorted(mejor.values(), key=lambda r: (-(r[0] // 1), -r[1]))[:TOP]
print(f"{len(mejor)} entradas con solución (MINC {MINC}, MIND {MIND}, START_MIN {START_MIN}, E0 {E0})")
for r in orden:
    mn, nd, t, db, inicio, c, durs, dbs = r
    print(f"\nentrada {t:.3f} s ({db:.1f} dB) · INICIO_MUSICA = {round(inicio*30)}/30 · golpe mínimo {mn:.1f} dB · desviación {-nd}")
    print("  cortes (f):", c)
    print("  planos (f):", durs, f"· total hasta el CTA {c[9]} f")
    print("  golpes (dB):", [round(x, 1) for x in dbs])
