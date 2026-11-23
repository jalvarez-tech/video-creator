"""Segunda pasada de Whisper con vocabulario del encuentro + dónde suena la voz por energía.

Uso (desde la raíz):
  uv run --with numpy proyectos/097/herramientas/segunda-pasada.py <medidas.json> <carpeta_videos> <salida_dir> <tmp_dir>

Por qué dos pasadas: con voces de niñas, ruido de sala y frases sueltas, Whisper
`small` sin contexto inventa palabras («Mi suyitoria mori servicio»). Con un
prompt del vocabulario acierta más, pero también puede meter palabras del prompt
donde no las hay. Se guardan las dos y se marca con ⚠ lo que no coincide.

La voz por energía: ventanas de 50 ms, umbral = suelo de ruido (percentil 10)
+ 15 dB y nunca por debajo de −48 dBFS; huecos de menos de 0,3 s se unen y
tramos de menos de 0,15 s se descartan. Es ACTIVIDAD SONORA, no solo habla:
risas, aplausos o música fuerte también cuentan.
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

PROMPT = (
    "Encuentro de Navidad de la Fundación Misericordia, Amor y Servicio, M.A.S., de Casa Sobre la Roca. "
    "Hablan niñas y niños. ¿Cuál es la cualidad más bonita de Dios? Bondadoso, misericordioso, compasivo, "
    "amoroso, fiel, justo, paciente, amable. Para esta Navidad quiero un regalo, una Biblia, a Cristo en mi vida. "
    "¡Feliz Navidad! ¡Gracias a Dios!"
)
MODELO = "archivos/whisper/ggml-small.bin"

medidas, videos, salida, tmp = (Path(a) for a in sys.argv[1:5])
salida.mkdir(parents=True, exist_ok=True)
tmp.mkdir(parents=True, exist_ok=True)


def tramos_voz(wav: Path, sr=16000):
    raw = np.fromfile(wav, dtype=np.int16)[22:]  # cabecera WAV de 44 bytes
    x = raw.astype(np.float32) / 32768
    n = int(0.05 * sr)
    if len(x) < n:
        return [], None, None
    v = x[: len(x) // n * n].reshape(-1, n)
    db = 20 * np.log10(np.sqrt((v ** 2).mean(1)) + 1e-9)
    suelo = float(np.percentile(db, 10))
    umbral = max(suelo + 15, -48)
    act = db > umbral
    tramos, ini = [], None
    for i, a in enumerate(act):
        if a and ini is None:
            ini = i
        if not a and ini is not None:
            tramos.append([ini * 0.05, i * 0.05]); ini = None
    if ini is not None:
        tramos.append([ini * 0.05, len(act) * 0.05])
    unidos = []
    for t in tramos:
        if unidos and t[0] - unidos[-1][1] < 0.3:
            unidos[-1][1] = t[1]
        else:
            unidos.append(t)
    unidos = [[round(a, 2), round(b, 2)] for a, b in unidos if b - a >= 0.15]
    return unidos, round(suelo, 1), round(float(db.max()), 1)


for m in json.loads(medidas.read_text()):
    nombre = Path(m["archivo"]).stem
    if (salida / f"{nombre}.voz.json").exists() and (salida / f"{nombre}.json").exists():
        continue  # ya hecho: se puede relanzar tras un fallo sin repetir Whisper
    wav = tmp / f"{nombre}.wav"
    # `-map 0:a:0`: los iPhone recientes guardan, además de la pista AAC, una de audio
    # espacial (APAC, 4 canales) que ffmpeg no decodifica; si la elige él, falla.
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(videos / m["archivo"]),
                    "-map", "0:a:0", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", str(wav)], check=True)
    voz, suelo, pico = tramos_voz(wav)
    base = salida / nombre
    subprocess.run(["whisper-cli", "-m", MODELO, "-f", str(wav), "-l", "es", "--prompt", PROMPT,
                    "-oj", "-of", str(base)], capture_output=True, check=True)
    (salida / f"{nombre}.voz.json").write_text(json.dumps({"tramos": voz, "suelo_dbfs": suelo, "pico_ventana_dbfs": pico}))
    print(f"{nombre}: voz {voz}  suelo {suelo} dBFS")
