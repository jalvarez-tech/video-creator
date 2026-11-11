#!/bin/bash
# render-ficha-comp.sh NNN — la FINAL de la versión CON FICHA de una pieza de la tanda 080-087 (`RecorridoNNNFicha`: sin subtítulos, la ficha abajo desde el hook).
#
#   bash proyectos/080/herramientas/render-ficha-comp.sh 081
#
# A diferencia de `render-ficha.sh` (que pinta la ficha con ffmpeg sobre una base sin subtítulos), aquí la ficha es parte de la composición: se renderiza MUDA a CRF 12 y se le COPIA el audio
# de la final normal (`-c:a copy`), para que las dos versiones suenen exactamente igual (regla de `ficha-luxur` §3b). Necesita `proyectos/NNN/finales/NNN-recorrido.mp4` (render-final.sh NNN).
# Deja `proyectos/NNN/finales/NNN-recorrido-ficha.mp4` con las etiquetas BT.709 y comprueba fotogramas y audio contra la final.
NNN="$1"
if [[ ! "$NNN" =~ ^[0-9]{3}$ ]]; then echo "uso: bash proyectos/080/herramientas/render-ficha-comp.sh NNN"; exit 1; fi
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
FIN="$RAIZ/proyectos/$NNN/finales"; FINAL="$FIN/$NNN-recorrido.mp4"; MUDA="$RAIZ/remotion/out/$NNN-ficha-muda.mp4"; SALIDA="$FIN/$NNN-recorrido-ficha.mp4"
TURNO="$RAIZ/remotion/out/.turno-render"
[ -f "$FINAL" ] || { echo "⛔ falta $FINAL: exporta antes la final normal (bash proyectos/080/herramientas/render-final.sh $NNN)"; exit 1; }
libre="$(df -g "$RAIZ" | awk 'NR==2 {print $4}')"; [ "$libre" -ge 20 ] || { echo "⛔ solo quedan ${libre} GB libres"; exit 1; }
until mkdir "$TURNO" 2>/dev/null; do sleep 10; done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT
( cd "$RAIZ/remotion" && npx remotion render src/index.ts Recorrido${NNN}Ficha out/${NNN}-ficha-muda.mp4 --muted \
    --crf=12 --x264-preset=slower --color-space=bt709 --image-format=png --gl=angle --concurrency=4 --offthreadvideo-cache-size-in-bytes=300000000 ) || exit 1
ffmpeg -nostdin -y -v error -i "$MUDA" -i "$FINAL" -map 0:v:0 -map 1:a:0 -c copy \
  -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv -movflags +write_colr+faststart "$SALIDA" || exit 1
nf() { ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$1"; }
a() { ffmpeg -nostdin -v error -i "$1" -map 0:a:0 -f md5 - ; }
[ "$(nf "$SALIDA")" = "$(nf "$FINAL")" ] || { echo "⛔ la versión con ficha no tiene los mismos fotogramas que la final"; exit 1; }
[ "$(a "$SALIDA")" = "$(a "$FINAL")" ] || { echo "⛔ el audio de la versión con ficha no es el de la final"; exit 1; }
rm -f "$MUDA"
echo "✅ $SALIDA: $(nf "$SALIDA") fotogramas, audio idéntico al de la final, $(ls -lh "$SALIDA" | awk '{print $5}')"
