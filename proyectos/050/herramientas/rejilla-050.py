#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
rejilla-050.py — la rejilla de cortes del 050 sobre los golpes MEDIDOS de «Spring is Coming» (`musica/golpes-050.json`).

Es `buscar-cortes-043.py` con otro esquema: el hook abre la pieza (la música ya suena, no hay golpe en el f0) y los cortes son: el paseo (el «drop», ≥ DROP dB) ·
planos 2 y 3 del bloque 3 · la mitad (A CORTE, con 135-141 f para que quepa la subida de la música tras su última palabra) · la alcoba · el baño · la vista · el CTA.
Cada plano tiene su rango de frames; cada corte cae en un golpe de ≥ MINC dB. Imprime las mejores rejillas por el corte más débil.

Uso (desde la raíz del repo):
  MINC=11.5 uv run proyectos/050/herramientas/rejilla-050.py
  MINC=11 MITAD=134,141 VISTA=96,106 uv run proyectos/050/herramientas/rejilla-050.py
"""
import json
import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
G = [(x["t"], x["db"]) for x in json.loads((RAIZ / "proyectos/050/musica/golpes-050.json").read_text())["golpes"]]
MINC = float(os.environ.get("MINC", "11.5"))
DROP = float(os.environ.get("DROP", "14"))
LIBRE = tuple(map(int, os.environ.get("LIBRE", "45,110").split(",")))
MITAD = tuple(map(int, os.environ.get("MITAD", "134,141").split(",")))
VISTA = tuple(map(int, os.environ.get("VISTA", "96,106").split(",")))
ALCOBA = tuple(map(int, os.environ.get("ALCOBA", "45,95").split(",")))
# planos: N3 del paseo (pool, gimnasio, cocina), MITAD, alcoba, baño, VISTA
N3 = int(os.environ.get("N3", "3"))
R = [LIBRE] * N3 + [MITAD, ALCOBA, ALCOBA, VISTA]
K = len(R) + 1
# el corte k puede pedir menos que MINC (MINS="k:dB,k:dB"): p. ej. MINS="4:9" deja el corte de la alcoba en un golpe de 9 dB
MINS = {int(a): float(b) for a, b in (x.split(":") for x in os.environ.get("MINS", "").split(",") if x)}
UMBRAL = min([MINC, *MINS.values()])
HITS = [(t, d) for t, d in G if d >= UMBRAL - 1e-9 and 30 <= t <= 100]
sols = []


def fr(a, b):
    return round((b - a) * 30)


def rec(k, i, cuts):
    if k == K - 1:
        durs = [fr(HITS[a][0], HITS[b][0]) for a, b in zip(cuts, cuts[1:])]
        if durs[-1] <= max(durs[-3], durs[-2]):
            return
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
print(f"MINC {MINC} {MINS or ''} · {len(sols)} rejillas")
for m, cuts, durs in sols[:int(os.environ.get("TOP", "12"))]:
    print(f"  min {m:5.1f} dB · cortes {[round(HITS[c][0], 3) for c in cuts]} · dB {[HITS[c][1] for c in cuts]} · planos {durs}")
