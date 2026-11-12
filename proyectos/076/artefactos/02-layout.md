# 02 · Layout — proyecto 076 · Suite Go Living (V57)

> Paso 2 de 3. Cabecera fija del formato `recorrido-luxur`: 9:16 · 1080×1920 · **30 fps** · duración = la del plan (958 f, 31,9 s) · marca Luxur · texto editorial · **sin sello** (nunca). Es el mismo layout que la 070 (`proyectos/070/artefactos/02-layout.md`); aquí solo lo que cambia.

## Capas, de atrás a delante (`Recorrido076.tsx`)

`PistaMetraje` (planos mudos, zoom ≤ 1,2, `color` por plano) → `FundidoACierre` (6 f, negro exacto en el f897) → velo de los subtítulos → `SubtitulosEditoriales` (solo lo que dice Isabella, abajo, 90 %, cursiva 8 px menor) → `LogoCierre` y `WebCierre` sobre la tarjeta → `PistaAudio` (la voz de las tres tomas y la música). La prop `sinSubtitulos` apaga los subtítulos y su velo (la base de la versión con ficha).

## Bandas de texto

- **Arriba: nada.** El frame 0 es el edificio entre sus plantas, limpio.
- **Abajo (y 1430-1640 px):** los subtítulos, de 1 a 3 líneas por bloque, un acento por toma: «tranquilidad.» (hook), «estratégica.» (mitad), «potencial» (CTA). Los tres acentos distan más de 10 s entre sí.
- **Cierre (y ≈ 795-1085):** logo y web, centrados, sobre negro liso.

## Lo que ocupa la imagen

- Isabella: el hook viene del fondo del pasillo (empieza lejos, plano general: los subtítulos caen sobre la alfombra de la suite), la mitad junto al ventanal (plano medio) y el CTA en primer plano de cara y hombros; el empuje lento (1,00 → 1,04) las acompaña. Los recorridos y el exterior, sin zoom.
- Los subtítulos no tapan la cara ni las manos (comprobado en los frames 110, 150, 420, 470, 800 y 890).
