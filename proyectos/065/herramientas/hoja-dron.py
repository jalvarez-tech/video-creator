#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
hoja-dron.py — una hoja con un fotograma cada N segundos de un clip ORIGINAL de dron (con la rotación ya aplicada), con su hora cierta.

Sirve para decidir el TRAMO y el RECORTE de un dron apaisado antes de normalizar. Si se pasa `--ventana X` (0-1, la misma que el `recorte` de
`MATERIAL` en `normalizar.mjs`), cada casilla enseña SOLO la ventana 9:16 que quedaría (la caja vertical de alto completo) y, debajo de la hoja, nada más:
lo que cae fuera no se ve, que es lo que hay que mirar.

Uso (desde la raíz del repo):
  uv run proyectos/065/herramientas/hoja-dron.py proyectos/065/original/DR09.MP4 salida.png [paso_s=2.5] [columnas=6] [ancho_casilla=200] [--ventana 0.5] [--desde 0] [--hasta fin]
"""
import io
import subprocess
import sys

from PIL import Image, ImageDraw


def arg(nombre, defecto=None):
    if nombre in sys.argv:
        return sys.argv[sys.argv.index(nombre) + 1]
    return defecto


def main() -> None:
    pos = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and not sys.argv[i - 1].startswith("--")]
    if len(pos) < 2:
        sys.exit(__doc__)
    src, salida = pos[0], pos[1]
    paso = float(pos[2]) if len(pos) > 2 else 2.5
    cols = int(pos[3]) if len(pos) > 3 else 6
    ancho = int(pos[4]) if len(pos) > 4 else 200
    ventana = arg("--ventana")
    ventana = float(ventana) if ventana is not None else None
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", src], capture_output=True, check=True, text=True).stdout)
    desde = float(arg("--desde", 0))
    hasta = float(arg("--hasta", dur - 0.05))
    horas = []
    t = desde
    while t <= hasta + 1e-6:
        horas.append(t)
        t += paso
    casillas = []
    for t in horas:
        png = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", src, "-frames:v", "1", "-vf", "scale=1280:-2", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True, check=True).stdout
        im = Image.open(io.BytesIO(png)).convert("RGB")
        w, h = im.size
        if ventana is not None and w > h:
            vw = int(h * 9 / 16)
            x = int((w - vw) * ventana)
            im = im.crop((x, 0, x + vw, h))
        alto = int(ancho * im.size[1] / im.size[0])
        im = im.resize((ancho, alto), Image.LANCZOS)
        d = ImageDraw.Draw(im)
        d.rectangle((0, 0, 58, 14), fill=(0, 0, 0))
        d.text((3, 2), f"{t:5.1f}s", fill=(255, 255, 0))
        casillas.append(im)
    alto = max(c.size[1] for c in casillas)
    filas = (len(casillas) + cols - 1) // cols
    hoja = Image.new("RGB", (cols * ancho, filas * alto), (20, 20, 20))
    for i, c in enumerate(casillas):
        hoja.paste(c, ((i % cols) * ancho, (i // cols) * alto))
    hoja.save(salida)
    print(f"{salida}: {len(casillas)} casillas, {hoja.size[0]}x{hoja.size[1]}")


main()
