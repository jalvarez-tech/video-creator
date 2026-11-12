# Mix «The Most Beautiful 12 Adagios in Rachmaninoff Style» — análisis de la música

> Analizado el 2026-11-11 · `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/The Most Beautiful 12 Adagios in Rachmaninoff Style.mp3` (MP3 320 kbps, 48 kHz estéreo, 64 min 2 s, 154 MB; etiqueta de título «The Most Beautiful 12 Adagios in Rachmaninoff Style  Calm Classical Music for Relaxation», fecha 2026-04-09; sin capítulos ni lista de pistas)
> Segundo mix para los reels de **Casa · El Retiro · Senderos de Compostela** (ver el [catálogo de la propiedad](../material/casa-el-retiro-senderos-de-compostela.md), §11, y el [primer mix](mix-the-life-that-god-has-for-me.md)). El audio **no se ha copiado al repo** (público): se queda en el SSD; ver «Decisión pendiente» al final.
> Estado: **medido, sin oír.** Todo lo de aquí sale de decodificar el MP3 entero y medirlo; el género y el sentimiento son inferidos (†). El oído decide.

## 0. Resumen

- **El archivo es una secuencia de 21 min 20,7 s repetida tres veces.** La correlación cruzada de ventanas de 20 s da 0,998-0,999 con un desfase exacto de **1280,727 s** (copia 2) y de **2561,455 s** (copia 3), en 8 puntos repartidos por todo el ciclo. Solo hay **21 min 21 s de música distinta**: las copias 2 y 3 son la misma grabación, no piezas nuevas. Hay que cortar siempre de la **copia 1** (0 a 1280,73 s). Dentro del ciclo no se repite nada: entre ventanas de 15 s de piezas distintas la correlación máxima es 0,37 (la de una repetición real es 0,999).
- **No son 12 adagios distintos.** El ciclo trae **6 piezas de 3 min 18 s a 3 min 35 s** (suman 20:51) **y un fragmento de 24 s** (la pieza 5). Con las tres copias son 18 piezas y 3 fragmentos, pero 6 y 1 distintos. No sé de dónde sale el «12» del título.
- **Sin títulos.** El MP3 no trae lista de pistas ni capítulos, así que las piezas se llaman **Pieza 1 a 7** por orden de aparición (la 5 es el fragmento). Si pegas la lista de la descripción del vídeo, les pongo nombre.
- **Todas parecen instrumentales y de piano:** Whisper no transcribe palabras en ninguna y las etiqueta «soft piano music» (1, 2, 3 y 5), «[MUSIC]» (4 y 7) y «soft music» (6); solo 1-2 % de la energía es percusiva (HPSS). La etiqueta de Whisper no prueba el instrumento (†).
- **Sin pulso:** con la vara del repo (`rejilla.py`: ≥ 70 % de los golpes fuertes a ≤ 15 ms de una recta) las seis completas sacan **20-27 %** (la 5, 44 % con solo 9 golpes). Los intervalos entre golpes fuertes van de 0,67 a 1,25 s de mediana, sin patrón: es rubato. El BPM estático que da librosa (63-71) solo dice «adagio»; no sirve para cuadrar cortes a la música.
- **Las seis completas dan Sol menor** (confianza 0,63-0,78); el fragmento, Sol mayor. Es un set muy homogéneo: oscuro (centroide 455-593 Hz) y de color melancólico. No hay ninguna en modo mayor (salvo el fragmento); funcionan por contraste con las del primer mix, que mezcla mayores y menores.
- **Sonoridad pareja:** −14,4 a −15,6 LUFS integrados (la 5, −18,4) y picos reales de −2,2 a −3,0 dBFS (−4,5 el fragmento). Para dejar la música sola a −15 LUFS pide entre +0,6 y −0,6 dB de ganancia en las completas. La dinámica es amplia: LRA de 8,2 a 11,0 LU y un rango de la curva (del 10 % al 95 %) de 11 a 16 dB (el mayor, la 6).
- **Aperturas:** la 2, la 4 y la 5 abren a menos de 6 dB de su nivel medio: sirven desde 0:00. La 1 abre a −10 dB; la 3, la 6 y la 7 abren de 13 a 15 dB por debajo y tardan 1,5 a 4 s en llegar al nivel. **Todas terminan en decaimiento** (−22 a −34 dB en el último segundo): un reel de 30-45 s que entre a mitad de pieza necesita su propio fundido de salida.
- **Menos graves que el primer mix:** 27-37 % de la potencia por debajo de 150 Hz (el otro mix, 75-84 %). La música cae más en la banda de la voz de Isabella: la bajada de ≈ 15 LU mientras habla pesa más aquí.

## 1. Las piezas dentro del archivo

`ini` y `fin` son segundos del **archivo del mix**, copia 1 (medidos sobre el audio decodificado, con 5 ms de resolución y −60 dBFS de umbral; el hueco es el silencio de antes de la pieza). La copia 2 son los mismos tiempos **+ 1280,727 s** y la copia 3, **+ 2561,455 s**; no las uses.

| # | Título | `ini` (s) | `fin` (s) | Duración | Hueco antes |
|---|---|---|---|---|---|
| 1 | Pieza 1 | 0,02 (0:00) | 198,26 (3:18) | 3:18 (198,2 s) | 0,02 s |
| 2 | Pieza 2 | 199,10 (3:19) | 405,79 (6:45) | 3:26 (206,7 s) | 0,84 s |
| 3 | Pieza 3 | 406,42 (6:46) | 620,23 (10:20) | 3:33 (213,8 s) | 0,63 s |
| 4 | Pieza 4 | 620,60 (10:20) | 824,49 (13:44) | 3:23 (203,9 s) | 0,37 s |
| 5 | Pieza 5 (fragmento) | 825,85 (13:45) | 849,56 (14:09) | 0:23 (23,7 s) | 1,36 s |
| 6 | Pieza 6 | 850,64 (14:10) | 1065,48 (17:45) | 3:34 (214,8 s) | 1,08 s |
| 7 | Pieza 7 | 1066,27 (17:46) | 1279,97 (21:19) | 3:33 (213,7 s) | 0,79 s |

Las piezas 1 y 2 las separa un hueco de 0,84 s, la 5 va precedida de 1,36 s y seguida de 1,08 s. El corte más seco es el de la 3 a la 4 (0,37 s): la 3 se apaga hasta −74 dB y la 4 empieza de golpe a −22 dB.

## 2. Reglas para usarla

Son las del [catálogo de la biblioteca](../musica/catalogo-musica.md) (§1), con lo propio de este mix:

1. **Decodifica a WAV el mix entero y corta del WAV de la copia 1**, no del MP3 con `-ss`. Los tiempos de §3 son segundos **de la pieza**; para cortar directamente del WAV, suma el `ini` de §1 (tabla §4).
2. **`desde` ya lleva 30 ms de colchón** antes del ataque: `entra: 1` frame y no más, como en el catálogo.
3. **Sin letra, pero la melodía sí cuenta:** el piano vive en 455-593 Hz de centroide, justo donde está la voz de Isabella. Con la voz a −15 LUFS, la música baja ≈ 15 LU mientras habla y sube con coseno (la bajada acaba **antes** de la primera palabra). Un recorte suave de medios (1-3 kHz) bajo la voz es una opción, **sin oír**.
4. **El «golpe» es una nota, no un bombo:** no hay percusión (1-2 %) ni rejilla. La entrada se ancla en el ataque de una frase; el corte de plano se alinea a esa nota a mano. Las ★ de §3 son más blandas que las del primer mix: ninguna pasa de 0,83, y ★★ ya es un buen arranque.
5. **Cada pieza abre tras 0,37-1,36 s de hueco** (a veces ruido de fondo a −96 dB): si cortas del mix, empieza en el `ini` de §1.
6. **Una pieza, una propiedad:** las copias 2 y 3 son la misma música; no cuentan como piezas nuevas. Hay **6 piezas útiles** más un fragmento de 24 s.

## 3. Puntos de entrada por pieza

Como en el catálogo: **`desde`** en segundos de la pieza (entre paréntesis, `m:ss`); **★** = calidad del ataque (★★★ ≥ 0,9 · ★★ ≥ 0,75 · ★ menos); **⚠** = la pieza abre suave (los primeros 0,5 s a más de 6 dB bajo su nivel medio); **pico +N s** = segundos desde el inicio del vídeo hasta el clímax de esa ventana. Candidatos: el inicio de la pieza y los saltos ≥ 8 dB pegados a un cambio de sección (±0,5 s); puntúa 40 % ataque y 60 % desarrollo, con el clímax hacia el 75 % del vídeo.

| Pieza | Desde 0:00 | Vídeo de 30 s | Vídeo de 45 s | Vídeo de 60 s | Vídeo de 80 s |
|---|---|---|---|---|---|
| Pieza 1 | ✅ sirve (abre a −10,3 dB) | **66,03** (1:06) ★★ · pico +14 s | **66,03** (1:06) ★★ · pico +14 s | **87,67** (1:27) ★ · pico +58 s | **87,67** (1:27) ★ · pico +58 s |
| Pieza 2 | ✅ sirve (abre a −3,1 dB) | — sin ataque claro | **45,94** (0:45) ★★ · pico +44 s | **45,94** (0:45) ★★ · pico +44 s | **45,94** (0:45) ★★ · pico +44 s |
| Pieza 3 | ⚠ abre a −15,1 dB y tarda 1,5 s en llegar | **49,07** (0:49) ★★ · pico +23 s | **91,58** (1:31) ★ · pico +32 s | **0,00** (0:00) ★ ⚠ · pico +43 s | **61,62** (1:01) ★★ · pico +62 s |
| Pieza 4 | ✅ sirve (abre a −5,3 dB) | **157,01** (2:37) ★ · pico +22 s | **47,05** (0:47) ★ · pico +34 s | **47,23** (0:47) ★★ · pico +34 s | **0,00** (0:00) ★ · pico +72 s |
| Pieza 5 (fragmento) | ✅ abre a −0,5 dB | — (dura 24 s) | — | — | — |
| Pieza 6 | ⚠ abre a −12,9 dB y tarda 4,0 s en llegar | **126,63** (2:06) ★★ · pico +22 s | **0,00** (0:00) ★ ⚠ · pico +45 s | **0,00** (0:00) ★ ⚠ · pico +46 s | **30,10** (0:30) ★★ · pico +73 s |
| Pieza 7 | ⚠ abre a −15,1 dB y tarda 2,0 s en llegar | **142,19** (2:22) ★ · pico +25 s | **142,19** (2:22) ★ · pico +25 s | **0,00** (0:00) ★ ⚠ · pico +30 s | **0,00** (0:00) ★ ⚠ · pico +68 s |

Con vídeos de 30 s varias entradas caen en la segunda mitad de la pieza (2:00-2:50). Las entradas «0,00 ⚠» de 60 y 80 s son la apertura suave de la pieza (3, 6 y 7): sirven si el reel empieza con la imagen y la música entra sola.

## 4. Dónde cortar en el archivo del mix (copia 1)

Los mismos `desde` de §3 sumados al `ini` de cada pieza, para cortar directamente del WAV del mix (segundos del archivo).

| Pieza | 0:00 | 30 s | 45 s | 60 s | 80 s |
|---|---|---|---|---|---|
| Pieza 1 | 0,02 (0:00) | 66,05 (1:06) | 66,05 (1:06) | 87,69 (1:27) | 87,69 (1:27) |
| Pieza 2 | 199,10 (3:19) | — | 245,04 (4:05) | 245,04 (4:05) | 245,04 (4:05) |
| Pieza 3 | 406,42 (6:46) | 455,49 (7:35) | 498,00 (8:18) | 406,42 (6:46) | 468,04 (7:48) |
| Pieza 4 | 620,60 (10:20) | 777,61 (12:57) | 667,65 (11:07) | 667,83 (11:07) | 620,60 (10:20) |
| Pieza 5 (fragmento) | 825,85 (13:45) | — | — | — | — |
| Pieza 6 | 850,64 (14:10) | 977,27 (16:17) | 850,64 (14:10) | 850,64 (14:10) | 880,74 (14:40) |
| Pieza 7 | 1066,27 (17:46) | 1208,46 (20:08) | 1208,46 (20:08) | 1066,27 (17:46) | 1066,27 (17:46) |

## 5. Medido: sonoridad, ritmo y arco de energía

- **LUFS** = sonoridad integrada de la pieza (ebur128); **LRA** = rango de sonoridad; **pico** = pico real; **→ −15** = ganancia para dejar la música sola a −15 LUFS (el nivel de la voz de Isabella en el canal).
- **Tempo est.** = tempo estático de librosa (no fiable en rubato). **Golpes a ≤ 15 ms** = el % de `rejilla.py` sobre 20-110 s (2-22 s en la pieza 5); **notas/s** = ataques detectados por segundo. **Arranque** = nivel de los primeros 0,5 s respecto al nivel medio; **Final** = el del último segundo.
- **Clímax**: máximo de la curva de volumen suavizada a 4 s (se ignora la intro, los primeros 15 s o el 8 %, y los 3 últimos s); entre paréntesis, el tramo a menos de 1,5 dB del máximo.

| # | Dur. | LUFS | LRA | Pico | → −15 | Tempo est. | Golpes a ≤ 15 ms | Notas/s | Arranque | Final | Clímax | Secciones (s) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 3:18 | −14,4 | 9,1 | −3,0 | −0,6 dB | ≈ 63 | 20 % (desvío 50 ms) | 2,3 | −10,3 dB | −28 dB | **2:26** (2:22–3:10) · 2.º 2:49 (−0,7 dB) | 53, 66, 87, 140, 179, 187, 194 |
| 2 | 3:26 | −15,4 | 9,8 | −2,8 | 0,4 dB | ≈ 65 | 27 % (desvío 53 ms) | 1,9 | −3,1 dB | −23 dB | **1:29** (0:57–3:05) · 2.º 2:34 (−0,6 dB) | 46, 51, 90, 106, 115, 168, 178, 202 |
| 3 | 3:33 | −14,8 | 8,2 | −2,6 | −0,2 dB | ≈ 70 | 24 % (desvío 57 ms) | 2,0 | −15,1 dB | −33 dB | **2:03** (1:24–3:09) · 2.º 1:25 (−0,8 dB) | 25, 49, 61, 92, 117, 135, 165, 168 |
| 4 | 3:23 | −15,6 | 8,5 | −2,2 | 0,6 dB | ≈ 69 | 23 % (desvío 51 ms) | 2,3 | −5,3 dB | −22 dB | **1:21** (1:21–2:59) · 2.º 1:45 (−0,9 dB) | 47, 51, 148, 157, 163, 169, 190 |
| 5 | 0:23 | −18,4 | 12,5 | −4,5 | 3,4 dB | ≈ 98 | 44 % (desvío 32 ms) | 1,9 | −0,5 dB | −19 dB | **0:15** (0:15–0:17) · 2.º 0:15 (0,0 dB) | — |
| 6 | 3:34 | −14,6 | 11,0 | −2,4 | −0,4 dB | ≈ 65 | 25 % (desvío 52 ms) | 2,0 | −12,9 dB | −34 dB | **1:43** (1:17–2:30) · 2.º 2:29 (−0,3 dB) | 30, 126, 131, 148, 167, 183, 191, 201 |
| 7 | 3:33 | −15,5 | 8,6 | −2,9 | 0,5 dB | ≈ 71 | 20 % (desvío 52 ms) | 1,8 | −15,1 dB | −34 dB | **2:20** (2:18–2:23) | 30, 122, 142, 149, 162, 185, 201, 206 |

| # | Tono | Brillo | Graves (< 150 Hz) | Percusivo | Rango de la curva | Arco por bloques de 30 s (dB sobre la mediana) |
|---|---|---|---|---|---|---|
| 1 | Sol menor (0,63) | 461 Hz | 36 % | 1 % | 12,9 dB | 0:00 −2 0:30 −2 1:00 −1 1:30 +0 2:00 +1 2:30 +1 3:00 −4 |
| 2 | Sol menor (0,78) | 474 Hz | 27 % | 2 % | 12,8 dB | 0:00 −0 0:30 −1 1:00 +0 1:30 −3 2:00 +1 2:30 −2 3:00 −2 |
| 3 | Sol menor (0,75) | 593 Hz | 27 % | 2 % | 11,3 dB | 0:00 −3 0:30 −1 1:00 +1 1:30 −1 2:00 +1 2:30 −1 3:00 +2 3:30 −5 |
| 4 | Sol menor (0,72) | 503 Hz | 27 % | 1 % | 11,6 dB | 0:00 −1 0:30 −0 1:00 +1 1:30 +1 2:00 −1 2:30 −2 3:00 −3 |
| 5 | Sol mayor (0,73) | 439 Hz | 34 % | 1 % | 13,9 dB | — |
| 6 | Sol menor (0,72) | 455 Hz | 38 % | 1 % | 15,6 dB | 0:00 −4 0:30 +1 1:00 +2 1:30 +3 2:00 −1 2:30 −5 3:00 −4 3:30 −13 |
| 7 | Sol menor (0,78) | 543 Hz | 33 % | 1 % | 11,4 dB | 0:00 −1 0:30 −1 1:00 +1 1:30 −0 2:00 +1 2:30 +1 3:00 −3 3:30 −23 |

Lo que se lee: casi **todo el arco está entre ±5 dB** de la mediana por bloques de 30 s (las subidas están dentro de los bloques, en 2-5 s); solo la 6 y la 7 caen al final (−13 y −23 dB en el último bloque de 30 s, con el cierre largo). El «clímax» de una pieza así es de arreglo: la entrada la decide la frase, no el volumen.

## 6. Catálogo: género, sentimiento, BPM y parte más emotiva

Mismo formato que la tabla de la biblioteca. **†** = no identifiqué las piezas ni las escuché: género y sentimiento los inferí de lo medido (modo, brillo, ausencia de percusión, dinámica) y del título del vídeo. Que sea «en estilo Rachmaninoff» **no** quiere decir que sea música de Rachmaninoff: lo más probable es que sean piezas nuevas en ese estilo (†, sin verificar). Las tonalidades son poco fiables (confianza 0,63 a 0,78).

| Pieza · duración · tonalidad | Género † | Sentimiento † | Tempo | Tags | Parte más emotiva |
|---|---|---|---|---|---|
| Pieza 1<br>3:18 · Sol menor (0,63) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | melancólico, de menos a más (clímax tardío) | adagio, rubato (≈ 63 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #apertura-suave | **2:26** (2:22–3:10) · 2.º 2:49 (−0,7 dB) |
| Pieza 2<br>3:26 · Sol menor (0,78) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | íntimo y dulce, con una subida pronta | adagio, rubato (≈ 65 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #abre-a-nivel | **1:29** (0:57–3:05) · 2.º 2:34 (−0,6 dB) |
| Pieza 3<br>3:33 · Sol menor (0,75) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | contemplativo, algo más abierto (la más brillante) | adagio, rubato (≈ 70 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #apertura-suave #más-brillante | **2:03** (1:24–3:09) · 2.º 1:25 (−0,8 dB) |
| Pieza 4<br>3:23 · Sol menor (0,72) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | sereno, estable, sobrio | adagio, rubato (≈ 69 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #abre-a-nivel | **1:21** (1:21–2:59) · 2.º 1:45 (−0,9 dB) |
| Pieza 5 (fragmento)<br>0:23 · Sol mayor (0,73) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | breve, de menos a más, resuelve en mayor | adagio, rubato (≈ 98 est.) | #instrumental #piano† #adagio #sin-pulso #sol-mayor #abre-a-nivel | **0:15** (0:15–0:17) · 2.º 0:15 (0,0 dB) |
| Pieza 6<br>3:34 · Sol menor (0,72) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | dramático, de menos a más, con cierre largo | adagio, rubato (≈ 65 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #apertura-suave #gran-dinámica | **1:43** (1:17–2:30) · 2.º 2:29 (−0,3 dB) |
| Pieza 7<br>3:33 · Sol menor (0,78) | Clásica contemporánea para piano †, adagio sin percusión, estilo neorromántico | solemne, pausado, con cierre muy largo | adagio, rubato (≈ 71 est.) | #instrumental #piano† #adagio #sin-pulso #sol-menor #apertura-suave #más-brillante | **2:20** (2:18–2:23) |

## 7. Qué está medido y qué está interpretado

- **Medido sobre el audio** (ffmpeg, librosa, scipy y `proyectos/054/herramientas/rejilla.py`): la repetición de 1280,727 s, los límites de cada pieza, duración, sonoridad, tonalidad, secciones, clímax, puntos de entrada y la falta de pulso.
- **Interpretado:** género, instrumento, sentimiento y tags (†), y la propuesta de qué pieza va con qué guion.
- **No comprobado:** el oído. Un ataque medido como fuerte puede no sonar bien como primera nota. **Escucha el primer segundo de cada entrada** antes de darla por buena.
- **Límites de la herramienta:** el tempo es el **estático** de librosa. No usé el seguidor de pulsos (`beat_track`) porque se cayó con un segfault en numba; después vi que la causa más probable eran cachés de numba corruptos por mis ejecuciones en paralelo (borrarlos y fijar `NUMBA_CACHE_DIR` lo arregló) y **no comprobé** si el seguidor funcionaba con el caché limpio. Con rubato no habría sido fiable de todos modos. Solo afecta a quien repita el análisis.

## 8. Decisión pendiente

El MP3 (154 MB) sigue **solo en el SSD**. Las 43 pistas de la biblioteca se versionan en este repo porque lo decidió el dueño, aunque es público y no hay licencia verificada. Aquí **no lo he hecho**. Si se quiere versionar, basta con **la copia 1 (1280,73 s, unos 51 MB a 320 kbps)**: las otras dos son la misma música. Mientras tanto, cada reel copia desde el SSD la pieza elegida a `proyectos/NNN/original/` y se anota su sha256 en `registro-de-uso.md`.

