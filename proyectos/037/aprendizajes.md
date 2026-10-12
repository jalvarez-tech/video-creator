# 037 · aprendizajes

Lo que costó o se descubrió montando la V20, quinto reel de la Casa Campestre de Guarne (hilo del error). Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Cuatro sesiones sobre la misma casa y tres recorridos libres: coordinar antes de elegir

- El encargo pedía ningún plano repetido de la V13, la V16, la V17 y la V19 (otra sesión, en curso). La puerta de la V17 ya comprobaba las tres primeras cargando sus planes; la V19 **aún no tenía plan propio** (su `metraje-036.ts` era una copia del 033) y la V21 (038) abrió su worktree mientras montaba esta. Por eso la puerta (secciones 7b y 7c) compara contra los planes que existen **y** contra una lista de lo que las otras sesiones tienen reservado en su registro (`RESERVADO_EN_CURSO`): un plan sin hacer no es un plan sin clips.
- De los 28 recorridos, la V13, la V16 y la V17 usaron 21; la V19 se llevó RC05, RC11 y RC17 en los primeros minutos; quedaban RC01, RC02, RC13 y RC28. Esta pieza usa tres (y deja RC02 a la V21) más dos drones, y de ahí que sus dos bloques de paseo duren 6,9 s y 6,5 s y la pieza 33,5 s en vez de los 38-40 de las anteriores. Para una V22 sobre esta casa **no queda ningún recorrido sin usar** (RC02 aparte): hay que rodar más, o repetir y declararlo.
- Lo que funcionó: `ls .claude/worktrees/*/proyectos/` y `ps` antes de tomar el número; reservar en el acto en el registro de MI worktree (las otras sesiones lo leen: la V19 escribió ahí sus cambios de dron, y yo leí el suyo); y un mensaje por sesión con lo reservado y lo que queda libre. La V19 contó RC02 en un mensaje y RC05 en su registro: el registro manda, el mensaje se contrasta.

## 2 · El reel editado del mismo disco subtitula las palabras que whisper no cierra

`VIDEOS EDITADOS/REDES/FAMILIA/fam 1.mp4` (y su doble `REDES/familia 2.mp4`) es el mismo hilo montado por otra persona, **con subtítulos quemados**. Con un `ffmpeg -ss … -frames:v 1` en los segundos de las frases se leyó «se **cansan** del viaje» (el encargo y el registro de uso decían «se aburren»), «no cometas» y «buscar casa campestre» (ella dice «campestre»). Antes de dar una palabra por imposible o de preguntar: transcribir todos los reels editados (`buscar-editados.py` del scratchpad, 36 archivos en un minuto) y mirar los fotogramas del segundo donde cae la frase. **No sustituye al oído**: es otra persona, y en el 033 los dos no coincidían en «su/tu». Y su «cansan» puede ser el mismo error de un reconocedor: al exportar, los formantes no cerraron «cansan» frente a «aburren» (§10).

## 3 · Un dron «uniforme» puede casi no moverse

El 033 eligió su dron con `ventanas-uniformes.py` (uniforme = dispersión < 0,18 y movimiento entre 2,0 y 8,0). Aquí el tramo MÁS uniforme del DR71 (6,5-10,4 s, dispersión 0,052) tenía movimiento 1,3: el primer fotograma y el de 2,4 s eran casi iguales y la miniatura se quedaba en un plano casi fijo. Dos arreglos: (1) `perfil-mov.py` da el movimiento por segundo del clip entero: el DR71 frena (2,2 → 0,6 en 18 s), y 3,0-6,9 s (mov 1,6, dispersión 0,082) es el tramo con más movimiento sin tirones; (2) un **zoom hacia fuera** (`zoom: [1.08, 1.0]`): con el zoom hacia dentro de la plantilla (1,0 → 1,04) el acercamiento digital RESTA al alejamiento del dron y el plano queda quieto; hacia fuera, suma. El tramo se elige sobre el clip entero apaisado (`uniformes-dron.py`), no mirando el primer fotograma, y la puerta dice «cubre el cuadro» con el zoom de partida.

Los DJI van a 29,97 fps y `fps=30` repite un fotograma cada ≈ 33 s (la primera repetición cae hacia los 16,7 s del clip). Comprobado en las dos ventanas usadas (`dups.py`): ninguna tiene un fotograma repetido, y por eso no se cambió la receta; con un tramo más largo o más tardío habría que estirar el tiempo (`setpts=PTS*1000/1001`, aviso de la V19).

## 4 · Placas, destellos y un inodoro: lo que el borde no enseña hasta que se mira el fotograma completo

- **Placas pegadas a ella.** En HK08 la «1GR-336» del Mini queda a ≈ 0,05 del ancho a la izquierda de Isabella durante TODO el plano (la cámara se desliza a su paso) y la «NGX-490» de la camioneta entra por el borde izquierdo desde los 2,3 s: ninguna ventana 9:16 que la siga las deja fuera, a 4K se leen enteras. Se difuminan con un recuadro con seguimiento (`TAPAR`, claves medidas con `recortes.py` sobre recortes al 100 % con rejilla). `placas-amarillas.py` comprueba sobre el clip ya normalizado que no queda ningún píxel amarillo de placa (0 fotogramas). El recuadro es un borrón gris con borde duro: legible como «tapado».
- En ffmpeg, el `crop` y el `overlay` de un mismo recuadro no comparten variables: `crop` usa `iw`/`ih`, `overlay` usa `W`/`H` (`Undefined constant or missing '('`), y un MP4 de 0 bytes queda en la carpeta tras el fallo (§4 de la V17): se borra antes de repetir.
- **Destello.** El sol sobre el cristal del balcón entra por la esquina superior derecha de la ventana del hook y SUBE por el cuadro (a ≈ 0,22-0,30 de alto al principio, a ≈ 0,35 hacia los 4 s). Un borde superior fijo no basta: `arriba_min` de `encuadre.py` acepta ahora una lista de claves `[t, y]` (la rampa va de 0,335 a 0,372 entre 2,4 y 3,6 s).
- **Inodoro.** El último fotograma de RC13 enseñaba un 14 % de inodoro por el borde izquierdo: no se vio en las hojas de contactos a 8 fotogramas por plano, solo en el still del ÚLTIMO fotograma del plano a 1080×1920. Mirar siempre el último de cada recorrido a tamaño completo. Mover la ventana a la derecha lo sacaba pero dejaba el plano en un armario; lo que funcionó fue acortar el plano (2,1 s) y disolverlo al valle.

## 5 · La rejilla de cortes: el piano solo cabe si las disolvencias son libres

El 033 usaba para las disolvencias el mismo criterio que para los cortes secos (acabar en un golpe ≥ 9 dB). Con piano (golpes de 8-10 dB cada 1-2 s, con huecos) eso dejó **0 soluciones** en las cuatro candidatas. La regla del encargo y de R33 es que los cortes SECOS caen en un golpe medido; las disolvencias, no. `rejilla-037.py` (nuevo) trata las disolvencias como parte de un super-plano con rango de duración sumado y solo exige golpe en los cortes secos y en la entrada. Resultado: *Children*, *Experience* y *Silver Skies* siguen en 0 (golpes de piano muy espaciados y sin caída a tiempo), y *Familiar* da diez soluciones, la mejor con todos los cortes en golpes de 9,1 a 14,5 dB y el CTA en el golpe más fuerte, 3,6 s antes de que la canción caiga. Antes de buscar, hay que decidir QUÉ planos disuelven.

## 6 · Una pista quieta pide una ganancia fija antes del plan

*Familiar* mide −21,5/−20,5/−24,0 LUFS donde suena sola; dejarla a −15 en el plan pide +6,5…+9 dB y `revisaAudio` falla por encima de +6 dB (es fabricar nivel). `normalizar.mjs` la decodifica con `+4 dB` fijos y un limitador que no toca nada (el pico pasa de −7,5 a −3,5 dBFS): `MUSICA_PRE_DB`, declarado en la receta y en `audio-037.ts`. Las sonoridades de `LUFS_SOLA` se miden DESPUÉS de esa ganancia. Medido sobre la prueba: música sola a −14,9/−15,1/−14,9 LUFS, voces a −14,8/−14,9 en su ventana, pieza entera −15,1 LUFS, pico −2,0 dBFS.

## 7 · El audio del render llega 1-2 fotogramas tarde (otra vez)

`golpes-render.py` sobre el MP4 de la prueba da +1,1 a +2,0 f entre el frame previsto y la subida detectada en los cuatro cortes secos (117, 352, 429, 805; antes del cambio de la vista, que también dio +1,9 en f686). Es el relleno del AAC del render de Remotion (≈ 1,3 f, `montaje.md`, «Y el relleno del AAC»): restado, quedan +0,1 a +0,7 f. No se movió ningún corte.

## 8 · El hook oscuro y los cortes de luma

Dron (ladera con cielo) → hook (garaje): −21 niveles de luma media, el mayor corte de la pieza; el hook, con +0,4 de exposición (el tope), sombras +0,7 y contraste 1,0, queda en luma 96 y Isabella en 124. Se probó levantarlo más (sombras +0,9, negros +0,15, contraste 0,92): ganó 3,6 niveles y quedó lavado (saturación 0,18, ni un píxel aplastado). La luma media de un fotograma con un garaje oscuro engaña: lo que se iguala es ella, no el promedio.

## 9 · Proceso

- Disco: el volumen de datos estaba al 100 % (6-7 GB libres) mientras otras sesiones renderizaban. `stills-multiples.mjs` empaqueta UNA vez y borra su bundle; un `remotion render` de la prueba deja otro de 2,2-2,5 GB en el tmp del sistema y se borra al terminar, **solo si no hay otro render en marcha** (otra sesión podría estar usándolo).
- El entorno rechaza bucles de shell con variables en comandos de `ffmpeg`/`uv`/`python`; los lotes van en scripts (`hoja-clips.py`, `hoja-tiempos.py`, `hoja-dir.py`, `poner-color.py`).
- zsh: `echo =====` falla (`=` expande como un comando) y `set -- $r` no separa.

## 10 · La orden de exportar con la duda abierta (2026-10-11): qué se midió y qué NO se pudo cerrar

La orden «renderiza el final» llegó sin respuesta sobre las ocho palabras, así que (7c de `recorrido-luxur`) se MIDIERON las vocales con `formantes.py` antes de exportar, se dijo, y las notas «POR CONFIRMAR» se quedaron (`revisar-037.mjs --final` sigue fallando a propósito).
- **«El»** (hook, 0,855-0,975 s): [e] (F1 ≈ 500-530, F2 ≈ 1.950-2.300 Hz): compatible.
- **«error»** (CTA): descarta «radar» (vocales medias, F1 ≈ 520-620; su /a/ de «haz» da 760-890) pero no separa «error» de «horror».
- **«cansan»/«aburren»** (mitad): **no se cierra, y corrige lo dicho al entregar la prueba.** La «cuenta de dos arranques de sílaba» (2,205 y 2,335 s) no distingue «can-san» de «a-bu-rren»: una [u] no da arranque. Con formantes hay un estallido de /k/ sorda tras 90 ms de casi silencio antes de la primera vocal (a favor de «cansan») y una vocal posterior de F1 ≈ 480, media y no su /a/ de F1 ≈ 800, más un murmullo con F2 ≈ 600 que también es una [u] (a favor del patrón [a]-[u]-[e] de «aburren»). Lección: un detector de arranques de energía cuenta sílabas con consonante fuerte, no vocales cerradas entre consonantes suaves; antes de decir «no son tres», mirar F1/F2.
