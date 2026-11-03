# Aprendizajes — proyecto 067 (V49 · Lote en venta en San Cristóbal, «Este no es para ti»)

> Lo que costó tiempo y no se deduce del código. Para quien monte la siguiente pieza de este lote o de otro lote con dron y tomas a cámara en un prado.

## Material

1. **Las tomas de Isabella de este rodaje son 1080×1920 verticales de verdad** (sin rotación ni SAR anamórfico, no HLG): se escalan y nada más. La receta del andamio (`nuevo-recorrido.mjs`) trae la rama HDR y no corre aquí; lo que SÍ falta en la plantilla es el `setpts=PTS*1000/1001` de los drones (29,97 fps) y la voz tratada: se parte de la `normalizar.mjs` del 057/062, no del andamio (la plantilla va por detrás de los proyectos reales: el andamio no trae `sinSubtitulos`, `OPACIDAD_SUBTITULOS`, `trocea()` ni la puerta de 775 líneas).
2. **Dos drones de 98 y 119 s no se normalizan enteros**: `normalizar.mjs` admite una séptima columna `[ss, t]` en `MATERIAL` y codifica solo ese rango (`-ss` antes de `-i` con recodificación es exacto). El MP4 EMPIEZA en `ss`: los números del plan van sobre el normalizado (`dr04.mp4` t = original t − 60) y la puerta (2f) lo convierte al tiempo del original para comprobar que cada plano cae en el rango del reparto. Comparar «mismo nombre de archivo» entre las tres piezas del lote daría falsos choques (cada una normaliza otro origen): la sección 7b no compara por nombre.
3. **Las tomas arrancan de golpe tras 0,45-0,5 s de respiración o viento.** `limites-voz.py` con su margen por defecto dice 0,00 s (MD01) y con `--margen 40` corta el final de «…para ti.» (cae a −37 dB del pico). Lo que vale es el perfil de energía a 20 ms (`envolvente-voz.py`): el primer salto de más de 30 dB es la primera sílaba (0,50 · 0,51 · 0,47 s).

## Voz

4. **Limitador de 3,1-3,6 dB** en MD01 y CT05 (los picos sueltos de consonante con viento): un compresor más firme (4:1, −32 dBFS) no lo bajó de 3,0-3,5. Se deja la cadena estándar (3,5:1 desde −30 dBFS) y se declara; el pico real queda en −2,5 dBFS.
5. La ganancia que da `probar-voz.py` deja la voz a −15,1/−15,2 LUFS tras el limitador: se suman 0,1-0,2 dB para dejar −15,0 (`GANANCIA_VOZ_DB`).

## Subtítulos

6. **Whisper small pone «fase» donde la expresión corriente es «frase»** (confianza 0,98 en «fa», hasta «fácil» en un trozo): la palabra se MIDE (trozos aislados con `segmentos.py` y envolvente a 10 ms para buscar la /r/ vibrante) y se pinta lo medido, sin cerrarla: es lo que dice R31 y lo que dejó la V1 con «línea»/«unidad». La envolvente de una /fa/ y una /fra/ no se distinguen cuando la /r/ es un golpe de 20 ms: la medida inclina, no cierra.
7. **Tras una coma, whisper no puntúa y la línea entra al principio de la pausa**: «infinitas» (CT05) salía en 1,20 s por el DTW y la palabra empieza en 1,14 s; «desde la primera fase» salía 7 f pronto (DTW de «serio»). `onsets-voz.py` + `palabras-desde.py` y `lineas-vs-onsets.py` (con la tabla rehecha para esta pieza) los llevan a 0-1,8 f.

## Música

8. ***Return to Oasis* es la más cómoda del banco para un reel de 38 s**: pulso constante de 110 BPM, meseta de −8,7 LUFS y caída a un piano en un instante conocido (180,09 s). Entrando en el golpe de 148,470 s (el pulso 10 de la rejilla de la 018, 9,9 dB) la caída cae en el f950, el primer fotograma de la toma del CTA, y el total da 38,3 s. Entrando en su golpe de 143,005 s (el pulso 0, 12 dB) saldría de 43,8 s.
9. **Bajo el CTA la canción cae sola, y la ganancia de la música SUBE a propósito** (−18,8 → 0 dB en 100 f) para que lo que suene quede a −26 LUFS; la puerta del 057 medía la ganancia lineal y fallaba con «la música aún no ha bajado antes de la primera palabra». Ahora mide el nivel efectivo (sonoridad momentánea + ganancia), que es lo que se oye.
10. **El punto [1056, 1] que añadí a mano para apagar el lecho cayó detrás del [1070, 1] de la tabla** y el «orden estricto» lo movió a f1071: la rampa de apagado salió de 10 f en vez de 25 y la puerta lo vio (×0,100 a dos f del final). Si una envolvente mezcla puntos de una tabla y puntos a mano, hay que filtrar los de la tabla que pasan del primero a mano.

## Color

11. **Un clip con una pasada hacia la sombra no se puede igualar con un solo `color`**: RC02 va de luma 138 a 96 en 5 s; se usa solo su mitad clara (0,6-3,3 s). El hook, a la sombra de los pinos, parte de luma 85; subirlo con `exposure` +0,25 y `shadows` +0,3 lo deja en 93 sin sacar la piel de su tono (val 0,80 → 0,88). Los saltos de luma en los cortes secos (+24 / +17 / +10) vienen de pasar de la sombra al prado abierto y se declaran.
12. **A escala 0,5 los cielos con `color` salen posterizados** (R32 ya lo decía): la prueba se renderiza a escala 1 con `--gl=angle` y se reduce; los recortes a 100 % (`recortes-cielo.png`) salen limpios.

## Proceso

13. **Chrome headless: el primer still o render desde la raíz del worktree se quedaba descargándolo** (lock compartido entre las tres piezas); el coordinador enlazó `.remotion` → `remotion/node_modules/.remotion` y desde entonces un still de 22 fotogramas a escala 1 tarda 27 s y un render de 1148 f, 1 min 50 s.
14. `stills-antes.mjs` (el «antes» del color) reescribe el plan y lo restaura byte a byte: se lanza solo, nunca con otro proceso que lea `metraje-067.ts`.

## La final (2026-10-24)

15. **La orden de exportar con la duda abierta (SKILL.md §7c) se cumplió sin tocar la puerta:** `revisar-067.mjs --final` falla solo por las dos notas «POR CONFIRMAR AL OÍDO» y se dejan; en la entrega van con su segundo exacto (17,50 s y 16,57 s) y los sitios que hay que tocar.
16. **El render de Remotion sale con las etiquetas de color a medias** (VUI `2/2/1`, sin `colr`) y la versión con ficha de `ficha.mjs` también (BT.709 solo en `colr` de la matriz): las tres (máster, ligera y ficha) se arreglan con `h264_metadata` + `+write_colr` en copia de flujo y se comprueba que el `framemd5` decodificado y el md5 del PCM son los mismos antes y después. Con tres archivos y cuatro `md5` cada uno, **un script o variables sueltas** (en zsh un `for` con variables en ffmpeg lo rechaza el worktree).
17. **Orden que funciona** (un render a la vez, ≈ 2-4 min cada uno con la CPU libre): máster CRF 12 → ligera CRF 16 → arreglar etiquetas (mientras renderiza el siguiente) → stills a escala 1 del mismo plano → `medir-final.py` de las dos → base muda (`--props` entre comillas simples: `--props='{"sinSubtitulos":true}'`) → comprobar contra el máster (PSNR de la mitad de arriba con `crop=iw:ih/2`) → `ficha.mjs video`.
18. **La portada sale del tramo propio del dron**: el más nítido del tramo 22,8-24,9 s (DR06, cipreses con el camino en curva) valía 1529 frente a 1052 del mejor de la vista (DR03) y se parece menos a lo que elegirán las otras dos piezas del lote; el texto (8,4:1) cae sobre los cipreses oscuros y el isotipo (6,8:1) sobre el prado. Un coche blanco y una persona diminutos se ven en el camino: son del rodaje, no de Isabella.
19. **La ficha ocupa 204,5 MB** (`ficha.mjs` recodifica la base —438,8 MB a CRF 6— a CRF 12 y copia el audio del máster), 4 MB más que el máster. Se borra la base y NO el material normalizado (`remotion/public/recorrido-067/`, 801 MB) ni los originales (2,5 GB): el usuario puede pedir cambios.
