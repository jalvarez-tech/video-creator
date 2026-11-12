# 03 · Timeline — proyecto 075 · Suite Go Living (V56)

> Paso 3 de 3. Es lo que `metraje-075.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Street Level Sessions on the Green» (INICIO_MUSICA = 167,500 s; el golpe de entrada, 167,542 s, suena en el f3). La puerta (`node proyectos/075/revisar-075.mjs`) sale con 0. **Todas las entradas son cortes secos.**

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-entrada | 1 | la entrada del edificio, desde el suelo | situar / prometer | DR10 | 0 | 103 | 0,30 | corte | e0 · 14,6 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la suite, ante el ventanal | situar la pregunta | HK06 | 103 | 128 | 6 f | corte | hook · 15,2 | 0,62-3,56 s → f115,6-f203,8 |
| 3 | c03-tele | 3 | la tele y el mueble de madera | revelar (lo que trae) | RC08 | 231 | 79 | 2,20 | corte | paseo1 · 13,5 | — |
| 4 | c04-cama | 3 | la cama y el cabecero | cómo se vive | RC06 | 310 | 91 | 4,40 | corte | paseo2 · 13,9 | — |
| 5 | c05-escritorio | 3 | el escritorio y la pizarra | cómo se vive (para quien trabaja) | RC09 | 401 | 98 | 1,80 | corte | paseo3 · 14,6 | — |
| 6 | c06-mitad | 4 | la suite, frente a la cama | valor (lo que se compra) | MD03 | 499 | 130 | 0 (clip entero) | corte | mitad · 25,3 | 0,75-4,02 s → f521,5-f619,6 |
| 7 | c07-cocineta | 5 | la cocineta | revelar (lo que completa) | RC02 | 629 | 77 | 2,60 | corte | alcoba · 16,0 | — |
| 8 | c08-bano | 5 | el baño y la ducha de vidrio | revelar (lo que completa, al detalle) | RC01 | 706 | 107 | 4,40 | corte | alcoba2 · 13,9 | — |
| 9 | c09-vista | 5 | del ventanal a la ciudad | emocionar (la vista, el clímax) | RC07 | 813 | 153 | 1,10 | corte | vista · 18,4 | — |
| 10 | c10-cta | 6 | el sofá, sentada | invitar | CT08 | 966 | 114 | 10 f | corte | cta · 13,4 | 0,75-3,60 s → f978,5-f1064 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 1080 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **fuera → suite (ella) → tele → cama → escritorio → ella → cocineta → baño → ventanal (la vista) → ella → tarjeta**. El paseo no vuelve atrás y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-103) | −15 LUFS sola (la canción mide −10,7: se baja 4,3 dB) | — |
| Hook (f103-231) | baja a −26 LUFS en 10 f desde el golpe (f103); la primera palabra suena a los 12,6 f; sube tras la última (f204 + 6 f de espera + 15 f de curva) | −15 LUFS |
| Paseo (f231-499) | −15 sola | — |
| Mitad (f499-629) | baja en 10 f desde el golpe (f499); la primera palabra suena a los 22,5 f; sube en 7 f tras la última (f620), antes del golpe del f629 | −15 LUFS |
| Bloque 5 (f629-966) | −15 sola | — |
| CTA (f966-1140) | baja en 10 f desde el golpe (f966), −26 LUFS bajo la voz; tras la última palabra (f1064) se apaga con curva de coseno hasta cero en el f1138; la canción cae sola desde los 205,0 s (f1127), ya bajo la tarjeta | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +18,4 / +19,1 / +18,7 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
