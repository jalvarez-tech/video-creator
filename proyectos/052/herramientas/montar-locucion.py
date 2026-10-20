#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
"""
montar-locucion.py — junta las 10 frases que genera `elevenlabs.py guion` en UNA locución (`off.wav`, mono 48 kHz, sin tratar) con las pausas del original.

Uso (desde la raíz del repo):
  uv run proyectos/052/herramientas/montar-locucion.py proyectos/052/voz/off-partes proyectos/052/original/off.wav

POR QUÉ. ElevenLabs devuelve cada frase con su propio silencio de cola (distinto en cada una). El original de 02.mp4 casi no respira entre frases (0,1-0,7 s) salvo dos pausas largas, tras «espacios para compartir.» (≈ 1,2 s) y tras «¿…si no puedes disfrutarlo?» (≈ 1,7 s: es donde aparece Isabella caminando). Aquí se recorta el silencio de cada frase (energía a −48 dBFS) y se pone la pausa DE ESTA TABLA entre una frase y la siguiente, con 40 ms de aire delante de cada una.
Imprime el segundo de cada frase (primera y última sílaba por energía) en la locución montada: es el reloj de los planos y de los subtítulos.
"""
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

PAUSAS = [0.25, 0.45, 0.40, 0.45, 0.50, 0.70, 1.10, 1.50, 0.50]  # tras la frase i (la última no lleva)
SR = 48000
AIRE = 0.04  # s de aire que se deja delante y detrás de cada frase recortada
UMBRAL_DB = -48.0

partes = sorted(Path(sys.argv[1]).glob("[0-9][0-9][0-9]-*.mp3"))
salida = Path(sys.argv[2])
if len(partes) != len(PAUSAS) + 1:
    sys.exit(f"hay {len(partes)} frases y la tabla de pausas espera {len(PAUSAS) + 1}")


def decodifica(mp3: Path) -> np.ndarray:
    r = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(mp3), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.float32)


def recorta(x: np.ndarray) -> np.ndarray:
    v = int(0.010 * SR)
    n = len(x) // v
    rms = np.sqrt((x[: n * v].reshape(n, v) ** 2).mean(axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    idx = np.where(db > UMBRAL_DB)[0]
    a = max(0, idx[0] * v - int(AIRE * SR))
    b = min(len(x), (idx[-1] + 1) * v + int(AIRE * SR))
    return x[a:b]


trozos, tabla, t = [], [], 0.0
for i, p in enumerate(partes):
    x = recorta(decodifica(p))
    trozos.append(x)
    tabla.append((p.stem, t + AIRE, t + len(x) / SR - AIRE))
    t += len(x) / SR
    if i < len(PAUSAS):
        trozos.append(np.zeros(int(PAUSAS[i] * SR), dtype=np.float32))
        t += PAUSAS[i]
trozos.append(np.zeros(int(1.0 * SR), dtype=np.float32))  # 1 s de silencio detrás: el tramo de audio del plan lee hasta 12 f tras la última palabra y su fundido de salida
y = np.concatenate(trozos)
salida.parent.mkdir(parents=True, exist_ok=True)
sf.write(salida, y, SR, subtype="PCM_16")
print(f"{salida} · {len(y) / SR:.2f} s · pico {20 * np.log10(np.abs(y).max()):.1f} dBFS")
for nombre, a, b in tabla:
    print(f"  {nombre:10} {a:7.2f} - {b:7.2f} s  ({b - a:5.2f} s)")
