#!/bin/bash
# medir-prueba.sh — mide la prueba 076: sonoridad de la pieza y de cada ventana, y los cortes secos sin voz sobre el audio del render.
cd "$(dirname "$0")/../../.." || exit 1
P=proyectos/076/pruebas-720p/076-recorrido.mp4
SAL=proyectos/076/medidas/audio-prueba.txt
{
echo "== pieza entera"
ffmpeg -nostdin -hide_banner -i "$P" -af ebur128=peak=true -f null - 2>&1 | awk '/Summary/{f=1} f' | grep -E "^\s+(I:|LRA:)|Peak:" | head -4
echo "== ventanas"
for spec in "apertura 0.20 2.60" "voz-hook 3.40 5.60" "paseo 6.50 12.80" "voz-mitad 13.70 17.20" "bloque5 17.90 25.90" "voz-cta 26.60 29.20" "cola-tarjeta 29.95 31.90"; do
  set -- $spec
  uv run proyectos/076/herramientas/lufs-rangos.py "$P" "$1=$2-$3"
done
echo "== cortes secos sin voz en el audio del render"
uv run proyectos/076/herramientas/golpes-render.py "$P" 188 254 317 533 610 676
} > "$SAL" 2>&1
cat "$SAL"
