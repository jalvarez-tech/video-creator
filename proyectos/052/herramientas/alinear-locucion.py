#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "soundfile"]
# ///
"""
alinear-locucion.py — los bloques de subtítulos de la LOCUCIÓN, frase a frase.

Uso (desde la raíz del repo; después de `montar-locucion.py`, `normalizar.mjs --solo off` y con `voz/off-marcado.txt`):
  uv run proyectos/052/herramientas/alinear-locucion.py > /tmp/off-bloques.txt
  uv run proyectos/052/herramientas/armar-subtitulos.py /tmp/off-bloques.txt

POR QUÉ FRASE A FRASE. El DTW de whisper sobre los 71 s de locución se desvió hasta 0,5 s en medio de una frase (en la frase 2 puso «un apartamento» 0,5 s antes de que sonara). Aquí
cada frase se corta de `off.wav` (con 50 ms de aire), se transcribe SOLA —el DTW de una frase de 5-12 s es mucho más fiel— y `trozos-editoriales.mjs` la alinea con SU arranque (`--s0`) y su energía
(`--audio`). Las frases salen de la tabla que imprime `montar-locucion.py` (primera y última sílaba de cada una).
"""
import json
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
OFF = RAIZ / "remotion/public/recorrido-052/off.wav"
OFF_EN0, OFF_S0 = 164, 0.04  # el frame en que suena la primera palabra de la locución y su segundo (metraje-052.ts)
TMP = Path("/private/tmp/remotion-052/frases")
TMP.mkdir(parents=True, exist_ok=True)

# (inicio, fin) de cada frase en off.wav, de `montar-locucion.py`; y cuántos bloques del guion marcado le tocan
FRASES = [(0.04, 5.13), (5.46, 12.25), (12.78, 16.76), (17.24, 21.36), (21.89, 32.59), (33.17, 39.05), (39.83, 48.53), (49.71, 52.41), (53.99, 65.77), (66.35, 71.08)]
BLOQUES_POR_FRASE = [2, 3, 2, 2, 4, 2, 3, 2, 4, 2]

guion = [l for l in (RAIZ / "proyectos/052/voz/off-marcado.txt").read_text(encoding="utf8").split("\n") if l.strip() and not l.startswith("#")]
assert len(guion) == sum(BLOQUES_POR_FRASE), (len(guion), sum(BLOQUES_POR_FRASE))
AIRE = 0.05
salida, k, n_bloque = [], 0, 0
for i, ((a, b), nb) in enumerate(zip(FRASES, BLOQUES_POR_FRASE), 1):
    ini = max(0.0, a - AIRE)
    wav = TMP / f"f{i:02d}.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{ini:.3f}", "-t", f"{b - ini + 0.15:.3f}", "-i", str(OFF), "-c:a", "pcm_s16le", str(wav)], check=True)
    js = TMP / f"f{i:02d}.json"
    subprocess.run(["node", "manuales/edicion-video/scripts/transcribir.mjs", str(wav), str(js), "es", "--palabras"], cwd=RAIZ, check=True, capture_output=True)
    txt = TMP / f"f{i:02d}.txt"
    txt.write_text("\n".join(guion[k : k + nb]) + "\n", encoding="utf8")
    k += nb
    # frame de la composición en que cae el segundo `ini` de la locución: OFF_EN0 + (ini − OFF_S0)·30
    en_exacto = OFF_EN0 + (ini - OFF_S0) * 30
    en = int(-(-en_exacto // 1))  # `--en` es entero: se sube al frame siguiente y el resto va a `--desde` (segundos de la frase, ≥ 0)
    desde = (en - en_exacto) / 30
    r = subprocess.run(
        ["node", "manuales/edicion-video/scripts/trozos-editoriales.mjs", str(txt), str(js), "--en", str(en), "--desde", f"{desde:.4f}", "--s0", f"{a - ini:.3f}", "--audio", str(wav), "--prefijo", f"p{i}", "--tabla"],
        cwd=RAIZ, capture_output=True, text=True,
    )
    out = r.stdout
    if r.returncode != 0 or "sale en" not in out:
        print(f"// frase {i}: la herramienta falló ({r.returncode}): {r.stdout[:300]} {r.stderr[:300]}", file=sys.stderr)
    fin = next((j for j, l in enumerate(out.split("\n")) if re.match(r"^p\d+\d\d\s+sale en", l)), None)
    lineas = out.split("\n")
    codigo = lineas[1:fin] if lineas[0].startswith("·") else lineas[:fin]
    for l in codigo:
        # renumera los ids: p1-01 … → o01 …
        m = re.search(r'id: "p\d+(\d\d)"', l)
        if m:
            n_bloque += 1
            l = re.sub(r'id: "p\d+\d\d"', f'id: "o{n_bloque:02d}"', l)
        salida.append(l)
    avisos = [l for l in lineas if l.startswith("⚠️")]
    for av in avisos:
        print(f"// frase {i}: {av[:200]}", file=sys.stderr)
print("\n".join(salida))
print("o01  sale en 0")  # marca que espera armar-subtitulos.py
