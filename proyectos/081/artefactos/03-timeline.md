# 03 · Timeline — proyecto 081

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «I Feel It Coming» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-081.ts`. La puerta (`node proyectos/081/revisar-081.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-80 | 0,0-2,7 | 1 | DR05 desde 0,60 s | corte | 227.745 s · 22.5 dB | — | sola |
| 80-190 | 2,7-6,3 | 2 | HK11, Isabella desde 0,00 s | corte | 230.326 s · 22.9 dB | f94-187 «En inversión inmobiliaria, la ubicación lo cambia todo.» | baja en 10 f; sube tras la última palabra |
| 190-235 | 6,3-7,8 | 3 | DR03 desde 0,70 s | corte | — | — | sola |
| 235-293 | 7,8-9,8 | 3 | RC13 desde 2,00 s | corte | 235.486 s · 11 dB | — | sola |
| 293-429 | 9,8-14,3 | 4 | MD08, Isabella desde 0,07 s | corte | 237.428 s · 24.4 dB | f305-421 «A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.» | baja en 10 f; sube tras la última palabra |
| 429-487 | 14,3-16,2 | 5 | DR01 desde 0,40 s | corte | 241.942 s · 17.7 dB | — | sola |
| 487-584 | 16,2-19,5 | 5 | RC03 desde 0,00 s | corte | 243.873 s · 10.8 dB | — | sola |
| 584-680 | 19,5-22,7 | 5 | RC05 desde 0,00 s | corte | 247.1 s · 12.3 dB | — | sola |
| 680-758 | 22,7-25,3 | 5 | RC04 desde 2,80 s | corte | 250.324 s · 16.8 dB | — | sola |
| 758-871 | 25,3-29,0 | 5 | RC07 desde 2,40 s | corte | 252.911 s · 16 dB | — | sola |
| 871-1011 | 29,0-33,7 | 6 | CT11, Isabella desde 0,40 s | disolver | 256.665 s · 15.2 dB | f882-990 «Descubre esta suite en El Poblado y déjate asombrar por la ubicación.» | baja en 10 f; se apaga con curva |
| 1011-1071 | 33,7-35,7 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-80) | -10.6 LUFS (pico 0.2 dBFS) | -15 LUFS | — |
| Hook (f80-190) | -10.7 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f187) | −15 LUFS |
| Dos planos rápidos (f190-293) | -10.7 LUFS (pico 0.2 dBFS) | -15 LUFS | — |
| Mitad (f293-429) | -11.1 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f421) antes del golpe del f429 | −15 LUFS |
| Recorrido (f429-871) | -11.2 LUFS (pico 0.3 dBFS) | -15 LUFS | — |
| CTA (f871-1071) | -17.5 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f990) se apaga con curva hasta cero en el f1069 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
