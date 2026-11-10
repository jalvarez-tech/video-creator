# Combinaciones — proyecto 064 · Lote en San Vicente Ferrer (vereda La Porquera), V46 · REV. 1

Registro de esta versión y mapa de «cómo cambiar cada pieza». Las otras dos versiones del lote son de sesiones hermanas del mismo encargo: la V45 (063, «El error») y la V47 (065, «15 minutos de la autopista»); el reparto de tomas, drones y canciones está en `proyectos/063/reparto-063-065.md` (rev. 2) y lo que usó cada versión, en `archivos/musica/registro-de-uso.md`.

## Versiones de esta propiedad

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| V45 | 063 | sesión hermana | 2026-10-22 | «El error» |
| **V46 · rev. 0** | 064 | **DESCARTADA** (prueba guardada como `pruebas-720p/064-recorrido-rev0.mp4`) | 2026-10-22 | aérea (DR07) · HK02 · DR03/DR04/DR03 · MD02 recortada · DR04 · DR07 (vista) · CT03 · *Cornfield Chase* · 46,8 s. El usuario cambió el material y el planteamiento (ver rev. 1) |
| **V46 · rev. 1** | **064** | **FINAL EXPORTADA el 2026-11-03** (CRF 12 + CRF 16 + `.srt` + portada + ficha, en `finales/`; sin commit) tras el OK del usuario a la prueba (`pruebas-720p/064-recorrido.mp4`) | 2026-10-22 | **«No hace falta irse lejos»**: DR03 · **HK02 A** · **HK02 B («Ven, te muestro», a corte)** · DR03 + **INFOGRAFÍA de distancias** · **HK05** · DR01 (24-48 s) · vista · **CT03** · *Cornfield Chase* · 1296 f · 43,2 s |
| V47 | 065 | sesión hermana | 2026-10-22 | «15 minutos de la autopista» |

## Lo que lleva (rev. 1)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Hook (A) | `Hook2.mp4` voz 6,97-13,38 s de 16,8 | las dos cifras («350 millones» y «3.244 metros cuadrados»): se escriben las dos |
| «Ven, te muestro» (B) | `Hook2.mp4` voz 13,92-14,55 s, **a corte sobre su propia imagen, con un empuje (1,11→1,15)** | idea del usuario: el «ven, te muestro» como puente al dron; el salto es de 0,23 s del clip y cae en un arpegio de 8,8 dB |
| Infografía | **«De Medellín · 1 hora»** y **«De la autopista Medellín-Bogotá · 15 minutos»** (+ «Tiempos aproximados»), sobre DR03 | los números de la ficha que la voz NO dice; sin animar las cifras (como en la 060); velo en franja (0,68); centrada en y 960; la banda de la ficha se va |
| Mitad | `Hook5.mp4` (el antiguo `medio2`), voz 7,28-12,45 s | «no necesitas estar a tres horas…»: solo la primera frase (la parte B y lo que sigue no se usan) |
| CTA | CT03 `cta3.mp4` (voz 6,57-12,86 s de 15,8) | una sola acción, «escríbeme» |
| Drones | DR03: 0,30-4,20 (apertura) · 18,00-21,40 (cenital) · 33,00-36,10 (cerca) · DR01: 24,50-27,97 (horizonte) · 43,00-47,60 (la vista) | DR03 entero y DR01 en 24-48 s (reparto rev. 2) |
| Canción | *Cornfield Chase* (`e28cd1ab`), entrada 86,533 s (`INICIO_MUSICA` = 2596/30) | golpe de 9,9 dB en el f3, clímax (−9,6 LUFS) sobre el bloque 5 y su caída natural justo donde entra el CTA (f1007) |
| Voz | −15 LUFS tratada (+19,0 · +18,5 · +19,3 dB tras el compresor 3,5:1; limitador −2,5 dBFS) | pedido permanente: «a −15 LUFS sin saturar» |
| Música sola | −15 LUFS por tramos (−2,0 · −2,6 · −5,4 dB); −26 bajo la voz | la canción sube sola de −13 a −9,6 LUFS |
| Color | `COLOR_BASE` + ajuste por plano (drones: saturación 1,04-1,05, exposición −0,05) | primera tanda; se afina con la reacción del usuario |

## Lo medido en la prueba (rev. 1)

| Qué | Medida |
|---|---|
| Voz | −15,0 · −14,7 · −14,9 LUFS en sus ventanas del render (música a −26 debajo), picos −4,6 · −4,5 · −4,6 dBFS |
| Música sola | −14,9 (apertura) · −15,0 (infografía) · −14,8 (bloque 5) LUFS |
| Pieza | −15,2 LUFS integrado, pico −4,2 dBFS |
| Golpes (`golpes-render.py`) | f378 (7,9 dB) 0,0 f · f573 (6,7 dB) +0,2 f · f869 (7,0 dB) +0,2 f. **f327 (el corte a «Ven, te muestro», 8,8 dB)**: el detector mide la voz de Isabella, que entra 5 f después (+5,5 f): no es una medida de fase; la música está baja ahí (−26 LUFS) y el arpegio suena casi solo, en la pausa entre las dos partes del hook |
| Subtítulos (`lineas-vs-onsets.py`) | 18 líneas a +0,0…+1,7 f de su palabra sobre la voz sola |
| Infografía (`legibilidad-infografia.py`) | con el velo de 0,68: blanco ≥ 11,7 : 1 y oro ≥ 5,2 : 1 (p90 del fondo); con 0,62 el oro quedaba a 4,4 : 1 y se subió |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1235 (la puerta) |

## La entrega (2026-11-03, sesión de exportación)

Montaje sin tocar: la puerta (`revisar-064.mjs`) y `npm run lint` pasan; con `--final` falla SOLO por las tres notas de «asombroso» (ver abajo). Un still a escala 1 con `--gl=angle` coincide con la prueba aprobada (mismo encuadre, PSNR 32-37 dB frente a un H.264 a 540×960; la tarjeta, 58 dB).

| Archivo (`finales/`) | Qué es | Cómo |
|---|---|---|
| `064-recorrido.mp4` | el máster, CRF 12, 1296 f = 43,2 s, 220 MiB | `npx remotion render src/proyectos/064/entrada-064.tsx Recorrido064 … --crf=12 --x264-preset=slower --audio-bitrate=320k --image-format=png --gl=angle --color-space=bt709 --concurrency=4` (desde `remotion/`) |
| `064-recorrido-crf16.mp4` | la misma imagen en CRF 16, 125 MiB (PSNR contra el máster, 1 de cada 12 f: media 43,8 dB · mín 38,5) | `--crf=16 --x264-preset=slow`, mismas banderas |
| `064.srt` | 18 líneas, 4,33 → 40,90 s | `exportar-srt.mjs remotion/src/proyectos/064/subtitulos-064.ts` |
| `064-portada.png` | `SAN VICENTE FERRER` · VENTA, fotograma de los **28,0 s** (el horizonte de DR01: la ladera con terrazas, el seto y las casas del fondo; a 0,57 s de la disolvencia a la vista; el más nítido de su plano). Contraste 11,3:1 el texto y 8,5:1 el isotipo; la locación baja a 72 px para caber en 840 px. Receta en `portada.json`. Se descartó la vista (29,5 s): una caseta de obra y tinas azules pegadas al texto. Una tina del metraje queda tras la esquina de la «P» (en los cuatro segundos probados, 26,8-28,0) | `portada-luxur` |
| `064-recorrido-ficha.mp4` | **sin subtítulos**, `LOTE EN VENTA · San Vicente Ferrer · La Porquera · $ 350 M COP` abajo del 1:1 (lugar a 50 px: no cabía a 54), **la banda fuera mientras está la infografía**: entra en 0,5 s · **sale f354→366** · **vuelve f577→589** · se va f1223→1235 antes de la tarjeta; audio copiado del máster, 226 MiB | base `Recorrido064 --props={"sinSubtitulos":true} --muted --crf=6 --x264-preset=fast` + `herramientas/ficha-oculta.mjs <base> --audio finales/064-recorrido.mp4` |

**Lo medido sobre los finales** (`medidas/`): audio del máster (`audio-final.txt`) idéntico a la prueba: −15,0 · −14,7 · −14,9 LUFS en sus ventanas, −15,2 integrado, pico −4,2 dBFS; el audio de los tres MP4 es **el mismo PCM** (`1b8dee363ad618d6b716cade4b698a7a`); golpes (`golpes-render-final.txt`) f378 +0,0 · f573 +0,2 · f869 +0,2 (f327: la voz, como en la prueba); color (`color-final.txt`, 10 fotogramas contra stills a escala 1): PSNR bruto medio 44,1 dB (mín 36,8), de baja frecuencia 53,1 (mín 45,8), desvío ≤ 1,23 niveles (el azul de los dos primeros fotogramas del dron) → ✅; etiquetas BT.709 puestas sin recodificar en el máster y el CRF 16 (`etiquetas-finales.txt`: framemd5 y PCM idénticos antes y después); la banda de la ficha (`ficha-banda.txt`): con banda 33-54 de diferencia de luma contra su base, en el hueco de la infografía 0,6-2,4 (ruido de recodificación); la base muda contra el máster, en la mitad de arriba: PSNR medio 49,4 dB (mín 41,7 en el f562, dentro de una disolvencia).

**Palabra exportada SIN OÍR: «asombroso»** (CTA, «este asombroso lote», línea del f1181 = **39,4 s** del vídeo; la palabra, sobre 39,5-39,7 s). Medida en `medidas/formantes-cta.txt`: la vocal tras «es-t-» (70 ms) no es una /e/ limpia (F2 ≈ 1730-1830 Hz, las /e/ de esa toma miden 2000-2360 y su /a/ de «para» 1630-1910): una /e/ arrastrada hacia /a/, que apunta a «este-asombroso» en sinalefa; el recuento de sílabas (6 arranques) no decide entre «asombroso» y «sombroso». **SIN CERRAR**: se exportó «asombroso» y las tres notas POR CONFIRMAR AL OÍDO se quedan. Si se oye «sombroso»: el texto del trozo `desde: 1181` del bloque `c03` de `subtitulos-064.ts`, `dice` en `metraje-064.ts`, `voz/ct03.txt` y `064.srt`, y volver a renderizar el máster y el CRF 16 (la ficha no lleva subtítulos).

**Peso:** los tres vídeos pesan 125-226 MiB: el dron sobre hierba es textura pura y a CRF 12 el máster pasa de los 40 Mb/s (el 060 pesaba 94 MB en 54 s).

## Cómo cambiar cada pieza

- **El corte «Ven, te muestro»:** `c02a-hook` (`desde` fr(196), `dur` hasta el f327) y `c02b-invita` (`desde` fr(413), `en` 327, `zoom` `EMPUJE_INVITA`) de `metraje-064.ts`, `VENTANA_VOZ.hk02` de `normalizar.mjs` (son DOS ventanas: 6,97-13,38 y 13,92-14,55 s) y los trozos h03/h04 de `subtitulos-064.ts`. Si el usuario prefiere el hook entero sin corte, se unen los dos planos en uno (`s1` 14,55) y se quita el empuje.
- **La infografía:** `infografia-064.ts` (cifras, textos, tiempos `F`, zona `LAYOUT`, velo `VELO`) y `Infografia064.tsx` (el componente). Más amenidades (acueducto, escrituras) son más filas con el mismo patrón y más tiempo en pantalla; el reparto de la sesión madre pone la «LA FICHA» en la 065 y «LO QUE SÍ TIENE» en la 063, y aquí van las DISTANCIAS. **Solo datos de la ficha** (nada de energía, uso del suelo ni «apto para construir»).
- **La versión con ficha** (`ficha-luxur`): `Recorrido064` con `--props={"sinSubtitulos":true}` + `proyectos/064/herramientas/ficha-oculta.mjs` (la banda SALE de f354 a f366, VUELVE de f577 a f589 y se va antes de la tarjeta, f1223-f1235); la ficha de esta propiedad está en `proyectos/064/ficha.json`.
- **Otro hook / mitad / CTA:** añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mira la energía antes de fiarte de `limites-voz.py`: estas tomas traen 6-7 s de ruido de sala y huecos de silencio digital), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` → `GANANCIA_VOZ_DB`; luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, cada línea llevada a su palabra (`onsets-voz.py` + `palabras-desde.py`; tabla en `lineas-vs-onsets.py`). **Son anamórficas** (SAR 81:256): se escalan enteras.
- **Otro plano de dron:** medir su movimiento ANTES (`hoja-tramos.py <png> 5 130 clip:desde:hasta …`). El `desde` va en el tiempo del MP4 normalizado (×1000/1001 sobre la fuente). **DR01 solo en 24-48 s** (la puerta lo comprueba).
- **Otra canción:** reservarla en el registro; medir sus golpes (`medir-pista.py … --json`) y su sonoridad por tramos (`lufs-rangos.py`); los `GOLPE`, `INICIO_MUSICA` y los niveles de `audio-064.ts` y el fin de la envolvente (`FIN_MUSICA_064`: el WAV acaba en el f1211).
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-064.ts`; las voces siguen a −15 LUFS.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto): «**asombroso**» (CT03, f1181 = 39,4 s del vídeo; whisper oye «asombroso» y «sombroso»).
- La canción (medida, no oída; licencia sin verificar: es *Cornfield Chase*, de la banda sonora de *Interstellar*).
- Las distancias de la infografía son las de la ficha de la web (aproximadas: «~1 hora»); si el usuario quiere otras cifras, se cambian en `infografia-064.ts`.
