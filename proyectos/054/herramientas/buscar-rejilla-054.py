#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""buscar-rejilla-054.py — la rejilla de cortes del 054: ¿en qué golpes de la canción cae cada corte, para una lista de planos con rangos de duración?

Uso (desde la raíz del repo):
  R='[[75,100],[129,165],[36,75],...]' MINC=12 uv run proyectos/054/herramientas/buscar-rejilla-054.py proyectos/054/musica/golpes-cancion-entera.json

POR QUÉ EXISTE. `buscar-cortes-043.py` está hecha para una canción CON caída (el CTA entra donde la canción cae) y esta, «Luxury, Elegance, Refined», es un lounge plano: sonoridad
−14,6 LUFS de principio a fin y 268 golpes. No hay caída que buscar: el CTA baja con la envolvente y se apaga bajo la tarjeta. Lo que sí hay que decidir es DÓNDE entrar (el golpe
del frame 0) y que cada corte seco caiga en un golpe FUERTE del pulso. Aquí se enumeran las entradas posibles (golpes ≥ START_MIN) y, para cada una, las secuencias de cortes que cumplen
los rangos de duración de cada plano con todos los golpes ≥ MINC (y el corte `DROP_K`, el que entra en el paseo, ≥ DROP).

Variables de entorno:
  R         rangos de duración (frames a 30 fps) de cada plano, en orden. El último (el CTA) no tiene corte propio: acaba en fundido a negro.
  MINC      golpe mínimo (dB) de cada corte (12).
  MINS      lista JSON con el golpe mínimo de CADA corte (len = planos − 1): los cortes de frontera de bloque piden uno fuerte y los de dentro de un recorrido, uno más flojo.
  DROP      el corte DROP_K (por defecto el 2.º, la entrada del paseo) pide al menos esto (14).
  DROP_K    índice (0 = aérea → hook).
  START_MIN fuerza mínima del golpe de entrada (15).
  E0        «lo,hi»: restringe el golpe de entrada (segundos de la canción).
  SUMAS     lista JSON de [primer plano, último plano, mín, máx] (índices de plano, frames): acota lo que dura un GRUPO de planos (p. ej. el recorrido 1).
  TOP       cuántas soluciones se imprimen (12).
  VISTA     índice del plano que tiene que ser el más largo de su bloque (opcional).
"""
import json
import os
import sys

import numpy as np

gol = json.load(open(sys.argv[1]))["golpes"]
T = np.array([g["t"] for g in gol])
DB = np.array([g["db"] for g in gol])
R = [tuple(x) for x in json.loads(os.environ["R"])]
MINC = float(os.environ.get("MINC", "12"))
DROP = float(os.environ.get("DROP", "14"))
DROP_K = int(os.environ.get("DROP_K", "1"))
START_MIN = float(os.environ.get("START_MIN", "15"))
TOP = int(os.environ.get("TOP", "12"))
SUMAS = json.loads(os.environ.get("SUMAS", "[]"))
E0 = tuple(float(x) for x in os.environ["E0"].split(",")) if "E0" in os.environ else None
NC = len(R) - 1  # cortes interiores (el último plano no tiene corte propio)
MINS = json.loads(os.environ["MINS"]) if "MINS" in os.environ else [MINC] * NC
assert len(MINS) == NC, f"MINS necesita {NC} valores, trae {len(MINS)}"
RETARDO, ATAQUE = 0.054, 0.012


def frames(t0: float) -> np.ndarray:
    """El frame de la comp en que SUENA cada golpe si la canción arranca en t0 (la misma cuenta que `golpe()` de metraje-054.ts)."""
    return np.round((T + ATAQUE + RETARDO - t0) * 30).astype(int)


resultados = []
for i in np.where(DB >= START_MIN)[0]:
    t0 = round((T[i] - 0.03) * 30) / 30  # INICIO_MUSICA: entero de frames, el golpe cae en el f3-f4
    if E0 and not (E0[0] <= T[i] <= E0[1]):
        continue
    f = frames(t0)
    if f[i] < 2 or f[i] > 5:
        continue
    ok = (f >= 0) & (DB >= min(MINS))
    idx = np.where(ok)[0]
    fr = f[idx]
    dbs = DB[idx]
    # DFS: cortes c_0 < c_1 < … con c_k − c_{k−1} ∈ R[k]; c_{−1} = 0
    sol = []

    def dfs(k, previo, cortes):
        if k == NC:
            sol.append(list(cortes))
            return
        lo, hi = R[k]
        for j in range(len(fr)):
            d = fr[j] - previo
            if d < lo:
                continue
            if d > hi:
                break
            if dbs[j] < MINS[k] or (k == DROP_K and dbs[j] < DROP):
                continue
            cortes.append(j)
            dfs(k + 1, fr[j], cortes)
            cortes.pop()
            if len(sol) > 200000:
                return

    dfs(0, 0, [])
    for s in sol:
        fc = [int(fr[j]) for j in s]
        d = [fc[0]] + [fc[k] - fc[k - 1] for k in range(1, len(fc))]
        if any(not (lo <= sum(d[a:b + 1]) <= hi) for a, b, lo, hi in SUMAS if b < len(d)):
            continue
        resultados.append((min(dbs[j] for j in s), T[i], t0, fc, [float(dbs[j]) for j in s], d))

resultados.sort(key=lambda r: (-r[0], r[3][-1]))
print(f"{len(resultados)} rejillas (mínimos por corte {MINS}, DROP {DROP} en el corte {DROP_K}, entrada ≥ {START_MIN} dB)")
for r in resultados[:TOP]:
    print(f"corte más débil {r[0]:.1f} dB · entrada {r[1]:.3f} s (INICIO {r[2]:.4f}) · cortes en f{r[3]} · dB {[round(x,1) for x in r[4]]} · duraciones {r[5]}")
