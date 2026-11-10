#!/bin/bash
# Arregla SIN pérdida las etiquetas BT.709 (VUI y átomo colr) de un final de Remotion y comprueba que imagen y audio no cambian.
# Uso: arreglar-etiquetas.sh <final.mp4>   (sustituye el archivo si todo coincide; guarda un contador de fotogramas para que una entrada vacía no dé un «igual» falso)
set -e
f="$1"; t="${f%.mp4}.arreglado.mp4"
ffmpeg -nostdin -v error -y -i "$f" -c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv -movflags +write_colr+faststart "$t"
vid() { ffmpeg -nostdin -v error -i "$1" -map 0:v:0 -f framemd5 - | grep -v '^#' ; }
v0=$(vid "$f"); v1=$(vid "$t")
n0=$(echo "$v0" | wc -l | tr -d ' '); n1=$(echo "$v1" | wc -l | tr -d ' ')
m0=$(echo "$v0" | md5); m1=$(echo "$v1" | md5)
a0=$(ffmpeg -nostdin -v error -i "$f" -map 0:a:0 -f s16le - | md5); a1=$(ffmpeg -nostdin -v error -i "$t" -map 0:a:0 -f s16le - | md5)
echo "$f: fotogramas $n0/$n1 · imagen $([ "$m0" = "$m1" ] && echo IGUAL || echo DISTINTA) · PCM $([ "$a0" = "$a1" ] && echo IGUAL || echo DISTINTO) · pcm=$a0"
[ "$n0" = "$n1" ] && [ "$n0" -gt 1000 ] && [ "$m0" = "$m1" ] && [ "$a0" = "$a1" ] && mv "$t" "$f" && echo "sustituido"
ffprobe -v error -select_streams v:0 -show_entries stream=color_space,color_transfer,color_primaries,color_range -of default=nw=1 "$f" | tr '\n' ' '; echo
ffprobe -v error -show_entries format_tags=major_brand -of default=nw=1 "$f" >/dev/null; ffmpeg -nostdin -v error -i "$f" -c copy -f null - && echo "ok"
