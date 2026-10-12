# Combinaciones — proyecto 030 · Lote en El Carmen de Viboral (Mia)

Registro de versiones de este reel y mapa de «cómo cambiar cada pieza». Lo que ya usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1 y §6), que es el tablero de coordinación entre sesiones.

## Versiones

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | **final** (CRF 12 + CRF 16 + `.srt`) | 2026-10-08 | Primer reel de la propiedad: DR97 · **HK04** · DR96 · RC01 · DR98 · **MD02** · DR99 · RC04 · DR109 · **CT01** · *Becoming* (Judah Earl) · 1160 f · 38,7 s · la rev. 0 (con DR97 6,0-9,33 s de apertura y DR97 38,5-40,87 s en el 0:24) queda en `pruebas-720p/030-recorrido-rev0.mp4` |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK04 `IMG_1593` | tensión seguridad / encierro; habla del cliente |
| Mitad | MD02 `IMG_1599` | el dato de la ficha (dos accesos) y la respuesta al hook |
| CTA | CT01 `IMG_1602` | UNA acción de una palabra («lote»); más aire que su doble CT02 |
| Canción | *Becoming I Judah Earl* (`fc80918e`) | libre; 72 rejillas; golpes de 8,3-25,9 dB; la caída (164,0 s) cae dentro del CTA |
| Entrada de la canción | 128,144 s (INICIO_MUSICA 128,1 s) | golpe de 15,0 dB en el f3 |
| Apertura | DR97, 10,70-14,03 s | vuelo hacia delante a velocidad constante sobre la casa, la cabaña y las palmas (la rev. 0 usaba 6,0-9,33 s, que acelera a los 7 s) |
| Paseo | DR96 6,5-8,83 · RC01 1,8-6,17 · DR98 13,0-16,33 | explanada → loma a pie → taludes |
| Bloque 5 | DR99 18,40-20,77 · RC04 0,0-2,33 · DR109 28,0-32,67 | camino entre palmas (la parcelación) → portón → la vista (la rev. 0 usaba DR97 38,5-40,87 s en el 0:24: tirón, parada y otro tirón) |
| Voz | −15 LUFS tratada (+19,0 · +19,4 · +17,6 dB) | pedido: «sube la voz sin saturar» |
| Música sola | −17,5 LUFS por tramos (+6,0 · +2,9 · +3,1 dB); −26 LUFS bajo la voz | la pista es baja; a −15 pasaría de 0 dBFS |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | «al final coloriza»; quemado máx. 1,3 %, σ de luma ≈ 5-6 |

## Cómo cambiar cada pieza

- **Otro hook / otra mitad / otro CTA** (`HK01-03, 05-07`, `MD01, 03-06`, `CT02-04`): copia la toma a `proyectos/030/original/`, añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ`; la ganancia sale de `herramientas/probar-voz.py` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt` y los trozos con `trozos-editoriales.mjs` **con los inicios medidos por `onsets-voz.py`** (el DTW va 3-16 f tarde en mitad de frase). La duración del plano cambia y con ella TODA la rejilla (`buscar-cortes-lp.py`, `R` y `TIPOS` en el encabezado de `proyectos/030/musica/rejilla-becoming-72.txt`): una toma más larga que 160 f (hook) o 138 f (mitad) no cabe en estos cortes.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 28 34` y `buscar-cortes-lp.py` (la estructura del canal: `R='[[75,105],[150,170],[60,130],[60,130],[60,120],[135,165],[50,110],[50,110],[96,140]]' TIPOS=dccccccccc W=3.5`); `medir-pista.py … --json musica/golpes-030.json`; los `GOLPE` de `metraje-030.ts`, `INICIO_MUSICA`, `DECAE` y los niveles de `audio-030.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`, `OBJETIVO_MUSICA`; ojo: `revisaAudio` tope +6 dB de ganancia).
- **Intercambiar las dos entradas** (si el portón es la de la parcelación): intercambiar `c07-palmas` y `c08-porton` (clip, `desde`, `reason`) y la nota de «lectura del paseo» de `metraje-030.ts`.
- **Otra vista:** `c09-vista` con DR108 (la misma subida a la montaña, 34,3 s; el final, hacia 30-34 s) o DR103/DR107 (apaisados: hace falta recortar a 9:16, que `normalizar.mjs` no hace).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (sus tablas son las de esta pieza).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-030.ts`; las voces siguen a −15 LUFS.

## Lo exportado (2026-10-08)

| Archivo | Qué es |
|---|---|
| `finales/030-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 225 MB (46 Mb/s), BT.709 etiquetado |
| `finales/030-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 127 MB; la misma imagen y el mismo audio |
| `finales/030.srt` | 15 cues, de 3,6 a 36,3 s |

Mismas banderas que la prueba (`--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`); etiquetas de color arregladas sin pérdida (`h264_metadata` + `+write_colr`), con el md5 de la imagen decodificada y del PCM iguales antes y después. Color medido con `herramientas/medir-final.py` contra stills a escala 1 (máster ≤ 0,35 niveles; CRF 16 ≤ 0,62). Audio: voces −14,8 · −14,7 · −14,7 LUFS, pieza −16,1 LUFS, pico −0,41 dBFS.

## Lo por confirmar

- **Exportada con estas tres sin oír** (cerradas por medida; la puerta con `--final` falla solo por ellas): «vía veredal» (MD02, ≈ 22,4 s del vídeo), «escríbeme» (CT01, ≈ 34,0 s), «sentirse» (HK04, ≈ 6,4 s). Si alguna suena distinto: el texto del trozo en `subtitulos-030.ts` (`m02`, `c01`, `h02`), `voz/<toma>.txt`, el `dice` del corte y el `.srt` (`exportar-srt.mjs`); el texto va dentro de la imagen, así que hay que volver a renderizar (≈ 6 min el máster + 3 la ligera) y repetir las etiquetas de color.
- La lectura de las dos entradas (c07 y c08).
- La canción (medida, no oída) y su licencia; el canal del CTA («escríbeme lote»: ¿por comentario o por mensaje?).
