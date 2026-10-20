# 02 · Layout y capas — proyecto 047 (rev. 2: los recorridos vuelven, bien normalizados)

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido047` (`remotion/src/proyectos/047/`), 1080×1920 a 30 fps, 1411 f (47,03 s). Es el montaje del 043 (V26) con los planos, el audio y el texto de esta pieza: lo propio está en `metraje-047.ts`, `audio-047.ts` y `subtitulos-047.ts`. Admite la propiedad `sinSubtitulos` (la base de la versión con ficha, `ficha-luxur`): apaga los subtítulos y su velo y no toca nada más.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 cortes (10 de vídeo mudos y la tarjeta `foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores; **todos los planos, salvo el primero, entran con una disolvencia de 12 f** (la canción no da golpes en que cortar); todo a ×1 |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA (f1350) | nada se congela |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | 8 bloques, 7 acentos |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados, y≈795-1085 |
| 6 | `PistaAudio` | voz de las 4 tomas (WAV tratado, −15 LUFS) + música (*Dreamlife*, −16 → −15 → −14 LUFS sola por tramos, −26 bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** HK02 sentada (plano medio-general), MD04 sentada con el cuerpo entero, MD05 y CT03 de pie con el cuerpo entero; el texto cae a la altura de las piernas o de las rodillas, nunca sobre la cara ni las manos.
- **Recorridos:** los 6 son ANAMÓRFICOS (1920×1080 con SAR 81:256 / DAR 9:16 = verticales de 608×1080 comprimidos a lo ancho) y se escalan ENTEROS a 1296×2304 con `setsar=1`, SIN recorte (la rev. 0 los recortaba: un zoom ×3,2). Los paneos van todos hacia la DERECHA (raccord: piscina → Social Kitchen → alcoba → baño → balcón). Sin texto en ningún plano de recorrido (el dato grande del bloque 3 no se usa: la única cifra va con la voz de MD04).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-047.mjs`)

1. **La primera toma sale sin texto ni voz** (el principio de RC02, la sala de día): Isabella aparece con una disolvencia, su imagen es opaca en el f90 y su primera sílaba suena en el f91; el primer subtítulo entra con ella.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela** (la imagen de Isabella funde a negro en el último fotograma de su toma; el CTA usa el clip hasta su último fotograma).
5. **Una sola cifra** en toda la pieza: `$14.800.000`, en el subtítulo de MD04, como acento y con la voz de MD04 (el canon de la ficha). Ninguna más, ni en pantalla ni en voz.
6. **Transiciones: solo disolvencias** (salvo el frame 0): *Dreamlife* no tiene golpes de ≥ 12 dB donde cortar en seco (sus golpes más fuertes en la ventana, de 8,5-9,7 dB, caen antes de los 184 s). Las disolvencias no piden golpe (R33).

## Lo que decide esta pieza distinto del 043

- **La mitad son DOS tomas** (MD04 y MD05) unidas con una disolvencia; Isabella sale cuatro veces a cámara (hook, MD04, MD05, CTA) en cuatro fondos distintos.
- **El bloque 3 son DOS planos** (la piscina de 5,0 s y la Social Kitchen de 3,2 s), no tres: el sauna sale oscuro y desenfocado, el gimnasio lleva a un hombre y el resto de la unidad es apertura o clímax de otra pieza.
- **La música es una curva, no una rejilla:** entra en el f0 con un fundido de 8 f, baja ANTES de cada voz, sube con la canción (calma → escalón → meseta del apartamento), cae en el f1166 donde entra el CTA y se apaga bajo la tarjeta.
- **El clímax enseña el jacuzzi privado** (RC03, de 5,8 a 6,9 s de la fuente, al fondo del balcón).
- **Imagen algo blanda:** el recorrido son 608×1080 efectivos ×2,13: más blando que Isabella en 4K (se dice, no se filtra: R22), pero con la geometría y el campo correctos.
