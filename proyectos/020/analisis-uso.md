# Análisis de uso previo al 020 · Los Patios · apto 501 · V4

> Se hizo ANTES de elegir nada, el 2026-10-04, leyendo todas las fuentes (ninguna basta sola: lo publicado va por detrás del trabajo en curso).
> Pedido de esta versión: **una canción «tipo jazz»**; todo lo demás, los parámetros por defecto.

## 1. Fuentes leídas

| # | Fuente | Qué dice |
|---|---|---|
| a | Registro `archivos/musica/registro-de-uso.md` en `origin/feat/recorridos-luxur-subtitulos-color-reglas` (`13ef389`, 2026-10-04 16:35 −05:00) | V1 y V2 finales, **V3 en prueba (reserva publicada)**, V4 libre. En `origin/main` el registro **no existe** (el PR #10 se fusionó antes de que se añadiera). **Ninguna rama `origin/feat/reel-*`**; el resto de ramas remotas (`claude/*`, `docs/*`, `refactor/*`…) no lo contienen. |
| b | Árbol de trabajo del estudio (el checkout principal del repo, misma rama) | Registro idéntico al publicado. Aquí, y solo aquí, está lo **sin commit**: `proyectos/019/` y `remotion/src/proyectos/019/` (la V3 al detalle) y las filas de la V3 en los `combinaciones.md` del 017 y del 018. |
| b′ | Worktrees `determined-jackson-e969d6` y `video-compilacion-quien-soy-1fecf3` | Sin registro y sin proyectos ≥ 014: no reservan nada. |
| c | §1 «Registro de versiones» de `proyectos/017`, `018` (publicados) y `019` (árbol del estudio) | Coinciden con (a); el 019 añade lo que el registro no trae: apertura, recorridos con su tramo y sentido del paseo. |
| d | Línea `MUSICA =` de `proyectos/*/normalizar.mjs` | *Time* (017), *Return to Oasis* (018), *Flying Into the Sun* (019) y *Glenn Morrison – Contact* (016: la pieza «República Dominicana», no es de Los Patios y no está en la biblioteca: no cuenta aquí). |

**Contradicciones entre fuentes.** Una, y se resolvió durante el análisis: al empezar, `origin` daba la V3 por *libre* y el árbol del estudio la tenía *en prueba* sin publicar; mientras trabajaba, el commit `13ef389` publicó la reserva. Vale lo más avanzado (V3 reservada y tachada) y ya coinciden. **Sigue sin publicar el proyecto 019 entero** (el usuario pidió no commitear): de él parto desde el árbol del estudio, no desde git.

## 2. Canciones

**Usadas o reservadas (3 de 43):**

| Pista | V | Estado | Rejilla |
|---|---|---|---|
| *Hans Zimmer – Time* | V1 · 017 | usada (final) | frases de 8 pulsos |
| *Aleksey Chistilin – Return to Oasis* | V2 · 018 | usada (final) | pulso (110 BPM, 89 % a 10 ms) |
| *Aleksey Chistilin – Flying Into the Sun* | V3 · 019 | reservada (en prueba) | sin pulso: por golpes (27 %) |

**Libres: 40.** Con medida en el registro (`desde`, rejilla/arco): **4** (*Deep Breath*, *Fortitude (Light Version)*, *Heaven on Earth*, *In This Together*; ninguna es jazz). Sin medir golpe a golpe (solo el `desde` del catálogo): **36**.

**Lo pedido: «tipo jazz».** El catálogo (`catalogo-musica.md`) declara **una sola** pista de jazz, *Sax for the Last Customer* («Jazz / smooth jazz con saxofón †», 3:00, La menor, ~81 BPM; el † marca que el género es **inferido** de título y etiquetas, no oído). Cerca están los lounge/sax: *I Feel It Coming* (cover de saxofón), *Luxury, Elegance, Refined* (lounge), *Ivory Skyline Reverie* (downtempo), *La Isla Bonita (Saxophone 80 Mix)* (pop latino en saxofón) y *Daniel Armand – Street Level Sessions* (lo-fi/chillhop). Medidas con `buscar-entrada.py --cta 33 40` (golpe de entrada ≥ 9 dB y caída sostenida donde entra el CTA; **no oye**):

| Pista (género del catálogo) | Mejor entrada · golpe | Caída hacia el CTA | Lectura |
|---|---|---|---|
| **Sax for the Last Customer** (jazz) | 124,303 s · 19,4 dB | 5,5 dB a +33,6 s (pista plana) | caída floja… **pero su final natural sirve** (ver abajo) |
| I Feel It Coming (cover de saxofón, lounge) | 217,415 s · 18,7 dB | 6,0 dB a +40,0 s (en el borde) | no resuelve donde entra el CTA |
| Luxury, Elegance, Refined (lounge) | 128,141 s · 10,5 dB | 4,3 dB a +40,0 s | golpe débil, plana |
| Ivory Skyline Reverie (lounge/downtempo) | 143,146 s · 14,1 dB | 3,6 dB a +34,7 s | plana |
| La Isla Bonita (sax, pop latino 80s) | 179,834 s · 9,7 dB | 14,3 dB a +40,0 s | no es jazz; golpe en el umbral |
| Daniel Armand (lo-fi/chillhop) | 165,232 s · 20,2 dB | 25,6 dB a +40,0 s | encaja en la medida, pero es hip hop, no jazz |

**Sax for the Last Customer, medida a fondo** (`medir-pista.py`, `rejilla.py`; 179,73 s):
- **Sin pulso.** Mejor recta: 0,371 s (161,7 BPM) con solo el **46 %** de los golpes fuertes a ≤ 15 ms y un desvío medio de **79,7 ms** (un pulso de verdad pide ≥ 70 % y ≤ 15 ms): va por golpes, como la V3, no por recta como la V2. Los golpes medidos son la rejilla.
- **Entrada: 137,645 s, golpe de 33,7 dB** (el más fuerte de la pista), justo tras un descenso a ≈ −45 dB (la envolvente casi muere en 137,55 s y la nota vuelve a −10 dB): una entrada limpia como primera nota. Entrada del plan: 28-30 ms antes → **137,615 s**.
- **Resolución: acorde final en 176,986 s (20,9 dB)** que sostiene ≈ 0,3 s y decae en una cola que muere hacia 179,1 s (a 177,5 s ya está en −48 dB por segundo). Entrando en 137,615 s el acorde cae a los **39,37 s** de la pieza (≈ f1181): justo donde acaba la voz del CTA y empieza el fundido a la tarjeta oscura, y la cola se apaga bajo ella. No hay «caída a un lecho suave» como en la V2/V3: la resolución es el propio final de la canción.
- Duración de la pieza que sale de ahí: ≈ 41-42 s (entre la V3, 39,7 s, y la V2, 44,2 s).
- Un dato que el montaje tiene que respetar: la pista es **densa y plana** (−12 a −13 LUFS sin picos de arreglo; un respiro a −27 dB en 159 s, que no usamos). Bajo la voz va a −16 dB como siempre, pero se mide: un saxo continuo compite con la voz más que un piano.
- **Sin oír.** Genero y encaje con la marca son lo que dice el catálogo; el oído decide. Licencia **no verificada**.

## 3. Combinaciones (una fila por versión)

| | **V1 · 017** | **V2 · 018** | **V3 · 019** |
|---|---|---|---|
| Estado | final (CRF 12 y 16) | final (CTA «en» sin oír) | **en prueba**, sin commit |
| Canción | *Time* (175,633 s) | *Return to Oasis* (142,967 s) | *Flying Into the Sun* (178,095 s) |
| Apertura (frame 0) | dron DR147 (2,0 s) | dron DR155 (2,3 s) | fachada RC25 (3,0-6,07 s) |
| Hook · lugar | HK02 · INT-ABIERTO | HK07 · PATIO | HK05 · BARANDA |
| Mitad · lugar | MD09 · INT-ABIERTO | MD07 · TERRAZA | MD08 · TERRAZA |
| CTA · lugar | CT07 · TERRAZA | CT01 · BALCON | CT05 · INT-BLOQUES |
| Dron | DR147 · DR163 | DR155 | DR152 (tras el hook) |
| Recorridos | RC25 · RC01 · RC02 · RC07 → RC08 continua | RC11 · RC10 · RC11 → RC06 · RC05 · RC03 · RC25 · RC07 | RC25 (apertura) · RC09 · RC13 · RC16 |
| Sentido del paseo | I (puerta → terraza) | II (terraza → ventanal) | II |
| Cifra | «317 metros» (MD09, bloque 4) | ninguna | ninguna |
| Dura | 46,6 s | 44,2 s | 39,7 s |
| Palabras sin oír | — (cerradas) | «en» del CTA | «y (la) ventilación» · «escríbeme» |

**Lo que se repite entre versiones** (a no repetir sin querer, o a declarar):
- **Metraje compartido.** **RC25**: en las tres (V1 1,2-3,1 s · V2 0,0-2,7 s · V3 3,0-6,07 s; V3 comparte ≈ 0,1 s con V1 y nada con V2). **RC07**: V1 y V2 (0,8-4,6 s frente a 0,0-3,8 s: ≈ 3 s iguales, declarado en el 018).
- **Mismo sitio en el mismo bloque.** La **mitad en TERRAZA** en V2 y V3 (y la terraza como hook de ninguna). V1 puso **hook y mitad en INT-ABIERTO** (dos de tres tomas en el mismo sitio): hoy la regla lo prohíbe.
- **Misma apertura.** V1 y V2 abrieron con un dron (DR147 y DR155, 2,0 y 2,3 s); la V3 con la fachada. La V3 es la última.
- **Misma pareja hook → mitad:** ninguna (HK02→MD09, HK07→MD07, HK05→MD08).
- **Misma canción:** ninguna, pero 2 de 3 son de Aleksey Chistilin y ninguna es jazz.
- **Cifra:** solo la V1 lleva una.

## 4. Lo que queda

| Categoría | Total | Tachados | Libres | De ellos, sin aviso |
|---|---|---|---|---|
| Hooks | 12 | 3 (HK02, HK05, HK07) | **9** | **4**: HK03, HK06, HK09, HK10 (HK10 «en frío suena raro»). Con aviso: HK01/01a/01b («ven, te enseño» dudosa), HK04 (cifra 317), HK08 (precio) |
| Mitades | 15 | 3 (MD07, MD08, MD09) | **12** | **6**: MD01, MD01a, MD02, MD06, MD12, MD14. Con aviso: MD03 (piscina/cocina), MD04 y MD10 (ALH; MD10 también 317), MD05 (lujo/luego), MD11 (arranque), MD13 (1.ª palabra) |
| CTA | 7 | 3 (CT01, CT05, CT07) | **4** | **0 limpios**; **2 usables**: CT06 («reto»/«resto», conf. 0,16) y CT04 (nombra a ALH). CT02 y CT03 llevan el **precio** y la regla lo prohíbe en el bloque 6 |
| Drones | 11 | 4 (DR147, DR152, DR155, DR163) | **7** | DR148-DR152 traen la torre vecina con malla negra; **limpios: DR153, DR154, DR156** (DR156: cortar antes de los 22 s, aparece una persona) |
| Recorridos | 26 | 13 usados (RC01, 02, 03, 05, 06, 07, 08, 09, 10, 11, 13, 16, 25) | **13 sin usar**: RC04, RC12, RC14, RC15, RC17-RC24, RC26 | además, ventanas libres dentro de los usados (se declara) |
| Canciones | 43 | 3 | **40** (4 medidas en el registro + las 6 de arriba medidas ahora) | **jazz: 1** |

**Combinaciones nuevas posibles** con hooks, mitades y drones sin aviso y los 2 CTA usables: 4 × 6 × 2 × 7 = 336 sobre el papel, pero el **cuello de botella es el CTA**: esta V4 consume CT06 y solo quedará **CT04**, que nombra a ALH sin que esté confirmado que se pueda. **La V5 sería la última con un CTA no repetido**; en la V6 habrá que repetir uno (el menos reciente sería CT07, V1) o decidir si el precio puede ir en el CTA. Lo dejo dicho; no hace falta decidir hoy. Con el jazz pasa lo mismo: **hay una sola pista de jazz** y esta versión la gasta.

## 5. Propuesta: V4 · «Lo que todavía puedes definir»

Arco: **descarte que selecciona → reencuadre → invitación** (ángulo D «Filtro» del catálogo con la mitad de la tesis A). **Ninguna cifra** en toda la pieza.

| Pieza | Elección | Por qué |
|---|---|---|
| Canción | ***Sax for the Last Customer*** (entrada 137,615 s) | La única pista de jazz de la biblioteca; golpe de entrada de 33,7 dB tras un respiro y acorde final en los 39,4 s de la pieza (la resolución cae donde acaba el CTA). Sin pulso: por golpes medidos. |
| Hook | **HK03** · INT-BLOQUES | «Si estás buscando un apartamento totalmente terminado, este probablemente no es para ti.» Libre, sin cifra, sin palabra dudosa; el catálogo lo da como filtro. Su lugar nunca fue hook (la V3 usó INT-BLOQUES de CTA). |
| Mitad | **MD14** · PATIO | «No estás viendo un apartamento sin terminar, estás viendo uno que todavía puedes definir.» Es el reencuadre de HK03, sin cifra ni aviso; la mitad nunca estuvo en el PATIO (INT-ABIERTO, TERRAZA, TERRAZA). Acaba retrocediendo hacia el interior: sirve de puente. |
| CTA | **CT06** · INT-ABIERTO | «Si es el reto, escríbeme y agendamos una visita.» Cierra piezas de filtro (catálogo), una sola acción, sin precio. **Palabra dudosa:** «reto» (whisper oyó «resto», conf. 0,16) y «agendamos» (conf. 0,04): las mido y te las digo antes de la final. Luxur tiene que poder agendar. |
| Dron | **DR156** | Jardines colgantes y techo de madera sin la torre con malla; ascenso lento (cuadra con el jazz). Tramo ≤ 22 s. |
| Apertura | **RC22** («Exterior edificio», la calle y la entrada) | Distinta de la V3 (fachada RC25) y de las V1/V2 (dron): abre por la calle, como dejó dicho el 019. Sin texto ni voz (regla fija). |
| Sentido del paseo | I (entrada → terraza), desde el hook INT-BLOQUES | Sin volver atrás; recorridos **sin usar** donde el material lo permita (RC12 «tu lienzo», RC14, RC04) y ventanas libres de los usados, declarando todo lo que se comparta. |
| Tres sitios | INT-BLOQUES · PATIO · INT-ABIERTO | distintos entre sí y respecto a cada versión en el mismo bloque. |

**Lo que no puedo decir todavía** (se mide/pregunta en el montaje): si «reto» o «resto»; la licencia de la música; que el saxo se oiga bien bajo la voz (se mide la sonoridad; el oído decide); si CT06 puede pedir una visita agendada.

## Epílogo (tras montar, 2026-10-04)

Lo propuesto arriba es lo que se montó, con estas diferencias:

- **El dron (DR156) es el último plano del bloque 5**, no un plano suelto: la puerta lo exige así, y así no repite la posición de las V1 y V2 (al principio) ni la de la V3 (tras el hook).
- **Apareció una segunda palabra dudosa que el registro no anotaba:** «terminado»/«determinado» en HK03 (el catálogo sí la anotaba). Las dos, «terminado» y «reto», están **medidas, no oídas** y marcadas «POR CONFIRMAR AL OÍDO».
- **Metraje compartido con las tres versiones anteriores: ninguno** (la sección 9b de la puerta lo mide con la V1, la V2 y una instantánea de la V3).
- **Registro:** V4 → `en prueba` (commit solo del registro, publicado). El proyecto 020 sigue SIN commit, como pide el encargo hasta nueva orden.
