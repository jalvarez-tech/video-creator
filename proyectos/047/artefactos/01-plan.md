# 01 · Plan narrativo — proyecto 047 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V29 del registro («LO QUE INCLUYE»)

> **REV. 1 (2026-10-19, tras ver la prueba): SIN RECORRIDOS.** El usuario dijo que «algunos vídeos se ven pixelados como si se hubieran escalado» y, ante las opciones, «**no pongas recorridos horizontales**». Los 22 recorridos del material son horizontales (1920×1080) y recortados al 9:16 se ampliaban ×1,78. La pieza son ahora SOLO las cuatro tomas de Isabella (4K vertical) con la tarjeta del cierre: 23,4 s. Todo lo que sigue sobre la apertura con RC20, los recorridos y el clímax RC03 es de la **rev. 0** (su prueba queda en `pruebas-720p/047-recorrido-rev0.mp4`); la rev. 1 está en la sección «Rev. 1» más abajo y en `03-timeline.md`.

> Paso 1 de 3. Escrito con el reparto de la sesión coordinadora (`proyectos/044/reparto-045-050.md`), el catálogo del material (`proyectos/044/catalogo-material.md`), la ficha de la web leída el 2026-10-19 y lo aprendido en el 043 (`aprendizajes.md` y `combinaciones.md`), y **antes** del primer render. Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pedido | «Promociona el **ARRIENDO** del apartamento amoblado de 113 m² con jacuzzi privado en Tierra Grata Bosque Santo: seis reels 9:16 con Isabella, cada uno en DOS formatos (orgánico y funnel/con ficha), cada vídeo en una sesión distinta con Sonnet 5.5» (2026-10-19). Esta es la sesión de la **V29 / 047, «Lo que incluye»**; el reparto de tomas, apertura, clímax y canción ya venía fijado para que las seis no se pisen y **no se cambia sin un motivo técnico declarado** (abajo se declara el único posible: ninguno se cambió). |
| Numeración | **V29 / 047.** Las V27/045, V28/046, V30/048, V31/049 y V32/050 son de las sesiones hermanas (sus worktrees: `.claude/worktrees/reel-04N-*`). La reserva de la V29 y de *Dreamlife* ya estaba en `archivos/musica/registro-de-uso.md`. |
| La propiedad y la ficha | **Tierra Grata Bosque Santo**, El Poblado, Medellín, «a pocos metros de la Avenida Las Palmas». **ARRIENDO tradicional: COP 14.800.000 al mes.** 113 m² · 2 habitaciones · 2 baños · 2 parqueaderos · piso 9 · amoblado (dicho por Isabella) · balcón con **jacuzzi privado**. La unidad: carril de nado, zonas húmedas, gimnasio, Social Kitchen, coworking, etc. **No consta** (no se afirma): administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el «acompañamiento», si las experiencias se pagan aparte. La misma unidad está en venta: **las piezas no la nombran** (encargo: promocionar el arriendo). |
| Lo que el rodaje del 17-oct NO es | **El libreto 044 no se grabó.** Isabella grabó once frases de OTRO ángulo, el del **acompañamiento personalizado** (aseo semanal incluido, chef privado, tours, masajes, transporte, «te acompañamos desde el día uno», «apartamento amoblado»), todas en las zonas comunes de la unidad y con un vestido negro. Los códigos HK/MD/CT son los de la carpeta, no los del libreto. |
| Material | `Apartamento - Tierra Grata - Las Palmas/Videos/` (`1 Hooks`, `2 Miad`, `4 Recorrido`, `5 Cta`), copiado a `proyectos/047/original/` con el CÓDIGO como nombre. sha256 en `normalizar.mjs`: HK02 `4cc73e1d`, MD04 `cfd314e1`, MD05 `1d92690e`, CT03 `a978434e`, RC20 `eed9445e`, RC16 `7cdf817e`, RC11 `38a59f31`, RC05 `931b51dd`, RC09 `8b1031a3`, RC03 `e5dd0f12`, música `5e7dcd27` (*Dreamlife*, el mismo archivo que reserva el registro). |
| **Los recorridos son HORIZONTALES** | 22 clips en 1920×1080 SDR (31-ago / 2-sep). Para el 9:16 se **recortan al centro (608×1080, `crop=608:1080:656:0`) ANTES de `scale=1296:2304`** y salen **más blandos que Isabella en 4K** (×1,78 sobre el cuadro final). Es lo que hay: se dice, no se filtra. No hay dron. |
| Composición | `Recorrido047` · 1080×1920 · **30 fps** · rev. 1: 702 f (23,4 s) · (rev. 0: 1411 f, 47,03 s). Clips a 1296×2304 y 30 fps (las tomas de iPhone, HLG → BT.709 con VideoToolbox; **CT03 a 29,97 fps** se normaliza a 30 constantes: 200 fotogramas de 200). |
| Formato | 9:16 · `recorrido-luxur` (APARTAMENTO · HOOK · RECORRIDO · MITAD · RECORRIDO · CTA), con la mitad en **DOS tomas** seguidas · cuatro tomas de Isabella |
| Marca / texto | Luxur, texto **editorial** (abajo, 90 %, cursiva 8 px menor); **sin sello**; cierre = tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com`. La versión con ficha (`ficha-luxur`) va SIN subtítulos y con el tipo, el lugar y el precio fijos. |
| Destino | Reels · TikTok · Shorts (orgánico) y Meta Ads / feed 1:1 (funnel) |
| Presentadora | Isabella Cadavid |

## El ángulo: «LO QUE INCLUYE»

**La idea en una línea:** este apartamento es **para quien llega a Medellín y no quiere perder el tiempo en lo cotidiano**: el hook dice que el tiempo es lo más valioso y que el aseo semanal va incluido; la mitad dice que el canon incluye experiencias pensadas para ti y que la unidad trae amenidades; el CTA cierra con la idea de que, en una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.

| | 045 (V27) | 046 (V28) | **047 (V29)** | 048 (V30) | 049 (V31) | 050 (V32) |
|---|---|---|---|---|---|---|
| Nombre | «El tiempo» | «Ciudad nueva» | **«Lo que incluye»** | «Chef y experiencias» | «Amenidades» | «14,8» |
| Apertura | RC01 (APTO) | hook | **RC20 (APTO, hora azul)** | hook | RC04 (APTO) | hook |
| Hook | HK01 | HK03 | **HK02** | HK01 | HK03 | HK02 |
| Mitad | MD01 | MD02+MD03 | **MD04+MD05** | MD03 | MD05 | MD04 |
| CTA | CT01 | CT02 | **CT03** | CT03 | CT01 | CT02 |
| Clímax | RC21 | RC18 | **RC03** | RC10 | RC19 | RC02 (final) |
| Canción | *Fortitude* | *Children (Piano)* | ***Dreamlife*** | *Einaudi Fly* | *In This Together* | *Spring is Coming* |

### Lo que se repite con otra pieza del lote (y se dice)

- **El hook (HK02) lo repite la 050** (y su doble HK01, las 045 y 048): solo hay tres hooks del 17-oct y dos son la misma frase. La pareja hook·CTA de esta pieza (HK02·CT03) no se repite.
- **El CTA (CT03) lo repite la 048.**
- **MD04 la repite la 050 y MD05 la 049**; esta es la única pieza que las usa **seguidas**.
- **Metraje de recorrido compartido:** las seis piezas pasean por la misma unidad y el mismo apartamento con los mismos 22 clips. La puerta (sección 7b) informa de cuánto comparte esta con las otras cinco: la piscina (RC16), la Social Kitchen (RC11), la alcoba (RC05) y el baño (RC09) son de las cinco. Para diferenciarla se eligieron los tramos más tardíos o menos usados de cada clip; se probó RC17 (la piscina desde el otro extremo, que ninguna usa) y se descartó (casi todo cielo y árboles, tres bañistas en cuadro). **La apertura (RC20) y el clímax (RC03) son exclusivos de esta pieza.**

## La apertura con el APARTAMENTO: la hora azul

El reparto fija RC20 en el bloque 1 y, **solo si «la hora azul choca con el paseo de día»**, permite abrir con el principio de RC02 y llevar RC20 al bloque 5. **Choca algo** (la sala es azul y cálida, el hook es de tarde en la terraza, el apartamento y el balcón son de día), pero es la imagen más fuerte de toda la sala y el color de cada plano la casa con la siguiente (R32). **Decisión declarada: RC20 se queda en el bloque 1** (2,6-5,6 s del clip: el panel de madera se aparta y deja ver el sofá con las tiras de luz y el ventanal con el cielo azul). Tampoco se enseña la vista entera antes del bloque 5: el ventanal del 1 es el azul de la tarde, no la ciudad.

## Promesa y CTA

- **Promesa (primeros 3,0 s):** la sala a la hora azul, **sin texto ni voz** (regla fija). Isabella aparece con una disolvencia (su imagen es opaca en el f90 y su primera sílaba suena en el f91).
- **Acción final:** CT03 **no es una acción** («cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer»): la tarjeta con el logo y la web cierra, y el caption lleva la acción (WhatsApp).
- **La única cifra de la pieza:** `$14.800.000`, en el subtítulo de MD04 (lo dicho es «catorce millones ochocientos»), como acento (no como dato grande: el dato solo se admite en el bloque 3). Ninguna otra cifra, ni en pantalla ni en voz.
- **Lo que NO se cuenta:** administración, condiciones del contrato, minutos a ningún sitio, qué incluye exactamente el acompañamiento, si las experiencias se pagan aparte, la venta de la unidad, valorización ni rentabilidad. «Aseo semanal incluido» y «amoblado» los dice Isabella; se anotan en el caption como dichos por ella.

## Escenas (los seis bloques)

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,0 | La apertura | la sala a la hora azul | apartamento | RC20 2,6-5,6 s: el panel se aparta y deja ver el sofá con las luces y el ventanal azul · solo música (*Dreamlife* entra en el f0) |
| 2 | 3,0-9,6 | Hook | el tiempo es lo más valioso | Isabella | HK02: sentada en el sillón de la terraza común, la ciudad detrás · «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.» |
| 3 | 9,6-17,8 | Recorrido de la unidad | lo que trae la unidad | unidad | la piscina (RC16, 5,0 s) → la Social Kitchen (RC11, 3,2 s), donde espera ella · solo música |
| 4 | 17,8-25,3 | Mitad (dos tomas) | lo que incluye el canon | Isabella | MD04 en la Social Kitchen: «Catorce millones ochocientos que incluyen experiencias pensadas para ti» (`$14.800.000`) → disolvencia → MD05 en el gimnasio: «Además, esta unidad cuenta con diferentes tipos de amenidades» |
| 5 | 25,3-38,9 | Recorrido del apartamento | entrar en lo privado y salir a la vista | apartamento | la alcoba (RC05, 4,0 s) → el baño (RC09, 3,6 s) → EL BALCÓN con el jacuzzi privado al fondo y las torres y la ciudad (RC03, 6,0 s, el más largo y el clímax) · la música en su meseta |
| 6 | 38,9-45,0 | CTA | la invitación | Isabella | CT03 en las escaleras con el edificio · «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía que vale la pena conocer.» → funde a negro → tarjeta con el logo y la web |

## Decisiones tomadas (y las descartadas)

- **Hook = HK02 (asignado).** «El tiempo es el activo más valioso de los seres humanos. Te ayudamos a optimizarlo, incluyéndote un aseo semanal.» Voz de 0,44 a 6,52 s (primera sílaba suave, «El», a 0,44; «tiem-» sube a 0,465: whisper la pone en 0,00 s, R29). **«aseo» queda POR CONFIRMAR AL OÍDO**: whisper oye «as-e-o» con la «e» a p 0,24 y, en otras pasadas, «asesor». Es la promesa de la pieza y una palabra que cambia lo que se ofrece.
- **Mitad = MD04 + MD05 (asignadas, seguidas).** Dos tomas unidas con una disolvencia (declarado): entre la última palabra de MD04 (f643) y la primera de MD05 (f658) hay 15 f (0,5 s). Las dos arrancan a ≈ 0,54-0,59 s (16-18 f de aire: dejan los 12 f de la disolvencia). MD04 lleva la cifra.
- **CTA = CT03 ENTERA (asignada).** 29,97 fps; la voz de 0,60 a 6,04 s; el plano va hasta el último fotograma del clip (183 f) y la imagen funde a negro en los últimos 6.
- **Canción = *Dreamlife* (reservada; no se cambia a *Softly*).** Sin pulso y sin golpes fuertes donde cortar (los mayores, de 8,5-9,7 dB, caen antes de los 184 s), por eso **todas las entradas son disolvencias** (las disolvencias no piden golpe, R33) y la música se corta a lo largo de la CURVA de la canción: calma hasta el 186,5 s, escalones a los 186,5 y 194 s, meseta desde los 202,2 s hasta la caída de los 217,3 s, que cae donde entra el CTA. Medida, no oída; licencia sin verificar.
- **Descartado:** el sauna (RC15: oscuro y desenfocado), el gimnasio recorrido (RC13: un hombre en la caminadora), RC17 (la piscina desde el otro extremo: casi todo cielo y árboles, tres bañistas), RC07/RC08 (la alcoba con el ventanal quemado), el bloque 3 de tres planos (solo hay dos de la unidad que sirven y que no son aperturas o clímax de otras), la Social Kitchen más allá del 4,0 s de RC11 (un hombre con un portátil en el banco).
- **El jacuzzi privado SÍ aparece:** en RC03, de 5,8 a 6,9 s de la fuente, al fondo del balcón (una caja de madera con la banca delante). RC03 ya era el clímax asignado, así que no se cambia nada; se anota en el catálogo y en el registro. Pequeño y lejano en el recorte 608×1080 (≈ 90 px).

## Rev. 1 — sin recorridos (2026-10-19)

**Qué pasó.** La rev. 0 (47,0 s) llevaba seis recorridos horizontales (RC20, RC16, RC11, RC05, RC09 y RC03) recortados al centro (608×1080) y ampliados ×1,78. En la prueba salían **pixelados**; se probaron tratamientos (reducir bloques y ruido, y afilar, antes y después de escalar): sin diferencia a 100 %, porque el detalle no está en el original. Se enseñó un mock-up de tres encuadres (recorte actual · banda nítida sobre fondo desenfocado · ×1,2 con relleno). El usuario contestó: **«no pongas recorridos horizontales»**.

**Qué es la pieza ahora.** Solo las cuatro tomas de Isabella (HK02 · MD04 · MD05 · CT03), seguidas con disolvencias de 12 f: un paseo de ELLA por la unidad (la terraza, la Social Kitchen, el gimnasio, las escaleras). Ni dron ni recorrido vertical hay en el material, así que no queda imagen de la propiedad sin ella.

| Decisión | Antes (rev. 0) | Ahora (rev. 1) |
|---|---|---|
| Bloques | 1 · 2 · 3 · 4 · 5 · 6 | **2 · 4 · 6** |
| Apertura | RC20, la sala a la hora azul, sin texto ni voz | **el hook, a corte en el f0** (excepción declarada, como el 021 y el 022: sin recorrido no hay otra primera toma). Los 13 primeros fotogramas salen sin texto ni voz; el primer subtítulo entra con su primera sílaba |
| Planos | 11 | **5** (HK02 216 f · MD04 131 f · MD05 112 f · CT03 183 f · tarjeta 60 f) |
| Duración | 47,0 s | **23,4 s** (por debajo de los 28-30 s de la versión corta del formato; se declara) |
| Pausa entre una frase y la siguiente | 15 f a 8 s | 21 · 23 · 24 f (0,7-0,8 s), con el final de cada toma y el principio de la siguiente |
| Música | curva con subida (−16 → −14 LUFS) y bajada antes de cada voz | **lecho** a −26 LUFS debajo de las cuatro voces (no da para subir y bajar entre frases de 0,7 s) y la caída de la canción bajo el CTA. Entrada en el 202,1 s (el escalón de la meseta suena en el f5); la caída (217,3 s) cae en el f457 y el CTA entra en el f459 |
| Subtítulos | 7 acentos | 6: «un aseo semanal» pasa a base (el precio, 1,6 s después, no deja los 2 s entre acentos) |
| Portada y 1:1 | — | la portada no puede ser «solo la propiedad» (en todos los fotogramas hay Isabella): se elige un fotograma donde ella sea pequeña o la propiedad llene el cuadro (las escaleras y el edificio del CTA). Se declara |

**Lo que se pierde, y se dice.** El «recorrido» del formato (los bloques 3 y 5, el clímax de la vista con el jacuzzi del balcón) y la apertura con la propiedad. El jacuzzi privado deja de salir en el vídeo (queda en el caption). La pieza es corta y toda hablada. Si el usuario quiere más imagen de la propiedad, la vía es rodar vertical o dron: el material de recorrido horizontal solo sirve bien a ancho completo.

**Lo que NO cambia.** Las cuatro tomas, el orden, las disolvencias, la cifra `$14.800.000` (solo en MD04), el color por plano, la voz a −15 LUFS, la canción (reservada), la tarjeta oscura del cierre y las reglas del canal (sin sello, nada congelado).
