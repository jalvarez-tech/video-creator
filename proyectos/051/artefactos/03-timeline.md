# 03 · Timeline — proyecto 051 (réplica de `videos editados/01.mp4`, sin locución y con el guion en pantalla)

> Paso 3 de 3. La línea de tiempo con lo medido. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-051.ts`, `audio-051.ts` y `subtitulos-051.ts`, no al revés. 1461 f a 30 fps (48,70 s).

## Los planos (`metraje-051.ts`)

`desde` = segundo de la fuente NORMALIZADA (los recorridos son anamórficos 81:256 y se escalan enteros a 1296×2304, sin recorte). `en`/`dur` en frames de la composición. Todos los planos del recorrido entran con una **disolvencia de 12 f** (el plano empieza 12 f antes de su `en` y en su `en` ya es opaco; su clip tiene que tener esos 12 f × velocidad antes de `desde`) y **su `en` es el frame en que suena un golpe medido de la canción** (entre paréntesis: segundo de la canción · fuerza en dB por 15 ms).

| # | Plano | Bloque | Espacio | Función | Clip | `desde` (s) | `en` | `dur` | Entrada · golpe |
|---|---|---|---|---|---|---|---|---|---|
| 1 | c01-hook-deseas | 2 | Balcón con la vista | la pregunta: «¿Deseas» | HK05 `Img 9508` | 24,5 (735 f) | 0 | 30 | corte (f0) |
| 2 | c02-hook-arrendar | 2 | Balcón con la vista | la promesa: «arrendar amoblado en Medellín? Ven, te muestro» | HK05 `Img 9508` | 26,1 (783 f) | 30 | 119 | corte |
| 3 | c03-cocina | 3 | Cocina → sala | situar: «113 m² amoblados, listos para ti» | RC01 `Img 9461` | 0 | 149 | 147 | corte (217,34 · 8,8) · ×1,5 |
| 4 | c04-cielo | 3 | Balcón: cielo, rayo de sol, ciudad | revelar: «En Las Palmas, con la ciudad a tus pies» | RC10 `Img 9509` | 2,8 | 296 | 112 | disolver (222,26 · 8,1) |
| 5 | c05-jacuzzi | 3 | Balcón al atardecer + jacuzzi privado | el diferencial: «Tu jacuzzi privado en el balcón» | RC21 `Img 9537 (1)` | 6,3 (189 f) | 408 | 141 | disolver (225,99 · 7,4) |
| 6 | c06-alcoba | 3 | Alcoba principal | descanso: «Y lo que viene con él:» → «Aseo semanal incluido» | RC05 `Img 9477` | 0,4 | 549 | 164 | disolver (230,68 · 7,9) |
| 7 | c07-bar | 3 | Bar de noche | sigue «Aseo semanal incluido» | RC22 `Img 9538` | 0,4 | 713 | 78 | disolver (236,16 · 7,9) |
| 8 | c08-sala | 3 | Sala a la hora azul | «Acompañamiento personalizado desde el día uno» | RC20 `Img 9536` | 3,8 | 791 | 124 | disolver (238,75 · 8,2) |
| 9 | c09-piscina | 3 | Piscina (unidad) | «Chef privado cuando quieras» | RC16 `Img 9525` | 0,4 | 915 | 105 | disolver (242,87 · 6,7) |
| 10 | c10-gimnasio | 3 | Gimnasio (unidad) | «Conductor y transporte a tu medida» | RC13 `Img 9516` | 0,4 | 1020 | 62 | disolver (246,37 · 6,4) |
| 11 | c11-social-kitchen | 3 | Social Kitchen (unidad) | sigue «Conductor y transporte…» | RC11 `Img 9513` | 0,4 | 1082 | 63 | disolver (248,46 · 6,6) |
| 12 | c12-social-kitchen-2 | 3 | Social Kitchen, otro lado | «La mejor asesoría de la ciudad» | RC12 `Img 9514` | 0,6 | 1145 | 104 | disolver (250,56 · 9,1) |
| 13 | c13-cta | 6 | Sala con la palma | la invitación: «Escríbeme y agenda tu visita» (Isabella muda) | CT04 `Img 9492` | 3,0 | 1249 | 137 | disolver · **SIN golpe** (declarado) |
| 14 | c14-cierre | 6 | Tarjeta oscura | la marca (logo y web) | `cierre-oscuro.png` | — | 1386 | 75 | corte (258,57 · 7,3) |

Los cambios son los del original (4,9 · 10,4 · 20,8 · 26,4 · 34,2 · 37,0 · 44,7 · 51,1 · 52,8 · 55,6 · 59,4 s) **recortados** al ritmo de lectura y movidos al golpe más cercano. 4c de la puerta lo comprueba: los 20 cambios con golpe (11 planos y 9 rótulos) caen a ≤ 1 f de uno de 6,1-9,1 dB; los 2 sin golpe (la entrada del CTA y su rótulo) están declarados.

## La voz del hook (medida por energía, `onsets-voz.py` y el perfil de 20 ms; R29: whisper pone la primera palabra de cada toma en 0,00 s)

| Plano | Voz (s de la fuente) | `desde` | Primera sílaba (frame de la comp) | Última palabra | Ganancia (tras el compresor) | LUFS del tramo tratado |
|---|---|---|---|---|---|---|
| c01 «¿Deseas» | 24,74 → 25,30 | 24,5 s | f7 | f24 (calla 6 f antes del corte) | +19,75 dB (la de la toma) − 1,9 dB (el plan) | −13,1 |
| c02 «arrendar amoblado en Medellín? Ven, te muestro» | 26,38 → 29,48 | 26,1 s | f38 | f131 (18 f de imagen más) | +19,75 dB + 0,1 dB | −15,1 |

Cruda: −28,5 LUFS en la ventana de voz (Isabella habla a varios metros de un iPhone, de cuerpo entero, con una cresta de ≈ 20 dB y 1,1 s de pausa entre «Deseas» y «arrendar»). Cadena de `normalizar.mjs` (graves fuera, puerta suave, compresor 3,5:1 desde −30 dBFS, ganancia 19,75 dB buscada con las dos ventanas puestas, limitador a −2,5 dBFS): **−15,0 LUFS integrados**, el limitador quita 0,7 dB y el pico real queda a −2,5 dBFS. Silencio fuera de las dos ventanas (24,67-25,35 y 26,31-29,53 s).

## La música (*Einaudi Fly*, entrada a 212,4333 s de la canción = 6373/30)

Entra en el f0 (sube del silencio en 3 f, ya baja bajo la voz del hook), **solo baja bajo el hook** (f7-f131, −16 dB → −31 LUFS), sube con curva de coseno (18 f) hasta el golpe de 8,8 dB del f149 y suena a su nivel «solo» hasta la tarjeta. El nivel «solo» es UNA ganancia de −2,0 dB (la canción mide −13,0 LUFS de media en los 49 s que se usan, LRA 3,6 LU, pico −0,6 dBFS: queda a −15,0 LUFS y el pico a −2,6 dBFS), de modo que la canción conserva su dinámica (de −12 a −15 LUFS). **La caída natural de la canción (261,06 s = f1460) cae sobre la tarjeta** (f1386-1461); la música se lleva a cero en línea recta 2 f antes del final (f1459). 10 puntos de ganancia (el mezclador de Remotion se rompe por encima de ≈ 80).

## Los rótulos (`subtitulos-051.ts`; uno a la vez, el texto del usuario tal cual)

| # | Bloque | Entra (f · golpe) | Sale | Líneas (acento en negrita) |
|---|---|---|---|---|
| 1 | r01 | 149 (217,34 · 8,8) | 270 | 113 m² · **amoblados,** (f176) · listos para ti (f193, 218,82 · 6,4) |
| 2 | r02 | 296 (222,26 · 8,1) | 420 | En Las Palmas, con la · **ciudad** (f312, 222,78 · 7,3) · a tus pies (f341, 223,75 · 6,6) |
| 3 | r03 | 473 (228,15 · 6,1) | 545 | Tu · **jacuzzi** (f484) · privado en el balcón (f505) |
| 4 | r04 | 549 (230,68 · 7,9) | 640 | Y lo que viene · con él: (f575) |
| 5 | r05 | 659 (234,36 · 6,5) | 770 | **Aseo** · semanal incluido (f675) |
| 6 | r06 | 791 (238,75 · 8,2) | 905 | **Acompañamiento** · personalizado desde (f844, 240,52 · 8,7) · el día uno (f870, 241,39 · 6,2) |
| 7 | r07 | 915 (242,87 · 6,7) | 1010 | **Chef** · privado cuando quieras (f965, 244,55 · 9,3) |
| 8 | r08 | 1020 (246,37 · 6,4) | 1135 | **Conductor** · y transporte a tu medida (f1082, 248,46 · 6,6) |
| 9 | r09 | 1145 (250,56 · 9,1) | 1240 | La mejor · **asesoría** (f1160) · de la ciudad (f1186, 251,90 · 6,1) |
| 10 | r10 | 1262 (**sin golpe**) | 1380 | **Escríbeme** · y agenda tu visita (f1290) |

El hook (h01-h03) va a mano con los arranques medidos de la voz: «¿Deseas» f6 · «arrendar amoblado» f37 · «en Medellín?» f73 · «Ven,» f106 · **«te muestro.»** f115. 10 acentos en total (≥ 2 s entre dos), una sola cifra («113 m²»).
