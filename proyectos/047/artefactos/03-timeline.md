# 03 · Timeline — proyecto 047 (rev. 2: los recorridos vuelven, bien normalizados)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-047.ts`, `audio-047.ts` y `subtitulos-047.ts`, no al revés. 1411 f a 30 fps (47,03 s).

## Los planos (`metraje-047.ts`)

Todos los planos de recorrido llevan un paneo hacia la DERECHA. `desde` = segundo de la fuente NORMALIZADA (los recorridos son anamórficos 81:256 y se escalan enteros a 1296×2304, sin recorte). `en`/`dur` en frames de la composición. Todos los planos, salvo c01, entran con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y es opaco en él).

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Voz en la comp | Entrada |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-apertura | 1 | Sala de día | situar / prometer: el mejor interior, la vista asomando | RC02 `Img 9463` (principio) | 0 | 0 | 90 | — | corte |
| 2 | c02-hook | 2 | Terraza común (sillón) | la promesa dicha: tiempo y aseo semanal | HK02 `IMG_4272` | 0,4 (12 f) | 90 | 198 | f91-274 | disolver |
| 3 | c03-piscina | 3 | Piscina (unidad) | revelar lo que trae la unidad | RC16 `Img 9525` | 0,4 | 288 | 150 | — | disolver |
| 4 | c04-social | 3 | Social Kitchen (unidad) | llevar a donde espera Isabella | RC11 `Img 9513` | 0,8 | 438 | 96 | — | disolver |
| 5 | c05-mitad-precio | 4 | Social Kitchen | lo que incluye el canon (la cifra) | MD04 `IMG_4296` | 0,5 (15 f) | 534 | 123 | f535-643 | disolver |
| 6 | c06-mitad-amenidades | 4 | Gimnasio | la unidad cuenta con amenidades | MD05 `IMG_4297` | 0,5667 (17 f) | 657 | 103 | f658-746 | disolver |
| 7 | c07-alcoba | 5 | Alcoba principal | intimidad: entrar en lo privado | RC05 `Img 9477` | 1,5 | 760 | 120 | — | disolver |
| 8 | c08-bano | 5 | Baño principal | cuidado, calma; continúa la puerta de la alcoba | RC09 `Img 9484` | 1,5 | 880 | 108 | — | disolver |
| 9 | c09-balcon | 5 | Balcón (camas, jacuzzi privado, torres, ciudad) | el clímax: lo que se vería viviendo aquí | RC03 `Img 9464` | 3,2 | 988 | 180 | — | disolver |
| 10 | c10-cta | 6 | Escaleras con césped | la invitación | CT03 `IMG_4298` | 0,5667 (17 f) | 1168 | 183 | f1169-1332 | disolver |
| 11 | c11-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 1351 | 60 | — | corte |

Paseo (leído de arriba abajo): **sala (promesa)** → terraza (Isabella) → piscina → Social Kitchen → Social Kitchen (Isabella) → gimnasio (Isabella) → alcoba → baño → balcón y vista → escaleras (Isabella). Sin volver atrás; el clímax cierra el bloque 5 y es el plano más largo (6,0 s). Isabella en cuatro sitios distintos; no hay puente humano (el material no lo da).

## La voz (medida por energía, `onsets-voz.py`; R29: whisper pone la primera palabra de cada toma en 0,00 s)

| Toma | Voz (s de la fuente) | `desde` | Primera sílaba (frame de la comp) | Última palabra | Aire hasta el siguiente plano | Ganancia (tras el compresor) |
|---|---|---|---|---|---|---|
| HK02 | 0,44 → 6,52 | 12 f | f91 | f274 | 14 f | +17,3 dB |
| MD04 | 0,54 → 4,12 | 15 f | f535 | f643 | 14 f | +18,4 dB |
| MD05 | 0,585 → 3,54 | 17 f | f658 | f746 | 14 f | +18,4 dB |
| CT03 | 0,60 → 6,04 | 17 f | f1169 | f1332 | 19 f de imagen + la tarjeta | +17,4 dB |

Crudas: −19,4 · −23,2 · −23,8 · −20,5 LUFS en su ventana de voz. Cadena de `normalizar.mjs` (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia, limitador a −2,5 dBFS): −15,0 LUFS y pico −2,5 dBFS en cada una; silencio fuera de la ventana.

## La música (*Dreamlife*, entrada a 178,467 s = f5354 de la canción)

| Tramo de la pieza | Frames | Canción (s) | LUFS de la canción | Ganancia | LUFS resultante |
|---|---|---|---|---|---|
| Apertura (solo música) | 0-78 | 178,5-181,1 | −15,9 | ×0,99 | −16,0 |
| Bajo el hook | 91-274 | 181,5-187,6 | −15,0 | ×0,28 (−11 dB) | ≈ −26 |
| El paseo por la unidad | 298-521 | 188,1-195,7 | −12,8 | ×0,78 | −15,0 |
| Bajo MD04 + MD05 | 535-746 | 196,3-203,3 | −11,5 | ×0,19 (−14,5 dB) | ≈ −26 |
| El apartamento (meseta) | 770-1155 | 203,8-217,2 | −10,1 | ×0,64 | −14,0 |
| La CAÍDA y el CTA | 1166-1332 | 217,3-222,8 | −10 → −25 | sigue la caída (−15 → 0 dB) | ≈ −25 |
| La tarjeta | 1333-1409 | — | — | se apaga con curva de coseno | silencio |

La caída de la canción (rms −12 → −18 dBFS entre 217,2 y 217,9 s) cae en el f1166; el CTA entra en el f1168 y su primera sílaba suena en el f1169. La meseta (desde 202,2 s) llega en el f713 y cubre el bloque 5 entero (f760-1168).

## Los subtítulos (`subtitulos-047.ts`)

| Bloque | Líneas | Acento | Entra |
|---|---|---|---|
| h01 | El tiempo es el activo / **más valioso** / de los seres humanos. | más valioso | f91, 120, 139 |
| h02 | Te ayudamos a optimizarlo, / incluyéndote / **un aseo semanal.** | un aseo semanal | f183, 222, 247 |
| m01 | **$14.800.000** | $14.800.000 | f535 |
| m02 | que incluyen experiencias / **pensadas para ti.** | pensadas para ti | f578, 610 |
| n01 | Además, esta unidad cuenta con / diferentes tipos de / **amenidades.** | amenidades | f658, 703, 727 |
| c01 | Cuando llegas a una ciudad / que no es la tuya, | — | f1169, 1189 |
| c02 | el acompañamiento / **personalizado** / es una plusvalía | personalizado | f1213, 1243, 1270 |
| c03 | que vale la pena / **conocer.** | conocer | f1302, 1316 |

Cada línea entra 0-2 f antes de su palabra (medida sobre la voz sola con `onsets-voz.py` y comprobada con `palabras-desde.py`; los tiempos del DTW de whisper iban 3-5 f tarde en cuatro líneas y 5 f pronto en una).

## Color (R32)

`COLOR_BASE` del canal + el ajuste de cada plano, medido con stills a escala 1 (`--gl=angle`): luma media de los planos de 85-150 (la sala de día, la piscina, la Social Kitchen, Isabella: 85-110; la alcoba y el baño, que son blancos, bajados con `exposure` −0,35/−0,4 de 167 a 150; el balcón, 116).
