# 03 · Timeline — proyecto 076 · Suite Go Living (V57)

> Paso 3 de 3. Es lo que `metraje-076.ts` implementa, plano a plano. `desde` en segundos de la fuente normalizada (30 fps exactos); `en` y `dur` en frames de la composición. Cada cambio de plano cae en un golpe MEDIDO de «Luxury, Elegance, Refined» (INICIO_MUSICA = 147,733 s; el golpe de entrada, 147,778 s, suena en el f3). La puerta (`node proyectos/076/revisar-076.mjs`) comprueba cada fila.

| # | Plano | Bloque | Espacio | Función | Clip | `en` | `dur` | `desde` | Entrada | Golpe (dB) | Voz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-edificio | 1 | la torre y su entrada entre plantas, desde la acera | situar / prometer | DR10 | 0 | 87 | 4,07 (f122) | corte | e0 · 18,5 | — (sin voz ni texto) |
| 2 | c02-hook | 2 | la suite, el fondo del pasillo | la promesa | HK02 | 87 | 101 | 36 f | disolver | hook · 18,8 | 1,62-3,97 s → f99,6-f170,1 |
| 3 | c03-gimnasio | 3 | el gimnasio (elípticas y trotadoras) | revelar (zona social) | ZS01 | 188 | 66 | 3,50 | corte | paseo1 · 17,8 | — |
| 4 | c04-tienda | 3 | la tienda del edificio (solo el interior) | revelar (zona social) | ZS05 | 254 | 63 | 4,30 | corte | paseo2 · 13,2 | — |
| 5 | c05-bicicletas | 3 | el gimnasio, el banco rojo y las bicicletas | cerrar el paseo (mirada amplia) | ZS02 | 317 | 74 | 5,50 | corte | paseo3 · 13,4 | — |
| 6 | c06-mitad | 4 | la suite, junto al ventanal | el porqué (dicho) | MD04 | 391 | 142 | 0 (clip entero) | corte | mitad · 16,0 | 0,58-4,28 s → f408,4-f519,4 |
| 7 | c07-cama | 5 | la cama hacia la consola del televisor | cómo se vive | RC11 | 533 | 77 | 0,20 | corte | alcoba · 23,4 | — |
| 8 | c08-repisa | 5 | la repisa con la planta y la cortina | cómo se vive (al detalle) | RC08 | 610 | 66 | 4,30 | corte | alcoba2 · 11,3 | — |
| 9 | c09-vista | 5 | del ventanal a la ciudad | emocionar (la vista, el clímax) | RC07 | 676 | 106 | 2,70 | corte | vista · 10,5 | — |
| 10 | c10-cta | 6 | la suite, primer plano | invitar | CT06 | 782 | 116 | 1 f | corte | cta · 9,6 | 0,45-3,22 s → f794,5-f877,6 |
| 11 | c11-cierre | 6 | tarjeta oscura | cerrar (logo y web) | `cierre-oscuro.png` | 898 | 60 | — | corte | — | — |

La columna «espacio» leída de arriba abajo: **fuera → suite (ella) → gimnasio → tienda → gimnasio → ella → cama → repisa → ventanal (la vista) → ella → tarjeta**. El paseo no vuelve atrás y la vista es el último plano antes del CTA.

## La mezcla

| Tramo | Música | Voz |
|---|---|---|
| Apertura (f0-87) | −15,2 LUFS sola (la canción mide −15,1: −0,1 dB) | — |
| Hook (f87-188) | baja a −26 LUFS en 10 f desde el golpe (f87); la primera palabra suena a los 12,6 f; sube tras la última (f170 + 6 f de espera + 10 f de curva) | −15 LUFS |
| Paseo (f188-391) | −15,9 sola (la canción mide −14,7 con picos de −0,1 dBFS: −1,2 dB) | — |
| Mitad (f391-533) | baja en 10 f desde el golpe (f391); la primera palabra suena a los 17,4 f; sube en 12 f tras la última (f519), antes del golpe del f533 | −15 LUFS |
| Bloque 5 (f533-782) | −16,1 sola (la canción mide −16,1: 0,0 dB) | — |
| CTA (f782-958) | baja en 10 f desde el golpe (f782), −26 LUFS bajo la voz; tras la última palabra (f878) se APAGA con curva de coseno hasta cero en el f956; la canción es plana y no cae sola dentro de la pieza | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 desde −30 dBFS · ganancia +19,7 / +19,2 / +19,0 dB buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
