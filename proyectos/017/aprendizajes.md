# Aprendizajes del 017

Primera pieza montada con el formato `recorrido-luxur` completo sobre material real (tres tomas de
Isabella, recorrido y dron, una sola canción). Lo que se corrigió o se descubrió, y por qué.

## 1. El alineador por palabra puso 5 de 17 líneas hasta 0,45 s ANTES de su palabra

`trozos-editoriales.mjs --audio` dejó el plan limpio y el validador en verde, y aun así «317 metros»
salía 0,22 s pronto, «para desarrollar» 0,31 s y «el interior» 0,45 s. Causa: whisper-small marca el
**final** de cada token con el DTW; tras una pausa corta (< 0,12 s, que el ancla de energía no ve) o dentro
de una cifra, la línea «empieza» donde acaba la palabra anterior. Se corrigió llevando cada línea al
**onset** de su palabra en la envolvente de la voz sola (valle ≥ 5 dB → subida ≥ 8 dB, banda 300-3400 Hz;
`herramientas/onsets-voz.py`) y se comprobó sobre el audio del RENDER (`herramientas/subs-vs-voz.py`): 16
de 17 líneas entre −1,6 y +2,2 f de la voz (mediana +1,6 f: la línea entra 1-2 f antes del sonido, que con
su fundido de 5 f es el sesgo bueno). → **R31** en `manuales/edicion-video/reglas.md`. (Medir con la música debajo engaña en la primera sílaba de una
toma: ver §10.)

Una palabra dudosa NO se resuelve volviendo a transcribir trozos sueltos: en tramos de 0,4-1 s whisper
inventa («¡Hasta la próxima!», «¡Suscríbete!», «noidad» por «línea»). Sirve para algo concreto: transcribir
entre dos valles profundos para saber QUÉ palabras caen a cada lado. Un cotejo MFCC con «unidad» y «propiedad»
de la misma voz (CT04, HK09) no discriminó. «línea» (CT07) queda por confirmar al oído.

## 2. Un hook que suena ANTES que su imagen (rev. 1-3; retirado en la rev. 4)

> **Retirado en la rev. 4:** el usuario pidió que la primera toma salga siempre sin texto, y la voz del hook traía su subtítulo sobre el dron. Ahora el hook entra con su
> imagen (§10). Lo que sigue es lo que se aprendió mientras existió, por si otra pieza vuelve a un J-cut con otra toma y sin esa regla.

La primera cláusula de HK02 («Este apartamento aún no está terminado») suena sobre el dron y la imagen de Isabella entra en la
pausa de 200 ms de su frase, justo al empezar «…y ahí está». Así los 4 primeros segundos son todo imagen espectacular y la voz ya está
desde el segundo 1,9. Hay que hacerlo con cuidado porque `vocesDeCortes` no lo sabe: la voz del hook es un tramo propio (`vozHook`,
como un off) y la puerta comprueba lo que se rompería sin avisar: que voz e imagen cuenten el MISMO segundo de la toma (si no, la boca va
desfasada), que la primera palabra caiga sobre el dron y que la imagen entre dentro de la pausa.

## 3. Una toma sin cola: el fotograma congelado, con el empuje continuo (rev. 1-5; sustituido en la rev. 6)

> **Sustituido en la rev. 6:** el usuario pidió que el último fotograma NO se congele; ahora la imagen funde a negro y sigue una tarjeta oscura con el logo y la web (§12). Lo que sigue es lo que se
> aprendió mientras existió el congelado, y vale si otra pieza vuelve a necesitarlo (receta del MP4: `select=eq(n,N-1),loop=loop=44:size=1:start=0,setpts=N/(30*TB)`, `-frames:v 45`, `libx264 -crf 8`, etiquetas bt709).

CT07 acaba 0,1 s después de su última palabra, y el formato pide 20-45 f para ver lo último que se enseña (la cuenta hasta la rev. 3, el logo desde la 4). Alargar el clip
no se puede (Remotion congelaría el último fotograma sin avisar, y la puerta no lo consiente), así que el último plano es el fotograma final cuyo zoom sigue el de CT07 a
la misma velocidad (0,048 en 194 f → 0,008 en 36 f): el congelado no se lee como una pausa. Y lo de texto o logo va ARRIBA: abajo, sobre el congelado, Isabella llena el
cuadro y el bloque caía sobre su blusa blanca (blanco sobre blanco). Se vio en el still del f1345, no en la puerta. **El congelado era un MP4 del fotograma
(`ct07-cola.mp4`), no un PNG** (rev. 4, §10): el PNG salía un 4 % más oscuro que el vídeo anterior, y no por «caminos de decodificación distintos», como se creyó entonces, sino por los fragmentos de color que ffmpeg escribe en el PNG (§13).

## 4. La música: anclar en las frases, no en una recta

El catálogo da `desde` 168,00 s para *Time*. Con ese punto el golpe grande caía a los 15,2 s (en mitad del recorrido) y la resolución a los
45,7 s (cuando la pieza acaba). Entrando 8 pulsos después, la puerta cae en el golpe grande (f231), el patio en la frase más alta (f917) y la
resolución justo cuando entra Isabella en el CTA (f1145). El tempo varía ±0,1 % entre frases, así que la rejilla se ancla en los golpes de
FRASE (`FRASES`, interpolando 8 pulsos entre ellos) y no en una sola recta. El audio del render llega 42 ms tarde (medido en el 016): aquí
se confirma (golpes 8, 16 y 32 a 0,0 f de su corte, medidos sobre el audio del render). Un estimador automático del BPM no funcionó
(confunde el pulso con sus divisores): `medir-pista.py` da los golpes y la sonoridad, y la frase se lee en la lista.

## 5. Medir la sonoridad de un tramo: `-ss` DELANTE de `-i`

Con `ffmpeg -i x.wav -ss S -t D -af ebur128`, el `-ss` es una opción de salida: ebur128 analiza la canción desde el principio y la
integrada sale igual (−11,9 LUFS) en cuatro tramos distintos. Se vio porque la «resolución» a −24 LUFS daba −11,9. Con `-ss S -t D -i x.wav`
(opciones de entrada) sale cada tramo: −9,4 · −7,7 · −24,2. Quedó escrito en `combinaciones.md` §4.

## 6. Dos velos propios y la opacidad como un grupo

Luxur no lleva sombra, así que el texto lo sostiene un velo. `<PistaMetraje velos>` es de la pista entera y habría oscurecido doce
planos cuyo texto solo aparece en un tercio de la pieza: los velos son de la composición y viven la unión de los bloques (los huecos
de menos de 1 s no lo apagan: un velo que bombea se ve más que el texto). El 90 % de opacidad es un `<AbsoluteFill style={{opacity}}>`
alrededor de `<SubtitulosEditoriales>`: no se toca el motor, la puerta lee la constante (`OPACIDAD_SUBTITULOS`) y comprueba que el grupo la usa.

## 7. Otras cosas que ahorran tiempo

- Dos renders del mismo `--crf` y la misma imagen pesan lo mismo al byte aunque el audio haya cambiado (+1,5 dB de música): el AAC es de
  tasa constante. El tamaño del MP4 no dice si el render se rehízo.
- Un solo bundle para N stills (`renderStill` con un `bundle` y `selectComposition` propios, 5 s de bundle y 4 s por still) evita los
  2-3 GB por cada `npx remotion still` (memoria `remotion-bundles-llenan-disco`).
- La hoja de contactos de las TOMAS (tone-map con VideoToolbox + `transpose_vt`) y los espectrogramas de la voz decidieron más que la
  lectura del catálogo: el catálogo describe por tiras de 8-12 fotogramas y se equivoca en los segundos (el ventanal de RC07 sale de cuadro hacia
  los 3,5-4 s, no a los 5).

## 8. Revisión 2: «en el min 7 cambia la toma por Exterior edificio4 y en el 31 por Patio y Naturaleza»

Dos cambios de toma pedidos tras ver la prueba. Lo que sirvió para hacerlos sin romper nada:

- **«Min 7» y «31» son segundos del reproductor, y el plano es el que se VE en ese momento.** A los 7,7 s entra la puerta del 501 (el primer plano del
  recorrido, en el golpe grande) y a los 31 s se ve el patio de RC10; se cambiaron esos dos y se dijo cómo se había leído. La puerta tiene ahora una
  sección (2b) que comprueba el encargo con palabras: qué clip entra a los 7 s y cuál se ve a los 31.
- **Pedir un clip que ya sale en la pieza (RC08 era `c08`) no es repetirlo: es alargarlo.** `c08` y `c09` pasaron a ser UNA toma continua de 8,6 s:
  `c09` arranca en el fotograma siguiente al último de `c08` (47 + 115 = 162) y llega hasta el último del clip (304 de 305), así que el
  clip entra EXACTO en las dos ventanas con `c08` empezando un segundo antes (1,57 s). El corte del pulso 29 queda en el plan y no en la pantalla:
  se comprobó con la diferencia entre los fotogramas del empalme (14,6) contra la de sus vecinos (14,6-14,7); un salto habría dado ~18 y una repetición, ~0.
  `tramosDisjuntos` lo admite porque los dos tramos se tocan sin solaparse, y la puerta añadió que son del mismo clip, contiguos y que `c09` entra a corte.
- **El cambio de una toma de recorrido mueve el brillo del corte.** Del cielo de RC25 (luma 134) a la hoja negra de la puerta, −25 niveles; de la
  revelación del patio de RC08 (135) al arranque del dron, −27. Los dos van sobre un golpe y entre exterior y sombra, que es un cambio de luz esperable; no
  se tocó el `grado`. Si molestara, la salida es otro arranque de `desde` (no un `exposicion` del plano, que movería todo su tramo).
- Lo que se pierde: el «501» sobre la puerta, el único dato que ubica la unidad en una pieza sin cifras, y el espejo de agua de RC10. La rev. 1 está descrita
  en `combinaciones.md` §1 (con cómo volver a ella) y su prueba se conserva en `pruebas-720p/017-recorrido-720p-rev1.mp4`.

## 9. Revisión 3: el dron arranca en el segundo 2 de su clip

«En el 0:32 la toma DJI_20261001104246_0163_D.MP4 debe empezar en el seg 0:02»: `c10-dron` (entra a los 32,47 s) pasó de `desde` 13,3 s a 2,0 s, con la
misma ventana. Aquí el tiempo del encargo no admitía dudas (el plano que entra a los 32 s y el segundo del CLIP en que empieza), y la puerta lo comprueba.
Se vio al mirar el tramo que, con el cambio, el plano deja de **terminar** frente a la corrediza por la que sale Isabella (el puente dron → terraza → ella de la rev. 1
y 2) y pasa a ser la vista del skyline desde el borde de la terraza; la disolvencia al CTA une ahora dos vistas de la misma terraza en vez de un plano que acaba
donde empieza el otro. No es peor ni mejor: es otra elección, y el cambio es de una línea si se quiere volver.

## 10. Revisión 4: sin sello, el logo en vez de la cuenta, y la primera toma sin texto

> «0:38 quita arriba propiedades luxur NUNCA LO PONGAS; en vez de @propiedadesluxur agrega el logo Propiedade-Luxur-Logo.png. Remueve el texto aún sin terminar: la
> oportunidad, al principio, que la primera toma siempre salga sin texto.»

- **«Nunca» y «siempre» son reglas del canal, no de la pieza.** Se escribieron en las skills (`recorrido-luxur`, `guion-luxur`), en la plantilla de la puerta y en la
  memoria, y la puerta de esta pieza las comprueba (sección 2c): sin `SelloCampana`, nada arriba salvo el logo, sin «@» en el texto, el primer subtítulo posterior al `en` de
  Isabella, y el logo montado con `<Img>` dentro de su geometría.
- **Leer «la primera toma sin texto» en estricto cambia la estructura.** El hook dicho traía su subtítulo y sonaba sobre el dron (J-cut): quitar el texto de la primera toma
  quitaba también esa voz, y el dron pasó de 4,3 a 2,0 s. El pulso 2 es el último en que la frase del hook (4,8 s) acaba antes de la disolvencia a la fachada, que ha de acabar en
  el golpe grande (f231). Se dijo al usuario cómo se leyó y qué cuesta, con la alternativa.
- **El logo, por su contenido y no por su PNG.** El PNG (1000×518) lleva el logo en x54-945, y63-444: se colocó por el logo (560 px de ancho → y≈245-459, por encima de la
  cabeza de Isabella en el congelado, y≈525, y por debajo del 12,5 % que tapa la interfaz de las plataformas). Es blanco con transparencia: sobre el ladrillo claro no se lee sin un velo
  (`VeloLogo`).
- **Medir los subtítulos contra el render CON música engaña en la primera sílaba.** `subs-vs-voz.py` sobre el MP4 dio +4,2 f en «Este» (las demás, +1 a +2). Parecía un fallo de 4 f
  y no lo era: el detector se perdía la primera sílaba («Es», un golpe corto en el f61,0) y medía la segunda («te», en el 64). La prueba limpia es renderizar la voz SOLA por el motor
  (`HAY_MUSICA = false` en `audio-017.ts` y `npx remotion render … --codec=wav`, 80 s) y cruzarla con el WAV de la toma: retardo 0,0 ms, ataque intacto, todas las líneas a ±0,5 f. Un ajuste «a ojo»
  de 61 a 63 habría empeorado la línea; se revirtió.
- **Una costura que llevaba cuatro revisiones sin verse: el congelado.** Al listar los mayores saltos de luma entre fotogramas del render había uno que no era un corte: en el f1339, −5 niveles.
  El último fotograma del CTA (vídeo) y el PNG que lo sostenía diferían 5,1 niveles de luma (≈ 4 %) y de tinte (R×0,977 · G×0,954 · B×0,937) en un solo fotograma; se confirmó con stills a 1080×1920,
  sin códec de por medio. Causa (corregida en la rev. 7: aquí se leyó mal como «`<Img>` y `<OffthreadVideo>` no dan el mismo color»): los fragmentos `cICP`, `cHRM` y `gAMA` que ffmpeg ≥ 8 escribe en el PNG, que Chrome gestiona como color (§13). Arreglo de entonces: el congelado es un MP4 del fotograma (`ct07-cola.mp4`, 45 f): escalón 0,00 y los tres canales ×1,000;
  la puerta lo comprobaba por PSNR (62,9 dB). Un PNG sin esos tres fragmentos también habría valido.
- **Las casillas de una hoja de contactos con `fps=1/1,5` van adelantadas.** El filtro `fps` con una cadencia tan baja elige el último fotograma de una ventana de ±0,75 s, no el de la hora de la etiqueta
  (la casilla «1,5 s» enseñaba el f64). `herramientas/hoja-contactos.py` selecciona por número de fotograma.
- **Lo que se hizo en cada revisión, como herramientas.** Las comprobaciones que se repitieron en las cuatro revisiones quedaron en `herramientas/`: `golpes-render.py` (¿cae el golpe en su corte?),
  `stills-multiples.mjs` (N fotogramas con un bundle), `hoja-contactos.py`, y las tres de antes.

## 11. Revisión 5: «reduce el tamaño de la cursiva 8px», sin mover ninguna otra pieza

«La cursiva» es la itálica de los acentos (Playfair Display, 5 líneas); «8px», px de la composición: 99 → 91. Lo que sirvió:

- **El tamaño del acento es del motor, y el motor es compartido.** `SUB.acento` (2,2 × 45 px) vale para todos los canales y piezas; cambiarlo, o cambiar `luxur.ts`, movería el 016 y cualquier pieza
  futura de Luxur. En vez de eso, un parámetro OPCIONAL (`acentoMenos`, en `resuelveBloque`, en el validador y en `<SubtitulosEditoriales>`) que la pieza declara con sus datos
  (`ACENTO_MENOS_017`). Sin él, el motor da exactamente lo de antes.
- **Se demostró que «sin él, nada cambia»** antes de darlo por bueno, con dos sondas baratas: (1) la geometría de TODOS los bloques de la demo, el 016 y el 017 volcada a JSON antes y después (13 bloques,
  `cmp` idéntico) y con `acentoMenos: 8` (solo las 9 líneas de acento, todas −8 px; 0 líneas de base cambian); (2) cuatro fotogramas de `SubtitulosDemo` antes y después, pixel-idénticos. Y en el 017, ni un
  píxel distinto fuera de la franja del texto. El volcado de geometría es más rápido y más exacto que los stills, y no flaquea con fotos.
- **La puerta lo exige con las mismas palabras del encargo** (sección 7): la constante vale 8, la composición se la pasa al componente, y el motor da 91 donde daba 99 y no toca la base. Probado hacia el lado malo
  (sin la prop, con un 6): cae.
- **La altura de la línea sigue al cuerpo** (`interlinea` × cuerpo): la línea de acento pasa de 95 a 87 px y el bloque encoge 8 px; el borde de arriba no se mueve. Una línea de acento por encima de otras
  (`c02`) sube las de debajo 8 px: se vio en el still, no era un fallo.

## 12. Revisión 6: el logo más pequeño y al 60 %, nada se congela, y una tarjeta oscura con la web

> «El logo debe ser un poco más pequeño y con 40 % de transparencia, y no dejes que el último fotograma se congele: pasa a un fondo oscuro donde pongas la web: `PropiedadesLuxur.com`.»

- **«40 % de transparencia» es 40 % transparente (opacidad 0,6), y se dijo.** Es la lectura de un diseñador; el usuario había dicho «opacidad al 90 %» para los subtítulos y aquí dijo «transparencia». Una constante
  (`LOGO_TRANSPARENCIA`) y la puerta, que lo exige con esas palabras, dejan el cambio a una línea si era la otra.
- **El fundido a negro no puede ser `salidaNegro` del motor.** El motor funde con `interpolate(f, [dur − N, dur])` y el último fotograma de un plano es `dur − 1`: llega a (N−1)/N, no al negro. Al final
  de una pieza da igual; en mitad, al saltar a la tarjeta, queda un escalón (el 17 % de la imagen en el último fotograma). El fundido es de la composición (`FundidoACierre`) y acaba EXACTO en el último fotograma
  de la toma: medido sobre el render, la luma baja linealmente de 107 a 1,1 en 6 fotogramas y la tarjeta entra sin salto (1,1 → 0,5).
- **No hay imagen para fundir DESPUÉS de que ella calle** (la toma acaba 3 f tras su última palabra), así que el fundido de 6 f empieza 4 f antes de que acabe de hablar. Un fundido más largo se come su última palabra y
  uno de 0 es un parpadeo: la puerta lo acota entre 4 y 8 f y a como mucho 6 f antes del final de la voz. Con una toma con cola (≥ 0,3 s) cabría entero después.
- **La música tiene un siguiente golpe.** Al alargar la pieza 24 f, el `cola` de 36 f de la envolvente habría puesto el golpe de «Time» del pulso 48 (f1373) audible bajo la tarjeta. La música ahora acaba en
  `FIN_MUSICA_017` = el golpe − 2 f, el piano se apaga desde que acaba la toma del CTA, y el resto de la tarjeta (0,9 s) es silencio. Medido: el golpe queda a −113 dBFS.
- **La tarjeta es un plano más (`foto` de un negro liso), no un hueco.** `lineaDeTiempo` exige planos contiguos hasta la duración, y así el plan cuenta cada segundo. Sobre negro puro (el `negro` de la marca es #000000)
  el PNG y el fundido no se distinguen, así que la lección de la rev. 4 (un PNG etiquetado por ffmpeg sale más oscuro; §13) no se aplica: la tarjeta no lleva fragmentos de color; la puerta mide que es oscura (luma máx. ≤ 24) en vez de suponerlo.
- **Los números del cierre viven en un módulo de datos** (`cierre-017.ts`, sin React) que leen la composición y la puerta, como `ACENTO_MENOS_017`: nada de regex sobre constantes de un `.tsx`, y la geometría
  (el bloque logo + web, centrado en y=940) se calcula una vez. La puerta (sección 2d) mide con las palabras del encargo: 440 px = el 79 % de 560, opacidad 0,6, la web exacta, que cabe (≈ 651 de 842 px útiles), dentro de las
  zonas seguras, y que se lee entera con holgura (logo ≥ 20 f, web ≥ 30 f antes del final). Probado hacia el lado malo con cinco cambios.
- **La regla de la cola cambió de sentido:** de «20-45 f tras la última palabra, para ver el logo» a «45-90 f hasta el final: la tarjeta se lee». El congelado, su MP4 y su receta se quitaron.

## 13. Revisión 7: el color con `colorCorrection()`, y lo que enseñó

> «Perfecto, ahora puedes mejorar la colorización con https://www.remotion.dev/docs/effects/color-correction para que los colores se vean vivos, balanceados y cinematográficos.»

- **El efecto exige subir Remotion, y subirlo cuesta algo medible.** `colorCorrection()` es de la 4.0.509 y el repo estaba en la 4.0.496. Se le preguntó y eligió subir. Cuesta: de 240 fotogramas muestreados (8 por composición,
  contra la 4.0.496), 233 idénticos; los clips que no van a 30 fps (29,97 · 25 · 23,976) pueden dar otro fotograma en Reel009 (4 de 8), Avatar014, Documental010 y Noticia008 (1 de 8 cada una); el 017 y
  las demás piezas a 30 fps no se mueven. Avatar008 salió distinto en una primera tanda y no en la segunda (cuatro renders seguidos dan lo mismo que la 4.0.496): con clips que no van a 30 fps, un fotograma no se da por repetible entre sesiones.
  El cambio del motor de esta revisión (`PistaMetraje`) no movió nada: 239 de 240 fotogramas idénticos a los de la 4.0.509 sin él (el distinto es ese de Avatar008, que ni usa el montaje).
- **`vibrance` es MUY fuerte, y salió mal a la primera.** La primera graduación (c1) apoyó la viveza en `vibrance`: sobre el hormigón gris pintó un moteado de colores (ruido de croma amplificado) y las nubes se volvieron rosas.
  Bajó a 0-0,04 y la viveza pasó a `saturation` (c2-c5). Un fotograma a mitad de cada plano no lo habría visto en el cielo; se vio al ampliar al 100 % una pared de hormigón. La puerta lo tumba (`vibrance` ≤ 0,05).
- **Se midió antes de mirar.** Una base común y un ajuste por toma, cinco iteraciones (c1-c5), cada una con dos fotogramas por plano al 25 % y al 75 %; el criterio fue numérico: la dispersión de luma entre planos (σ),
  la saturación media, lo quemado (≥ 250 en algún canal) y lo aplastado (≤ 8) por plano, el salto de luma en los empalmes y el tono de la piel. Resultado en `01-plan.md` (rev. 7) y reproducible con
  `herramientas/medir-color.py`. Un paso de `exposure` son ≈ 44 niveles de luma; los ajustes del 017 van de −0,28 a +0,25.
- **`<Video>` y `<OffthreadVideo>` escogen el mismo fotograma, pero no pintan igual.** Con el efecto, el plano pasa a `<Video>` de `@remotion/media`: 0 de 1.338 fotogramas desalineados contra el render de la rev. 6 (correlación ≥ 0,975;
  `herramientas/alinea-renders.py`, que da 1.172 de 1.338 desalineados con una copia adelantada UN fotograma a propósito, así que mide) y, con `velocidad: 0.5`, r = 0,9999 en 60 de 60. Pero `<Video>` sale ≈ 2 niveles más claro y un pelo menos saturado
  en el mismo fotograma: por eso todos los planos de vídeo llevan `color` (la puerta lo exige), y las dos mitades de RC08 llevan el mismo. Y si el navegador no pudiera decodificar un clip, `<Video>` caería en silencio a `<OffthreadVideo>`,
  que no lleva el efecto: el plano saldría sin graduar. `disallowFallbackToOffthreadVideo` hace que el render falle.
- **La prueba a `--scale=0.5` mentía, y la pista fue el peso del archivo.** El MP4 nuevo pesaba el doble (64,7 MB frente a 31,4) y la energía de alta frecuencia (σ del Laplaciano) era de ×1,4 a ×2,0 la de la rev. 6, con el ruido temporal
  del plano fijo de Isabella duplicado. Se aisló en tres variantes del plan (sin `color`, con `color: {}` —solo el camino— y graduado) renderizadas a escala 1 y a media escala: a **escala 1**, `color: {}` da ×1,00 en nitidez y
  en ruido (la graduación suma ×1,02-1,05, que es el contraste); a **media escala**, `color: {}` ya da ×1,46. La causa: `<Video>` entrega el fotograma a tamaño de la fuente (1296×2304), y Chrome lo reduce a 540×960 sin filtrar (aliasing);
  `<OffthreadVideo>` llega ya reducido por el compositor. La prueba se renderiza a escala 1 (`--crf=10`) y se reduce con ffmpeg (`scale=540:960:flags=lanczos`, `-crf 18`): 30,0 MB, y el audio, bit a bit el de la rev. 6.
- **El escalón del PNG de la rev. 4 tenía otra causa, y ya está probada.** Se atribuyó a «caminos de decodificación distintos» entre `<Img>` y `<OffthreadVideo>`. Era el PNG: ffmpeg 8.1.2 escribe en él `cICP` (`01 01 00 01`: BT.709),
  `cHRM` y `gAMA` (0,45455), y Chrome lo gestiona como color. Un fotograma de CT07 extraído con ffmpeg y renderizado con `<Img>` dio R 146,6 · G 118,3 · B 93,4 (luma 122,5) frente a R 152,2 · G 125,3 · B 101,3 (luma 129,3) en el archivo; el mismo PNG
  con esos tres fragmentos quitados salió **idéntico al píxel** (máx. |Δ| = 0,0; el etiquetado, hasta 13). Para un congelado, un PNG sin fragmentos de color vale tanto como un MP4; para una foto de cliente guardada por ffmpeg, también.
  (La tarjeta del cierre no los lleva: `IHDR`, `pHYs`, `IEND`.)
- **Un script de pruebas rompió el plan, y se vio por casualidad.** `variante.sh` (renderizar una variante del plan con sus `color:` quitados) restauraba el archivo con una ruta RELATIVA desde dentro de `remotion/`: la restauración falló, las
  nueve variantes salieron «sin color» (idénticas, y de ahí se notó) y la copia de seguridad se sobrescribía en cada pasada. Las once líneas se recuperaron porque estaban en la sesión. Lo que queda: rutas absolutas, una copia propia por pasada
  (`mktemp`), `trap` que restaure desde cualquier carpeta, y abortar si la variante no cambia nada (`cmp`). Quien toque un archivo de datos con un script lo restaura con una prueba de que quedó igual.
- **La puerta, probada hacia el lado malo con ocho cambios** (todos tumban con su mensaje y el plan se restaura): `vibrance` 0,2, una clave mal escrita (`exposicion`), c09 con otro color que c08, un plano sin `color`, Isabella con
  `saturation` 1,15, `color` en la foto, `exposure` 0,5 y `saturation` −1. La clave mal escrita no da error ni en el Studio ni en el render: se queda sin hacer nada; solo la puerta la caza.
- **Los empalmes, juzgados.** c03→c04: −28,8 → −17,8 niveles de luma; c09→c10: −6,4 → −19,4 (el dron se oscurece al proteger su cielo y el patio sube). Es un corte entre dos sitios distintos sobre un golpe de música; a ojo, en los pares
  de fotogramas, no se lee como un salto de color (`pruebas-720p/color-cortes.png`). El empalme de la toma continua de RC08: −0,3 → −0,2.
- **La final, medida (2026-10-03, tras el OK del usuario).** `--color-space=bt709 --image-format=png --gl=angle` funciona con el efecto: color medio a ≤ 1,2 niveles del still del mismo fotograma en los 12 medidos, PSNR de baja frecuencia
  43,7-50,8 dB y PSNR bruto medio 41,85 dB. **El PSNR bruto engaña con la textura:** el f30 (dron sobre un dosel de hojas) da 35,3 dB y una pared lisa 41,5, con el mismo color; mi primer umbral (38 dB) lo marcó como fallo. Se comprobó que no había desfase
  (el mejor encaje es el mismo fotograma, 35,3 dB, y el vecino da 22) y que a baja frecuencia (×8) da 43,7: `medir-final.py` decide por el color medio y esa medida y deja el bruto como dato, con alarma solo por debajo de 30 dB. **Las etiquetas:** el master
  salió con VUI `2/2/1` y sin `colr` (R22), y se arregló sin pérdida en las dos capas (píxeles y audio idénticos, `framemd5` decodificado); al re-exportar en la rev. 8, el MISMO comando dio `colr` 1/1/1 con el mismo VUI `2/2/1`: las etiquetas de un master no se suponen, se miran. Lo que sigue abierto: el usuario no ha dicho si quiere esta graduación en TODOS los recorridos (la skill la propone por defecto).

## 14. Revisión 8: «unidad», no «línea» — un pendiente marcado en un comentario llegó a la final

> «Al final el texto debería ser: `Necesitas saber si esta unidad en específico funciona para ti`.»

- **Una palabra con confianza 0,06 se montó, y se exportó.** La transcripción automática oía «línea» (y, en otro corte, «noidad»: la pista de que era «unidad»); el plan la dejó escrita con un «POR CONFIRMAR AL OÍDO» en un comentario de
  `subtitulos-017.ts`, en `voz/cta.txt`, en `combinaciones.md` §5 y en el catálogo, y la pieza se exportó con «línea» sin que ninguna puerta lo notara. Lo que falló no fue la transcripción, que dijo que dudaba, sino que el
  pendiente vivía solo en prosa. Ahora la puerta (`revisar-017.mjs`, sección 11, y la plantilla) busca esos marcadores en los planos y en los guiones de voz: **avisa** durante el montaje y **falla con `--final`**, que es lo que se
  pasa antes de exportar (`recorrido-luxur/montaje.md` §12). Probada hacia el lado malo en los dos modos.
- **Una palabra dudosa se pregunta, no se elige.** «Línea» era plausible (en la jerga de torres colombianas es la columna de apartamentos del edificio) y esa plausibilidad fue lo que la dejó pasar. En el catálogo era la ÚNICA palabra dudosa de las
  tres tomas con voz del 017; con una frase de la presentadora a cámara y un oyente disponible, preguntar costaba una línea.
- **El texto vive en tres sitios que la puerta no compara:** `subtitulos-017.ts` (lo que se pinta y el `.srt`), `voz/cta.txt` (el guion marcado de donde salió) y `dice` de `c11-cta` en `metraje-017.ts` (solo para leer el plan). Se cambiaron
  los tres. Una línea más ancha («unidad» tiene una letra más) se mira en el fotograma y en el validador: 642 de 842 px útiles, sin encoger.
- **Un cambio de un solo texto mueve 249 fotogramas del MP4, y solo uno se ve.** Al re-exportar, 1.150 de 1.399 fotogramas son idénticos bit a bit a los de la versión anterior y los 249 distintos (f1145-f1393) son el arrastre de x264
  (anticipación y control de tasa) tras un cambio de contenido; el cambio visible es la 2.ª línea del CTA en f1179-f1257, y fuera de la franja del texto el PSNR entre las dos finales es de ≥ 42 dB. Para probar «solo cambió esto»:
  `framemd5` decodificado de las dos y, en los fotogramas que difieren, la diferencia dentro y fuera de la franja.
- **Las etiquetas de un master no se suponen:** esta exportación salió con `colr` 1/1/1 y VUI `2/2/1`; la anterior, sin `colr` y con el mismo VUI, con el mismo comando. El arreglo de R22 (las dos capas a la vez) vale para los dos casos.
- **La prueba de 540×960 ya no necesita otro render:** se deriva de la final (`-vf scale=540:960:flags=lanczos,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv`, etiquetas BT.709 en las dos capas, 25,2 MB); el
  render a escala 1 sin graduar reducido de la rev. 7 se conserva en `…-rev7.mp4`.

## 15. «Renderiza en buena calidad»: la final a CRF 12, y por qué más CRF no es lo que limita

> «Renderiza en buena calidad.»

- **Lectura declarada.** La final ya era 1080×1920 a escala 1, fotogramas en PNG, BT.709, CRF 16 `slow` y audio a 320k (R22: lo que la skill llama «el final»); no había calidad de geometría ni de color que subir. Se leyó como **calidad del codificador** y se renderizó con `--crf=12 --x264-preset=slower`: 198,3 MB frente a 109,3
  (33,7 Mb/s de vídeo frente a 18,4) y +2,2 dB de PSNR medio contra el still (44,02 frente a 41,85; a baja frecuencia, 52,97 frente a 50,80). Si «buena calidad» era otra cosa (un formato de edición como ProRes, una versión más ligera para subir, o más resolución —la fuente llega a 1296 px de ancho, así que 4K no añadiría detalle—),
  es otro render y lo dice el usuario.
- **Dos archivos y un criterio:** `finales/017-recorrido.mp4` es el de CRF 12 y `finales/017-recorrido-crf16.mp4`, el de antes (109 MB, por si pesa demasiado para subirlo). Las dos con el MISMO arreglo de etiquetas (R22) y el mismo audio bit a bit.
- **El techo no era el CRF.** Con el still pasado a 4:2:0 BT.709 y vuelto a RGB, SIN compresión, el peor fotograma (f30, el dron sobre el dosel de hojas) da 43,8 dB y el CRF 12 llega a 36,7 (CRF 16: 35,3): queda margen en la codificación. En cambio, con los niveles de un cielo estirados ×10, el still
  (sin ningún códec de salida) ya enseña el mismo bloqueo que las dos finales: viene de los clips de partida (el original y `normalizar.mjs`, que re-codifica a CRF 17 a 1296 px). Si algún día hay que subir la calidad de verdad, empieza por la normalización (CRF 10-12), no por la final (no se ha probado cuánto ganaría: sería otra normalización de los once clips y otra ronda de medidas).
- **«Nada roto» se prueba comparando las dos versiones fotograma a fotograma** (`ffmpeg -lavfi psnr=stats_file`): los 1.399 a ≥ 39,4 dB (medio 45,8). Un fotograma repetido o desfasado en una de las dos daría ≈ 20 dB.
- **Un master a 34 Mb/s es un master, no el archivo que se sube:** las plataformas lo recomprimen, y 198 MB sube más lento. Los dos están hechos.

## Entregables

| Archivo | Qué es |
|---|---|
| `pruebas-720p/017-recorrido-720p.mp4` | la prueba, **revisión 8** (540×960, 30 fps, 46,6 s, AAC; derivada de la final con ffmpeg, §14); las anteriores, en `…-rev1.mp4` … `…-rev7.mp4` |
| `pruebas-720p/017.srt` | los 17 cues de lo que dice Isabella (captions de plataforma), de la revisión 8 (el cue 13 dice «unidad») |
| `pruebas-720p/hoja.png` | la hoja de contactos de la prueba (un fotograma cada 1,5 s, con su hora) |
| `pruebas-720p/stills/` · `stills2/` | los fotogramas de revisión a 1080×1920 |
| `pruebas-720p/color-antes-despues.png` · `color-cortes.png` · `color-recortes-100.png` | el panel antes/después de los once planos, los tres empalmes y las ampliaciones al 100 % (cielo, hormigón, cara) |
| `pruebas-720p/stills7/` · `stills7-antes/` | los fotogramas (540×960, `--gl=angle`) con y sin color que lee `medir-color.py` |
| `combinaciones.md` | el registro de la versión, su música y el tablero de variantes |
| `herramientas/` | `medir-pista.py` · `onsets-voz.py` · `subs-vs-voz.py` · `golpes-render.py` · `hoja-contactos.py` · `stills-multiples.mjs` (con el backend de GL como 5.º argumento) · `medir-color.py` · `antes-despues.py` · `alinea-renders.py` · `medir-final.py` (el color de la final contra stills, R22) |
| `finales/017-recorrido.mp4` · `finales/017-recorrido-crf16.mp4` · `finales/017.srt` | **la final** en dos calidades (2026-10-03; 1080×1920, 30 fps, 46,63 s, H.264 `yuv420p` BT.709 en las dos capas de etiquetas, AAC 320k): el master a CRF 12 `slower` (198,3 MB) y la versión más ligera a CRF 16 `slow` (109,3 MB), y los 17 cues de lo que dice Isabella |
