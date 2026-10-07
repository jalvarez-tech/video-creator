# 02 · Layout y capas — proyecto 025

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido025` (`remotion/src/proyectos/025/`), 1080×1920 a 30 fps, 976 f. Mismo montaje que la V8; lo propio de la pieza está en `metraje-025.ts`, `audio-025.ts` y `subtitulos-025.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados |
| 6 | `PistaAudio` | voz de las 3 tomas (a −21 LUFS) + música («Heaven on Earth», −15 LUFS sola, ≈ −31 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** centro del cuadro; el texto nunca la tapa (la puerta lo comprueba).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-025.mjs`)

1. **La primera toma sale sin texto ni voz** (RC23): Isabella entra en el golpe del f105 (disolvencia que acaba en él) y su primera palabra suena 14,5 f después; el primer subtítulo entra con ella. Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma).
5. **Ninguna cifra** en toda la pieza (el máximo son una, y ninguna en los bloques 5 y 6); ni precio.
