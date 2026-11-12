# 03 · Timeline — proyecto 086

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Light Fills the Room» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-086.ts`. La puerta (`node proyectos/086/revisar-086.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-90 | 0,0-3,0 | 1 | DR04 desde 2,20 s | corte | 178.118 s · 18.9 dB | — | sola |
| 90-214 | 3,0-7,1 | 2 | HK03, Isabella desde 0,20 s | corte | 181.017 s · 22.9 dB | f107-200 «Antes de invertir en Airbnb, hay algo que debes saber.» | baja en 10 f; sube tras la última palabra |
| 214-255 | 7,1-8,5 | 3 | ZS02 desde 5,40 s | corte | 185.137 s · 16.6 dB | — | sola |
| 255-301 | 8,5-10,0 | 3 | RC08 desde 3,20 s | corte | 186.508 s · 20.4 dB | — | sola |
| 301-430 | 10,0-14,3 | 4 | HK05, Isabella desde 0,07 s | corte | 188.059 s · 21.7 dB | f311-422 «Descubre una suite en un edificio con operación hotelera establecida.» | baja en 10 f; sube tras la última palabra |
| 430-512 | 14,3-17,1 | 5 | RC11 desde 0,45 s | corte | 192.352 s · 15.8 dB | — | sola |
| 512-604 | 17,1-20,1 | 5 | ZS01 desde 2,00 s | corte | 195.081 s · 19.6 dB | — | sola |
| 604-687 | 20,1-22,9 | 5 | ZS05 desde 4,30 s | corte | 198.16 s · 14 dB | — | sola |
| 687-793 | 22,9-26,4 | 5 | DR05 desde 3,30 s | corte | 200.906 s · 19.8 dB | — | sola |
| 793-876 | 26,4-29,2 | 6 | CT04, Isabella desde 0,00 s | corte | 204.462 s · 12.4 dB | f802-857 «Si quieres más información, contáctame.» | baja en 10 f; se apaga con curva |
| 876-936 | 29,2-31,2 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-90) | -11.9 LUFS (pico -0.6 dBFS) | -15 LUFS | — |
| Hook (f90-214) | -12.1 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f200) | −15 LUFS |
| Dos planos rápidos (f214-301) | -12.2 LUFS (pico -0.9 dBFS) | -15 LUFS | — |
| Mitad (f301-430) | -12.2 LUFS | baja a −26 LUFS en 9 f desde el golpe; sube tras la última palabra (f422) antes del golpe del f430 | −15 LUFS |
| Recorrido (f430-793) | -12.3 LUFS (pico -0.5 dBFS) | -15 LUFS | — |
| CTA (f793-936) | -14.5 LUFS | baja a −26 LUFS en 8 f desde el golpe; tras la última palabra (f857) se apaga con curva hasta cero en el f934 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
