# Combinaciones — proyecto 055 · Casa en Condominio Los Bravos (La Ceja), V37 («Las mañanas»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las otras dos versiones de la casa se montan a la vez en sesiones propias sobre el mismo checkout: la V36 / 054 («privacidad») y la V38 / 056 («solo 6 casas»). El reparto de la terna, de la aérea y de la canción es `proyectos/054/reparto-054-062.md`, que manda.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V36 | 054 | en montaje (otra sesión) | 2026-10-22 | «Privacidad»: HK01 · MD04 · CT06 · *Luxury, Elegance, Refined* · aérea: primer tercio del dron largo |
| **V37** | **055** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 2 palabras sin oír) | 2026-10-22 | **«Las mañanas»**: DR(82,0-85,1 s) · **HK02** · RC22 · RC23 · RC24 · **MD03** · RC20 · RC01 · RC19 · RC09 · **CT03** · *Spring is Coming* · 1201 f · 40,0 s · prueba: `pruebas-720p/055-recorrido.mp4` (540×960, BT.709) + `hoja.png`; el usuario la aprobó tal cual |
| V38 | 056 | en montaje (otra sesión) | 2026-10-22 | «Solo 6 casas»: HK04 · MD02 · CT01 · *Heaven on Earth* · aérea: `varias_tomas.MP4` tras el corte de los 86 s |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Aérea | `DJI_20260330163940_0070_D.MP4`, 82,0-85,1 s (último tercio: 68-103 s) | la casa de lado con su seto en V, su piedra y su teja; velocidad estable (dispersión 0,17); frame 0 limpio |
| Hook | HK02 `IMG_8822` (voz 0,675-4,85 s) | el ángulo: «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.»; la cámara se va al césped y al cielo al decir «aire puro» |
| Recorrido 1 | RC22 2,6-6,67 · RC23 3,0-5,7 · RC24 1,2-3,9 s | el sendero con el sol y la llegada a la pérgola → el sol bajo la pérgola y el jardín → la casa blanca al fondo del césped |
| Mitad | MD03 `IMG_8819` (voz 1,785-4,25 s; el plano usa 1,53-6,63 s) | «No es solo una casa, es una declaración de estilo.»: Isabella abre la puerta y entra; la cámara recorre la sala |
| Recorrido 2 | RC20 3,03-5,66 · RC01 1,2-3,6 · RC19 1,5-4,37 · RC09 4,4-8,13 s | la cafetera → la escalera y la doble altura → la puerta de una alcoba con sol → de la alcoba al balcón y al cielo (la vista, el plano más largo del bloque: 3,73 s) |
| CTA | CT03 `IMG_8914` (voz 0,425-2,95 s; el plano usa 0,17-3,40 s) | «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!» · UNA acción |
| Canción | *Spring is Coming* (`fe252090`) desde 0,333 s (`INICIO_MUSICA` = 10/30; su primera nota sube a los 0,355 s) | la reservada del reparto (repetida de otra propiedad, autorizada por el usuario el 2026-10-21); medida, no oída |
| Cortes | 10 secos, todos sobre un golpe medido (10,2-27,4 dB) | la canción tiene golpes pero **ningún pulso fijo**: se corta a los medidos |
| Voz | −15 LUFS tratada (+18,0 · +19,0 · +19,2 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−0,9 · −1,1 · 0 dB); bajo la voz, −26 LUFS (11 LU bajo ella) | pedido permanente del canal; partida en 3 trozos de la misma canción (límite de ffmpeg) |
| Color | `COLOR_BASE` (contraste 1,10) + el ajuste de cada plano (medido): exposiciones de −0,4 a +0,4 para que ningún corte salte más de 12 niveles de luma | ver `aprendizajes.md` §3 |

## Metraje compartido con las otras dos versiones (declarado; la puerta, §7b, lo mide)

- **Exclusivos de esta versión**: HK02, MD03, CT03 y la aérea (82,0-85,1 s del dron largo, dentro del último tercio). La puerta falla si otra versión usa el mismo hook, mitad o CTA.
- **Recorridos que otra versión también usa, en OTRO tramo** (a 2026-10-22 08:55, con los planos que entonces tenían 054 y 056): RC22 (054: 0,0-2,6 s) · RC24 (054: 3,9-7,7 s) · RC01 (054: 3,7-5,23 s) · RC20 (056: 0,1-3,03 s). **Ningún fotograma en común** con ninguna de las dos. El 054 usó antes RC07 en el mismo tramo que yo (RC07 0,8-3,0 s): lo sustituí por RC19 (la puerta de otra alcoba, con sol); el plan decía RC04 (el ventanal del comedor) para la escalera y salió repetido de MD03 (mismo ventanal 4 s después): lo sustituí por RC01.
- Si 054 o 056 mueven un tramo después, la puerta lo informa al volver a pasarla.

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba rev. 0)

| Archivo | Qué es |
|---|---|
| `finales/055-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1201 f, 133,7 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`) |
| `finales/055-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 78,2 MB; la misma imagen y el mismo audio (PCM idéntico) |
| `finales/055.srt` | 13 cues, de 3,3 a 37,8 s |
| `finales/055-portada.png` + `portada.json` | portada 9:16: el fotograma de los 16,2 s (la casa blanca con su pérgola al fondo del césped, bajo un cielo de nubes), «LA CEJA» y `VENTA` (la ficha lo dice); contraste del texto 7,4:1 y del isotipo 9,8:1 |
| `finales/055-recorrido-ficha.mp4` | versión con ficha, SIN subtítulos: «CASA EN VENTA · La Ceja · Condominio Los Bravos · $ 1.380 M COP» abajo del 1:1 hasta 0,4 s antes de la tarjeta (lugar bajado de 54 a 50 px para caber en 840 px); 140 MB; el audio es el AAC del final copiado tal cual y la mitad de arriba del vídeo coincide con el final a 46,9 dB (PSNR); datos en `.claude/skills/ficha-luxur/propiedades/casa-los-bravos.json` |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas de los dos finales: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1201/1201 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 11 fotogramas): máster a ≤ 0,77 niveles (baja frecuencia ≥ 47,5 dB), CRF 16 a ≤ 0,97 (≥ 46,0 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final.txt`). Audio (ebur128 sobre el final, `medidas/audio-final.txt`): voces −14,8 · −14,7 · −14,9 LUFS, pieza −15,5 LUFS, pico −1,3 dBFS. Render: ≈ 6 min el máster y ≈ 4 min el CRF 16.

**Exportada con DOS palabras sin oír** (la puerta con `--final` falla solo por sus notas; la nota se queda): «**antioqueño**» (HK02, f193-226 = 6,4-7,5 s del vídeo) y «**hablemos**» (CT03, f1115 = 37,2 s). Medidas con `formantes.py` y declaradas abajo; el usuario ordenó exportar con ellas abiertas.

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre el golpe (`golpes-render.py` sobre el AAC de la prueba) | los 10 a −0,4…+0,5 f de su golpe, de 10,1 a 28,5 dB (`medidas/golpes-render-prueba.txt`) |
| Voz (ebur128 sobre la prueba, con la música debajo) | −14,8 (hook) · −14,7 (mitad) · −14,9 (CTA) LUFS; picos −5,4 · −4,8 · −5,4 dBFS |
| Música sola | −15,2 (aérea) · −15,0 (recorrido 1) · −15,6 (recorrido 2) LUFS |
| Pieza | −15,5 LUFS integrado, LRA 3,6 LU, pico −1,3 dBFS: sin saturar |
| Tarjeta del cierre | silencio digital desde la última palabra del CTA |
| Subtítulos | 13 líneas a −0,5…+3,0 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`) |
| Contraste del texto (R25, `legibilidad.py`, velo subido a borde 0,72) | p90 3,9-7,1 : 1 · p99 1,6-5,7 : 1 (el 017: 2,9-3,7 / 2,6-3,0); sin el velo subido el hook daba 2,7 : 1 sobre la grava |
| Color (luma media por fotograma de empalme) | saltos de −12, −7, −12, +6, −2, 0, +8, +6, +10, +7 en los 10 cortes (`medidas/luma-final-prueba.txt`) |

## Por confirmar al oído (R31)

La puerta con `--final` falla SOLO por estas dos notas y la nota se queda aunque se exporte:

- «**antioqueño**» (HK02, f193-226 = 6,4-7,5 s del vídeo): whisper-small oye «entrequeño» (confianza 0,16 en «que»); cortando la toma en 3,815 s oye «Antequeño». Formantes (`formantes.py`, misma toma): la 1.ª vocal de la palabra mide F1 ≈ 595 y F2 ≈ 1.900-1.960 Hz (su /a/ de «aire» y «espacio»: F1 ≈ 700-820; su /e/ de «es-tilo»: F1 ≈ 460-530): ni /a/ clara ni /e/ clara; tras la «t» hay UNA vocal corta de F2 ≈ 1.850-1.990 Hz, sin la caída hacia /o/ (F2 ≈ 900) que pediría «tio». **No confirman «antioqueño»**: si algo, se parecen más a «en-tre-». Se pinta «antioqueño» porque es el gentilicio de la región, la frase del catálogo y lo que oye whisper cortando en 3,815 s («Antequeño»); si al oído suena «entrequeño», hay que cambiarlo (y el hook entero).
- «**hablemos**» (CT03, f1115 = 37,2 s): whisper-small oye «hablimos» en todos los cortes; la vocal tras la «l» mide F1 ≈ 380 y F2 ≈ 1.890-2.030 Hz, más cerca de su /e/ de «es-tilo» (F2 ≈ 1.760-1.975) que de su /i/ de «ti-lo» (F2 ≈ 2.340-2.390): una [e]. Se pinta «hablemos».

Si alguna suena distinto: el texto del trozo en `subtitulos-055.ts` (`h02`, `c02`), `voz/<toma>.txt`, el `dice` del plan, el `.srt` (`exportar-srt.mjs`), el caption y (en `antioqueño`) la frase del hook; el texto va dentro de la imagen, así que se vuelve a renderizar (≈ 9 min cada final) y se repiten las etiquetas de color.

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan, `reparto`: HK03 `IMG_8823` entra cortada · MD01 `IMG_8817` · CT02/CT04/CT05/CT07/CT08): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ`, la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve `P` de `metraje-055.ts`, las líneas de `subtitulos-055.ts` y los puntos de `audio-055.ts`; el cambio de plano de la toma nueva tiene que caer en un golpe (`GOLPE`).
- **Otro recorrido**: añadir el clip a `MATERIAL` (con su sha del catálogo), tramo con `desde`, exposición medida con `stills-multiples.mjs` y `luma` por frame (salto ≤ 12 a cada lado) y su `reason`; la puerta (§7b) dice si se pisa con otra versión.
- **Otra aérea**: tramo del último tercio del dron largo: `DRON` de `revisar-055.mjs` lo comprueba; el archivo normalizado `dr70.mp4` es 68,0-103,3 s (1001/1000).
- **Otra canción**: `MUSICA` de `normalizar.mjs`, `INICIO_MUSICA` y `GOLPE` de `metraje-055.ts` (los 11 cortes caen en los golpes de ESA canción: se rehacen), `LUFS_TRAMO`/`PICO_TRAMO`/`LUFS_CANCION_EN_VOZ` de `audio-055.ts` y `musica/golpes-055.json` (`medir-pista.py --json`).
- **Sin música en el render** (para publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-055.ts`.
