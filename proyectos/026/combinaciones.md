# 026 · One Living (Envigado) — qué se eligió y cómo cambiarlo

> V10 del registro de reels, cuarta de One Living. Los planos están en `remotion/src/proyectos/026/metraje-026.ts`; la puerta, en `proyectos/026/revisar-026.mjs`. **Estado: FINAL exportado (2026-10-06, orden «renderiza», CRF 16 `slow`) con cinco palabras sin oír; REV. 1 el 2026-10-08 (la voz de Isabella a −15 LUFS, tratada).**

## Lo elegido

| Pieza | Elección |
|---|---|
| Vía | **(b)**: la voz de RC14 («recorrido caminando», una sola toma de 49,8 s) como hook y como CTA (decisión del usuario, 2026-10-06; no quedaba ningún hook, mitad ni CTA limpio) |
| Hook | **HK5 = RC14 1,6-7,2 s** «Hay apartamentos para vivir y hay otros que te dan más posibilidades. Ven, te muestro.» (ENTRADA; abre la pieza, excepción declarada). Sin cifras. «te dan más posibilidad»: aceptado por el usuario; **se pintó «posibilidades»** (plural, por oír) |
| Mitad | **MD2** «Aquí el balcón se convierte en una extensión de la zona social.» (BALCON; **repetida de la V8**: decisión del usuario, no queda ninguna libre) |
| CTA | **CT4 = RC14 44,8-49,84 s** «Si te gustó este apartamento y deseas tener más información, contáctame.» (ALCOBA, ventanal de esquina; sin canal) |
| Canción | **ByErik – desolate (Slowed)** (lo-fi slowed + reverb †): suena desde el f0 (se usa desde 81,07 s); su golpe de 86,626 s abre el paseo a los 5,6 s; cae a 118,0 s dentro del CTA. Sin pulso: cortes en golpes medidos. **Propuesta mía** (entre *desolate*, *Heaven on Earth* —la reservó la V9— e *Ivory Skyline Reverie*; se mandaron extractos); medida, no oída |
| Recorrido 1 | RC05 (la isla y la estufa) · RC09 (la cocina, desde el otro lado) · RC05 (la sala hacia la corredera) · RC01 (el balcón) |
| Recorrido 2 | RC11 (las puertas del baño y del vestier) · RC04 (el baño) · RC13 (la alcoba) · RC12 (la vista, la más larga) |
| Duración | 1234 f · 41,13 s |

## El final (2026-10-06, orden «renderiza» sobre la rev. 0, sin cambios)

`proyectos/026/finales/026-recorrido.mp4` (CRF 16 `slow`, 1080×1920, 1234 f · 41,13 s, 61 MB, −16,1 LUFS en toda la pieza, pico real −1,0 dBFS) y `026.srt` (17 cues). Etiquetas de color arregladas sin pérdida (`h264_metadata` + `+write_colr`: bt709/bt709/bt709 en el VUI y en el contenedor); md5 del vídeo decodificado (`36135436…`) y del PCM (`82ea06d9…`) idénticos a los del render sin arreglar. Color medido contra stills a escala 1 (`finales/medir-final.txt`: Δ ≤ 0,22 niveles, PSNR de baja frecuencia ≥ 49,8 dB en 12 fotogramas, 0 fuera de tolerancia). Golpes sobre el audio de la final (`finales/golpes-final.txt`): los tres cortes secos miden 10,7 · 9,7 · 15,7 dB (R33 ≥ 7,4) y todos caen a ≤ 1,1 f de su corte. **Exportada con CINCO palabras sin oír** (cerradas por medida; la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-026.ts` y `--final` falla solo por ella): «posibilidades» (≈ 3,1 s del vídeo), «te muestro» (≈ 4,2 s), «gustó» (≈ 35 s), la última sílaba de «contáctame» (≈ 38,2 s) y «balcón» (≈ 18 s, heredada de la V8). Para cambiar una: el texto del trozo en `subtitulos-026.ts`, `voz/hk5.txt` o `voz/ct4.txt` o `voz/md2.txt`, el `dice` del plano en `metraje-026.ts`, el `.srt` y volver a renderizar (≈ 2 min).

## Rev. 1 del final (2026-10-08): la voz con más decibeles sin saturar

Pedido del usuario sobre la final ya exportada: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar». La voz iba a −21 LUFS sin tratar (R29) y quedaba ≈ 6 dB por debajo de la música sola (−15). **Ahora suena la voz TRATADA** (`remotion/public/recorrido-026/rc14-voz.wav` y `md2-voz.wav`, el paso `vozTratada` de `proyectos/026/normalizar.mjs`): highpass 100 Hz · puerta suave · compresor 3:1 desde −26 dBFS · +16 dB · limitador a −2,5 dBFS, la receta de la V12 y la V9, y un fundido de 40-60 ms justo tras la última palabra (`VOZ_FIN`). Es una excepción a R29, por encargo y ya confirmada en tres piezas.

| | rev. 0 | rev. 1 |
|---|---|---|
| Voz del hook (ventana de voz, en la final) | −21,0 LUFS | **−14,8** |
| Voz de la mitad | −20,2 | **−14,9** |
| Voz del CTA | −21,2 | **−15,0** |
| Los WAV tratados, solos | — | −15,1 · −14,6 · −14,4 LUFS, pico real −2,5 dBTP (−2,4 · −2,9 · −3,1 con su ganancia en la puerta) |
| Música (paseo · bloque 5) | −14,6 · −15,4 | **igual** (≈ 15,5 LU bajo la voz en vez de ≈ 9,5) |
| Pieza entera | −16,1 LUFS · pico −1,0 dBFS | −15,1 LUFS · pico −4,6 dBFS |

Imagen **idéntica** (md5 del vídeo decodificado `36135436…`, igual al de la rev. 0); el PCM cambia (`9076fd43…`). Los golpes sobre el audio de la final no se mueven (`finales/golpes-final.txt`: igual que la rev. 0). La rev. 0 se guarda como `finales/026-recorrido-rev0.mp4` (y `golpes-final-rev0.txt`). Etiquetas de color arregladas sin pérdida otra vez (bt709/bt709/bt709; md5 del vídeo y del PCM iguales a los del render sin arreglar). El color no se volvió a medir contra stills: la imagen es la misma, bit a bit (`finales/medir-final.txt` sigue valiendo).

**Lo que costó, y se arregló:** tras «contáctame» (voz hasta 49,35 s de RC14) el micro de solapa da golpes graves de −22 a −38 dBFS (49,45-49,84 s, por debajo de 150 Hz) que la cadena subía +6,8 dB (a −18/−28 dBFS), y el ruido tras MD2 subía +9 dB; se apagan con un `afade` justo tras la palabra y la puerta (sección 3) exige ≤ −35 dBFS en esa cola.

## Cómo cambiarlo

- **Otra canción.** *Ivory Skyline Reverie* es el plan B (la caída en LUFS cumple a 194,5 s; 42.915 soluciones de rejilla con la vista ≥ 3 s; la pista acaba 2,5 s después de caer; lounge/downtempo †, puede sonar playero). Cambia `GOLPE`, `INICIO_MUSICA`, `DECAE`, `FIN_MUSICA_026`, las ganancias de `audio-026.ts` (`LUFS_MESETA`, `LUFS_CANCION_EN_VOZ`) y `normalizar.mjs`; todos los `en` salen de `golpe(...)`. `buscar-cortes.py` con los rangos de `R` (frames de plano disponibles en cada clip) y `T_F` (el instante de la caída, medido con `lufs-caida.py`).
- **Sin repetir la mitad** (la V10 sería una pieza de ≈ 36 s): quita `c07-mitad` y su subtítulo, borra el bloque 4 de `BLOQUES`/`DE_ELLA` de la puerta y rehaz la rejilla con 8 pares en vez de 9. La mitad MD3 («dos habitaciones independientes, balcón y ubicación junto a City Plaza») es la otra opción repetida: deja pocas canciones con rejilla válida (par de golpes a 158-167 f).
- **«posibilidad» (singular).** El texto del trozo `h02` en `subtitulos-026.ts`, `voz/hk5.txt`, el `dice` de `c02-hook` y el `.srt`.
- **Quitar la voz de RC14 como hook.** No se puede sin otra toma: la ventana de voz del clip son los dos tramos usados.
- **Otro tramo del recorrido.** El plano vale mientras `desde` + `dur` quepa en el clip y la puerta (6 y 7) lo pida; si cambia su `dur` hay que mover la rejilla de golpes (`P` en `metraje-026.ts`).

## Lo que comparte con la V6, la V7 y la V8

La toma MD2 entera (clip y voz, de la V8); de recorrido, RC04 0,5-3,4 s con la V7 (2,9 s), RC01 4,6-7,0 s con la V8 (1,0 s) y RC05 7,6-10,2 s con la V6 (0,4 s). El hook y el CTA son tomas nuevas (RC14 era «sin usar»).

## Pendiente (todo medido, nada oído)

Oír «posibilidades» (≈ 3,1 s del vídeo), «te muestro» (≈ 4,2 s), «gustó» (≈ 35 s), la última sílaba de «contáctame» (≈ 38,2 s) y «balcón» (≈ 18 s, heredada de la V8); la canción (género del catálogo) y la licencia; el canal del CTA; la alcoba de RC14 (¿principal?); el micro de solapa visible en el CTA; el aire de la puerta/miniatura del frame 0 (puerta + Isabella pequeña).
