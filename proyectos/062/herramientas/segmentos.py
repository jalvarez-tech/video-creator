#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
segmentos.py — ¿qué oye whisper-small en un TROZO AISLADO de una toma? Para cerrar una palabra dudosa.

Uso (desde la raíz del repo):
  uv run proyectos/062/herramientas/segmentos.py remotion/public/recorrido-062/md02.wav 1.45-2.38 1.40-2.90 3.85-5.05

POR QUÉ EXISTE. Transcribir la toma entera (o cortar desde un instante hasta el final, `palabras-desde.py`) deja que whisper rellene la
duda con el contexto: en MD02 el catálogo decía «los barrios con mayor ocupación» y la toma entera daba «mejores barrios como ayer
ocupación». Un trozo aislado (de la palabra dudosa y un poco de cada lado) no tiene contexto que rellenar: si 3 trozos distintos oyen la
misma palabra, es lo que suena. Va junto a la cuenta de sílabas contra la velocidad de la voz (`envolvente-voz.py`, `onsets-voz.py`) y las /s/
(`sibilantes.py`). No sustituye al oído de quien conoce la frase.
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
wav = sys.argv[1]
with tempfile.TemporaryDirectory() as tmp:
    for i, spec in enumerate(sys.argv[2:], 1):
        a, b = (float(x) for x in spec.split("-"))
        w, j = Path(tmp) / f"s{i}.wav", Path(tmp) / f"s{i}.json"
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{a}", "-to", f"{b}", "-i", wav, "-c:a", "pcm_s16le", str(w)], check=True)
        subprocess.run(["node", str(RAIZ / "manuales/edicion-video/scripts/transcribir.mjs"), str(w), str(j), "es"], cwd=RAIZ, capture_output=True, check=True)
        d = json.load(open(j))
        print(f"[{a:.2f}-{b:.2f}] " + " ".join(t["text"].strip() for t in d["transcription"]))
