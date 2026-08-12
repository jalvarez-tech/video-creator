# 📏 Reglas del manual `edicion-video`

> **Cada corrección se convierte en regla.** Lo que se corrige una vez no se repite: entra aquí para que el próximo vídeo salga mejor.
> Antes de editar cualquier vídeo se aplican TODAS. Formato de cada regla: **Regla · Por qué · Cómo aplicarla**.
> Las reglas nuevas (aprendidas al corregir) se añaden **al final, con el siguiente número libre**.
> **Última regla: R16.** Actualiza este número al añadir una (es el único sitio donde hay que tocarlo).

---

## Reglas base

### R01 — Nunca editar sin revisar resolución, fps y audio
- **Por qué:** si no conoces el fps real, animaciones y cortes se desincronizan; sin audio válido, Auto-Editor corta mal.
- **Cómo aplicarla:** antes de tocar nada, inspecciona el fuente:
  ```bash
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1 "proyectos/NNN/original.mp4"
  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,channels,sample_rate -of default=noprint_wrappers=1 "proyectos/NNN/original.mp4"
  ```
  Anota resolución, fps y audio en `guion-limpio.md`. **El fps original manda** para la plantilla de exportación.

### R02 — Nunca diseñar visuales sin transcripción
- **Por qué:** títulos y subtítulos salen del texto real; sin transcripción se improvisa y se rehace.
- **Cómo aplicarla:** genera `transcripcion.json` (Whisper) y depura `guion-limpio.md` ANTES de animar. Marca en el guion dónde va cada título y refuerzo visual.

### R03 — Decidir formato antes de animar
- **Por qué:** vertical / horizontal / split cambia composición, zonas seguras y posición de subtítulos. Animar antes = rehacer.
- **Cómo aplicarla:** elige la **plantilla de formato** (`plantillas/`) y fija `width`, `height` y `fps` en la `<Composition>` antes de crear cualquier animación.

### R04 — Trabajar por tramos de 10 segundos
- **Por qué:** los tramos cortos se revisan y corrigen sin perderse; evita renders largos para ver un detalle.
- **Cómo aplicarla:** divide el guion en bloques de ~10 s. En Remotion un tramo ≈ **300 frames a 30fps** (`<Sequence from={...} durationInFrames={300}>`). Previsualiza tramo a tramo: `npx remotion render <id> out/tramo.mp4 --frames=0-299`.

### R05 — Mostrar frames antes de exportar
- **Por qué:** un frame revela errores (texto cortado, fuera de zona segura, contraste bajo) sin gastar un render completo.
- **Cómo aplicarla:** captura los frames clave (entrada de título, mitad, salida) y muéstralos; espera OK antes de exportar:
  ```bash
  npx remotion still <id> out/check-045.png --frame=45
  ```

### R06 — Exportar primero una prueba ligera
- **Por qué:** confirma códec, audio y nombres sin esperar el render final pesado.
- **Cómo aplicarla:** render 720p a `pruebas-720p/` y revísalo; sólo entonces el final a `finales/`:
  ```bash
  npx remotion render <id> proyectos/NNN/pruebas-720p/prueba.mp4 --scale=0.5
  ```
  **Ojo con `--scale`:** el alto resultante tiene que ser ENTERO o Remotion aborta. En 9:16 `--scale=0.6666667` falla (1920 × 0.6666667 = 1280.000064); usa `--scale=0.5` (540×960). En 16:9 sí vale 0.6666667 (1080 × … = 720).

### R07 — Guardar cada corrección útil como regla nueva
- **Por qué:** una corrección perdida en el chat se repite en el próximo vídeo.
- **Cómo aplicarla:** cuando algo se corrige y funciona, añádelo aquí con **la siguiente R libre** (la cabecera de este archivo dice cuál es la última) en formato Regla · Por qué · Cómo. Si es específico de un vídeo, anótalo también en el `aprendizajes.md` de ese proyecto.

---

## Reglas aprendidas (crecen con el tiempo)

### R08 — Motion graphics: fuera de la cara y del subtítulo
- **Por qué:** en talking-head vertical la cara ocupa el centro y los subtítulos el tercio inferior (y≈70%). Un gráfico ahí tapa lo importante.
- **Cómo aplicarla:** coloca los motion graphics en la **franja superior** (y < 340 px en 1080×1920, la zona sobre la cabeza). **1 solo gráfico a la vez**, con entradas/salidas limpias (spring). Revisa siempre con frames reales antes de exportar; si un chip roza la frente, súbelo. Timing por frames absolutos al fps del clip.

### R09 — Cámara del avatar: nunca `scale<1` ni paneo sin zoom; reposo bajo gráficos full
- **Por qué:** el avatar es un vídeo `objectFit:"cover"` → a `scale 1.0` llena el frame EXACTO. Bajar de 1.0 muestra bordes negros y un desplazamiento sin zoom suficiente saca la cara del encuadre. Además, mover la cámara mientras un gráfico ocupa toda la pantalla (o hay otro cambio visual fuerte) es esfuerzo perdido. Manual completo: [camara-avatar](../camara-avatar/SKILL.md).
- **Cómo aplicarla:** usa `<CamaraVirtual>` + `camara.ts` (garantizan `scale ≥ 1` y recortan el desplazamiento al margen del zoom con `clampOffset`). Solo el **avatar** va dentro de la cámara; **subtítulos y gráficos fuera** (overlays fijos). Pon `CameraCue`s solo en las ventanas donde el avatar se ve; deja **reposar** la cámara bajo las tomas a pantalla completa. Cada movimiento con `reason` y motivado por la narrativa; valida el encuadre con frames reales ([R05](reglas.md)) antes de exportar.

### R10 — Si desmontas el vídeo del avatar, la VOZ va en su propio `<Audio>`
- **Por qué:** desmontar el `<OffthreadVideo>` en las tomas a pantalla completa ahorra decodificación y evita pintar lo que no se ve… pero **se lleva la narración con él** y el vídeo se queda mudo en esos tramos. Es un fallo que no se ve en un still: solo aparece al reproducir.
- **Cómo aplicarla:** monta `<Audio src={staticFile("avatar-NNN.mp4")} />` **siempre**, fuera de cualquier condicional, y pon el vídeo en `muted`:
  ```tsx
  <Audio src={staticFile("avatar-003.mp4")} />                 {/* la VOZ, siempre */}
  {enGrafico(frame) ? <Fondo /> : <CamaraVirtual>…</CamaraVirtual>}   {/* el VÍDEO, a ratos */}
  ```
  Alternativa si no quieres separar pistas: deja el vídeo montado con `opacity: 0` (más caro, pero una sola fuente). Comprueba el resultado **oyendo la prueba 720p** ([R06](reglas.md)), no solo mirando frames.

### R11 — Con paleta cerrada, el avatar se GRADÚA al mundo (y el tinte es el neutro frío)
- **Por qué:** un brief tipo *"un solo acento, ningún otro color"* choca con la realidad del clip (ventanales, vegetación, ropa de color). Si no se gradúa, el avatar y los gráficos parecen dos vídeos distintos pegados.
- **Cómo aplicarla:** cadena de cuatro capas sobre el `<OffthreadVideo>` (las de tinte **fuera** de `<CamaraVirtual>`, son de pantalla, no de cámara):
  1. `filter: saturate(0.10) contrast(1.20) brightness(0.68)` — mata el color y baja la exposición.
  2. `mixBlendMode:"color"` con el **neutro frío** de la paleta (~60 %). **Ojo:** hacerlo con el color de fondo casi negro o con el acento cálido deja la imagen **sepia/vintage**; el neutro frío la deja carbón.
  3. `mixBlendMode:"soft-light"` con el **acento** (~20 %) — el calor entra solo por las luces y la piel no queda gris.
  4. Degradado **fijo** en la zona problemática (arriba, si el fondo es un ventanal).
  Valida con frames reales ([R05](reglas.md)): la cara tiene que seguir legible después del paso 1.
- **Contrapeso (aprendido en el 003):** gradar a una persona es una decisión de cliente, no técnica. Se hizo por el brief ("no other colors anywhere") y el cliente acabó pidiendo **el avatar a color**. Antes de gradar una cara, **pregunta**: el coste es perder el tono de piel y la marca personal. Si el brief y el material chocan, enseña las dos opciones en un frame en vez de decidir por él.

### R12 — El fondo por defecto es un DEGRADADO PLANO; la textura se pide, no se regala
- **Por qué:** un fondo procedural (líquido, ruido, partículas, marmoleado) sale bonito en un still y **compite con el mensaje** en movimiento. En el 003 se montó un sustrato líquido siguiendo el brief y el cliente acabó pidiendo *"los fondos en degradados planos"*. Un degradado plano nunca estorba, siempre se lee y no envejece.
- **Cómo aplicarla:** parte de un degradado plano (rampa de 3–4 paradas + un foco radial suave) y añade textura **solo si el cliente la pide explícitamente**. Ejemplo: `Fondo003.tsx`. Para dar continuidad entre tomas sin textura, deja el degradado FIJO y mueve solo la **posición del foco** por toma: se lee como cambio de ángulo dentro del mismo espacio. Si aun así usas un fondo con textura, empújalo detrás con un velo del color de fondo al 25–40 % (mantiene el dibujo, baja el ruido); test rápido: si puedes describir el fondo antes que el titular, está demasiado alto.

### R13 — Nada que SUME luz sobre una persona
- **Por qué:** una capa en `screen`, `soft-light` o `lighten` sobre un avatar levanta las altas luces de la piel y la ropa, y el resultado se lee como **sobreexpuesto** aunque el clip original esté perfecto. En el 003 el clip tenía YMAX 237/255 (sin recorte) y aun así parecía quemado por las capas de líquido en `screen`.
- **Cómo aplicarla:** mide antes de tocar nada —`ffmpeg -i clip.mp4 -vf signalstats,metadata=print -f null -`: si `YMAX` < 250 no hay nada que corregir. Sobre una persona, solo capas que **RESTEN** luz (degradados oscuros para legibilidad de texto, viñeta). Si un sello necesita contraste, oscurece el fondo detrás del texto (scrim), no aclares nada. Cuando el avatar va sin gradar, el scrim tiene que aportar **todo** el contraste: súbelo hasta ~0.95 de opacidad y valida el luma real de la franja con frames ([R05](reglas.md)).

### R14 — Sin pista de subtítulos, los sellos van en la BANDA DE SUBTÍTULOS, no sobre la cabeza
- **Por qué:** [R08](reglas.md) manda los gráficos a la franja superior para no tapar la cara ni el subtítulo. Pero si el vídeo **no lleva subtítulos**, esa banda (y ≈ 70 % → 1340 px en 1080×1920) está libre, y es donde el ojo ya espera leer en un vertical. Arriba, en cambio, el texto compite con el fondo real de la toma (ventanales, cielo) y obliga a un scrim que se come el encuadre. Confirmado como preferencia de cliente en el 003.
- **Cómo aplicarla:** ancla el bloque en `top: 0.70 × alto` y déjalo fluir hacia abajo; comprueba que el elemento más bajo no pasa del 88 % (zona segura inferior). El scrim se **invierte**: degradado desde abajo (`linear-gradient(0deg, …)`), alto ≈ 830 px, con la parte densa (~0.92) justo detrás del texto y algo más suave en el borde inferior (~0.94 → deja las manos como silueta en vez de amputar el plano). Si hay avatar, la cámara con `y` POSITIVO ayuda: baja la imagen, así a esa altura de pantalla cae el torso y no las manos. Ejemplo: `Motion003.tsx` (`Sello` + `ScrimInf`) y `mundo-003.ts` (`BANDA_SUB`).

### R15 — Si el color significa algo, defínelo en una tabla ANTES de animar
- **Por qué:** pasar de "un acento de marca" a "el color informa" es tentador y se degrada en cuanto se improvisa: dos verdes distintos, un rojo decorativo, un azul que no significa nada. El resultado deja de informar y solo distrae. La disciplina no es tener pocos colores, es que **cada color signifique exactamente una cosa**.
- **Cómo aplicarla:**
  1. Escribe la tabla `color → significado → dónde aparece` en el archivo de tokens (`mundo-NNN.ts · SIM`) **antes** de tocar una escena. Si un elemento no encaja en ninguna fila, va en el neutro; no se inventa un color quinto.
  2. **Usa el color que el espectador ya conoce**: verde WhatsApp `#25D366` para mensajería, no un verde cualquiera. La simbología heredada trabaja gratis.
  3. **Un color simbólico por escena.** Dos solo cuando la escena COMPARA cosas de signo opuesto (5 verdes entre 95 rojos; HOY rojo frente a HACE 3 MESES verde). El hero a plena saturación, los apoyos en el mismo color rebajado, el contexto en neutro.
  4. Haz el color **obligatorio** en el primitivo de tipografía clave (`Clave` sin `color` por defecto): así el compilador te obliga a decidir el significado de cada palabra clave y no cae ninguna en el acento "por inercia".
  5. **No reveles el color antes del beat.** En el 003 los 5 puntos que compran salían verdes desde el principio y destripaban el remate: los 100 tienen que ser iguales hasta que se apagan los 95. Un color que informa también informa DEMASIADO PRONTO si no se controla.
  6. Propaga la simbología al **fondo** (el foco de la toma lleva el color del asunto) y a los **detalles mecánicos** (la barra del barrido de entrada). Confirmar en grande lo que la tipografía dice en pequeño es gratis y multiplica la lectura.
  Ejemplo trabajado: `mundo-003.ts` (`SIM`, `TOMAS_GRAFICAS.color`), `Motion003.tsx`, `Fondo003.tsx`.

### R16 — El b-roll de archivo se mide, se acredita y se queda mudo
- **Por qué:** [R01](reglas.md) obliga a inspeccionar resolución, fps y audio, pero solo del `original.mp4`. El material que entra por un banco trae los mismos tres problemas y **ninguno se ve en un frame**, así que [R05](reglas.md) tampoco los caza: con `objectFit: cover` un plano corto de píxeles se estira sin dejar banda negra, un clip más corto que su toma congela su último fotograma sin fallar, y un crédito que falta no aparece en pantalla jamás. A eso se suma lo que ningún validador puede saber: el banco **nunca devuelve cero** —una consulta sin sentido trae miles de resultados igual que una buena—, así que «hay resultados» no significa que ilustren nada.
- **Cómo aplicarla:**
  1. **Medida real del hueco antes de montar**, no la del marco: 1080×1920 a sangre (`escenario`) y **662×853** enmarcado (`retrato`: 624×804 más el Ken Burns 1 → 1.06). `bancos.py` filtra por esto y `revisar-broll.mjs` lo comprueba contra el disco.
  2. **Se elige mirando.** `bancos.py contactos` monta una hoja numerada ya cribada (sin repetidos, sin planos sin contraste); el número de la hoja es el `--indice` que baja ese plano. En una prueba real sobre «grieta en la pared», seis de nueve resultados eran pintura descascarada: la consulta era buena y el filtro los aprobó a todos.
  3. **Crédito en el manifiesto**, con autor, licencia, URL, sha256 y el `--porque` de la elección. Es lo único del b-roll que se versiona y lo único que queda si alguien reclama. Se cobra al publicar: `bancos.py creditos --proyecto NNN` en la descripción del vídeo.
  4. **El clip llega sin pista de audio** (`bancos.py` la quita al traerlo). El riesgo de Content ID documentado en estos bancos no es el vídeo: es la música que llevan dentro, que sus autores sí registran.
  5. **Primero igualar, después el look.** Con todos los clips traídos, `bancos.py gradar` mide con `signalstats` la distancia de cada uno a la mediana del proyecto y escribe su corrección. El look del formato (saturación, velo cálido, grano compartido, viñeta) es aparte y lo aplica el motor. Al revés —el mismo look sobre clips sin igualar— las diferencias se amplifican, porque cada clip viene ya graduado por su autor.
  6. **Personas identificables solo en contexto neutro.** La licencia prohíbe mostrarlas «bajo mala luz», y un rostro de archivo junto a un titular sobre estafas o desalojos es exactamente ese caso.
