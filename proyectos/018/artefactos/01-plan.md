# 01 · Plan narrativo — proyecto 018

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md).

## Encargo (literal)

> «Perfecto ahora selecciona otra canción, otro hook, otro video de mitad y cta y haz otro video»

Es la **segunda versión del 017** («Los Patios · apto 501»): el 017 queda como estaba y esta pieza es un proyecto
nuevo. El 017 dejó escrito cómo se cambia cada pieza (`proyectos/017/combinaciones.md` §3-§4) y las reglas del
formato; aquí se aplican tal cual.

### Cómo se leyó (supuestos declarados — corregibles)

| Frase | Lectura |
|---|---|
| «otra canción» | Otra pista de la biblioteca de Luxur, medida golpe a golpe antes de montar nada (`Music/catalogo-musica.md` + `medir-pista.py`): **«Return to Oasis»** (Aleksey Chistilin). Una sola canción de principio a fin. |
| «otro hook · otro video de mitad · cta» | Una toma distinta de Isabella en cada bloque: **HK07 · MD07 · CT01**. Tres sitios distintos (`PATIO` · `TERRAZA` · `BALCON`), ninguna cifra y ninguna toma del 017. |
| «y haz otro video» | Mismo formato (los seis bloques de `recorrido-luxur`), mismas reglas fijas del canal y mismas decisiones de las revisiones 4-8 del 017: **la primera toma sin texto ni voz, nunca el sello «PROPIEDADES LUXUR», el cierre en una tarjeta oscura con el logo (440 px, 60 % de opacidad) y `PropiedadesLuxur.com`, nada se congela, subtítulos editoriales abajo al 90 % con la cursiva 8 px menor, y el color por plano con `colorCorrection()`.** |
| (implícito) el recorrido | Cambian el hook y el sitio donde habla, así que cambia el **sentido del paseo**: del patio y la terraza hacia el interior y el ventanal (sentido II del catálogo, §10.3), no de la puerta a la terraza (sentido I, el del 017). Los planos de recorrido y el dron son otros, **salvo dos que también están en el 017**: RC07 (el ventanal de esquina; c06, 0,8-4,6 s allí, 0-3,8 s aquí como plano final del paseo: ≈ 3 s en común; es la mejor vista del material y el rincón donde habla Isabella en el CTA, y no hay otro plano de esa esquina) y, **desde la rev. 2, RC25** («Exterior edificio4», pedido del usuario: la fachada desde el suelo; 1,2-3,1 s allí, 0,0-2,7 s aquí: ≈ 1,5 s en común). |
| «música sincronizada con las tomas, baja cuando habla Isabella» (heredado del 017) | Rejilla del pulso MEDIDA sobre la canción; cada corte a ≤ 1 f de un pulso y los cortes secos sobre un golpe medido; −16 dB bajo el hook y la mitad. |

## Cabecera

| | |
|---|---|
| Material | `proyectos/018/original/` (11 clips del rodaje del 2026-10-01 + la canción), normalizados a `remotion/public/recorrido-018/` por `normalizar.mjs`. Catálogo completo: `proyectos/017/catalogo-material.md` |
| Composición | `Recorrido018` · 1080×1920 · **30 fps** · **1325 f (44,17 s)** *(montaje sin avatar: marcan la música y la voz)* |
| Formato | 9:16 vertical · los seis bloques de `recorrido-luxur` |
| Estilo | **cinematográfico-lujo**: solo `corte` y `disolver`; la cámara ya se mueve (gimbal, dron), así que ningún plano se acelera; empuje lento solo sobre Isabella y el dron de apertura |
| Texto | **editorial** (el modo de Luxur): solo lo que dice Isabella, abajo y a 90 %. **La primera toma sale sin texto.** Sin `<PistaGraficos>` (R14) |
| Marca | Luxur: el **logo** (blanco, **440 px y al 60 % de opacidad**) y la **web `PropiedadesLuxur.com`**, **solo en el cierre**, sobre una tarjeta oscura. Nunca el sello ni la cuenta escrita |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que quien lo ve piense «el lujo que busco es espacio y luz que entra», y escriba |

## Promesa y CTA

- **Promesa (primeros 3 s):** el edificio de jardines colgantes visto de cerca desde el aire, **limpio** (sin texto ni voz: la miniatura es el dron) y con el golpe de apertura de la música en el frame 0. A los 2,3 s —el pulso 4— Isabella, una figura pequeña y quieta en el patio, dice: «El verdadero lujo puede ser simplemente tener espacio para respirar».
- **Acción que se pide al final:** «escríbeme y conoce Los Patios» (CT01). El canal NO está dicho: el cierre lleva el logo de Luxur y su web. ⚠️ Pendiente (el mismo del 017): ¿DM o WhatsApp?
- **Lo que NO se cuenta:** precio, 317 m², áreas, alcobas, administración, plazos (no entran: el formato no lleva cifras en los bloques 5 y 6 y aquí no hay ninguna en toda la pieza); nada de «obra gris» (el 017 es el reel de la oportunidad; este es el del espacio y la luz).

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Lugar | Dice | Papel |
|---|---|---|---|---|
| 2 · hook | **HK07** | `PATIO` | «El verdadero lujo puede ser simplemente tener espacio para respirar.» | valor / identidad (ángulo B del catálogo): frase de marca, no ata la pieza a una cifra |
| 4 · mitad | **MD07** | `TERRAZA` | «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.» | responde a la objeción «¿y los metros?» con la relación interior-exterior (ángulos B y E, mezclados) |
| 6 · CTA | **CT01** | `BALCON` | «Si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios.» | filtro (quien busca lo diferente) + invitación + nombra el edificio |

Arco: **valor → argumento → invitación**. Leído en voz alta es una frase de tres tiempos: «lujo es espacio» → «el espacio es cómo entra el exterior» → «si buscas eso, escríbeme».

## Escenas

La canción es *Return to Oasis*: **110 BPM exactos** (0,5454 s por pulso), una meseta estable de 37 s y, al pulso 68, una **caída a un piano suelto** que se queda de lecho: ahí entra el CTA. Ver `combinaciones.md`.

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Música |
|---|---|---|---|---|---|
| 1 | 0–2,3 | hook | los jardines colgantes desde el aire, sin texto ni voz: la miniatura es el dron limpio | dron | el golpe de apertura (frame 0) |
| 2 | 2,3–7,2 | hook | Isabella en el patio: «El verdadero lujo puede ser simplemente tener espacio para respirar» | Isabella | abajo (≈ 10 LU bajo su voz) |
| 3 | 7,2–15,9 | descubrimiento | el patio y el deck: la piscina pequeña, el muro de listones con la palma, el giro hacia la columna y el skyline bajo el techo de madera; el exterior ENTRA en el encuadre | recorrido | arriba; cortes en los golpes 13, 17 y 25 |
| 4 | 15,9–21,4 | conexión | Isabella camina hacia la cámara por la terraza: «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior» | Isabella | abajo |
| 5 | 21,4–37,2 | recompensa | de la terraza al interior y al ventanal, sin volver atrás: el umbral, el espacio abierto, el muro de bloques de vidrio, la fachada del edificio vista desde el suelo y, el más largo, el cristal de esquina con la barandilla | recorrido | arriba, la meseta; la vista entra en el golpe fuerte del 61 |
| 6 | 37,2–44,2 | recompensa | Isabella, en ese mismo rincón del balcón: «Si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios»; su imagen funde a negro y cierra la tarjeta oscura con el logo y la web | Isabella | **la caída a un piano suelto**, ya bajo su voz; se apaga bajo la tarjeta |

## Material que NO entra (y por qué)

- **El resto del catálogo** (10 hooks, 13 mitades, 5 CTA, ~19 recorridos, 8 drones): se queda en el SSD y en `catalogo-material.md`.
- **HK02, MD09, CT07 y DR147/DR163**: son del 017. Se mantienen fuera para que las dos versiones no se parezcan; `combinaciones.md` dice cómo mezclarlas en una V3. (Las repeticiones de metraje son RC07 y, desde la rev. 2, RC25: ver arriba.)
- Ningún SFX (el formato no los lleva), ninguna `velocidad` ≠ 1, ninguna segunda canción.

## Derechos (para publicar, no para montar)

- **La canción es de una biblioteca de música cuya licencia NO se ha verificado** (Aleksey Chistilin, *Return to Oasis*). Para publicar: o se usa desde la biblioteca de la plataforma, o se confirma la licencia de la pista, o se publica sin música (`HAY_MUSICA = false` en `audio-018.ts`: la pieza sale solo con la voz y se le pone el audio de la plataforma encima).

## Decisiones tomadas (y las descartadas)

- **Hook = HK07**, no HK06/HK10: es el único que dice la idea del canal en una frase («el verdadero lujo… espacio para respirar») y no ata la pieza a esta propiedad; su plano es entero, simétrico y casi quieto, así que la voz tiene cara sin movimiento que compita; y habla en el PATIO, un sitio que el 017 no usó como hook. Sus 0,95 s de aire antes de la primera palabra dejan disolver al plano de Isabella (opaco en el pulso 4) justo cuando empieza a hablar.
- **Mitad = MD07**, no MD01/MD04/MD06: responde a la objeción «¿y los metros?» y su sitio (la esquina de la terraza con la columna, el muro de listones y la vegetación) es el que acaba de enseñar el bloque 3. **Su límite: es la toma más rápida (3,3 palabras por segundo)**, por encima del tope de 2,5 del formato; se acepta porque la frase es corta y los subtítulos van por trozos de 2-4 palabras.
- **CTA = CT01**, no CT02/CT04: nace en el balcón de esquina, el mismo rincón del ventanal que acaba de enseñar el plano anterior; no lleva cifras y nombra el edificio. **Su límite: la «a»/«en» de «diferente (a|en) un apartamento»** — el catálogo la dejaba en «(a)» por gramática y whisper oye «en» (0,75). Hasta la rev. 2 se pintó «a»; **desde la rev. 3 se pinta «en»**, porque la vocal de ese hueco, medida, es una [e] (ver «Revisión 3»). Sigue **por confirmar al oído**: la puerta no da la final por buena (`--final`) mientras la nota siga en `subtitulos-018.ts` y `voz/cta.txt`.
- **Canción = *Return to Oasis*** (de las candidatas, la que tiene pulso constante y meseta larga): al ser un arpegio con pulso fijo y no frases de 8 pulsos como *Time*, la rejilla es la del PULSO (una recta comprobada contra 22 golpes medidos: 12 ms de desvío medio) y los cortes grandes caen en los golpes más fuertes. Todos los cortes SECOS están sobre un golpe medido del audio del render (el del 62 no tenía ninguno y se movió al 61).
- **El paseo, en el sentido II.** El hook está fuera (patio) y la mitad en la terraza, así que el recorrido avanza hacia el interior y acaba en el ventanal donde espera Isabella: un solo viaje, sin volver atrás ni repetir un tramo (la puerta lo comprueba).
- **La vista, el plano más largo del bloque 5** (regla del formato): RC07, el cristal de esquina; 114 f (3,8 s), con un golpe fuerte (11,8 dB) al entrar. Es el rincón del balcón donde habla Isabella en el CTA.
- **Descartado:** repetir el hook escrito (la primera toma sale sin texto, regla fija); un fotograma congelado para alargar la toma del CTA (nada se congela: la imagen funde a negro y sigue una tarjeta); acelerar planos; una segunda canción.

## El color (`colorCorrection()`, la misma base que el 017)

El 017 pidió «colores vivos, balanceados y cinematográficos» y se resolvió con `colorCorrection()` de Remotion (4.0.509, ya instalada): **una base común del canal** (`COLOR_BASE`: contraste 1,10 · negros −0,06 · sombras +0,08 · luces −0,20 · blancos −0,05 · temperatura +0,03 · saturación 1,10 · vibrance 0) **y un ajuste por toma**, medido. Aquí se aplica la misma base y se ajusta cada plano a SU material con `herramientas/medir-color.py` (dos tandas de stills a media escala con el mismo backend de GL, `angle`: una sin graduar y otra con color; un fotograma a mitad de cada plano y el último/primero de cada corte seco). Tres iteraciones. Los topes de la puerta (sección 2e): `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en las tomas de Isabella.

| Plano | Ajuste sobre la base (`color: color({…})`) | Qué se corrigió | luma | saturación | quemado | aplastado |
|---|---|---|---|---|---|---|
| c01 dron | exposición −0,05 · luces −0,40 · blancos −0,12 · sombras +0,22 · negros −0,02 · saturación 1,02 | el blanco de la fachada y el cielo quemaban (1,6 %), los interiores de los balcones se hundían | 119,9 → 114,3 | 0,313 → 0,377 | 1,6 → 0,0 % | 0,6 → 3,9 % |
| c02 hook · Isabella | exposición +0,12 · sombras +0,16 · saturación 1,02 | el patio en sombra: la piel a luma 92 | 110,7 → 115,2 | 0,259 → 0,290 | 0,3 → 1,8 % | 0,8 → 1,2 % |
| c03 patio | exposición +0,16 · sombras +0,28 · negros 0 · luces −0,40 · blancos −0,12 · saturación 1,04 · temperatura 0 | el plano más oscuro (91): se sube sin quemar el cielo de la derecha | 91,4 → 94,4 | 0,343 → 0,388 | 0,5 → 1,4 % | 3,4 → 5,6 % |
| c04 giro | luces −0,28 · saturación 1,02 · temperatura −0,02 | el más cálido (R/G 1,20 por el deck y la madera): se enfría un punto | 124,3 → 124,0 | 0,361 → 0,389 | 0,3 → 0,5 % | 0,3 → 0,7 % |
| c05 techo | exposición +0,05 · sombras +0,24 · saturación 1,03 | el techo de madera se hundía | 113,4 → 115,4 | 0,345 → 0,381 | 0,1 → 0,6 % | 2,8 → 4,4 % |
| c06 mitad · Isabella | exposición +0,15 · sombras +0,20 · saturación 1,03 | la terraza en sombra | 97,0 → 100,9 | 0,237 → 0,279 | 0,0 → 0,7 % | 1,7 → 3,2 % |
| c07 umbral | temperatura 0 | la base lo calienta de más (R/G 1,16 → 1,20) | 125,9 → 127,1 | 0,271 → 0,313 | 0,1 → 0,1 % | 1,1 → 1,7 % |
| c08 pasillo | exposición −0,08 · saturación 1,12 | el hormigón gris, el menos saturado (0,196): saturación al tope de la puerta | 128,6 → 126,2 | 0,196 → 0,241 | 0,1 → 0,0 % | 0,7 → 0,9 % |
| c09 bloques | (la base) | no necesita nada | 125,8 → 126,7 | 0,244 → 0,291 | 0,0 → 0,0 % | 0,7 → 1,1 % |
| c10 fachada | exposición −0,28 · luces −0,30 · blancos −0,10 · sombras +0,12 · contraste 1,14 · saturación 1,12 · temperatura −0,02 | el plano más claro de la pieza (el cielo y la fachada al sol: luma 156): se baja sin aplanar el cielo (con luces −0,50 y blancos −0,25 salía lechoso) y se le devuelve fondo con contraste y saturación | 156,2 → 142,1 | 0,213 → 0,274 | 0,0 → 0,0 % | 0,2 → 0,6 % |
| c11 vista | exposición +0,12 · sombras +0,32 · negros +0,05 · luces −0,30 · saturación 1,08 · temperatura +0,05 | los marcos negros del ventanal aplastaban (5,6 %) y el cielo de detrás se acercaba al blanco | 103,6 → 107,6 | 0,275 → 0,326 | 0,0 → 2,3 % | 5,6 → 7,0 % |
| c12 CTA · Isabella | exposición +0,05 · saturación 1,05 | la menos saturada (0,174: hormigón claro y blusa blanca) | 126,6 → 128,7 | 0,174 → 0,201 | 0,0 → 0,0 % | 1,4 → 2,1 % |
| **entre planos** | | | media 118,6 → 118,5 · **σ 16,4 → 12,7** | media 0,269 → 0,313 (σ 0,058 → 0,059) | máx 1,6 → 2,3 % | máx 5,6 → 7,0 % |

- **La piel de Isabella se queda donde estaba** (tono de los píxeles de piel, caja a mano por toma): hook 12,7° → 11,7° · mitad 6,9° → 6,6° · CTA 5,5° → 5,3°; saturación +0,02-0,04 y valor +0,03-0,05 (más vida, no otra piel).
- **Los empalmes secos**, salto de luma entre el último fotograma de un plano y el primero del siguiente (sin graduar → graduado): c03→c04 +31,0 → +27,8 · c04→c05 −8,9 → −5,5 · c07→c08 +11,1 → +8,2 · c08→c09 +13,3 → +17,6 · c09→c10 +23,2 → +8,9 · c10→c11 −33,4 → −15,0. Son cortes entre sitios distintos sobre un golpe de música; a ojo (`pruebas-720p/color-antes-despues.png`) no se leen como un salto de color. (Los dos cortes de la fachada, c09→c10 y c10→c11, son los más suaves de la pieza: la fachada es clara y lo que la rodea no.)
- **Lo quemado y lo aplastado** quedan en ≤ 2,3 % y ≤ 7,0 % (el 7,0 % son los marcos negros del ventanal de c11, que SON negros).
- **Ampliaciones al 100 %** (stills a 1080×1920, `pruebas-720p/color-recortes-100.png`): el cielo de c10 (rev. 1: las nubes sobre el valle), el hormigón de c08, las caras del hook y del CTA y el ventanal de c11, sin bandas ni moteado (hechas en la rev. 1) y, en la rev. 2, el cielo y los jardines de la fachada de `c10` (`pruebas-720p/color-recortes-100-fachada.png`): degradado de cielo sin escalones, y la madera, las lianas y el hormigón limpios (el riesgo que enseñó el 017: `vibrance` alto pinta ruido de croma sobre el hormigón y vuelve rosadas las nubes; aquí queda en 0 y el tope de la puerta es 0,05).

## Revisiones

**Revisión 1 (2026-10-03).** Primera versión (su prueba: `pruebas-720p/018-recorrido-720p-rev1.mp4`): 13 planos, 6 bloques de texto, 4 tramos de audio, color por plano con la base del 017 más el ajuste de cada toma (`artefactos/03-timeline.md` y `combinaciones.md`). Prueba 720p lista (`pruebas-720p/018-recorrido-720p.mp4`); **a la espera del OK** para el final.

## Revisión 2 (2026-10-04) — lo que pidió el usuario tras ver la prueba

> «Cambia la toma después de 0:30 por: Exterior edificio4.MOV»

**Cómo se leyó** (supuesto declarado, corregible): «la toma después de 0:30» = **la toma que entra justo después del 0:30**. En la prueba de la rev. 1 el segundo 30 cae dentro de `c09-bloques` (el muro de bloques de vidrio, 27,4-30,6 s) y la siguiente, que entra a los **30,63 s** en el golpe del pulso 56, era `c10-cielo` (RC04 «Vista ventana y Sala»: las nubes sobre el valle). Es ésa la que se sustituye. Si lo que se quería era la de los bloques de vidrio (la que se está viendo EN el 0:30), es cambiar `c09-bloques` (RC03, f821-919) por la misma toma de RC25 y devolver el cielo a `c10`: la rev. 1 está descrita en `combinaciones.md` y su prueba, en `pruebas-720p/018-recorrido-720p-rev1.mp4`.

| | Rev. 1 | Rev. 2 |
|---|---|---|
| Plano `c10` (f919-1001, 82 f, entra a corte en el pulso 56) | `c10-cielo` · **RC04** «Vista ventana y Sala», 0,00-2,73 s: las nubes sobre el valle y el marco de la ventana que entra | `c10-fachada` · **RC25** «Exterior edificio4», 0,00-2,73 s: el contrapicado extremo de la fachada con los jardines colgantes subiendo hacia las nubes y la cámara que baja hasta las palmas |
| Color de `c10` | luces −0,30 · saturación 1,12 · temperatura +0,05 | exposición −0,28 · luces −0,30 · blancos −0,10 · sombras +0,12 · contraste 1,14 · saturación 1,12 · temperatura −0,02 (el plano más claro: 156 → 142) |
| Tiempos de la pieza | 1325 f (44,17 s) | **los mismos**: los cortes siguen en los pulsos 56 y 61, y la voz, la música y los subtítulos no se mueven |
| Metraje que comparte con la V1 | solo RC07 (3,0 s) | RC07 (3,0 s) **y RC25 (1,5 s: el `c03-fachada` de la V1 usaba 1,2-3,1 s)**; lo informa la sección 9b de la puerta |

**Por qué 0,0-2,7 s de RC25** y no otro tramo: el clip (7,7 s) empieza mirando hacia arriba, con la fachada, el cielo y las nubes, y baja despacio hasta el camino y las palmas; el catálogo marca 0-2,3 s como el contrapicado y 2,3-4 como la bajada. Se eligió el arranque (el contrapicado entero y el comienzo de la bajada, que enlaza con el ventanal) en vez de repetir el tramo de la V1 (1,2-3,1 s); comparten 1,5 s porque el clip es el mismo y la fachada es lo que tiene.

**Lo que arrastró el cambio:** `normalizar.mjs` (RC25 entra a la receta, con su sha, y RC04 sale: ya no se usa; el original sigue en `original/`); los nombres de los pulsos en `metraje-018.ts` (`P.bloques`, `P.cielo` y `P.vista` nombraban el plano ANTERIOR y ya mentían: ahora cada clave dice qué plano entra en él: `fachada`, `vista`, `cta`); el color del plano, otra vez con `medir-color.py` (tres iteraciones: la primera, luma 153 con σ de 14,6 entre planos; la segunda, con luces −0,50 y blancos −0,25, aplanó el cielo y salió lechosa; la tercera es la que queda: σ 12,7 y los dos cortes de la fachada a +8,9 y −15,0 niveles).

## Revisión 3 (2026-10-04) — «renderiza el video»

> «renderiza el video»

La orden de exportar la final llegó con **una palabra pendiente**: la «a»/«en» del CTA, que se le había señalado dos veces al usuario («hay que oírlo hacia el segundo 38,1 antes de exportar») sin respuesta. En vez de exportar con la palabra que se pintaba (una apuesta de gramática) o de bloquear la orden, **se midió** (`herramientas/formantes.py`, F1/F2 por LPC de la voz sola de CT01):

| Vocal | F1 | F2 | Dónde |
|---|---|---|---|
| la del hueco entre «te» y «un» | **≈ 605 Hz** | **≈ 2.340-2.390 Hz** | 1,77-1,83 s de CT01 (tres combinaciones de orden y ventana del LPC) |
| las /a/ de Isabella | 725-782 Hz | 1.440-1.600 Hz | «a-» y «par» de «apartamento» |

Una /a/ y esa vocal están separadas ≥ 120 Hz en F1 y ≥ 700 Hz en F2: **es una [e]** (frontal), y le sigue un segmento nasal (energía por debajo de 500 Hz y casi nada por encima de 1,5 kHz, como el de «men»). Con whisper (0,75) y esta medida, la lectura que mejor encaja es **«en»**: «diferente **en** un apartamento convencional».

| | Rev. 2 | Rev. 3 |
|---|---|---|
| Subtítulo del CTA (trozo 2 de `c01`) | «a un apartamento» (entra en f1146, con el «un») | **«en un apartamento»** (entra en f1141, 1,0 f antes de su «en», que suena a 1,77 s de CT01; mide 454 de 842 px) |
| Dónde cambia | — | `subtitulos-018.ts`, `voz/cta.txt`, el `dice` de `c12-cta` y la cabecera de `metraje-018.ts`; el `.srt` sale del mismo dato |
| El resto (imagen, voz, música, tiempos) | — | igual |
| Estado de la palabra | por confirmar | **medida, SIN confirmar al oído**: la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-018.ts` y `voz/cta.txt`, y `revisar-018.mjs --final` sigue fallando por eso (a propósito) |

**Los finales** se renderizaron por orden del usuario con la palabra en este estado (`--final` sin pasar), y se dijo en la entrega: si al oírla suena «a», se cambia el texto en los tres sitios y se re-exporta (≈ 6 min). Archivos: `finales/018-recorrido.mp4` (master a CRF 12 `slower`), `finales/018-recorrido-crf16.mp4` (CRF 16 `slow`) y `finales/018.srt`, con el mismo procedimiento que el 017 (R22: etiquetas BT.709 en las dos capas, color medido contra stills a escala 1, audio comprobado). Detalle de lo medido en `03-timeline.md`.

