# 03 · Timeline — proyecto 063 (rev. 1)

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-063.ts`, `audio-063.ts`, `subtitulos-063.ts` e `infografia-063.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado.

## Planos (la columna «espacio» leída de arriba abajo: el lote desde el aire → Isabella → el dron VUELVE con la lista de lo que sí tiene → Isabella nombra las tres cosas → el vuelo se abre hacia lo que rodea y acaba en su vista más abierta → el CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-apertura | 1 | el pasto y las cercas vivas en «V», desde arriba | situar / prometer | DR02 | 16,50 | 0 | 91 | corte | 144,698 · 12,3 (suena en f2,6) |
| 2 | c02-hook | 2 | el prado, con la cerca viva y un árbol detrás | emocionar (el error y su invitación) | HK01 | 2,500 (75 f) | 91 | 232 | disolver | 147,650 · 11,9 |
| 3 | c03-info | 3 | el cenital casi quieto + la infografía «Lo que sí tiene» | revelar (lo que el lote sí tiene) | DR02 | 0,00 | 323 | 232 | corte | 155,378 · 13,0 |
| 4 | c04-mitad | 4 | el prado, con la ladera de tierra detrás | emocionar (las tres cosas, con los rótulos) | MD01 | 3,200 (96 f) | 555 | 273 | disolver | 163,105 · 12,7 |
| 5 | c05-rodea | 5 | el pasto se levanta y enseña el cultivo vecino y la tierra | revelar (lo que rodea) | DR02 | 22,00 | 828 | 95 | disolver | 172,196 · 9,4 |
| 6 | c06-arbol | 5 | el árbol y la cerca viva con el horizonte | situar (el lote por dentro) | DR01 | 14,00 | 923 | 82 | corte | 175,378 · 11,4 |
| 7 | c07-vista | 5 | la «V» de la cerca viva, el horizonte y las lomas | emocionar (el clímax, el plano más largo del bloque) | DR01 | 20,20 | 1005 | 112 | corte | 178,107 · 14,9 |
| 8 | c08-cta | 6 | el prado, con la loma de tierra y un balde azul | invitar | CT02 | 3,633 (109 f) | 1117 | 170 | disolver | 181,856 · 11,7 |
| 9 | c09-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1287 | 60 | corte | — |

Total: **1347 f = 44,9 s**. Planos mudos (el sonido va en `audio-063.ts`), salvo las tomas de Isabella (`audio` + `voz`). Los que entran disolviendo se ven 12 f antes de su `en` (el plano anterior dura hasta él). La rejilla sale de `buscar-cortes-063.py` sobre los golpes medidos de la canción (`musica/rejilla-063.txt`): con la estructura nueva solo hay tres entradas con solución a ≥ 9 dB (142,880 · 144,698 · 145,830 s); se eligió la de 144,698 s: apertura de 3,0 s, hook con 27 f de aire tras su última palabra y la pieza 55 f más corta que con la de 142,880 s. Ventanas de clip sin segundos en común: DR02 16,5-19,53 · 0-7,73 · 21,6-25,17; DR01 14,0-16,73 · 20,2-23,93 (todo ≤ 24 s).

## La infografía (frames de la composición; golpes de `musica/golpes-063.json`; ver `infografia-063.ts`)

| Elemento | Frame | Golpe (s · dB) | Se lee entero hasta |
|---|---|---|---|
| velo (degradado negro 42-68 %) + título «Lo que sí tiene» + filete dorado | f323 | 155,378 · 13,0 | f533 (se va del f533 al f539) |
| ✔ INCLUIDO · Derecho de acueducto | f364 | 156,740 · 9,0 | f533 |
| ✔ PAPELES · Escrituras al 100 % | f418 | 158,561 · 10,7 | f533 |
| ✔ ÁREA · 3.244 m² | f459 | 159,924 · 13,7 | f533 (2,2 s entero) |
| rótulo UBICACIÓN (mitad) | f661 | (a la palabra, 6,755 s del clip) | f807 (se van del f807 al f813) |
| rótulo AGUA | f685 | (a la palabra, 7,565 s) | f807 |
| rótulo ESCRITURAS | f704 | (a la palabra, 8,21 s) | f807 |

Cada elemento entra COMPLETO con un fundido de 8 f y no se mueve (sin recuentos). La lista cae con el corte del hook al dron, **después de la última palabra del hook (f296)**; se va 4 f antes de que empiece la disolvencia a la mitad (f543) y no coincide con ningún subtítulo.

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: golpe de entrada → fin de la bajada | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK01) | 2,89 – 9,32 | f102,7 | f295,6 | f91 → f101 | f296 → f311 (el golpe del dron, f323, con la música arriba) |
| c04-mitad (MD01) | 3,61 – 11,34 | f567,3 | f799,2 | f555 → f565 | f799 → f821 (el primer plano del bloque 5 disuelve de f816 a f828) |
| c08-cta (CT02) | 4,03 – 8,82 | f1128,9 | f1272,6 | f1117 → f1127 | f1273 → f1287 (al lecho, ya caído a los 182,3 s) y apagada a cero en el f1320 |

## El texto (subtítulos editoriales; ver `subtitulos-063.ts`; sin cifras: solo la voz de Isabella)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 102-162 | El error no es (f102) / comprar un (f118) / lote barato, (f132) | — |
| h02 | 162-248 | es comprarlo sin (f162) / todas las (f193) / **acometidas legales.** (f206) | acometidas legales. |
| h03 | 248-311 | Ven, te enseño (f248) / cómo evitar esto. (f277) | — |
| m01 | 567-616 | Antes de enamorarte (f567) / de un lote, (f591) | — |
| m02 | 616-685 | empieza con (f616) / tres cosas: (f633) / ubicación, (f661) | — |
| m03 | 685-722 | agua y (f685) / escrituras. (f704) | — (los rótulos llevan el énfasis) |
| m04 | 722-813 | Y este lote empieza (f722) / con todas esas cosas (f749) / sobre la mesa. (f776) | — |
| c01 | 1129-1205 | ¿Quieres saber si (f1129) / este lote se ajusta (f1148) / a tu presupuesto? (f1167) | — |
| c02 | 1205-1279 | **Escríbeme** (f1205) / y te envío toda (f1231) / la información. (f1254) | Escríbeme |

## La música

«Oceans (Where Feet May Fail)» desde los 144,667 s (`INICIO_MUSICA` = 4340/30): su golpe de 12,3 dB (144,698 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (−1,8 dB la apertura, −3,2 dB bajo la infografía y −3,1 dB el bloque 5; el archivo mide −13,2 a −11,8 LUFS con picos de 0 dBFS), −26 LUFS bajo la voz (−13,5 · −15,1 · −8,7 dB sobre el archivo en el hook, la mitad y el CTA). La canción **cae sola** a un lecho suave a los 182,3 s (f1131, dentro de la toma del CTA): tras la última palabra del CTA (f1273) la música sube a −15 LUFS en 14 f (el lecho sube 4,2 dB) y se apaga con una recta hasta el f1320, antes del golpe de 23,6 dB que caería en el último fotograma (f1346). Partida en tramos consecutivos (ffmpeg no admite una expresión de volumen con más de ≈ 80 valores distintos).
