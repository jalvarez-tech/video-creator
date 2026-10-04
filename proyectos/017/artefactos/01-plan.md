# 01 · Plan narrativo — proyecto 017

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md).

## Encargo (literal)

> «Quiero crear un video que rompa el scroll desde el segundo 1, con tomas
> profesionales y transiciones elegantes y simples. La música debe estar
> sincronizada con las tomas, y cuando hable Isabella debe bajar sus decibeles. […]
> Utiliza un solo video de Hook, Mitad y Cta. Inicia con una toma de Dron, después
> pasa al Cta [sic: Hook], empieza el recorrido inmersivo en el apartamento,
> después pasa a una toma de la mitad, continúa el recorrido y termina con un Cta.
> […] Anota las combinaciones en un archivo .md y la música que utilizaste para
> que después creemos otras versiones utilizando otros Cta, cambios de inicio de
> tomas, etc. **El video debe tener una secuencia cinematográfica y los
> subtítulos cuando hable Isabella deben aparecer abajo con opacidad al 90%.**»

### Cómo se leyó (supuestos declarados — corregibles)

| Frase | Lectura |
|---|---|
| «después pasa al Cta» (en 2.ª posición) | **Hook.** El encargo pide «un solo video de Hook, Mitad y Cta» y en la secuencia no aparece ningún hook: es el que falta. Orden resultante = el de los seis bloques de `recorrido-luxur`: **dron → hook → recorrido → mitad → recorrido → CTA**. |
| «un solo video de Hook, Mitad y Cta» | Una toma de Isabella por bloque: **HK02 · MD09 · CT07**. Nada de voz de otras tomas «mitad» en off. |
| «subtítulos… abajo con opacidad al 90 %» | Subtítulos editoriales (modo del canal) en su banda inferior, **solo cuando habla Isabella**, con el texto al 90 % de opacidad (una constante: `OPACIDAD_SUBTITULOS`). |
| «la música debe bajar cuando hable Isabella» | Envolvente `envolventeBajoVoz`: −16 dB mientras habla (≈ 10 LU por debajo de su voz). |
| «sincronizada con las tomas» | Rejilla MEDIDA sobre la canción; cada corte, a ≤ 1 f de un pulso; los cuatro momentos grandes (la fachada vista desde el suelo, el barrido del ventanal, el patio y el CTA) caen en golpes de frase. |

## Cabecera

| | |
|---|---|
| Material | `proyectos/017/original/` (10 tomas del rodaje del 2026-10-01 + la canción), normalizadas a `remotion/public/recorrido-017/` por `normalizar.mjs`. Catálogo completo: `catalogo-material.md` |
| Composición | `Recorrido017` · 1080×1920 · **30 fps** · ~1375 f (≈ 45,8 s) *(montaje sin avatar: marcan la música y la voz)* |
| Formato | 9:16 vertical · los seis bloques de `recorrido-luxur` (la versión estándar de 45-50 s) |
| Estilo | **cinematográfico-lujo**: solo `corte` y `disolver`; la cámara ya se mueve (dron, gimbal), así que los planos no se aceleran salvo lo permitido en el bloque 3; empuje lento solo sobre Isabella y el dron de apertura |
| Texto | **editorial** (el modo de Luxur): solo lo que dice Isabella, abajo y a 90 %. **La primera toma sale siempre sin texto** (ni hook escrito ni subtítulos; rev. 4). Sin `<PistaGraficos>` (R14) |
| Marca | Luxur: **el logo** (`Propiedade-Luxur-Logo.png`, blanco, **440 px y al 60 % de opacidad**: 40 % de transparencia) y **la web `PropiedadesLuxur.com`**, **solo en el cierre**, sobre una tarjeta oscura. **Nunca el sello «PROPIEDADES LUXUR»** ni la cuenta escrita `@propiedadesluxur` (pedidos del usuario, rev. 4 y 6) |
| Destino | Reels · TikTok · Shorts |
| Objetivo | que quien lo ve piense «esto sin terminar es justo lo que quiero», y escriba |

## Promesa y CTA

- **Promesa (primeros 3 s):** el edificio de jardines colgantes visto desde el aire, **limpio** (sin texto ni voz: la miniatura es el dron) y con el golpe de la música en el frame 0. A los 2 s —el pulso 2— entra Isabella en la obra gris y dice el hook: «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad».
- **Acción que se pide al final:** «escríbeme y la recorremos juntos» (CT07). El canal NO está dicho (ni «escríbeme» lo nombra): el cierre lleva el logo de Luxur y su web, `PropiedadesLuxur.com`, sobre una tarjeta oscura. ⚠️ Pendiente: ¿DM o WhatsApp?
- **Lo que NO se cuenta:** áreas, alcobas, administración, plazos y coste de terminar la obra (no constan); nada de ALH ni de «piscina» (por confirmar). El precio no entra: el formato no lleva cifras en los bloques 5 y 6, y el único dato dicho es el de MD09.

## El guion (lo único que dice Isabella: tres frases)

| Bloque | Toma | Dice | Papel |
|---|---|---|---|
| 2 · hook | **HK02** (`INT-ABIERTO`) | «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.» | reencuadre de la objeción: «sin terminar» → «oportunidad» (ángulo A del catálogo) |
| 4 · mitad | **MD09** (`INT-ABIERTO`) | «Tienes 317 metros para desarrollar completamente el interior.» | la oportunidad hecha cifra: el único dato de la pieza |
| 6 · CTA | **CT07** (`TERRAZA`) | «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.» | filtro + invitación; «recorremos» cierra el recorrido que se acaba de ver |

Arco: **paradoja → qué te llevas → invitación**. Leído en voz alta es una frase de tres tiempos que no repite ninguna idea.

## Escenas

La canción es *Time* (Hans Zimmer), entrando en el **compás 8 de la escena que el catálogo marca desde 2:48** (`desde` = 175,63 s): sus frases de 8 pulsos (7,62 s) caen en los cuatro momentos de la pieza y la última parte es una resolución de piano que queda bajo el CTA. Ver `combinaciones.md`.

| # | Tramo (s) | Narrativa | Idea (una frase) | Hero | Música |
|---|---|---|---|---|---|
| 1 | 0–2,0 | hook | el edificio desde el aire, sin texto ni voz: la miniatura es el dron limpio | dron | el golpe de apertura y la subida de la frase |
| 2 | 2,0–7,7 | hook | Isabella en la obra gris: «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad» | Isabella | abajo (≈ 10 LU bajo su voz) |
| 3 | 7,7–19,1 | descubrimiento | **el golpe grande entra con la fachada vista desde el suelo** (cielo, nubes, jardines colgantes); la hoja de la puerta y el pasillo de ladrillo; la sala y su ventanal; el barrido del ventanal hacia el espacio abierto | recorrido | arriba, meseta de la canción |
| 4 | 19,1–23,9 | conexión | Isabella llega caminando al espacio abierto: «Tienes 317 metros…» | Isabella | abajo |
| 5 | 23,9–38,2 | recompensa | del follaje al patio de techo de madera, en UNA toma continua de «Patio y Naturaleza» (8,6 s); el dron en el borde de la terraza, con el skyline de Medellín, que se desliza a la derecha | recorrido + dron | la frase más fuerte (30,5–38,1 s) |
| 6 | 38,2–46,6 | recompensa | Isabella sale por esa corrediza: «…la recorremos juntos»; su imagen funde a negro (no se congela) y cierra la tarjeta oscura con el logo y la web | Isabella | **resolución de piano**: ya sola, bajo la voz; se apaga bajo la tarjeta |

## Material que NO entra (y por qué)

- **El resto del catálogo** (11 hooks, 14 mitades, 6 CTA, 21 recorridos, 9 drones): se queda en el SSD y en `catalogo-material.md`. `combinaciones.md` dice cómo cambiar cada pieza.
- `Hook2+IA.MOV` no se usa con «IA»: se monta tal cual (plano real de la sala); la parte de la sala vacía de después de los 9 s queda fuera.

## Derechos (para publicar, no para montar)

- **La canción es comercial** (Hans Zimmer, *Time*, Warner): en Instagram/Facebook la huella de audio puede silenciar o limitar el vídeo en una cuenta de empresa. Para publicar, o se usa desde la biblioteca de la plataforma, o se cambia por una pista con licencia (el catálogo trae varias alternativas con su `desde`). `combinaciones.md` lista las cuatro más cercanas en sentimiento.

## Decisiones tomadas (y las descartadas)

- **Hook = HK02**, no HK03/HK04/HK06: es el único que dice «obra gris» de frente y lo convierte en ventaja (la honestidad del catálogo, regla 7) y sus 0,52 s de aire antes de la primera palabra dejan disolver al plano de Isabella (opaco en el pulso 2) justo cuando empieza a hablar.
- **Voz del hook (rev. 1-3: sobre el dron, J-cut → rev. 4: con su imagen).** Hasta la rev. 3 la primera cláusula sonaba sobre el edificio y el plano de Isabella entraba en la pausa de su frase. Con «la primera toma sale siempre sin texto» eso ya no cabe: sonaba con su subtítulo sobre el dron. Ahora Isabella entra en el pulso 2 y habla con su imagen, como en la mitad y el CTA (las tres voces salen de `vocesDeCortes`).
- **Mitad = MD09** (no MD13/MD14): MD13 está en la terraza, el mismo sitio que CT07 (dos Isabella en el mismo decorado), y MD14 repite la idea del hook. MD09 está en el espacio abierto donde acaba el recorrido por dentro, y su audio no tiene palabras dudosas.
- **CTA = CT07** (no CT02/CT03/CT04): ni cifras en el cierre (el formato lo prohíbe), ni «ALH», y su plano nace en la terraza que el dron acaba de enseñar. Su límite: **la toma no tiene cola** (la voz acaba 0,1 s antes del final del archivo): hasta la rev. 5 se resolvió con su último fotograma congelado y desde la rev. 6 NO se congela nada: la imagen funde a negro y sigue una tarjeta oscura (ver la rev. 6).
- **Retirado en la rev. 4: el hook escrito** («Aún sin terminar: la oportunidad», arriba, f0-54). La miniatura (frame 0) es el dron limpio y la promesa la dice Isabella.
- **El logo, en la tarjeta oscura** (rev. 6; antes iba arriba sobre el fotograma congelado, donde Isabella llenaba el cuadro y la franja de abajo caía sobre su blusa blanca): centrado, sobre la web, y a 60 % de opacidad: sobre negro el blanco se lee sin velo.
- **Descartado:** `velocidad` ≠ 1 en ningún plano (el catálogo ya trae movimiento de gimbal y de dron; acelerarlo se lee como timelapse y el formato lo reserva al bloque 3); un whoosh o un impacto en las transiciones (formato: «las transiciones no se oyen»); una segunda canción (un solo tema de principio a fin: la tonalidad no choca nunca).

## Revisión 2 (2026-10-03) — lo que pidió el usuario tras ver la prueba

> «En el Min 7 cambia la toma por: Exterior edificio4.MOV y en el 31 por: Patio y Naturaleza.MOV»

Se leyó como segundos del reproductor, y como **la toma que se ve en ese momento**:

| Segundo | Lo que había (rev. 1) | Ahora (rev. 2) | Cómo se hizo |
|---|---|---|---|
| **0:07** (entra a los 7,70 s, en el golpe grande) | `c03` · RC01 «Recorrido Abre puerta» 0,4-2,3 s: el «501» sobre el ladrillo | `c03-fachada` · **RC25 «Exterior edificio4»** 1,2-3,1 s: el contrapicado de la fachada de jardines colgantes, con el cielo y las nubes, y la cámara que baja hacia el camino | misma ventana (f231-288, pulsos 8-10) y misma disolvencia; `c04` (la hoja de la puerta) sigue detrás |
| **0:31** (dentro de `c09`, f831-974) | `c09` · RC10 «Patio y Piscina» 3,4-8,2 s | `c09` · **RC08 «Patio y Naturaleza»** desde el fotograma 162 hasta el último del clip | ver abajo |

**RC08 ya salía antes** (`c08`, el follaje). En vez de repetir material, `c08` y `c09` pasan a ser **UNA toma continua** de 8,6 s: `c08` arranca un segundo antes (1,57 s) y `c09` empieza en el fotograma siguiente al último de `c08`. El pulso 29 se queda como límite de los dos planos del plan, pero en pantalla no hay corte (medido: la diferencia entre los fotogramas del empalme, 14,6, es la de sus vecinos, 14,6-14,7). La toma llega hasta su último fotograma justo al entrar el dron, y el golpe de frase más fuerte de la canción (f917) cae en la revelación del patio.

Lo que se pierde: **el «501» sobre la puerta** (el único dato que ubica la unidad) y el espejo de agua de RC10 (que además se ve sin agua). Quien quiera recuperarlos: la rev. 1 está descrita en `combinaciones.md` §1 y su prueba, en `pruebas-720p/017-recorrido-720p-rev1.mp4`.

## Revisión 3 (2026-10-03)

> «en el 0:32 la toma DJI_20261001104246_0163_D.MP4 debe empezar en el seg 0:02»

El plano que entra a los 32,47 s es `c10-dron` (el dron de la terraza, DR163). Antes arrancaba en el segundo 13,3 del clip (el último tramo: el dron
baja a ras de suelo hacia el muro de ladrillo y la corrediza); ahora arranca en el **2,0** y llega al 7,7: el **borde de la terraza**, con la columna de
concreto, el canto del techo de madera, el skyline de Medellín (la torre de cristal y los edificios naranjas) y las plantas de la barandilla, mientras la
cámara se desliza despacio a la derecha. Misma ventana (f974-1145, 5,7 s, pulsos 34-40): solo cambia de dónde del clip sale.

Lo que cambia con ello: el dron ya no **termina** en la corrediza por la que sale Isabella, así que la disolvencia al CTA une dos vistas de la misma
terraza (el borde y el fondo con la corrediza) en vez de un plano que acaba donde empieza el otro. Es la vista del skyline la que cierra el recorrido.

## Revisión 4 (2026-10-03)

> «0:38 quita arriba propiedades luxur NUNCA LO PONGAS en vez @propiedadesluxur agrega el logo Propiedade-Luxur-Logo.png
> Remueve el texto aun sin terminar: la oportunidad al principio que la primer toma siempre salga sin texto»

Tres pedidos. Los de «NUNCA» y «siempre» son **reglas permanentes** del canal, no de esta pieza: están escritas en las skills `recorrido-luxur` y `guion-luxur`.

| Pedido | Lo que había (rev. 3) | Ahora (rev. 4) |
|---|---|---|
| «quita arriba propiedades luxur NUNCA LO PONGAS» | el sello «PROPIEDADES LUXUR» (`SelloCampana`, la píldora de y 84-150) entraba en el cierre | **no hay sello**: ni aquí ni en ninguna pieza de este formato |
| «en vez de @propiedadesluxur, agrega el logo Propiedade-Luxur-Logo.png» | la cuenta de texto `@propiedadesluxur`, arriba, f1342-1375 | el **logo** (PNG blanco con transparencia, 1000×518) en ese mismo sitio, arriba y centrado a 560 px de ancho (y≈245-459); entra 2 f después de «juntos» (f1338), en 10 f, y se queda sobre el negro hasta el final |
| «Remueve el texto aún sin terminar: la oportunidad… que la primer toma siempre salga sin texto» | el hook escrito arriba (f0-54), y la voz del hook ya sonando sobre el dron con su subtítulo (desde el f58) | la **primera toma sale limpia**: sin hook escrito, sin subtítulos y sin voz. Isabella entra en el pulso 2 (f60) y dice el hook con su imagen |

### Qué se movió por eso

| | Rev. 3 | Rev. 4 |
|---|---|---|
| `c01-dron` | f0-129 (4,3 s), empuje 1,00→1,10 | f0-60 (**2,0 s**), empuje 1,00→1,05 |
| `c02-hook` | `en` 129 (la disolvencia empezaba en el pulso 4), HK02 2,90-6,30 s | `en` 60 (la disolvencia acaba en el pulso 2: opaca en f60), HK02 0,50-6,20 s, 171 f |
| voz del hook | un tramo propio sobre el dron (f58-f201) | el de las otras dos tomas (`vocesDeCortes`): f61-f204, con su imagen |
| subtítulos del hook | `h01` 58 · `h02` 130 | `h01` 61 · `h02` 133 (+3 f, lo que se movió la voz) |
| música bajo el hook | baja f46→58, sube f201→213 | baja f49→61, sube f204→216 |
| texto arriba | `portada` f0-54 y `cuenta` f1342-1375 | **nada**, salvo el logo (f1338-1375) |
| congelado final | un PNG (`foto`) | un MP4 de ese mismo fotograma (ver abajo) |

**Cómo se leyó lo del texto, y lo que cuesta.** «Que la primera toma siempre salga sin texto» se leyó en estricto: el dron no lleva hook escrito ni subtítulos, y tampoco voz, porque la voz del hook traía su subtítulo y sonaba sobre él. Eso obliga a esperar a su imagen: el dron pasa de 4,3 s a **2,0 s** (hasta el pulso 2, el último en que la frase entera del hook, 4,8 s de voz, todavía acaba antes de que empiece la disolvencia a la fachada, que tiene que acabar en el golpe grande, f231). Es la única consecuencia de fondo.

**Un dron más largo** (p. ej. hasta el pulso 4, 3,9 s) no cabe sin rehacer la rejilla: la voz del hook dura 4,8 s y acabaría en el f260, es decir, bajo el golpe grande de la fachada (f231), que es el más fuerte de la subida y bajaría de nivel. Habría que pasar el recorrido a la frase siguiente de la canción (+7,6 s) o acortar el hook; las dos cosas cambian la duración y la rejilla entera.

**Lo que se pierde, además:** la línea escrita del hook en la miniatura (la miniatura ya no «dice» nada, solo enseña el edificio) y, como desde la rev. 2, el «501» sobre la puerta.

**El congelado, de PNG a MP4.** Al medir el cierre se vio un escalón de brillo de un solo fotograma en el f1339, **que ya estaba en las rev. 1-3**: el último fotograma del vídeo (f1338) y el PNG que lo sostenía diferían 5,1 niveles de luma (≈ 4 %) y de tinte (R×0,977 · G×0,954 · B×0,937), medido en stills a 1080×1920, sin códec de por medio. Causa (corregida en la rev. 7; aquí se leyó mal): **no son «caminos de decodificación distintos»**. ffmpeg ≥ 8 escribe en cada PNG los fragmentos `cICP` (BT.709), `cHRM` y `gAMA` (0,45455), y Chrome gestiona ese PNG como color y lo saca más oscuro: el mismo PNG, con esos tres fragmentos quitados, sale idéntico al píxel (máx. |Δ| = 0), y con ellos 6,8 niveles de luma más oscuro (la prueba está en `aprendizajes.md` §13). El arreglo de entonces —un MP4 del fotograma— funcionó, pero por otra razón. Ahora el congelado es `ct07-cola.mp4` —el último fotograma de CT07 repetido 45 veces, con las mismas etiquetas de color— y pasa por el mismo camino que el plano anterior: el escalón es **0,00** y los tres canales, ×1,000. La puerta comprueba por PSNR (62,9 dB) que ese clip es el último fotograma de `ct07.mp4`.

## Revisión 5 (2026-10-03)

> «reduce el tamaño de la cursiva 8px»

La cursiva es la **itálica de los acentos** («terminado», «la oportunidad.», «317 metros», «el interior.», «escríbeme»: Playfair Display itálica, 5 líneas). Se leyó en px de la
composición (1080×1920) y como un cambio de **cuerpo de letra**: de **99 a 91 px**. La base (Montserrat, 45 px) y el resto no se tocan, y los planos, la voz, la música, el logo y los tiempos
tampoco: solo cambia el texto de esas cinco líneas (medido: ni un píxel distinto fuera de la franja del texto, filas ~1490-1650 de 1920).

**Cómo se hizo sin mover otras piezas.** El cuerpo del acento es del motor (`SUB.acento` = 2,2 × 45 px) y la marca Luxur lo comparte con otras piezas (el 016 usa los mismos subtítulos),
así que no se cambió ni `luxur.ts` ni la constante: se añadió al motor un parámetro OPCIONAL, `acentoMenos` (px que se restan SOLO a las líneas de acento), y el 017 se lo pasa
(`ACENTO_MENOS_017 = 8` en `subtitulos-017.ts`). Sin el parámetro, la geometría de los 13 bloques de la demo, el 016 y el 017 sale idéntica byte a byte, y los fotogramas de `SubtitulosDemo`,
píxel a píxel. Si alguna vez se quiere la cursiva más pequeña para TODO el canal, es un cambio de `luxur.ts` que el usuario tiene que pedir (movería las demás piezas).

Lo que cambia en la pantalla: la línea de acento mide 87 px de alto (antes 95) y el bloque encoge 8 px (el borde de arriba, y con él las líneas que van por encima de la cursiva, se quedan donde
estaban; solo en `c02`, donde la cursiva va en medio, la línea de debajo sube 8 px); la cursiva queda ~8 % más estrecha («la oportunidad.» de 702 a 645 px).

## Revisión 6 (2026-10-03)

> «El logo debe ser un poco más pequeño y con 40 % de transparencia, y no dejes que el último fotograma se congele: pasa a un fondo oscuro donde pongas la web: `PropiedadesLuxur.com`»

Tres pedidos sobre el CIERRE, y una lectura declarada:

| Pedido | Lo que había (rev. 5) | Ahora (rev. 6) |
|---|---|---|
| «el logo un poco más pequeño» | 560 px de ancho (el logo en sí, 499 px), arriba sobre el fotograma congelado | **440 px** (el 79 %; el logo en sí, 392 px), centrado en la tarjeta oscura |
| «con 40 % de transparencia» | opacidad 1 (más un velo oscuro para que se leyera sobre el ladrillo) | **opacidad 0,6** (40 % transparente), sin velo |
| «no dejes que el último fotograma se congele» | el último fotograma de CT07 repetido 36 f (primero en un PNG, luego en un MP4), con el logo encima | **nada se congela**: la imagen de Isabella funde a negro en 6 f y llega a negro EXACTO en su último fotograma |
| «pasa a un fondo oscuro donde pongas la web» | — | una **tarjeta oscura** de 2,0 s (el negro de la marca, liso) con el logo y, debajo, `PropiedadesLuxur.com` en blanco (Montserrat 500, 54 px, tal cual la escribió el usuario) |

**Lecturas declaradas.** (1) «40 % de transparencia» = 40 % TRANSPARENTE = 60 % de opacidad (el usuario habló de «opacidad al 90 %» para los subtítulos y aquí dijo «transparencia»); si quería el 40 % de opacidad, es `LOGO_TRANSPARENCIA = 0.6` en `cierre-017.ts`. (2) «Fondo oscuro» = el negro de la marca (`LUXUR.color.negro`, #000000), el mismo al que funde la imagen. (3) El logo SIGUE en el cierre, ahora junto a la web.

**Qué se movió por eso.** La toma del CTA acaba 3 f después de su última palabra, así que no hay imagen para fundir DESPUÉS de que ella calle: el fundido (6 f) empieza 4 f antes de que acabe de hablar (a 67 % de negro cuando dice la última sílaba) y llega a negro en el último fotograma de la toma. La tarjeta (plano `c12-cierre`, `foto` de un PNG negro liso) entra a corte donde acaba la toma, f1339, y dura 60 f: el logo entra en el f1341 y la web en el f1347, y se leen enteros hasta el f1399. La pieza pasa de 45,8 s a **46,6 s**. La música ya no ocupa la pieza entera: «Time» vuelve a pegar en el pulso 48 (f1373), así que el piano se apaga desde que acaba la toma (f1339) y la música acaba en el f1371; el resto de la tarjeta, ≈ 0,9 s, queda en silencio.

**Qué se quitó:** el clip del congelado (`ct07-cola.mp4`) y su receta, el velo del logo (el blanco sobre negro no lo necesita) y la regla de «20-45 f de cola» (ahora, 45-90 f desde la última palabra hasta el final: la tarjeta se lee).

## Revisión 7 (2026-10-03)

> «Perfecto, ahora puedes mejorar la colorización con https://www.remotion.dev/docs/effects/color-correction para que los colores se vean vivos, balanceados y cinematográficos»

Un pedido, una decisión que era suya y una lectura declarada.

**La decisión: subir Remotion.** `colorCorrection()` existe desde la 4.0.509 y el repo estaba en la 4.0.496. Se le preguntó (usar el efecto oficial subiendo la versión, o reproducirlo con filtros CSS) y eligió **subir a la 4.0.509**. Lo que costó, medido: los clips que no van a 30 fps pueden dar otro fotograma en un corte de las piezas ya publicadas que los usan (de 240 fotogramas muestreados contra la 4.0.496, 233 idénticos; los distintos, Reel009 4 de 8, Avatar014, Documental010 y Noticia008 1 de 8 cada una; el 017, 016, 015, 013 y 011 van a 30 fps y salen idénticos), y el render del efecto necesita `--gl=angle`. Detalle en R32 de `manuales/edicion-video/reglas.md`.

**Cómo se leyó «vivos, balanceados y cinematográficos»** (tres cosas que se pueden medir, no tres adjetivos):

| | Qué se pidió | Qué se midió | Antes | Después |
|---|---|---|---|---|
| **Vivos** | colores con presencia | saturación media (HSV) de los 11 planos | 0,301 | **0,354** (+17 %) |
| **Balanceados** | que cámaras y horas distintas se lean como una casa, sin cielos quemados | dispersión de la luma media entre planos (σ) · lo quemado en el peor plano (≥ 250 en algún canal) | σ 14,2 · 15,5 % (el cielo del dron) | **σ 9,2 · 3,6 %** (la ventana del ventanal) |
| **Cinematográficos** | cuerpo, no plano ni lavado | contraste, negros, luces: la base de `COLOR_BASE` (contraste 1,10, negros −0,06, luces −0,20, un punto cálido +0,03) | material plano de iPhone y dron | a ojo y en el panel `color-antes-despues.png` |

Y un límite que se puso él solo, por ser una presentadora: **la piel de Isabella se queda donde estaba** (tono 19,7° → 20,1° en el hook y 18,4° → 18,2° en el CTA; en la toma de la mitad, a la sombra, 10,7° → 7,8°, pero allí abrir las sombras hizo crecer la máscara de piel un 50 % y la comparación no es limpia).

**Lo que se hizo.** Cada uno de los 11 planos de vídeo lleva su `color` en `metraje-017.ts`: una base común (`COLOR_BASE`) y el ajuste de su toma, medido sobre stills PNG (`herramientas/medir-color.py`). La tarjeta oscura del cierre (una foto de negro liso) no se gradúa. Los dos planos de la toma continua de RC08 (c08 y c09) llevan **el mismo** objeto, por construcción: el empalme del f831 sale con un salto de luma de −0,2 niveles (−0,3 antes).

| Plano | Ajuste sobre la base | Por qué |
|---|---|---|
| c01 dron 147 | exposición +0,25 · luces −0,30 · sombras +0,16 · vibrance 0,04 | es de los planos más oscuros (luma media 101, p5 17): se abre |
| c02 hook (Isabella) | exposición −0,05 · contraste 1,12 · negros −0,10 · saturación 1,02 · cálido +0,02 | piel intacta; solo cuerpo al hormigón |
| c03 fachada | exposición −0,28 · luces −0,30 · blancos 0 · cálido +0,04 | luma media 153 y p95 232 (las nubes al límite): se recoge para que no se quemen |
| c04 puerta | exposición −0,08 | ya traía color (saturación 0,30) y buena luz: casi solo la base |
| c05 sala | exposición −0,08 · contraste 1,12 · saturación 1,06 | hormigón y ladrillo: cuerpo sin teñir |
| c06 ventanal | exposición +0,25 · sombras +0,35 · negros +0,04 · luces −0,35 · saturación 1,06 | interior oscuro contra un ventanal claro: se comprime el rango |
| c07 mitad (Isabella) | exposición +0,20 · sombras +0,28 · luces −0,42 · blancos −0,10 · saturación 1,04 · contraste 1,06 | ella a la sombra, con el ventanal detrás |
| c08 = c09 (RC08) | exposición +0,12 · luces −0,35 · saturación 1,07 · vibrance 0,03 | una sola toma: el mismo color |
| c10 dron 163 | exposición −0,12 · sombras +0,22 · negros 0 · luces −0,55 · blancos −0,35 · cálido +0,14 · vibrance 0,04 | el cielo estaba quemado en el 15,5 % del cuadro |
| c11 CTA (Isabella) | exposición +0,15 · saturación 0,98 · cálido −0,06 | la toma más saturada (0,50) y cálida: se enfría un poco |

**Por plano, antes → después** (un fotograma a mitad de cada plano, sin la franja de subtítulos):

| Plano | Luma media | Saturación | Quemado | Aplastado |
|---|---|---|---|---|
| c01 dron | 100,9 → 107,4 | 0,354 → 0,455 | 0,2 → 1,0 % | 1,3 → 4,0 % |
| c02 hook | 126,5 → 125,9 | 0,252 → 0,287 | 0,1 → 0,1 % | 0,6 → 1,6 % |
| c03 fachada | 153,3 → 138,8 | 0,213 → 0,257 | 0,0 → 0,0 % | 0,2 → 0,6 % |
| c04 puerta | 130,5 → 128,3 | 0,301 → 0,353 | 0,0 → 0,0 % | 0,0 → 0,0 % |
| c05 sala | 127,6 → 125,6 | 0,227 → 0,261 | 0,1 → 0,0 % | 1,2 → 1,9 % |
| c06 ventanal | 101,9 → 109,8 | 0,273 → 0,317 | 0,0 → 3,6 % | 5,2 → 6,2 % |
| c07 mitad | 119,9 → 124,6 | 0,229 → 0,248 | 0,0 → 0,0 % | 0,7 → 1,1 % |
| c08 follaje | 110,7 → 112,5 | 0,296 → 0,376 | 0,2 → 1,7 % | 0,0 → 0,4 % |
| c09 patio | 112,9 → 116,0 | 0,408 → 0,465 | 0,1 → 0,8 % | 0,4 → 0,9 % |
| c10 dron | 121,2 → 111,1 | 0,259 → 0,358 | 15,5 → 0,0 % | 0,5 → 4,0 % |
| c11 CTA | 112,9 → 119,4 | 0,502 → 0,512 | 0,1 → 0,8 % | 0,3 → 0,5 % |

**Lo que sube y hay que saberlo** (declarado, no escondido): lo aplastado crece en c01 y c10 (hasta el 4 %: las copas y la columna a contraluz) y lo quemado, en c06 (3,6 %: el cielo del ventanal, que ya lo estaba a su manera). **Los empalmes:** c03→c04 pasa de −28,8 a −17,8 niveles de luma y c09→c10 de −6,4 a −19,4 (el dron se oscurece al proteger su cielo y el patio sube): es un corte entre dos sitios distintos sobre un golpe de música, no una costura, y se juzgó a ojo en los dos pares de fotogramas (`pruebas-720p/color-cortes.png`).

**Qué no cambió** (comprobado): los planos, los cortes, la duración (1.399 f, 46,6 s), la voz, la música, los subtítulos, el logo y la tarjeta. El audio de la prueba nueva es el de la rev. 6 **bit a bit** (el md5 del PCM decodificado, `5dcc7e5e…`, coincide) y 0 de 1.338 fotogramas salen desalineados contra el render anterior (`herramientas/alinea-renders.py`: un plano que el camino nuevo sacara un fotograma tarde o pronto no lo vería un ojo; la misma herramienta caza un desfase de uno en una copia adelantada a propósito).

**Qué cuesta (para el siguiente).** (1) El render lleva `--gl=angle`; sin él, error («Failed to acquire WebGL2 context»). (2) **La prueba no se hace a `--scale=0.5`**: con el camino nuevo a media escala el fotograma sale aliasado (×1,46 de energía de alta frecuencia sin graduar siquiera) y el MP4 pesa el doble; se renderiza a escala 1 y se reduce con ffmpeg a 540×960 (la prueba de la rev. 7 pesa 30,0 MB; la rev. 6, 31,4). (3) **La final (R22) con color, medida el 2026-10-03:** color medio a ≤ 1,2 niveles del still, PSNR de baja frecuencia 43,7-50,8 dB, bruto medio 41,85 dB (`aprendizajes.md` §13); el master pide el arreglo de las dos capas de etiquetas de R22. (4) Un 4:2:0 de 8 bits con curvas fuertes puede sacar bandas: se miraron ampliaciones al 100 % de un cielo, de un muro de hormigón y de una cara (`color-recortes-100.png`) y están limpias.

**Cómo volver a la rev. 6:** quitar los 11 `color:` de `metraje-017.ts` (las constantes `COLOR_BASE`, `color` y `COLOR_PATIO` sobran) y la sección 2e de la puerta; la prueba de la rev. 6 está en `pruebas-720p/017-recorrido-720p-rev6.mp4`. Sin `color`, los planos vuelven a `<OffthreadVideo>` y el `--gl=angle` deja de hacer falta.

## Revisión 8 (2026-10-03)

> «Al final el texto debería ser: `Necesitas saber si esta unidad en específico funciona para ti`»

Un cambio de una palabra, y un pendiente que llevaba abierto desde la rev. 1: en el subtítulo del CTA **«línea» pasa a «unidad»**. La transcripción automática (whisper-small) oía «línea» con confianza 0,06 en su primer trozo y, en otro corte, «noidad»; el plan lo dejó marcado «POR CONFIRMAR AL OÍDO» y así se montó, y se exportó, hasta que el usuario lo corrigió. La voz no se toca: es la misma toma (CT07), y la palabra dicha era «unidad».

| | Rev. 7 | Rev. 8 |
|---|---|---|
| Subtítulo del CTA, 2.ª línea (f1177) | «si esta línea en específico» | «si esta **unidad** en específico» |
| `voz.dice` de `c11-cta` (solo para leer el plan) y `voz/cta.txt` | «…esta línea en específico…» | «…esta unidad en específico…» |
| Tiempos, voz, música, color, logo y cierre | — | **sin cambios** |

**Lo que se comprobó.** La línea nueva mide 642 de 842 px útiles (no se encoge, sigue centrada: se miró el fotograma a 1080×1920, f1200 y f1242) y el validador del motor sigue sin avisos. El `.srt` cambia en un cue (el 13, 39,233-40,700 s). **El final se volvió a exportar** con el mismo comando de R22: de los 1.399 fotogramas, 1.150 son idénticos bit a bit a los de la rev. 7 y los 249 que difieren (f1145-f1393) son el arrastre del codificador tras un cambio de contenido (la anticipación de x264 y el control de tasa); lo que cambió de verdad en pantalla es la 2.ª línea del CTA en f1179-f1257 (79 fotogramas, filas 1495-1538 de 1920), y fuera de la franja del texto el PSNR entre las dos finales es de ≥ 42 dB (57,5 de media). Etiquetas, color (los mismos 12 fotogramas, ≤ 1,2 niveles, PSNR medio 41,85 dB), audio (md5 del PCM idéntico), decodificación y sonoridad, como en la rev. 7.

**Lo que no se cambió.** El punto final de «funciona para ti.» (el usuario escribió la frase sin él, pero todos los bloques del canal cierran con su punto y no pidió quitarlo).
