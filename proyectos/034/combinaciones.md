# Combinaciones — proyecto 034 · Lote en El Carmen de Viboral (Mia), V18

Registro de esta versión y mapa de «cómo cambiar cada pieza». La V14 (030) y la V15 (031) viven SIN commit en los worktrees `organize-el-carmen-videos-…` y `reel-v15-el-carmen-…`; lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1 y §6), el tablero de coordinación entre sesiones. El encargo pedía V17/033; la sesión de Casa Campestre ya lo usaba y el usuario decidió V18/034 (la rama y el worktree conservan el nombre `reel-v17-el-carmen`).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V14 | 030 | final (CRF 12 + CRF 16 + `.srt`) | 2026-10-08 | «Seguridad sin encierro»: DR97 · HK04 · DR96 · RC01 · DR98 · MD02 · DR99 · RC04 · DR109 · CT01 · *Becoming* |
| V15 | 031 | final (2026-10-09, en su worktree) | 2026-10-08 | «Construir aquí»: DR107 · HK06 · DR103 · RC05 · DR101 · MD04 · RC02 · DR106 · DR107 · CT04 · *Somewhere inside of me* |
| **V18** | **034** | **final** (CRF 12 + CRF 16 + `.srt`) | 2026-10-09 | «Tu lugar en el campo»: DR98 · **HK03** · DR99 · DR105 · DR101 · **MD03** · DR96 · DR99 · RC01 · **CT03 recortado** · *Chillin' (Chillstep Mix)* · 970 f · 32,3 s · ni un segundo de metraje compartido con la V14 ni con la V15 (comparte clips en otros segundos, declarado) · prueba rev. 0: `pruebas-720p/034-recorrido.mp4` (540×960, BT.709) + `hoja.jpg` + `panel-antes-despues.jpg` + `zoom-100.jpg` |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook | HK03 `IMG_1592` | el anhelo («donde la naturaleza sea parte de tu casa») sin cifras ni el argumento de las versiones anteriores |
| Mitad | MD03 `IMG_1600` | cierra la búsqueda («acabas de encontrarlo») |
| CTA | CT03 `IMG_1604`, RECORTADO a «y agendemos una visita» | otra acción (la visita); el hueco tras «botón» medido (0,1 s a −65 dB) |
| Canción | *Chill Music – F.G.G. – Chillin' (Chillstep Mix)* (`6c9eb412`) | de las 27 libres, la única de género apto con rejilla para estas tomas; su caída (294,5 s) cae 2 f tras la última palabra |
| Entrada de la canción | 264,933 s (`INICIO_MUSICA` = 7948/30) | golpe de 15,8 dB en el f3 |
| Apertura | DR98 7,10-10,43 s | las palmas, la cabaña y las terrazas con la luz de la tarde (excepción declarada: gana velocidad poco a poco, dispersión 0,10) |
| Paseo | DR99 8,10-11,27 · DR105 17,30-19,17 (9:16 en 0,5) · DR101 13,90-16,50 (9:16 en 0,35) | los árboles → la ladera → la cabaña · los eucaliptos · la palma y las terrazas |
| Bloque 5 | DR96 18,60-20,57 · DR99 12,20-14,50 · RC01 6,17-8,60 | el lote entero con su horizonte · la cabaña entre el pino y las palmas · la vista a pie (el plano más largo) |
| Voz | −15 LUFS tratada (+19,2 · +19,3 · +18,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido: «la voz de Isabella a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (paseo +2,5 dB, bloque 5 −0,4 dB); la apertura −0,8 dB (−17,8 LUFS: la canción llega a 0 dBFS en su primer golpe); −26 LUFS bajo la voz | pedido del canal; la apertura no se sube por encima de 0 dBFS |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver «El color» abajo |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 9 que caen en un golpe, a −0,4…+0,3 f en el AAC de la prueba, de 9,0 a 21,0 dB (`golpes-render.py`); en el WAV del render salen 1,0-2,2 f antes porque el plan compensa los 42 ms con los que el AAC de Remotion llega tarde · el de apertura es la entrada de la música desde el silencio |
| Voz | −14,7 · −14,7 · −14,7 LUFS en sus ventanas del render (con la música a −26 debajo), picos −3,4 · −3,9 · −6,6 dBFS |
| Música sola | −18,1 (apertura, medida desde 0,1 s) · −15,0 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,4 LUFS integrado, pico −0,5 dBFS (en el AAC): sin saturar |
| Subtítulos | 13 líneas a +0,7…+1,8 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py`, antes → después) | σ de luma entre planos 11,5 → 8,2 · quemado máx. 4,4 → 0,0 % (el cielo de DR96) · saturación media 0,276 → 0,325 (σ 0,113 → 0,090) · piel: tono 9,2° → 9,0° (HK03) y 7,9° → 7,5° (CT03) · el salto más grande, eucaliptos → terrazas, +47 → +31 (es el contenido: la hilera de árboles oscura contra la ladera clara) · al 100 % (`zoom-100.jpg`) ni moteado ni bandas |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f909 (la puerta) |

## Lo exportado (2026-10-09, «renderiza la final en buena calidad»)

| Archivo | Qué es |
|---|---|
| `finales/034-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 970 f, 186 MB, BT.709 etiquetado |
| `finales/034-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 109 MB; la misma imagen y el mismo audio |
| `finales/034.srt` | 13 cues, de 3,6 a 29,6 s |

Mismas banderas que la prueba (`--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`); etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`: VUI 1/1/1 y átomo `colr`), con el `framemd5` decodificado (970/970 fotogramas) y el md5 del PCM iguales antes y después. Color medido con `herramientas/medir-final.py` contra stills a escala 1 (`pruebas-720p/stills-final`): máster a ≤ 0,34 niveles (baja frecuencia ≥ 48,5 dB), CRF 16 a ≤ 0,81 (≥ 45,0 dB); 0 fotogramas fuera de tolerancia. Audio (ebur128 sobre la final): voces −14,8 · −14,7 · −14,7 LUFS, música sola −15,0 (paseo y bloque 5) y −17,9 (apertura), pieza −15,4 LUFS, pico −0,5 dBFS. Golpes en el máster a −0,4…+0,3 f de su corte (9,0-21,0 dB). Negro exacto (luma máx. 16) en el f909, el último de Isabella.

**Exportada con DOS palabras sin oír** (la puerta con `--final` falla solo por ellas; la nota se queda): «vente, **te** muestro» (≈ 7,7-8,0 s) y «**acabas** de encontrarlo» (≈ 19,9 s). Si alguna suena distinto: el texto del trozo en `subtitulos-034.ts` (`h04`, `m03`), `voz/<toma>.txt`, el `dice` del plan y el `.srt` (`exportar-srt.mjs`); el texto va dentro de la imagen, así que hay que volver a renderizar las dos (≈ 2 min el máster + 2 la ligera en esta máquina) y repetir las etiquetas de color.

## Cómo cambiar cada pieza

- **Otro hook / otra mitad / otro CTA** (libres que quedan: HK01, HK02, MD01, MD05, MD06, CT02; todas con su WAV crudo ya en `remotion/public/recorrido-034/` y su transcripción en `voz/`): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (perfil de energía; `envolvente-voz.py`), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `herramientas/lineas-vs-onsets.py`). Cambia la duración del plano y con ella la rejilla: `buscar-cortes-lp.py` con `R='[[80,100],[150,171],[55,95],[55,85],[55,90],[140,171],[45,72],[45,70],[56,85]]' TIPOS=dccccccccc W=3.5 ORDEN=golpe` (el 2.º par es el hook, el 6.º la mitad) y después `ventana-fina.py` de cada dron a la duración que salga.
- **El CTA entero** (con «Haz clic en el botón»): `VENTANA_VOZ.ct03` desde 0,13 s y `desde` del corte ≈ 0; la sección 2e de la puerta lo prohíbe a propósito (en un reel no hay botón).
- **Otra canción:** reservarla en el registro; `buscar-cortes-lp.py` con la `R` de arriba; `medir-pista.py … --json musica/golpes-034.json`; los `GOLPE` de `metraje-034.ts`, `INICIO_MUSICA`, `DECAE` (`lufs-caida.py`) y los niveles de `audio-034.ts` (`LUFS_TRAMO`, `PICO_APERTURA`, `LUFS_CANCION_EN_VOZ`, `LUFS_MESETA`; ebur128 en los tramos de la tabla de `artefactos/03-timeline.md`). Con estas tomas no hay otra libre de género apto que dé rejilla (`musica/buscar-cortes-planos2.txt`).
- **Otro plano de dron:** medir su movimiento ANTES (`movimiento.py`, `ventana-fina.py <clip> <a> <b> <N>`: dispersión < 0,09, pendiente ≈ 0, máximo < 1,2×; para un paneo o una subida al cielo, `flujo.py`). Un apaisado necesita su recorte 9:16 en `MATERIAL`. Todos los drones del rodaje están normalizados (o clonados de los proyectos 030 y 031) en `remotion/public/recorrido-034/`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (sus tablas son las de esta pieza).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-034.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «vente, **te** muestro» (HK03, ≈ 7,7-8,0 s del vídeo: whisper oye «vente maestro» / «veinte muestros») y «**acabas** de encontrarlo» (MD03, ≈ 19,9 s: whisper duda y en la banda de las /s/ no hay fricativa; suena casi «acaba de»).
- Si 1,2 s de voz bastan como CTA; por dónde se agenda la visita (el caption propone mensaje directo).
- El primer plano del paseo (DR99, 8,9-12,1 s) enseña en su mitad baja la ladera seca con tierra roja, en oblicuo y con los árboles arriba; si se lee como «textura», el cambio es otro dron a 95 f.
- La canción (medida, no oída; chillstep) y su licencia.
