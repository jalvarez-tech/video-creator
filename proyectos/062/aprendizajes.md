# Aprendizajes — proyecto 062 (V44 · Apartaestudio Quadrato, Laureles, «Medellín, tercer mercado de renta corta»)

Lo que funcionó y lo que no al montar este reel (el tercero del apartaestudio, con la estructura de la 059 y una canción con intro de pulso). Para la siguiente versión de este apartaestudio o de otra propiedad con material parecido.

## 1. El catálogo de la sesión madre puede tener la frase mal: se cierra con cortes AISLADOS, no con la toma entera

El catálogo decía «Laureles es uno de los barrios con mayor ocupación de la ciudad de Medellín» (MD02). Whisper-small sobre la toma entera, y `palabras-desde.py` (cada corte hasta el final del clip), dieron «…uno de los **mejores** barrios como ayer ocupación **en** la ciudad de Medellín». Para saber quién tenía razón se transcribieron **trozos aislados** de la voz sola (`ffmpeg -ss -to` + `transcribir.mjs`: `herramientas/segmentos.py`): 1,45-2,38 s → «es uno de los mejores»; 1,40-2,90 s → «es uno de los mejores barrios»; 2,0-2,9 s → «mejores barrios»; 3,85-5,05 y 3,95-5,05 s → «en la ciudad de Medellín» (6 de 7). Y se contaron sílabas contra la velocidad de Isabella (≈ 7-8 por segundo): entre «uno» y «barrios» caben 7 sílabas (u·no·de·los·me·jo·res, con onsets a 1,565 · 1,715 · 1,960 · 2,060 · 2,195 · 2,290 s y una /s/ débil a 2,36-2,38 s); sin «mejores» serían 4 en 0,9 s, demasiado lento. **Se montó lo oído, POR CONFIRMAR AL OÍDO**, y se dijo que difiere del catálogo (`combinaciones.md`). Una frase del catálogo es una transcripción de whisper de una sola pasada, no un hecho.

**Las /s/ son anclas.** `sibilantes.py` (banda de 4-9 kHz frente a la de voz) marca el FINAL de «barrios» (2,80-2,86 s), de «enlace» (3,92-3,96 s) y de «agendemos» (4,68-4,70 s): justo después viene la palabra siguiente («con», «y», «una»), y ahí entra cada línea.

## 2. `limites-voz.py` da 0,00 s cuando hay chasquidos antes de la voz

En MD02 daba «voz 0,00 → 5,02 s»: eran chasquidos de 0-0,16 s a −28 dB; la voz de verdad arranca a 0,86 s (la energía sube de −39 a −22 dB en 20 ms). En CT02 daba 1,02 s y era un soplo a −47 dB; la voz arranca a 1,23 s. Lo que vale es `envolvente-voz.py` (energía cada 20 ms) y `onsets-voz.py`, como en la 059. Con un `s0` malo la ventana de la voz tratada habría dejado sonar ese ruido a +18 dB de ganancia.

## 3. Una toma muy corta manda sobre la rejilla: HK02 dura 4,835 s

El hook habla de 0,52 a 4,05 s y el clip solo deja 0,77 s después: el plano no puede pasar de 145 f (el clip entero), y no entra disolviendo (su primera sílaba cae a los 15,6 f: ni caben 12 f de prerrollo con la música bajando a tiempo). Entra **a corte** en un golpe, con la primera palabra a los 15,6 f; la salida disuelve al paseo en los 12 f finales. **Rev. 2 (el usuario: «deja que el video siga un momento más, la voz se corta muy rápido»)**: la rev. 0-1 acababa el plano en 133 f (`desde` 3 f) para que su salida cayera en un golpe de 6,8 dB, y la disolvencia empezaba 2 f tras «Latinoamérica»; se pasó a `desde` 0 y 145 f (todo el clip), con la salida SIN golpe (una disolvencia no lo exige), la voz tratada con 0,1 s de fundido de salida (`VOZ_FUNDIDO_SALE_TOMA`) y la música 6 f más baja tras la última palabra. Cuando una toma es la más corta del rodaje, la rejilla se adapta a ella y no al revés. `buscar-cortes-062.py` (la 059 con los rangos de duración y los tipos de entrada como parámetros: `R`, `TIPOS`, `MINC`, `MIND`, `E0`) lo tiene en cuenta con `R[1] = [132,142]`: con rangos «de plantilla» (hook 145-170) no había ninguna solución en la intro de pulso y sí en la meseta flojita; con los reales hay dos (6,995 y 8,004 s).

## 4. Una canción con intro de pulso: la rejilla fuerte dura 24 s, y la intro no admite −15 LUFS

*In This Together* tiene golpes de 11-33 dB **cada segundo** hasta los 24 s y, después, golpes de 7-13 dB. Sirve para los primeros cinco-seis cortes, no para los diez: los cortes secos del bloque 5 caen en golpes de 8,1-8,5 dB (la V31/049, con la misma canción, cortó en 7,5-12,7). Las disolvencias (salida del hook, mitad, estudio, CTA) acaban en un golpe medido pero no lo exigen, y el plan las usa donde el golpe es flojo. Cada corte seco se comprobó sobre el audio del render con `golpes-render.py`: +0,4 · −0,2 · −0,3 · +0,3 f (303 · 394 · 724 · 812).

**El nivel:** la intro es muy dinámica (cresta de 16 dB: media −23 LUFS, pico −7,3 dBFS). Llevarla a −15 LUFS pondría los picos a +0,9 dBFS; se sube lo que el pico permite (+6,0 y +5,0 dB, picos a −1,3 y −1,1 dBFS) y la música sola queda a −17,2 · −16,4 · −15,0 LUFS (la meseta del estudio llega a −15 bajándola 0,9 dB). La música **crece como la canción** de apertura a estudio, y la voz (−15) queda siempre igual o por encima de la música sola. Medido en el render: apertura −16,9 · paseo −16,3 · estudio −15,1 LUFS; voz con la música debajo −14,6 · −14,7 · −15,0.

## 5. El frame 0 es la miniatura: una lona negra en el borde izquierdo

El primer plano (ZC29) empezaba en 3,0 s y en el borde izquierdo del frame 0 se veía una lona negra tirada en la grava (se ve hasta los 3,3 s). Con 3,45 s el frame 0 es el skyline con las montañas, el árbol en su barril y el jacuzzi asomando a la derecha. Antes de fijar la apertura se miró el frame 0 con un still, no solo la tira de fotogramas.

## 6. Coordinación con las otras dos sesiones: leen tu nota, y la cambian ellos si la cambias tú

La primera versión de mi nota (`062-tramos-de-recorrido.md`) reclamaba «RC04 o RC14» para el bloque 5. Cuando cambié de RC04 a RC01 (la cocina con el cajón de cubiertos) la puerta (7b) enseñó que **la 061 ya usaba RC01 0,0-2,8 s**: ella había soltado RC05 a la 060 y había cogido RC01 porque mi nota decía que RC04 era mío. Volví a RC04 (0,40-3,33 s: del escritorio con los portátiles, el mismo donde se sienta Isabella, a la vitrocerámica y la nevera) y dejé la nota clara. La 060 y la 061 acabaron con **0 s en común** con la 062. Moraleja: una nota provisional es un contrato; si vas a cambiar un tramo, mira el plan de las otras (`metraje-06x.ts` está en el checkout) y avisa antes.

## 7. Qué evitar de este material

- **Las tarjetas «2X1» de un restaurante** (ZC14, ZC15, ZC20, ZC22 y ZC24 llevan en cuadro un expositor de menú): una marca ajena. ZC22 se usa desde los 3,4 s (la 061).
- **Los últimos 2 s de ZC28** (una mujer y un perro al fondo de la azotea): persona identificable.
- **RC01 lleva un rollo de papel de aluminio rojo en el cajón de cubiertos** (lo usa la 061).

## 8. Un estudio con la cama blanca debajo del texto baja el contraste

Con el velo de la plantilla (`borde` 0,68 · `medio` 0,44) el contraste del subtítulo sobre la cama de la mitad y del CTA era de 2,7-2,9 : 1 al p90 (la 017 aprobada: 2,9-3,7). Se subió el velo de esta pieza a `borde` 0,72 · `medio` 0,52 y quedó en 3,2-7,2 (`medidas/legibilidad.txt`).

## 9. La versión con ficha y las etiquetas de color: las tres finales salen con el VUI a medias

Los tres MP4 (máster, CRF 16 y la versión con ficha) salieron con `color_transfer` y `color_primaries` «unknown»; se arreglaron con `ffmpeg -c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 … -movflags +write_colr+faststart`, comprobando que el `framemd5` decodificado y el md5 del PCM no cambian. La ficha sale de `Recorrido062 --props={"sinSubtitulos":true} --muted --crf=6` + `ficha.mjs video proyectos/062/ficha.json <base> --audio <máster>`: 1139 f, PSNR 47,5 dB (mínimo 44,1) contra el máster en el 57 % de arriba y el PCM idéntico al del máster. Los renders de las tres piezas (060, 061, 062) corrieron a la vez en el mismo checkout y no se pisaron: cada `remotion render` empaqueta lo suyo y limpia al acabar.

## 10. Qué se reutilizó y qué no

- De la **059**: la composición, el cierre, la receta de normalizar, la puerta y las herramientas. La puerta se adaptó en cuatro sitios: 2a (las tres tomas, dos en el estudio, y **los subtítulos solo transcriben su voz**: cada palabra escrita tiene que ser una que ella dice), 2f (el ángulo, 5 cortes secos y 4 disolvencias, sin dron, hilo azotea → estudio, la terna del reparto), 4 (los golpes de esta canción: cortes secos ≥ 8, entrada ≥ 15) y 7b (060 y 061).
- **Trampas del shell en este checkout (zsh):** `set -- $var` no separa (se pierde el segundo argumento de un `for` con pares «a b»: usar un script); `echo =====` falla; un glob sin coincidencias aborta toda la orden; `sed -i` de macOS pide extensión (`-i ''`): para sustituir texto, Python.
