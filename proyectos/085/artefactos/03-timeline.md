# 03 · Timeline — proyecto 085

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Luxury, Elegance, Refined» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-085.ts`. La puerta (`node proyectos/085/revisar-085.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-87 | 0,0-2,9 | 1 | DR10 desde 4,07 s | corte | 147.778 s · 18.5 dB | — | sola |
| 87-188 | 2,9-6,3 | 2 | HK02, Isabella desde 1,20 s | disolver | 150.567 s · 18.8 dB | f100-170 «Una buena inversión empieza por la tranquilidad.» | baja en 10 f; sube tras la última palabra |
| 188-254 | 6,3-8,5 | 3 | ZS01 desde 3,50 s | corte | 153.944 s · 17.8 dB | — | sola |
| 254-317 | 8,5-10,6 | 3 | RC11 desde 0,20 s | corte | 156.15 s · 13.2 dB | — | sola |
| 317-463 | 10,6-15,4 | 4 | MD04, Isabella desde 0,00 s | corte | 158.239 s · 13.4 dB | f334-445 «Invierte en una suite con vocación turística y ubicación estratégica.» | baja en 10 f; sube tras la última palabra |
| 463-533 | 15,4-17,8 | 5 | ZS05 desde 4,30 s | corte | 163.121 s · 12.1 dB | — | sola |
| 533-610 | 17,8-20,3 | 5 | ZS02 desde 5,50 s | corte | 165.441 s · 23.4 dB | — | sola |
| 610-676 | 20,3-22,5 | 5 | RC08 desde 4,30 s | corte | 168.006 s · 11.3 dB | — | sola |
| 676-782 | 22,5-26,1 | 5 | RC07 desde 2,70 s | corte | 170.219 s · 10.5 dB | — | sola |
| 782-898 | 26,1-29,9 | 6 | CT06, Isabella desde 0,03 s | corte | 173.741 s · 9.6 dB | f795-878 «Agenda una visita y descubre su potencial de inversión.» | baja en 10 f; se apaga con curva |
| 898-958 | 29,9-31,9 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-87) | -15.1 LUFS (pico -1.3 dBFS) | -15 LUFS | — |
| Hook (f87-188) | -14.2 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f170) | −15 LUFS |
| Dos planos rápidos (f188-317) | -14.6 LUFS (pico -0.1 dBFS) | -15.6 LUFS | — |
| Mitad (f317-463) | -14.5 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f445) antes del golpe del f463 | −15 LUFS |
| Recorrido (f463-782) | -15.6 LUFS (pico -1.3 dBFS) | -15.4 LUFS | — |
| CTA (f782-958) | -14.4 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f878) se apaga con curva hasta cero en el f956 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
