#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/choco-010/` desde el material original.
#
#   bash proyectos/010/normalizar.sh [carpeta-origen]
#
# POR QUÉ EXISTE. Los 224 MB de `public/choco-010/` NO están en git (ver
# .gitignore): en el repo queda el manifiesto con sha256 y esta receta, no el
# binario. Un clon nuevo con el material original delante repone la carpeta
# entera y el proyecto vuelve a renderizar igual.
#
# QUÉ HACE CADA PARÁMETRO, porque los tres son decisiones y no valores por
# defecto (artefactos/01-plan.md §material):
#   · `scale=1296`  1080 × 1,2 = el techo de punch-in del plan. A 1080 el
#                   navegador tendría que AMPLIAR otra vez en cada corte con zoom.
#   · `-r 30`       los clips llegan a 30 y 60 fps; la comp es de 30 (director §3a).
#   · `-an`         el audio de cámara no entra: en `v-gracias` es alguien
#                   hablando, y encima de otra locución eso es ruido.
#   · rotación      ffmpeg AUTOROTA al decodificar, así que `scale` opera sobre
#                   el frame ya derecho y la salida sale sin matriz. Es el punto
#                   de la regla R19 y la razón de que esto no se haga en Remotion.
set -euo pipefail

ORIGEN="${1:-$HOME/Downloads/Choco}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/choco-010"
MANIFIESTO="$(dirname "${BASH_SOURCE[0]}")/manifiesto.json"

[ -d "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }
mkdir -p "$DESTINO"

video () {
  echo "🎬 $2"
  ffmpeg -nostdin -y -i "$ORIGEN/$1" -an -r 30 \
    -vf "scale=1296:-2:flags=lanczos,unsharp=5:5:0.45:5:5:0.0" \
    -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart \
    "$DESTINO/$2" >/dev/null 2>&1
}
foto () {
  echo "🖼  $2"
  ffmpeg -nostdin -y -i "$ORIGEN/$1" -vf "scale=1296:-2:flags=lanczos" -q:v 2 \
    "$DESTINO/$2" >/dev/null 2>&1
}

video "montando-donaciones-lancha.MP4"       v-lancha.mp4
video "juan-papitas-manejando-el-camion.MP4" v-camion.mp4
video "repartiendo-mercados.MP4"             v-mercados.mp4
video "ninos-con-regalos.MP4"                v-ninos.mp4
video "Solo-dejar-el-gracias-al-final.MP4"   v-gracias.mp4
foto "bote.JPG"                  f-bote.jpg
foto "casa-bajos-recursos.JPG"   f-casa1.jpg
foto "casa-bajos-recursps-2.JPG" f-casa2.jpg
foto "casa-bajos-recursos-3.JPG" f-casa3.jpg
foto "comunidades-a-pie.JPG"     f-apie.jpg
foto "entrega-mercados.JPG"      f-entrega1.jpg
foto "entrega-mercados-2.JPG"    f-entrega2.jpg
foto "entrega-mercados-3.JPG"    f-entrega3.jpg

# La VOZ que monta la comp es la PROCESADA, no el original (vo/README.md).
echo "🎙  010-vo.wav (procesada)"
cp "$RAIZ/proyectos/010/vo/010-vo-limpia.wav" "$DESTINO/010-vo.wav"

# La CAMA MUSICAL, si está (proyectos/010/musica/README.md). No se regenera
# desde el original aquí: el recorte y el loudnorm a −15 LUFS son una receta
# aparte, y el origen es un archivo del cliente que puede no estar en este disco.
if [ -f "$RAIZ/proyectos/010/musica/010-musica.wav" ]; then
  echo "🎵 010-musica.wav"
  cp "$RAIZ/proyectos/010/musica/010-musica.wav" "$DESTINO/010-musica.wav"
else
  echo "⚠️  sin 010-musica.wav — la comp saldrá a voz sola si HAY_MUSICA sigue en true"
fi

echo
echo "✅ repuesto en $DESTINO"
echo "   comprueba con:  node proyectos/010/revisar-010.mjs"
[ -f "$MANIFIESTO" ] && echo "   sha256 esperados en $MANIFIESTO"
