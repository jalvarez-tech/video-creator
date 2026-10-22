# Combinaciones — proyecto 062 · Apartaestudio Quadrato (Laureles, Medellín), V44 («Medellín, tercer mercado de renta corta»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la tercera de las tres versiones de este apartaestudio que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V42 (060, «tu plata en el banco pierde valor») y la V43 (061, «pocos permiten rentas cortas»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V44).

## Versiones de este apartaestudio

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V42 | 060 | en montaje (otra sesión) | 2026-10-21 | «Tu plata en el banco pierde valor»: HK03 · MD05 · CT03 · *Street Level Sessions on the Green* |
| V43 | 061 | en montaje (otra sesión) | 2026-10-21 | «Pocos permiten rentas cortas»: HK04 · MD04 · CT01 · *La Isla Bonita* |
| **V44** | **062** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 4 palabras sin oír, medidas y declaradas), con el OK del usuario a la prueba rev. 2 (`pruebas-720p/062-recorrido-rev2.mp4`; rev. 0 y rev. 1 como `-rev0`/`-rev1`) | 2026-10-22 | **«Medellín, tercer mercado de renta corta»**: ZC29 (la azotea) · **HK02** · ZC10 · ZC21 · ZC06 · **MD02** · RC12 · RC04 · RC18 (el balcón) · **CT02** · ***In This Together*** · 1139 f · 38,0 s |

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura (en lugar del dron) | ZC29 3,45-6,62 s (`TERRAZA Y JACUZZI (9)`) | la vista abierta de Medellín y las montañas: el skyline de ladrillo, el árbol en su barril y, a la derecha, el jacuzzi y el edificio; empieza en 3,45 s porque hasta los 3,3 s se veía una lona negra en el borde del frame 0 (la miniatura) |
| Hook | HK02 `HOOK2.MOV` (voz 0,52-4,05 s; el plano usa **todo el clip**, 145 f) | el dato de mercado, dicho por ella en la azotea: «Medellín ya es el tercer mercado más grande de renta corta de Latinoamérica»; **entra a corte** (su primera sílaba cae a los 15,6 f del clip) y la primera palabra suena a los 15,6 f del golpe. **Rev. 2 (pedido del usuario: «deja que el video siga un momento más»)**: antes el plano duraba 133 f y la disolvencia al jacuzzi empezaba 2 f tras «Latinoamérica»; ahora su imagen es opaca 11 f tras la palabra, la voz tratada se apaga con 0,1 s de fundido (4,05-4,15 s) y la música tarda 6 f más en subir |
| Paseo (bloque 3) | ZC10 0,40-2,90 · ZC21 2,10-5,13 · ZC06 1,00-3,97 s | el edificio: el jacuzzi con el skyline detrás, la pérgola abierta a las montañas y la sala de juntas (el coworking de la ficha) |
| Mitad | MD02 `MEDIO3.MOV` (voz 0,86-4,99 s) | el barrio, dicho por ella al entrar al estudio: «Laureles es uno de los mejores barrios con mayor ocupación en la ciudad de Medellín» (**el catálogo no lleva «mejores» y dice «de la ciudad»: ver «Lo por confirmar»**) |
| Bloque 5 | RC12 0,40-3,27 · RC04 0,40-3,33 · RC18 0,00-4,07 s | el estudio, lo justo para entender qué se compra: la cama con el panel de listones y la puerta al balcón → el escritorio con los portátiles y la cocina (la vitrocerámica y la nevera bajo el mesón) → EL BALCÓN con el barrio y, al entrar, la tele y la cama (el plano más largo del bloque, 4,1 s) |
| CTA | CT02 `CTA2.MOV` (voz 1,23-5,38 s; el plano usa 0,80-5,63 s) | una acción: «¿Y tú qué esperas para conocerlo? Haz clic en el enlace y agendemos una visita.» Entra DISOLVIENDO (`desde` 24 f) |
| Canción | *In This Together* (`bd507fe6`) desde 6,933 s (`INICIO_MUSICA` = 208/30) | cada cambio de plano en un golpe MEDIDO (6,8-21,1 dB; cortes secos ≥ 8,1 dB); la intro tiene pulso de 1 s y crece hasta una meseta a los 25 s; no cae sola: tras la última palabra del CTA se apaga con curva bajo la tarjeta; **repetida de la V31/049 (otra propiedad), autorizada por el usuario** |
| Voz | −15,0 LUFS tratada (+18,1 · +18,3 · +19,7 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −3,1 · −2,5 · −2,5 dBFS) | pedido permanente del canal |
| Música | −17,2 · −16,4 · −15,0 LUFS sola por tramos (+6,0 · +5,0 · −0,9 dB sobre el archivo); −26 LUFS bajo la voz | la intro es muy dinámica: a −15 sus picos pasarían de 0 dBFS (ver `audio-062.ts`) |
| Color | `COLOR_BASE` + el ajuste de cada plano (medido) | σ de luma entre planos 16,8 → 10,1 · quemado máx. 0,7 % · aplastado máx. 3,6 % · piel: tono 15,3° → 15,2° (hook) y 22,0° → 21,0° (CTA) (`medidas/medir-color-4.txt`) |

## Lo exportado (2026-10-22, tras el OK del usuario a la prueba rev. 2)

| Archivo | Qué es |
|---|---|
| `finales/062-recorrido.mp4` | máster: CRF 12 `slower`, 1080×1920, 30 fps, 1139 f (38,0 s), 77,3 MB, BT.709 etiquetado (VUI 1/1/1 y átomo `colr`), AAC 320 kb/s |
| `finales/062-recorrido-crf16.mp4` | versión ligera: CRF 16 `slow`, 42,3 MB; la misma imagen y el mismo audio (el PCM decodificado coincide con el del máster: md5 `73962fcf…`) |
| `finales/062.srt` | 15 cues, de 3,7 a 35,9 s |
| `finales/062-portada.png` + `portada.json` | portada 9:16: el fotograma de los 9,7 s (el jacuzzi con el skyline de Laureles, las montañas y las nubes: el más nítido de su tramo), «LAURELES» y `VENTA`; contraste del texto 9,8:1 y del isotipo 19,4:1 |
| `finales/062-recorrido-ficha.mp4` | versión con ficha: SIN subtítulos, «APARTAESTUDIO EN VENTA · Laureles · Quadrato · $ 410 M COP» en Montserrat en el tercio de abajo del 1:1; la ficha se va de 35,53 a 35,93 s, antes de la tarjeta; audio copiado del máster (PCM idéntico), 1139 f, etiquetas BT.709 arregladas |
| `caption.md` | descripción de Instagram, versión resumida |

Banderas: `--color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k`. Etiquetas de color arregladas sin pérdida en las tres (`h264_metadata` + `+write_colr`), con el `framemd5` decodificado (1139/1139 fotogramas) y el md5 del PCM iguales antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): máster a ≤ 0,18 niveles (baja frecuencia ≥ 51,2 dB), CRF 16 a ≤ 0,49 (≥ 49,0 dB); 0 fotogramas fuera de tolerancia (`medidas/medir-final-*.txt`). Audio de la final (ebur128): pieza −15,6 LUFS integrado, pico real −1,2 dBFS (`medidas/audio-prueba.txt`). La base de la ficha (`sinSubtitulos`, muda, CRF 6) coincide con el máster en el 57 % de arriba (PSNR medio 47,5 dB, mínimo 44,1) y tiene los mismos 1139 fotogramas.

Lo que cambió entre la prueba rev. 2 y la final: nada (el mismo plan, sin tocar un número). La rev. 2 ya llevaba el cambio que pidió el usuario sobre la rev. 1: en el hook, «Latinoamérica» deja que el vídeo siga un momento más (el plano de Isabella usa todo su clip, la voz tratada se apaga con 0,1 s de fundido y la música tarda 6 f más en subir).

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-cancion-entera.json`; `buscar-cortes-062.py`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) |
|---|---|---|---|
| 3 | c01 azotea | corte (el frame 0) | 6,995 · 21,1 |
| 95 | c02 hook | corte | 10,038 · 13,5 |
| 240 | c03 jacuzzi | disolvencia (sin golpe: el hook dura todo su clip; la rev. 1 la ponía en el f228, golpe de 6,8 dB) | — |
| 303 | c04 pérgola | corte seco | 16,994 · 11,9 |
| 394 | c05 juntas | corte seco | 20,004 · 10,8 |
| 483 | c06 mitad | disolvencia | 22,983 · 20,2 |
| 638 | c07 cama | disolvencia | 28,154 · 9,0 |
| 724 | c08 cocina | corte seco | 31,002 · 8,1 |
| 812 | c09 balcón | corte seco | 33,956 · 8,5 |
| 934 | c10 CTA | disolvencia | 38,003 · 11,3 |

## Metraje compartido con las otras versiones del apartaestudio (declarado)

- **Con la 060 y la 061:** la puerta (sección 7b) no encontró ni un segundo en común en el checkout (ambas estaban en el andamio). Los tramos reclamados están en `side-session-notes/…/062-tramos-de-recorrido.md`: ZC29 (3,45-6,62 s), ZC10 (0,40-2,90 s), ZC21 (2,10-5,13 s), ZC06 (1,00-3,97 s), RC12 (0,40-3,27 s), RC04 (0,40-3,33 s) y RC18 (0,00-4,07 s). Si una de las otras dos quiere uno de esos tramos, lo declara.
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del apartaestudio (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres que quedan, `proyectos/054/reparto-054-062.md`: HK01 `HOOK1` —la peor transcrita: óyela antes—, MD01 `MEDIO1/2`, MD03 `MEDIO4`, CT04 `CTA4`): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la envolvente con `envolvente-voz.py` y `onsets-voz.py` antes de fiarte de `limites-voz.py`: en MD02 daba 0,00 s por unos chasquidos y la voz empezaba a 0,86 s), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` + `sibilantes.py` (tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-062.py`** (el hook no puede pasar de 145 f con HK02 (el clip entero, 4,835 s), que es lo que usa desde la rev. 2).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-<canción>.json` y `buscar-cortes-062.py`; `INICIO_MUSICA`, los `GOLPE` de `metraje-062.ts`, los niveles de `audio-062.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `OBJETIVO_MUSICA`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`) y `FIN_MUSICA_062`; la puerta lee la ruta de los golpes (sección 4).
- **Otra entrada de la misma canción:** `buscar-cortes-062.py` da las rejillas; con los rangos de esta pieza hay dos entradas con solución (6,995 y 8,004 s) con golpes ≥ 6,8 dB; cambiar `INICIO_MUSICA` y los `GOLPE` mueve todos los cortes (salen de `golpe(...)`).
- **Otro plano de recorrido:** mira su hoja (`herramientas/hoja-tramos.py <salida> 8 150 zcNN:desde:hasta`) y el movimiento antes; los candidatos ya normalizados están en `remotion/public/recorrido-062/` (ZC04, ZC06, ZC10-ZC13, ZC21, ZC23, ZC28, ZC29 y RC01, RC02, RC04, RC08, RC11, RC12, RC14, RC16, RC18). Un plano que entra disolviendo pide 12 f de clip antes de su `desde`. **Evitar**: ZC14, ZC15, ZC20, ZC22 y ZC24 (la tarjeta de menú «2X1» de un restaurante) y los últimos 2 s de ZC28 (una mujer y un perro al fondo).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py` (las caras salen de `seguir-sujeto.swift`; Vision no encuentra la de MD02: es pequeña y está lejos).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-062.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido062` con `--props={"sinSubtitulos":true}` + `ficha.mjs video proyectos/062/ficha.json …` (la ficha de esta propiedad está en `proyectos/062/ficha.json`: tipo · lugar · COP 410 M).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto). Cuatro palabras, **medidas** (`medidas/formantes-hook.txt` y `medidas/formantes-palabras.txt`) y declaradas, exportadas sin oír:
  - «**mercado**» (HK02, f147-f160 = 4,9-5,3 s del vídeo; «mer» ≈ f147, «ca» ≈ f154): whisper-small oye «buscado» en la toma entera y «mercado» cortando desde 1,2 · 1,35 · 1,64 s; los formantes dan [e] · silencio de 90 ms · [a] · [o] (`medidas/formantes-hook.txt`). Es la palabra que el encargo avisaba que había que oír.
  - «**mejores**» (MD02, f537 = 17,9 s): **el catálogo de la sesión madre NO la lleva** («Laureles es uno de los barrios con mayor ocupación de la ciudad de Medellín»). Whisper la oye en 6 de 7 cortes aislados y la envolvente pide 7 sílabas entre «uno» y «barrios». Se exporta lo oído.
  - «**con mayor**» (MD02, f558 = 18,6 s): whisper oye «como ayer». La /s/ de «barrios» (2,80-2,86 s) y la pausa posterior dejan «con» a 2,905 s; «ocupación» son sus 4 sílabas.
  - «**en la ciudad**» (MD02, f589 = 19,6 s): whisper oye «en» en todos los cortes; el catálogo dice «de».
  - **Cómo cambiar una**: el texto del trozo en `subtitulos-062.ts` (y su `dice` en `metraje-062.ts` y `voz/<toma>.txt`), `exportar-srt.mjs` para el `.srt`, y como el texto va dentro de la imagen de los finales con subtítulos, **volver a renderizar el máster y el CRF 16** (≈ 4 + 3 min) y repetir las etiquetas de color; la versión con ficha (sin subtítulos) no cambia. El caption no repite ninguna de las cuatro.
- **Las dos afirmaciones de mercado** (que el dato de la tercera plaza de Latinoamérica y la ocupación de Laureles son ciertos): las dice la voz de Isabella y solo están ahí; sin rótulo propio, sin cifra en pantalla y sin promesa en el caption.
- La canción (medida, no oída; repetida de la V31; licencia sin verificar).
- «**Quadrato**» como nombre del edificio en la versión con ficha (sale de la carpeta del rodaje y del reparto; la web no lo da).
- Por dónde se agenda la visita («haz clic en el enlace»: el enlace de la biografía, un botón o el WhatsApp) y si el caption lleva el número.
