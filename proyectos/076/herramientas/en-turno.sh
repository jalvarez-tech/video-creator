#!/bin/bash
# en-turno.sh COMANDO… — ejecuta un comando con Chrome (stills, renders) EN TURNO: comparte el candado `remotion/out/.turno-render` con `render-prueba.sh` y `render-final.sh`.
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
TURNO="$RAIZ/remotion/out/.turno-render"
mkdir -p "$RAIZ/remotion/out"
esperando=0
until mkdir "$TURNO" 2>/dev/null; do
  if [ "$esperando" -eq 0 ]; then echo "⏳ esperando el turno de render (hay otro en marcha)…"; esperando=1; fi
  sleep 10
done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT
cd "$RAIZ" || exit 1
"$@"
