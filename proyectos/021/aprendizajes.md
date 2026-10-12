# Aprendizajes del 021 · Los Patios · apto 501 · V5

Lo que esta versión enseñó y que no estaba escrito (o estaba a medias). Se suma a `proyectos/017/aprendizajes.md`, `018`, `019` y `020`.

## 1. Un CTA recortado a su segunda mitad es una decisión de producto, no un truco de montaje

El formato prohíbe el precio en el bloque 6 y la V5 se quedó sin ningún CTA libre que no lo llevara o nombrara a ALH. El usuario eligió **usar solo la segunda mitad de CT02** («escríbeme y ven a conocerlo»). Qué hay que hacer para que sea de verdad y no solo en el subtítulo:
- **La toma entra a media frase, en una pausa.** `limites-voz.py` da las pausas internas de la toma (5,60-5,81 s tras «millones,»): `desde` va 2-3 f antes de la primera palabra de lo que SÍ suena (5,73 s) y el WAV de la voz se corta ahí; antes de esa pausa no hay nada audible.
- **La puerta lo comprueba** (2b): `voz.s0 ≥ 5,7 s` y `desde ≥ 5,6 s` de CT02, y que ni el plan ni los subtítulos lleven una cifra.
- **Cuesta voz:** el CTA dura 1,7 s. Con un encuadre quieto (Isabella apoyada en la barandilla) el corte no se ve; con una toma en movimiento (CT04 camina hacia la cámara) se perdería la cortinilla del helecho.
- **El WAV de la voz dura 1 f menos que el vídeo** (7,9987 s frente a 8,000 s): `(desde + dur)/fps` pasó de la duración del archivo y la puerta lo paró. `DUR_CTA` se queda 1 f corto.

## 2. Un piano no da golpes de jazz: se miden sobre el audio del render y se acepta lo que hay

*Amélie* da golpes fuertes de 8-15 dB (el saxo de la V4, de 14-26). `FUERZA_MIN_CORTE_SECO = 7,4` de la puerta sigue valiendo, y el único corte seco débil (f451, 8,3 dB) se mide a +0,4 f sobre el audio del render (`golpes-render.py`: «subida detectada en 451,1 (8,0 dB)»). Dos precauciones: (1) **`medir-pista.py --json` con `--desde` justo en el golpe de entrada NO lo ve** (el detector necesita una ventana previa): se guarda con una ventana que empiece ≥ 1 s antes y se comprueba que el golpe de apertura está; (2) en una pista rubato no hay recta: `rejilla.py` dio 53 % a ≤ 15 ms (un pulso pide ≥ 70 %), así que la rejilla son los golpes medidos, como en la V3 y la V4.

## 3. Una resolución que cae sola se mide en dos tiempos

El catálogo y `buscar-entrada.py` buscan «una caída». *Amélie* no cae a un lecho: **decae hasta el silencio** (−17,4 LUFS a −26,5 en 5 s y a −40,4 en 10). Con un solo umbral de 10 dB en 5 s la puerta habría fallado una canción que resuelve bien (9,1 dB en 5 s): se pide ≥ 9 dB en 5 s y ≥ 20 en 10, y que el decaimiento EMPIECE dentro de la toma del CTA (aquí en el f1203, a mitad de la frase de 1,7 s). Si el CTA entrara antes de la meseta, la voz sonaría sobre toda la música; si después, sobre un silencio.

## 4. Entre un interior oscuro y un deck a pleno sol no se corta: se disuelve

La corredera (RC11) acaba dentro de la casa (luma 105) y la alcoba (RC12) abre sobre la puerta de vidrio con el deck al fondo (121): aun graduados, el corte seco daba **+12,7 niveles** de luma. Se descartó graduar más (los planos ya estaban en el tope de sombras) y se pasó a **disolvencia que acaba en el golpe** (12 f de pre-roll: `desde` = 0,4 s). Salto resultante: +0,7. Regla útil: mira el empalme en `medir-color.py` ANTES del primer render y, si pasa de ±8, mira si el plano puede entrar disolviendo.

## 5. A contraluz la máscara de piel no mide

En la mitad (Isabella con el cielo detrás) la caja de piel solo recogió 20 píxeles y el tono salió a 349°: no es una medida. Se dice en el plan y se aplica el ajuste más suave (saturación 1,03, sin balance de blancos); las otras dos tomas sí se miden (≤ 0,6° de cambio). Con más planos a contraluz habría que medir con la cara a mano, no con una máscara de color.

## 6. Los avisos del registro se quedan cortos: el catálogo de material manda

La columna «Aviso» del registro no anotaba HK06 («Mirá»), MD01 («patios y vacíos», «entre interior») ni MD06. Se leyó el catálogo (`catalogo-material.md`, «Por confirmar al oído») y se midieron las tres cosas **cortando la toma desde varios puntos** (`palabras-desde.py`): una palabra con la misma lectura desde tres cortes distintos queda cerrada, aunque la confianza de whisper sea 0,25. «Mira»/«Mirá» no es una duda de la palabra sino una decisión de escritura: se midió el acento (la 2.ª sílaba, +6 dB y +30 Hz: se oye «mirá») y se dejó marcada para que decida el usuario.

## 7. Lo que el encargo daba por hecho y no era así (se lee en `analisis-uso.md`)

El PR #12 (V3) ya estaba fusionado en `main`; la rama publicada de la V4 no traía su proyecto (solo dos commits locales); la tabla de recorridos del registro iba sin las V3 y V4. Consecuencia técnica: **la puerta 9b de esta versión compara con la V3 y la V4 mediante INSTANTÁNEAS** de sus tramos (como la V4 hizo con la V3), porque ni `proyectos/019/` ni `proyectos/020/` están en esta rama. Cuando entren en git, se sustituyen por su `VERSIONES`.

## 8. Un detalle de herramienta

`buscar-entrada.py` no devuelve *Time* ni *Return to Oasis* (las usadas) y escribe todo su resultado al final (≈ 3,5 min sobre las 43 pistas, la salida estándar llega de golpe): lánzalo en segundo plano con la salida a un archivo y no lo repitas mientras corre.

## 9. Quitar la primera toma (rev. 2) cambia la regla fija, y el hueco se reparte: no se acorta la pieza

El usuario vio la prueba y pidió «elimina la primer toma y empieza con el hook». Es la primera pieza del canal que abre con Isabella hablando, así que **rompe la regla fija «la primera toma sale sin texto ni voz»** (017, rev. 4 y 6). Se hizo, se declaró y no se dejó que la puerta lo callara: `ABRE_CON_EL_HOOK` en `revisar-021.mjs` cambia solo las secciones que dependían del plano limpio (2, 2c, 4, 5 y 6), avisa en cada pasada («EXCEPCIÓN DECLARADA») y con `false` devuelve la exigencia. Lo técnico:
- **Los golpes de la canción no se mueven:** la música sigue entrando en su golpe de 25,5 dB (f3); lo que cambia es que lo primero que se ve es Isabella, y su primera palabra llega 15 f después con la música ya abajo (el golpe suena entero, como en las disolvencias de las otras tomas).
- **El hueco de 80 f se reparte** entre el hook (que usa su toma ENTERA, `desde` 0: +15 f), la piscina (+13 f) y el dron (+52 f) para que mitad, alcoba, CTA y tarjeta sigan en los mismos golpes: la pieza dura lo mismo (1289 f) y no hubo que rehacer nada de la mitad en adelante. El coste es el único corte seco más flojo de la pieza (f294, 7,7 dB; 7,3 en el render).
- **Hay que revisar la puerta en tres sitios que asumen «primer plano limpio»:** `bloques[0].trozos[0].desde >= c02.en`, la comprobación de la música en el `en` de cada disolvencia (el hook ya no tiene una) y la obligación de que exista el bloque 1. Un `return` suelto en una sección de módulo no vale (módulo ES): se estructuró con `if/else`.
- **La miniatura pierde la «casa limpia»:** el frame 0 es Isabella pequeña al fondo del pasillo de vidrio. Se dijo; la salida es empezar la toma más tarde, a costa de su entrada.
- **La rev. 1 se guarda entera** (`pruebas-720p/…-rev1.*` y `artefactos/rev1-metraje-021.ts.txt`) para volver si el usuario lo pide.

## 10. La final con una palabra sin cerrar (`--final` falla y se exporta igual)

El usuario dijo «renderiza en buena calidad» con «Mira»/«Mirá» sin cerrar (se le había avisado dos veces: en la entrega de la prueba y en la de la rev. 2). Siguiendo `recorrido-luxur` §7c no se bloqueó la orden ni se cambió la apuesta: se midió (el acento cae en la 2.ª sílaba), se exportó lo que se había enseñado en las pruebas («Mira»), y se dijo con el segundo exacto del vídeo (0,6 s) y cómo cambiarlo. `--final` se pasó a propósito para comprobar que **solo** falla por esa nota (un único fallo, el de la sección 11), y la nota se queda. Con Remotion 4.0.509 el master ya sale con las etiquetas de color puestas (el `ffprobe` da BT.709 antes de arreglarlas); aun así el átomo `colr` solo aparece tras el `h264_metadata` + `+write_colr`, y se hace en cada vídeo por separado.

## 11. «Más decibeles sin saturar»: la voz a −15 LUFS con la cadena de la V9 y la ganancia POR TOMA (rev. 3 de la final)

A los cuatro días de exportar, el usuario pidió «necesito que la voz cuando habla Isabella tenga más decibeles sin saturar». Hasta la V8 la voz iba a −21 LUFS con una ganancia por toma y nada más (R29) y la música sola a −15: Isabella sonaba 6 dB por debajo del paseo. Qué hay que saber:
- **La ganancia sola no llega:** las tomas crudas miden −22 a −25 LUFS con picos de −3,5 a −5,9 dBFS; subirlas 7-10 dB las llevaría a +1 a +6 dBFS. La cadena (graves, puerta suave, compresor 3:1, ganancia, limitador a −2,5 dBFS) es la de `proyectos/025/normalizar.mjs`.
- **El +14 dB de la V9 NO vale tal cual aquí:** la V9 partía de tomas a −18/−19 LUFS. Con tomas más bajas, la ganancia sale POR TOMA (15,6 · 16,2 · 14,8 dB) y se busca DESPUÉS del limitador, midiendo cada ventana de voz con ebur128 (tres o cuatro pruebas por toma bastan: la relación ganancia → LUFS es casi lineal, ≈ 0,8 LU por dB).
- **Si una toma está recortada** (CT02, solo su 2.ª mitad), el nivel se mide en la ventana que SUENA (5,82-7,49 s), no en la toma entera, que lleva la 1.ª mitad, más fuerte.
- **La puerta lo exige** (sección 3): `OBJETIVO_LUFS = −15`, la voz que suena es `<toma>-voz.wav` y el pico real, con su ganancia, ≤ −1 dBTP; y el `lufs` del plan es el del WAV TRATADO. Hay que acordarse de las regex de la puerta que buscaban `ct02.wav` o el código de la toma en el nombre del WAV (ahora acaba en `-voz.wav`).
- **La música no se toca:** queda 15,9 LU bajo la voz (antes 9,9) y la pieza sube de −16,2 a −15,2 LUFS con el mismo pico (−1,8 dBFS); el LRA baja de 7,0 a 2,4 LU porque voz y música van al mismo nivel.
- **El render del mismo plan da la misma imagen** (PSNR medio 72 dB, mínimo 52) aunque el md5 de los fotogramas cambie: x264 no es bit a bit entre dos renders. Se comprobó el PSNR en vez del md5 y se compararon los md5 de PCM del master y del CRF 16 (iguales entre sí).
