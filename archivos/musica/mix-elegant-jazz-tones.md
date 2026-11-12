# Mix «elegant jazz tones» — análisis de la música

> Analizado el 2026-11-11 · `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/elegant jazz tones.mp3` (MP3 246 kbps, 48 kHz estéreo, 25 min 45 s, 47,6 MB; sin etiquetas ni capítulos; la lista de 7 pistas la pegó el usuario)
> Tercer mix para los reels de **Casa · El Retiro · Senderos de Compostela** (ver el [catálogo de la propiedad](../material/casa-el-retiro-senderos-de-compostela.md), §11, el [primer mix](mix-the-life-that-god-has-for-me.md) y el [de adagios](mix-the-most-beautiful-12-adagios-rachmaninoff.md)). El audio **no se ha copiado al repo** (público): se queda en el SSD; ver «Decisión pendiente» al final.
> Estado: **medido, sin oír.** Todo lo de aquí sale de decodificar el MP3 entero y medirlo; el género y el sentimiento son inferidos (†). El oído decide.

## 0. Resumen

- **Los últimos 144,5 s del archivo son la pista 1 otra vez.** La correlación cruzada da 0,998 con un desfase exacto de **1400,431 s**, de 1 a 141 s de la pista 1 (8 puntos). La pista 7 no dura 5:42 sino **3:17** (de 20:03 a 23:20); de 1400,43 s hasta el final (1544,91 s) suena otra vez «Midnight Library». Música distinta: **7 pistas, 23:20**, de 2:25 a 4:59 cada una. Nada más se repite: entre ventanas de 12 s de pistas distintas la correlación máxima es 0,25.
- **Los cortes entre pistas no son silencio.** A diferencia del primer mix, no hay huecos de silencio digital entre las pistas; cada cambio es una bajada a −35…−46 dB y un arranque seco (a veces con un fundido de 3-5 s antes). Las marcas de tu lista caen a menos de 2 s de un corte medido en 5 de 6 casos; en la pista 3 el corte queda 4,4 s **antes** de la marca y el cambio armónico fuerte, 4 s **después**; en la pista 6 la marca no coincide con ningún cambio de armonía. Hay además **12 bajadas más a −40 dB dentro de las pistas** (pausas y finales de frase del jazz), así que la señal sola no basta para fijar los límites: uso **las marcas de tu lista** y la tabla de §1 dice qué se midió junto a cada una (±5 s; ver §2).
- **Un silencio digital que tu lista no marca:** de **955,6 a 957,9 s** (15:56-15:58, dentro de la pista 5) hay 2,3 s de silencio exacto, precedido de un fundido de 5 s y seguido de un arranque seco. Es la única huella de «fin de pieza» con silencio del archivo. O la pista 5 trae un parón largo, o entre 957,9 y la marca de la pista 6 (1012 s) hay una pieza de 54 s que la lista no recoge. No lo puedo resolver sin oírlo.
- **Todas parecen instrumentales:** Whisper no transcribe palabras en ninguna y las etiqueta «[MUSIC]» (1, 4, 7), «(soft music)» (2, 3, 6) y «(gentle music)» (5).
- **Graves dominantes:** 65 % a 76 % de la potencia por debajo de 150 Hz (contrabajo †; en el mix de adagios, 27-37 %). Brillo (centroide) de 416 Hz a 654 Hz; energía percusiva de 8 % a 22 %.
- **Swing, sin pulso rígido:** con la vara del repo (`rejilla.py`: ≥ 70 % de los golpes fuertes a ≤ 15 ms de una recta) las siete sacan **18 % a 33 %** (desvío de 55 ms a 108 ms). Los intervalos entre golpes fuertes tienen una mediana de 0,53 s a 0,68 s. El seguidor de pulsos da lecturas a medio o doble tiempo (63 o 125, 59 o 161, 68 o 135…): no cuadres cortes a un BPM; ancla en los golpes medidos.
- **Fuerte y comprimido:** −13,3 a −14,5 LUFS integrados, LRA de 2,9 a 4,9 LU y picos reales de −0,6 a +0,1 dBFS (las pistas 2 y 7 tocan +0,1). El primer mix iba de −13,0 a −15,3 LUFS y los adagios tienen LRA de 8,2 a 11,0. Para dejar la música sola a −15 LUFS hay que **bajar** entre −1,7 y −0,5 dB.
- **Tonalidades:** Sol menor (1, 4), Fa mayor (2), Re menor (3), Mi menor (5, 6) y La menor (7), con confianzas de 0,58 a 0,87; en jazz, con acordes extendidos, el estimador es poco fiable. La única en mayor es la 2.
- **Buenas entradas:** 17 de las 28 ventanas (pista × 30/45/60/80 s) puntúan ★★★ (≥ 0,9), contra casi ninguna en el mix de adagios: tras cada pausa el grupo entra con un golpe de bajo o caja.
- **Aperturas:** la 5 abre a nivel (0,0 s), la 1 y la 7 en 0,5 s, la 2 en 1,0 s; la 4 y la 6 tardan 1,5 s y la 3, **3,0 s** en llegar al nivel.

## 1. Las pistas dentro del archivo

`ini` y `fin` son segundos del **archivo del mix** y salen **de las marcas de tu lista** (la señal no da un corte limpio, ver §0). La columna «Corte medido» es el corte más cercano que encontré (bajada de nivel y arranque seco) y su desfase respecto a la marca: úsala para afinar, pero **escucha el empalme** antes de cortar desde el principio de una pista.

| # | Título | Marca | `ini` (s) | `fin` (s) | Duración | Corte medido cerca de la marca |
|---|---|---|---|---|---|---|
| 1 | Midnight Library | 0:00 | 0,00 (0:00) | 145,00 (2:25) | 2:25 (145,0 s) | — |
| 2 | 404: Memory Not Found | 2:25 | 145,00 (2:25) | 321,00 (5:21) | 2:56 (176,0 s) | **146,9** (+1,9 s): bajada a −46 dB y arranque seco; cambio de croma en 146,5 |
| 3 | Draft Saved At 2:17 AM | 5:21 | 321,00 (5:21) | 532,00 (8:52) | 3:31 (211,0 s) | **316,6** (−4,4 s): bajada a −46 dB y arranque a −10 dB; **el cambio armónico fuerte está en 325,0 (+4,0)** |
| 4 | Four Floors Down | 8:52 | 532,00 (8:52) | 713,00 (11:53) | 3:01 (181,0 s) | **533,7** (+1,7 s): fundido de 5 s hasta −46 dB y arranque seco |
| 5 | A Little Bit of Yesterday | 11:53 | 713,00 (11:53) | 1012,00 (16:52) | 4:59 (299,0 s) | **714,0** (+1,0 s): bajada a −44 dB y arranque; el cambio de croma llega hacia 718-719 |
| 6 | Midnight Gallery | 16:52 | 1012,00 (16:52) | 1203,00 (20:03) | 3:11 (191,0 s) | **1012,0** (0,0 s): bajada a −42 dB, pero **sin cambio armónico** (distancia de croma 0,14): puede ser una pausa y no un cambio de pista |
| 7 | 3:42 AM, Still Creating | 20:03 | 1203,00 (20:03) | 1400,43 (23:20) | 3:17 (197,4 s) | **1204,1** (+1,1 s): bajada a −36 dB; cambio de croma en 1204 (distancia 1,15) |
| 1′ | *Midnight Library (repetida)* | — | 1400,43 (23:20) | 1544,91 (25:44) | 2:24 (144,5 s) | misma música que la pista 1 (+ 1400,431 s); no la uses |

La pista 1 empieza en el frame 0 del archivo. Las bajadas dentro de las pistas (a −40 dB o menos, que no son cortes) están en 122,8, 246,0, 278,3, 559,7, 668,5, 704,6, 745,3, 780,2, 884,5, 924,1, 1168,5 y 1271,3 s, más el silencio digital de 955,6-957,9 s.

## 2. Reglas para usarla

Son las del [catálogo de la biblioteca](../musica/catalogo-musica.md) (§1), con lo propio de este mix:

1. **Decodifica a WAV el mix entero y corta del WAV**, no del MP3 con `-ss`. Los tiempos de §3 son segundos **de la pista contados desde la marca**; para cortar directamente del WAV, suma el `ini` de §1 (tabla §4). Corta de **0 a 1400,43 s**; el tramo final es la pista 1 repetida.
2. **`desde` ya lleva 30 ms de colchón** antes del golpe: `entra: 1` frame y no más, como en el catálogo.
3. **Los límites tienen ±5 s.** Una entrada a mitad de pista (las de 30 s caen entre 1:44 y 2:41) no depende del corte. Las que quedan a menos de 8 s de una marca llevan «junto al corte» y las «0,00 (la marca)» **no sirven a ciegas**: escucha el empalme y recorta al golpe.
4. **Sin letra y sin silencio entre pistas:** no hay colchón de silencio digital. Un corte a mitad de frase se oye; entra donde la banda **vuelve a entrar** tras una pausa, que es lo que miden las ★.
5. **Graves dominantes** (65-76 % por debajo de 150 Hz): con la voz a −15 LUFS conviene mirar la mezcla en un altavoz de móvil; un paso alto suave a ≈ 80-100 Hz solo en el lecho bajo la voz es una opción, **sin oír**.
6. **Viene fuerte y comprimido** (al nivel del primer mix, no al de los adagios): bájalo a −15 LUFS antes de mezclar (−0,5 a −1,7 dB); los picos de las pistas 2 y 7 llegan a +0,1 dBFS.
7. **Una pista, una propiedad:** la pista 1′ del final es la 1, no cuenta como otra.

## 3. Puntos de entrada por pista

Como en el catálogo: **`desde`** en segundos de la pista contados desde su marca (entre paréntesis, `m:ss`); **★** = calidad del golpe (★★★ ≥ 0,9 · ★★ ≥ 0,75 · ★ menos); **⚠** = la pista tarda más de 1 s en llegar a su nivel (apertura suave); **pico +N s** = segundos desde el inicio del vídeo hasta el clímax de esa ventana. Candidatos: el inicio de la pista y los saltos ≥ 8 dB pegados a un cambio de sección (±0,5 s); puntúa 40 % golpe y 60 % desarrollo, con el clímax hacia el 75 % del vídeo.

| Pista | Desde la marca | Vídeo de 30 s | Vídeo de 45 s | Vídeo de 60 s | Vídeo de 80 s |
|---|---|---|---|---|---|
| 1. Midnight Library | ✅ llega al nivel en 0,5 s (revisar el empalme) | **104,42** (1:44) ★★★ · pico +22 s | **61,55** (1:01) ★★★ · pico +41 s | **61,55** (1:01) ★★★ · pico +41 s | **61,55** (1:01) ★★★ · pico +65 s |
| 2. 404: Memory Not Found | ✅ llega al nivel en 1,0 s (revisar el empalme) | **108,68** (1:48) ★★★ · pico +23 s | **108,68** (1:48) ★★★ · pico +35 s | **98,64** (1:38) ★ · pico +45 s | **0,00** (0:00) ★ (la marca) · pico +50 s |
| 3. Draft Saved At 2:17 AM | ⚠ tarda 3,0 s en llegar al nivel | **160,66** (2:40) ★★ · pico +28 s | **156,59** (2:36) ★★★ · pico +32 s | **82,60** (1:22) ★★★ · pico +43 s | **3,65** (0:03) ★★★ (junto al corte, ±5 s) · pico +57 s |
| 4. Four Floors Down | ⚠ tarda 1,5 s en llegar al nivel | **140,65** (2:20) ★★★ · pico +25 s | **2,43** (0:02) ★ (junto al corte, ±5 s) · pico +41 s | **0,00** (0:00) ★ ⚠ (la marca) · pico +44 s | **0,00** (0:00) ★ ⚠ (la marca) · pico +44 s |
| 5. A Little Bit of Yesterday | ✅ llega al nivel en 0,0 s (revisar el empalme) | **152,76** (2:32) ★★ · pico +25 s | **233,91** (3:53) ★★ · pico +40 s | **122,70** (2:02) ★★★ · pico +55 s | **122,70** (2:02) ★★★ · pico +55 s |
| 6. Midnight Gallery | ⚠ tarda 1,5 s en llegar al nivel | **124,08** (2:04) ★★ · pico +27 s | **116,50** (1:56) ★ · pico +34 s | **103,66** (1:43) ★★★ · pico +47 s | **103,66** (1:43) ★★★ · pico +47 s |
| 7. 3:42 AM, Still Creating | ✅ llega al nivel en 0,5 s (revisar el empalme) | **158,76** (2:38) ★★★ · pico +23 s | **115,90** (1:55) ★★★ · pico +34 s | **41,29** (0:41) ★★★ · pico +41 s | **110,33** (1:50) ★★ · pico +71 s |

Con vídeos de 30 s las entradas caen en la segunda mitad de la pista (1:44 a 2:41); las de 45 y 60 s se reparten entre 0:41 y 3:53.

## 4. Dónde cortar en el archivo del mix

Los mismos `desde` de §3 sumados al `ini` (la marca) de cada pista, para cortar directamente del WAV del mix (segundos del archivo).

| Pista | 30 s | 45 s | 60 s | 80 s |
|---|---|---|---|---|
| 1. Midnight Library | 104,42 (1:44) | 61,55 (1:01) | 61,55 (1:01) | 61,55 (1:01) |
| 2. 404: Memory Not Found | 253,68 (4:13) | 253,68 (4:13) | 243,64 (4:03) | 145,00 (2:25) |
| 3. Draft Saved At 2:17 AM | 481,66 (8:01) | 477,59 (7:57) | 403,60 (6:43) | 324,65 (5:24) |
| 4. Four Floors Down | 672,65 (11:12) | 534,43 (8:54) | 532,00 (8:52) | 532,00 (8:52) |
| 5. A Little Bit of Yesterday | 865,76 (14:25) | 946,91 (15:46) | 835,70 (13:55) | 835,70 (13:55) |
| 6. Midnight Gallery | 1136,08 (18:56) | 1128,50 (18:48) | 1115,66 (18:35) | 1115,66 (18:35) |
| 7. 3:42 AM, Still Creating | 1361,76 (22:41) | 1318,90 (21:58) | 1244,29 (20:44) | 1313,33 (21:53) |

## 5. Medido: sonoridad, ritmo y arco de energía

- **LUFS** = sonoridad integrada de la pista (ebur128); **LRA** = rango de sonoridad; **pico** = pico real; **→ −15** = ganancia para dejar la música sola a −15 LUFS (el nivel de la voz de Isabella en el canal).
- **Tempo**: lectura del seguidor de pulsos y sus candidatos (a medio o doble tiempo en swing). **Golpes a ≤ 15 ms** = el % de `rejilla.py` sobre 20-110 s. No doy «arranque» ni «final»: las pistas están empalmadas y las pausas del swing falsean esos niveles (la apertura de cada una está en §3).
- **Clímax**: máximo de la curva de volumen suavizada a 4 s (se ignora la intro, los primeros 15 s o el 8 %, y los 3 últimos s); entre paréntesis, el tramo a menos de 1,5 dB del máximo.

| # | Dur. | LUFS | LRA | Pico | → −15 | Tempo (candidatos) | Golpes a ≤ 15 ms | Notas/s | Clímax | Secciones (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2:25 | −13,9 | 4,9 | −0,5 | −1,1 dB | ≈ 63 (63/65/61) | 24 % (desvío 65 ms) | 2,4 | **2:06** (0:42–2:09) · 2.º 1:42 (−0,2 dB) | 62, 84, 105, 132, 137 |
| 2 | 2:56 | −14,2 | 4,1 | 0,1 | −0,8 dB | ≈ 164 (59/161/57) | 29 % (desvío 55 ms) | 2,1 | **2:24** (0:50–2:36) | 99, 102, 105, 109, 133, 138 |
| 3 | 3:31 | −13,5 | 4,2 | −0,4 | −1,5 dB | ≈ 142 (141/139/145) | 24 % (desvío 90 ms) | 3,6 | **3:09** (2:25–3:26) · 2.º 2:41 (−0,1 dB) | 4, 79, 83, 100, 120, 157, 161, 208 |
| 4 | 3:01 | −13,3 | 4,6 | −0,5 | −1,7 dB | ≈ 68 (135/67/133) | 25 % (desvío 108 ms) | 3,7 | **2:45** (1:21–2:56) · 2.º 1:22 (−0,7 dB) | 3, 134, 141, 159, 162, 168, 172 |
| 5 | 4:59 | −14,5 | 4,8 | −0,2 | −0,5 dB | ≈ 154 (157/159/147) | 25 % (desvío 61 ms) | 1,8 | **2:58** (0:59–4:52) · 2.º 2:30 (−0,7 dB) | 5, 123, 153, 167, 234, 243, 252, 262, 273, 279, 284 |
| 6 | 3:11 | −14,2 | 4,4 | −0,6 | −0,8 dB | ≈ 123 (127/117/121) | 18 % (desvío 84 ms) | 2,7 | **2:31** (2:30–3:07) · 2.º 3:06 (−0,5 dB) | 104, 116, 124, 154, 157, 175, 182 |
| 7 | 3:17 | −13,6 | 2,9 | 0,1 | −1,4 dB | ≈ 85 (85/83/167) | 33 % (desvío 58 ms) | 3,5 | **3:01** (2:20–3:13) · 2.º 2:29 (−1,0 dB) | 42, 110, 116, 155, 159, 175, 179 |

| # | Tono | Brillo | Graves (< 150 Hz) | Percusivo | Rango de la curva | Arco por bloques de 30 s (dB sobre la mediana) |
|---|---|---|---|---|---|---|
| 1 | Sol menor (0,79) | 435 Hz | 65 % | 17 % | 8,4 dB | 0:00 −2 0:30 −0 1:00 +0 1:30 +0 2:00 −4 |
| 2 | Fa mayor (0,87) | 416 Hz | 73 % | 8 % | 8,7 dB | 0:00 −2 0:30 −0 1:00 −1 1:30 −1 2:00 +1 2:30 +0 |
| 3 | Re menor (0,58) | 610 Hz | 76 % | 10 % | 7,1 dB | 0:00 −3 0:30 −2 1:00 −1 1:30 −0 2:00 −0 2:30 +1 3:00 +1 3:30 −7 |
| 4 | Sol menor (0,70) | 551 Hz | 69 % | 19 % | 8,5 dB | 0:00 −4 0:30 −1 1:00 −1 1:30 +1 2:00 −0 2:30 −2 3:00 −8 |
| 5 | Mi menor (0,68) | 426 Hz | 72 % | 9 % | 10,7 dB | 0:00 −1 0:30 −0 1:00 −1 1:30 −1 2:00 −1 2:30 +0 3:00 −1 3:30 −1 4:00 −7 4:30 −2 |
| 6 | Mi menor (0,79) | 514 Hz | 73 % | 10 % | 10,7 dB | 0:00 −1 0:30 −2 1:00 −1 1:30 −0 2:00 −0 2:30 −1 3:00 −2 |
| 7 | La menor (0,72) | 654 Hz | 76 % | 22 % | 5,7 dB | 0:00 −2 0:30 −1 1:00 −0 1:30 −0 2:00 +0 2:30 −1 3:00 +0 |

Dinámica casi plana en todas (LRA de 2,9 a 4,9 LU): el «clímax» es de arreglo, no de volumen, y la entrada la decide el brillo y el golpe. La pista 7 es la más plana de todas (LRA 2,9).

## 6. Catálogo: género, sentimiento, BPM y parte más emotiva

Mismo formato que la tabla de la biblioteca. **†** = no identifiqué las piezas ni las escuché: género y sentimiento los inferí de lo medido (modo, brillo, densidad de notas, peso de la percusión, graves y dinámica) y del nombre del mix. Las tonalidades son poco fiables (confianza 0,58 a 0,87).

| Pista · duración · tonalidad | Género † | Sentimiento † | Tempo | Tags | Parte más emotiva |
|---|---|---|---|---|---|
| 1. Midnight Library<br>2:25 · Sol menor (0,79) | Jazz instrumental †, swing con contrabajo en primer plano | nocturno, íntimo, pausado (balada lenta) | ≈ 63 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #abre-a-nivel | **2:06** (0:42–2:09) · 2.º 1:42 (−0,2 dB) |
| 2. 404: Memory Not Found<br>2:56 · Fa mayor (0,87) | Jazz instrumental †, swing con contrabajo en primer plano | cálido y nostálgico; el único en modo mayor | ≈ 164 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #mayor #abre-a-nivel | **2:24** (0:50–2:36) |
| 3. Draft Saved At 2:17 AM<br>3:31 · Re menor (0,58) | Jazz instrumental †, swing con contrabajo en primer plano | ágil e inquieto, de las más densas (3,6 notas/s) | ≈ 142 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #apertura-lenta #más-brillante | **3:09** (2:25–3:26) · 2.º 2:41 (−0,1 dB) |
| 4. Four Floors Down<br>3:01 · Sol menor (0,70) | Jazz instrumental †, swing con contrabajo en primer plano | sobrio y elegante, de paso firme | ≈ 68 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #apertura-lenta | **2:45** (1:21–2:56) · 2.º 1:22 (−0,7 dB) |
| 5. A Little Bit of Yesterday<br>4:59 · Mi menor (0,68) | Jazz instrumental †, swing con contrabajo en primer plano | melancólico y aireado (el menos denso, 1,8 notas/s) | ≈ 154 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #abre-a-nivel | **2:58** (0:59–4:52) · 2.º 2:30 (−0,7 dB) |
| 6. Midnight Gallery<br>3:11 · Mi menor (0,79) | Jazz instrumental †, swing con contrabajo en primer plano | sereno, de galería, constante | ≈ 123 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #apertura-lenta | **2:31** (2:30–3:07) · 2.º 3:06 (−0,5 dB) |
| 7. 3:42 AM, Still Creating<br>3:17 · La menor (0,72) | Jazz instrumental †, swing con contrabajo en primer plano | pulsante y nocturno, groove constante (el más plano y percusivo) | ≈ 85 (o doble/medio) | #jazz† #instrumental #swing #bajo-dominante #menor #abre-a-nivel #dinámica-plana #más-brillante | **3:01** (2:20–3:13) · 2.º 2:29 (−1,0 dB) |

## 7. Qué está medido y qué está interpretado

- **Medido sobre el audio** (ffmpeg, librosa, scipy y `proyectos/054/herramientas/rejilla.py`): la repetición de la pista 1 al final, las bajadas de nivel y los cambios de armonía junto a cada marca, duración, sonoridad, BPM, tonalidad, secciones, clímax, puntos de entrada y la falta de pulso.
- **Interpretado:** género, instrumentos (el contrabajo es una inferencia de los graves), sentimiento y tags (†), y la propuesta de qué pista va con qué guion.
- **No comprobado:** el oído. Un golpe medido como fuerte puede no sonar bien como primera nota, y los límites de las pistas pueden estar a unos segundos de la marca. **Escucha el primer segundo de cada entrada** antes de darla por buena.
- **Límites del método:** el jazz tiene pausas que parecen cortes y acordes que confunden al estimador de tono; por eso los límites son los de tu lista y no los de la señal.

## 8. Decisión pendiente

El MP3 (47,6 MB) sigue **solo en el SSD**. Las 43 pistas de la biblioteca se versionan en este repo porque lo decidió el dueño, aunque es público y no hay licencia verificada. Aquí **no lo he hecho**. Si se quiere versionar, bastaría el tramo de 0 a 1400,43 s (unos 43 MB a 246 kbps): el resto es la pista 1 repetida. Mientras tanto, cada reel copia desde el SSD la pista elegida a `proyectos/NNN/original/` y se anota su sha256 en `registro-de-uso.md`.

