#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""sondear.py — tabla de lo que ffprobe dice de cada clip de `proyectos/040/original/` (tamaño, fps, fotogramas, duración, rotación, transferencia).

Uso (desde la raíz del repo):  uv run proyectos/040/herramientas/sondear.py
Antes de contar un solo frame (R01, R19, R21): el material de esta casa es 16:9, sin rotación y en SDR; si algún clip no lo fuera, aquí se ve.
"""
import glob
import json
import os
import subprocess

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
for ruta in sorted(glob.glob(os.path.join(RAIZ, "proyectos", "040", "original", "*"))):
    if ruta.endswith((".sha256", ".mp3", ".wav")):
        continue
    j = json.loads(
        subprocess.run(
            ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate,avg_frame_rate,nb_frames,duration,color_transfer,pix_fmt:stream_side_data=rotation", "-of", "json", ruta],
            capture_output=True,
            text=True,
        ).stdout
    )["streams"][0]
    rot = (j.get("side_data_list") or [{}])[0].get("rotation", 0)
    print(f"{os.path.basename(ruta):34s} {j['width']}x{j['height']}  r={j['r_frame_rate']:>12s} avg={j['avg_frame_rate']:>14s}  n={j.get('nb_frames', '?'):>5s}  {float(j['duration']):6.3f} s  rot={rot}  trc={j.get('color_transfer')}  {j['pix_fmt']}")
