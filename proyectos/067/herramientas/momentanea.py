#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
momentanea.py — la sonoridad MOMENTÁNEA (ebur128, ventana de 400 ms, un valor cada 100 ms) de un tramo de un WAV, y su pico real.

Uso (desde la raíz del repo):
  uv run proyectos/067/herramientas/momentanea.py remotion/public/recorrido-067/musica-067.wav 148.4 190 [--cada 0.5]

POR QUÉ EXISTE. `MOMENTANEA` de `audio-067.ts` (la curva natural de la canción bajo el hook, la mitad y el CTA) son estos valores medidos
sobre la fuente, y de ahí sale la ganancia que deja la música a −26 LUFS bajo la voz. Imprime «t de la canción · M (LUFS)» y, a la derecha,
el frame de la pieza en que cae ese instante (`--inicio` = INICIO_MUSICA, el segundo de la canción que suena en el f0).
"""
import re, subprocess, sys
wav, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
cada = float(sys.argv[sys.argv.index("--cada") + 1]) if "--cada" in sys.argv else 0.5
inicio = float(sys.argv[sys.argv.index("--inicio") + 1]) if "--inicio" in sys.argv else None
p = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-v", "verbose", "-ss", str(t0), "-t", str(t1 - t0), "-i", wav, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
filas = re.findall(r"t:\s*([\d.]+)\s+TARGET:\S+ LUFS\s+M:\s*(-?[\d.]+|-inf)", p.stderr)
sig = 0.0
for t, m in filas:
    t = float(t)
    if t + 1e-6 >= sig:
        mv = -70.0 if m == "-inf" else float(m)
        extra = f"   f{(t0 + t - inicio) * 30:7.1f}" if inicio is not None else ""
        print(f"{t0 + t:8.2f} s   M {mv:6.1f} LUFS{extra}")
        sig += cada
pk = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", p.stderr)
print("pico real del tramo:", pk[-1] if pk else "?", "dBFS")
