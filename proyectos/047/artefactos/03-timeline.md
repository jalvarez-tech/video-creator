# 03 · Timeline — proyecto 047 (rev. 1: sin recorridos)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-047.ts`, `audio-047.ts` y `subtitulos-047.ts`, no al revés. **702 f a 30 fps (23,40 s).**

## Los planos (`metraje-047.ts`)

`desde` = segundo de la fuente NORMALIZADA. `en`/`dur` en frames de la composición. El primer plano entra a corte en el f0; los demás, con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y es opaco en él).

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Voz en la comp | Entrada |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-hook | 2 | Terraza común (sillón) | la promesa dicha: tiempo y aseo semanal | HK02 `IMG_4272` | 0 | 0 | 216 | f13-196 | corte |
| 2 | c02-mitad-precio | 4 | Social Kitchen | lo que incluye el canon (la cifra) | MD04 `IMG_4296` | 0,5 (15 f) | 216 | 131 | f217-325 | disolver |
| 3 | c03-mitad-amenidades | 4 | Gimnasio | la unidad cuenta con amenidades | MD05 `IMG_4297` | 0,5667 (17 f) | 347 | 112 | f348-436 | disolver |
| 4 | c04-cta | 6 | Escaleras con césped | la invitación | CT03 `IMG_4298` | 0,5667 (17 f) | 459 | 183 | f460-623 | disolver |
| 5 | c05-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 642 | 60 | — | corte |

Paseo (leído de arriba abajo): terraza → Social Kitchen → gimnasio → escaleras: es un paseo de ELLA por la unidad, de lo más abierto (la ciudad detrás) a la salida. Sin volver atrás.

## La voz (medida por energía, `onsets-voz.py`; R29: whisper pone la primera palabra de cada toma en 0,00 s)

| Toma | Voz (s de la fuente) | `desde` | Primera sílaba (frame de la comp) | Última palabra | Pausa hasta la siguiente toma | Ganancia (tras el compresor) |
|---|---|---|---|---|---|---|
| HK02 | 0,44 → 6,52 | 0 | f13 | f196 | 21 f (0,7 s) | +17,3 dB |
| MD04 | 0,54 → 4,12 | 15 f | f217 | f325 | 23 f (0,77 s) | +18,4 dB |
| MD05 | 0,585 → 3,54 | 17 f | f348 | f436 | 24 f (0,8 s) | +18,4 dB |
| CT03 | 0,60 → 6,04 | 17 f | f460 | f623 | 19 f de imagen + la tarjeta | +17,4 dB |

Crudas: −19,4 · −23,2 · −23,8 · −20,5 LUFS en su ventana de voz. Cadena de `normalizar.mjs` (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia, limitador a −2,5 dBFS): −15,0 LUFS y pico −2,5 dBFS en cada una; silencio fuera de la ventana.

## La música (*Dreamlife*, entrada a 202,1 s = f6063 de la canción)

| Tramo de la pieza | Frames | Canción (s) | Ganancia | LUFS resultante |
|---|---|---|---|---|
| Entrada | 0-8 | 202,1-202,4 | fundido de coseno 0 → −15,5 dB; el escalón de la meseta (golpe de 7,5 dB a 202,228 s) suena en el f5 | — |
| Lecho bajo las cuatro voces | 8-457 | 202,4-217,3 | −15,5 dB (×0,168) sobre un archivo a −10,3 LUFS | ≈ −26 |
| La CAÍDA y el CTA | 457-623 | 217,3-222,8 | sigue la caída: de −15 dB a 0 dB en 5,7 s (la canción baja de −10 a −25 LUFS) | ≈ −25 |
| La tarjeta | 623-700 | — | se apaga con curva de coseno | silencio |

La caída de la canción (rms −12 → −18 dBFS entre 217,2 y 217,9 s) cae en el f457; el CTA entra en el f459 y su primera sílaba suena en el f460. Mezcla de la prueba: ver `combinaciones.md`.

## Los subtítulos (`subtitulos-047.ts`)

| Bloque | Líneas | Acento | Entra |
|---|---|---|---|
| h01 | El tiempo es el activo / **más valioso** / de los seres humanos. | más valioso | f13, 42, 61 |
| h02 | Te ayudamos a optimizarlo, / incluyéndote / un aseo semanal. | — | f105, 144, 169 |
| m01 | **$14.800.000** | $14.800.000 | f217 |
| m02 | que incluyen experiencias / **pensadas para ti.** | pensadas para ti | f260, 292 |
| n01 | Además, esta unidad cuenta con / diferentes tipos de / **amenidades.** | amenidades | f348, 393, 417 |
| c01 | Cuando llegas a una ciudad / que no es la tuya, | — | f460, 480 |
| c02 | el acompañamiento / **personalizado** / es una plusvalía | personalizado | f504, 534, 561 |
| c03 | que vale la pena / **conocer.** | conocer | f593, 607 |

Cada línea entra 0-2,5 f antes de su palabra (medida sobre la voz sola con `onsets-voz.py` y comprobada con `palabras-desde.py`; `lineas-vs-onsets.py`: ✅ 0 líneas fuera de [−0,5, +3,0] f).

## Color (R32)

`COLOR_BASE` del canal + el ajuste de cada toma (todas con `saturation` ≤ 1,06 y sin tirar de cálido ni de frío). Luma de los planos (stills a escala 1): hook 94-104, MD04 85-89, MD05 93-96, CTA 91-93: parejos.
