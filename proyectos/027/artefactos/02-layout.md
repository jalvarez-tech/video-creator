# 02 · Layout y capas — proyecto 027

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido027` (`remotion/src/proyectos/027/`), 1080×1920 a 30 fps, 1077 f. Mismo montaje que la V6-V10; lo propio de la pieza está en `metraje-027.ts`, `audio-027.ts` y `subtitulos-027.ts`. **Novedad respecto de la V10:** las tres tomas de Isabella son de tres versiones distintas (HK2 de la V6, MD3 de la V7, CT4 de la V10), y RC14 se usa dos veces: sin voz en el paseo (ella de espaldas, de la sala a la isla, 18,5-22,6 s) y con su voz en el CTA (44,8-49,83 s), 22 s aparte.

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA | nada se congela; la toma trae 0,48 s de cola tras la última palabra |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | un acento por frase; dos a menos de 2 s no pasan el validador |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados |
| 6 | `PistaAudio` | voz de las 3 tomas (a −17 LUFS desde la rev. 1) + música (*Ivory Skyline Reverie*, −15 LUFS sola, ≥ 13,8 LU bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** en el hook, al fondo del balcón y luego grande en plano medio (la V6 lo midió: el texto de abajo no le tapa la cara); en la mitad, en el centro de la sala; en el CTA, ante el ventanal y acercándose (el micro de solapa se ve desde los ≈ 47 s del clip, como en la V10).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-027.mjs`)

1. **La primera toma lleva voz y texto: EXCEPCIÓN declarada** (`ABRE_CON_EL_HOOK`), como la V6-V10.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela.**
5. **Ninguna cifra** («dos habitaciones», en palabra) y ni precio.

## El sonido

| | |
|---|---|
| Voz | **rev. 1 (pedido del usuario: «más decibeles sin saturar»): −17 LUFS por toma**, 4 dB más que el −21 del canal. Sin tratar medían HK2 −18,7 · MD3 −21,6 · CT4 −22,7 y MD3 no subía más de 0,7 dB sin pasar de −1 dBTP: cada toma sube con una ganancia (+2,21 · +5,59 · +6,50 dB) y un limitador de picos con lookahead a −2,0 dBFS (`normalizar.mjs`, `VOZ_ALTA`; reducción mediana 0 dB, > 1 dB en el 1-8 % de la voz, máx. 4,5 dB; 0 muestras de desfase). Pico real de cada voz: −2,0 dBTP. La rev. 0 iba a −21 sin tratar (R29) |
| Música sola | −15 LUFS (la canción mide −11,0 LUFS en los dos recorridos juntos: −4,0 dB de ganancia; el paseo queda a −14,4 y el bloque 5 a −15,8, la dinámica de la canción) |
| Música bajo la voz | ganancia × 0,16 (−16 dB): la canción mide −10,9 (hook), −13,6 (mitad) y −16,6 LUFS (CTA, ya cayendo) en cada ventana de voz → la música queda a ≈ −30,8 / −33,5 / −36,5 LUFS = **13,8 / 16,5 / 19,5 LU bajo la voz** con la voz a −17 (rev. 1; en la rev. 0, con la voz a −21, eran 9,8 / 12,5 / 15,5) |
| Curvas | coseno; la bajada ACABA antes de la primera palabra (7 f desde el golpe; mitad y CTA: primera palabra a 14,7 f y 12,6 f del golpe); la subida, 24 f o los que quepan hasta 2 f antes del siguiente golpe (hook: 24; mitad: 12,6) |
| Canción | *Ivory Skyline Reverie*: suena desde el f0 (desde 163,233 s); su golpe de 168,183 s (17,1 dB) abre el paseo en el f150; cae en LUFS a 194,5 s (f939, dentro de la toma del CTA) y la pista acaba a 197,23 s (f1021, 4 f dentro de la tarjeta) |

## El color

La base de Luxur (`COLOR_BASE`) más el ajuste de cada plano, medido (`herramientas/medir-color.py`, tabla rehecha). `vibrance` ≤ 0,05; la piel de Isabella, `saturation` ≤ 1,06. Las tres tomas de Isabella y el paseo de RC14 salen de HLG tone-mapeado; los demás recorridos, de SDR. Dos planos seguidos del MISMO clip (c05 y c06, RC09) llevan el MISMO color.
