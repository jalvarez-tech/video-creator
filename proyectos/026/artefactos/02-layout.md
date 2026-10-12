# 02 · Layout y capas — proyecto 026

> Paso 2 de 3. Capas, z-order y zonas de pantalla. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido026` (`remotion/src/proyectos/026/`), 1080×1920 a 30 fps, 1234 f. Mismo montaje que la V6-V8; lo propio de la pieza está en `metraje-026.ts`, `audio-026.ts` y `subtitulos-026.ts`. **Novedad respecto de la V8:** el hook y el CTA salen de la MISMA toma (RC14: dos tramos de un clip de 49,8 s, 38 s aparte) y la voz de RC14 viene con el audio de su propio clip, que se normaliza a WAV como las demás tomas (`rc14.wav`); el CTA entra con una disolvencia (la toma trae 0,41 s de aire antes de la primera palabra y la V8 no podía).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 11 planos de vídeo mudos y la tarjeta (`foto`) | look neutro con viñeta suave; **el color va por plano** (`colorCorrection()`, R32) → render con `--gl=angle`; sin sello ni velos superiores |
| 2 | `FundidoACierre` | la imagen de Isabella funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma del CTA | nada se congela; la toma trae 0,49 s de cola tras la última palabra |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | luxur va sin sombra: el velo es lo único que sostiene el blanco |
| 4 | `SubtitulosEditoriales` | todo lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | un acento por frase; dos a menos de 2 s no pasan el validador |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` (Montserrat 500, 54 px) sobre la tarjeta | centrados |
| 6 | `PistaAudio` | voz de las 3 tomas (a −21 LUFS) + música («desolate (Slowed)», −15 LUFS sola, ≈ 9,5 LU bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (borde superior ≈ 74,5 %, nunca por debajo del 88 %). Arriba **no hay nada** en ningún frame.
- **Isabella:** en el hook, ancha y pequeña al fondo (al abrir) y luego grande a la izquierda; el texto de abajo no la tapa salvo en el plano cercano de «ven, te muestro» (se mide con R25).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-026.mjs`)

1. **La primera toma lleva voz y texto: EXCEPCIÓN declarada** (`ABRE_CON_EL_HOOK`), como la V6-V8.
2. **Nunca el sello «PROPIEDADES LUXUR»**.
3. **El cierre es la tarjeta oscura con el logo y la web** (no `@propiedadesluxur`).
4. **Nada se congela.**
5. **Ninguna cifra** (la pieza no lleva el «76» de HK1) y, desde luego, ni precio.

## El sonido

| | |
|---|---|
| Voz | **Rev. 1 (2026-10-08, pedido del usuario): −15 LUFS, la voz TRATADA** (`<toma>-voz.wav`: highpass 100 Hz · puerta suave · compresor 3:1 · +16 dB · limitador −2,5 dBFS · apagada tras la última palabra): HK5 −15,1 · MD2 −14,6 · CT4 −14,4 LUFS, pico real −2,5 dBTP. Excepción a R29. (Rev. 0: −21 LUFS por toma, sin tratar: HK5 −22,3 · MD2 −24,6 · CT4 −22,7.) |
| Música sola | −15 LUFS (la canción mide −10,8 LUFS en la meseta: −4,2 dB de ganancia) |
| Música bajo la voz | ganancia × 0,15 (−16,5 dB): la canción mide −9,8 (hook), −10,8 (mitad) y −13,1 LUFS (CTA) en cada ventana de voz, así que la música queda a −30,5 / −31,5 / −33,8 LUFS = **9,5 / 10,5 / 12,8 LU bajo la voz a −21** (con 0,16 el hook daba 8,9) y **15,5 / 16,5 / 18,8 con la voz a −15 (rev. 1; la música no se tocó)**. Es un cambio respecto de «−16 dB»: declarado |
| Curvas | coseno; la bajada ACABA antes de la primera palabra (7 f desde el golpe; mitad y CTA: primera palabra a 7,5 f y 12,5 f); la subida, 24 f o los que quepan hasta 2 f antes del siguiente golpe |
| Canción | *ByErik – desolate (Slowed)*: suena desde el f0; su golpe de 86,626 s (14,3 dB) abre el paseo en el f168; cae a 118,0 s (LUFS por tramos de 5 s: −11,6 → −20,8 → −31,8) en el f1110, a 87 f de la entrada del CTA |

## El color

La base de Luxur (`COLOR_BASE`) más el ajuste de cada plano, medido (`herramientas/medir-color.py`, tabla rehecha). `vibrance` ≤ 0,05; la piel de Isabella, `saturation` ≤ 1,06. Hook y CTA salen de HLG tone-mapeado (como todas las tomas de Isabella); los recorridos, de SDR.
