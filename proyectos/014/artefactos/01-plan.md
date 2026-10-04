# 014 · Plan — «Publica en minutos»

> El cliente a cámara (selfie de mano, en la nave de un evento, americana
> blanca) presentando **su agente de IA para creadores de contenido**: subes el
> vídeo y salen los subtítulos, las imágenes de banco y la publicación en
> minutos. 49,0 s. Encargo literal: *«agrégale textos al vídeo y efectos de
> sonido cuando entren»*.

## Cabecera

| | |
|---|---|
| **formato** | 9:16 vertical |
| **comp** | `Avatar014` · 1080 × 1920 |
| **fps** | **30** — el fps ORIGINAL del clip manda (R01) |
| **duración** | **1471 f** = 49,03 s (la del clip; director §5, leída con `calculateMetadata`) |
| **estilo** | **Redes / tecnológico limpio** (director §4): entradas cortas, un SFX por texto, sin glitch ni impacts cinematográficos |
| **marca** | **NINGUNA**, declarada — es un mensaje personal de su marca propia, que no tiene fichero en `src/marcas/`, y el encargo no pide sello. Look en `look-014.ts` (el verde que él pidió en el 012 y el 013) |
| **subtítulos** | **NO** — preferencia declarada del cliente en sus piezas de avatar (012, 013). Decide el molde de las siete tomas (R14): todo el texto en la banda inferior. `.srt` exportado para captions |
| **cámara** | **NINGUNA**, declarada — el encargo es texto + sonido, y el plano es un selfie de mano que ya se mueve solo (su mano entra en cuadro en f60, f360 y f1390). Sin punch-in, el clip se normaliza a 1080×1920 nativos (criterio del 013) |

**Por qué «redes» y no «lujo».** El 012 tomaba el registro del evento al que
convocaba; aquí el registro lo fija el producto: una herramienta de IA para
quien graba con el móvil. Un montaje de aterrizajes lentos y timbres de cristal
diría «gala», y lo que él dice es «en minutos».

## Material

| pieza | qué es | medida | de dónde |
|---|---|---|---|
| `avatar-014.mp4` | el clip del cliente | 1080×1920 · 30 fps · 1471 f · con voz | `IMG_2590.MOV` (17-09-2026, 18:11), normalizado con `normalizar.sh` |

**Lo que traía el original y no se ve en ningún frame:**

- **Rotación (R19).** `ffprobe` decía `1920×1080` + `rotation=-90`: la pantalla
  son 1080×1920.
- **HDR (R21).** HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020), como el 012 y
  a diferencia del 013. El tone-map lo hace VideoToolbox en la normalización;
  la receta PARA si le entra un SDR, porque tone-mapear un SDR también lo
  estropea.
- **Dos pistas de audio.** La estéreo AAC y una de 4 canales (audio espacial del
  iPhone) que Chromium no lee. Se toma sólo la primera.
- **Audio a −17,7 LUFS, −0,4 dBTP** (medido con `loudnorm`). Nivel razonable
  para móvil, sin tratar: el cliente prefirió el audio original en el 013 y
  aquí, además, no hace falta. Con el AAC de salida: −17,7 LUFS, −0,5 dBTP.
- **YMAX 236-253** tras normalizar. Dos frames pasan de 250 y es el techo de
  luminarias de la nave, no su cara: nada que corregir (R13). El avatar va
  **sin gradar** — su cara es el activo.
- **La banda del texto es BLANCA.** Su americana cae justo en el carril del
  texto: luma media **108-121** en y = 1340-1750 (`signalstats`), el fondo más
  claro de las tres piezas de avatar. Es lo que decide el velo (02-layout.md).

## Guion (transcrito por palabra y corregido)

> Hola, mi nombre es John Stevans Álvarez y quiero ayudarte a que el cuello de
> botella que tienes cuando grabas contenido, cuando creas marketing, sea más
> fácil para hacerlo. Por eso he creado un agente de inteligencia artificial,
> el cual hace que tus vídeos como estos los subas y automáticamente le pongas
> subtítulos, le pongas imágenes de bancos gratuitos y puedas publicarlos en
> minutos en redes sociales, [sin] tener que llegar después de un largo día de
> grabación a editar, a mirar si la voz quedó bien o a mirar las imágenes de
> dónde las voy a sacar. Esto lo hace todo por ti y te va a ayudar a ganar
> mucho tiempo para que empieces a disfrutar lo más importante de la vida.

**Tres correcciones a whisper-small** (re-transcrito con contexto y `-bs 8`):
«una **gente**» → «un **agente**» · «para que **pienses**» → «para que
**empieces**» · «John **Eseban**» → «John **Stevans**». ⚠️ Esta última NO
sale del audio: whisper oye «Eseban» en tres pasadas. Sale de la identidad del
propio cliente (autor del repo). **Un nombre propio en pantalla no se
reconstruye** (013): va en el kicker del hook y queda marcado para que él lo
confirme antes de publicar.

**Y una corrección de lo que él DICE, declarada:** en el 31,0 pronuncia «**y**
tener que llegar después de un largo día…», y por el sentido de la frase es
«**sin** tener que». En pantalla y en la caption va el sentido; en
`transcripcion.json` queda lo literal.

## Promesa y estructura

- **Promesa (hook, f0):** «Publica **en minutos**, sin pasar horas editando».
  Dice qué se lleva quien mira, no quién habla (preferencia del cliente: hook
  de promesa, no descriptivo). Su nombre va de kicker porque se presenta en el
  primer segundo.
- **No hay CTA:** él no pide nada («escríbeme», «sígueme») y no se inventa.
  El remate es su promesa, y se queda hasta el último frame para la segunda
  vuelta del reel.
- **Lo que NO se cuenta:** cómo funciona el agente, qué cuesta, dónde se
  consigue. Él no lo dice; un rótulo que lo dijera sería inventar.

## Mapa de escenas

| frames | s | narrativa | hero | rótulo (banda inferior, molde `sello`) | sonido |
|---|---|---|---|---|---|
| 0–159 | 0–5,3 | **hook** · quién y qué promete | avatar | kicker «john stevans álvarez» + «Publica **en minutos**, / sin pasar horas editando» — puesto YA en f0 | — (no entra: R23) |
| 159–455 | 5,3–15,2 | **problema** · el cuello de botella | avatar | «El cuello de botella / de crear contenido» + chip «QUE SEA MÁS FÁCIL» (f348) | whoosh light · pop |
| 455–560 | 15,2–18,7 | **mecanismo** · la solución | avatar | «Un agente de / **inteligencia artificial**» | swoosh + chime |
| 560–658 | 18,7–21,9 | *respiro* | avatar | — (banda limpia mientras señala a cámara) | — |
| 658–958 | 21,9–31,9 | **prueba** · lo que hace | avatar | kicker «automáticamente» + ✓ Subtítulos (f693) · ✓ Imágenes de bancos gratuitos (f736) · ✓ Publicado en redes en minutos (f822) | whoosh light · pop ×3 |
| 958–1200 | 31,9–40,0 | **giro** · lo que dejas de hacer | avatar | kicker «tras un largo día de grabación» + ✗ Editar (f1016) · ✗ Revisar si la voz quedó bien (f1051) · ✗ Buscar de dónde sacar imágenes (f1108) | whoosh light · click ×3 |
| 1200–1318 | 40,0–43,9 | **giro** · la resolución | avatar | «Lo hace **todo** por ti» + «y ganas mucho tiempo» (f1270) | swoosh + chime · pop |
| 1318–1471 | 43,9–49,0 | **remate** | avatar | kicker «para que empieces a disfrutar» + «Lo más **importante** / LA VIDA» (f1373) | whoosh light ×2 |

Siete tomas, todas de banda: **ninguna cubre**, así que el clip está montado
los 1471 frames y la voz no se corta nunca (R10).

Las ventanas salen de la transcripción **por palabra** (whisper.cpp `-ojf`):
`f = s × 30`, medido. Cada texto entra **sobre su palabra o 8 frames antes**
(lo que tarda el muelle en verse): quien lee va por delante de quien escucha.

## Simbología de color (R15)

| color | significa | se usa en |
|---|---|---|
| verde `#34D399` | **lo que el agente te da**: minutos, automatización, tiempo, vida | «en minutos», «inteligencia artificial», los tres ✓, «todo», «importante» |
| rojo `perdida` | **lo que deja de hacerse** | sólo los tres glifos ✗ (nunca una palabra) |
| blanco | **su voz**: el problema y las dos listas | el resto de titulares e ítems |
| sin color | contexto | kickers y chip |

Dos colores simbólicos porque la pieza **compara** dos listas de signo opuesto
(lo que el agente hace por ti / lo que tú dejas de hacer), que es el único caso
en que R15 lo permite. El verde de los ✓ es la tinta `logro` del dialecto, que
es literalmente el mismo hex que el acento: no entra un cuarto color.

## Decisiones tomadas (y las descartadas)

- **Las listas son tres nodos de un ítem, no una `lista` de tres.** `lista`
  sólo escalona a intervalo fijo (`paso`) y aquí cada ítem aterriza SOBRE su
  palabra, con huecos de 43 y 86 f que ningún `paso` reproduce.
- **Un respiro de 98 f** (f560-658) mientras dice «tus vídeos como estos»
  señalando la cámara: el único tramo en que se le ve sin texto encima.
- **Un sonido por entrada de texto y ninguno más** (es el encargo): 17 cues en
  49 s. Ninguno en f0 (el hook ya está puesto) ni en f560 (el texto SALE).
- **El kicker de «lo que hace» se acortó a «automáticamente»**: «subes el
  vídeo y automáticamente» tocaba los dos márgenes en el frame (R18) con el
  plan en verde, porque R09 mide la palabra más larga de un kicker.
- **Los SFX se ALINEARON y se NIVELARON midiendo** (03-timeline.md): con la
  receta de la casa no se oía ninguno, porque el golpe de varios archivos del
  banco está hasta 1 s dentro y el cue lo cortaba antes, y porque el nivel de
  fábrica iguala picos de muestra, no lo que se oye. Es el hallazgo de esta
  pieza y va a `aprendizajes.md` y a R26.
- **Descartado: cámara virtual.** No la pide el encargo y el plano ya se mueve.
- **Descartado: CTA.** Él no lo dice.
- **Descartado: b-roll.** Ninguna frase pide un plano que no sea él: los tres
  ✓ y los tres ✗ son conceptos sin referente filmable (director §3h) y van como
  gráfico.

## B-roll — 3.ª pasada (petición del cliente)

> «Agrega imágenes que complementen lo que estoy hablando en momentos
> estratégicos.»

**Cuatro momentos, seis planos de banco, 385 f (13 s, 26 % de la pieza).** Cada
plano ilustra la FRASE que se está diciendo, no el tema, y entra y sale en un
golpe que ya existía: una palabra o el aterrizaje de un ✓/✗ de las listas.

| momento | frames | frase | plano | por qué ahí |
|---|---|---|---|---|
| el problema | 240–299 | «cuando **grabas** contenido» | un móvil grabando en su estabilizador | primer cambio de plano a los 8 s: rompe diez segundos de él a cámara justo cuando nombra el problema |
| | 299–349 | «cuando **creas** marketing» | manos rellenando un planificador de contenidos | vuelve a su cara con el chip «QUE SEA MÁS FÁCIL»: la solución la dice él |
| lo que hace | 736–822 | «le pongas **imágenes** de bancos gratuitos» | una rejilla de fotos pasando en el móvil | la frase es literalmente lo que se está viendo |
| lo que ya no | 1016–1051 | «a **editar**» | de espaldas frente a un editor de vídeo | entra con el ✗: el clic que tacha es el corte |
| | 1051–1108 | «a mirar si la **voz** quedó bien» | de noche, con cascos, frente a una pista de voz | ídem, con el segundo ✗ |
| el cierre | 1373–1471 | «lo más importante de la **vida**» | una pareja de la mano, en silueta, al atardecer | entra con «Lo más importante / LA VIDA» y cierra el reel |

**Lo que se queda en su cara, a propósito:**

- **El hook (f0–158).** El f0 es la miniatura y el hook es él.
- **«Por eso he creado un agente de IA».** Su producto no tiene referente
  filmable; un plano de stock de «inteligencia artificial» sería mentir sobre
  lo que vende (director §3h: sin referente, gráfico, y el gráfico ya está).
- **El respiro**, en que señala a cámara: «tus vídeos, como estos».
- **«Publicarlos en minutos en redes sociales».** Es la promesa del hook, dicha
  por él. Además, el plano que había para ahí enseñaba marcas (abajo).
- **El giro, «Esto lo hace todo por ti».**

**Motor: banco, los seis.** Son lugares, objetos y gestos reales (director
§3h). Grok no hacía falta.

**Descartados, y por qué** (se vieron a resolución completa, R17):

| plano | motivo |
|---|---|
| portátil con una rejilla de fotos | el navegador enseñaba el **logo de Pexels** legible |
| móvil con un vídeo vertical («redes sociales») | la interfaz decía **«@www.pexels.com»** y el título de una canción de **Ed Sheeran** |
| gráficas con lápiz («marketing») | el banco lo declaró 1080×2048 y el archivo medía **720×1366** |
| chica del gorro naranja editando | la pantalla caía en la mitad BAJA, detrás de la banda de texto |
| familia en la playa al atardecer | las figuras quedaban justo detrás del titular del remate |
| instagram, pinterest, apps con iconos | marcas (R16) |

**El grado: la referencia es él.** `bancos.py gradar` iguala los clips entre sí
(mediana luma 86). Aquí cada inserto corta desde y hacia su clip (luma 122,
saturación 8,6, cálido), así que se acerca a él **la mitad** de la distancia,
con los topes de `gradar`. La mitad y no el todo: los planos de noche y el
atardecer son oscuros por lo que cuentan.

| plano | luma | → | saturación | → | grado |
|---|---|---|---|---|---|
| i1-grabar | 165,7 | 144,0 | 4,1 | 4,9 | exp 0,869 · sat 1,20 · cálido +0,028 |
| i2-marketing | 72,2 | 90,3 | 8,4 | 8,4 | exp 1,25 |
| i3-imagenes | 96,2 | 109,2 | 10,9 | 9,8 | exp 1,135 · sat 0,893 · cálido +0,028 |
| i4-editar | 79,7 | 99,6 | 12,4 | 10,5 | exp 1,25 · sat 0,85 |
| i5-voz | 59,3 | 74,1 | 8,4 | 8,4 | exp 1,25 |
| i6-vida | 92,5 | 107,3 | 6,4 | 7,5 | exp 1,16 · sat 1,17 · cálido +0,026 |

**Créditos para la descripción** (Pexels no los exige; se ponen igual, R16):
Metraje de archivo (Pexels License) — Ron Lach · cottonbro studio · ROMAN
ODINTSOV. URLs en `broll/manifiesto.json` (`bancos.py creditos --proyecto 014`).
