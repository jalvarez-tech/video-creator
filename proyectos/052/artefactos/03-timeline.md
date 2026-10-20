# 03 · Timeline — proyecto 052 («Pregúntate esto», réplica de `02.mp4`, SIN voz en off)

> Paso 3 de 3. El frame exacto de cada cosa. Con la **transcripción real** de las dos tomas con voz (`proyectos/052/voz/hk04.json`, `ct05.json`) y los **golpes medidos** del piano (`proyectos/052/musica/golpes-052.json`, de `medir-pista.py --json`).
> De aquí salen `metraje-052.ts`, `audio-052.ts` y `subtitulos-052.ts`.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. **El ritmo lo da la música**: cada rótulo y cada cambio de plano caen en un golpe del piano (`R` en `metraje-052.ts`; `herramientas/buscar-entrada-rotulos.py` busca la entrada que mejor casa las diez entradas). La música entra en el segundo 22,733 de la canción (682/30): su golpe de 32,8 dB (el segundo 25,692) suena en el f90, justo cuando acaba el hook.

## Los planos (bloque 2 = hook · 5 = recorrido sin voz · 6 = CTA)

| id | bloque | clip | `en` (f) | `dur` (f) | s | `desde` (s) | entra | Rótulo / qué se oye |
|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | HK04 (2.º intento) | 0 | 90 | 0,0-3,0 | 4,767 | corte | Isabella: «Antes de arrendar amoblado, pregúntate esto.» (el SEGUNDO intento de la toma: el primero se equivoca; primera sílaba en el f5, la última acaba en el f72) |
| c02-balcon-atardecer | 5 | RC21 AL REVÉS | 90 | 188 | 3,0-9,3 | 0,400 | disolver | R1 «¿Un lugar donde **dormir**…» (f90, golpe de 32,8 dB) · R2 «…o un lugar donde **disfrutes** vivir?» (f179) |
| c03-bar | 5 | RC22 | 278 | 77 | 9,3-11,8 | 0,400 | disolver | R3 «Aquí no pagas / solo un apartamento» (f278) |
| c04-alcoba | 5 | RC06 | 355 | 59 | 11,8-13,8 | 0,400 | disolver | (R3 sigue; el cambio de plano cae en un golpe de 11,3 dB) |
| c05-cocina-sala | 5 | RC01 | 414 | 140 | 13,8-18,5 | 6,000 | disolver | R4 «Pagas llegar y tener todo **resuelto**:» (f414) |
| c06-balcon-torres | 5 | RC03 | 554 | 133 | 18,5-22,9 | 1,500 | disolver | R5 «**Aseo** semanal incluido» (f554) |
| c07-sauna | 5 | RC15 | 687 | 69 | 22,9-25,2 | 0,400 | disolver | R6 «Alguien que te **acompaña** desde el día uno» (f687) |
| c08-isabella-sala | 5 | CT04 (sin voz) | 756 | 67 | 25,2-27,4 | 2,500 | disolver | (R6 sigue; SUSTITUYE a «Isabella en la cocina») |
| c09-piscina | 5 | RC16 | 823 | 133 | 27,4-31,9 | 2,600 | disolver | R7 «**Chef** privado y transporte cuando los pidas» (f823; golpe de 15,9 dB) |
| c10-gimnasio | 5 | RC13 | 956 | 87 | 31,9-34,8 | 0,400 | disolver | R8 «Planes y reservas en **Medellín**» (f956) |
| c11-social-kitchen | 5 | RC12 | 1043 | 133 | 34,8-39,2 | 0,400 | disolver | R9 «Y la mejor **asesoría** de la ciudad» (f1043) |
| c12-cta | 6 | CT05 | 1176 | 104 | 39,2-42,7 | 1,267 | disolver | Isabella: «Si buscas más que un apartamento para vivir, escríbenos.» (voz 1177-1260; a su último fotograma funde a negro, 6 f) |
| c13-cierre | 6 | tarjeta oscura | 1280 | 60 | 42,7-44,7 | — | corte | el logo y la web sobre negro; la música acaba 2 f antes del final (f1338) |

Total: **1340 f = 44,67 s**. Todo lo que no es el primero ni la tarjeta se disuelve en 12 f (la disolvencia acaba en el golpe).

## El audio

| Capa | Dónde | Nivel |
|---|---|---|
| Voz de Isabella, hook (`hk04-voz.wav`) | f5-72 (la ventana de voz 4,925-7,17 s de la toma: el segundo intento) | −15,1 LUFS tratada (compresor 3,5:1 desde −30 dBFS, +18,6 dB, limitador −2,5 dBFS; el limitador quita 2,5 dB en los picos) |
| Voz de Isabella, CTA (`ct05-voz.wav`) | f1177-1260 (1,30-4,08 s de la toma) | −15,0 LUFS tratada (+20,4 dB) |
| Música «Here For You» | desde la canción 22,733 s; f0-1338 | **−15 LUFS sola de principio a fin** (ALTO = +0,2 dB sobre el archivo); solo baja bajo el hook y el CTA a −28 (ALTO × 0,22), con curva de coseno que acaba 10 f antes de la primera palabra; sube con curva hasta el golpe del f90; tras el CTA sube en 14 f y se apaga en línea recta bajo la tarjeta |
| SFX | ninguno | — |

## Los textos (`subtitulos-052.ts`)

11 bloques de texto: el hook `h01` (un solo bloque que se acumula: «Antes de arrendar» f5 · «amoblado,» f25 · «pregúntate esto.» f49), los **nueve rótulos** `r01`-`r09` (en un golpe, nunca dos a la vez; dentro de cada uno las líneas se acumulan con 9-14 f de separación) y el CTA `z01` (a su palabra). Sin cifras. Acentos: `pregúntate esto.` (f49), `dormir…` (f118: espera 28 f al golpe para quedar a ≥ 2 s del del hook), `disfrutes`, `resuelto:`, `Aseo`, `acompaña`, `Chef`, `Medellín`, `asesoría`, `escríbenos.`

| Dudoso | Dónde | Qué se oye |
|---|---|---|
| «amoblado,» | h01, f25 (0,8 s del vídeo; 5,68 s de HK04) | whisper: «a mollado» sobre el segundo intento; el usuario vio el subtítulo en la prueba y solo corrigió el arranque |

## Pendiente con el usuario

1. Oír la prueba (música, hook, CTA) y mirar los rótulos.
2. Los dos planos que no están en el material (¿tiene los clips?).
3. La versión con ficha conserva los rótulos: ¿la quiere así o solo con la ficha?
