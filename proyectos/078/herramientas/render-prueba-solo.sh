#!/bin/bash
# render-prueba-solo.sh — el render de PRUEBA de la 078 con el bundle SOLO de la 078 (`src/proyectos/078/entrada-solo.tsx`), en turno.
#
#   bash proyectos/078/herramientas/render-prueba-solo.sh
#
# POR QUÉ. Las piezas 076-078 se montan a la vez sobre el mismo checkout y `estudio.tsx` carga TODAS las composiciones de `src/proyectos/*`: una pieza hermana a medias tumba el bundle. Esta entrada
# registra solo `Recorrido078`. Igual que `proyectos/070/herramientas/render-prueba.sh` (mismo turno `remotion/out/.turno-render`, mismos parámetros), deja
# `proyectos/078/pruebas-720p/078-recorrido.mp4` (540×960, BT.709) y el intermedio `remotion/out/078-1080.mp4` (se borra a mano al acabar).
NNN=078
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
npx remotion render src/proyectos/$NNN/entrada-solo.tsx "Recorrido$NNN" "out/$NNN-1080.mp4" --scale=1 --gl=angle --crf=10 --color-space=bt709 --image-format=png --concurrency=4 || exit 1
ffmpeg -nostdin -y -v error -i "out/$NNN-1080.mp4" \
  -vf "scale=540:960:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -x264-params colorprim=bt709:transfer=bt709:colormatrix=bt709:range=tv \
  -c:a copy -movflags +faststart "$RAIZ/proyectos/$NNN/pruebas-720p/$NNN-recorrido.mp4" || exit 1
echo "✅ proyectos/$NNN/pruebas-720p/$NNN-recorrido.mp4 (borra a mano remotion/out/$NNN-1080.mp4)"
