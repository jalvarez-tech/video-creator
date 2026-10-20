#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "soundfile", "scipy"]
# ///
"""
voz-guia.py — una VOZ GUÍA de la locución del 051, con la voz de sistema de macOS (gratis, local), para montar y enseñar la prueba
mientras el usuario decide cómo se consigue la locución de verdad (reparto §3). NO ES LA VOZ FINAL: la puerta con `--final` falla
mientras `off.wav` sea esta (la marca `VOZ_GUIA` de `audio-051.ts`).

Qué hace: dice cada frase de la locución con `say -v Paulina` a una velocidad que la deja tan larga como en el original (`videos
editados/01.mp4`, medida con whisper: cuándo empieza y acaba cada frase), recorta su silencio y la coloca en el segundo en que
EMPEZABA en el original, sobre una pista de la duración de la pieza. Así la imagen —que sigue el ritmo del original— cae donde
la voz de una persona habría caído. Imprime dónde habla cada frase en la pista (s0, s1).

Uso (desde la raíz del repo):
  uv run proyectos/051/herramientas/voz-guia.py
"""
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf

RAIZ = Path(__file__).resolve().parents[3]
SALIDA = RAIZ / "proyectos" / "051" / "voz" / "guia"
SR = 48000
VOZ = "Paulina"
DURACION = 64.5  # s de la pista guía (lo que dura el original, 64,0 s, y un poco más)

# (id, segundo en que empieza en el original, segundo en que acaba, texto)
FRASES = [
    ("o1", 4.8, 14.2, "Este espectacular apartamento de 113 metros, ubicado en Las Palmas, combina amplitud, comodidad y naturaleza en un solo lugar."),
    ("o2", 15.2, 22.7, "Cuenta con dos habitaciones, dos baños, una amplia sala comedor, cocina integral y zona de ropas con lavadora y secadora."),
    ("o3", 22.7, 34.6, "Y uno de sus mayores diferenciales está aquí: un balcón con jacuzzi privado, perfecto para relajarte, disfrutar una copa de vino o simplemente regalarte un momento de tranquilidad."),
    ("o4", 39.6, 50.3, "Además, el proyecto cuenta con piscina, gimnasio, zonas húmedas, coworking, cancha de squash, Spa Romano, zona de barbecue y muchos espacios de bienestar."),
    ("o5", 52.4, 57.4, "Todo esto en Las Palmas, uno de los sectores más privilegiados de Medellín."),
    ("o6", 59.5, 63.9, "Escríbeme, agenda tu visita y descubre lo que es vivir con tu propio jacuzzi privado."),
]


def dice(texto: str, ppm: int) -> np.ndarray:
    with tempfile.TemporaryDirectory() as d:
        aiff, wav = Path(d) / "x.aiff", Path(d) / "x.wav"
        subprocess.run(["say", "-v", VOZ, "-r", str(ppm), "-o", str(aiff), texto], check=True)
        subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", str(aiff), "-ar", str(SR), "-ac", "1", str(wav)], check=True)
        x, _ = sf.read(wav)
    # recorta el silencio de los extremos (umbral −45 dBFS)
    ac = np.abs(x)
    idx = np.where(ac > 10 ** (-45 / 20))[0]
    return x[idx[0] : idx[-1] + 1]


pista = np.zeros(int(DURACION * SR))
SALIDA.mkdir(parents=True, exist_ok=True)
for ident, ini, fin, texto in FRASES:
    objetivo = fin - ini
    ppm = 175
    for _ in range(4):  # el ritmo no es lineal: se corrige hasta que la frase dura lo que duraba
        x = dice(texto, ppm)
        d = len(x) / SR
        nuevo = int(round(ppm * d / objetivo))
        if abs(d - objetivo) < 0.15 or nuevo == ppm:
            break
        ppm = nuevo
    a = int(round(ini * SR))
    pista[a : a + len(x)] += x
    print(f"{ident}: {ppm} ppm · dura {len(x) / SR:.2f} s (original {objetivo:.1f} s) · habla de {ini:.2f} a {ini + len(x) / SR:.2f} s")
pico = np.abs(pista).max()
sf.write(SALIDA / "off-guia.wav", pista / max(pico, 1e-9) * 0.5, SR, subtype="PCM_16")
print(f"→ {SALIDA / 'off-guia.wav'} ({DURACION} s, mono 48 kHz)")
