"""Hoja de fotogramas por vídeo, con el segundo de cada uno escrito encima.

Uso (desde la raíz): uv run --with pillow proyectos/097/herramientas/hojas.py <medidas.json> <carpeta_videos> <salida_dir>

Muestreo: un fotograma por segundo hasta 24 s; en los más largos, 24 repartidos
(el primero en 0,2 s para no caer en el negro de arranque). Se mira con el HDR
sin convertir (HLG sin tonemap: sale algo apagado, vale para describir, NO para
juzgar el color). ffmpeg aplica solo la rotación del metadato.
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

medidas, videos, salida = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
salida.mkdir(parents=True, exist_ok=True)
FUENTE = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)
ANCHO, COLS, MAX = 480, 6, 24

for m in json.loads(medidas.read_text()):
    # Los verticales van más estrechos y en más columnas: con 480 px y 6 columnas la
    # hoja sale casi cuadrada de 3.400 px de alto y, al reducirla para mirarla, cada
    # fotograma queda demasiado pequeño para leer caras y gestos.
    if m["alto"] > m["ancho"]:
        ANCHO, COLS = 300, 8
    else:
        ANCHO, COLS = 480, 6
    dur = m["duracion"]
    n = max(1, min(MAX, int(dur)))
    if dur <= MAX:
        tiempos = [min(0.2 + i, dur - 0.05) for i in range(n)]
    else:
        paso = (dur - 0.4) / (MAX - 1)
        tiempos = [0.2 + i * paso for i in range(MAX)]
    tiles = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, t in enumerate(tiempos):
            dst = Path(tmp) / f"{i:03d}.jpg"
            subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(videos / m["archivo"]),
                            "-frames:v", "1", "-vf", f"scale={ANCHO}:-2", "-q:v", "3", "-y", str(dst)], check=True)
            if dst.exists():
                im = Image.open(dst).convert("RGB")
                d = ImageDraw.Draw(im)
                etiqueta = f"{t:5.1f} s"
                d.rectangle((0, 0, 92, 30), fill=(0, 0, 0))
                d.text((6, 3), etiqueta, fill="white", font=FUENTE)
                tiles.append(im)
    if not tiles:
        print("sin fotogramas:", m["archivo"])
        continue
    h = tiles[0].height
    filas = (len(tiles) + COLS - 1) // COLS
    cols = min(COLS, len(tiles))
    hoja = Image.new("RGB", (cols * ANCHO + (cols - 1) * 4, filas * h + (filas - 1) * 4), "black")
    for i, im in enumerate(tiles):
        hoja.paste(im, ((i % COLS) * (ANCHO + 4), (i // COLS) * (h + 4)))
    hoja.save(salida / (Path(m["archivo"]).stem + ".jpg"), quality=82)
    print(f"{m['archivo']}: {len(tiles)} fotogramas")
