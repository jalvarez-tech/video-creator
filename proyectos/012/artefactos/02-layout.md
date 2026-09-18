# 012 · Layout — reparto del cuadro 1080 × 1920

## El reparto, y por qué ninguna capa se pisa

| banda | píxeles | quién manda | por qué |
|---|---|---|---|
| franja alta | `y < 340` | **nadie** | quedó vacía al bajar el texto: arriba compite con el ventanal y el techo blanco |
| centro | 340 – 1340 | la cara · las dos tomas a pantalla completa | su cara es el activo de la pieza |
| **banda inferior** | `y ≈ 69,8 %` (1340) → tope 88 % | **todos** los gráficos sobre el avatar | R14: sin subtítulos, es donde el ojo ya espera leer en vertical |
| pie | `y > 88 %` | nadie | zona insegura de las plataformas |

**Esto se invirtió en la segunda pasada, y la causa es una sola: los
subtítulos.** La v1 los llevaba en el 72 %; `sello` y `cta` anclan al 69,8 %, así
que se habrían pisado y todo el texto tuvo que subir a la franja alta. Al
quitarlos (petición del cliente), la razón desaparece y el texto baja a su sitio
natural. No es una preferencia de estilo: es geometría, y se decide una vez por
pieza según haya pista de subtítulos o no.

**Lo que se gana al bajar**, además del sitio:

- **El scrim.** Va ACOPLADO al molde (`sello` 830 px desde abajo, `cta` 880),
  nace con la toma y muere con el texto, así que no se puede olvidar. Arriba no
  había scrim (`franja` lo trae en `false`) y el texto se sostenía sólo con
  `sombra.texto` contra un techo blanco.
- **El scrim, y su transparencia, son AJUSTABLES desde el plan** sin tocar el
  motor: `ambiente: { scrim: { opacidad } }`. La pieza lo baja a **0,72**
  (`VELO_BANDA`) por petición del cliente — a opacidad 1 el degradado arranca en
  0,94 y la banda se lee como un bloque negro pegado debajo.
- **Más sitio.** `sello` da 500 px de alto contra los 340 de `franja`, que es lo
  que permite que el hook sea de tres líneas.

**La cámara NO se tocó.** R14 sugiere `y` positivo para que a esa altura caiga el
torso y no las manos, y en este clip sus manos sí entran ahí (f060, f420). Se
midió antes de tocar nada: con el scrim el contraste ya es cómodo, y mover `y`
habría reencuadrado su cara, que está bien. La sugerencia de R14 es para cuando
el scrim no llega; aquí llega.

## Las dos tomas a pantalla completa

Ancladas al centro por el molde `pantalla` (caja 844 × 1500).

⚠️ **Y por eso la pieza activa `ley.reserva`** (`LEY_012` en el plan). Con ancla
al centro, cada hijo que entra cambia la altura del bloque y lo recoloca entero:
el kicker de Cartagena saltaba **44 px hacia arriba** al entrar «APEX» y el chip.
La reserva monta el árbol congelado en su frame 0 ocupando el hueco, así que la
maqueta es la final desde el arranque. En las cinco tomas de banda es inocua
—anclan arriba y crecen hacia abajo—, comprobado frame a frame. Regla R24. Son las dos únicas
tomas que no viven en la banda inferior, y al quitar los subtítulos ganaron
limpieza: antes llevaban una línea de subtítulo encima que en la de Cartagena
repetía la palabra que el gráfico ya decía a 124 px («APEX»).

### T1 · Cartagena (f297–368)

| | |
|---|---|
| encuadre | `scale` 1.30 → 1.42, `translateY` **−15 % → −13,2 %** |
| velo | degradado **0,30** arriba → **0,66** abajo (aclarado con el de la banda) |
| bloque | kicker · `APEX` (124 px) · chip de la sede |

**El velo se aclaró en la misma proporción que el de la banda** (~0,72 del
anterior), para que las dos tomas no acaben con dos criterios distintos. Medido
en f330: la zona del texto sube de luma **65 a 76** y la ciudad de **107 a 122**
— se ve más Cartagena, que era el punto de elegir esa foto, y el titular de
124 px sigue cómodo.

**Por qué la imagen va SUBIDA y el velo va al revés de lo normal.** En el recorte
9:16 a sangre el skyline de Bocagrande cae en `y ≈ 50 %`, justo donde el molde
ancla el texto: el primer still salió con «APEX» sobre las grúas del puerto y el
subtítulo sobre el propio skyline. Subiendo la foto un 15 % pasan dos cosas a la
vez — el skyline sube al tercio alto, donde se ve entero contra el cielo, y el
bloque de texto cae sobre el **agua**, que es la zona más uniforme y oscura de la
foto y por tanto el mejor fondo que hay para tipografía blanca.

El velo se invirtió en consecuencia: **suave arriba** (0,38: el cielo y las torres
sólo hay que asentarlos) y **denso abajo** (0,76: ahí se lee). La primera versión
era un velo plano y denso (0,88) y el resultado se leía como un fondo gris —
daba igual que fuera Cartagena. R13: sólo capas que RESTAN luz sobre la imagen.

### T2 · Los 5 países (f470–532)

Negro del evento (`#08090C`), sin foto: los países no tienen referente filmable
(director §3h). Bloque: kicker · `5 países` (96 px) · lista de cinco.

**`paso: 3` y no 5.** Con 5 la lista tardaba 25 f en estar puesta y el still de
la mitad de la toma (f500) enseñaba **tres países, con el tercero a medio
entrar**. La toma dura 62 f y el dato ES la lista entera: si no se lee completa,
no dice «cinco países».

## Contraste — medido, no mirado (R13)

El acento pasó de dorado a **verde esmeralda `#34D399`** (petición del cliente) y
el velo de la banda se aclaró a 0,72 en la misma pasada. **Los dos cambios
restan contraste**, así que se midió antes de darlos por buenos: con el avatar
sin gradar, el scrim aporta TODO el contraste del texto.

**Luma real de la banda del texto** (`signalstats` sobre y=1340–1750 del render)
y contraste que resulta:

| frame | luma banda | blanco | verde `#34D399` |
|---|---|---|---|
| f000 · hook | 72,6 | 9,00 : 1 | **4,68 : 1** ← el peor caso |
| f060 · hook + filtro | 59,3 | 11,20 : 1 | 5,83 : 1 |
| f250 · fecha | 42,6 | 14,16 : 1 | 7,37 : 1 |
| f650 · CTA | 48,3 | 13,20 : 1 | 6,87 : 1 |
| f790 · remate | 41,4 | 14,55 : 1 | 7,57 : 1 |

El peor caso queda en **4,68 : 1**, por encima de AA normal (4,5) — y el verde
sólo pinta texto de 38 a 124 px, donde el umbral que aplica es el de texto
grande (3 : 1). Margen de sobra.

**Por qué `emerald 400` y no el 500.** `#10B981` es el verde «profesional» que
uno escribe por defecto, y sobre la banda ya aclarada da **3,28 : 1**: por debajo
de AA normal. El jade `#00A86B`, 2,70 : 1. Aclarar el velo y oscurecer el acento
a la vez es justo lo que deja un texto de marca por debajo del mínimo sin que
ningún validador se queje — R09 mide anchos, no contraste.

| verde | sobre `#08090C` | sobre la banda aclarada |
|---|---|---|
| emerald 500 `#10B981` | 7,85 : 1 | **3,28 : 1** |
| **emerald 400 `#34D399`** | 10,36 : 1 | **4,33 : 1** |
| jade `#00A86B` | 6,46 : 1 | **2,70 : 1** |

El verde **nunca** va sobre claro, igual que el dorado al que sustituye: todas
las tomas caen sobre vídeo con scrim o sobre el negro de las pantallas. Es la
lección que el canal ya tenía anotada con su naranja (2,62 : 1 sobre papel).

## Cómo parte el texto (R18)

R09 dice si el texto CABE, no cómo parte. Revisado en los frames:

- **hook** — `lineas` explícitas: «Voy al / Wall Street / Inmobiliario». Tres
  líneas escritas a mano, ninguna viuda.
- **T1** — se quitó la etiqueta «El Wall Street Inmobiliario» al ver el frame:
  el hook ya dice esa frase y el subtítulo decía «APEX Inmobiliario» justo
  encima. Era la tercera vez que se leía lo mismo en pantalla.
- **remate** — «sale el próximo / gran negocio», partido a mano por sentido.
