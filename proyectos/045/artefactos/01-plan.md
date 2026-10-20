# 01 · Plan narrativo — proyecto 045 · Tierra Grata Bosque Santo (El Poblado), apartamento en ARRIENDO, V27 del registro («EL TIEMPO»; primero de los seis reels de la propiedad)

> Paso 1 de 3. Escrito con el reparto (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la skill `recorrido-luxur` (formato, montaje, viaje emocional, subtítulos editoriales), `ficha-luxur`, `portada-luxur` y lo aprendido en el 043 (`aprendizajes.md` y `combinaciones.md`), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto 045 (V27, «El tiempo») del arriendo de Tierra Grata: un reel 9:16 del formato `recorrido-luxur` en sus DOS formatos (orgánico y con ficha), con la apertura en el APARTAMENTO, HK01 · MD01 · CT01, RC21 de clímax y *Fortitude (Light Version)*.» Una de las seis sesiones del lote V27-V32 (2026-10-19: «voy a empezar a promocionar el arriendo … 6 videos, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook. Cada video en una sesión diferente con Sonnet 5.5»). El reparto de tomas, apertura, clímax y canción de cada una ya venía decidido para que las seis no se pisen; no se cambia sin un motivo técnico declarado. |
| Numeración | **V27 / 045.** Las V28-V32 (046-050) son de las sesiones hermanas, en sus worktrees. La reserva de música y de tomas de esta pieza ya estaba en `archivos/musica/registro-de-uso.md` (§1, §2 y §7). |
| La propiedad y la ficha | Apartamento amoblado de 113 m² en Tierra Grata Bosque Santo, El Poblado (Medellín), a pocos metros de la Av. Las Palmas. Ficha leída por la coordinadora el 2026-10-19 en `propiedadesluxur.com`: **ARRIENDO** · COP 14.800.000 al mes · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · balcón con **jacuzzi privado** · la unidad: carril de nado, zonas húmedas, gimnasio, Social Kitchen, coworking… **No consta**: administración, contrato, qué se paga aparte, tiempos a ningún sitio. Nada de eso se afirma en el vídeo. Lo que dice Isabella (17-oct): aseo semanal incluido, acompañamiento personalizado desde el día uno, «durante toda tu estancia». |
| Material | `…/Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`; **no hay `3 Dron`**), copiado a `proyectos/045/original/` con el CÓDIGO del catálogo por nombre. sha256 en `normalizar.mjs`: HK01 `6222883e`, MD01 `8bd49f96`, CT01 `cc19421e`, RC01 `9f23d5be`, RC05 `931b51dd`, RC09 `8b1031a3`, RC11 `38a59f31`, RC13 `e977e148`, RC16 `7cdf817e`, RC21 `7ca598cd`, música `493eeec6`. |
| Lo que sorprende del material (declarado) | **(1)** Las tres tomas de Isabella (17-oct) son 4K HLG verticales (R19/R21: tone-map con VideoToolbox) y están en las ZONAS COMUNES de la unidad: HK01 y MD01 caen las dos en la terraza común (con la pérgola; HK01 con el cristal y el atardecer, MD01 con la ciudad y las montañas) y CT01 junto al jacuzzi comunal redondo; no hay otro sitio donde ponerla. **(2)** Todo el recorrido es **HORIZONTAL (1920×1080, SDR)**: `normalizar.mjs` lo recorta a una ventana vertical de 608×1080 (`crop` ANTES de `scale=1296:2304`) y lo escala ×2,13: **sale más blando que Isabella (4K)**; no se filtra ni se inventa nitidez (R22). Se dice al usuario. **(3)** **No hay dron.** **(4)** **El jacuzzi PRIVADO del balcón SÍ está en el material**: RC21 (`Img 9537 (1).mp4`), de ≈ 8,3 s al final de la panorámica (la caja de madera cuadrada con su escalón; es el de la foto `3-Jacuzzi.png` de la ficha). RC21 es justo el clímax asignado a esta pieza. Anotado en el catálogo, en el registro (§7) y en las notas del grupo de sesiones. |
| Composición | `Recorrido045` · 1080×1920 · **30 fps** · 1318 f (43,9 s). Clips normalizados a 1296×2304 y 30 fps (iPhone: HLG → BT.709 con VideoToolbox; el recorrido, apaisado, recortado y escalado). |
| Formato | 9:16 vertical · `recorrido-luxur` (APARTAMENTO · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) · tres frases de Isabella. Dos entregas: **orgánico** (con subtítulos editoriales, `045-recorrido.mp4` CRF 12 + CRF 16 + `.srt` + portada + caption) y **funnel** (la versión con ficha, `045-recorrido-ficha.mp4`, sin subtítulos). |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. Sin SFX. |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (funnel). |
| Presentadora | Isabella Cadavid (asesora de la ficha). |

## El ángulo: «EL TIEMPO»

**La idea en una línea:** este apartamento es para quien quiere **ganar tiempo en una ciudad que no es la suya**: el hook dice que el tiempo es lo más valioso y que se le ayuda a ganarlo (con el aseo semanal incluido), la mitad dice en qué se gasta ese tiempo («lo que eres mejor») y el CTA invita al acompañamiento. Los planos de la unidad enseñan DÓNDE se gasta lo ganado (trabajar en la Social Kitchen, entrenar, nadar); los del apartamento, el orden al volver (la cama hecha, el baño en su sitio) y, de clímax, el balcón al atardecer con el jacuzzi privado.

### Lo que NO se cuenta

Precio (COP 14,8 millones al mes: va en la versión con ficha y en el caption), áreas, administración, contrato, qué se paga aparte, tiempos a ningún sitio, quién hace el aseo ni cada cuánto fuera de «semanal». «Acompañamiento personalizado» tal cual lo dice ella: la ficha no lo define y el vídeo tampoco.

## Promesa y CTA

- **Promesa (primeros 3,7 s):** la cocina del apartamento (RC01), con su isla y sus taburetes, **sin texto ni voz** (regla fija) y con el golpe de la música en el f3. Isabella entra con una disolvencia que acaba en el golpe del f111; su primera palabra suena en el f121.
- **Acción final:** «si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos»: UNA acción.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,7 | La apertura | el apartamento, ordenado | cocina | RC01 3,80-7,50 s: la isla y sus taburetes, el suelo de madera y la planta, la cámara avanza y gira a la derecha · solo música, golpe de entrada de 11,3 dB en el f3 |
| 2 | 3,7-10,4 | Hook | el tiempo es lo más valioso | Isabella | HK01: camina hacia cámara por la terraza de la unidad, con la pérgola, el cristal y el atardecer · «El tiempo es el activo más valioso de los seres humanos y te ayudamos a optimizarlo incluyendo un aseo semanal.» |
| 3 | 10,4-20,7 | Recorrido | dónde se gasta el tiempo ganado | la unidad | la Social Kitchen (RC11, 3,4 s) → el gimnasio (RC13, 3,6 s) → el carril de nado (RC16, 3,4 s) · solo música |
| 4 | 20,7-25,6 | Mitad | «todo ordenado» | Isabella | MD01: camina hacia cámara bajo la pérgola, con la ciudad y las montañas detrás · «De esta manera tendrás todo ordenado y aprovecharás el tiempo en lo que eres mejor.» |
| 5 | 25,6-37,1 | Recorrido | el apartamento: lo íntimo y la vista | apartamento | la alcoba principal con la cama hecha (RC05, 3,1 s) → el baño (RC09, 2,7 s) → **LA VISTA: el balcón al atardecer, las luces de la ciudad y el jacuzzi privado** (RC21, 5,6 s, el plano más largo) |
| 6 | 37,1-43,9 | CTA | invitar | Isabella | CT01: junto al jacuzzi comunal redondo, con las plantas y la baranda · «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK01, mitad = MD01, CTA = CT01 (asignados).** «De esta manera» de MD01 continúa a HK01; HK01 y CT01 las REPITEN otras piezas del lote (la V30/048 repite HK01; la V31/049 repite CT01): solo hay 3 hooks y 3 CTA del 17-oct para seis reels, y la pareja hook·CTA no se repite en ninguna. Declarado.
- **La voz de HK01 NO empieza en el f0.** El catálogo decía «la voz empieza casi en el f0»: es el DTW de whisper, que pone la primera palabra de toda toma en 0,00 s (R29). El perfil de energía dice que hay 0,76 s de silencio (−66 dB), un resoplido a −46 dB (0,75-0,81 s), el «El» a −21 dB (0,83-0,95 s) y «tiempo» a −8 dB (1,00 s). Con `desde` 15 f la toma entra con una disolvencia (12 f) que acaba en un golpe y su primera sílaba suena 10 f después. Las tres tomas llevan además un chasquido de labios 70-100 ms antes de la primera palabra (MD01 0,55 s, CT01 0,63 s) que la voz tratada deja fuera (`VENTANA_VOZ` de `normalizar.mjs`).
- **El recorrido de la unidad: Social Kitchen → gimnasio → piscina.** Del paseo propuesto en el reparto (§3) —«piscina, gimnasio, Social Kitchen, sauna: 2-3 planos»— se eligen los tres usos del tiempo que el hook anuncia (trabajar, cuidarse, descansar) y se deja la sauna fuera (RC15: 4,6 s, oscura y movida). El giro a la derecha de los tres enlaza con la terraza donde espera Isabella (MD01). Del gimnasio se usa RC13 de 0,00 a 3,57 s con la ventana pegada a la derecha (x = 1312; centrada enseñaba de cara a dos personas entrenando desde el f0): la estantería con la pared naranja y, al fondo, la gente pequeña y lejana (≈ 6 % del alto). **Se descartó RC14** (la pared de rayas, más vistosa): panea a la izquierda (rompe el raccord) y de los 2,6 s en adelante dos hombres entrenando salen grandes y de cara, y la Social Kitchen se acorta a 0,90-4,27 s (RC11 de 4,0 s en adelante deja ver a un hombre sentado con un portátil).
- **El recorrido del apartamento: alcoba → baño → balcón.** La cocina y la sala ya salieron en la apertura (RC01) y no se vuelve atrás. RC05 (la cama hecha con sus cojines) y RC09 (los lavamanos y el espejo) son «todo ordenado» enseñado justo después de decirlo. Quedan fuera RC04 y RC20 (aperturas de otras piezas), RC02 (su tramo final es el clímax de la 050) y RC03, RC10, RC18, RC19 (clímax de otras).
- **El clímax es RC21 y lleva el jacuzzi privado.** Tramo 5,43-11,07 s (el último fotograma del clip): las luces de la ciudad y las torres al atardecer, y, al final del giro a la derecha, el jacuzzi de madera con su escalón en el balcón de baldosa negra. Con el recorte central (x = 656) el jacuzzi entra a medias; el de este clip va a x = 950 (probado a 656, 900, 950 y 1100) para que quede casi entero. **Ojo declarado:** el CTA (CT01) está junto al jacuzzi COMUNAL redondo, justo después del jacuzzi privado del balcón: son dos jacuzzis distintos y ninguna frase de Isabella los nombra.
- **RC01 de apertura: tramo de 3,80 a 7,50 s.** El de 2,2 s (primera prueba) enseñaba un altavoz JBL y un escurridor sobre la encimera y los de 3,0 y 3,4 s aún dejan asomar el JBL al fondo de la isla (la miniatura tiene que salir limpia); el de 3,8 s arranca en el canto de la isla con los taburetes en diagonal.
- **Canción = *Fortitude (Light Version)*** (`493eeec6`; reservada para esta pieza; alternativa *Cornfield Chase*, que no hizo falta). Es una canción SUAVE en los 10-50 s (−21…−17 LUFS) con golpes débiles (6-11 dB): **no hay ninguna rejilla con todos los cortes secos a ≥ 9 dB**. La única que da la canción en esos 10-50 s es la de entrada **9,834 s** (golpe de 11,3 dB), con los cortes secos en golpes de **8,3 a 15,5 dB** y dos entradas con disolvencia (el hook, 8,0 dB, y la Social Kitchen, 6,1 dB) cuyo golpe no hace falta que sea fuerte (`herramientas/buscar-cortes-043.py` con `TIPOS=cddccccccc`, `MINC=8`, `MIND=6`, `musica/buscar-cortes-045-8db.txt`). El CTA entra en el golpe de 15,5 dB de 46,873 s, tras el cual la canción cae a una sección más suave (−20 LUFS). Medida, no oída; licencia sin verificar (`HAY_MUSICA = false` es la salida).
- **La música sola va a −15,0 · −15,5 · −15,2 LUFS** en lugar de −15 clavado: la canción sube de +2,8 a +5,5 dB y el techo de pico de −0,5 dBFS manda en el paseo y en el bloque 5 (declarado).
- **El color se casa plano a plano** (R32): tres tomas de Isabella a la luz de la tarde, recorridos de interior claros y cálidos (RC01, RC05, RC09), de la unidad oscuros (RC11, RC13) y de exterior a la hora azul (RC16, RC21). Cada plano lleva su `color`, medido (`medir-color.py`); ver `combinaciones.md`.
- **Los sitios de Isabella** son dos distintos (la terraza común, dos veces, y el jacuzzi comunal); en las tres camina hacia cámara o se apoya en la baranda: empuje 1,00 → 1,04.
- **Ninguna cifra** en pantalla ni en voz (ni el precio: va en la versión con ficha y en el caption).

## Lo que comparte con otras piezas del lote (declarado)

| Clip | Otras piezas | V27 |
|---|---|---|
| HK01 | V30 (048) | 0,50-7,23 s (el hook entero, repetido) |
| CT01 | V31 (049) | 0,37-5,17 s (la toma entera, repetida) |
| RC01, RC21 | ninguna (apertura y clímax exclusivos) | 3,00-6,70 s · 5,43-11,07 s |
| RC05, RC09, RC11, RC13, RC16, MD01 | otras sesiones PUEDEN repetir recorridos declarándolo; no hay aviso de ninguna | libres (hasta donde sé) |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/045-recorrido.mp4`, 540×960) y a lo declarado: **el recorrido horizontal recortado y más blando**, **el hook y el CTA repetidos en otras piezas**, **la canción suave y sus cortes en golpes de 8-15 dB**.
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «aseo semanal» (HK01, ≈ 9,1 s del vídeo) · «todo ordenado» (MD01, ≈ 22,4 s) · «toda tu estancia» (CT01, ≈ 39,6 s) · «contáctanos» (CT01, ≈ 40,4 s).
3. **El gimnasio deja ver a un hombre entrenando en los últimos 0,7 s del plano (f500-521)**: de lado y a ≈ 13 % del alto del cuadro, sin cara reconocible (RC13 con la ventana pegada a la derecha; centrada era peor). Es gente de la unidad en una zona común. Si se prefiere sin nadie: el plano se cambia por la sauna (RC15, 4,6 s, oscura) o por el carril de nado desde el otro extremo (RC17); el `desde` y el `color` del plano, y nada más.
4. La canción (medida, no oída; suave; licencia sin verificar).
