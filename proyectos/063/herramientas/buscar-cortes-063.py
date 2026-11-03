#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
buscar-cortes-063.py (V45, Lote San Vicente Ferrer, rev. 1) — la rejilla de cortes de la estructura DRON · HOOK · DRON + INFOGRAFÍA · MITAD · 3 DRONES · CTA sobre los golpes MEDIDOS de «Oceans (Where Feet May Fail)».

La canción tiene PULSO (132 BPM, periodo 0,4545 s, fase 0,3777 s: 98 % de sus golpes fuertes de 154,4 a 182,3 s a ≤ 15 ms de la recta, `rejilla.py`) y una CAÍDA a un lecho suave desde los 182,3 s (de −12 a −20 LUFS):
el CTA entra justo en el último golpe fuerte antes de esa caída (181,856 s, 11,7 dB), así que la voz de Isabella queda sobre el lecho y no sobre la meseta.

Los frames son los de `golpe()` de `metraje-063.ts`: round((t + 0,012 de ataque + 0,042 de retardo del render − INICIO) · 30). El corte 0 es el golpe de ENTRADA, que suena en el f3.

Cortes (en orden): 1 hook (d: la disolvencia ACABA en el golpe) · 2 la infografía sobre el dron (c: corte seco desde Isabella) · 3 la mitad (d) · 4 primer dron del bloque 5 (d: desde Isabella) · 5 segundo (c) · 6 tercero, la vista (c) · 7 CTA (d, fijado al golpe de la caída).

Uso (desde la raíz del repo):
  uv run proyectos/063/herramientas/buscar-cortes-063.py proyectos/063/musica/golpes-063.json
Variables de entorno: MINC (golpe mínimo de los cortes secos, 9), MIND (de las disolvencias, 9), E0 «lo,hi» (segundos donde puede entrar), CTA (segundo del golpe del CTA), R (rangos de duración en f), TOP.
"""
import json
import os
import sys

ATAQUE, RETARDO = 0.012, 0.042
MINC = float(os.environ.get("MINC", "9"))
MIND = float(os.environ.get("MIND", "9"))
E0 = [float(x) for x in os.environ.get("E0", "140,152").split(",")]
CTA_T = float(os.environ.get("CTA", "181.856"))
TOP = int(os.environ.get("TOP", "8"))
START_MIN = float(os.environ.get("START_MIN", "9"))

# duraciones (f): apertura · hook · dron+infografía · mitad · dron 1 · dron 2 · dron 3 (la vista)
R = json.loads(os.environ.get("R", "[[66,100],[222,262],[214,262],[268,300],[75,125],[75,125],[90,150]]"))
NOBJ = [84, 232, 230, 272, 100, 100, 110]
# tipo de cada corte 1..7: d = disolvencia que ACABA en el golpe, c = corte seco
TIPOS = "dcddccd"

golpes = json.load(open(sys.argv[1]))["golpes"]
G = [(g["t"], g["db"]) for g in golpes]


def busca(e0t):
    inicio = round((e0t - 0.046) * 30) / 30
    fr = lambda t: round((t + ATAQUE + RETARDO - inicio) * 30)  # noqa: E731
    por_frame = {}
    for t, db in G:
        if t >= e0t:
            por_frame.setdefault(fr(t), (t, db))
    frames = sorted(por_frame)
    meta = fr(CTA_T)
    out = []
    n = len(R)

    def rec(k, cortes):
        if k == n:  # el CTA es el último corte
            f = meta
            if f in por_frame and R[n - 1][0] <= f - cortes[-1] <= R[n - 1][1] and por_frame[f][1] >= MIND:
                out.append(cortes + [f])
            return
        lo = R[0][0] if k == 1 else cortes[-1] + R[k - 1][0]
        hi = R[0][1] if k == 1 else cortes[-1] + R[k - 1][1]
        minimo = MIND if TIPOS[k - 1] == "d" else MINC
        for f in frames:
            if f < lo:
                continue
            if f > hi:
                break
            if por_frame[f][1] < minimo or f >= meta:
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
        durs = [c[1]] + [c[i] - c[i - 1] for i in range(2, len(c))]
        # la vista (último plano de dron) es el más largo del bloque 5
        if not (durs[-1] >= durs[-2] + 8 and durs[-1] >= durs[-3] + 8):
            continue
        dbs = [pf[f][1] for f in c[1:]]
        desv = sum(abs(durs[i] - NOBJ[i]) for i in range(len(durs)))
        res.append((min(dbs), -desv, t, db, inicio, c, durs, dbs))

mejor = {}
for r in res:
    k = r[2]
    if k not in mejor or (r[0] // 1, r[1]) > (mejor[k][0] // 1, mejor[k][1]):
        mejor[k] = r
orden = sorted(mejor.values(), key=lambda r: (-(r[0] // 1), -r[1]))[:TOP]
print(f"{len(mejor)} entradas con solución (MINC {MINC}, MIND {MIND}, E0 {E0}, CTA {CTA_T})")
for r in orden:
    mn, nd, t, db, inicio, c, durs, dbs = r
    print(f"\nentrada {t:.3f} s ({db:.1f} dB) · INICIO_MUSICA = {round(inicio*30)}/30 · golpe mínimo {mn:.1f} dB · desviación {-nd}")
    print("  cortes (f):", c)
    print("  planos (f):", durs, f"· total hasta el CTA {c[-1]} f")
    print("  golpes (dB):", [round(x, 1) for x in dbs])
