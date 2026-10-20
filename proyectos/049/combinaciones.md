# Combinaciones — proyecto 049 · Tierra Grata Bosque Santo (El Poblado, ARRIENDO), V31 «Amenidades»

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las seis piezas de arriendo (V27-V32, proyectos 045-050) salen del mismo reparto (`proyectos/044/reparto-045-050.md`) y del mismo catálogo (`proyectos/044/catalogo-material.md`); cada una vive en su worktree. Lo que usó cada una está también en `archivos/musica/registro-de-uso.md` (§1, §2 y §7), el tablero de coordinación entre sesiones.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V27 | 045 | sesión hermana | 2026-10-19 | «El tiempo»: RC01 · HK01 · MD01 · CT01 · RC21 · *Fortitude* |
| V28 | 046 | sesión hermana | 2026-10-19 | «Ciudad nueva»: hook · HK03 · MD02+MD03 · CT02 · RC18 · *Children (Piano)* |
| V29 | 047 | sesión hermana | 2026-10-19 | «Lo que incluye»: RC20 · HK02 · MD04+MD05 · CT03 · RC03 · *Dreamlife* |
| V30 | 048 | sesión hermana | 2026-10-19 | «Chef y experiencias»: hook · HK01 · MD03 · CT03 · RC10 · *Einaudi Fly* |
| **V31** | **049** | **final exportada** (CRF 12 + CRF 16 + `.srt` + portada + versión con ficha; 5 palabras sin oír) | 2026-10-19 | **«Amenidades»**: RC04 · **HK03** · RC17 · RC12 · RC14 · RC13 · **MD05** · **RC01** · RC08 · RC09 · **RC19 (clímax)** · **CT01** · *In This Together* · 1401 f · 46,7 s · sin dron ni cifras |
| V32 | 050 | sesión hermana | 2026-10-19 | «14,8»: hook · HK02 · MD04 · CT02 · RC02 final · *Spring is Coming* |

## Lo que lleva (rev. 0 = la prueba del 2026-10-19)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | RC04 `Img 9469` 1,00-3,37 s | asignada: la sala (sofá gris, listones con luz, la mesa con el sol); sin la vista. **Exclusiva de la V31** |
| Hook | HK03 `IMG_4304` (voz 0,58-5,62 s) | asignada: escaleras exteriores, «cuando llegas a una ciudad que no es la tuya…». **Repetida de la V28** (declarado) |
| Unidad | RC17 1,00-4,10 · RC12 3,20-6,70 · RC14 0,30-3,40 · RC13 0,20-3,87 | la piscina, la Social Kitchen y el gimnasio ×2: la unidad pesa más en esta pieza; todo gira a la derecha. Tramos elegidos por no coincidir con lo que más usan las hermanas |
| Mitad | MD05 `IMG_4297` (voz 0,60-3,55 s) | asignada: empieza por «Además»; va tras el recorrido de la unidad. **Repetida de la V29** (declarado) |
| Apartamento | **RC01 1,20-4,70** · RC08 1,70-5,03 · RC09 5,20-7,97 | **las tres PEDIDAS POR EL USUARIO tras ver la prueba rev. 0** («incluye tomas: Img 9484, Img 9481, Img 9461»): la cocina con isla (RC01, que el reparto reservaba como apertura de la V27), la alcoba con la puerta del baño y el último tramo del baño. Es el orden en que se camina |
| Clímax | RC19 `Img 9529` 0,30-4,50 s | asignado: el deck con el jacuzzi **comunal** (no el privado: ese no sale en ningún clip). **Exclusivo de la V31** |
| CTA | CT01 `IMG_4277` ENTERA (voz 0,60-4,53 s) | asignada: junto al jacuzzi comunal. **Repetida de la V27** (declarado) |
| Canción | *In This Together* (`bd507fe6`) | la reservada. Medida: muy fuerte (≈ −10 LUFS), sin pulso, golpes de 7,5-12,7 dB en su segunda mitad y caída natural bajo el CTA |
| Entrada de la canción | 161,6 s (`INICIO_MUSICA` = 4848/30) | golpe de 11,2 dB en el f3 |
| Voz | −15 LUFS tratada (+17,9 · +18,4 · +17,8 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (apertura −5,4 dB, paseo −5,0, bloque 5 −3,2); −26 bajo la voz | la canción llega a ≈ −10 |
| Color | `COLOR_BASE` (la del 017) + el ajuste de cada plano (medido por luma) | ver abajo |

## Revisiones

- **rev. 0** (2026-10-19): bloque 5 = alcoba (RC06) → puerta del baño (RC08) → baño (RC09) → clímax.
- **rev. 2** (2026-10-19, aviso de la sesión de la V32): los recorridos son ANAMÓRFICOS (SAR 81:256, DAR 9:16) y se habían recortado a 608×1080 (un zoom ×3,2 del tercio central). `normalizar.mjs` ya no recorta: escala el cuadro entero a 1296×2304 con `setsar=1`. Mismos tramos y misma rejilla; se rehízo el color de cada plano de recorrido (la luz de los cuadros enteros era otra).
- **rev. 1** (2026-10-19, pedido del usuario: «incluye tomas: Img 9484, Img 9481, Img 9461»): el bloque 5 pasa a RC01 (cocina con isla) → RC08 → RC09 → RC19; RC06 sale. Misma rejilla de golpes, misma duración (1401 f): solo cambia el primer plano del apartamento y el nombre de las claves `cocina`/`alcoba` de `GOLPE`.

## Lo medido (prueba rev. 0, cuyo audio es idéntico al de las rev. 1 y 2 y al de la final)

| Qué | Medida |
|---|---|
| Cortes secos sobre golpes | los 11 cortes en golpes MEDIDOS de la canción (7,5-12,7 dB: el canal exige 7,4). Sobre el AAC del render (`golpes-render.py`): 7 a −0,3…+0,5 f; f449 (7,5 dB), f983 (8,5) y f1066 (9,3) a +4,0 · +5,7 · −2,3 f y f883 (12,7 dB) a −4,6 f aunque su traza SÍ muestra el salto de +9 dB en f883,05. **Textura densa de pads: los golpes de 7,5-8,5 dB no tienen subida aislada; se juzgan al oído** |
| Voz | −14,6 · −14,6 · −14,7 LUFS en sus ventanas del render (música a −26 debajo); el WAV tratado, −15,0 LUFS y −2,5 dBFS, silencio fuera de la frase |
| Música sola | −15,1 (apertura) · −15,0 (paseo) · −15,0 (bloque 5) LUFS |
| Pieza | −15,0 LUFS integrado, pico −4,3 dBFS, LRA 1,6 LU: sin saturar |
| Subtítulos | 8 bloques, 4 acentos, validador sin avisos; 14 líneas contra el render (`subs-vs-voz.py`): mediana +2,2 f, rango −2,6…+3,7 f antes de ajustar dos líneas (f107→102 y f1252→1251) |
| Color (`luma.py`, 3 fotogramas por plano; **rev. 2, cuadros enteros**) | luma 104-112 apertura · 100 piscina · 111-117 Social Kitchen · 93-106 gimnasio ×2 · 108-111 cocina · 112-114 alcoba · 105-110 baño · 109-114 vista (y 98-110 las tomas de Isabella, de la rev. 0); sin píxeles quemados |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1340 (la puerta) |
| **Final (CRF 12 `slower`)** | `finales/049-recorrido.mp4` (rev. 2): 98,2 MB, 1080×1920, 1401 f, H.264 + AAC 320 kbps (317), −15,0 LUFS integrado, pico −4,3 dBFS, LRA 1,6 LU. Etiquetas BT.709 arregladas sin pérdida (R22: VUI y átomo `colr`); `framemd5` DECODIFICADO (1401 fotogramas) y PCM del audio idénticos antes y después. Color contra stills a escala 1 (`medir-final.py`, 11 fotogramas): color medio ≤ 0,28 niveles, PSNR de baja frecuencia 49,0-53,4 dB (medio 51,8), bruto 42,3-47,4 dB |
| **Final (CRF 16 `slow`)** | `finales/049-recorrido-crf16.mp4`: 52,0 MB, misma imagen y mismo audio (PCM idéntico al del master); `framemd5` idéntico antes/después de las etiquetas; color medio ≤ 0,32 niveles, PSNR de baja frecuencia 49,0-51,3 dB (5 fotogramas) |
| `.srt` | `finales/049.srt`: 14 cues, 2,73-44,17 s (`exportar-srt.mjs`) |
| Portada | `finales/049-portada.png` (receta en `portada.json`): fotograma de 9,5 s (el más nítido de la piscina, a 0,6 s del corte), `EL POBLADO` · `RENTA` (de la ficha: arriendo); contraste 8,3:1 el texto y 8,5:1 el isotipo |
| **Versión con ficha** | `finales/049-recorrido-ficha.mp4`: 106,0 MB, 1401 f, base SIN subtítulos (`--props={"sinSubtitulos":true}`, `--crf=6`) contra la final: la mitad de arriba a ≥ 46,6 dB en los 1401 fotogramas; la ficha `APARTAMENTO EN RENTA · El Poblado · Tierra Grata · $ 14,8 M COP / MES` entra en el f0 con su fundido y se va en 44,27-44,67 s, antes de la tarjeta; audio COPIADO de la final (el flujo AAC da el mismo md5). Hoja de revisión: `pruebas-720p/ficha-hoja.jpg` |
| Copia al SSD | `Apartamento - Tierra Grata - Las Palmas/Videos Social Media/`: `049-recorrido.mp4` (master), `049-recorrido-ficha.mp4`, `049-portada.png`, `049.srt` y `049-caption.md`, con el md5 comprobado. El CRF 16 queda solo en `proyectos/049/finales/` |

## Cómo cambiar cada pieza

- **Otra apertura:** `c01-apertura` de `metraje-049.ts` (clip, `desde`, color); si es otro clip, su fila en `MATERIAL` de `normalizar.mjs` con su sha y su X. La primera toma sale sin texto ni voz (regla fija).
- **Otro hook / mitad / CTA:** su fila en `MATERIAL` (con sha) y su ventana en `VENTANA_VOZ` (¡`perfil.py` y `limites-voz.py --margen 20`, no el 40!), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra con `onsets-voz.py` + `palabras-desde.py` y comprobada con `subs-vs-voz.py`. Si cambia la duración del plano cambia la rejilla (abajo).
- **RC01 en la V27 y en la V31:** el reparto original la daba de apertura a la V27 (045); aquí entra en el bloque 5 por encargo del usuario. Comparte 0,9 s de imagen con esa apertura. Si el usuario prefiere que no se repita, vuelve RC06 (0,10-3,60 s: la alcoba por otro ángulo; ya normalizada en la rev. 0, se repone con `normalizar.mjs`).
- **Otro tramo de un recorrido:** `desde` (segundos del MP4 normalizado) y `reason` del plano; la duración la fija el golpe siguiente. Mirar quién sale (un tramo de RC13 enseña a un hombre reconocible) y el adorno de la alcoba (RC08).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-049.json`; `rejilla-049.py` (editar los rangos y el rango del CTA); la tabla `GOLPE`, `INICIO_MUSICA` y los niveles de `audio-049.ts` (`LUFS_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`). La alternativa asignada, *Aleksey Chistilin - Deep Breath* (ambient, `abceb83c`): medida en la V7 y la V11: sin pulso, sirve de fondo y no de rejilla.
- **La versión de ≈ 40 s:** la otra familia de la rejilla (entrada 167,452 s): planos de 2,0-2,5 s y apertura de 1,55 s (`rejilla-049.py`).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,22, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella). Stills antes/después: `stills-multiples.mjs`; `luma.py` (scratchpad de la sesión; `medir-color.py` es el de la pieza anterior).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-049.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha (anuncios):** `npx remotion render … Recorrido049 … --props={"sinSubtitulos":true} --muted …` y `ficha.mjs video tierra-grata` (skill `ficha-luxur` §3).

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**la**» de «que no es la tuya» (HK03, f114 = 3,8 s) · «**esta**» de «esta unidad» (MD05, f677 = 22,6 s) · «**durante**» (CT01, f1253 = 41,8 s) · «**tu**» de «toda tu estancia» (CT01, f1283 = 42,8 s) · «**contáctanos**» (CT01, f1302 = 43,4 s; ¿«-anos» o «-enos»?).
- **«Plusvalía»** (HK03): palabra de Isabella; en el mundo inmobiliario suele ser valorización. Si se prefiere, se corta la frase (no se puede sin recortar la toma).
- **La canción**: medida, no oída; licencia sin verificar; los tres cortes sobre golpes de 7,5-8,5 dB (f344, f449, f983) y el de f1066.
- **El clímax es el jacuzzi comunal**, no el privado del balcón (la foto `3-Jacuzzi.png`): no sale en ningún clip del material revisado.
- **El adorno oscuro de la pared de la alcoba** (RC08, 29,5-30,4 s) y las personas a lo lejos (Social Kitchen, gimnasio).
