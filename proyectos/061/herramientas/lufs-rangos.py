#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""lufs-rangos.py — sonoridad (ebur128) y pico real de rangos de un WAV: uv run proyectos/061/herramientas/lufs-rangos.py <wav> nombre=a-b [nombre=a-b …] (segundos de la fuente)."""
import re, subprocess, sys
wav = sys.argv[1]
for spec in sys.argv[2:]:
    n, r = spec.split("=")
    a, b = (float(x) for x in r.split("-"))
    p = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-i", wav, "-af", f"atrim=start={a}:end={b},ebur128=peak=true:framelog=quiet", "-f", "null", "-"], capture_output=True, text=True)
    l = re.findall(r"I:\s+(-?[\d.]+) LUFS", p.stderr)
    pk = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", p.stderr)
    print(f"{n:10} {a:8.3f}-{b:8.3f} s  {l[-1] if l else '?':>6} LUFS  pico {pk[-1] if pk else '?':>6} dBFS")
