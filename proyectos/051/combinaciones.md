# Combinaciones — proyecto 051 · Tierra Grata Bosque Santo (ARRIENDO), V33 «Ven, te muestro» (réplica de `videos editados/01.mp4`, sin locución, con el guion en pantalla)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la PRIMERA de las tres réplicas (V33-V35, proyectos 051-053; reparto en `proyectos/044/reparto-051-053.md`, catálogo en `proyectos/044/catalogo-material.md`). Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md`.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27-V32 | 045-050 | en main | 2026-10-19/20 | los seis reels de arriendo (045 «El tiempo», 046 «Ciudad nueva», 047 «Lo que incluye», 048 «Chef y experiencias», 049 «Amenidades», 050 «14,8») |
| **V33** | **051** | **prueba a 720p (2026-10-20); el OK del usuario, pendiente** | 2026-10-20 | **«Ven, te muestro»**: **HK05** (dos planos) · RC01 · RC10 · RC21 · RC05 · RC22 · RC20 · RC16 · RC13 · RC11 · RC12 · **CT04** (muda) · 10 rótulos en pantalla · ***Einaudi Fly*** · 1461 f · 48,7 s. Historia: **rev. 0** (commit `3763e9d`: con locución —una voz guía de macOS, porque la real no existía— subtitulada, 65,9 s) → **rev. 1** (la vigente: SIN locución y con el guion nuevo en pantalla, por cambio de encargo del usuario) |
| V34 | 052 | sesión hermana | 2026-10-20 | «Pregúntate esto» (réplica de `02.mp4`) |
| V35 | 053 | sesión hermana | 2026-10-20 | «¿Pagarías 14 millones?» (réplica de `03.mp4`) |

Cada versión viene en DOS formatos: el **orgánico** (`051-recorrido.mp4`, con los rótulos editoriales) y el **funnel** (`051-recorrido-ficha.mp4`, **con los mismos rótulos** —aquí el texto es el mensaje— y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1).

## Lo que lleva

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK05 `Img 9508` en DOS planos: 24,5-25,5 s («¿Deseas», voz 24,74-25,30) y 26,1-30,07 s («arrendar amoblado en Medellín? Ven, te muestro», voz 26,38-29,48) | asignado: Isabella camina hacia cámara por el balcón con la vista. El original quitó la pausa de 1,1 s entre las dos partes; aquí es un salto de 0,6 s entre dos planos del mismo clip, con la imagen a la vez que la voz |
| Recorrido | RC01 0-7,35 s ×1,5 · RC10 2,8-6,53 · RC21 6,3-11,0 · RC05 0,4-5,87 · RC22 0,4-3,0 · RC20 3,8-7,93 · RC16 0,4-3,9 · RC13 0,4-2,47 · RC11 0,4-2,5 · RC12 0,6-4,07 | el orden del original, comprobado fotograma a fotograma, recortado al ritmo de los rótulos |
| CTA | rótulo «Escríbeme y agenda tu visita» sobre **CT04** `Img 9492` 3,0-7,57 s, MUDA | el último plano del original no está en el material |
| Texto | el hook dicho (3 bloques) + los 10 rótulos del usuario, tal cual (`reparto-051-053.md` §5a) | cambio de encargo: sin locución; el guion destaca las plusvalías |
| Canción | *Einaudi Fly* (`a7e0695e`), entrada en 212,4333 s | reservada. Sin pulso: todo disolvencias que acaban en un golpe medido (6,1-9,1 dB). Su caída natural (261,06 s = f1460) cae sobre la tarjeta |
| Voz | solo el hook: −15 LUFS tratada (+19,75 dB tras el compresor 3,5:1) | pedido permanente: «a −15 LUFS sin saturar» |
| Música | −15 LUFS sola con UNA ganancia de −2,0 dB (la canción conserva su dinámica); −31 bajo el hook; sube con curva (18 f) tras «te muestro» | «la música pesa más»: solo baja bajo el hook |
| Color | `COLOR_BASE` + el ajuste de cada plano (partido de los de las piezas 045-050; luma de los planos 83-116) | R32 |
| Transiciones | **disolvencias** de 12 f que acaban en un golpe, salvo el frame 0, el paso del hook a la cocina y la entrada del CTA | R33 con una canción sin pulso |
| Recorridos | **anamórficos (SAR 81:256, DAR 9:16): `scale=1296:2304:flags=lanczos,setsar=1`, SIN recorte** | 608×1080 efectivos ×2,13: algo más blandos que Isabella en 4K; aquí TODO el material es así, también Isabella |

## Los planos del original y de la réplica (comprobado: hojas de contactos a su 9:16 real y correlación de fotogramas contra los 26 clips del 2-sep)

| s (original) | Clip y tramo del original | Réplica | Declarado |
|---|---|---|---|
| 0,0-4,9 | HK05 26,2-30,2 s; el audio de «Deseas» (24,7 s) pegado encima | HK05 24,5-25,5 + 26,1-30,07 s, voz en directo | el original desincroniza «Deseas» con la imagen; aquí van juntas |
| 4,9-10,4 | RC01 0-8,4 s a ×1,9 | RC01 0-7,35 s a ×1,5 | velocidad distinta |
| 10,4-21,6 | RC10 0-10,8 s | RC10 2,8-6,53 s | recortado |
| 21,6-26,6 | RC21 11,1 → 7,6 s AL REVÉS y ampliado | RC21 6,3-11,0 s hacia delante | **el original reproduce el clip al revés y con zoom; aquí no** |
| 26,6-34,2 | RC05 0,4-7,6 s | RC05 0,4-5,87 s | recortado |
| 34,2-37,6 | RC22 0-3,2 s | RC22 0,4-3,0 s | — |
| 37,6-45,0 | RC20 3,8-11,0 s | RC20 3,8-7,93 s | recortado |
| 45,0-50,0 | RC16 0-4,5 s y RC17 0-6 s a ×2 | RC16 0,4-3,9 s a ×1 | **RC17 sale (bañistas)** |
| 50,0-52,8 | RC13 0,2-2,6 s | RC13 0,4-2,47 s | figuras diminutas al fondo |
| 52,8-59,4 | RC11 0,2-6,8 s | RC11 0,4-2,5 + RC12 0,6-4,07 s | **sale gente** en RC11 desde los 4,0 s |
| 59,4-64,0 | **no está en el material** (Isabella de pie junto a los armarios y la pared de listones, camina hacia cámara) | CT04 3,0-7,57 s, muda | **SUSTITUIDO**: el más parecido (Isabella camina hacia cámara; otra sala, con la palma) |

## Metraje que comparte con las otras seis piezas de arriendo (la puerta 7b lo mide; el original ya repetía el recorrido, y aquí manda la réplica)

RC21 4,7 s con la V27 (su clímax) · RC05 2,3-4,0 s con las V27, V28, V29 y V30 · RC16 1,9-3,5 s con las V27, V29 y V30 · RC10 1,2 s con la V30 · RC20 2,3 s con la V32. Ninguna de ellas es exclusiva (el reparto de las réplicas no tiene aperturas ni clímax propios).

## Cómo cambiar cada pieza

- **El texto de un rótulo:** el bloque `rNN` de `subtitulos-051.ts` (y la lista `GUION` de la sección 5 de `revisar-051.mjs`, que lo comprueba tal cual). Una línea no pasa de 5 palabras en base ni de 3 en acento (el validador avisa); los rótulos duran 2,4-4,4 s y entran uno a la vez.
- **Mover un cambio:** el frame de `P` en `metraje-051.ts` y la primera línea del rótulo (`desde`) al golpe más cercano: `proyectos/051/musica/golpes-051.json` (`medir-pista.py`) y la fórmula `(t + 0,012 − INICIO_MUSICA + 0,042) × 30`; la puerta 4c comprueba que caen a ≤ 1 f de un golpe.
- **Otro tramo o clip de recorrido:** el `desde` del corte, y si el clip es nuevo su fila de `MATERIAL` en `normalizar.mjs` (con su sha; se escala entero, `setsar=1`): antes, `ffprobe` del SAR. Una disolvencia pide 12 f × velocidad de clip ANTES de `desde`.
- **Sin aceleración:** quitar `velocidad` de `c03-cocina` y alargar su `dur` (RC01 pide 7,35 s de clip a ×1).
- **Otro último plano:** `c13-cta` (`src`, `desde`, `dur`), añadiendo su clip a `MATERIAL`; si el usuario aporta el clip del original (Isabella de pie junto a la pared de listones), es el cambio natural.
- **Con locución:** el commit `3763e9d` (rev. 0) trae el montaje con la locución, su puerta (4: ventanas por frase de `FRASES_OFF`, `VOZ_GUIA`) y la receta del WAV; la locución real no existe como archivo (reparto §3).
- **Otra canción** (la alternativa reservada es *Deep Breath*): reservarla en el registro; `medir-pista.py`; `INICIO_MUSICA_051` de `metraje-051.ts`, la tabla `P` y los frames de los rótulos; `LUFS_MESETA` de `audio-051.ts`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-051.ts`; el hook sigue con su voz a −15 LUFS.
- **La versión con ficha:** el render normal (CON rótulos) `--muted --crf=6` + `ficha.mjs video tierra-grata` (ver `ficha-luxur` §3); si el usuario prefiere la ficha sola, `--props={"sinSubtitulos":true}`.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO): «arrendar **amoblado** en Medellín» (HK05, la «a» pegada a «arrendar», ≈ 26,9-27,3 s de la fuente = f50-62 del vídeo, 1,6-2,1 s): whisper la oye «amulado», «a Moldova», «a mi lado», «movilado»; el original la subtitula «amoblado». La nota SE QUEDA.
- Mirar con el usuario: **el último plano sustituido**; RC21 hacia delante y RC17 fuera; los planos recortados (48,7 s en vez de 64); que el recorrido se repite con las seis piezas anteriores; que los rótulos prometen lo que la ficha no dice (chef, transporte, «la mejor asesoría de la ciudad»: lo dio el usuario); la imagen más blanda; la canción (medida, no oída; licencia sin verificar); y los dos sitios sin golpe (CTA).
