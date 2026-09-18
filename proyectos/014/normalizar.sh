#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/avatar-014.mp4` desde el clip original.
#
#   bash proyectos/014/normalizar.sh [ruta-al-MOV]
#
# POR QUÉ EXISTE. El clip es material propio del cliente y no entra en git: en el
# repo quedan esta receta y los planes. Con el MOV delante (por defecto
# `proyectos/014/original.mov`, que tampoco se versiona), un clon nuevo repone
# la pieza entera.
#
# LO QUE TRAÍA EL ORIGINAL, medido con ffprobe (R01):
#   · 1920×1080 en el contenedor + `rotation=-90` en la matriz → la pantalla son
#     1080×1920. Planificar sobre el dato crudo sería recortar 16:9 (R19).
#   · HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020): sin tone-map sale lavado
#     (R21). Este ffmpeg no trae `zscale`/`libplacebo`, así que lo hace
#     VideoToolbox (`scale_vt`), el mismo motor que AVFoundation. Es el MISMO
#     caso del 012 (iPhone en HDR); el 013 era BT.709 y NO lo necesitaba: por
#     eso se comprueba y no se asume — la receta PARA si el clip no es HLG/PQ,
#     porque tone-mapear un SDR también lo estropea.
#   · Dos pistas de audio (estéreo AAC + una de 4 canales, el audio espacial del
#     iPhone). Se toma SOLO la primera: la otra no la lee Chromium.
#
# PARÁMETROS, que son decisiones y no valores por defecto:
#   · 1080×1920   la medida NATIVA de pantalla, sin subir. El 012 escalaba a 1296
#                 (×1,2) porque llevaba cámara virtual con punch-in; esta pieza
#                 NO lleva cámara (el encargo es texto + sonido, y el plano es un
#                 selfie de mano que ya se mueve solo), así que ampliar sería
#                 inventar píxeles para nada (criterio del 013).
#   · -r 30       el fps ORIGINAL manda (R01); la comp es de 30
#   · CON audio   el clip lleva LA VOZ de la pieza, TAL CUAL sale de la cámara.
#                 Medido: −17,7 LUFS, −0,5 dBTP (ver 01-plan.md). No se trata:
#                 el cliente prefirió el audio original en el 013 y aquí el nivel
#                 es razonable para móvil.
set -euo pipefail

ORIGEN="${1:-}"
[ -n "$ORIGEN" ] || ORIGEN="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/original.mov"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/avatar-014.mp4"

[ -f "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }

rot=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
      -of default=nw=1:nk=1 "$ORIGEN" | head -1)
case "$rot" in
  -90) tr="transpose_vt=dir=clock" ;;
  90)  tr="transpose_vt=dir=cclock" ;;
  *)   echo "❌ rotación no prevista ($rot)"; exit 1 ;;
esac

# R21: esta receta es la HDR. Si algún día entra un clip SDR, el tone-map sobra
# y hay que usar la receta del 013.
trc=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer \
      -of default=nw=1:nk=1 "$ORIGEN")
case "$trc" in
  arib-std-b67|smpte2084) ;;
  *) echo "❌ el original NO es HDR ($trc): esta receta tone-mapea. Copia la SDR de proyectos/013/normalizar.sh"; exit 1 ;;
esac

ffmpeg -y -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld -noautorotate -i "$ORIGEN" \
  -map 0:v:0 -map 0:a:0 \
  -vf "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,${tr},hwdownload,format=p010le,scale=1080:1920:flags=lanczos,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 192k -ac 2 -ar 48000 -shortest -movflags +faststart "$DESTINO"

echo "✅ $DESTINO"
ffprobe -v error -show_entries stream=width,height,r_frame_rate,nb_frames,codec_type \
  -show_entries format=duration -of default=nw=1 "$DESTINO"
echo "· audio resultante:"
ffmpeg -hide_banner -i "$DESTINO" -af loudnorm=print_format=summary -f null - 2>&1 \
  | grep -E "Input (Integrated|True Peak)" | sed 's/Input/   /'
