# 01 · Plan narrativo — proyecto 072 · Suite Go Living (El Poblado, Medellín), V53 del registro («La ubicación lo cambia todo»)

> Paso 1 de 3. Escrito con el reparto aprobado por el usuario el 2026-11-07 (`proyectos/070/reparto-070-075.md`, que manda), el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`) y lo aprendido en la 070 (el andamio, la puerta, la voz tratada, el color). Es el tercer reel de la suite.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Ayúdame a hacer 6 videos» de la suite hotelera en venta; aprobada la 070 y pedido «monta 071-075». Esta es la **V53 / 072**, montada en paralelo con las otras cuatro. |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9 con vista al oriente, a puerta cerrada, matrícula independiente, operación hotelera activa; cerca de C.C. Oviedo, C.C. Santa Fe, la estación Aguacatala del Metro y la Milla de Oro. **El precio no consta.** |
| Material | `Suite Go Living/Videos/` del SSD, copiado a `proyectos/072/original/` con el CÓDIGO del catálogo como nombre: HK11 `2dddac20`, MD08 `736c1f93`, CT11 `8016104d`, DR05 `259a55d3`, DR01 `3504313c`, DR03 `da5e05c4`, DR04 `50e1a02b` (repuesto), RC03 `0017dff4`, RC05 `9e367d6f`, RC07 `02c55997`, RC10 `afaca747` (repuesto), RC13 `85a37057`. Todo iPhone 4K HEVC HLG con rotación −90. |
| Composición | `Recorrido072` · 1080×1920 · **30 fps** · 1071 f (**35,7 s**). Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Presentadora | Isabella Cadavid |

## El ángulo: «La ubicación lo cambia todo»

**La idea en una línea:** esta suite está donde está —en El Poblado, a minutos de Oviedo, Santa Fe y la estación Aguacatala—, y eso es lo que el hook dice como tesis, la mitad como nombres y el CTA como invitación («descubre esta suite en El Poblado y déjate asombrar por la ubicación»). Las **tres tomas de Isabella son del edificio** (terraza alta, terraza tras el cristal, lobby) y el recorrido es **el edificio por fuera y la ciudad por las ventanas**: la suite aparece solo por lo que se ve desde ella.

**Lo que NO se dice ni se escribe, y la puerta lo comprueba:** nada del POT ni de normas, ninguna cifra, valorización, rentabilidad ni ganancia. Los nombres de lugares los dice SU VOZ y aquí solo hay su transcripción; **«EAFIT» no está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y queda para confirmar.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,7 | El edificio | la promesa | los voladizos | DR05 0,60-3,27 s: el cielo con nubes y el borde de la fachada · solo música: golpe de 22,5 dB en el f3 |
| 2 | 2,7-6,3 | Hook | la tesis | Isabella | HK11: en la terraza alta, de pie, con el cielo y la ciudad detrás · «En inversión inmobiliaria, la ubicación lo cambia todo.» (a corte en un golpe de 22,9 dB, el clip entero) |
| 3 | 6,3-15,6 | Recorrido | el edificio y su entorno | la fachada | la fachada con el sol (DR03) → la fachada entre las plantas (DR01) → la suite, de la entrada a su ventana (RC03) |
| 4 | 15,6-20,1 | Mitad | los nombres | Isabella | MD08: camina hacia cámara tras la puerta de vidrio de la terraza · «A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.» (a corte en un golpe de 25,6 dB, el clip entero) |
| 5 | 20,1-29,0 | Recorrido | la ciudad desde el piso 9 | la vista | la ciudad por una ventana (RC13) → el ventanal de la habitación (RC05) → de la cama al ventanal, la ciudad y las montañas (RC07, el plano más largo) |
| 6 | 29,0-35,7 | CTA | invitar | Isabella | CT11: camina por el lobby con los ventanales · «Descubre esta suite en El Poblado y déjate asombrar por la ubicación.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK11.** La voz habla de **0,47 a 3,58 s** (perfil de energía; `limites-voz --margen 40` daba 3,17 y cortaba «lo cambia todo») y el clip dura **3,67 s (110 f)**: se usa ENTERO y a corte en el golpe (la primera palabra, a los 14 f). Consecuencia: el paso al paseo cae en el último fotograma del clip, **sin golpe** (la canción no tiene dos golpes a 3,6-3,67 s). Declarado en la puerta (`SIN_GOLPE`); precedente: la salida del hook de la 062.
- **Mitad = MD08.** La voz habla de **0,47 a 4,32 s**; el clip dura 4,97 s (149 f) y se usa ENTERO (a corte). La mitad dura **136 f (7 compases)**: no hay golpe a 144-149 f y a 155 f ya no cabe en el clip. Quedan 6 f entre su última palabra y el siguiente golpe: la música sube con su curva de 14 f POR ENCIMA del corte (el golpe del f603 suena al 38 % de su subida). Declarado.
- **CTA = CT11.** La voz habla de **0,76 a 4,38 s** (`limites-voz` daba 3,37 s y cortaba «por la ubicación»): entra **disolviendo** (`desde` 12 f; la primera palabra suena a los 10,8 f del golpe).
- **Exterior = DR05** (asignado): voladizos y cielo; DR03 (fachada con el sol) y DR01 (fachada entre plantas) hacen de paseo por fuera; DR04, repuesto sin usar. «3 Dron» no es dron.
- **Recorrido = lo que se ve desde dentro.** Bloque 3: DR03 → DR01 → RC03 (la suite entera hacia su ventana); bloque 5: RC13 **solo su ventana** (la lavandería de su principio no consta como de la suite) → RC05 → la vista RC07, que **repite 3,1 s de la 070** (2,45-6,22 frente a 2,5-6,07 s): es el único plano que enseña la ciudad desde el ventanal con esa amplitud y se declara.
- **Canción: «I Feel It Coming»** (The Weeknd, versión de saxofón; repetida de la V21/021, de otra propiedad). Entrada en 227,745 s (golpe de 22,5 dB), meseta de −10,6 a −12,1 LUFS que se BAJA 3-4 dB (no se sube) y decaimiento largo desde los 252 s que suena bajo la voz del CTA. La rejilla (`herramientas/rejilla-libre.py`, con la salida del hook libre) tiene el golpe más débil en **15,2 dB**.
- **Acentos:** uno por toma, lejos entre sí: «lo cambia todo.» (la tesis), «A minutos de» (la distancia) y «por la ubicación.» (el cierre de la idea). Los nombres propios van en base.
- **Color (R32):** la base del canal; se bajó la exposición de RC13 (−0,15) y de RC03 (−0,10) tras medir los stills (luma 142 y 133 frente a 90-110 del resto).

## Lo que queda por confirmar al oído (R31)

1. **«Oviedo»** (MD08, ≈ 16,7 s del vídeo): whisper oyó «odio» (0,02); se lee «Oviedo» por el contexto y el anuncio.
2. **«EAFIT»** (MD08, ≈ 18,1 s): whisper oyó «Eafid» (0,34); **no está en el anuncio** (decirlo al usuario).
3. **«Aguacatala»** (MD08, ≈ 18,7 s): whisper oyó «Acuacatala» (0,42); su inicio exacto es ambiguo entre «estación» y «Aguacatala».
4. **«déjate»** (CT11, ≈ 31,2 s): whisper la oyó con 0,05.
