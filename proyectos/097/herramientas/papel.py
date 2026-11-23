"""Textura de papel amarillo arrugado para el 097 (el fondo del cartel de MAS Estrellitas).

Uso (desde la raíz):
  uv run --with numpy --with pillow proyectos/097/herramientas/papel.py remotion/public/mas-097/papel.png

Por qué una imagen y no un filtro SVG en vivo: el papel cubre la pantalla entera en el CTA y
detrás de cada tira; una textura fija se pinta igual en cada frame y en cada máquina (semilla
fija), y un `feTurbulence` a 1080p se recalcula en cada fotograma.

Cómo se hace el arrugado: ruido suave de varias escalas → su gradiente iluminado desde arriba a
la izquierda da los pliegues (como un relieve), y encima un grano fino. La amplitud es pequeña
(la del cartel: σ de luma ≈ 1,5 %): el amarillo tiene que seguir leyéndose como el de la marca.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

ANCHO, ALTO = 2208, 1242  # 1920×1080 × 1,15: deja sitio a la deriva lenta del papel sin que se vea el borde
BASE = np.array([255, 228, 0], dtype=np.float32)  # #FFE400
rng = np.random.default_rng(97)


def ruido(escala: float) -> np.ndarray:
    w, h = max(2, int(ANCHO / escala)), max(2, int(ALTO / escala))
    r = Image.fromarray((rng.random((h, w)) * 255).astype(np.uint8)).resize((ANCHO, ALTO), Image.BICUBIC)
    r = r.filter(ImageFilter.GaussianBlur(radius=max(1.0, escala / 6)))
    a = np.asarray(r, dtype=np.float32) / 255.0
    return a - a.mean()


campo = ruido(260) * 1.0 + ruido(110) * 0.6 + ruido(40) * 0.35 + ruido(14) * 0.15
gy, gx = np.gradient(campo)
pliegue = -(gx * 0.7 + gy * 0.7)
pliegue /= np.abs(pliegue).max() + 1e-9
grano = rng.normal(0, 1, (ALTO, ANCHO)).astype(np.float32)
luz = 1.0 + 0.045 * pliegue + 0.012 * grano + 0.02 * campo
img = np.clip(BASE[None, None, :] * luz[:, :, None], 0, 255).astype(np.uint8)
# El canal azul del amarillo es 0: el arrugado solo vive en rojo y verde, como en el papel impreso.
Image.fromarray(img, "RGB").save(sys.argv[1], optimize=True)
print(sys.argv[1], ANCHO, ALTO, "σ luma ≈", round(float((0.299 * img[..., 0] + 0.587 * img[..., 1]).std() / 2.55), 2), "%")
