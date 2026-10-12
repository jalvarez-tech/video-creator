# 03 · Timeline — proyecto 031

> Paso 3 de 3. Una fila por plano, con los números del plan (`metraje-031.ts`). Anterior: [02-layout.md](02-layout.md). Frames de la composición a 30 fps; `desde` en segundos de la fuente.

El paseo, leído de arriba abajo: el lote entero → ella (talud) → la explanada junto a los eucaliptos → la cerca y el eucalipto → los taludes → ella (loma) → la loma con las montañas → la cabaña → la vista → ella (cabaña) → la tarjeta. Cada plano contesta «¿por qué se ve ahora?» en su `reason`.

| plano | bloque | espacio | función | clip | `en` | `dur` | `desde` (s) | movimiento (disp.) | entra | voz |
|---|---|---|---|---|---|---|---|---|---|---|
| c01-lote | 1 | LOTE-CABAÑA | la promesa | DR107 (9:16 en 0,38: `dr107a`) · **rev. 2** | 0 | 97 | 29,800 | 2,9 (0,031) | corte | — |
| c02-hook | 2 | TALUD-TERRAZAS | el filtro | HK06 (hk06-voz.wav) | 97 | 177 | 0,367 | — | corte | «Si quieres construir rodeado de la naturaleza, pero con agua y energía disponibles, vente, te muestro.» 0,65-5,45 s |
| c03-explanada | 3 | EXPLANADA-EUCALIPTOS | donde se construye | DR103 (9:16 en 0,40) · **rev. 1** | 274 | 71 | 17,900 | 6,8 (0,041) | corte | — |
| c04-cerca | 3 | CERCA | rodeado de naturaleza | RC05 | 345 | 72 | 1,600 | 6,1 (0,037) | corte | — |
| c05-taludes | 3 | TALUDES | la medida | DR101 (9:16 en 0,35) | 417 | 85 | 5,300 | 1,8 (0,062) | corte | — |
| c06-mitad | 4 | LOMA-VALLE | el deseo | MD04 (md04-voz.wav) | 502 | 129 | 0,667 | — | corte | «Este es el tipo de lote que compras para construir tu casa soñada.» 0,93-4,13 s |
| c07-loma | 5 | LOMA | cómo se vive | RC02 | 631 | 71 | 1,000 | 3,8 (0,016) | corte | — |
| c08-cabana | 5 | CABAÑA | lo que ya hay | DR106 (9:16 en 0,75) | 702 | 72 | 18,100 | 5,5 (0,029) | corte | — |
| c09-vista | 5 | VISTA | el clímax | DR107 (9:16 en 0,70) | 774 | 107 | 34,000 | 8,0 (0,067) | corte | — |
| c10-cta | 6 | CABAÑA | la invitación | CT04 (ct04-voz.wav) | 881 | 127 | 0,200 | — | corte | «Si tienes un proyecto en mente, escríbeme y hablamos más sobre este lote.» 0,47-3,98 s |
| c11-cierre | 6 | TARJETA | el cierre | cierre-oscuro.png | 1008 | 60 | — | — | corte | — |

## Los golpes de la música (cada corte seco, sobre un golpe medido)

«Somewhere inside of me» desde 301,167 s (`INICIO_MUSICA` = 9035/30). Rejilla de `herramientas/buscar-cortes-lp.py` (835 soluciones; `musica/rejilla-somewhere-835.txt`), la de mayor golpe más débil.

| golpe | canción (s) | dB | frame | plano que entra |
|---|---|---|---|---|
| apertura | 301,208 | 12,3 | 3 | c01-lote |
| hook | 304,330 | 14,8 | 97 | c02-hook (a corte; 1.ª sílaba +8,5 f) |
| explanada | 310,262 | 15,0 | 274 | c03-explanada |
| cerca | 312,617 | 11,2 | 345 | c04-cerca |
| taludes | 315,022 | 13,6 | 417 | c05-taludes |
| mitad | 317,843 | 11,2 | 502 | c06-mitad (a corte; 1.ª sílaba +7,9 f) |
| loma | 322,142 | 17,8 | 631 | c07-loma |
| cabaña | 324,527 | 12,7 | 702 | c08-cabana |
| vista | 326,899 | 13,4 | 774 | c09-vista |
| CTA | 330,465 | 11,1 | 881 | c10-cta (a corte; 1.ª sílaba +8,1 f) |
| caída | 333,250 | −9,4 → −19,8 → −46,4 LUFS | 964 | dentro de «…hablamos más sobre este lote» |

## El texto (frames absolutos)

| bloque | f | líneas | acento |
|---|---|---|---|
| h01 | 105-166 | «Si quieres construir» · «rodeado de la naturaleza,» | |
| h02 | 166-228 | «pero con» · «agua y energía» · «disponibles,» | **agua y energía** |
| h03 | 228-253 | «vente, te muestro.» | |
| m01 | 510-562 | «Este es el tipo» · «de lote que compras» | |
| m02 | 562-609 | «para construir» · «tu casa soñada.» | **tu casa soñada.** |
| c01 | 888-935 | «Si tienes un proyecto» · «en mente,» | |
| c02 | 935-998 | «escríbeme» · «y hablamos más» · «sobre este lote.» | **escríbeme** |

Cada línea entra 0-2 f antes del arranque MEDIDO de su palabra (`onsets-voz.py` + `palabras-desde.py` sobre la voz sola; ver la cabecera de `subtitulos-031.ts`).

## La mezcla

| tramo | frames | canción (LUFS en la fuente) | música en la pieza |
|---|---|---|---|
| el lote | 0-97 | −11,2 | −15 (−3,8 dB) |
| hook (voz f106-250) | 97-274 | −10,5 | −26 bajo la voz (−15,5 dB) · sube en 22 f tras «muestro» |
| paseo | 274-502 | −10,0 | −15 (−5,0 dB) |
| mitad (voz f510-606) | 502-631 | −9,7 | −26 bajo la voz (−16,3 dB) · sube en 23 f |
| bloque 5 | 631-881 | −9,4 | −15 (−5,6 dB) |
| CTA (voz f889-994) | 881-1008 | −11,0 (cayendo) | −26 bajo la voz (−15,0 dB) · la cola sube en 14 f y se apaga en recta hasta el f1066 |
