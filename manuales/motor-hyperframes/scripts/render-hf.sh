#!/usr/bin/env bash
# render-hf.sh — renderiza una pieza de HyperFrames pasando por las DOS puertas.
#
# Uso:
#   bash manuales/motor-hyperframes/scripts/render-hf.sh 008            # prueba (draft)
#   bash manuales/motor-hyperframes/scripts/render-hf.sh 008 --final    # final (high)
#
# POR QUÉ UN WRAPPER Y NO `npx hyperframes render` A PELO. Tres razones, y las
# tres se descubren tarde si no está esto:
#
#   1. `render` a secas escribe en `renders/<nombre>_<timestamp>.mp4` RELATIVO AL
#      CWD. En este repo las pruebas van a proyectos/NNN/pruebas-720p/ y los
#      finales a proyectos/NNN/finales/ — las mismas carpetas que el otro motor.
#      OJO con el nombre de la carpeta: aquí la prueba sale a LIENZO COMPLETO con
#      `--quality draft` (rápida y ligera por bitrate), no reducida a la mitad
#      como el `--scale=0.5` de Remotion en R06. Se comparte carpeta, no receta.
#   2. Las puertas se saltan solas si no las llama nadie. Aquí son dos y no una:
#      `revisar-hf.mjs` (los invariantes del repo) y `hyperframes check` (los
#      píxeles). Ninguna sustituye a la otra.
#   3. La telemetría del CLI habla con la red en cada invocación. No rompe el
#      render, pero no pinta nada en un pipeline de vídeo: se apaga aquí.
#
# El fps NO se pasa por flag a propósito: vive en `data-fps` de la composición,
# que es donde `revisar-hf.mjs` lo vigila. Un `--fps` aquí sería un segundo sitio
# donde equivocarse, y el que gana en silencio.
set -euo pipefail

NNN="${1:-}"
MODO="${2:-}"
if [[ -z "$NNN" ]]; then
  echo "Uso: bash manuales/motor-hyperframes/scripts/render-hf.sh <NNN> [--final]" >&2
  exit 1
fi

AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$AQUI/../../.." && pwd)"
PROY="$ROOT/proyectos/$NNN/hf"

if [[ ! -f "$PROY/index.html" ]]; then
  echo "✖ No hay proyectos/$NNN/hf/index.html" >&2
  echo "  Créalo:  node manuales/motor-hyperframes/scripts/nuevo-hf.mjs $NNN" >&2
  exit 1
fi

export HYPERFRAMES_NO_TELEMETRY=1

if [[ "$MODO" == "--final" ]]; then
  CALIDAD="high"
  SALIDA="$ROOT/proyectos/$NNN/finales/$NNN-hf.mp4"
else
  CALIDAD="draft"
  SALIDA="$ROOT/proyectos/$NNN/pruebas-720p/$NNN-hf-prueba.mp4"
fi

echo "── Puerta 1/2: invariantes del repo ──────────────────────────────"
node "$ROOT/manuales/motor-hyperframes/scripts/revisar-hf.mjs" "$NNN"

echo "── Puerta 2/2: lint · runtime · layout · motion · contraste ──────"
npx hyperframes check "$PROY"

echo "── Render ($CALIDAD) ─────────────────────────────────────────────"
mkdir -p "$(dirname "$SALIDA")"
npx hyperframes render "$PROY" -o "$SALIDA" --quality "$CALIDAD"

echo
echo "🎬 ${SALIDA#"$ROOT"/}"
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,nb_frames \
  -show_entries format=duration -of default=noprint_wrappers=1 "$SALIDA"
echo
if [[ "$MODO" != "--final" ]]; then
  echo "Mira frames ANTES del final (R05 del otro motor vale igual aquí):"
  echo "  npx hyperframes snapshot ${PROY#"$ROOT"/} --at 0,2,4,6"
  echo "Cuando el usuario dé el OK:  bash manuales/motor-hyperframes/scripts/render-hf.sh $NNN --final"
fi
