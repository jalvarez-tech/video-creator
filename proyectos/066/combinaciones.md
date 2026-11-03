# Combinaciones — proyecto 066 · Lote en San Cristóbal (EOLIA Condominio), V48 («Con esta vista, muy pocos»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la primera de las tres versiones de este lote que se montan a la vez (reparto en `proyectos/066/reparto-066-068.md`, que manda); las otras dos son la V49 (067, «Este no es para ti») y la V50 (068, «El verdadero estatus es la privacidad»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V48; sin publicar: no hay commit ni push).

## Versiones de este lote

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V48** | **066** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha + caption), con el OK del usuario a la prueba rev. 0 (`pruebas-720p/066-recorrido.mp4`); 2 palabras sin oír; sin commit | 2026-10-24 | **«Con esta vista, muy pocos»**: DR01 (el camino y los cipreses) · **HK05** · RC01 · DR05 · **MD03** · RC04 · DR02 · DR01 (la vista) · **CT04** · ***Flying Into the Sun*** · 1218 f · 40,6 s |
| V49 | 067 | en montaje (otra sesión) | 2026-10-24 | «Este no es para ti»: HK02 · MD01 · CT05 · *Return to Oasis* · drones DR03 · DR06 · DR04 |
| V50 | 068 | en montaje (otra sesión) | 2026-10-24 | «El verdadero estatus es la privacidad»: HK04 · MD02 · CT01 · *Heaven on Earth* · drones DR04 · DR05 · DR06 |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | DR01 0,50-2,90 s | el dron avanza despacio sobre el camino de tierra en curva, los cipreses y la loma, con las montañas al fondo (el lote, sin la ciudad: la vista se reserva para el final) |
| Hook | HK05 `IMG_0959` (voz 1,33-7,87 s) | el ángulo: «En Medellín se construyen miles de apartamentos cada año, lotes de 5.000 metros, con esta vista, muy pocos.»; entra disolviendo, su primera palabra suena a los 22 f; cordillera y cipreses detrás |
| Paseo (bloque 3) | RC01 5,60-8,87 s · DR05 6,40-12,47 s | el cielo y el valle a ras de suelo (el paneo termina en el ciprés grande) → el lote desde arriba: el dron levanta la mirada hacia la ladera y asoma la ciudad |
| Mitad | MD03 `IMG_0975` (voz 0,50-6,24 s; el plano usa el clip hasta su f197 de 199) | «Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.»; entra disolviendo y sale a corte en un golpe porque el clip se acaba 12 f tras su última palabra |
| Bloque 5 | RC04 2,40-5,03 s · DR02 6,20-8,63 s · DR01 18,00-21,77 s | el rincón bajo el árbol que se abre al valle → el vuelo baja al borde del lote → LA VISTA: Medellín entera sobre el bosque (el plano más largo del bloque, 3,8 s) |
| CTA | CT04 `IMG_0967` (voz 0,85-3,14 s; el plano usa 0,40-3,60 s de 3,77) | una acción: «Si deseas más información, haz clic en el enlace.», caminando hacia cámara por el camino con las cercas |
| Canción | *Flying Into the Sun* (`ca1f1cbf`) desde 178,033 s (`INICIO_MUSICA` = 5341/30) | su golpe de 10,1 dB abre la pieza en el f3, crece hasta la vista (−13 → −8 LUFS) y cae 13 dB justo cuando entra el CTA; **repetida de la V3/019 (Los Patios), otra propiedad, declarada** |
| Voz | −15,0 LUFS tratada (+19,9 · +20,0 · +19,0 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −2,5 · −2,5 · −2,9 dBFS) | pedido permanente del canal; el limitador quita 3,8 dB en MD03 (cresta de 22 dB: su «ella» final es más fuerte que su cuerpo) |
| Música | −15 LUFS sola por tramos (−1,6 · −4,3 · −7,0 dB sobre el archivo: es una canción fuerte y crece); ≈ −26 LUFS bajo la voz | ver `aprendizajes.md` §2 |
| Color | `COLOR_BASE` + el ajuste de cada plano | luma de los planos 115-131, σ ≈ 5; nada quemado ni aplastado (`medidas/`) |

## Lo exportado (2026-10-24, tras el OK del usuario a la prueba)

| Archivo (`finales/`) | Qué es |
|---|---|
| `066-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1218 f (40,6 s), 205 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s; −15,0 LUFS, pico −2,2 dBFS |
| `066-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 116 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster) |
| `066.srt` | 17 cues, de 3,1 a 38,5 s |
| `066-portada.png` + `portada.json` | portada 9:16: el fotograma de 32,5 s (DR01, la vista: las montañas y la ciudad al fondo, el camino y el lote en primer plano; el más nítido del tramo 32,2-34,2 s), «SAN CRISTÓBAL» y `VENTA`; contraste del texto 12,2:1 y del isotipo 7,2:1. Se ve un coche blanco y una persona diminutos del rodaje en el camino |
| `066-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «LOTE CAMPESTRE EN VENTA · San Cristóbal · EOLIA · $ 797 M COP» en Montserrat en el tercio de abajo del 1:1; la ficha se va de 38,17 a 38,57 s, antes de la tarjeta; audio copiado del máster (el PCM coincide); la base muda (`sinSubtitulos`, CRF 6) coincide con el máster en la mitad de arriba: PSNR medio 48,1 dB (mín 42,7), mismos 1218 fotogramas |
| `caption.md` (en `proyectos/066/`) | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las TRES (`herramientas/arreglar-etiquetas.sh`: `h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1218/1218 fotogramas) y el md5 del PCM (`168cb237…`, el mismo en las cuatro) iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 7 fotogramas; `medidas/medir-final.txt`): máster a ≤ 0,32 niveles de color medio y baja frecuencia ≥ 51,0 dB (media 52,8).

**Exportada con DOS palabras sin oír** (la puerta con `--final` falla solo por sus notas; las notas se quedan): «**de tu vida**» (MD03, f630 = **21,0 s** del vídeo) y «**paz**» (MD03, f702 = **23,4 s**). Si alguna suena distinto: el texto del trozo en `subtitulos-066.ts`, `voz/md03.txt`, el `dice` del plano en `metraje-066.ts`, el `.srt` (`exportar-srt.mjs`) y la portada/ficha no cambian; ≈ 6 min de render (máster y ligera) y la ficha otra vez.

## La rejilla (la canción no tiene pulso: las disolvencias van libres; los cortes SECOS caen en un golpe medido, `musica/golpes-066.json`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`, `medidas/golpes-render-prueba.txt`) |
|---|---|---|---|---|
| 3 | c01 lote | corte (el frame 0) | 178,095 · 10,1 | (entrada de la música) |
| 72 | c02 hook | disolvencia libre | — | — |
| 331 | c03 cielo (RC01) | corte seco | 189,016 · 10,8 | +0,1 f |
| 429 | c04 lote (DR05) | corte seco | 192,279 · 12,3 | +0,0 f |
| 611 | c05 mitad | disolvencia libre | — | — |
| 797 | c06 rincón (RC04) | corte seco | 204,558 · 9,8 | +0,4 f |
| 876 | c07 vuelo (DR02) | corte seco | 207,188 · 9,3 | +0,3 f |
| 949 | c08 vista (DR01) | corte seco | 209,598 · 12,5 | −0,4 f |
| 1062 | c09 CTA | disolvencia libre | — | — |
| 1158 | c10 tarjeta | corte, donde acaba la toma | (la música ya está apagada: el golpe de 20,9 dB de los 216,877 s suena en el f1167) | — |

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Audio del render (ebur128, `medidas/audio-prueba.txt`) | pieza −15,0 LUFS integrado, pico −2,2 dBFS: sin saturar · voz + música: hook −14,7 · mitad −14,8 · CTA −15,0 LUFS · música sola: apertura −15,2 · paseo −14,9 · bloque 5 −15,0 LUFS · tarjeta en silencio |
| Música bajo la voz (puerta, sobre el plan) | ≈ −26,0 LUFS en las tres: 11,0 LU bajo la voz |
| Subtítulos | 17 líneas a +0,2…+2,1 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`) |
| Legibilidad (R25, `legibilidad.py`) | contraste 5,1-5,5 : 1 al p90 y 3,5-3,8 al p99 (017: 2,9-3,7 / 2,6-3,0; 057: 3,9-5,5 / 2,9-4,1): no hizo falta tocar el velo (`medidas/legibilidad.txt`) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1157 (la puerta) |

## Metraje compartido con las otras versiones del lote (declarado)

- **Con la 067 y la 068:** ni un segundo (la puerta, sección 7b, lo comprueba contra sus planes de hoy). Los rangos de cada pieza están en el reparto: esta pieza usa DR01 (completo), DR02 (completo) y DR05 (0-60 s); DR03, DR04 y DR06, de las otras.
- **Dentro de la pieza:** DR01 se usa dos veces (0,50-2,90 s la apertura y 18,00-21,77 s la vista): tramos disjuntos (la puerta, sección 7), declarado.
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del lote (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan: HK01, HK03, HK06-HK09; MD04, MD05; CT02, CT03; HK06 es otra toma de la misma frase de HK05): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mídela EN BANDA DE VOZ con `herramientas/voz-banda.py`: `limites-voz.py` se confunde con el viento), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (edita su `TOMAS`) y `GANANCIA_VOZ_DB`.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py --cta 33 38` y `medir-pista.py … --json musica/golpes-066.json`; `INICIO_MUSICA`, la tabla `GOLPE` de `metraje-066.ts`, los niveles de `audio-066.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_BAJO`, `MOMENTANEA`; `lufs-rangos.py`) y `FIN_MUSICA_066`, `DECAE` y `GOLPE_QUE_SE_EVITA`. Alternativa de la reserva: *Utopia*.
- **Otro plano de recorrido o de dron:** mira su hoja de contactos y el movimiento (`perfil-mov.py`) antes; solo los rangos del reparto. Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills: `stills-multiples.mjs`; `medir-stills` (luma por plano).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-066.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido066` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/066/ficha.json …` (la ficha del lote está en `proyectos/066/ficha.json`: «LOTE EN VENTA · San Cristóbal · EOLIA · $ 797 M COP»).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto):
  - «**de tu vida**» (MD03, f630 = 21,0 s del vídeo; en la toma, ≈ 1,05-1,45 s): whisper small oye «Siente tu vida donde ya» (se come la «sión de» de «versión»). Se pinta «de tu vida» (la gramática de la frase). Sin medir con formantes: son dos sílabas átonas pegadas.
  - «**paz**» (MD03, f702 = 23,4 s del vídeo; en la toma, 3,48 s): whisper la oye «Car-paz» o «pas» (pegada a «buscar»). Se pinta «paz» (la frase «salir a buscar paz los fines de semana» lo pide).
- **Para el usuario, sin que sea un error:** (1) Isabella dice «5.000 metros» y la ficha dice 5.170 m²: el subtítulo es literal y el caption lleva 5.170; si prefiere que el vídeo diga otra cosa, hay que regrabar el hook. (2) El CTA dice «haz clic en el enlace» y el caption lo lleva a mensaje directo/WhatsApp: confirma el canal.
- La canción (medida, no oída; licencia sin verificar; repetida de la V3).
- Lo que ella hace en el hook: camina hacia la cámara con la cordillera detrás y se acerca hasta quedar a un lado (el hook entra con ella a media distancia; al decir «muy pocos» sale del centro hacia la derecha: la toma es así).
