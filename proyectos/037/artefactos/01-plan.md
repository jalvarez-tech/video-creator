# 01 · Plan narrativo — proyecto 037 · Casa Campestre Guarne (V20)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/037/` · puerta `node proyectos/037/revisar-037.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-09) | «Crea un reel cinematográfico que rompa el scroll para promocionar esta propiedad» con la estructura fija **Dron · Hook · Recorrido · Mitad · Recorrido · CTA**, tres frases de Isabella (hook, mitad, CTA), el hilo de **EL ERROR** (comprar mal un campestre), que ninguna versión había usado; ninguna cifra en el vídeo; ningún plano de la V13 (029), la V16 (032), la V17 (033) ni la V19 (036, en curso en otra sesión); voz de Isabella a −15 LUFS sin saturar; **piano**, una canción que no esté en ninguna otra versión; subtítulos editoriales solo mientras habla ella; color plano a plano al final. **La final SOLO con el OK del usuario** y sin commit ni push |
| Ficha | [propiedadesluxur.com · Casa Campestre en Venta con Vista Panorámica a las Montañas](https://propiedadesluxur.com/es/propiedades/guarne/casa-campestre-en-venta-con-vista-panoramica-las-montanas) (la ficha leída el 2026-10-08 para la V13; el sitio no se ha vuelto a consultar): Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá, 15 km del aeropuerto. **Nada de esto sale en el vídeo**: va en el caption |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/`: **todo 4K 16:9 a 30 fps** (el dron a 29,97), sin rotación y SDR BT.709. Se trabaja con COPIAS en `proyectos/037/original/` verificadas por sha256 (`normalizar.mjs`). Ningún clip del reel es un 1080p ampliado |
| Composición | `Recorrido037` · 1080×1920 · **30 fps** · 1004 f (33,5 s) |
| Texto | **editorial**, solo mientras habla Isabella, abajo, un acento por frase |
| Marca | Luxur. Reglas fijas: primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Número | **V20 / 037** (`ls .claude/worktrees/*/proyectos/` y `ps`: 035 y 036 ocupados, 037 libre; V21/038 la abrió otra sesión después). Worktree propio `reel-037-el-error`, rama `worktree-reel-037-el-error`, SIN commit |

## El hilo: el error, y qué toma de cada doble

Antes de montar se transcribieron por palabra las cuatro tomas candidatas del encargo con whisper small, **dos pasadas** (con vocabulario de la casa y sin él); la confianza de cada palabra es la **menor** de sus tokens. La lista completa de las palabras bajo 0,55, con el segundo exacto de su clip y del vídeo, está en [`../combinaciones.md`](../combinaciones.md) §«Palabras por confirmar».

| Pieza | Candidatas | Elegida | Por qué |
|---|---|---|---|
| Hook | HK08 `IMG_9418` (la única) | **HK08** | «El error que cometen las familias al buscar campestre.» Una sola palabra bajo 0,55, **«El»** (0,24 sin vocabulario, 0,61 con él: es la primera sílaba, casi sin energía); la palabra clave, «error», sale con 0,97-0,99 en las dos pasadas |
| Mitad | MD10 `IMG_9528` (la única) | **MD10** | «Compran lejos, se cansan del viaje, compran viejo y tienen que pagar dos veces en remodelación.» Cuatro palabras bajo 0,55 (**«Compran»** 0,12, **«cansan»** 0,22, el segundo **«compran»** 0,39 y **«tienen»** 0,46); las cuatro se cierran por un dato independiente (abajo). No hay doble |
| CTA | CT03 `IMG_9419` (1080p, ella pequeña en el sendero) · CT08 `IMG_9437` (4K, la terraza del telescopio) | **CT08** | Las dos oyen mal la palabra clave: CT03 «error» 0,05-0,08 (con vocabulario escribe «robo»), CT08 «error»/«horror» 0,33-0,42, y en CT08 dudan «No» (0,18) y «cometas» (0,43). Empatan en recuento (3 dudosas); gana CT08 porque (1) su palabra clave pesa 0,33-0,42 y no 0,05, (2) es 4K (CT03 es 1080p ampliado ×2,1, ella casi sin cara) y (3) es la toma que el reel editado de este mismo hilo (`fam 1.mp4`) ya usa |

**Cómo se cerró lo que whisper no cierra: el reel ya editado del mismo disco.** `VIDEOS EDITADOS/REDES/FAMILIA/fam 1.mp4` es un reel de otra persona con este mismo hilo y las mismas tres tomas, **subtitulado**: escribe «El error que cometen las familias al buscar casa campestre», «compran lejos se **cansan** del viaje», «viejo y» y «no cometas… haz clic en el enlace». Sirve para dos cosas que el encargo no sabía:
- **«se cansan», no «se aburren».** El encargo y el registro de uso decían «se aburren del viaje»; whisper oye «acasan»/«alcanzan» (0,22 en las dos pasadas) y, cortando desde 2,205 s, «cansan del viaje»; el reel editado lo subtitula «cansan». Se pinta **«cansan», POR CONFIRMAR AL OÍDO**.
- Ella dice «buscar campestre» (tres pasadas); el reel editado añade «casa». Se pinta lo que dice.

No sustituye al oído del usuario: es otra persona transcribiendo (o, quizá, corrigiendo) la misma voz. Por eso las ocho palabras de abajo siguen POR CONFIRMAR.

**Si una frase no se cierra al oído, propuesta de recorte:** la mitad entera es la que más duda lleva (4 de 16 palabras). Si «cansan» no cuadra, **quitar «se cansan del viaje,»** (1,90-2,9 s de MD10, ≈ 1,1 s) con un corte y un empuje: queda «Compran lejos, compran viejo y tienen que pagar dos veces en remodelación.» Si la que no cuadra es la primera palabra del CTA, el recorte es quedarse con «Haz clic en el enlace y ven a conocerla.» (3,42-5,60 s) y dejar «No cometas el mismo error.» sin voz ni texto.

## Idea en una línea

Esta casa es para quien no quiere comprar dos veces: el error de la familia que compra lejos o compra viejo (hook y mitad), la casa hecha y a la vista (el paseo) y una orden, «no cometas el mismo error» (CTA).

## Promesa y CTA

- **Promesa (primeros 4 s):** el dron se aleja despacio de la casa en su ladera; a corte, Isabella frente a la casa: «**El error** que cometen las familias al buscar campestre.»
- **Acción:** «Haz clic en el enlace y ven a conocerla.» (el enlace va en el caption).
- **Lo que NO se cuenta:** precio, metros, alcobas, baños, minutos o kilómetros (ni se oyen ni se leen: la mitad dice «lejos» y «viejo», sin una sola cifra), rentabilidad ni valorización.

## Bloques

Tres frases de Isabella (≈ 11,8 s de voz en 33,5 s); el resto es la casa con música.

| Bloque | Planos | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · dron | c01 | la casa en su ladera, el dron alejándose despacio (3,9 s; el tramo con más movimiento sin tirones del clip, más un zoom hacia fuera de 1,08 a 1,0) | — (sin texto ni voz; el frame 0 es la miniatura) | DR71 `DJI_20260414173037_0071_D.MP4` (3,0-6,9 s) |
| 2 · hook | c02 | Isabella en la grava frente al garaje, el Mini y la camioneta detrás | «**El error** que cometen las familias al buscar campestre.» | HK08 `IMG_9418` |
| 3 · recorrido | c03 c04 | ella llega caminando por la sala, de la puerta de vidrio al ventanal con el valle → el pasillo con el ciprés y la entrada a la alcoba principal | — | RC01 `IMG_9430` · RC28 `IMG_9510` |
| 4 · mitad | c05 | Isabella en esa alcoba, con el valle por la ventana | «Compran **lejos,** se cansan del viaje, compran viejo y tienen que pagar **dos veces** en remodelación.» | MD10 `IMG_9528` |
| 5 · recorrido | c06 c07 | el vestier y el baño (2,1 s) → el valle y la carretera que sube a la casa (la vista, 4,3 s, el plano más largo del bloque) | — | RC13 `IMG_9477` · DR82 `DJI_20260414173650_0082_D.MP4` |
| 6 · CTA | c08 c09 | Isabella en la terraza del telescopio; funde a negro; tarjeta | «No cometas **el mismo error.** Haz clic en el enlace y ven a **conocerla.**» | CT08 `IMG_9437` |

**Por qué estos planos: el paseo que contesta al error.** El error de la familia es comprar lejos o comprar viejo. El paseo no discute: enseña lo contrario. El dron enseña la casa entera en su ladera, a la vista; ella llega por la sala a una casa hecha; el pasillo y la alcoba, donde se dice el error; el vestier y el baño, lo que no hay que remodelar; y la carretera que sube a la casa y el valle, que contestan a «lejos» sin decirlo. El CTA, en la terraza donde el telescopio apunta a ese mismo valle, cierra con la orden.

**Los clips que quedaban: el cuello de botella.** De los 28 recorridos de la casa, la V13, la V16 y la V17 usaron 21; la V19 (otra sesión) se llevó RC05, RC11 y RC17; y la V21 (otra sesión más) busca los suyos. Quedaban RC01, RC02, RC13 y RC28 (RC02, el lavamanos de cobre, se deja a la V21): esta pieza usa **tres** recorridos, más dos drones. De ahí que los dos bloques de paseo sean cortos (6,9 s y 6,5 s) y que la pieza dure 33,5 s y no los 38-40 de las anteriores.

**Ni un plano de la V13, la V16, la V17 ni la V19** (lo comprueba la puerta, secciones 7b y 7c, cargando sus planes y la lista de lo que la V19 tiene reservado): V13: DR72, HK04, RC25, RC16, RC15, MD04, RC19, RC03, RC10, RC12, CT15 · V16: DR78, HK02, RC27, RC24, RC18, MD01, RC08, RC09, RC14, RC23, CT04 · V17: DR76, CT21, RC26, RC20, RC22, MD06, RC07, RC06, RC04, RC21, CT18 · V19 (reservado en su registro): HK11, MD08, CT07, DR75, DR79, DR81, RC05, RC11, RC17. Esta pieza: DR71, HK08, RC01, RC28, MD10, RC13, DR82, CT08.

**Lo que este reparto cuesta y se declara.**
- **Las placas.** En el hook, las dos placas amarillas de los coches de detrás (la «1GR-336» del Mini y la «NGX-490» de la camioneta) están pegadas a Isabella todo el plano y se leen a 4K: **ninguna ventana 9:16 que la siga las deja fuera**. `normalizar.mjs` las difumina con un recuadro con seguimiento (`TAPAR`); el recuadro se ve como un borrón gris sobre el coche. La alternativa era descartar HK08, que es la toma que el encargo pedía y la única del hilo.
- **El destello del sol** sobre el cristal del balcón (arriba a la derecha del hook) se deja fuera con el borde superior de la ventana, que baja con una rampa a medida que el destello sube por el cuadro; ella queda con poco aire por encima de la cabeza (10-17 % del alto).
- **Nitidez.** Las siete fuentes son 4K y ninguna se ampla: el hook va en una ventana cerrada al 60 % del alto (×1,78 sobre el recorte, ×1,48 sobre el 4K) y es el plano más blando; el resto sale a ×0,89 de la fuente.
- **RC01** acaba con ella ocupando todo el cuadro (cara grande, sonriendo): es el último fotograma del clip, y el corte siguiente es al jardín de RC28.
- **RC28** pasa por una pared blanca de 0,7 s (el marco de la puerta) entre el jardín y la alcoba; **RC13** se corta a los 2,5 s de su clip y disuelve al valle, antes de que asome el inodoro por la izquierda (a 2,9 s ocupa el 14 % de la ventana; mover la ventana a la derecha lo sacaba, pero dejaba el plano en un armario y el lavamanos solo los últimos 0,7 s).
- **Dos rutas de color**: RC28 y RC13 (interiores cálidos grabados con otro balance de blancos que MD10) se enfrían un poco para que el corte a MD10 no cambie de color.

## Música

*Familiar* (Nils Frahm), reservada como V20: no está en ninguna otra versión. De las cuatro candidatas libres que nombraba el encargo, `proyectos/037/herramientas/rejilla-037.py` (la estructura de esta pieza con cada corte seco en un golpe medido) **solo dio solución con *Familiar***: *Children*, *Experience* y *Silver Skies* dieron 0 (golpes de piano de ≤ 9 dB y sin caída a tiempo). Entra en **142,129 s** con un golpe de 10,2 dB en el frame 1; la meseta (−20 a −22 LUFS) tiene golpes de 9-14 dB; y a los 26,8 s de la pieza, **en el golpe de 14,5 dB donde entra el CTA**, sigue una caída (−22 → −34 LUFS en 171-175 s) que cae bajo su frase. Es una pista quieta: `normalizar.mjs` le da una ganancia fija de +4 dB (el motor no deja más de +6 dB por tramo). Medida, **no oída**, y su licencia **no está verificada**.

Alternativas medidas (las del encargo): *Children*, *Experience*, *Silver Skies*: 0 soluciones. Descartadas por el propio encargo: *Einaudi Fly*, *Here For You*, *Spring is Coming* (sin caída).

## Pendientes con el usuario

- Oír las palabras POR CONFIRMAR (tabla con segundos en `combinaciones.md`), sobre todo **«cansan»** (el encargo decía «aburren»), **«error»** del CTA y la primera palabra de cada toma.
- El OK a la prueba (no se exporta la final sin él).
- Oír la canción y confirmar su licencia.
- Mirar si el recuadro sobre las placas del hook le parece bien (o descartar el hook).
