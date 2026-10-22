# 01 · Plan narrativo — proyecto 055 · Casa en Condominio Los Bravos (La Ceja), V37 «Las mañanas»

> Paso 1 de 3. Escrito con el catálogo del rodaje (`proyectos/054/catalogo/catalogo-material.md`), el reparto de las tres versiones de esta casa (`proyectos/054/reparto-054-062.md`, que **manda** sobre cualquier elección mía) y lo aprendido en el 038 y el 042 (`aprendizajes.md` y `combinaciones.md` de cada uno). El código (`remotion/src/proyectos/055/`) se escribió después de elegir los planos con las hojas de contactos y de medir la canción y las tres voces.
> Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | Encargo del 2026-10-21 (sesión madre): **tres reels por propiedad** en tres propiedades nuevas, una sesión por reel, sobre el mismo checkout. Este es el **V37 / 055** de la Casa en Condominio Los Bravos (La Ceja): vertical 9:16, ángulo «Las mañanas: el aire puro del oriente antioqueño», el más sensorial de los tres. Las otras dos versiones de la casa son la V36 (054, «privacidad») y la V38 (056, «solo 6 casas») |
| Propiedad (ficha de la web, leída el 2026-10-21) | **Venta** · **COP 1.380 M** · casa de 220 m² construidos en un lote de 500 m² · 4 alcobas (una en el primer piso) · 4 baños · 2 parqueaderos + visitantes · 2016 · condominio de solo 6 casas · 3 balcones · zona BBQ · pet friendly. Si una cifra va en pantalla, vale la de la ficha (220 / 500: la web se contradice en «lo que la hace especial»). **Ninguna cifra va en pantalla en esta pieza** |
| Terna (exclusiva, del reparto) | Hook **HK02** `IMG_8822` (9,9 s) · mitad **MD03** `IMG_8819` (11,9 s) · CTA **CT03** `IMG_8914` (7,2 s) · aérea: **último tercio (68-103 s)** de `DJI_20260330163940_0070_D.MP4` · canción **«Spring is Coming»** (`archivos/musica/Spring is Coming.mp3`, sha 8 `fe252090`, reservada V37 en `archivos/musica/registro-de-uso.md`) |
| Material | `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - La Ceja/Videos/` copiado a `proyectos/055/original/` con el CÓDIGO del catálogo como nombre (sha256 en `normalizar.mjs`). Medido con ffprobe el 2026-10-22: los MOV de iPhone son **1080×1920 verticales nativos, H.264 SDR BT.709, 59,94/60 fps variables, con audio AAC y sin rotación** (ni HLG ni SAR raro: no hay tone-map); el dron, **4K HEVC SDR 29,97 fps con `rotation=90`, sin audio** y con una pista MJPEG de miniatura (se mapea `0:v:0`) |
| Composición | `Recorrido055` · 1080×1920 · **30 fps** · 1201 f (40,03 s). Clips normalizados a 1296×2304 y 30 fps CFR (`setpts=PTS*1000/1001` en el dron: 29,97 → 30 exactos) |
| Formato | 9:16 · `recorrido-luxur` (DRON · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA) con **tres frases de Isabella y ni una más** |
| Marca / texto | Luxur · texto **editorial** (abajo, 90 %, cursiva 8 px menor) · **sin sello** · cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`, sin congelar el último plano y sin `@propiedadesluxur` |
| Destino | Reels · Shorts · TikTok |
| Presentadora | Isabella Cadavid |

## El ángulo: «Las mañanas»

**La idea en una línea:** esta casa es para quien quiere **empezar el día respirando aire limpio, con luz y espacio**, y está cansado de despertar en un lugar que no le da nada de eso. El hook propone imaginarlo, el recorrido lo hace caminable (el sendero, la terraza bajo la pérgola, el jardín; la cafetera, el ventanal, la alcoba con sol, el balcón), la mitad dice por qué no es una casa cualquiera y el CTA pide hablar.

| Elemento | Qué es | Por qué |
|---|---|---|
| Hilo visual | La luz y el aire de la mañana: sol entre árboles y láminas de pérgola, césped y cielo, el ventanal abierto, el piso de la alcoba con sol, el balcón | El brief da el hilo: «la luz de la mañana, los ventanales, los balcones, el jardín, la terraza con la pérgola» |
| Hook (HK02) | «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.» | Promesa, no descripción; dice el anhelo y el lugar. Isabella camina hacia cámara en el jardín con la pérgola detrás; al decir «aire puro» la cámara se va al césped y al cielo: la imagen ilustra la frase |
| Mitad (MD03) | «No es solo una casa, es una declaración de estilo.» | La mitad contesta «¿por qué esta?»: no es un dato de ficha, es identidad; Isabella abre la puerta y entra, y la cámara recorre sala y ventanal hasta la cocina |
| CTA (CT03) | «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!» | UNA acción: hablar; pide el cambio de vida que el hook propuso |
| Aérea | Último tercio del dron largo, tramo 82,0-85,1 s de la fuente: la casa de lado, con su seto en V, su piedra y su teja | Es el único tramo de ese tercio con la casa entera y una velocidad estable (dispersión 0,17); la parte anterior es casi estática y la posterior baja hasta el parqueadero con el carro |
| Canción | *Spring is Coming* (neoclásica en Do menor, 2:02), desde su primera nota (0,355 s de la canción) | La reservada del reparto; arranque limpio; luminosa y sin pulso fijo: se corta a golpes medidos |

## Lo que se repite con las otras dos versiones de la casa (y se dice)

- **La terna de Isabella y la aérea son EXCLUSIVAS de esta versión** (el reparto): la puerta (`revisar-055.mjs`, §7b) falla si 054 o 056 usan el mismo hook, mitad o CTA.
- **Los recorridos pueden repetirse** (es lo normal en el canal). En esta pieza: RC22, RC23, RC24, RC20, RC01, RC19 y RC09, cada uno en su tramo; la puerta informa de los tramos que se pisan con las otras versiones y `combinaciones.md` los declara.
- Las otras dos versiones de la casa son de otras sesiones y van en su propia rama de trabajo del checkout compartido; aquí no se toca nada suyo.

## Promesa y CTA

- **Promesa (primeros 3 s):** la casa vista desde el aire, **sin texto ni voz** (regla fija), con la primera nota de la canción en el f2; Isabella entra **a corte** en el golpe de 15,2 dB (f92) y su primera sílaba suena 8 f después.
- **Acción que se pide al final:** «¡hablemos!»: UNA acción, sin precio ni cifra.
- **Lo que NO se cuenta (va al caption):** el precio (1.380 M), las áreas, las alcobas y los baños, la hora a Medellín (50 min), la administración (120.000; la web dice «de bajo costo») y el número de casas del condominio (es el ángulo de la V38). **Ninguna cifra en pantalla.** Nada de valorización ni rentabilidad.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,1 | La aérea | la casa desde el aire | casa | DR (82,0-85,1 s de la fuente): seto en V, piedra, teja · solo música: primera nota en el f2 |
| 2 | 3,1-8,6 | Hook | imaginar las mañanas aquí | Isabella | HK02: «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.» |
| 3 | 8,6-18,1 | Recorrido 1 (mudo) | el exterior de las mañanas | jardín | RC22 2,2-6,3 s (sendero y terraza) → RC23 3,0-5,7 s (sol bajo la pérgola y el jardín) → RC24 1,2-3,9 s (la casa blanca al fondo del césped) |
| 4 | 18,1-23,2 | Mitad | no es solo una casa | Isabella | MD03: «No es solo una casa, es una declaración de estilo.»; sigue por la sala y el ventanal hasta la cocina |
| 5 | 23,2-34,8 | Recorrido 2 (mudo) | la mañana dentro | la vista | RC20 (la cafetera) → RC01 1,2-3,6 s (la escalera de acero y la doble altura) → RC19 1,5-4,37 s (la puerta de madera de una alcoba, que se abre sobre un piso con sol) → RC09 4,4-8,1 s (de la alcoba al balcón y al cielo: **la vista, el plano más largo del bloque**) |
| 6 | 34,8-40,0 | CTA y cierre | hablar | Isabella | CT03: «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!» · funde a negro · tarjeta oscura con el logo y la web, en silencio |

## El recorrido es un paseo, no una lista

Hook en el jardín (la promesa, fuera del paseo) → exterior (sendero → terraza → jardín) → la puerta (MD03: entra y recorre la sala) → cocina → escalera y doble altura → arriba, la puerta de la alcoba → alcoba y balcón. **No vuelve atrás**: de lo de afuera a lo de adentro y de lo de abajo a lo de arriba; la vista (el balcón con el cielo) es el último plano antes del CTA. Los planos que se tocan entre sí (`RC22 → RC23`, `RC19 → RC09`) siguen la misma dirección de cámara. Puente humano: la puerta de madera que se abre (RC19) y la puerta que abre Isabella (MD03).

## Decisiones tomadas (y las descartadas)

- **Todos los cortes son secos y caen sobre un golpe medido de la canción** (10 cortes, de 10,2 a 27,4 dB, a ≤ 0,5 f de donde suena en el render): la canción tiene golpes cada 0,5-1 s pero **ningún pulso fijo** (`rejilla.py`: ningún periodo alinea ≥ 25 % de los golpes fuertes), así que se corta a los medidos. Se descartaron las disolvencias: con una pista que marca golpes, el corte sobre el golpe es más limpio.
- **El CTA entra en el golpe de 27,4 dB** (el más fuerte de los primeros 45 s de la canción): abre su sección final y la voz sube sobre una cama a −26 LUFS.
- **Cada toma de Isabella entra 8 f antes de su primera sílaba**: el golpe suena entero y la música baja con curva en esos 8 f (regla del canal: la bajada acaba antes de la primera palabra).
- **MD03 se queda 5,1 s** aunque solo habla 2,5: tras su última palabra la cámara sigue por la sala con el ventanal hasta la cocina (es el «paseo» de esa toma) y llega a la cocina donde arranca el segundo recorrido.
- **Descartado:** otro hook (HK03 está cortada y HK01/HK04 son de las otras versiones); recorridos de las alcobas 2 y 3 y de los clósets (no son «mañanas»); el jacuzzi y el baño (RC08, RC10-RC13: intimidad, no aire); la zona de ropas y la lavandería; los tres planos del jardín con cielo sin casa (RC26-RC28: el hook ya termina en césped y cielo).
- **Descartado:** RC04 (el ventanal del comedor): el mismo ventanal sale al final de MD03 y repetía la imagen 4 s después (se vio en el primer still: f694 y f810 eran casi el mismo plano); se sustituyó por RC01 (la escalera y la doble altura), que además sube a lo de arriba. RC07 (la puerta de la alcoba principal) lo usa la V36 en el mismo tramo: se sustituyó por RC19 (la puerta de otra alcoba, con sol).
- **Pendiente (palabras dudosas, R31):** «antioqueño» (whisper-small oye «entrequeño») y «hablemos» (oye «hablimos»): se miden con formantes y se dejan marcadas «POR CONFIRMAR AL OÍDO»; la puerta con `--final` falla por ellas hasta que se oigan.
