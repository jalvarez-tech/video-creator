#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/clip-013.mp4` desde el clip original.
#
#   bash proyectos/013/normalizar.sh [ruta-al-MOV]
#
# POR QUÉ EXISTE. El clip es material propio del cliente y no entra en git: en el
# repo quedan esta receta y los planes. Con el MOV delante, un clon nuevo repone
# la pieza entera.
#
# LO QUE TRAÍA EL ORIGINAL, medido con ffprobe (R01):
#   · 1920×1080 en el contenedor + `rotation=-90` en la matriz → la pantalla son
#     1080×1920. Planificar sobre el dato crudo sería recortar 16:9 (R19).
#   · h264 8 bit **BT.709** (`color_transfer=bt709`, `yuv420p`). Aquí NO hay HDR
#     —a diferencia del 011 y el 012— así que no hay tone-map que hacer (R21).
#     Se comprueba igual abajo y el script PARA si algún día llega un HLG/PQ:
#     un tone-map que falta no se ve en ningún frame, sólo se ve lavado.
#   · Dos pistas de audio (estéreo AAC + una de 4 canales, el audio espacial del
#     iPhone). Se toma SOLO la primera: la otra no la lee Chromium.
#
# PARÁMETROS, que son decisiones y no valores por defecto:
#   · 1080×1920   la medida NATIVA de pantalla, sin subir. El 011 y el 012
#                 escalaban a 1296 (×1,2) porque su cámara hacía punch-in; esta
#                 pieza NO lleva cámara virtual (el plano ya se mueve solo, es de
#                 mano), así que ampliar sería inventar píxeles para nada.
#   · -r 30       el fps ORIGINAL manda (R01); la comp es de 30
#   · CON audio   el clip lleva LA VOZ de la pieza (como el 012, no como el 011)
#                 y AQUÍ se trata: ver el bloque de abajo.
#
# EL TRATAMIENTO DE AUDIO ESTÁ APAGADO POR DEFECTO — decisión del cliente, que
# prefirió el audio tal cual salió de la cámara. Se enciende con `--voz`:
#
#     bash proyectos/013/normalizar.sh                # audio ORIGINAL (lo publicado)
#     bash proyectos/013/normalizar.sh "" --voz       # audio tratado
#
# No se borra la cadena porque la MEDICIÓN es lo que vale, y es la misma tabla
# que habrá que mirar el día que llegue otro clip de evento.
#
# EL TRATAMIENTO, y por qué es el que es (medido, no de catálogo).
# El original venía a -26,3 LUFS —inaudible en un móvil— y con el ambiente del
# evento a solo 3 dB por debajo de su voz. O sea: no es un siseo bajo una voz,
# es una sala con música casi al mismo volumen. Medido por bandas (voz vs cola
# sin voz):
#
#     60-180 Hz   separación 1,6 dB   ← aquí NO hay nada que salvar
#    180-500 Hz   separación 1,7 dB   ← ni aquí
#    500-1500 Hz  separación 4,7 dB
#   1500-4000 Hz  separación 7,2 dB   ← aquí gana ella
#   4000-8000 Hz  separación 6,1 dB
#
# La cadena se construye sobre eso y no sobre un preset: cortar por debajo de
# 155 Hz (su fundamental ronda los 200), recortar 4,5 dB el bajo-medio donde
# está el barullo, y realzar 5 dB los 2,7 kHz, que es donde saca 7,2 dB.
# El recorte del bajo-medio NO sube a 6 dB aunque separe más: a 6 su voz se
# queda fina. El de-esser va DESPUÉS del realce, que es lo que lo hace falta.
#
# EL LIMITADOR NO ESTÁ, y es a propósito. `alimiter` mide pico de MUESTRA; una
# primera versión con él acabó en -0,5 dBTP pese a pedir -1,5, porque el pico
# real entre muestras se le escapa. Lo hace `loudnorm`, que sí mide true peak.
# Resultado medido: -15,3 LUFS y **-1,8 dBTP** ya dentro del MP4. Se pide -2,0 y
# no -1,5 porque el codificador AAC sube el pico real ~0,2 dB: pedir el valor
# final exacto es quedarse corto justo en el sitio que se quería proteger.
#
# `-shortest` NO es decorativo. La cadena de audio deja una cola (el `afftdn`
# tiene latencia propia): sin él el stream de audio salía 23 ms más largo que el
# de vídeo, la duración de FORMATO pasaba de 12,767 a 12,800 s y
# `framesDelMedio` —que redondea segundos × fps— devolvía **384 frames en vez de
# 383**. O sea un frame final sin rótulo, en una pieza que se reproduce en
# bucle. Es un fallo que no se ve renderizando el medio del vídeo.
#
# LO QUE ESTO NO HACE: quitar el fondo. La separación pasa de 3,0 a 4,2 dB, que
# se nota, pero el techo de un tratamiento local sobre música + gente es ése.
# Quitarlo de verdad pide separación de fuentes (un aislador de voz), y eso es
# subir el audio de una persona a un tercero: se pide, no se hace por defecto.
set -euo pipefail

ORIGEN="${1:-}"
[ -n "$ORIGEN" ] || ORIGEN="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/original.mov"
TRATAR_VOZ=0
for arg in "$@"; do [ "$arg" = "--voz" ] && TRATAR_VOZ=1; done
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/clip-013.mp4"

[ -f "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }

rot=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
      -of default=nw=1:nk=1 "$ORIGEN" | head -1)
case "$rot" in
  -90) tr="transpose=clock" ;;
  90)  tr="transpose=cclock" ;;
  *)   echo "❌ rotación no prevista ($rot)"; exit 1 ;;
esac

# R21: si el original fuera HLG o PQ habría que tone-mapear ANTES de escalar.
trc=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer \
      -of default=nw=1:nk=1 "$ORIGEN")
case "$trc" in
  arib-std-b67|smpte2084)
    echo "❌ el original es HDR ($trc): esta receta es la SDR. Copia el tone-map de proyectos/012/normalizar.sh"; exit 1 ;;
esac

if [ "$TRATAR_VOZ" = "1" ]; then
  # La cadena de voz, SIN el loudnorm: ése va en dos pasadas (medir y aplicar),
  # porque en una sola el resultado depende de por dónde empiece a analizar.
  VOZ="highpass=f=155,equalizer=f=330:t=q:w=1.1:g=-4.5,afftdn=nr=20:nf=-27"
  VOZ="$VOZ,equalizer=f=2700:t=q:w=1.1:g=5,equalizer=f=5200:t=q:w=1.4:g=2,deesser=i=0.45"
  VOZ="$VOZ,acompressor=threshold=-24dB:ratio=3.5:attack=6:release=170:makeup=2.5"

  echo "· midiendo el audio (pasada 1 de 2)…"
  MED=$(ffmpeg -hide_banner -i "$ORIGEN" -map 0:a:0 -vn \
          -af "${VOZ},loudnorm=I=-14:TP=-2.0:LRA=10:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
  lee() { echo "$MED" | grep "\"$1\"" | grep -oE '\-?[0-9.]+' | head -1; }
  NORM="loudnorm=I=-14:TP=-2.0:LRA=10"
  NORM="$NORM:measured_I=$(lee input_i):measured_TP=$(lee input_tp)"
  NORM="$NORM:measured_LRA=$(lee input_lra):measured_thresh=$(lee input_thresh)"
  FILTRO_AUDIO="${VOZ},${NORM}"
  echo "· normalizando, CON tratamiento de voz…"
else
  # `anull` y no un array vacío: el bash 3.2 que trae macOS aborta al expandir
  # `"${arr[@]}"` vacío bajo `set -u`, y como el script es `set -euo pipefail`
  # eso lo mataba ANTES de escribir el destino — dejando el archivo anterior en
  # su sitio y pareciendo que había funcionado. Un filtro nulo no cuesta nada y
  # no tiene bordes.
  FILTRO_AUDIO="anull"
  echo "· normalizando, con el audio ORIGINAL (usa --voz para tratarlo)…"
fi
ffmpeg -y -noautorotate -i "$ORIGEN" \
  -map 0:v:0 -map 0:a:0 \
  -vf "${tr},scale=1080:1920:flags=lanczos,format=yuv420p" \
  -af "$FILTRO_AUDIO" \
  -r 30 -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 192k -ac 2 -ar 48000 -shortest -movflags +faststart "$DESTINO"

echo "✅ $DESTINO"
ffprobe -v error -show_entries stream=width,height,r_frame_rate,nb_frames,codec_type \
  -show_entries format=duration -of default=nw=1 "$DESTINO"
echo "· audio resultante:"
ffmpeg -hide_banner -i "$DESTINO" -af loudnorm=print_format=summary -f null - 2>&1 \
  | grep -E "Input (Integrated|True Peak)" | sed 's/Input/   /' 
