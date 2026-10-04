# 03 · Timeline — proyecto 018

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen los `.ts`
> (`metraje-018.ts` · `audio-018.ts` · `subtitulos-018.ts` · `Recorrido018.tsx`), y
> `node proyectos/018/revisar-018.mjs` comprueba que coinciden con lo que se renderiza.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. **1325 f = 44,17 s.**

## La rejilla de la música

«Return to Oasis» (Aleksey Chistilin), Re# menor, **110 BPM: 0,5454 s por pulso**. Es un arpegio con pulso constante, no frases de 8 pulsos como *Time*: la rejilla es **una recta** (el pulso 0 es el golpe más fuerte de la ventana, en el 143,005 s de la canción), comprobada contra 22 golpes medidos (12 ms de desvío medio, sin deriva). Medido sobre la canción decodificada (banda 80-3000 Hz, subida de 6 ms, `medir-pista.py`); el instante es el de «empieza a subir». La canción entra 38 ms antes de su golpe (`INICIO_MUSICA` = 4289/30 = 142,967 s) y el audio del render llega 42 ms tarde (`RETARDO_AUDIO`), así que el pulso `n` SUENA en el frame `round((golpe(n) + 0,012 − 142,967 + 0,042) · 30)`.

| n | segundo de la canción | frame (s) | qué cae ahí | golpe medido en la canción | en el render (`golpes-render.py`) |
|---|---|---|---|---|---|
| 0 | 143,005 | 3 (0,09) | golpe de entrada; el dron, sin texto | 12,0 dB | (entrada de la música) |
| 4 | 145,187 | 68 (2,27) | **Isabella ya es opaca** (la disolvencia ocupa f56-68); su voz, un frame después | — (sin golpe: la entrada de una voz no lo pide) | — |
| 13 | 150,095 | 215 (7,17) | entra el patio | 9,2 dB | +1,0 f |
| **17** | 152,277 | **281 (9,37)** | **golpe fuerte: el giro del deck** | 10,2 dB | −0,3 f |
| **25** | 156,640 | **412 (13,73)** | **golpe fuerte: el techo de madera y el skyline** | 11,2 dB | +0,3 f |
| 29 | 158,822 | 477 (15,90) | entra Isabella en la terraza; la música baja | 9,1 dB | (la voz entra a la vez: tapa la medida) |
| 39 | 164,276 | 641 (21,37) | acaba la mitad; la cámara cruza de la terraza al interior (disolvencia) | — (sin golpe: es una disolvencia) | +1,8 f (5,5 dB) |
| 45 | 167,548 | 739 (24,63) | el pasillo | 7,5 dB | +0,4 f |
| 50 | 170,275 | 821 (27,37) | los bloques de vidrio | 7,5 dB | +0,3 f |
| 56 | 173,547 | 919 (30,63) | **la fachada vista desde el suelo** (rev. 2; en la rev. 1, el cielo sobre el valle) | 8,2 dB | +0,8 f |
| **61** | 176,274 | **1001 (33,37)** | **golpe fuerte: entra la vista de esquina, el plano más largo** | **11,8 dB** | **−0,2 f** |
| **68** | 180,092 | **1115 (37,17)** | **la caída a un piano suelto: entra Isabella en el balcón** | caída de 12 LU | +1,2 f |

Todos los cortes SECOS caen sobre un golpe medido de la canción (7,5-11,8 dB) y a ≤ 1 f del pulso. **El corte del pulso 62 se movió al 61** al medir el audio del render: el 62 no tiene golpe (la canción subdivide en cuatro los tres pulsos entre dos golpes fuertes: 176,276 y 177,914), y el detector encontraba otro a 3,4 f. Con el 61, además, la vista pasa de 98 a 114 f y el salto de luma del corte baja (con el cielo de la rev. 1: +40,7 → +23,3; con la fachada de la rev. 2, −15,0).

## Planos (los trece)

`entra: disolver` = 12 f que ACABAN en el `en` (el plano nuevo es opaco justo en el golpe). `desde` va en segundos de la fuente (el clip normalizado conserva los segundos del original: 30 fps constantes).

| # | id | bloque | clip → archivo del SSD (`…/Videos/`) | tramo del clip (s) | `en` (f) | `dur` (f) | pulso | entra | zoom |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-dron` | 1 | **DR155** → `3 Dron/DJI_20261001103603_0155_D.MP4` | 4,00-6,27 | 0 | 68 | 0 | corte | 1,00→1,05 |
| 2 | `c02-hook` | 2 | **HK07** → `1 Hooks/Hook7.MOV` | 0,93-5,83 | 68 | 147 | 4 | disolver | 1,02→1,14 |
| 3 | `c03-patio` | 3 | **RC11** → `4 Recorrido/Piscina y Patio.MOV` | 0,40-2,60 | 215 | 66 | 13 | disolver | 1,00 |
| 4 | `c04-giro` | 3 | **RC10** → `4 Recorrido/Patio y Piscina.MOV` | 4,00-8,37 | 281 | 131 | 17 | corte | 1,00 |
| 5 | `c05-techo` | 3 | **RC11** (otro tramo) | 7,00-9,17 | 412 | 65 | 25 | corte | 1,00 |
| 6 | `c06-mitad` | 4 | **MD07** → `2 Mitad/Medio7.MOV` | 0,63-6,10 | 477 | 164 | 29 | disolver | 1,00→1,04 |
| 7 | `c07-umbral` | 5 | **RC06** → `4 Recorrido/Cocina y Comedor.MOV` | 0,40-3,67 | 641 | 98 | 39 | disolver | 1,00 |
| 8 | `c08-pasillo` | 5 | **RC05** → `4 Recorrido/Cocina.MOV` | 3,20-5,93 | 739 | 82 | 45 | corte | 1,00 |
| 9 | `c09-bloques` | 5 | **RC03** → `4 Recorrido/Sala.MOV` | 4,40-7,67 | 821 | 98 | 50 | corte | 1,00 |
| 10 | `c10-fachada` | 5 | **RC25** → `4 Recorrido/Exterior edificio4.MOV` (rev. 2; en la rev. 1, RC04 «Vista ventana y Sala», 0,00-2,73 s) | 0,00-2,73 | 919 | 82 | 56 | corte | 1,00 |
| 11 | `c11-vista` | 5 | **RC07** → `4 Recorrido/Vista  Cocina y Comedor.MOV` | 0,00-3,80 | 1001 | 114 | **61** | corte | 1,00 |
| 12 | `c12-cta` | 6 | **CT01** → `5 Cta/CTA1.MOV` | 0,87-5,87 | 1115 | 150 | **68** | disolver | 1,00→1,048 |
| 13 | `c13-cierre` | 6 | la tarjeta oscura: `cierre-oscuro.png`, un negro liso (`foto`) | — | 1265 | 60 | — | corte (la imagen ya ha fundido a negro en f1264) | 1,00 |

Ningún `velocidad` ≠ 1. Ningún tramo de clip se repite **dentro del 018** (RC11 aparece dos veces, en 0,40-2,60 y en 7,00-9,17 s, sin tocarse; la puerta, sección 9, lo comprueba). **Dos clips también están en el 017**: **RC07** (`c11-vista`; 0,8-4,6 s allí): las dos versiones comparten ≈ 3 s de ese barrido del ventanal, y **RC25** (`c10-fachada`; 1,2-3,1 s allí): ≈ 1,5 s de la fachada. La sección 9b de la puerta los informa.
Sentido del paseo: **II** (terraza → ventanal), un solo viaje sin volver atrás (c03-c05 el patio y el deck → c07-c11 el interior → el ventanal → el balcón).

## Voz

| Voz | Toma | Dice | Ventana medida (fuente → comp) | LUFS | Ganancia |
|---|---|---|---|---|---|
| hook | HK07 | «El verdadero lujo puede ser simplemente tener espacio para respirar.» | 0,95-5,11 s → **f69-f193** (con su imagen, opaca en f68) | −18,7 | −2,3 dB |
| mitad | MD07 | «La respuesta no siempre está en los metros, a veces está en cómo entra el exterior.» | 0,70-5,56 s → f479-f625 | −19,3 | −1,7 dB |
| CTA | CT01 | «Si buscas algo diferente en un apartamento convencional, escríbeme y conoce Los Patios.» (rev. 3; hasta la rev. 2, «a») | 0,95-5,36 s → f1118-f1250 | −22,1 | +1,1 dB |

Objetivo: −21 LUFS (el mismo del 017: las dos versiones suenan igual de fuertes; la ganancia más alta, +1,1 dB, no sube el suelo de ruido de CT01). Las tres voces son iguales: entran con su imagen y cruzan 6 f con ella (`vocesDeCortes`); ninguna suena antes de que su toma sea opaca (la puerta lo comprueba). Tras «Los Patios» (f1250) quedan **75 f** hasta el final: 15 f de su cara, el fundido a negro de 6 f y la tarjeta (60 f).

## Música: tramo y envolvente

Un tramo, `musica-018.wav`, `desde` 142,967 s, **f0-f1323** (`FIN_MUSICA_018` = el final de la pieza − 2 f). Ganancia (`envolventeBajoVoz` para el hook y la mitad, y el ducking propio del CTA):

```
f0:0   f1:0,473   f57:0,473   f69:0,076   f193:0,076   f205:0,473   f467:0,473   f479:0,076   f625:0,076   f637:0,473   f1106:0,473   f1118:0,284   f1265:0,284   f1323:0
```

Arriba (0,473 = −6,5 dB sobre el archivo → **−15 LUFS** con la canción sola), baja 16 dB (0,076) en 12 f ANTES de cada primera palabra del hook y de la mitad y vuelve 12 f después de la última (f57→69 y f193→205; f467→479 y f625→637). **Bajo el CTA** no baja 16 dB: la canción ya cae 12 LU a un piano suelto en el pulso 68 y con la voz encima quedaría a −27 LUFS, 6 LU bajo ella (poco: en el 017 eran 10,5), así que la voz del CTA la baja UN poco más, −4,4 dB (0,284): **−31,4 LUFS, 10,4 LU bajo ella**. Desde el fin de la toma (f1265) el piano se apaga en línea recta hasta el f1323, bajo la tarjeta: a diferencia de *Time*, esta canción NO vuelve a pegar fuerte tras su resolución.

## Texto

| Bloque | Posición | Frames | Líneas (entra en f) |
|---|---|---|---|
| `h01` | abajo | 69-141 | «El verdadero lujo» (69) · «puede ser simplemente» (103) |
| `h02` | abajo | 141-198 | «tener espacio para» (141) · **respirar.** (174) |
| `m01` | abajo | 478-554 | «La respuesta no siempre» (478) · «está en los metros,» (509) |
| `m02` | abajo | 554-627 | «a veces está en» (554) · «cómo entra» (589) · **el exterior.** (601) |
| `c01` | abajo | 1116-1194 | «Si buscas algo diferente» (1116) · «en un apartamento» (1141; rev. 1-2: «a un apartamento», 1146) · «convencional,» (1164) |
| `c02` | abajo | 1197-1258 | **escríbeme** (1197) · «y conoce Los Patios.» (1220) |

**La cursiva (los 3 acentos) mide 91 px, 8 menos que el cuerpo del motor** (`ACENTO_MENOS_018`); la base, 45 px.

**No hay `portada` ni `cuenta`**: la primera toma sale sin texto. El cierre no es un bloque de texto del plan sino la composición: el logo (`LogoCierre`: 440 px, 60 % de opacidad, f1267-f1277) y la web (`WebCierre`: «PropiedadesLuxur.com», 54 px, f1273-f1283), centrados sobre la tarjeta oscura (f1265-f1325).

Todos los subtítulos de Isabella van abajo, a 90 % de opacidad (el grupo entero). **Los tiempos, medidos de dos maneras.** Sobre la **voz sola** de cada toma (`herramientas/lineas-vs-onsets.py`): las 13 líneas que pueden entran entre **1,0 y 2,5 f antes** de su palabra (la primera, «El», a −0,3 f: no puede salir antes de que su imagen sea opaca). Sobre el **render** (`subs-vs-voz.py`): mediana +3,2 f, que es el mismo valor más ≈ 1,5 f de sesgo del detector (con la música debajo ve los onsets algo más tarde y se pierde los suaves: «está en los metros» sale «sin onset claro» y en una pasada anterior dio +8 f estando a +0,5). Ocho líneas tuvieron que moverse 1-3 f tras la primera medida (la tabla de arriba es la de después).

## Puertas de control

- [x] `node proyectos/018/revisar-018.mjs`: todas las secciones en verde (línea de tiempo, estructura, tres sitios, reglas fijas, cierre, color, voz, hook, pulsos, ducking, subtítulos, metraje, tramos, encuadre); la sección 9b informa del metraje que comparte con la V1; la sección 11 AVISA (la nota «por confirmar» de la «en» del CTA) y con `--final` falla.
- [x] `npm --prefix remotion run lint`: limpio.
- [x] Frames revisados: f0 (el dron limpio), 75-190 (el hook), 490-620 (la mitad), 1125-1250 (el CTA) a 1080×1920 (`pruebas-720p/stills-subs/`); el cierre f1250-f1290 (la imagen funde a negro en f1264, la tarjeta, el logo y la web entran); 24 stills antes/después del color (`stills-antes/` y `stills-final/`).
- [x] Prueba 720p de la rev. 1 (`pruebas-720p/018-recorrido-720p-rev1.mp4`, 540×960, 30 fps, 1325 f = 44,17 s, 23,7 MB), **renderizada a escala 1 con `--gl=angle --color-space=bt709 --image-format=png --crf=10` y reducida con ffmpeg** (R06/R32: a `--scale=0.5` el camino con efecto sale aliasado), con las etiquetas BT.709 en las dos capas; el **audio es idéntico bit a bit al del master** (md5 del PCM decodificado `9a2e057f01559d9e3440af785c3689d5` en los dos).
- [x] **La mezcla, medida sobre la prueba:** pieza entera **−16,0 LUFS** integrados · pico real **−5,5 dBFS** · LRA 8,1 LU (el 017: −16,4 / −4,6 / 7,8). Voz de Isabella con la música debajo: hook **−20,9** · mitad **−20,7** · CTA **−20,3** (objetivo −21). Música sola: bloque 3 **−15,3** · bloque 5 **−14,5** · el dron y la entrada −17,3. Tarjeta: −34,7 LUFS (el piano apagándose).
- [x] **Golpes:** los de 215, 281, 412, 739, 821, 919, 1001 y la caída de 1115, a ≤ 1,2 f de su corte sobre el audio del render (`golpes-render.py`); los de 477 y 641 se miden mal (en el 477 entra la voz de Isabella; el 641 es una disolvencia sin golpe).
- [x] **Color** (`herramientas/medir-color.py`, 12 planos, `01-plan.md` «El color»): saturación media 0,269 → 0,313, σ de luma entre planos 16,4 → 12,7 (con la fachada de la rev. 2), quemado máx. 1,6 % → 2,3 %, aplastado máx. 5,6 % → 7,0 % (el marco negro del ventanal), piel de Isabella ±1,0° de tono.
- [x] **Revisión 2 («cambia la toma después de 0:30 por Exterior edificio4.MOV»):** el plano `c10` pasa de RC04 (el cielo sobre el valle) a **RC25** (la fachada desde el suelo, 0,00-2,73 s); `node proyectos/018/revisar-018.mjs` en verde (la sección 9b informa de RC25 y RC07 compartidos con la V1) y `npm --prefix remotion run lint` limpio. La prueba (`pruebas-720p/018-recorrido-720p.mp4`, 23,6 MB; la de la rev. 1, en `…-rev1.mp4`) se renderizó igual que la anterior (escala 1, `--gl=angle`, BT.709, PNG, CRF 10 y reducción etiquetada). **Solo cambió ese plano:** contra la prueba de la rev. 1, los 1.243 fotogramas fuera de f919-f1000 dan PSNR ≥ 42,5 dB (media 96,2: casi todos idénticos bit a bit; ninguno bajo 40 dB) y los 82 de dentro, 11,0-14,8 dB (otra imagen). **El audio es idéntico bit a bit** (md5 del PCM `9a2e057f01559d9e3440af785c3689d5`, el mismo en el master, la prueba rev. 2 y la rev. 1), así que todo lo medido sobre el sonido, los golpes de los cortes (el 919 y el 1001 siguen en los pulsos 56 y 61) y los subtítulos en la rev. 1 vale tal cual. Color del plano nuevo: ver `01-plan.md` («El color» y «Revisión 2»); la fachada y sus dos cortes en `pruebas-720p/color-antes-despues.png` y los cortes f917-f1002 de la prueba.
- [x] **OK a la prueba (R06):** «renderiza el video» (2026-10-04, tras ver la prueba de la rev. 2).
- [x] **Revisión 3 («en» en el CTA):** el subtítulo pasó de «a un apartamento» a «**en** un apartamento» (entra en f1141) porque la vocal de ese hueco, medida (`herramientas/formantes.py`), es una [e] (F1 ≈ 605, F2 ≈ 2.340-2.390 Hz frente a las /a/ de Isabella: F1 ≈ 725-780, F2 ≈ 1.440-1.600); `lineas-vs-onsets.py` en verde (1,0 f), la puerta (sin `--final`) y `npm run lint` en verde, el validador de subtítulos sin avisos (la línea mide 454 de 842 px).
- [x] **Finales exportados (R22)** el 2026-10-04 por orden del usuario, **con la «en» medida y sin confirmar al oído**: `proyectos/018/finales/018-recorrido.mp4` (master, `--crf=12 --x264-preset=slower`, 174,9 MB, 31,6 Mb/s con el audio; render de 3 min 21 s) y `018-recorrido-crf16.mp4` (`--crf=16 --x264-preset=slow`, 96,1 MB, 17,4 Mb/s; 2 min 3 s), los dos con `--audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle`: H.264 High L5.0, `yuv420p` rango limitado, 1080×1920, 30 fps, 1325 f (44,17 s), AAC LC 48 kHz estéreo. **Etiquetas:** el master HQ salió con VUI `color_space=bt709` y transfer/primaries sin etiquetar y SIN átomo `colr`; el de CRF 16 ya traía las dos capas en 1/1/1 (como en el 017, dos renders del mismo comando dan etiquetas distintas): arreglo sin pérdida en los dos (`-c copy -bsf:v h264_metadata=… -movflags +write_colr+faststart`), con el `framemd5` DECODIFICADO idéntico antes y después, el PCM idéntico, y ahora VUI 1/1/1 y `colr nclx 1/1/1` limitado en los dos. **Color** (`herramientas/medir-final.py`, un fotograma por plano más la tarjeta, contra stills a 1080×1920 con `--gl=angle`): color medio a ≤ 0,41 niveles (HQ) y ≤ 0,50 (CRF 16), PSNR de baja frecuencia 48,2-52,9 dB (HQ) y 46,6-51,0 (CRF 16), PSNR bruto medio **43,87 dB** (HQ; mín. 39,38) y **41,86 dB** (CRF 16; mín. 37,25) —en el 017: 44,02 y 41,85—. **Audio:** −16,0 LUFS integrados, LRA 8,1, pico real −5,5 dBFS, y el PCM decodificado tiene el MISMO md5 que el de las pruebas (`9a2e057f01559d9e3440af785c3689d5`). Decodificación completa sin errores. `.srt`: `finales/018.srt` (14 cues, 2,300 → 41,933 s; el 11 es «en un apartamento»). El texto del CTA se miró en el vídeo final (f1140, f1146, f1175, f1230).
- [ ] **Confirmar la «en» del CTA OYÉNDOLA** (hacia los 38,1 s del vídeo): la nota «POR CONFIRMAR AL OÍDO» sigue en `subtitulos-018.ts` y `voz/cta.txt`, y `node proyectos/018/revisar-018.mjs --final` sigue fallando por ella (a propósito). Si suena «a»: texto del trozo (y su frame: 1146 con «a»), `voz/cta.txt`, el `dice` de `c12-cta`, `exportar-srt.mjs` y re-exportar (≈ 6 min).
