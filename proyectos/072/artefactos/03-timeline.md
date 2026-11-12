# 03 · Timeline — proyecto 072 · Suite Go Living (V53)

> Paso 3 de 3. Es lo que `metraje-072.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «I Feel It Coming» (INICIO_MUSICA = 227,700 s; el golpe de entrada, 227,745 s, suena en el f3) **salvo la salida del hook (f190)**. La puerta (`node proyectos/072/revisar-072.mjs`) sale con 0.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | el edificio, desde el suelo | situar / prometer | DR05 | 0 | 80 | 0,60 | corte | e0 · 22,5 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la terraza alta | situar la tesis | HK11 | 80 | 110 | 0 (clip entero) | corte | hook · 22,9 | 0,47-3,58 s → f94-f187 |
| 3 | c03-fachada | 3 | el edificio, por fuera | situar (dónde) | DR03 | 190 | 103 | 0,70 | corte | **sin golpe** (fin del clip del hook) | — |
| 4 | c04-plantas | 3 | el edificio entre las plantas | revelar (el entorno) | DR01 | 293 | 97 | 0,40 | corte | paseo2 · 24,4 | — |
| 5 | c05-suite | 3 | la suite hacia su ventana | llevar a otro espacio (de fuera a dentro) | RC03 | 390 | 77 | 0 | corte | paseo3 · 18,5 | — |
| 6 | c06-mitad | 4 | la terraza tras el cristal | valor (los nombres) | MD08 | 467 | 136 | 0 (clip entero) | corte | mitad · 25,6 | 0,47-4,32 s → f481-f597 |
| 7 | c07-ventana | 5 | una ventana con la ciudad | cómo se ve | RC13 | 603 | 77 | 1,90 | corte | cama · 18,3 | — |
| 8 | c08-ciudad | 5 | el ventanal de la habitación | cómo se ve (al detalle) | RC05 | 680 | 78 | 0 | corte | sofa · 16,8 | — |
| 9 | c09-vista | 5 | de la cama al ventanal: la ciudad | emocionar (la vista, el clímax) | RC07 | 758 | 113 | 2,45 | corte | vista · 16,0 | — |
| 10 | c10-cta | 6 | el lobby con ventanales | invitar | CT11 | 871 | 140 | 12 f | disolver | cta · 15,2 | 0,76-4,38 s → f882-f990 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 1011 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **fuera → terraza (ella) → fachada → plantas → suite hacia su ventana → terraza (ella) → ventana → ventanal → la vista → lobby (ella) → tarjeta**. No vuelve atrás: va de lo exterior a lo que se ve desde dentro y acaba en la ciudad.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-80) | −15 LUFS sola (la canción mide −10,6: se baja 4,4 dB) | — |
| Hook (f80-190) | baja a −26 LUFS en 10 f desde el golpe (f80); sube con curva de 15 f desde la última palabra (f187) por encima del corte al paseo | −15 LUFS |
| Paseo (f190-467) | −15 sola | — |
| Mitad (f467-603) | baja en 10 f desde el golpe (f467), la primera palabra a los 14 f; sube en 14 f desde la última palabra (f597): el golpe del f603 suena al 38 % de su subida (declarado) | −15 LUFS |
| Bloque 5 (f603-871) | −15 sola (la canción empieza a decaer a los 252 s) | — |
| CTA (f871-1071) | baja en 10 f desde el golpe (f871), −26 LUFS bajo la voz; tras la última palabra (f990) se apaga con curva de coseno hasta cero en el f1069 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +19,0 / +19,2 / +19,2 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
