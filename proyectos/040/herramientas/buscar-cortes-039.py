#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""
buscar-cortes-040.py (V22, Lote El Carmen) — la rejilla de cortes de una pieza con MUCHOS planos cortos.

Es `buscar-cortes-lp.py` con el número de planos libre: aquel está cableado a 9 planos (3 de paseo); el 040 lleva el paseo en
rápido (5 planos de 1-1,5 s + una pausa) y necesita 12-13. Misma idea: (1) las CAÍDAS completas de la canción (donde entra el CTA:
≥ 9 dB en los 5 s siguientes y ≥ 20 en los 10, sin recuperarse), y (2) para cada caída, las rejillas de cortes que caen cada una sobre un
GOLPE medido, con los planos dentro de sus rangos de duración.

Detector de golpes = el de `medir-pista.py` (80-3000 Hz, ventana 6 ms / paso 1 ms, subida ≥ 6 dB en 15 ms, distancia 350 ms).
Búsqueda = alcanzabilidad hacia atrás + enumeración acotada.

Uso (desde la raíz del repo):
  R='[[48,75],[128,160],[30,45],[30,45],[30,45],[30,45],[30,45],[75,120],[130,149],[36,60],[36,60],[100,150]]' \
  MINC=12 DROP=14 W=3.5 uv run proyectos/040/herramientas/buscar-cortes-040.py "archivos/musica/<canción>.mp3" ...

Variables:
  R        los rangos de duración (f) de cada plano, en orden: apertura · hook · paseo… · mitad · bloque 5… (el último es la vista).
  MINC     golpe mínimo (dB) de cada corte (por defecto 12: lo pedido para esta pieza). MIND, para los cortes de tipo «d» (disolvencia).
  TIPOS    una letra por corte (len(R)+1): c = corte seco, d = disolvencia (por defecto, todos c).
  DROP     el corte que ENTRA en el paseo (el 3.º: tras el hook) pide al menos esta fuerza (por defecto 14): «un drop donde entra el paseo».
  DROP_K   índice del corte del drop (por defecto 2).
  START_MIN el golpe de entrada (el del frame 0) pide al menos esta fuerza (por defecto 0).
  VISTA_VS cuántos planos anteriores tiene que superar en duración la vista (por defecto 2: el bloque 5).
  W        el CTA entra hasta W s antes de la caída; T_F fija el instante de la caída; D1/D2 umbrales de la caída; TOP cuántas se imprimen.
  E0       «lo,hi»: restringe el golpe de entrada (segundos de la canción).
  ORDEN    «golpe» ordena por el corte más débil; por defecto, por el plano más corto.
"""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

RUTAS = sys.argv[1:]
R = [tuple(x) for x in json.loads(os.environ["R"])]
NP = len(R)
K = NP + 1
MINC = float(os.environ.get("MINC", "12"))
MIND = float(os.environ.get("MIND", str(MINC)))
TIPOS = list(os.environ.get("TIPOS", "c" * K))
assert len(TIPOS) == K, f"TIPOS necesita {K} letras (una por corte), trae {len(TIPOS)}"
DROP = float(os.environ.get("DROP", "14"))
DROP_K = int(os.environ.get("DROP_K", "2"))
START_MIN = float(os.environ.get("START_MIN", "0"))  # el golpe de ENTRADA (frame 0) pide al menos esta fuerza
VISTA_VS = int(os.environ.get("VISTA_VS", "2"))
W = float(os.environ.get("W", "3.5"))
TOPE = int(os.environ.get("TOPE", "300000"))
FIN = os.environ.get("FIN", "caidas")  # caidas: la caída completa de siempre · todas: cualquier golpe fuerte puede ser la entrada del CTA
VENT = sum(r[1] for r in R) / 30.0 + 3.0  # los s de canción que cubren los planos (por arriba)
UMBRAL = min(MINC, MIND, 7.4)


def decodifica(ruta):
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64), 48000


def golpes_de(y, sr):
    sos = butter(4, [80, 3000], btype="band", fs=sr, output="sos")
    b = sosfilt(sos, y)
    win, hop = int(0.006 * sr), int(0.001 * sr)
    e = np.sqrt(np.convolve(b**2, np.ones(win) / win, mode="valid")[::hop] + 1e-12)
    db = 20 * np.log10(e)
    sub = db[15:] - db[:-15]
    picos, _ = find_peaks(sub, height=6.0, distance=350)
    out = []
    for p in picos:
        k = p
        while k > 0 and db[k] > db[k - 1] - 0.05:
            k -= 1
        out.append((k / 1000.0, float(sub[p])))
    return out


def p5(y, sr, t0):
    s = y[int(t0 * sr):int((t0 + 5) * sr)]
    if len(s) < sr:
        return -99.0
    return 10 * np.log10(np.mean(s**2) + 1e-12)


def caidas(y, sr):
    dur = len(y) / sr
    res = []
    t = 15.0
    while t < dur - 4:
        pre, a = p5(y, sr, t - 5), p5(y, sr, t)
        b = p5(y, sr, t + 5) if t + 10 <= dur else -99.0
        if pre - a >= float(os.environ.get("D1", "9.0")) and pre - b >= float(os.environ.get("D2", "20.0")) and pre > -45:
            res.append((t, pre, a, b))
        t += 0.25
    ev = []
    for c in res:
        if ev and c[0] - ev[-1][-1] < 15.0:
            ev[-1][-1] = c[0]
            continue
        ev.append([c[0], c[1], c[2], c[3], c[0]])
    return [(e[0], e[1], e[2], e[3]) for e in ev]


def fr(t0, t1):
    return round((t1 - t0) * 30)


def buscar(G, t_f):
    n = len(G)

    def nxt(i, lo, hi):
        out = []
        for j in range(i + 1, n):
            f = fr(G[i][0], G[j][0])
            if f > hi:
                break
            if f >= lo:
                out.append(j)
        return out

    def ok(j, k):
        m = MIND if TIPOS[k] == "d" else MINC
        if k == DROP_K:
            m = max(m, DROP)
        if k == 0:
            m = max(m, START_MIN)
        return G[j][1] >= m

    fin = {j for j in range(n) if t_f - W <= G[j][0] <= t_f and ok(j, K - 1)}
    reach = [set() for _ in range(K)]
    reach[K - 1] = fin
    for k in range(K - 2, -1, -1):
        for j in range(n):
            if ok(j, k) and any(x in reach[k + 1] for x in nxt(j, *R[k])):
                reach[k].add(j)
    if os.environ.get("E0"):
        lo, hi = map(float, os.environ["E0"].split(","))
        reach[0] = {j for j in reach[0] if lo <= G[j][0] <= hi}
    sols, cnt = [], 0

    def rec(k, j, cuts):
        nonlocal cnt
        if cnt > TOPE:
            return
        if k == K - 1:
            durs = [fr(G[a][0], G[b][0]) for a, b in zip(cuts, cuts[1:])]
            vista = durs[NP - 1]
            if VISTA_VS and vista <= max(durs[NP - 1 - VISTA_VS:NP - 1]):
                return
            cnt += 1
            ds = [G[c][1] for c, t in zip(cuts, TIPOS) if t == "d"]
            cs = [G[c][1] for c, t in zip(cuts, TIPOS) if t == "c"]
            sols.append((min(durs), round(min(ds) if ds else 99, 1), round(min(cs) if cs else 99, 1),
                         [float(round(G[c][0], 3)) for c in cuts], durs, [round(G[c][1], 1) for c in cuts]))
            return
        for j2 in nxt(j, *R[k]):
            if j2 in reach[k + 1]:
                rec(k + 1, j2, cuts + [j2])

    for j in sorted(reach[0]):
        rec(0, j, [j])
    return cnt, sols


def imprime(t, pre, a, b, G, cnt, sols, nombre_extra=""):
    if os.environ.get("ORDEN") == "golpe":
        sols.sort(key=lambda s: (-min(s[1], s[2], 14), -min(s[0], 45)))
    else:
        sols.sort(key=lambda s: (-min(s[0], 45), -min(s[1], s[2], 14)))
    n12 = sum(1 for x in G if x[1] >= MINC)
    print(f"  cae en {t:8.2f} s  pre {pre:6.1f} → {a:6.1f} → {b:6.1f} dB  ({pre - a:4.1f}/{pre - b:4.1f})  golpes≥{MINC:g} en {VENT:.0f} s: {n12:3d}  soluciones: {cnt}{nombre_extra}", flush=True)
    for s in sols[:int(os.environ.get("TOP", "3"))]:
        print(f"      · plano más corto = {s[0]} f · disolvencia más débil {s[1]} dB / corte seco {s[2]} dB · cortes {s[3]} · planos {s[4]} · dB {s[5]}", flush=True)


for ruta in RUTAS:
    y, sr = decodifica(ruta)
    nombre = ruta.split("/")[-1][:60]
    todos = golpes_de(y, sr)
    if FIN == "todas":
        # cada golpe fuerte posterior a VENT es una entrada posible del CTA; se queda la mejor rejilla de cada una y se imprimen las TOP mejores
        mejores = []
        dur = len(y) / sr
        for (te, dte) in todos:
            if te < VENT or dte < max(MINC, MIND) or te > dur - 3:
                continue
            G = [(tt, d) for tt, d in todos if te - VENT <= tt <= te + 0.001 and d >= UMBRAL]
            cnt, sols = buscar(G, te)
            if not sols:
                continue
            pre, a, b = p5(y, sr, te - 5), p5(y, sr, te), p5(y, sr, te + 5) if te + 10 <= dur else -99.0
            sols.sort(key=lambda s: (-min(s[1], s[2], 14), -min(s[0], 45)))
            mejores.append((min(sols[0][1], sols[0][2], 14), cnt, te, pre, a, b, G, sols))
        print(f"\n### {nombre}  ({dur:.0f} s)  entradas del CTA con rejilla: {len(mejores)}", flush=True)
        mejores.sort(key=lambda m: (-m[0], -m[1]))
        for (_, cnt, te, pre, a, b, G, sols) in mejores[:int(os.environ.get("NFIN", "3"))]:
            imprime(te, pre, a, b, G, cnt, sols)
        continue
    ev = caidas(y, sr)
    if os.environ.get("T_F"):
        ev = [(float(os.environ["T_F"]), 0.0, 0.0, 0.0)]
    print(f"\n### {nombre}  ({len(y) / sr:.0f} s)  caídas completas: {len(ev)}", flush=True)
    if not ev:
        continue
    for (t, pre, a, b) in ev:
        G = [(tt, d) for tt, d in todos if t - VENT <= tt <= t and d >= UMBRAL]
        cnt, sols = buscar(G, t)
        imprime(t, pre, a, b, G, cnt, sols)
