#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy"]
# ///
"""rejilla-037.py — ¿deja esta canción una REJILLA DE CORTES válida para el 037 («el error»)? Fuerza bruta sobre los golpes medidos.

Uso (desde la raíz del repo):
  uv run proyectos/037/herramientas/rejilla-037.py "archivos/musica/<canción>.mp3" [otra.mp3 …]
  Variables: TF=<s de la canción en que cae la nota> (por defecto, todas las caídas ≥ D1/D2) · W=4.5 (el CTA entra hasta W s antes de la caída)
             MIND=9 (golpe mínimo de una disolvencia) · MINC=8 (de un corte seco) · TOP=5 · R='[[66,100],…]' (rangos en frames de los 7 planos)
             E0=lo,hi (segundos de la canción donde puede estar el golpe de entrada)

LA ESTRUCTURA DEL 037 (8 planos que dejan 7 fronteras tras el golpe del frame 0; cada frontera cae en un GOLPE medido):
  e0 dron | e1 hook (HK08, entra a corte) | e2 RC01 (disolvencia) | e3 RC28 (corte) | e4 MD10 (corte) | e5 RC13 (disolvencia) | e6 DR82 (corte) | e7 CT08 (corte: el CTA)
  frontera b1 = entra el hook · b2 = RC01 · b3 = RC28 · b4 = MD10 · b5 = RC13 · b6 = DR82 · b7 = entra el CTA
  duraciones (f a 30 fps): dron 66-100 · hook 102-114 (su voz, de 8 f antes de la primera sílaba a 14 f tras la última) · RC01 90-130 · RC28 60-96 ·
  MD10 181-182 (su voz entera, 0,71-6,27 s de la toma + 14 f) · RC13 60-78 · DR82 75-110, y la vista (DR82) más larga que RC13.
Es la misma búsqueda que `buscar-cortes-lp.py` (V9) con la estructura de esta pieza; la caída, el detector de golpes y el criterio son los suyos.
"""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.signal import butter, find_peaks, sosfilt

MIND = float(os.environ.get("MIND", "9"))
MINC = float(os.environ.get("MINC", "8"))
W = float(os.environ.get("W", "4.5"))
TOP = int(os.environ.get("TOP", "5"))
R = [(66, 100), (102, 114), (90, 130), (60, 96), (181, 182), (60, 78), (75, 110)]
if os.environ.get("R"):
    R = [tuple(x) for x in json.loads(os.environ["R"])]
TIPOS = json.loads(os.environ.get("TIPOS", "[\"c\",\"c\",\"d\",\"c\",\"c\",\"d\",\"c\",\"c\"]"))  # b0 (entrada de la canción: ≥ MIND) · una letra por frontera
N = len(R) + 1  # fronteras b0…b7


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
    s = y[int(t0 * sr) : int((t0 + 5) * sr)]
    return -99.0 if len(s) < sr else 10 * np.log10(np.mean(s**2) + 1e-12)


def caidas(y, sr):
    dur = len(y) / sr
    res = []
    t = 15.0
    while t < dur - 4:
        pre, a = p5(y, sr, t - 5), p5(y, sr, t)
        b = p5(y, sr, t + 5) if t + 10 <= dur else -99.0
        if pre - a >= float(os.environ.get("D1", "9.0")) and pre - b >= float(os.environ.get("D2", "14.0")) and pre > -45:
            res.append(t)
        t += 0.25
    ev = []
    for t in res:
        if ev and t - ev[-1][-1] < 15.0:
            ev[-1][-1] = t
            continue
        ev.append([t, t])
    return [e[0] for e in ev]


def fr(t0, t1):
    return round((t1 - t0) * 30)


def buscar(G, t_f):
    n = len(G)

    def siguientes(i, lo, hi):
        out = []
        for j in range(i + 1, n):
            f = fr(G[i][0], G[j][0])
            if f > hi:
                break
            if f >= lo:
                out.append(j)
        return out

    def vale(j, k):
        return G[j][1] >= (MIND if TIPOS[k] == "d" else MINC) and (k > 0 or G[j][1] >= MIND)

    alcanza = [set() for _ in range(N)]
    alcanza[N - 1] = {j for j in range(n) if t_f - W <= G[j][0] <= t_f and vale(j, N - 1)}
    for k in range(N - 2, -1, -1):
        for j in range(n):
            if vale(j, k) and any(x in alcanza[k + 1] for x in siguientes(j, *R[k])):
                alcanza[k].add(j)
    if os.environ.get("E0"):
        lo, hi = map(float, os.environ["E0"].split(","))
        alcanza[0] = {j for j in alcanza[0] if lo <= G[j][0] <= hi}
    sols, cnt = [], 0

    def rec(k, j, cortes):
        nonlocal cnt
        if cnt > 200000:
            return
        if k == N - 1:
            durs = [fr(G[a][0], G[b][0]) for a, b in zip(cortes, cortes[1:])]
            if os.environ.get("VISTA") and durs[-1] <= int(os.environ["VISTA"]):  # la vista (el último plano de paseo) más larga que esto
                return
            cnt += 1
            fuerza = [G[c][1] for c in cortes]
            sols.append((min(durs), round(min(fuerza), 1), [round(G[c][0], 3) for c in cortes], durs, [round(x, 1) for x in fuerza]))
            return
        for j2 in siguientes(j, *R[k]):
            if j2 in alcanza[k + 1]:
                rec(k + 1, j2, cortes + [j2])

    for j in sorted(alcanza[0]):
        rec(0, j, [j])
    return cnt, sols


for ruta in sys.argv[1:]:
    y, sr = decodifica(ruta)
    nombre = ruta.split("/")[-1][:60]
    ev = [float(os.environ["TF"])] if os.environ.get("TF") else caidas(y, sr)
    print(f"\n### {nombre}  ({len(y) / sr:.0f} s)  caídas: {len(ev)}", flush=True)
    todos = golpes_de(y, sr)
    for t in ev:
        G = [(tt, d) for tt, d in todos if t - 60 <= tt <= t and d >= min(MINC, MIND)]
        cnt, sols = buscar(G, t)
        print(f"  cae en {t:8.2f} s  golpes ≥ {MINC:g} dB en 60 s: {len(G):3d}  soluciones: {cnt}", flush=True)
        # primero el golpe más débil más fuerte (el corte seco puede medir menos en el render), después el plano más corto
        sols.sort(key=lambda s: (-min(s[1], 12), -min(s[0], 75)))
        for s in sols[:TOP]:
            print(f"      · golpe más débil {s[1]} dB · plano más corto {s[0]} f · cortes {s[2]} · planos {s[3]} · dB {s[4]}", flush=True)
