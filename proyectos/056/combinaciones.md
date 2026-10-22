# Combinaciones — proyecto 056 · Casa en Condominio Los Bravos (La Ceja), V38 («Solo 6 casas»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la tercera de las tres versiones de esta casa que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V36 (054, «privacidad») y la V37 (055, «las mañanas»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V38).

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V36 | 054 | en montaje (otra sesión) | 2026-10-21 | «Privacidad»: HK01 · MD04 · CT06 · *Luxury, Elegance, Refined* · aéreo `DJI…0070_D`, primer tercio |
| V37 | 055 | en montaje (otra sesión) | 2026-10-21 | «Las mañanas»: HK02 · MD03 · CT03 · *Spring is Coming* · aéreo `DJI…0070_D`, último tercio |
| **V38** | **056** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 1 palabra sin oír), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/056-recorrido.mp4`) | 2026-10-22 | **«Solo 6 casas»**: DR02 (el conjunto) · **HK04** · RC28 · RC05 · RC20 · **MD02** · RC12 · RC16 · DR02 (la vista) · **CT01** · ***Heaven on Earth*** · 1056 f · 35,2 s |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR02 97,00-99,87 s | el conjunto en cenital sobre la vía nueva y las casas con sus jardines, a velocidad constante desde el f0 (movimiento 8,6, dispersión 0,014) |
| Hook | HK04 `IMG_8825` (voz 0,80-3,82 s) | el ángulo: «Descubre la privacidad de vivir en un condominio de solo seis casas»; entra disolviendo, su primera palabra suena a los 12 f del golpe |
| Paseo (bloque 3) | RC28 0,30-3,07 · RC05 2,00-5,10 · RC20 0,10-3,03 s | lo construido: la fachada (la cámara baja del cielo), el interior social (tele, sofás, ventanal, escalera, comedor) y la cocina con sus acabados |
| Mitad | MD02 `IMG_8818` (voz 0,82-4,07 s) | el dato del ángulo, dicho por ella: «Los condominios de menos de 10 unidades privadas se valorizan diferente» |
| Bloque 5 | RC12 3,00-5,93 · RC16 3,20-6,00 · DR02 106,00-109,70 s | la alcoba principal (vigas, cama, muro de piedra del baño) → otra alcoba que sale al balcón → LA VISTA: el dron levanta la mirada del conjunto al valle y se posa (el plano más largo del bloque, 3,7 s) |
| CTA | CT01 `IMG_8911` (voz 1,86-5,04 s; el plano usa 1,47-5,50 s) | una acción: «Si realmente buscas tranquilidad, esta casa es para ti. Escríbeme.» |
| Canción | *Heaven on Earth* (`acd99178`) desde 178,000 s (`INICIO_MUSICA` = 5340/30) | cada cambio de plano en un golpe MEDIDO (9,2-15,5 dB); su caída desde los 209,5 s cae dentro de la toma del CTA; **repetida de la V9/025 (Los Patios), autorizada por el usuario** |
| Voz | −15,0 LUFS tratada (+17,9 · +18,4 · +20,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−1,6 · +0,7 · −1,8 dB sobre el archivo); −26 LUFS bajo la voz | ver `aprendizajes.md` §1 |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | ver abajo |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba)

| Archivo | Qué es |
|---|---|
| `finales/056-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1056 f, 114 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/056-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 64 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster) |
| `finales/056.srt` | 15 cues, de 2,8 a 32,9 s |
| `finales/056-portada.png` + `portada.json` | portada 9:16: el fotograma de los 0,3 s (el aéreo cenital de las casas del condominio, el más nítido de la apertura), «LA CEJA» y `VENTA`; contraste del texto 6,4:1 y del isotipo 7,9:1. (La alternativa, la vista del valle a los 27,3 s, daba 12,9:1 pero es medio cielo oscuro.) |
| `finales/056-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «CASA EN VENTA · La Ceja · Condominio Los Bravos · $ 1.380 M COP» en Montserrat en el tercio de abajo del 1:1 (la línea del lugar baja a 50 px para caber en 840), la ficha se va de 32,77 a 33,17 s, antes de la tarjeta; audio copiado del máster (el PCM coincide) |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las dos (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1056/1056 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 9 fotogramas): máster a ≤ 0,37 niveles (baja frecuencia ≥ 50,5 dB), CRF 16 a ≤ 0,4 (≥ 50,5 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio (ebur128 sobre la final): voces −14,7 · −14,6 · −14,7 LUFS, pieza −15,0 LUFS, pico −2,2 dBFS (`medidas/audio-final.txt`). La base de la ficha (`sinSubtitulos`, muda, CRF 6) coincide con el máster en la mitad de arriba (PSNR mínimo por fotograma 43,5 dB) y tiene los mismos 1056 fotogramas. Render: ≈ 5 min el máster y 3 min el CRF 16.

**Exportada con UNA palabra sin oír** (la puerta con `--final` falla solo por ella; la nota se queda): «**privacidad**» (HK04, 3,5 s del vídeo, f104; ver abajo). Si suena distinto: el texto del trozo `h01` en `subtitulos-056.ts`, `voz/hk04.txt`, el `dice` del plan, el `.srt` (`exportar-srt.mjs`), el caption (primer párrafo) y la versión con ficha (que no lleva texto de voz, no cambia); el texto va dentro de la imagen del máster, así que se vuelve a renderizar (≈ 5 min cada final) y se repiten las etiquetas de color.

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-056.json`; `buscar-cortes-lp.py` con la estructura de 9 planos)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`) |
|---|---|---|---|---|
| 3 | c01 conjunto | corte (el frame 0) | 178,043 · 10,2 | (entrada de la música) |
| 73 | c02 hook | disolvencia que ACABA en el golpe | 180,363 · 9,2 | — |
| 193 | c03 fachada | corte seco | 184,387 · 13,7 | +0,2 f |
| 276 | c04 sala | corte seco | 187,159 · 10,8 | +0,4 f |
| 369 | c05 cocina | corte seco | 190,230 · 14,7 | −0,4 f |
| 457 | c06 mitad | disolvencia | 193,193 · 13,3 | — |
| 592 | c07 alcoba | disolvencia | 197,681 · 11,4 | — |
| 680 | c08 balcón | corte seco | 200,617 · 15,5 | +0,1 f |
| 764 | c09 vista | corte seco | 203,402 · 10,7 | el detector marca −5,0 f, **pero el perfil de energía del render y el de la fuente coinciden** (el golpe de 203,400 s suena a 8,7 dB, a su sitio); es un artefacto del retroceso del detector, no un desfase (`medidas/golpes-render-prueba.txt`) |
| 875 | c10 CTA | disolvencia | 207,118 · 13,9 | — |

La correlación del audio del render con la canción da **−42,3 ms** (el retraso conocido de 42 ms del render de Remotion) en TODA la pieza: el audio no se desplaza en ningún tramo.

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Voz (con la música debajo) | hook −14,7 · mitad −14,6 · CTA −14,7 LUFS; picos −4,6 · −5,1 · −3,9 dBFS |
| Música sola | apertura −14,8 · paseo −15,2 · bloque 5 −15,0 LUFS |
| Pieza | −15,0 LUFS integrado, pico −2,2 dBFS: sin saturar; LRA 3,7 LU (`medidas/audio-prueba.txt`) |
| Música bajo la voz (puerta, sobre el plan) | −26 LUFS en cada ventana: 11 LU bajo ella |
| Subtítulos | 15 líneas a +0,4…+2,6 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`) |
| Legibilidad (R25, `legibilidad.py`) | con el velo de partida (`borde` 0,62 · `medio` 0,34) el contraste al p90 era 2,8-5,2 : 1; **se subió a `borde` 0,68 · `medio` 0,44** y quedó en 3,4-6,1 : 1 al p90 (017: 2,9-3,7; 018: 2,8-4,1) y 1,4-4,6 al p99 (los dos más bajos, f570 y f890, caen sobre el sofá blanco y el tapete de crochet: brillos del propio plano) (`medidas/legibilidad.txt`) |
| Color (`medir-color.py`, antes → después) | luma entre planos σ 11,4 → 9,9 · quemado máx. 3,4 → 1,1 % · aplastado máx. 4,1 → 5,5 % (la sala, de contenido) · saturación media 0,208 → 0,232 · piel: tono 12,0° → 11,5° (hook), 12,0° → 11,8° (mitad), 13,4° → 13,3° (CTA) |
| Saltos de luma en los cortes secos | hook → fachada **+43,5** (del jardín con la pérgola al cielo muy claro: es contenido, en el golpe de 13,7 dB) · fachada → sala +1,1 · sala → cocina −16,4 · alcoba → balcón +7,4 · balcón → vista +8,0 |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f995 (la puerta) |

## Metraje compartido con las otras versiones de la casa (declarado)

- **Con la 054 (V36):** ni un segundo (usa RC01-03, RC06, RC07, RC13, RC22, RC24 y RC25).
- **Con la 055 (V37):** ni un segundo. El único cruce posible era la cocina (RC20): esta pieza usa 0,1-3,03 s y la 055 movió el suyo a 3,03-5,66 s (acordado entre sesiones el 2026-10-22).
- **Aéreo:** la 054 y la 055 usan `DJI…0070_D`; esta pieza, solo `varias_tomas.MP4` tras el corte de escena de los 86,05 s (el tramo anterior queda libre y no se ha usado).
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro de la casa (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan: HK03 `IMG_8823` entra cortada; MD01 `IMG_8817`; CT02 `IMG_8913`, CT04 `IMG_8915`, CT05 `IMG_8917`, CT07 `IMG_8924`, CT08 `IMG_8925`): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` antes de fiarte de `limites-voz.py`: con el suelo de ruido de estas tomas da cifras absurdas), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-lp.py`** (el hook pide ≥ 17 f de aire tras su última palabra para que la música suba antes del corte: `R`).
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 29 35` y `medir-pista.py … --json musica/golpes-056.json`; `INICIO_MUSICA`, los `GOLPE` de `metraje-056.ts`, los niveles de `audio-056.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`), `FIN_MUSICA_056` (el WAV decodificado dura 212,83 s: no se puede leer más allá) y `DECAE`.
- **Otro plano de recorrido:** mira su hoja de contactos (`pruebas-720p/`) y el movimiento (`ventana-fina.py` / `flujo.py`) antes; los candidatos ya normalizados están en `remotion/public/recorrido-056/` (RC01, RC02, RC03, RC06, RC08, RC10, RC15, RC17, RC22, RC24, RC26). Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro plano de aéreo:** solo lo posterior a los 85,96 s del archivo normalizado (el reparto); la pasada uniforme dura de 95,0 a 103,9 s y la inclinación que frena sola, de 105,5 a 109,2 s (después se queda quieto y, desde los 111,8 s, vuelve a bajar de golpe).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-056.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido056` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/056/ficha.json …` (la ficha de esta propiedad está en `proyectos/056/ficha.json`).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**privacidad**» (HK04, f104 = 3,5 s del vídeo; en la toma, 1,51-1,85 s): whisper oye «prioridad» (confianza 0,23 en «prior»). **Medido con `formantes.py`** (`medidas/formantes-privacidad.txt`): tras la /i/ de «pri-» (F1 ≈ 405-455, F2 ≈ 2.500-2.600 Hz) viene una vocal ABIERTA de F1 ≈ 730-790 Hz (F2 ≈ 1.200-1.300, bajada por la labial), que es la /a/ de esta voz (la de «casas»: F1 650-790, F2 ≈ 1.590-1.700) y no su /o/ (la de «solo»: F1 ≈ 520-590); en la banda de las /s/ hay además un resalte de fricativa a 1,60-1,66 s. «prioridad» llevaría una /o/ de F1 ≈ 500-590 y ninguna fricativa. Todo apunta a «pri-**va**-cidad» y el sentido de la frase también, pero la palabra entera dura ≈ 0,33 s (11 sílabas por segundo), así que **la medida cierra la vocal y no la palabra: una medida no es un oído.** Se exporta «privacidad» y la nota se queda.
  - «condominios» (MD02, f469): whisper oye «conominos» (la «d» no se oye); es «condominios».
- La canción (medida, no oída; lounge; licencia sin verificar; repetida de la V9).
- **El aéreo**: ¿es el condominio de Los Bravos? Enseña pocas casas con una vía nueva, una excavadora amarilla en un patio y lotes sin construir. No se dice nada del aéreo en la voz.
- El salto de luz del corte hook → fachada (+43,5 de luma, en el golpe de 13,7 dB).
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número de WhatsApp.
