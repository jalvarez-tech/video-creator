# Aprendizajes — proyecto 059 (V41 · Apartamento en Palmazera, «El estrés no viene solo del trabajo»)

Lo que funcionó y lo que no al montar este reel (la tercera versión del apartamento, con la estructura de la 056 y la canción de la 039). Para la siguiente versión de este apartamento o de otra con material parecido.

## 1. Una canción de pulso y plana pide otra rejilla: entrar por la mitad y cortar en golpes de ≥ 16 dB

*Light Fills the Room* (≈ 88 BPM, −11…−14,5 LUFS en toda la pista, 368 golpes de ≥ 6 dB) no tiene caída ni crescendo, y el catálogo la marca «arranque flojo». No se entra por el principio sino en un golpe fuerte de la mitad: `buscar-cortes-059.py` (la 039 sin el 12 cableado, y sin la caída del CTA) lee los golpes ya medidos (`medir-pista.py --json` sobre la canción ENTERA, una sola vez), fija el frame 0 en un golpe de ≥ 17 dB y pide que cada corte caiga en uno de ≥ 12-15 dB con los planos dentro de sus rangos. Con los rangos abiertos hay 83 entradas posibles; con los ajustados (hook 145-165 f, mitad 155-175 f), 4 con golpes ≥ 15 dB entre los 142 y los 172 s. Se eligió la de 147,421 s porque su sección no la usan la 039 (104,5-141 s) ni la 025 (desde 179,5 s) y porque su hook (154 f) deja 33 f de aire tras la última palabra. Todos los cortes secos caen a ≤ 0,4 f de un golpe que suena en el audio del render (`golpes-render.py`).

**Qué se hace con el final de una canción plana:** no hay nada que la haga resolver sola, así que tras la última palabra del CTA la música se apaga con curva de coseno hasta cero 2 f antes del final (como la 039); la puerta (sección 4) comprueba que solo BAJA desde la última palabra.

## 2. Una toma que no deja silencio no puede entrar disolviendo

CT03 empieza a hablar a los 0,46 s (13,8 f). Una disolvencia pide ≥ 12 f de clip antes del `desde` Y que la primera palabra caiga después de que la música baje (10 f tras el golpe de entrada): con `desde` ≥ 12 f la primera palabra caería a los 1,8 f. Entra a **corte** en el golpe del f924, con `desde` 3 f y la primera palabra a los 10,8 f (la música baja en 10 f y acaba 1 f antes). La puerta (`3`) no se queja (comprueba el desclic de 3 f) y la 4b mide la curva.

## 3. La cola que whisper oye en una toma no es de la frase

HK04 sale de whisper con «…donde vive. No sé por qué no lo tiene»: son golpes de −20 a −30 dB a los 7,6-8,3 s (ella, sin cámara, comentando la toma) y, antes, un ruido de 0,2-0,5 s. `envolvente-voz.py` (energía por ventana de 20 ms) dice dónde acaba la voz (4,45 s) y `palabras-desde.py` confirma que el resto se transcribe como «No sé por». Lo que vale es la envolvente, no el texto de whisper.

**Y la /s/ final que el corte por energía se come:** en este micro la banda de las sibilantes (4-9 kHz) está a −57…−85 dB, así que una /s/ final no sube la energía de la voz y la ventana por energía acaba antes de ella; en «vives» hay una subida de ≈ 20 dB en esa banda justo después del final de la voz (4,50 s). La ventana tratada se amplió de 4,45 a 4,55 s (`s1`). Mismo problema que la memoria `proyecto-054` anota con «las sílabas átonas finales».

## 4. Los cortes de whisper se contradicen: la SÍLABA manda (y una línea salió 7 f pronto en la prueba)

Isabella habla a ≈ 8-9 sílabas por segundo en HK04 y MD09. Las líneas de la prueba se llevaron a su palabra con `onsets-voz.py` y `palabras-desde.py` (qué palabra es la primera desde cada instante), y ya revisando la exportación cuatro resultaron mal: «a veces no viene» entraba 7 f pronto, «de donde vives.» 4 f y «los detalles.» 4,5 f pronto (con la consecuencia de que no cabían 12 f entre «y te doy todos» y «los detalles.» y se había aceptado una línea 1,5 f tarde). `palabras-desde.py` **alucina** con los cortes que parten una palabra (de «veces» saca «A veces» desde cualquier corte; de «todos los detalles» saca «de Tari»), así que sus resultados se contradicen. Lo que no miente es la **envolvente de la voz sola** (`envolvente-voz.py` cada 20 ms): se parsea sílaba a sílaba —una oclusiva deja un valle de 60-100 ms antes de su vocal (la /t/ de «trés» es el valle de 1,22-1,31 s, la /d/ de «dos», el de 3,46-3,52 s), y una vocal fuerte, un pico— y se comprueba que el número de sílabas cabe en el tiempo (a ≈ 9 por segundo). Con eso salieron «a» de «a veces» = 1,495 s, «los» = 3,66 s, «paz» = 1,26 s. Corregidas antes de la final; la prueba aprobada tenía las cuatro líneas mal puestas (≤ 4,5 f). **En la próxima: parsear la envolvente de TODA la frase, no solo de los valles profundos, y mirar los formantes (la primera [a] de `formantes.py` marca «a veces»).** El validador pone el máximo en 5 palabras por trozo.

## 5. El frame 0 es la miniatura: el tramo más uniforme del dron no es el mejor

`ventana-fina.py` dio DR09 1,9-4,8 s (dispersión 0,057) y su frame 0 era casi todo prado. Con 3,2-6,07 s (dispersión 0,079, pendiente +0,27: arranca ya a velocidad y acelera algo, como un dron) el edificio ya llena la esquina de arriba. La puerta del formato solo pide uniformidad; la miniatura se mira en el frame.

## 6. Qué se reutilizó y qué no

- De la **056** (la más reciente con la estructura de diez planos): la composición, el cierre, la receta de normalizar, la puerta y las herramientas. De la **039**: la canción (rejilla propia) y el apagado final bajo la tarjeta. La puerta se adaptó en cuatro sitios: 2a (tres tomas, dos en el pasillo y ninguna cifra), 2f (el ángulo, 2 disolvencias y 7 cortes secos, los drones del reparto), 4 (sin caída: el apagado monótono) y 4b (el CTA entra a corte).
- **Coordinación con las otras dos sesiones del apartamento** (057, 058): una nota por sesión en la carpeta compartida de notas (`05x-tramos-de-recorrido.md`) con los tramos reclamados; se liberaron los clips que ya no se usaban (RC11, RC17, RC25, RC26, RC27) y se pidieron/ofrecieron los que se cruzaban. Resultado: ni un segundo de metraje en común.
- **Trampas del shell en este checkout (zsh):** `set -- $var` no separa; `echo =====` y `echo ==` fallan («= not found»); un glob sin coincidencias (`*.sh`) aborta toda la orden; `paste -sd'|'` en macOS pide un `-` final. Para cada medida, la orden suelta o un script. Y un `cd` dentro de una orden cambia el directorio de la sesión: todas las órdenes empiezan por `cd <raíz> &&`.
