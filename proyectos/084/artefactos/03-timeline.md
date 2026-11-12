# 03 · Timeline — proyecto 084

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Street Level Sessions on the Green» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-084.ts`. La puerta (`node proyectos/084/revisar-084.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-103 | 0,0-3,4 | 1 | DR10 desde 0,30 s | corte | 167.542 s · 14.6 dB | — | sola |
| 103-220 | 3,4-7,3 | 2 | HK06, Isabella desde 0,20 s | corte | 170.891 s · 15.2 dB | f116-204 «¿Y si tu próxima propiedad también pudiera generar ingresos?» | baja en 10 f; sube tras la última palabra |
| 220-273 | 7,3-9,1 | 3 | RC06 desde 4,40 s | corte | 174.78 s · 11.5 dB | — | sola |
| 273-322 | 9,1-10,7 | 3 | RC09 desde 1,80 s | corte | 176.552 s · 21 dB | — | sola |
| 322-449 | 10,7-15,0 | 4 | MD03, Isabella desde 0,07 s | corte | 178.191 s · 11.7 dB | f343-441 «Una suite hotelera, totalmente equipada en El Poblado.» | baja en 10 f; sube tras la última palabra |
| 449-542 | 15,0-18,1 | 5 | RC12 desde 1,00 s | corte | 182.403 s · 9 dB | — | sola |
| 542-629 | 18,1-21,0 | 5 | RC08 desde 2,20 s | corte | 185.525 s · 17.4 dB | — | sola |
| 629-706 | 21,0-23,5 | 5 | RC02 desde 2,60 s | corte | 188.41 s · 16 dB | — | sola |
| 706-813 | 23,5-27,1 | 5 | RC01 desde 4,40 s | corte | 190.967 s · 13.9 dB | — | sola |
| 813-966 | 27,1-32,2 | 5 | RC07 desde 1,10 s | corte | 194.532 s · 18.4 dB | — | sola |
| 966-1080 | 32,2-36,0 | 6 | CT08, Isabella desde 0,33 s | corte | 199.63 s · 13.4 dB | f979-1064 «Agendemos una visita y descubre Go Living Suites.» | baja en 10 f; se apaga con curva |
| 1080-1140 | 36,0-38,0 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-103) | -10.7 LUFS (pico 0.6 dBFS) | -15 LUFS | — |
| Hook (f103-220) | -10.2 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f204) | −15 LUFS |
| Dos planos rápidos (f220-322) | -9.9 LUFS (pico 0.8 dBFS) | -15 LUFS | — |
| Mitad (f322-449) | -9.4 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f441) antes del golpe del f449 | −15 LUFS |
| Recorrido (f449-966) | -10.9 LUFS (pico 0.4 dBFS) | -15 LUFS | — |
| CTA (f966-1140) | -11.5 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f1064) se apaga con curva hasta cero en el f1138 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
