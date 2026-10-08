# 01 · Plan narrativo — proyecto 019

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md).

## Encargo (literal)

> «Haz la V3 del reel del apto 501 de Los Patios: proyecto 019, composición `Recorrido019`, con las skills `recorrido-luxur` y `director-video`. La V1 es el 017 y la V2 el 018. […] Quiero otra canción, otro hook, otra mitad, otro CTA y otro dron, y una apertura distinta.»
> 1. La primera toma es `Exterior edificio4.MOV` (RC25), limpia: sin texto ni voz y con el golpe de apertura de la música en el frame 0. […] elige la ventana que mejor abra y declara lo que comparte.
> 2. El dron va DESPUÉS del hook, como primer plano del recorrido (bloque 3), no en el frame 0. Adapta la puerta […] y los `reason`.
> 3. Todo lo demás se elige NUEVO y se TACHA en el momento de elegirlo.

Es la **tercera versión** del reel: el 017 y el 018 quedan como estaban y esta pieza es un proyecto nuevo, copiado del 018 (no de las plantillas).

### Cómo se leyó (supuestos declarados — corregibles)

| Frase | Lectura |
|---|---|
| «otra canción» | De las libres, medida y escogida por una regla: **un golpe fuerte en el frame 0 y una CAÍDA sostenida donde entra el CTA** (la voz de Isabella queda a solas sobre un lecho suave, como en la V1 y la V2). Se escaneó toda la biblioteca de Luxur (43 pistas, `herramientas/buscar-entrada.py`) y se midió a fondo a las candidatas (`medir-pista.py`, `rejilla.py`): **«Flying Into the Sun»** (Aleksey Chistilin), entrada en 178,095 s. Una sola canción de principio a fin. Tabla de lo medido, abajo. |
| «otro hook · otra mitad · otro CTA» | Una toma distinta de Isabella en cada bloque: **HK05 · MD08 · CT05**. Tres sitios distintos del catálogo (`BARANDA` · `TERRAZA` · `INT-BLOQUES`) y **ninguna cifra** en toda la pieza. Ninguno repite lo tachado. |
| «otro dron» | **DR152** (el segundo revelado del edificio, el que el catálogo marca ★★★), 14,0-18,0 s: la cubierta entera con una terraza con jardín en cada nivel. |
| «una apertura distinta» + punto 1 | El frame 0 es **RC25** («Exterior edificio4»: la fachada vista desde el suelo), **sin texto ni voz**, y la música entra con su golpe en el mismo instante. Ventana **3,0-6,07 s** (el camino de grava con las palmas, la fachada subiendo a un lado): la que mejor abre sin repetir lo que ya salió. Comparte con la V1 ≈ 0,1 s (1,2-3,1 s allí) y con la V2 nada (0,0-2,7 s). Ver «Lo que comparte». |
| «el dron va DESPUÉS del hook» (punto 2) | `c03-dron` es el primer plano del bloque 3, a corte en el golpe justo cuando Isabella acaba de hablar. La puerta ya no exige «el dron en el frame 0 y solo»: exige la fachada (RC25) en el frame 0, sola y una vez, y UN dron como primer plano del recorrido. Los `reason` lo dicen. |
| «Todo lo demás se elige NUEVO y se TACHA» (punto 3) | Registro de abajo; está en `proyectos/017/combinaciones.md` §3 (el tablero), en `combinaciones.md` de esta pieza y en `archivos/musica/registro-de-uso.md`. |
| (implícito) el recorrido | El sentido del paseo sale del sitio del hook (`BARANDA`, el deck): **sentido II** del catálogo (§10.3), terraza → ventanal, sin volver atrás ni repetir tramo. Todos los planos de recorrido son clips **sin usar** en la V1 y la V2: RC09, RC13 y RC16. |
| (reglas fijas, heredadas) | La primera toma sin texto ni voz · nunca el sello «PROPIEDADES LUXUR» · el cierre es la tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`, y nada se congela · subtítulos editoriales abajo al 90 % con la cursiva 8 px menor · voz a −21 LUFS, música sola a −15 y −16 dB bajo la voz · color por plano con `colorCorrection()` · solo corte y disolver. |

## Registro de lo ya elegido (~~tachado~~ = no se vuelve a elegir)

| | V1 · 017 | V2 · 018 | **V3 · 019** |
|---|---|---|---|
| Canción | ~~*Time* — Hans Zimmer~~ | ~~*Return to Oasis* — Aleksey Chistilin~~ | ~~***Flying Into the Sun*** — Aleksey Chistilin~~ (178,095 s) |
| Hook | ~~HK02~~ | ~~HK07~~ | ~~**HK05**~~ |
| Mitad | ~~MD09~~ | ~~MD07~~ | ~~**MD08**~~ |
| CTA | ~~CT07~~ | ~~CT01~~ | ~~**CT05**~~ |
| Dron | ~~DR147~~ · ~~DR163~~ | ~~DR155~~ | ~~**DR152**~~ |
| Recorridos | RC01 RC02 RC07 RC08 (+ RC25) | RC03 RC04 RC05 RC06 RC07 RC10 RC11 (+ RC25) | **RC09 · RC13 · RC16** (sin usar) · RC25 solo en la apertura |

## Cabecera

| | |
|---|---|
| Material | `proyectos/019/original/` (8 clips del rodaje del 2026-10-01 + la canción; RC25 copiado de `proyectos/018/original/`), normalizados a `remotion/public/recorrido-019/` por `normalizar.mjs` (sha de cada uno en la receta). Catálogo completo: `proyectos/017/catalogo-material.md` |
| Composición | `Recorrido019` · 1080×1920 · **30 fps** · **1190 f (39,67 s)** *(montaje sin avatar: marcan la música y la voz)* |
| Formato | 9:16 vertical · los seis bloques de `recorrido-luxur` |
| Estilo | **cinematográfico-lujo**: solo `corte` y `disolver`; la cámara ya se mueve (gimbal, dron), así que ningún plano se acelera; empuje lento solo sobre Isabella, la fachada y el dron |
| Texto | **editorial** (el modo de Luxur): solo lo que dice Isabella, abajo y a 90 %. **La primera toma sale sin texto.** Sin `<PistaGraficos>` (R14) |
| Marca | Luxur: el **logo** (blanco, **440 px y al 60 % de opacidad**) y la **web `PropiedadesLuxur.com`**, **solo en el cierre**, sobre una tarjeta oscura. Nunca el sello ni la cuenta escrita |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que quien lo ve piense «puedo vivir en altura sin sentirme en una torre», y escriba |

## Promesa y CTA

- **Promesa (primeros 3 s):** el edificio visto desde el suelo mientras la cámara avanza hacia él por el camino de grava —los jardines colgantes subiendo a un lado, las palmas al otro—, **limpio** (sin texto ni voz: la miniatura es la fachada) y con el golpe de apertura de la música. A los 3,07 s, en un golpe de la canción, Isabella, de pie junto a la barandilla del deck con la ciudad detrás, pregunta: «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?».
- **Acción que se pide al final:** «Si encaja con lo que estás buscando, escríbeme» (CT05). El canal NO está dicho: el cierre lleva el logo de Luxur y su web. ⚠️ Pendiente (el mismo del 017 y el 018): ¿DM o WhatsApp?
- **Lo que NO se cuenta:** precio, 317 m², áreas, alcobas, administración, plazos (el formato no lleva cifras en los bloques 5 y 6 y aquí no hay ninguna en toda la pieza); nada de «obra gris» dicho (el 017 es el reel de la oportunidad y el 018 el del espacio; este es el de la altura y la luz; la obra gris se ve en la alcoba y en el recorrido, sin rotularla).

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Lugar | Dice | Papel |
|---|---|---|---|---|
| 2 · hook | **HK05** | `BARANDA` | «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | pregunta de posibilidad con contraste (ángulo E del catálogo): pone en duda la torre que acaba de verse |
| 4 · mitad | **MD08** | `TERRAZA` | «La doble altura permite que la luz y ventilación ingresen a la vivienda.» | la respuesta técnica convertida en beneficio (luz y aire); el techo de madera que se ve sobre ella ES la doble altura |
| 6 · CTA | **CT05** | `INT-BLOQUES` | «Si encaja con lo que estás buscando, escríbeme.» | invitación suave y filtro («si encaja»); una sola acción; la toma más íntima del lote |

Arco: **pregunta → cómo → invitación**. Leído en voz alta: «¿puedo vivir en altura sin sentirme en una torre?» → «sí: la doble altura deja entrar luz y aire» → «si es lo que buscas, escríbeme». Encaja con la apertura: la fachada desde abajo ES la torre que la pregunta cuestiona, y el dron que sigue (una terraza con jardín en cada nivel) es la prueba de que no se siente torre.

## Escenas

La canción es *Flying Into the Sun*: **sin pulso, por frases**. Un golpe de apertura de 10,1 dB tras un respiro, un crescendo suave de −12 a −7,8 LUFS con un golpe de frase cada 2,4-2,6 s, y a los 34,7 s una **caída de ≈ 20 dB en 4 s** a un lecho suave de −23 LUFS que dura el resto de la pieza: ahí entra el CTA. Cada plano entra en un golpe MEDIDO (`musica/golpes-019.json`).

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Música |
|---|---|---|---|---|---|
| 1 | 0–3,07 | hook | la fachada desde el suelo, sin texto ni voz: la miniatura es el edificio limpio | fachada | el golpe de apertura (frame 0) |
| 2 | 3,07–6,97 | hook | Isabella en la baranda: «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | Isabella | baja en 3 f tras el golpe del corte (≈ 10 LU bajo su voz) |
| 3 | 6,97–19,03 | descubrimiento | el dron revela el edificio entero con una terraza con jardín en cada nivel; el patio a ras de suelo y la barandilla entre las plantas | recorrido | arriba; golpes en 209 (dron), 330 (patio) y 428 (plantas) |
| 4 | 19,03–23,43 | conexión | Isabella camina hacia la cámara por la terraza: «La doble altura permite que la luz y ventilación ingresen a la vivienda» | Isabella | abajo |
| 5 | 23,43–34,70 | intimidad → recompensa | de la terraza a la alcoba por la puerta de vidrio, a Isabella de espaldas junto al muro de bloques y, el más largo, a la barandilla del ventanal con el valle y las nubes | recorrido | arriba, el crescendo; la vista entra en el golpe 875 y acaba donde empieza la caída |
| 6 | 34,70–39,67 | recompensa | Isabella en el rincón de ladrillo y bloques: «Si encaja con lo que estás buscando, escríbeme»; su imagen funde a negro y cierra la tarjeta oscura con el logo y la web | Isabella | **la caída a un lecho suave**, y la música baja siguiéndola bajo su voz; se apaga bajo la tarjeta |

## La canción: lo medido (y por qué esa)

El encargo pedía medirla, decidir si va por pulso o por frases y comprobar que su caída cae donde entra el CTA; y avisar con la tabla ANTES de montar si ninguna encajaba. **Una encaja.** El criterio fue de la pieza: un golpe fuerte (≥ 9 dB) como entrada, una meseta estable (σ ≤ 2 dB) y una caída sostenida ≥ 9 dB entre los 33 y los 40 s siguientes (el CTA entra hacia los 35 s). El escáner (`herramientas/buscar-entrada.py`, sobre las 43 pistas) dejó 25 con una caída ≥ 10 dB en esa ventana; de ellas, las del carácter del reel (sereno, luminoso, aspiracional, de la biblioteca libre) que se midieron a fondo con `medir-pista.py --png` y `rejilla.py`:

| Pista | Entrada | La caída cae a | Caída | σ meseta | Golpes fuertes | Ritmo | Veredicto |
|---|---|---|---|---|---|---|---|
| **Flying Into the Sun** (Chistilin) | **178,095 s** | **+34,7 s** | **≈ 20 dB en 4 s** (17,3 dB en la medida de 5 s) | 1,3 dB | 15 hasta la caída | **frases** (27 % de los golpes fuertes en la mejor recta; Oasis, el control: 89 %) | **elegida**: crescendo hasta +30 s (la vista cae en el clímax), caída limpia y un lecho estable de ≥ 15 s |
| Heaven on Earth | 152,691 s | +34,5 s | 9,3 dB | 0,5 dB | 37 | plana, sin arco | descartada: el «hueco» dura unos segundos y la canción vuelve a −12,8 LUFS (40-45 s): no resuelve bajo el CTA |
| Deep Breath (Chistilin) | 78,161 s | +38,5 s | 11,8 dB | 0,9 dB | 14 | frases | descartada: la caída es una bajada lenta de 7 s (de −10 a −40 dB): el CTA caería sobre un fundido |
| Begin Again | 145,196 s | +33,0 s | 18,3 dB | 0,7 dB | 19 | frases | descartada: cae a silencio (−35 dB) y a los 5 s vuelve a −7 dB con un golpe de 20,7 dB: bajo la voz del CTA |
| Utopia (Chistilin) | 141,808 s | +33,3 s | 21,2 dB | 1,6 dB | 14 | — | descartada por parecerse a *Return to Oasis* (misma artista y timbre, la V2) |
| In This Together | 167,452 s | +35,6 s | 9,7 dB | 1,6 dB | 10 | — | descartada: pocos golpes para cortar y caída corta (9,7 dB) |
| Luxury, Elegance, Refined · Fortitude (Light) · el resto de las planas | — | — | ≤ 4,7 dB | — | — | planas | no tienen caída: la «resolución» sería un duck, no una caída (como dice el catálogo, §3.6 del 017) |

Lo que NO se pudo hacer: oírla. Los números dicen dónde está cada golpe y cada caída; que suene bien como primera nota y que el lecho sea agradable bajo la voz lo dice el oído (ver «Por confirmar»).

## Lo que comparte con la V1 y la V2

La sección 9b de la puerta lo informa: **un solo clip, RC25, y solo con la V1: 0,1 s** (la V1 usó el 1,2-3,1 s en `c03-fachada`; esta pieza, el 3,0-6,07 s). Con la V2 no comparte metraje (su `c10-fachada` es el 0,0-2,7 s). Los demás planos —RC09, RC13, RC16, DR152 y las tres tomas de Isabella— son nuevos. **Por qué ese tramo de RC25:** el clip tiene dos mitades —el contrapicado extremo (0-2,5 s, el que usaron las dos versiones) y la cámara que baja al camino y avanza entre las palmas (3-7 s)—; se tomó la segunda porque (1) **avanza**, que es lo que el formato pide del primer plano («la cámara siempre avanza»), (2) no repite lo ya visto y (3) sigue diciendo «el edificio desde el suelo», que es lo que la pregunta del hook cuestiona. El contrapicado de 0-3 s habría compartido ≈ 2,7 s con la V2 y ≈ 1,9 s con la V1. Si se prefiere la imagen vertical del contrapicado: `c01-fachada` → `desde: fr(0)`, y la puerta lo informará.

## Material que NO entra (y por qué)

- **Lo tachado** (HK02, HK07, MD09, MD07, CT07, CT01, DR147, DR163, DR155, *Time*, *Return to Oasis*) y los recorridos de la V1 y la V2 (RC01 RC02 RC03 RC04 RC05 RC06 RC07 RC08 RC10 RC11).
- **RC22** («Exterior edificio»: la entrada con el rótulo «LOS PATIOS»): sin usar y propuesta en el encargo como ejemplo. No entra porque el paseo va en el sentido II (terraza → ventanal) y ese plano es la entrada a pie del edificio, que no es un tramo del paseo; además, en los fotogramas que miré el rótulo sale cortado por el follaje («PATIC…»; el DR152 lo trae también al pie entre los 6 y los 10 s, tramo que no se usa). Queda para una V4 que abra por la calle.
- **HK01·HK03·HK04·HK06·HK08·HK09·HK10, las otras MD y CT, DR148-DR151, DR153, DR154, DR156, RC12, RC14, RC15, RC17-RC24, RC26**: se quedan en el SSD (tablero en `proyectos/017/combinaciones.md` §3).
- Ningún SFX (el formato no los lleva), ninguna `velocidad` ≠ 1, ninguna segunda canción.

## Derechos (para publicar, no para montar)

- **La canción es de una biblioteca de música cuya licencia NO se ha verificado** (Aleksey Chistilin, *Flying Into the Sun*, sha 8 `ca1f1cbf`). Para publicar: o se usa desde la biblioteca de la plataforma, o se confirma la licencia de la pista, o se publica sin música (`HAY_MUSICA = false` en `audio-019.ts`: la pieza sale solo con la voz y se le pone el audio de la plataforma encima).

## Decisiones tomadas (y las descartadas)

- **Hook = HK05** (la sugerencia del encargo, y la mantengo): el catálogo lo marca compatible con el dron («se prueba visualmente con los planos de dron de la fachada llena de terrazas verdes»), y la apertura desde abajo lo prepara: la fachada vista desde el suelo ES la torre que la pregunta cuestiona. Es una pregunta de posibilidad con contraste, que selecciona sin recitar la ficha, y su sitio (`BARANDA`, el deck) fija el sentido II del paseo. **Su límite:** su voz empieza a los 0,26 s, sin los 12 f de aire que pide una disolvencia, así que Isabella **entra a corte** en un golpe de la canción (la voz, 3 f después) y sale a corte (le quedan 0,63 s de clip tras la última palabra y una disolvencia pide 14 f más el margen: no caben las dos cosas). La «y» inicial (la única duda del catálogo) está cerrada: whisper la oye desde 0,20 a 0,30 s y la energía da tres arranques (y · si · pu-).
- **Mitad = MD08**: es la pareja del ángulo E de HK05 en el catálogo (con MD07, que es de la V2); responde a la pregunta con un hecho —la doble altura— y el techo de madera que se ve sobre Isabella lo enseña. En la terraza (`TERRAZA`): sitio distinto del hook (`BARANDA`) y del CTA. No lleva cifra. **Dudas:** whisper omite el segundo «la» de «la luz y (la) ventilación» (lo marcaba el catálogo): MEDIDO, entre la «y» y el «ven-» no hay una /a/ ni una sílaba nueva → se pinta «y ventilación»; sin oír (ver «Por confirmar»).
- **CTA = CT05**: el CTA más limpio y corto (3,6 s, 8 palabras), sin cifras, sin precio (CT02 y CT03 llevan el precio y no van en el bloque 6), sin nombrar a ALH (CT04, sin confirmar que se pueda citar) y sin la «reto»/«agendar» de CT06 (dos palabras dudosas). Una sola acción. En el muro de bloques de vidrio (`INT-BLOQUES`), el rincón del ventanal que acaba de enseñar el plano anterior. **Dudas:** whisper oye «escribe a mí» donde se espera «escríbeme» (el catálogo lo marcaba): MEDIDO, tras la [e] de «-be» viene un murmullo nasal y no una /a/ → se pinta «escríbeme.»; sin oír.
- **Canción = *Flying Into the Sun*** (tabla de arriba). Es la única que da, a la vez, un golpe de apertura, un crescendo que sube a la vista y una caída limpia a un lecho donde la voz del CTA queda a solas.
- **El paseo en el sentido II**: el hook está en el deck y la mitad en la terraza, así que el recorrido va del patio al interior y acaba en el ventanal: un solo viaje, sin volver atrás (la puerta comprueba que ningún tramo se repite). El dron es un puente exterior → terraza.
- **El umbral y la vista son de clips distintos** y la alcoba (RC13) viene tras la terraza donde habló Isabella: la cámara sube los escalones del deck y cruza una puerta de vidrio en el mismo muro de ladrillo que se ve detrás de ella en MD08 (parece la misma abertura; no consta con la planta), según `viaje-emocional.md` §5: «la puerta se abre → el plano siguiente empieza dentro». RC13 enseña la luz que la mitad prometía (la ventana con plantas al fondo de la alcoba).
- **La vista = RC16 (23,2-28,8 s)**: Isabella de espaldas llega a la esquina del ventanal y se apoya en la barandilla a mirar el valle y las nubes; es el plano más largo del bloque (166 f) y el catálogo ya lo señalaba («el final de RC16 es un cierre de “vista” ejemplar»). **Lectura declarada:** Isabella sale de espaldas en el bloque 5 (4.ª aparición, muda y sin cara) y no solo en las tres paradas; es el puente humano (§3 de `viaje-emocional.md`) que lleva de la alcoba a la vista y de ahí al CTA, donde ella da la cara. Si se prefiere una vista SIN ella, no hay otra vista de ese rincón sin usar (RC04 y RC07 son de la V2).
- **Descartado:** repetir RC25 en el recorrido (el encargo lo prohíbe); RC22 (arriba); acelerar planos; un fotograma congelado para alargar la toma del CTA (nada se congela); una segunda canción; la disolvencia al entrar y salir de Isabella en el hook (no cabe: ver arriba).

## El color (`colorCorrection()`, la misma base que el 017 y el 018)

El 017 pidió «colores vivos, balanceados y cinematográficos» y se resolvió con `colorCorrection()` de Remotion (4.0.509): **una base común del canal** (`COLOR_BASE`: contraste 1,10 · negros −0,06 · sombras +0,08 · luces −0,20 · blancos −0,05 · temperatura +0,03 · saturación 1,10 · vibrance 0) **y un ajuste por toma**, medido (`herramientas/medir-color.py`, dos tandas de stills a media escala con el mismo backend de GL, `angle`: una sin graduar —`stills-antes.mjs`— y otra con color). Tres iteraciones. Los topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en las tomas de Isabella.

| Plano | Ajuste sobre la base (`color: color({…})`) | Qué se corrigió | luma | saturación | quemado | aplastado |
|---|---|---|---|---|---|---|
| c01 fachada | exposición −0,10 · luces −0,30 · blancos −0,10 · sombras +0,12 · contraste 1,12 · temperatura −0,01 | el cielo y la fachada al sol: se baja sin aplanar las nubes | 135,6 → 129,2 | 0,261 → 0,320 | 0,0 → 0,0 % | 0,2 → 0,8 % |
| c02 hook · Isabella | exposición +0,05 · sombras +0,12 · saturación 1,03 · temperatura −0,01 | la baranda en sombra; sin tirar de cálido (la piel se movía 4,4° con la base) | 123,0 → 124,7 | 0,322 → 0,362 | 0,0 → 0,1 % | 1,4 → 2,5 % |
| c03 dron | exposición +0,04 · contraste 1,06 · luces −0,35 · blancos −0,10 · sombras +0,30 · negros +0,02 · saturación 1,04 | los interiores de las terrazas se hundían (6,8 % aplastado con la base sola) | 115,4 → 115,4 | 0,296 → 0,332 | 0,5 → 0,0 % | 2,3 → 3,4 % |
| c04 patio · c05 plantas (UNA toma) | exposición +0,05 · sombras +0,22 · luces −0,42 · blancos −0,14 · saturación 1,04 · temperatura −0,02 | la madera del techo y del deck saturaba de más (R/G 1,26) y el cielo del fondo se quemaba (1,4 %) | 127,1 → 127,6 · 114,0 → 113,0 | 0,398 → 0,428 · 0,338 → 0,393 | 0,2 → 0,2 % · 0,9 → 0,0 % | 0,1 → 0,3 % · 0,7 → 1,9 % |
| c06 mitad · Isabella | exposición +0,05 · sombras +0,12 · saturación 1,03 | la terraza en sombra | 117,4 → 119,3 | 0,423 → 0,455 | 0,0 → 0,3 % | 3,1 → 4,4 % |
| c07 umbral | exposición +0,10 · sombras +0,20 · luces −0,40 · blancos −0,12 | la alcoba, el plano más oscuro (104): se sube sin quemar la ventana del fondo | 104,4 → 107,3 | 0,289 → 0,347 | 0,0 → 0,0 % | 1,1 → 2,0 % |
| c08 bloques · c09 vista (UNA toma) | exposición +0,05 · sombras +0,15 · luces −0,35 · saturación 1,08 | el hormigón gris (el menos saturado: 0,177-0,219) sube a su tope; el cielo no se quema | 131,0 → 133,1 · 121,8 → 121,0 | 0,219 → 0,251 · 0,177 → 0,211 | 0,0 → 0,0 % · 0,0 → 0,0 % | 1,4 → 1,6 % · 1,7 → 2,8 % |
| c10 CTA · Isabella | exposición −0,05 · luces −0,30 · saturación 1,03 | el ladrillo y los bloques de vidrio al sol | 125,9 → 123,9 | 0,340 → 0,379 | 0,0 → 0,0 % | 0,8 → 1,5 % |
| **entre planos** | | | media 121,6 → 121,4 · **σ 8,6 → 7,5** | media 0,306 → 0,348 | máx 0,9 → 0,3 % | máx 3,1 → 4,4 % |

- **La piel de Isabella se queda donde estaba** (tono de los píxeles de piel, caja a mano por toma): hook 10,6° → 10,1° · mitad 14,9° → 14,6° · CTA 16,3° → 16,8° (±0,5°); saturación +0,02-0,03 y valor +0,01-0,04.
- **Los empalmes secos**, salto de luma entre el último fotograma de un plano y el primero del siguiente (sin graduar → graduado): c01→c02 −6,7 → +1,3 · c02→c03 +0,9 → −1,4 · c03→c04 +11,6 → +12,0 · c06→c07 −21,0 → −20,7 · c07→c08 +20,6 → +20,1. **Los dos empalmes de una misma toma partida son invisibles**: c04→c05 −0,9 y c08→c09 +0,1 (en la V2 el mayor era +27,8). Los dos saltos grandes son la alcoba (oscura) entre dos planos claros: son cortes entre sitios distintos sobre un golpe de música y a ojo no se leen como un salto de color.
- **Lo quemado y lo aplastado** quedan en ≤ 0,3 % y ≤ 4,4 % (el 4,4 % es el deck oscuro de la mitad).
- **Ampliaciones al 100 %** (`pruebas-720p/color-recortes-100.png`): el cielo con nubes de la vista, el hormigón del techo, las caras del hook y del CTA y la fachada del dron: sin bandas ni moteado de croma (`vibrance` queda en 0).

## Revisiones

**Revisión 1 (2026-10-04).** Primera versión (su prueba: `pruebas-720p/019-recorrido-720p.mp4`): 11 planos, 6 bloques de texto, 4 tramos de audio, color por plano con la base del 017 más el ajuste de cada toma (`03-timeline.md` y `combinaciones.md`). **A la espera del OK** para el final.

## Revisión 2 (2026-10-04) — «renderiza en buena calidad»

> «renderiza en buena calidad»

La orden de exportar llegó con **dos palabras pendientes** que ya se le habían dicho al usuario en la entrega de la prueba: «y (la) ventilación» (MD08, ≈ 21,1 s) y «escríbeme» (CT05, ≈ 36,6-37,2 s). Como en el 018: no se bloquea la orden ni se exporta una apuesta; las dos están **medidas** (`formantes.py`, `onsets-voz.py`, `palabras-desde.py`; ver «Por confirmar» en `03-timeline.md`) y se pintan como se midieron, **la nota «POR CONFIRMAR AL OÍDO» se queda** y `revisar-019.mjs --final` sigue fallando por ella (a propósito: una medida no es un oído). «Buena calidad» = el master a CRF 12 `slower` y, aparte, la versión ligera a CRF 16 `slow`, con la misma imagen y el mismo audio. El plan, el color, la mezcla y los textos no cambiaron respecto de la rev. 1. Archivos y medidas: `03-timeline.md` («Finales exportados»).

## Revisión 3 (2026-10-08) — la voz de Isabella con más decibeles, sin saturar

> «Necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»

Sobre la final ya exportada (y fusionada). La voz iba a −21 LUFS sin tratar (R29: una ganancia por toma y nada más) y la música sola, a −15: sonaba ≈ 6 dB por debajo del paseo. **Cómo se leyó** (supuestos declarados): (1) «la voz cuando habla Isabella» = las tres tomas a cámara (hook, mitad y CTA); (2) «más decibeles» = hasta el nivel de la música sola, −15 LUFS, como ya se hizo en la V12 (028) y la V9 (025 rev. 1) tras el mismo pedido; (3) «sin saturar» = pico real ≤ −1 dBTP, medido; (4) la música no se toca (no se baja para que la voz suene más; el pedido es subir la voz). Con ganancia sola no se puede (las tomas crudas miden −20,7 · −17,9 · −18,9 LUFS con picos de −3,9 · −0,5 · −1,7 dBTP: a −15 darían +1,3 · +2,4 · +0,2 dBTP), así que suena la voz TRATADA, una excepción a R29 por encargo: highpass 100 Hz · puerta suave · compresor 3:1 · +14 · +13 · +14 dB · limitador a −2,5 dBFS. Resultado y medidas: `03-timeline.md` («REV. 1 de los finales»). Nada más cambió: ni la imagen, ni la música, ni los textos, ni las dos palabras sin oír. Los finales rev. 0 se guardaron como `finales/019-recorrido-rev0.mp4` y `019-recorrido-crf16-rev0.mp4`.
