#!/usr/bin/env bash
# Copia los SFX base + pools de variantes del banco (sonido/) a remotion/public/sfx/
# con nombres estándar que usa el motor de cues (src/plantillas/sound/cues.ts).
# Reejecutable: sobrescribe. El origen es una ruta RELATIVA a sonido/.
#
# Al final, si hay ffmpeg, mide el PICO (dBFS) de cada archivo y sugiere el `vol`
# lineal para caer en el objetivo de mezcla de su familia (SKILL §10). Copia esos
# valores al mapa SFX / POOL de cues.ts si cambias algún archivo.
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"   # -> video-creator/

SRC="sonido"
DST="remotion/public/sfx"
mkdir -p "$DST"
ok=0; miss=0

copiar() { # <ruta-origen-relativa-a-sonido/> <nombre-destino>
  if [ -f "$SRC/$1" ]; then cp "$SRC/$1" "$DST/$2"; echo "  ✓ $2"; ok=$((ok+1));
  else echo "  ✗ falta: $SRC/$1"; miss=$((miss+1)); fi
}

echo "Copiando SFX base a $DST ..."

# ── Núcleo (4 funciones): whoosh · riser · impact · click ──────────────────────
copiar "37-OTROS/Short Whoosh.mp3"                          "whoosh-light.wav"
copiar "37-OTROS/mixkit-arrow-whoosh-1491.wav"              "whoosh-whip.wav"
copiar "37-OTROS/swinging-staff-whoosh-strong-08-44658.mp3" "whoosh-heavy.mp3"
copiar "37-OTROS/mixkit-cinematic-wind-swoosh-1471.wav"     "whoosh-wind.wav"
copiar "37-OTROS/Swoosh.mp3"                                "swoosh.mp3"
copiar "37-OTROS/BUILD-UP.mp3"                              "riser-low.mp3"
copiar "37-OTROS/Ascending sound effect.mp3"               "riser-cymbal.mp3"
copiar "37-OTROS/mixkit-big-cinematic-impact-788.mp3"       "impact-deep.mp3"
copiar "37-OTROS/mixkit-metal-hit-woosh-1485.wav"          "impact-sharp.wav"
copiar "26-METAL SLICE/Metal.Slice.1.wav"                   "metal.wav"
copiar "37-OTROS/camera-shutter-sound-effect.wav"          "click-camera.wav"
copiar "37-OTROS/Mouse Click.mp3"                          "click-mouse.mp3"
copiar "37-OTROS/click sound by 90 Creators.mp3"           "click-pen.mp3"
copiar "19-EXTRAS/SFX- Ui01.mp3"                            "ui.mp3"

# ── Aparición elástica ─────────────────────────────────────────────────────────
copiar "37-OTROS/Pop.mp3"                                   "pop.mp3"
copiar "19-EXTRAS/Spring Pop up Sound Effect ( By Ashish Editz )_01.mp3" "boing.mp3"

# ── Notificación / app / mensajería ────────────────────────────────────────────
copiar "37-OTROS/Apple Notification.wav"                    "notification.wav"
copiar "37-OTROS/Iphone Send.wav"                          "msg-send.wav"

# ── Datos / tech / interfaz ────────────────────────────────────────────────────
copiar "37-OTROS/Digital counting.mp3"                     "data-count.mp3"
copiar "37-OTROS/09 Data Transfer.wav"                     "digital.wav"
copiar "22-GLITCH/glitch 1.wav"                             "glitch.wav"
copiar "15-ELECTRICO/SFX- Electric1.mp3"                    "electric.mp3"
copiar "37-OTROS/mixkit-bike-wheel-spinning-1613.wav"      "spin.wav"
copiar "37-OTROS/keyboard-typing-5997.mp3"                 "typing.mp3"
copiar "37-OTROS/Clock Tick.mp3"                           "tick.mp3"

# ── Acierto / error / dinero ───────────────────────────────────────────────────
copiar "14-DING/Ding Sound Effect.mp3"                      "chime.mp3"
copiar "14-DING/quick-win.mp3"                              "success.wav"
copiar "37-OTROS/Wrong Answer.mp3"                          "error.mp3"
copiar "37-OTROS/cash ting.mp3"                            "money.mp3"
copiar "37-OTROS/Mario Coin Sound - Sound Effect (HD).mp3"  "coin.mp3"

# ── Materiales / trazo / partículas ────────────────────────────────────────────
copiar "37-OTROS/WRITING Sound Effect 2.mp3"                "scribble.mp3"
copiar "28-PAPEL/Paper Flip 01.wav"                         "paper.wav"
copiar "24-LIQUIDO/SFX- Liquid1.mp3"                        "liquid.mp3"
copiar "19-EXTRAS/Fairy Glitter.mp3"                        "sparkle.mp3"

# ── Logo / inverso / cómico / ambiente ─────────────────────────────────────────
copiar "03-ANIMACION LOGO/SFX- Animation1.mp3"              "logo.mp3"
copiar "37-OTROS/ES_Suction Pop 5 - SFX Producer.mp3"       "reverse.mp3"
copiar "21-FUNNY/Funny Effect 1.mp3"                        "cartoon.mp3"
copiar "19-EXTRAS/SFX- Wind1.mp3"                           "ambient-wind.mp3"

echo "Copiando POOLS de variantes alternas (anti-repetición, SKILL §12) ..."
# ── pop ──
copiar "29-POP/pop-2.mp3"                                   "pop-02.mp3"
copiar "29-POP/pop-3.mp3"                                   "pop-03.mp3"
# ── glitch ──
copiar "22-GLITCH/glitch 2.wav"                             "glitch-02.wav"
copiar "22-GLITCH/glitch 3.wav"                             "glitch-03.wav"
# ── whoosh light ──
copiar "36-WHOOSH/1. Whoosh Swoosh Sound Effect ( By Ashish Editz ) .wav" "whoosh-light-02.wav"
copiar "36-WHOOSH/3. Whoosh Swoosh Sound Effect ( By Ashish Editz ) .wav" "whoosh-light-03.wav"
# ── swoosh ── (evita el dupe cruzado 32≈36; 5 y 2 son distintos de las light)
copiar "32-SWOSH/5. Whoosh Swoosh.wav"                      "swoosh-02.wav"
copiar "32-SWOSH/2. Whoosh Swoosh.wav"                      "swoosh-03.wav"
# ── metal ──
copiar "26-METAL SLICE/Metal.Slice.2.wav"                   "metal-02.wav"
copiar "26-METAL SLICE/Metal.Slice.3.wav"                   "metal-03.wav"
# ── mouse (click) ── (3 clicks realmente distintos; ext = contenedor real)
copiar "10-CLICK/Mouse Click Sound Effect.mp3"              "click-mouse-02.mp3"
copiar "10-CLICK/Mouse Click - Sound Effect (HD) (1).mp3"   "click-mouse-03.mp3"
# ── sparkle ──
copiar "19-EXTRAS/Glitter.mp3"                              "sparkle-02.mp3"
copiar "19-EXTRAS/Highlight.wav"                            "sparkle-03.wav"
# ── chime (ding) ──
copiar "14-DING/Ting.mp3"                                   "chime-02.mp3"
copiar "14-DING/Bells Sound Effect 2 ( By Ashish Editz )_01.mp3" "chime-03.mp3"

echo "Copiados: $ok  ·  Faltantes: $miss"
# Antes esto imprimía los faltantes y salía 0 igualmente: quien lo llamara desde
# otro script daba por bueno un set de SFX incompleto, y el fallo aparecía
# mucho después como un <Audio> con 404 en mitad de un render.
if [ "$miss" -gt 0 ]; then
  echo "" >&2
  echo "✖ Faltan $miss archivos en el banco (sonido/). El set de remotion/public/sfx/ está incompleto." >&2
  echo "  Repón el banco o corrige las rutas de arriba antes de usarlo." >&2
  exit 1
fi

# ── Calibración de volúmenes (SKILL §10) ───────────────────────────────────────
# Objetivo de PICO por familia de mezcla (punto medio de los rangos pedidos):
#   general −21 · whoosh −27 · impact −27 · ambient −30 dBFS.
if command -v ffmpeg >/dev/null 2>&1; then
  echo ""
  echo "Niveles medidos y vol sugerido (cópialos al mapa SFX/POOL de cues.ts si cambiaste algo):"
  printf "  %-24s %-8s %7s %6s\n" "archivo" "bucket" "pico" "vol"
  bucket() { case "$1" in
    whoosh-*|swoosh*) echo whoosh;;
    impact-*|metal*)  echo impact;;
    ambient-*)        echo ambient;;
    *)                echo general;; esac; }
  target() { case "$1" in whoosh|impact) echo -27;; ambient) echo -30;; *) echo -21;; esac; }
  for f in "$DST"/*.mp3 "$DST"/*.wav; do
    [ -f "$f" ] || continue
    n=$(basename "$f")
    # `|| true`: con pipefail, un grep sin coincidencia (archivo ilegible, o un
    # ffmpeg que no imprime max_volume) mataba el script aquí y dejaba muerta la
    # comprobación de la línea siguiente.
    peak=$(ffmpeg -nostdin -hide_banner -nostats -i "$f" -af volumedetect -f null /dev/null 2>&1 \
           | grep max_volume | grep -oE '\-?[0-9.]+ dB' | head -1 | sed 's/ dB//') || true
    [ -n "$peak" ] || { printf "  %-24s %-8s %7s %6s\n" "$n" "?" "?" "?"; continue; }
    b=$(bucket "$n"); t=$(target "$b")
    vol=$(awk -v p="$peak" -v t="$t" 'BEGIN{g=t-p; v=10^(g/20); if(v>1)v=1; if(v<0.03)v=0.03; printf "%.3f", v}')
    printf "  %-24s %-8s %7s %6s\n" "$n" "$b" "$peak" "$vol"
  done
else
  echo "(ffmpeg no encontrado: se omitió la calibración de niveles; los vol de cues.ts asumen los archivos base actuales)"
fi
echo "Listo."
