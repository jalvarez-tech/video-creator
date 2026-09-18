# 015 · Aprendizajes — «Lo que aprendí en APEX»

Nueve tomas de una presentadora (Isabella Cadavid, la del 013) contando lo que
se lleva del primer día de APEX, montadas en 52,1 s: silencios recortados,
fundido de opacidad entre tomas, textos con un efecto por entrada y la cuenta
@propiedadesluxur al final. Es el primer MONTAJE hecho de tomas con voz: el
009-011 eran b-roll con música o voz en off, y el 012-014 un solo clip.

## 1. La disolvencia del motor tenía una cola que nadie veía (arreglado en el motor)

`<PistaMetraje>` alargaba cada plano 12 f DESPUÉS de su final si el siguiente
disolvía, «para que la disolvencia no cayera sobre negro». No hacía falta: el
entrante empieza 12 f antes de su `en`, se monta encima y en su `en` ya es
opaco; el saliente está debajo hasta ese mismo frame sin alargar nada. La cola
pintaba 12 frames tapados.

Tapados, pero la puerta los contaba como metraje que el clip tenía que tener, y
en esta pieza eso rompía el encargo: con la voz recortada al segundo, cada toma
acaba 0,5 s después de su última palabra, y seis de las ocho no tenían otros
0,4 s detrás. Se quitó la cola del intérprete y de la puerta (`corte.ts`,
`PistaMetraje.tsx`, `revisar-metraje.mjs`). Comprobado que no mueve un píxel de
lo publicado: los f163-172 del 011 (la cola de `c01` bajo `c02`), renderizados
antes y después, idénticos byte a byte; y las puertas del 009, 010 y 011 siguen
en verde con sus mismas excepciones. El 014, que usa el mismo intérprete para
sus insertos, no disuelve: no le afecta.

## 2. Whisper no sirve para recortar silencios

Las marcas por palabra de whisper.cpp ponían la primera palabra de las nueve
tomas en 0,00 s; ella empezaba a hablar entre 0,48 y 0,87 s. Recortar con eso
habría dejado el aire de entrada entero (o comido palabras, «corrigiendo» a
ojo). Los límites salen de la ENERGÍA en la banda de voz, contrastada con el
espectrograma, y el detector queda como herramienta:
`manuales/edicion-video/scripts/limites-voz.py` (inicio, fin, pausas internas y
nivel de la ventana de voz de cada toma). Es la regla **R29**.

Lo que sí da whisper: el ORDEN de las palabras dentro de una frase, bastante
bien cuando la frase empieza donde la energía dice. Para anclar un texto a una
palabra se usa el arranque de su tramo de energía si lo hay (la frase tras una
pausa) y whisper solo dentro del tramo.

## 3. Un montaje de tomas con voz: la receta

- **La voz en su propia capa**, porque `<PistaMetraje>` pinta el vídeo mudo:
  `Voz015.tsx` pone un `<Audio>` por corte leyendo el WAV de su toma con el
  MISMO `trimBefore` que la imagen. WAV y no AAC: el AAC arrastra 1024 muestras
  de priming. `desde` escrito como frame exacto (`fr(20)`), para que imagen y
  voz corten en la misma muestra.
- **El fundido en el hueco entre frases**: 15 f entre la última palabra y la
  primera de la siguiente; el fundido de 12 f empieza 2 f después de la última
  y acaba 1 f antes de la primera. La voz cruza en los 6 últimos (potencia
  constante), para no tocar las «s» finales que el detector corta antes de
  tiempo.
- **Una ganancia por toma** para que las nueve suenen igual (de −25,8 a −19,8
  LUFS → todas a −21), sin más tratamiento. Remotion acepta `volume` > 1 y lo
  aplica al renderizar (medido: la toma que sube +4,8 dB sale a −21,0).
- **La puerta comprueba el encargo con palabras**: 15 f entre todas las frases,
  ninguna palabra dentro de un fundido ni del cruce de voz, todas las
  transiciones disolviendo.

## 4. Los sonidos leen sus frames del plan de textos

En el 014 los frames de los SFX se copiaban a mano del plan de gráficos a
`cues-014.ts`. Aquí cada texto declara `sonido: { variante, reason }` y
`cues-015.ts` los saca con `anclasDeSonido()`, que ya existía en el núcleo y no
usaba nadie: mover un texto mueve su sonido. Y cada texto que cae sobre una
palabra lleva `abs` (su frame esperado): moviendo uno 7 f a propósito,
`revisaPlan` lo cazó al momento.

## 5. La banda no espera vacía

La primera versión relevaba el texto en cada cambio de lugar con un antetítulo
pequeño y dejaba el titular para la palabra clave. La hoja de contactos del
render enseñó dos tramos de 3-4 s con solo el antetítulo (c02 y c08), y el de
c02 caía en los segundos 3-6, donde se decide si alguien se queda. Se partieron
en dos tomas cada uno, y la primera es la frase que ella dice al entrar («Fueron
las ideas y las oportunidades», «La lección más importante»). Lo que los stills
sueltos no enseñaban lo enseñó la hoja: el ritmo se juzga en la secuencia.

## 6. El contraste se mide sin el texto delante

Medir el fondo de la banda con la mediana por fila sobre el render final falla
en las filas de un titular largo y grueso: el texto ocupa más de medio ancho y
la «mediana» es el propio texto (f197 dio luma 225). Se midió con una
composición temporal con el vídeo y el velo, sin texto: peor fila, luma 38 →
verde a 7,9 : 1 como mínimo.

## 7. Lo que queda por confirmar (no está en pantalla)

- Su cargo y ciudad: whisper oye «realtor de la ciudad de Medellín» en una de
  cuatro pasadas. En pantalla, solo el nombre.
- «qué vender» / «qué vendes»: el ✗ dice «¿Qué vendo?», que vale para las dos.
- Las redes: Instagram, TikTok y Facebook, supuestas.

## Entregables

| archivo | qué es |
|---|---|
| `finales/015-apex-lecciones.mp4` | **máster** · crf 16 · BT.709 en VUI y `colr` · −20,9 LUFS / −5,0 dBTP |
| `finales/015-apex-lecciones-compartir.mp4` | para subir · crf 20 |
| `pruebas-720p/prueba.mp4` | la prueba ligera |
| `vistas-previas/hoja-contactos.png` · `tira-fundido-c01-c02.png` · `normalizados.png` | la revisión |
