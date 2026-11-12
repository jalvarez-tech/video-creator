# 02 · Layout — proyecto 072 · Suite Go Living (V53)

> Paso 2 de 3. Cabecera fija del formato `recorrido-luxur`: 9:16 · 1080×1920 · **30 fps** · duración = la del plan (1071 f, 35,7 s) · marca Luxur · texto editorial · **sin sello** (nunca).

## Capas, de atrás a delante (`Recorrido072.tsx`, la misma que la 070)

| # | Capa | Qué es |
|---|---|---|
| 1 | `PistaMetraje` | los planos, MUDOS, a 1296×2304 con zoom ≤ 1,2; el `color` de cada plano (R32) y una viñeta suave; **sin velo superior** |
| 2 | `FundidoACierre` | el fundido a negro de la imagen de Isabella: 6 f, a negro EXACTO en el último fotograma de su toma (f1010) |
| 3 | velo de los subtítulos | un degradado de abajo (780 px, borde 0,72) que sostiene el texto sin sombra; se apaga con `sinSubtitulos` |
| 4 | `SubtitulosEditoriales` | solo lo que dice Isabella, abajo y a 90 % de opacidad, la cursiva 8 px menor |
| 5 | `LogoCierre` y `WebCierre` | el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` sobre la tarjeta oscura |
| 6 | `PistaAudio` | la voz tratada de las tres tomas (−15 LUFS) y la canción, en la RAÍZ |

## Bandas de texto

- **Arriba: nada.** El frame 0 es el edificio limpio.
- **Abajo (y 1430-1640 px):** los subtítulos editoriales, de 1 a 3 líneas por bloque. El más ancho, «y la estación Aguacatala.», entra sin encogerse.
- **Cierre (y ≈ 795-1085):** logo y web, centrados, sobre negro liso.

## Lo que ocupa la imagen

- Isabella, en las tres tomas, ocupa el centro: en el hook y en la mitad, de cuerpo entero con el subtítulo sobre el torso; en el CTA, caminando hacia cámara con el subtítulo sobre las piernas. No tapa la cara ni las manos (comprobado en los frames 100, 165, 485, 520, 560, 900 y 985).
- Los planos del paseo y de la ciudad, sin zoom (la cámara ya se mueve); Isabella, empuje lento 1,00 → 1,04.
