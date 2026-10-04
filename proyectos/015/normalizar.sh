#!/usr/bin/env bash
# normalizar.sh — repone `remotion/public/apex-015/` desde los 9 clips originales.
#
#   bash proyectos/015/normalizar.sh [carpeta-origen]      (JOBS=3 por defecto)
#
# POR QUÉ EXISTE. Los clips son material propio de la presentadora y no entran
# en git (ver .gitignore): en el repo quedan esta receta, el plan y los sha256
# de los originales (abajo). Con la carpeta delante, un clon nuevo repone la
# pieza entera.
#
# LO QUE TRAÍAN LOS ORIGINALES, medido con ffprobe (R01), los nueve iguales:
#   · 1920×1080 en el contenedor + `rotation=-90` en la matriz → la pantalla son
#     1080×1920 (R19). Planificar sobre el dato crudo sería recortar 16:9.
#   · HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020): sin tone-map sale lavado
#     (R21). Lo hace VideoToolbox (`scale_vt`), como en el 011, el 012 y el 014.
#     La receta PARA si le entra un SDR: tone-mapear un SDR también lo estropea.
#   · 30 fps exactos (30/1), vídeo y audio con `start_time` 0.
#   · UNA pista de audio MONO AAC 48 kHz: micrófono de solapa (se ve en el
#     top), no el estéreo del iPhone. Es la voz de la pieza.
#
# DOS SALIDAS POR CLIP, y es a propósito:
#   · `IMG_XXXX.mp4`  vídeo MUDO (`-an`) a 1296×2304 · 30 fps. `<PistaMetraje>`
#     monta el vídeo siempre mudo (R19): el audio de cámara no entra por ahí.
#     1296 = 1080 × 1,2, el techo del punch-in (criterio del 011): los cortes
#     llevan un empuje suave y a esta escala todavía se REDUCE.
#   · `IMG_XXXX.wav`  la VOZ tal cual sale del micro: PCM 48 kHz mono, sin
#     filtro, sin normalizar, sin compresor. La presentadora prefiere el audio
#     de evento sin tratar (013); la única decisión sobre él es la ganancia por
#     clip, y ésa vive en el plan (`metraje-015.ts`, `VOZ_015`), no aquí. WAV y
#     no AAC para que el corte caiga a la muestra: el AAC arrastra 1024 muestras
#     de «priming» que desplazan la voz ~21 ms contra su imagen.
set -euo pipefail

ORIGEN="${1:-$HOME/Downloads/Videos APEX}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESTINO="$RAIZ/remotion/public/apex-015"
JOBS="${JOBS:-3}"

# Los nueve clips del encargo, EN EL ORDEN DE LA PIEZA (que es el de grabación)
# y con el sha256 del original: si la carpeta trae otra cosa con el mismo
# nombre, la receta lo dice en vez de montar un vídeo distinto en silencio.
CLIPS=(
  "IMG_2592.mov c9c9e193"
  "IMG_2593.mov e2f37ba7"
  "IMG_2598.mov c51d0d22"
  "IMG_2601.mov 8feb9033"
  "IMG_2603.mov 30d76167"
  "IMG_2614.mov cddd4c92"
  "IMG_2617.mov 53814d97"
  "IMG_2624.mov 55b43802"
  "IMG_2626.mov 0a3c74d4"
)

[ -d "$ORIGEN" ] || { echo "❌ No existe el origen: $ORIGEN"; exit 1; }
command -v ffmpeg >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }
mkdir -p "$DESTINO"
export ORIGEN DESTINO

normaliza () {
  local f="$1" b="${1%.*}" rot trc tr
  [ -f "$ORIGEN/$f" ] || { echo "❌ falta $f en $ORIGEN"; return 1; }
  rot=$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation \
        -of default=nw=1:nk=1 "$ORIGEN/$f" | head -1)
  trc=$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer \
        -of default=nw=1:nk=1 "$ORIGEN/$f")
  case "$rot" in
    -90) tr="transpose_vt=dir=clock" ;;
    90)  tr="transpose_vt=dir=cclock" ;;
    *)   echo "❌ $f: rotación no prevista ($rot)"; return 1 ;;
  esac
  case "$trc" in
    arib-std-b67|smpte2084) ;;
    *) echo "❌ $f NO es HDR ($trc): esta receta tone-mapea. Usa la SDR de proyectos/013/normalizar.sh"; return 1 ;;
  esac

  ffmpeg -nostdin -y -v error -hwaccel videotoolbox -hwaccel_output_format videotoolbox_vld \
    -noautorotate -i "$ORIGEN/$f" -an \
    -vf "scale_vt=color_matrix=bt709:color_primaries=bt709:color_transfer=bt709,${tr},hwdownload,format=p010le,scale=1296:2304:flags=lanczos,format=yuv420p" \
    -fps_mode cfr -r 30 -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart \
    "$DESTINO/$b.mp4"

  # La voz, sin tocar: solo se decodifica a PCM. Ni filtro ni nivel (ver cabecera).
  ffmpeg -nostdin -y -v error -i "$ORIGEN/$f" -map 0:a:0 -c:a pcm_s16le -ar 48000 -ac 1 "$DESTINO/$b.wav"
  echo "🎬 $b  (vídeo mudo + voz)"
}
export -f normaliza

# Comprobación de identidad ANTES de gastar un minuto de GPU.
malos=0
for c in "${CLIPS[@]}"; do
  f="${c%% *}"; esperado="${c##* }"
  [ -f "$ORIGEN/$f" ] || { echo "❌ falta $f"; malos=1; continue; }
  real=$(shasum -a 256 "$ORIGEN/$f" | cut -c1-8)
  [ "$real" = "$esperado" ] || { echo "⚠️  $f: sha256 $real, se esperaba $esperado (¿otro archivo con el mismo nombre?)"; malos=1; }
done
[ "$malos" = 0 ] || { echo "❌ el material no es el del plan: revísalo antes de normalizar"; exit 1; }

printf '%s\n' "${CLIPS[@]}" | cut -d' ' -f1 | xargs -P "$JOBS" -I{} bash -c 'normaliza "$@"' _ {}

echo
echo "✅ repuesto en $DESTINO"
printf "%-10s %6s %8s %8s\n" clip frames video_s voz_s
for c in "${CLIPS[@]}"; do
  b="${c%%.*}"
  n=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nw=1:nk=1 "$DESTINO/$b.mp4")
  dv=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$DESTINO/$b.mp4")
  da=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$DESTINO/$b.wav")
  printf "%-10s %6s %8.3f %8.3f\n" "$b" "$n" "$dv" "$da"
done
