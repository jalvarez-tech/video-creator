# 02 · Layout y capas — proyecto 042

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido042` (`remotion/src/proyectos/042/`), 1080×1920 a 30 fps, 1081 f (36,03 s). Es el montaje del 034 y del 039 con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-042.ts`, `audio-042.ts` y `subtitulos-042.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **2 cortes secos** (la entrada del hook y la del paseo) y 8 disolvencias de 12 f |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1020) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 9 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, ≈ −15 LUFS) + música («Silver Skies Cinematic Piano», −15 LUFS sola por tramos, ≈ −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara); el texto cae por debajo de sus pies o a la altura de las piernas, nunca sobre la cara.
- **Drones:** 4K verticales (3840×2160 con `rotation=90`): solo se rotan y se escalan a 1296×2304; no hay recortes.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-042.mjs`)

1. **La primera toma sale sin texto ni voz** (DR206): Isabella entra A CORTE en el f75 y su primera sílaba suena 2,25 f después; el primer subtítulo entra con su imagen (f75). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma, el f1020; el CTA usa el clip hasta su f133, 20 f antes de su final).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz.
6. **Transiciones: corte y disolver.** Con piano, las disolvencias van libres y solo los cortes secos piden golpe: hay DOS (la entrada del hook, que no cae en golpe: HK01 empieza a hablar 2,25 f después; y la del paseo, en el golpe de 17,4 dB del retorno del piano).

## Lo que decide esta pieza distinto del 030, el 031, el 034 y el 039

- **Ritmo de piano:** planos de 2,5-3,5 s que se funden unos en otros; el plano más corto de los recorridos dura 2,5 s y la vista, 3,5 s. Sin rampas de velocidad.
- **Solo drones, al atardecer:** el color se casa plano a plano contra Isabella (de día).
- **Texto que marca el hallazgo:** el acento cae en «Encontré» (el hook, ya en el f75), «acabas de encontrarlo.» (la mitad) y «escríbeme» (la acción).
- **La música** baja con curva antes de la primera palabra de cada toma y, en el hook, deja que el respiro del piano haga de ducking natural; el golpe de 17,4 dB del retorno abre el paseo.
