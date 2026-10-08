# 03 · Timeline — proyecto 019

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen los `.ts`
> (`metraje-019.ts` · `audio-019.ts` · `subtitulos-019.ts` · `Recorrido019.tsx`), y
> `node proyectos/019/revisar-019.mjs` comprueba que coinciden con lo que se renderiza.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. **1190 f = 39,67 s.**

## Los golpes de la música (la rejilla: por frases, sin pulso)

«Flying Into the Sun» (Aleksey Chistilin), Do menor. **No tiene un pulso constante**: la mejor recta que ajusta `herramientas/rejilla.py` (periodos de 0,25 a 1,30 s) deja solo el 27 % de sus golpes fuertes a ≤ 15 ms de ella (desvío medio de 51 ms); «Return to Oasis», con el mismo script, el 89 % a 10 ms. La rejilla son los **golpes medidos** (`musica/golpes-019.json`, de `medir-pista.py --json`: subidas de ≥ 6 dB en 15 ms, banda 80-3000 Hz; el instante es el de «empieza a subir») y cada plano entra en uno. La canción entra 28 ms antes de su golpe (`INICIO_MUSICA` = 5342/30 = 178,067 s) y el audio del render llega 42 ms tarde (`RETARDO_AUDIO`), así que un golpe SUENA en el frame `round((golpe + 0,012 − 178,067 + 0,042) · 30)`.

| frame (s) | segundo de la canción | golpe | qué cae ahí | en el render (`golpes-render.py`, audio de la prueba) |
|---|---|---|---|---|
| 0 → suena en f2,2 (0,07 s) | 178,095 | 10,1 dB | el golpe de apertura; la fachada, sin texto ni voz | silencio hasta f2,2 y entra la música: el retardo del audio del render (42 ms) impide que suene en el 0 exacto, como en la V1 y la V2 (f3) |
| 92 (3,07) | 181,083 | 9,0 dB | **Isabella entra a corte** con el hook; su voz, 3 f después (f95) | sube +5 dB en f92,2 y la música baja en los 3 f siguientes (medido con la energía del audio: el golpe suena entero y la voz nace con la música ya abajo) |
| 209 (6,97) | 184,981 | 9,0 dB | **el dron** entra a corte, justo cuando Isabella acaba de hablar | +0,1 f (8,2 dB) |
| 330 (11,00) | 189,016 | 10,8 dB | el patio, a ras de suelo | +0,1 f (10,6 dB) |
| 428 (14,27) | 192,279 | **12,3 dB** | las plantas: la toma de RC09 sigue (empalme invisible); el golpe más fuerte del bloque 3 | 0,0 f (12,6 dB) |
| 571 (19,03) | 197,057 | 10,8 dB | **Isabella** en la terraza, con la mitad (la disolvencia ocupa f559-571 y es opaca en el golpe) | (la voz entra a la vez y la música baja: no se mide) |
| 703 (23,43) | 201,437 | 7,6 dB | acaba la mitad; la cámara cruza la puerta de vidrio a la alcoba | salto de +6 dB en f702,9 sobre la rampa de subida de la música (el detector automático lo da a −4,7 f porque retrocede por esa rampa: se miró la energía fotograma a fotograma) |
| 796 (26,53) | 204,558 | 9,8 dB | Isabella de espaldas junto al muro de bloques | +0,4 f (9,6 dB) |
| **875** (29,17) | 207,188 | 9,3 dB | **la vista** (el plano más largo): la toma de RC16 sigue; el crescendo de la canción va hacia su clímax | +0,3 f (9,6 dB) |
| **1041** (34,70) | 212,712 | 11,1 dB | **la caída ≈ 20 dB en 4 s** a un lecho suave: entra el CTA | la sonoridad momentánea baja de −8,7 a −21 LUFS entre f1040 y f1082 |

Los cortes SECOS (92, 209, 330, 703, 796) caen sobre golpes de 7,6-10,8 dB y se comprobaron sobre el audio del render; los dos «cortes» de una toma continua (428 y 875) son solo musicales; las dos disolvencias (571 y 1041) acaban en un golpe de ≥ 10,8 dB.

## Planos (los once)

`entra: disolver` = 12 f que ACABAN en el `en` (el plano nuevo es opaco justo en el golpe). `desde` va en segundos de la fuente (el clip normalizado conserva los segundos del original: 30 fps constantes).

| # | id | bloque | clip → archivo del SSD (`…/Videos/`) | tramo del clip (s) | `en` (f) | `dur` (f) | golpe | entra | zoom |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-fachada` | 1 | **RC25** → `4 Recorrido/Exterior edificio4.MOV` | 3,00-6,07 | 0 | 92 | apertura | corte | 1,00→1,04 |
| 2 | `c02-hook` | 2 | **HK05** → `1 Hooks/Hook5.MOV` | 0,17-4,07 | 92 | 117 | 9,0 dB | **corte** (sin aire para disolver) | 1,02→1,12 |
| 3 | `c03-dron` | 3 | **DR152** → `3 Dron/DJI_20261001103352_0152_D.MP4` | 14,00-18,03 | 209 | 121 | 9,0 dB | corte | 1,00→1,04 |
| 4 | `c04-patio` | 3 | **RC09** → `4 Recorrido/Patio y Naturaleza 2.MOV` | 4,60-7,87 | 330 | 98 | 10,8 dB | corte | 1,00 |
| 5 | `c05-plantas` | 3 | **RC09** (sigue a `c04`, sin saltar un fotograma) | 7,87-12,63 | 428 | 143 | 12,3 dB | corte (no se ve) | 1,00 |
| 6 | `c06-mitad` | 4 | **MD08** → `2 Mitad/Medio8.MOV` | 0,73-5,13 | 571 | 132 | 10,8 dB | disolver | 1,00→1,04 |
| 7 | `c07-umbral` | 5 | **RC13** → `4 Recorrido/Habitacion Principal 2.MOV` | 2,60-5,70 | 703 | 93 | 7,6 dB | corte | 1,00 |
| 8 | `c08-bloques` | 5 | **RC16** → `4 Recorrido/Recorrido Caminando.MOV` | 20,60-23,23 | 796 | 79 | 9,8 dB | corte | 1,00 |
| 9 | `c09-vista` | 5 | **RC16** (sigue a `c08`, sin saltar un fotograma) | 23,23-28,77 | 875 | 166 | 9,3 dB | corte (no se ve) | 1,00 |
| 10 | `c10-cta` | 6 | **CT05** → `5 Cta/CTA5.MOV` | 0,63-3,60 | 1041 | 89 | 11,1 dB | disolver | 1,00→1,05 |
| 11 | `c11-cierre` | 6 | la tarjeta oscura: `cierre-oscuro.png`, un negro liso (`foto`) | — | 1130 | 60 | — | corte (la imagen ya ha fundido a negro en f1129) | 1,00 |

Hashes (sha256, 8 primeros) de los originales, en `proyectos/019/normalizar.mjs`: HK05 `8c2339ca` · MD08 `0fc82ec7` · CT05 `ef4debbb` · RC25 `3d1aa61c` · RC09 `9f2b2e32` · RC13 `37a2f0fd` · RC16 `938b9b3a` · DR152 `91acff0e` · música `ca1f1cbf`.

Ningún `velocidad` ≠ 1. **Ningún tramo de clip se repite dentro del 019** (RC09 y RC16 aparecen dos veces, pegados: una toma continua partida en el golpe; la puerta, sección 9, lo comprueba). **Un clip también está en el 017: RC25** (0,1 s, ver `01-plan.md`); la sección 9b de la puerta lo informa. Sentido del paseo: **II** (terraza → ventanal), un solo viaje sin volver atrás: el dron (c03) → el patio y la barandilla (c04-c05) → la terraza (c06) → la alcoba (c07) → el muro de bloques y el ventanal de esquina (c08-c09) → el rincón de bloques (c10).

Una nota de empalmes: `c04`→`c05` y `c08`→`c09` son una misma toma, así que sus dos mitades llevan **el mismo color** (`COLOR_PATIO`, `COLOR_RC16`) y la diferencia de luma entre sus dos fotogramas del empalme es la de dos vecinos (−0,9 y +0,1).

## Voz

| Voz | Toma | Dice | Ventana medida (fuente → comp) | LUFS | Ganancia |
|---|---|---|---|---|---|
| hook | HK05 | «¿Y si pudieras vivir en altura sin sentir que vives dentro de una torre?» | 0,26-3,67 s → **f95-f197** (su imagen es opaca desde f92; entra a corte) | −15,0 (tratada; cruda −20,7) | 0,0 dB |
| mitad | MD08 | «La doble altura permite que la luz y ventilación ingresen a la vivienda.» | 0,77-4,83 s → f572-f694 | −15,1 (tratada; cruda −17,9) | +0,1 dB |
| CTA | CT05 | «Si encaja con lo que estás buscando, escríbeme.» | 0,68-3,13 s → f1042-f1116 | −15,2 (tratada; cruda −18,9) | +0,2 dB |

Objetivo: **−15 LUFS** desde la rev. 1 (2026-10-08: «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»; hasta la rev. 0 fue −21, el del 017 y el 018). Suena la voz TRATADA (`<toma>-voz.wav`, `proyectos/019/normalizar.mjs`: highpass 100 Hz · puerta suave · compresor 3:1 desde −26 dBFS · +14 · +13 · +14 dB · limitador a −2,5 dBFS con `latency=1`), que ya mide −15,0 · −15,1 · −15,2 LUFS en su ventana de voz con el pico real en −2,6 · −2,5 · −2,5 dBFS; la ganancia del plan solo las iguala. Las tres voces entran con su imagen (la del hook, con un desclic de 3 f por entrar a corte; las otras dos, con el cruce de 6 f de la disolvencia); ninguna suena antes de que su toma sea opaca (la puerta lo comprueba). Tras «escríbeme» (f1116) quedan **74 f** hasta el final: 14 f de su cara, el fundido a negro de 6 f y la tarjeta (60 f).

## Música: tramo y envolvente

Un tramo, `musica-019.wav`, `desde` 178,067 s, **f0-f1188** (`FIN_MUSICA_019` = el final de la pieza − 2 f). Ganancia (`audio-019.ts`; arriba = 0,531 = −5,5 dB sobre el archivo → **−15 LUFS** con la canción sola; abajo = 0,085 = −16 dB):

```
f0:0   f1:0,531   f92:0,531   f95:0,085   f197:0,085   f209:0,531   f560:0,531   f572:0,085   f694:0,085   f703:0,531   f1030:0,531
f1040:0,077  f1046:0,086  f1052:0,106  f1058:0,140  f1064:0,172  f1070:0,204  f1076:0,248  f1082:0,316  f1088:0,376  f1094:0,412  f1100:0,437  f1106:0,442  f1112:0,495  f1118:0,531
f1130:0,531   f1188:0
```

- **Hook:** el golpe del corte (f92) suena entero y la música baja en los 3 f entre él y la primera palabra (f95): con los 12 f de bajada del 018 el golpe quedaría a −12 dB. Sube en 12 f hasta el golpe del dron (f209).
- **Mitad:** baja los 12 f anteriores a su primera palabra y sube hasta el golpe de la alcoba (f703), a 9 f de su última palabra.
- **CTA:** baja 12 f ANTES de su primera palabra (la meseta aún suena: la caída es en el mismo frame en que entra su imagen) y SIGUE la caída de la canción: en cada punto deja la música a −31 LUFS (10 LU bajo su voz) o a su nivel «solo» si ya es más bajo (`CAIDA_LUFS`, la sonoridad momentánea medida cada 6 f). A partir del f1118 el lecho suena a su nivel (−28 a −34 LUFS) y, desde que acaba la toma (f1130), se apaga en línea recta hasta el f1188. Con la rampa fija del 018 (−4,4 dB sobre un piano) la meseta habría tapado la primera palabra del CTA, porque aquí la caída tarda 4 s y no es un escalón.

## Texto

| Bloque | Posición | Frames | Líneas (entra en f) |
|---|---|---|---|
| `h01` | abajo | 94-141 | «¿Y si pudieras» (94) · «vivir en altura» (111) |
| `h02` | abajo | 141-203 | «sin sentir que vives» (141) · «dentro de una» (168) · **torre?** (185) |
| `m01` | abajo | 571-630 | «La doble altura» (571) · «permite que» (587) · **la luz** (612) |
| `m02` | abajo | 630-699 | «y ventilación ingresen» (630) · «a la vivienda.» (671) |
| `c01` | abajo | 1042-1095 | «Si encaja con» (1042) · «lo que estás buscando,» (1053) |
| `c02` | abajo | 1095-1123 | **escríbeme.** (1095) |

**La cursiva (los 3 acentos) mide 91 px, 8 menos que el cuerpo del motor** (`ACENTO_MENOS_019`); la base, 45 px. **No hay `portada` ni `cuenta`**: la primera toma sale sin texto (el primer subtítulo entra en f94, con Isabella opaca desde el f92). El cierre no es un bloque de texto del plan sino la composición: el logo (`LogoCierre`: 440 px, 60 % de opacidad, f1132-f1142) y la web (`WebCierre`: «PropiedadesLuxur.com», 54 px, f1138-f1148), centrados sobre la tarjeta oscura (f1130-f1190).

Todos los subtítulos de Isabella van abajo, a 90 % de opacidad (el grupo entero). **Los tiempos, medidos de dos maneras.** Sobre la **voz sola** de cada toma (`herramientas/lineas-vs-onsets.py`, con el segundo de cada palabra comprobado a mano con `onsets-voz.py` y `palabras-desde.py`): las 13 líneas entran entre **0,7 y 2,5 f antes** de su palabra (la primera de cada toma, a +0,7 · +1,0 · +1,2 f: no puede entrar antes de que su imagen sea opaca). Sobre el **render** (`subs-vs-voz.py`): mediana +1,1 f, rango [−2,9, +5,0] f, el mismo detector sesgado que en el 018 (con la música debajo ve los onsets ≈ 1,5 f tarde y se pierde los suaves); la referencia es la voz sola. Diez de las trece líneas se movieron respecto de la tabla del DTW de whisper (de 1 a 9 f: «sin sentir que vives» salía en f132 y su palabra suena en f143).

**Legibilidad** (`herramientas/legibilidad.py`, el método del 018 §3: la franja del texto sin los píxeles de texto, el blanco al 90 % contra el percentil 90 y el 99 del fondo, en 6 fotogramas a 1080×1920): **3,2-4,3 : 1** al p90 y **2,1-3,0 : 1** al p99; la V1 aprobada midió 2,9-3,7 y 2,6-3,0, y la V2, 2,8-4,1 y 2,3-3,5. El p99 más bajo (2,06) es el del CTA (f1090): el texto está sobre los pantalones negros de Isabella, pero la franja entera incluye el muro de bloques de vidrio (claro) y el borde de su blusa; a ojo se lee sin dudar (`pruebas-720p/stills-1080/`).

## Puertas de control

- [x] `node proyectos/019/revisar-019.mjs`: todas las secciones en verde (línea de tiempo, estructura, tres sitios, reglas fijas, cierre, color, voz, hook, golpes, ducking, subtítulos, metraje, tramos, encuadre); la sección 9b informa del metraje que comparte (0,1 s de RC25 con la V1); la sección 11 AVISA (las dos notas «por confirmar al oído») y con `--final` falla.
- [x] `npm --prefix remotion run lint`: limpio.
- [x] Frames revisados a 1080×1920 (`pruebas-720p/stills-1080/`): f0 (la fachada limpia), f92 (Isabella entra a corte), f125 y f195 (el hook), f209 (el dron), f330 y f428 (el patio y las plantas), f572-f690 (la mitad), f703 (la alcoba), f796 y f875 (el muro de bloques y la vista), f1000, f1042-f1110 (el CTA), f1124 (el fundido), f1135-f1148 (el logo y la web), f1180 (la tarjeta).
- [x] **Prueba 540×960** (`pruebas-720p/019-recorrido-720p.mp4`, 30 fps, 1190 f = 39,67 s, 23,6 MB), **renderizada a escala 1 con `--gl=angle --color-space=bt709 --image-format=png --crf=10` y reducida con ffmpeg** (R06/R32), con las etiquetas BT.709 en las dos capas (`color_space/transfer/primaries = bt709`, `yuv420p`, rango limitado); el audio es el del render (AAC copiado: md5 del PCM decodificado `2ba8ea6a6a699231dbaf23819a8bc8e1`).
- [x] **La mezcla de la REV. 0 (voz a −21), medida sobre la prueba:** pieza entera **−16,1 LUFS** integrados · pico real **−5,5 dBFS** · LRA 8,5 LU (el 018: −16,0 / −5,5 / 8,1; el 017: −16,4 / −4,6 / 7,8). Voz de Isabella con la música debajo: hook **−20,7** · mitad **−20,3** · CTA **−20,9** (objetivo −21). Música sola: apertura **−18,9** · dron y patio **−16,3** · alcoba → vista **−13,7** (sube con el crescendo de la canción). Tarjeta: −37,6 LUFS (el lecho apagándose).
- [x] **Golpes sobre el audio del render** (`golpes-render.py` y la energía fotograma a fotograma): 209, 330, 428, 796 y 875 a ≤ +0,4 f de su corte; el del 92 suena en f92,2; el del 703, en f702,9 (arriba).
- [x] **Color** (`herramientas/medir-color.py`, 10 planos, `01-plan.md` «El color», `pruebas-720p/medida-color.txt`): saturación media 0,306 → 0,348, σ de luma entre planos 8,6 → 7,5, quemado máx. 0,9 → 0,3 %, aplastado máx. 3,1 → 4,4 %, piel de Isabella a ±0,5° de tono; ampliaciones al 100 % en `pruebas-720p/color-recortes-100.png` y panel en `pruebas-720p/color-antes-despues.png`.
- [x] **OK a la prueba (R06):** «renderiza en buena calidad» (2026-10-04, tras ver la prueba).
- [x] **Finales exportados (R22)** el 2026-10-04 por orden del usuario, **con dos palabras medidas y sin confirmar al oído** (`--final` sin pasar): `proyectos/019/finales/019-recorrido.mp4` (master, `--crf=12 --x264-preset=slower`, 172,6 MB, 34,8 Mb/s con el audio; render de 5 min 43 s) y `019-recorrido-crf16.mp4` (`--crf=16 --x264-preset=slow`, 98,3 MB, 19,8 Mb/s; 2 min 10 s), los dos con `--audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle`: H.264 High L5.0, `yuv420p` rango limitado, 1080×1920, 30 fps, 1190 f (39,67 s), AAC LC 48 kHz estéreo. **Etiquetas:** el master HQ salió con VUI `color_space=bt709` y transfer/primaries sin etiquetar y SIN átomo `colr` (como en la V2); el de CRF 16 ya traía las dos capas en 1/1/1: arreglo sin pérdida en los dos (`-c copy -bsf:v h264_metadata=… -movflags +write_colr+faststart`), con el `framemd5` DECODIFICADO idéntico antes y después, el PCM idéntico, y ahora VUI 1/1/1 y `colr nclx 1/1/1` limitado en los dos. **Color** (`herramientas/medir-final.py`, un fotograma por plano más la tarjeta, contra stills a 1080×1920 con `--gl=angle`): color medio a ≤ 0,41 niveles (HQ) y ≤ 0,67 (CRF 16), PSNR de baja frecuencia 48,5-52,3 dB (HQ) y 46,1-50,0 (CRF 16), PSNR bruto medio **44,42 dB** (HQ; mín. 39,35) y **41,99 dB** (CRF 16; mín. 37,15) —V2: 43,87 y 41,86—. **Audio:** −16,1 LUFS integrados, LRA 8,5, pico real −5,5 dBFS, y el PCM decodificado tiene el MISMO md5 en el master, en el CRF 16 y en la prueba (`2ba8ea6a6a699231dbaf23819a8bc8e1`). Decodificación completa de los dos sin errores. `.srt`: `finales/019.srt` (13 cues, 3,133 → 37,433 s; el 9 es «y ventilación ingresen», el 13 «escríbeme.»). El texto de la pieza y del cierre se miró en el vídeo final (f0, f125, f195, f620, f1090, f1123, f1140, f1148).
- [ ] **Confirmar al oído** dos palabras (ver abajo) en la final YA exportada: «y (la) ventilación» (MD08, ≈ 21,1-21,4 s del vídeo) y «escríbeme» (CT05, ≈ 36,6-37,2 s). Si alguna suena distinto: cambiar el texto y re-exportar (≈ 8 min las dos).

- [x] **REV. 1 de los finales (2026-10-08): la voz a −15 LUFS, sin saturar** («necesito que la voz cuando habla Isabella tenga más decibeles sin saturar», sobre la final ya exportada). La cadena de la V12 y la V9 (`VOZ_TRATADA`, `proyectos/019/normalizar.mjs`) con +14 · +13 · +14 dB por toma, un WAV `<toma>-voz.wav` por voz y `audio` del plan apuntando a él; la ganancia se buscó midiendo la ventana de voz de cada toma después del limitador (barrido de +12 a +18 dB: −15,0 · −15,1 · −15,2 LUFS con el pico real en −2,6 · −2,5 · −2,5 dBFS; con ganancia sola, +5,7 · +2,9 · +3,9 dB habrían dado picos de +1,3 · +2,4 · +0,2 dBTP). El tratado se desfasa 2-4 muestras (0,04-0,08 ms) del crudo, y la cola tras la última palabra sube de −57/−60 a −48/−54 dBFS de RMS (inaudible bajo la música). **La música no se tocó**: `MUSICA_BAJO_LA_VOZ` queda FIJA en −31 LUFS (no `OBJETIVO_LUFS − 10`, que la habría subido 6 dB). **Medido sobre las finales rev. 1** (`019-recorrido.mp4`, CRF 12, 172,6 MB, y `019-recorrido-crf16.mp4`, 98,3 MB; las rev. 0, como `…-rev0.mp4`): voz con la música debajo **−14,9 · −14,8 · −15,1 LUFS** (rev. 0: −20,7 · −20,3 · −20,9; **+5,8 · +5,5 · +5,8 dB**), pieza entera **−15,2 LUFS** (−16,1) con LRA 4,1 LU (8,5) y **pico real −4,7 dBFS** (−5,5), y la música sola, idéntica (−18,9 · −16,3 · −13,7). La voz queda ≈ 16 LU sobre la música que tiene debajo (≈ 10 LU en la rev. 0). **Imagen:** 1189 de los 1190 fotogramas del master son idénticos bit a bit a la rev. 0 y el otro (el f90) difiere 61 dB de PSNR (ruido del codificador); la versión ligera es idéntica por md5. Etiquetas BT.709 arregladas sin pérdida en las dos (otra vez el master HQ salió sin `colr`; `framemd5` y PCM iguales antes y después), decodificación completa sin errores, **PCM idéntico entre el master y la ligera** (md5 `feeb2f510cb01dbc46292112d038d54f`), puerta en verde (sección 3: voz a −15 y pico real ≤ −1 dBTP con su ganancia; `--final` sigue fallando por las dos notas «por confirmar») y lint limpio. Las dos palabras sin oír y los textos no cambian.

## Por confirmar

- **«la luz y (la) ventilación»** (MD08, subtítulo `m02`, ≈ **21,1 s** del vídeo = f632-f641): whisper omite el segundo «la» (el catálogo ya lo anotaba). Medido sobre la voz sola: la «y» es una [i] (F2 ≈ 2.340-2.460 Hz, a 2,85-2,89 s de la toma) y el «ven-» arranca a los 3,05 s tras el cierre de la /b/; entre los dos no hay una /a/ (las de Isabella en esa toma miden F1 ≈ 790 Hz; ahí F1 ≤ 540) ni un onset nuevo. Se pinta **«y ventilación»**. Si suena «y la ventilación»: el texto del 2.º trozo de `m02` en `subtitulos-019.ts`, `voz/mitad.txt` y el `dice` de `c06-mitad`, y el `.srt`.
- **«escríbeme»** (CT05, subtítulo `c02`, ≈ **36,6-37,2 s** = f1097-f1116): whisper oye «escribe a mí» (confianza 0,30 en «es», 0,62 en «a»; el catálogo ya lo anotaba), pero cortando la toma desde 2,45-2,50 s oye UNA palabra, «escríbeme». Medido: tras la [e] de «-be» (2,84-2,92 s) viene directamente un murmullo nasal de ≈ 130 ms (F1 ≈ 430, F2 ≈ 700 Hz) y se acaba: no hay una /a/ entre «be» y la nasal. Se pinta **«escríbeme.»**.
- **«¿Y si…?»** (HK05): cerrada, no queda nada por oír (ver `voz/hook.txt`).
- Mientras las dos notas sigan en `subtitulos-019.ts`, `voz/mitad.txt` y `voz/cta.txt`, `node proyectos/019/revisar-019.mjs --final` falla (a propósito: una medida no es un oído).
