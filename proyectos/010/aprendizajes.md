# 010 · Aprendizajes

## Lo que se llevó a `reglas.md`

- **[R19](../../manuales/edicion-video/reglas.md)** — `width`/`height` de `ffprobe`
  mienten si hay matriz de rotación. Los cuatro clips del encargo declaraban
  `1024×576` y eran `576×1024`. Es el hallazgo más caro de esta pieza y no se ve
  en ningún frame.
- **[R20](../../manuales/edicion-video/reglas.md)** — lo que un corte pide de un
  clip se calcula y se verifica con una puerta; nunca se ajusta a oído.

## Lo que funcionó y conviene repetir

**Normalizar el metraje ANTES de montar, y a 1,2× la resolución de la comp.**
Un paso de `ffmpeg` por clip (rotación quemada · fps único · sin audio · lanczos
a 1296 px) cerró de golpe cuatro problemas que en piezas anteriores se
arrastraban al JSX. El 1,2× no es coquetería: es el techo de punch-in, y hace
que un plano ampliado al máximo siga muestreando ≥1080 px reales en vez de
obligar al navegador a ampliar por segunda vez.

**Las fotos no son el relleno cuando el vídeo viene comprimido.** Aquí las 8
fotos (1600²) eran material MÁS nítido que los 5 vídeos (576 px de ancho). Eso
invierte el reparto habitual: las fotos se colocaron en los momentos que hay que
sostener —apertura, reconstrucción, cierre— y el vídeo en los de movimiento,
donde la falta de detalle no se mira. Conviene medir esto siempre antes de
asumir que el vídeo manda.

**Repetir un plano a propósito, y solo uno.** `f-bote` abre y cierra la pieza.
Es lo único que convierte «esto se acabó» en «esto sigue» sin decirlo con texto.
Funciona porque es la ÚNICA repetición: si hubiera tres, no se leería como
vuelta sino como falta de material.

**Apagar el subtítulo donde hay rótulo.** El encargo pedía subtítulos corridos y
además rótulos grandes con las mismas frases (gancho y cierre). Escribir las
mismas palabras dos veces en la misma pantalla no es énfasis. Los dos tramos con
rótulo van sin subtítulo, y como los dos comparten ancla con él, el relevo no se
nota.

**Anclar todo el texto por ABAJO.** Con 26 subtítulos de longitud variable, el
anclaje superior —lo que sale solo si no se piensa— produce un temblor constante
durante todo el vídeo. Anclado por abajo, una línea y dos líneas terminan en el
mismo píxel.

**Revisar el montaje con una HOJA DE CONTACTOS del render, no con frames sueltos.**
`ffmpeg -i final.mp4 -vf "fps=1/2.5,scale=196:-1,tile=6x5"` mete los 74 s en una
imagen. Los stills sueltos de [R05](../../manuales/edicion-video/reglas.md)
dicen si un frame está bien; la hoja dice si el VÍDEO está bien — el ritmo, la
variedad, si dos planos seguidos se parecen demasiado, y cuál es el más flojo de
los treinta. Aquí señaló `c18` (un detalle de la consola del camión, oscuro y
sin punto de lectura) que había pasado todas las demás revisiones. Se cambió por
otro tramo del mismo clip y el plano dejó de ser el peor de la pieza.

## Lo que SÍ subió al motor

**`SelloCampana` → `motor/SelloCampana.tsx`, parametrizado por marca.** El 010
empezó importándolo de `proyectos/008/Avatar008.tsx` y el **linter lo tumbó**
(`no-restricted-imports`: «un proyecto no importa de otro proyecto; lo que
compartan dos vídeos pertenece a `src/motor/`»). Esa regla hizo exactamente su
trabajo: obligó a la conversación en vez de dejar que el 010 dependiera del 008
para siempre.

En el 008 queda un envoltorio de una línea
(`export const SelloCampana = () => <SelloDeCampana marca={CHOCO} />`) para que
`Gracias008` siga importando de donde importaba. **Se verificó que el 008 no se
movió**: el sha256 de un still de `Gracias008` en el frame 300 es idéntico antes
y después del refactor. Es la comprobación barata que convierte «creo que no
cambia nada» en «no cambia nada».

## Lo que hay que arreglar en el motor (deuda declarada)

**`PistaMetraje` ya ha servido para DOS piezas: toca subirlo a `motor/`.** Es la
regla de la casa y la cabecera del `PistaMetraje` del 009 la enuncia («cuando
haya un segundo reel de b-roll, sube — y entonces se sabrá qué partes eran del
formato y cuáles de este vídeo»). Ahora se sabe:

| es del FORMATO (sube) | era del 009 (se queda) | es del 010 (sube también) |
|---|---|---|
| `Corte[]` → `<Sequence>` | `entra: "whip" \| "flash"` | `tipo: "video" \| "foto"` |
| punch-in `zoom` + `pan` | los grados de comida | `velocidad` (playbackRate) |
| `grado` por clip + look de marca | | `entra: "disolver"` con solape |
| grano · viñeta · velo cálido | | velos superior **e inferior** |

No se hizo en esta pieza a propósito: promover el componente obliga a tocar el
009, que está publicado, y el encargo era un vídeo. Queda anotado para hacerse
como refactor propio, con el 009 re-renderizado y comparado píxel a píxel
(`revisar-sonda.mjs`).

**Hecho el 2026-09-14** (detalle al final de `proyectos/011/aprendizajes.md`).
Al subir, la puerta genérica midió lo que la de esta pieza no contaba —el
prerrollo de las disolvencias— y encontró un fallo publicado AQUÍ: `c10-nina`
disuelve desde el 0,05 s de `v-ninos`, la disolvencia pide 0,27 s de clip antes
de ese punto, el intérprete recorta el arranque a 0 y, al cortar a `c11-mano`,
se ven dos veces unos 9 frames. Está en el MP4 entregado. Queda declarado en
`revisar-010.mjs` y sin arreglar, porque arreglarlo mueve píxeles.

**Los subtítulos bilingües tampoco tienen sitio en el motor.** `SubtitulosSync`
es monolingüe. Si vuelve a hacer falta un vídeo a dos idiomas, `Bilingue.tsx`
del 010 es el punto de partida y sube con él.

## La música: resuelta por el cliente, con una reserva

`music_generation` sigue bloqueado en la key de ElevenLabs, así que la cama la
puso el cliente (un tramo de una pista instrumental suya). Salió a la primera
porque **la envolvente estaba escrita desde el principio**: enchufar el MP3 fue
cambiar un booleano, no mezclar nada.

Dos cosas que conviene repetir en la próxima pieza con música:

1. **Normalizar el stem a un valor FIJO (aquí −15 LUFS)** antes de tocar la
   envolvente. Así `0,18` deja de ser «un número que sonaba bien» y pasa a
   significar «16 LU bajo la voz», que es comprobable y sobrevive a un cambio de
   pista.
2. **Buscar el punto de entrada midiendo, no en el minuto redondo.** El cliente
   dijo 20:30; midiendo segundo a segundo alrededor, el respiro entre frases
   está en 20:29 (−23,8 dB contra −17,5). Un segundo de diferencia entre entrar
   en un silencio y entrar a mitad de compás.

**La reserva es de derechos, no técnica**: la pista no tiene licencia conocida y
las tres plataformas identifican música por huella acústica. Está documentado en
`musica/README.md` con la salida (sustituir el MP3 por otro de la misma duración
y re-renderizar; la envolvente no se toca).

## Los nombres: cerrados por el cliente

**Los nombres propios del bloque de agradecimientos** (30,6–40,8 s) eran lo
único de la pieza que yo no podía verificar. Whisper oía «monpapitas» y
«miloji»; el cliente confirmó **Juan Papitas · Milo G · Street Cats**. Mi
lectura de «Milo G» era «Mi Loji» — es decir, la única marcada como *sin
respaldo* era efectivamente la única equivocada.

Lo que funcionó fue **marcarla como tal en el propio código** (`⚠ NOMBRE` en
`subtitulos-010.ts`) en vez de escribirla con la misma confianza que las otras
dos. En un vídeo de agradecimiento un patrocinador mal escrito es el peor error
posible, y la diferencia entre que se corrija y que se publique es que la duda
esté señalada donde alguien la vea.
