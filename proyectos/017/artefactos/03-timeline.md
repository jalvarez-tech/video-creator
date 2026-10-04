# 03 · Timeline — proyecto 017

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen los `.ts`
> (`metraje-017.ts` · `audio-017.ts` · `subtitulos-017.ts` · `Recorrido017.tsx`), y
> `node proyectos/017/revisar-017.mjs` comprueba que coinciden con lo que se renderiza.

**fps de la comp:** 30 → `frame = round(segundo × 30)`. **1399 f = 46,63 s.**

## La rejilla de la música

«Time» (Hans Zimmer), 63 BPM. Frases de 8 pulsos (≈ 7,6 s) que empiezan con un golpe tras un
respiro. Medido sobre la canción decodificada (banda 80-3000 Hz, subida de 6 ms); el instante es
el de «empieza a subir». La canción entra en el compás 8 (175,633 s = 5269/30) y el audio del
render llega 42 ms tarde (`RETARDO_AUDIO`), así que el pulso `n` SUENA en el frame
`round((golpe(n) + 0,012 − 175,633 + 0,042) · 30)`.

| n | segundo de la canción | frame (s) | qué cae ahí | fuerza del golpe |
|---|---|---|---|---|
| 0 | 175,667 | 3 (0,09) | golpe de entrada; arranca la frase de subida (el dron, sin texto) | 6,5 dB |
| 2 | 177,570 | 60 (2,00) | **Isabella ya es opaca** y empieza el hook (la disolvencia ocupa f48-60) | — |
| **8** | **183,272** | **231 (7,70)** | **el golpe grande: entra la fachada vista desde el suelo** | **10,2 dB** |
| 10 | 185,175 | 288 (9,60) | la hoja de la puerta barre el cuadro | — |
| 12 | 187,079 | 345 (11,50) | la sala y su ventanal | — |
| **16** | **190,886** | **459 (15,30)** | **golpe de frase: el barrido del ventanal** | **9,9 dB** |
| 20 | 194,693 | 573 (19,10) | llega Isabella (MD09); la música baja | — |
| 24 | 198,500 | 688 | golpe de frase bajo su voz | 14,9 dB |
| 25 | 199,455 | 716 (23,87) | del interior al follaje | — |
| 29 | 203,274 | 831 (27,70) | el patio | — |
| **32** | **206,138** | **917 (30,56)** | **la frase más fuerte: el espejo de agua y los listones** | **10,9 dB** |
| 34 | 208,040 | 974 (32,47) | entra el dron: el borde de la terraza y el skyline | — |
| **40** | **213,746** | **1145 (38,17)** | **la resolución: cae a un piano suelto y entra Isabella en la corrediza** | caída de 16,5 dB |
| 48 | 221,359 | 1373 (45,78) | «Time» vuelve a pegar: la música ya se ha apagado (acaba en el f1371) | 15,3 dB |

## Planos (los doce)

`entra: disolver` = 12 f que ACABAN en el `en` (el plano nuevo es opaco justo en el golpe).

| # | id | bloque | clip → archivo del SSD | tramo del clip (s) | `en` (f) | `dur` (f) | pulso | entra | zoom |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-dron` | 1 | DR147 → `DJI_20261001103120_0147_D.MP4` | 0,00-2,00 | 0 | 60 | 0 | corte | 1,00→1,05 |
| 2 | `c02-hook` | 2 | HK02 → `Hook2+IA.MOV` | 0,50-6,20 | 60 | 171 | 2 | disolver | 1,02→1,14 |
| 3 | `c03-fachada` | 3 | **RC25** → `Exterior edificio4.MOV` | 1,20-3,10 | 231 | 57 | 8 | disolver | 1,00 |
| 4 | `c04-puerta` | 3 | RC01 | 8,20-10,10 | 288 | 57 | 10 | corte | 1,00 |
| 5 | `c05-sala` | 3 | RC02 → `Entrada apto y Sala.MOV` | 9,80-13,60 | 345 | 114 | 12 | corte | 1,00 |
| 6 | `c06-ventanal` | 3 | RC07 → `Vista  Cocina y Comedor.MOV` | 0,80-4,60 | 459 | 114 | 16 | corte | 1,00 |
| 7 | `c07-mitad` | 4 | MD09 → `Medio9.MOV` | 0,53-5,30 | 573 | 143 | 20 | disolver | 1,00→1,04 |
| 8 | `c08-follaje` | 5 | RC08 → `Patio y Naturaleza.MOV` | 1,57-5,40 | 716 | 115 | 25 | disolver | 1,00 |
| 9 | `c09-patio` | 5 | **RC08** → `Patio y Naturaleza.MOV` (sigue a c08) | 5,40-10,13 | 831 | 143 | 29 | corte (invisible) | 1,00 |
| 10 | `c10-dron` | 5 | DR163 → `DJI_20261001104246_0163_D.MP4` | **2,00-7,70** (rev. 3; antes 13,30-19,00) | 974 | 171 | 34 | corte | 1,00 |
| 11 | `c11-cta` | 6 | CT07 → `CTA7.MOV` | 0,63-7,10 | 1145 | 194 | 40 | disolver | 1,00→1,048 |
| 12 | `c12-cierre` | 6 | la tarjeta oscura: `cierre-oscuro.png`, un negro liso (`foto`) | — | 1339 | 60 | — | corte (la imagen ya ha fundido a negro en f1338) | 1,00 |

Ningún `velocidad` ≠ 1. Ningún tramo de clip se repite. **c08 y c09 son UNA toma continua de RC08** (revisión 2): c08 acaba en el fotograma 161 del clip y c09 arranca en el 162 y llega al 304, el último; el corte del pulso 29 no se ve.

## Voz

| Voz | Toma | Dice | Ventana medida (fuente → comp) | LUFS | Ganancia |
|---|---|---|---|---|---|
| hook | HK02 | «Este apartamento aún no está terminado… y ahí está, precisamente, la oportunidad.» | 0,52-5,30 s → **f61-f204** (con su imagen, opaca en f60) | −21,1 | +0,1 dB |
| mitad | MD09 | «Tienes 317 metros para desarrollar completamente el interior.» | 0,57-4,68 s → f574-f697 | −21,7 | +0,7 dB |
| CTA | CT07 | «Necesitas saber si esta unidad en específico funciona para ti. Si es así, escríbeme y la recorremos juntos.» | 0,65-7,00 s → f1146-f1336 | −19,0 | −2,0 dB |

Objetivo: −21 LUFS (la mediana de las tres es −21,1). Las tres voces son iguales: entran con su imagen y cruzan 6 f con ella
(`vocesDeCortes`); ninguna suena antes de que su toma sea opaca (la puerta lo comprueba).
Tras «juntos» (f1336) quedan 63 f hasta el final (45-90): la toma acaba 3 f después y sigue la tarjeta oscura con el logo y la web (60 f).

## Música: tramo y envolvente

Un tramo, `musica-017.wav`, `desde` 175,633 s, **f0-f1371** (`FIN_MUSICA_017`: «Time» vuelve a pegar en el pulso 48, f1373, y el piano se apaga 2 f antes). Ganancia en `envolventeBajoVoz`:

```
f0:0   f1:0,432   f49:0,432   f61:0,069   f204:0,069   f216:0,432   f562:0,432   f574:0,069   f697:0,069   f709:0,432   f1339:0,432   f1371:0
```

Arriba (0,432 = −7,3 dB sobre el archivo → **−15 LUFS** con la canción sola), baja 16 dB (0,069 →
≈ **−31 LUFS**, 10 LU bajo la voz) en 12 f ANTES de cada primera palabra, y vuelve 12 f después de la
última (hook: f49→f61 y f204→f216; mitad: f562→f574 y f697→f709). Bajo la voz del CTA NO baja: la
canción cae sola 16,5 dB en el pulso 40. Desde que acaba la toma del CTA (f1339, donde empieza la tarjeta) el piano se apaga en 32 f (1,1 s) hasta el f1371; los últimos 28 f de la tarjeta (0,9 s) quedan en silencio.

## Texto

| Bloque | Posición | Frames | Líneas (entra en f) |
|---|---|---|---|
| `h01` | abajo | 61-133 | «Este apartamento» (61) · «aún no está» (83) · **terminado** (108) |
| `h02` | abajo | 133-209 | «y ahí está,» (133) · «precisamente,» (152) · **la oportunidad.** (169) |
| `m01` | abajo | 574-628 | «Tienes» (574) · **317 metros** (588) |
| `m02` | abajo | 628-700 | «para desarrollar» (628) · «completamente» (658) · **el interior.** (678) |
| `c01` | abajo | 1146-1258 | «Necesitas saber» (1146) · «si esta unidad en específico» (1177) · «funciona para ti.» (1221) |
| `c02` | abajo | 1263-1340 | «Si es así,» (1263) · **escríbeme** (1288) · «y la recorremos juntos.» (1304) |

**La cursiva (los 5 acentos) mide 91 px, 8 menos que el cuerpo del motor** (rev. 5: `ACENTO_MENOS_017`); la base, 45 px.

**No hay `portada` ni `cuenta`** (rev. 4): la primera toma sale sin texto. El cierre (rev. 6) no es un bloque de texto del plan sino la composición: el logo
(`LogoCierre`: 440 px, 60 % de opacidad, f1341-f1351) y la web (`WebCierre`: «PropiedadesLuxur.com», 54 px, f1347-f1357), centrados sobre la tarjeta oscura (f1339-f1399).

Todos los subtítulos de Isabella van abajo, a 90 % de opacidad (el grupo entero). Las líneas están
llevadas a mano al onset de su palabra (el DTW de whisper las ponía hasta 0,45 s pronto) y medidas
sobre el render: con la música debajo, 16 de 17 entran entre −1,6 y +2,2 f del sonido (mediana +1,7 f; la 17.ª, «Este», da +4,2 por un fallo del
detector, que se pierde la primera sílaba, y no de la línea); sobre la voz SOLA renderizada por el motor, 15 de 17 a ±0,5 f (una sin onset claro, «Necesitas»).
Velo: solo el de abajo, la unión de los bloques de Isabella (los huecos de menos de 1 s no lo apagan); el logo ya no lleva velo (va sobre negro).

## Puertas de control

- [x] `node proyectos/017/revisar-017.mjs`: todas las secciones en verde (línea de tiempo, estructura, las revisiones 2-3 y 4, voz, hook, pulsos, ducking, subtítulos, metraje, tramos, encuadre).
- [x] `npm --prefix remotion run lint`: limpio.
- [x] Frames clave revisados (R05), revisión 4: 0, 30, 50, 55 (el dron, sin texto) · 60, 61, 64 (Isabella opaca, «Este», el subtítulo que entra) · 100, 140, 175, 205 · 1330, 1338, 1342, 1346, 1352, 1362, 1374 (el logo y el fundido a negro) (`pruebas-720p/stills5/`); y 1336-1341 a 1080×1920 para la costura del congelado.
- [x] Prueba 720p, revisión 4 (`pruebas-720p/017-recorrido-720p.mp4`; las anteriores, en `…-rev1.mp4`, `…-rev2.mp4` y `…-rev3.mp4`; 540×960, 30 fps): −16,4 LUFS integrados, pico real −4,6 dBFS; voz −20,8/−20,5/−20,7; música sola −14,7/−14,1/−14,8; golpes del 8, 16 y 32 a 0,0 f de su corte (`herramientas/golpes-render.py`, sobre el audio del render); sin parpadeos de luma: los dos únicos saltos grandes son los cortes de los f288 (−24,6) y f974 (−25,6), entre exterior y sombra; la costura del congelado (f1339) pasó de −5,1 niveles a 0,00.
- [x] Revisión 5 (la cursiva 8 px más pequeña): geometría de los 13 bloques idéntica sin el parámetro y −8 px solo en las líneas de acento con él; `SubtitulosDemo` pixel-idéntica; en el 017 ni un píxel distinto fuera de la franja del texto; `revisar-marca.mjs` 70/70; `revisar-017.mjs` mide 99 → 91 px. Prueba: `pruebas-720p/017-recorrido-720p.mp4` (la de la rev. 4, en `…-rev4.mp4`).
- [x] Revisión 6 (el cierre): prueba 720p `pruebas-720p/017-recorrido-720p.mp4` (la de la rev. 5, en `…-rev5.mp4`), 1399 f = 46,63 s; −16,4 LUFS integrados, pico −4,6 dBFS, LRA 7,8; voz del CTA −20,7 LUFS; **el piano bajo la tarjeta** pasa de −19,9 a −44,4 dBFS de pico entre el f1339 y el f1373 y **el golpe del pulso 48 (f1373) queda a −113 dBFS** (inaudible), con silencio digital hasta el final; golpes del 8, 16 y 32 a 0,0 f de su corte; subtítulos a +1,7 f de mediana (igual que antes). **Luma por fotograma:** el fundido es lineal (107 → 1,1 en 6 f, −17,6 por fotograma) y la tarjeta entra sin salto (1,1 → 0,5); los dos únicos saltos grandes de la pieza son los cortes de los f288 (−24,6) y f974 (−25,6). Frames: 1326, 1331, 1334, 1336, 1338, 1339, 1343, 1347, 1352, 1360, 1398 a 1080×1920 y los mismos en el MP4. La puerta (sección 2d) mide: 440 px (el 79 % de 560), opacidad 0,6, tarjeta de 2,0 s, web «PropiedadesLuxur.com» de ≈ 651 de 842 px útiles, zonas seguras, fondo oscuro (luma máx. 16).
- [x] Revisión 7 (el color con `colorCorrection()`): Remotion 4.0.496 → **4.0.509** (a elección del usuario) con `npm run lint` limpio y la puerta (`revisar-017.mjs`, con la sección **2e** nueva) en verde, probada hacia el lado malo con ocho cambios; prueba `pruebas-720p/017-recorrido-720p.mp4` (la de la rev. 6, en `…-rev6.mp4`), **renderizada a escala 1 con `--gl=angle` y reducida con ffmpeg** (R06/R32: a `--scale=0.5` el camino con efecto sale aliasado), 1399 f = 46,63 s, 30,0 MB; el **audio es idéntico bit a bit al de la rev. 6** (md5 del PCM decodificado `5dcc7e5e63e368474cb677bdbf93b4fe` en las dos), así que los niveles (−16,4 LUFS integrados, pico −4,6 dBFS), los golpes y los subtítulos medidos en la rev. 6 valen; **0 de 1.338 fotogramas desalineados** contra el render de la rev. 6 (`alinea-renders.py`); color medido (`medir-color.py`): saturación media 0,301 → 0,354, σ de luma entre planos 14,2 → 9,2, quemado máx. 15,5 % → 3,6 %, piel de Isabella ±0,4° en el hook y el CTA; empalme de RC08 (f830→f831) −0,3 → −0,2; ampliaciones al 100 % de cielo, hormigón y cara sin bandas ni moteado; `revisar-marca.mjs` 70/70; sonda de regresión del motor: 239 de 240 fotogramas de las otras 30 composiciones idénticos a los de antes del cambio (el distinto, Avatar008 f1170, no usa el montaje y con el código actual sale como en la 4.0.496).
- [x] **OK del usuario a la prueba (R06):** «exporta el video final» (2026-10-03, tras ver la prueba de la rev. 7).
- [x] Revisión 8 («unidad» por «línea» en el subtítulo del CTA): `node proyectos/017/revisar-017.mjs` y `npm --prefix remotion run lint` en verde; fotogramas f1200 y f1242 a 1080×1920 mirados; **el final se volvió a exportar** (mismo comando de R22 y mismo arreglo de etiquetas; píxeles y audio idénticos antes y después del arreglo) y la prueba de 540×960 se derivó de él (`-vf scale=540:960:flags=lanczos,setparams=…`, etiquetas BT.709 en las dos capas; la de la rev. 7, en `…-rev7.mp4`); 1.150 de 1.399 fotogramas idénticos bit a bit a los de la rev. 7 y diferencia visible solo en la 2.ª línea del CTA (f1179-f1257); color, audio (md5 del PCM, −16,4 LUFS), decodificación y `.srt` (cue 13) comprobados.
- [x] **Final de alta calidad** («renderiza en buena calidad», 2026-10-03): el mismo plan re-renderizado con `--crf=12 --x264-preset=slower` (2 min 11 s) y el mismo arreglo de etiquetas (vídeo y audio idénticos antes y después); **`finales/017-recorrido.mp4` es ahora esta versión** (198,3 MB, 33,7 Mb/s de vídeo + AAC 320k, H.264 High L5.0, BT.709 `yuv420p` rango limitado, 1080×1920, 30 fps, 1399 f) y la anterior (CRF 16, 109,3 MB) queda como `finales/017-recorrido-crf16.mp4`. Medido contra los 12 stills de siempre: PSNR bruto medio 44,02 dB (41,85 con CRF 16), a baja frecuencia 52,97 (50,80), color medio a ≤ 0,89 niveles; entre las dos versiones los 1.399 fotogramas a ≥ 39,4 dB; decodificación sin errores, −16,4 LUFS, md5 del PCM idéntico.
- [x] **Final exportado (R22)** el 2026-10-03: `proyectos/017/finales/017-recorrido.mp4` (109,3 MB; H.264 High, `yuv420p` rango limitado, BT.709, 1080×1920, 30 fps, 1399 f = 46,63 s, 18,7 Mb/s con el audio; AAC 48 kHz estéreo a 320k) con `npx remotion render src/index.ts Recorrido017 … --crf=16 --x264-preset=slow --audio-bitrate=320k --color-space=bt709 --image-format=png --gl=angle` (2 min 43 s). **Etiquetas:** el master salió con VUI `2/2/1` y sin `colr` (la exportación de la rev. 8, con el mismo comando, salió con `colr` 1/1/1 y el mismo VUI); arreglo sin pérdida en las dos capas a la vez (`-c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv -movflags +write_colr+faststart`): ahora VUI `1/1/1`, `colr nclx 1/1/1`, `tv`, faststart; `framemd5` DECODIFICADO idéntico antes y después y el audio con el mismo md5 de PCM (`5dcc7e5e…`, el de la prueba aprobada). **Color (R22, `herramientas/medir-final.py`):** 12 fotogramas (uno por plano y la tarjeta) contra stills a 1080×1920 con `--gl=angle`: color medio a ≤ 1,2 niveles en cualquier canal, PSNR de baja frecuencia 43,7-50,8 dB, PSNR bruto medio 41,85 dB (mín. 35,3 en el dron sobre el dosel de hojas: textura, no color; el fotograma de al lado da 22 dB, así que no hay desfase). **Audio:** −16,4 LUFS integrados y LRA 7,8, igual que la prueba. Decodificación completa sin errores. `.srt`: `finales/017.srt` (17 cues, idéntico al de la prueba).
