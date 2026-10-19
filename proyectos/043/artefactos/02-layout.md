# 02 · Layout y capas — proyecto 043

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido043` (`remotion/src/proyectos/043/`), 1080×1920 a 30 fps, 1108 f (36,93 s). Es el montaje del 039 (V22) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-043.ts`, `audio-043.ts` y `subtitulos-043.ts`.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 cortes (10 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; los 10 cambios de plano son cortes secos; todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1047) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 7 bloques, 3 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 3 tomas (WAV tratado, −15 LUFS) + música («Luxury, Elegance, Refined», −15 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** de cuerpo entero en las tres tomas (camina hacia cámara); el texto cae por debajo de su cintura o a la altura de las piernas, nunca sobre la cara.
- **Drones:** los tres son verticales 4K (se rotan, no se recortan); DR203, DR207 y DR211 llevan el cielo arriba y el lote abajo: el texto, que va abajo, cae sobre la parte oscura del primer plano (no hay texto en los planos de dron).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-043.mjs`)

1. **La primera toma sale sin texto ni voz** (DR203): Isabella entra A CORTE en el golpe del f100 y su primera palabra suena a los 10,5 f; el primer subtítulo entra con ella (f110).
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Ninguna cifra** en toda la pieza (ni precio ni metros), ni en pantalla ni en voz.
6. **Transiciones: solo corte** (ninguna disolvencia: todos los cambios caen en un golpe medido de ≥ 12,7 dB).

## Lo que decide esta pieza distinto del 039

- **Ritmo estándar del canal:** el paseo son tres planos de 2,3-3,3 s (no los cortos del 039), el portón y las terrazas del bloque 5 de 1,9 y 2,3 s y la vista de 4,6 s. Sin rampas de velocidad.
- **Imagen del atardecer:** los tres drones son del 2026-10-14 (17:41-17:46): cielo dorado y rosa, primer plano oscuro. Cada plano se gradúa para casarlo con las tomas de día, sin quemar el cielo ni hundir las terrazas.
- **Texto que marca lo práctico:** los tres acentos caen en «agua y energía», «dos entradas» y «y agendemos».
- **La música** casi no se toca de nivel: la canción ya está a ≈ −15 LUFS en todo el tramo (picos de −2,7 a −3,8 dBFS).
