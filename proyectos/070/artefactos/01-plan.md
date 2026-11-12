# 01 · Plan narrativo — proyecto 070 · Suite Go Living (El Poblado, Medellín), V51 del registro («El POT y el Airbnb → la operación hotelera»)

> Paso 1 de 3. Escrito con el reparto aprobado por el usuario el 2026-11-07 (`proyectos/070/reparto-070-075.md`, que manda) y el catálogo del rodaje (`proyectos/070/catalogo/catalogo-material.md`). Es el primero de los seis reels de esta suite: lo que se decide aquí (estructura de diez planos, puerta, voz tratada, color) lo copian los otros cinco.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Ayúdame a hacer 6 videos» de la suite hotelera en venta (anuncio pegado por el usuario). Aprobado el reparto: «Sí, monta la 070». Este es el primero (**V51 / 070**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9 con vista al oriente, se vende a puerta cerrada (con muebles y enseres), matrícula independiente, operación hotelera activa en el edificio. **El precio no consta** (no va en el reel; el caption y la ficha lo piden). |
| Material | `Suite Go Living/Videos/` del SSD (no la carpeta de Los Patios que decía el encargo), copiado a `proyectos/070/original/` con el CÓDIGO del catálogo como nombre: HK01 `fd786db6`, MD02 `95ac1f8b`, CT01 `926f0cd1`, DR02 `69e57f0f` (+ DR03 de repuesto), RC12 · RC01 · RC02 · RC03 · RC04 · RC05 · RC06 · RC07. **Todo es iPhone 4K HEVC HLG con rotación −90** (corre la rama HDR de la receta, HLG → BT.709 con VideoToolbox: los rodajes de las piezas 054-062 eran SDR y no la usaron). |
| Composición | `Recorrido070` · 1080×1920 · **30 fps** · 1164 f (**38,8 s**). Clips normalizados a 1296×2304 y 30 fps; los de 29,97 fps llevan `setpts=PTS*1000/1001`. |
| Formato | 9:16 vertical · `recorrido-luxur` (EXTERIOR · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Destino | Reels · Shorts · TikTok · y la versión con ficha para anuncios (1:1), cuando haya precio |
| Presentadora | Isabella Cadavid |

## El ángulo: «El POT y el Airbnb → la operación hotelera»

**La idea en una línea:** esta suite es para quien quiere invertir en renta corta y duda por las reglas del juego; lo que la distingue es que el edificio **ya opera como hotel**. El hook lo plantea como pregunta («¿te preocupa invertir en Airbnb con los cambios del POT?»), la mitad lo vuelve condición («no todas las propiedades tienen las mismas condiciones para operar turísticamente») y el CTA nombra lo que sí consta en el anuncio («conoce Go Living, un edificio con operación hotelera activa»).

**Lo que NO se dice ni se escribe, y la puerta lo comprueba:** qué exige el POT, que esta suite lo cumple o está a salvo, valorización, rentabilidad, precio ni ninguna cifra. En lo jurídico se dice qué exige la norma, nunca qué debe hacer alguien; el anuncio no cuenta nada de la norma.

## Promesa y CTA

- **Promesa (primeros 2,9 s):** el edificio visto desde el suelo —la fachada de voladizos con el sol de frente— **sin texto ni voz** (regla fija), con el golpe de la canción en el f3. Isabella entra disolviendo y su imagen es opaca en el f88.
- **Acción final:** «conoce Go Living, un edificio con operación hotelera activa»: UNA acción (el enlace lo cierra la tarjeta: `PropiedadesLuxur.com`).

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,9 | El edificio | la promesa | la fachada | DR02 0,30-3,23 s: voladizos oscuros con el sol de frente y la entrada de vidrio · solo música: golpe de 13,6 dB en el f3 |
| 2 | 2,9-7,2 | Hook | la preocupación | Isabella | HK01: camina hacia cámara desde el ventanal de la suite · «¿Te preocupa invertir en el Airbnb con los cambios del POT?» (disolvencia que acaba en un golpe de 12,3 dB) |
| 3 | 7,2-17,2 | Recorrido | lo práctico | la puerta | la mano que abre con la tarjeta (RC12) → la cocineta (RC02) → el pasillo y el baño (RC01) · solo música, tres cortes secos en golpes de 12,6 · 16,8 · 15,4 dB |
| 4 | 17,2-22,7 | Mitad | la condición | Isabella | MD02: de pie junto al ventanal con la ciudad detrás · «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» (a corte en un golpe de 11,4 dB) |
| 5 | 22,7-32,2 | Recorrido | cómo se vive | la vista | la cama y el mueble de TV (RC06) → el sofá y el cabecero (RC04) → de la cama al ventanal con la ciudad y las montañas (RC07, el plano más largo) |
| 6 | 32,2-38,8 | CTA | invitar | Isabella | CT01: sentada en el sofá · «Conoce Go Living, un edificio con operación hotelera activa.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK01.** La voz habla de **1,17 a 4,10 s** (perfil de energía; whisper la ponía en 0,0): hay 35 f de aire antes de la primera sílaba, así que entra **disolviendo** (`desde` 23 f; la primera palabra suena a los 12,1 f del golpe).
- **Mitad = MD02.** La voz habla de **0,65 a 4,78 s** y el clip dura **5,53 s (166 f)**: no hay 12 f antes de `desde` para una disolvencia, así que entra **a corte** en el golpe de 11,4 dB con el clip ENTERO (`desde` 0, primera palabra a los 19,5 f). La pausa interna de «turísticamente» (4,01-4,25 s) NO es el final: el «-mente» llega hasta los 4,78 s (el primer cálculo con `limites-voz.py` daba 4,49 s y lo habría cortado).
- **CTA = CT01.** La voz habla de **0,50 a 4,10 s**: solo 15 f de aire, así que entra **a corte** en el golpe de 11,1 dB (`desde` 3 f; la primera palabra, a los 12 f).
- **Exterior = DR02**, no DR03 (su gemelo, sin usar): el destello del sol y la entrada de vidrio al final. «3 Dron» no es dron: es el iPhone desde el suelo mirando hacia arriba.
- **Recorrido = un solo cuarto.** El paseo de la suite va de la puerta (RC12, la mano que abre: el puente humano del formato) a lo práctico (cocineta RC02, baño RC01) y, tras la mitad, de la cama (RC06) al sofá (RC04) y la **vista del ventanal (RC07)**, el plano más largo del bloque 5. RC13 (la lavandería) no se usa: no consta que sea de la suite.
- **Canción: «Somewhere inside of me»** (Tiësto pres. Allure, remix de Gorshkov; chillout/trance melódico, repetida de la V15/031 de otra propiedad y declarada). Descartada *Flying Into the Sun*, que daba más rejillas pero su ventana arranca 13 dB más fuerte que el resto (la meseta a −15 LUFS saturaría el arranque). Entrada en 298,394 s (golpe de 13,6 dB), meseta de −9,5 a −10,4 LUFS (se BAJA 5 dB, no se sube) y **caída a los 332,5 s, 2 s después de entrar el CTA**: la cola queda bajo la tarjeta.
- **Acentos:** uno por toma, lejos entre sí: «del POT?» (la pregunta), «turísticamente.» (la condición) y «operación hotelera» (lo que distingue al edificio). «condiciones» y «Go Living,» van en base: con menos de 2 s entre acentos ninguno destaca.
- **Color (R32):** la base del canal; solo se bajó la exposición de RC06 (−0,12) y RC04 (−0,08), 25 niveles más claros que el resto. Luma 99-139, 0 % quemado.

## Lo que queda por confirmar al oído (R31)

1. **«el» de «en el Airbnb»** (HK01, ≈ 3,8-4,7 s del vídeo): whisper la oye con confianza 0,36.
2. **«POT»** (HK01, ≈ 5,5 s): se deletrea («pe-o-te»); whisper oye «peote» o «POT».
3. **«Go Living»** (CT01, ≈ 33,2 s): el nombre del edificio (el anuncio dice «Go Living Suites»; whisper oyó «GoLiving»).
