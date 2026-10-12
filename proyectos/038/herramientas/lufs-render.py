#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""lufs-render.py — la sonoridad (ebur128: integrada y pico real) de ventanas del AUDIO DEL RENDER (el WAV de `remotion render --codec=wav`).

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/lufs-render.py remotion/out/audio-038.wav                (la tabla de la pieza entera y de cada tramo)
  uv run proyectos/038/herramientas/lufs-render.py remotion/out/audio-038.wav etiqueta:f0:f1 …  (ventanas propias, en frames a 30 fps)

Las ventanas por defecto son las de la mezcla del 038: la voz de cada toma (primera sílaba → última palabra), la música SOLA en el dron y en los dos
recorridos, y la pieza entera. «Voz» es lo que suena en la ventana de su frase (música debajo incluida): la diferencia con la voz tratada sola
(`revisar-038.mjs`, sección 3) es lo que la música aporta; «música sola», el nivel al que queda cuando nadie habla (el objetivo es −15 LUFS).
"""
import re
import subprocess
import sys

FPS = 30
DEFECTO = {
    "dron (música sola)": (0, 98),
    "hook (voz + cama)": (106, 268),
    "recorrido 1 (música sola)": (272, 465),
    "mitad (voz + cama)": (473, 612),
    "recorrido 2 (música sola)": (640, 930),
    "CTA (voz + cama)": (938, 1035),
    "pieza entera": (0, 1113),
}


def mide(wav: str, f0: int, f1: int) -> tuple[float, float]:
    r = subprocess.run(
        ["ffmpeg", "-nostdin", "-hide_banner", "-ss", f"{f0 / FPS:.4f}", "-t", f"{(f1 - f0) / FPS:.4f}", "-i", wav, "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"],
        capture_output=True,
        text=True,
    ).stderr
    i = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r)[-1])
    p = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r)[-1])
    return i, p


def main() -> None:
    wav = sys.argv[1]
    ventanas = dict(DEFECTO)
    if len(sys.argv) > 2:
        ventanas = {}
        for a in sys.argv[2:]:
            nombre, f0, f1 = a.split(":")
            ventanas[nombre] = (int(f0), int(f1))
    for nombre, (f0, f1) in ventanas.items():
        i, p = mide(wav, f0, f1)
        print(f"  {nombre:28s} f{f0:5d}-{f1:5d}  {i:7.1f} LUFS · pico {p:6.1f} dBFS")


if __name__ == "__main__":
    main()
