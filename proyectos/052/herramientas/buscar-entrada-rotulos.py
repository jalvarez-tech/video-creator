#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
buscar-entrada-rotulos.py — ¿desde qué segundo de la canción cae cada rótulo en un golpe?

Uso (desde la raíz del repo):
  uv run manuales/../proyectos/052/herramientas/medir-pista.py "<mp3>" --desde 8 --dur 125 --json /tmp/golpes.json
  uv run proyectos/052/herramientas/buscar-entrada-rotulos.py /tmp/golpes.json

La pieza no tiene locución: el texto manda y la música pesa (solo baja bajo el hook y el CTA). Cada RÓTULO entra en un golpe del piano (≥ UMBRAL dB) y entre dos rótulos hay 3-5 s. Se busca el
`INICIO_MUSICA` (en pasos de 1 frame) que mejor casa N entradas consecutivas: la primera justo tras el hook y la última, la toma del CTA. Puntúa la fuerza de los golpes y castiga el
alejarse de la separación ideal. Los instantes de la composición llevan el retardo del render de Remotion (42 ms) y el ataque del golpe (12 ms).
"""
import json
import sys

HOOK_FIN = 2.9           # s: la disolvencia al primer plano de recorrido acaba aquí (f86)
N = int(sys.argv[2]) if len(sys.argv) > 2 else 10   # entradas: R1…R9 y la toma del CTA
UMBRAL = 8.0
IDEAL = 4.0
SEPARACION = (2.8, 6.0)
RETARDO = 0.042 + 0.012

g = [x for x in json.load(open(sys.argv[1]))["golpes"] if x["db"] >= UMBRAL]
mejores = []
for paso in range(int(8 * 30), int(80 * 30)):
    inicio = paso / 30
    h = [(x["t"] - inicio + RETARDO, x["db"]) for x in g]
    h = [(t, db) for t, db in h if 3.0 <= t <= 58]
    # DP: mejor cadena de N golpes
    candidatas = [(t, db) for t, db in h if HOOK_FIN - 0.2 <= t <= HOOK_FIN + 1.0]
    mejor = None
    for t0, d0 in candidatas:
        cadena = [(t0, d0, 0.0)]
        puntos = d0
        actual = (t0, d0)
        ok = True
        ruta = [(t0, d0)]
        for _ in range(N - 1):
            opciones = [(t, db) for t, db in h if SEPARACION[0] <= t - actual[0] <= SEPARACION[1]]
            if not opciones:
                ok = False
                break
            sig = max(opciones, key=lambda o: o[1] - 3 * abs((o[0] - actual[0]) - IDEAL))
            puntos += sig[1] - 3 * abs((sig[0] - actual[0]) - IDEAL)
            ruta.append(sig)
            actual = sig
        if ok and (mejor is None or puntos > mejor[0]):
            mejor = (puntos, ruta)
    if mejor:
        mejores.append((mejor[0], inicio, mejor[1]))
mejores.sort(reverse=True)
for puntos, inicio, ruta in mejores[:6]:
    print(f"INICIO {inicio:7.3f} s ({round(inicio*30)}/30) · puntos {puntos:5.1f} · " + " ".join(f"{t:.2f}[{db:.0f}]" for t, db in ruta))
