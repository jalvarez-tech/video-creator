# 02 · Layout y capas — proyecto 028

> Paso 2 de 3. Anterior: [01-plan.md](01-plan.md) · siguiente: [03-timeline.md](03-timeline.md).

Composición `Recorrido028` (`remotion/src/proyectos/028/`), 1080×1920 a 30 fps, 1056 f. Mismas capas que la V6-V11; **lo nuevo** es que `metraje-028.ts` no lista planos sino MESETAS de velocidad de una sola toma, y `cortesDeMesetas()` las convierte en 49 trozos contiguos (las rampas son escaleras de trozos de 2 f, de 0,5 en 0,5).

## Capas (de atrás a delante)

| # | Capa | Qué es | Notas |
|---|---|---|---|
| 1 | `PistaMetraje` | los 49 trozos de RC14 mudos (todos a corte: es el mismo plano) y la tarjeta (`foto`) | look neutro con viñeta suave; **un solo `color`** para todos (R32) → render con `--gl=angle`; sin sello ni velos superiores; zoom 1,0 (la cámara ya camina) |
| 2 | `FundidoACierre` | la imagen funde a negro (6 f) y llega a negro exacto en el último fotograma de la toma | nada se congela; quedan 13 f de su cara tras «contáctame» |
| 3 | `VeloSubtitulos` | degradado desde abajo, solo mientras hay subtítulos | Luxur va sin sombra: el velo sostiene el blanco |
| 4 | `SubtitulosEditoriales` | lo que dice Isabella, en un grupo al 90 % y con la cursiva 8 px menor (99 → 91 px) | en el paseo, nada |
| 5 | `LogoCierre` y `WebCierre` | logo (440 px, 60 %) y `PropiedadesLuxur.com` sobre la tarjeta | centrados |
| 6 | `PistaAudio` | la voz de los dos trozos a ×1 (−21 LUFS) + la música (−15 LUFS sola, ≥ 9,4 LU bajo la voz) | en la RAÍZ |

## Zonas (px de 1080×1920)

- **Subtítulos:** abajo (≈ 74,5 % del alto, nunca por debajo del 88 %). Arriba no hay nada.
- **Isabella:** en el hook, en el marco de la puerta y luego en plano medio; en el CTA, ante el ventanal de esquina y acercándose (el micro de solapa se ve desde los ≈ 47 s del clip, como en la V10).
- **Cierre:** tarjeta negra lisa; logo y web centrados, un poco por encima del centro.

## Reglas fijas del canal (comprobadas por `revisar-028.mjs`)

1. **El frame 0 sale sin texto ni voz** (la puerta entreabierta); ella habla desde el f28. La pieza abre con el hook como la V6-V11 (`ABRE_CON_EL_HOOK`, excepción declarada), pero aquí el hook es la misma toma.
2. **Nunca el sello «PROPIEDADES LUXUR»** ni la cuenta `@…`.
3. **El cierre es la tarjeta oscura con el logo y la web.**
4. **Nada se congela.**
5. **Ninguna cifra.**

## El sonido

| | |
|---|---|
| Voz | −21 LUFS por toma: el hook mide −22,3 (+1,3 dB) y el CTA −22,7 (+1,7 dB) (medidas de la V10 sobre el mismo WAV); sin tratar (R29). Desclic de 3 f al entrar y salir (los trozos entran a corte) |
| Música sola | −15 LUFS: la canción mide −10,8 LUFS en el paseo (f162-859) → −4,2 dB. El respiro (alcoba secundaria) mide −13,9: es de la canción y se respeta |
| Música bajo la voz | × 0,15 (−16,5 dB): la canción mide −9,7 (hook) y −16,5 LUFS (CTA, ya se apaga) → ≈ −30,4 / −37,2 LUFS = **9,4 / 16,2 LU bajo la voz** |
| Curvas | coseno. f0: el golpe a su nivel (1 f de entrada). Baja f8→f24, primera palabra f28. Sube f162→f180 (2 f antes del golpe en que arranca la sala, f182). Baja f841→f856 antes del CTA (primer sonido f859). Sube tras «contáctame» (f983→f996): la cola del final de la canción. Silencio en f1039 |

## El color

`COLOR_RC14` = la base de Luxur (contraste 1,1, negros −0,06, sombras +0,08, luces −0,2, blancos −0,05, temperatura +0,03) con `saturation` 1,02: lo que llevó RC14 en la V10 y la V11. El mismo en los 49 trozos (una toma partida no puede cambiar de color).
