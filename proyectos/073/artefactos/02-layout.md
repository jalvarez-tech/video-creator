# 02 · Layout — proyecto 073 · Suite Go Living (V54)

> Paso 2 de 3. Cabecera fija del formato `recorrido-luxur`: 9:16 · 1080×1920 · **30 fps** · duración = la del plan (1229 f, 41,0 s) · marca Luxur · texto editorial · **sin sello** (nunca). Idéntico al de la 070 (`proyectos/070/artefactos/02-layout.md`) salvo lo que sigue.

## Capas, de atrás a delante (`Recorrido073.tsx`)

| # | Capa | Qué es |
|---|---|---|
| 1 | `PistaMetraje` | los planos, MUDOS, a 1296×2304 con zoom ≤ 1,2; el `color` de cada plano (R32) y una viñeta suave; **sin velo superior** |
| 2 | `FundidoACierre` | el fundido a negro de la imagen de Isabella: 6 f, a negro EXACTO en el último fotograma de su toma (f1168) |
| 3 | velo de los subtítulos | un degradado de abajo (780 px, borde 0,72); se apaga con `sinSubtitulos` |
| 4 | `SubtitulosEditoriales` | solo lo que dice Isabella, abajo y a 90 % de opacidad, cursiva 8 px menor; Montserrat + Playfair itálica, sin sombra ni borde |
| 5 | `LogoCierre` y `WebCierre` | el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` sobre la tarjeta oscura |
| 6 | `PistaAudio` | la voz tratada de las tres tomas (−15 LUFS) y la canción, en la RAÍZ |

## Bandas de texto

- **Arriba: nada.** El frame 0 es la torre limpia.
- **Abajo (y 1430-1640 px):** los subtítulos, de 1 a 3 líneas por bloque; el acento más ancho, «Go Living Suites», mide 733 de 842 px útiles.
- **Cierre (y ≈ 795-1085):** logo y web, centrados, sobre negro liso.

## Lo que ocupa la imagen

- Isabella camina o se acerca en la mitad y el empuje lento (1,00 → 1,04) la acompaña; en el hook y el CTA también. Recorridos y exterior, sin zoom.
- Los subtítulos de las tres tomas caen sobre la banca de madera (hook), la cama (mitad) y el sofá de cuero (CTA): no tapan la cara ni las manos (comprobado en los frames 112, 175, 540, 560, 640, 1040 y 1120).
