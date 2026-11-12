# 03 · Timeline — proyecto 071 · Suite Go Living (V52)

> Paso 3 de 3. Es lo que `metraje-071.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Heaven on Earth» (INICIO_MUSICA = 178,0 s; el golpe de entrada, 178,043 s, suena en el f3). La puerta (`node proyectos/071/revisar-071.mjs`) sale con 0.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio, desde el suelo | situar / prometer | DR08 | 0 | 86 | 0,50 | corte | e0 · 10,2 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la suite, frente al ventanal | situar el rechazo | HK08 | 86 | 121 | 13 f | disolver | hook · 11,5 | 0,90-4,26 s → f100-f200,8 |
| 3 | c03-cama-escritorio | 3 | de la cama al escritorio | revelar (lo que ya está puesto) | RC09 | 207 | 69 | 2,80 | corte | paseo1 · 11,6 | — |
| 4 | c04-escritorio-tv | 3 | el escritorio y el televisor | revelar (al detalle) | RC03 | 276 | 93 | 2,20 | corte | paseo2 · 10,8 | — |
| 5 | c05-mueble | 3 | el mueble de la pared | revelar (el ambiente) | RC08 | 369 | 88 | 2,10 | corte | paseo3 · 14,7 | — |
| 6 | c06-mitad | 4 | la suite, frente al ventanal con la cortina | valor (la solución) | MD06 | 457 | 135 | 0 (clip entero) | corte | mitad · 13,3 | 0,53-4,10 s → f472,9-f580 |
| 7 | c07-cabecero | 5 | la cama con su cabecero | cómo se vive | RC05 | 592 | 60 | 5,00 | corte | cabecero · 11,4 | — |
| 8 | c08-ventana | 5 | de la cama a la ventana | cómo se vive, hacia la vista | RC10 | 652 | 65 | 0 | corte | ventana · 13,5 | — |
| 9 | c09-vista | 5 | la ciudad desde el ventanal | emocionar (la vista, el clímax) | RC13 | 717 | 73 | 2,00 | corte | vista · 10,4 | — |
| 10 | c10-cta | 6 | el escritorio, sentada | invitar | CT09 | 790 | 100 | 5 f | corte | cta · 13,6 | 0,58-2,96 s → f802,4-f873,8 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 890 | 60 | — | corte | — | — |

La columna «espacio», de arriba abajo: **fuera → suite (ella) → cama/escritorio → televisor → mueble → ella → cama → ventana → ciudad → ella → tarjeta**. El paseo no vuelve atrás y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-86) | −15 LUFS sola (la canción mide −13,3: se baja 1,7 dB) | — |
| Hook (f86-207) | baja a −26 LUFS en 10 f desde el golpe (f86) y sube en los 4 f que caben tras la última palabra (f201), antes del golpe del f207 | −15 LUFS |
| Paseo (f207-457) | −15 sola sobre su meseta (la canción tiene un remanso de 187,3 a 192,0 s, f276-f420) | — |
| Mitad (f457-592) | baja en 10 f desde el golpe (f457); la primera palabra suena a los 15,9 f; sube en 10 f tras la última (f580) | −15 LUFS |
| Bloque 5 (f592-790) | −15 sola | — |
| CTA (f790-950) | baja en 10 f desde el golpe (f790), −26 LUFS bajo la voz; tras la última palabra (f874) se apaga con curva de coseno hasta cero en el f948; la canción cae sola desde los 207,5 s (f887) | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +18,4 / +19,2 / +19,4 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
