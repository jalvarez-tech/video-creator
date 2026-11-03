#!/bin/bash
# Los tres renders de la entrega de 066, uno tras otro (desde la raíz del repo): máster CRF 12, ligera CRF 16 y la base muda sin subtítulos de la versión con ficha.
set -e
cd "$(dirname "$0")/../../../remotion"
COMUN="--audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle"
echo "== master CRF 12"; npx remotion render src/index.ts Recorrido066 ../proyectos/066/finales/066-recorrido.mp4 --crf=12 --x264-preset=slower $COMUN
echo "== ligera CRF 16"; npx remotion render src/index.ts Recorrido066 ../proyectos/066/finales/066-recorrido-crf16.mp4 --crf=16 --x264-preset=slow $COMUN
echo "== base muda para la ficha"; npx remotion render src/index.ts Recorrido066 out/066-limpio.mp4 --props='{"sinSubtitulos":true}' --muted --crf=6 --x264-preset=fast --color-space=bt709 --image-format=png --gl=angle
echo "== HECHO"
