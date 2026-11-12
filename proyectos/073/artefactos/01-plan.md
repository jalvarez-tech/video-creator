# 01 · Plan narrativo — proyecto 073 · Suite Go Living (El Poblado, Medellín), V54 del registro («¿Vives fuera de Colombia? → la suite lista, con título propio»)

> Paso 1 de 3. Escrito con el reparto aprobado por el usuario el 2026-11-07 (`proyectos/070/reparto-070-075.md`, que manda), el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`) y lo aprendido en la 070 (`proyectos/070/aprendizajes.md`), de la que hereda el andamio. Cuarta de las seis piezas de esta suite.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta 071-075» (el usuario aprobó la prueba de la 070). Esta es la **V54 / 073**: hook y CTA dirigidos a quien invierte desde el extranjero. |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9 con vista al oriente, se vende a puerta cerrada, matrícula inmobiliaria independiente, operación hotelera activa. **El precio no consta** (no va en el reel). |
| Material | `Suite Go Living/Videos/` del SSD, copiado a `proyectos/073/original/` con el CÓDIGO del catálogo como nombre: HK10 `dc40b70a`, MD01 `5f6fd0ca`, CT10 `1a0ab87d`, DR09 `4baad2e4`, RC03 `0017dff4` · RC11 `18ddf74c` · RC04 `35bf033f` · RC06 `eab2200b` · RC05 `9e367d6f` · RC07 `02c55997` (+ RC02 y RC10 normalizados, sin usar). Todo iPhone 4K HEVC HLG con rotación −90 (rama HDR de `normalizar.mjs`). |
| Composición | `Recorrido073` · 1080×1920 · **30 fps** · 1229 f (**41,0 s**). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Presentadora | Isabella Cadavid |

## El ángulo: «¿Vives fuera de Colombia? → la suite lista, con título propio»

**La idea en una línea:** para quien vive fuera y no puede venir a verla, la suite se enseña como se recibe —lista, con su cama, su TV y su escritorio— y se dice qué es lo que se compra: una suite hotelera con matrícula independiente. El hook le habla directamente («¿vives fuera de Colombia y quieres invertir en Medellín?»), la mitad responde qué se compra y el CTA le da el siguiente paso («haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín»).

**Lo que NO se dice ni se escribe (la puerta lo comprueba):** qué exige el POT ni que la suite lo cumple, valorización, rentabilidad, ganancia, precio ni cifra. «Matrícula independiente» consta en el anuncio; **«en edificios con reconocimiento» es una afirmación de Isabella que el anuncio no recoge** y queda marcada por confirmar (va en base, sin acento).

## Promesa y CTA

- **Promesa (primeros 3,1 s):** la torre vista desde el suelo entre palmas, **sin texto ni voz** (regla fija), con el golpe de 22,2 dB de la canción en el f3. Isabella entra a corte en el f93 y habla desde el f110.
- **Acción final:** «haz clic en el enlace y recibe más información»: UNA acción (el enlace lo cierra la tarjeta: `PropiedadesLuxur.com`).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,1 | El edificio | la promesa | la torre | DR09 2,00-5,13 s: la torre de piedra clara entre palmas y platanillos con el cielo nublado · solo música: golpe de 22,2 dB en el f3 |
| 2 | 3,1-6,8 | Hook | la pregunta | Isabella | HK10: en la terraza del edificio, de pie junto a la banca de madera · «¿Vives fuera de Colombia y quieres invertir en Medellín?» (a corte en un golpe de 22,8 dB; el clip dura 3,8 s y se usa entero) |
| 3 | 6,8-16,6 | Recorrido | la suite lista | el umbral | del pasillo con el espejo a la habitación (RC03) → el mueble de TV y el escritorio (RC11) → la habitación en abierto (RC04) · solo música, cortes en golpes de 9,0 · 21,5 · 10,7 dB |
| 4 | 16,6-22,3 | Mitad | qué se compra | Isabella | MD01: al fondo de la suite, junto al ventanal, acercándose · «Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.» (disolvencia que acaba en un golpe de 10,4 dB) |
| 5 | 22,3-33,8 | Recorrido | cómo se vive | la vista | la cama y el sofá (RC06) → el cabecero con los cuadros (RC05) → de la cama al ventanal con la ciudad y las montañas (RC07, 4,7 s, el plano más largo) |
| 6 | 33,8-41,0 | CTA | invitar | Isabella | CT10: sentada en el sofá de cuero del lounge · «Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK10.** La voz habla de **0,57 a 3,31 s** (energía; `limites-voz` daba 0,66-3,17). El clip dura **3,80 s (114 f)** y no deja 12 f de aire con la primera palabra a ≥ 8 f del golpe: entra **a corte** en el golpe con el clip ENTERO (`desde` 0; primera palabra a los 17,1 f) y el plano dura 112 f (12,7 f tras la última palabra: la música sube en 10).
- **Mitad = MD01.** La voz habla de **0,88 a 5,40 s** (`limites-voz` daba 5,34; hay un ruido de boca suelto a 5,5 s que NO es voz). Entra **disolviendo** con `desde` 14 f (el clip tiene 14 f antes; primera palabra a los 12,4 f del golpe) y usa el clip hasta su último fotograma (14 + 173 = 187 de 191 f).
- **CTA = CT10.** La voz habla de **0,62 a 4,85 s**: «Haz» es una sílaba suelta de 0,62-0,74 s y el silencio de 0,13 s siguiente es el cierre de la «c» de «clic»; `limites-voz` arrancaba en 0,91 s y se comía la primera palabra (y acababa en 4,52 s: se comía «Medellín»). Entra **a corte** (`desde` 6 f; primera palabra a los 12,6 f) y dura 155 f (15,5 f tras la última palabra).
- **Exterior = DR09** (la torre entre palmas), 2,00-5,13 s.
- **Recorrido = la suite lista, vista por quien no puede venir.** RC03 (umbral), RC11 (TV y escritorio), RC04 (habitación en abierto: tramo 3,8-6,07 s, distinto del 0,6-3,57 de la 070), RC06 (4,5-7,43 s, distinto del 1,2-4,17 de la 070), RC05 (cabecero con cuadros). La **vista** repite RC07 (1,5-6,23 s; la 070 usa 2,5-6,07: **comparten 3,6 s**, declarado): es el único plano del cuarto en que la cámara sube de la cama al ventanal con la ciudad; RC10 solo dura 2,3 s y la ventana de RC05 acaba en la cama.
- **Canción: «Chillin'» (F.G.G., Chillstep Mix)**, repetida de la V18/034 de otra propiedad (declarada). **Descartada la asignada, «Familiar» (Nils Frahm)**: la rejilla existía (cortes ≥ 9,0 dB, e0 9,6 dB) pero la canción cambia 22 dB de nivel dentro de la ventana (intro −46,6 LUFS, pico −24, cola −41,8) y el motor no deja subir una pista más de +6 dB (`GANANCIA_MAXIMA` de `tramos.ts`: «eso ya no es fabricar un nivel»): la intro habría sonado a −40 LUFS. «Chillin'»: entrada en 259,21 s (golpe de 22,2 dB), intro a −12,5 LUFS, cuerpo a −15,6/−17,4 LUFS y **caída a los 294,75 s, 1,8 s después de entrar el CTA**.
- **Acentos:** uno por toma, lejos entre sí: «en Medellín?» (la pregunta), «matrícula» (el concepto) y «Go Living Suites» (el nombre del edificio). Lo que no consta en el anuncio («con reconocimiento.») va en base.
- **Color (R32):** la base del canal; exposición −0,06 a −0,14 en los cinco planos del recorrido, que salían 20-30 niveles más claros que los de Isabella (luma 99-137, 0 % quemado).

## Lo que queda por confirmar al oído (R31)

1. **«vives»** (HK10, ≈ 3,7-4,7 s del vídeo): whisper oye «Vivo» (confianza 0,14-0,16); y **«Medellín»** (0,36).
2. **«en edificios con reconocimiento»** (MD01, ≈ 19,6-21,6 s): afirmación suya que el anuncio no recoge; confirmar con el usuario además de oír.
3. **«Haz»** (CT10, ≈ 34,2 s; confianza 0,14) y **«Go Living Suites»** (≈ 36,9 s; whisper oyó «StatSuite», 0,04).
