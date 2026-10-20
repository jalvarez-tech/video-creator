# 02 · Layout y capas — proyecto 053 (V35 «¿Pagarías 14 millones?», réplica de `03.mp4`)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido053` (`remotion/src/proyectos/053/`), 1080×1920 a 30 fps, 1766 f (58,9 s) con la **pista guía** de la locución (se rehace con la real). Es el montaje del 047 (que ya normaliza bien los clips anamórficos) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-053.ts`, `audio-053.ts` y `subtitulos-053.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 10 cortes (9 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **todos los planos, salvo el primero, entran con una disolvencia de 12 f**; todo a ×1 y quieto (`zoom` 1,0: más escala ablandaría un material que ya sube ×2,13) |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, mientras hay subtítulos (aquí, casi toda la pieza: la locución es continua) | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que suena (la locución y el CTA), en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 21 bloques, 10 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | la locución (WAV tratado, −15 LUFS) + la voz del CTA (WAV tratado, −15 LUFS) + música (*Softly*, lecho a −26 LUFS bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame. Se pintan sobre las piernas de Isabella en el gancho y sobre la ropa/la mesa en el CTA: nunca sobre la cara.
- **Isabella:** HK05 (de pie, de cuerpo entero a torso, caminando hacia cámara) y CT05 (sentada, plano medio). Los dos son anamórficos del 2-sep (chaqueta de flores): una sola pieza entera del mismo vestuario, como pide el catálogo.
- **Recorridos:** los 7 son ANAMÓRFICOS (1920×1080 con SAR 81:256 / DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho) y se escalan ENTEROS a 1296×2304 con `setsar=1`, SIN recorte. Sin texto propio (la única cifra va con la voz del gancho).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-053.mjs`) y excepciones declaradas

1. **La primera toma sale sin texto ni voz → EXCEPCIÓN DECLARADA**: el original abre con Isabella caminando y una voz que pregunta, y la réplica lo conserva. El f0 es ella (sin texto) y la locución, con su subtítulo, entra unos frames después (f7-8). Es la excepción por réplica del reparto (§2).
2. **Nunca el sello «PROPIEDADES LUXUR»** (se cumple).
3. **El cierre es la tarjeta oscura con el logo y la web** (se cumple; no `@propiedadesluxur`).
4. **Nada se congela** (se cumple: la imagen de Isabella funde a negro en el último fotograma de su toma).
5. **Una sola cifra** en pantalla: «14 millones» (acento del gancho). «24/7» se pinta con letras. El canon (14,8) va en la ficha de la versión con ficha.
6. **Transiciones: solo disolvencias** (salvo el frame 0): *Softly* no tiene golpes seguidos donde cortar en seco.
7. **Excepciones por réplica, declaradas en la puerta:** dura ≈ 59 s (tope declarado 60 s; el formato pide ≤ 55); la locución en off es continua desde el gancho (el formato la limita al bloque 5); el último plano del bloque 5 es el carril de nado y el más largo, el balcón (el original acaba así); Isabella solo habla a cámara una vez.

## Lo que decide esta pieza distinto del 047

- **Los bloques son 2-5-6**: gancho (Isabella caminando, voz en off), recorrido con la locución, CTA a cámara. No hay bloque 1 (la casa limpia), ni 3 (recorrido mudo), ni 4 (objeciones).
- **La voz es una locución CONTINUA** (gancho + cinco frases, 53 s): la música no puede subir y bajar entre frases (hay 9-15 f de pausa y la curva pide 34): es un lecho constante bajo la voz hasta la caída de la canción, que cae entre la última palabra de la locución y la primera del CTA.
- **Las mismas tomas en el mismo orden que el original**, comprobado por `ORDEN_DEL_ORIGINAL` en la puerta; las alcobas del original no están en el material y se usa la más parecida (RC05).
- **Imagen algo blanda:** el recorrido son 608×1080 efectivos ×2,13: más blando que Isabella en 4K (se dice, no se filtra: R22), pero con la geometría y el campo correctos.
