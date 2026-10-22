# 055 · aprendizajes

Lo que costó o se descubrió montando la V37, segunda de las tres versiones de la Casa en Condominio Los Bravos (La Ceja, «Las mañanas»). Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Tres sesiones sobre un mismo pozo de recorridos: avisar de los tramos y volver a mirar los planos de las otras

- Las tres versiones eligen entre los mismos 28 recorridos y, sin hablar, las tres querían la terraza, el jardín y la cafetera (RC20, RC22, RC24). La puerta (`revisar-055.mjs` §7b) lee los `metraje-NNN.ts` de las otras dos versiones y dice qué tramos se pisan y cuántos segundos: a los 40 min de empezar había 4 clips cruzados (RC22, RC24, RC01 y RC07, hasta 2,6 s).
- Lo que funcionó: dejar en la carpeta de notas compartida una tabla con mis tramos (`055-tramos-de-recorrido.md`) y mandar un mensaje corto a cada sesión; la 054 movió tres de los cuatro en minutos. Los que quedaban se resolvieron cambiando YO de tramo o de clip (RC07 → RC19; RC22 y RC20 desplazados 0,4 y 0,83 s), no esperando.
- **Volver a pasar la puerta antes de cada render**: los planos de las otras sesiones cambian y el cruce con ellas también.

## 2 · Un plano que repite al anterior se ve en el primer still, no en el plan

El plan decía «…cocina → ventanal del comedor (RC04) → puerta de la alcoba…» y MD03 acaba (a 6,6 s) en el MISMO ventanal con el sofá y el sillón rojo: en la hoja de stills, f694 y f810 eran casi el mismo plano, 4 s después. Se miró SOLO al montar el primer still de cada plano (`stills-multiples.mjs`). Se sustituyó por RC01 (la escalera y la doble altura), que además sube a lo de arriba. **Mirar dónde ACABA la toma de Isabella (su última imagen utilizada) antes de elegir el plano que le sigue**: el catálogo describe el principio de la toma, no el final.

## 3 · El color se iguala por exposición plano a plano, con el tope de ±0,4

Con `COLOR_BASE` sola los empalmes saltaban de −31 a +32 niveles de luma (aérea clara → hook a la sombra de la pérgola → recorrido oscuro → cocina clara). Se midió la luma media del primer y último fotograma de cada plano (`lumas` sobre los stills a 0,5 con `--gl=angle`) y se ajustó `exposure` en pasos de 0,1-0,4: **+0,1 de exposición ≈ +3,5 % de luma (≈ +4 niveles)**. Tres iteraciones de 31 fotogramas (≈ 3 min cada una) dejaron todos los saltos ≤ 12. La pérgola (RC23) es el plano más oscuro (luma 80, 16-23 % aplastado): se sube con `exposure` 0,4 y `shadows` 0,35 y baja el `contrast` a 1,02. Un plano con una cámara que se mueve entre sombra y sol (el hook, RC20) cambia 25-30 niveles DENTRO del plano: no se arregla con la exposición, se elige el tramo.

## 4 · Con una canción sin pulso, el corte se coloca en el frame en que SUENA el golpe

*Spring is Coming* tiene golpes de 9-27 dB cada 0,5-1 s pero `rejilla.py` no encuentra ningún periodo que alinee ≥ 25 % de los fuertes. Se cortó sobre golpes MEDIDOS: `golpe()` suma el ataque (12 ms) y el retardo del audio del render (42 ms), y `golpes-render.py` sobre el AAC de la prueba dio los 10 cortes a −0,4…+0,5 f. Dos cosas útiles:

- **La primera nota de una canción no es su segundo 0**: *Spring is Coming* abre con 0,35 s de aire casi mudo (−60 dBFS) y el detector, que mide contra silencio digital, da «golpe de 64 dB» en 0,000 s. Se midió la energía a 2 ms (sube de −59 a −17 dBFS en 0,355 s), se entró 22 ms antes (`INICIO_MUSICA` = 10 f) y se corrigió a mano el primer golpe de `golpes-055.json`.
- **Un golpe de 27 dB cae en un sitio que manda**: el de 35,1 s de la canción (el mayor de los primeros 45 s) se usó para entrar el CTA, que así arranca con el golpe entero y 8 f después la voz.

## 5 · El veil de los subtítulos hay que medirlo contra ESTA casa

Con los valores heredados (`borde` 0,62 · `medio` 0,34) el hook salió a 2,7 : 1 de contraste (p90) y la línea «en este espacio,» se perdía sobre la grava blanca; subirlo a 0,72 · 0,50 · parada 0,55 lo dejó en 3,9-7,1 : 1 (p90) sin que el degradado se note de más. Se midió en 10 fotogramas a escala 1 con `legibilidad.py`.

## 6 · whisper-small y un gentilicio

«Oriente antioqueño» lo oye «oriente entrequeño» (confianza 0,16 en «que»), pero cortando la toma en 3,815 s oye «Antequeño», y los formantes de la 2.ª y la 3.ª vocal no distinguen «tio» de «tre». Es una de las dos palabras que se dejan «POR CONFIRMAR AL OÍDO»; la otra es «hablemos» (whisper dice «hablimos» en todos los cortes, la vocal mide una [e]). Lo que sirvió fue cortar la toma desde varios instantes (`palabras-desde.py`) y comparar con las vocales de la MISMA toma, no un único formante.

## 7 · Proceso

- **Tres sesiones, un solo `$TMPDIR`**: borrar `remotion-webpack-bundle-*` «cuando no haya nada renderizando» se comprobó DESPUÉS y la 054 estaba arrancando un render: avisé a esa sesión. Ahora se comprueba `pgrep -fl "remotion render|stills-multiples"` ANTES y se borra solo el bundle de la tanda propia (`ls -dlt` por hora).
- `pkill -f` sobre `npm exec remotion render` dejó el proceso vivo (el hijo `node …/remotion render` sigue): hay que matar los DOS PID (`kill -9 $(pgrep -f "Recorrido055 out/055-1080")`).
- El andamio de `nuevo-recorrido.mjs` deja la puerta y las composiciones de la plantilla, más viejas que las de 038/042/053 (sin `sinSubtitulos`, sin música partida en tramos, sin las secciones de golpes): se partió del 053 (composición), del 042 (audio troceado) y del 038 (puerta con cortes sobre golpes) y se adaptó. Convendría actualizar `plantillas/`.
- iPhone de este rodaje: 1080×1920 verticales nativos, **SDR BT.709** (no HLG), 59,94/60 fps VARIABLES, sin rotación; la rama de tone-map de `normalizar.mjs` no corre. El dron DJI lleva una segunda pista de vídeo (miniatura MJPEG 720×1280): se mapea `0:v:0`.
