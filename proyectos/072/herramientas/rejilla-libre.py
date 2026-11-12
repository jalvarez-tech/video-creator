#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
rejilla-libre.py — la rejilla de 10 cortes de la 072 cuando UN corte (la salida del hook) NO cae en un golpe.

Uso (desde la raíz del repo):
  uv run proyectos/072/herramientas/rejilla-libre.py proyectos/072/musica/golpes-cancion-entera.json --caida 261.0 [--top 8] [--hook 110]

POR QUÉ EXISTE. `buscar-cortes-lp.py` exige que los DIEZ cortes caigan en un golpe. La toma del hook de esta pieza (HK11) dura 110 f y la voz acaba en el f107: el plano tiene que durar el clip ENTERO y la
canción no tiene dos golpes a 3,6-3,67 s. El corte e2 (hook → paseo) es entonces LIBRE: se pone en e1 + 110 f; los otros nueve cortes caen en golpes medidos (precedente: la 062, donde la salida del hook
duraba todo el clip y la disolvencia no caía en ningún golpe).

  e0 apertura · e1 hook (a corte) · e2 LIBRE · e3 paseo2 · e4 paseo3 · e5 mitad (a corte, clip entero) · e6 cama (disolvencia que ACABA en el golpe) · e7 · e8 vista · e9 CTA (disolvencia que acaba en el golpe)
Frames con la cuenta de metraje-072.ts: golpe(t) = round((t + 0,054 − INICIO) · 30), INICIO = (t_e0 + 0,054 − 0,1) a un frame.
Criterio: maximizar el golpe MÁS DÉBIL de los nueve; luego, que la vista sea el plano más largo del bloque 5 y el CTA entre la caída y 4,9 s antes.
"""
import argparse
import json
import math

ap = argparse.ArgumentParser()
ap.add_argument("golpes")
ap.add_argument("--caida", type=float, required=True, help="segundo de la canción en que CAE (buscar-cortes-lp.py)")
ap.add_argument("--top", type=int, default=8)
ap.add_argument("--hook", type=int, default=110, help="frames del plano del hook (el clip entero)")
ap.add_argument("--mitad", type=int, nargs=2, default=[140, 149], help="rango de frames del plano de la mitad (clip entero)")
ap.add_argument("--apertura", type=int, nargs=2, default=[70, 95])
ap.add_argument("--paseo", type=int, nargs=2, default=[65, 115])
ap.add_argument("--b5", type=int, nargs=2, default=[55, 115])
ap.add_argument("--vista", type=int, nargs=2, default=[90, 150])
ap.add_argument("--min-e0", type=float, default=12.0)
ap.add_argument("--min-corte", type=float, default=9.0)
ap.add_argument("--min-disolver", type=float, default=9.0)
ap.add_argument("--w", type=float, default=4.9, help="el CTA entra hasta W s antes de la caída")
a = ap.parse_args()

G = [(g["t"], g["db"]) for g in json.load(open(a.golpes))["golpes"] if g["t"] > 1.0]
H = sorted(G)


def frames(t_ini_cancion, t, inicio):
    return round((t + 0.054 - inicio) * 30)


def candidatos(t0, db0):
    """Todas las rejillas para una entrada e0."""
    inicio = round((t0 + 0.054 - 0.1) * 30) / 30
    f = lambda t: frames(t0, t, inicio)
    out = []
    # e1: hit con apertura en rango
    for t1, d1 in H:
        if not (a.apertura[0] <= f(t1) - f(t0) <= a.apertura[1]) or d1 < a.min_corte:
            continue
        f2 = f(t1) + a.hook  # e2 libre
        for t3, d3 in H:  # e3: fin del paseo 1
            if not (a.paseo[0] <= f(t3) - f2 <= a.paseo[1]) or d3 < a.min_corte:
                continue
            for t4, d4 in H:
                if not (a.paseo[0] <= f(t4) - f(t3) <= a.paseo[1]) or d4 < a.min_corte:
                    continue
                for t5, d5 in H:  # e5: la mitad
                    if not (a.paseo[0] <= f(t5) - f(t4) <= a.paseo[1]) or d5 < a.min_corte:
                        continue
                    for t6, d6 in H:  # e6: la cama (disolvencia)
                        if not (a.mitad[0] <= f(t6) - f(t5) <= a.mitad[1]) or d6 < a.min_disolver:
                            continue
                        for t7, d7 in H:
                            p7 = f(t7) - f(t6)
                            if not (a.b5[0] <= p7 <= a.b5[1]) or d7 < a.min_corte:
                                continue
                            for t8, d8 in H:
                                p8 = f(t8) - f(t7)
                                if not (a.b5[0] <= p8 <= a.b5[1]) or d8 < a.min_corte:
                                    continue
                                for t9, d9 in H:
                                    p9 = f(t9) - f(t8)
                                    if not (a.vista[0] <= p9 <= a.vista[1]) or p9 < max(p7, p8) or d9 < a.min_disolver:
                                        continue
                                    if not (a.caida - a.w <= t9 <= a.caida - 0.3):
                                        continue
                                    ds = [d1, d3, d4, d5, d6, d7, d8, d9]
                                    out.append((min(ds), sum(ds) / len(ds), t0, db0, [t1, t3, t4, t5, t6, t7, t8, t9], f2, [f(t1) - f(t0), a.hook, f(t3) - f2, f(t4) - f(t3), f(t5) - f(t4), f(t6) - f(t5), p7, p8, p9], ds))
    return out


todos = []
for t0, d0 in H:
    if d0 < a.min_e0 or t0 < a.caida - 60 or t0 > a.caida - 20:
        continue
    todos += candidatos(t0, d0)
todos.sort(key=lambda x: (-x[0], -x[1]))
print(f"{len(todos)} rejillas (e0 ≥ {a.min_e0} dB, cortes ≥ {a.min_corte}, disolvencias ≥ {a.min_disolver}, hook = {a.hook} f libre en su salida, caída a {a.caida} s)")
for min_db, media, t0, d0, ts, f2, planos, ds in todos[: a.top]:
    print(f"· más débil {min_db:.1f} dB (media {media:.1f}) · e0 {t0:.3f} s ({d0} dB) · cortes {[round(x, 3) for x in ts]} · e2 libre = e1 + {a.hook} f · planos {planos} · dB {ds}")
