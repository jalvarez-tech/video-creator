#!/bin/bash
# render-prueba.sh NNN — el render de PRUEBA de una pieza de la suite (1080p con el color de la final) y su reducción a 540×960, EN TURNO.
#
#   bash proyectos/070/herramientas/render-prueba.sh 071
#
# POR QUÉ EN TURNO. Seis piezas se montan a la vez sobre el mismo checkout y cada render lanza varios Chrome y escribe cientos de MB: dos renders a la vez llenan la memoria.
# El turno es una carpeta (`mkdir` es atómico): quien la crea renderiza, los demás esperan. Si un render muere sin liberarla: `rmdir remotion/out/.turno-render`.
# Deja `proyectos/NNN/pruebas-720p/NNN-recorrido.mp4` (540×960, BT.709 etiquetado) y el intermedio `remotion/out/NNN-1080.mp4`, que se borra a mano al acabar.
NNN="$1"
if [[ ! "$NNN" =~ ^[0-9]{3}$ ]]; then echo "uso: bash proyectos/070/herramientas/render-prueba.sh NNN"; exit 1; fi
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
TURNO="$RAIZ/remotion/out/.turno-render"
mkdir -p "$RAIZ/remotion/out" "$RAIZ/proyectos/$NNN/pruebas-720p"
esperando=0
until mkdir "$TURNO" 2>/dev/null; do
  if [ "$esperando" -eq 0 ]; then echo "⏳ esperando el turno de render (hay otro en marcha)…"; esperando=1; fi
  sleep 10
done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT
echo "▶ render de prueba de la $NNN"
cd "$RAIZ/remotion" || exit 1
npx remotion render src/index.ts "Recorrido$NNN" "out/$NNN-1080.mp4" --scale=1 --gl=angle --crf=10 --color-space=bt709 --image-format=png --concurrency=4 || exit 1
ffmpeg -nostdin -y -v error -i "out/$NNN-1080.mp4" \
  -vf "scale=540:960:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -x264-params colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv \
  -c:a copy -movflags +faststart "$RAIZ/proyectos/$NNN/pruebas-720p/$NNN-recorrido.mp4" || exit 1
echo "✅ proyectos/$NNN/pruebas-720p/$NNN-recorrido.mp4 (borra a mano remotion/out/$NNN-1080.mp4)"
