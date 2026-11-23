"""fotos-9x16.py — HEIC del iPhone → JPG sRGB recortado a 9:16, SIN EXIF (los HEIC llevan el GPS de la casa).

Uso (lo llama `proyectos/101/normalizar.mjs`; desde la raíz):
  uv run --with pillow --with pillow-heif proyectos/101/herramientas/fotos-9x16.py <entrada.heic> <salida.jpg> <x> [--sombras 0.0]

  · <x>: fracción del ancho (ya girada la foto) donde CENTRAR la franja 9:16 de todo el alto.
  · --sombras: levanta las sombras (0-1) con una curva suave; sin el gain map, los contraluces salen oscuros.
Sale a 1296×2304 (1080 × 1,2: el techo del acercamiento) en sRGB, calidad 92, sin EXIF, sin XMP y sin más perfil que sRGB.
Es `proyectos/098/herramientas/fotos.py` con la franja en vertical: por qué sRGB y por qué sin gain map, allí.
"""
import argparse
import io

from PIL import Image, ImageCms, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
SRGB = ImageCms.createProfile("sRGB")
ANCHO, ALTO = 1296, 2304


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("entrada")
    ap.add_argument("salida")
    ap.add_argument("x", type=float)
    ap.add_argument("--sombras", type=float, default=0.0)
    a = ap.parse_args()

    with Image.open(a.entrada) as im:
        perfil = im.info.get("icc_profile")
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        if perfil:
            im = ImageCms.profileToProfile(im, ImageCms.ImageCmsProfile(io.BytesIO(perfil)), SRGB, outputMode="RGB")
    w, h = im.size
    ancho = round(h * 9 / 16)
    if ancho > w:
        raise SystemExit(f"la foto ({w}×{h}) es más estrecha que 9:16")
    x0 = min(max(0, round(a.x * w - ancho / 2)), w - ancho)
    im = im.crop((x0, 0, x0 + ancho, h)).resize((ANCHO, ALTO), Image.LANCZOS)
    if a.sombras > 0:
        s = a.sombras
        lut = [min(255, round(255 * (v / 255 + s * (v / 255) * (1 - v / 255) ** 2))) for v in range(256)]
        im = im.point(lut * 3)
    im.save(a.salida, "JPEG", quality=92, optimize=True)
    print(f"{a.salida}: {ANCHO}×{ALTO}, franja 9:16 centrada en el {round(a.x * 100)} % del ancho, sombras {a.sombras}")


if __name__ == "__main__":
    main()
