#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""
alinea-renders.py — ¿dos renders del mismo montaje enseñan el MISMO fotograma de la fuente en cada instante?

Uso (desde la raíz del repo):
  uv run proyectos/025/herramientas/alinea-renders.py <render_A.mp4> <render_B.mp4>

Para cada fotograma t de B se calcula la correlación (Pearson, sobre la luma reducida a 270×480) con los
fotogramas t−3…t+3 de A. Si B es A con otro COLOR —lo que cambia la revisión 7: los planos pasan de
`<OffthreadVideo>` a `<Video>` + `colorCorrection()`—, la correlación es máxima en el desplazamiento 0.
Un plano que el nuevo camino sacara un fotograma tarde o pronto (el `trimBefore`, el `playbackRate`, la
disolvencia) daría su máximo en ±1, y un ojo no lo ve: un salto de un fotograma en un travelling lento
es invisible, y por eso se mide.

La luma ya graduada NO es la misma que la original, pero la correlación sí aguanta una curva monótona;
no aguanta el desfase. Un plano casi quieto (la toma fija de Isabella) no discrimina ±1: ahí un desfase
tampoco se vería, así que solo se marca un fotograma si el máximo de ±1…3 le gana al 0 por más de 0,005.

Sale con 1 si algún plano da fotogramas desalineados.
"""
import subprocess
import sys

import numpy as np

ANCHO, ALTO = 270, 480
UMBRAL = 0.005  # cuánto tiene que ganarle el desfase al 0 para marcarlo
# plano → [primer fotograma, último+1] (el plan del 025; la tarjeta del cierre no se compara: es negro)
PLANOS = {
    "c02": (0, 151), "c03": (151, 233), "c04": (233, 293), "c05": (293, 352), "c06": (352, 424), "c07": (424, 560),
    "c08": (560, 622), "c09": (622, 712), "c10": (712, 771), "c11": (771, 881), "c12": (881, 959),
}


def luma(ruta: str) -> np.ndarray:
    crudo = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", ruta, "-an",
         "-vf", f"scale={ANCHO}:{ALTO}:flags=area", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(crudo, dtype=np.uint8).reshape(-1, ALTO * ANCHO)


def normaliza(x: np.ndarray) -> np.ndarray:
    x = x.astype(np.float32)
    x -= x.mean(axis=1, keepdims=True)
    n = np.linalg.norm(x, axis=1, keepdims=True)
    return x / np.maximum(n, 1e-6)


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    a, b = luma(sys.argv[1]), luma(sys.argv[2])
    if a.shape != b.shape:
        sys.exit(f"los dos renders no miden lo mismo: {a.shape[0]} y {b.shape[0]} fotogramas")
    n = a.shape[0]
    na, nb = normaliza(a), normaliza(b)
    desfases = range(-3, 4)
    # r[o][t] = correlación de B[t] con A[t+o] (−2 donde no existe ese fotograma de A)
    r = np.full((len(desfases), n), -2.0, dtype=np.float32)
    for k, o in enumerate(desfases):
        lo, hi = max(0, -o), min(n, n - o)
        r[k, lo:hi] = np.einsum("ij,ij->i", nb[lo:hi], na[lo + o : hi + o])
    cero = desfases.index(0)
    print(f"{n} fotogramas · correlación de cada fotograma de B con el de A en el MISMO instante\n")
    print(f"  {'plano':5s} {'f':>11s} {'r media':>8s} {'r mín':>7s} {'desalineados':>13s}")
    malos_total = 0
    for plano, (f0, f1) in PLANOS.items():
        sub = r[:, f0:f1]
        r0 = sub[cero]
        mejor = sub.max(axis=0)
        desalineado = (mejor - r0 > UMBRAL) & (sub.argmax(axis=0) != cero)
        malos = int(desalineado.sum())
        malos_total += malos
        marca = "" if not malos else "  ← " + ", ".join(f"f{f0 + i}({desfases[int(sub[:, i].argmax())]:+d})" for i in np.flatnonzero(desalineado)[:6])
        print(f"  {plano:5s} {f0:5d}-{f1 - 1:<5d} {r0.mean():8.4f} {r0.min():7.4f} {malos:13d}{marca}")
    print(f"\n{'❌' if malos_total else '✅'} {malos_total} fotogramas desalineados de {sum(f1 - f0 for f0, f1 in PLANOS.values())}")
    sys.exit(1 if malos_total else 0)


if __name__ == "__main__":
    main()
