# 010 · «Gracias, Chocó» — plan

Mini documental humanitario vertical con la **voz en off como columna vertebral**.
Cierra el arco que abrieron el 008 (`Ayudemos a Chocó`, recogida) y su pieza de
avatar: aquí ya no se pide, se **rinde cuentas** y se pide **no olvidar**.

**Cabecera.** `9:16 · 1080×1920 · 30 fps · 2234 f (74,47 s) · estilo CINEMATOGRÁFICO`
· marca `CHOCO` (`src/marcas/choco.ts`) con `metraje` propio (ver §grado).

La voz dura **72,46 s** (2174 f). La comp añade **60 f** para que el rótulo de
cierre respire los ~2 s que pide el encargo. Es el único punto en que la pieza
se separa del audio, y es hacia adelante.

---

## §material — lo que hay, medido antes de planificar (R01)

Todo el metraje es **real y propio**. No se ha traído **nada** de banco y no se
ha generado **nada** con IA, y no por coste: con 105 s de vídeo y 8 fotos para
una pieza de 74 s, el material real **sobra**. Traer un río de stock para
ilustrar *nuestro* río sería exactamente lo que §3h del director prohíbe —
fabricar prueba documental de algo que la pieza afirma que pasó.

| archivo | origen | display | dur | uso |
|---|---|---|---|---|
| `v-lancha.mp4` | `montando-donaciones-lancha` | 576×1024 → 1296×2304 | 32,6 s | carga, orilla, camión, descarga |
| `v-camion.mp4` | `juan-papitas-manejando-el-camion` | 576×1024 | 14,5 s | el trayecto, manos al volante |
| `v-mercados.mp4` | `repartiendo-mercados` | 576×1024 | 14,0 s | la fila, la entrega, la espera |
| `v-ninos.mp4` | `ninos-con-regalos` | 576×768 | **5,3 s** | el pico emocional |
| `v-gracias.mp4` | `Solo-dejar-el-gracias-al-final` | 464×832 | 39,3 s | **solo 28,5–39,2 s**: el pueblo saludando |
| `f-bote` | `bote.JPG` | 900×1600 | — | apertura y cierre (el mismo plano) |
| `f-casa1/2/3` | `casa-bajos-recursos*` | 1600² | — | la reconstrucción |
| `f-apie` | `comunidades-a-pie` | 1600² | — | subir del río con las ayudas |
| `f-entrega1/2/3` | `entrega-mercados*` | 1600² | — | la entrega en la comunidad |

**LOS CINCO VÍDEOS SON VERTICALES Y `ffprobe` DICE LO CONTRARIO.** Cuatro de
ellos declaran `1024×576` (o `768×576`) con `rotation=-90` en la matriz de
display: son **576×1024 en pantalla**. Planificar sobre el `width`/`height`
crudos habría llevado a recortar 16:9 → 9:16, o sea a tirar dos tercios de la
imagen y subir ×3,3 lo que quedaba. Es el fallo más caro que tenía esta pieza
y no se ve en ningún frame: se ve en `ffprobe -show_entries stream_side_data`.

**La rotación se quema en la normalización, no se confía a Remotion.** Cada
clip pasa por `ffmpeg` a `1296` de ancho (lanczos + `unsharp` suave), **30 fps**
y **sin audio**, y sale ya derecho. Tres cosas se arreglan de una vez: la
orientación deja de depender de si el decodificador honra la matriz, los tres
fps distintos se hacen uno, y el audio de cámara —que en `v-gracias` es alguien
hablando— no puede colarse en la mezcla.

**Por qué 1296 y no 1080.** El punch-in de la capa de montaje llega a 1,20; a
1296 (1080 × 1,2) un plano ampliado al máximo todavía muestrea ≥1080 px reales
y el navegador **reduce** en vez de ampliar. Normalizar a 1080 obligaría a un
segundo remuestreo hacia arriba en cada corte con zoom.

**El techo real de nitidez es 576 px de fuente.** Subir a 1080 es ×1,875 y eso
no lo arregla ningún escalador. Se asume y se compensa donde se puede: grano de
marca (que enmascara el remuestreo), punch-in corto (≤1,20) y **las fotos —el
material más nítido que hay— colocadas en los momentos que se sostienen**
(apertura, reconstrucción, cierre). Si aparecieran los originales sin comprimir,
se rehace la normalización y **no hay que tocar una línea del plan**.

---

## §narrativa — ocho beats, y los marca la voz

No es un resumen de actividades: es «prometimos → nos unimos → viajamos →
llegamos → entregamos → vimos esperanza → agradecemos → **todavía continúa**».
Los cortes de beat **caen en los tiempos reales de la transcripción**
(`vo/transcripcion-palabras.json`), no en la retícula redonda del encargo.

| beat | s | frames | qué manda | ritmo |
|---|---|---|---|---|
| HOOK | 0,00–5,86 | 0–176 | el río | rápido (~2 s) |
| LA AYUDA LLEGÓ | 5,86–14,88 | 176–446 | la carga | medio (~2,2 s) |
| EL VIAJE | 14,88–19,99 | 446–600 | el trayecto | medio (~2,6 s) |
| **LOS NIÑOS** | 19,99–27,84 | 600–835 | los juguetes | **lento + slow-mo** |
| GRACIAS | 27,84–43,22 | 835–1297 | la gente | dinámico (~2,1 s) |
| NO TERMINA | 43,22–53,54 | 1297–1606 | las casas | lento (~2,6 s) |
| PUEBLO UNIDO | 53,54–64,30 | 1606–1929 | el saludo | medio (~2,7 s) |
| CIERRE | 64,30–74,47 | 1929–2234 | el río otra vez | muy lento |

**El círculo se cierra a propósito.** `f-bote` —el plano desde dentro de la
chalupa, con las cajas y el río marrón— abre la pieza y la cierra. Es el único
plano que se repite entero, y es lo que convierte «esto se acabó» en «esto
sigue»: se vuelve al mismo sitio con otra frase encima.

**Los 5,3 s de `v-ninos` tienen que durar 7,8 s.** El beat de los niños es el
pico y el material es el más corto del lote. La velocidad no se elige: se
despeja. 5,217 s útiles / 7,833 s de hueco = **0,666** (×1,5), la misma para los
tres cortes. Es el único slow-mo de la pieza y consume el clip entero, sin
sobrar un fotograma.

Se escribió primero «a oído» (0,80 / 0,70 / 0,68, más lento en el plano de la
mano) y la puerta `revisar-010.mjs` lo tumbó: sumadas pedían 5,75 s de un clip
de 5,27 s. Remotion no falla ante eso — **congela el último fotograma medio
segundo**, y esa es exactamente la clase de fallo que no aparece revisando
frames sueltos. Una velocidad única además se ve mejor: tres distintas en 7,8 s
se leen como tres efectos; una sola se lee como que aquí el mundo va más
despacio.

**`v-gracias` entra solo por la cola, y el nombre del archivo ya lo decía.**
Los primeros 28 s son alguien hablando a cámara; sobre otra locución eso es
desincronía labial. De 28,5 a 39,2 s no habla nadie: saluda **el pueblo**, que
es literalmente el plano que pide «podemos ser un pueblo unido».

---

## §grado — medido con `signalstats`, no a ojo

Objetivo ~118 de luma. No se fuerza la igualdad completa (el interior del
camión es un interior y debe seguir siéndolo).

```
v-lancha  @2  120,2 / sat 11,9    @13 113,3 / 11,6   @20 100,5 / 16,8   @25 98,0 / 15,0
v-camion  @0,5 111,0 / 9,6        @10 134,2 / 6,1
v-mercados @1 130,6 / 12,8        @11 148,0 / 11,6
v-ninos   @1  123,3 / 11,4        @4  134,2 / 10,8
v-gracias @29 125,8 / 11,1        @35 105,1 / 17,6
fotos: bote 151,9 · casa1 121,8 · casa2 125,5 · casa3 123,9 · apie 121,5
       entrega1 107,8 · entrega2 111,3 · entrega3 95,6
```

`v-lancha` recorre 120 → 98 en un solo plano de 32 s, así que se gradúa **por
tramo** (río / orilla / camión) y no por archivo. La regla del 009 —«un plano
que vuelve, vuelve con su misma corrección»— se respeta donde importa: cada
tramo tiene UNA corrección y la conserva en todas sus apariciones.

**El look de marca de esta pieza no es el del 008.** `CHOCO.metraje` está
calibrado para el registro editorial de noticias (`saturacion 0,80`, velo ámbar
`0,05`, grano `0,065`). Aquí todo el metraje es de personas reales y el encargo
pide «piel realista» y «verdes profundos»: desaturar al 80 % y virar a ámbar
convierte a una comunidad afrocolombiana en un sepia de archivo. La comp pasa
un `metraje` propio —`{saturacion 0,92, contraste 1,05, calido 0,03, grano
0,05, vineta 0,22}`— **sin tocar `choco.ts`**, que el 008 sigue usando.

El viraje frío→cálido del encargo va **por corte**: `+0,05` de cálido en los
niños y en el pueblo unido (esperanza), `−0,02` en la reconstrucción (donde el
encargo pide evitar imágenes felices).

---

## §texto — tres decisiones y una regla

Subtítulos **bilingües**: español grande y blanco; inglés justo debajo al **68 %**
del tamaño. El bloque se ancla por **abajo** (`bottom: 300 px`), no por arriba:
así una frase de dos líneas y una de una línea comparten línea de base y el
bloque no salta entre cortes.

**El texto destacado NO se duplica con el subtítulo.** En los dos momentos en
que el encargo pide un rótulo grande —el gancho y el cierre— el rótulo **es** el
texto de esa frase, y el subtítulo corrido se **apaga**. Poner las mismas
palabras dos veces en pantalla no es énfasis, es ruido.

- **0,00–5,86** rótulo de gancho, **centrado y desde el fotograma 0** · `LLEGAMOS DONDE SOLO SE PODÍA LLEGAR POR RÍO` / `WE REACHED COMMUNITIES ONLY ACCESSIBLE BY RIVER`
- **35,05–38,49** franja alta, discreto · `ESTO LO HICIMOS ENTRE TODOS ❤️` / `WE DID THIS TOGETHER`
- **64,30–74,47** rótulo de cierre · `QUE LA AYUDA NO TERMINE CUANDO TERMINA LA NOTICIA` / `LET THE HELP CONTINUE EVEN AFTER THE HEADLINES FADE`, y a 70,22 s releva `Sigamos siendo ese granito de arena ❤️` / `Let's keep doing our part`

La traducción es **de sentido, no palabra por palabra**: «granito de arena» no
es *grain of sand* en inglés natural, es *doing our part*.

**El sello.** `SelloCampana` de `proyectos/008/Avatar008.tsx`, el mismo
componente y no una copia: es la misma campaña. Va en `top: 84`, fuera de toda
la zona de texto.

---

## §pendiente — lo que no puedo verificar yo

1. **Los nombres propios del bloque de agradecimientos.** Whisper oye
   «monpapitas, miloji», y en un vídeo público de agradecimiento un patrocinador
   mal escrito es un error visible. Escritos con mi mejor lectura y marcados en
   `subtitulos-010.ts` con `// ⚠ NOMBRE`.
2. **La música.** La clave de ElevenLabs sigue devolviendo
   `401 missing_permissions: music_generation` (comprobado hoy). La envolvente
   está programada y espera un booleano — mismo patrón que el 008.
