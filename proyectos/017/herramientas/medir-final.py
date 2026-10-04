#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""
medir-final.py — ¿el COLOR de la final coincide con el del still del mismo fotograma? (R22)

Uso (desde la raíz del repo; los stills los deja `stills-multiples.mjs Recorrido017 1 <carpeta> <frames> angle`):
  uv run proyectos/017/herramientas/medir-final.py proyectos/017/finales/017-recorrido.mp4 <carpeta_stills> 30,145,259,…

De cada fotograma pedido compara, en RGB de 8 bits y a 1080×1920:
  · el STILL PNG que renderiza Remotion (`renderStill`, escala 1, `--gl=angle`), que no pasa por ningún códec, y
  · el MISMO fotograma del MP4, decodificado con `scale=…accurate_rnd+full_chroma_int+bitexact` (R22: el
    redondeo por defecto de swscale al pasar de rango limitado a RGB resta ~2 niveles en R, G y B y haría
    parecer peor al vídeo BT.709 de lo que es: una comparación de color sin esas banderas mide el decodificador).
Da el PSNR, el PSNR a BAJA FRECUENCIA (los dos reducidos ×8 con promedio de área), la diferencia de color
medio por canal y el error máximo. En la pieza de R22 (011) el BT.709 dio 41,7 dB. Aquí el efecto
`colorCorrection()` pasa antes por un canvas de WebGL: esta medida es la que dice que la final lleva el color
que se aprobó en la prueba.

POR QUÉ DOS PSNR. El PSNR bruto depende de cuánta textura tenga el fotograma, no solo del color: a CRF 16
un dron sobre un dosel de hojas (f30 del 017) da 35,3 dB y una pared lisa 41,5, y los dos tienen el mismo color.
Lo que decide si hay un fallo de COLOR (un tinte, un brillo, un rango mal etiquetado) es el color medio y el
PSNR de baja frecuencia, que no ve la textura comprimida; el bruto se da como dato y solo alarma por debajo
de 30 dB (algo roto: un desfase de fotograma da ≈ 20 dB).

Sale con 1 si algún canal medio se desvía más de 1,5 niveles, o el PSNR de baja frecuencia baja de 40 dB, o
el bruto de 30 dB.
"""
import subprocess
import sys

import numpy as np
from PIL import Image

ANCHO, ALTO = 1080, 1920
PSNR_BAJA_MIN = 40.0  # PSNR de baja frecuencia (×8): por debajo, un tinte o un brillo
PSNR_ALARMA = 30.0  # PSNR bruto: por debajo hay algo roto (un fotograma desfasado da ≈ 20 dB)
DESVIO_MAX = 1.5  # niveles de 8 bits en el color medio de un canal
REDUCCION = 8


def decodifica(mp4: str, frames: list[int]) -> np.ndarray:
    seleccion = "+".join(f"eq(n\\,{f})" for f in sorted(frames))
    crudo = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", mp4, "-an",
         "-vf", f"select='{seleccion}',scale=in_range=tv:out_range=pc:in_color_matrix=bt709:flags=accurate_rnd+full_chroma_int+bitexact,format=rgb24",
         "-fps_mode", "vfr", "-f", "rawvideo", "-"],
        capture_output=True, check=True,
    ).stdout
    n = len(crudo) // (ANCHO * ALTO * 3)
    if n != len(frames):
        sys.exit(f"se pidieron {len(frames)} fotogramas y ffmpeg dio {n}")
    return np.frombuffer(crudo, dtype=np.uint8).reshape(n, ALTO, ANCHO, 3)


def baja(a: np.ndarray) -> np.ndarray:
    """Promedio de área REDUCCION×REDUCCION: lo que queda es el color, no la textura."""
    h, w = a.shape[0] // REDUCCION * REDUCCION, a.shape[1] // REDUCCION * REDUCCION
    return a[:h, :w].reshape(h // REDUCCION, REDUCCION, w // REDUCCION, REDUCCION, 3).mean(axis=(1, 3))


def psnr_de(a: np.ndarray, b: np.ndarray) -> float:
    mse = float(np.mean((a - b) ** 2))
    return 99.0 if mse == 0 else float(10 * np.log10(255.0 ** 2 / mse))


def main() -> None:
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    mp4, carpeta = sys.argv[1], sys.argv[2]
    frames = sorted(int(x) for x in sys.argv[3].split(","))
    video = decodifica(mp4, frames)
    print(f"{'f':>5s} {'PSNR dB':>8s} {'baja freq.':>10s} | {'ΔR':>6s} {'ΔG':>6s} {'ΔB':>6s} (vídeo − still, color medio) | {'|Δ| máx':>7s}")
    malos = 0
    brutos, bajos = [], []
    for k, f in enumerate(frames):
        still = np.asarray(Image.open(f"{carpeta}/Recorrido017-f{f:05d}.png").convert("RGB"), dtype=np.float64)
        if still.shape != (ALTO, ANCHO, 3):
            sys.exit(f"el still de f{f} mide {still.shape[1]}×{still.shape[0]}: tiene que ser {ANCHO}×{ALTO} (escala 1)")
        v = video[k].astype(np.float64)
        bruto, bajo = psnr_de(v, still), psnr_de(baja(v), baja(still))
        d = v.mean(axis=(0, 1)) - still.mean(axis=(0, 1))
        brutos.append(bruto)
        bajos.append(bajo)
        mal = bruto < PSNR_ALARMA or bajo < PSNR_BAJA_MIN or float(np.abs(d).max()) > DESVIO_MAX
        malos += mal
        print(f"{f:5d} {bruto:8.2f} {bajo:10.2f} | {d[0]:+6.2f} {d[1]:+6.2f} {d[2]:+6.2f} {'':28s} | {np.abs(v - still).max():7.0f}{'  ← FUERA' if mal else ''}")
    print(f"\nPSNR bruto medio {np.mean(brutos):.2f} dB (mín {min(brutos):.2f}) · de baja frecuencia medio {np.mean(bajos):.2f} dB (mín {min(bajos):.2f}) · {'❌' if malos else '✅'} {malos} fotograma(s) fuera de [|Δ color medio| ≤ {DESVIO_MAX}, baja frecuencia ≥ {PSNR_BAJA_MIN} dB, bruto ≥ {PSNR_ALARMA} dB]")
    sys.exit(1 if malos else 0)


if __name__ == "__main__":
    main()
