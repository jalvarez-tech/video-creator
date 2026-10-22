# Aprendizajes — proyecto 054 (V36 · Casa en Condominio Los Bravos, «Privacidad»)

Lo que salió de montar este reel y conviene saber la próxima vez (las otras dos versiones de la casa, 055 y 056, parten del mismo material).

## 1 · Una canción plana no tiene caída, pero sí rejilla: se busca

*Luxury, Elegance, Refined* mide −14,4…−14,9 LUFS de principio a fin (sin caída ni crescendo) y trae 268 golpes de 6 a 26 dB en 3 minutos, sin pulso que una recta describa. `buscar-cortes-043.py` está hecha para canciones con caída (el CTA entra donde la canción cae) y aquí devolvía cero. Se escribió `herramientas/buscar-rejilla-054.py`: 13 planos con rangos de duración (la voz de cada toma medida por energía: el hook y el CTA piden ≥ 17 f de aire tras su última palabra para que la música suba con curva, la mitad ≥ 24), **un golpe mínimo por corte** (`MINS`: los de frontera de bloque ≥ 11 dB, los de dentro de un recorrido ≥ 8) y **la suma de duración de cada grupo de planos** (`SUMAS`: el recorrido 1 de 150-230 f). Con un solo mínimo para todos los cortes (≥ 12 dB) no salía ninguna rejilla de 13 planos; con mínimos por corte salieron 1.495 y se eligió por la fuerza del golpe de entrada (17,8 dB) y por que los planos dejaran la voz en paz. Para la próxima: lanza primero la búsqueda con los rangos reales de cada toma y mira cuántas salen, en vez de fijar la estructura.

## 2 · La música baja DESDE el golpe del corte, no antes

Las tres tomas de Isabella entran a corte en un golpe y su primera sílaba suena 8 f después (`desde` = primera sílaba − 8 f). El golpe suena ENTERO con la música arriba y la bajada, con curva de coseno, ocupa los 6 f siguientes y acaba 2 f antes de la primera sílaba (`MARGEN_BAJADA = 2`; con 0 f de margen la puerta de 4b falla: la curva tiene que haber acabado ANTES de que hable). Tras la última palabra la subida dura 24 f y llega arriba 4-5 f antes del golpe del plano siguiente, así que el hook y la mitad piden ≥ 26 f de cara tras su última palabra (lo mínimo que la rejilla tiene que dejar).

## 3 · Bajo el CTA, en una canción que no cae, la cama se apaga sola

Sin una caída natural, la cama del CTA queda a −26 LUFS y los últimos 45 f de su frase la llevan a cero con curva de coseno **justo en su última palabra**: la canción trae golpes de 13,5 dB 18 f después y no hay hueco donde apagarla «antes del siguiente». La tarjeta va en silencio.

## 4 · Una receta copiada de otra pieza trae sus ganancias de voz, con los mismos nombres

`normalizar.mjs` se partió del 042, que ya tenía `GANANCIA_VOZ_DB = { hk01: 18.6, … }` y su `VENTANA_VOZ`. Como el 054 también tiene un `hk01`, la primera pasada trató su voz con la ganancia y la ventana del 042 (y avisó solo de las dos tomas que no tenían entrada). Se vio porque `hk01-voz.wav` existía antes de medir nada. **Al copiar una receta, vacía las tablas por toma** y rellénalas con `probar-voz.py` y la energía de cada toma; después `--solo hk01,md04,ct06 --forzar`.

## 5 · El iPhone de esta casa es SDR y vertical: no hay HDR ni recorte

A diferencia de 020-039 (HLG con rotación −90) o de la Casa Campestre de Guarne (16:9 sin rotación), los 31 MOV de esta casa son H.264 SDR BT.709, 1080×1920 verticales, a ≈ 60 fps variable (59,94-60). La rama de `normalizar.mjs` para «rotación 0 = DJI apaisado» recortaba a 9:16 y **habría cortado un 1080×1920 por la mitad**: ahora el recorte solo se aplica si el cuadro es apaisado (`ancho > alto`). El dron (4K, `rotation=90`, 29,97 fps) solo se rota y lleva `setpts=PTS*1000/1001`.

## 6 · Las palabras dudosas de una voz con viento se miden por rebanadas, no por la toma entera

El hook camina con viento (−24 LUFS crudos, el viento a −26 dB del pico: la voz subida +18,6 dB). `limites-voz.py` no ve voz «por encima de −12 dB» y whisper pone la primera palabra en 0,00 s (R29): los límites salieron del perfil de energía (`envolvente-voz.py`: primera subida a más de −20 dB, última sílaba antes del viento) y las palabras, de **rebanadas** (`palabras-desde.py` y `ffmpeg -ss/-to` + `transcribir.mjs` con 0,3 s de colchón de silencio): desde 4,42 s del CTA whisper lee «agendemos» seguido, mientras la toma entera la oye «haciéndemos»; en la mitad, tres rebanadas distintas dan «Hace los», «Hasta los» y «Solo» y el elemento común es «los». Una rebanada de menos de 0,4 s alucina («¡Suscríbete!»): no sirve.

## 7 · Un checkout compartido: el bundle de Remotion es de todos

`src/estudio.tsx` descubre TODAS las `composiciones.tsx` y cada bundle empaqueta `remotion/public/` entero. Mientras se montaban 054, 055 y 056 a la vez, un módulo de otra sesión a medio escribir (`audio-056.ts`, «faltan planos» al importarse) tumbó el bundle («Cannot access 'Composiciones' before initialization») y con él mis stills. `herramientas/espejo-054.sh` deja un `remotion/` privado con SOLO el 054 (`src` sincronizado con rsync, `public` con enlaces a `fuentes`, `marcas` y `recorrido-054`, `node_modules` enlazado) y `stills-multiples.mjs` / `npx remotion render` lo usan con `ESPEJO=…`: bundle de ≈ 1 GB en vez de 2,6 y a salvo de lo que rompa otro. Salida idéntica: son los mismos archivos.

## 8 · El color: lo que no se arregla es el contenido

Bajo la pérgola de lamas negras el jardín (RC02) y el ventanal (RC25) salen con luma 76/69 frente a los 105-140 de los demás planos (19-22 % de píxeles aplastados). Se levantaron con exposición +0,4 (el tope de la puerta), sombras +0,5, negros +0,04 y contraste 1,0: 95/89, sin que se vea lavado. El salto del hook (pared blanca, luma ≈ 133) al jardín (pérgola, ≈ 90) sigue siendo −38 niveles: es lo que hay en los dos planos, y el corte cae en el golpe más fuerte de los dos primeros bloques (17,0 dB).

## 9 · La última sílaba átona se pierde con el umbral de energía (el CTA de la rev. 0)

La rev. 0 cortó la voz del CTA en 5,62 s (el último punto «por encima del umbral» de `envolvente-voz.py`) y el usuario lo vio en la prueba: «Isabella no alcanza a decir la palabra visita completa». La «-ta» de «visita» suena a 5,82-5,92 s, a −32…−42 dB del pico, tras una pausa de 0,2 s de la /t/ (5,72-5,80 s a −55 dB): la energía de 20 ms la daba por silencio. **Para la última palabra de una toma, mira la envolvente a 20 ms HASTA que quede el suelo de ruido (−50 dB) y comprueba con rebanadas de whisper que acaban donde dices** (`[5,30-5,66]` → vacío, `[5,30-5,80]` → «No es una visita.», `[5,30-5,98]` → «Vamos a una visita.»: con 5,98 aparece la «-ta»). `VENTANA_VOZ` de `normalizar.mjs` y `voz.s1` del plan van al final REAL de la palabra, y el tramo de música que se apaga «en la última palabra» se mueve con él (`FIN_MUSICA_054` sale de `ventanaDe("c13-cta").fin`).

## 10 · Lo que se entregó y lo que no (2026-10-22)

Máster CRF 12 `slower` (132 MB, ≈ 20 min de render y codificación con el equipo cargado: la codificación de un `slower` con tres sesiones renderizando a la vez va a ≈ 2 f/s), CRF 16 `slow` (76 MB), `.srt`, portada, versión con ficha (base `sinSubtitulos` a CRF 6 `fast`, PSNR de la mitad de arriba contra el final ≥ 51,5 dB, audio copiado con el mismo md5 que el del máster) y caption. La puerta con `--final` falla solo por las 7 notas «POR CONFIRMAR AL OÍDO» (5 palabras sin oír, repartidas en el plan, `subtitulos-054.ts` y los guiones de voz): es lo esperado.
