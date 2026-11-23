"""fotos.py — HEIC del iPhone → JPG sRGB recortado a 16:9, SIN EXIF (los HEIC llevan el GPS de la casa).

Uso (lo llama `proyectos/098/normalizar.mjs`; desde la raíz):
  uv run --with pillow --with pillow-heif proyectos/098/herramientas/fotos.py <entrada.heic> <salida.jpg> <y> [--sombras 0.0]

  · <y>: fracción del alto (ya girada la foto) en la que EMPIEZA la franja 16:9 de todo el ancho (la del mapa de fotos).
  · --sombras: levanta las sombras (0-1) con una curva suave; sin el gain map, los contraluces salen oscuros.
Sale a 2304×1296 (1920 × 1,2: el techo del acercamiento) en sRGB, calidad 92, sin EXIF, sin XMP y sin perfil más que sRGB.

Por qué sRGB: el iPhone guarda en Display P3; Chrome (y Remotion) leería apagada o pasada de color una P3 sin gestionar.
Se usa la imagen base SDR: el gain map HDR se descarta, igual que el HLG de los vídeos se pasa a BT.709 (R21).
"""
import argparse
import io

from PIL import Image, ImageCms, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
SRGB = ImageCms.createProfile("sRGB")
ANCHO, ALTO = 2304, 1296


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("entrada")
    ap.add_argument("salida")
    ap.add_argument("y", type=float)
    ap.add_argument("--sombras", type=float, default=0.0)
    a = ap.parse_args()

    with Image.open(a.entrada) as im:
        perfil = im.info.get("icc_profile")
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        if perfil:
            im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(perfil)), SRGB, outputMode="RGB")
    w, h = im.size
    alto = round(w * 9 / 16)
    y0 = round(a.y * h)
    if y0 < 0 or y0 + alto > h:
        raise SystemExit(f"la franja {a.y} (alto {alto}) se sale de la foto ({w}×{h})")
    im = im.crop((0, y0, w, y0 + alto)).resize((ANCHO, ALTO), Image.LANCZOS)
    if a.sombras > 0:
        # Curva que solo levanta lo oscuro: v + s·v·(1−v)² (en 0-1), las luces casi no se mueven.
        s = a.sombras
        lut = [min(255, round(255 * (v / 255 + s * (v / 255) * (1 - v / 255) ** 2))) for v in range(256)]
        im = im.point(lut * 3)
    # Sin `exif=` ni `icc_profile=` de la original: el JPG sale limpio (sRGB es lo que el navegador supone).
    im.save(a.salida, "JPEG", quality=92, optimize=True)
    print(f"{a.salida}: {ANCHO}×{ALTO}, franja desde el {round(a.y * 100)} % del alto, sombras {a.sombras}")


if __name__ == "__main__":
    main()
