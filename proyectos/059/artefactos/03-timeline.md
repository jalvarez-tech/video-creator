# 03 · Timeline — proyecto 059

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-059.ts`, `audio-059.ts` y `subtitulos-059.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio desde arriba | situar / prometer | DR09 | 3,20 | 0 | 86 | corte | 147,421 · 33,6 (suena en f3) |
| 2 | c02-hook | 2 | alcoba principal | emocionar (el giro) | HK04 | 0,400 (12 f) | 86 | 154 | disolver | 150,163 · 31,7 |
| 3 | c03-sala | 3 | sala con el ventanal | situar (dónde se vive, con luz) | RC09 | 0,30 | 240 | 88 | corte | 155,303 · 33,5 |
| 4 | c04-comedor | 3 | comedor y cocina | cómo se vive (el orden) | RC10 | 1,60 | 328 | 87 | corte | 158,235 · 16,8 |
| 5 | c05-balcon | 3 | balcón abierto | emocionar (el respiro) | RC13 | 0,00 | 415 | 77 | corte | 161,135 · 22,3 |
| 6 | c06-mitad | 4 | rincón del pasillo | emocionar (la zona de trabajo, dicha) | MD09 | 0,567 (17 f) | 492 | 155 | disolver | 163,715 · 16,0 |
| 7 | c07-trabajo | 5 | alcoba 2 (la puerta y el escritorio) | revelar (la zona de trabajo) | RC24 | 1,20 | 647 | 82 | corte | 168,876 · 17,7 |
| 8 | c08-ventana | 5 | alcoba 2 (la ventana y el portátil) | cómo se vive (trabajar con luz) | RC28 | 0,00 | 729 | 92 | corte | 171,603 · 23,3 |
| 9 | c09-vista | 5 | La Ceja desde arriba | emocionar (el clímax, el plano más largo) | DR10 | 5,40 | 821 | 103 | corte | 174,686 · 17,6 |
| 10 | c10-cta | 6 | pasillo | invitar | CT03 | 0,100 (3 f) | 924 | 131 | corte | 178,118 · 18,9 |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1055 | 60 | corte | — |

Total: **1115 f = 37,2 s**. Planos mudos (el sonido va en `audio-059.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: golpe de entrada → fin de la bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK04) | 0,78 – 4,55 | f97 | f211 | f86 → f96 | f211 → f226 (golpe del f240) |
| c06-mitad (MD09) | 0,98 – 4,98 | f504 | f624 | f492 → f502 | f624 → f645 (golpe del f647) |
| c10-cta (CT03) | 0,46 – 4,22 | f935 | f1048 | f924 → f934 | f1048 → f1113 **baja** hasta cero (la canción es plana: se apaga bajo la tarjeta) |

## El texto (subtítulos editoriales; ver `subtitulos-059.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 97-168 | Sabes que el estrés (f97) / a veces no viene (f118) / solo del trabajo, (f138) | — |
| h02 | 170-214 | a veces viene (f170) / **de donde vives.** (f185) | de donde vives. |
| m01 | 503-566 | **Zona de trabajo** / separada, / porque trabajar | Zona de trabajo |
| m02 | 568-632 | desde la cama / ya no es / una opción. | — |
| c01 | 934-996 | Si estás buscando (f934) / paz y comodidad, (f958) | — |
| c02 | 999-1054 | **Escríbeme** (f999) / y te doy todos (f1014) / los detalles. (f1030) | Escríbeme |

## La música

«Light Fills the Room» desde los 147,367 s (`INICIO_MUSICA` = 4421/30): su golpe de 33,6 dB (147,421 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −3,8 dB, paseo −2,5 dB, bloque 5 −3,4 dB sobre el archivo), −26 LUFS bajo la voz. La canción es plana y **no cae sola**: tras la última palabra del CTA (f1048) se apaga con curva de coseno hasta el f1113, 2 f antes del final.
