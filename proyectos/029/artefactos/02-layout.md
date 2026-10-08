# 02 · Layout — proyecto 029 (rev. 1)

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

## Cuadro y capas (de atrás a delante, director §3b)

1080×1920 · 30 fps. Todo en frames absolutos.

| z | Capa | Qué es | Dónde vive |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 planos de vídeo + la tarjeta, MUDOS, con su `color` (`colorCorrection()`) y viñeta del look (0,2) | `metraje-029.ts` |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su toma | `Recorrido029.tsx` + `cierre-029.ts` |
| 3 | `VeloSubtitulos` | degradado negro de abajo (780 px, 0,66 → 0,36) SOLO mientras hay subtítulos | `Recorrido029.tsx` |
| 4 | `SubtitulosEditoriales` | las tres frases, abajo; un acento por bloque | `subtitulos-029.ts` |
| 5 | `LogoCierre` y `WebCierre` | solo sobre la tarjeta (f1071-1137) | `cierre-029.ts` |
| 6 | `PistaAudio` | voz de las 3 tomas + música, en la raíz | `audio-029.ts` |

**Sin sello, sin `PistaGraficos`** (R14: el texto editorial vive en la banda de abajo) y sin SFX (el canal no usa whooshes ni impactos).

## El encuadre 9:16 del material 16:9

Cada clip fuente se recorta en `normalizar.mjs` con una ventana 9:16 que sale de `encuadre-029.json` (la calcula `herramientas/encuadre.py`); la salida es un vertical de 1296×2304 (1080 × 1,2, el techo del punch-in).

| Clip | Ventana | Cómo se decide |
|---|---|---|
| Tomas de Isabella (HK04, CT15) | altura completa: 606×1080 (hook, 1080p) y 1214×2160 (CTA, 4K) | **sigue a Isabella** (Vision de Apple, 5 f/s): zona muerta de ±12 % de la ventana, tope de velocidad (0,14 del ancho/s) y de aceleración |
| Mitad (MD04, 4K) | **cerrada al 62 % del alto**: 752×1340, que sube ×1,72 al cuadro (×1,43 al 1080×1920 final) | ella sale pequeña (la cara al 4 % del alto del original) y en el cuadro cerrado pasa al 6,5 %; la ventana la sigue en horizontal y en vertical (su cara a ≈ 36 % del alto de la ventana) |
| Dron y recorridos | altura completa, a mano (`MANUAL` de `encuadre.py`) | no hay a quién seguir: se miró cada clip con cuatro ventanas de prueba (centros 0,30 · 0,42 · 0,54 · 0,66, y 0,50-0,74 para el dron) y se escogió la que deja entero el sujeto del plano (el dron con la terraza y el garaje, la sala con el ventanal, la mesa con la vista, la isla con el ciprés, el jacuzzi con las nubes, la bañera con la ventana, la ventana con el valle, la cama con el ventanal) |

Los 1080p (HK04 y RC03) suben ×2,13 al cuadro (se les da un `unsharp` suave) y por eso su zoom no pasa de 1,06-1,08; los 4K, de 1,10.

## Reparto del espacio

| Zona (px) | Qué |
|---|---|
| y < 240 | nada (arriba no hay texto en ningún frame; regla fija) |
| 240-1380 | la casa o Isabella. El texto va abajo y nunca le tapa la cara |
| 1430-1640 | subtítulos editoriales (borde superior al 74,5 % del alto; nunca por debajo de 1690) |
| 795-1085 | la tarjeta del cierre: logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` (54 px) |

## Texto

Tres frases, cinco bloques (`h01`, `m01-m02`, `c01-c02`); un acento (Playfair itálica) por frase con texto largo: «recordar siempre», «de infancia», «es patrimonio», «tu visita» (≥ 2,7 s entre dos acentos). Cada línea entra 0-3 f antes de su palabra, medida sobre la voz SOLA (`herramientas/lineas-vs-onsets.py`: 13 de 13 entre −0,4 y +3,0 f). Los recorridos y el dron van sin texto.

## Color

`COLOR_BASE` (contraste 1,13 · negros −0,08 · sombras +0,06 · luces −0,22 · blancos −0,06 · temperatura +0,04 · saturación 1,06 · vibrance 0,03) más el ajuste de cada plano (exposición y luces: los ventanales y el cielo piden −0,28…−0,32). Se mide con `herramientas/medir-color.py` (ver `aprendizajes.md`). El render lleva `--gl=angle`.
