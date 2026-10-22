# Combinaciones — proyecto 057 · Apartamento en Palmazera (La Ceja), V39 («Que se respire paz»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la primera de las tres versiones de este apartamento que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V40 (058, «60 m² que rinden») y la V41 (059, «el estrés no viene solo del trabajo»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V39).

## Versiones de este apartamento

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V39** | **057** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 2 palabras sin oír), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/057-recorrido.mp4`) | 2026-10-22 | **«Que se respire paz»**: DR03 (el edificio) · **HK01** · RC11 · RC12 · **MD06** · RC04 · RC02 · DR01 (la vista) · **CT02** · ***Silver Skies Cinematic Piano*** · 1080 f · 36,0 s |
| V40 | 058 | en montaje (otra sesión) | 2026-10-22 | «60 m² que rinden»: HK02 · MD07 · CT01 · *Ivory Skyline Reverie* · drones DR04-DR06 |
| V41 | 059 | en montaje (otra sesión) | 2026-10-22 | «El estrés no viene solo del trabajo»: HK04 · MD09 · CT03 · *Light Fills the Room* · drones DR07-DR10 |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR03 4,00-6,40 s | el edificio de ladrillo de lado, entre el prado, las montañas y un cielo azul, a velocidad constante desde el f0 (movimiento 2,8 → 2,3) |
| Hook | HK01 `IMG_8709` (voz 0,92-4,22 s) | el ángulo: «¿Buscas un lugar donde realmente se respire paz? Este apartamento es eso.»; entra disolviendo, su primera palabra suena a los 13 f |
| Paseo (bloque 3) | RC11 0,30-4,00 · RC12 3,40-7,97 s | la calma, dos planos largos: el pasillo despejado hasta el rincón del gato (movimiento 1,4 → 4,5) → las flores, la taza, el sofá con su manta y el ventanal |
| Mitad | MD06 `IMG_8728` (voz 0,72-4,22 s) | «¿Cuándo fue la última vez que llegaste a casa y sentiste que de verdad descansaste?», sentada en el sofá que el plano anterior presenta |
| Bloque 5 | RC04 0,50-3,77 · RC02 7,00-10,27 · DR01 2,40-5,93 s | la cama hecha con la luz de la ventana → la cámara se acerca a la ventana y aparece la montaña → LA VISTA: el dron sobre los techos de La Ceja y las montañas (el plano más largo del bloque, 3,5 s) |
| CTA | CT02 `IMG_8726` (voz 0,76-3,76 s; el plano usa 0,40-4,23 s) | una acción: «Agenda tu visita y vive la experiencia de la tranquilidad en persona.», en el balcón |
| Canción | *Silver Skies Cinematic Piano* (`9c3a3dc3`) desde 48,767 s (`INICIO_MUSICA` = 1463/30) | su respiro cae bajo el hook, el acorde de 17,4 dB abre el paseo y su caída natural cae sobre el CTA; **repetida de la V25/042 (Lote en El Carmen), otra propiedad, declarada** |
| Voz | −15,0 LUFS tratada (+19,5 · +18,7 · +18,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −2,5 · −2,5 · −3,4 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (+1,7 · −0,9 · −1,2 dB sobre el archivo); ≈ −26 LUFS bajo la voz | ver `aprendizajes.md` §1 |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver abajo |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/057-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1080 f, 120 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/057-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 71 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster) |
| `finales/057.srt` | 15 cues, de 2,8 a 33,6 s |
| `finales/057-portada.png` + `portada.json` | portada 9:16: el fotograma de 1,2 s (DR03, el edificio de ladrillo entre el verde, el más nítido de la apertura), «LA CEJA» y `VENTA`; contraste del texto 11,0:1 y del isotipo 8,6:1 |
| `finales/057-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «APARTAMENTO EN VENTA · La Ceja · Palmazera · $ 429 M COP» en Montserrat en el tercio de abajo del 1:1; la ficha se va de 33,57 a 33,97 s, antes de la tarjeta; audio copiado del máster (el PCM coincide); la base muda (`sinSubtitulos`, CRF 6) coincide con el máster en la mitad de arriba (PSNR mínimo por fotograma 47,2 dB, media 52,7) y tiene los mismos 1080 fotogramas |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1080/1080 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 9 fotogramas): máster a ≤ 0,5 niveles de color medio (baja frecuencia ≥ 49,0 dB), CRF 16 a ≤ 0,7 (≥ 47,2 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio (ebur128 sobre la final, `medidas/audio-final.txt`): pieza −15,2 LUFS, pico −3,8 dBFS; voz + música en el hook −14,8, en la mitad −14,6, en el CTA −14,7; música sola −15,1 · −15,0 · −15,0; la tarjeta (34-36 s) en silencio (−70 LUFS). Render: ≈ 5 min el máster, 3 el CRF 16 y 3 la base de la ficha.

**Exportada con DOS palabras sin oír** (la puerta con `--final` falla solo por sus notas; las notas se quedan): «**de verdad**» (MD06, f545-547 = 18,2 s del vídeo) y «**vive**» (CT02, f943-945 = 31,4-31,5 s del vídeo); ver «Lo por confirmar». Si alguna suena distinto: el texto del trozo en `subtitulos-057.ts`, `voz/<toma>.txt`, el `dice` del plano en `metraje-057.ts`, el `.srt` (`exportar-srt.mjs`) y el caption (dice «vive la experiencia»); la versión con ficha no lleva texto de voz y no cambia; el texto va dentro de la imagen del máster, así que se vuelve a renderizar (≈ 5 min cada final) y se repiten las etiquetas de color.

## La rejilla (con piano: las disolvencias van libres; los cortes SECOS caen en un golpe medido de la canción, `musica/golpes-057.json`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`, `medidas/golpes-render-prueba.txt`) |
|---|---|---|---|---|
| 3 | c01 edificio | corte (el frame 0) | 48,816 · 9,8 | (entrada de la música) |
| 72 | c02 hook | disolvencia libre | — | — |
| 212 | c03 pasillo | corte seco | 55,772 · 17,4 | −0,2 f |
| 323 | c04 sala | corte seco | 59,467 · 8,2 | −0,3 f |
| 460 | c06 mitad | disolvencia que ACABA en un golpe (por limpieza) | 64,033 · 9,1 | — |
| 603 | c07 cama | disolvencia que ACABA en un golpe (por limpieza) | 68,817 · 7,2 | — |
| 701 | c08 ventana | disolvencia libre | — | — |
| 799 | c09 vista | corte seco | 75,333 · 8,0 | −0,4 f |
| 905 | c10 CTA | disolvencia libre | — | — |
| 1020 | c11 tarjeta | corte, donde acaba la toma | (la música ya está apagada; el acorde de 19,5 dB de los 82,727 s suena en el f1020) | — |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Audio del render (ebur128, `medidas/audio-prueba.txt`) | pieza −15,2 LUFS integrado, pico −3,8 dBFS: sin saturar · voz + música: hook −14,8 · mitad −14,6 · CTA −14,7 LUFS · música sola: apertura −15,1 · paseo −15,0 · bloque 5 −15,0 LUFS |
| Música bajo la voz (puerta, sobre el plan) | ≈ −25,8 · −25,5 · −25,2 LUFS: 10,2 LU bajo la voz como mínimo |
| Subtítulos | 15 líneas a −0,4…+2,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`) |
| Legibilidad (R25, `legibilidad.py`) | con el velo de la 056 (`borde` 0,68 · `medio` 0,44) el contraste al p90 es 3,9-5,5 : 1 y 2,9-4,1 al p99 (017: 2,9-3,7; 056: 3,4-6,1): no hizo falta tocarlo (`medidas/legibilidad.txt`) |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 11,6 → 9,8 · quemado máx 3,1 → 1,6 % (el cielo de DR03 pasó de 13,0 a 0,0 % tras bajarle exposición y luces) · aplastado máx 7,4 → 7,7 % (el negro de su ropa) · saturación media 0,255 → 0,278 · piel: tono 15,1° → 14,7° (hook), 357,8° → 356,0° (mitad), 9,1° → 8,7° (CTA) (`medidas/medir-color-rev0.txt` es la primera tanda, sin los ajustes de exposición) |
| Saltos de luma en los cortes secos | hook → pasillo −28,6 (de la esquina de la tele, pared blanca, al pasillo: contenido, en el acorde de 17,4 dB) · pasillo → sala +6,8 · ventana → vista +36,6 (de la ventana con la malla, interior en sombra, al cielo del dron: es el «se abre», en el golpe de 8,0 dB) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1019 (la puerta) |

## Metraje compartido con las otras versiones del apartamento (declarado)

- **Con la 058 (V40) y la 059 (V41):** ni un segundo (la puerta, sección 7b, lo comprueba contra sus planes de hoy). Lo acordado en las notas de la carpeta de las sesiones: la 058 se queda la cocina (RC01, RC06, RC07, RC14), los baños (RC19-RC23) y el clóset (RC26); la 059, la alcoba 2 con el escritorio (RC24, RC28), RC09 (0,30-3,23 s), RC10 (1,60-4,50 s) y RC13 (0,00-2,57 s). Esta pieza usa RC11, RC12, RC04 y RC02.
- **Aéreo:** DR01 y DR03 (reparto); DR02 queda libre y sin usar; DR04-DR10, de las otras dos.
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del apartamento (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan: HK03 `IMG_8714` gemela de HK02; MD01-MD05, MD08, MD10-MD14; **no hay CTA de repuesto**): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` antes de fiarte de `limites-voz.py`), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: los cortes secos van a otro golpe de `GOLPE` y la envolvente de la música (`MOMENTANEA` de `audio-057.ts`) se recalcula.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 29 34` y `medir-pista.py … --json musica/golpes-057.json`; `INICIO_MUSICA`, la tabla `GOLPE` de `metraje-057.ts`, los niveles de `audio-057.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `MOMENTANEA`, `BAJO_MITAD_DB`; `lufs-rangos.py` y la sonoridad momentánea) y `FIN_MUSICA_057`, `DECAE` y `GOLPE_QUE_SE_EVITA`.
- **Otro plano de recorrido:** mira su hoja de contactos y el movimiento (`perfil-mov.py`) antes; los 28 recorridos y los tres drones están normalizados en `remotion/public/recorrido-057/`. Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-057.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido057` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/057/ficha.json …` (la ficha de esta propiedad está en `proyectos/057/ficha.json`).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**de verdad**» (MD06, f545-547 = 18,2 s del vídeo; en la toma, 3,31-3,76 s): whisper small se come el «de» y escribe «sentiste que verdad descansaste». Se pinta «de verdad» (gramática y encargo). Medido (`envolvente-voz.py` a 10 ms y `formantes.py` a 10 ms, `medidas/formantes-de-verdad.txt`): tras el «que» (3,17-3,22 s) hay 60 ms casi en silencio (−48 dB) y luego un tramo seguido de 0,18 s (3,31-3,49 s) con una sola vocal /e/ (F1 sube sin hundirse de 470 a 596 Hz, F2 ≈ 2.000-2.100) y la energía plana (−21,4 → −19,8 dB), sin el escalón de una sílaba átona «de» seguida de «ve»; luego la /r/ y el cierre de la /d/ de «dad» (3,55-3,60 s) y «dad» (3,62-3,77 s). Es compatible con «de» reducido y pegado a «ver» y con «ver» sola: **la medida no cierra la palabra; se oye.**
  - «**vive**» (CT02, f943 = 31,4 s del vídeo; en la toma, 1,72-2,01 s): whisper small oye «y ve la experiencia» (dos transcripciones). Se pinta «vive» (el encargo y el catálogo lo dan así). Medido: dos picos de energía (1,815 y 1,975 s), que favorecen «y ve la»; y dos fotogramas de /i/ separados por tramos de /b/ aproximante y luego la /e/, que favorecen «y vi-ve». **La medida no cierra la palabra: se oye.**
- La canción (medida, no oída; piano; licencia sin verificar; repetida de la V25).
- Lo que ella hace en el CTA: entra al encuadre mientras dice «Agenda tu visita» y, tras «de la tranquilidad en persona», la cámara gira al prado y ella sale (la toma es así); en la mitad ella entra a sentarse mientras dice «¿Cuándo fue la…» (su cara no se ve hasta ≈ f485).
- Por dónde se escribe («agenda tu visita»: mensaje directo, WhatsApp o agenda) y si el caption lleva el número de WhatsApp.
