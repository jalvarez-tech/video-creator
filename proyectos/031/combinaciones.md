# Combinaciones — proyecto 031 · Lote en El Carmen de Viboral (Mia), V15

Registro de esta versión y mapa de «cómo cambiar cada pieza». La V14 (030, el primer reel de la propiedad) vive SIN commit en el worktree `organize-el-carmen-videos-…`; lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final (CRF 12 + CRF 16 + `.srt`) | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · DR96 · RC01 · DR98 · MD02 · DR99 · RC04 · DR109 · CT01 · *Becoming* |
| **V15** | **031** | **final** (CRF 12 + CRF 16 + `.srt`) | 2026-10-09 | «Construir aquí»: DR108 · **HK06** · DR103 · RC05 · DR101 · **MD04** · RC02 · DR106 · DR107 · **CT04** · *Somewhere inside of me* · 1068 f · 35,6 s · ni un segundo de metraje compartido con la V14 · prueba rev. 0: `pruebas-720p/031-recorrido.mp4` (540×960, BT.709) + `hoja.jpg` + `panel-antes-despues.jpg` + `fotogramas-clave.jpg` |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK06 `IMG_1605` | la tensión campo / servicios con un dato de la ficha (agua y energía) y el verbo del ángulo («construir») |
| Mitad | MD04 `IMG_1601` | le pone nombre al deseo («tu casa soñada»); audio limpio |
| CTA | CT04 `IMG_1612` | una acción para quien ya tiene «un proyecto en mente»; audio limpio |
| Canción | *Tiesto pres. Allure – Somewhere inside of me (Alexander Gorshkov chillout remix)* (`96faa93f`) | 835 rejillas con estas tomas, golpes ≥ 11,1 dB; el fundido final (333,25 s) cae dentro del CTA |
| Entrada de la canción | 301,208 s (`INICIO_MUSICA` = 9035/30) | golpe de 12,3 dB en el f3 |
| Apertura | DR107, 29,80-33,03 s, ventana 0,38 (`dr107a`; rev. 2) | la explanada roja, la cabaña en el centro, los pinos y las palmas; el tramo más uniforme de los drones libres (la rev. 0-1 abría con DR108 17,80-21,03 s) |
| Paseo | DR103 17,90-20,27 (rev. 1) · RC05 1,60-4,00 · DR101 5,30-8,13 | la explanada junto a los eucaliptos → la cerca y el eucalipto (a pie) → los taludes en terrazas (la rev. 0 abría con DR103 3,90-6,27, la explanada roja en cenital) |
| Bloque 5 | RC02 1,00-3,37 · DR106 18,10-20,50 · DR107 34,00-37,57 | la loma con las montañas (a pie) → la cabaña → la vista (sube al valle y la montaña) |
| Recortes 9:16 | DR101 0,35 · DR103 0,40 · DR106 0,75 · DR107 0,70 (la vista) y 0,38 (la apertura, `dr107a`) | `normalizar.mjs`, sexta columna de `MATERIAL` |
| Voz | −15 LUFS tratada (+18,3 · +19,3 · +18,6 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido: «la voz de Isabella sube a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (−3,8 · −5,0 · −5,6 dB: la canción es alta); −26 LUFS bajo la voz | sus picos quedan por debajo de −3,6 dBFS |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver «El color» abajo |

## Revisiones

- **rev. 1 (2026-10-08, «cambia la toma del 0:09»):** leída como la toma que ENTRA justo después de ese segundo, c03 (f274 = 9,13 s; hasta ahí sigue el hook). DR103 3,90-6,27 s (la explanada roja en cenital: una textura de tierra) → **DR103 17,90-20,27 s** (el dron avanza junto a la hilera de eucaliptos, con la ladera verde y la explanada debajo; la cabaña asoma al final; dispersión del movimiento 0,041). Su color, medido: `exposure` +0,35 y `shadows` +0,2 (es más oscuro que el anterior: luma 100 sin graduar → 113); σ de luma entre planos 7,7 → 6,9; los saltos de sus dos cortes, +10/−38 → −14/+10. Ni los cortes ni el audio cambian. La rev. 0 queda en `pruebas-720p/031-recorrido-rev0.mp4` y `hoja-rev0.jpg`.

- **rev. 2 (2026-10-09, «cambia la toma del primer video»):** la apertura DR108 17,80-21,03 s → **DR107 29,80-33,03 s con la ventana 9:16 en 0,38** (`dr107a`, una entrada más en `MATERIAL` con el mismo original): la cabaña en el centro, los pinos y las palmas detrás, la explanada delante; dispersión del movimiento 0,031. Comparte clip con la vista (c09, 34,00-37,57 s, ventana 0,70), declarado. Color: `highlights` −0,35 y `whites` −0,2 sobre la base, sin más (luma 123,6; σ entre planos 6,8). La rev. 1 queda en `pruebas-720p/031-recorrido-rev1.mp4`.

- **Color final y FINAL (2026-10-09, «coloriza y haz el render final en buena calidad»):** la luz ya estaba igualada (σ 6,8) y la saturación no: los planos apagados (drones y tomas nubladas, 0,14-0,29) suben a `saturation` 1,12 con `vibrance` 0,03-0,05 (nunca en la vista: malla gris), y el hook y el CTA a 1,05/1,04 con `vibrance` 0,04/0,03. Saturación media 0,295 → 0,319 (σ 0,113 → 0,095); piel 9,3° y 7,3° (sin moverse); al 100 %, sin bandas ni moteado (`pruebas-720p/zoom-100.jpg`).

## Lo exportado (2026-10-09)

| Archivo | Qué es |
|---|---|
| `finales/031-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 177 MB, BT.709 etiquetado |
| `finales/031-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 100 MB; la misma imagen y el mismo audio |
| `finales/031.srt` | 15 cues, de 3,5 a 33,3 s |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida (`h264_metadata` + `+write_colr`) con el framemd5 decodificado y el md5 del PCM iguales antes y después (1068 fotogramas). Color contra stills a escala 1 (`medir-final.py`): máster ≤ 0,40 niveles (baja frecuencia ≥ 49,7 dB), CRF 16 ≤ 0,50 (≥ 47,5 dB). Audio: voces −14,7 · −14,6 · −14,7 LUFS, música sola −14,9/−15,0, pieza −15,0 LUFS, pico −3,7 dBFS. Golpes de la final a 0,0-0,1 f de su corte. Negro exacto en el f1007.

**Exportada con las cuatro dudas del hook sin oír** (la puerta con `--final` falla solo por ellas): «rodeado de la naturaleza» (≈ 4,1-4,5 s), «pero con» (≈ 5,6 s), «agua y energía» (≈ 6,0 s; por formantes encaja con «y») y «vente, te muestro» (≈ 7,9 s; las dos «te» suenan fundidas). Si alguna es distinta: el texto del trozo en `subtitulos-031.ts`, `voz/hk06.txt`, el `dice` del plan y el `.srt`; el texto va dentro de la imagen, así que se vuelve a renderizar (≈ 5 min el máster + 2 la ligera) y se repiten las etiquetas.

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 9 que caen en un golpe, a 0,0-0,1 f en el AAC de la prueba y en el WAV del render (`golpes-render.py`); fuerza 10,7-18,6 dB en el AAC (la entrada de la mitad, la más floja) · el de apertura es la entrada de la música desde el silencio |
| Voz | −14,7 · −14,6 · −14,7 LUFS en sus ventanas del render (con la música a −26 debajo), picos −4,6 · −4,0 · −3,7 dBFS |
| Música sola | −15,1 (lote) · −14,9 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −3,7 dBFS: sin saturar |
| Subtítulos | 15 líneas a +0,5…+2,0 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`); sobre el render, mediana +1,2 f (`subs-vs-voz.py`; «vente, te muestro» marca +7,3 f porque con la música el detector no ve la «v» suave) |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 11,8 → 7,7 · quemado máx. 8,2 → 0,2 % (el cielo blanco de DR101) · saturación media 0,277 → 0,304 · piel: tono 9,5° → 9,3° (MD04) y 7,4° → 7,4° (CT04) · el salto más grande, explanada → cerca, −34 → −21 |
| Cierre | negro exacto en el f1007 (luma máx. 16); tarjeta de 2,0 s con el logo y la web |

## Cómo cambiar cada pieza

- **Otro hook / otra mitad / otro CTA** (libres: HK01-03, MD01, MD03, MD05-06, CT02-03): copia la toma a `proyectos/031/original/` con su código, añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (medida con el perfil de energía: en estas tomas `limites-voz.py --margen 40` se confunde con los chasquidos del principio cuando el suelo es de −90 dB); la ganancia sale de `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, los trozos con `trozos-editoriales.mjs` y **cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py`** (tabla de `herramientas/lineas-vs-onsets.py`). Cambia la duración del plano y con ella la rejilla: `buscar-cortes-lp.py` con `R='[[75,100],[158,178],[60,105],[60,130],[60,100],[108,137],[50,100],[50,100],[90,108]]' TIPOS=dccccccccc W=3.5 ORDEN=golpe` (el 2.º par es el hook, el 6.º la mitad).
- **Otra canción:** reservarla en el registro; `buscar-cortes-lp.py` con la `R` de arriba (las ventanas reales de los planos); `medir-pista.py … --json musica/golpes-031.json`; los `GOLPE` de `metraje-031.ts`, `INICIO_MUSICA`, `DECAE` (`lufs-caida.py`) y los niveles de `audio-031.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`, `LUFS_MESETA`; medidos con ebur128 en los tramos de la tabla de `artefactos/03-timeline.md`). La segunda candidata medida es *Chillin'* (42 rejillas, corte seco más débil 8,9 dB).
- **Otro plano de dron:** medir su movimiento ANTES (`herramientas/movimiento.py`, `ventanas-uniformes.py`, `ventana-fina.py <clip> <a> <b> <N>`: dispersión < 0,09, pendiente ≈ 0, máximo < 1,2×). Un apaisado (DR100-107) necesita su recorte 9:16 en `MATERIAL` (mirar principio, mitad y final del tramo).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (sus tablas son las de esta pieza).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-031.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír el hook** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «rodeado **de la** naturaleza» (≈ 4,1-4,5 s del vídeo), «**pero** con» (≈ 5,6 s), «agua **y** energía» (≈ 6,0 s) y «vente, **te** muestro» (≈ 7,9 s). El registro de material trae otra frase («rodeado de naturaleza, con agua y energía disponibles, te muestro»); el texto pintado es lo que whisper oye por cortes.
- La canción (medida, no oída; ¿demasiado «de club» para el canal?) y su licencia; el canal del CTA («escríbeme»).
