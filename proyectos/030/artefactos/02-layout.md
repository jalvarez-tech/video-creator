# 02 · Layout y capas — proyecto 030

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido030` (`remotion/src/proyectos/030/`), 1080×1920 a 30 fps, 1160 f (38,7 s). Es el montaje de la V9 (025) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-030.ts`, `audio-030.ts` y `subtitulos-030.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los diez cambios de plano son cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1099) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 4 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Becoming», −17,5 LUFS sola, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** centro del cuadro (hook y CTA) o pequeña y centrada (la mitad: está lejos); el texto no le tapa la cara (cae sobre la hierba).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-030.mjs`)

1. **La primera toma sale sin texto ni voz** (DR97): Isabella entra A CORTE en el golpe del f100 y su primera palabra suena a los 8,1 f; el primer subtítulo entra con ella (f108). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA llega a su último fotograma real, 4,40 de 4,40 s).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros).

## Lo que decide esta pieza distinto del resto

- **Los tres sitios de Isabella son tres fondos de la misma loma** (2a de la puerta): el rodaje no la sacó de ahí.
- **Las tres tomas entran a corte** en un golpe que suena entero; la música baja después y acaba antes de la primera sílaba.
- **La música sola a −17,5 LUFS y por tramos** (la canción es más baja que las anteriores).
- **Sin metraje compartido con otras versiones:** es la primera de la propiedad.
