# 02 · Layout y capas — proyecto 051 (réplica de `videos editados/01.mp4`, sin locución y con el guion en pantalla)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido051` (`remotion/src/proyectos/051/`), 1080×1920 a 30 fps, 1437 f (47,90 s). Es el montaje de las piezas 045-050 (la composición del 050, con el cierre y la opacidad de los subtítulos del canal) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-051.ts`, `audio-051.ts` y `subtitulos-051.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 14 cortes (13 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **todas las entradas son disolvencias de 12 f que ACABAN en un golpe de la canción, salvo el frame 0, el paso del hook a la cocina (a corte, como el original) y la entrada del CTA**; `velocidad` ×1,5 solo en RC01 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de su plano (f1361) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | el hook dicho (3 bloques) y los 10 RÓTULOS del usuario, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 13 bloques, 10 acentos, una sola cifra («113 m²») |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | la voz del hook (HK05, un plano desde el segundo «Deseas», WAV tratado, −15 LUFS) + la música (*Einaudi Fly*, −15 LUFS sola, −31 bajo el hook): **no hay locución** | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos y rótulos:** abajo (borde superior ≈ 74,5 % = y 1430, nunca por debajo del 88 % = y 1690). Arriba **no hay nada** en ningún frame. Un rótulo cada vez, de 2-3 líneas apiladas (la base, el acento en Playfair itálica, la base). **En la versión con ficha** (`ficha-luxur`, que aquí CONSERVA los rótulos: el texto es el mensaje) la ficha va en y ≈ 1220-1420 y el rótulo desde y 1430: se comprueba en la hoja de `ficha.mjs hoja` que no se toquen.
- **Isabella:** en el hook, de cuerpo entero y pequeña (al fondo del balcón) y luego cada vez más cerca; en el CTA (muda), de cuerpo entero acercándose. El texto cae a la altura de las piernas o la cintura, nunca sobre la cara.
- **Recorridos:** TODOS son ANAMÓRFICOS (1920×1080 con SAR 81:256 / DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho) y se escalan ENTEROS a 1296×2304 con `setsar=1`, SIN recorte. Sin más texto en el recorrido que los rótulos (nunca un dato grande).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-051.mjs`)

1. **La primera toma sale sin texto ni voz**: **EXCEPCIÓN DECLARADA** (`ABRE_CON_EL_HOOK`): la pieza es la réplica de un original que abre con Isabella hablando. El frame 0 es ella, a corte; su primera palabra suena en el f8 y su primer subtítulo entra en el f7.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su plano; el CTA usa el clip hasta donde llega y no lo repite).
5. **Una sola cifra en pantalla** (reparto §5): «113 m²», en el primer rótulo; ninguna otra. El precio no está en el vídeo orgánico.
6. **Transiciones: disolvencias** (salvo el frame 0 y el paso del hook a la cocina): *Einaudi Fly* no tiene golpes de ≥ 10 dB donde cortar en seco (R33); cada una acaba en un golpe medido de 6,1-9,1 dB y los rótulos entran en otro.

## Lo que decide esta pieza distinto del formato y de las otras seis de arriendo

- **Es una réplica sin locución**: manda el orden del original y el guion nuevo del usuario en pantalla, no el viaje emocional del formato. El texto del recorrido son **rótulos sin voz debajo** (la puerta los declara en `SIN_VOZ` y los comprueba aparte: uno a la vez, 2,4-4,4 s, dentro del recorrido, el texto del usuario tal cual y un acento como mucho). El CTA es un rótulo sobre la imagen muda de Isabella, y hay **tres bloques** (2 · 3 · 6) en vez de seis.
- **Dura 47,9 s**, dentro de los 55 s del formato (el original, 64,0): los planos se recortan al ritmo de lectura.
- **El recorrido no acaba en una «vista»**: el original cierra la unidad con la Social Kitchen; aquí también.
- **La música lleva la pieza y marca el tiempo**: solo baja bajo el hook (f8-f101), sube con curva (24 f) tras «te muestro» y suena a −15 LUFS sola hasta la tarjeta; su caída natural (261,06 s = f1436) cae sobre ella. Cada cambio de plano y la primera línea de cada rótulo caen en un golpe medido (puerta 4c).
- **Imagen algo blanda:** el recorrido son 608×1080 efectivos ×2,13: más blando que Isabella en 4K (se dice, no se filtra: R22), pero con la geometría y el campo correctos. Aquí además TODO el material es de ese tipo, también Isabella (HK05 y CT04): no hay ninguna toma en 4K.
