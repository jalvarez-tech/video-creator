#!/usr/bin/env bash
# artefactos.sh — prepara los artefactos intermedios de un proyecto.
#
# Uso:
#   bash manuales/director-video/scripts/artefactos.sh 004
#
# Copia las plantillas 01-plan / 02-layout / 03-timeline a
# proyectos/NNN/artefactos/ (sin sobrescribir lo que ya exista) y deja el
# proyecto listo para que el director escriba las decisiones ANTES del código.
# Por qué: manuales/director-video/artefactos/README.md
set -euo pipefail

NNN="${1:-}"
if [[ -z "$NNN" ]]; then
  echo "Uso: bash manuales/director-video/scripts/artefactos.sh <NNN>   (p. ej. 004)" >&2
  exit 1
fi

AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$AQUI/../../.." && pwd)"
ORIGEN="$ROOT/manuales/director-video/artefactos"
DESTINO="$ROOT/proyectos/$NNN/artefactos"

mkdir -p "$DESTINO"

for f in 01-plan.md 02-layout.md 03-timeline.md; do
  if [[ -e "$DESTINO/$f" ]]; then
    echo "· $f ya existe — no se toca"
  else
    sed "s/proyecto NNN/proyecto $NNN/g; s/graficos-NNN/graficos-$NNN/g; s/camara-NNN/camara-$NNN/g; s/cues-NNN/cues-$NNN/g; s/subtitulos-NNN/subtitulos-$NNN/g; s|proyectos/NNN|proyectos/$NNN|g" \
      "$ORIGEN/$f" > "$DESTINO/$f"
    echo "✅ $f"
  fi
done

echo
echo "Artefactos en proyectos/$NNN/artefactos/"
echo "Orden: 01-plan → 02-layout → 03-timeline → código. No te saltes ninguno."
