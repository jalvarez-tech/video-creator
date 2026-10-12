# 027 · One Living (Envigado) — análisis previo a elegir (2026-10-08)

> Primer entregable de la **V11** (quinto reel de One Living). Catálogo del material: `proyectos/022/catalogo-material.md` (no se rehace; vive en el worktree `reel-022`). Lo medido lo digo; lo que infiero o no pude verificar, también. **Estado: a la espera de que el usuario elija la vía (a / b / c / d); nada reservado todavía.**

## 0. Dónde estoy (lo leído el 2026-10-08)

- `origin` = `git@github.com:jalvarez-tech/video-creator.git` (el del registro; no hace falta `estudio`). Tras `git fetch --all --prune`: `origin/main` = **21923ff** (V1-V9, la biblioteca de música del PR #17 y la fila «V10 · 026 libre») y `origin/feat/reel-026-ven-te-muestro` = **bf1dd4a** (V10 `final`, fila «V11 · 027 libre»). **Coincide con lo que decía el encargo (visto el 2026-10-07).** No hay ninguna otra rama `origin/feat/reel-*` nueva ni PR abiertos (#1-#17 fusionados) ni worktree `reel-027`.
- En la rama de la V10 la fila de *Heaven on Earth* sigue «libre» (esa rama se cortó antes de la reserva de la V9); en `main` está reservada por la V9. Vale `main`. La tabla «Recorridos» de One Living sigue incompleta (p. ej. RC15 solo dice «V6»; la V7 usó 5,0-8,1 y 14,3-17,4 s): la fuente de verdad son las puertas (7b) y la lista del encargo.
- Trabajo en el worktree `determined-mendel-d8afd4` (rama `claude/determined-mendel-d8afd4` = `origin/main` 21923ff, limpia). Al reservar la renombro a `feat/reel-027-<tema>` (es un worktree propio cortado de `origin/main`; no hace falta otro, como hizo la V10).
- Entorno: las 26 copias de `proyectos/027/original/` (`cp -c`) con **sha256 26/26 iguales** a `ORIGEN.tsv`; `archivos/whisper/ggml-small.bin`; `remotion/node_modules` (clonado de la V10); `proyectos/027/herramientas/` (las de la V10 con 026→027). Skills de estudio y memoria leídas por ruta. El disco del rodaje está montado. Disco: 44 GB libres.

## A. Lo que queda

### A1. Tomas de Isabella (contra el registro)

Confirmado: **no queda ningún hook, mitad ni CTA limpio.** HK1 (V8) · HK2 (V6) · HK3 (V7) · HK5 = RC14 (V10) usados; HK4 «plusvalía segura de 94 millones» y «esperar la Torre 2» no se usan. MD1 (V6) · MD2 (V8, V10) · MD3 (V7). CT1 (V6; V8 recortada) · CT2 (V7) · CT4 = RC14 (V10); CT3 «maximizar tu rentabilidad» no se usa.

**Solo RC14 trae voz** (medido hoy): energía en la banda de voz (300-3.400 Hz, ventanas de 50 ms) de los 16 recorridos originales. RC14 tiene voz a −12/−17 dBFS en 1,8-6,3 s y 45,2-49,4 s y −62 dBFS de mediana entre medias. Los otros 15 no pasan de −29 dBFS: RC01 (−33 de mediana, plano: viento del balcón), RC09 18-33 s (la cocina, hasta −30) y RC15 (−38) son los más altos, y whisper-small sobre esos tres solo oye «[Música]» (y el «¡Suscríbete!» de siempre sobre el silencio a 60 s). Ni una ventana de voz fuera de RC14.

**Qué alcoba es la del CTA de RC14 (CT4)** — inferido, no cerrado: el ventanal **de esquina** del CTA es el que se ve en RC08 1,5-3 s y RC09 0-1 s (clips «habitación principal»), y RC08 gira de ese ventanal hacia el mueble blanco de CT1: lo más probable es que CT4 esté en la **ALCOBA PRINCIPAL** (el mismo sitio que CT1). RC14 lo confirma por el recorrido: entrada → sala → balcón → cocina → pasillo → baño y vestier → **alcoba sec.** (29,5-33 s, ventanal plano con árboles) → **vuelve por la cocina** (35,5-39,5 s) → pasillo → **alcoba del ventanal de esquina** (42-49,8 s). Las dos alcobas están en extremos opuestos con la cocina en medio, como dice el plano de la ficha. No cambia ninguna cuenta de abajo (ninguna terna junta CT1 y CT4).

### A2. Las vías

| Vía | Qué dice (lo que sonaría) | Qué dice la ficha | Qué me falta saber |
|---|---|---|---|
| **(a) Terna repetida** | 14 ternas con tres sitios y paseo coherente (A3); las tres que no toman dos tomas de la MISMA versión: **HK2·MD3·CT4**, **HK5·MD3·CT1** y **HK5·MD3·CT1r** | todo lo que dicen está en la ficha (MD3 «dos habitaciones independientes, balcón… junto a City Plaza» ✓; CT1 «Loma del Escobero, Envigado» ✓) | qué terna; que aceptas tres frases ya publicadas; la canción (C1: solo *Ivory Skyline Reverie* deja rejilla holgada, y es lounge) |
| **(b) Recortes** | MD1r «Aquí cada habitación tiene su baño y su vestier» · CT2r «contáctanos y agendemos una visita» · MD3r «Cuenta con dos habitaciones independientes» (A4) | MD1r quita la mitad que la ficha no confirma ✓ · CT2r ✓ (Luxur agenda) · MD3r ✓ | no abren ninguna terna nueva: MD1r cae en un extremo y no entra en un paseo coherente; y los tres se cortan en silencios de 3-6 f donde la curva de la música no cabe |
| **(c) Rodar** | lo nuevo que escriba `guion-luxur` con la ficha (A6) | es la fuente del guion | fecha de rodaje con Isabella; el reel sale después de grabar |
| **(d) Sin Isabella** | nada: música y 2-3 líneas de texto con datos de la ficha | límite: una cifra, ninguna promesa | qué datos, en cuántas líneas, qué pide el cierre; la canción (C2) |

### A3. Ternas de la vía (a)

Sitios (dónde está ELLA): HK1 SALA · HK2 BALCON · HK3 SALA · HK5 ENTRADA · MD1 ALCOBA-SEC · MD2 BALCON · MD3 SALA · CT1 / CT1r ALCOBA-PPAL · CT2 BALCON · CT4 ALCOBA (¿PPAL?). Paseo coherente = las alcobas en extremos opuestos y la zona social (entrada, sala, cocina, balcón) en medio: el paseo no puede ir de una zona a un extremo y volver (centro → alcoba → centro, o alcoba sec. → alcoba ppal.).

- 4 hooks × 3 mitades × 4 CTA (CT1 entera y recortada cuentan aparte) = **48**; con tres sitios distintos, **31**; de esas, con paseo coherente **16**, de las que dos son la V8 y la V10 → **14 ternas nuevas**. Todas con MD2 o MD3 (MD1, en la alcoba sec., obliga a volver por el centro: la V6 lo hizo así).
- Una de las 14, HK5·MD3·CT2 (ENTRADA·SALA·BALCON), solo es coherente si el paseo NO enseña las alcobas (las tres paradas están en el centro).
- Ninguna lleva más de una cifra (solo HK1 tiene una).

| Terna | Sitios | Repite de | Palabras sin oír que hereda |
|---|---|---|---|
| **HK2 · MD3 · CT4** | BALCON · SALA · ALCOBA-PPAL? | V6 · V7 · V10 (una de cada) | MD3 «balcón» (V7); CT4 «gustó» y la última sílaba de «contáctame» (V10) |
| **HK5 · MD3 · CT1** | ENTRADA · SALA · ALCOBA-PPAL | V10 · V7 · V6 (una de cada) | HK5 «posibilidades», «te muestro»; MD3 «balcón»; CT1 **«Escobero» sin cerrar** (V6) y «contáctame» |
| **HK5 · MD3 · CT1r** | ENTRADA · SALA · ALCOBA-PPAL | V10 · V7 · V8 (una de cada) | HK5 dos; MD3 «balcón»; CT1r «contáctame» |
| HK1 · MD2 · CT1 | SALA · BALCON · ALCOBA-PPAL | V8 casi entera (HK1, MD2 y el clip de CT1) | «pueden», «balcón», «Escobero», «contáctame» |
| HK1 · MD2 · CT4 | SALA · BALCON · ALCOBA-PPAL? | V8 (2) / V10 (2) | «pueden», «balcón», «gustó», «contáctame» |
| HK2 · MD3 · CT1 / CT1r | BALCON · SALA · ALCOBA-PPAL | V6 (2) | «balcón» (MD3), «Escobero» (CT1) o «contáctame» |
| HK3 · MD2 · CT1 / CT1r / CT4 | SALA · BALCON · ALCOBA-PPAL | V8 (2) o V10 (2) | «balcón» (MD2) y lo del CTA |
| HK5 · MD2 · CT1 / CT1r | ENTRADA · BALCON · ALCOBA-PPAL | V10 (2) | HK5 dos, «balcón», lo del CTA |
| HK5 · MD3 · CT4 | ENTRADA · SALA · ALCOBA-PPAL? | V10 (hook y CTA: la V10 con otra mitad) | HK5 y CT4 |
| HK5 · MD3 · CT2 | ENTRADA · SALA · BALCON | V7 (2) | solo si el paseo no enseña las alcobas |

En todas: **quien siga la cuenta oye frases que ya conoce.** HK5 y CT4 son la imagen de RC14 (no suenan limpias fuera de su clip): usarlas con otra toma repite una toma de la V10.

### A4. Recortes de la vía (b)

Silencios medidos con la energía de la voz sola (banda 300-3.400 Hz, ventanas de 20 ms, sobre el WAV normalizado de cada toma; lo que llamo silencio es < −40 dBFS):

| Recorte | Queda | Palabras | Silencio en el corte | Cómo entra / sale | ¿Dice algo solo? |
|---|---|---|---|---|---|
| **MD1r** (1.ª parte de MD1) | «Aquí cada habitación tiene su baño y su vestier» | 9 | 3,24-3,44 s (0,20 s = 6 f; < −55 dB solo 3,32-3,42) antes de «además» | entra como MD1 (0,54 s de aire); **sale a corte en 3,40 s**: la subida de la música (11-14 f) no cabe antes del golpe siguiente sin que se vea a ella empezar «además» | sí, y cuadra con la ficha (cada alcoba con baño privado y vestier); pero conserva «habitación», que la V6 dejó sin cerrar (whisper: «visitación») |
| **CT2r** (2.ª parte de CT2) | «contáctanos y agendemos una visita» | 5 | 1,82-1,92 s (0,10 s = 3 f) tras «vista» | **entra a corte** con 3 f de aire: la bajada de la música (7-10 f) no acaba antes de «contáctanos» (o el golpe suena con la música ya abajo); sale con 0,62 s de cola | sí, es un CTA completo; hereda «agendemos» sin oír (V7) |
| **MD3r** (1.ª parte de MD3) | «Cuenta con dos habitaciones independientes» | 5 | 3,00-3,20 s (0,20 s = 6 f) antes de «balcón» | entra con 1,09 s de aire; **sale a corte** con 6 f para subir la música | sí; «dos» como palabra (la V7 no la contó como cifra) |
| CT1r (V8) | «Si quieres más información, contáctame» | 5 | 3,14-3,52 s (0,38 s) | entra a corte (lo que hizo la V8) | ya usado |
| HK2r / HK3r | el hook sin «mira esto» | — | 0,20 / 0,40 s | — | no aporta nada: es la misma toma |
| HK5r | «Hay apartamentos para vivir y hay otros que te dan más posibilidades» | 12 | 5,41-5,57 s (0,16 s) | sale a corte y pierde «Ven, te muestro» (el giro de ella) | flojo |
| CT4 / CT1 1.ª frase / MD2 | — | — | CT4 sin pausa útil; la 1.ª frase de CT1 no es un CTA; MD2 es una sola frase | — | no |

Lectura: (b) **no abre nada que (a) no tenga**. MD1r es el único recorte que quita algo dudoso, y MD1 está en un extremo del piso (no cabe en un paseo coherente con ningún CTA que quede). Los cortes en 3-6 f de silencio rompen la preferencia de la curva de la música (bajada acabada antes de la primera palabra y subida de 11-14 f antes del golpe siguiente) o bajan el golpe por debajo de R33.

### A5. Ventanas de recorrido libres DE VERDAD (mirando los fotogramas)

Hojas cada 0,5 s de los 16 clips normalizados (en rojo lo usado por la V6-V10) y la hoja de las ventanas limpias: `proyectos/027/contactos/ventanas-libres.jpg` (inicio, medio y fin de cada una). La lista del encargo era una buena pista; lo que veo:

| Clip | Ventana libre limpia | Dura | Qué se ve | Ojo |
|---|---|---|---|---|
| RC01 | 0,0-2,4 | 2,4 | cielo, ciudad, montaña | la malla negra entra a los 2,5 s |
| RC03 | 0,0-2,1 · 5,0-7,2 | 2,1 · 2,2 | baño de la alcoba sec. · el ventanal de la alcoba sec. (árboles) | 2,4-4,9 s: marco de puerta y pared |
| RC06 | 10,0-12,4 · 5,5-7,0 · 7,0-9,8 | 2,4 · 1,5 · 2,8 | la estufa con la campana y el ventanal (la mejor cocina libre) · campana con luz cálida · la zona de ropas | la zona de ropas es estrecha y amarilla |
| RC07 | 5,5-8,6 | 3,1 | alcoba principal con el mueble blanco; ventanal al borde | antes, puerta y columna |
| **RC09** | **30,0-32,6** | 2,6 | **la corredera abierta al balcón con la vista** (ladrillo a la derecha) | nueva: nadie la ha usado |
| **RC09** | **38,5-41,6** | 3,1 | **el ventanal de la alcoba sec. con árboles y montaña** | nueva; el único plano libre de ventanal ≥ 3 s |
| RC09 | 25,2-27,9 · 58,0-61,0 · 61,0-63,2 | 2,7 · 3,0 · 2,2 | la isla desde el otro lado → sala · la cocina desde el fondo · sala hacia la corredera | |
| RC09 | 44,0-46,0 · 18,0-20,4 · 0,0-1,2 | 2,0 · 2,4 · 1,2 | puertas del baño y del vestier con luz · hacia la cocina (marco a la izquierda) · ventanal de esquina | |
| RC09 | 54,2-55,6 | 1,4 | un baño de piso gris junto a la cocina: **quizá el baño social** (el catálogo no lo encontraba) | sin planta, no lo cierro |
| RC11 | 0,0-2,0 · 5,5-8,3 | 2,0 · 2,8 | vista · la alcoba sec. hacia el baño y el vestier | 2,0-5,0 s: marco y pared |
| RC14 | 12,0-13,0 · 25,5-29,3 | 1,0 · 3,8 | balcón y vista (malla desde 13,0) · baño y vestier **sin ella** | HLG; 7,2-44,8 s lleva a Isabella casi siempre (de espaldas o de perfil); 21,0-22,6 es su mano sobre la isla (un puente humano, con ella en parte) |
| RC15 | 12,0-14,3 | 2,3 | la puerta del baño y el vestier | 9,5-11,5 s: pared |
| RC12 | 4,23-5,2 | 1,0 | el ventanal antes de que cruce el marco | 5,5-7,8 s: el marco negro llena el cuadro |
| Restos | RC02 0-1,2 · RC04 3,8-4,8 · RC08 0-0,4 y 6,8-7,7 · RC05 0-0,4 y 4,0-4,5 | ≤ 1,2 | | casi nada |
| **No sirven** | RC10 4,8-8,1 (pared y columna) · RC13 2,9-5,1 (pared) · RC16 1,77-2,03 | | | |

Total limpio y sin estrenar, en ventanas ≥ 2 s: **≈ 47 s** (18 ventanas). Da para el bloque 3 y el 5 de una pieza con voz sin repetir nada, o para un recorrido mudo de ≈ 30 s entero nuevo. **Sigue sin haber una vista abierta limpia ≥ 3 s**; lo más parecido sin usar es RC09 38,5-41,6 (ventanal, 3,1 s) y RC09 30,0-32,6 (corredera y balcón, 2,6 s).

### A6. La vía (c), en una línea

Con `guion-luxur` (skill en `.claude/skills/guion-luxur` del estudio): guion + hoja de rodaje desde la ficha de arriba, sin prometer nada que no diga. Propuesta de rodaje: **un recorrido caminando** como RC14 (ella habla al entrar y al acabar, a cámara; el paseo ya ordenado) + **tres tomas sueltas** (hook, mitad, CTA) en tres sitios distintos y en sentido coherente (p. ej. COCINA → ALCOBA-SEC con su baño y vestier → BALCON), con 1 s quieta antes y después de hablar (para disolver), una **apertura limpia** sin ella (para cumplir la regla fija sin excepción), una **vista limpia ≥ 3 s** encuadrada sin la malla, y un puente humano (la mano en la corredera). Cuesta un día de Isabella; no cuesta dinero.

## B. Cumplimiento (solo lo nuevo)

Las tomas enteras ya pasaron por la tabla de la V6 (`proyectos/022/analisis-uso.md` §B) y la V10 (§B, RC14). Lo nuevo:

| Pieza | Lo que dice | La ficha | Veredicto |
|---|---|---|---|
| MD1r | «Aquí cada habitación tiene su baño y su vestier» | 2 habitaciones, cada una con baño privado y vestier | **Limpia** (quita «conectada con la zona social y el balcón», que la ficha no dice). «habitación» sin cerrar (V6) |
| CT2r | «contáctanos y agendemos una visita» | «Solicita una visita»; Luxur agenda (OK dado) | **Limpia** |
| MD3r | «Cuenta con dos habitaciones independientes» | 2 habitaciones en extremos opuestos | **Limpia** («independientes» = el plano las separa: inferido de la ficha) |
| Texto de (d) | ver D | — | se escribe solo con lo escrito en la ficha: ubicación, «para estrenar», cocina con isla, «2 habitaciones con baño y vestier», «junto a City Plaza», techo de concreto, balcón; **una** cifra como mucho y fuera del final (76 m² o el piso 11); nada de entrega, renta corta, rooftop, cesión ni precio en el cierre |

## C. Canciones

Libres y fuera de la lista de descartadas: **solo dos** — *Aleksey Chistilin – Overcoming the Impossible* (cinematic épico / híbrido orquestal) e *Ivory Skyline Reverie* (lounge / downtempo †). Más *Deep Breath*, que el encargo deja solo para (d). Lo usado o reservado (10) y *La Isla Bonita*, fuera. `buscar-entrada.py --cta 33 38` sobre las 43 (biblioteca del repo) no saca ninguna libre nueva con entrada y caída mejores que las ya medidas.

### C1. Con voz (vías a, b, c montada)

`lufs-caida.py` (LUFS por tramos de 5 s), `curva.py` (RMS de 1 s) y `buscar-cortes.py` con la estructura de la V10 (hook · 4 de paseo · mitad · 3 del bloque 5 · vista más larga · CTA; rangos genéricos de 45-150 f por plano y la vista 75-103 f: se rehacen con la terna elegida y las ventanas reales de A5):

| Canción | Cae (LUFS) | ¿Se recupera? | Rejilla con MD2 (par 131-154 f) | Rejilla con MD3 (par 158-167 f) | Golpe más débil (disolv. / seco) | Plano más corto | Género |
|---|---|---|---|---|---|---|---|
| **Ivory Skyline Reverie** | **194,5 s** (−12,3 → −22,1 → silencio: 9,8 / 57,7 dB) | no: es el fundido final; la pista acaba a 197,2 s (2,7 s después) | **16.822** | **2.624** | 9,3 / 15,8 (MD2) · 10,6 / 15,8 (MD3) | 75 f | lounge/downtempo †, «onírico, sofisticado, sereno»: **puede sonar playera** |
| Overcoming the Impossible | 212,0 s (−19,5 → −28,8 → −48,2: 9,3 / 28,7 dB) | no; pero antes de caer ya está en una coda baja (−20 dB desde 202 s): el bloque 5 y la vista caerían sobre la coda | 16 | **0** | 9,1 / 9,5-10,9 | 73 f | cinematic épico orquestal: más «superación» que hogar |
| Overcoming (la caída del clímax, 201,5 s) | −9 → −20 dB, pero no llega a 20 en 10 s | — | 0 | 0 | — | — | — |

Con la terna de MD3 (las tres que no repiten dos tomas de una versión) **solo *Ivory Skyline Reverie* deja rejilla**. Si no te encaja de género, para una pieza con voz no queda ninguna libre: habría que cambiar la estructura (sin mitad, o menos planos) o la vía.

### C2. Sin voz (vía d)

Sin ventanas de voz no hay mitad ni CTA que cuadrar: hace falta un golpe de entrada en el f0, golpes para cortar (o disolver por frases) y que la canción **acabe** donde entra la tarjeta (si no cae sola, se apaga con curva antes del siguiente golpe). Música sola a −15 LUFS, sin ducking. `buscar-entrada.py --cta 26 31` (pieza de ≈ 30 s) sobre las libres de género apto:

| Canción | Entrada (golpe) | Cae a +s | Golpes fuertes en la ventana | Caída en LUFS | Lectura |
|---|---|---|---|---|---|
| **Daniel Armand – Street Level Sessions on the Green** | 173,557 s (16,1 dB) | +31,0 s (17,3 dB) | 37 | **206,0 s** (−14 → −28 → silencio): su final, silencio digital a 209 s | **lo-fi urbano / chillhop** (el género que pides para un loft en una loma); golpes de sobra para cortar; con la tarjeta ≤ 7 s antes de la caída, 9.822 rejillas de 9 planos de 2,8-3,8 s. La V6 la tuvo de 2.ª opción |
| Armin van Buuren – Children (Piano) | 180,526 s (14,5 dB) | +31,0 s (21,0 dB) | 8 | 211,5 s: 14,9 / 17,6 (no llega a 20 en 10 s) | piano «nostalgia, intimidad»; pocos golpes: casi todo disolviendo |
| Aleksey Chistilin – Deep Breath | 91,298 s (9,7 dB) | +26,0 s (11,4 dB) | 12 | no cae en LUFS (6,4 / 5,3) | ambient: sin rejilla, todo por disolvencias y fundido final |
| Overcoming the Impossible | 175,074 s (10,3 dB) | +27,2 s (10,5 dB) | 18 | 212,0 s | épico; 1.987 rejillas con cortes ≥ 8,0 dB |
| Utopia · Pictures from the Past · Ludovico Einaudi – Experience · Tony Anderson – Dreamlife · Softly I · We Are | 143-346 s | +26-31 s (11-22 dB) | 5-31 | — | posibles (cinematic / neoclásico), menos golpes o más épicos; *Utopia* suena a *Return to Oasis* (V2) |

Fuera para (d) también: saxofón pop, blues, house de club, worship con letra (*Oceans*) y lounge (*Ivory*, *Luxury*, *Light Fills the Room*) por el riesgo de «playera».

**Extractos para oír** (medidos, NO oídos; el género sale del catálogo): `proyectos/027/musica/extracto-ivory-skyline-161s.mp3`, `extracto-overcoming-181s.mp3`, `extracto-street-level-169s.mp3`, `extracto-children-180s.mp3`, `extracto-deep-breath-91s.mp3` (cada uno desde la entrada propuesta hasta el final de la caída).

## D. Propuesta

**Vía (d) para tener un reel ya; (c) en paralelo para los siguientes.** (a) solo si aceptas una terna repetida, y entonces HK2·MD3·CT4 o HK5·MD3·CT1r con *Ivory Skyline Reverie* (la única con rejilla).

Si es (d):

| Pieza | Elección | Por qué |
|---|---|---|
| Canción | *Street Level Sessions on the Green* (entrada hacia 173,6-183,7 s: la decide la rejilla con la duración final) | lo-fi urbano (no playero), golpes de 15-16 dB para el f0, 37 golpes fuertes y un final que cae solo (206,0 s en LUFS) donde entra la tarjeta |
| Apertura (f0, sin texto ni voz, sin excepción) | RC09 30,0-32,6: la corredera abierta al balcón | la casa y la luz con la vista parcial (la vista entera queda para el final); nadie lo ha usado |
| Paseo (8 planos, ≈ 22-28 s + tarjeta) | cocina (RC06 10,0-12,4) → isla (RC09 25,2-27,9) → sala hacia la corredera (RC09 61,0-63,2) → alcoba sec. hacia su baño y vestier (RC11 5,5-8,3) → baño y vestier (RC14 25,5-29,3, sin ella) → su ventanal (RC09 38,5-41,6, el plano más largo) → la vista desde esa alcoba (RC11 0-2,0) | centro → un solo extremo (no vuelve atrás); todo metraje sin estrenar; el clímax es la vista |
| Texto (editorial, 1-4 palabras por trozo, ninguna cifra en el final) | 3 líneas: «Loma del Escobero, *Envigado*» (en la cocina) · «Dos habitaciones, cada una con *su baño*» o «76 m² *para estrenar*» (en la alcoba; la única cifra, si la quieres) · «Junto a *City Plaza*» (antes de la vista) | solo lo escrito en la ficha; nada de entrega, renta, rooftop ni precio |
| Cierre | tarjeta oscura: logo (440 px, 60 %) + PropiedadesLuxur.com; la música acaba con su propio final | regla fija; si quieres pedir algo («Agenda tu visita»: Luxur agenda), dímelo y va como última línea sobre la vista, no en la tarjeta |
| Montaje | `director-video` como el 009: `PistaMetraje` + `PistaAudio`, sin ducking | no es el formato `recorrido-luxur` (exige a Isabella) |

Decisiones tuyas en (d): qué datos y cuántas líneas (¿la cifra 76 sí o no?), qué pide el cierre, y la canción (tras oír los extractos).
