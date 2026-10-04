#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
antes-despues.py — un panel «antes / después» de los MISMOS fotogramas de dos tandas de stills.

Uso (desde la raíz del repo):
  uv run proyectos/017/herramientas/antes-despues.py <carpeta_antes> <carpeta_despues> <panel.png> <f1,f2,…> [ancho_px=190] [columnas=6]

Cada carpeta trae `Recorrido017-fNNNNN.png` (los deja `stills-multiples.mjs`). El panel pone, por cada
grupo de `columnas` fotogramas, una fila de ANTES y debajo la de DESPUÉS, con su número de fotograma.
Es un entregable: las etiquetas tienen que ser ciertas, así que un fotograma que falte en una de las dos
carpetas es un error, no un hueco.

La comparación es honesta solo si las dos tandas salen del MISMO código salvo lo que se compara y del
mismo backend de GL (`stills-multiples.mjs … angle` en las dos): `--gl` mueve unos niveles el DOM.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def cargar(carpeta: Path, f: int, ancho: int) -> Image.Image:
    ruta = carpeta / f"Recorrido017-f{f:05d}.png"
    if not ruta.exists():
        sys.exit(f"falta {ruta}")
    im = Image.open(ruta).convert("RGB")
    alto = round(ancho * im.height / im.width)
    return im.resize((ancho, alto), Image.LANCZOS)


def main() -> None:
    if len(sys.argv) < 5:
        sys.exit(__doc__)
    antes, despues, salida = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
    frames = [int(x) for x in sys.argv[4].split(",")]
    ancho = int(sys.argv[5]) if len(sys.argv) > 5 else 190
    cols = int(sys.argv[6]) if len(sys.argv) > 6 else 6

    primera = cargar(antes, frames[0], ancho)
    alto = primera.height
    marco, rotulo = 4, 22
    grupos = [frames[i : i + cols] for i in range(0, len(frames), cols)]
    ancho_hoja = cols * (ancho + marco) + marco
    alto_grupo = 2 * (alto + rotulo + marco)
    hoja = Image.new("RGB", (ancho_hoja, len(grupos) * alto_grupo + marco), (15, 15, 15))
    d = ImageDraw.Draw(hoja)
    try:
        letra = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 15)
    except OSError:
        letra = ImageFont.load_default()
    for g, grupo in enumerate(grupos):
        y0 = marco + g * alto_grupo
        for i, f in enumerate(grupo):
            x = marco + i * (ancho + marco)
            for fila, (nombre, carpeta) in enumerate((("antes", antes), ("después", despues))):
                y = y0 + fila * (alto + rotulo + marco)
                d.text((x + 2, y + 2), f"f{f} · {nombre}", fill=(235, 235, 235), font=letra)
                hoja.paste(cargar(carpeta, f, ancho), (x, y + rotulo))
    hoja.save(salida)
    print(f"{salida}: {len(frames)} fotogramas, {hoja.width}×{hoja.height}")


if __name__ == "__main__":
    main()
