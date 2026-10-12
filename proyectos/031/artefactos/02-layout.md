# 02 · Layout y capas — proyecto 031

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido031` (`remotion/src/proyectos/031/`), 1080×1920 a 30 fps, 1068 f (35,6 s). Es el montaje del 030 (V14) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-031.ts`, `audio-031.ts` y `subtitulos-031.ts`; la composición (`Recorrido031.tsx`) y el cierre (`cierre-031.ts`) son los del 030 renombrados.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los diez cambios de plano son cortes secos |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1007) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 7 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Somewhere inside of me», −15 LUFS sola, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero y pequeña en las tres tomas (camina hacia cámara desde lejos); el texto cae sobre la hierba, por debajo de sus pies o a la altura de las piernas, nunca sobre la cara.
- **Drones apaisados:** recortados a 9:16 en `normalizar.mjs` (ventana vertical de 1216×2160 en la x de cada clip): lo que importa del plano queda dentro al principio, a mitad y al final.
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-031.mjs`)

1. **La primera toma sale sin texto ni voz** (DR108): Isabella entra A CORTE en el golpe del f97 y su primera palabra suena a los 8,5 f; el primer subtítulo entra con ella (f105). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa 4,43 de los 5,10 s del clip).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros).

## Lo que decide esta pieza distinto del 030

- **Tres sitios de Isabella que se ven distintos** (talud, loma con valle, cabaña) en vez de tres fondos de la misma loma.
- **Cuatro drones apaisados recortados a 9:16** (el 030 solo usó verticales).
- **La música se BAJA** (la canción es alta, −9,4…−11,2 LUFS) en vez de subirla.
- **Sin excepción en la mitad**: las tres tomas dejan ≈ 25 f tras su última palabra y la música vuelve arriba antes del golpe siguiente.
