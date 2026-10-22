# 03 · Timeline — proyecto 061

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-061.ts`, `audio-061.ts` y `subtitulos-061.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-pergola | 1 | la terraza bajo la pérgola | situar / prometer | ZC22 | 3,40 | 0 | 73 | corte | 15,207 · 21,1 (suena en f3) |
| 2 | c02-hook | 2 | pasillo del estudio | emocionar (la promesa) | HK04 | 0,200 (6 f) | 73 | 154 | corte | 17,551 · 28,6 |
| 3 | c03-cocina | 3 | la cocina equipada | cómo se vive (listo para usar) | RC01 | 0,00 | 227 | 83 | corte | 22,674 · 20,4 |
| 4 | c04-estudio | 3 | el estudio que se abre | situar (todo cabe en un plano) | RC17 | 3,00 | 310 | 71 | corte | 25,461 · 14,2 |
| 5 | c05-cama | 3 | la cama y la tele | emocionar (el descanso del huésped) | RC07 | 3,00 | 381 | 92 | corte | 27,799 · 24,2 |
| 6 | c06-mitad | 4 | junto al escritorio y la cama | emocionar (lo raro, dicho) | MD04 | 0,467 (14 f) | 473 | 175 | disolver | 30,873 · 19,2 |
| 7 | c07-sofa | 5 | el sofá y la estantería | cómo se vive (para quien llega con maleta) | RC10 | 0,00 | 648 | 84 | corte | 36,722 · 31,5 |
| 8 | c08-coworking | 5 | el coworking del edificio | valor (lo que suma el edificio) | ZC05 | 0,00 | 732 | 88 | corte | 39,510 · 15,8 |
| 9 | c09-vista | 5 | el jacuzzi con la ciudad | emocionar (el clímax, el plano más largo) | ZC18 | 7,20 | 820 | 109 | corte | 42,438 · 13,2 |
| 10 | c10-cta | 6 | el fondo del estudio | invitar | CT01 | 0,200 (6 f) | 929 | 149 | corte | 46,092 · 19,0 |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1078 | 60 | corte | — |

Total: **1138 f = 37,9 s**. Planos mudos (el sonido va en `audio-061.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: golpe de entrada → fin de la bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK04) | 0,58 – 4,86 | f84,4 | f212,8 | f73 → f83 | f212,8 → f225 (golpe del f227) |
| c06-mitad (MD04) | 0,88 – 5,76 | f485,4 | f631,8 | f473 → f483 | f631,8 → f646 (golpe del f648) |
| c10-cta (CT01) | 0,57 – 4,90 | f940,1 | f1070 | f929 → f939 | f1070 → f1136 **baja** hasta cero (la canción no cae sola: se apaga bajo la tarjeta) |

## El texto (subtítulos editoriales; ver `subtitulos-061.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 84-151 | Te presento este estudio (f84) / en Laureles, (f133) | — |
| h02 | 153-219 | habilitado para (f153) / **rentas cortas** (f180) / en Medellín. (f195) | rentas cortas |
| m01 | 485-565 | En Medellín hay muchos (f485) / proyectos inmobiliarios, (f523) | — |
| m02 | 567-638 | **pero pocos permiten** (f567) / rentas cortas. (f602) | pero pocos permiten |
| c01 | 940-1021 | Haz clic en el botón (f940) / y agendemos (f967) / **una visita.** (f994) | una visita. |
| c02 | 1023-1075 | Puede ser virtual o presencial. (f1023) | — |

Cada línea entra 0,1-1,3 f antes de su palabra, medida sobre la voz SOLA de la toma (`proyectos/061/medidas/lineas-vs-onsets.txt`); el DTW de whisper iba de 2 a 8 f pronto o tarde.

## La música

«La Isla Bonita (Saxophone 80 Mix)» desde los 15,167 s (`INICIO_MUSICA` = 455/30): su golpe de 21,1 dB (15,207 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −1,4 dB, paseo −3,5 dB, bloque 5 −3,8 dB sobre el archivo), −26 LUFS bajo la voz. La canción **no cae sola en esta sección** (su caída natural empieza en 217,6 s): tras la última palabra del CTA (f1070) se apaga con curva de coseno hasta el f1136, 2 f antes del final.
