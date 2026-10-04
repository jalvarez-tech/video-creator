#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
palabras-desde.py — ¿qué palabra es la PRIMERA que se oye desde un instante? Para llevar un subtítulo a su palabra.

Uso (desde la raíz del repo):
  uv run proyectos/018/herramientas/palabras-desde.py remotion/public/recorrido-018/ct01.wav 1.70 1.77 1.95 [--n 5]

POR QUÉ EXISTE. `onsets-voz.py` da los arranques de sílaba de una voz (energía), pero dentro de una frase continua
no dice CUÁL es el de la palabra que abre una línea: hay más sílabas que onsets (las vocales sueltas no suben) y el
alineador de whisper (DTW) va 0,1-0,4 s pronto (R31). Aquí cada candidato se COMPRUEBA: se corta la toma desde ese
instante (unos 40 ms antes), se transcribe con el mismo whisper y se imprimen las primeras palabras que oye. El
candidato bueno es el que empieza justo por la palabra de la línea; uno que llega tarde pierde sus primeras sílabas
(«en un apartamento» → «un apartamento»), y uno que llega pronto trae el final de la palabra anterior («te en un…»).

Lo que NO hace: decidir. Un tramo corto puede devolver texto inventado (R31): sirve para saber de qué lado cae una
palabra, no para leerla. El instante elegido se lleva a la línea con `frame = en + round(t·fps) − round(desde·fps)`,
y se comprueba al final sobre el render con `subs-vs-voz.py`.
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))


def primeras(wav: str, t: float, n: int) -> str:
    with tempfile.TemporaryDirectory() as tmp:
        corte = os.path.join(tmp, "corte.wav")
        salida = os.path.join(tmp, "corte.json")
        inicio = max(0.0, t - 0.04)
        subprocess.run(
            ["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{inicio:.3f}", "-i", wav, "-c:a", "pcm_s16le", corte],
            check=True,
        )
        r = subprocess.run(
            ["node", os.path.join(RAIZ, "manuales", "edicion-video", "scripts", "transcribir.mjs"), corte, salida, "es"],
            capture_output=True,
            text=True,
            cwd=RAIZ,
        )
        if r.returncode != 0 or not os.path.exists(salida):
            return f"(whisper falló: {r.stderr.strip()[:120]})"
        with open(salida, encoding="utf8") as f:
            j = json.load(f)
        texto = " ".join(seg.get("text", "").strip() for seg in j.get("transcription", []))
        return " ".join(texto.split()[:n]) or "(nada)"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("wav")
    ap.add_argument("tiempos", nargs="+", type=float, help="segundos de la fuente a comprobar")
    ap.add_argument("--n", type=int, default=5, help="cuántas palabras imprimir (defecto 5)")
    a = ap.parse_args()
    if not os.path.exists(a.wav):
        sys.exit(f"no existe {a.wav}")
    for t in a.tiempos:
        print(f"  desde {t:6.3f} s → «{primeras(a.wav, t, a.n)}»", flush=True)


if __name__ == "__main__":
    main()
