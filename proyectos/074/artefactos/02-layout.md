# 02 · Layout — proyecto 074 · Suite Go Living, «Las zonas sociales» (V55)

> Paso 2 de 3. Cabecera fija del formato `recorrido-luxur`: 9:16 · 1080×1920 · **30 fps** · duración = la del plan (1094 f, 36,5 s) · marca Luxur · texto editorial · **sin sello** (nunca). Las capas son las de la 070.

## Capas, de atrás a delante (`Recorrido074.tsx`)

| # | Capa | Qué es |
|---|---|---|
| 1 | `PistaMetraje` | los planos, MUDOS, a 1296×2304 con zoom ≤ 1,2; el `color` de cada plano (R32) y una viñeta suave; **sin velo superior** |
| 2 | `FundidoACierre` | el fundido a negro de la imagen de Isabella: 6 f, a negro EXACTO en el último fotograma de su toma (f1033) |
| 3 | velo de los subtítulos | un degradado de abajo (780 px, borde 0,72) que sostiene el texto sin sombra; se apaga con `sinSubtitulos` |
| 4 | `SubtitulosEditoriales` | solo lo que dice Isabella, abajo y a 90 % de opacidad, la cursiva 8 px menor; Montserrat + Playfair itálica |
| 5 | `LogoCierre` y `WebCierre` | el logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta oscura |
| 6 | `PistaAudio` | la voz tratada de las tres tomas (−15 LUFS) y la canción, en la RAÍZ |

## Bandas de texto

- **Arriba: nada.** El frame 0 es el muro con el «GO» y las hojas, sin ningún rótulo.
- **Abajo (y 1430-1640 px):** los subtítulos, de 1 a 3 líneas por bloque, con un acento como mucho. El acento más ancho, «Go Living Suites.», entra sin encogerse.
- **Cierre (y ≈ 795-1085):** logo y web, centrados, sobre negro liso.

## Lo que ocupa la imagen

- Isabella camina hacia cámara en el hook y en la mitad (empuje 1,00 → 1,04) y se sienta en las gradas en el CTA. Los recorridos y el exterior, sin zoom.
- Los subtítulos de las tres tomas caen sobre el suelo o las gradas, por debajo de su cintura: no tapan la cara ni las manos (comprobado en los frames 130, 175, 520, 590 y 1000).
