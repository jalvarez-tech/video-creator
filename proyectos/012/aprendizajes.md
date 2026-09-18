# 012 · Aprendizajes

## 1. El plan estaba limpio y el frame no (× 3)

`revisar-plan.mjs` salió **✅ limpio a la primera** y los tres fallos que había
sólo aparecieron al renderizar stills. Los tres son del mismo tipo: el validador
mide **si algo cabe y cuándo empieza**, nunca **cómo se ve cuando alguien mira**.

| frame | qué pasaba | por qué no lo caza el validador |
|---|---|---|
| **f0** | el hook al ~25 % de opacidad: la miniatura salía en blanco | `entra: ninguna` estaba en el NODO; la rampa de `LEY_BLANDA` la aplica el **grupo** |
| **f330** | «APEX» sobre las grúas del puerto y el velo tan denso que Cartagena era un fondo gris | no sabe dónde cae el sujeto de una foto dentro del recorte 9:16 (R17) |
| **f500** | 3 de 5 países a mitad de toma, el tercero a medio entrar | `paso` es legal a cualquier valor; que la lista **termine** dentro de su ventana no lo comprueba nadie |

El primero se llevó a **[R23](../../manuales/edicion-video/reglas.md)**: es el
único de los tres que se puede escribir como regla general.

## 2. El banco mintió dos veces seguidas, y de formas distintas

R16 dice que Pexels nunca devuelve cero. Aquí se midió **cómo** miente:

- **Por el glosario.** «Cartagena rascacielos **vis**ta aérea» → el normalizador
  tradujo `vis` como *social housing complex* y devolvió edificios de **Viena,
  İzmir, Buenos Aires y Valencia**. Ni uno de Cartagena. La consulta parecía
  buena y el filtro de medida aprobó los 80 resultados.
- **Por el parecido.** «bocagrande skyscrapers waterfront» → **Sharjah, Batumi,
  Colombo y Natal** en 4 de los 9 primeros puestos. Son skylines costeros de
  torres blancas: exactamente igual de plausibles y de otro continente.

**De 18 candidatos vistos en dos hojas, 4 eran Cartagena.** Ninguna hoja lo
decía; se vio mirándolas. Usar cualquiera de las otras habría sido fabricar
prueba documental de un viaje que la pieza afirma que ocurre.

## 3. Lo que NO se puso, y por qué cuenta como decisión

Se montó una tercera hoja de contactos («business networking handshake») para
una tercera transición y se descartó **entera**: nueve resultados de stock
corporativo con rostros identificables. Habría metido caras de desconocidos en
el único sitio donde su cara es el argumento, y es el «stock que usa todo el
mundo» que el criterio 5 de `bancos.py contactos` manda descartar.

La pieza tiene **dos** transiciones y no tres. Checklist §7.8: ante la duda,
quita.

## 4. Los subtítulos cambian qué moldes existen

El 008 pone todo su texto en los moldes `sello` y `cta` (banda inferior). Aquí no
se puede usar **ninguno de los dos**: anclan al 70 % y `SubtitulosSync` pinta en
el 72 %. El 008 no llevaba subtítulos; esta pieza sí.

Es una consecuencia de R08 y R14 que no estaba escrita en ningún sitio como
disyuntiva: **si la pieza lleva subtítulos, la banda inferior ya está ocupada y
todos los gráficos van a la franja alta.** No es estilo, es geometría.

## 5. El clip traía las dos trampas de iPhone a la vez

`rotation=-90` (R19) **y** HDR HLG (R21) en el mismo archivo, más una segunda
pista de audio de 4 canales que Chromium no lee. Medido en el mismo fotograma:
**YAVG 143 sin tone-map contra 122 con él**. Ninguna de las tres se ve en un
frame; las tres se ven en `ffprobe`. `normalizar.sh` cierra las tres.

`YMAX = 249` tras normalizar, por debajo del umbral de R13: el avatar va **sin
gradar**, que además es lo correcto aquí — su cara es la marca de la pieza
(contrapeso de R11, aprendido en el 003).

## 6. El color del master salió mal en las DOS capas, y `ffprobe` solo enseña una

R22 ya avisaba de que las etiquetas viven en el VUI del H.264 y en el átomo
`colr` del contenedor. Lo que este proyecto añadió es **cómo falla el arreglo**:

- El master de Remotion salió con VUI **`2/2/1`** —matriz BT.709, pero primarios
  y curva **sin especificar**— y **sin átomo `colr`**.
- `h264_metadata=colour_primaries=1:…` corrigió el VUI, y `ffprobe` **seguía**
  diciendo `unknown`: con `-c copy`, `+write_colr` escribe en `colr` lo que el
  muxer leyó del stream de ENTRADA (2/2/1), porque el bitstream filter actúa
  después. Hay que añadir `-color_primaries bt709 -color_trc bt709 -colorspace
  bt709` en la misma orden.
- Y **`framemd5` hay que pedirlo decodificado.** Con `-c copy` hashea los
  paquetes comprimidos: al tocar el SPS cambian, y parecía que había habido
  recompresión cuando los píxeles eran idénticos (`57970736…` en los dos).

Los dos matices se llevaron a [R22](../../manuales/edicion-video/reglas.md).

## 7. Segunda pasada: quitar los subtítulos no es quitar una capa

El cliente pidió tres cosas —fuera subtítulos, hook más impactante, el texto
donde estaban los subtítulos— y **las dos primeras son independientes, pero la
tercera es CONSECUENCIA de la primera**: no es una preferencia de colocación, es
lo que R14 ya decía. Con pista de subtítulos en el 72 %, los moldes `sello` y
`cta` están prohibidos (anclan al 69,8 %) y todo tiene que ir a `franja`. Sin
ella, todo baja.

Lo que arrastró, que es más de lo que parece:

- **El molde de las cinco tomas** sobre el avatar (`franja` → `sello`/`cta`).
- **El cuerpo del hook**: `franja` da 340 px de alto y `sello` da 500, que es lo
  que permite las tres líneas de la frase nueva.
- **El argumento de contraste entero.** `franja` trae `scrim: false` y el texto
  se sostenía con `sombra.texto` contra un techo blanco; `sello` trae el scrim
  ACOPLADO. Medido en el render nuevo: la banda cae a luma **73 / 48 / 37**
  contra **~157** del resto del cuadro.
- **Un comentario que se quedó mintiendo.** En `g03` decía que la etiqueta se
  había quitado porque el subtítulo repetía «APEX Inmobiliario» — y ya no hay
  subtítulos. Se reescribió: la decisión sigue siendo buena, pero por otra razón.

Se llevó a [R14](../../manuales/edicion-video/reglas.md) como corolario: **se
decide antes de escribir el plan, y se pregunta si no viene dicho.**

El fichero de subtítulos **no se borró**: se dejó desconectado y se exportó a
`.srt`, que es donde sigue sirviendo (la plataforma pinta esa pista ella misma y
no compite con nada).

## 8. Dos cambios que restan contraste a la vez piden medir ANTES, no después

Tercera pasada, dos peticiones del cliente: **acento verde** en vez de dorado y
**velo más transparente** detrás del texto. Cada una por separado es inocua; las
dos juntas empujan en la misma dirección y el sitio donde se rompe no lo vigila
ningún validador — R09 mide anchos, no contraste.

El verde «profesional» por defecto (`emerald 500 #10B981`) habría quedado en
**3,28 : 1** sobre la banda ya aclarada: por debajo de AA normal, y nada habría
fallado. Midiendo los candidatos antes de elegir, `emerald 400 #34D399` da
**4,33 : 1** estimado y **4,68 : 1** medido en el render.

Dos cosas que este paso dejó claras:

- **La transparencia del scrim es un dato del PLAN**, no del motor:
  `ambiente: { scrim: { opacidad: 0.72 } }`. No hubo que tocar `Fondos.tsx`.
- **El velo de la toma de Cartagena se aclaró en la misma proporción** (~0,72
  del anterior). No por simetría estética: dos tomas con dos criterios distintos
  de velo es exactamente como una pieza empieza a parecer dos piezas.

## 9. El fallo que no estaba en ningún frame, sino ENTRE dos

Lo reportó el cliente viendo el vídeo: **«cuando aparece APEX el texto se corre
para arriba»**. Y tenía razón — el kicker «CARTAGENA DE INDIAS» saltaba **44 px
hacia arriba** entre f308 y f320.

Lo que hace este fallo distinto de los tres del punto 1: aquellos se veían en un
still, sólo había que renderizar el still correcto. Éste **no está en ningún
frame**. Cada uno por separado se ve perfecto; el error es la diferencia entre
dos. El plan estaba limpio, R08 y R09 en verde, y las tres pasadas de frames
anteriores no lo cazaron porque miraban un frame por toma.

**La causa:** `sello`, `cta` y `franja` anclan ARRIBA y crecen hacia abajo, así
que un hijo que entra tarde no desplaza a nadie. `pantalla` ancla al **CENTRO**,
y ahí cada entrada cambia la altura del bloque y lo recoloca entero. Las dos
tomas de pantalla (Cartagena y los 5 países) lo tenían; las cinco de banda, no.

**El arreglo ya estaba en el motor**: `ley.reserva`, que monta el árbol congelado
en su frame 0 ocupando el hueco. Viene en `false` por defecto y el motor avisa de
que en overlays sobre avatar «sería mentir sobre la composición» — pero ese aviso
aplica a moldes que centran, que es justo donde aquí hacía falta. En las cinco
tomas de banda es inocua, y se comprobó frame a frame que no revela nada antes de
tiempo.

Se llevó a **[R24](../../manuales/edicion-video/reglas.md)**, con la comprobación
que faltaba: para cazar un recolocado hay que **comparar dos stills apilados**,
no mirar uno.

## 10. R18 se cumplió por el camino largo: `etiqueta` no sabe partirse

El cliente pidió cambiar el rótulo del arranque por «¿Tienes un lote o
oportunidad de inversión?» en el segundo 5. Se escribió como `etiqueta`, el plan
salió **limpio**, y el frame salió con **«inversión?» sola en la segunda línea**.

Es literalmente el agujero que R18 describe, y esta vez del lado de la pieza:
`etiqueta` no acepta `lineas` y su ancho se estima con
`anchoPalabraMasLargaTramos` — mide la PALABRA más larga, porque en un texto que
se maqueta libre no caber significa bajar de línea, y bajar de línea es legal.
Así que R09 contesta «cabe» a una pregunta más estrecha de la que uno cree estar
haciendo.

La salida está en la propia R18: lo que SÍ tiene que ir en dos líneas se escribe
a mano con `lineas: [...]`, y la única pieza de texto que las acepta es
`titular`. Va con `rol: "apoyo"`, que le da el color y el alfa de un secundario
sin dejar de ser la pieza que R09 mide por LÍNEA ENTERA.

El corte se eligió por sentido, no por longitud: «¿Tienes un lote» / «o
oportunidad de inversión?» — las dos cosas que la pregunta ofrece.

**Y el segundo 5 no era un número redondo cualquiera:** f150 cae dentro de «un
lote» (f144–172) y la voz sigue con «o oportunidad de inversión» hasta f229. El
rótulo y la frase hablada van a la vez.

## 11. Un relevo son dos tomas, y el hueco entre ellas se mide en frames

«Cuando entre la pregunta debe quitarse el hook.» Escrito como un hijo más del
bloque con `en: 150`, lo que salía eran los dos textos a la vez. Un relevo no es
eso: es que uno **muere** donde el otro nace.

Dos formas de escribirlo en este sistema, y la segunda es la buena:

- Un nodo con `muere` dentro de la misma toma — el hueco que deja depende de la
  reserva de maqueta y la pregunta se queda colgando debajo.
- **Dos tomas contiguas** (`[0,150]` y `[150,229]`). Cada una se ancla arriba por
  su cuenta, así que la segunda ocupa el sitio de la primera; y `revisaPlan`
  comprueba que no hay ni solape ni agujero, que es exactamente lo que puede
  salir mal al partir una toma en dos.

**Y el detalle que sólo se ve contando frames:** con la entrada blanda de la ley
(`rampa: 8`), el hook moría en f150 y la pregunta tardaba ocho frames en verse.
El still de **f152 salía con la banda vacía**. Es el mismo tipo de fallo que
R24 —no está en ningún frame, está entre dos—, y se cierra con `escalon`: el
corte duro que el sistema ya usa para estados que se turnan.

## Entregables

| archivo | qué es | medida |
|---|---|---|
| `finales/012-apex-cartagena.mp4` | **master** · crf 16, BT.709 en las dos capas | 25,6 MB |
| `finales/012-apex-cartagena-compartir.mp4` | para subir · crf 20 | 14,1 MB · **PSNR 48,6 dB** contra el master |
| `finales/012-apex-cartagena.srt` | captions para la plataforma (27 cues) | del `subtitulos-012.ts` desconectado |

**Créditos para la descripción** (Pexels no los exige; se ponen igual, R16):
Metraje de archivo — Andres Villamizar · Pexels License.
