# Combinaciones — proyecto 060 · Apartaestudio Quadrato (Laureles, Medellín), V42 («Tu plata en el banco pierde valor»)

Registro de esta versión y mapa de «cómo cambiar cada pieza». Es la primera de las tres versiones de este apartaestudio que se montan a la vez en sesiones distintas (reparto en `proyectos/054/reparto-054-062.md`, que manda); las otras dos son la V43 (061, «pocos permiten rentas cortas») y la V44 (062, «Medellín, tercer mercado de renta corta»). La canción está reservada en `archivos/musica/registro-de-uso.md` (fila V42).

## Versiones de este apartaestudio

| V | Proyecto | Estado | Fecha | Qué es |
|---|---|---|---|---|
| **V42** | **060** | **FINAL EXPORTADA (rev. 2, 2026-10-22)** en `finales/`: `060-recorrido.mp4` (CRF 12, 94,1 MB) · `060-recorrido-crf16.mp4` (CRF 16, 50,6 MB) · `060.srt` (20 líneas) · `060-portada.png` (LAURELES · VENTA) · `060-recorrido-ficha.mp4` (sin subtítulos, tipo · lugar · COP 410 M abajo, **sin banda mientras salen las cifras**, 101,9 MB; rev. del 2026-10-22 por encargo; **infografía centrada en vertical en las tres versiones, 2026-10-22**) + `caption.md`; la prueba rev. 2 aprobada queda en `pruebas-720p/060-recorrido.mp4` (rev. 1 y rev. 0 como `-rev1` y `-rev0`). Sin commit | 2026-10-22 | **«Tu plata en el banco pierde valor»**: ZC07 (el rooftop) · **HK03** · RC16 · RC05 · RC09 · **MD05 `MEDIO7`** · [infografía de 14 s sobre RC13 · RC03 · RC15 · ZC01] · ZC11 (la vista, con la utilidad encima) · **CT03** · ***Street Level Sessions on the Green*** · 1642 f · **54,7 s** |
| V43 | 061 | en montaje (otra sesión) | 2026-10-22 | «Pocos permiten rentas cortas»: HK04 · MD04 · CT01 · *La Isla Bonita* · apertura ZC22 |
| V44 | 062 | en montaje (otra sesión) | 2026-10-22 | «Medellín, tercer mercado de renta corta»: HK02 · MD02 · CT02 · *In This Together* · apertura ZC29 |

## Lo entregado (final de la rev. 2, 2026-10-22; infografía CENTRADA en vertical el mismo día)

**Rev. «centrada» (2026-10-22, encargo del usuario: «centralo a la mitad verticalmente para que en el 1x1 no se recorte arriba»):** los paneles 1 y 2 de la infografía bajan 151 y 122 px (cada panel centrado en y 960, zona y 570-1350; el 3 ya lo estaba), así que el máster, el CRF 16 y la ficha se renderizaron de nuevo; `.srt`, portada y caption no cambian y el audio es el mismo (PCM `b81b54a7…`). Fuera de la infografía el PSNR contra el máster anterior es ≥ 52 dB. Stills antes/después en `pruebas-720p/infografia-centrada/`. Lo que sigue describe las tres versiones tal como quedan.

Todo en `proyectos/060/finales/` (la sesión madre lo mueve al SSD). 1080×1920 · 30 fps · 1642 f · 54,78 s · H.264 yuv420p · AAC 48 kHz 320 kb/s · BT.709 completo (matriz, transferencia, primarios, rango limitado).

| Archivo | Qué es | Cómo se hizo |
|---|---|---|
| `060-recorrido.mp4` | el máster con subtítulos editoriales (CRF 12, 94,1 MB) | `--crf=12 --x264-preset=slower --color-space=bt709 --image-format=png --gl=angle --audio-bitrate=320k` (R22) |
| `060-recorrido-crf16.mp4` | la misma imagen en CRF 16 (50,6 MB) | `--crf=16 --x264-preset=slow`, mismas banderas |
| `060.srt` | 20 líneas (`exportar-srt.mjs`) | de `subtitulos-060.ts` |
| `060-portada.png` | 9:16 · LAURELES · VENTA · isotipo PL | `portada-luxur`, fotograma t = 2,3 s del rooftop de la apertura (no hay texto sobre él); contraste 8,5 : 1 el texto y 4,8 : 1 el isotipo |
| `060-recorrido-ficha.mp4` (101,9 MB) | **sin subtítulos**; tipo · lugar · precio en Montserrat abajo del 1:1, **con la banda FUERA mientras salen las cifras** (encargo del usuario, 2026-10-22: «remueve el texto de la ficha cuando salga las cifras»). Entra en 0,5 s; **sale del f858 al f870** (antes del corte a la cama del f876 y de la primera cifra, f887); **vuelve del f1426 al f1438** (después de la disolvencia al CTA, f1410-f1422); se va otra vez del f1569 al f1581, antes de la tarjeta. Fundidos de 12 f; la infografía va (es imagen) | base `Recorrido060 --props={"sinSubtitulos":true}` (muda, CRF 6) + `herramientas/ficha-oculta.mjs <base> --audio 060-recorrido.mp4` (dos copias del PNG de `ficha.mjs png`, cada una con sus fundidos: un alfa no puede volver a subir tras bajar a cero); audio copiado del máster (md5 del PCM `b81b54a7…`); etiquetas BT.709 por remux sin recodificar. Stills de comprobación en `pruebas-720p/ficha-oculta/` |
| `caption.md` (en `proyectos/060/`) | descripción de Instagram, versión resumida | — |

**Etiquetas de color:** Remotion deja los MP4 sin transferencia ni primarios; se corrigió sin recodificar (`h264_metadata` + `-movflags +write_colr`) en el máster, el CRF 16 y la ficha. Comprobado: framemd5 de los 1642 fotogramas idéntico antes y después y PCM del audio idéntico (`medidas/etiquetas-master.txt`). El audio de los tres MP4 es **el mismo PCM** (md5 `b81b54a7…`).

## Lo que lleva (rev. 0)

| Pieza | Lo elegido | Por qué (ver `artefactos/01-plan.md`) |
|---|---|---|
| Apertura | ZC07 0,30-3,37 s | el rooftop (no hay dron): el borde blanco y el agua turquesa del jacuzzi con el cielo de nubes y la ciudad detrás; su frame 0 es la miniatura |
| Hook | HK03 `HOOK3` (voz 0,64-7,97 s) | «Tu plata en el banco pierde valor cada mes. Este estudio de 24 metros cuadrados en Laureles ya está generando dólares.» Entra disolviendo; el golpe de la música cae 4 f antes de acabar la disolvencia y su primera palabra suena en el f99 |
| Paseo (bloque 3) | RC16 0,30-4,03 · RC05 1,20-4,37 · RC09 0,30-2,97 s | lo que se alquila: el baño (ducha de vidrio, toallero) → la cocina equipada (fregadero, microondas, nevera) → el escritorio con los portátiles; baño y escritorio giran a la izquierda y la cocina avanza recto |
| Mitad | MD05 `MEDIO7` (voz 1,31-9,27 s) | «La renta tradicional deja el 0,5 % de rentabilidad mensual. Esta inversión deja más del 1 %. Ven, te muestro cómo.» Entra disolviendo; solo 6 f de aire hasta el golpe del plano siguiente |
| Bloque 5 (rev. 2) | RC13 0,50-4,00 · RC03 0,50-4,00 · RC15 0,50-4,00 · ZC01 0,50-4,00 · ZC11 2,10-6,30 s | **bajo la infografía** (velo negro del 80 %), cuatro planos de 3,5 s que se funden a un frame libre: la cama con el panel de listones → el estudio con la tele → la cama y el sofá → el coworking; y LA VISTA: del borde del jacuzzi sube a la ciudad, las montañas y las nubes (4,2 s, a corte en un golpe de 10,7 dB; el plano más largo del bloque), con la utilidad estimada encima |
| CTA | CT03 `CTA3` (voz 0,96-5,62 s; el plano usa 0,53-5,87 s) | «Si deseas que te envíe la rentabilidad mensual, haz clic en el enlace y escríbeme un mensaje.» Entra disolviendo en el f1422, un frame libre (la canción no tiene golpes ≥ 10 dB entre 197,7 y 204,8 s); el cierre es la tarjeta oscura con el logo y la web, que es justo el enlace del que habla |
| Canción | *Street Level Sessions on the Green* (`e428a369`) desde 154,567 s (`INICIO_MUSICA` = 4637/30) | cada cambio de plano en un golpe MEDIDO (13,5-23,6 dB); lo-fi sin pulso, sin caída propia ahí: tras la última palabra del CTA se apaga con curva bajo la tarjeta; **repetida de la V12/028 (One Living), autorizada por el usuario** |
| Voz | −15,0 LUFS tratada (+18,9 · +18,4 · +18,5 dB tras el compresor 3,5:1; limitador −2,5 dBFS; pico real −2,5 dBFS) | pedido permanente del canal |
| Música | −15 LUFS sola por tramos (−3,6 · −4,3 · −4,9 dB sobre el archivo); −26 LUFS bajo la voz | ver `aprendizajes.md` |
| Color | `COLOR_BASE` + el ajuste de cada plano (exposición −0,25…+0,05 según el plano) | luma de los planos 106-140; sin quemado; aplastado ≤ 4,4 % |
| **Infografía (rev. 1-2)** | `Infografia060.tsx` + `infografia-060.ts`: tres paneles sobre el bloque 5 (f876-f1406: 14 s + 3,7 s de la utilidad sobre la vista) | **encargo del usuario del 2026-10-22** (tras «ven, te muestro cómo»): sus cifras y sus nombres, estimadas, con el pie de la web. **Rev. 2 (el usuario: «pasan muy rápido, no hagas animación en los números»):** cada cifra entra completa con un fundido de 8 f, sin recuento, y se queda; una cifra cada 1,3-1,5 s y cada héroe 2,5-3,2 s entero; cada elemento entra en un golpe medido. Costó alargar la pieza de 47,4 a 54,7 s y rehacer el bloque 5 |

## La rejilla (golpes MEDIDOS de la canción, `musica/golpes-cancion-entera.json`; `buscar-cortes-060.py`, registro en `musica/rejilla-060.txt`)

| Frame | Plano que entra | Cómo | Golpe (s de la canción · dB) | Suena en el render (`golpes-render.py`) |
|---|---|---|---|---|
| 3 | c01 rooftop | corte (el frame 0) | 154,614 · 16,4 | (entrada de la música) |
| 88 (en = 92) | c02 hook | disolvencia que CRUZA el golpe (la imagen de Isabella al 67 %) | 157,453 · 15,5 | — |
| 332 | c03 baño | corte seco | 165,583 · 20,4 | +0,1 f |
| 444 | c04 cocina | corte seco | 169,313 · 14,5 | 0,0 f |
| 539 | c05 escritorio | corte seco | 172,492 · 16,0 | +0,4 f |
| 619 | c06 mitad | disolvencia que ACABA en el golpe | 175,147 · 13,5 | — |
| 876 | c07 cama (abre la infografía) | corte seco | 183,720 · 17,5 | +0,2 f |
| 981 · 1086 · 1191 | c08 tele · c08b sofá · c08c coworking | disolvencias a frames LIBRES (bajo el velo negro de la infografía) | — | — |
| 1296 | c09 vista | corte seco | 197,723 · 10,7 | +0,3 f |
| 1422 | c10 CTA | disolvencia a un frame LIBRE (la canción no tiene golpes ≥ 10 dB entre 197,7 y 204,8 s) | — | — |

Los cinco cortes secos (f332 · f444 · f539 · f876 · f1296) caen a ≤ 0,4 f de un golpe que SUENA en el audio de la prueba rev. 2 (`medidas/golpes-render-prueba.txt`). La infografía entra además en golpes medidos (tabla de `artefactos/03-timeline.md`).

## Lo medido en la prueba (rev. 0)

| Qué | Medida |
|---|---|
| Audio (ebur128, `medidas/audio-prueba.txt`, rev. 2) | música sola −15,0 (apertura) · −15,0 (paseo) · −14,8 (la infografía) · −15,3 (la vista); con la voz: hook −14,7 · mitad −14,9 · CTA −15,2; pieza −15,0 LUFS, pico −3,5 dBFS (sin saturar). **Hasta el f875 el audio de la rev. 2 es idéntico (md5 del PCM) al de la rev. 1** |
| Subtítulos | 20 líneas a −0,2…+2,6 f de su palabra sobre la voz sola (`lineas-vs-onsets.py`; `medidas/lineas-vs-onsets.txt`) |
| Color (luma, `medir` sobre fotogramas del render a escala 1) | 106-140 de media entre planos (cama 132, coworking 140, vista 112); el salto del coworking a la vista es −28 (interior blanco → cielo) |
| Cierre | tarjeta de 2,0 s con el logo y la web; negro exacto en el f1360 (la puerta) |
| **Infografía (rev. 2, centrada)** | imagen hasta el f875 **idéntica** a la rev. 1 (PSNR medio 82,8 dB, mín. 45,9) · contraste de la infografía (velo mezclado en sRGB, `medidas/legibilidad-infografia.txt`): blanco 14-15 : 1 en los paneles 1 y 2 (oro 6,3-6,6 : 1) y ≥ 5,4 : 1 en el panel 3 · puerta 2g en verde (cifras exactas, la cuenta cuadra, sin recuentos, una cifra cada ≥ 1,3 s, héroes de 2,5 · 2,7 · 3,2 s enteros, todo en y 440-1200) |
| **El final (CRF 12, `medidas/`)** | audio (`audio-final.txt`): **−15,0 LUFS integrado**, LRA 3,1 LU, pico real **−3,5 dBFS** · color (`color-final-centrada.txt`, 10 fotogramas —4 de ellos de la infografía— contra los stills a escala 1 con `--gl=angle`): PSNR bruto medio 48,3 dB (mín. 45,2), de baja frecuencia 55,7 dB (mín. 52,0), desvío de color medio ≤ 0,21 niveles por canal → ✅ 0 fuera de umbral (audio: `audio-final-centrada.txt`, −15,0 LUFS y −3,5 dBFS, igual) · la imagen de la ficha, sin su rótulo, coincide con la del máster en la mitad de arriba (PSNR mín. 47,2 dB, media 52,3) y su cierre es idéntico |
| Puerta | `node proyectos/060/revisar-060.mjs` sale con 0; con `--final` falla por los «POR CONFIRMAR» (abajo) |

## Metraje compartido con las otras versiones del apartaestudio (declarado)

- **Con la 061 (V43) y la 062 (V44):** ni un segundo (la puerta, 7b). Coordinado el 2026-10-22 en `side-session-notes/…/06x-tramos-de-recorrido.md`: 061 usa ZC22, RC01, RC17, RC07, RC10, ZC05, ZC18; 062 usa ZC29, ZC10, ZC21, ZC06, RC12, RC04, RC18; esta pieza usa ZC07, RC16, RC05, RC09, RC13, ZC01, ZC11. Esta pieza soltó RC01, RC04, ZC03, ZC06 y ZC10, que había reclamado.
- **Las tres tomas están en el mismo estudio** (24 m²): hook de pie con el balcón al fondo, mitad de pie caminando con la cama delante, CTA sentada en el escritorio. Declarado en la puerta (2a).
- Hook, mitad, CTA y canción son exclusivos de esta pieza dentro del apartaestudio (reparto).

## Cómo cambiar cada pieza

- **Otro hook / mitad / CTA** (libres: HK01 `HOOK1`, la peor transcrita: óyela antes · MD01 `MEDIO1/2` · MD03 `MEDIO4` · CT04 `CTA4`): añade su fila a `MATERIAL` de `normalizar.mjs` (con su sha) y su ventana a `VENTANA_VOZ` (mide el FINAL con `envolvente-voz.py`, no con `limites-voz.py`: se come las sílabas débiles del final), la ganancia con `herramientas/probar-voz.py --umbral 0.0316 --razon 3.5` (editar su `TOMAS`) → `GANANCIA_VOZ_DB`. Luego `voz.s0/s1/lufs/dice` del corte, el guion marcado `voz/<toma>.txt`, `trozos-editoriales.mjs` y cada línea llevada a su palabra con `onsets-voz.py` (la tabla de `lineas-vs-onsets.py`). Un cambio de duración mueve la rejilla: **repetir `buscar-cortes-060.py`** (la mitad pide ≥ 6 f de aire tras su última palabra y el hook ≥ 14 f).
- **Otra canción:** reservarla en el registro; `medir-pista.py … --json musica/golpes-<canción>.json` y `buscar-cortes-060.py`; `INICIO_MUSICA`, los `GOLPE` de `metraje-060.ts`, los niveles de `audio-060.ts` (`LUFS_TRAMO`, `PICO_TRAMO`, `LUFS_CANCION_EN_VOZ`; `lufs-rangos.py`) y `FIN_MUSICA_060`.
- **Otra entrada de la misma canción:** con esta canción casi no hay (la 154,614 s es la única con golpe ≥ 13 dB en todos los cortes y las ventanas del hook y la mitad); con ventanas más anchas, `buscar-cortes-060.py` da más (`musica/rejilla-060.txt`).
- **Otro plano de recorrido:** mira su hoja (`herramientas/hoja-tramos.py <salida> 6 110 rcNN:desde:hasta`) y su giro (`dir-flujo.py` en `proyectos/060/herramientas/`: `dx > 0` = la cámara gira a la izquierda; el paseo y el bloque 5 giran a la izquierda) antes; los candidatos ya normalizados están en `remotion/public/recorrido-060/` (RC02-RC11, RC13-RC16, ZC01-ZC05, ZC07, ZC11-ZC13, ZC25). Un plano que entra disolviendo pide 12 f de clip antes de su `desde`.
- **Otro color:** `color({…})` de cada plano (topes de la puerta: `vibrance` ≤ 0,05, |`exposure`| ≤ 0,4, `contrast` ≤ 1,15, `saturation` 0,95-1,12 y ≤ 1,06 en Isabella).
- **Cambiar una cifra o un nombre de la infografía:** `CIFRAS` y `ETIQUETAS` de `infografia-060.ts` (la puerta 2g exige que sean las del usuario y que la cuenta cuadre: 30 noches al mes, tarifa × noches = ingresos, administración + servicios = gastos, ingresos − gastos = utilidad: si cambia la tabla, cambian también `CIFRAS` y `NOMBRES` de la puerta). Los tiempos son los golpes de `GOLPES_INFO`. Quitarla: borrar `<Infografia060 />` de `Recorrido060.tsx` (la rev. 0 es lo mismo sin ella; la puerta 2g falla y se quita su sección).
- **Sin música** (publicar con un audio de la plataforma): `HAY_MUSICA = false` en `audio-060.ts`; las voces siguen a −15 LUFS.
- **Versión con ficha:** `Recorrido060` con `--props={"sinSubtitulos":true}` y `node proyectos/060/herramientas/ficha-oculta.mjs <base.mp4> --audio <máster.mp4> --salida …` (tipo · lugar · COP 410 M; NO `ficha.mjs video`, que no sabe hacer el hueco de la infografía). Si cambia la infografía o el CTA, cambian los frames de `F` del script (cada uno está comentado contra `metraje-060.ts` e `infografia-060.ts`). El máster para el audio vive en el SSD: copiarlo a `proyectos/060/finales-trabajo/` y trabajar sobre la copia.

## Lo por confirmar

- **Oír** (POR CONFIRMAR AL OÍDO; la puerta con `--final` falla solo por esto). Todas se **midieron** (`medidas/formantes-hook.txt`, `formantes-mitad.txt`, `formantes-cta.txt`) y se declaran; no se cierran sin un oído:
  - «**cada mes**» (HK03, f153 = 5,1 s del vídeo): whisper oye «kamis». Apoyan «cada mes»: la /k/ con su cierre de 60-70 ms, dos [a] con una /d/ aproximante en medio y /m/ + vocal + /s/ en 0,36 s (tres sílabas, el ritmo de ella).
  - «**de 24**» (HK03, f211 = 7,0 s): whisper no oye el «de». Hay una sílaba breve a los 4,40 s que lo apoya; si no existiera, la línea entraría 4 f más tarde, con «24».
  - «**0,5 %**» y «**1 %**» (MD05, f668-f693 y f795 = 22,3-23,1 s y 26,5 s): whisper oye «0.5» y «1%» sin «por ciento»; no se puede cerrar por la envolvente si dice «cero coma cinco por ciento» o «medio por ciento» (el escrito «0,5 %» vale para las dos).
  - «**ven, te muestro cómo**» (MD05, f830-f842 = 27,7-28 s): whisper oye «veinte muestros como»; la envolvente lo parte en siete sílabas con una pausa tras «ven»: «ven, te muestro cómo».
  - «**escríbeme**» (CT03, f1539 = 51,3 s del vídeo): whisper oye «escribete» (confianza 0,29-0,57) y «escribamos» sobre la cola aislada. **SIN CERRAR**: entre «-be» y «-me» hay ≈ 100 ms de casi silencio (4,87-4,96 s de la toma) que no es el murmullo de una /m/ y se parece al cierre de una /t/. Se mantiene «escríbeme» (la gramática y el catálogo) y la nota; hace falta un oído: **51,4-52,0 s del vídeo** (la «y escríbeme» entera: 51,3-52,2 s).
  - **Cómo cambiar una**: el texto del trozo en `subtitulos-060.ts` (y su `dice` en `metraje-060.ts` y `voz/<toma>.txt`), `exportar-srt.mjs` para el `.srt`, y como el texto va dentro de la imagen de los finales con subtítulos, **volver a renderizar el máster y el CRF 16** (≈ 6 + 5 min) y repetir las etiquetas de color; la versión con ficha (sin subtítulos) no cambia. El caption no repite ninguna.
- La canción (medida, no oída; repetida de la V12; licencia sin verificar).
- Por dónde se escribe («escríbeme»: mensaje directo o WhatsApp) y si el caption lleva el número.
- **La portada** (hecha): con la infografía el plano de la vista lleva texto de f1296 a f1406, así que no sirve; la portada sale del **rooftop de la apertura** (ZC07, t = 2,3 s del final: el jacuzzi con el cielo y la ciudad, sin texto) con «LAURELES», la línea y `VENTA`. Si el usuario prefiere la vista, hay que sacarla de la rev. 0 o de un render con `--props` sin infografía (no existe: añadir una prop `sinInfografia`).
- **La utilidad de la infografía sobre el precio de la ficha:** $4.045.000 al mes sobre COP 410 M es el **0,99 %** mensual, un pelo por **debajo** del «más del 1 %» que dice Isabella en la mitad (y casi el doble del 0,5 % de la renta tradicional). No se ha tocado ni la voz ni la cifra; se le avisa al usuario.
- **«habilitado para rentas cortas»** y los ingresos: la propia web advierte que varían por temporada; el reel no lo dice (lo dice la voz solo en la mitad) y el caption lo añade como aviso.
