# 011 · Aprendizajes

## Lo que se llevó a `reglas.md`

- **[R21](../../manuales/edicion-video/reglas.md)** — el vídeo de iPhone viene en
  **HDR HLG** y, normalizado como cualquier otro clip, sale lavado sin avisar.
  Tone-map por VideoToolbox en la normalización. Incluye la versión foto de la
  trampa de [R19](../../manuales/edicion-video/reglas.md): `sips` deja el HEIC
  apaisado con `EXIF Orientation=6`.

## Lo que funcionó y conviene repetir

**Sin voz, la retícula la da la música, y hay que MEDIRLA.** Energía por bandas
con `ffmpeg astats` cada 10 ms → golpes con su fuerza → cortes sobre golpes. Con
eso salieron tres anclajes que a oído no se habrían encontrado: el respiro de
Turning Page en el f1800 (elegir `desde = 1,40 s` para que caiga ahí), la subida
en el f1002 (el inicio del beso) y un golpe fuerte para el cuchillo en alto. Y
un dato que evitó un error: El Preso **deriva** entre 104,1 y 105,0 BPM; una
rejilla fija habría ido desplazándose del ritmo corte a corte.

**Un optimizador pequeño para repartir la rumba.** Catorce planos con ventana
útil (mín/máx/preferida) y límites que solo pueden caer en golpes: programación
dinámica en 30 líneas de Python. Hecho a mano, el último plano quedaba siempre
con 2-3 s de más; con el optimizador, el reparto sale en una pasada y es
defendible plano a plano.

**La frontera entre actos la marca el LUGAR, no la actividad.** «Rumba = solo
baile» dejaba 24 planos para el piano y 5 para la salsa. «Rumba = el salón»
(brindis, champán, pastel, pista) dejó 19/14. **Pero eso decide la frontera de
la imagen, no la de la música**: en la v1 las dos iban juntas en el 1:00 y el
cliente separó la musical al 1:18 (ver abajo).

**Stills con UN solo bundle.** `renderStill` + `openBrowser` en un script:
35 fotogramas en 77 s, frente a ~30 s por still con la CLI. Hace barato mirar
de verdad (R05), y ahí salió el único plano flojo (`r11`, medio plano de pared).

**La puerta comprueba el ENCARGO, no solo la técnica.** «Todos los archivos»
es una frase del cliente y se volvió una comprobación (`revisar-011.mjs` §4:
29/29). También «cortes sobre golpes» (§5). Lo que el cliente pide con palabras
es lo primero que se rompe sin avisar al tocar el plan.

**Las colas de las disolvencias se miden.** `c17` y `c18` no cabían en su clip
con el `desde` elegido: la disolvencia alarga 12 f el plano saliente. La puerta
§2 cuenta prerrollo y cola; la del 010 no.

## La corrección del cliente (v2) y lo que enseñó

El cliente vio la primera prueba y pidió dos cosas: **la música cambia en el
1:18** y **un título al inicio con «Boda María & Daniel»**.

**Separar la frontera de la IMAGEN de la de la MÚSICA.** En la v1 las dos
coincidían en el 1:00, y el brindis ya sonaba a salsa. El 1:18 que eligió el
cliente es el frame en que la novia levanta el cuchillo del pastel: el cambio de
canción lo lleva ahora **un gesto dentro de un plano**, no un corte. En el código
quedaron dos constantes con nombre (`CAPITULO` y `RELEVO`) y la puerta las **lee**
del plan en vez de copiarlas: con un `MINUTO = 1800` copiado en la puerta, el
cambio habría pasado las comprobaciones midiendo el vídeo viejo.

**Medir antes de rehacer.** Mover el relevo parecía obligar a buscar otra entrada
de Turning Page, y con ella a recalcular el beso y los 19 cortes de la glorieta.
Antes de tocar nada se midió la canción alrededor del 1:18, y la entrada de
siempre (1,40 s) ya ponía **otro respiro** ahí (79,25–79,55 s de la canción).
Resultado: del 0:18 al 1:00 no cambió ni un frame. Solo se recalcularon el
arranque (por el título), el salón y la rumba, con el mismo optimizador.

**Los anclajes de contenido van a la puerta.** «El beso empieza en el f1002» y
«el cuchillo sube en el f2340» eran cuentas en un comentario. Ahora son una tabla
`ANCLAJES` que `revisar-011.mjs` verifica a ±1 f. Son los dos momentos que más se
notan si se desplazan, y no se ven en ningún frame suelto que no caiga justo ahí.

**Un título de portada se diseña para el frame 0.** Visible desde el primer
frame, sin entrada: esa imagen es la miniatura de WhatsApp. La vida la da un
movimiento ambiental lento que acompaña al punch-in del plano. Y la tipografía
se eligió **mirando**: cuatro fuentes del sistema sobre el fotograma real,
renderizadas con el mismo Chrome de Remotion (`chrome-headless-shell
--screenshot` sobre un HTML de prueba, sin tocar el proyecto). La que más
«bonita» parecía en abstracto (Snell Roundhand) se salía de la zona segura.

## La segunda corrección (v3)

«Hazle un fade out a la música de la primera canción cuando cambia a la otra y
agrega un texto como y ahora… La fiesta».

**Un respiro no sustituye a un fundido.** En la v2 el relevo caía en un respiro
medido de Turning Page y bastaba un fader de 6 f: técnicamente limpio (sin clic,
sin nota cortada), pero el oído del cliente lo leyó como corte, porque la frase
anterior de la balada llega fuerte hasta 0,2 s antes. La medida decía que no se
cortaba nada. No decía si **sonaba** a despedida. Un cambio de canción entre
dos actos pide un fundido audible (aquí 2,8 s en coseno) aunque el punto de
corte sea perfecto.

**El texto y el sonido cuentan lo mismo a la vez.** «Y ahora» entra con el piano
bajando, los tres puntos caen durante el fundido, y «¡LA FIESTA!» cae en el golpe
con el cuchillo en alto. Por eso todos los tiempos del rótulo se escriben como
`RELEVO ± n`: si el relevo se mueve otra vez, el rótulo se mueve con él.

**El sitio del texto lo decide el plano, no la costumbre.** El título de apertura
va centrado porque su plano es un paisaje. El rótulo del pastel va arriba porque
en ese plano el centro es un vestido blanco (texto blanco ilegible), abajo está el
pastel y las caras ocupan el tercio superior; solo la franja alta queda libre. Se midió sobre los stills antes de escribir
una línea.

## La final

Dos archivos en `finales/`, de un solo render (9 min 37 s, `--concurrency=8` en
10 núcleos y 32 GB, sin incidencias):

| archivo | para qué | vídeo | tamaño |
|---|---|---|---|
| `011-boda-maria-daniel-9x16-master.mp4` | guardar (máxima calidad) | H.264 CRF 16 `slow` · 15,7 Mbps · AAC 320 k | 240 MB |
| `011-boda-maria-daniel-9x16.mp4` | compartir (WhatsApp, redes) | recodificado del master, CRF 20, tope 10 Mbps · 8,4 Mbps | 131 MB |

Verificado en los dos: 3600 fotogramas · 120,04 s · BT.709 en rango limitado con
las etiquetas coherentes en VUI y contenedor · negros solo en los dos fundidos
buscados (1:00 y final) · sin congelados · −15,65 LUFS y −1,52 dBTP · el fundido
del relevo idéntico al de la prueba v3 · fotograma del rótulo contra el still de
referencia: 40,9 dB el master y 38,5 dB la de compartir, con el color medio igual.

**El espacio de color se decidió midiendo, y la primera medida estaba mal.** Una
prueba de 1 s en `default` (BT.601 rango completo, lo que usaron 009 y 010) y en
`bt709 + png` contra un still PNG del mismo frame. Decodificado con los ajustes
por defecto de `ffmpeg`, el BT.709 salía 2 niveles más oscuro, y llegué a
arrancar la final en `default` y a decírselo así al cliente. Repetida la medida
con `accurate_rnd`, la diferencia desapareció y el BT.709 resultó el más fiel
(41,7 frente a 40,8 dB). Se paró el render a los pocos minutos y se relanzó.
→ **[R22](../../manuales/edicion-video/reglas.md)**.

## Lo que hay que arreglar en el motor (deuda declarada)

**`PistaMetraje` ya van TRES copias (009, 010, 011).** El 010 dejó escrita la
promoción a `motor/` y no se hizo por no tocar el 009 publicado. El 011 añade lo
que faltaba saber del formato:

| sube al motor | por qué ya se sabe |
|---|---|
| `look` como parámetro, `marca` opcional | una pieza sin canal (011) no tiene de dónde sacar `marca.metraje` |
| velos opcionales | 009 = arriba, 010 = arriba + abajo, 011 = ninguno |
| `entra: "negro"` + `salidaNegro` | aperturas y cierres de acto |
| la puerta genérica (tiempo · metraje con disolvencias · tramos · archivos) | tres `revisar-0NN.mjs` casi iguales |

Hacerlo como refactor propio, re-renderizando 009 y 010 y comparando píxel a
píxel (`revisar-sonda.mjs`).

### Pagada el 2026-09-14: `remotion/src/motor/metraje/`

`corte.ts` (el formato como datos), `PistaMetraje.tsx` (el intérprete) y
`revisar-metraje.mjs` (la puerta genérica). 009, 010 y 011 importan de ahí y
conservan sus `metraje-0NN.ts`; cada uno cierra el tipo `Corte` a las entradas
que su encargo permite. Subió lo de las dos tablas; **no subieron el `whip` ni
el `flash`**, porque solo los ha usado el 009: se quedan en
`proyectos/009/entradas-009.ts` y llegan por `entradas`, que el tipo exige si
algún corte los usa.

**Píxel a píxel, y con el ruido medido primero.** 138 stills a resolución
completa de Reel009, Documental010 y Boda011 (un frame por plano más cada
disolvencia, whip, flash y fundido), comparados por sha256 contra el render de
antes. Dos tandas del MISMO código ya difieren en 4 de 138: todas son fotos o
un whip, con miles de píxeles movidos 1-13 niveles, que es la firma del ruido
de `sonda-frames.mjs`. Por eso la regla fue «cada frame nuevo tiene que ser
idéntico a ALGÚN render del código viejo», y no «igual a una tanda concreta».

**La puerta genérica encontró tres fallos PUBLICADOS** que la revisión por
frames no vio porque ningún frame revisado caía en ellos, y los tres están en
los MP4 de `finales/`:

- 009 `c04-papas`: el whip entra con zoom 1,08 y enseña hasta 47 px de negro
  por la izquierda (f222–f225).
- 009 `c08-porciones`: `pan: 4` con escala inicial 1,06 enseña hasta 19 px de
  negro por abajo (f474–f485).
- 010 `c10-nina`: la disolvencia pide clip antes del principio de `v-ninos`; el
  plano sale 0,2 s tarde y al cortar a `c11-mano` se repiten unos 9 frames.

No se arreglaron: mueven píxeles de piezas publicadas. Quedan DECLARADOS en
`revisar-009.mjs` y `revisar-010.mjs`, y la puerta falla el día que una
declaración sobre. La lección es la de R20 llevada más lejos: la puerta tiene que
usar las MISMAS cuentas que el render (aquí literalmente: carga `corte.ts` y
ejecuta la misma función del whip), o mide otro vídeo.
