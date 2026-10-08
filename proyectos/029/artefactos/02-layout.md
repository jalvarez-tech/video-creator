# 02 · Layout — proyecto 029

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 7 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y viñeta del look (0,2) | `metraje-029.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en f716 | `Recorrido029.tsx` + `cierre-029.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo (780 px, 0,66 → 0,36) SOLO mientras hay texto | `Recorrido029.tsx` |
| 4 | `SubtitulosEditoriales` | las seis frases, abajo; un acento por bloque | `subtitulos-029.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f717-783) | `cierre-029.ts` |
| 6 | `PistaAudio` | voz de las 6 tomas + música, en la raíz | `audio-029.ts` |

**Sin sello, sin `PistaGraficos`** (R14: el texto editorial vive en la banda de abajo) y sin SFX (el canal no usa whooshes ni impactos).

## El encuadre 9:16 de los clips 16:9

- Cada clip fuente se recorta en `normalizar.mjs` con una ventana de **9:16 a altura completa** (606×1080 en los 1080p; 1214×2160 en los 4K) que se desplaza a lo ancho siguiendo a Isabella (`encuadre-029.json`: borde izquierdo de la ventana cada 0,25 s). La salida es un vertical de 1296×2304 (1080 × 1,2: el techo del punch-in).
- Cómo se calcula: Vision (Apple) da la cara y el cuerpo a 5 fotogramas/s; la ventana solo se mueve cuando ella sale de una zona muerta (±12 % del ancho de la ventana), con tope de velocidad (0,14 del ancho/s) y de aceleración. Quieta, plano de trípode; caminando (CT16, CT18), un paneo lento.
- Ajuste a ojo: CT14 (`IMG_9516`) tiene detrás, a la derecha, una tele encendida y dos personas en la otra sala; el borde izquierdo de la ventana no pasa de 0,185 para dejarlas fuera (ella queda al 62-71 % del ancho, cerca del tercio).
- Los 1080p suben ×2,13 al cuadro (se les da un `unsharp` suave) y por eso su zoom no pasa de 1,06-1,08; los 4K, de 1,10.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | Isabella y el sitio. Ninguna línea de texto la tapa: el texto va abajo |
| 1430-1640 | subtítulos editoriales (borde superior al 74,5 % del alto; nunca por debajo de 1690) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` (54 px) |

## Texto

Una frase por bloque (`a01`…`f03`), de 2 a 3 líneas que se acumulan, un acento (Playfair itálica) por bloque: «pasa rápido», «respirar distinto», «y privacidad», «cómodos», «es patrimonio», «es una dirección», «su visita». Entre dos acentos hay ≥ 2,6 s. Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`herramientas/lineas-vs-onsets.py`: 20 de 20 entre −0,2 y +2,2 f).

## Color

`COLOR_BASE` (contraste 1,13 · negros −0,08 · sombras +0,06 · luces −0,22 · blancos −0,06 · temperatura +0,04 · saturación 1,06 · vibrance 0,03) más el ajuste de cada plano (exposición, luces). Medido sobre PNG sin códec (`herramientas/medir-color.py`): saturación media 0,320 → 0,388, dispersión de luma entre planos σ 8,6 → 6,4, tono de la piel movido < 0,5°, quemado ≤ 2,0 %, aplastado ≤ 4,8 %. El render lleva `--gl=angle`.
