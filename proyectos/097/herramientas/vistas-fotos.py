"""Vista reducida de cada foto y hojas de contacto numeradas, para mirarlas.

Uso (desde la raíz):
  uv run --with pillow --with pillow-heif proyectos/097/herramientas/vistas-fotos.py <medidas-fotos.json> <carpeta_fotos> <salida_dir>

Deja en <salida_dir>:
  · FTNN-<archivo>.jpg, 1280 px de lado largo, ya girada y pasada a sRGB;
  · hoja-1.jpg, hoja-2.jpg…, de 24 en 24, con el código y la hora encima.
Los vídeos sueltos (MP4/MOV) se saltan: su hoja de fotogramas va aparte.

Por qué sRGB: el iPhone guarda en Display P3 y las herramientas que miran la vista
(y el navegador) la leerían apagada o pasada de color. Solo se usa la imagen base
SDR; el gain map HDR se ignora, así que la vista NO sirve para juzgar el HDR.
"""
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()

medidas, fotos, salida = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
salida.mkdir(parents=True, exist_ok=True)
LADO, CELDA, COLS, POR_HOJA = 1280, 360, 6, 24
FUENTE = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 26)
SRGB = ImageCms.createProfile("sRGB")


def a_srgb(im: Image.Image) -> Image.Image:
    p = im.info.get("icc_profile")
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    if p:
        try:
            im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(p)), SRGB, outputMode="RGB")
        except Exception:
            pass
    return im.convert("RGB")


miniaturas = []
for m in json.loads(medidas.read_text()):
    if m["tipo"] != "foto":
        continue
    with Image.open(fotos / m["archivo"]) as im:
        im = a_srgb(im)
    im.thumbnail((LADO, LADO), Image.LANCZOS)
    nombre = f'{m["codigo"]}-{Path(m["archivo"]).stem}{"-jpg" if m["archivo"].lower().endswith(".jpg") else ""}.jpg'
    im.save(salida / nombre, quality=85)
    t = im.copy()
    t.thumbnail((CELDA, CELDA), Image.LANCZOS)
    miniaturas.append((m, t))
    print(nombre, im.size)

# Celdas cuadradas con la foto centrada: verticales y horizontales caben igual y
# el rótulo arriba no tapa la imagen.
for h in range(0, len(miniaturas), POR_HOJA):
    tanda = miniaturas[h:h + POR_HOJA]
    filas = (len(tanda) + COLS - 1) // COLS
    alto_celda = CELDA + 40
    hoja = Image.new("RGB", (COLS * CELDA, filas * alto_celda), (24, 24, 24))
    d = ImageDraw.Draw(hoja)
    for i, (m, t) in enumerate(tanda):
        x, y = (i % COLS) * CELDA, (i // COLS) * alto_celda
        hoja.paste(t, (x + (CELDA - t.width) // 2, y + 40 + (CELDA - t.height) // 2))
        etiqueta = f'{m["codigo"]} {m["hora"][:5]} {Path(m["archivo"]).stem[-4:]}{" jpg" if m["archivo"].lower().endswith(".jpg") else ""}'
        d.text((x + 8, y + 6), etiqueta, font=FUENTE, fill=(255, 228, 0))
    ruta = salida / f"hoja-{h // POR_HOJA + 1}.jpg"
    hoja.save(ruta, quality=85)
    print(ruta, hoja.size)
