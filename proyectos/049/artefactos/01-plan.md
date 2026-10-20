# 01 · Plan narrativo — proyecto 049 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V31 del registro («AMENIDADES»)

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web (leída por la coordinadora el 2026-10-19) y lo aprendido en el 043 (`aprendizajes.md` y `combinaciones.md`), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto **049 (V31, «Amenidades»)** del arriendo de Tierra Grata: un reel 9:16 del formato `recorrido-luxur` en sus DOS formatos (orgánico y con ficha).» Una de las seis sesiones de los reels de arriendo (045-050, encargo del usuario del 2026-10-19: «6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos. No tengo videos de dron: haz una combinación de empezar con una toma del apartamento y otros directamente con el hook»). El reparto de tomas, apertura, clímax y canción ya venía fijado para que las seis no se pisen; no se cambia sin un motivo técnico declarado. |
| Numeración | **V31 / 049.** Hermanas: V27/045, V28/046, V29/047, V30/048 y V32/050, en sus worktrees. La reserva de esta pieza ya está en `archivos/musica/registro-de-uso.md` (§1 y §2). |
| La propiedad y la ficha | Apartamento **amoblado** de 113 m² con jacuzzi privado en el balcón, Tierra Grata Bosque Santo, El Poblado, Medellín («a pocos metros de la Avenida Las Palmas»): **ARRIENDO** a **COP 14.800.000 al mes** (piso 9, 2 habitaciones, 2 baños, 2 parqueaderos, 2023). La misma unidad está en venta; **las piezas no lo nombran**. Dicho por Isabella el 17-oct: acompañamiento personalizado, amenidades de la unidad. **No consta**: administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el «acompañamiento» ni si se paga aparte. Nada de eso se afirma en el vídeo. |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` (SSD), copiado a `proyectos/049/original/` con el CÓDIGO del catálogo por nombre. sha256 en `normalizar.mjs`: HK03 `75a87dfa`, MD05 `1d92690e`, CT01 `cc19421e`, RC01 `9f23d5be`, RC04 `c6cd691d`, RC08 `34119359`, RC09 `8b1031a3`, RC12 `7bc5ad03`, RC13 `e977e148`, RC14 `59647a5b`, RC17 `c99bc2f1`, RC19 `86ddbfbd`, música `bd507fe6`. **No hay dron.** |
| Lo que NO es lo que parece | (1) **El rodaje del 17-oct no siguió el libreto 044**: Isabella grabó once frases del ángulo «acompañamiento personalizado» y las tres de esta pieza son suyas; el caption sale del libreto §8 con el canon. (2) **Las tres tomas de Isabella están en zonas comunes de la unidad** (escaleras exteriores, gimnasio, junto al jacuzzi comunal), nunca dentro del apartamento. (3) **Todo el recorrido es HORIZONTAL 1920×1080 SDR**: se RECORTA al centro (608×1080, `crop` en `normalizar.mjs`) y se escala ×2,13: sale **más blando** que Isabella en 4K. Se dice en la prueba y no se filtra (R22). |
| El jacuzzi PRIVADO | La foto `3-Jacuzzi.png` (balcón con jacuzzi cuadrado de madera y las torres detrás) **no aparece en ningún clip que usa esta pieza** (las hojas de contactos de RC04-RC09, RC11-RC17, RC19, RC22 y RC02 se miraron, cuadro a cuadro por segundo; RC03, RC21, HK04 y HK05 no). El clímax es el asignado: el deck con el jacuzzi **comunal** redondo (RC19). Se declara en el plano, en el caption y en el catálogo. |
| Composición | `Recorrido049` · 1080×1920 · **30 fps** · 1401 f (46,7 s). Clips a 1296×2304 y 30 fps (HLG → BT.709 con VideoToolbox en las tomas; el recorrido, SDR, recortado y escalado). |
| Formato | 9:16 vertical · `recorrido-luxur` (APARTAMENTO · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) · tres frases de Isabella · **dos formatos**: orgánico (subtítulos editoriales) y con ficha (`ficha-luxur`, sin subtítulos). |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. |
| Destino | Reels · Shorts · TikTok (orgánico) y Meta Ads / feed 1:1 (con ficha). |
| Presentadora | Isabella Cadavid (asesora de la ficha). |

## El ángulo: «AMENIDADES» (y en qué se distingue de las hermanas)

**La idea en una línea:** esto es para quien **llega a una ciudad que no es la suya** y quiere que se la resuelvan: el hook da la promesa (el acompañamiento personalizado), la unidad la enseña con lo que tiene (piscina, Social Kitchen, gimnasio) y Isabella lo dice en la mitad («esta unidad cuenta con diferentes tipos de amenidades»); el apartamento (alcoba y baño) es lo que se habita y el deck con el jacuzzi comunal, el cierre antes del CTA.

| | V27 (045) | V28 (046) | V29 (047) | V30 (048) | **V31 (049)** | V32 (050) |
|---|---|---|---|---|---|---|
| Nombre | «El tiempo» | «Ciudad nueva» | «Lo que incluye» | «Chef y experiencias» | **«Amenidades»** | «14,8» |
| Apertura | APTO RC01 | HOOK | APTO RC20 | HOOK | **APTO RC04 (sala)** | HOOK |
| Hook | HK01 | HK03 | HK02 | HK01 | **HK03** | HK02 |
| Mitad | MD01 | MD02 + MD03 | MD04 + MD05 | MD03 | **MD05** | MD04 |
| CTA | CT01 | CT02 | CT03 | CT03 | **CT01** | CT02 |
| Clímax | RC21 | RC18 | RC03 | RC10 | **RC19** | RC02 final |
| Canción | *Fortitude* | *Children (Piano)* | *Dreamlife* | *Einaudi Fly* | ***In This Together*** | *Spring is Coming* |

### Lo que NO cambia respecto de las hermanas (y se dice)

- **El hook es el de la V28 (HK03) y el CTA, el de la V27 (CT01)**; la mitad (MD05) también la lleva la V29. El reparto lo asigna así porque solo hay 3 hooks, 5 mitades y 3 CTA del 17-oct: cada uno va dos veces y ninguna pareja hook·CTA se repite. HK03 y CT03 dicen lo mismo y nunca van juntas: aquí HK03 va con CT01.
- **Recorridos compartidos**: el material de apartamento y unidad es corto y las seis piezas lo usan. Para repetir lo menos posible, esta pieza eligió los clips y tramos que las hermanas usan menos: RC17 (piscina; las demás, RC16), RC12 (Social Kitchen; las demás, RC11), RC14 y RC13 (gimnasio) y el **último tramo** de RC09 (el baño; las demás, el medio). La puerta (sección 7b) informa de lo que aún coincide con las que ya existían al montarla.
- **Tres tomas PEDIDAS POR EL USUARIO tras ver la prueba** («incluye tomas: Img 9484, Img 9481, Img 9461»): **RC09** (el baño, ya estaba), **RC08** (la alcoba con la puerta del baño, ya estaba) y **RC01** (la cocina con isla), que el reparto original reservaba como **apertura de la V27 (045)**. El usuario manda sobre el reparto: RC01 entra en el bloque 5 como primer plano del apartamento (aquí no abre nada) y el bloque 5 pasa a ser cocina → alcoba → baño → clímax, que es el orden en que se camina. Se sustituye RC06 (la alcoba por otro ángulo, que había puesto yo). Tramo de RC01: 1,20-4,70 s (la isla, los taburetes y el ventanal con el jardín; el final del clip, con la vista entera, queda fuera); comparte 0,9 s con la apertura de la V27 (3,8-7,5 s). **La sesión de la V27 (045) conviene que lo sepa.**
- **MD05 empieza por «Además»**: se colocó tras el recorrido de la unidad (cuatro planos de amenidades), que es lo que continúa.

## Promesa y CTA

- **Promesa (primeros 2,4 s):** la sala del apartamento —el sofá gris, la pared de listones con sus tiras de luz, la mesa con el sol— en una panorámica lenta (RC04), **sin texto ni voz** (regla fija), con el golpe de la música en el f3. Isabella entra a corte en el f71, en las escaleras exteriores.
- **Acción final:** «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos»: UNA acción.
- **Lo que NO se cuenta:** precio (14,8 millones al mes: va en la ficha de la versión de anuncios y en el caption), áreas, administración, contrato, minutos a ningún sitio, ni que el «acompañamiento» incluya algo concreto (aseo, chef…): Isabella no lo dice en estas tres frases.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,4 | La apertura | la sala del apartamento | apartamento | RC04 1,00-3,37 s: el sofá gris, la pared de listones con luz, la mesa con el sol · solo música, golpe de entrada de 11,2 dB en el f3 |
| 2 | 2,4-8,4 | Hook | la promesa | Isabella | HK03: en las escaleras exteriores, el edificio detrás · «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.» |
| 3 | 8,4-21,8 | Recorrido | la UNIDAD, de fuera adentro | la unidad | el carril de nado (RC17, 3,1 s) → la Social Kitchen (RC12, 3,5 s) → el gimnasio (RC14, 3,1 s) → el gimnasio desde la entrada (RC13, 3,7 s) · solo música |
| 4 | 21,8-26,0 | Mitad | las amenidades, dichas | Isabella | MD05: en el gimnasio, tras el vidrio · «Además, esta unidad cuenta con diferentes tipos de amenidades.» |
| 5 | 26,0-39,7 | Recorrido | el APARTAMENTO y la vista | apartamento / terraza | la cocina con isla (RC01, 3,5 s) → la alcoba y la puerta iluminada del baño (RC08, 3,3 s) → el baño (RC09, 2,8 s) → EL CLÍMAX: el deck con el jacuzzi comunal bajo el cielo cubierto (RC19, 4,2 s, el más largo) |
| 6 | 39,7-46,7 | CTA | invitar | Isabella | CT01: junto al jacuzzi comunal, la baranda y las plantas · «Si quieres un acompañamiento personalizado durante toda tu estancia, contáctanos.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Canción = *In This Together*** (`bd507fe6`, cinematic / ambient, Mi menor; la reservada). Medida el 2026-10-19: **muy fuerte** (≈ −10 LUFS en el tramo que se usa, picos de −0,1 dBFS: la ganancia del plan la baja a −15), sin pulso fijo (sus golpes miden 7,4-12,7 dB) y con una **caída natural** de ≈ −11 a −21 dBFS entre el 199,5 y el 203 s. El registro la daba «desde 92,98 s»: ese tramo (la meseta de −7 dB) tiene el clímax de la canción en el 137-141 s, pero **sus golpes son débiles y escasos (casi nada ≥ 7,4 dB entre el 120 y el 137 s)** y no hay forma de cortar al golpe; la segunda mitad (161-205 s) tiene un pulso de golpes de 7,5-12,7 dB cada 1-2 s y la caída justo donde entra el CTA, que es lo que se busca. Entrada en el golpe de **161,638 s** (11,2 dB); `INICIO_MUSICA` = 161,6 s (4848/30). Los 11 cortes caen en golpes medidos de **7,5 a 12,7 dB** (el canal exige 7,4) y las tres entradas de Isabella (hook, mitad, CTA) en golpes de 10,9 · 9,5 · 8,9 dB. La rejilla (`herramientas/rejilla-049.py`) buscó las combinaciones de golpes ≥ 7,4 dB con planos de 2,0-3,8 s, el hook de 5,75-6,0 s y la vista de 3,8-4,65 s: salen 46, de dos familias: entrada 161,638 s (45,7-46,8 s, planos de 2,6-3,7 s) y entrada 167,452 s (≈ 40 s, pero planos de 2,0-2,5 s y apertura de 1,55 s). **Se eligió la primera, la de 46,7 s**: planos que se miran, una apertura de 2,4 s y el CTA en un golpe de 8,9 dB (la otra variante de esa familia lo mete en uno de 7,5). Si el usuario la quiere más corta (≈ 40 s), la otra familia está calculada. Medida, no oída; licencia sin verificar (`HAY_MUSICA = false` es la salida). **La alternativa (*Deep Breath*, ambient) no hizo falta.**
- **Los 11 planos entran a corte** (ninguna disolvencia): cada uno en un golpe medido, y la pieza es un paseo de planos de 2,8-4,2 s con una canción que sube y cae.
- **El paseo de la unidad lleva CUATRO planos** (la unidad pesa más en esta pieza): piscina → Social Kitchen → gimnasio (RC14) → gimnasio desde la entrada (RC13), todos girando a la derecha (raccord de dirección). **De RC13 se dejó fuera el final** (4,6-6,0 s: llega al cristal, pero un hombre en la caminadora sale de frente y reconocible): se pierde el raccord del vidrio y se evita una cara. **La sauna (RC15) se descartó**: es oscura, de movimiento borroso y acaba con el cielo quemado (auto-exposición); un plano de 3 s con ella sería lo más flojo de la pieza.
- **Los dos planos de gimnasio** (RC14 y RC13) y **la Social Kitchen** llevan personas entrenando o sentadas a lo lejos, sin cara reconocible: incidental, se dice en la entrega. **Un adorno oscuro en la pared de la alcoba** (en RC08, hacia los 29,5-30,4 s del vídeo; con el desenfoque del recorte parece un crucifijo pequeño y de cerca es una cabeza estilizada): se declara y, si estorba, se cambia por RC07 o se mueve el tramo.
- **El color se casa plano a plano** (R32): la base del canal más un ajuste medido por luma (`pruebas-720p/stills*/`, `luma.py`). Los interiores del apartamento (alcoba y baño, de ropa blanca y encimeras claras) quedan ≈ 30 niveles de luma por encima del resto aun con la exposición en su tope (−0,4); se declara y se mira en la prueba.
- **Isabella en tres sitios distintos**: las escaleras exteriores · el gimnasio tras el vidrio · junto al jacuzzi comunal. En las tres un empuje lento 1,00 → 1,04.
- **Ninguna cifra** en pantalla ni en voz. «Plusvalía» (HK03): es la palabra que dijo Isabella en el sentido de «valor añadido del servicio» (no de valorización del inmueble); **se avisa** porque en el mundo inmobiliario colombiano «plusvalía» suele significar aumento de valor de la propiedad, y el formato no promete valorización ni rentabilidad.

## Lo que comparte con otras versiones (declarado)

| Clip | Dónde más | V31 |
|---|---|---|
| HK03 | V28 (046) entera | 0,17-6,20 s (el hook entero, repetido) |
| MD05 | V29 (047) | 0,17-4,40 s (la mitad entera, repetida) |
| CT01 | V27 (045) entera | 0,20-5,17 s (el CTA entero, repetido) |
| RC12, RC13, RC14, RC17, RC08, RC09 (último tramo) | pocas o ninguna de las hermanas existentes al montar | libres o con solapes parciales (la puerta 7b los cuenta) |
| **RC01** | **apertura de la V27 (045)** (3,8-7,5 s) · pedida por el usuario para la V31 | 1,20-4,70 s (comparte 0,9 s) |
| RC04 · RC19 | **exclusivos de la V31** (apertura y clímax) | libres |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/049-recorrido.mp4`, 540×960) y a las decisiones declaradas: **el recorrido horizontal recortado y más blando**, **el hook, la mitad y el CTA repetidos**, **la canción** (cinematic, fuerte y sin pulso) y el **clímax con el jacuzzi comunal** (no el privado).
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «la» de «que no es la tuya» (HK03, f114 = 3,8 s) · «esta» de «esta unidad» (MD05, f677 = 22,6 s) · «durante» (CT01, f1253 = 41,8 s) · «tu» de «toda tu estancia» (CT01, f1283 = 42,8 s) · «contáctanos» (CT01, f1302 = 43,4 s).
3. Si «plusvalía» (HK03) se deja tal cual.
4. La canción (medida, no oída; licencia sin verificar).
