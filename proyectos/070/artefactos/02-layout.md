# 02 · Layout — proyecto 070 · Suite Go Living (V51)

> Paso 2 de 3. Cabecera fija del formato `recorrido-luxur`: 9:16 · 1080×1920 · **30 fps** · duración = la del plan (1164 f, 38,8 s) · marca Luxur · texto editorial · **sin sello** (nunca).

## Capas, de atrás a delante (`Recorrido070.tsx`)

| # | Capa | Qué es |
|---|---|---|
| 1 | `PistaMetraje` | los planos, MUDOS, a 1296×2304 con zoom ≤ 1,2 (techo del punch-in); el `color` de cada plano (R32) y una viñeta suave; **sin velo superior** |
| 2 | `FundidoACierre` | el fundido a negro de la imagen de Isabella: 6 f, a negro EXACTO en el último fotograma de su toma (f1103) |
| 3 | velo de los subtítulos | un degradado de abajo (780 px, borde 0,72) que sostiene el texto sin sombra; se apaga con `sinSubtitulos` |
| 4 | `SubtitulosEditoriales` | solo lo que dice Isabella, abajo y a 90 % de opacidad, la cursiva 8 px menor; Montserrat + Playfair itálica, sin sombra ni borde |
| 5 | `LogoCierre` y `WebCierre` | el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta oscura |
| 6 | `PistaAudio` | la voz tratada de las tres tomas (−15 LUFS) y la canción, en la RAÍZ |

## Bandas de texto

- **Arriba: nada** (ni hook escrito, ni cuenta, ni sello). El frame 0 es el edificio limpio.
- **Abajo (y 1430-1640 px, nunca por debajo de 1690):** los subtítulos editoriales, de 1 a 3 líneas por bloque, con un acento como mucho. El acento más ancho, «operación hotelera», mide 839 de 842 px útiles (entra sin encogerse).
- **Cierre (y ≈ 795-1085):** logo y web, centrados, sobre negro liso; entran 10 f tras empezar la tarjeta.

## Lo que ocupa la imagen

- Isabella camina hacia cámara en el hook y el empuje lento (1,00 → 1,04) la acompaña; en la mitad y el CTA también (de pie y sentada). Los recorridos y el exterior, sin zoom: la cámara ya se mueve.
- Los subtítulos de las tres tomas caen sobre la cama, el sofá o la mesa redonda: no tapan la cara ni las manos (comprobado en los frames 108, 175, 540, 650, 1000 y 1056).
