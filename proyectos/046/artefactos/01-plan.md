# 01 · Plan narrativo — proyecto 046 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V28 «CIUDAD NUEVA» (abre con el HOOK)

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web leída el 2026-10-19, lo aprendido en el 021-024 (aperturas con el hook) y en el 043 (la pieza más reciente), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Monta el proyecto **046 (V28, “Ciudad nueva”)** del arriendo de Tierra Grata: un reel 9:16 del formato `recorrido-luxur` en sus DOS formatos (orgánico y con ficha).» Una de las seis sesiones de los reels de arriendo (045-050, 2026-10-19: «6 videos para redes sociales, cada video en 2 formatos: uno para el funnel y el otro para post orgánicos… cada video en una sesión diferente con Sonnet 5.5»). Tomas, apertura, clímax y canción vienen FIJADOS por el reparto y no se renegocian sin un motivo técnico declarado. |
| Numeración | **V28 / 046** (reservada en `archivos/musica/registro-de-uso.md`). Las hermanas: V27/045 «El tiempo», V29/047 «Lo que incluye», V30/048 «Chef y experiencias», V31/049 «Amenidades», V32/050 «14,8». |
| La propiedad y la ficha | Apartamento amoblado de 113 m² (2 habitaciones, 2 baños, piso 9) en **Tierra Grata Bosque Santo**, El Poblado, a pocos metros de la Av. Las Palmas. **ARRIENDO: COP 14.800.000 al mes** (JSON-LD `offer-rent`). La misma unidad está en venta: las piezas no lo nombran. **No consta** y no se afirma: administración, contrato, qué se paga aparte, minutos a ningún sitio, qué incluye exactamente el «acompañamiento». Isabella dice (17-oct): «acompañamiento personalizado desde el día uno» · «chef privado, tours, masajes y transporte» · «las mejores experiencias de la ciudad de Medellín» · «apartamento amoblado». |
| Material | `…/Apartamento - Tierra Grata - Las Palmas/Videos/`, copiado a `proyectos/046/original/` con el CÓDIGO del catálogo por nombre (sha256 en `normalizar.mjs`): HK03 `75a87dfa` (IMG_4304) · MD02 `b85d5fe5` (IMG_4278) · MD03 `6fdf774f` (IMG_4285) · CT02 `f7ed79ff` (IMG_4294) · RC05 `931b51dd` · RC09 `8b1031a3` · RC11 `38a59f31` · RC12 `7bc5ad03` · RC17 `c99bc2f1` · RC18 `4873e6c1` (+ RC13, RC14, RC16, RC06, RC22 normalizados y no usados) · música `80bd8abe`. |
| Lo que NO hay | **No hay dron.** El recorrido es HORIZONTAL 1920×1080 (SDR): se RECORTA al centro (608×1080, `crop` antes del `scale`) y se escala ×2,13: sale más **blando** que Isabella en 4K. Es el material; se dice en la prueba y no se filtra. Las tomas de Isabella del 17-oct son verticales 4K HLG (tone-map con VideoToolbox); HK03 va a 29,97 fps (se cuenta en el MP4 normalizado, 186 f). |
| Composición | `Recorrido046` · 1080×1920 · **30 fps** · **1291 f (43,0 s)**. Clips normalizados a 1296×2304 y 30 fps. |
| Formato | 9:16 vertical · `recorrido-luxur` con la EXCEPCIÓN de abrir con el HOOK: HOOK · RECORRIDO (la unidad) · MITAD (EN DOS TOMAS) · RECORRIDO (el apartamento) · CLÍMAX · CTA · tarjeta. Cuatro tomas de Isabella en cuatro sitios. |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` |
| Dos formatos | **Orgánico** (`046-recorrido.mp4`, CRF 12 + CRF 16, `.srt`, portada, caption) y **con ficha** (`046-recorrido-ficha.mp4`: la misma pieza SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1; audio del final copiado). |
| Destino | Reels · Shorts · TikTok (orgánico) · Meta Ads / feed 1:1 (con ficha) |
| Presentadora | Isabella Cadavid (asesora de la ficha), vestido negro (17-oct) |

## Las decisiones que rompen o matizan una regla (declaradas)

1. **ABRE CON EL HOOK** (regla fija 1 de `recorrido-luxur`, «la primera toma sale sin texto ni voz»): excepción **por encargo del usuario** para tres de las seis piezas (046, 048, 050), como el 021-024. El frame 0 es Isabella, no la casa; su primera palabra suena en el f17 y su primer subtítulo entra con ella. La puerta lo dice en cada pasada (`ABRE_CON_EL_HOOK`). La miniatura del vídeo ya no es la casa limpia; la **portada** (imagen aparte) sí es un plano de la propiedad.
2. **La mitad son DOS tomas** (MD02 + MD03), en dos sitios de la misma terraza común, unidas con una **disolvencia** (el reparto permite corte en un golpe o disolvencia; cae en la voz, no en un golpe). Se declara en la prueba. La música **no sube entre ellas**: es una sola frase para el oído.
3. **El recorrido horizontal recortado** (declarado arriba): más blando que Isabella. Cada plano usa el recorte centrado (X = 656); se miró cada clip recortado y lo que importa queda dentro.
4. **Hook y CTA repetidos en otras piezas** (por diseño del reparto, que solo tiene 3 hooks y 3 CTA): HK03 va también en la V31 (049) y MD03 en la V30 (048); CT02, en la V32 (050). Ninguna pareja hook·CTA se repite. La puerta informa del metraje compartido (sección 7b).
5. **Música sin pulso**: los 3 cortes secos (c04, c09, c10) van a golpes medidos de 8,3 a 11,4 dB (el canal exige 7,4) y las 6 disolvencias, libres (regla del piano, 037); dos de ellas (c05 y c08) acaban además en un golpe. Los golpes de piano son más flojos que los de un bombo; la prueba se mide sobre el audio del render.
6. **Recorridos que no se usan**: RC01, RC04, RC20 (aperturas de otras piezas), RC02 (su final y el clímax de la V32), RC03, RC10, RC19, RC21 (clímax de otras). Los planos del recorrido se tomaron de la parte del clip que menos usan las hermanas (RC17 en lugar de RC16; el final de RC11, RC05 y RC09): los tramos concretos están en `03-timeline.md`.

## El ángulo: «CIUDAD NUEVA»

**La idea en una línea:** este apartamento amoblado es **para quien llega a Medellín y no tiene a nadie**: el hook pone la necesidad («cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable»), la mitad dice qué trae («desde el día uno · chef privado, tours, masajes y transporte · las mejores experiencias de la ciudad») y el CTA lo cierra con lo que se ofrece («un apartamento amoblado, con acompañamiento») y UNA acción: escribirle.

| | V27 (045) | **V28 (046)** | V29 (047) | V30 (048) | V31 (049) | V32 (050) |
|---|---|---|---|---|---|---|
| Argumento | el tiempo (aseo semanal) | **la ciudad nueva (acompañamiento)** | lo que incluye el canon | chef y experiencias | amenidades | el canon (14,8) |
| Apertura | el apto (RC01) | **el HOOK** | el apto (RC20) | el HOOK | el apto (RC04) | el HOOK |
| Hook · mitad · CTA | HK01 · MD01 · CT01 | **HK03 · MD02+MD03 · CT02** | HK02 · MD04+MD05 · CT03 | HK01 · MD03 · CT03 | HK03 · MD05 · CT01 | HK02 · MD04 · CT02 |
| Clímax | RC21 | **RC18** | RC03 | RC10 | RC19 | RC02 (final) |
| Canción | *Fortitude* | ***Children*** | *Dreamlife* | *Einaudi Fly* | *In This Together* | *Spring is Coming* |

## Promesa y CTA

- **Promesa (primeros 5,6 s):** Isabella, en las escaleras exteriores con el edificio detrás, mirando a cámara desde el fotograma 0: «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable». El golpe de piano de la canción (9,7 dB) suena en el f3 y baja bajo su voz antes de la primera palabra (f17).
- **Acción final:** «si quieres un apartamento amoblado que tenga acompañamiento personalizado, **escríbeme**»: UNA acción. El canal (DM o WhatsApp) no está dicho: el cierre lleva el logo y la web y el caption, el WhatsApp.
- **Lo que NO se cuenta:** el canon (14,8 M/mes: va en la ficha de la versión de anuncios y en el caption), áreas, administración, contrato, qué se paga aparte, el aseo semanal (otro ángulo: V27/045), el jacuzzi (el privado lo usa la V27/045; el comunal, la V31/049), distancias o tiempos. **Ninguna cifra** en pantalla ni en voz.

## Escenas (los bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-6,1 | 2 · Hook | la necesidad | Isabella | HK03 entera: escaleras exteriores, el edificio detrás · «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.» · golpe de piano en el f3, música abajo en el f14 |
| 2 | 6,1-14,5 | 3 · La unidad | el sitio donde vives, sin voz | unidad | el carril de nado entre los árboles (RC17, 2,4 s) → la Social Kitchen, el mostrador y las lámparas (RC11, 3,0 s) → la Social Kitchen desde el otro lado, más cerca (RC12, 2,9 s, con disolvencia) · solo música; los tres giran a la derecha |
| 3 | 14,5-24,7 | 4 · Mitad | qué trae el acompañamiento | Isabella (2 tomas) | MD02: la pérgola con las plantas · «Te acompañamos desde el día uno con atención personalizada.» → (disolvencia) MD03: camina bajo la pérgola · «Contamos con chef privado, tours, masajes y transporte y las mejores experiencias de la ciudad de Medellín.» |
| 4 | 24,7-31,2 | 5 · El apartamento | lo privado | apartamento | la alcoba (RC05, 3,5 s) → el baño (RC09, 3,0 s) · giran a la derecha |
| 5 | 31,2-36,2 | 5 · Clímax | la recompensa | la ciudad | RC18: la terraza al atardecer, la ciudad, el horizonte y la pérgola (5,0 s, el plano más largo del bloque) |
| 6 | 36,2-41,0 | 6 · CTA | invitar | Isabella | CT02: en el jardín · «Si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme.» → funde a negro → tarjeta con el logo y la web (2,0 s) |

**Lectura del paseo (declarada).** Escaleras (el hook) → la piscina → la Social Kitchen (la unidad por fuera y por dentro) → la terraza común (la mitad, dos sitios) → el apartamento (alcoba → baño) → la terraza al atardecer (el clímax) → el jardín (el CTA). El apartamento solo existe en el recorrido: Isabella habla desde las zonas comunes (el catálogo, sorpresa 2). La terraza aparece dos veces (la mitad, con las plantas y la pérgola, y el clímax, al atardecer): son lo que el reparto dejó, y el clímax es otro plano, de otra hora. **No se enseña la vista entera antes del clímax**: las dos tomas de la mitad enseñan la pérgola y las plantas.

## La canción: lo medido (y por qué esa)

*Armin van Buuren — Children (from 'Piano' album)* (`80bd8abe`), piano neoclásico, 5:15, Fa menor, **sin pulso** (reservada por el reparto; alternativa solo si no servía: *Here For You*, que no cae). `buscar-entrada.py --cta 33 42` (entrada de 170,965 s, 10,7 dB, caída de 22,2 dB a +41,3 s) y `medir-pista.py`:

- **Entrada 175,883 s**: un golpe de 9,7 dB (una nota de piano limpia, tras un respiro); se entra 50 ms antes (`INICIO_MUSICA` = 5275/30) y el golpe cae en el f3. Es el segundo candidato del registro (la V5 midió «entrada 175,883 s, caída de 22,2 dB a +36,4 s»).
- **Meseta de −10 LUFS** (−11,2 en la apertura, −11,1 en el paseo, −9,5 en el bloque 5; picos de −0,3 a −1,0 dBFS): se BAJA 3,8-5,5 dB hasta el nivel de la voz (−15) y 15,5 dB bajo ella.
- **La caída empieza en el 211,5 s** (−10 → −15,8 LUFS en 0,5 s → −24 a los 213 s → −40 a los 215 s) = el f1057 de la pieza: cae EXACTAMENTE donde entra la voz del CTA (la primera palabra, en el f1087 = 212,0 s). Es la «resolución donde entra el CTA» de la 019 y la 021: el piano baja solo bajo ella y la envolvente solo le ayuda (−26 LUFS en la primera palabra, 11 LU bajo la voz). A los 216,0 s entra otro pasaje (golpe de 16,6 dB): la música se apaga a los f1190, antes.
- **Golpes de los cortes secos** (los que miden en `musica/golpes-046.json`): 184,329 s (11,4 dB, f256: piscina → Social Kitchen) · 203,935 (8,3, f845: alcoba → baño) · 206,945 (9,2, f935: baño → terraza); las disolvencias del f347 (8,1 dB) y del f741 (alcoba, 11,2 dB) acaban en un golpe. El resto de cambios son disolvencias, libres.
- **Licencia:** no verificada (pista de la biblioteca de Luxur, repo público). `HAY_MUSICA = false` en `audio-046.ts` es la salida (la pieza sale solo con voz y se le pone el audio de la plataforma encima).
- **Medida, no oída.**

## Decisiones tomadas (y las descartadas)

- **Hook = HK03** (asignado): «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable». Voz de 0,57 a 5,62 s medida por energía (whisper alarga «indispensable» hasta 5,99 s con el DTW; la energía dice que acaba a 5,62). Entra a corte en el f0; tras la última palabra le quedan 17 f de toma: sale con una disolvencia (f172-184) a la unidad.
- **Mitad = MD02 + MD03** (asignadas): dos tomas, dos sitios de la terraza, una disolvencia que cae en el hueco de 0,5 s entre las dos frases. MD02 acaba su voz en 3,66 s y MD03 empieza en 0,68 s; la voz de MD02 acaba 4 f antes de que empiece la disolvencia.
- **CTA = CT02** (asignada): «si quieres un apartamento amoblado que tenga acompañamiento personalizado, escríbeme». Una acción. «amoblado» queda **POR CONFIRMAR AL OÍDO** (whisper oye «movilado»; en 1,4 s caben trece sílabas, así que la dice muy deprisa).
- **Clímax = RC18** (asignado): la terraza común al atardecer. No he encontrado el jacuzzi privado del balcón en ninguno de mis clips (RC02, HK04, HK05 muestreados cada 2-3 s, RC02 cada segundo de 19 a 29 s); **sí está en RC21 (8,3-11,07 s), el clímax asignado a la V27/045, que lo declaró primero** (nota de la 045 en la carpeta compartida de la coordinadora). Es exclusivo de esa pieza: yo no lo uso.
- **El paseo** (los recorridos de en medio los elijo yo): piscina → Social Kitchen → Social Kitchen desde el otro lado (los tres giran a la derecha, sin saltos de dirección; el gimnasio gira a la izquierda y no encaja) → mitad → alcoba → baño (giran a la derecha) → clímax (a la derecha). Se descartó el sauna (RC15, oscuro y borroso), el bar de neón de noche (RC22: otra hora y 3,2 s) y el gimnasio (RC13/RC14, giran a la izquierda y la V31/049 lo usará).
- **Los tramos se eligieron sin gente en el cuadro y, cuando se pudo, de la parte del clip que menos repiten las hermanas** (la puerta 7b informa): RC17 del 4,3 al 6,7 s (el carril; al principio del clip hay bañistas en el agua), RC11 del 0,4 al 3,43 s (más adelante, un hombre con portátil en primer plano), RC12 del 0,4 al 3,33 s (a partir de los 2,5 s, una persona lejos y diminuta), RC05 del 3,6 al 7,07 s, RC09 del 3,0 al 6,0 s (se corta antes de que entre un champú con su etiqueta, a partir de los 6,3 s) y RC18 del 0,1 al 5,13 s (el último sol y la pérgola). Aun así RC11, RC12, RC05 y RC09 comparten tramos con las hermanas (la 7b los lista).
- **Ritmo**: tres planos de 2,4-3,0 s en la unidad, la alcoba y el baño de 3,5 y 3,0 s y el clímax de 5,0 s; todo a ×1, sin rampas (la cámara de mano ya se mueve).
- **La Social Kitchen → su otro lado entra con DISOLVENCIA**, no a corte: el corte saltaba +33 niveles de luma (la cocina oscura de RC11 → la isla blanca de RC12) y se leería como un parpadeo (`medir-color.py`); el piano no pide golpe para una disolvencia.
- **El color se casa plano a plano**: Isabella en 4K HLG tone-mapeado (17-oct, vestido negro) y los recorridos 1080p SDR de otro día (31-ago / 2-sep: una piscina bajo cielo cubierto, una Social Kitchen cálida, una alcoba blanca, un baño de madera, una terraza al atardecer). Cada plano lleva su `color` (R32), medido (`medir-color.py`); ver `combinaciones.md`.
- **Ninguna cifra** en pantalla ni en voz.

## Lo que comparte con las otras piezas (declarado)

| Clip | Otras piezas | V28 |
|---|---|---|
| HK03 | V31 (049) la usa de hook (por diseño) | 0,0-6,13 s (la toma entera) |
| MD03 | V30 (048) la usa de mitad (por diseño) | 0,6-7,2 s |
| CT02 | V32 (050) la usa de CTA (por diseño) | 0,73-5,57 s (toda la toma) |
| RC11, RC05, RC09, RC12 | varias hermanas (ver `07b`) | tramos de atrás del clip: 0,8-3,5 s en común con una u otra |
| RC17, RC18, MD02 | ninguna | libres / exclusivo |

## Pendiente con el usuario

1. El OK a la prueba (`pruebas-720p/046-recorrido.mp4`, 540×960) y a lo declarado: **abre con el hook**, **el recorrido horizontal recortado y más blando**, **la mitad en dos tomas**, **hook y CTA repetidos en otras piezas**.
2. **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «amoblado» (CT02, ≈ 37,0-37,6 s del vídeo, f1110-f1127).
3. La canción (medida, no oída; piano sin pulso; licencia sin verificar).
4. El canal de la acción («escríbeme»: ¿DM o WhatsApp?; la web va en el cierre y el WhatsApp, en el caption).
