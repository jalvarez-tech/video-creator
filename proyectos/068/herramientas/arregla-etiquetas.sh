#!/bin/bash
# Arregla SIN pérdida las etiquetas de color de una final de Remotion (VUI 2/2/1 y sin átomo `colr`, R22): `h264_metadata` + `+write_colr`,
# en un archivo aparte; comprueba que los fotogramas DECODIFICADOS y el PCM del audio son los mismos (md5 y recuento) y sustituye el original.
# Uso: proyectos/068/herramientas/arregla-etiquetas.sh <final.mp4>
set -u
f="$1"
t="${f%.mp4}.arreglado.mp4"
md5v() { ffmpeg -nostdin -v error -i "$1" -map 0:v:0 -f framemd5 - | grep -v '^#' | md5; }
nv()   { ffmpeg -nostdin -v error -i "$1" -map 0:v:0 -f framemd5 - | grep -vc '^#'; }
md5a() { ffmpeg -nostdin -v error -i "$1" -map 0:a:0 -c:a pcm_s16le -f md5 - ; }
etq()  { ffprobe -v error -select_streams v:0 -show_entries stream=color_range,color_space,color_transfer,color_primaries -of csv=p=0 "$1"; }
colr() { python3 -c "import sys;d=open(sys.argv[1],'rb').read(4000000);print('colr' if b'colr' in d else 'SIN colr')" "$1"; }
echo "antes:   $(etq "$f") · $(colr "$f")"
v0="$(md5v "$f")"; n0="$(nv "$f")"; a0="$(md5a "$f")"
ffmpeg -nostdin -y -v error -i "$f" -c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv -movflags +write_colr+faststart "$t" || exit 1
v1="$(md5v "$t")"; n1="$(nv "$t")"; a1="$(md5a "$t")"
echo "después: $(etq "$t") · $(colr "$t")"
echo "fotogramas: $n0 → $n1 · framemd5 decodificado: $v0 → $v1"
echo "PCM del audio (md5): $a0 → $a1"
if [ -n "$v0" ] && [ "$n0" = "$n1" ] && [ "$v0" = "$v1" ] && [ "$a0" = "$a1" ] && [ -n "$a0" ]; then
  mv "$t" "$f"; echo "IGUAL: píxeles y audio idénticos; sustituido $(basename "$f")"
else
  echo "DISTINTO: no se sustituye ($t queda para mirarlo)"; exit 1
fi
