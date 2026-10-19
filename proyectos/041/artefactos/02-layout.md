# 02 · Layout y capas — proyecto 041

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido041` (`remotion/src/proyectos/041/`), 1080×1920 a 30 fps, 1166 f (38,87 s). Es el montaje del 034 (V18) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-041.ts`, `audio-041.ts` y `subtitulos-041.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 10 cambios de plano son cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1105) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, ≈ −15 LUFS) + música («Epic Inspirational», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero y pequeña en el hook (sube la loma desde lejos) y en la mitad (junto al talud); en plano medio en el CTA. El texto cae por debajo de sus pies o a la altura de las piernas, nunca sobre la cara (en el CTA, a la altura de la cintura).
- **Drones verticales:** solo se rotan (4K → 1296×2304); ninguno necesita recorte 9:16.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.
- **La cifra:** las dos cifras del hook (`3.428 metros cuadrados`, `por 800 millones.`) van en el bloque `h01`, abajo, como dos líneas del mismo bloque: una sola afirmación. Ninguna cifra más en la pieza.

## Reglas fijas del canal (comprobadas por `revisar-041.mjs`)

1. **La primera toma sale sin texto ni voz** (DR233): Isabella entra A CORTE en el golpe del f115 y su primera palabra suena a los 8,45 f; el primer subtítulo entra con ella (f122). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Una sola afirmación con cifras (el hook) y ninguna en los bloques 5 y 6**: el choque con la regla «una sola cifra como mucho» está declarado en `01-plan.md`.
6. **Transiciones: solo corte** (ninguna disolvencia: todos los cambios caen en un golpe).

## Lo que decide esta pieza distinto del 030, el 031, el 034 y el 039

- **Frame 0 ya en movimiento:** DR233 va a ≈ 2,9 de movimiento medio, uniforme, desde el primer fotograma (cenital sobre el lote entero).
- **El dato abre, el paseo lo cumple:** hook con área y precio; el bloque 3 enseña lo que hay dentro (la cabaña, la vista alta, las terrazas), el 5 los accesos (el portón de la vereda y la vía) y la vista del atardecer.
- **Texto que marca el golpe:** el acento cae en «estás comprando.» (la promesa), «Dos accesos» (lo que se enseña a continuación) y «escríbeme lote» (la acción).
- **Color:** la base del canal (contraste 1,10) más el ajuste de cada plano medido; quemado máx. 0,1 %; los drones del atardecer bajan su saturación (1,02-1,06) para casarlos con Isabella, rodada de día.
- **La música** nunca sube: la canción llega a ≈ 0 dBFS y todos los tramos bajan 2,7-4,2 dB hasta −15 LUFS.
