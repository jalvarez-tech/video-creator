#!/usr/bin/env python3
"""
afinar-voz.py — la GANANCIA de la voz tratada de cada toma: la que deja su ventana de voz en −15 LUFS DESPUÉS de la cadena (highpass → puerta suave → compresor 3:1 → ganancia → limitador).

Uso (desde la raíz del repo):
  python3 proyectos/022/herramientas/afinar-voz.py                (las tres tomas de la V6, objetivo −15)
  python3 proyectos/022/herramientas/afinar-voz.py --objetivo -16

POR QUÉ NO UNA GANANCIA FIJA. La V9 puso +14 dB a tomas de −18/−19 LUFS y la V12 +16 a las de −22. Las de la V6 miden −24,7 (HK1), −24,6 (MD2, con un pico de −1,5 dBTP) y −22,8 (la 2.ª frase de CT1): el
compresor actúa distinto sobre cada una y el limitador recoge lo que queda, así que la ganancia se BUSCA (bisección sobre la salida de la cadena) y se mide el pico real en lo que suena.
La cadena es la de `proyectos/025/normalizar.mjs` (`VOZ_TRATADA`) y la de `proyectos/022/normalizar.mjs`: si cambias una, cambia la otra.
Imprime, por toma: la ganancia, los LUFS de su ventana de voz, el pico real (dBTP) y cuánto limita (dB de pico antes y después del limitador).
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]
VOCES = RAIZ / "remotion" / "public" / "recorrido-022"

# toma → (s0, s1) de la ventana de voz que suena en la pieza, en segundos de su WAV (de metraje-022.ts, medidos con `limites-voz.py`)
TOMAS = {"hk2": (0.38, 4.04), "md1": (0.54, 6.41), "ct1": (0.66, 5.37)}


def cadena(g: float) -> str:
    return ",".join(
        [
            "highpass=f=100:poles=2",
            "agate=threshold=0.0056:ratio=2:range=0.25:attack=5:release=200",
            "acompressor=threshold=0.0501:ratio=3:attack=4:release=120:knee=6",
            f"volume={g:.2f}dB",
            "alimiter=limit=0.75:attack=1:release=60:level=disabled:latency=1",
        ]
    )


def mide(ruta: Path, s0: float, s1: float) -> tuple[float, float]:
    """LUFS integrados y pico real (dBTP) de la ventana [s0, s1] (con 0,1 s de margen a cada lado, como `limites-voz.py`)."""
    r = subprocess.run(
        ["ffmpeg", "-nostdin", "-hide_banner", "-ss", f"{max(s0 - 0.1, 0):.3f}", "-t", f"{s1 - s0 + 0.2:.3f}", "-i", str(ruta), "-af", "ebur128=peak=true", "-f", "null", "-"],
        capture_output=True,
        text=True,
    ).stderr
    resumen = r[r.rfind("Integrated loudness") :]
    i = float(re.search(r"I:\s+(-?[\d.]+) LUFS", resumen).group(1))
    p = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", resumen).group(1))
    return i, p


def aplica(entrada: Path, salida: Path, g: float) -> None:
    subprocess.run(
        ["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", str(entrada), "-af", cadena(g), "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "1", str(salida)],
        check=True,
    )


def main() -> None:
    objetivo = float(sys.argv[sys.argv.index("--objetivo") + 1]) if "--objetivo" in sys.argv else -15.0
    print(f"objetivo {objetivo} LUFS en la ventana de voz, DESPUÉS de la cadena\n")
    print(f"{'toma':5s} {'ganancia':>9s} {'LUFS':>7s} {'pico real':>10s} {'cruda':>8s} {'pico crudo':>11s}")
    with tempfile.TemporaryDirectory() as tmp:
        for toma, (s0, s1) in TOMAS.items():
            cruda = VOCES / f"{toma}.wav"
            i0, p0 = mide(cruda, s0, s1)
            lo, hi = 0.0, 36.0
            temp = Path(tmp) / f"{toma}.wav"
            for _ in range(10):
                g = (lo + hi) / 2
                aplica(cruda, temp, g)
                i, _p = mide(temp, s0, s1)
                if i < objetivo:
                    lo = g
                else:
                    hi = g
            g = round((lo + hi) / 2, 1)
            aplica(cruda, temp, g)
            i, p = mide(temp, s0, s1)
            print(f"{toma:5s} {g:+8.1f}  {i:7.2f} {p:+9.1f}  {i0:8.2f} {p0:+10.1f}")


if __name__ == "__main__":
    main()
