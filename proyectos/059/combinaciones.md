# Combinaciones — proyecto 059 · Apartamento en Palmazera (La Ceja), V41 («El estrés no viene solo del trabajo»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la tercera de las tres versiones de este apartamento que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V39 (057, «que se respire paz») y la V40 (058, «60 m² que rinden»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V41).

## Versiones de este apartamento

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V39 | 057 | en montaje (otra sesión) | 2026-10-21 | «Que se respire paz»: HK01 · MD06 · CT02 · *Silver Skies Cinematic Piano* · DR01-DR03 |
| V40 | 058 | en montaje (otra sesión) | 2026-10-21 | «60 m² que rinden»: HK02 · MD07 · CT01 · *Ivory Skyline Reverie* · DR04-DR06 |
| **V41** | **059** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 5 palabras sin oír, medidas y declaradas), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/059-recorrido.mp4`) | 2026-10-22 | **«El estrés no viene solo del trabajo»**: DR09 (el edificio) · **HK04** · RC09 · RC10 · RC13 · **MD09** · RC24 · RC28 · DR10 (la vista) · **CT03** · ***Light Fills the Room*** · 1115 f · 37,2 s |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR09 3,20-6,07 s | el edificio de ladrillo con sus tejas desde arriba, el dron avanzando en diagonal sobre el prado (movimiento 10,9, dispersión 0,079); su frame 0 ya enseña el edificio (el tramo más uniforme, 1,9 s, era casi todo prado) |
| Hook | HK04 `IMG_8734` (voz 0,78-4,55 s) | el giro del ángulo: «Sabes que el estrés a veces no viene solo del trabajo, a veces viene de donde vives»; entra disolviendo, su primera palabra suena a los 11,4 f del golpe de 31,7 dB |
| Paseo (bloque 3) | RC09 0,30-3,23 · RC10 1,60-4,50 · RC13 0,00-2,57 s | dónde se vive: la sala con la luz del ventanal, el comedor con la cocina, el balcón abierto con el cielo; los tres giran a la derecha |
| Mitad | MD09 `IMG_8738` (voz 0,98-4,98 s) | la solución del ángulo, dicha por ella: «Zona de trabajo separada, porque trabajar desde la cama ya no es una opción» |
| Bloque 5 | RC24 1,20-3,93 · RC28 0,00-3,07 · DR10 5,40-8,83 s | la zona de trabajo (la alcoba 2: pasa la puerta y aparece el escritorio con el portátil; la ventana con el cielo y el prado y abajo el portátil) → LA VISTA: el dron se desliza sobre La Ceja con las montañas y las nubes (el plano más largo del bloque, 3,4 s) |
| CTA | CT03 `IMG_8727` (voz 0,46-4,22 s; el plano usa 0,10-4,47 s) | una acción: «Si estás buscando paz y comodidad, escríbeme y te doy todos los detalles.» **Entra a corte** (la toma no deja 12 f de silencio para disolver) |
| Canción | *Light Fills the Room* (`b3c8b7c6`) desde 147,367 s (`INICIO_MUSICA` = 4421/30) | cada cambio de plano en un golpe MEDIDO (16,0-33,6 dB); plana, sin caída: tras la última palabra del CTA se apaga con curva bajo la tarjeta; **repetida de la V22/039 (Lote El Carmen), autorizada por el usuario** |
| Voz | −15,0 LUFS tratada (+17,5 · +19,4 · +18,9 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −3,0 · −2,5 · −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−3,8 · −2,5 · −3,4 dB sobre el archivo); −26 LUFS bajo la voz | ver `aprendizajes.md` §1 |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver abajo |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/059-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1115 f, 119 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/059-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 67,5 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster: md5 `ea45ddf4…`) |
| `finales/059.srt` | 16 cues, de 3,2 a 35,1 s |
| `finales/059-portada.png` + `portada.json` | portada 9:16: el fotograma de los 27,8 s (La Ceja con las montañas y las nubes y el edificio en el borde inferior, el más nítido del tramo de la vista), «LA CEJA» y `VENTA`; contraste del texto 7,8:1 y del isotipo 8,0:1 |
| `finales/059-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «APARTAMENTO EN VENTA · La Ceja · Palmazera · $ 429 M COP» en Montserrat en el tercio de abajo del 1:1; la ficha se va de 34,70 a 35,10 s, antes de la tarjeta; audio copiado del máster (PCM idéntico), 1115 f, etiquetas BT.709 arregladas |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las tres (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1115/1115 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 9 fotogramas): máster a ≤ 0,50 niveles (baja frecuencia ≥ 47,8 dB), CRF 16 a ≤ 0,71 (≥ 46,2 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio de la final (ebur128): música sola −15,0 · −15,1 · −15,0 LUFS, con voz −14,7 · −14,6 · −14,7, pieza −15,0 LUFS, pico −2,9 dBFS (`medidas/audio-final.txt`). La base de la ficha (`sinSubtitulos`, muda, CRF 6) coincide con el máster en el 60 % de arriba (PSNR medio 49,7 dB, mínimo 42,4) y tiene los mismos 1115 fotogramas.

**Lo que cambió entre la prueba aprobada y la final** (solo el texto, medido otra vez sobre la voz sola, sílaba a sílaba): «a veces no viene» entra en el f118 (antes f111: su «a» arranca a 1,495 s; el valle de 1,22-1,31 s era la /t/ de «trés»), «de donde vives.» en el f185 (antes f183), «paz y comodidad,» en el f958 (antes f959) y «los detalles.» en el f1030 (antes f1026: su «los» arranca a 3,66 s). Imagen, color y audio, idénticos a la prueba. El `.srt` sale ya de las líneas corregidas.

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-cancion-entera.json`; `buscar-cortes-059.py`, registro en `musica/rejilla-059.txt`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`) |
|---|---|---|---|---|
| 3 | c01 edificio | corte (el frame 0) | 147,421 · 33,6 | (entrada de la música) |
| 86 | c02 hook | disolvencia que ACABA en el golpe | 150,163 · 31,7 | — |
| 240 | c03 sala | corte seco | 155,303 · 33,5 | −0,2 f |
| 328 | c04 comedor | corte seco | 158,235 · 16,8 | −0,3 f |
| 415 | c05 balcón | corte seco | 161,135 · 22,3 | −0,4 f |
| 492 | c06 mitad | disolvencia | 163,715 · 16,0 | — |
| 647 | c07 trabajo | corte seco | 168,876 · 17,7 | −0,1 f |
| 729 | c08 ventana | corte seco | 171,603 · 23,3 | −0,3 f |
| 821 | c09 vista | corte seco | 174,686 · 17,6 | +0,2 f |
| 924 | c10 CTA | corte seco | 178,118 · 18,9 | +0,2 f |

Los siete cortes secos caen a ≤ 0,4 f de un golpe que SUENA en el audio de la prueba (`medidas/golpes-render-prueba.txt`).

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Voz (con la música debajo) | hook −14,7 · mitad −14,6 · CTA −14,7 LUFS (`medidas/audio-final.txt`); picos −5,8 · −3,8 · −4,8 dBFS |
| Música sola | apertura −15,0 · paseo −15,1 · bloque 5 −15,0 LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,9 dBFS: sin saturar |
| Subtítulos | 16 líneas a +0,4…+2,4 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`), tras corregir cuatro (arriba) |
| Legibilidad (R25, `legibilidad.py`) | con el velo de la plantilla (`borde` 0,68 · `medio` 0,44) el contraste al p90 es 3,9-5,2 : 1 (017: 2,9-3,7; 018: 2,8-4,1) y 2,8-3,7 al p99 (`medidas/legibilidad.txt`); no hizo falta subirlo |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 10,9 → 7,1 · quemado máx. 2,3 → 1,9 % · aplastado máx. 2,8 → 3,9 % · saturación media 0,239 → 0,270 · piel: tono 14,0° → 13,7° (hook), 16,5° → 16,4° (mitad), 16,0° → 15,9° (CTA) (`medidas/medir-color-2.txt`) |
| Saltos de luma en los cortes secos | hook → sala −25,3 · sala → comedor +16,4 · comedor → balcón −19,0 · alcoba 2 (puerta) → ventana −24,6 · ventana → vista −15,8 · vista → CTA +1,5: contenido (del interior al cielo del balcón y de la ventana), en golpes de 16,8-23,3 dB |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1054 (la puerta) |

## Metraje compartido con las otras versiones del apartamento (declarado)

- **Con la 057 (V39) y la 058 (V40):** ni un segundo (la puerta, 7b). Coordinado el 2026-10-22 en `side-session-notes/…/05x-tramos-de-recorrido.md`: esta pieza usa solo RC09 0,30-3,23 s y RC13 0,00-2,57 s de lo que la 057 podría querer; lo demás de esos clips es suyo.
- **Mitad y CTA comparten el pasillo** (el rodaje de este apartamento los grabó ahí; cambian la pose y la distancia). Declarado en la puerta (2a).
- **Aéreo:** DR09 y DR10 (de DR07-DR10, el reparto de esta pieza); DR07 y DR08 quedan libres.
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del apartamento (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad** (libres que quedan, `proyectos/054/reparto-054-062.md`: HK03 `IMG_8714` gemela de HK02; MD01-MD05, MD08, MD10-MD14; MD09b `IMG_8739` de repuesto de esta mitad; **no hay CTA de repuesto**): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` y `palabras-desde.py` antes de fiarte: la cola de HK04 que whisper oye no es de la frase), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-059.py`** (la mitad pide ≥ 22 f de aire tras su última palabra y el hook ≥ 17).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-<canción>.json` y `buscar-cortes-059.py`; `INICIO_MUSICA`, los `GOLPE` de `metraje-059.ts`, los niveles de `audio-059.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`) y `FIN_MUSICA_059`; la puerta lee la ruta de los golpes (sección 4).
- **Otra entrada de la misma canción:** `buscar-cortes-059.py` da las rejillas (`musica/rejilla-059.txt`; 83 entradas con golpes ≥ 12 dB); cambiar `INICIO_MUSICA` y los `GOLPE` mueve todos los cortes (salen de `golpe(...)`).
- **Otro plano de recorrido:** mira su hoja (`herramientas/hoja-tramos.py <salida> 6 110 rcNN:desde:hasta`) y el movimiento antes; los candidatos ya normalizados están en `remotion/public/recorrido-059/` (RC08-RC13, RC15-RC18, RC24-RC28). Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro aéreo:** DR09 (13 s), DR10 (11,8 s), DR07 (16 s) y DR08 (7 s) están normalizados; `perfil-mov.py` y `ventana-fina.py` dan las ventanas uniformes (DR10 5,4-8,8 s; DR09 1,9-4,8 s; DR07 13,0-15,9 s: el vuelo a los bloques de ladrillo; DR08 quieto).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-059.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido059` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/059/ficha.json …` (la ficha de esta propiedad está en `proyectos/059/ficha.json`: tipo · lugar · COP 429 M).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto). Las cinco se **midieron** (`medidas/formantes-palabras.txt`, con su resumen arriba; `formantes.py` y `sibilantes.py`) y se **exportaron sin oír**:
  - «**el estrés**» (HK04, f97-f118 = 3,2-3,9 s del vídeo): whisper oye «la estresa». Las vocales de 1,10-1,22 s de la toma son de tipo [e] (F1 423-626 · F2 1470-2100, como la «e» de «bes»); la primera [a] (F1 718-823) llega a 1,515 s y es la de «a veces». Apoya «el estrés»; no lo cierra.
  - «**del trabajo**» (HK04, f138 = 4,6 s): whisper oye «del» desde 1,90 s y «el» desde 2,30 s. **Medida no concluyente**: tras «so-lo» viene una vocal abierta y luego una [e] cerrada, compatibles con «del» y con «el». Se exporta «del trabajo». Si fuera «el trabajo»: trozo `h01` de `subtitulos-059.ts`, `voz/hk04.txt`, el `dice` del plan y el `.srt` (ver abajo cómo).
  - «**vives**» (HK04, f185-f211 = 6,2-7,0 s): whisper oye «vive» sin la cola y «vives» con ella; en la banda de las /s/ hay una subida de ≈ 20 dB justo tras el final de la voz (4,46-4,56 s de la toma), por eso la ventana tratada llega a 4,55 s. Apoya «vives»; **una medida no es un oído**.
  - «**porque**» (MD09, f554 = 18,5 s): confianza 0,38 en whisper; la vocal de «por» es de timbre medio (F1 557-594), no la [a] de «para que» (F1 ≥ 700). Apoya «porque».
  - «**escríbeme**» (CT03, f999 = 33,3 s): whisper oye «escríeme» (confianza 0,41 en «esc-»); entre la [i] de «crí» y la [e] siguiente hay un episodio labial de ≈ 60 ms (F2 700-753 Hz): la /b/. Apoya «escríbeme».
  - **Cómo cambiar una**: el texto del trozo en `subtitulos-059.ts` (y su `dice` en `metraje-059.ts` y `voz/<toma>.txt`), `exportar-srt.mjs` para el `.srt`, y como el texto va dentro de la imagen de los finales con subtítulos, **volver a renderizar el máster y el CRF 16** (≈ 4 + 3 min) y repetir las etiquetas de color; la versión con ficha (sin subtítulos) no cambia. El caption no repite ninguna de las cinco.
- La canción (medida, no oída; repetida de la V22; licencia sin verificar).
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número.
- **La portada**: se propusieron dos (`pruebas-720p/portadas-prueba.png`) y se exportó **la vista** (27,8 s; contraste 7,8 : 1 y 8,0 : 1; el usuario dejó la elección al montaje). La alternativa, **el edificio** (1,8 s: la fachada de ladrillo con el prado; 6,3 : 1 y 6,7 : 1), cambia con `portada --proyecto 059 --t 1.8`. Las otras dos versiones del apartamento usan el edificio en sus aéreos: la vista da variedad en la cuadrícula del perfil.
- Que Palmazera sea el edificio de los aéreos DR09/DR10: la ficha dice «condominio cerrado» y no se dice nada del aéreo en la voz.
