# 02 · Layout y capas — proyecto 040

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido040` (`remotion/src/proyectos/040/`), 1080×1920 a 30 fps, 1118 f (37,27 s). Es el montaje del 039 (V22) y del 034 (V18) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-040.ts`, `audio-040.ts` y `subtitulos-040.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 cortes (10 de vídeo mudos y la tarjeta, que es una `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 10 cambios de plano son cortes secos, ninguna disolvencia, ninguna velocidad |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1057) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 6 bloques, 3 acentos («esta vista», «casa soñada.», «escríbeme lote») |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, ≈ −15 LUFS) + música («Overcoming the Impossible», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** en el hook se ve de cuerpo entero y lejos (una figura pequeña en la loma con el valle detrás: el texto cae sobre la tierra roja, por debajo de ella); en la mitad y el CTA, de cintura para arriba y más cerca, con los brazos abiertos; el texto cae por debajo de su cintura, nunca sobre la cara.
- **Drones:** los cuatro son verticales (solo se rotan): no hay recorte 9:16. El cielo ocupa el tercio superior y la tierra o los árboles, el inferior: ahí van los subtítulos, que son del hook, la mitad y el CTA (en los planos de dron no hay texto).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-040.mjs`)

1. **La primera toma sale sin texto ni voz** (DR202): Isabella entra A CORTE en el golpe del f108 y su primera sílaba suena 9 f después; el primer subtítulo entra con ella (f116). Esta pieza **no** rompe la regla.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Una sola cifra** en toda la pieza («3.000 metros cuadrados», en el hook, en pantalla y en voz); nunca en los bloques 5 y 6; ni precio.
6. **Transiciones: solo corte** (ninguna disolvencia: cada cambio cae en un golpe medido de ≥ 9 dB).

## Lo que decide esta pieza

- **El orden de la luz:** del oro (DR202, DR209: 17:41-17:44) al rosa (DR236, DR234: 17:54), en el orden en que se rodó. La puerta (2f) lo comprueba.
- **La vista es el plano más largo de la pieza** (136 f = 4,5 s, DR234) y cae justo antes del CTA, donde la canción empieza a caer.
- **Acentos del texto:** «esta vista» (lo que promete el hook, el ángulo de la pieza), «casa soñada.» (lo que el lote ES para quien lo compra) y «escríbeme lote» (la acción).
- **Color:** Isabella de día y los drones al atardecer: se casan plano a plano y medidos, sin vestir a Isabella de atardecer.
- **La música** nunca sube: la canción llega a ≈ 0 dBFS y todos los tramos bajan 2,0-6,1 dB hasta −15 LUFS.
