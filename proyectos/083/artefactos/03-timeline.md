# 03 · Timeline — proyecto 083

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Some Say» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-083.ts`. La puerta (`node proyectos/083/revisar-083.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-90 | 0,0-3,0 | 1 | DR06 desde 0,40 s | corte | 140.733 s · 13.1 dB | — | sola |
| 90-208 | 3,0-6,9 | 2 | HK09, Isabella desde 0,40 s | disolver | 143.632 s · 24 dB | f109-199 «Las buenas inversiones empiezan con buenas decisiones.» | baja en 10 f; sube tras la última palabra |
| 208-261 | 6,9-8,7 | 3 | ZS01 desde 0,30 s | corte | 147.578 s · 15.8 dB | — | sola |
| 261-303 | 8,7-10,1 | 3 | DR01 desde 1,00 s | corte | 149.33 s · 9.6 dB | — | sola |
| 303-486 | 10,1-16,2 | 4 | MD09, Isabella desde 0,00 s | corte | 150.754 s · 16 dB | f321-467 «Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.» | baja en 10 f; sube tras la última palabra |
| 486-585 | 16,2-19,5 | 5 | ZS02 desde 2,00 s | corte | 156.833 s · 8 dB | — | sola |
| 585-688 | 19,5-22,9 | 5 | ZS03 desde 0,30 s | corte | 160.16 s · 22.8 dB | — | sola |
| 688-791 | 22,9-26,4 | 5 | DR07 desde 1,50 s | corte | 163.587 s · 13.1 dB | — | sola |
| 791-929 | 26,4-31,0 | 5 | DR03 desde 0,50 s | corte | 167.016 s · 24.6 dB | — | sola |
| 929-1034 | 31,0-34,5 | 6 | CT12, Isabella desde 0,27 s | corte | 171.596 s · 21.4 dB | f941-1016 «Conoce esto y mucho más en Go Living Suites.» | baja en 10 f; se apaga con curva |
| 1034-1094 | 34,5-36,5 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-90) | -13.7 LUFS (pico -1.1 dBFS) | -15 LUFS | — |
| Hook (f90-208) | -14.2 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f199) | −15 LUFS |
| Dos planos rápidos (f208-303) | -12.1 LUFS (pico -0.7 dBFS) | -15 LUFS | — |
| Mitad (f303-486) | -14.2 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f467) antes del golpe del f486 | −15 LUFS |
| Recorrido (f486-929) | -14.4 LUFS (pico -0.9 dBFS) | -15 LUFS | — |
| CTA (f929-1094) | -16.3 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f1016) se apaga con curva hasta cero en el f1092 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
