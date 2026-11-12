# 03 · Timeline — proyecto 070 · Suite Go Living (V51)

> Paso 3 de 3. Es lo que `metraje-070.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Somewhere inside of me» (INICIO_MUSICA = 298,333 s; el golpe de entrada, 298,394 s, suena en el f3). La puerta (`node proyectos/070/revisar-070.mjs`) sale con 0.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio, desde el suelo | situar / prometer | DR02 | 0 | 88 | 0,30 | corte | e0 · 13,6 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la suite, junto al ventanal | situar la preocupación | HK01 | 88 | 129 | 23 f | disolver | hook · 12,3 | 1,17-4,10 s → f100-f188 |
| 3 | c03-puerta | 3 | la puerta | llevar a otro espacio (el umbral; la mano) | RC12 | 217 | 107 | 1,00 | corte | paseo1 · 12,6 | — |
| 4 | c04-cocineta | 3 | la cocineta | revelar (lo práctico) | RC02 | 324 | 85 | 0,60 | corte | paseo2 · 16,8 | — |
| 5 | c05-bano | 3 | el pasillo y el baño | revelar (lo práctico, al detalle) | RC01 | 409 | 106 | 0,80 | corte | paseo3 · 15,4 | — |
| 6 | c06-mitad | 4 | la suite, junto al ventanal | valor (la condición) | MD02 | 515 | 166 | 0 (clip entero) | corte | mitad · 11,4 | 0,65-4,78 s → f534,5-f658 |
| 7 | c07-cama | 5 | la cama y el mueble de TV | cómo se vive | RC06 | 681 | 89 | 1,20 | disolver | cama · 16,7 | — |
| 8 | c08-sofa | 5 | el sofá y el cabecero | cómo se vive (al detalle) | RC04 | 770 | 89 | 0,60 | corte | sofa · 10,1 | — |
| 9 | c09-vista | 5 | de la cama al ventanal: la ciudad | emocionar (la vista, el clímax) | RC07 | 859 | 107 | 2,50 | corte | vista · 13,4 | — |
| 10 | c10-cta | 6 | el sofá, sentada | invitar | CT01 | 966 | 138 | 3 f | corte | cta · 11,1 | 0,50-4,10 s → f977-f1085 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 1104 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **fuera → suite (ella) → puerta → cocineta → baño → ella → cama → sofá → ventanal (la vista) → ella → tarjeta**. El paseo no vuelve atrás y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-88) | −15 LUFS sola (la canción mide −10,1: se baja 4,9 dB) | — |
| Hook (f88-217) | baja a −26 LUFS en 10 f desde el golpe (f88) y sube tras la última palabra (f188 + 6 f de espera + 15 f de curva) | −15 LUFS |
| Paseo (f217-515) | −15 sola | — |
| Mitad (f515-681) | baja en 10 f desde el golpe (f515); la primera palabra suena a los 19,5 f; sube en 20 f tras la última (f658) | −15 LUFS |
| Bloque 5 (f681-966) | −15 sola | — |
| CTA (f966-1164) | baja en 10 f desde el golpe (f966), −26 LUFS bajo la voz; tras la última palabra (f1085) se apaga con curva de coseno hasta cero en el f1162; la canción cae sola desde los 332,5 s (f999) | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +17,8 / +19,3 / +18,6 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
