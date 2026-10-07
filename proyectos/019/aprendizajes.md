# Aprendizajes del 019

Tercera versión del reel del apto 501 de Los Patios: otra canción, otro hook, otra mitad, otro CTA, otro dron y una apertura distinta (la fachada vista desde el suelo en el frame 0 y el dron como primer plano del recorrido), sobre el formato `recorrido-luxur` y lo que dejaron el 017 y el 018 (`proyectos/017/aprendizajes.md`, `proyectos/018/aprendizajes.md`). Lo que se descubrió al montarla, y por qué.

## 1. La canción se ELIGE por lo que tiene que pasar, y se escanea entera

El catálogo de música da un `desde` por duración de vídeo (un golpe de arranque y el clímax hacia el 75 %), pero un reel de Los Patios pide otra cosa: **un golpe en el frame 0 y una caída o resolución justo donde entra el CTA**, para que la voz de Isabella quede a solas sobre un lecho suave. Con 43 pistas y cientos de golpes cada una, mirarlo a mano (como en el 017, «miré ocho candidatas») no escala: `herramientas/buscar-entrada.py` lo hace entero (golpes ≥ 9 dB como entrada, meseta estable σ ≤ 2 dB, la caída sostenida mayor entre los 33 y los 40 s siguientes) y deja candidatos con sus números. Salieron 25 pistas con una caída ≥ 10 dB; de las que son del carácter del reel, se midieron a fondo cuatro y **una encaja** (*Flying Into the Sun*). Las otras fallan de formas que solo se ven en la curva: *Deep Breath* «cae» en una bajada lenta de 7 s (el CTA caería sobre un fundido), *Begin Again* cae a silencio y vuelve 5 s después con un golpe de 20,7 dB (bajo la voz del CTA), *Heaven on Earth* es plana. **Hay que mirar la curva (`medir-pista.py --png`), no solo la cifra de caída**: la misma «caída de 10 dB» es un escalón, un fundido o un hueco con rebote.

Lo que el escáner NO hace es oír. Una caída medida puede ser desagradable bajo una voz, y un golpe fuerte puede ser una nota que no suena bien como primera.

## 2. No toda canción tiene pulso: la rejilla puede ser el LISTADO de golpes

El 018 cortó «Return to Oasis» sobre una recta de 110 BPM (la puerta comprobaba que cada plano cayera a ≤ 1 f de un pulso). *Flying Into the Sun* no la tiene: `herramientas/rejilla.py` (periodos de 0,25 a 1,30 s, una campana de 20 ms por golpe) deja **solo el 27 % de los golpes fuertes a ≤ 15 ms de la mejor recta** (desvío medio de 51 ms); la V2, con el mismo script y como control, 89 % a 10 ms. Ir «a un pulso» habría sido inventar una recta que la canción no tiene. Lo que se hizo: la rejilla son **los golpes MEDIDOS** (`musica/golpes-019.json`, de `medir-pista.py --json`), la tabla `GOLPE` de `metraje-019.ts` lista aquel en que entra cada plano, y la puerta (sección 5) comprueba que cada golpe existe en el JSON (±4 ms y ±0,5 dB), que cada plano entra a ≤ 1 f de donde SUENA y que el corte seco cae en uno de ≥ 7,4 dB (la disolvencia, ≥ 9 dB: acaba en él). Es lo mismo que la recta pero sin suponer lo que la canción no es. Con *frases* (un golpe cada ≈ 2,5 s, no cada 0,5) los cortes se eligen de entre los golpes y las duraciones salen de ahí, no al revés; y la distancia entre dos golpes decide qué toma cabe: HK05 pide un hueco de 3,6-4,1 s entre su entrada y la del dron, y solo un par de golpes lo dio.

## 3. Cuando la canción CAE justo donde habla Isabella, el ducking tiene que SEGUIR la caída

En el 018 la caída fue un escalón de 12 LU a un piano, y bastó una rampa fija (−4,4 dB) bajo el CTA. Aquí la caída es de ≈ 20 dB en 4 s y su primera palabra suena en el mismo frame en que empieza: con −16 dB fijos el lecho quedaría inaudible y con menos la meseta taparía la primera palabra. La envolvente de la música bajo el CTA **sigue la sonoridad momentánea de la canción** (`CAIDA_LUFS` en `audio-019.ts`, medida con ebur128 cada 6 f, con el frame del CENTRO de la ventana de 400 ms) y en cada punto deja la música a −31 LUFS (10 LU bajo la voz) o a su nivel «solo» si ya es más bajo. La puerta lo comprueba frame a frame: en toda la ventana de voz del CTA la música queda ≥ 9 LU bajo ella (medido: −30,9 como mucho, −31,5 como poco) y sin perderse. **Y se midió el resultado, no el diseño:** −20,9 LUFS con voz y lecho en el render, objetivo −21.

## 4. Un hook que entra a CORTE: la rampa de la música va DESPUÉS del golpe

HK05 empieza a hablar a los 0,26 s (7,8 f), sin los 12 f de aire que pide una disolvencia: Isabella entra a corte en un golpe de la canción y su voz, 3 f después (el desclic). Con la bajada de 12 f ANTES de la primera palabra del 018, el golpe del corte (f92) quedaría a −12 dB y no se oiría. La música baja en los 3 f **entre el golpe y la primera palabra** (92 → 95): se midió en el render (la energía sube 5 dB en f92,2 y baja en los 3 f siguientes) y la voz nace con la música ya abajo. Y al salir, la cola de HK05 (0,63 s) no da para una disolvencia (14 f de margen más 12): sale a corte en el golpe del dron, con la música ya subida (la rampa de subida acaba en ese frame). Regla práctica: **mira el aire de la toma antes de decidir la transición**; la disolvencia es una convención del formato, no una obligación.

## 5. El detector de golpes miente sobre una rampa (otra vez, en otra forma)

`golpes-render.py` dio el corte del f703 a −4,7 f: parecía un golpe desfasado. No lo era: el detector busca la mayor subida en ±0,2 s y **retrocede mientras la energía siga subiendo**, y justo ahí la música sube su ganancia (la rampa del ducking, interpolada en amplitud: +3,9 dB en el primer frame). Mirada la energía fotograma a fotograma (`herramientas/energia-render.py`: 6 ms de ventana, cada 5 ms) el golpe del 703 suena en f702,9, con un salto de +6 dB sobre la rampa. Es la tercera variante del mismo aviso (en el 018: el corte del 29, donde entra la voz; el del 39, una disolvencia): **una medida automática de «cuándo sube» solo vale donde nada más sube a la vez**; donde hay voz o una rampa, se mira la traza.

## 6. Tres palabras dudosas y dos maneras de medirlas

El método del 018 (`formantes.py`: ¿qué vocal suena?) cubre una vocal pegada a otra. Aquí hubo tres casos distintos y se midieron distinto:

- **«¿Y si…?» (HK05).** Whisper da la «y» con confianza 0,50 y un instante antes de que haya voz. **`palabras-desde.py` sobre cortes de la toma**: desde 0,20-0,30 s oye «y si pudieras vivir en» y desde 0,34, «si pudieras…»; y la energía da tres arranques seguidos (0,255 · 0,355 · 0,480 s) = «y · si · pu-». Cerrada.
- **«y (la) ventilación» (MD08).** Whisper omite un artículo corto. Prueba: ¿hay una /a/ entre la «y» y el «ven-»? Las /a/ de esa misma toma (la de «altura») miden F1 ≈ 790 Hz; el hueco da F1 ≤ 540 y ningún onset nuevo. **No hay «la».** Cuidado con los primeros fotogramas de una vocal tras una pausa: la ventana de 30 ms mezcla silencio y voz y el LPC da un F2 ≈ 600 (un polo nasal falso); se miran los fotogramas con la energía ya estable.
- **«escríbeme» / «escribe a mí» (CT05).** La misma prueba: tras la [e] de «-be» viene directamente un murmullo nasal de ≈ 130 ms (F1 ≈ 430, F2 ≈ 700 Hz) y se acaba; una «escribe a mí» tendría una /a/ (F1 ≈ 790) antes de la nasal. Y whisper, cortando desde 2,45 s, oye UNA palabra: «escríbeme».

Las tres están dichas en `voz/*.txt` y en la cabecera de `subtitulos-019.ts`; las dos que no son de whisper-contra-el-oído (MD08, CT05) llevan «POR CONFIRMAR AL OÍDO» y la puerta `--final` falla hasta que se oigan. **Una medida no es un oído**, y se dice con el segundo exacto del vídeo (21,1 s y 36,6-37,2 s).

## 7. Las líneas del DTW de whisper se fueron hasta 9 f

De las 13 líneas, **diez** se movieron respecto de la tabla de `trozos-editoriales.mjs` (1-9 f): «sin sentir que vives» salía en f132 y su palabra suena en f143; «lo que estás buscando,» en f1059 cuando su «lo» suena entre f1053 y f1057; «permite que», 4 f tarde. Con el método del 018 (`onsets-voz.py` para el arranque de la sílaba y `palabras-desde.py` para saber QUÉ palabra empieza ahí) las 13 quedaron entre 0,7 y 2,5 f antes de su palabra. En esta pieza hubo tres palabras que **no empiezan en un onset limpio** y se dijeron en `lineas-vs-onsets.py`: «la luz» (la /l/ pegada a «que»: la palabra empieza entre 2,14 y 2,20 s), «a la vivienda.» (pegada al «-sen» de «ingresen», sin onset) y «lo que estás buscando,» («lo» sigue a «con» sin pausa; los onsets 1,030 y 1,155 lo flanquean).

## 8. La ventana de RC25 que «mejor abre» no es la que ya salió dos veces

El clip tiene dos mitades: el contrapicado extremo (0-2,5 s: lo que usaron la V1 y la V2) y la cámara que baja al camino y avanza entre las palmas (3-7 s). El encargo pedía «la ventana que mejor abra y declara lo que comparte». Se tomó **3,0-6,07 s**: (1) **avanza** (el formato pide «la cámara siempre avanza» del primer plano; el contrapicado es casi un plano fijo), (2) comparte ≈ 0,1 s con la V1 y nada con la V2 (la otra habría compartido ≈ 2,7 y ≈ 1,9 s) y (3) sigue siendo «la fachada vista desde el suelo». La lectura está declarada en `artefactos/01-plan.md` con la salida si era la otra (`fr(0)`). **La puerta tiene ahora una sección 9b que compara con TODAS las versiones anteriores** (antes solo con la V1): una V4 que copie esta puerta lo verá contra la V1, la V2 y la V3 si añade su ruta a `VERSIONES`.

## 9. El dron en el bloque 3 cambia lo que la puerta exige

«Hoy exige el dron en el frame 0 y solo»: se sustituyó por (a) la fachada RC25 como primer plano (frame 0, sola, a corte, sin voz) y UNA vez, y (b) UN dron como PRIMER plano del bloque 3 y después del hook. Los `reason` lo dicen (el dron es «la prueba», la respuesta visual a la pregunta del hook, no la promesa). El dron como puente exterior → terraza funciona porque se corta a un plano que ya está en la terraza (el patio a ras de suelo); y RC09 acaba entre hojas, una cortinilla natural hacia Isabella.

## 10. Una toma continua partida en dos planos: el empalme invisible y el color

RC09 y RC16 se parten en el golpe sin saltar un fotograma (`desde` de la segunda mitad = `desde` + `dur` de la primera en frames). Las dos mitades llevan **el mismo `color`** (`COLOR_PATIO`, `COLOR_RC16`) y la diferencia de luma entre sus dos fotogramas del empalme es la de dos vecinos (−0,9 y +0,1, contra +20 de los cortes entre sitios). Así los dos golpes más fuertes (428 y 875) caen a mitad de un movimiento y se oyen sin que se vea corte. Otras dos cosas del color: con la base de Luxur (+0,03 de temperatura), la piel del hook se movió 4,4° de tono (el fondo es verde y el balance lo calienta): −0,01 la dejó a 0,5°; y la madera del techo (R/G 1,26) satura de más con la base: −0,02 de temperatura y luces −0,42.

## 11. Un checkout compartido y un protocolo que dice una cosa y un encargo otra

Mientras se montaba, apareció en el árbol de trabajo un archivo nuevo (`archivos/musica/registro-de-uso.md`, el registro de uso con un protocolo de reservas entre ramas) y, minutos después, un commit en la misma rama que no era de esta sesión (`d33aae1`): hay **otra sesión trabajando en el mismo checkout**, y el PR #10 se fusionó (15:11 UTC) cuando el encargo lo daba por abierto. Lo que se hizo: (a) no cambiar de rama en un árbol compartido; (b) **reservar en el registro enseguida** (HK05, MD08, CT05, DR152 y la canción, tachados con V3) para que otra sesión los viera; (c) **no commitear ni subir nada**, porque el encargo lo prohibía y el protocolo del registro pide lo contrario (reservar con un commit y un `git push`): la contradicción se dice en la entrega, no se resuelve en silencio. Lo reservado está en el archivo, sin publicar; si otra sesión reservó lo mismo antes (no había ninguna rama `origin/feat/reel-*` al comprobarlo), hay que renumerar.

## 12. La legibilidad, medida otra vez, y por qué el p99 engaña

`herramientas/legibilidad.py` deja por fin escrito el método del 018 §3 (la franja del texto sin los píxeles de texto, el blanco al 90 % contra el percentil 90 y 99 del fondo). Resultado: **3,2-4,3 : 1** al p90 (V1 2,9-3,7; V2 2,8-4,1) y **2,1-3,0 : 1** al p99 (V1 2,6-3,0; V2 2,3-3,5). El peor (2,06) es el CTA: el texto está sobre los pantalones negros de Isabella, pero la franja incluye un muro de bloques de vidrio claro al lado y el borde de su blusa. Se probó medir solo el fondo dentro de la caja del texto y la medida se volvió peor y menos comparable (los píxeles de la blusa quedaban dentro): se dejó el método tal cual para que la comparación con la V1 y la V2 sea la misma, y se dice. A ojo se lee en los seis fotogramas.

## Pendiente

- **El OK del usuario a la prueba** y **oír** las dos palabras (MD08 ≈ 21,1 s, CT05 ≈ 36,6-37,2 s) y la canción entera: todo lo de la música está medido, nada oído.
- **Licencia de la música**; **el canal del CTA** (DM o WhatsApp).
- **Publicar la reserva** del registro (commit + push) cuando el usuario lo pida, y renumerar si otra sesión reservó lo mismo.
