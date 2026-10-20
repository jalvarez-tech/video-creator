# Combinaciones — proyecto 047 · Tierra Grata Bosque Santo (ARRIENDO), V29 «Lo que incluye»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es una de las SEIS del lote de arriendo (V27-V32, proyectos 045-050; reparto en `proyectos/044/reparto-045-050.md`, catálogo en `proyectos/044/catalogo-material.md`). Lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27 | 045 | sesión hermana | 2026-10-19 | «El tiempo»: RC01 · HK01 · MD01 · CT01 · RC21 · *Fortitude* |
| V28 | 046 | sesión hermana | 2026-10-19 | «Ciudad nueva»: hook · HK03 · MD02+MD03 · CT02 · RC18 · *Children (Piano)* |
| **V29** | **047** | **en prueba (rev. 2)** | 2026-10-19 | **«Lo que incluye»**: **RC02** (principio: sala de día) · **HK02** · RC16 · RC11 · **MD04 + MD05** · RC05 · RC09 · **RC03** (balcón con el jacuzzi privado, torres y ciudad) · **CT03** · *Dreamlife* · 1411 f · 47,0 s · **recorridos anamórficos escalados enteros (`setsar=1`)**. Historia: **rev. 0** (47 s, recortados ×3,2: pixelados, descartada: `pruebas-720p/047-recorrido-rev0.mp4`) → **rev. 1** (23,4 s, solo Isabella: exportada y en el SSD, `finales/…-rev1`) → **rev. 2** (la vigente: los recorridos vuelven bien normalizados, por orden del usuario) |
| V30 | 048 | sesión hermana | 2026-10-19 | «Chef y experiencias»: hook · HK01 · MD03 · CT03 · RC10 · *Einaudi Fly* |
| V31 | 049 | sesión hermana | 2026-10-19 | «Amenidades»: RC04 · HK03 · MD05 · CT01 · RC19 · *In This Together* |
| V32 | 050 | sesión hermana | 2026-10-19 | «14,8»: hook · HK02 · MD04 · CT02 · RC02 (final) · *Spring is Coming* |

Cada versión viene en DOS formatos: el **orgánico** (`047-recorrido.mp4`, con subtítulos editoriales) y el **funnel** (`047-recorrido-ficha.mp4`, sin subtítulos y con `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` fijo en el tercio bajo del 1:1).

## Lo que lleva (rev. 2)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | **RC02** `Img 9463` 0,0-3,0 s (el principio: la isla de la cocina → el sofá y el ventanal, de día) | el reparto fijaba RC20 (hora azul); el usuario pidió que la **050** usara RC20, así que esta pieza abre con el principio de RC02 (la alternativa del propio reparto). Exclusiva de esta pieza |
| Hook | HK02 `IMG_4272` (voz 0,44-6,52 s) | asignada: sentada en el sillón de la terraza común. **Repetida en la 050** |
| Paseo por la unidad | RC16 0,4-5,4 s · RC11 0,8-4,0 s | la piscina y la Social Kitchen, donde espera Isabella (RC11 acaba en el 4,0 s: después sale gente) |
| Mitad | MD04 (0,54-4,12 s) + MD05 (0,585-3,54 s), **dos tomas** | asignadas, seguidas. MD04 lleva la ÚNICA cifra (`$14.800.000`). MD04 la repite la 050 y MD05, la 049 |
| Paseo por el apartamento | RC05 1,5-5,5 s · RC09 1,5-5,1 s | la alcoba (cama, cojines negros, lámpara) y el baño (lavamanos, planta, toallas) |
| Clímax | RC03 `Img 9464` 3,2-9,2 s | asignado: el balcón con las camas, **el jacuzzi privado al fondo (bien visible de 3,2 a 6,5 s)** y el giro hasta las torres y la ciudad. **Exclusivo de esta pieza** |
| CTA | CT03 `IMG_4298` ENTERA (voz 0,60-6,04 s) | asignada. **Repetida en la 048**. No es una acción: la tarjeta cierra |
| Canción | *Dreamlife* (`5e7dcd27`), entrada en 178,467 s | reservada. La meseta (202,2 s) cubre el apartamento y la caída (217,3 s) cae donde entra el CTA |
| Voz | −15 LUFS tratada (+17,3 · +18,4 · +18,4 · +17,4 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −16 → −15 → −14 LUFS por tramos; −26 bajo la voz; sigue la caída bajo el CTA | la canción CRECE de −16 a −10 y se recoge a +2 dB de subida total |
| Color | `COLOR_BASE` + el ajuste de cada plano | luma de los planos: 87-122 |
| Transiciones | **todas disolvencias** (12 f), salvo el frame 0 | la canción no tiene golpes de ≥ 12 dB donde cortar en seco (R33) |
| Recorridos | **anamórficos (SAR 81:256, DAR 9:16): `scale=1296:2304:flags=lanczos,setsar=1`, SIN recorte** | la rev. 0 los recortaba `crop=608:1080:656:0` (zoom ×3,2): pixelados. 608×1080 efectivos ×2,13: algo más blandos que Isabella en 4K |

## Lo medido (rev. 2; se completa con la prueba)

| Qué | Medida |
|---|---|
| Voz | −15,0 LUFS y pico −2,5 dBFS en cada WAV tratado (`probar-voz.py`); silencio fuera de su ventana |
| Música (fuente, ebur128) | apertura −15,9 · paseo −12,8 · meseta del apartamento −10,1 · en las ventanas de voz: hook −15,0, mitad −11,5 · caída: rms −12 → −18 dBFS entre 217,2 y 217,9 s |
| Subtítulos | 19 líneas a −0,5…+2,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Luma por plano (stills a escala 1) | sala 113-122 · hook 99 · piscina 110 · Social Kitchen 87 · MD04 87 · MD05 94 · alcoba 120 · baño 119 · balcón 107-117 · CTA 90 |

## Historia: la final de la rev. 1 (solo Isabella, 23,4 s; exportada el 2026-10-19 por orden del usuario con «aseo» sin oír: `recorrido-luxur` §7c)

| Qué | Medida |
|---|---|
| **Final (CRF 12 `slower`)** | `finales/047-recorrido.mp4`: 62,6 MB, 1080×1920, 702 f, H.264 (21,1 Mbps) + AAC 320 kbps (317), −15,2 LUFS, LRA 1,5 LU, pico −4,3 dBFS. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (702 fotogramas) y PCM del audio, idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 8 fotogramas): color medio ≤ 0,38 niveles, PSNR de baja frecuencia 49,3-52,5 dB (medio 51,1), bruto 42,7-44,0 dB |
| **Final (CRF 16 `slow`)** | `finales/047-recorrido-crf16.mp4`: 33,1 MB, misma imagen y mismo audio (PCM idéntico); `framemd5` idéntico antes/después de las etiquetas; color medio ≤ 0,38 niveles, PSNR de baja frecuencia 48,9-50,6 dB, bruto 41,5-42,0 dB (3 fotogramas) |
| `.srt` | `finales/047.srt`: 19 cues, 0,43-21,0 s (`exportar-srt.mjs`) |
| **Versión con ficha** | `finales/047-recorrido-ficha.mp4`: 65,3 MB, 702 f, el audio del final copiado tal cual. Base: render `--props={"sinSubtitulos":true} --muted --crf=6` (la mitad de arriba contra el final: PSNR 47,9 dB de media, mínimo 43,8). `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` desde el f0 hasta los 20,97 s; la tarjeta oscura empieza en los 21,37 s. Revisada con `ficha.mjs hoja` (`pruebas-720p/hoja-ficha.jpg`): ningún subtítulo, la ficha no tapa ninguna cara |
| Portada | `finales/047-portada.png` (receta en `portada.json`): fotograma de 16,6 s del render sin subtítulos (las escaleras con la fachada del edificio y ella pequeña; el más nítido de 16,0-17,2 s), `EL POBLADO` · `RENTA`; contraste 9,1:1 el texto y 6,2:1 el isotipo. **Excepción declarada de `portada-luxur` §3**: no hay un fotograma de solo la propiedad (la pieza son las tomas de Isabella) y el texto cae sobre ella |
| En el SSD | `…/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `047-recorrido.mp4` (orgánico, CRF 12), `047-recorrido-ficha.mp4` (funnel), `047-portada.png` y `047-caption.md` (sha256 idénticos a los de `finales/`). El CRF 16 y el `.srt` se quedan en `proyectos/047/finales/` |

## Cómo cambiar cada pieza

- **Quitar los recorridos otra vez** (rev. 1, solo Isabella): `git show 4f0ecf4:remotion/src/proyectos/047/metraje-047.ts` y `audio-047.ts`/`subtitulos-047.ts` de ese commit (702 f, abre con el hook, música como lecho). **Otro tramo o clip de recorrido:** el `desde` del corte, y si el clip es nuevo su fila de `MATERIAL` en `normalizar.mjs` (con su sha; se escala entero, `setsar=1`): antes, `ffprobe` del SAR.
- **Quitar un aseo / cambiar el hook:** `voz` del corte `c02-hook` (`dice`, `s0`, `s1`), `voz/hk02.txt` y los trozos `h01`/`h02` de `subtitulos-047.ts`; si «aseo» no es «aseo», también `caption.md`.
- **Otra cifra o sin cifra:** el trozo `m01` de `subtitulos-047.ts` (y su `{catorce millones ochocientos}` en `voz/md04.txt`); la puerta (2a) pide UNA cifra, en MD04.
- **Solo una mitad:** quitar `c06-mitad-amenidades` (o `c05-mitad-precio`) y subir los `en` siguientes; `INICIO_MUSICA` (la caída tiene que caer en `P.cta`) y los subtítulos de ese bloque.
- **Otra canción** (la alternativa reservada es *Softly*): reservarla en el registro; `medir-pista.py --json`; `INICIO_MUSICA`, `CAIDA_CANCION`, `LUFS_CANCION_EN_VOZ`, `DB_LECHO` y la tabla `CAIDA` de `audio-047.ts`/`metraje-047.ts`; la puerta (sección 4) comprueba que la caída cae donde entra el CTA y la 4b, que la música queda ≥ 9 LU bajo la voz.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-047.ts`; las voces siguen a −15 LUFS.
- **La versión con ficha:** `npx remotion render … --props={"sinSubtitulos":true} --muted …` + `ficha.mjs video tierra-grata` (ver `ficha-luxur` §3).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto y la final se exportó con ella abierta por orden del usuario; la nota SE QUEDA): «**un aseo semanal**» (HK02, «aseo» hacia el f178 = 5,9 s del vídeo; el subtítulo «un aseo semanal» entra en el f169 = 5,6 s): whisper oye «as-e-o» con la «e» a p 0,24 y, en otras pasadas, «asesor». **Medido con `formantes.py` (5,70-6,50 s de la fuente):** tras la «a» (F1 733 / F2 1.779 Hz, 5,83 s) y la /s/ (valle de −46 dB a 5,90 s) hay una [e] (F1 ≈ 590, F2 ≈ 1.600-2.000 Hz, 5,94-6,12 s) y, SIN ninguna fricativa entre medias, una [o] (F1 ≈ 590, F2 ≈ 715 Hz, 6,13-6,16 s) antes del «se-ma-nal»: es a-se-o, no a-se-sor. Una medida no es un oído: si no es «aseo», cambia esta línea, la del caption y los trozos del `.srt`, y se vuelven a exportar las tres piezas (final, CRF 16 y ficha).
- Mirar con el usuario: que la pieza abre con el hook (excepción declarada) y dura 23,4 s, que la mitad son dos tomas, que hook y CTA se repiten en otra pieza, que ya no sale ninguna imagen de la propiedad sin Isabella (ni el jacuzzi), y la canción (medida, no oída; un lecho bajo la voz; licencia sin verificar).
