#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/avatar-012.mp4` desde el clip original.
#
#   bash proyectos/012/normalizar.sh [ruta-al-MOV]
#
# POR QUÉ EXISTE. El clip es material propio del cliente y no entra en git: en el
# repo quedan esta receta y los planes. Con el MOV delante, un clon nuevo repone
# el avatar entero.
#
# LO QUE TRAÍA EL ORIGINAL, medido con ffprobe (R01):
#   · 1920×1080 en el contenedor + `rotation=-90` en la matriz → la pantalla son
#     1080×1920. Planificar sobre el dato crudo sería recortar 16:9 (R19).
#   · HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020): sin tone-map sale lavado
#     (R21). Este ffmpeg no trae `zscale`/`libplacebo`, así que lo hace
#     VideoToolbox (`scale_vt`), el mismo motor que AVFoundation.
#   · Dos pistas de audio (estéreo AAC + una de 4 canales, el audio espacial del
#     iPhone). Se toma SOLO la primera: la otra no la lee Chromium.
#
# PARÁMETROS, que son decisiones y no valores por defecto:
#   · 1296×2304   1080 × 1,2 = techo del punch-in de la cámara (criterio del 011)
#   · -r 30       el fps ORIGINAL manda (R01); la comp es de 30
#   · CON audio   a diferencia del 011, aquí el clip lleva LA VOZ de la pieza
set -euo pipefail

ORIGEN="${1:-$HOME/Downloads/IMG_2494.MOV}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/avatar-012.mp4"

[ -f "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }

rot=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
      -of default=nw=1:nk=1 "$ORIGEN" | head -1)
case "$rot" in
  -90) tr="transpose_vt=dir=clock" ;;
  90)  tr="transpose_vt=dir=cclock" ;;
  *)   echo "❌ rotación no prevista ($rot)"; exit 1 ;;
esac

ffmpeg -y -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld -noautorotate -i "$ORIGEN" \
  -map 0:v:0 -map 0:a:0 \
  -vf "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,${tr},hwdownload,format=p010le,scale=1296:2304:flags=lanczos,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 192k -ac 2 -movflags +faststart "$DESTINO"

echo "✅ $DESTINO"
ffprobe -v error -show_entries stream=width,height,r_frame_rate,nb_frames,codec_type -show_entries format=duration -of default=nw=1 "$DESTINO"
