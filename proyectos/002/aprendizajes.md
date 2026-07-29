# Aprendizajes — Proyecto 002 (avatar Apple)

Primer vídeo montado por el **director-video** coordinando las 4 capas
(cámara + motion graphics + subtítulos + sonido). Estilo: **Apple oscuro**.

## Qué funcionó (reusable)
- **Dirección de arte Apple** en `MotionApple002.tsx`: fondo casi-negro `#08090B`
  + spotlight radial sutil · tipografía enorme y apretada (`letterSpacing` negativo,
  `tabular-nums` en cifras) · UNA idea por "statement" · entrada con **blur + escala
  sin rebote** (`SPRING.contador`) · un acento (mint `#5EEAD4`) + rojo Apple `#FF453A`
  para la pérdida (el **0**) + amber/cyan para caliente→frío.
- **Primitivo `Statement`** (fondo + spotlight + entrada) → escala a nuevas escenas
  sin repetir código. `paddingBottom` alto deja libre la banda de subtítulos (y≈72%).
- **Scrim superior** (`TopScrim`, degradado negro arriba) hace legibles los supers
  sobre el avatar (hook, mitos, tarjeta) contra el fondo del ventanal. Muy Apple.
- **Timing a la transcripción real**, no al guion enviado: el clip venía condensado.
  Regla confirmada: **el clip manda**, no el guion teórico.
- **Cámara reposa bajo las statements a pantalla completa** (camara-002.ts): solo
  se mueve en las 3 ventanas donde el avatar se ve. Estilo Apple → movimientos
  lentos y sin rebote.
- **Sonido sutil + ducking** (`duckDb=-5`, todos los cues `underDialogue`): whooshes
  e impacts se sienten sin tapar la voz (17 cues, `cues-002.ts`).
- **Subtítulos karaoke** (`SubtitulosKaraoke.tsx`, reusable): resalta la palabra que
  se dice en **verde claro `#86EFAC` sobre píldora negra**; el resto en blanco. Timing
  por palabra = reparto uniforme dentro de cada chunk {from,to} (los chunks ya son de
  3-4 palabras). Clave anti-jitter: **todas** las palabras llevan el mismo `padding`,
  solo cambia color/fondo/escala de la activa → la línea no se descuadra al resaltar.
  → **DECISIÓN DEL CLIENTE (final sin subtítulos):** desconectado de `Avatar002` a
  petición ("remueve la transcripción de la voz"). El componente + `subtitulos-002.ts`
  quedan guardados y listos para reactivar (ver comentario en `Avatar002.tsx`). Nota:
  sin captions se pierde legibilidad en autoplay sin sonido.

## Datos del montaje
- Comp `Avatar002`: 1080×1920 · 25 fps · 883 frames.
- Capas (z-order): fondo → avatar en `<CamaraVirtual>` → `MotionApple002` →
  `SubtitulosSync` → `PistaSonido`.
- Archivos: `MotionApple002.tsx` · `camara-002.ts` · `cues-002.ts` ·
  `subtitulos-002.ts` · `Avatar002.tsx`.

## Añadir un SFX del banco (patrón)
Para meter un sonido específico de `sonido/` al sistema (ej. cambio pedido: el
1.er sonido antes de "¿cuántos leads calificados?" → `36-WHOOSH/7. Whoosh Swoosh…`):
1. **Copiar** a `remotion/public/sfx/` con nombre limpio (`whoosh-swoosh-07.wav`).
2. **Medir pico** (`ffmpeg -af volumedetect`) y **calibrar vol** al `TARGET_DBFS` de su
   bucket: `vol = min(1, 10**((target-peak)/20))`. Aquí pico −3.7 → bucket whoosh −27 → **0.068**.
3. **Escanear el envelope** por ventanas (0.5 s) para hallar el **pico**: aquí a ~1.25 s
   (build 0-1.25 s, silencio tras 2 s). Se sincroniza ese pico con el frame objetivo.
4. **Añadir variante** en `sound/cues.ts` (union `VarianteSonido` + record `SFX`:
   `"swoosh-hero"`), y usarla en el cue (`cues-002.ts` `s7-whoosh`, type `whoosh`,
   target 648, dur 48 → pico cae en 648; `fadeOutFrames` para cortar la cola).

## A vigilar / mejorar
- Escena de **mitos** (f410–486) es la más justa: dos líneas en franja superior
  sobre fondo con textura; el scrim ayuda pero es el beat más frágil.
- La tarjeta de comentario roza la frente del avatar; la cámara baja el avatar
  (`y+14`) para abrir sitio. Validar siempre con frames reales (R05).
- Whisper transcribió "leads"→"lit"/"lead" y "agenda"→"agente"; el texto en
  pantalla se corrigió a mano.
