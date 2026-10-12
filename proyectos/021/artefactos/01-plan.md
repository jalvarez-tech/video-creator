# 01 · Plan narrativo — proyecto 021

> Paso 1 de 3. Se escribe **antes** de tocar Remotion (aquí, con los supuestos declarados).
> Siguiente: [02-layout.md](02-layout.md).

## Encargo (literal)

> «Haz una versión nueva (la V5) del reel de una propiedad de Propiedades Luxur. Empieza por ANALIZAR qué canciones y qué combinaciones se han usado ya; solo después eliges, reservas y montas. […] Propiedad: Los Patios (apto 501). […] Pedido específico de esta versión: ninguno.»
> Después de leer el análisis: «es V5, utiliza una nueva cancion tipo piano». Y, al preguntarle por el CTA (los tres libres tenían un problema): **«Recortar CT02 a “escríbeme y ven a conocerlo”»**.
> **Revisión 2, tras ver la prueba: «elimina la primer toma y empieza con el hook».**

Es la **quinta versión** del reel: el 017, el 018, el 019 y el 020 quedan como estaban y esta pieza es un proyecto nuevo, copiado del 020 (la última). Se trabajó en un worktree propio (`.claude/worktrees/reel-021`, rama `feat/reel-021-dentro-y-fuera`). El análisis previo está en [`../analisis-uso.md`](../analisis-uso.md) y la reserva, publicada en `archivos/musica/registro-de-uso.md` (commit `daae691`).

### Cómo se leyó (supuestos declarados — corregibles)

| Frase | Lectura |
|---|---|
| «una nueva canción tipo piano» | **Nueva** = ninguna de las cuatro tachadas. De las 39 libres se midieron todas con `buscar-entrada.py` (golpe de entrada ≥ 9 dB y caída donde entra el CTA); las de piano son *Armin van Buuren – Children*, *Andrea Vanzo – Amélie (reimagined)*, *Here For You*, *Maison*, *Silver Skies*, *Einaudi Fly*, *Einaudi Experience*, *Nils Frahm – Familiar*, *Spring is Coming* y *Yeshua*. Gana ***Amélie***: el golpe de entrada más fuerte de las libres (25,5 dB) y una resolución que cae sola donde entra el CTA. *Children* queda de relevo. **No la he oído.** |
| «analiza primero» | `analisis-uso.md` (9 fuentes, 4 canciones usadas, tabla de combinaciones, lo que queda y la propuesta) y reserva publicada ANTES de montar. |
| «los cinco libres: canción, hook, mitad, CTA y dron» | **HK06 · MD01 · CT02 · DR154 · *Amélie***. Ninguno estaba tachado ni reservado en ninguna fuente (la V4 reservó HK03, MD14, CT06, DR156 y *Sax for the Last Customer*). |
| «la apertura distinta de la de la última versión» | La V4 abrió por la calle (RC22); la V3, por la fachada (RC25); las V1 y V2, con un dron. **Rev. 1:** abría por el deck (RC10, 0-2,7 s). **Rev. 2 (pedido del usuario): no hay apertura de la casa; la pieza empieza con el hook, con Isabella en el frame 0.** Es distinta de todas las anteriores, pero **rompe la regla fija «la primera toma sale sin texto ni voz»** (declarada en la puerta, `ABRE_CON_EL_HOOK`). |
| «tres sitios distintos y como mucho una cifra» | `TERRAZA` · `BARANDA` · `BALCON`, y **ninguna cifra** en toda la pieza. La terraza nunca había sido hook y la barandilla nunca había sido mitad; el balcón sí fue el CTA de la V2 (declarado). |
| «el CTA: ni el precio en el bloque 6 ni repetir» | CT02 ENTERO dice «317 metros cuadrados en obra gris por 3.550 millones, escríbeme y ven a conocerlo»: lleva el precio y el «317». **Decisión del usuario:** usar **solo su segunda mitad**. La toma entra a media frase (a los 5,73 s de su clip, en la pausa de 210 ms que sigue a «millones,») y ni el precio ni el «317» suenan, se leen ni se ven. La voz del CTA dura 1,7 s. |
| «ninguna palabra dudosa sin cerrar» | HK06 y MD01 traían avisos que el registro no anotaba (el catálogo sí): «Mira»/«Mirá», «patios y vacíos» y «entre interior». **Se midieron** (ver «Por confirmar»): dos quedan cerradas por cortes de la toma; «Mira» es una decisión de escritura y queda marcada «POR CONFIRMAR AL OÍDO» (`revisar-021.mjs --final` falla hasta que se cierre). |
| «una sola canción, rejilla de pulso, de frases o de golpes, resolución donde entra el CTA» | Sin pulso: va por golpes de nota. Resolución: **la canción decae sola** desde los 175 s (f1203), dentro de la toma del CTA. Ver «La canción». |
| «el recorrido sale del sitio del hook, sin volver atrás; recorridos sin usar» | **Sentido II** (terraza → ventanal). Seis clips de recorrido y dron: RC12 y DR154 nuevos del todo, RC10 (solo 8,4-11,83 s) y RC11 con ventanas que ninguna versión usó; **no se comparte ni un segundo de metraje** con ninguna versión (la 9b de la puerta lo mide con la V1, la V2 y las instantáneas de la V3 y la V4). RC10 sale una vez (8,4-11,83 s; en la rev. 1 salía también la apertura). |
| (reglas fijas, heredadas) | ~~La primera toma sin texto ni voz~~ (**rota por encargo en la rev. 2**) · nunca el sello «PROPIEDADES LUXUR» · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`, nada congelado · subtítulos editoriales abajo al 90 % con la cursiva 8 px menor · voz a −21 LUFS, música sola a −15 y −16 dB bajo la voz · color por plano con `colorCorrection()` · solo corte y disolver. |

## Registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | V3 · 019 | V4 · 020 | **V5 · 021** |
|---|---|---|---|---|---|
| Canción | ~~*Time*~~ | ~~*Return to Oasis*~~ | ~~*Flying Into the Sun*~~ | ~~*Sax for the Last Customer*~~ | ~~***Amélie***~~ (134,97 s) |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~HK05~~ | ~~HK03~~ | ~~**HK06**~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~MD08~~ | ~~MD14~~ | ~~**MD01**~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~CT05~~ | ~~CT06~~ | ~~**CT02** (2.ª mitad)~~ |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~DR152~~ | ~~DR156~~ | ~~**DR154**~~ |
| Apertura | dron DR147 | dron DR155 | fachada RC25 | la calle RC22 | **ninguna: abre el hook** (rev. 1: el deck RC10) |
| Dron (posición) | inicio | inicio | tras el hook | último del bloque 5 | **el central del bloque 3** |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | RC09 · RC13 · RC16 (+ RC25) | RC22 · RC02 · RC05 · RC09 · RC13 · RC04 | **RC10 · RC11 · RC12** (ventanas sin tocar; RC10 solo la barandilla) |

## Cabecera

| | |
|---|---|
| Material | `proyectos/021/original/` (HK06, MD01, CT02, RC10, RC11, RC12, DR154 y la canción; RC14, RC15, RC03, RC04, RC05 y RC07 se copiaron para mirarlos y se quitaron de la receta) copiados del SSD del rodaje con su código del catálogo; los sha256 de cada uno, en `normalizar.mjs` (los de RC10 y RC11 coinciden con los de la V2: es el mismo archivo). Normalizados a `remotion/public/recorrido-021/`. Catálogo: `proyectos/017/catalogo-material.md` |
| Composición | `Recorrido021` · 1080×1920 · **30 fps** · **1289 f (42,97 s)**, igual que la rev. 1 *(el deck de 2,67 s se compensó alargando el hook —ahora entero, 5,5 s—, la piscina y el dron)* |
| Formato | 9:16 vertical · los seis bloques de `recorrido-luxur` |
| Estilo | **cinematográfico-lujo**: solo `corte` y `disolver`; la cámara ya se mueve (gimbal, dron), así que ningún plano se acelera; empuje lento solo sobre Isabella |
| Texto | **editorial** (el modo de Luxur): solo lo que dice Isabella, abajo y a 90 %. **Rev. 2: la primera toma (el hook) lleva texto desde el f16**, por encargo. Sin `<PistaGraficos>` (R14) |
| Marca | Luxur: el **logo** (440 px, 60 % de opacidad) y la **web `PropiedadesLuxur.com`**, **solo en el cierre**, sobre una tarjeta oscura. Nunca el sello ni la cuenta escrita |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que el espectador vea que en Los Patios «dentro» y «fuera» son lo mismo, y escriba |

## Promesa y CTA

- **Promesa (primeros 5,5 s):** el reel **empieza con el hook**, a corte, en el frame 0: Isabella al fondo, junto a la ventana, camina hacia la cámara y cruza el umbral desde el interior hacia la terraza. El golpe de apertura de la música (el más fuerte de la canción, 25,5 dB) suena en el f3 y su primera palabra, 15 f después (f18), con la música ya abajo: «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas». *(La rev. 1 abría con 2,7 s del deck, limpio y sin voz; el usuario pidió quitarlo.)*
- **Acción que se pide al final:** «Escríbeme y ven a conocerlo» (CT02, solo su segunda mitad). **Un solo paso** y el canal NO está dicho: el cierre lleva el logo y la web. ⚠️ Pendiente (el mismo del 017-020): ¿DM o WhatsApp?
- **Lo que NO se cuenta:** precio, 317 m², áreas, alcobas, administración, plazos, ALH; **ninguna cifra**. La obra gris se enseña tal cual (la alcoba), porque la pieza es honesta con ella.

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Lugar | Dice | Papel |
|---|---|---|---|---|
| 2 · hook | **HK06** | `TERRAZA` | «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas.» | curiosidad con prueba visual (ángulo B): el gesto (cruzar el umbral) ES el argumento |
| 4 · mitad | **MD01** | `BARANDA` | «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura.» | la tesis de diseño que acompaña a HK06 según el catálogo: la arquitectura borra el límite entre dentro y fuera |
| 6 · CTA | **CT02** (2.ª mitad) | `BALCON` | «(317 metros cuadrados en obra gris por 3.550 millones,) escríbeme y ven a conocerlo.» | invitación sin dato: lo que está entre paréntesis NO suena |

Arco: **promesa → tesis → invitación**. Leído en voz alta: «mira lo que pasa cuando arquitectura y naturaleza no están separadas» → «los patios y los vacíos hacen desaparecer esa frontera» → «escríbeme y ven a conocerlo». Las imágenes dicen lo mismo: la terraza, la piscina, el edificio entero con sus jardines y la barandilla (fuera); la corredera y la alcoba hasta su ventanal (dentro).

## Escenas

La canción es *Amélie*: **sin pulso, por notas**. Un golpe de apertura de 25,5 dB tras un respiro, una meseta plana de −17,6 LUFS durante 40 s con una nota fuerte cada 1-5 s y un **decaimiento final** (−26,5 LUFS a los 5 s y −40,4 a los 10) que empieza en el f1203. Cada plano que entra en un golpe lo hace en uno MEDIDO (`musica/golpes-021.json`).

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Música |
|---|---|---|---|---|---|
| 1 | 0–5,53 | hook | Isabella cruza el umbral hacia la terraza: «Mira lo que ocurre cuando arquitectura y naturaleza dejan de estar separadas»; abre la pieza a corte | Isabella | el golpe de apertura (f3, 25,5 dB) suena a su nivel hasta el f8 y baja hasta su primera palabra (f18): ≈ 10 LU bajo su voz |
| 2 | 5,53–18,47 | descubrimiento | la piscina y la columna (4,3 s), el edificio entero con sus jardines (5,2 s, dron) y la barandilla con el skyline (3,4 s) | recorrido | arriba; cortes en 294 · 451 |
| 3 | 18,47–25,00 | conexión | Isabella en la barandilla: «Los patios y vacíos hacen desaparecer esa frontera entre interior, paisaje y arquitectura» | Isabella | abajo |
| 4 | 25,00–38,73 | intimidad → recompensa | la corredera que cruza hacia dentro (3,6 s), la alcoba de la puerta de vidrio a la pared de ladrillo (4,1 s) y, el más largo, la misma alcoba hasta su ventanal esquinero (6,0 s) | recorrido | arriba, plana; golpes en 857 · 981 |
| 5 | 38,73–42,97 | recompensa | Isabella en el balcón, apoyada en la barandilla del ventanal: «Escríbeme y ven a conocerlo»; su imagen funde a negro mientras el piano decae y cierra la tarjeta oscura con el logo y la web | Isabella | baja bajo su voz; **el piano decae solo desde el f1203** y su cola se apaga bajo la tarjeta |

**Lectura del paseo (declarada).** Sentido II del catálogo (§10.3): la terraza y el patio en un extremo y el ventanal en el otro. El hook, la piscina, el dron y la barandilla son el extremo de la terraza; la mitad habla desde esa barandilla; y luego el paseo entra (la corredera de RC11), cruza la alcoba (RC12) y acaba en el ventanal esquinero, donde está el balcón del CTA. **No hay un solo retroceso.** El dron no es un plano del paseo sino la mirada de afuera (el edificio entero), como en el 019.

## La canción: lo medido (y por qué esa)

Se midieron las 39 libres con `buscar-entrada.py --cta 33 40` (tabla completa en `analisis-uso.md`, apéndice) y, de las de piano, con `--cta 30 42`:

| Pista (piano) | Entrada | Golpe | Caída tras el CTA | Veredicto |
|---|---|---|---|---|
| **Andrea Vanzo – Amélie (reimagined)** | 135,009 s | **25,5 dB** | 14,8 dB a +40 s · decae a −26,5 y −40,4 LUFS | **elegida** |
| Armin van Buuren – Children | 170,965 / 175,883 s | 10,7 / 9,7 dB | 22,2 dB a +41,3 / +36,4 s | relevo: caída más limpia pero golpe de apertura en el umbral y solo 10 golpes que cortar |
| Here For You · Maison · Silver Skies · Einaudi Fly · Einaudi Experience · Familiar · Spring is Coming | — | 9-14 dB | 3,8-11,5 dB | descartadas: sin caída o con la meseta irregular |

**Amélie, a fondo** (`medir-pista.py`, `rejilla.py`, 3:16, Mi menor, rubato ~95):
- **Sin pulso:** la mejor recta (0,316 s, 190 BPM) deja el 53 % de los golpes fuertes a ≤ 15 ms y un desvío de 33 ms (un pulso pide ≥ 70 % y ≤ 15 ms). Es un piano tocado: la rejilla son los **golpes medidos** (15 fuertes en 50 s, uno cada 1,1 s de mediana pero con huecos de 5 s).
- **Entrada 134,97 s:** un golpe de 25,5 dB (135,009 s) tras un respiro: una nota de piano limpia como primera nota. El colchón de 42 ms antes del golpe (`INICIO_MUSICA = 4049/30`).
- **Meseta plana y decaimiento:** −17,6 LUFS sin crescendo durante 40 s (la música sola, a −15, es +2,6 dB sobre el archivo; bajo la voz, −16 dB más) y a los 175 s (f1203) el piano empieza a decaer: −26,5 LUFS en los 5 s siguientes y −40,4 en los otros 5. No hay un lecho que dure: es el **final natural** de la pista, como el acorde de la V4 pero sin acorde.
- **Dónde cae el CTA.** El CTA entra en el último golpe de la meseta (173,630 s, f1162, 9,5 dB), con la voz de f1165 a f1215; el decaimiento empieza a mitad de su frase (f1203) y la cola suena sobre la imagen que funde a negro y bajo la tarjeta.
- **Licencia:** no verificada (pista de la biblioteca de Luxur).

## Lo que comparte con la V1, la V2, la V3 y la V4

**Nada.** La sección 9b de la puerta lo mide: ni un segundo de metraje en común con la V1 (017), la V2 (018), la V3 (019, instantánea de sus tramos) ni la V4 (020, instantánea). Dos clips ya habían salido con **otra ventana**: RC10 (la V2 usó 4,0-8,4 s; aquí 8,4-11,83 s: empieza donde acaba el de la V2) y RC11 (la V2 usó 0,4-2,6 y 7,0-9,2 s; aquí 2,7-6,97 y 9,67-13,23 s). Nuevos del todo: RC12, DR154 y las tres tomas de Isabella.

## Material que NO entra (y por qué)

- **Lo tachado** (HK02, HK03, HK05, HK07, MD07, MD08, MD09, MD14, CT01, CT05, CT06, CT07, DR147, DR152, DR155, DR156, DR163, *Time*, *Return to Oasis*, *Flying Into the Sun*, *Sax for the Last Customer*).
- **RC07 · RC04 · RC03 · RC05**: las vistas del ventanal (RC07 0-4,6 s y RC04 0-2,2 s) las gastaron la V1, la V2 y la V4; RC03 y RC05 se miraron y no hacían falta.
- **RC14 · RC15** (alcoba secundaria y estudio y baño): se miraron; solo muros de concreto sin una ventana que valga la vista.
- **DR148-DR152** (la torre vecina con malla negra) y **DR153**.
- **CT02 entero, CT03 y CT04**: el precio (CT02, CT03) y ALH (CT04) quedan fuera del bloque 6; ver el CTA recortado.
- Ningún SFX (el formato no los lleva), ninguna `velocidad` ≠ 1, ninguna segunda canción.

## Derechos (para publicar, no para montar)

- **La canción es de una biblioteca cuya licencia NO se ha verificado** (*Andrea Vanzo – Amélie (reimagined)*, sha 8 `8a845ebc`; es un arreglo de una pieza de Yann Tiersen). Para publicar: la biblioteca de la plataforma, la licencia confirmada, o sin música (`HAY_MUSICA = false` en `audio-021.ts`: la pieza sale solo con la voz y se le pone el audio de la plataforma encima).

## Decisiones tomadas (y las descartadas)

- **Hook = HK06, y abre la pieza (rev. 2).** Entra a corte en el frame 0 con su toma entera (`desde` 0: 166 f): Isabella empieza al fondo y el golpe de apertura suena con ella aún lejos; su primera palabra llega 15 f después (0,59 s). Tras su última palabra le quedan 16 f de clip: **sale con una disolvencia** (f154-166) a la piscina.
- **Mitad = MD01**, en la barandilla. Avisos del catálogo cerrados por medida (abajo). Tras su última palabra le quedan 23 f de clip: sale con una disolvencia a la corredera.
- **CTA = CT02 recortado.** El plano entra en el último golpe de la meseta y se queda a 14 f de cara tras la última palabra. El WAV de su voz dura 7,9987 s, un frame menos que el vídeo: el plano usa 67 de los 68 f que le quedan.
- **El dron (DR154) en el centro del bloque 3**, no al principio (V1, V2), ni tras el hook (V3), ni al final del bloque 5 (V4). Hay poco metraje de fuera que no se haya usado (RC10 y RC11 dan 8 s en total) y el edificio visto desde arriba es lo que falta entre la piscina y la barandilla. **Esto cambia lo reservado:** el registro decía «primer plano del bloque 5»; se corrige en la fila de la V5.
- **La alcoba = RC12 entera (0,0-10,17 s), partida en dos en el golpe del f981** (c08 y c09, mismo `color`): es un solo movimiento continuo de la puerta de vidrio, con el deck todavía detrás, a la pared de ladrillo y la esquina del ventanal con las jardineras. La segunda mitad (6,0 s) es el plano más largo del bloque 5 y la vista.
- **Rev. 2 · se quita el deck (RC10, 0,0-2,67 s).** El usuario pidió empezar con el hook. El hueco de 80 f se reparte: el hook usa su toma entera (+15 f), la piscina se alarga de 115 a 128 f (RC11 2,7-6,97 s) y el dron de 105 a 157 f (DR154 2,0-7,23 s); todo lo demás (mitad, alcoba, CTA, tarjeta) queda donde estaba, a los mismos golpes, y la pieza dura lo mismo (1289 f). El único corte seco nuevo cae en un golpe de **7,7 dB** (f294: piscina → dron), el más flojo de la pieza.
- **Descartado:** abrir con un dron o con el deck (rev. 1; el usuario lo quitó); un fotograma congelado para alargar la toma del CTA (nada se congela); una segunda canción; usar RC07 (el mejor ventanal con vista) porque está gastado.

## Por confirmar

0. **La regla fija rota (rev. 2).** «La primera toma sale sin texto ni voz» (017, rev. 4 y 6) NO se cumple: el reel abre con Isabella hablando y con subtítulo desde el f16. Es lo que se pidió; la puerta lo declara y lo avisa en cada pasada. Si se prefiere que la regla vuelva a valer, la rev. 1 (con el deck) está guardada como `pruebas-720p/021-recorrido-720p-rev1.mp4` y `ABRE_CON_EL_HOOK = false` devuelve a la puerta la exigencia (el plan de la rev. 1, con el plano `c01-deck`, está en `artefactos/rev1-metraje-021.ts.txt`).
1. **«Mira» / «Mirá»** (HK06, f18, ≈ 0,6 s del vídeo): whisper escribe «Mirá» (conf. 0,28 en «Mi»). **Medido:** en «mi-ra» la segunda sílaba es 6 dB más fuerte que la primera (−11,5 frente a −17,9 dB), dura 170 ms frente a 120 y sube de 289 a 320 Hz (la primera, 268 Hz): el acento cae en la **segunda** sílaba, es decir, se oye «mirá» (voseo paisa). Se pinta «Mira» (el catálogo lo manda: «subtitular “Mira” salvo que ella lo diga con voseo a propósito»). **Es una decisión de escritura, no una duda de la palabra:** si prefieres «Mirá», es el texto del primer trozo de `h01`, `voz/hook.txt` y el `dice` de `c02-hook`.
2. **«patios y vacíos»** (MD01, ≈ 18,5-19,8 s del vídeo) — **cerrada por medida:** en la primera pasada whisper-small, sin vocabulario, oyó «partidos ibasíos»; cortada la toma desde 1,20, 1,30 y 1,40 s oye «Los patios y vacíos hacen desaparecer». **Sin oír.**
3. **«entre interior»** (MD01, ≈ 21,7-22,9 s) — **cerrada por medida:** la conf. de «entre» era 0,25; cortada desde 3,50, 3,85 y 4,40 s oye «entre interior, paisaje y arquitectura», y desde 4,56 s empieza en «interior». **Sin oír.**
4. **«escríbeme»** (CT02, ≈ 38,8-39,4 s): cortada desde 5,70 y 5,80 s whisper oye «escríbeme y ven a conocerlo»; desde 5,88, con la «e» ya perdida, «Suscríbeme». Se pinta «escríbeme». **Sin oír.**
5. **La música, sin oír.** Nada de lo que decide la canción está oído (que un piano plano no compita con la voz bajo −31 LUFS, que el golpe de apertura suene bien como primera nota, que el decaimiento resuelva bien bajo el CTA).
6. **El canal del CTA** (DM o WhatsApp).
7. **Licencia** de la canción.
8. **El CTA recortado, a la vista y al oído:** que el corte a media frase no se note (en la toma Isabella está quieta apoyada en la barandilla) y que 1,7 s de voz basten como CTA. Si no, las salidas son CT04 (ALH) o repetir un CTA.

## El color (`colorCorrection()`, la misma base que el 017-020)

Ver `03-timeline.md` («El color») para la tabla medida plano a plano.

## Revisiones

**Revisión 1 (2026-10-04).** Primera versión (su prueba: `pruebas-720p/021-recorrido-720p-rev1.mp4`): 11 planos, abría con el deck (RC10, 2,67 s, sin texto ni voz), 5 bloques de texto, 4 tramos de audio, color por plano con la base del 017 más el ajuste de cada toma.

**Revisión 2 (2026-10-04).** «Elimina la primer toma y empieza con el hook»: se quita el plano del deck y el hook abre la pieza en el frame 0 (su prueba: `pruebas-720p/021-recorrido-720p.mp4`). 10 planos (los ids no se renumeraron: `c01` ya no existe), 1289 f como antes. Cambia: el hook (`desde` 0, a corte, 166 f), la piscina (`desde` 2,7 s, 128 f), el dron (157 f, DR154 2,0-7,23 s), los subtítulos del hook (f16-154), la envolvente de la música en el hook y la puerta (excepción declarada). **No cambia** nada de la mitad, la alcoba, el CTA ni la tarjeta. **A la espera del OK** para el final.

**Final (2026-10-04).** «Renderiza en buena calidad»: master CRF 12 (`finales/021-recorrido.mp4`, 160 MB) y CRF 16 (`021-recorrido-crf16.mp4`, 88 MB), etiquetas de color arregladas en cada uno, color medido contra stills a escala 1 (Δ ≤ 0,43 niveles, baja frecuencia ≥ 47,3 dB) y `021.srt`. **Exportado con «Mira»/«Mirá» sin cerrar** (el usuario conocía la duda): la nota «POR CONFIRMAR» se queda en `subtitulos-021.ts`. Detalle en `combinaciones.md` §2.7.

**Revisión 3 de la final (2026-10-08).** «Necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»: la voz pasa de −21 a −15 LUFS (en la pieza: −14,8 · −14,9 · −14,9) con la cadena de voz tratada de la V9/V12 (graves, puerta suave, compresión 3:1, ganancia por toma y limitador a −2,5 dBFS); la imagen, el color y la música no cambian. Se re-exportaron el master (CRF 12) y la versión CRF 16; los anteriores quedan como `-rev0`. Detalle en `combinaciones.md` §2.8.
