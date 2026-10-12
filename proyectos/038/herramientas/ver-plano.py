#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""ver-plano.py — el RECORTE 9:16 real de un tramo (no el cuadro entero): n fotogramas de [t0, t1] con la ventana yendo de `c0` a `c1`.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/ver-plano.py <clip> <salida.jpg> --t0 0 --t1 2 --c0 0.45 [--c1 0.45] [--n 5] [--alto 1.0]
  (varios planos en una hoja: repite la orden con `--hoja` y los cuatro argumentos de cada uno: ver --help)

`c0`/`c1` = centro de la ventana como fracción del ANCHO del clip (a mano, como `MANUAL` de `encuadre.py`). Sirve para mirar el borde de cada
plano (placas, teles encendidas, inodoros, destellos) y su ÚLTIMO fotograma (que no entre en algo oscuro) con la ventana que se va a usar.
"""
import argparse
import io
import subprocess

from PIL import Image, ImageDraw

a = argparse.ArgumentParser()
a.add_argument("clip")
a.add_argument("salida")
a.add_argument("--t0", type=float, required=True)
a.add_argument("--t1", type=float, required=True)
a.add_argument("--c0", type=float, required=True)
a.add_argument("--c1", type=float, default=None)
a.add_argument("--n", type=int, default=5)
a.add_argument("--alto", type=float, default=1.0)
a.add_argument("--ancho", type=int, default=216, help="ancho de cada recorte en la hoja")
x = a.parse_args()
c1 = x.c0 if x.c1 is None else x.c1

tiles = []
for k in range(x.n):
    u = k / max(1, x.n - 1)
    t = x.t0 + u * (x.t1 - x.t0)
    c = x.c0 + u * (c1 - x.c0)
    png = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", x.clip, "-frames:v", "1", "-vf", "scale=1920:-2", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True,
    ).stdout
    if not png:
        continue
    im = Image.open(io.BytesIO(png)).convert("RGB")
    W, H = im.size
    oh = H * x.alto
    ow = oh * 9 / 16
    x0 = max(0, min(W - ow, c * W - ow / 2))
    y0 = (H - oh) / 2
    crop = im.crop((int(x0), int(y0), int(x0 + ow), int(y0 + oh)))
    crop = crop.resize((x.ancho, int(x.ancho * 16 / 9)), Image.LANCZOS)
    d = ImageDraw.Draw(crop)
    d.rectangle((0, 0, 92, 14), fill=(0, 0, 0))
    d.text((3, 2), f"{t:.2f}s c={c:.2f}", fill=(255, 255, 0))
    tiles.append(crop)
w, h = tiles[0].size
hoja = Image.new("RGB", (w * len(tiles), h), (0, 0, 0))
for i, t in enumerate(tiles):
    hoja.paste(t, (i * w, 0))
hoja.save(x.salida, quality=88)
print(x.salida)
