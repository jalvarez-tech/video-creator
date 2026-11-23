#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
verificar-prueba.py — lo que se OYE en la prueba del 098, medido sobre el render (no sobre el plan).

Uso (desde la raíz):
  uv run proyectos/098/herramientas/verificar-prueba.py proyectos/098/pruebas-720p/<nombre>

Lee <nombre>.mp4 (el audio masterizado) y <nombre>-mezcla.wav (la mezcla tal cual) y comprueba:
  1. el pico verdadero del .mp4 < −1 dBTP y el de muestra < −1 dBFS;
  2. la música NUNCA calla: en la mezcla, ninguna ventana de 250 ms por debajo de −55 dBFS antes del fundido final
     (los últimos 54 f); si la mezcla cae ahí, es que no suena nada;
  3. las voces PAREJAS: la sonoridad de cada ventana de voz medida (`voces-098.ts`) en la mezcla, y su dispersión (≤ 3 dB);
  4. ningún NOMBRE de niña: whisper sobre la mezcla entera, y se buscan los nombres de §7 de analisis-videos.md.
Sale con 1 si algo falla.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

SR = 48000
FPS = 30
base = Path(sys.argv[1])
mp4 = base.with_suffix(".mp4")
mezcla = Path(str(base) + "-mezcla.wav")
raiz = Path(__file__).resolve().parents[3]
errores = 0


def mal(m):
    global errores
    errores += 1
    print(f"❌ {m}")


def ebur(ruta, extra=None):
    args = ["ffmpeg", "-nostdin", "-hide_banner"] + (extra or []) + ["-i", str(ruta), "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"]
    r = subprocess.run(args, capture_output=True, text=True).stderr
    s = r[r.rfind("Summary:") :]
    i = re.search(r"I:\s+(-?[\d.]+) LUFS", s)
    p = re.search(r"Peak:\s+(-?[\d.]+) dBFS", s)
    return float(i.group(1)) if i else None, float(p.group(1)) if p else None


def pcm(ruta):
    # Sin `-ac 1`: el paso de estéreo a mono de ffmpeg suma los canales a −3 dB cada uno, y una voz que va igual por los
    # dos sale +3 dB más alta que en cualquiera de ellos (el primer intento midió un pico de +1,5 dBFS que no existe).
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(ruta), "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    canales = int(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=channels", "-of", "csv=p=0", str(ruta)], capture_output=True, text=True).stdout.strip())
    y = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    return y.reshape(-1, canales)


# 1 · picos
I, TP = ebur(mp4)
y_mp4 = pcm(mp4)
pico_muestra = 20 * np.log10(np.max(np.abs(y_mp4)) + 1e-12)  # el mayor de los dos canales
print(f"máster: {I} LUFS · pico verdadero {TP} dBTP · pico de muestra {pico_muestra:.2f} dBFS")
if TP is None or TP >= -1.0:
    mal(f"el pico verdadero ({TP} dBTP) no queda por debajo de −1 dBTP")
if pico_muestra >= -1.0:
    mal(f"el pico de muestra ({pico_muestra:.2f} dBFS) no queda por debajo de −1 dBFS")
Im, TPm = ebur(mezcla)
print(f"mezcla (sin masterizar): {Im} LUFS · pico {TPm} dBTP")

# 2 · la música nunca calla
y = pcm(mezcla)
dur_f = int(round(y.shape[0] / SR * FPS))
fin = (dur_f - 54) / FPS
win = int(0.25 * SR)
minimo, donde = 0.0, 0.0
for a in range(0, int(fin * SR) - win, win // 2):
    v = 20 * np.log10(np.sqrt(np.mean(y[a : a + win] ** 2)) + 1e-12)  # media de los dos canales
    if a == 0 or v < minimo:
        minimo, donde = v, a / SR
print(f"la mezcla, en su ventana de 250 ms más baja antes del fundido: {minimo:.1f} dBFS en {donde:.2f} s (f{round(donde * FPS)})")
if minimo < -55:
    mal(f"la mezcla cae a {minimo:.1f} dBFS en {donde:.2f} s: ahí no suena ni la música")

# 3 · voces parejas
ts = (raiz / "remotion/src/proyectos/098/voces-098.ts").read_text()
voces = json.loads(ts[ts.index("= {") + 2 : ts.rindex("}") + 1])
medidas = []
for vid, v in voces.items():
    if v["f0"] is None:
        continue
    a, b = v["f0"] / FPS, v["f1"] / FPS
    li, _ = ebur(mezcla, ["-ss", f"{a:.3f}", "-t", f"{b - a:.3f}"])
    medidas.append((vid, li))
    print(f"  {vid:16s} f{v['f0']}-f{v['f1']}: {li} LUFS (voz + música debajo)")
vals = [x for _, x in medidas if x is not None]
if vals:
    print(f"voces: de {min(vals):.1f} a {max(vals):.1f} LUFS (dispersión {max(vals) - min(vals):.1f} dB)")
    if max(vals) - min(vals) > 3:
        mal(f"las voces no quedan parejas: {max(vals) - min(vals):.1f} dB entre la más baja y la más alta")

# 4 · nombres
NOMBRES = ["melanie", "melania", "melanin", "ester", "esther", "saben", "sara", "juliana", "kailin", "steffi", "melky", "melchie"]
wav16 = Path(str(base) + "-16k.wav")
subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", str(mezcla), "-ac", "1", "-ar", "16000", str(wav16)], check=True)
js = Path(str(base) + "-whisper.json")
subprocess.run(["node", "manuales/edicion-video/scripts/transcribir.mjs", str(wav16), str(js), "es"], cwd=raiz, capture_output=True)
texto = ""
if js.exists():
    for s in json.loads(js.read_text()).get("transcription", []):
        texto += f"[{s['offsets']['from'] / 1000:.1f}] {s['text'].strip()}\n"
print("whisper sobre la mezcla:\n" + texto)
for n in NOMBRES:
    if re.search(rf"\b{n}\b", texto.lower()):
        mal(f"whisper oye «{n}» en la mezcla")
wav16.unlink(missing_ok=True)

print("")
if errores:
    print(f"❌ {errores} fallo(s)")
    sys.exit(1)
print("✅ la prueba pasa: picos, música de corrido, voces parejas y ningún nombre")
