# Guion limpio — Proyecto 002 (avatar Apple)

**Clip fuente:** `avatar/avatar_1.mp4` → `remotion/public/avatar-002.mp4`
**Specs (R01):** 1080×1920 · **25 fps** · **883 frames** · 35.3 s · audio AAC 48 kHz estéreo.
**Comp Remotion:** `Avatar002` (`remotion/src/plantillas/Avatar002.tsx`).

> ⚠️ El clip es una versión **CONDENSADA** del guion enviado: **NO** incluye el
> párrafo "Un lead que no recibe respuesta en los primeros 5 minutos… es de tu
> competencia". Los motion graphics y subtítulos siguen lo que REALMENTE se dice
> (fuente: `transcripcion.json`, whisper.cpp).

## Beats reales del clip (para timing de cámara / gráficos / sonido)

| Beat | Frames | Tiempo | Contenido | Motion graphic (estilo Apple) |
|---|---|---|---|---|
| A · Hook | 0–156 | 0–6.24 s | "Tu anuncio no está fallando. Lo que falla es lo que pasa después del clic. Pagas la pauta, entran…" | overline "LO QUE PASA DESPUÉS DEL CLIC" (sobre avatar) |
| B · Embudo | 156–330 | 6.24–13.2 s | "200 personas a ver el apartamento, y a tu WhatsApp llegan 3 preguntando por el precio. Y de esos 3…" | statement **200** ↑ → **3** |
| C · Cero + mitos | 330–488 | 13.2–19.52 s | "ninguno agenda visita. No es el algoritmo, no es que la gente no esté comprando, es que estás…" | statement **0** (rojo) → mitos tachados (sobre avatar) |
| D · Caliente→frío | 488–640 | 19.52–25.58 s | "mandando tráfico caliente a un sitio frío, y después no hay nadie detrás haciendo seguimiento." | "CALIENTE→FRÍO" + "SIN SEGUIMIENTO" |
| E · Pregunta | 640–786 | 25.58–31.44 s | "Una pregunta honesta: ¿cuántos leads calificados llegan a tu WhatsApp?" | statement "¿Cuántos leads calificados?" |
| F · Comentario | 786–883 | 31.44–35.3 s | "Déjame el número real en los comentarios y hablemos." | tarjeta "Escribe tu número 👇" (sobre avatar) |

## Ventanas de avatar visible (para el plan de cámara)
`0–158` (hook) · `405–492` (mitos) · `786–883` (CTA). Bajo las statements a
pantalla completa (158–405, 492–786) la cámara **reposa**.
