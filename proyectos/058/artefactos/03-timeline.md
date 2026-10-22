# 03 · Timeline — proyecto 058

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-058.ts`, `audio-058.ts` y `subtitulos-058.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio desde arriba | situar / prometer | DR04 | 2,10 | 0 | 84 | corte | 158,112 · 18,2 (suena en f3) |
| 2 | c02-hook | 2 | pasillo | emocionar (la promesa) | HK02 | 0 | 84 | 131 | corte | — (la música ya está abajo) |
| 3 | c03-cocina | 3 | cocina corredor | valor (todo en su sitio) | RC14 | 0,30 | 215 | 90 | corte | 165,163 · 15,8 |
| 4 | c04-barra | 3 | barra con el mesón | valor (equipada y compacta) | RC01 | 0,20 | 305 | 79 | corte | 168,183 · 17,1 |
| 5 | c05-comedor | 3 | de la cocina a la sala-comedor | revelar (un solo ambiente) | RC07 | 2,60 | 384 | 109 | corte | 170,825 · 10,6 |
| 6 | c06-mitad | 4 | sala (ventanal) | emocionar (la cifra, dicha) | MD07 | 0,400 (12 f) | 493 | 149 | disolver | — (la música ya está abajo) |
| 7 | c07-bano1 | 5 | baño del pasillo | cómo se vive (lo privado) | RC19 | 0,80 | 642 | 86 | corte | 179,399 · 12,0 |
| 8 | c08-vestier | 5 | vestier y baño principal | llevar a otro espacio (el clóset y el 2.º baño) | RC23 | 0,00 | 728 | 90 | corte | 182,279 · 14,9 |
| 9 | c09-vista | 5 | La Ceja desde arriba | emocionar (el clímax, el plano más largo) | DR05 | 3,50 | 818 | 116 | corte | 185,293 · 12,9 |
| 10 | c10-cta | 6 | sala (sofá junto al balcón) | invitar | CT01 | 0,567 (17 f) | 934 | 125 | disolver | — (la música ya está abajo) |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1059 | 60 | corte | — |

Total: **1119 f = 37,3 s**. Planos mudos (el sonido va en `audio-058.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: último golpe entero → bajada (curva de coseno) | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK02) | 0,10 – 3,72 | f87 | f196 | f66 → f69-f84 (15 f) | f196 → f211 (golpe del f215) |
| c06-mitad (MD07) | 0,42 – 4,86 | f494 | f627 | f475 → f478-f493 (15 f) | f627 → f640 (golpe del f642) |
| c10-cta (CT01) | 0,60 – 4,24 | f935 | f1044 | f919 → f922-f934 (12 f) | f1044 → f1058 y se apaga en línea recta hasta el f1086 |

## El texto (subtítulos editoriales; ver `subtitulos-058.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 87-157 | Este es un apartamento / pensado para / **descansar,** | descansar, |
| h02 | 157-206 | no para sobrevivir / al caos. | — |
| m01 | 494-569 | Lo que cabe en / **60 metros cuadrados** / en Palmazera | 60 metros cuadrados |
| m02 | 569-633 | te va a cambiar / la idea del / **apartamento pequeño.** | apartamento pequeño. |
| c01 | 935-970 | **Escríbeme** / y te cuento | Escríbeme |
| c02 | 970-1020 | por qué este lugar / se siente / **diferente** | diferente |
| c03 | 1020-1052 | desde que entras. | — |

## La música

«Ivory Skyline Reverie» desde los 158,067 s (`INICIO_MUSICA` = 4742/30): su golpe de 18,2 dB (158,112 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −3,6 dB, paseo −4,2 dB, bloque 5 −2,6 dB sobre el archivo), −26 LUFS bajo la voz. La canción no cae dentro de la pieza (su caída natural es a los 194,5 s, f1093): la envolvente la apaga bajo la tarjeta, en el f1086.
