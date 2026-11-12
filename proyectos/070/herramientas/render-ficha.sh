#!/bin/bash
# render-ficha.sh NNN — la versión «con ficha» de una pieza de la suite Go Living, EN TURNO.
#
#   bash proyectos/070/herramientas/render-ficha.sh 070
#
# Necesita la FINAL ya exportada (de ahí sale el audio, copiado tal cual): la local `proyectos/NNN/finales/NNN-recorrido.mp4` o, si ya se llevó al SSD, la de
# `Suite Go Living/Videos Social Media/NNN-recorrido.mp4` (hay que tener el SSD montado). Deja
# `proyectos/NNN/finales/NNN-recorrido-ficha.mp4`. Es el método de la skill `ficha-luxur` (§3):
#   a. la base SIN subtítulos, muda y casi sin pérdida (`--props={"sinSubtitulos":true} --muted --crf=6`);
#   b. `ficha.mjs video suite-go-living <base> --audio <final>`: pinta la ficha (tipo · lugar · precio), la superpone con sus fundidos y copia el audio de la final;
#   c. la base intermedia se borra.
# Antes de poner la ficha se comprueba que la base ES la final (mismos fotogramas y la mitad de arriba, donde nunca hay subtítulos, casi idéntica: PSNR > 30 dB).
# Mismo candado que `render-final.sh` y `render-prueba.sh` (`remotion/out/.turno-render`); por debajo de 20 GB libres se para.
NNN="$1"
if [[ ! "$NNN" =~ ^[0-9]{3}$ ]]; then echo "uso: bash proyectos/070/herramientas/render-ficha.sh NNN"; exit 1; fi
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"
TURNO="$RAIZ/remotion/out/.turno-render"
FIN="$RAIZ/proyectos/$NNN/finales"
FINAL="$FIN/$NNN-recorrido.mp4"
SSD_FINAL="/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/$NNN-recorrido.mp4"
if [ ! -f "$FINAL" ] && [ -f "$SSD_FINAL" ]; then FINAL="$SSD_FINAL"; echo "ℹ usando la final del SSD: $FINAL"; fi
LIMPIO="$RAIZ/remotion/out/$NNN-limpio.mp4"
SALIDA="$FIN/$NNN-recorrido-ficha.mp4"
mkdir -p "$RAIZ/remotion/out"

if [ ! -f "$FINAL" ]; then echo "⛔ no existe la final ni en $FIN ni en el SSD (¿está montado?): expórtala antes (render-final.sh $NNN)"; exit 1; fi
libre_gb() { df -g "$RAIZ" | awk 'NR==2 {print $4}'; }

esperando=0
until mkdir "$TURNO" 2>/dev/null; do
  if [ "$esperando" -eq 0 ]; then echo "⏳ esperando el turno de render (hay otro en marcha)…"; esperando=1; fi
  sleep 10
done
trap 'rmdir "$TURNO" 2>/dev/null' EXIT

libre="$(libre_gb)"
if [ "$libre" -lt 20 ]; then echo "⛔ solo quedan ${libre} GB libres: paro antes de renderizar la base de $NNN"; exit 1; fi
echo "▶ $(date +%H:%M:%S) $NNN base sin subtítulos → $LIMPIO  [${libre} GB libres]"
( cd "$RAIZ/remotion" && npx remotion render src/index.ts "Recorrido$NNN" "out/$NNN-limpio.mp4" \
    --props='{"sinSubtitulos":true}' --muted --crf=6 --x264-preset=fast --color-space=bt709 --image-format=png --gl=angle \
    --concurrency=4 --offthreadvideo-cache-size-in-bytes=300000000 ) || exit 1
rmdir "$TURNO" 2>/dev/null; trap - EXIT   # lo que sigue no es un render de Remotion: otro puede entrar

# La base tiene que ser la final: mismos fotogramas y la mitad de arriba casi idéntica.
nf() { ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$1"; }
f0="$(nf "$FINAL")"; f1="$(nf "$LIMPIO")"
if [ "$f0" != "$f1" ]; then echo "⛔ la base tiene $f1 fotogramas y la final $f0: el código ya no es el de esa final, no sigo"; exit 1; fi
psnr="$(ffmpeg -nostdin -v info -i "$LIMPIO" -i "$FINAL" -lavfi "[0:v]crop=1080:960:0:0[a];[1:v]crop=1080:960:0:0[b];[a][b]psnr" -f null - 2>&1 | grep -o 'average:[0-9.a-z]*' | tail -1)"
echo "   base vs final (mitad de arriba): $psnr, $f1 fotogramas"
val="${psnr#average:}"
if [ "$val" != "inf" ] && awk -v v="$val" 'BEGIN{exit !(v < 30)}'; then echo "⛔ PSNR $val < 30 dB: la base no se parece a la final"; exit 1; fi

( cd "$RAIZ" && node .claude/skills/ficha-luxur/scripts/ficha.mjs video suite-go-living "remotion/out/$NNN-limpio.mp4" \
    --audio "$FINAL" --salida "proyectos/$NNN/finales/$NNN-recorrido-ficha.mp4" ) || exit 1
rm -f "$LIMPIO"
echo "✅ $(date +%H:%M:%S) $NNN ficha: $(ls -lh "$SALIDA" | awk '{print $5}')"
