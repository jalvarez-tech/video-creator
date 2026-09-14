#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/boda-011/` desde el material original.
#
#   bash proyectos/011/normalizar.sh [carpeta-origen]      (JOBS=3 por defecto)
#
# POR QUÉ EXISTE. El metraje de la boda es material PRIVADO de una familia y no
# entra en git (ver .gitignore): en el repo quedan esta receta y el plan. Con la
# carpeta original delante, un clon nuevo repone `public/boda-011/` entero.
#
# LO QUE ESTE LOTE TIENE DE DISTINTO AL DEL 010, y cambia la receta:
#
#   · HDR. Los 27 MOV son iPhone 16 Pro en HEVC 10 bit **HLG** (`arib-std-b67`,
#     BT.2020). Pasados a H.264 sin tone-mapping salen LAVADOS: medido en el
#     mismo fotograma de IMG_2230, luma 155 y saturación 8,7 contra 126 y 11,6
#     con tone-map. Este ffmpeg no trae `zscale`/`libplacebo`, así que el
#     tone-map lo hace **VideoToolbox** (`scale_vt` con transferencia bt709),
#     que es el mismo motor que usa AVFoundation: se comparó contra `avconvert`
#     y dan el mismo resultado (126 / 11,5).
#   · ROTACIÓN POR CLIP. 25 declaran `rotation=-90` y dos (`IMG_2209`,
#     `IMG_2291`) `rotation=90`. Con frames de GPU el autorrotado de ffmpeg no
#     sirve (inserta un filtro de CPU), así que se lee la matriz y se gira con
#     `transpose_vt` a mano. Regla R19.
#   · `IMG_2270` dura 5 fotogramas (0,17 s): no es un clip, es una FOTO. Se
#     extrae el fotograma central y el montaje lo trata como tal.
#   · `E56C…MP4` es el único SDR (720×1280, comprimido de mensajería): se escala
#     ×1,8 con lanczos y un unsharp suave, como los del 010.
#
# PARÁMETROS, que son decisiones y no valores por defecto:
#   · 1296×2304   1080 × 1,2 = techo de punch-in (mismo criterio que el 010)
#   · -r 30       tres clips vienen a 29,97 y varios en VFR; la comp es de 30
#   · -an         el montaje va en mute con música (encargo)
set -euo pipefail

ORIGEN="${1:-$HOME/Downloads/Boda}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/boda-011"
JOBS="${JOBS:-3}"

[ -d "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }
command -v sips >/dev/null || { echo "❌ sips no está (macOS)"; exit 1; }
mkdir -p "$DESTINO"
export ORIGEN DESTINO

X264=(-c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p
      -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart)
export X264_STR="${X264[*]}"

video () {
  local f="$1" b="${1%.*}" rot trc tr
  rot=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
        -of default=nw=1:nk=1 "$ORIGEN/$f" | head -1)
  trc=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer \
        -of default=nw=1:nk=1 "$ORIGEN/$f")
  case "$rot" in
    -90) tr=",transpose_vt=dir=clock" ;;
    90)  tr=",transpose_vt=dir=cclock" ;;
    "")  tr="" ;;
    *)   echo "❌ $f: rotación no prevista ($rot)"; return 1 ;;
  esac
  # shellcheck disable=SC2086
  if [ "$trc" = "arib-std-b67" ]; then
    ffmpeg -nostdin -y -v error -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld \
      -noautorotate -i "$ORIGEN/$f" -an \
      -vf "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709${tr},hwdownload,format=p010le,scale=1296:2304:flags=lanczos,format=yuv420p" \
      -fps_mode cfr -r 30 $X264_STR "$DESTINO/$b.mp4"
  else
    ffmpeg -nostdin -y -v error -i "$ORIGEN/$f" -an \
      -vf "scale=1296:2304:flags=lanczos,unsharp=5:5:0.45:5:5:0.0" \
      -fps_mode cfr -r 30 $X264_STR "$DESTINO/$b.mp4"
  fi
  echo "🎬 $b.mp4"
}
export -f video

# Los vídeos de verdad (todo menos el de 5 fotogramas), en paralelo.
find "$ORIGEN" -maxdepth 1 -type f \( -iname '*.mov' -o -iname '*.mp4' \) ! -name 'IMG_2270.MOV' \
  -exec basename {} \; | sort | xargs -P "$JOBS" -I{} bash -c 'video "$@"' _ {}

# IMG_2270 → foto: el fotograma central (2 de 0-4), con el mismo tone-map.
ffmpeg -nostdin -y -v error -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld \
  -noautorotate -i "$ORIGEN/IMG_2270.MOV" \
  -vf "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,transpose_vt=dir=clock,hwdownload,format=p010le,select=eq(n\,2),scale=1296:2304:flags=lanczos,format=yuvj420p" \
  -frames:v 1 -q:v 2 "$DESTINO/IMG_2270.jpg"
echo "🖼  IMG_2270.jpg (fotograma central)"

# anillos.HEIC → JPEG sRGB (viene en Display P3).
#
# ⚠ LA ORIENTACIÓN NO LA QUEMA `sips`. Convierte a 4032×3024 —apaisado— con
# `EXIF Orientation = 6`: la foto solo sale derecha si quien la abre lee esa
# etiqueta. Chrome la lee, pero es exactamente la confianza en el decodificador
# que R19 prohíbe. `ffmpeg` sí aplica la etiqueta al decodificar y el JPEG que
# escribe no lleva EXIF, así que la salida (1728×2304) está derecha en píxeles.
# El recorte a 9:16 lo hace `objectFit: cover` en la comp.
TMP="$(mktemp -d -t boda011)"
sips -s format jpeg -s formatOptions 95 \
  --matchTo "/System/Library/ColorSync/Profiles/sRGB Profile.icc" \
  "$ORIGEN/anillos.HEIC" --out "$TMP/anillos.jpg" >/dev/null
ffmpeg -nostdin -y -v error -i "$TMP/anillos.jpg" -vf "scale=-2:2304:flags=lanczos" -q:v 2 \
  "$DESTINO/anillos.jpg"
rm -rf "$TMP"
echo "🖼  anillos.jpg"

echo
echo "✅ repuesto en $DESTINO"
