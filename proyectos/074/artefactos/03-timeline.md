# 03 · Timeline — proyecto 074 · Suite Go Living, «Las zonas sociales» (V55)

> Paso 3 de 3. Es lo que `metraje-074.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Some Say» (INICIO_MUSICA = 140,700 s; el golpe de entrada, 140,733 s, suena en el f2,6). La puerta (`node proyectos/074/revisar-074.mjs`) sale con 0.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio, desde el suelo | situar / prometer | DR06 | 0 | 90 | 0,40 | corte | e0 · 13,1 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la terraza | situar la decisión | HK09 | 90 | 118 | 12 f | disolver | hook · 24,0 | 1,04-4,03 s → f109-f199 |
| 3 | c03-plantas | 3 | el edificio entre plantas | situar (el entorno) | DR01 | 208 | 69 | 1,00 | corte | paseo1 · 15,8 | — |
| 4 | c04-torre | 3 | la torre entre las cicas | revelar (el entorno, al detalle) | DR07 | 277 | 69 | 1,50 | corte | paseo2 · 14,7 | — |
| 5 | c05-gimnasio | 3 | la entrada al gimnasio | llevar a otro espacio (la zona social) | ZS01 | 346 | 94 | 0,30 | corte | paseo3 · 22,1 | — |
| 6 | c06-mitad | 4 | el gimnasio, ella caminando | valor (las amenidades) | MD09 | 440 | 181 | 0 (clip entero) | corte | mitad · 23,7 | 0,60-5,48 s → f458-f604 |
| 7 | c07-pesas | 5 | las pesas y el banco rojo | cómo se usa | ZS02 | 621 | 102 | 2,00 | corte | alcoba · 14,0 | — |
| 8 | c08-cardio | 5 | las trotadoras y las elípticas | cómo se usa (al detalle) | ZS03 | 723 | 87 | 0,30 | corte | alcoba2 · 17,3 | — |
| 9 | c09-fachada | 5 | la fachada al sol | emocionar (el edificio entero, el clímax) | DR03 | 810 | 119 | 0,50 | corte | vista · 14,2 | — |
| 10 | c10-cta | 6 | las gradas del lounge, sentada | invitar | CT12 | 929 | 105 | 8 f | corte | cta · 21,4 | 0,68-3,16 s → f941-f1016 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 1034 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **edificio (el «GO») → terraza (ella) → plantas → torre → entrada al gimnasio → gimnasio (ella) → pesas → cardio → fachada → lounge (ella) → tarjeta**. No vuelve atrás salvo el edificio del bloque 5 (declarado: la fachada es el clímax) y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-90) | −15 LUFS sola (la canción mide −13,8: se baja 1,2 dB) | — |
| Hook (f90-208) | baja a −26 LUFS en 10 f desde el golpe (f90) y sube con curva en los 7 f que caben tras la última palabra (f199) | −15 LUFS |
| Paseo (f208-440) | −15 sola | — |
| Mitad (f440-621) | baja en 10 f desde el golpe (f440); la primera palabra suena a los 18 f; sube en 14 f tras la última (f604) | −15 LUFS |
| Bloque 5 (f621-929) | −15 sola | — |
| CTA (f929-1094) | baja en 10 f desde el golpe (f929), −26 LUFS bajo la voz; tras la última palabra (f1016) se apaga con curva de coseno hasta cero en el f1092; la canción cae sola desde los 175,75 s (f1066) | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +19,3 / +19,2 / +18,3 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
