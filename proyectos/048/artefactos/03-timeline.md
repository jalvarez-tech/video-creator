# 03 · Timeline — proyecto 048

> Paso 3 de 3. Los planos en orden, con su espacio y su función. De aquí salen `metraje-048.ts`, `audio-048.ts` y `subtitulos-048.ts`. Anterior: [02-layout.md](02-layout.md).

1364 f a 30 fps (45,47 s). `en` y `dur` en frames de la composición; `desde`, en segundos (o frames) del clip normalizado (1296×2304, 30 fps); «voz» = primera palabra → última (segundo de la toma y frame de la composición). Las columnas «golpe» son los de `proyectos/048/musica/golpes-048.json` (`medir-pista.py --desde 164.5 --dur 48`), con *L' Amour Toujours on SAXOPHONE* entrando en el 164,967 s de la canción (rev. 1; la rev. 0 llevaba *Einaudi Fly*).

## Los planos

| # | Plano | Espacio | Función | Clip y tramo | `en` | `dur` | Entra | Golpe | Color (luma a mitad de plano) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-hook` | TERRAZA COMÚN (la promesa) | situar a Isabella, prometer el tiempo | HK01 `desde` 0 · voz 1,00 → 6,60 s (f30 → f198) | 0 | 212 | corte (el frame 0) | nota de 10,5 dB en el f3 | base + contraste 1,06 · highlights −0,3 · whites −0,15 · sat 1,04 · luma 113-123 |
| 2 | `c02-cocina` | UNIDAD: Social Kitchen | llevar de ella a lo que hay en el edificio | RC11 2,40 → 5,43 s | 212 | 91 | disolver (f200-212) | — (libre) | exp +0,4 · shadows +0,4 · contraste 1,04 · luma 93 |
| 3 | `c03-gimnasio` | UNIDAD: gimnasio | cuidarse sin salir | RC14 0,00 → 2,60 s | 303 | 78 | corte | 10,2 dB | exp +0,2 · shadows +0,3 · highlights −0,4 · contraste 1,06 · sat 1,06 · luma 103 |
| 4 | `c04-piscina` | UNIDAD: carril de nado | lo más abierto antes de volver a ella | RC16 0,90 → 5,43 s | 381 | 136 | corte | 8,2 dB | exp +0,35 · highlights −0,3 · whites −0,12 · shadows +0,35 · contraste 1,04 · luma 117 |
| 5 | `c05-mitad` | TERRAZA COMÚN (el servicio) | listar lo que hay detrás del acompañamiento | MD03 `desde` 10 f · voz 0,68 → 6,65 s (f527 → f707) | 517 | 204 | corte | 8,9 dB | como el hook · luma 132 |
| 6 | `c06-alcoba` | APTO: alcoba principal | descanso, intimidad | RC05 0,60 → 4,53 s | 721 | 118 | disolver (f709-721) | — (libre) | exp −0,05 · shadows +0,15 · highlights −0,4 · luma 141 |
| 7 | `c07-bano` | APTO: baño principal | cuidado, calma | RC09 2,00 → 6,03 s | 839 | 121 | corte | 10,4 dB | exp −0,1 · shadows +0,1 · highlights −0,4 · whites −0,2 · sat 1,06 · luma 136 |
| 8 | `c08-balcon` | APTO: el balcón con el jacuzzi privado (CLÍMAX) | la recompensa: el jacuzzi y la ciudad | RC10 5,33 → 10,60 s | 960 | 158 | disolver (f948-960) | — (libre) | exp −0,12 · highlights −0,45 · whites −0,25 · shadows +0,3 · sat 1,06 · luma 123-124 |
| 9 | `c09-cta` | ESCALERAS con césped | cerrar con la idea del servicio | CT03 `desde` 9 f · voz 0,62 → 6,04 s (f1128 → f1290) | 1118 | 186 | corte | 12,0 dB | exp +0,12 · como el hook · luma 100 |
| 10 | `c10-cierre` | TARJETA oscura | la marca | `cierre-oscuro.png` (negro liso) | 1304 | 60 | corte | — | sin color (foto) |

Leída la columna «espacio» de arriba abajo: terraza (ella) → Social Kitchen → gimnasio → carril de nado → terraza (ella) → alcoba → baño → balcón → escaleras (ella): un paseo que baja por la unidad hasta la terraza de la mitad, entra al apartamento por las alcobas, sale al balcón y acaba en las escaleras. El clímax (RC10, 158 f) es el plano más largo del bloque 5 y cae en los f960-1118 (32,0-37,3 s).

## Subtítulos (9 bloques, 6 acentos)

| Bloque | Frase | Líneas (frame de entrada) | Acento |
|---|---|---|---|
| h01 | El tiempo es el activo más valioso de los seres humanos | f29 · f50 · f84 | **activo más valioso** |
| h02 | y te ayudamos a optimizarlo, | f113 · f125 | — |
| h03 | incluyendo un aseo semanal. | f154 · f177 | **aseo semanal.** *(POR CONFIRMAR AL OÍDO)* |
| m01 | Contamos con chef privado, tours, masajes | f526 · f550 · f581 | **chef privado,** |
| m02 | y transporte y las mejores experiencias | f608 · f639 · f665 | **experiencias** |
| m03 | de la ciudad de Medellín. | f680 | — |
| c01 | Cuando llegas a una ciudad que no es la tuya, | f1126 · f1140 · f1155 | — |
| c02 | el acompañamiento personalizado | f1179 · f1202 | **personalizado** |
| c03 | es una plusvalía que vale la pena conocer. | f1232 · f1260 · f1280 | **conocer.** |

## La música (*L' Amour Toujours on SAXOPHONE*, `951c5de2`; entrada en el 164,967 s de la canción)

| Tramo | Frames | Nivel |
|---|---|---|
| Nota de apertura (10,5 dB en el f3) y bajada bajo la voz del hook | f0-f28 · baja con coseno desde el f10 | −15 LUFS sola (−4,3 dB) → −26 LUFS (−16,6 dB) |
| Hook | f30-f198 | −26 LUFS |
| Subida y paseo | f198-f517 | −15 LUFS (−5,5 dB) |
| Mitad (a corte en el golpe del f517; baja en 6 f) | f527-f707 | −26 LUFS (−16,4 dB) |
| El apartamento | f731-f1118 | −15 LUFS (−5,3 dB) |
| CTA (a corte en el golpe del f1118; baja en 6 f; la canción se apaga sola entre los f1233 y f1323) | f1128-f1290 | −26 LUFS (−16,5 dB) |
| Apagado bajo la tarjeta | f1290-f1362 | → 0 |
