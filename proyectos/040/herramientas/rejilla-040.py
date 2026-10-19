#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""rejilla-040.py — la rejilla de cortes de la V23 (040) sobre los golpes MEDIDOS de una canción, con la entrada y el CTA fijos.

Uso (desde la raíz del repo):
  R='[[50,110],[180,200],[60,130],[60,130],[60,130],[118,136],[45,110],[45,110],[110,190]]' MIN=8.5 \
    uv run proyectos/040/herramientas/rejilla-040.py proyectos/040/musica/golpes-dreamlife.json 52.737 82.778

R = los rangos (f) de cada plano, en orden: apertura · hook · bloque 3… · mitad · bloque 5… (el último, la vista). La entrada (primer golpe, f3) y la caída
donde entra el CTA son fijas: cada corte intermedio cae en un golpe ≥ MIN dB y cada plano dura lo que dice su rango. La vista tiene que ser más larga que los
VISTA_VS planos anteriores. Imprime las TOP mejores por el corte más débil, y después por el reparto de duraciones.
"""
import json, os, sys
golpes = json.load(open(sys.argv[1]))["golpes"]
T0, TF = float(sys.argv[2]), float(sys.argv[3])
R = json.loads(os.environ["R"])
MIN = float(os.environ.get("MIN", "8.5"))
TOP = int(os.environ.get("TOP", "8"))
VISTA_VS = int(os.environ.get("VISTA_VS", "2"))
G = [(g["t"], g["db"]) for g in golpes if T0 - 1e-6 <= g["t"] <= TF + 1e-6]
fr = lambda a, b: round((b - a) * 30)
N = len(R)
sols = []
def rec(k, j, cuts):
    if k == N - 1:
        # el último plano (la vista) acaba en el CTA
        d = fr(G[j][0], TF)
        if R[k][0] <= d <= R[k][1]:
            durs = [fr(G[a][0], G[b][0]) for a, b in zip(cuts, cuts[1:])] + [d]
            if durs[-1] > max(durs[-1 - VISTA_VS:-1]):
                sols.append((cuts[:], durs))
        return
    for j2 in range(j + 1, len(G)):
        d = fr(G[j][0], G[j2][0])
        if d > R[k][1]: break
        if d >= R[k][0] and G[j2][1] >= MIN:
            rec(k + 1, j2, cuts + [j2])
i0 = min(range(len(G)), key=lambda i: abs(G[i][0] - T0))
rec(0, i0, [i0])
print(f"{len(G)} golpes ≥ 6 dB entre la entrada y el CTA · {len(sols)} rejillas con cada corte ≥ {MIN:g} dB")
def clave(s):
    cuts, durs = s
    return (-min(min(G[c][1] for c in cuts[1:]), 12.0), -min(durs))
sols.sort(key=clave)
vistos = set()
n = 0
for cuts, durs in sols:
    if tuple(durs[:2]) in vistos and n >= 3:
        continue
    vistos.add(tuple(durs[:2]))
    print("·", "planos", durs, "· dB", [round(G[c][1], 1) for c in cuts[1:]], "· frames", [fr(T0, G[c][0]) + 3 for c in cuts[1:]], "· s", [round(G[c][0], 3) for c in cuts[1:]])
    n += 1
    if n >= TOP: break
