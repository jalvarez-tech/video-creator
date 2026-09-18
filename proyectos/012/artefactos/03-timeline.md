# 012 · Timeline — 835 f · 30 fps · 27,83 s

Todas las ventanas en **frames absolutos** al fps de la comp (director §3a).
Los frames de voz salen de la transcripción **por palabra** (whisper.cpp `-ml 1`):
`f = s × 30`, medido, no estimado.

## Las cuatro capas

| f | voz (palabra medida) | cámara | gráfico | sonido |
|---|---|---|---|---|
| 0 | «Hola…» | `cam-hook` 1.00→1.06 | **`g01-hook`** (`sello`) · puesto YA en f0 | `s-cam-hook` whoosh light |
| **150** | «un **lote**» (f144–172) | *reposa 1.06* | **`g01b`** RELEVA a `g01`: el hook se va y entra «¿Tienes un lote o oportunidad de inversión?» (`escalon`, sin un frame vacío) | `s-pregunta` whoosh light |
| 232 | | *reposa* | **`g02-fecha`** | `s-fecha` swoosh |
| 242 / 250 | «**17**» / «**18**» | *reposa* | el titular aterriza aquí | — |
| **297** | «**Apex**» | *reposa* | **`g03` · PANTALLA 1 · Cartagena** | `s-apex-in` **impact deep 1/2** |
| 339 | «Cartagena» | *reposa* | + chip «Hotel Estelar Bocagrande» | `s-sede` pop |
| 368 | | | fin de la pantalla | — |
| 374 | | `cam-vuelta` 1.06→1.00 | — | `s-cam-vuelta` |
| 396 | «**brokers**» | *reposa 1.00* | **`g04`** ítem 1 | `s-brokers` pop |
| 424 | «**speakers**» | *reposa* | ítem 2 | `s-speakers` pop |
| 452 | «empresarios» (f457) | *reposa* | ítem 3 | `s-empresarios` pop |
| **470** | «más de **5 países**» (f487) | *reposa* | **`g05` · PANTALLA 2 · los 5 países** | `s-paises-in` **impact deep 2/2** |
| 532 | | | fin de la pantalla | — |
| 596 | «si tienes algo» | `cam-cta` 1.00→1.12 | — | `s-cam-cta` |
| 610 / 628 | | *llega a 1.12 en f632* | **`g06`** · «Mándame un **DM**» | `s-dm` pop |
| 635 | «**mándame**» | *reposa 1.12* | el bloque YA está puesto | — |
| 744 / 760 | | *reposa 1.12* | **`g07`** · el remate | `s-remate` whoosh light |
| 765 / 778 | «**gran**» / «**negocio**» | *reposa* | el titular aterriza dentro de la frase | — |
| 795 | «Dios te bendiga» | *reposa* | el remate se queda hasta f835 | — |

## Las tres decisiones de coordinación (lo que sólo ve el director)

1. **Un hero a la vez.** La cámara REPOSA bajo las dos pantallas completas
   (f297–368, f470–532) y bajo el hook. Los tres movimientos caen en huecos sin
   tarjeta hero. Mover la cámara debajo de algo que la tapa es esfuerzo que
   nadie ve, y el validador del núcleo lo avisa por su nombre.
2. **El gráfico va por DELANTE de la voz, nunca por detrás.** `g06` entra en
   f610 y está puesto en f628; él dice «mándame» en f635. Quien lee va por
   delante de quien escucha, que es lo que hace que un CTA se entienda.
3. **Dos `impact deep` y sólo dos**, los dos en los cortes a pantalla completa,
   que son los únicos cambios visuales fuertes. El remate cierra con el mismo
   `whoosh light` que cualquier tarjeta: un sonido de premio en el cierre
   convertiría una invitación en una venta.

## Lo que se corrigió al ver los frames (R05)

| dónde | qué salió mal | por qué no lo vio el validador |
|---|---|---|
| **f0** | el hook estaba al **~25 % de opacidad**: la miniatura salía en blanco | `entra: ninguna` estaba sólo en el nodo, y la rampa de `LEY_BLANDA` la aplica el **grupo**. Un plan puede estar limpio y no verse |
| **f330** | «APEX» sobre las grúas del puerto; la foto, un fondo gris | el validador mide anchos y ventanas, no dónde cae el sujeto de una foto dentro del recorte (R17) |
| **f500** | 3 de 5 países a mitad de toma | `paso` es legal a cualquier valor; que la lista **termine** dentro de su ventana no lo comprueba nadie |

## Lo que cambió en la segunda pasada (petición del cliente)

Ningún **tiempo** se movió: las ventanas, los cues de sonido y los tres
movimientos de cámara son los mismos. Cambiaron tres cosas y una arrastró a las
otras dos:

1. **Fuera los subtítulos.** `<SubtitulosSync>` sale de la composición.
2. **Todo el texto baja** de `franja` a `sello`/`cta` — consecuencia directa de
   lo anterior (R14), no una decisión aparte. Ver `02-layout.md`.
3. **Hook nuevo**, escrito por el cliente: «Las grandes oportunidades necesitan
   **conexiones correctas**». Cambia a quién apela — la v1 («Voy al Wall
   Street Inmobiliario») hablaba de dónde iba él; ésta habla de lo que se lleva
   quien mira, y por eso aguanta los 7,6 s en que todavía no ha dicho nada
   concreto. Las tres líneas van escritas a mano (R18): al maquetador solo,
   «correctas» se quedaba viuda en la última.

`subtitulos-012.ts` se queda en el proyecto, desconectado, y se exporta como
`finales/012-apex-cartagena.srt` para subirlo como pista de captions.

## Cuarta pasada

- **Hook afinado** por el cliente: cae el «las» antes de «conexiones correctas».
  Las tres líneas se rehicieron a mano: «Las grandes oportunidades / necesitan /
  conexiones correctas».
- **Fuera «si tienes un lote o un proyecto»** (entraba en f53), y en su lugar,
  **en el segundo 5 exacto (f150)**, «¿Tienes un lote o oportunidad de
  inversión?» — que es la frase que él está diciendo justo ahí.
- Va como `titular` y **no** como `etiqueta`, por R18: la etiqueta no acepta
  saltos y su ancho se estima por la palabra más larga, así que el validador la
  aprobó en verde y el frame salió con «inversión?» sola en la segunda línea.

## Quinta pasada — el relevo

La pregunta **sustituye** al hook, no se le suma (petición del cliente). Se
resolvió partiendo el bloque en dos tomas contiguas, `g01-hook` [0–150] y
`g01b-pregunta` [150–229], en vez de con un hijo que entra tarde: así la
pregunta ocupa el sitio del hook en lugar de colgar debajo de un hueco vacío, y
`revisaPlan` vigila que entre las dos no quede ni solape ni agujero.

**La entrada de la pregunta es dura** (`escalon`). Con la blanda de la ley el
hook moría en f150 y ella tardaba ocho frames en aparecer: medido en los stills,
**f152 salía con la banda vacía**. Un relevo con un cuarto de segundo de nada en
medio se lee como error de render. El corte duro es además el gesto que el
sistema ya tiene para dos estados que se turnan (la `ranura` del 003).
