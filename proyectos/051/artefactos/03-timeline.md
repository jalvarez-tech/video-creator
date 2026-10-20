# 03 · Timeline — proyecto 051 (réplica de `videos editados/01.mp4`)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-051.ts`, `audio-051.ts` y `subtitulos-051.ts`, no al revés. 1978 f a 30 fps (65,93 s).
>
> ⚠️ **Los tiempos de la locución son PROVISIONALES**: `off.wav` es hoy una voz guía de macOS colocada en los segundos en que el original dice cada frase (reparto §3: la locución real no existe como audio). Cuando llegue la real, se cambian `FRASES_OFF` (`audio-051.ts`), la tabla `P` (`metraje-051.ts`) y los bloques `o01…o22` de `subtitulos-051.ts`; el resto (hook, recorrido, música, cierre) no se mueve.

## Los planos (`metraje-051.ts`)

`desde` = segundo de la fuente NORMALIZADA (los recorridos son anamórficos 81:256 y se escalan enteros a 1296×2304, sin recorte). `en`/`dur` en frames de la composición. Todos los planos del recorrido entran con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y en su `en` ya es opaco; su clip tiene que tener esos 12 f × velocidad antes de `desde`).

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entrada |
|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-hook-deseas | 2 | Balcón con la vista | la pregunta: «¿Deseas» | HK05 `Img 9508` | 24,5 (735 f) | 0 | 30 | corte (f0) |
| 2 | c02-hook-arrendar | 2 | Balcón con la vista | la promesa: «arrendar amoblado en Medellín? Ven, te muestro» | HK05 `Img 9508` | 26,1 (783 f) | 30 | 117 | corte |
| 3 | c03-cocina | 3 | Cocina → sala | situar: «este espectacular apartamento» | RC01 `Img 9461` | 0 | 147 | 165 | corte (×1,5) |
| 4 | c04-cielo | 3 | Balcón: cielo, torres, ciudad | revelar: amplitud, comodidad y naturaleza | RC10 `Img 9509` | 0,4 | 312 | 310 | disolver |
| 5 | c05-jacuzzi | 3 | Balcón al atardecer + jacuzzi privado | el diferencial: «está aquí» | RC21 `Img 9537 (1)` | 5,2 (156 f) | 622 | 170 | disolver |
| 6 | c06-alcoba | 3 | Alcoba principal | descanso: «perfecto para relajarte… un momento de tranquilidad» | RC05 `Img 9477` | 0,4 | 792 | 234 | disolver |
| 7 | c07-bar | 3 | Bar de noche | la pausa de la locución | RC22 `Img 9538` | 0,4 | 1026 | 82 | disolver |
| 8 | c08-sala | 3 | Sala a la hora azul | cierra el apartamento | RC20 `Img 9536` | 3,8 | 1108 | 232 | disolver |
| 9 | c09-piscina | 3 | Piscina (unidad) | «piscina, zonas húmedas, cancha de squash» | RC16 `Img 9525` | 0,6 | 1340 | 160 | disolver (×1,5) |
| 10 | c10-gimnasio | 3 | Gimnasio (unidad) | «gimnasio… espacios de bienestar» | RC13 `Img 9516` | 0,4 | 1500 | 84 | disolver |
| 11 | c11-social-kitchen | 3 | Social Kitchen (unidad) | «todo esto en Las Palmas» | RC11 `Img 9513` | 0,4 | 1584 | 108 | disolver |
| 12 | c12-social-kitchen-2 | 3 | Social Kitchen, otro lado | «uno de los sectores más privilegiados» | RC12 `Img 9514` | 0,6 | 1692 | 90 | disolver |
| 13 | c13-cta | 6 | Sala con la palma | la invitación: «escríbeme, agenda tu visita…» (muda, con la locución encima) | CT04 `Img 9492` | 3,0 | 1782 | 136 | disolver |
| 14 | c14-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 1918 | 60 | corte |

Los cambios de plano son los del original (4,9 · 10,4 · 20,7 · 26,4 · 34,2 · 36,9 · 44,7 · 50,0 · 52,8 · 56,4 · 59,4 s), movidos lo justo para que cada disolvencia tenga clip detrás y ninguno pase de su último fotograma.

## La voz (medida por energía, `onsets-voz.py` y el perfil de 20 ms; R29: whisper pone la primera palabra de cada toma en 0,00 s)

| Plano | Voz (s de la fuente) | `desde` | Primera sílaba (frame de la comp) | Última palabra | Ganancia (tras el compresor) | LUFS del tramo tratado |
|---|---|---|---|---|---|---|
| c01 «¿Deseas» | 24,74 → 25,30 | 24,5 s | f7 | f24 (calla 6 f antes del corte) | +19,75 dB (la de la toma) − 1,9 dB (el plan) | −13,1 |
| c02 «arrendar amoblado en Medellín? Ven, te muestro» | 26,38 → 29,48 | 26,1 s | f38 | f131 (16 f de imagen más) | +19,75 dB + 0,1 dB | −15,1 |

Cruda: −28,5 LUFS en la ventana de voz (Isabella habla a varios metros de un iPhone, de cuerpo entero, con una cresta de ≈ 20 dB y 1,1 s de pausa entre «Deseas» y «arrendar»). Cadena de `normalizar.mjs` (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia 19,75 dB buscada con las dos ventanas puestas, limitador a −2,5 dBFS): **−15,0 LUFS integrados**, el limitador quita 0,7 dB y el pico real queda a −2,5 dBFS. Silencio fuera de las dos ventanas (24,67-25,35 y 26,31-29,53 s).

**La locución** (`FRASES_OFF`, en segundos de `off-voz.wav`; con la voz guía): 4,80-14,08 · 15,20-22,29 · 22,70-35,49 · 39,60-49,21 · 52,40-57,53 · 59,50-63,40 s. Tratada (graves, compresor 2:1 desde −24 dBFS, ganancia medida y limitador a −2,5 dBFS) a −15,0 LUFS. En el original, las seis frases son 4,8-14,2 · 15,2-22,7 · 22,7-34,6 · 39,6-50,3 · 52,4-57,4 · 59,5-63,9 s.

## La música (*Einaudi Fly*, entrada a 197,1 s de la canción)

Entra en el f0 (sube del silencio en 3 f, ya baja bajo la voz del hook) y **la caída natural de la canción (261,0 s) cae en el f1918 = donde acaba la imagen de Isabella y empieza la tarjeta**. El nivel «solo» (−15 LUFS) es una ganancia que sigue la sonoridad de la canción tramo a tramo (`alto()` de `audio-051.ts`, con la tabla `CANCION`: de −15,0 a −10,5 LUFS en los 66 s que se usan) sin pasar de un pico de −2,5 dBFS; bajo cada voz, −16 dB más (`bajo()`).

| Tramo de la pieza | Frames | Canción (s) | LUFS de la canción | Qué hace la música |
|---|---|---|---|---|
| El hook (bajo la voz) | 0-131 | 197,1-201,5 | −15,0 / −14,8 | baja (−31 LUFS) bajo la voz de Isabella |
| La locución, frases 1-3 | 144-1065 | 201,9-232,6 | −14,8 → −10,5 | bajo la voz, siguiendo a la canción (la ganancia se recalcula cada 75 f) |
| **El hueco 34,6-39,6 s** | 1065-1188 | 232,6-236,7 | −10,5 / −13,0 | **sube a su nivel «solo»**: el momento más alto de la canción (la alcoba → el bar → la sala azul) |
| La locución, frases 4-5 | 1188-1726 | 236,7-254,6 | −13,0 → −14,2 | bajo la voz |
| El cierre | 1785-1918 | 256,5-261,0 | −14,0 | baja bajo «escríbeme…», sube (14 f) al acabar la voz y suena hasta la tarjeta |
| La tarjeta | 1918-1976 | 261,0-263 | −15,6 → −23 | la caída natural de la canción, en línea recta a cero 2 f antes del final (f1976) |

74 puntos de ganancia (el mezclador de Remotion se rompe por encima de ≈ 80: la puerta lo comprueba).

## El texto (`subtitulos-051.ts`)

Hook a mano con los arranques medidos (`h01` f6 · `h02` f37 y f70 · `h03` f106 y f115); la locución, de `trozos-editoriales.mjs` sobre la voz guía (`o01…o22`, provisional). 12 acentos (≥ 2 s entre dos): «te muestro» · «Las Palmas» · «naturaleza» · «dos habitaciones» · «jacuzzi privado» · «de tranquilidad» · «piscina» · «de bienestar» · «Las Palmas» · «más privilegiados» · «Escríbeme» · «jacuzzi privado». Sin cifras.
