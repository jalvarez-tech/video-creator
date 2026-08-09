# Aprendizajes — Proyecto 001

> Todo lo que funciona se queda escrito. Los aprendizajes generales (que sirven a
> TODOS los vídeos) se copian al manual: `../../manuales/edicion-video/SKILL.md`.

## Tipo de vídeo
Avatar HeyGen (talking-head) 9:16 · captación de leads inmobiliarios · 43.6 s.
**Flujo con avatar:** se saltaron Auto-Editor (silencios) y grabación; el habla ya era limpia.

## Lo que funcionó
- **Fuente:** `Intro_1.mp4` de HeyGen → 1080×1920 · 25 fps · 43.64 s · audio AAC estéreo.
- **Composición correcta = fps y duración exactos del clip** (`fps=25`, `durationInFrames=1091`). Si no coinciden, se corta o desincroniza.
- **Subtítulos desde la propia voz:** whisper.cpp (`transcribir.sh`) sobre el MP4 → 7 frases con tiempos → limpieza a mano (`lead inmobiliario`, `leads`, `WhatsApp`).
- **Estilo punchy** (30 chunks de 3-4 palabras, 64px) retiene más que frases largas. Timing por reparto proporcional de palabras dentro de cada frase → suficientemente preciso.
- **`<OffthreadVideo>`** para el clip de fondo: render determinista y audio incluido automáticamente.
- Subtítulo a y≈70% (subido) + sombra fuerte → legible sobre fondo con ventana y sin tapar la cara.

## Qué mejorar la próxima vez
- Para timing perfecto por palabra (karaoke), usar `whisper-cli -ojf` (tokens con tiempos) en vez de reparto proporcional.
- Modelo `small` oye mal anglicismos/tecnicismos (`leads`, `WhatsApp`) → revisar siempre esas palabras, o probar `ggml-medium`.

## Motion graphics (según el guion)
- Diseñados con un **workflow** (1 concepto por beat en paralelo → director de arte los cura). Regla de oro del set: **1 solo gráfico a la vez**, en la franja SUPERIOR (la ventana, sobre la cara), nunca chocando con los subtítulos (y≈70%).
- Set final: contador-héroe **200→3→0** (beats 1-3), WhatsApp **"Visto · Sin respuesta"** (b4), **timer 5:00→0:00 + flip TUYO→DE OTRO** (b5), contador **200** de la competencia (b6, bookend), **botón Seguir→Siguiendo** que se queda hasta el final (b7).
- Un único componente `MotionGraphics.tsx` (borrado en 2026-08-06 al quedar sin uso; su sucesor es `MotionGraphicsFull.tsx`); timing por **frames absolutos @25fps**; `spring`/`interpolate`/`interpolateColors` + ring SVG.
- Excepción cromática: ámbar/rojo SOLO en el clímax del timer; el resto en teal/verde/cian.
- Ajustes tras revisar frames (R05): subir el bloque del timer (el chip tapaba la frente) y dar fondo al chip "Visto" (contraste sobre la ventana).

### Cambio de dirección → cortes a pantalla completa
- El usuario prefirió **fondo plano** en vez de overlays sobre el avatar. Versión final = `MotionGraphicsFull.tsx`: cada gráfico es un **corte a pantalla completa** (fondo plano de marca `#0a0f1c` + glow teal) con **animación relacionada**, mientras la **voz del avatar sigue debajo**; entre escenas vuelve el avatar (cortes limpios).
- Escenas: fuga de puntos 200→3, calendario+X "0 visitas", chat WhatsApp "Visto·Sin respuesta", reloj 5:00→0:00 + flip TUYO→DE OTRO, barras "leads para tu competencia", CTA **@jalvarez.tech** Seguir→Siguiendo.
- Los subtítulos siguen encima (legibles sobre el fondo plano). Handle real: **@jalvarez.tech**.
- **Escena celular** (`ScenePhone`, f330-395): en "«Hola, info»" se muestra un móvil con la burbuja saliente enviándose (typing → enviado ✓✓).
- **CTA como OVERLAY** (no cutaway): en el cierre el usuario pidió salir él otra vez con la animación del botón encima → `SceneFollow` pasó a overlay transparente sobre el avatar (botón en la franja superior).
- Ventana de cada escena en frames absolutos; entre escenas hay huecos donde se ve al avatar. Cutaways adyacentes se "pegan" para no dejar destellos de cara.

## Resultado
- `finales/001-avatar-9x16.mp4` — subtítulos sincronizados (44 MB).
- `finales/001-avatar-9x16-motion.mp4` — **versión final: cortes a pantalla completa con motion graphics** (@jalvarez.tech).
