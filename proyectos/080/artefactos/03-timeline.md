# 03 · Timeline — proyecto 080

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Heaven on Earth» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-080.ts`. La puerta (`node proyectos/080/revisar-080.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-86 | 0,0-2,9 | 1 | DR08 desde 0,50 s | corte | 178.043 s · 10.2 dB | — | sola |
| 86-207 | 2,9-6,9 | 2 | HK08, Isabella desde 0,43 s | disolver | 180.82 s · 11.5 dB | f100-201 «Tu inversión no debería convertirse en otro trabajo.» | baja en 10 f; sube tras la última palabra |
| 207-263 | 6,9-8,8 | 3 | RC08 desde 0,20 s | corte | 184.846 s · 11.6 dB | — | sola |
| 263-328 | 8,8-10,9 | 3 | RC03 desde 3,40 s | corte | 186.698 s · 13.1 dB | — | sola |
| 328-457 | 10,9-15,2 | 4 | MD06, Isabella desde 0,07 s | corte | 188.866 s · 18.7 dB | f342-449 «Una suite hotelera con operadores turísticos listos para ti.» | baja en 10 f; sube tras la última palabra |
| 457-518 | 15,2-17,3 | 5 | RC09 desde 2,80 s | corte | 193.193 s · 13.3 dB | — | sola |
| 518-578 | 17,3-19,3 | 5 | RC02 desde 0,60 s | corte | 195.199 s · 11 dB | — | sola |
| 578-634 | 19,3-21,1 | 5 | RC05 desde 5,00 s | corte | 197.216 s · 12.4 dB | — | sola |
| 634-699 | 21,1-23,3 | 5 | RC06 desde 5,50 s | corte | 199.074 s · 10.1 dB | — | sola |
| 699-790 | 23,3-26,3 | 5 | RC07 desde 3,20 s | corte | 201.24 s · 11.1 dB | — | sola |
| 790-890 | 26,3-29,7 | 6 | CT09, Isabella desde 0,17 s | corte | 204.287 s · 13.6 dB | f802-874 «Hablemos y conoce tus opciones de inversión.» | baja en 10 f; se apaga con curva |
| 890-950 | 29,7-31,7 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-86) | -13.4 LUFS (pico -2.4 dBFS) | -15 LUFS | — |
| Hook (f86-207) | -13.1 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f201) | −15 LUFS |
| Dos planos rápidos (f207-328) | -15.1 LUFS (pico -2.9 dBFS) | -15 LUFS | — |
| Mitad (f328-457) | -15.9 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f449) antes del golpe del f457 | −15 LUFS |
| Recorrido (f457-790) | -13.1 LUFS (pico -1.5 dBFS) | -15 LUFS | — |
| CTA (f790-950) | -13.3 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f874) se apaga con curva hasta cero en el f948 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
