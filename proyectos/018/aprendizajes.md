# Aprendizajes del 018

Segunda versión del reel del apto 501 de Los Patios: otra canción, otro hook, otra mitad y otro CTA sobre el formato `recorrido-luxur` y las reglas que dejó el 017 (`proyectos/017/aprendizajes.md`). Lo que se descubrió al montarla, y por qué.

## 1. La rejilla del pulso no basta: un corte seco sobre un pulso SIN golpe

«Return to Oasis» es un arpegio a 110 BPM con pulso constante, así que la rejilla es una recta y la puerta (sección 5) comprueba que cada plano cae a ≤ 1 f de un pulso. Pasaba todo en verde, y aun así **el corte del pulso 62 no caía sobre nada**: la canción subdivide en cuatro los tres pulsos que hay entre dos golpes fuertes (176,276 y 177,914 s: los golpes intermedios están a 0,41 s, fuera de la recta). Se vio al medir el audio del RENDER (`herramientas/golpes-render.py`, uno por corte): el detector encontró otro golpe a 3,4 f del corte y ninguno en él. Se movió el corte al pulso 61 (un golpe de 11,8 dB), con dos efectos buenos: la vista (el plano más largo del bloque) pasa de 98 a 114 f y el último fotograma del cielo (el marco claro de la ventana) deja de ser el oscuro que había, y el salto de luma del corte baja de +40,7 a +23,3.

→ **Con una canción de pulso constante no basta con que el corte caiga en el pulso: hay que mirar si el pulso suena.** Se comprueba cada corte SECO (las disolvencias no lo piden) sobre el audio del render, y los de 7,5-11,8 dB son los buenos. Dos medidas no sirven: la del pulso 29 (entra la voz de Isabella en el mismo frame y el detector mide su voz, +4,9 f) y la del 39 (una disolvencia, sin golpe). Detalle en `artefactos/03-timeline.md`.

## 2. «El onset más cercano» NO es la palabra de la línea

Para comprobar los subtítulos sobre la voz sola se escribió primero una herramienta que, de cada línea, buscaba el onset de energía más próximo. Dio una línea 2,5 f tarde que no lo estaba: en «a veces está en | cómo entra» el onset más cercano a «cómo» (4,285 s) es el «en» de la línea anterior, y «cómo» empieza en 4,450 (whisper: desde 4,30 oye «en cómo entra», desde 4,38 «como entra»). Lo que identifica una palabra no es la energía sino `palabras-desde.py` (qué palabra es la primera que oye whisper desde ese instante). Por eso `herramientas/lineas-vs-onsets.py` toma el segundo en que empieza cada palabra como DATO escrito a mano y comprobado, y mide solo lo que sí se mide: cuántos frames antes entra la línea (0-3) y a cuántos ms de un onset de energía cae esa palabra.

Dos palabras no empiezan en un onset limpio y se dejaron dichas en la herramienta y en la cabecera de `subtitulos-018.ts`: **«respirar.»** (una /r/ vibrante sin valle antes, 4,52 s; la vocal sube a los 4,62) y **«a un apartamento»** (la «a»/«en» es una vocal de 0,1 s pegada al «te» de «diferente»: la línea entra con el «un»).

Y **sobre el render el detector engaña**: con la música debajo ve los onsets ≈ 1,5 f más tarde que sobre la voz sola y se pierde los suaves («está en los metros» salió +8,2 f en el render cuando está a +0,5 sobre la voz sola, y «sin onset claro» en la segunda pasada). La medida de referencia es la de la voz sola; el render sirve para ver que nada se movió.

## 3. La legibilidad del texto se mide contra la pieza aprobada

El velo de los subtítulos se reutilizó tal cual (0,62 / 0,34), con el color ya aplicado y planos distintos debajo. Medir «contraste» de un texto blanco sin sombra sobre vídeo no tiene umbral universal; lo que sí se puede hacer es **medir igual la pieza que se aprobó**. Método: en cada fotograma a 1080×1920, la franja del texto (y 1380-1640), los píxeles de texto (luma ≥ 225, dilatados 3 px) se excluyen, y se compara el blanco al 90 % contra el percentil 90 y el 99 del fondo (luminancia relativa sRGB). Resultado: **018 2,8-4,1 : 1** (p99: 2,3-3,5) y **017 aprobada 2,9-3,7 : 1** (2,6-3,0). Misma legibilidad; los trozos del hook, sobre el deck gris claro, son los más justos (2,8-3,2) en las dos.

## 4. El color: la base se hereda, el ajuste por toma NO

La base de Luxur (la del 017) sirve de partida; cada toma necesitó su propio ajuste, en tres iteraciones: el patio en sombra (c03, luma 91) pedía +0,16 de exposición y luces recogidas para no quemar el cielo de la derecha; la fachada del dron quemaba el blanco (1,6 %); los marcos negros del ventanal de c11 aplastaban (5,6 %). Dos subidas de saturación a 1,18 (c08, c10) las tumbó la puerta (tope 1,12): se quedaron en 1,12, que es lo que vale la pena. Resultado y tabla por plano en `artefactos/01-plan.md`. La piel de Isabella, a ±1,0° de tono.

## 5. Repetir metraje entre versiones: nadie lo avisaba

`tramosDisjuntos` solo mira dentro del proyecto. El 018 repite ≈ 3 s de RC07 (el barrido del ventanal con el skyline) que ya estaba en el 017: es el único plano de esa esquina y el rincón donde habla Isabella en el CTA, así que se dejó, pero se vio al final y por revisar el catálogo a mano. **La puerta tiene ahora una sección 9b** que cuenta, por clip, cuánto tramo opaco comparte con la V1 (informa, no falla: repetir es legítimo, no declararlo no). Una V3 que copie esta puerta lo verá contra la V1.

## 6. La prueba, con las banderas de la final

R06/R32 piden la prueba a escala 1 con `--crf=10` y reducida con ffmpeg a `yuvj420p` sin etiquetas. Aquí se renderizó con las MISMAS banderas de color que la final (`--color-space=bt709 --image-format=png`) y se redujo etiquetando BT.709 en las dos capas (`setparams=…` y `-x264-params colorprim=…`): el color que se ve en la prueba es el de la final, y el audio sale bit a bit el del master (md5 del PCM). Cuesta ≈ 5 min en vez de ≈ 2,5 (el PNG intermedio) y un master de 234 MB que se borra después.

## 7. Un script para el «antes» (`herramientas/stills-antes.mjs`)

Medir el color pide la misma tanda sin graduar. Quitar y volver a poner las líneas `color:` a mano o con un `sed` es cómo se pierde una graduación (el 017 lo vivió). `stills-antes.mjs` lee el plan a memoria, lo escribe sin color, renderiza y lo restaura en un `finally` y ante Ctrl+C comprobando byte a byte; aborta si el plan ya venía sin color. Probado: plan idéntico después y fotograma idéntico al de la tanda anterior.

## 8. Revisión 2: cambiar UNA toma arrastra cuatro cosas

> «Cambia la toma después de 0:30 por: Exterior edificio4.MOV» (2026-10-04)

El cambio es un `src` y un `desde`, y aun así tocó: (1) **la receta de normalizado** (`normalizar.mjs`: RC25 con su sha, RC04 fuera; el original de RC25 se copió de `proyectos/017/original/` y se comprobó el sha); (2) **el color**, que es por plano y por material: el plano nuevo es sobre todo cielo y fachada al sol (luma 156, el más claro de la pieza por 28 niveles) y subió la dispersión de luma entre planos de 10,6 a 14,6 hasta que se le bajó la exposición; (3) **los empalmes**, que se miden de nuevo (los dos cortes de la fachada quedaron en +8,9 y −15,0 niveles, los más suaves de la pieza, porque la fachada es clara y lo que la rodea no); y (4) **los nombres**: las claves de los pulsos (`P.bloques`, `P.cielo`, `P.vista`) nombraban el plano ANTERIOR al que entraba en cada pulso y con el cielo fuera ya mentían; se renombraron (`fachada`, `vista`, `cta`) y la puerta, que mide los pulsos, confirmó que ningún frame se movió.

**Un plano de cielo se aplana si se recogen mucho las luces.** La primera graduación (exposición −0,30, luces −0,50, blancos −0,25) bajó la luma a 137 y dejó el cielo lechoso y las nubes sin forma; mirado el panel antes/después el «antes» era mejor. Lo que funcionó fue lo contrario: luces −0,30, blancos −0,10, exposición −0,28 y devolverle fondo con **contraste 1,14 y saturación 1,12** (los topes de la puerta son 1,15 y 1,12): luma 142, el azul con degradado y las nubes con volumen. Mira el panel, no solo los números: la luma baja con las dos y solo una se ve bien.

**Cómo se leyó «después de 0:30».** La toma que entra justo después del 0:30 (la de los 30,6 s), no la que se está viendo EN el 0:30 (los bloques de vidrio, hasta los 30,6 s). Es la misma lectura que se hizo en el 017 («el 0:32» = la toma que entra a los 32,47 s) y se declara en `01-plan.md` con la salida si era la otra. La prueba anterior se guardó como `…-rev1.mp4` antes de renderizar la nueva.

## 9. Una vocal dudosa se cierra MIDIENDO, y la orden de exportar no la borra

> «renderiza el video» (2026-10-04), con la «a»/«en» del CTA señalada dos veces como pendiente.

Había tres caminos malos: exportar con la «a» que se pintaba (una apuesta de gramática, contra lo que oía whisper), bloquear la orden del usuario con otra pregunta sobre algo que ya se le había avisado, o cambiar la palabra «porque suena mejor». El que se tomó: **medir qué vocal suena**. `herramientas/formantes.py` saca F1/F2/F3 por LPC (autocorrelación + Levinson, 10 kHz, orden 12, ventana de 30 ms) de la voz sola, y la comparación útil es contra **vocales conocidas de la misma toma**, porque el espacio vocálico cambia de una voz a otra: las /a/ de Isabella («a-» y «par» de «apartamento») miden F1 ≈ 725-780 Hz y F2 ≈ 1.440-1.600 Hz; la vocal del hueco entre «te» y «un» midió **F1 ≈ 605 y F2 ≈ 2.340-2.390**, igual con tres combinaciones de orden, ventana y frecuencia de muestreo, y le sigue un segmento con energía casi toda por debajo de 500 Hz (como la nasal de «men»). Una /a/ no puede dar esa F2: es una [e], «en». Whisper-small (0,75) coincidía.

Lo que NO se hizo: borrar la nota. **La medida no es un oído**: la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-018.ts` y `voz/cta.txt`, la puerta `--final` sigue fallando por ella (a propósito: así nadie da la final por buena sin que se oiga), y los finales se exportaron por orden del usuario diciéndole, en la misma entrega y con el segundo exacto (38,1 s), qué palabra lleva y cómo cambiarla. Trampa de la medida: el «onset de energía» no sirve aquí (no hay valle) y un segmento nasal puede confundirse con una [u]; lo que decide es la vocal ANTES de la nasal.

## Pendiente

- **La «en» del CTA, medida pero sin oír** (§9): `revisar-018.mjs --final` falla mientras la nota siga; al confirmarla, se quita la nota (o se cambia a «a» y se re-exporta).
- **Licencia de la música**; **el canal del CTA** (DM o WhatsApp).
- ~~El OK del usuario a la prueba~~: dado con «renderiza el video» (2026-10-04); finales exportados.
