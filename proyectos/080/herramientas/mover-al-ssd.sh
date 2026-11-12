#!/bin/bash
# mover-al-ssd.sh NNN… — lleva lo entregable de cada pieza de la suite Go Living a la carpeta de publicación del SSD y, SOLO si cada copia es idéntica (sha256), borra el original local.
#
#   bash proyectos/080/herramientas/mover-al-ssd.sh 080 081 082
#   SOLO="ficha caption" bash proyectos/080/herramientas/mover-al-ssd.sh 080 081   (solo esas partes: al actualizar la ficha)
#
# Destino (plano, como «Casa - La Ceja/Videos Social Media»):
#   /Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/
#     NNN-recorrido.mp4 (máster CRF 12) · NNN-recorrido-crf16.mp4 (ligera) · NNN-recorrido-ficha.mp4 · NNN-portada.png · NNN.srt · NNN-caption.md
#
# MOVER (se borra el local tras comprobar el sha256): los .mp4 y la portada (pesan y eran copia única).
# COPIAR (el local se queda): el .srt y el caption, que son texto pequeño y fuente del proyecto.
# `cp -X` no copia atributos extendidos: sin los `._archivo` que macOS deja en el exFAT.
DEST="/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media"
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
if [ ! -d "$DEST" ]; then echo "⛔ no encuentro $DEST (¿SSD desmontado?)"; exit 1; fi
sha() { shasum -a 256 "$1" | cut -d' ' -f1; }
fallos=0

# lleva ORIGEN a DESTINO/NOMBRE; modo = mover | copiar
lleva() {
  local origen="$1" nombre="$2" modo="$3"
  if [ ! -f "$origen" ]; then echo "   · falta $origen"; fallos=$((fallos+1)); return; fi
  local destino="$DEST/$nombre" s0 s1
  s0="$(sha "$origen")"
  if [ -f "$destino" ] && [ "$(sha "$destino")" = "$s0" ]; then
    echo "   = $nombre ya está (idéntico)"
  else
    local tmp="$destino.parcial"
    cp -X "$origen" "$tmp" || { rm -f "$tmp"; echo "   ⛔ no pude copiar $nombre"; fallos=$((fallos+1)); return; }
    s1="$(sha "$tmp")"
    if [ "$s0" != "$s1" ]; then rm -f "$tmp"; echo "   ⛔ $nombre: el sha256 no coincide, no borro el original ni toco lo que había"; fallos=$((fallos+1)); return; fi
    mv -f "$tmp" "$destino"   # solo ahora sustituye al anterior
    echo "   ✔ $nombre ($(du -h "$destino" | cut -f1)) sha256 ${s0:0:8}"
  fi
  if [ "$modo" = "mover" ]; then rm -f "$origen"; fi
}

# SOLO="ficha caption" lleva solo esas partes (master, ligera, ficha, portada, srt, caption); sin SOLO, todo.
quiere() { [ -z "$SOLO" ] || [[ " $SOLO " == *" $1 "* ]]; }
for n in "$@"; do
  echo "== $n"
  F="$RAIZ/proyectos/$n/finales"
  quiere master  && lleva "$F/$n-recorrido.mp4"        "$n-recorrido.mp4"        mover
  quiere ligera  && lleva "$F/$n-recorrido-crf16.mp4"  "$n-recorrido-crf16.mp4"  mover
  quiere ficha   && lleva "$F/$n-recorrido-ficha.mp4"  "$n-recorrido-ficha.mp4"  mover
  quiere portada && lleva "$F/$n-portada.png"          "$n-portada.png"          mover
  quiere srt     && lleva "$F/$n.srt"                  "$n.srt"                  copiar
  quiere caption && lleva "$RAIZ/proyectos/$n/caption.md" "$n-caption.md"        copiar
done
if [ "$fallos" -ne 0 ]; then echo "⛔ $fallos problema(s): revisa lo de arriba"; exit 1; fi
echo "✅ todo movido y verificado"
