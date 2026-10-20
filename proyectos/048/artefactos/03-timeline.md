# 03 · Timeline — proyecto 048

> Paso 3 de 3. Los planos en orden, con su espacio y su función. De aquí salen `metraje-048.ts`, `audio-048.ts` y `subtitulos-048.ts`. Anterior: [02-layout.md](02-layout.md).

1387 f a 30 fps (46,23 s). `en` y `dur` en frames de la composición; `desde`, en segundos (o frames) del clip normalizado (1296×2304, 30 fps); «voz» = primera palabra → última (segundo de la toma y frame de la composición). Las columnas «golpe» son los de `proyectos/048/musica/golpes-048.json` (`medir-pista.py --desde 222 --dur 45`), con *Einaudi Fly* entrando en el 222,2 s de la canción.

## Los planos

| # | Plano | Espacio | Función | Clip y tramo | `en` | `dur` | Entra | Golpe | Color (medido, luma a mitad de plano) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-hook` | TERRAZA COMÚN (la promesa) | situar a Isabella, prometer el tiempo | HK01 `desde` 0 · voz 1,00 → 6,60 s (f30 → f198) | 0 | 212 | corte (el frame 0) | nota de 8,1 dB en el f3 | base + contraste 1,06 · highlights −0,3 · whites −0,15 · sat 1,04 · luma 113-123 |
| 2 | `c02-cocina` | UNIDAD: Social Kitchen | llevar de ella a lo que hay en el edificio | RC11 2,40 → 5,63 s (X=656) | 212 | 97 | disolver (f200-212) | — (libre) | exp +0,4 · shadows +0,4 · contraste 1,04 · luma 89 |
| 3 | `c03-gimnasio` | UNIDAD: gimnasio | cuidarse sin salir | RC14 0,40 → 4,13 s (X=656) | 309 | 112 | corte | 6,5 dB | exp +0,3 · shadows +0,3 · contraste 1,06 · sat 1,06 · luma 84 |
| 4 | `c04-piscina` | UNIDAD: carril de nado | lo más abierto antes de volver a ella | RC16 0,90 → 5,23 s (X=656) | 421 | 130 | corte | 7,9 dB | exp +0,35 · highlights −0,3 · whites −0,12 · shadows +0,35 · contraste 1,04 · luma 91 |
| 5 | `c05-mitad` | TERRAZA COMÚN (el servicio) | listar lo que hay detrás del acompañamiento | MD03 `desde` 10 f · voz 0,68 → 6,65 s (f561 → f741) | 551 | 204 | corte | 8,7 dB | como el hook · luma 132 |
| 6 | `c06-alcoba` | APTO: alcoba principal | descanso, intimidad | RC05 0,60 → 3,87 s (X=656) | 755 | 98 | disolver (f743-755) | — (libre) | exp +0,05 · shadows +0,15 · highlights −0,35 · luma 132 |
| 7 | `c07-bano` | APTO: baño principal | cuidado, calma | RC09 2,00 → 5,97 s (X=656) | 853 | 119 | corte | 9,1 dB | exp −0,3 · shadows +0,1 · highlights −0,4 · whites −0,2 · sat 1,06 · luma ≈ 135 |
| 8 | `c08-balcon` | APTO: el balcón con el jacuzzi privado (CLÍMAX) | la recompensa: el jacuzzi y la ciudad | RC10 5,00 → 10,63 s (X=1100) | 972 | 169 | disolver (f960-972) | — (libre) | exp −0,12 · highlights −0,45 · whites −0,25 · shadows +0,3 · sat 1,06 · luma 128-155 |
| 9 | `c09-cta` | ESCALERAS con césped | cerrar con la idea del servicio | CT03 `desde` 9 f · voz 0,62 → 6,04 s (f1151 → f1313) | 1141 | 186 | corte | 11,9 dB | exp +0,12 · como el hook · luma 100 |
| 10 | `c10-cierre` | TARJETA oscura | la marca | `cierre-oscuro.png` (negro liso) | 1327 | 60 | corte | — | sin color (foto) |

Leída la columna «espacio» de arriba abajo: terraza (ella) → Social Kitchen → gimnasio → carril de nado → terraza (ella) → alcoba → baño → balcón → escaleras (ella): un paseo que baja por la unidad hasta la terraza de la mitad, entra al apartamento por las alcobas, sale al balcón y acaba en las escaleras. El clímax (RC10, 169 f) es el plano más largo del bloque 5 y cae en los f972-1141 (32,4-38,0 s).

## Subtítulos (9 bloques, 6 acentos)

| Bloque | Frase | Líneas (frame de entrada) | Acento |
|---|---|---|---|
| h01 | El tiempo es el activo más valioso de los seres humanos | f29 · f50 · f84 | **activo más valioso** |
| h02 | y te ayudamos a optimizarlo, | f113 · f125 | — |
| h03 | incluyendo un aseo semanal. | f154 · f177 | **aseo semanal.** *(POR CONFIRMAR AL OÍDO)* |
| m01 | Contamos con chef privado, tours, masajes | f560 · f584 · f615 | **chef privado,** |
| m02 | y transporte y las mejores experiencias | f642 · f673 · f699 | **experiencias** |
| m03 | de la ciudad de Medellín. | f714 | — |
| c01 | Cuando llegas a una ciudad que no es la tuya, | f1149 · f1163 · f1178 | — |
| c02 | el acompañamiento personalizado | f1202 · f1225 | **personalizado** |
| c03 | es una plusvalía que vale la pena conocer. | f1255 · f1283 · f1303 | **conocer.** |

## La música (*Einaudi Fly*, `a7e0695e`; entrada en el 222,2 s de la canción)

| Tramo | Frames | Nivel |
|---|---|---|
| Nota de apertura y bajada (bajo la voz del hook) | f0-f28 · baja con coseno desde el f10 | −15 LUFS sola (−3,8 dB) → −26 LUFS (−12,6 dB) |
| Hook | f30-f198 | −26 LUFS |
| Subida y paseo | f198-f551 | −15 LUFS (−3,4 dB) |
| Mitad (a corte en el golpe del f551; baja en 6 f) | f561-f741 | −26 LUFS (−11,5 dB) |
| El apartamento | f765-f1141 | −15 LUFS (−1,1 dB) |
| CTA (a corte en el golpe del f1141; baja en 6 f; el piano decae solo desde el f1170) | f1151-f1313 | −26 LUFS (−9,1 dB) al principio, cada vez más bajo |
| Apagado bajo la tarjeta | f1313-f1385 | → 0 |
