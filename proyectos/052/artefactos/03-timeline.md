# 03 · Timeline — proyecto 052 («Pregúntate esto», réplica de `02.mp4`, SIN voz en off)

> Paso 3 de 3. El frame exacto de cada cosa. Con la **transcripción real** de las dos tomas con voz (`proyectos/052/voz/hk04.json`, `ct05.json`) y los **golpes medidos** del piano (`proyectos/052/musica/golpes-052.json`, de `medir-pista.py --json`).
> De aquí salen `metraje-052.ts`, `audio-052.ts` y `subtitulos-052.ts`.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. **El ritmo lo da la música**: cada rótulo y cada cambio de plano caen en un golpe del piano (`R` en `metraje-052.ts`; `herramientas/buscar-entrada-rotulos.py` busca la entrada que mejor casa las diez entradas). La música entra en el segundo 20,8 de la canción (624/30): su golpe de 32,8 dB (el segundo 25,692) suena en el f148, justo cuando acaba el hook.

## Los planos (bloque 2 = hook · 5 = recorrido sin voz · 6 = CTA)

| id | bloque | clip | `en` (f) | `dur` (f) | s | `desde` (s) | entra | Rótulo / qué se oye |
|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | HK04 | 0 | 147 | 0,0-4,9 | 2,733 | corte (f0) | Isabella: «Antes de arrendar [1 s] amoblado, [0,6 s] pregúntate esto.» (primera sílaba en el f5; la última acaba en el f133 + 2 f + los 12 de la disolvencia siguiente) |
| c02-balcon-atardecer | 5 | RC21 AL REVÉS | 147 | 189 | 4,9-11,2 | 0,400 | disolver | R1 «¿Un lugar donde **dormir**…» (f148) · R2 «…o un lugar donde **disfrutes** vivir?» (f237) |
| c03-bar | 5 | RC22 | 336 | 77 | 11,2-13,8 | 0,400 | disolver | R3 «Aquí no pagas / solo un apartamento» (f336; la segunda línea entra con la alcoba) |
| c04-alcoba | 5 | RC06 | 413 | 59 | 13,8-15,7 | 0,400 | disolver | (R3 sigue) |
| c05-cocina-sala | 5 | RC01 | 472 | 140 | 15,7-20,4 | 6,000 | disolver | R4 «Pagas llegar y tener todo **resuelto**:» (f472) |
| c06-balcon-torres | 5 | RC03 | 612 | 133 | 20,4-24,8 | 1,500 | disolver | R5 «**Aseo** semanal incluido» (f612) |
| c07-sauna | 5 | RC15 | 745 | 69 | 24,8-27,1 | 0,400 | disolver | R6 «Alguien que te **acompaña** desde el día uno» (f745) |
| c08-isabella-sala | 5 | CT04 (sin voz) | 814 | 67 | 27,1-29,4 | 2,500 | disolver | (R6 sigue; SUSTITUYE a «Isabella en la cocina») |
| c09-piscina | 5 | RC16 | 881 | 133 | 29,4-33,8 | 2,600 | disolver | R7 «**Chef** privado y transporte cuando los pidas» (f881; golpe de 15,9 dB) |
| c10-gimnasio | 5 | RC13 | 1014 | 87 | 33,8-36,7 | 0,400 | disolver | R8 «Planes y reservas en **Medellín**» (f1014) |
| c11-social-kitchen | 5 | RC12 | 1101 | 133 | 36,7-41,1 | 0,400 | disolver | R9 «Y la mejor **asesoría** de la ciudad» (f1101) |
| c12-cta | 6 | CT05 | 1234 | 104 | 41,1-44,6 | 1,267 | disolver | Isabella: «Si buscas más que un apartamento para vivir, escríbenos.» (voz 1235-1318; a su último fotograma funde a negro, 6 f) |
| c13-cierre | 6 | tarjeta oscura | 1338 | 60 | 44,6-46,6 | — | corte | el logo y la web sobre negro; la música acaba 2 f antes del final (f1396) |

Total: **1398 f = 46,60 s**. Todo lo que no es el primero ni la tarjeta se disuelve en 12 f (la disolvencia acaba en el golpe).

## El audio

| Capa | Dónde | Nivel |
|---|---|---|
| Voz de Isabella, hook (`hk04-voz.wav`) | f5-133 (la ventana de voz 2,90-7,17 s de la toma) | −15,2 LUFS tratada (compresor 3,5:1 desde −30 dBFS, +19,4 dB, limitador −2,5 dBFS; el limitador quita 3,3 dB en los picos) |
| Voz de Isabella, CTA (`ct05-voz.wav`) | f1235-1318 (1,30-4,08 s de la toma) | −15,0 LUFS tratada (+20,4 dB) |
| Música «Here For You» | desde la canción 20,8 s; f0-1396 | **−15 LUFS sola de principio a fin** (ALTO = +0,2 dB sobre el archivo); solo baja bajo el hook y el CTA a −28 (ALTO × 0,22), con curva de coseno que acaba 10 f antes de la primera palabra; sube con curva hasta el golpe del f148; tras el CTA sube en 14 f y se apaga en línea recta bajo la tarjeta |
| SFX | ninguno | — |

## Los textos (`subtitulos-052.ts`)

12 bloques de texto: el hook `h01`-`h02` (a su palabra), los **nueve rótulos** `r01`-`r09` (en un golpe, nunca dos a la vez; dentro de cada uno las líneas se acumulan con 9-14 f de separación) y el CTA `z01` (a su palabra). Sin cifras. Acentos: `pregúntate esto.` (f113), `dormir…` (f176: espera 28 f al golpe para quedar a ≥ 2 s del del hook), `disfrutes`, `resuelto:`, `Aseo`, `acompaña`, `Chef`, `Medellín`, `asesoría`, `escríbenos.`

| Dudoso | Dónde | Qué se oye |
|---|---|---|
| «amoblado,» | h02, f64 (2,1 s del vídeo; 4,92 s de HK04) | whisper: «a mi lado»; 4 sílabas |

## Pendiente con el usuario

1. Oír la prueba (música, hook, CTA) y mirar los rótulos; la palabra dudosa de arriba.
2. Los dos planos que no están en el material (¿tiene los clips?).
3. La versión con ficha conserva los rótulos: ¿la quiere así o solo con la ficha?
