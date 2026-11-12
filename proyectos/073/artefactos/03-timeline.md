# 03 · Timeline — proyecto 073 · Suite Go Living (V54)

> Paso 3 de 3. Es lo que `metraje-073.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Chillin'» (INICIO_MUSICA = 259,167 s; el golpe de entrada, 259,21 s, suena en el f3). La puerta (`node proyectos/073/revisar-073.mjs`) sale con 0.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | la torre, desde el suelo | situar / prometer | DR09 | 0 | 93 | 2,00 | corte | e0 · 22,2 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la terraza del edificio | situar la pregunta | HK10 | 93 | 112 | 0 (clip entero) | corte | hook · 22,8 | 0,57-3,31 s → f110-f192 |
| 3 | c03-umbral | 3 | el pasillo de la entrada | llevar a otro espacio (el umbral) | RC03 | 205 | 110 | 0,60 | corte | paseo1 · 9,0 | — |
| 4 | c04-tv | 3 | el TV y el escritorio | revelar (lo práctico) | RC11 | 315 | 114 | 3,00 | corte | paseo2 · 21,5 | — |
| 5 | c05-habitacion | 3 | la habitación en abierto | revelar (lo que se recibe) | RC04 | 429 | 68 | 3,80 | corte | paseo3 · 10,7 | — |
| 6 | c06-mitad | 4 | la suite, junto al ventanal | valor (qué se compra) | MD01 | 497 | 173 | 14 f | disolver | mitad · 10,4 | 0,88-5,40 s → f509-f645 |
| 7 | c07-cama | 5 | la cama y el sofá | cómo se vive | RC06 | 670 | 88 | 4,50 | disolver | cama · 9,3 | — |
| 8 | c08-cabecero | 5 | el cabecero con los cuadros | cómo se vive (al detalle) | RC05 | 758 | 114 | 3,60 | corte | cabecero · 25,1 | — |
| 9 | c09-vista | 5 | de la cama al ventanal: la ciudad | emocionar (la vista, el clímax) | RC07 | 872 | 142 | 1,50 | corte | vista · 10,3 | — |
| 10 | c10-cta | 6 | el lounge, sentada | invitar | CT10 | 1014 | 155 | 6 f | corte | cta · 10,6 | 0,62-4,85 s → f1027-f1154 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 1169 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **fuera → terraza (ella) → pasillo → TV → habitación → suite (ella) → cama → cabecero → ventanal (la vista) → lounge (ella) → tarjeta**. El paseo no vuelve atrás y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música (por tramo; ninguna ganancia pasa de +6 dB) | Voz |
|---|---|---|
| Apertura (f0-93) | −15 LUFS sola (la canción mide −12,5: −2,5 dB; pico a −2,1 dBFS) | — |
| Hook (f93-205) | baja a −26 LUFS en 10 f desde el golpe (f93) y sube tras la última palabra (f192 + 10 f de curva) | −15 LUFS |
| Paseo (f205-497) | −16 LUFS sola (+1,4 dB; pico a −1,5 dBFS) | — |
| Mitad (f497-670) | baja en 10 f desde el golpe (f497); primera palabra a los 12,4 f; sube en 20 f tras la última (f645) | −15 LUFS |
| Bloque 5 (f670-1014) | −16 LUFS sola (−0,4 dB; pico a −1,6 dBFS) | — |
| CTA (f1014-1229) | baja en 10 f desde el golpe (f1014), −26 LUFS bajo la voz; tras la última palabra (f1154) se apaga con curva de coseno hasta cero en el f1227; la canción cae sola desde los 294,75 s (f1068) | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +18,2 / +19,8 / +18,5 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
