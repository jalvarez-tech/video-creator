#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""dos-pasadas.py — transcribe una toma por palabra DOS veces con whisper small: con vocabulario de la casa (`--prompt`) y sin él.

Uso (desde la raíz del repo):
  uv run proyectos/038/herramientas/dos-pasadas.py proyectos/038/original/IMG_9418.MOV [otra.MOV …]

Deja `proyectos/038/voz/palabras/<toma>.json` (con vocabulario) y `<toma>-sinprompt.json` (sin él), con los mismos argumentos que
`transcribir.mjs --palabras` (-ojf -ml 1 -sow -dtw small -nfa), y luego `palabras-dudosas.py` las lista con su confianza.

POR QUÉ DOS. El vocabulario sirve para los nombres propios («Guarne», «Luxur»), no para decidir una palabra (con la frase entera como prompt whisper
la copia con 1,00): por eso es un vocabulario y no el guion, y por eso se mira también la pasada limpia. La confianza de una palabra es la menor `p` de
sus tokens, en la PEOR de las dos pasadas (033, aprendizajes §1).
"""
import os
import subprocess
import sys
import tempfile

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
MODELO = os.path.join(RAIZ, "archivos", "whisper", "ggml-small.bin")
SALIDA = os.path.join(RAIZ, "proyectos", "038", "voz", "palabras")
VOCABULARIO = "Propiedades Luxur, casa campestre en Guarne, Antioquia, Medellín, campestre, familia, abuelos, tíos, primos, cómodos, comodidad, Colombia."


def main() -> None:
    os.makedirs(SALIDA, exist_ok=True)
    for clip in sys.argv[1:]:
        toma = os.path.splitext(os.path.basename(clip))[0]
        with tempfile.TemporaryDirectory() as tmp:
            wav = os.path.join(tmp, "audio.wav")
            subprocess.run(
                ["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", clip, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav],
                check=True,
            )
            for sufijo, extra in (("", ["--prompt", VOCABULARIO]), ("-sinprompt", [])):
                base = os.path.join(SALIDA, toma + sufijo)
                r = subprocess.run(
                    ["whisper-cli", "-m", MODELO, "-f", wav, "-l", "es", "-ojf", "-ml", "1", "-sow", "-dtw", "small", "-nfa", *extra, "-of", base],
                    capture_output=True,
                    text=True,
                )
                if r.returncode != 0 or not os.path.exists(base + ".json"):
                    sys.exit(f"whisper-cli falló en {toma}{sufijo}: {(r.stderr or r.stdout)[-400:]}")
                print(f"✅ {toma}{sufijo}.json")


if __name__ == "__main__":
    main()
