#!/bin/bash
# arregla-color.sh ARCHIVO.mp4 … — etiquetas de color BT.709 completas (primarias, transferencia y matriz en el VUI + átomo colr) SIN recodificar,
# y comprueba que ni la imagen ni el audio decodificados cambian (md5 antes y después). Es la misma receta de `render-final.sh`, para las versiones con ficha
# (`ficha.mjs` deja la matriz bt709 pero primarias y transferencia «unknown»).
for f in "$@"; do
  tmp="${f%.mp4}.arreglado.mp4"
  ffmpeg -nostdin -y -v error -i "$f" -c copy \
    -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
    -movflags +write_colr+faststart "$tmp" || { echo "⛔ ffmpeg falló con $f"; continue; }
  v0="$(ffmpeg -nostdin -v error -i "$f" -map 0:v:0 -f md5 -)"; v1="$(ffmpeg -nostdin -v error -i "$tmp" -map 0:v:0 -f md5 -)"
  a0="$(ffmpeg -nostdin -v error -i "$f" -map 0:a:0 -f md5 -)"; a1="$(ffmpeg -nostdin -v error -i "$tmp" -map 0:a:0 -f md5 -)"
  if [ -n "$v0" ] && [ "$v0" = "$v1" ] && [ -n "$a0" ] && [ "$a0" = "$a1" ]; then
    mv "$tmp" "$f"; echo "✔ $(basename "$f"): etiquetas arregladas (imagen y audio idénticos)"
  else
    rm -f "$tmp"; echo "⛔ $(basename "$f"): el arreglo cambió la imagen o el audio; lo dejo como estaba"
  fi
done
