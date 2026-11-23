"""Los logos de MAS y Casa Sobre la Roca en ÍNDIGO liso, para el cierre del 097.

Uso (desde la raíz):
  uv run --with pillow --with numpy proyectos/097/herramientas/logos.py <logo-mas.webp> <logo-csr.png> <carpeta de salida>

Por qué índigo: sobre el papel amarillo de la campaña, el logo de Casa Sobre la Roca (blanco) y los
círculos verde-lima del de MAS no se ven. El cartel de MAS Estrellitas 2026 ya los usa así, en índigo
liso (#382A74) con un filete entre los dos. Se conserva la FORMA exacta (el alfa del original) y solo
cambia el color; no se reescala aquí (eso lo hace el navegador, a menos de ×1,1).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

INDIGO = (0x38, 0x2A, 0x74)
salida = Path(sys.argv[3])
for origen, nombre in [(sys.argv[1], "logo-mas-indigo.png"), (sys.argv[2], "logo-csr-indigo.png")]:
    a = np.asarray(Image.open(origen).convert("RGBA"))
    out = np.zeros_like(a)
    out[..., 0], out[..., 1], out[..., 2] = INDIGO
    out[..., 3] = a[..., 3]
    Image.fromarray(out, "RGBA").save(salida / nombre)
    print(nombre, a.shape[1], "×", a.shape[0])
