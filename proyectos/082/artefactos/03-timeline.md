# 03 · Timeline — proyecto 082

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Chillin' (Chillstep Mix)» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-082.ts`. La puerta (`node proyectos/082/revisar-082.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-93 | 0,0-3,1 | 1 | DR09 desde 2,00 s | corte | 259.21 s · 22.2 dB | — | sola |
| 93-205 | 3,1-6,8 | 2 | HK10, Isabella desde 0,00 s | corte | 262.216 s · 22.8 dB | f110-192 «¿Vives fuera de Colombia y quieres invertir en Medellín?» | baja en 10 f; sube tras la última palabra |
| 205-253 | 6,8-8,4 | 3 | DR02 desde 1,00 s | corte | 265.931 s · 9 dB | — | sola |
| 253-315 | 8,4-10,5 | 3 | RC10 desde 0,00 s | corte | 267.559 s · 9.5 dB | — | sola |
| 315-486 | 10,5-16,2 | 4 | MD01, Isabella desde 0,47 s | disolver | 269.617 s · 21.5 dB | f327-463 «Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.» | baja en 10 f; sube tras la última palabra |
| 486-592 | 16,2-19,7 | 5 | RC12 desde 1,00 s | corte | 275.312 s · 13.7 dB | — | sola |
| 592-670 | 19,7-22,3 | 5 | RC02 desde 0,60 s | corte | 278.833 s · 12.6 dB | — | sola |
| 670-758 | 22,3-25,3 | 5 | RC03 desde 0,60 s | corte | 281.451 s · 9.3 dB | — | sola |
| 758-813 | 25,3-27,1 | 5 | RC11 desde 3,00 s | corte | 284.389 s · 25.1 dB | — | sola |
| 813-872 | 27,1-29,1 | 5 | RC06 desde 4,50 s | corte | 286.213 s · 15.9 dB | — | sola |
| 872-1014 | 29,1-33,8 | 5 | RC07 desde 1,50 s | corte | 288.183 s · 10.3 dB | — | sola |
| 1014-1169 | 33,8-39,0 | 6 | CT10, Isabella desde 0,20 s | corte | 292.919 s · 10.6 dB | f1027-1154 «Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.» | baja en 10 f; se apaga con curva |
| 1169-1229 | 39,0-41,0 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-93) | -12.5 LUFS (pico 0.4 dBFS) | -15 LUFS | — |
| Hook (f93-205) | -11.7 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f192) | −15 LUFS |
| Dos planos rápidos (f205-315) | -21.7 LUFS (pico -3.4 dBFS) | -19.4 LUFS | — |
| Mitad (f315-486) | -16.8 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f463) antes del golpe del f486 | −15 LUFS |
| Recorrido (f486-1014) | -15.9 LUFS (pico -1.2 dBFS) | -15.8 LUFS | — |
| CTA (f1014-1229) | -17.4 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f1154) se apaga con curva hasta cero en el f1227 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
