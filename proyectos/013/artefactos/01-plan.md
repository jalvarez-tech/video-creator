# 013 · Plan — «Estamos en el APEX»

> Cobertura de **Propiedades Luxur** desde **APEX · El Wall Street Inmobiliario**
> (Cartagena, 17 y 18 de septiembre de 2026). Un solo plano de 12,77 s con
> Isabella Cadavid a cámara en el photocall, flanqueada por dos personajes de
> folclor caribeño. Registro **«estoy aquí»**: los rótulos sitúan, no piden.

## Cabecera

| | |
|---|---|
| **formato** | 9:16 vertical |
| **comp** | 1080 × 1920 |
| **fps** | **30** — el fps ORIGINAL del clip manda (R01) |
| **duración** | **383 f** = 12,77 s (la del clip; director §5) |
| **estilo** | **Corporativo / lujo** (director §4): sin cámara, gráficos contenidos, SFX mínimo |
| **marca** | **Propiedades Luxur** — con `<SelloCampana>` en todos los frames |
| **subtítulos** | **NO** — decisión del cliente. Y no es una capa que se quita: es la que decide dónde va TODO el texto (R14) |

**Qué la separa del 012, que es el mismo evento.** Aquella pieza CONVOCABA
—mensaje personal del cliente a su red, sin marca, «mándame un DM»—. Ésta
INFORMA desde dentro, y por eso firma: lleva el sello del canal y no pide nada
que no sea seguir mirando.

## Material

| pieza | qué es | medida | de dónde |
|---|---|---|---|
| `clip-013.mp4` | el plano del photocall | 1080×1920 · 30 fps · 383 f · con voz y ambiente | `IMG_2548.mov`, normalizado con `normalizar.sh` |

**Lo que traía el original y no se ve en ningún frame:**

- **Rotación (R19).** `ffprobe` decía `1920×1080` + `rotation=-90`: la pantalla
  son 1080×1920. Planificar sobre el dato crudo habría sido recortar 16:9 → 9:16.
- **NO hay HDR, y esta vez la comprobación sirve para lo contrario.** El 011 y el
  012 venían en HLG y hubo que tone-mapear (R21); éste es `color_transfer=bt709`
  y `yuv420p`, así que la receta SDR es la correcta. `normalizar.sh` lo comprueba
  y **para** si algún día le entra un HLG, porque un tone-map que falta no se ve
  en ningún frame: sólo se ve lavado.
- **Dos pistas de audio.** La estéreo AAC y una de 4 canales (audio espacial del
  iPhone) que Chromium no lee. Se toma sólo la primera.
- **YMAX = 251** en el clip entero: un pelo por encima del umbral de R13, y son
  reflejos especulares (el platón metálico de la palenquera, los focos del
  techo). No hay nada que corregir, y sobre todo **no entra ninguna capa que
  sume luz**: la única que se superpone a las personas es el scrim, que resta.

**Escala nativa, sin subir a 1296.** El 011 y el 012 escalaban a 1296×2304
(1080 × 1,2) porque su cámara hacía punch-in y ése era el techo. Esta pieza no
lleva cámara (abajo), así que ampliar sería inventar píxeles para nada.

## Las tres decisiones que fija el encargo

1. **Solo rótulos, sin subtítulos.** Eso decide el MOLDE de las cuatro tomas
   (R14): con la pista del 72 % fuera, el tercio bajo queda libre y todo el
   texto vive ahí (`sello` y `cta`, ancla 69,8 %). Arriba, además, no cabría
   discusión: la franja alta la ocupa el sello del canal.
2. **Marca Propiedades Luxur.** Watermark en todos los frames y el naranja del
   canal como acento — con una corrección medida, abajo.
3. **Registro de cobertura.** Los rótulos sitúan (quién habla, qué evento, qué
   fecha) y cierran invitando a quedarse. Ninguno pide un DM ni un clic.

## Sin cámara virtual, y es una decisión declarada

El plano es de mano y **ya se mueve solo**: el encuadre deriva visiblemente en
los 12,8 s (en el f0 se ve el sombrero entero, en el f330 ya está fuera). Un
punch-in encima pelearía con ese movimiento en vez de sumarle, y el estilo de la
pieza (lujo: «lento y muy sutil, pocos cambios») no lo pide. La cámara reposa
los 383 frames.

## El acento: VERDE esmeralda, medido

El acento de la pieza es **`#34D399` (emerald 400), por petición del cliente** —
el MISMO verde del 012, reutilizado a propósito: son dos piezas del mismo evento
y allí ya se pagó el coste de medir por qué no sirve el 500 (`#10B981`), el
verde «profesional» que uno escribe por defecto.

Se fija en `look-013.ts` cambiando `acentoOscuro`, que `MARCA_BASE` trae en teal
`#0F766E` —el acento de plantilla que venía de fábrica— y que `marca.ts` declara
como DEUDA abierta. **No se toca `luxur.ts`**: el cambio es sólo de esta pieza.

Medido sobre el RENDER (mediana por fila del ancho útil, peor frame):

| fila (px) | luma fondo | blanco | **verde `#34D399`** | naranja `#FF5500` | teal `#0F766E` |
|---|---|---|---|---|---|
| 1340 | 38-40 | 15,13:1 | **7,87:1** | 4,61:1 | 2,70:1 ✗ |
| 1450 | 24-29 | 17,22:1 | **8,96:1** | 5,43:1 | 3,18:1 ✗ |
| 1560 | 23-24 | 17,93:1 | **9,33:1** | 5,54:1 | 3,24:1 ✗ |
| 1680-1750 | 22-23 | 18,10:1 | **9,41:1** | 5,59:1 | 3,28:1 ✗ |

El teal queda **por debajo de AA en TODA la banda** y encima es de otra marca.
El verde va sobradísimo: casi el doble que el naranja del canal.

**El acento mueve DOS cosas a la vez**, y es lo que se quiere: el texto de
acento de los rótulos y el punto del `<SelloCampana>`. Dejar el punto naranja y
el texto verde serían dos acentos peleando en el mismo frame (R15).

**La medición del naranja se deja escrita aunque ya no se use**, porque contesta
una pregunta que se va a volver a hacer: sobre el papel beige del canal da
2,62:1 y aquí da 4,61. No es que el naranja sea legible o no: es que es tinta de
OSCURO. Sobre papel sigue sin resolverse, y esto no lo resuelve.

**El velo sube de 830 a 900 px**, y no la opacidad. Con los 830 del molde el
degradado todavía se está abriendo en la fila 1340 —que es justo donde ANCLA el
bloque—: el fondo se quedaba en luma 51, que con el naranja de entonces daba
**3,95:1**. El verde de ahora sobra de margen, pero la fila sigue siendo la más
clara de la banda y el arreglo es el mismo. Setenta
píxeles más lo arreglan entero y lo que se añade es la cola suave del degradado,
que cae sobre la pared del photocall y no sobre las caras. Bajar la opacidad
(la palanca del 012) iría en la dirección contraria: allí sobraba velo, aquí
faltaba.

## Un color = una cosa (R15)

| color | significa | dónde aparece |
|---|---|---|
| verde `#34D399` | **la voz de Luxur**: lo que el canal afirma y lo que pide | «no sale en los portales», «todo», el punto del sello |
| blanco | **el hecho**: quién habla, qué evento, qué fecha | Isabella Cadavid, El Wall Street Inmobiliario, APEX, 17 y 18 |
| sin color | contexto | los tres kickers |

Por eso **«APEX» va en blanco** y no en el acento, que es lo que uno escribe por
inercia: APEX no es de Luxur. Luxur está ahí, que es otra cosa, y eso lo dice el
sello.

## Mapa de escenas

| frames | narrativa | cámara | motion graphic (banda inferior) | sonido |
|---|---|---|---|---|
| 0–62 | **hook** · la promesa | *reposa* | `sello`: «Lo que pasa aquí / **no sale en los portales**» — puesto ya en **f0** | — |
| 62–146 | **contexto** · quién habla | *reposa* | `sello`: «en directo desde cartagena» · **Isabella Cadavid** · chip «EL WALL STREET INMOBILIARIO» | whoosh light |
| 146–245 | **contexto** · dónde y cuándo | *reposa* | `sello`: «estamos en» · **APEX** (124 px) · chip «17 Y 18 DE SEPTIEMBRE» | whoosh swoosh |
| **245–300** | **respiro** | *reposa* | **nada** | — |
| 300–383 | **remate** · quédate | *reposa* | `cta`: «no te lo pierdas» · «Te lo contamos **todo**» | whoosh light |

**Las ventanas salen de la transcripción por PALABRA** (whisper.cpp `-ml 1`
sobre el audio ya limpiado), no del guion: `f = s × 30`, medido.

```
f62  «nombre»    (2,07 s)  → entra el rótulo de ella, sobre la palabra
f67  «Isabella»  (2,22 s)
f146 «APEX»      (4,88 s)  → entra el rótulo del evento, sobre la palabra
f177 «Cartagena» (5,89 s)
f299 «no se pierdan» (9,96 s) → entra el remate
f347 última palabra; quedan 36 f de cola
```

**El respiro de 55 frames es una decisión, no un hueco.** Es el único tramo
donde se ve la escena entera —ella, el sombrero vueltiao y la palenquera— sin
nada encima, y en 12,8 s con cuatro rótulos ese aire es lo que impide que la
pieza se lea como una plantilla rellenada.

**Los dos relevos son CORTES DUROS** (`entra: "escalon"`), no fundidos. Con la
entrada blanda de la ley el hook muere en f62 y el bloque nuevo tarda 8 frames
en verse: un cuarto de segundo con la banda vacía donde tiene que haber un
cambio. En una toma de 84 frames eso es el 10 % de su vida.

## Sin `.srt`, y es una renuncia declarada

R14 dice que al quitar la pista de subtítulos el fichero se queda como captions
de plataforma. Aquí no se entrega, y la razón es del material: el audio es de
evento —música, sala llena— y whisper-small no lo transcribe con garantías
(osciló entre lecturas incompatibles del apellido de ella hasta que lo confirmó
el cliente). Publicar esa pista sería publicar errores. **Los rótulos no citan a
nadie**, y por eso no dependen de la transcripción: de ahí sólo salen los
TIEMPOS, que sí son fiables.

## Guion (transcrito, con la parte insegura marcada)

> Hola, hola a todos, mi nombre es **Isabella Cadavid**, de El Wall Street, y
> estamos en el APEX, [en] la ciudad de Cartagena, y [les vamos a] estar
> mostrando [todo] lo que [está pasando aquí], [así] que no se pierdan y sigan
> conectados.

Lo que va entre corchetes es reconstrucción: el modelo no lo saca limpio y
**nada de eso aparece en pantalla**. El nombre lo confirmó el cliente.

## Datos del evento (verificados en apexwallstreet.com el 2026-09-16, en el 012)

APEX · El Wall Street Inmobiliario · **3.ª edición** · 17 y 18 de septiembre de
2026 · **Hotel Estelar Bocagrande**, Cartagena de Indias.
