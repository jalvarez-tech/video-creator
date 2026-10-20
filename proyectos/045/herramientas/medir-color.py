#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
medir-color.py — el color del 045 (Tierra Grata, V27, «El tiempo»), MEDIDO: antes y después de graduarlo, plano a plano.

Uso (desde la raíz del repo; las dos carpetas las deja `stills-multiples.mjs … angle`):
  uv run proyectos/045/herramientas/medir-color.py <carpeta_antes> <carpeta_despues>

Mide, sobre PNG sin códec de por medio y sin la franja de subtítulos (el 72 % de arriba):
  1. por plano (un fotograma a mitad de cada uno): luma media y sus percentiles 5/50/95, saturación
     media (HSV), el balance R/G y B/G, el % de píxeles quemados (≥ 250 en algún canal) y el de
     aplastados (luma ≤ 8). Y la DISPERSIÓN de luma y saturación entre planos: «balanceado» es que
     los planos se parezcan entre sí, no que cada uno sea «bonito».
  2. los EMPALMES: el salto de luma media entre el último fotograma de un plano y el primero del
     siguiente. En el corte seco que cae en un pulso de la música un salto grande se lee como un
     parpadeo; aquí solo se miran los cortes SECOS (los que entran disolviendo mezclan los dos planos durante 12 f y no saltan).
  3. la PIEL de Isabella (tres cajas a mano, una por toma): tono, saturación y valor de los píxeles
     de piel (máscara YCbCr clásica). El tono no tiene que moverse: se quiere más vida, no otra piel.

Los fotogramas y las cajas son los de este montaje (`stills-multiples.mjs … 50,180,295,…`): a mitad de
cada plano, y el último y el primero de cada corte seco. Si cambia el montaje, hay que cambiar `PLANOS`,
`EMPALMES` y `CAJAS`. Las cajas se ubican a mano sobre el fotograma (frente y mejillas, sin pelo ni ojos).
"""
import colorsys
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

# fotograma a mitad de cada plano → su nombre (con texto en pantalla: la franja de subtítulos no cuenta, `estadisticas` mide el 72 % de arriba)
PLANOS = {
    55: "c01 apertura (RC01)",
    220: "c02 hook (HK01)",
    363: "c03 Social Kitchen (RC11)",
    467: "c04 gimnasio (RC13)",
    572: "c05 piscina (RC16)",
    696: "c06 mitad (MD01)",
    816: "c07 alcoba (RC05)",
    904: "c08 baño (RC09)",
    1030: "c09 vista (RC21)",
    1180: "c10 cta (CT01)",
}
# Los cambios de plano que son cortes SECOS (los dos que entran disolviendo —c02 y c03— mezclan los dos planos durante 12 f y no saltan): el último fotograma de un plano y el primero del siguiente.
EMPALMES: list[tuple[int, int, str]] = [
    (413, 414, "c03→c04 (Social Kitchen → gimnasio)"),
    (520, 521, "c04→c05 (gimnasio → piscina)"),
    (622, 623, "c05→c06 (piscina → mitad)"),
    (768, 769, "c06→c07 (mitad → alcoba)"),
    (862, 863, "c07→c08 (alcoba → baño)"),
    (944, 945, "c08→c09 (baño → vista)"),
    (1113, 1114, "c09→c10 (vista → cta)"),
]
# La PIEL: la caja de cada fotograma sale de la cara que ve Vision sobre ESE still (`seguir-sujeto.swift` sobre la carpeta de «después»,
# guardado en `proyectos/045/medidas/caras-stills1080.json`): el centro de la cara (frente y mejillas, sin pelo ni ojos).
def _cajas() -> dict[int, tuple]:
    ruta = Path(__file__).resolve().parents[1] / "medidas" / "caras-stills1080.json"
    cajas: dict[int, tuple] = {}
    if not ruta.exists():
        return cajas
    for fila in json.loads(ruta.read_text()):
        if fila["cara"] is None:
            continue
        f = int(fila["f"].split("-f")[1].split(".")[0])
        if f not in PLANOS:
            continue
        x, y, w, h = fila["cara"]
        cajas[f] = (x + 0.2 * w, y + 0.3 * h, x + 0.8 * w, y + 0.8 * h)
    return cajas


CAJAS = _cajas()


def abre(carpeta: Path, f: int) -> np.ndarray:
    ruta = carpeta / f"Recorrido045-f{f:05d}.png"
    if not ruta.exists():
        sys.exit(f"falta {ruta}")
    return np.asarray(Image.open(ruta).convert("RGB"), dtype=float)


def luma(a: np.ndarray) -> np.ndarray:
    return 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]


def estadisticas(a: np.ndarray) -> dict:
    a = a[: int(a.shape[0] * 0.72)]
    y = luma(a)
    mx, mn = a.max(axis=2), a.min(axis=2)
    m = a.mean(axis=(0, 1))
    p5, p50, p95 = np.percentile(y, [5, 50, 95])
    return dict(
        luma=y.mean(), p5=p5, p50=p50, p95=p95,
        sat=float(np.mean((mx - mn) / np.maximum(mx, 1))),
        rg=m[0] / m[1], bg=m[2] / m[1],
        quemado=100 * float(np.mean(mx >= 250)), aplastado=100 * float(np.mean(y <= 8)),
    )


def piel(a: np.ndarray, caja: tuple) -> dict | None:
    h, w = a.shape[:2]
    x0, y0, x1, y1 = caja
    c = a[int(y0 * h) : int(y1 * h), int(x0 * w) : int(x1 * w)]
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    y = 0.299 * r + 0.587 * g + 0.114 * b
    cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b
    cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b
    mascara = (cb >= 77) & (cb <= 127) & (cr >= 133) & (cr <= 173) & (y > 70)
    if mascara.sum() < 20:
        return None
    m = c[mascara].mean(axis=0)
    tono, sat, val = colorsys.rgb_to_hsv(*(m / 255))
    return dict(n=int(mascara.sum()), tono=tono * 360, sat=sat, val=val, y=float(y[mascara].mean()))


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    antes, despues = Path(sys.argv[1]), Path(sys.argv[2])

    print("1 · por plano (a mitad de cada uno)")
    cab = f"  {'plano':20s} {'':8s} {'luma':>6s} {'p5':>4s} {'p50':>4s} {'p95':>4s} | {'sat':>5s} | {'R/G':>5s} {'B/G':>5s} | {'≥250':>5s} {'≤8':>5s}"
    print(cab)
    tanda: dict[str, list[dict]] = {"antes": [], "después": []}
    for f, nombre in PLANOS.items():
        for etiqueta, carpeta in (("antes", antes), ("después", despues)):
            e = estadisticas(abre(carpeta, f))
            tanda[etiqueta].append(e)
            print(f"  {nombre:20s} {etiqueta:8s} {e['luma']:6.1f} {e['p5']:4.0f} {e['p50']:4.0f} {e['p95']:4.0f} | {e['sat']:5.3f} | {e['rg']:5.2f} {e['bg']:5.2f} | {e['quemado']:4.1f}% {e['aplastado']:4.1f}%")
    print("\n  entre planos (σ = dispersión; menos es más balanceado):")
    for etiqueta, filas in tanda.items():
        yl = np.array([x["luma"] for x in filas])
        sa = np.array([x["sat"] for x in filas])
        p5 = np.array([x["p5"] for x in filas])
        p95 = np.array([x["p95"] for x in filas])
        print(f"  {etiqueta:8s} luma media {yl.mean():5.1f} (σ {yl.std():4.1f}) · saturación media {sa.mean():.3f} (σ {sa.std():.3f}) · p5 medio {p5.mean():4.1f} · p95 medio {p95.mean():5.1f} · quemado máx {max(x['quemado'] for x in filas):.1f}% · aplastado máx {max(x['aplastado'] for x in filas):.1f}%")

    print("\n2 · empalmes: salto de luma media (último fotograma de un plano → primero del siguiente)")
    for a, b, que in EMPALMES:
        saltos = {}
        for etiqueta, carpeta in (("antes", antes), ("después", despues)):
            saltos[etiqueta] = estadisticas(abre(carpeta, b))["luma"] - estadisticas(abre(carpeta, a))["luma"]
        print(f"  f{a}→f{b}  {que}:  antes {saltos['antes']:+6.1f} · después {saltos['después']:+6.1f}")

    print("\n3 · la piel de Isabella (tono en grados, saturación y valor HSV de los píxeles de piel)")
    for f, caja in CAJAS.items():
        for etiqueta, carpeta in (("antes", antes), ("después", despues)):
            p = piel(abre(carpeta, f), caja)
            if p is None:
                print(f"  f{f} {PLANOS.get(f, 'Isabella'):20s} {etiqueta:8s} (sin píxeles de piel en la caja)")
            else:
                print(f"  f{f} {PLANOS.get(f, 'Isabella'):20s} {etiqueta:8s} {p['n']:5d} px · tono {p['tono']:5.1f}° · sat {p['sat']:.2f} · val {p['val']:.2f} · luma {p['y']:5.1f}")


if __name__ == "__main__":
    main()
