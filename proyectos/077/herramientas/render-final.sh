#!/bin/bash
# render-final.sh NNN — la FINAL de una pieza de la suite Go Living: máster (CRF 12 `slower`) + versión ligera (CRF 16 `slow`), con las etiquetas de color arregladas y el .srt, EN TURNO.
#
#   bash proyectos/077/herramientas/render-final.sh 077
#
# Deja en `proyectos/NNN/finales/`: NNN-recorrido.mp4 (máster), NNN-recorrido-crf16.mp4 (ligera) y NNN.srt. Los dos MP4 llevan la misma imagen y el mismo audio.
#
# POR QUÉ ASÍ (todo viene de `recorrido-luxur/montaje.md` y de la memoria del proyecto):
# · Turno de render: el mismo candado que `render-prueba.sh` (`remotion/out/.turno-render`); un render a 1080×1920 con PNG llena la memoria y, con el Mac en swap, el disco.
#   Si un render muere sin liberarlo: `rmdir remotion/out/.turno-render`.
# · Antes de cada render se mira el disco: por debajo de 20 GB libres se para, no se sigue a ciegas.
# · El render de Remotion sale con el VUI a medias (2/2/1) y sin átomo `colr` (R22): se arregla SIN pérdida con `h264_metadata` y se comprueba que ni la imagen ni el audio
#   cambian (md5 del vídeo y del PCM decodificados, antes y después). Cada MP4 se arregla y se mide por separado.
# · Sin Date.now ni aleatorios: el máster y la ligera son el mismo plan; solo cambia el CRF.
NNN="$1"
if [[ ! "$NNN" =~ ^[0-9]{3}$ ]]; then echo "uso: bash proyectos/077/herramientas/render-final.sh NNN"; exit 1; fi
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
TURNO="$RAIZ/remotion/out/.turno-render"
FIN="$RAIZ/proyectos/$NNN/finales"
mkdir -p "$RAIZ/remotion/out" "$FIN"

libre_gb() { df -g "$RAIZ" | awk 'NR==2 {print $4}'; }

esperando=0
until mkdir "$TURNO" 2>/dev/null; do
  if [ "$esperando" -eq 0 ]; then echo "⏳ esperando el turno de render (hay otro en marcha)…"; esperando=1; fi
  sleep 10
done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT

# render CRF PRESET DESTINO — un render de la final (los mismos parámetros que la prueba, salvo el CRF y el preset).
render() {
  local crf="$1" preset="$2" destino="$3"
  local libre; libre="$(libre_gb)"
  if [ "$libre" -lt 20 ]; then echo "⛔ solo quedan ${libre} GB libres: paro antes de renderizar $destino"; return 1; fi
  echo "▶ $(date +%H:%M:%S) $NNN CRF $crf ($preset) → $destino  [${libre} GB libres]"
  ( cd "$RAIZ/remotion" && npx remotion render src/index.ts "Recorrido$NNN" "$destino" \
      --crf="$crf" --x264-preset="$preset" --audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle \
      --concurrency=4 --offthreadvideo-cache-size-in-bytes=300000000 ) || return 1
}

# md5 del vídeo y del audio DECODIFICADOS (lo que cambiaría si el arreglo tocara algo).
md5_video() { ffmpeg -nostdin -v error -i "$1" -map 0:v:0 -f md5 - ; }
md5_audio() { ffmpeg -nostdin -v error -i "$1" -map 0:a:0 -f md5 - ; }

# arregla ARCHIVO — etiquetas de color BT.709 en el VUI y el átomo colr, sin recodificar, y comprueba que imagen y audio son idénticos.
arregla() {
  local f="$1" tmp="${1%.mp4}.arreglado.mp4"
  ffmpeg -nostdin -y -v error -i "$f" -c copy \
    -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
    -movflags +write_colr+faststart "$tmp" || return 1
  local v0 v1 a0 a1
  v0="$(md5_video "$f")"; v1="$(md5_video "$tmp")"
  a0="$(md5_audio "$f")"; a1="$(md5_audio "$tmp")"
  if [ -z "$v0" ] || [ "$v0" != "$v1" ] || [ -z "$a0" ] || [ "$a0" != "$a1" ]; then
    echo "⛔ el arreglo de color cambió la imagen o el audio de $f (vídeo $v0/$v1, audio $a0/$a1): lo dejo sin sustituir"
    return 1
  fi
  mv "$tmp" "$f"
  echo "   ✔ etiquetas arregladas en $(basename "$f") (imagen y audio idénticos: v=$v0 a=$a0)"
}

render 12 slower "../proyectos/$NNN/finales/$NNN-recorrido.mp4" || exit 1
arregla "$FIN/$NNN-recorrido.mp4" || exit 1
render 16 slow "../proyectos/$NNN/finales/$NNN-recorrido-crf16.mp4" || exit 1
arregla "$FIN/$NNN-recorrido-crf16.mp4" || exit 1
( cd "$RAIZ" && node manuales/edicion-video/scripts/exportar-srt.mjs "remotion/src/proyectos/$NNN/subtitulos-$NNN.ts" "proyectos/$NNN/finales/$NNN.srt" ) || exit 1
echo "✅ $(date +%H:%M:%S) $NNN: $(ls -lh "$FIN" | awk 'NR>1 {printf "%s %s · ", $9, $5}')"
