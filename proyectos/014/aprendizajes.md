# 014 · Aprendizajes

## 1. Los SFX del sistema no se oían, y nadie lo había medido

Es el hallazgo de la pieza, y no es de esta pieza: es del motor. El encargo
era literalmente «efectos de sonido cuando entren», así que por primera vez se
MIDIÓ si se oían, y con la receta de la casa (`cue()`, `underDialogue`,
`duckDb −4,5`) el delta de RMS en las diecisiete ventanas de cue era **±0,5 dB**
frente al clip sin SFX. Subir 6 dB no cambió nada. Dos causas, las dos
invisibles en el plan y en el render:

1. **El golpe está fuera del cue.** `startFromTarget` supone que el momento
   reconocible cae al 65 % de la duración del CUE (whoosh) o en el primer frame
   (impact, click), y la `<Sequence>` corta el archivo a `durationInFrames`.
   Pero el banco no está recortado. Medido con `medir-sfx.py`:

   | archivo | golpe | lo que reproducía un cue de la casa |
   |---|---|---|
   | `pop.mp3` | f17 (0,57 s) | f0-f7: silencio |
   | `chime-02.mp3` | f25 | f0-f17: silencio |
   | `click-mouse-02/03.mp3` | f31 (1,03 s) | f0-f5: silencio |
   | `whoosh-light-02.wav` | f34 | f0-f11: silencio |
   | `whoosh-light.wav` | f14 | f0-f11: el arranque, sin el pico |

   O sea que **`pop` —el sonido de aterrizaje del sistema— no sonaba nunca**, y
   de cada pool la variante alterna que se elige para no repetir archivo era
   justo la que tenía el golpe a un segundo. Las piezas 001-013 llevan estos
   cues; lo que se oía en ellas eran los archivos que casualmente empiezan en
   el golpe (`whoosh-light-03`, `pop-03`, `click-mouse`, `chime`).

2. **La calibración iguala picos de MUESTRA, no lo que se oye.** Ya alineados,
   los whooshes quedaban a −29 dBFS de RMS (33 ms) y los clics a −35/−38: un
   clic tiene el pico 17 dB por encima de su RMS, un whoosh 10-16. Bajo una
   voz continua a −17,7 LUFS (RMS −17/−22, LRA 3,5, sin pausas), de 7 a 16 dB
   por debajo. Solo asomaban los dos timbres.

**Cómo se resolvió aquí, sin tocar el motor:** `cues-014.ts` guarda por archivo
el frame del golpe, el fin audible y el RMS del golpe (`PICO`), y `sfx()`
escribe `startFrame = target − pico`, `durationInFrames = fin + cola` con
fundido, y `volume` desde un objetivo de RMS por familia (`OBJETIVO_RMS`).
Verificado rindiendo la pista de SFX SOLA (`--codec=wav` sobre una comp
temporal con solo `<PistaSonido>`): los diecisiete golpes caen en su frame, y
la voz sigue por encima (pico −3,7 dBFS contra −7 del SFX más alto).

**Lo que queda por decidir, y es del motor:** medir los 39 archivos de
`public/sfx/` y guardar `pico` (y el RMS) en `SFX`/`POOL` para que
`startFromTarget` lo use. Es lo correcto y **mueve el sonido de todas las
piezas publicadas** —les pondría los pops que nunca sonaron—, así que es una
decisión que se toma oyendo, no un efecto colateral. Herramienta lista:
`python3 manuales/diseno-sonoro/medir-sfx.py`. Regla: **R26**.

**Cómo medirlo la próxima vez, en tres líneas:** renderizar solo la pista de
SFX a WAV, y comparar el RMS de 33 ms en el golpe con el RMS de 0,5 s de la
voz en la misma ventana. Comparar la MEZCLA contra la voz no sirve: un
transitorio de 3 frames no mueve el RMS de medio segundo ni aunque se oiga
perfectamente, y el desfase de 1-2 frames del AAC mete ±1 dB de ruido.

## 2. «Puesto en el frame 0» tiene una tercera mitad: la escalera

R23 (el `entra: ninguna` va en el grupo) y R25 (el velo con `rampa: 0`)
estaban aplicados y el f0 salió **sin titular**: solo el kicker. La ESCALERA
de la ley (`[0, 6, 12, 18]`) retrasa 6 frames al segundo hijo aunque no tenga
animación, y un nodo sin `en` la hereda. Un `en: 0` explícito la sustituye
(`resuelveMomentos`). Misma trampa, dos pisos más abajo: la columna interior
de las listas era el segundo hijo de su grupo y arrastraba +6 f a los tres
ítems, cuyos `en` cuentan desde su padre — medido en la tira f693-f709,
«Subtítulos» arrancaba en f699. Regla: **R27**.

## 3. En un relevo, el primer frame tiene que tener texto NÍTIDO

El grupo a corte (`escalon`) no basta: cada hijo sigue entrando con su muelle
(rampa 8), así que el frame del relevo salía con el kicker al ~10 % y sin
titular, y el f1200 —el giro, que no tiene kicker— con el velo puesto y NADA
escrito encima. Se resuelve con el kicker (o el titular, si va solo) también a
corte, y el resto con muelle: en el frame del corte ya hay texto, y el
movimiento que el whoosh acompaña llega 6 f después. Va en R27.

## 4. R09 mide la palabra más larga de un kicker, y R18 se cumple mirando

«subes el vídeo y automáticamente» salió limpio en el plan y tocaba los dos
márgenes en el frame (811 de 844 px). Se acortó a «automáticamente», que es la
palabra que importa, y no se bajó el cuerpo (R18). Y al revés: cuatro `lista`
de un ítem se centraban cada una por su cuenta y las ✓ salían en tres columnas;
una `col` interior con `alinea: "inicio"` las alinea como una lista.

## 5. El velo aguanta la americana blanca sin aclarar nada

El fondo de la banda era el más claro de las tres piezas de avatar (luma
108-121 sin velo). Con el scrim del 013 (`alto: 900`, opacidad 1, `rampa: 0`)
la banda queda en luma 11-39 y el verde en **7,8 : 1** en el peor frame,
medido fila a fila con `medir-velo.py` (nuevo, en `manuales/motion-graphics/
scripts/`). No hubo que tocar ni el color ni el molde.

## 6. Tres herramientas que quedan

- `manuales/diseno-sonoro/medir-sfx.py` — dónde está el golpe de cada archivo
  del banco (frame, ventana audible, RMS). Sin dependencias.
- `manuales/motion-graphics/scripts/medir-velo.py` — luma mediana por fila de
  la banda y contraste por tinta, sobre un still (R13, R25).
- `manuales/edicion-video/scripts/exportar-srt.mjs` — de `subtitulos-NNN.ts`
  a `.srt` para captions de plataforma (R14). El 012 lo hizo a mano.

## 7. El dato que solo puede dar el cliente

El apellido compuesto: whisper-small oye «Eseban» en tres pasadas y en
pantalla va «Stevans», que sale de la identidad del propio cliente. **Un nombre
propio en pantalla no se reconstruye** (013): queda marcado para confirmar
antes de publicar. Y «y tener que llegar» → «sin tener que»: corrección de lo
que él dice, declarada en `subtitulos-014.ts`.

## Entregables

| archivo | qué es |
|---|---|
| `finales/014-agente-ia.mp4` | **master** · crf 16, BT.709 en las dos capas |
| `finales/014-agente-ia-compartir.mp4` | para subir · crf 20 |
| `finales/014-agente-ia.srt` | captions para la plataforma (32 cues) |
| `pruebas-720p/prueba.mp4` · `hoja-contactos.png` · `tira-bandas.png` | la prueba y su revisión |

## 8. Segunda pasada: él reescribe también el CIERRE

Pidió cambiar la última línea: «Lo más importante de la vida» → «Lo más
importante / LA VIDA». En el 012 reescribió el hook; aquí, el remate, y en la
misma dirección: una frase corta y rotunda antes que la frase dicha completa.
Queda en la memoria de preferencias: proponer los dos extremos de la pieza
(hook y remate) y dejar que él los reescriba.

Y una verificación barata que conviene repetir en cualquier retoque de texto:
comparar el máster nuevo con el anterior fotograma a fotograma DECODIFICADO
(`-f framemd5` sin `-c copy`, R22). Aquí dio f0–f1362 idénticos, f1363–f1372 a
65,7 dB de PSNR (la compresión anticipa el cambio; invisible) y el resto, el
texto nuevo. Es la prueba de que el retoque no tocó nada más, sin revisar 49 s
a ojo.

## 9. Tercera pasada: el banco mintió en la MEDIDA del archivo, dos veces

Pexels declaró **1080×2048** para dos vídeos (de autores distintos) cuya URL
`…-hd_1080_2048_25fps.mp4` sirve un archivo de **720×1366**. No es un error de
la ficha: es el CDN sirviendo otra rendition bajo ese nombre. `filtra()` se fía
de la API, así que el plano pasaba el filtro de medida y habría salido estirado
×1,5 a sangre, sin un solo error. Solo lo cazaba `revisar-broll.mjs`, y solo en
el formato de noticias.

**Arreglado en `bancos.py`** (`medida_real` + `alternativas`): al traer un
vídeo, se MIDE el archivo con ffprobe; si no llega al hueco, se prueba la
rendition siguiente del mismo vídeo (el plano elegido mirando la hoja no
cambia), y el manifiesto guarda la URL que de verdad sirve y la medida de
verdad. Probado: el mismo plano bajó a 1440×2732. Va a R16.

## 10. Los clips de «alguien mirando una pantalla» suelen ser publicidad del propio banco

Tres de los mejores candidatos para «imágenes» y «redes sociales» eran
producciones para Pexels con Pexels DENTRO: su web en el navegador, su app en el
móvil, `@www.pexels.com` en una interfaz tipo reel… y en uno, el título de una
canción de Ed Sheeran. Nada de eso se ve en la miniatura de la hoja; todo se
lee a resolución completa. R17 una vez más: la pantalla dentro del plano se
juzga en el frame, recortada y a tamaño real.

## 11. En una pieza con banda de texto, el b-roll se elige también por DÓNDE cae su sujeto

Dos planos perfectos de contenido (la chica editando, la familia en la playa)
se descartaron porque su sujeto caía en el 62-85 % del alto: detrás de la banda.
Subirlos pedía zoom de 1,5, o sea ampliar un 1080 hasta ver el píxel. Se
mide la posición del sujeto en el fotograma del tramo ANTES de montar, y se
busca otro plano si `pan` pide más de ~1,2 de zoom. Va a R28.

## 12. El grado de un inserto se mide contra el ORADOR, no contra el b-roll

`gradar` iguala los clips entre sí (mediana luma 86), que es lo correcto cuando
todo es banco. Con un avatar, cada inserto corta desde y hacia su clip (122),
así que la referencia es él; cada inserto se acerca la mitad, con los topes de
`gradar`, para no lavar los planos oscuros por narrativa (noche, atardecer).
Va a R28.

## 13. Un inserto no es una línea de tiempo

La puerta del formato exige que los cortes cubran la pieza sin huecos
(`lineaDeTiempo`); aquí los huecos SON él. La puerta del 014 usa las demás
comprobaciones del formato y cambia esa por la suya: orden, hook limpio, cortes
en anclas, velo debajo. Y el cambio que otra sesión hizo al motor mientras tanto
(`PistaMetraje` sin cola en las disolvencias) no toca a esta pieza: todos sus
cortes son secos. Se volvió a pasar la puerta y el typecheck contra el motor
nuevo.
