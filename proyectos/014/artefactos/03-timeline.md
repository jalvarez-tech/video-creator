# 014 · Timeline — 1471 frames a 30 fps

## La retícula: la VOZ, medida por palabra

`whisper.cpp -ojf` sobre el audio del clip (limpio, −17,7 LUFS): `f = s × 30`.
Las palabras son fiables salvo el apellido compuesto (01-plan.md).

```
 f0                                                                          f1471
 │                                                                              │
 ├─ g01 hook ─┤                                                                  
 0          159                                                                  
             ├─ g02 problema ────────┤                                           
             159                   455                                           
                                   ├─ g03 ──┤                                    
                                   455    560                                    
                                          ╎ respiro ╎                            
                                          560     658                            
                                                  ├─ g04 hace ──────┤            
                                                  658             958            
                                                                  ├─ g05 sin ──┤ 
                                                                  958        1200
                                                                             ├ g06 ┤
                                                                             1200 1318
                                                                                  ├ g07 ┤
                                                                                  1318 1471
 voz  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 f0                                                                          f1470
```

## Mapa maestro

| frame | palabra | gráfico | sonido |
|---|---|---|---|
| **0** | «Hola» | el hook ya está PUESTO (R23, con `en: 0` en el titular) — velo incluido (R25) | — |
| 38–83 | «John Stevans Álvarez» | (el nombre ya está en el kicker) | — |
| **159** | «cuello» | RELEVO a corte: kicker «quiero ayudarte con»; titular «El cuello de botella / de crear contenido» con muelle (+6) | `s-problema` whoosh light |
| 348 | «sea más fácil» (356) | aterriza el chip «QUE SEA MÁS FÁCIL» | `s-mas-facil` pop |
| **455** | «creado» → «agente» (464) | RELEVO: kicker «por eso he creado»; titular «Un agente de / inteligencia artificial» (verde) | `s-agente` swoosh · `s-agente-ok` chime (461) |
| 545 | fin de «artificial» | | |
| **560** | — | sale el rótulo; empieza el RESPIRO (98 f): «tus vídeos como estos», señalando la cámara | — (el texto SALE: silencio) |
| **658** | «automáticamente» (662) | NACE `g04`: velo con rampa (3 f) + kicker «automáticamente» con muelle | `s-hace` whoosh light |
| 693 | «subtítulos» (701) | ✓ Subtítulos | `s-subtitulos` pop |
| 736 | «imágenes» (744) | ✓ Imágenes de bancos gratuitos | `s-imagenes` pop |
| 822 | «publicarlos» (830) | ✓ Publicado en redes en minutos | `s-publicado` pop |
| **958** | «después» | RELEVO a corte: kicker «tras un largo día de grabación» | `s-sin` whoosh light |
| 1016 | «editar» (1024) | ✗ Editar | `s-no-editar` click |
| 1051 | «mirar si la voz» (1057) | ✗ Revisar si la voz quedó bien | `s-no-voz` click |
| 1108 | «mirar si las imágenes» (1114) | ✗ Buscar de dónde sacar imágenes | `s-no-imagenes` click |
| **1200** | «Esto» | RELEVO a corte: «Lo hace **todo** por ti» (titular a corte: no hay kicker que sostenga la banda) | `s-todo` swoosh · `s-todo-ok` chime (1206) |
| 1270 | «ganar» (1278) | aterriza «y ganas mucho tiempo» | `s-tiempo` pop |
| **1318** | «para» | RELEVO a corte: kicker «para que empieces a disfrutar» | `s-remate` whoosh light |
| 1373 | «lo más» (1377) → «importante» (1391) | aterriza «Lo más **importante** / LA VIDA» | `s-remate-titular` whoosh light |
| 1470 | «vida» | el remate se queda hasta el último frame; el reel vuelve al f0, donde el hook ya está entero | — |

Cada texto entra **sobre su palabra o 8 frames antes** (lo que tarda el muelle
en verse): quien lee va por delante de quien escucha.

## Las entradas, y por qué cada una es la que es

| toma | grupo | kicker / 1.er hijo | velo | por qué |
|---|---|---|---|---|
| `g01` | `ninguna` | `ninguna` + `en: 0` | `rampa: 0` | el f0 es la MINIATURA: texto y velo puestos desde el primer frame. El `en: 0` anula la escalera de la ley, que retrasaba el titular 6 f (medido: f0 y f1 salían sólo con el kicker) |
| `g02` `g03` `g05` `g07` | `escalon` | kicker `escalon`; titular con muelle (+6) | `rampa: 0` | RELEVO: el velo ya está puesto y en el frame del corte hay texto nítido (el kicker); el titular llega con el movimiento que el whoosh acompaña |
| `g04` | la ley (muelle, rampa 8) | muelle | rampa 3 (defecto) | NACE tras 98 f de banda limpia: aquí el velo sí tiene que subir, o es un parpadeo negro |
| `g06` | `escalon` | titular `escalon` | `rampa: 0` | RELEVO sin kicker: el titular va a corte, o el f1200 sale con el velo puesto y nada escrito (medido en el primer render) |

Es la misma decisión en todos: **el velo entra cuando NACE, no cuando sólo se
releva el texto** (R25), y **en el frame de un relevo siempre hay texto nítido**.

## Sonido: diecisiete cues, uno por entrada de texto

| frame | cue | archivo | por qué |
|---|---|---|---|
| 159 | `s-problema` | whoosh-light | relevo al problema |
| 348 | `s-mas-facil` | pop | aterriza el chip |
| 455 | `s-agente` | swoosh | relevo a la solución: más cuerpo, es la revelación |
| 461 | `s-agente-ok` | chime-02 | el titular verde aterriza: timbre positivo |
| 658 | `s-hace` | whoosh-light-02 | vuelve el texto tras el respiro |
| 693 · 736 · 822 | `s-subtitulos` · `s-imagenes` · `s-publicado` | pop-03 · pop · pop-03 | un pop por ✓, sobre su palabra |
| 958 | `s-sin` | whoosh-light-03 | relevo a lo que dejas de hacer |
| 1016 · 1051 · 1108 | `s-no-editar` · `s-no-voz` · `s-no-imagenes` | click-mouse · -02 · -03 | un clic por ✗: tachar una tarea |
| 1200 | `s-todo` | swoosh-02 | relevo al giro |
| 1206 | `s-todo-ok` | chime | el mismo timbre positivo que la solución: es su cumplimiento |
| 1270 | `s-tiempo` | pop | aterriza la segunda línea |
| 1318 | `s-remate` | whoosh-light | relevo al remate |
| 1373 | `s-remate-titular` | whoosh-light-02 | aterriza el titular del remate, IGUAL que las demás tarjetas |

**Ni en el f0 ni en el f560.** En el f0 no entra nada (ya está puesto): un
whoosh sobre algo que no se mueve es decoración. En el f560 el texto SALE, y el
silencio es lo que hace que el respiro se lea como aire y no como un fallo.

### Lo que hubo que medir para que se oyeran (y no estaba escrito)

La primera prueba 720p, con los cues escritos a la manera de la casa
(`cue()` + `underDialogue` + `duckDb −4,5`), dio un **delta de RMS de ±0,5 dB**
en las diecisiete ventanas frente al clip sin SFX: no se oía ninguno. Se
subieron 6 dB: **igual**. Se rindió la pista de SFX SOLA (una comp temporal
con solo `<PistaSonido>`, a `--codec=wav`) y se midió con `medir-sfx.py`:

1. **El golpe no estaba dentro del cue.** `cue()` supone que el momento
   reconocible cae al 65 % del cue (whoosh) o en su primer frame (pop, clic), y
   la `<Sequence>` corta el archivo a `durationInFrames`. Pero `pop.mp3` tiene
   el golpe en **f17**, `chime-02.mp3` en **f25**, `click-mouse-02/03.mp3` en
   **f31** y `whoosh-light-02.wav` en **f34**: un pop de 8 frames reproducía
   silencio y se cortaba antes del golpe. → `cues-014.ts` guarda el frame del
   golpe de cada archivo (`PICO`) y escribe `startFrame = target − pico`,
   `durationInFrames = fin audible + 6`, con fundido de salida.
2. **El nivel de fábrica iguala picos de MUESTRA, no lo que se oye.** Ya
   alineados, los whooshes quedaban a −29 dBFS de RMS y los clics a −35/−38
   bajo una voz a −17/−22: de 7 a 16 dB por debajo. → el volumen de cada cue
   sale del RMS medido de su archivo y de un objetivo por familia
   (`OBJETIVO_RMS`: whoosh e impact −24, clic −27), sin `underDialogue` y con
   `duckDb={0}`. `pop-02.mp3` queda fuera del pool: ni a volumen 1 llega.

**Medido en la pista de SFX sola, contra la voz** (RMS de 33 ms en el golpe;
voz = RMS de 0,5 s alrededor del cue):

| cue | golpe cae en | SFX RMS | pico muestra | voz RMS | margen |
|---|---|---|---|---|---|
| s-problema | f159 ✓ | −24,0 | −16,4 | −18,5 | −5,6 |
| s-mas-facil | f348 ✓ | −24,0 | −16,2 | −24,5 | +0,5 |
| s-agente + s-agente-ok | f455/461 ✓ | −23,6 | −16,2 | −17/−18 | −6 |
| s-hace | f658 ✓ | −23,8 | −14,3 | −22,3 | −1,6 |
| s-subtitulos · s-imagenes · s-publicado | f693 · 736 · 822 ✓ | −24,5 · −24,0 · −24,5 | −12 a −16 | −24/−25 | ±0,9 |
| s-sin | f958 ✓ | −24,3 | −19,5 | −23,0 | −1,2 |
| s-no-editar · -voz · -imagenes | f1016 · 1051 · 1108 ✓ | −27,0 | −7 a −10 | −19/−22 | −5 a −8 |
| s-todo + s-todo-ok | f1200/1206 ✓ | −23,9 | −15,1 | −26/−28 | +2 a +4 |
| s-tiempo | f1270 ✓ | −24,0 | −16,2 | −24,7 | +0,6 |
| s-remate · s-remate-titular | f1318 · 1373 ✓ | −24,0 · −23,6 | −16,4 · −14,3 | −18/−22 | −6 · −2 |

Los diecisiete golpes caen en su frame. **La voz sigue mandando**: pica en
−3,7 dBFS y el SFX más alto en −7; su RMS va de 2 a 8 dB por encima de los
golpes en las frases fuertes y a la par en las pausas. Cero energía de SFX
fuera de las ventanas de cue. Mezcla final: −17,7 LUFS, −0,5 dBTP (igual que
la voz sola: los SFX no mueven el loudness). Si en el móvil suenan fuertes,
se baja `OBJETIVO_RMS`; si flojos, se sube. Es un número.

## Puertas de control

- [x] `revisar-plan.mjs` limpio (7 tomas · 1471 f)
- [x] `tsc` + `eslint` del proyecto en verde
- [x] Frames clave revisados (R05): f0 · f1 · relevos (159, 455, 958, 1200, 1318) · ítems · respiro · f1470 — dos tandas (`remotion/out/sonda/014-v1`, `014-v2`)
- [x] Velo medido fila a fila (R13 · R25): peor caso verde 7,8 : 1, blanco 14,9 : 1
- [x] Prueba 720p (R06): voz continua de f0 a f1470 sin un hueco (R10); SFX medidos en pista aparte (arriba); hoja de contactos del render revisada
- [ ] Final BT.709 (R22) + versión para compartir + `.srt`

## Segunda pasada — petición del cliente

- **La última línea: «de la vida» → «LA VIDA».** El remate queda «Lo más
  **importante** / LA VIDA». Sin la preposición, la segunda línea deja de ser
  el final de la frase hablada y pasa a ser la respuesta. Las mayúsculas van
  escritas tal cual (`titular` no transforma el texto). «importante» sigue en
  verde y «LA VIDA» en blanco: se pidió texto, no color.
- **No se movió nada más**: ni tiempos, ni sonido, ni el kicker (el bloque
  ancla arriba y la línea 2 solo cambia de ancho). Comprobado contra el máster
  anterior, fotograma a fotograma DECODIFICADO (`-f framemd5`, R22): f0–f1362
  **idénticos al píxel**; f1363–f1372 difieren solo por la compresión (PSNR
  65,7 dB: el lookahead de x264 ve venir el cambio); f1373–f1470 es el texto
  nuevo (29,0 dB).
- **Los captions no cambian**: `subtitulos-014.ts` y el `.srt` transcriben lo
  que él DICE, y él dice «de la vida».
- **Sin nueva prueba 720p**: el cambio es de texto, y la prueba existía para
  códec y audio, que no se tocaron. Se verificó con stills de la toma (f1318 →
  f1470, `remotion/out/sonda/014-v3`, copiados a `vistas-previas/`) y con la
  comparación del máster. `pruebas-720p/` se queda con la primera pasada.

## Tercera pasada — b-roll en cuatro momentos (petición del cliente)

| frame | ancla (palabra o texto) | entra | sale | sonido |
|---|---|---|---|---|
| **240** | «grabas» | i1 · móvil grabando | — | `s-broll-grabar` clic ui (nuevo: la única entrada de imagen sin texto que ya suene) |
| **299** | «creas» | i2 · planificador | i1 | — (corte dentro del bloque) |
| **349** | aterriza el chip «QUE SEA MÁS FÁCIL» | — | i2 → su cara | `s-mas-facil` pop, movido de 348 a 349: es el frame en que el plan pone el chip |
| **736** | aterriza ✓ «Imágenes de bancos gratuitos» | i3 · rejilla de fotos | — | `s-imagenes` pop (ya existía) |
| **822** | aterriza ✓ «Publicado en redes en minutos» | — | i3 → su cara | `s-publicado` pop (ya existía) |
| **1016** | aterriza ✗ «Editar» | i4 · editor de vídeo | — | `s-no-editar` clic (ya existía) |
| **1051** | aterriza ✗ «Revisar si la voz quedó bien» | i5 · cascos, pista de voz | i4 | `s-no-voz` clic (ya existía) |
| **1108** | aterriza ✗ «Buscar de dónde sacar imágenes» | — | i5 → su cara | `s-no-imagenes` clic (ya existía) |
| **1373** | aterriza «Lo más importante / LA VIDA» | i6 · pareja al atardecer | — | `s-remate-titular` whoosh (ya existía) |
| 1471 | fin | — | i6 | — |

**Cada corte es un golpe que ya sonaba.** El cambio de plano, el texto y su
sonido son el mismo evento; solo la entrada en f240 no tenía texto propio, y
lleva el toque de un botón de grabar porque lo que aparece es un móvil
grabando. Cortes secos en todos: con esta densidad de rótulos una disolvencia
se leería como un efecto más.

**La puerta** (`node proyectos/014/revisar-014.mjs`) comprueba lo que ningún
frame enseña: orden y hook limpio · cada corte en un ancla, y cada ancla de
texto donde el plan de gráficos pone ese texto (si alguien mueve un ✓, el corte
se queda solo y lo dice) · cada inserto dentro de una toma con velo · crédito,
sha256 y medida REAL de cada clip · metraje, tramos y encuadre (formato). Se
probó en negativo: moviendo un corte 1 f y un ancla 1 f, salen los 5 fallos.

**Medido en el render:**

- Prueba 720p: voz continua de f0 a f1470, sin un hueco (R10). El clic nuevo
  cae en f240 a −26,9 dBFS de RMS, 4,9 dB bajo la voz; el pop del chip, en f349.
- Máster contra el anterior, fotograma a fotograma decodificado: dentro de los
  insertos, el b-roll; fuera, **380 frames idénticos al píxel** y el resto a
  **≥ 49,4 dB** de PSNR (recompresión: los fotogramas que siguen a un inserto
  se codifican contra otros de referencia; invisible).
- Loudness igual que antes: −17,7 LUFS, −0,5 dBTP.

- [x] Puerta del 014 en verde · tsc + eslint
- [x] Stills de cada corte y del centro de cada inserto (`remotion/out/sonda/014-v4`)
- [x] Velo medido sobre el b-roll (02-layout.md)
- [x] Prueba 720p y hoja de contactos del render (`pruebas-720p/hoja-contactos.png`)
- [x] Final BT.709 (VUI y `colr`) + versión para compartir (PSNR 50,2 dB)
