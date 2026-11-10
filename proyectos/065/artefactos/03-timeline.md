# 03 · Timeline — proyecto 065 (rev. 2)

> Paso 3 de 3. Frames **absolutos** a **30 fps** (1209 f = 40,3 s). Los planos son contiguos. Todo cambio cae en un pulso medido de «Strobe» (128 BPM, un bombo cada 14,06 f; entrada en 554,937 s, `INICIO_MUSICA` = 16646/30): `pulso n` = frame `2,1 + 14,061·n`. Los datos están en `remotion/src/proyectos/065/` (`metraje-065.ts`, `infografia-065.ts`, `audio-065.ts`, `subtitulos-065.ts`, `cierre-065.ts`); este archivo es su mapa.

## Planos

| # | id | Bloque | Espacio · función | Clip · tramo | `en` | `dur` | Entra | Golpe (pulso · dB) |
|---|---|---|---|---|---|---|---|---|
| 1 | c01-apertura | 1 | el campo abierto: **situar** | DR04 12,60–16,40 s | 0 | 114 | corte | f3 · pulso 0 · 17,5 |
| 2 | c02-hook | 2 | Isabella caminando hacia cámara: **dar los datos** | HK03 desde 7,73 (232 f) · voz 8,18–16,2 | 114 | 260 | disolver | pulso 8 · 17,2 (la disolvencia ACABA) |
| 3 | c03-invita | 2 | «ven, te muestro»: **invitar** (a corte, empuje 1,08→1,14) | HK03 desde 16,6 (498 f) · voz 16,72–17,55 | 374 | 63 | corte | — (dentro de la voz) |
| 4 | c04-ficha | 3 | el vuelo con LA FICHA encima: **probar** | DR04 22,00–30,47 s | 437 | 254 | disolver | pulso 31 · 13,1 |
| 5 | c05-mitad | 4 | Isabella de pie: **preguntar** | CT05 desde 2,70 (81 f) · voz 3,13–5,40 | 691 | 98 | disolver | pulso 49 · 21,1 |
| 6 | c06-panorama | 5 | el panorama de la loma: **el entorno** | DR01 50,00–53,27 s | 789 | 98 | disolver | pulso 56 · 19,0 |
| 7 | c07-vista | 5 | la ladera y las lomas: **LA VISTA** (clímax, el más largo del bloque) | DR01 59,00–63,23 s | 887 | 127 | corte | pulso 63 · 17,2 |
| 8 | c08-cta | 6 | Isabella: **conversación** | CT01 desde 2,97 (89 f) · voz 3,41–7,2 | 1014 | 135 | disolver | pulso 72 · 12,8 |
| 9 | c09-cierre | 6 | tarjeta oscura con el logo y la web | `cierre-oscuro.png` | 1149 | 60 | corte | — (la música se apaga con curva) |

Voz de Isabella (frames de la comp): hook A f127,4–f368 · «ven, te muestro» f377,6–f402,6 · pregunta f703,9–f772 · CTA f1027,3–f1141. Cada toma entra **disolviendo** (la parte B, a corte) y su primera palabra suena 13,4 · 3,6 · 12,9 · 13,3 f después del golpe: la música baja con curva de coseno en 10 f y acaba **antes** de la palabra. El hook (A+B) es UNA sola bajada.

## Infografía (LA FICHA, sobre c04)

| f | Qué entra | Golpe |
|---|---|---|
| 451 → 466 | el velo negro (60 %) sube sobre el vuelo | — |
| 466 | ÁREA · 3.244 m² | pulso 33 · 13,3 dB |
| 508 | PRECIO NEGOCIABLE · $ 350 M | pulso 36 · 15,6 dB |
| 550 | DERECHO DE ACUEDUCTO · Incluido | pulso 39 · 18,9 dB |
| 593 | Escrituras · 100 % (héroe, con el filete dorado) | pulso 42 · 22,1 dB |
| 669 → 675 | el panel se va (fundido de 6 f) y el velo baja; la disolvencia a la pregunta empieza en f679 | — |

## Música (una sola canción, partida en tramos de la misma muestra)

| f | Qué hace |
|---|---|
| 0–114 | sola, a −15 LUFS (ganancia ≈ −5,9 dB); golpe de entrada en el f3 |
| 114–124 | baja con curva a −26 LUFS (el golpe del f114 suena entero) |
| 127–403 | bajo la voz del hook (A y B), −26 LUFS, sin subir entre las dos partes |
| 409–424 | sube con curva (15 f) tras 6 f de espera |
| 691–701 · 704–772 · 776–787 | baja, bajo la pregunta, sube (11 f) tras 4 f de espera |
| 1014–1024 · 1027–1141 | baja y bajo el CTA (la canción ya se va apagando sola desde ≈ f1115) |
| 1141–1207 | se apaga con curva de coseno hasta cero, bajo la tarjeta |

## Texto (editorial, abajo, 90 %)

4 acentos: «metros cuadrados» (f169) · «Medellín-Bogotá» (f257) · «350 millones.» (f327) · «“lote”» (f1037). Primer subtítulo en el f127 (con la imagen de Isabella ya opaca); ninguno durante la infografía. Ninguna cifra salvo las tres que ella dice: **3.244 · 15 · 350**.
