#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
rejilla-050.py — la rejilla de cortes del 050 sobre los golpes MEDIDOS de «Spring is Coming» (`musica/golpes-050.json`).

Es `buscar-cortes-043.py` con otro esquema: el hook abre la pieza (la música ya suena, no hay golpe en el f0) y los cortes son: el paseo (el «drop», ≥ DROP dB) · los planos de la unidad ·
la mitad (A CORTE, con 126-141 f para que quepa la subida de la música tras su última palabra) · los planos del apartamento · la vista (el último plano de su bloque, más largo que todos los demás de
ese bloque) · el CTA. Cada plano tiene su rango de frames; cada corte cae en un golpe de ≥ MINC dB. Imprime las mejores rejillas por el corte más débil.

Uso (desde la raíz del repo):
  R='[[60,105],[54,100],[54,100],[126,140],[54,83],[54,83],[54,83],[54,83],[54,83],[84,110]]' MINC=11.5 uv run proyectos/050/herramientas/rejilla-050.py
  VISTA_VS=5 hace que el último plano supere a los 5 anteriores (el bloque 5); MINS="4:9" deja el corte 4 en un golpe de 9 dB; TOP=n imprime n rejillas.
"""
import json
import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
G = [(x["t"], x["db"]) for x in json.loads((RAIZ / "proyectos/050/musica/golpes-050.json").read_text())["golpes"]]
MINC = float(os.environ.get("MINC", "11.5"))
DROP = float(os.environ.get("DROP", "14"))
R = [tuple(x) for x in json.loads(os.environ["R"])]
VISTA_VS = int(os.environ.get("VISTA_VS", "2"))
K = len(R) + 1
# el corte k puede pedir menos que MINC (MINS="k:dB,k:dB"): p. ej. MINS="4:9" deja el corte de la alcoba en un golpe de 9 dB
MINS = {int(a): float(b) for a, b in (x.split(":") for x in os.environ.get("MINS", "").split(",") if x)}
UMBRAL = min([MINC, *MINS.values()])
T0, T1 = float(os.environ.get("T0", "30")), float(os.environ.get("T1", "100"))
HITS = [(t, d) for t, d in G if d >= UMBRAL - 1e-9 and T0 <= t <= T1]
LIMITE = int(os.environ.get("LIMITE", "400000"))
sols = []
cnt = 0


def fr(a, b):
    return round((b - a) * 30)


def rec(k, i, cuts):
    global cnt
    if cnt > LIMITE:
        return
    if k == K - 1:
        durs = [fr(HITS[a][0], HITS[b][0]) for a, b in zip(cuts, cuts[1:])]
        if VISTA_VS and durs[-1] <= max(durs[-1 - VISTA_VS:-1]):
            return
        cnt += 1
        sols.append((min(HITS[c][1] for c in cuts), cuts[:], durs))
        return
    for j in range(i + 1, len(HITS)):
        f = fr(HITS[i][0], HITS[j][0])
        if f > R[k][1]:
            break
        if f >= R[k][0] and HITS[j][1] >= MINS.get(k + 1, MINC) - 1e-9:
            rec(k + 1, j, cuts + [j])


for i, (t, d) in enumerate(HITS):
    if d >= max(DROP, MINS.get(0, MINC)):
        rec(0, i, [i])
sols.sort(key=lambda s: (-s[0], -min(s[2])))
print(f"MINC {MINC} {MINS or ''} · {len(sols)} rejillas{' (cortadas en el límite)' if cnt > LIMITE else ''}")
for m, cuts, durs in sols[:int(os.environ.get("TOP", "12"))]:
    print(f"  min {m:5.1f} dB · cortes {[round(HITS[c][0], 3) for c in cuts]} · dB {[HITS[c][1] for c in cuts]} · planos {durs}")
