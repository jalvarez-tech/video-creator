# 03 · Timeline — proyecto 034

> Paso 3 de 3. Una fila por plano, con los números del plan (`metraje-034.ts`). Anterior: [02-layout.md](02-layout.md). Frames de la composición a 30 fps; `desde` en segundos de la fuente.

El paseo, leído de arriba abajo: el lote con las palmas y la cabaña → ella (loma con pinos y palmas) → los árboles y la ladera hasta la cabaña → los eucaliptos → la palma y las terrazas → ella (loma con el valle) → el lote entero con su horizonte → la cabaña entre el pino y las palmas → la vista a pie → ella (explanada con las montañas) → la tarjeta. Cada plano contesta «¿por qué se ve ahora?» en su `reason`.

| plano | bloque | espacio | función | clip | `en` | `dur` | `desde` (s) | movimiento (disp.) | entra | voz |
|---|---|---|---|---|---|---|---|---|---|---|
| c01-lote | 1 | LOTE (palmas, cabaña, terrazas) | la promesa | DR98 | 0 | 100 | 7,100 | 3,5 (0,100 · pend. +0,27: excepción declarada) | corte | — |
| c02-hook | 2 | LOMA-PINOS-PALMAS | el filtro | HK03 (hk03-voz.wav) | 100 | 168 | 0,367 | — | corte | «Si quieres una propiedad campestre donde la naturaleza sea parte de tu casa, vente, te muestro.» 0,625-5,44 s |
| c03-arboles | 3 | ÁRBOLES → LADERA → CABAÑA | te muestro | DR99 | 268 | 95 | 8,100 | 7,7 (0,068) | corte | — |
| c04-eucaliptos | 3 | EUCALIPTOS | el borde | DR105 (9:16 en 0,5) | 363 | 56 | 17,300 | 4,6 (0,050) | corte | — |
| c05-terrazas | 3 | PALMA Y TERRAZAS | la medida | DR101 (9:16 en 0,35) | 419 | 78 | 13,900 | 3,0 (0,061) | corte | — |
| c06-mitad | 4 | LOMA-VALLE | la búsqueda acaba | MD03 (md03-voz.wav) | 497 | 143 | 0,233 | — | corte | «Si llevas meses buscando tu lugar para tu casa campestre, acabas de encontrarlo.» 0,505-4,58 s |
| c07-lote | 5 | EL LOTE ENTERO | tu lugar | DR96 | 640 | 59 | 18,600 | 2,9 (0,062) | corte | — |
| c08-cabana | 5 | CABAÑA | cómo se vive | DR99 | 699 | 69 | 12,200 | 5,7 (0,032) | corte | — |
| c09-vista | 5 | VISTA (a pie) | el clímax | RC01 | 768 | 73 | 6,167 | 7,2 (0,020) | corte | — |
| c10-cta | 6 | EXPLANADA-MONTAÑAS | la invitación | CT03 (ct03-voz.wav), recortado | 841 | 69 | 1,667 | — | corte | «y agendemos una visita.» 1,945-3,12 s |
| c11-cierre | 6 | TARJETA | el cierre | cierre-oscuro.png | 910 | 60 | — | — | corte | — |

## Los golpes de la música (cada corte seco, sobre un golpe medido)

«Chillin' (Chillstep Mix)» desde 264,933 s (`INICIO_MUSICA` = 7948/30). Rejilla de `herramientas/buscar-cortes-lp.py` (`musica/rejilla-chillin.txt`, la búsqueda de todas las libres en `musica/buscar-cortes-planos2.txt`).

| golpe | canción (s) | dB | frame | plano que entra |
|---|---|---|---|---|
| apertura | 264,978 | 15,8 | 3 | c01-lote |
| hook | 268,212 | 9,8 | 100 | c02-hook (a corte; 1.ª sílaba +7,8 f) |
| árboles | 273,819 | 8,7 | 268 | c03-arboles |
| eucaliptos | 276,990 | 20,8 | 363 | c04-eucaliptos |
| terrazas | 278,833 | 12,6 | 419 | c05-terrazas |
| mitad | 281,451 | 9,3 | 497 | c06-mitad (a corte; 1.ª sílaba +8,2 f) |
| lote | 286,213 | 15,9 | 640 | c07-lote |
| cabaña | 288,183 | 10,3 | 699 | c08-cabana |
| vista | 290,464 | 12,3 | 768 | c09-vista |
| CTA | 292,919 | 10,6 | 841 | c10-cta (a corte; 1.ª sílaba +8,4 f) |
| caída | 294,500 | −13,3 → −22,3 → −53,5 LUFS | 887 | justo tras «…una visita» (f885) |

## El texto (frames absolutos)

| bloque | f | líneas | acento |
|---|---|---|---|
| h01 | 107-154 | «Si quieres una» · «propiedad campestre» | |
| h02 | 154-190 | «donde la» · «naturaleza» | **naturaleza** |
| h03 | 190-230 | «sea parte» · «de tu casa,» | |
| h04 | 230-255 | «vente, te muestro.» | |
| m01 | 504-552 | «Si llevas meses» · «buscando tu lugar» | |
| m02 | 552-595 | «para tu casa campestre,» | |
| m03 | 595-630 | «acabas de encontrarlo.» | **acabas de encontrarlo.** |
| c01 | 848-888 | «Y agendemos» · «una visita.» | **Y agendemos** |

Cada línea entra 0-2 f antes del arranque MEDIDO de su palabra (`onsets-voz.py` + `palabras-desde.py` sobre la voz sola; ver la cabecera de `subtitulos-034.ts`).

## La mezcla

| tramo | frames | canción (LUFS en la fuente) | música en la pieza |
|---|---|---|---|
| el lote | 0-100 | −17,0 (pico +0,3 dBFS) | −17,8 (−0,8 dB: el pico no se sube por encima de −0,5 dBFS) |
| hook (voz f108-252) | 100-268 | −15,9 | −26 bajo la voz (−10,1 dB) · sube en 14 f tras «muestro» |
| paseo | 268-497 | −17,5 | −15 (+2,5 dB) |
| mitad (voz f505-627) | 497-640 | −17,3 | −26 bajo la voz (−8,7 dB) · sube en 11 f |
| bloque 5 | 640-841 | −14,6 | −15 (−0,4 dB) |
| CTA (voz f849-885) | 841-910 | −14,6 (cae en el f887) | −26 bajo la voz (−11,4 dB) · la cola sube en 14 f y se apaga en recta hasta el f968 |
