# Combinaciones del 021 · Los Patios · apto 501 · V5

> Registro de lo que se montó en la **quinta versión** del reel (con qué toma y con qué música) y de cómo cambiar cada pieza para sacar una V6.
> Se lee junto a [`proyectos/017/combinaciones.md`](../017/combinaciones.md) (la V1, su tablero de variantes de hooks, mitades, CTA, recorridos y música alternativa en el §3 y la receta del §4),
> [`proyectos/018/combinaciones.md`](../018/combinaciones.md) (la V2), `proyectos/019/combinaciones.md` (la V3; en `main` desde el PR #12) y `proyectos/020/combinaciones.md` (la V4; en la rama `feat/reel-020-definir`, aún sin publicar),
> `catalogo-material.md` (los códigos HK/MD/CT/RC/DR), [`archivos/musica/registro-de-uso.md`](../../archivos/musica/registro-de-uso.md) (el tablero de coordinación entre sesiones) y [`analisis-uso.md`](analisis-uso.md) (lo que se leyó antes de elegir).
> Todo lo de esta versión está medido sobre los archivos: el plan está en `remotion/src/proyectos/021/` y `node proyectos/021/revisar-021.mjs` lo comprueba.
> **No se editaron los `combinaciones.md` de otros proyectos** (chocarían entre ramas): la fila de la V5 se añade a los de las otras cuatro cuando estas ramas se unan.

## 1. Registro de versiones

| Versión | Apertura | Hook | Mitad | CTA | Recorrido | Dron | Música (`desde`) | Dura | Estado |
|---|---|---|---|---|---|---|---|---|---|
| **V1 rev. 8** · «La oportunidad» (017) | dron DR147 (2,0 s) | HK02 (`INT-ABIERTO`) | MD09 (`INT-ABIERTO`) | CT07 (`TERRAZA`) | RC25 · RC01 · RC02 · RC07 → RC08 continua → DR163 | DR147 · DR163 | *Time* — Hans Zimmer, 175,633 s | 46,6 s | **final exportado el 2026-10-03** |
| **V2 rev. 3** · «El espacio y cómo entra el exterior» (018) | dron DR155 (2,3 s) | HK07 (`PATIO`) | MD07 (`TERRAZA`) | CT01 (`BALCON`) | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | DR155 | *Return to Oasis* — Aleksey Chistilin, 142,967 s | 44,2 s | **final exportado el 2026-10-04** |
| **V3 rev. 1** · «Altura sin torre» (019) | fachada RC25 (3,07 s) | HK05 (`BARANDA`) | MD08 (`TERRAZA`) | CT05 (`INT-BLOQUES`) | RC09 · RC13 · RC16 | DR152 (tras el hook) | *Flying Into the Sun* — Aleksey Chistilin, 178,095 s | 39,7 s | en `main` (PR #12); prueba lista, sin OK |
| **V4 rev. 1** · «Lo que todavía puedes definir» (020) | la calle RC22 (2,53 s) | HK03 (`INT-BLOQUES`) | MD14 (`PATIO`) | CT06 (`INT-ABIERTO`) | RC02 · RC05 · RC09 → MD14 → RC13 · RC04 | DR156, último plano del bloque 5 | *Sax for the Last Customer* (jazz) — 137,615 s | 41,8 s | prueba lista; commit local sin publicar |
| **V5 rev. 2** · «Dentro y fuera» (021) | **ninguna: abre el hook** (la rev. 1 abría con el deck RC10, 2,67 s) | **HK06** (`TERRAZA`) | **MD01** (`BARANDA`) | **CT02 recortado** (`BALCON`) | RC11 · DR154 · RC10 → MD01 → RC11 · RC12 (partida en dos) | **DR154**, el central del bloque 3 | ***Amélie* (piano)** — Andrea Vanzo, 134,967 s | **43,0 s** | **final exportado el 2026-10-04** (CRF 12 y CRF 16 + `.srt`, ver §2.7) con «Mira»/«Mirá» sin cerrar; la prueba rev. 2: `pruebas-720p/021-recorrido-720p.mp4` (la rev. 1, `…-rev1.mp4`) |
| V6 | | | | | | | | | |

Las cinco versiones comparten: el formato (los seis bloques de `recorrido-luxur`), las reglas fijas del canal (la primera toma sin texto ni voz, nunca el sello, el cierre en una tarjeta oscura con el logo a 440 px y 60 % y `PropiedadesLuxur.com`, nada congelado), los subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, el nivel de la voz (−21 LUFS) y de la música (−15 sola, −16 dB bajo la voz) y la base del color. **Lo que separa a la V5 de las otras:** las tres tomas de Isabella (la terraza como hook, la barandilla como mitad), **el CTA recortado a su segunda mitad**, la canción (la primera **de piano**, sin pulso y con un decaimiento natural como resolución), **la apertura (no hay: el reel empieza con Isabella hablando, por encargo; rompe la regla fija «la primera toma sin texto ni voz»)**, el dron (en el centro del bloque 3), el sentido del paseo (II, como la V2 y la V3), **el paseo entero** (primero fuera y luego dentro: hasta la mitad no entra en la casa) y **todo el metraje de recorrido** (ni un segundo en común con ninguna versión).

### El registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | V3 · 019 | V4 · 020 | V5 · 021 |
|---|---|---|---|---|---|
| Canción | ~~*Time*~~ | ~~*Return to Oasis*~~ | ~~*Flying Into the Sun*~~ | ~~*Sax for the Last Customer*~~ | ~~*Amélie*~~ |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~HK05~~ | ~~HK03~~ | ~~HK06~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~MD08~~ | ~~MD14~~ | ~~MD01~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~CT05~~ | ~~CT06~~ | ~~CT02~~ (2.ª mitad) |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~DR152~~ | ~~DR156~~ | ~~DR154~~ |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | RC09 · RC13 · RC16 (+ RC25) | RC22 · RC02 · RC05 · RC09 · RC13 · RC04 | RC10 · RC11 · RC12 |

**Libres para una V6:** hooks HK01 · HK01a · HK01b (con «ven, te enseño» dudosa) · HK04 (lleva «317») · HK08 (lleva el precio) · HK09 · HK10; mitades MD01a · MD02 · MD03 · MD04 · MD05 · MD06 · MD10 · MD11 · MD12 · MD13 (con el aviso de cada una en el registro); CTA **CT03** (precio) y **CT04** (nombra a ALH): **ya no queda ninguno limpio**, ver abajo; drones DR148 · DR149 · DR150 · DR151 (la torre vecina con malla negra) y DR153; canciones: el resto del catálogo (las medidas, en el registro y en el apéndice de `analisis-uso.md`; el relevo de *Amélie*, *Children*, con su caída de 22 dB, sirve para otra pieza de piano). Recorridos sin usar: RC14 · RC15 · RC17-RC21 · RC23 · RC24 · RC26; y ventanas libres dentro de los usados: RC10 (0-8,4 s: el deck, 0-2,67 s, ya no se usa en la rev. 2), RC11 (6,97-7,0 y 13,23-14,68 s), RC12 (10,57-10,67 s), RC03 (0-4,4 s), RC05 (5,9-7,5 s), RC07 (4,6-11,4 s), RC04 (2,2-9,5 s: baja por un marco oscuro hacia los 2,5 s) y RC16 (0-20,6 s: lleva a Isabella).

**⚠ El CTA ya no tiene salida limpia.** La V5 gastó el último CTA que no llevaba el precio ni el nombre de ALH, y lo hizo RECORTANDO una toma con precio (decisión del usuario, 2026-10-04). Para una V6 quedan: **CT03** («Está disponible por 3.550 millones, escríbeme y ven a conocerlo»: la misma segunda mitad que CT02, en el PATIO y sin cola: 0,32 s), **CT04** (ALH), o **repetir** uno (el menos reciente es CT07, de la V1). Si el recorte de la V5 se aprueba, CT03 recortado es el siguiente paso natural; si se prefiere CT04, hay que confirmar antes que ALH se puede nombrar.

## 2. V5 al detalle

### 2.1 El guion: tres frases de Isabella

| Bloque | Toma | Lugar | Dice | Ventana de voz (s del clip) | LUFS |
|---|---|---|---|---|---|
| 2 · hook | **HK06** `1 Hooks/Hook6.MOV` | `TERRAZA` | «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | 0,59 → 5,01 | −22,26 |
| 4 · mitad | **MD01** `2 Mitad/Medio1.MOV` | `BARANDA` | «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.» | 1,25 → 7,15 | −24,86 |
| 6 · CTA | **CT02** `5 Cta/CTA2.MOV` (solo su 2.ª mitad) | `BALCON` | «(317 metros cuadrados en obra gris por 3.550 millones,) escríbeme y ven a conocerlo.» | 5,82 → 7,49 | −22,0 |

Arco: **promesa → tesis → invitación**. **Ninguna cifra** en toda la pieza: lo que hay entre paréntesis en el CTA no suena (el WAV de la voz empieza a los 5,73 s de su toma, dentro de la pausa de 210 ms que sigue a «millones,»).

### 2.2 Los once planos

La tabla completa (clip, tramo en segundos, `en`, `dur`, golpe, entrada y encuadre de cada plano) está en [`artefactos/03-timeline.md`](artefactos/03-timeline.md). Resumen por bloque:

| Bloque | Planos (`id` → clip, tramo) | Golpes de los cortes |
|---|---|---|
| 2 · hook | `c02-hook` → HK06, 0,00-5,53 s (a corte en el frame 0; voz desde f18; sale por una disolvencia f154-166) | 3 (apertura de la canción) |
| 3 · el paseo, fuera | `c03-piscina` → RC11, 2,70-6,97 · `c04-dron` → DR154, 2,00-7,23 · `c05-baranda` → RC10, 8,40-11,83 | — (disolvencia) · 294 · 451 |
| 4 · mitad | `c06-mitad` → MD01, 1,17-7,70 s (disolvencia f542-554; voz desde f556; sale por una disolvencia f738-750) | 554 |
| 5 · adentro | `c07-corredera` → RC11, 9,67-13,23 · `c08-alcoba` → RC12, 0,40-4,53 (disolvencia f845-857) · `c09-vista` → RC12, 4,53-10,57 (la misma toma, partida en el golpe del f981) | — (disolvencia) · 857 · 981 |
| 6 · CTA | `c10-cta` → CT02, 5,73-7,97 s (disolvencia f1150-1162; voz desde f1165) · `c11-cierre` → la tarjeta oscura | 1162 · — |

**Qué comparte con la V1, la V2, la V3 y la V4 en metraje:** nada. Dos clips ya habían salido, con otra ventana: RC10 (la V2: 4,0-8,4 s; aquí 8,4-11,83 s) y RC11 (la V2: 0,4-2,6 y 7,0-9,2 s; aquí 2,7-6,97 y 9,67-13,23 s).

Hashes (sha256, 8 primeros) de los originales, en `proyectos/021/normalizar.mjs`: HK06 `127d2fc3` · MD01 `bdf81b78` · CT02 `ccd91d47` · RC10 `1ebd08b6` · RC11 `942426d0` · RC12 `fe277de5` · DR154 `ffcdb93e` · música `8a845ebc`. RC14 (`456f37e9`), RC15 (`bd74ad18`), RC03, RC04, RC05 y RC07 se copiaron para mirarlos y se quitaron de la receta: no están en el plan.

### 2.3 La música

***Amélie* (reimagined)** — Andrea Vanzo · `Music/Andrea Vanzo - Amélie - Comptine d’un autre été, l’après-midi (reimagined).mp3` (copia en `proyectos/021/original/musica-amelie.mp3`) · Mi menor · rubato ~95 · piano neoclásico · 3:16.

- **Entrada en 134,967 s** (`INICIO_MUSICA = 4049/30`; 42 ms antes de su golpe de 25,5 dB en 135,009 s, el más fuerte de las pistas libres, tras un respiro). `buscar-entrada.py` propuso 135,009 s con una caída de 14,8 dB a +40 s.
- **Va por golpes, no por pulso** (`rejilla.py`: 53 % de los golpes fuertes a ≤ 15 ms de la mejor recta de 0,316 s, desvío 33 ms). Los **golpes medidos** (`musica/golpes-021.json`) son la rejilla y la puerta comprueba que cada plano que entra en uno lo hace a ≤ 1 f de donde SUENA. Un piano da golpes de 8-15 dB (el jazz de la V4, 14-26 dB): se comprobaron sobre el audio del render (`golpes-render.py`): todos a ≤ 0,5 f.
- **Resolución = el decaimiento natural**: plana a −17,6 LUFS durante 40 s y, desde los 175 s (f1203), cae a −26,5 LUFS en 5 s y a −40,4 en 10. La voz del CTA va de f1165 a f1215: el piano empieza a caer a mitad de su frase y su cola suena sobre la imagen que funde a negro y bajo la tarjeta, apagada en línea recta hasta f1287.
- **El sitio de cada cosa en la canción:** 135,009 → el golpe de apertura, con Isabella al fondo del hook · 144,702 → el dron · 149,960 → la barandilla · 153,394 → Isabella (mitad) · 163,493 → la alcoba · 167,600 → la segunda mitad de la alcoba (la ventana) · 173,630 → Isabella (CTA) · **175 → el decaimiento**.
- **Un tema por pieza, de principio a fin.** La música NO sale de una librería con licencia verificada (§4).

### 2.4 La mezcla (medida sobre la prueba)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −20,7 · −19,9 · −20,3 LUFS con la música debajo (objetivo −21; una ganancia por toma: +1,3 · +3,9 · +1,0 dB) |
| Música sola | −15,3 (bloque 3) · −14,8 (bloque 5) LUFS (plana, como la canción) |
| Música bajo la voz | −16 dB (≈ −30,9 LUFS: 9,9 LU bajo ella) |
| Música bajo la tarjeta | la cola del piano, −30,8 LUFS en los 1,9 s de tarjeta (el decaimiento y la envolvente a cero en f1287) |
| Pieza entera | **−16,2 LUFS** integrados · pico real −1,8 dBFS · LRA 7,0 LU |

### 2.5 El texto

- **Rev. 2: la primera toma lleva texto** (excepción a la regla fija, por encargo): el primer subtítulo entra en el f16, dos frames antes de que Isabella diga «Mira» (f18).
- Todo lo que dice Isabella, **abajo**, en subtítulos editoriales (Montserrat 45 px y Playfair Display itálica **91 px**, sin sombra), **a 90 % de opacidad**, con el velo de las versiones anteriores (alfas 0,62 / 0,34). 13 líneas en 5 bloques, 4 acentos, todos de una palabra: **separadas.** · **frontera** · **arquitectura.** · **escríbeme**.
- **Nunca el sello «PROPIEDADES LUXUR».** El cierre es la tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`.
- Los tiempos de las 13 líneas están llevados a su palabra con la voz SOLA (`herramientas/lineas-vs-onsets.py`: entre 1,0 y 2,5 f antes).

### 2.6 Lo que NO se usó (y por qué)

Ver `artefactos/01-plan.md` («Material que NO entra»): lo tachado, RC07, RC04, RC03 y RC05 (vistas ya gastadas o sin falta), RC14 y RC15 (solo concreto), los drones con la torre de malla negra, CT03 y CT04, ningún SFX, ninguna `velocidad` ≠ 1, ninguna segunda canción.

### 2.7 La final (R22)

**Exportada el 2026-10-04 por orden del usuario («renderiza en buena calidad»), con una palabra sin cerrar al oído** (`revisar-021.mjs --final` falla por la nota de «Mira»; se avisó al usuario dos veces y contestó «renderiza»: no se bloqueó la orden, y la nota se queda).

| Archivo | Qué es |
|---|---|
| `finales/021-recorrido.mp4` | master: CRF 12 `slower`, audio AAC 320 kb/s, 1080×1920 · 30 fps · BT.709 en las dos capas (átomo `colr` y VUI 1/1/1) · 160 MB |
| `finales/021-recorrido-crf16.mp4` | la versión ligera: CRF 16 `slow`, misma imagen y mismo audio · 88 MB |
| `finales/021.srt` | los 13 cues de los subtítulos para la pista de captions de la plataforma |

- **Etiquetas de color** arregladas SIN pérdida en cada vídeo por separado (`h264_metadata` + `+write_colr`): el decodificado de vídeo (`framemd5`) y el PCM del audio dan el mismo md5 antes y después en los dos; y el audio de los dos es el mismo bit a bit.
- **El color de la final contra stills a escala 1** (`medir-final.py`, 9 fotogramas): master Δ color medio ≤ 0,35 niveles y PSNR de baja frecuencia ≥ 48,3 dB (bruto medio 42,5 dB, mín 39,9); CRF 16: ≤ 0,43 y ≥ 47,3 dB (bruto 40,7, mín 39,5). Ningún fotograma fuera de los topes.
- **Sonoridad:** −16,2 LUFS integrados · pico −1,8 dBFS · LRA 7,0 LU, igual que la prueba.
- **Palabra sin cerrar:** «Mira»/«Mirá» (HK06, **0,6 s** del vídeo): se oye «mirá» (acento en la 2.ª sílaba) y se pintó «Mira». Si quiere «Mirá»: el texto del primer trozo de `h01`, `voz/hook.txt`, el `dice` de `c02-hook`, el `.srt` (cue 1) y repetir los dos renders (≈ 10 min).

## 3. Cómo cambiar cada pieza (para una V6)

| Quiero cambiar… | Dónde | Ojo |
|---|---|---|
| un **hook / mitad / CTA** | `normalizar.mjs` (añadir el original, sha, y ejecutarlo) · `metraje-021.ts` (`src`, `desde`, `voz` con `s0`/`s1`/`lufs`/`dice`, y `entra`) · `voz/*.txt` · `subtitulos-021.ts` · `herramientas/lineas-vs-onsets.py` (`TOMAS` y `LINEAS`) · `revisar-021.mjs` (`LUGAR` en 2b y la tabla `ANTES`) | mide la voz con `limites-voz.py` (no con whisper, R29); lleva cada línea a su onset (`onsets-voz.py`, `palabras-desde.py`, `lineas-vs-onsets.py`). **Una toma con ≥ 0,43 s de aire antes de su primera palabra entra con disolvencia** (`entra: "disolver"`, `desde` = **2-3 f antes** de su primera palabra para que el golpe en que acaba la disolvencia suene antes de la voz); sin ese aire entra a corte con `desde` = `round(s0·30) − 3`. **Un CTA recortado** (la V5): `desde` y `s0` van DESPUÉS de la pausa que sigue a lo que no debe sonar (aquí 5,6 s de CT02) y la puerta lo comprueba en 2b. Un acento de **una sola palabra**: dos largas las encoge el motor |
| la **canción** | `normalizar.mjs` (`MUSICA`) · `metraje-021.ts` (la tabla `GOLPE`, `INICIO_MUSICA` a un frame, `DECAE`) · `musica/golpes-021.json` (`medir-pista.py --json` **con una ventana que empiece ≥ 1 s antes de la entrada**: con `--desde` justo en el golpe el detector no lo ve) · `audio-021.ts` (`LUFS_MESETA`, y la envolvente de la resolución) · `revisar-021.mjs` (la sección 5) | `buscar-entrada.py` busca la entrada **y una caída**; una pista de piano rubato no tiene pulso (`rejilla.py`): la rejilla son los golpes medidos y el decaimiento final es la resolución; **comprueba sobre el audio del render que cada corte seco cae en un golpe que suena** (`golpes-render.py`) |
| el **arranque de un plano** | su `desde` en `metraje-021.ts` (segundos de la fuente, escrito como `fr(n)`) | la disolvencia pide 12 f de clip ANTES de `desde`; la puerta mide el metraje disponible y que ningún tramo se repita. **Mira dónde ACABA el plano y qué luma tiene el siguiente**: el corte de la corredera (RC11) a la alcoba (RC12) daba +12,7 niveles y se pasó a disolvencia |
| la **apertura** | **no hay** (rev. 2). Si se quiere una: un plano `c01` de la casa, sin voz ni texto, a corte, de ≤ 3,5 s; poner `ABRE_CON_EL_HOOK = false` en `revisar-021.mjs`; subir el hook a `en` = la duración de ese plano (disolvencia que acabe en un golpe: la rev. 1 usó f80) y recortar la piscina y el dron lo mismo. El plan de la rev. 1, `artefactos/rev1-metraje-021.ts.txt` | la puerta (con `ABRE_CON_EL_HOOK = false`) exige el bloque 1, a corte, solo y de ≤ 3,5 s |
| el **color de un plano** | su línea `color:` en `metraje-021.ts` | topes de la puerta: `vibrance` ≤ 0,05 · \|`exposure`\| ≤ 0,4 · `saturation` 0,95-1,12 y ≤ 1,06 en Isabella; mídelo con `medir-color.py` (antes/después con el mismo backend de GL). **Las dos mitades de la alcoba (c08, c09) llevan el MISMO color** |
| el **dron** | `c04-dron` (`src`, `desde`) | la puerta exige UN dron y que sea el plano CENTRAL del bloque 3 |
| la **música sí/no** | `HAY_MUSICA` en `audio-021.ts` | `false` = la pieza sale solo con voz y se pierde el decaimiento |

Receta completa y orden de pasos: `proyectos/017/combinaciones.md` §4 (las rutas son las de este proyecto) y `.claude/skills/recorrido-luxur/montaje.md`.

## 4. Por confirmar

- **Cuatro cosas sin oír** (medidas, no confirmadas; `node proyectos/021/revisar-021.mjs --final` falla mientras la nota de «Mira» siga):
  - **«Mira» / «Mirá»** (HK06, ≈ **0,6 s** del vídeo): se pinta «Mira». Whisper oye «Mirá»; midiendo, el acento cae en la 2.ª sílaba (+6 dB, +30 Hz, 170 ms frente a 120): se oye «mirá» (voseo). Es una decisión de escritura. Si quieres «Mirá»: el texto del primer trozo de `h01`, `voz/hook.txt` y el `dice` de `c02-hook`.
  - **«patios y vacíos»** (MD01, ≈ **18,6-19,8 s**) y **«entre interior»** (MD01, ≈ **21,7-22,9 s**): cerradas por medida (3 cortes de la toma cada una), sin oír.
  - **«escríbeme»** (CT02, ≈ **38,8-39,4 s**): cerrada por medida (cortes desde 5,70 y 5,80 s), sin oír.
- **Licencia de la música** (*Amélie*, de la biblioteca de Luxur; un arreglo de Yann Tiersen): no verificada. Para publicar, la biblioteca de la plataforma, la licencia confirmada, o `HAY_MUSICA = false`.
- **La canción, sin oír.** Todo lo que se decidió de ella (que un piano plano a −31 LUFS no compita con la voz, que el golpe de apertura suene bien como primera nota, que el decaimiento resuelva bien bajo el CTA) está **medido, no oído**.
- **La regla fija rota (rev. 2):** la primera toma lleva voz y texto. Es lo que se pidió («elimina la primer toma y empieza con el hook»); queda dicho aquí, en `01-plan.md` y en cada pasada de la puerta.
- **La miniatura:** el frame 0 es Isabella pequeña al fondo del pasillo de vidrio (la toma entera de HK06 empieza así); si se prefiere una cara más grande, `desde` más tarde (cada 10 f la acerca) a costa de recortar su entrada.
- **El CTA recortado, a la vista y al oído:** que el corte a media frase no se note y que 1,7 s de voz basten como invitación.
- **El canal del CTA** (DM o WhatsApp).
- **El color de la piel en la mitad:** Isabella está a contraluz (el cielo detrás): la caja de piel de la medida sólo recoge 20 píxeles, así que no hay medida fiable del tono; los otros dos planos con ella quedan a ≤ 0,6° de lo que eran.
- **Un solo atajo de la puerta:** no cruza `lineas-vs-onsets.py` ni `medir-color.py` con el plan (como las anteriores): si cambia una línea o un plano, se cambian allí también.
