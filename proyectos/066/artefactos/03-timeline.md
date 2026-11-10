# 03 · Timeline — proyecto 066

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-066.ts`, `audio-066.ts` y `subtitulos-066.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo del suelo al aire, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-lote | 1 | el camino en curva y los cipreses, desde el aire | situar / prometer | DR01 | 0,50 | 0 | 72 | corte | 178,095 · 10,1 (suena en f3) |
| 2 | c02-hook | 2 | el prado con la cordillera detrás | emocionar (la escasez) | HK05 | 0,600 (18 f) | 72 | 259 | disolver (libre) | — |
| 3 | c03-cielo | 3 | el cielo y el valle a ras de suelo | revelar (el aire) | RC01 | 5,60 | 331 | 98 | corte | 189,016 · 10,8 |
| 4 | c04-lote | 3 | el lote desde arriba | cómo se ve (la extensión) | DR05 | 6,40 | 429 | 182 | corte | 192,279 · 12,3 |
| 5 | c05-mitad | 4 | la loma con los pinos | emocionar (la paz) | MD03 | 0,400 (12 f) | 611 | 186 | disolver (libre) | — |
| 6 | c06-rincon | 5 | el rincón bajo el árbol que abre al valle | cómo se vive (la intimidad) | RC04 | 2,40 | 797 | 79 | corte | 204,558 · 9,8 |
| 7 | c07-vuelo | 5 | el vuelo que baja al borde del lote | llevar a otro espacio, hacia la vista | DR02 | 6,20 | 876 | 73 | corte | 207,188 · 9,3 |
| 8 | c08-vista | 5 | Medellín desde el lote | emocionar (el clímax, el plano más largo) | DR01 | 18,00 | 949 | 113 | corte | 209,598 · 12,5 |
| 9 | c09-cta | 6 | el camino con las cercas | invitar | CT04 | 0,400 (12 f) | 1062 | 96 | disolver (libre) | — |
| 10 | c10-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1158 | 60 | corte | — (la música ya está apagada: el golpe de 20,9 dB suena en f1167) |

Total: **1218 f = 40,6 s**. Planos mudos (el sonido va en `audio-066.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía en banda de voz, 33 ms)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: fin de la bajada (curva) | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK05) | 1,33 – 7,87 | f94 | f290 | f82 → f92 (10 f) | f290 → f312 (22 f; el golpe de 10,8 dB cae en el f331) |
| c05-mitad (MD03) | 0,50 – 6,24 | f614 | f786 | f604 → f612 (8 f, dentro de la disolvencia) | f786 → f795 (9 f: lo que cabe hasta el golpe de 9,8 dB del f797) |
| c09-cta (CT04) | 0,85 – 3,14 | f1076 | f1144 | f1064 → f1074 (10 f) | no sube: la canción cae sola y se apaga en línea recta hasta el f1156 |

## El texto (subtítulos editoriales; ver `subtitulos-066.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 94-191 | En Medellín se construyen / miles de apartamentos / cada año, | — |
| h02 | 192-298 | lotes de 5.000 metros, / con esta vista, / **muy pocos.** | muy pocos. |
| m01 | 613-669 | Hay una versión / de tu vida / donde ya no tienes | — |
| m02 | 671-745 | que salir a buscar / **paz** / los fines de semana | paz |
| m03 | 746-795 | porque ya vives / **dentro de ella.** | dentro de ella. |
| c01 | 1075-1154 | Si deseas más información, / **haz clic** / en el enlace. | haz clic |

POR CONFIRMAR AL OÍDO: «de tu vida» (f630) y «paz» (f702). Además, para el usuario: «5.000 metros» (la ficha dice 5.170 m²).

## La música

«Flying Into the Sun» desde los 178,033 s (`INICIO_MUSICA` = 5341/30): su golpe de 10,1 dB (178,095 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −1,6 dB, paseo −4,3 dB, bloque 5 −7,0 dB sobre el archivo: la canción es fuerte y crece), ≈ −26 LUFS bajo la voz (−15,2 dB bajo el hook, −17,4 dB bajo la mitad, −9,6 → 0 dB bajo el CTA). **La canción cae desde los 213,3 s (f1060), a la entrada del CTA**, y se apaga en el f1156, antes del golpe de 20,9 dB (216,877 s, f1167).
