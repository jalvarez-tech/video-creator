#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
probar-voz.py — ¿qué cadena de voz deja cada toma a −15 LUFS sin saturar?

Uso (desde la raíz del repo):
  uv run proyectos/036/herramientas/probar-voz.py                 (las tomas del plan con la cadena vigente)
  uv run proyectos/036/herramientas/probar-voz.py --umbral 0.0126 --razon 3

POR QUÉ EXISTE. El pedido fue «sube la voz en off sin saturar». Las voces de «5 Cta» llegan MUY bajas (−27 a −33 LUFS en
la ventana de voz: Isabella habla a varios metros de un iPhone, de cuerpo entero) y con una cresta de ≈ 20 dB (pico de
−10 dBTP con la media a −30 LUFS). Subirlas con una ganancia sola a −15 LUFS pondría los picos a +5 dBFS: saturación segura.
La cadena de la V9/V1/V2 (compresor desde −26 dBFS) no llega aquí: con voces tan quietas casi nada supera ese umbral. Este
script PRUEBA la cadena —highpass → puerta suave → compresor → ganancia → limitador— sobre la ventana de voz de cada toma:
busca la ganancia que da −15,0 LUFS DESPUÉS del compresor y mide lo que el limitador tiene que quitar y el pico real.

Criterio (el de la V9): −15,0 LUFS en la ventana de voz, pico real ≤ −2,0 dBTP y un limitador que no quite más de 3 dB.
"""
import argparse
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
CRUDO = RAIZ / "remotion" / "public" / "recorrido-036"  # el WAV crudo de cada toma (48 kHz mono, sin tocar), de `normalizar.mjs`

# toma → (s0, s1) de la ventana de voz que se USA (límites medidos por energía, `limites-voz.py`)
TOMAS = {
    "hk11": (0.43, 5.44),
    "md08": (0.72, 3.83),
    "ct07": (0.765, 4.31),
}


def cadena(umbral: float, razon: float, ganancia_db: float, techo: float = 0.75, sin_limitador: bool = False) -> str:
    partes = [
        "highpass=f=100:poles=2",
        "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
        f"acompressor=threshold={umbral}:ratio={razon}:attack=4:release=120:knee=6",
        f"volume={ganancia_db}dB",
    ]
    if not sin_limitador:
        partes.append(f"alimiter=limit={techo}:attack=1:release=60:level=disabled:latency=1")
    return ",".join(partes)


def mide(entrada: Path, filtro: str, s0: float, s1: float) -> tuple[float, float]:
    """(LUFS integrado de la ventana, pico real dBTP) tras aplicar `filtro`."""
    af = f"{filtro},atrim=start={s0}:end={s1},ebur128=peak=true:framelog=quiet"
    r = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-i", str(entrada), "-af", af, "-f", "null", "-"], capture_output=True, text=True)
    lufs = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)[-1])
    pico = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r.stderr)[-1])
    return lufs, pico


def busca_ganancia(entrada: Path, s0: float, s1: float, umbral: float, razon: float, objetivo: float = -15.0) -> float:
    """La ganancia (dB) que deja la ventana a `objetivo` LUFS DESPUÉS del compresor (sin limitador), a 0,1 dB."""
    base, _ = mide(entrada, cadena(umbral, razon, 0.0, sin_limitador=True), s0, s1)
    g = objetivo - base
    for _ in range(3):  # la puerta y el compresor no son lineales: se afina
        l, _ = mide(entrada, cadena(umbral, razon, g, sin_limitador=True), s0, s1)
        g += objetivo - l
    return round(g, 1)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--umbral", type=float, default=0.0126, help="umbral del compresor, lineal (0,0501 = −26 dBFS · 0,0126 = −38 dBFS)")
    ap.add_argument("--razon", type=float, default=3.0)
    ap.add_argument("--techo", type=float, default=0.75, help="techo del limitador, lineal (0,75 = −2,5 dBFS)")
    a = ap.parse_args()
    print(f"compresor {a.razon}:1 desde {20 * __import__('math').log10(a.umbral):.0f} dBFS · techo {20 * __import__('math').log10(a.techo):.1f} dBFS")
    print(f"{'toma':10} {'crudo LUFS':>11} {'pico crudo':>10}  {'ganancia':>9}  {'sin lim: pico':>13}  {'con lim: LUFS':>13} {'pico':>6}  limitador quita")
    for toma, (s0, s1) in TOMAS.items():
        wav = CRUDO / f"{toma}.wav"
        crudo_l, crudo_p = mide(wav, "anull", s0, s1)
        g = busca_ganancia(wav, s0, s1, a.umbral, a.razon)
        _, p_sin = mide(wav, cadena(a.umbral, a.razon, g, sin_limitador=True), s0, s1)
        l_con, p_con = mide(wav, cadena(a.umbral, a.razon, g, a.techo), s0, s1)
        print(f"{toma:10} {crudo_l:11.1f} {crudo_p:10.1f}  {g:+8.1f}  {p_sin:13.1f}  {l_con:13.1f} {p_con:6.1f}  {p_sin - p_con:5.1f} dB")


if __name__ == "__main__":
    sys.exit(main())
