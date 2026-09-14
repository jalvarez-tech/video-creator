# Aprendizajes — proyecto 008 («Ayudemos a Chocó»)

Primera pieza de CAMPAÑA del sistema (no noticia, no inmobiliaria) y primera
marca nueva sobre el motor parametrizado. Lo que queda para el siguiente:

## Editorial

1. **La gramática papel/cine ES el concepto si se reparte bien.** Cine (negro +
   metraje real) = «esto está pasando»; papel (arena cálido) = «esto pensamos
   hacer». La alternancia del formato contó sola la tesis de la campaña
   (dolor → decisión → acción) sin inventar nada nuevo.
2. **En una pieza con víctimas, los huecos honestos MEJORAN el resultado.**
   Cuatro planos no existían dignos en el banco (grieta, camión vacío,
   transferencia, río del Chocó) y sus tomas quedaron en texto editorial o en
   metonimia — y son de las más fuertes de la pieza. Traer «lo más parecido»
   habría sido peor que no traer nada.
3. **El daño por metonimia funciona:** un cuarto en penumbra dice más que una
   grieta genérica; la mano del niño en la del adulto dice más que una familia
   posando. Y ningún rostro de archivo quedó presentado como víctima.
4. **Los silencios del guion son tomas, no huecos:** cada línea vacía del
   guion-vo (2 s) pagó una tarjeta (8 toneladas, sedes, cuenta, claim, foto,
   frase final) sin pelear con la voz.
5. **Los datos que faltan van como «por confirmar» EN PANTALLA.** Direcciones,
   cuenta y fecha del camión son placeholders visibles e imposibles de publicar
   por accidente — misma red que los artículos de ley del 007.

## Trampas de herramienta (las nuevas)

- **La hoja de contactos NO basta: el contenido se juzga en el encuadre final
  (→ R17).** Cuatro reemplazos se cazaron SOLO mirando stills del render:
  un rostro con bufanda de invierno (c03 v1), una CRUZ desenfocada al fondo
  (c06a v1 — leía funeral), una app de Biblia legible en inglés (c03 v2) y
  lentejuelas de tienda vintage (a02 v1). Nada de eso se veía en la miniatura.
- **Pexels puede servir 720p bajo una URL etiquetada 1080** (lo cazó el agente
  re-midiendo el ARCHIVO descargado, no la hoja): ffprobe tras cada `traer`.
- **El glosario de bancos.py muta subcadenas dentro de palabras inglesas**
  («tele-VIS-ion» → disparó la clave "vis"): consultas con posibles claves
  dentro van con `--tal-cual`.
- **Si el reemplazo comparte consulta (mismo slug), el archivo nuevo PISA el
  nombre del viejo:** borrar huérfanos ANTES de traer el reemplazo, no después
  (un `rm` posterior se llevó la descarga nueva y hubo que reponerla).
- **La clave de ElevenLabs tiene permisos por producto:** TTS funcionó y
  `music_generation` devolvió 401 missing_permissions. Revisar los permisos de
  la key ANTES de prometer música (plan de composición quedó listo en
  `musica/README.md`).
- **En xAI, «clave válida» ≠ «créditos»:** 403 permission-denied con URL de
  compra = el equipo no tiene créditos. El b-roll IA no es un fallback si nadie
  vigila esa cuenta.
- **El adjunto del chat se puede recuperar del transcript de la sesión**
  (JSONL con base64): la foto del cliente no estaba en disco y salió de ahí,
  verificada visualmente y registrada en el manifiesto como material propio.

## Deuda que queda anotada

- **Música:** el interruptor `HAY_MUSICA` en Noticia008.tsx + envolvente ya
  programada; falta el permiso de la key (README en `proyectos/008/musica/`).
- **Ambiente Chocó específico** (lluvia sobre zinc, selva): hoy abre
  `ambient-wind` genérico del banco sfx; si algún día hay permiso de
  sound-generation, generar uno propio.
- **n01a (arroz) es un macro muy abstracto en still**; en movimiento se lee.
  Si el cliente lo siente confuso, reemplazar por un plano más literal de
  mercado empacado.

## V4 — voz propia del cliente (2026-08-13, misma noche)

- **Pipeline de voz grabada:** Whisper `-ojf` (tiempos por PALABRA) → cortar el
  WAV en partes por frontera de frase → `generar-vo.sh --motor propio
  --pausa 0` (la lectura continua se respeta; los silencios de tarjeta los
  ponen las líneas vacías del guion). La lectura del cliente ES el guion:
  transcribir ANTES de re-maquetar (aquí cambió el orden de secciones,
  nombró las sedes y leyó la frase final — el plan se reordenó a su voz).
- **Camas de atmósfera sin tocar el motor:** `<Audio loop>` por `<Sequence>`
  en la comp, con envolvente por frame relativo. La ganancia se calibra al
  PICO MEDIDO de cada archivo (volumedetect), no a ojo: la lluvia del banco
  pica en −11,4 dBFS y con una ganancia «razonable» de −31 quedaba inaudible
  (objetivo ambient: pico ≈ −30/−34).
- **Entradas disruptivas = vocabulario existente:** `barrido` con `barra`
  (titulares) + `escalon` (apoyos) + whoosh `whip` en el cue. No hizo falta
  inventar piezas; el cierre (frase final + versículo) se quedó ceremonial
  a propósito.

## Pieza AVATAR («ya hay 3 puntos», 2026-08-14)

- **Clip real de iPhone ≠ avatar HeyGen:** llega HEVC 1920×1080 con rotación
  −90 en metadatos y a 30 fps. Se hornea la rotación transcodificando a H.264
  (`avatar-008.mp4`, 1080×1920) y la comp va a **30 fps** — el «avatar 9:16 =
  25 fps» de §3a es de HeyGen; con fuente real manda R01.
- **Los tokens de whisper (`-ojf`) son la regla de oro del sync:** cada tarjeta
  y cada pop cae en el frame de SU palabra (f = s×30 del JSON de tokens), no en
  el del segmento. Con eso la lista de Medellín aterriza sede a sede
  (f217/243/269) sin ajustar a ojo.
- **Techo blanco = franja alta inutilizable para texto:** el molde `franja` no
  lleva scrim y el clip tiene techo claro; TODO el texto fue a `sello`/`cta`
  (banda inferior, patrón R14) y arriba solo quedó el watermark con su propia
  píldora oscura.
- **La cámara solo se mueve entre tarjetas:** las 7 tomas de gráficos son hero
  en banda inferior; los 4 cues de cámara caen en los huecos (saludo, súplica,
  alejar pre-cifra, pre-CTA) y el reposo hereda la escala del último cue.

## Pieza GRACIAS («8 toneladas de puro amor», 2026-08-15)

- **El color reparte AUTORÍA, no jerarquía — y eso es lo que lo hace simbólico.**
  Avatar008 usaba un solo acento (ámbar = lo operativo) y dejaba `logro` sin usar
  con una nota escrita: no había nada logrado todavía. En cuanto lo hubo, la
  pregunta útil no fue «¿qué color le pongo a esto?» sino **«¿de quién es esto?»**:
  VERDE lo que consiguió la gente · ÁMBAR lo que falta por hacer · BLANCO su voz
  · SIN COLOR quien recibe. Con esa pregunta, cada tarjeta se colorea sola y
  ninguna decisión es estética.
- **La ausencia de color es una decisión de color.** La toma de los niños y los
  adultos mayores es la única sin acento Y sin un solo SFX en sus ítems. Es la
  regla que la marca ya traía («el dolor no lleva color: lleva silencio»)
  aplicada a quien recibe: decorarlo lo convertiría en argumento de campaña.
- **El sonido firma la MISMA frase que el color, no la acompaña.** El `impact
  deep` suena tres veces y las tres sobre un titular verde. Un deep sobre el
  plazo del camión —que es el dato más «importante» de la pieza— habría roto la
  regla; no ponerlo es lo que la hace legible.
- **El `logro` de fábrica (#34d399) no vale en una paleta cálida:** es una menta
  de dashboard y al lado del ámbar tierra canta. `#74C46A` comparte temperatura
  con el acento y da ≈6:1 sobre el scrim. La paleta semántica del sistema es un
  SUELO; el hex lo pone la pieza (`plan.paleta`).
- **La escala máxima de cámara sale del ENCUADRE del clip, no del proyecto.**
  Avatar008 llegaba a 1.18; éste no pasa de 1.12, porque es un selfie a distancia
  de brazo (cara más pequeña y más alta) y a 1.16 la barbilla entra en la banda
  de texto. Copiar el plan de cámara de la pieza anterior habría cruzado texto y
  cara sin que ningún validador dijera nada.
- **La `ranura` es el gesto exacto para una objeción y su respuesta.** Él tarda
  4,5 s en pasar de «si todavía no has llevado tu aporte» a «todavía tenemos
  tiempo»; dos tarjetas seguidas lo cuentan como dos ideas y una ranura que
  conmuta en f582 lo cuenta como lo que es: la misma frase cambiando de signo.
- **Un `targetFrame` bajo puede parir un `startFrame` NEGATIVO.** Un whoosh pica
  al 65 % de su duración, así que `cue(..., target 4, dur 12)` arranca en −4 y
  pierde el ataque fuera de la composición. Se ve listando los cues resueltos, no
  oyendo la prueba. Con cámara desde f0, el whoosh pica a mitad del gesto (f10).
- **`variantIndex` sobre una variante sin pool es ruido:** `click ui` no tiene
  alternas y los tres clicks de sedes resolvían igual. Aquí daba lo mismo (son
  tres veces la misma acción), pero el código prometía una variación inexistente.
- **Lo que NO se dibujó es parte del diseño:** él dice «lo estamos logrando» sin
  dar cifra intermedia, así que la pieza no lleva barra de progreso ni contador.
  Una proporción en pantalla habría inventado el dato que falta — misma
  disciplina que los placeholders «por confirmar» de la v4.
- **El gancho pide el ARGUMENTO ENTERO, no su resumen** (corrección del cliente
  sobre la v1 de esta pieza). La primera versión metía el planteamiento en un
  kicker pequeño («pensamos que era mucho») y guardaba la cifra para el remate;
  el cliente pidió abrirlo con las tres líneas y el número grande. Tenía razón, y
  el motivo es medible: con «8 TONELADAS» arriba, quien mira sin sonido tiene las
  DOS mitades del argumento —la meta y el logro— en los tres primeros segundos, y
  el 8 abre y cierra la pieza. La lección general: en el hook, el antetítulo se
  come el dato; si el dato ES el gancho, va de titular.
- **Un texto de tres tiempos se construye con las tres piezas de texto, no con
  tres titulares:** `kicker` (antetítulo) → `titular` (la cifra) → `etiqueta` (el
  cierre de la frase), cada uno con su `en` sobre su palabra. Sale la maqueta
  pedida y sigue siendo la gramática de la casa.
- **Una cifra en el hook va en `lineas`, nunca como `texto` suelto:** con `texto`
  el validador mide la palabra más larga y el número puede partirse en pantalla
  (R18). Con `lineas: [["8 TONELADAS"]]` mide la línea entera y garantiza el
  `nowrap`.
- **Adelantar una tarjeta obliga a recortar la cámara:** el hook pasó a f16 y
  `cam-hook` tuvo que bajar de 0–20 a 0–14 para no moverse bajo un hero
  (director §3d). El movimiento no se borra, se comprime — medio segundo y un
  6 % siguen leyéndose como empujón.
- **Una lista de insumos pide la FOTO de los insumos, y el sitio es el propio
  ítem.** Al añadir las fotos que mandó el cliente, la decisión no fue «dónde
  caben» sino «qué frase prueban»: cada una entra en el frame de SU palabra
  (f206 aseo · f249 medicinas · f286 alimentos), los mismos frames que ya
  disparaban los pops de la lista. La foto y su etiqueta son la misma
  afirmación; si se reparten a ojo, la tarjeta y la imagen se contradicen.
- **La prueba se usa UNA vez.** La tentación es repetir las fotos en «TODO SUMA»
  y en el cierre. Puestas dos veces dejan de ser prueba y son decoración: en el
  resto de la pieza el hero es él.
- **Material propio ≠ b-roll, y la diferencia es de honestidad, no de coste.**
  Estas fotos pueden afirmar un hecho porque las tomó el cliente; las mismas
  imágenes generadas con IA serían prueba documental fabricada (la línea que el
  006 ya trazó). Van al manifiesto con sha256 aunque no haya licencia de nadie
  que respetar: el manifiesto documenta el ORIGEN, no solo el permiso.
- **Fotos de móvil por debajo del formato: se declara, no se disimula.** Dos de
  las tres miden 899×1599 contra una comp de 1080×1920 (~1,2× de escalado). Se
  aceptan por lo que son y se integran con el look del canal (velo cálido, grano
  compartido, viñeta — las mismas tres capas y en el mismo orden que el metraje
  del formato de noticias). El grano compartido es lo que hace que una foto de
  móvil y un clip de iPhone se lean como UNA pieza.
- **El adjunto del chat se recupera del transcript, otra vez** (ya pasó en la
  v4). El JSONL de la sesión guarda las imágenes en base64: se extraen, se MIRAN
  (R17) y se registran. No hace falta pedir que las reenvíen por otro canal.
