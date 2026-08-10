#!/usr/bin/env bash
# generar-vo.sh — construye la voz en off de un plan de noticia y devuelve el
# cronometraje REAL, listo para pegar en noticia-NNN.ts.
#
# Uso:
#   generar-vo.sh <guion.txt> [--motor say|elevenlabs|propio] [opciones]
#
#   --motor say          voz de sistema macOS. Gratis, PISTA GUIA. (por defecto)
#   --motor elevenlabs   TTS de verdad. Requiere ELEVENLABS_API_KEY y voice_id.
#   --motor propio       ya tienes los audios grabados: los toma de --partes.
#
#   --voz X        say: nombre (Paulina) · elevenlabs: voice_id · propio: (ignorado)
#   --ppm N        solo `say` (palabras/minuto, def. 178)
#   --pausa S      respiro entre tomas en segundos (def. 0.38)
#   --fps N        fps de la composicion (def. 30)
#   --partes DIR   carpeta con los audios ya locutados, ordenados por nombre.
#                  Se usa siempre con --motor propio; con elevenlabs es la
#                  carpeta que dejo `elevenlabs.py guion`.
#
# Entrada: un archivo `id|texto` por linea (una linea por toma, en orden).
#          Linea sin texto = toma en silencio (cierres, remates).
#
# Salida:  <dir>/vo/NNN-vo.wav — la pista completa, ya con los silencios de
#          separacion, de forma que su duracion total ES la de la composicion.
#          Y por stdout, la tabla de frames de cada toma.
#
# POR QUE ASI: en este formato la voz manda sobre el plan (SKILL §5.4). Escribir
# los frames a ojo y luego encajar el audio produce cortes a mitad de palabra.
# Aqui se hace al reves: se locuta, se MIDE, y el plan sale de la medicion. Por
# eso cambiar de motor (o de locutor) no obliga a remaquetar: se vuelve a correr
# esto y los frames se recalculan solos.
set -euo pipefail

GUION=""; MOTOR="say"; VOZ=""; PPM=178; PAUSA=0.38; FPS=30; PARTES=""
while [ $# -gt 0 ]; do
  case "$1" in
    --motor)  MOTOR="$2"; shift 2 ;;
    --voz)    VOZ="$2"; shift 2 ;;
    --ppm)    PPM="$2"; shift 2 ;;
    --pausa)  PAUSA="$2"; shift 2 ;;
    --fps)    FPS="$2"; shift 2 ;;
    --partes) PARTES="$2"; shift 2 ;;
    -*) echo "Opcion desconocida: $1" >&2; exit 1 ;;
    *)  GUION="$1"; shift ;;
  esac
done
[ -n "$GUION" ] || { echo "Falta el guion: proyectos/NNN/guion-vo.txt" >&2; exit 1; }

case "$MOTOR" in
  say)        [ -n "$VOZ" ] || VOZ="Paulina" ;;   # es_MX: mas natural para audiencia latinoamericana
  elevenlabs) [ -n "$PARTES" ] || { echo "Con --motor elevenlabs pasa --partes <dir con los MP3 de elevenlabs.py guion>" >&2; exit 1; } ;;
  propio)     [ -n "$PARTES" ] || { echo "Con --motor propio pasa --partes <dir con tus audios>" >&2; exit 1; } ;;
  *) echo "Motor desconocido: $MOTOR (say | elevenlabs | propio)" >&2; exit 1 ;;
esac

# El guion se valida ANTES de tocar el disco: más abajo hay un `rm -rf` y la
# rama `*)` del parseo acepta cualquier posicional, así que una llamada con la
# sintaxis vieja (`generar-vo.sh guion Paulina 178 0.38 30`) dejaba GUION=30,
# DIR=$PWD y borraba el vo/.partes del directorio desde el que la lanzaste.
[ -f "$GUION" ] || { echo "✖ No existe el guion: $GUION" >&2; exit 1; }
case "$FPS" in
  ''|*[!0-9]*) echo "✖ --fps inválido: «$FPS». Tiene que ser un entero > 0 (p. ej. 30)." >&2; exit 1 ;;
  0) echo "✖ --fps no puede ser 0." >&2; exit 1 ;;
esac

DIR="$(cd "$(dirname "$GUION")" && pwd)"
OUT="$DIR/vo"
TMP="$OUT/.partes"

# $TMP se borra entero al empezar. Si --partes apunta ahí (o dentro), estaríamos
# borrando el audio que vamos a consumir — y con elevenlabs eso es audio YA
# PAGADO. Se compara con las rutas resueltas, no con lo que escribió el usuario.
if [ -n "$PARTES" ]; then
  [ -d "$PARTES" ] || { echo "✖ No existe la carpeta de --partes: $PARTES" >&2; exit 1; }
  PARTES="$(cd "$PARTES" && pwd)"
  # Se rechaza tanto $TMP como cualquier carpeta que lo CONTENGA: el `rm -rf` de
  # abajo borra $TMP, así que pasar el padre (vo/) también destruye el audio —
  # y con elevenlabs ese audio está pagado.
  case "$PARTES" in
    "$TMP"|"$TMP"/*)
      echo "✖ --partes no puede ser «$TMP»: es el temporal de este script y se borra al empezar." >&2
      echo "  Usa otra carpeta (el SKILL documenta $OUT/partes)." >&2
      exit 1 ;;
  esac
  case "$TMP" in
    "$PARTES"/*)
      echo "✖ --partes «$PARTES» contiene el temporal «$TMP», que este script borra al empezar." >&2
      echo "  Pasa la carpeta de los audios en sí (p. ej. $OUT/partes), no la que la contiene." >&2
      exit 1 ;;
  esac
fi

rm -rf "$TMP"; mkdir -p "$TMP"

BASE="$(basename "$DIR")"
FINAL="$OUT/$BASE-vo.wav"

if [ "$MOTOR" = "say" ]; then
  echo "🎙  motor=say voz=$VOZ · $PPM ppm · pausa ${PAUSA}s · ${FPS} fps"
  echo "    (PISTA GUIA: voz de sistema. Para publicar usa --motor elevenlabs o propio)"
else
  echo "🎙  motor=$MOTOR · partes=$PARTES · pausa ${PAUSA}s · ${FPS} fps"
fi
echo ""

# Los audios ya locutados se toman en ORDEN DE NOMBRE. `elevenlabs.py guion` los
# numera 001-, 002-… justamente para que ese orden coincida con el del guion.
#
# Sin `mapfile`: es un builtin de bash 4+ y macOS trae bash 3.2.57 de serie, que
# es a donde resuelve `#!/usr/bin/env bash` salvo que tengas otro antes en PATH.
# Con `set -e`, el `command not found` (127) mataba el script aquí — es decir,
# los motores `elevenlabs` y `propio` nunca llegaban a ejecutarse en un Mac.
YA=()
if [ -n "$PARTES" ]; then
  while IFS= read -r f; do
    YA+=("$f")
  done < <(find "$PARTES" -type f \( -name '*.mp3' -o -name '*.wav' -o -name '*.m4a' -o -name '*.aiff' \) | LC_ALL=C sort)
  [ "${#YA[@]}" -gt 0 ] || { echo "✖ No hay audios (.mp3/.wav/.m4a/.aiff) en $PARTES" >&2; exit 1; }
fi

lista="$TMP/lista.txt"; : > "$lista"
frame=0; n=0; usados=0
printf "%-22s %8s %8s   %s\n" "toma" "inicio" "fin" "(frames)"
printf "%s\n" "--------------------------------------------------------------"

# `|| [ -n "${id:-}" ]` procesa la ÚLTIMA línea aunque el archivo no termine en
# salto de línea. Sin eso, bash se saltaba esa toma mientras elevenlabs.py sí la
# locutaba (y la facturaba): la pista y el durationInFrames salían cortos y el
# MP3 sobrante quedaba huérfano en --partes, sin ningún aviso.
while IFS='|' read -r id texto || [ -n "${id:-}" ]; do
  [ -z "${id// }" ] && continue
  case "$id" in \#*) continue ;; esac
  n=$((n+1))
  parte="$TMP/$(printf '%03d' "$n").wav"

  # `-nostdin` en todos los ffmpeg: dentro de un `while read` compartirían el
  # stdin del bucle (el guion) y se comerían las líneas que faltan por leer.
  if [ -z "${texto// }" ]; then
    # Toma sin voz: 2 s de silencio (los cierres respiran, no se atropellan).
    ffmpeg -nostdin -v error -f lavfi -i anullsrc=r=44100:cl=mono -t 2.0 -c:a pcm_s16le "$parte" -y
  else
    if [ "$MOTOR" = "say" ]; then
      say -v "$VOZ" -r "$PPM" -o "$TMP/raw.aiff" "$texto"
      src="$TMP/raw.aiff"
    else
      src="${YA[$usados]:-}"
      [ -n "$src" ] || { echo "✖ Falta el audio de la toma $n ($id) en $PARTES" >&2; exit 1; }
      usados=$((usados+1))
    fi
    # Mono 44.1k: lo que espera Remotion, y evita sorpresas de canal al mezclar.
    ffmpeg -nostdin -v error -i "$src" -ac 1 -ar 44100 -c:a pcm_s16le "$TMP/voz.wav" -y
    # Cola de silencio = el respiro. La toma dura voz + pausa.
    ffmpeg -nostdin -v error -i "$TMP/voz.wav" -af "apad=pad_dur=$PAUSA" -c:a pcm_s16le "$parte" -y
    rm -f "$TMP/raw.aiff" "$TMP/voz.wav"
  fi

  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$parte")
  # Los valores van por argv, no interpolados en el fuente de Python.
  frames=$(python3 -c 'import sys;print(max(1,round(float(sys.argv[1])*float(sys.argv[2]))))' "$dur" "$FPS")
  ini=$frame; frame=$((frame + frames))
  printf "%-22s %8d %8d   [%d, %d]\n" "$id" "$ini" "$frame" "$ini" "$frame"
  echo "file '$parte'" >> "$lista"
done < "$GUION"

# Un audio de más en --partes significa que el guion y la carpeta no cuentan la
# misma historia: casi siempre, una toma que se locutó y aquí no se montó.
if [ -n "$PARTES" ] && [ "$MOTOR" != "say" ] && [ "$usados" -ne "${#YA[@]}" ]; then
  echo "" >&2
  echo "⚠  $usados audios usados de ${#YA[@]} que hay en $PARTES." >&2
  echo "   Sobran $(( ${#YA[@]} - usados )): revisa que el guion y la carpeta tengan las mismas tomas." >&2
fi

ffmpeg -nostdin -v error -f concat -safe 0 -i "$lista" -c:a pcm_s16le "$FINAL" -y
total=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$FINAL")

echo ""
echo "✅ $FINAL"
python3 -c 'import sys;t=float(sys.argv[1]);f=float(sys.argv[2]);print(f"   {t:.2f} s · {round(t*f)} f @ {sys.argv[2]} fps · {sys.argv[3]} tomas")' "$total" "$FPS" "$n"
echo ""
echo "   Copia la tabla de arriba a noticia-NNN.ts y pon"
echo "   durationInFrames = $frame en la Composition."
echo ""
echo "   Revisa que ninguna toma pase de $(python3 -c 'import sys;print(round(float(sys.argv[1])*6))' "$FPS") f (6 s): es el techo del formato."
echo "   Valida con: node manuales/video-noticias/scripts/revisar-plan.mjs <plan.ts>"
