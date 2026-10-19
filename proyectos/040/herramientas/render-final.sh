#!/bin/zsh
# La final de la V23 (040): el master CRF 12 `slower` y la versión ligera CRF 16 `slow`, con las banderas de R22 (color BT.709, PNG, --gl=angle por el color por plano).
# Corre desde cualquier sitio; con el clonado de `public/` (8 MB por bundle en vez de 2,2 GB) para no llenar el disco compartido.
cd "$(dirname "$0")/../../../remotion" || exit 1
export NODE_OPTIONS="--require $PWD/../proyectos/040/herramientas/clonar-al-copiar.cjs"
npx remotion render src/index.ts Recorrido040 ../proyectos/040/finales/040-recorrido.mp4 --crf=12 --x264-preset=slower --audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle > ../proyectos/040/medidas/render-final-crf12.log 2>&1
echo "crf12 listo: $?" >> ../proyectos/040/medidas/render-final-estado.log
npx remotion render src/index.ts Recorrido040 ../proyectos/040/finales/040-recorrido-crf16.mp4 --crf=16 --x264-preset=slow --audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle > ../proyectos/040/medidas/render-final-crf16.log 2>&1
echo "crf16 listo: $?" >> ../proyectos/040/medidas/render-final-estado.log
