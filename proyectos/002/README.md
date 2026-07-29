# Proyecto 002 — Anuncio inmobiliario (avatar · estilo Apple)

Vídeo vertical 9:16 montado por el **director-video** coordinando avatar +
motion graphics estilo Apple + cámara virtual + sonido.

## Entregable
- **Final:** `finales/002-avatar-apple-9x16.mp4` (1080×1920 · 25 fps · 883 f · 35.3 s · H.264 crf 18 · AAC 192k).
- **Prueba:** `pruebas-720p/002-apple-720p.mp4`.
- **Fuente:** `avatar/avatar_1.mp4` → `remotion/public/avatar-002.mp4`.

## Comp Remotion
`Avatar002` (`remotion/src/plantillas/Avatar002.tsx`). Capas (z-order):
fondo → avatar en `<CamaraVirtual>` (`camara-002.ts`) → `MotionApple002.tsx`
→ `PistaSonido` (`cues-002.ts`). **Sin subtítulos** (decisión del cliente).

## Guion (real, condensado)
Hook → embudo 200→3→0 → diagnóstico (tráfico caliente→sitio frío, sin
seguimiento) → CTA (¿cuántos leads calificados? → deja tu número en comentarios).
Detalle y timing por beats: [guion-limpio.md](guion-limpio.md).

## Decisiones del cliente (iteraciones)
1. Motion graphics estilo Apple + animaciones + SFX.
2. Subtítulos karaoke (palabra en verde) → **luego removidos** ("quita la transcripción de la voz").
3. Textos del avatar bajados al tercio inferior; statements de motion centrados verticalmente.
4. 1.er sonido antes de la pregunta → whoosh swoosh (Ashish "7.", `whoosh-swoosh-07.wav`).
5. La pregunta "¿cuántos leads calificados?" entra **justo después** de "una pregunta honesta" (frame 678).

Aprendizajes reutilizables: [aprendizajes.md](aprendizajes.md).
