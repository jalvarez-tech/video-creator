# 03 · Timeline — proyecto 067

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-067.ts`, `audio-067.ts` y `subtitulos-067.ts` (y no al revés). 30 fps; `en` y `dur` en frames de la composición; `desde` en segundos del clip normalizado (`dr04.mp4` empieza en el segundo 60 del original).

## Planos (la columna «espacio» leída de arriba abajo es un paseo sin volver atrás, y la vista, la última antes del CTA)

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entra | Golpe (s de la canción · dB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-aereo | 1 | el camino y los cipreses, desde el aire | situar / prometer | DR06 | 3,00 | 0 | 96 | corte | 148,470 · 9,9 (suena en f3) |
| 2 | c02-hook | 2 | prado junto a los pinos (baja hacia la cámara) | emocionar (la selección) | HK02 | 0,400 (12 f) | 96 | 137 | disolver (libre) | — |
| 3 | c03-paneo | 3 | el prado bajo las nubes, hasta el primer ciprés | revelar (el terreno a ras de suelo) | RC02 | 0,60 | 233 | 81 | corte | 156,144 · 9,2 |
| 4 | c04-cielo | 3 | el cielo y la cordillera sobre la loma | emocionar (el silencio) | RC03 | 0,30 | 314 | 82 | corte | 158,841 · 9,1 |
| 5 | c05-lote | 3 | el lote visto desde arriba | situar (el tamaño) | DR04 | 3,00 (63,0 del original) | 396 | 66 | corte | 161,564 · 9,6 |
| 6 | c06-mitad | 4 | loma de pasto seco | emocionar (el comprador serio) | MD01 | 0,400 (12 f) | 462 | 212 | disolver (libre) | — |
| 7 | c07-curva | 5 | los cipreses con la ciudad detrás | revelar (la distancia justa) | DR06 | 41,50 | 674 | 82 | corte | 170,839 · 9,7 |
| 8 | c08-pinos | 5 | el vuelo sobre los pinos | mover (el verde que rodea) | DR06 | 51,00 | 756 | 81 | corte | 173,573 · 8,2 |
| 9 | c09-vista | 5 | el valle y Medellín al horizonte | emocionar (el clímax, el plano más largo) | DR03 | 5,30 | 837 | 113 | corte | 176,276 · 11,8 |
| 10 | c10-cta | 6 | loma verde con las nubes | invitar | CT05 | 0,400 (12 f) | 950 | 138 | disolver (libre) | — (la canción empieza a caer: 180,09 s) |
| 11 | c11-cierre | 6 | — | tarjeta oscura (logo y web) | foto | — | 1088 | 60 | corte | — (la música ya está apagada: el golpe de 10,0 dB suena en f1083) |

Total: **1148 f = 38,3 s**. Planos mudos (el sonido va en `audio-067.ts`), salvo las tomas de Isabella (`audio` + `voz`).

## La voz (frames de la composición; s0/s1 medidos por energía, 20 ms, banda de voz)

| Toma | Su voz en el clip (s) | Primera palabra | Última palabra | Música: fin de la bajada (curva) | Música: sube |
|---|---|---|---|---|---|
| c02-hook (HK02) | 0,50 – 4,46 | f99 | f218 | f87 → f97 (10 f) | f218 → f231 (13 f; el golpe de 9,2 dB cae en el f233) |
| c06-mitad (MD01) | 0,51 – 6,90 | f465 | f657 | f453 → f463 (10 f) | f657 → f672 (15 f; golpe del f674) |
| c10-cta (CT05) | 0,47 – 4,66 | f952 | f1078 | f940 → f950 (10 f) | no sube: la canción cae sola (desde el f950) y se apaga en línea recta del f1056 al f1081 |

## El texto (subtítulos editoriales; ver `subtitulos-067.ts`)

| Bloque | Frames | Texto | Acento |
|---|---|---|---|
| h01 | 99-160 | Si estás buscando / **lo más barato** / de la zona, | lo más barato |
| h02 | 161-226 | con todo respeto, / este no es / **para ti.** | para ti. |
| m01 | 465-566 | Aprendí a reconocer al / **comprador serio** / desde la primera fase. | comprador serio |
| m02 | 576-663 | No habla de metros, / habla de lo que quiere / **dejar de sentir.** | dejar de sentir. |
| z01 | 952-1026 | 5.000 metros, / **infinitas posibilidades.** | infinitas posibilidades. |
| z02 | 1026-1087 | haz clic / en el enlace / **y hablemos.** | y hablemos. |

POR CONFIRMAR AL OÍDO: «fase» (f525; ¿«frase»?) y «comprador» (f497).

## La música

«Return to Oasis» (Aleksey Chistilin) desde los 148,433 s (`INICIO_MUSICA` = 4453/30): su golpe de 9,9 dB (148,470 s) abre la pieza en el f3. Sola a −15 LUFS por tramos (apertura −6,3 dB, paseo −6,4 dB, bloque 5 −7,4 dB sobre el archivo), ≈ −26 LUFS bajo la voz (−17,3 dB bajo el hook, −17,4 dB bajo la mitad, −18,8 → 0 dB bajo el CTA). **La canción cae desde los 180,09 s (f950), en el primer fotograma de la toma del CTA**, y se apaga en el f1081, antes del golpe de 10,0 dB (184,492 s, f1083).
