#!/bin/zsh
# R22: el arreglo de etiquetas no toca píxeles ni audio: framemd5 DECODIFICADO (sin `-c copy`) y md5 del PCM de las dos versiones, con el recuento de fotogramas.
cd "$(dirname "$0")/../finales" || exit 1
for f in "$@"; do
  echo "== $f"
  ffmpeg -nostdin -v error -i "$f" -map 0:v:0 -f framemd5 - | grep -v '^#' > /tmp/frames-$$.txt
  echo "fotogramas: $(wc -l < /tmp/frames-$$.txt | tr -d ' ') · md5 de los fotogramas: $(md5 -q /tmp/frames-$$.txt)"
  rm -f /tmp/frames-$$.txt
  ffmpeg -nostdin -v error -i "$f" -map 0:a:0 -f md5 -
done
