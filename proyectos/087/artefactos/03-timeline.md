# 03 · Timeline — proyecto 087

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «Ivory Skyline Reverie» (`musica/golpes-cancion-entera.json`); el frame sale de `golpe()` en `metraje-087.ts`. La puerta (`node proyectos/087/revisar-087.mjs`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
| 0-82 | 0,0-2,7 | 1 | DR09 desde 4,80 s | corte | 157.58 s · 13.3 dB | — | sola |
| 82-179 | 2,7-6,0 | 2 | HK07, Isabella desde 0,27 s | corte | 160.224 s · 14.6 dB | f96-160 «No se trata solo de comprar una propiedad.» | baja en 10 f; sube tras la última palabra |
| 179-247 | 6,0-8,2 | 3 | ZS03 desde 2,80 s | corte | 163.437 s · 10.2 dB | — | sola |
| 247-321 | 8,2-10,7 | 3 | RC11 desde 5,55 s | corte | 165.696 s · 9.7 dB | — | sola |
| 321-480 | 10,7-16,0 | 4 | MD02, Isabella desde 0,00 s | corte | 168.183 s · 17.1 dB | f341-464 «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» | baja en 10 f; sube tras la última palabra |
| 480-562 | 16,0-18,7 | 5 | ZS02 desde 0,00 s | corte | 173.481 s · 15.7 dB | — | sola |
| 562-658 | 18,7-21,9 | 5 | RC03 desde 3,80 s | corte | 176.199 s · 13.4 dB | — | sola |
| 658-733 | 21,9-24,4 | 5 | RC05 desde 6,35 s | corte | 179.399 s · 12 dB | — | sola |
| 733-834 | 24,4-27,8 | 5 | RC07 desde 2,85 s | corte | 181.925 s · 22.4 dB | — | sola |
| 834-931 | 27,8-31,0 | 6 | CT03, Isabella desde 0,20 s | corte | 185.293 s · 12.9 dB | f846-910 «Conoce esta oportunidad en El Poblado.» | baja en 10 f; se apaga con curva |
| 931-991 | 31,0-33,0 | 6 | tarjeta oscura, logo y web | corte | — | — | llega a cero |

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-82) | -11.7 LUFS (pico 0.9 dBFS) | -15 LUFS | — |
| Hook (f82-179) | -10.9 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f160) | −15 LUFS |
| Dos planos rápidos (f179-321) | -11 LUFS (pico 0.3 dBFS) | -15 LUFS | — |
| Mitad (f321-480) | -10.8 LUFS | baja a −26 LUFS en 10 f desde el golpe; sube tras la última palabra (f464) antes del golpe del f480 | −15 LUFS |
| Recorrido (f480-834) | -11.8 LUFS (pico 1.4 dBFS) | -15 LUFS | — |
| CTA (f834-991) | -12.3 LUFS | baja a −26 LUFS en 10 f desde el golpe; tras la última palabra (f910) se apaga con curva hasta cero en el f989 | −15 LUFS |

Voz: cadena de `normalizar.mjs` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV `<toma>-voz.wav` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
