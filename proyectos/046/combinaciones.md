# Combinaciones — proyecto 046 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V28 «Ciudad nueva»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es una de las seis versiones del arriendo de Tierra Grata (V27-V32, proyectos 045-050, 2026-10-19; reparto en `proyectos/044/reparto-045-050.md`). Lo que usó cada versión está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Qué es |
|---|---|---|---|
| V27 | 045 | sesión hermana | «El tiempo»: abre con el APTO (RC01) · HK01 · MD01 · CT01 · clímax RC21 · *Fortitude* |
| **V28** | **046** | **final exportada, rev. 1** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha, 2026-10-19; recorridos a cuadro completo; «amueblado» sin oír) | **«Ciudad nueva»: ABRE CON EL HOOK · HK03 · MD02 + MD03 (dos tomas) · CT02 · clímax RC18 · *Children* (piano)** · 1291 f · 43,0 s |
| V29 | 047 | sesión hermana | «Lo que incluye»: abre con el APTO (RC20) · HK02 · MD04 + MD05 · CT03 · clímax RC03 · *Dreamlife* |
| V30 | 048 | sesión hermana | «Chef y experiencias»: abre con el HOOK · HK01 · MD03 · CT03 · clímax RC10 · *Einaudi Fly* |
| V31 | 049 | sesión hermana | «Amenidades»: abre con el APTO (RC04) · HK03 · MD05 · CT01 · clímax RC19 · *In This Together* |
| V32 | 050 | sesión hermana | «14,8»: abre con el HOOK · HK02 · MD04 · CT02 · clímax RC02 (final) · *Spring is Coming* |

## Revisiones

- **Rev. 0 (2026-10-19, SUSTITUIDA).** Prueba 540×960 y primera final, con los recorridos RECORTADOS al centro (`crop=608:1080`) porque el catálogo §7 los daba por horizontales. Se aprobó y se exportó así. La sesión del 050 avisó después de que los clips del 2-sep son **anamórficos** (1920×1080 con SAR 81:256, DAR 9:16 = verticales comprimidos a lo ancho): el recorte era un zoom ×3,2 del tercio central.
- **Qué pasó con la rev. 0 y por qué importa el orden.** La coordinadora (mensaje del 2026-10-19) pidió, al corregir el catálogo, mover lo exportado a `finales/rev0-deformado/`, no borrar nada del SSD y mostrar una prueba nueva al usuario ANTES de exportar. Aquí el aviso del 050 llegó primero y se actuó en el acto: **los archivos de la rev. 0 se borraron del repo (no se conservaron en `rev0-deformado/`) y las copias del SSD se SUSTITUYERON por las de la rev. 1 (mismos nombres) sin una prueba intermedia**; la rev. 1 se enseñó al usuario (hoja de contactos y portada) después de exportarla y se le pidió su OK. La rev. 0 era defectuosa en todos los planos de recorrido y en la portada, así que no se pierde nada de valor, pero el orden no fue el pedido.
- **Rev. 1 (2026-10-19, vigente).** `normalizar.mjs` escala los recorridos ENTEROS a 1296×2304 con `setsar=1` (y comprueba el DAR), todos los `desde` de los recorridos se eligieron de nuevo mirando el cuadro completo, y se rehicieron el color, la final (CRF 12 y 16), la versión con ficha, la portada y la copia al SSD. NO cambia la estructura, los tiempos, los golpes, la voz, la música ni los subtítulos; sí cambia que la piscina→Social Kitchen entra ahora con disolvencia (a corte saltaba −16 niveles de luma).

## Lo que lleva (rev. 1)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | **El HOOK** (HK03 entera, `IMG_4304.mov`, voz 0,57-5,62 s) | por encargo del usuario (excepción a la regla fija 1, como el 021-024): Isabella es el frame 0; su primera palabra, f17 |
| Hook | HK03 «Cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado es una plusvalía indispensable.» | asignado. **Repetido** en la V31/049 (por diseño del reparto) |
| Unidad (bloque 3) | RC17 3,00-5,40 s (las dos piscinas y el carril) · RC11 1,40-4,43 s (la Social Kitchen) · RC12 0,40-3,33 s (desde el otro lado), con disolvencias | sin gente en primer plano, los tres giran a la derecha; RC16 (que usan las hermanas) y el gimnasio (gira a la izquierda) quedan fuera |
| Mitad | **MD02** (`IMG_4278`, voz 0,69-3,66 s) + **MD03** (`IMG_4285`, voz 0,68-6,66 s), dos tomas unidas con una disolvencia | asignadas. **MD03 repetida** en la V30/048. La música no sube entre ellas |
| Apartamento (bloque 5) | RC05 3,60-7,07 s (la alcoba, la puerta del baño y los cuadros) → RC09 3,00-6,00 s (el baño) | los tramos que menos usan las hermanas; RC09 se corta antes del champú con etiqueta (≥ 6,3 s) |
| Clímax | **RC18** 0,10-5,13 s (la terraza al atardecer; 5,0 s, el plano más largo del bloque) | asignado, exclusivo |
| CTA | CT02 (`IMG_4294`, voz 0,76-4,98 s) «Si quieres un apartamento **amueblado** que tenga acompañamiento personalizado, escríbeme.» | asignado. **Repetido** en la V32/050. «amueblado» (no «amoblado») es lo que MIDEN los formantes: ver «Lo por confirmar» |
| Canción | ***Armin van Buuren — Children (from 'Piano' album)*** (`80bd8abe`) | asignada; se entra en el golpe de 175,883 s (9,7 dB, f3) y su caída natural (211,5 s) cae donde entra el CTA |
| Voz | −15 LUFS tratada (+17,9 · +18,0 · +17,9 · +17,7 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente |
| Música sola | −15 LUFS por tramos (apertura −3,8 dB, paseo −3,9, bloque 5 −5,5 sobre el archivo); −26 bajo la voz | la canción está a −10 LUFS |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano | ver abajo |

## Lo medido en la final (rev. 1; el audio y los golpes son los mismos de la rev. 0)

| Qué | Medida |
|---|---|
| Golpes sobre los cortes | los 5 golpes (3 cortes secos y 2 disolvencias que acaban en uno) a −0,3…+0,5 f en el AAC de la prueba (`golpes-render.py`): 11,4 · 8,0 · 11,3 · 8,2 · 9,1 dB |
| Voz | −14,6 · −14,8 · −14,7 · −15,0 LUFS en sus ventanas del render (música a −26 debajo), picos −5,5…−4,6 dBFS |
| Música sola | −15,0 (paseo) · −15,2 (bloque 5) LUFS |
| Pieza | −15,1 LUFS integrado, pico −4,4 dBFS, LRA 1,6 LU: sin saturar |
| Subtítulos | 19 líneas a +0,0…+2,5 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`) |
| Color (`medir-color.py` sobre stills y `luma-cambios-render.py` sobre el render) | cuadro entero: la piscina y la Social Kitchen se igualaron con `exposure` (−0,15 · +0,3 · +0,25) y la piscina → Social Kitchen y su otro lado entran con disolvencia (a corte saltaba −16); saltos de luma en los dos cortes secos (alcoba → baño, baño → terraza) de −4,7 y +3,5 niveles · quemado máx. 0,4 % · aplastado máx. 7,5 % (siluetas de los árboles a contraluz) · base del canal y ajustes por plano en `metraje-046.ts` |

## La final (2026-10-19)

| Qué | Medida |
|---|---|
| **Master (CRF 12 `slower`)** | `finales/046-recorrido.mp4`: 99,8 MB, 1080×1920, 1291 f, H.264 + AAC 320 kbps. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`): `framemd5` DECODIFICADO (1291 fotogramas) y PCM del audio, idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 10 fotogramas): color medio ≤ 0,27 niveles, PSNR de baja frecuencia 50,8-53,7 dB (medio 52,4), bruto 43,3-47,2 dB |
| **CRF 16 `slow`** | `finales/046-recorrido-crf16.mp4`: 52,7 MB, misma imagen y mismo audio (PCM idéntico al del master); etiquetas arregladas con el mismo método; color medio ≤ 0,27 niveles, PSNR de baja frecuencia 49,7-52,6 dB (4 fotogramas) |
| `.srt` | `finales/046.srt`: 19 cues, 0,57-40,67 s (`exportar-srt.mjs`) |
| Portada | `finales/046-portada.png` (receta en `portada.json`): fotograma de 33,2 s (el más nítido del tramo: la ciudad, las montañas y la baranda de la terraza al final del clímax), `EL POBLADO` · `RENTA`; contraste 5,8:1 el texto y 5,7:1 el isotipo |
| **Versión con ficha** | `finales/046-recorrido-ficha.mp4`: 107,6 MB. Render `--props={"sinSubtitulos":true}` mudo a CRF 6 + `ficha.mjs video tierra-grata … --audio <master>`: `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` desde el f0 hasta 0,4 s antes de la tarjeta (40,57-40,97 s); 1291 fotogramas, el flujo de audio es el del master (md5 idéntico) y la mitad de arriba (donde nunca hay subtítulos) coincide con el master a 49,8 dB de media (mínimo 46,2 dB en el f512) |
| Entregado en el SSD (rev. 1, SUSTITUYE a la rev. 0 que se copió antes el mismo día) | `…/Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `046-recorrido.mp4` (master), `046-recorrido-ficha.mp4`, `046-portada.png`, `046-caption.md` y `046.srt` (sha256 comprobado) |

## Cómo cambiar cada pieza

- **Otro hook / otra mitad / otro CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mide por energía con `onsets-voz.py` y el perfil de 20 ms antes de fiarte del DTW de whisper), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` (tabla de `lineas-vs-onsets.py`). Si cambia la duración del plano cambia el reparto de frames (`P` de `metraje-046.ts`) y los golpes de los cortes secos.
- **Otra canción:** reservarla en el registro; `buscar-entrada.py` (la entrada y la caída del CTA) y `medir-pista.py … --json musica/golpes-046.json`; los `GOLPE` de `metraje-046.ts`, `INICIO_MUSICA`, `FIN_MUSICA_046` y los niveles de `audio-046.ts` (`LUFS_TRAMO`, `PICO_APERTURA`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa que reservó el reparto (*Here For You*) no cae al CTA (8,0 dB).
- **Otro plano del recorrido:** mira el clip NORMALIZADO a cuadro completo (`herramientas/hoja-normalizado.py`; los originales son anamórficos 9:16, ver aprendizajes), sin gente en primer plano, el mismo sentido de giro que sus vecinos, y mide su luma contra el de los cortes (`medir-color.py`). El `desde` va en el tiempo del MP4 normalizado (30 fps constantes, igual que el original). No hay recorte.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs` y `stills-antes.mjs`; `medir-color.py`.
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-046.ts`; las voces siguen a −15 LUFS.
- **Cerrar «amoblado»** (CT02, f1110-f1127 = 37,0-37,6 s): si no es «amoblado», el texto del primer trozo de `z01` en `subtitulos-046.ts`, `voz/ct02.txt`, el `dice` de `c11-cta` en `metraje-046.ts`, `lineas-vs-onsets.py` y el `.srt`.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto, 5 notas, y la final se exportó con ellas abiertas por orden del usuario, `recorrido-luxur` §7c; las notas SE QUEDAN): «**amueblado**» (CT02, f1110-f1127 = **37,0-37,6 s** del vídeo). El catálogo y el registro decían «amoblado»; whisper oye «movilado» (0,27), «molado» y «en un lado» según dónde se corte, y las trece sílabas de «si quieres un apartamento amueblado» caben en 1,4 s. **Medido** con `formantes.py` sobre la voz sola (1,30-2,30 s de la toma): vocales /a/ (1,78-1,82 s; F1 ≈ 650-720, F2 ≈ 1.100, como su /a/ de «apar-») → una [e] (1,875-1,94 s, a −14 dB, estable: F1 ≈ 420-435, F2 ≈ 1.750-1.880) → /a/ (1,96-2,14 s; F1 ≈ 740-780, F2 ≈ 900-1.000) → /o/ (2,17-2,30 s; F1 ≈ 520, F2 ≈ 750-1.050). «amoblado» pide /a/-/o/-/a/-/o/: la segunda vocal no es una /o/ (su /o/ de «to»: F1 ≈ 525-540, F2 ≈ 800-850); «amueblado» pide /a/-[we]-/a/-/o/ y encaja. **Se pintó «amueblado»** (lo medido; es también la forma de la RAE) y el caption conserva «amoblado», el término de búsqueda. Una medida no es un oído: si dice «amoblado», se cambia el texto del primer trozo de `z01` en `subtitulos-046.ts`, `voz/ct02.txt`, el `dice` de `c11-cta`, `lineas-vs-onsets.py` y el `.srt`, y se re-exporta (≈ 40 min con la máquina cargada; la versión con ficha no lleva subtítulos y no cambia).
- La canción (medida, no oída; piano sin pulso; licencia sin verificar).
- Que el hook (HK03) y el CTA (CT02) se repitan en otras piezas del arriendo (HK03 en la V31, CT02 en la V32), por diseño del reparto.
- El canal de «escríbeme» (DM o WhatsApp): el cierre lleva la web y el caption, el WhatsApp.
