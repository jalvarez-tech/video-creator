# 01 · Plan narrativo — proyecto 075 · Suite Go Living (El Poblado, Medellín), V56 del registro («Totalmente equipada, a puerta cerrada»)

> Paso 1 de 3. Escrito con el reparto aprobado por el usuario el 2026-11-07 (`proyectos/070/reparto-070-075.md`, que manda), el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`) y lo aprendido en la 070 (`proyectos/070/aprendizajes.md`), de la que copia el andamio (`clonar-pieza.mjs`). Sexto y último reel de esta suite.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta 071-075» (aprobada la prueba de la 070). Esta es la **V56 / 075**. |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9 con vista al oriente, se vende **a puerta cerrada (con muebles y enseres)**, matrícula independiente, operación hotelera activa en el edificio. **El precio no consta** (no va en el reel). |
| Material | `Suite Go Living/Videos/` del SSD, copiado a `proyectos/075/original/` con el CÓDIGO del catálogo como nombre: HK06 `ba462f44`, MD03 `039d6368`, CT08 `71559ec6`, DR10 `252aecc0`, RC08 · RC06 · RC02 · RC09 · RC01 · RC07 · RC10 · RC13 (el plan usa seis). **Todo iPhone 4K HEVC HLG con rotación −90**: la receta lo tone-mapea con VideoToolbox. |
| Composición | `Recorrido075` · 1080×1920 · **30 fps** · 1140 f (**38,0 s**). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Presentadora | Isabella Cadavid |

## El ángulo: «Totalmente equipada, a puerta cerrada»

**La idea en una línea:** quien invierte en una suite para renta corta quiere entrar sin comprar nada más; esta se vende con todo lo que trae (tele, cama, escritorio, cocineta, baño) y está en un edificio hotelero. El hook la plantea como pregunta («¿y si tu próxima propiedad también pudiera generar ingresos?»: condicional, no promesa; aprobado en el reparto), la mitad lo dice con lo que consta en el anuncio («una suite hotelera, totalmente equipada en El Poblado») y el CTA pide la visita («agendemos una visita y descubre Go Living Suites»).

**Lo que NO se dice ni se escribe, y la puerta lo comprueba:** valorización, rentabilidad, ganancia, «crecer», cifras (28,5 m², piso 9, precio) ni nada del POT. Esta pieza es la única de las seis cuyo hook contiene «ingresos»: la puerta lo permite solo en el hook (2a/2e) y lo prohíbe en el CTA.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,4 | La entrada | la promesa | el edificio | DR10 0,30-3,73 s: la calle con el paso de cebra, el jardín vertical y el voladizo de la torre · solo música: golpe de 14,6 dB en el f3 |
| 2 | 3,4-7,7 | Hook | la pregunta | Isabella | HK06: de pie ante el ventanal, de frente · «¿Y si tu próxima propiedad también pudiera generar ingresos?» (a corte en un golpe de 15,2 dB) |
| 3 | 7,7-16,6 | Recorrido | lo que trae | la habitación | la tele y el mueble de madera (RC08) → la cama con su cabecero (RC06) → el escritorio (RC09) · solo música, tres cortes secos en golpes de 13,5 · 13,9 · 14,6 dB |
| 4 | 16,6-21,0 | Mitad | lo que se compra | Isabella | MD03: camina frente a la cama del cabecero gris · «Una suite hotelera, totalmente equipada en El Poblado.» (a corte en un golpe de 25,3 dB) |
| 5 | 21,0-32,2 | Recorrido | lo que completa | la vista | la cocineta (RC02) → el baño con su ducha de vidrio (RC01) → de la cama al ventanal con la ciudad y las montañas (RC07, el plano más largo: 5,1 s) |
| 6 | 32,2-38,0 | CTA | invitar | Isabella | CT08: sentada en el sofá gris · «Agendemos una visita y descubre Go Living Suites.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Todos los planos entran a corte.** HK06 habla a los 0,62 s, MD03 a los 0,75 s y CT08 a los 0,75 s: ninguna deja los 12 f de una disolvencia más 12 de espera antes de la primera palabra, y MD03 solo deja **0,33 s** tras su última palabra (el clip dura 4,41 s): el plano que sigue a la mitad también entra a corte, porque una disolvencia taparía su última sílaba. La rejilla se buscó solo con cortes secos (`TIPOS=dccccccccc`): 16.061 combinaciones; la elegida lleva todos los golpes a ≥ 13,4 dB.
- **La música sube solo 7 f tras la mitad.** MD03 acaba a los 4,08 s y su clip a los 4,41 s: entre su última palabra (f620) y el golpe del plano siguiente (f629) caben 9,4 f; la puerta exige ≥ 8 y la subida es la más corta de las seis piezas. **Se oye en la prueba.**
- **Acento del hook: «propiedad», no «próxima propiedad».** El acento de dos palabras era tan ancho que el motor lo encogía por debajo de los 8 px pedidos (la puerta lo paró); «¿Y si tu próxima» va en base y «propiedad» en acento.
- **La vista repite RC07** (1,10-6,20 s; la 070 usa 2,50-6,07 s: se comparten 3,6 s). Es el único clip de la suite con un plano de ciudad de ≥ 5 s y la vista tiene que ser el plano más largo del bloque (153 f). Alternativas descartadas: RC10 (2,3 s) y RC13 (solo su ventana, 2,3 s; además la lavandería no consta que sea de la suite).
- **Los otros recorridos no repiten tramo con la 070** salvo la cocineta: RC02 2,60-5,17 s frente a 0,60-3,43 s de la 070 (0,8 s compartidos).
- **Canción: «Street Level Sessions on the Green»** (Daniel Armand; lo-fi/chillhop; repetida de la V12 y la V42, de otras propiedades; asignada en el reparto). Meseta uniforme de −9,9 a −11,5 LUFS (se BAJA 4-5 dB), entrada en 167,542 s (golpe de 14,6 dB) y caída desde los 205,0 s, bajo la tarjeta del cierre.

## Lo que queda por confirmar al oído (R31)

1. **La «Y» inicial** del hook (≈ 3,8 s): whisper 0,37; sin ella sería «Si tu próxima propiedad…».
2. **«hotelera» y «Poblado»** (MD03, ≈ 17,4-19,4 s): whisper 0,13 y 0,20.
3. **«Agendemos» y «Go Living Suites»** (CT08, ≈ 32,6 y 34,6 s): whisper oye «Ajenlemos» (0,14) y «Go Living Sweets».
