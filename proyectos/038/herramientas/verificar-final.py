#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""verificar-final.py — ¿la final es la imagen del render, con su audio SIN retraso y con el color bien etiquetado?

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/verificar-final.py <final.mp4> <render-mudo.mp4> <audio-del-render.wav>

Comprueba tres cosas (`montaje.md` §12, «Si SOLO cambia el audio» y R22):
  1. IMAGEN: el `framemd5` del vídeo DECODIFICADO de la final es el del render (la mezcla se hace con `-c:v copy`: no se recodifica nada), con el mismo recuento.
  2. AUDIO: el audio decodificado de la final contra el WAV del render, por correlación cruzada: el retraso tiene que ser 0 muestras (el AAC del render de Remotion
     llega 2048 muestras tarde; mezclado con el ffmpeg del sistema queda a 0) y el residuo, del orden del ruido del AAC (≈ −35 dB o menos).
  3. ETIQUETAS: BT.709 en las dos capas, la del contenedor (átomo `colr` nclx 1-1-1) y la del flujo H.264 (VUI), rango limitado.
Además, sonoridad (ebur128) y pico real de la final.
"""
import hashlib
import re
import subprocess
import sys

import numpy as np

final, render, wav = sys.argv[1:4]


def framemd5(ruta: str) -> tuple[str, int]:
    r = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-map", "0:v:0", "-f", "framemd5", "-"], capture_output=True, text=True, check=True).stdout
    lineas = [l for l in r.splitlines() if l and not l.startswith("#")]
    return hashlib.md5("\n".join(l.split(",")[-1].strip() for l in lineas).encode()).hexdigest(), len(lineas)


def pcm(ruta: str) -> np.ndarray:
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-map", "0:a:0", "-ac", "2", "-ar", "48000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).astype(np.float64)


ok = True
m1, n1 = framemd5(final)
m2, n2 = framemd5(render)
print(f"1 · imagen: final {n1} f md5 {m1[:12]} · render {n2} f md5 {m2[:12]} → {'IGUAL' if (m1 == m2 and n1 == n2 and n1 > 0) else 'DISTINTA'}")
ok &= m1 == m2 and n1 == n2 and n1 > 0

a = pcm(final)
b = pcm(wav)
n = min(len(a), len(b), 48000 * 12)
x, y = a[:n, 0], b[:n, 0]
mejor, lag = -1.0, 0
for l in range(-4096, 4097, 1):
    u = x[max(0, l) : n + min(0, l)]
    v = y[max(0, -l) : n - max(0, l) if l > 0 else n]
    k = min(len(u), len(v))
    c = float(np.dot(u[:k], v[:k]))
    if c > mejor:
        mejor, lag = c, l
x0 = x[max(0, lag) : n + min(0, lag)]
y0 = y[max(0, -lag) : max(0, -lag) + len(x0)]
k = min(len(x0), len(y0))
residuo = 20 * np.log10(np.sqrt(np.mean((x0[:k] - y0[:k]) ** 2)) / (np.sqrt(np.mean(y0[:k] ** 2)) + 1e-12) + 1e-12)
print(f"2 · audio: final {len(a)/48000:.3f} s · wav {len(b)/48000:.3f} s · retraso {lag:+d} muestras · residuo {residuo:.1f} dB (el ruido del AAC a 320k es ≈ −35 dB o menos)")
ok &= lag == 0 and residuo < -30

datos = open(final, "rb").read(200000)
colr = re.search(rb"colr(nclx)(..)(..)(..)(.)", datos, re.S)
if colr:
    p, t, m = (int.from_bytes(colr.group(i), "big") for i in (2, 3, 4))
    print(f"3 · etiquetas: átomo colr nclx {p}-{t}-{m}, rango {'completo' if colr.group(5)[0] & 0x80 else 'limitado'}")
    ok &= (p, t, m) == (1, 1, 1)
else:
    print("3 · etiquetas: SIN átomo colr")
    ok = False
s = subprocess.run(
    ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=color_space,color_transfer,color_primaries,color_range,pix_fmt,width,height,r_frame_rate,nb_frames", "-of", "default=nw=1", final],
    capture_output=True,
    text=True,
).stdout.split()
print("   flujo H.264 (VUI): " + " · ".join(s))
ok &= all(f"{k}=bt709" in s for k in ("color_space", "color_transfer", "color_primaries")) and "color_range=tv" in s

e = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-i", final, "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
i = re.findall(r"I:\s+(-?[\d.]+) LUFS", e)[-1]
p = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", e)[-1]
print(f"4 · sonoridad de la final: {i} LUFS · pico real {p} dBFS")
print("TODO BIEN" if ok else "REVISAR")
sys.exit(0 if ok else 1)
