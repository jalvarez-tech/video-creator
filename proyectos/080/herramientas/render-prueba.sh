#!/bin/bash
# render-prueba.sh NNN [ficha] — el render de PRUEBA de una pieza de la tanda 080-087 (1080p con el color de la final) y su reducción a 540×960, EN TURNO.
#
#   bash proyectos/080/herramientas/render-prueba.sh 081           la versión NORMAL (subtítulos en una sola fuente, sin ficha): composición Recorrido081
#   bash proyectos/080/herramientas/render-prueba.sh 081 ficha     la versión CON FICHA (sin subtítulos, ficha abajo):          composición Recorrido081Ficha
#
# POR QUÉ EN TURNO. Cada render lanza varios Chrome y escribe cientos de MB: dos renders a la vez llenan la memoria. El turno es una carpeta (`mkdir` es atómico): quien la crea renderiza, los demás
# esperan. Si un render muere sin liberarla: `rmdir remotion/out/.turno-render`.
# Deja `proyectos/NNN/pruebas-720p/NNN-recorrido[-ficha].mp4` (540×960, BT.709 etiquetado). BORRA el intermedio `remotion/out/NNN-1080*.mp4` al acabar y, si queda, el bundle de Remotion del tmp del sistema
# (cada render deja 2,2-2,5 GB: memoria `remotion-bundles-llenan-disco`). Antes de renderizar mira el disco: por debajo de 12 GB libres se para.
NNN="$1"
VERSION="$2"
if [[ ! "$NNN" =~ ^[0-9]{3}$ ]]; then echo "uso: bash proyectos/080/herramientas/render-prueba.sh NNN [ficha]"; exit 1; fi
if [ "$VERSION" = "ficha" ]; then COMP="Recorrido${NNN}Ficha"; SUFIJO="-ficha"; else COMP="Recorrido${NNN}"; SUFIJO=""; fi
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
TURNO="$RAIZ/remotion/out/.turno-render"
mkdir -p "$RAIZ/remotion/out" "$RAIZ/proyectos/$NNN/pruebas-720p"
libre="$(df -g "$RAIZ" | awk 'NR==2 {print $4}')"
if [ "$libre" -lt 12 ]; then echo "⛔ solo quedan ${libre} GB libres: paro antes de renderizar"; exit 1; fi
esperando=0
until mkdir "$TURNO" 2>/dev/null; do
  if [ "$esperando" -eq 0 ]; then echo "⏳ esperando el turno de render (hay otro en marcha)…"; esperando=1; fi
  sleep 10
done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT
INTERMEDIO="out/${NNN}-1080${SUFIJO}.mp4"
echo "▶ $(date +%H:%M:%S) render de prueba de $COMP  [${libre} GB libres]"
cd "$RAIZ/remotion" || exit 1
npx remotion render src/index.ts "$COMP" "$INTERMEDIO" --scale=1 --gl=angle --crf=10 --color-space=bt709 --image-format=png --concurrency=4 || exit 1
ffmpeg -nostdin -y -v error -i "$INTERMEDIO" \
  -vf "scale=540:960:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -x264-params colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv \
  -c:a copy -movflags +faststart "$RAIZ/proyectos/$NNN/pruebas-720p/$NNN-recorrido${SUFIJO}.mp4" || exit 1
rm -f "$INTERMEDIO"
echo "✅ $(date +%H:%M:%S) proyectos/$NNN/pruebas-720p/$NNN-recorrido${SUFIJO}.mp4 (intermedio borrado)"
