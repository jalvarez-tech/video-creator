# 02 · Layout y capas — proyecto 034

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido034` (`remotion/src/proyectos/034/`), 1080×1920 a 30 fps, 970 f (32,3 s). Es el montaje del 031 (V15) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-034.ts`, `audio-034.ts` y `subtitulos-034.ts`; la composición (`Recorrido034.tsx`) y el cierre (`cierre-034.ts`) son los del 031 renombrados.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los diez cambios de plano son cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f909) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 8 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Chillin'», −15 LUFS sola por tramos —la apertura a −17,8 por su pico—, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara desde lejos); el texto cae sobre la hierba, por debajo de sus pies o a la altura de las piernas, nunca sobre la cara.
- **Drones apaisados:** recortados a 9:16 en `normalizar.mjs` (ventana vertical de 1216×2160 en la x de cada clip): DR101 en 0,35 y DR105 en 0,5.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-034.mjs`)

1. **La primera toma sale sin texto ni voz** (DR98): Isabella entra A CORTE en el golpe del f100 y su primera palabra suena a los 7,8 f; el primer subtítulo entra con ella (f107). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros).

## Lo que decide esta pieza distinto del 030 y del 031

- **El CTA es la segunda frase de su toma** («y agendemos una visita»): el WAV tratado es silencio hasta el hueco tras «botón», y la imagen arranca 0,28 s antes de su voz (sus labios cierran «botón» sin sonido; la cara mide ≈ 60 px).
- **La vista es a pie** (RC01), no aérea: ninguna vista aérea larga a velocidad constante quedaba sin usar.
- **La apertura de la música está por debajo de −15 LUFS** (−17,8): la canción tiene un pico de +0,3 dBFS en ese tramo y no se sube por encima de 0 dBFS.
- **Las tomas dejan menos aire** tras la última palabra (15,8 y 12,6 f, no 25 como en el 031): la música sube en 14 y 11 f y está arriba en el golpe siguiente.
