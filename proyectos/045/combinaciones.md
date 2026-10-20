# Combinaciones — proyecto 045 · Tierra Grata Bosque Santo (ARRIENDO), V27 «El tiempo»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la PRIMERA de los seis reels de esta propiedad (V27-V32, proyectos 045-050); las otras cinco se montan a la vez en sus worktrees (reparto en [`../044/reparto-045-050.md`](../044/reparto-045-050.md), catálogo en [`../044/catalogo-material.md`](../044/catalogo-material.md)). Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V27** | **045** | **final (CRF 12 y CRF 16 + versión con ficha; 4 palabras sin oír)** | 2026-10-19 | **«El tiempo»**: **RC01** (apertura) · **HK01** · RC11 · RC14 · RC16 · **MD01** · RC05 · RC09 · **RC21** (la vista, con el jacuzzi privado) · **CT01** · *Fortitude (Light Version)* · 1318 f · 43,9 s |
| V28-V32 | 046-050 | sesiones hermanas | 2026-10-19 | «Ciudad nueva», «Lo que incluye», «Chef y experiencias», «Amenidades», «14,8» |

## Lo que lleva (rev. 0 = la final exportada el 2026-10-19)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | RC01 `Img 9461` 0,00-3,70 s | asignada (apartamento, sin dron): la isla de la cocina y sus taburetes, limpia desde el f0; el clip sigue hasta el balcón y la vista (≈ 8 s en adelante), que no entra. El usuario pidió también esta toma (`Img 9461`) en la V31/049: **se repite entre piezas, declarado** |
| Hook | HK01 `IMG_4269` (voz 0,82-6,62 s; `desde` 15 f) | asignada. **Repetida en la V30 (048)**, declarado. El catálogo decía «la voz empieza casi en el f0»: es el DTW de whisper (R29); la energía dice 0,82 s |
| Paseo (bloque 3) | RC11 Social Kitchen 0,80-4,17 · RC14 gimnasio 0,00-3,57 · RC16 piscina 2,00-5,40 | los tres usos del tiempo ganado (trabajar, cuidarse, descansar), todos girando a la derecha. RC11 se acaba antes de que entre un hombre de amarillo (≈ 6 s); RC14, antes de las caminadoras con un hombre en primer plano (≈ 4 s); la sauna (RC15) queda fuera (oscura) |
| Mitad | MD01 `IMG_4274` (voz 0,62-4,73 s; `desde` 9 f) | asignada; continúa a HK01 («de esta manera») |
| Bloque 5 | RC05 alcoba 0,30-3,43 · RC09 baño 2,50-5,23 · **RC21** balcón 5,43-11,07 | «todo ordenado» enseñado justo después de decirlo; el clímax es RC21 con el **jacuzzi privado** entero en el cuadro desde los 9,5 s |
| CTA | CT01 `IMG_4277` (voz 0,70-4,52 s; `desde` 11 f, la toma entera) | asignada. **Repetida en la V31 (049)**, declarado |
| Canción | *Fortitude (Light Version)* (`493eeec6`) | asignada. La única rejilla de la canción en los 10-50 s con los cortes secos a ≥ 8,3 dB: entrada **9,834 s** (golpe de 11,3 dB) |
| Entrada de la canción | 9,8 s (`INICIO_MUSICA` = 294/30) | golpe de 11,3 dB en el f3 |
| Voz | −15 LUFS tratada (+18,0 · +18,0 · +17,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar». Los chasquidos de labios de antes de la primera palabra (MD01 0,55 s, CT01 0,63 s) quedan fuera (`VENTANA_VOZ`) |
| Música sola | −15,0 (apertura) · −15,5 (paseo) · −15,2 (bloque 5) LUFS; −26 bajo la voz; el golpe del CTA, ≈ 1,2 dB más bajo | la canción es SUAVE (−20…−18 LUFS): sube de +2,8 a +5,5 dB y el techo de pico de −0,5 dBFS manda en el paseo y el bloque 5 |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido) | ver abajo |

## Lo medido en la prueba y en la final (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 5 cortes secos medibles (f414, f521, f769, f863, f945) a −0,4…+0,3 f del golpe, de 8,3 a 13,5 dB (`golpes-render.py` sobre el AAC de la prueba); los tres en que entra Isabella (f111, f623, f1114) a −0,3…0,0 f; sobre el WAV del render el golpe llega ≈ 1,3 f antes (el AAC de Remotion llega tarde: `final-remotion-audio-43ms-tarde`) |
| Subtítulos | 15 líneas a +0,3…+1,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`); el DTW de whisper iba hasta 0,5 s tarde en MD01 y CT01 (R31) |
| Legibilidad (texto blanco sin sombra) | contraste 3,2-11,6 : 1 al p90 y 2,7-5,7 al p99 (017: 2,9-3,7 / 2,6-3,0; 018: 2,8-4,1 / 2,3-3,5); lo más bajo, el CTA sobre el jacuzzi comunal (medido con los recorridos recortados; los de Isabella no cambian) |
| Color (`medir-color.py`, antes → después; sin recorte) | σ de luma entre planos 20,2 → 13,6 · quemado máx. 0,8 % · aplastado máx. 6,7 % (el vestido negro de Isabella en MD01) · saturación media 0,215 → 0,234; saltos de luma en los cortes secos: de −8,5 a +15,5 (el mayor, la Social Kitchen → el gimnasio) |
| Voz | las tres tomas a −15 LUFS en su ventana (WAV tratado: +18,0 · +18,0 · +17,8 dB tras el compresor; limitador −2,5 dBFS) |
| Música sola | −15,0 (apertura) · −15,5 (paseo) · −15,2 (bloque 5) LUFS; −26 bajo la voz (11 LU); el golpe del CTA (46,873 s, pico −2,1 dBFS en el archivo) con ≈ 1,7 dB menos |
| Pieza | −15,3 LUFS integrado, pico de muestra −0,52 dBFS (en el f385, el paseo, al techo de −0,5), LRA 3,4 LU |
| **Final (CRF 12 `slower`)** | `finales/045-recorrido.mp4`: 100,3 MB, 1080×1920, 1318 f (43,93 s), H.264 + AAC 320 kbps (317). Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`): `framemd5` DECODIFICADO (1318 fotogramas) y PCM del audio idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): color medio ≤ 0,21 niveles, PSNR de baja frecuencia 49,4-54,1 dB (medio 52,5), bruto 43,9-47,8 dB |
| **Final (CRF 16 `slow`)** | `finales/045-recorrido-crf16.mp4`: 52,2 MB, misma imagen y mismo audio (PCM idéntico al del master); `framemd5` idéntico antes/después de las etiquetas; color medio ≤ 0,36 niveles, PSNR de baja frecuencia 49,6-51,4 dB (5 fotogramas) |
| `.srt` | `finales/045.srt`: 15 cues, 4,000-41,567 s (`exportar-srt.mjs`) |
| Portada | `finales/045-portada.png` (receta en `portada.json`): fotograma de 36,8 s (el más nítido de la vista, 0,33 s antes del corte al CTA: las torres al atardecer y el jacuzzi privado con su escalón), `EL POBLADO` · `RENTA`; contraste 9,6:1 el texto y 13,5:1 el isotipo |
| **Versión con ficha (funnel)** | `finales/045-recorrido-ficha.mp4`: 108,1 MB, 1318 fotogramas (los mismos del final), SIN subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fija en el tercio bajo del 1:1 hasta 41,50 s (se va en 0,4 s y empieza la tarjeta en 41,90 s). El audio es el del final COPIADO: md5 del flujo AAC idéntico. Base: `RecorridoNNN` con `sinSubtitulos` a CRF 6 (`045-limpio.mp4`, borrado) |
| Entrega en el SSD | `…/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `045-recorrido.mp4`, `045-recorrido-ficha.mp4`, `045-portada.png`, `045.srt` y `045-caption.md` (md5 comprobado contra `finales/`). El CRF 16 queda solo en el repo |

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mide el perfil de energía: ¡no te fíes de whisper para el arranque!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `perfil-voz.py`/`onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia la rejilla (abajo).
- **Otro recorrido:** añade su fila a `MATERIAL` (sin recorte: son verticales anamórficos) y cambia el `src`, `desde` y `color` del plano. Duración = la del plano (la rejilla no se toca). Mira el plano ENTERO a 0,5 s antes de elegir tramo: en las zonas comunes (gimnasio, Social Kitchen) entra gente.
- **Otra canción:** reservarla en el registro; `herramientas/buscar-cortes-043.py` con `R='[[75,110],[188,210],[60,110],[60,110],[60,110],[138,149],[60,100],[60,100],[110,170]]' TIPOS=cddccccccc MINC=8 MIND=6 DROP=0 START_MIN=9 FIN=todas ORDEN=golpe`; `medir-pista.py … --json musica/golpes-045.json`; los `GOLPE` de `metraje-045.ts`, `INICIO_MUSICA` y los niveles de `audio-045.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa reservada era *Cornfield Chase*; no se midió (sin necesidad).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-045.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha** (funnel): `Recorrido045` acepta `sinSubtitulos` (apaga los subtítulos y su velo); ver `ficha-luxur` §3.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto —4 notas en el plan y en `subtitulos-045.ts`—, y la final se exportó con ellas abiertas por orden del usuario, §7c de `recorrido-luxur`; las notas SE QUEDAN): «**aseo semanal**» (HK01, «aseo» hacia el f272 = 9,07 s del vídeo), «**todo ordenado**» (MD01, «todo» hacia el f673 = 22,4 s), «**toda tu estancia**» (CT01, «tu» hacia el f1188 = 39,6 s) y «**contáctanos**» (CT01, f1212 = 40,4 s). Lo que midió `formantes.py` (una medida no es un oído):
  - «aseo»: [a] (5,895-5,945 s, F1 ≈ 700, F2 1.650 → 1.150), [e] (5,955-6,005 s, F1 ≈ 660, F2 ≈ 1.800), un cierre de 6,015-6,03 s (−42/−47 dB) y otra vocal frontal (F2 ≈ 2.000) seguida de una nasal (F2 ≈ 700). **No concluye**: el cierre puede ser la /s/ de «semanal» (y «aseo» salir apocopado) o la /d/ de «asedio»; whisper oye «asedio» y «hace dos».
  - «todo ordenado»: la primera vocal (2,005-2,065 s) tiene F1 ≈ 550 y F2 ≈ 1.500 → 740 Hz: posterior redondeada, una [o]; no es la [e] (F2 ≈ 2.000) de «de nada» (whisper). Encaja con «to-do».
  - «toda tu estancia»: «tu» (2,815-2,865 s) mide F1 ≈ 470-510 y F2 ≈ 640-750: posterior redondeada [u]; no es la [a] (F2 ≈ 1.400) de «la» ni de «esta». Encaja con «tu».
  - «contáctanos»: la cola de 4,30-4,52 s mide una vocal abierta fronteada (F1 ≈ 720, F2 ≈ 1.860), una nasal (4,385-4,43 s, F1 ≈ 375, F2 ≈ 680), otra vocal (F1 ≈ 690, F2 ≈ 1.720), una nasal (4,485 s) y una [e]: **no hay una [o] limpia** (F2 ≈ 900) de «-nos». La sílaba final no está cerrada. Es la palabra más dudosa; si no es «contáctanos» cambian `dice` del plan, `voz/ct01.txt`, el trozo `c02` de `subtitulos-045.ts` (f1211) y el `.srt` (≈ 6 min).
- **Lo declarado:** el recorrido (verticales anamórficos escalados ×2,13 en vertical) algo más blando que Isabella (4K); el hook (V30) y el CTA (V31) repetidos en otras piezas, y la apertura RC01 repetida en la V31/049 por pedido del usuario; dos de las tres tomas de Isabella en la terraza común; la canción suave con cortes en golpes de 8,3-15,5 dB; la música a −15,5/−15,2 LUFS por el techo de pico; la prueba con recorte que se enseñó primero se sobrescribió (no queda `-rev0`).
- La canción (medida, no oída; licencia sin verificar).
