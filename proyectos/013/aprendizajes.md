# 013 · Aprendizajes

## Lo que dejó como regla

**[R25](../../manuales/edicion-video/reglas.md) — el velo tiene su propia entrada.**
`entra: { como: "ninguna" }` (R23) ponía el TEXTO en el frame 0 y dejaba el
scrim subiendo su rampa de 3 f, escrita a fuego en el intérprete. La portada del
reel salía con el titular sobre el vídeo a pelo (**1,04 : 1** medido) y los dos
cortes duros aclaraban la banda 3 frames cada uno. La rampa pasa a ser un dato
del plan (`ambiente.scrim.rampa`), con el defecto de siempre.

## Lo que se midió y conviene no volver a estimar

**Los tres candidatos a acento, medidos en el mismo fondo real.** Sobre la banda
con velo de esta pieza: verde `#34D399` **7,87 - 9,41 : 1** (el elegido, petición
del cliente), naranja del canal `#FF5500` **4,61 - 5,60 : 1**, teal de plantilla
`#0F766E` **2,70 - 3,28 : 1** — este último por debajo de AA en TODA la banda y
además de otra marca. La deuda que `marca.ts` dejó anotada tiene, al menos, una
respuesta medida en un fondo real.

Y de paso queda contestado lo del naranja: sobre el papel beige del formato
editorial da 2,62 : 1 y aquí 4,61. No son dos opiniones sobre el mismo color:
son dos fondos, y el naranja es **tinta de oscuro**. Lo que esta pieza cierra es
el registro oscuro, y sólo para ella (`look-013.ts`); `luxur.ts` no se toca.

**El acento es UNO y mueve dos cosas.** `acentoOscuro` pinta a la vez el texto
de acento de los rótulos y el punto del `<SelloCampana>`. Cambiar sólo el texto
habría dejado dos acentos peleando en el mismo frame (R15).

**El molde `sello` ancla donde su propio velo todavía se está abriendo.** El
scrim de 830 px deja la fila 1340 —que es justo el ancla del bloque— a opacidad
efectiva 0,736; el naranja se queda en 3,95 : 1 en la PRIMERA línea de cada
toma y en ninguna otra. Setenta píxeles más de velo (900) lo arreglan entero sin
que se note: lo que se añade es la cola suave del degradado.

**Un clip de iPhone puede NO ser HDR.** El 011 y el 012 venían en HLG y de ahí
salió R21; éste es BT.709 limpio. La receta de normalización lleva la
comprobación y **para** si le entra un HLG, en vez de asumir cualquiera de los
dos casos.

## El audio: se trató, se midió, y el cliente prefirió el ORIGINAL

**Lo publicado lleva el audio tal cual salió de la cámara.** El tratamiento está
escrito y APAGADO por defecto en `normalizar.sh` (`--voz` lo enciende), porque
lo que vale para el próximo clip de evento es la MEDICIÓN, no el resultado.

Y la lección, que no es técnica: en cobertura de evento el ambiente **no es
ruido, es parte de lo que la pieza cuenta**. Las cifras pedían tratamiento a
gritos (-26,3 LUFS es objetivamente inaudible en un móvil) y aun así la versión
limpia sonaba a locución. La próxima vez se entregan **las dos** y elige oyendo.

## El diagnóstico, que sí vale para la próxima

Medido antes de tocar nada: **-26,3 LUFS** (inaudible en un móvil) y el ambiente
del evento a **3 dB** de su voz. No es un siseo bajo una voz, es una sala con
música casi al mismo nivel — y eso cambia qué herramienta sirve. Un `afftdn` de
manual quita ruido ESTACIONARIO; aquí no hay ninguno.

Lo que sí contestó: **medir la separación por bandas**, que es lo que dice dónde
atacar sin destrozar la voz.

| banda | separación voz/ambiente |
|---|---|
| 60-180 Hz | 1,6 dB ← nada que salvar |
| 180-500 Hz | 1,7 dB ← nada que salvar |
| 500-1500 Hz | 4,7 dB |
| **1500-4000 Hz** | **7,2 dB** ← aquí gana ella |
| 4000-8000 Hz | 6,1 dB |

La cadena sale de esa tabla, no de un preset: corte bajo 155 Hz, -4,5 dB en el
bajo-medio, +5 dB en 2,7 kHz. Resultado: **-15,3 LUFS, -1,9 dBTP, separación de
3,0 a 4,2 dB**. El volumen sube 11 dB, que aquí es la mejora grande.

**Dos cosas que se aprendieron equivocándose:**

1. **`alimiter` mide pico de MUESTRA, no true peak.** La primera versión pedía
   -1,5 dBTP y acabó en **-0,5**, porque el pico entre muestras se le escapa. El
   limitador sobra: lo hace `loudnorm`, que sí mide true peak.
2. **El AAC sube el pico ~0,2 dB al codificar** (-1,5 en el WAV → -1,3 en el
   MP4). Pedir el valor final exacto es quedarse corto justo en el sitio que se
   quería proteger: se pide **-2,0** y se aterriza en -1,8/-1,9.

Y dos de higiene, las dos invisibles en un frame:

- `loudnorm` remuestrea a 192 kHz por dentro y **deja 96 kHz a la salida** si
  nadie dice lo contrario. `-ar 48000` explícito.
- **`-shortest` no es decorativo.** El `afftdn` tiene latencia propia y dejaba el
  stream de audio 23 ms más largo que el de vídeo. Eso movía la duración de
  FORMATO de 12,767 a 12,800 s, y `framesDelMedio` —que redondea segundos × fps—
  devolvía **384 frames en vez de 383**: un frame final SIN rótulo, en una pieza
  que se reproduce en bucle. Tratar el audio de un clip puede cambiar la
  duración de la composición, y nadie avisa.

**El techo de lo local es real.** De 3,0 a 4,2 dB se nota, pero quitar el fondo
de verdad pide separación de fuentes (un aislador de voz), y eso es subir el
audio de una persona a un tercero: se pide, no se hace por defecto.

**Y un fallo del propio script, que se publicó como «funcionó».** Al hacer el
tratamiento opcional, la rama sin filtro pasaba un array vacío
(`"${FILTRO_AUDIO[@]}"`). El bash **3.2** que trae macOS aborta ahí bajo
`set -u`, y como el script es `set -euo pipefail` moría ANTES de escribir el
destino: el archivo anterior se quedaba en su sitio y todo parecía correcto —
`ffprobe` daba 383 frames y la duración buena, porque medía el archivo VIEJO. Se
cazó midiendo el LUFS, que seguía en -15,3 cuando tenía que estar en -26,3. La
lección: **después de regenerar un medio, verificar una propiedad que el
tratamiento CAMBIA**, no una que comparten las dos versiones.

## Lo que se decidió NO hacer

**Sin cámara virtual.** El plano es de mano y ya deriva solo en los 12,8 s; un
punch-in encima pelea con ese movimiento. Corolario práctico: el clip se
normaliza a **1080×1920 nativos** y no a 1296 como el 011 y el 012, porque aquel
×1,2 era el techo del punch-in y sin punch-in es ampliar por ampliar.

**Un respiro de 55 frames sin una sola palabra.** En 12,8 s con cuatro rótulos,
el aire es lo que impide que la pieza se lea como una plantilla rellenada.

**Sin `.srt`.** R14 pide dejar la pista de subtítulos como captions de
plataforma. Aquí no, y es una renuncia declarada: el audio es de evento y
whisper-small oscila entre lecturas incompatibles. De la transcripción se usan
los TIEMPOS, que sí son fiables; las PALABRAS las confirmó el cliente. Y los
rótulos no citan a nadie, que es lo que permite no depender de ella.

**Tres cues de sonido, no nueve.** El 012 era una grabación limpia en una sala
vacía y admitía nueve. Aquí el clip trae el ambiente real del evento: cada SFX
compite con una sala llena, y el cuarto ya no se distinguiría del ruido.

## El dato que sólo dio el cliente

El nombre de la presentadora. El modelo devolvió «Isabel Acara», «Isabel
Alcalá» y «soy la Kite» en tres pasadas del mismo audio. **Un nombre propio en
pantalla no se reconstruye**: es el único error de esta pieza que no tiene
arreglo después de publicar.
