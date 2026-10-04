# 012 · Plan — «Las conexiones correctas»

> Convocatoria personal a la red del cliente antes de **APEX · El Wall Street
> Inmobiliario** (Cartagena, 17 y 18 de septiembre de 2026). Pieza de avatar
> real: él a cámara, 27,8 s, pidiendo que quien tenga un lote o una oportunidad
> le escriba antes del evento.

## Cabecera

| | |
|---|---|
| **formato** | 9:16 vertical |
| **comp** | 1080 × 1920 |
| **fps** | **30** — el fps ORIGINAL del clip manda (R01). El 25 de director §3a es para clips de HeyGen |
| **duración** | **835 f** = 27,83 s (la del clip; director §5) |
| **estilo** | **Lujo / corporativo sobrio** (director §4): cámara lenta y escasa, distancias cortas, sin rebote, SFX mínimo |
| **marca** | **NINGUNA** — decisión del cliente. Es un mensaje personal («mándame un DM»), no una pieza de canal: sin watermark |
| **subtítulos** | **NO** — decisión del cliente (2.ª pasada). Y no es una capa que se quita: es la que decide dónde va TODO el texto (ver abajo) |

**Por qué ese estilo y no «redes».** El registro lo fija el evento, no el canal:
APEX se presenta en negro, tipografía fina y un solo acento. Un montaje de
whips y zooms rápidos contradiría aquello a lo que dice que va.

## Material

| pieza | qué es | medida | de dónde |
|---|---|---|---|
| `avatar-012.mp4` | el clip del cliente | 1296×2304 · 30 fps · 835 f · con voz | `IMG_2494.MOV`, normalizado con `normalizar.sh` |
| `t01-cartagena` | foto de Cartagena | 8829×11773 | Pexels · Andres Villamizar · [ficha](https://www.pexels.com/photo/view-of-boats-moored-in-the-harbor-in-a-coastal-city-26600370/) |

**Lo que traía el original y no se ve en ningún frame:**

- **Rotación (R19).** `ffprobe` decía `1920×1080` + `rotation=-90`: la pantalla
  son 1080×1920. Planificar sobre el dato crudo habría sido recortar 16:9 → 9:16.
- **HDR (R21).** HEVC 10 bit **HLG** (`arib-std-b67`, BT.2020). Medido en el
  mismo fotograma: **YAVG 143 sin tone-map contra 122 con él**. Sin corregir
  sale lavado y parece «iPhone con poca luz», no un error — por eso se publica.
- **Dos pistas de audio.** La estéreo AAC y una de 4 canales (audio espacial del
  iPhone) que Chromium no lee. Se toma sólo la primera.
- **YMAX = 249** tras normalizar: por debajo de 250, así que **no hay nada que
  corregir** de exposición (R13). El avatar va **sin gradar** — R11 avisa de que
  gradar una cara es decisión de cliente, y aquí su cara ES el activo.

## Por qué el b-roll es ese y por qué no hay más

Regla de honestidad (director §3h): lo real se trae, lo que no existe se genera,
lo que no tiene referente filmable es gráfico.

- **Cartagena → banco.** Es un lugar real y la pieza afirma que él va allí.
  Se eligió el plano del **skyline de Bocagrande** (la zona del Hotel Estelar,
  la sede) y no el casco colonial: dice *ciudad donde se invierte*, no turismo.
- **La fecha, la sede y los 5 países → gráfico.** No tienen referente filmable.
  Es el error caro de este paso y el más fácil de cometer, porque el banco
  siempre devuelve algo plausible.
- **Networking → NADA.** Se montó la hoja de contactos y se descartó entera: era
  stock corporativo de apretones de manos con rostros identificables. Metía
  caras de desconocidos en el único sitio donde su cara es el argumento, y es
  justo el «stock que usa todo el mundo» que el criterio 5 manda descartar.
  **Dos tomas a pantalla completa, no tres** (checklist §7.8: ante la duda, quita).

**Trampa medida en este proyecto.** La consulta «Cartagena rascacielos vista
aérea» devolvió edificios de **Viena, İzmir y Buenos Aires**: el glosario
tradujo «**vis**ta» → *social housing complex*. Y «bocagrande skyscrapers
waterfront» trajo **Sharjah y Batumi** en 4 de 9 puestos. El banco nunca dice
que no (R16): las dos hojas se miraron y de 18 candidatos sólo 4 eran Cartagena.

## Mapa de escenas

| frames | narrativa | cámara | motion graphic (banda inferior salvo pantallas) | sonido |
|---|---|---|---|---|
| 0–150 | **hook** · la promesa | 1.00→1.06 (f0–26) | `sello`: «Las grandes oportunidades necesitan **conexiones correctas**» — puesto ya en **f0** | riser suave |
| 150–229 | **hook** · el filtro | reposa 1.06 | `sello`: «¿Tienes un lote **o oportunidad de inversión?**» — RELEVA al hook, no se le suma | whoosh light |
| 229–297 | **contexto** · cuándo | reposa 1.06 | `sello`: «**17 y 18** de septiembre» (f238) | whoosh light |
| **297–368** | **PANTALLA 1 · Cartagena** | *reposa* | `pantalla`: foto a sangre + APEX + sede | impact deep f300 |
| 368–472 | **contexto** · con quién | 1.00→1.09 (f374–404) | `sello`: brokers · speakers · empresarios | pop ×3 |
| **472–526** | **PANTALLA 2 · los 5 países** | *reposa* | `pantalla`: negro + los 5 países | impact + ticks |
| 526–690 | **cta** · el pedido | 1.06→1.14 (f596–632) | `cta`: «Mándame un **DM**» (f635) | whoosh + pop |
| 690–835 | **remate** · la promesa y el cierre | reposa 1.14 | `sello`: «sale el **próximo gran negocio**» (f747) | whoosh light |

**El acento es VERDE, no dorado** (`#34D399`, emerald 400), y el velo de la
banda va a 0,72 en vez de 1 — las dos, petición del cliente en la 3.ª pasada.
Restan contraste las dos a la vez, así que se midieron: el peor caso del verde
sobre la banda es **4,68 : 1**, por encima de AA normal. Detalle en `02-layout.md`.

**Sin subtítulos, el texto BAJA.** Es R14: con la pista del 72 % fuera, ese
carril queda libre y es donde el ojo ya espera leer en un vertical. Arriba el
texto competía con el fondo real de la toma —el ventanal y el techo blanco de su
sala— y se sostenía sólo por la sombra; abajo lo sostiene el scrim del molde,
que viene ACOPLADO y que nadie puede olvidar. **Medido en el render:** la banda
del texto cae a luma **37–73** contra **157** del resto del cuadro (R13).

La primera versión tenía todo en la franja alta y era correcto entonces: llevaba
subtítulos, y `sello`/`cta` anclan al 69,8 %. Quitada la pista, la razón
desaparece.

Las ventanas salen de la transcripción **por palabra** (whisper.cpp, `-ml 1`),
no del guion: `f = s × 30`, medido. Las dos pantallas entran sobre la palabra
exacta — la de Cartagena en «**Apex**» (f297) y la de los países en «más de
**5 países**» (f474).

**La pregunta del segundo 5** («¿Tienes un lote o oportunidad de inversión?»,
f150) cae DENTRO de «un lote» (f144–172), y la voz sigue con «o oportunidad de
inversión» hasta f229: el rótulo y la frase hablada son la misma y van a la vez.
El segundo 5 lo pidió el cliente; que además caiga ahí es lo que lo convierte en
refuerzo y no en ruido.

**Y RELEVA al hook en vez de sumarse a él** (petición del cliente): son dos tomas
contiguas, `g01-hook` [0–150] y `g01b-pregunta` [150–229], no un hijo más del
mismo bloque. Así la pregunta ocupa el sitio del hook en lugar de colgar debajo,
y `revisaPlan` comprueba que entre las dos no queda ni solape ni agujero. La
entrada de la pregunta es **dura** (`escalon`): con la entrada blanda de la ley,
el hook moría en f150 y ella tardaba 8 frames en verse — medido, f152 salía con
la banda **vacía**.

## Guion (transcrito y corregido)

> Hola, este mensaje es para todas las personas del sector inmobiliario que
> tengan un lote o oportunidad de inversión. El 17 y 18 voy a estar en el APEX
> Inmobiliario en Cartagena, conectando con brokers, speakers y empresarios de
> más de 5 países. Así que si tienes algo que valga la pena para poner sobre la
> mesa, **mándame un DM** y hablemos. Tal vez de una conversación salga el
> próximo gran negocio. Dios te bendiga.

**Tres correcciones a whisper**, que oyó mal y en pantalla van bien:
«mandame un **día** y me hablemos» → «mándame un **DM** y hablemos» ·
«salga **al** próximo» → «salga **el** próximo» · «Dios **se** bendiga» →
«Dios **te** bendiga». Comprobado re-transcribiendo la cola con contexto.

## La voz no se corta nunca (R10)

Las dos tomas a pantalla completa **no desmontan el avatar**: lo tapan con un
fondo opaco mientras el `<OffthreadVideo>` sigue montado. Es la alternativa que
R10 da de una sola fuente, y cierra de raíz el fallo que esa regla describe —
que el vídeo se quede mudo en los tramos cubiertos, algo que ningún still
enseña. Se comprueba **oyendo** la prueba 720p, no mirándola.

## Datos del evento (verificados en apexwallstreet.com el 2026-09-16)

APEX · El Wall Street Inmobiliario · **3.ª edición** · 17 y 18 de septiembre de
2026 · **Hotel Estelar Bocagrande**, Cartagena de Indias · inversionistas de 5
países: **Estados Unidos, República Dominicana, Panamá, Dubái y Colombia**.
