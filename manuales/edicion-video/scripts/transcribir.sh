#!/usr/bin/env bash
# transcribir.sh — transcribe un vídeo/audio a JSON con tiempos usando whisper.cpp.
# Uso:
#   transcribir.sh <entrada> [salida.json] [idioma] [modelo.bin]
# Ejemplo:
#   ./transcribir.sh proyectos/001/original.mp4 proyectos/001/transcripcion.json es
#
# Requisitos: brew install whisper-cpp  +  modelo en archivos/whisper/ggml-small.bin
set -euo pipefail

IN="${1:?Uso: transcribir.sh <entrada> [salida.json] [idioma] [modelo.bin]}"
OUT="${2:-transcripcion.json}"
# IDIOMA, no LANG: LANG es la variable de entorno de locale del shell, y "es" a
# secas no es un locale válido. Pisarla afecta a ffmpeg, whisper-cli y a
# cualquier cosa que herede el entorno.
IDIOMA="${3:-es}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"          # -> video-creator/
MODEL="${4:-$ROOT/archivos/whisper/ggml-small.bin}"

command -v whisper-cli >/dev/null || { echo "❌ whisper-cli no está (brew install whisper-cpp)"; exit 1; }
command -v ffmpeg      >/dev/null || { echo "❌ ffmpeg no está"; exit 1; }
[ -f "$IN" ]    || { echo "❌ No existe la entrada: $IN"; exit 1; }
[ -f "$MODEL" ] || { echo "❌ No existe el modelo: $MODEL"; exit 1; }

# mktemp -d: con `mktemp -t x` + sufijo, el archivo que crea mktemp (sin .wav)
# se quedaba huérfano en /var/folders en CADA ejecución.
TMPDIR_T="$(mktemp -d -t transcribir)"
TMPWAV="$TMPDIR_T/audio.wav"
trap 'rm -rf "$TMPDIR_T"' EXIT

echo "🎧 Preparando audio 16 kHz mono…"
ffmpeg -nostdin -y -i "$IN" -ar 16000 -ac 1 -c:a pcm_s16le "$TMPWAV" >/dev/null 2>&1

OF="${OUT%.json}"
echo "📝 Transcribiendo ($IDIOMA) con $(basename "$MODEL")…"
# -oj  = JSON con segmentos y tiempos.  (usa -ojf para tiempos por palabra / karaoke)
whisper-cli -m "$MODEL" -f "$TMPWAV" -l "$IDIOMA" -oj -of "$OF" >/dev/null 2>&1

echo "✅ Transcripción lista: ${OF}.json"
