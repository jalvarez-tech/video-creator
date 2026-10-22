# 03 · Timeline — proyecto 056

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-056.ts`, `audio-056.ts` y `subtitulos-056.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-conjunto | 1 | el conjunto desde arriba | situar / prometer | DR02 | 97,00 | 0 | 73 | corte | 178,043 · 10,2 (suena en f3) |
| 2 | c02-hook | 2 | jardín | emocionar (la promesa) | HK04 | 0,400 (12 f) | 73 | 120 | disolver | 180,363 · 9,2 |
| 3 | c03-fachada | 3 | la fachada | revelar | RC28 | 0,30 | 193 | 83 | corte | 184,387 · 13,7 |
| 4 | c04-sala | 3 | interior social | situar (lo construido, por dentro) | RC05 | 2,00 | 276 | 93 | corte | 187,159 · 10,8 |
| 5 | c05-cocina | 3 | cocina | valor (los acabados) | RC20 | 0,10 | 369 | 88 | corte | 190,230 · 14,7 |
| 6 | c06-mitad | 4 | sala de doble altura | emocionar (la cifra, dicha) | MD02 | 0,400 (12 f) | 457 | 135 | disolver | 193,193 · 13,3 |
| 7 | c07-alcoba | 5 | alcoba principal | cómo se vive (el descanso) | RC12 | 3,00 | 592 | 88 | disolver | 197,681 · 11,4 |
| 8 | c08-balcon | 5 | alcoba con balcón | llevar a otro espacio, hacia la vista | RC16 | 3,20 | 680 | 84 | corte | 200,617 · 15,5 |
| 9 | c09-vista | 5 | el valle desde arriba | emocionar (el clímax, el plano más largo) | DR02 | 106,00 | 764 | 111 | corte | 203,402 · 10,7 |
| 10 | c10-cta | 6 | sala (sofá gris) | invitar | CT01 | 1,467 (44 f) | 875 | 121 | disolver | 207,118 · 13,9 |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 996 | 60 | corte | — |

Total: **1056 f = 35,2 s**. Planos mudos (el sonido va en `audio-056.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: golpe de entrada → fin de la bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK04) | 0,80 – 3,82 | f85 | f176 | f73 → f83 | f176 → f191 (golpe del f193) |
| c06-mitad (MD02) | 0,82 – 4,07 | f470 | f567 | f457 → f467 | f567 → f589 (golpe del f592) |
| c10-cta (CT01) | 1,86 – 5,04 | f887 | f982 | f875 → f885 | f982 → f996 y se apaga en línea recta hasta el f1040 |

## El texto (subtítulos editoriales; ver `subtitulos-056.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 84-135 | Descubre la / privacidad de / vivir en un | — |
| h02 | 135-184 | condominio de / **solo seis casas.** | solo seis casas. |
| m01 | 469-538 | Los condominios de / **menos de 10** / unidades privadas | menos de 10 |
| m02 | 538-573 | se valorizan / diferente. | — |
| c01 | 886-934 | Si realmente buscas / tranquilidad, | — |
| c02 | 934-968 | esta casa es / para ti. | — |
| c03 | 968-988 | **Escríbeme.** | Escríbeme. |

## La música

«Heaven on Earth» desde los 178,000 s (`INICIO_MUSICA` = 5340/30): su golpe de 10,2 dB (178,043 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −1,6 dB, paseo +0,7 dB, bloque 5 −1,8 dB sobre el archivo), −26 LUFS bajo la voz. **La canción cae desde los 209,5 s (f947), dentro de la toma del CTA**, y la cola se apaga bajo la tarjeta (f1040).
