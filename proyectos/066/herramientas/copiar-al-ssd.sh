#!/bin/bash
# Copia las finales de 066-068 a la carpeta de publicación del lote en el SSD y comprueba cada copia por sha256 (no borra nada del origen).
set -e
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
DEST="/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos Social Media"
mkdir -p "$DEST/Portadas"
malos=0; n=0
copia() { # origen destino
  cp "$1" "$2"
  a=$(shasum -a 256 "$1" | cut -d' ' -f1); b=$(shasum -a 256 "$2" | cut -d' ' -f1)
  n=$((n+1))
  if [ "$a" = "$b" ]; then echo "ok   $(basename "$2")  ${a:0:8}"; else echo "MAL  $(basename "$2")"; malos=$((malos+1)); fi
}
for p in 066 067 068; do
  F="$RAIZ/proyectos/$p/finales"
  for f in "$p-recorrido.mp4" "$p-recorrido-crf16.mp4" "$p-recorrido-ficha.mp4" "$p.srt"; do copia "$F/$f" "$DEST/$f"; done
  copia "$RAIZ/proyectos/$p/caption.md" "$DEST/$p-caption.md"
  copia "$F/$p-portada.png" "$DEST/Portadas/$p-portada.png"
done
echo "copiados $n archivos, $malos con diferencias"
[ $malos -eq 0 ]
