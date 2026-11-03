#!/bin/zsh
# Etiquetas BT.709 completas SIN recodificar (receta de ficha-oculta.mjs / 060 §9): el flujo de vídeo y el audio no cambian ni un bit.
# uso: etiquetar.zsh <mp4> [...]
for f in "$@"; do
  out="${f%.mp4}.etiquetado.mp4"
  ffmpeg -v error -y -i "$f" -map 0 -c copy \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
    -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0 \
    -movflags +faststart+write_colr "$out" || { echo "FALLO etiquetando $f"; exit 1; }
  v0=$(ffmpeg -v error -i "$f" -map 0:v:0 -f framemd5 - | grep -v '^#' | md5)
  v1=$(ffmpeg -v error -i "$out" -map 0:v:0 -f framemd5 - | grep -v '^#' | md5)
  a0=$(ffmpeg -v error -i "$f" -map 0:a:0 -f md5 -)
  a1=$(ffmpeg -v error -i "$out" -map 0:a:0 -f md5 -)
  c=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_space,color_transfer,color_primaries,color_range -of csv=p=0 "$out")
  n=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$out")
  echo "$(basename $f): framemd5 $v0 / $v1 · fotogramas $n · PCM $a0 / $a1 · color $c"
  if [[ "$v0" != "$v1" || "$a0" != "$a1" || "$c" != "tv,bt709,bt709,bt709" ]]; then echo "NO coincide: se deja el original y el etiquetado en $out"; exit 1; fi
  mv "$out" "$f"
done
