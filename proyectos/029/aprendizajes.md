# 029 · aprendizajes

Lo que costó o se descubrió montando el reel de la Casa Campestre de Guarne con las 19 tomas de `5 Cta`. Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Un clip 16:9 en un reel 9:16: la ventana que sigue

- De un 16:9 solo cabe el 31,6 % del ancho a altura completa. Un recorte centrado pierde a la presentadora en cuanto camina. Se midió su posición con **Vision de Apple** (`herramientas/seguir-sujeto.swift`, `VNDetectFaceRectanglesRequest` + `VNDetectHumanRectanglesRequest`, local y sin descargas: `swiftc` viene con las Command Line Tools) a 5 fotogramas/s, y `herramientas/encuadre.py` la convierte en claves de la ventana (zona muerta ±12 %, tope de velocidad y de aceleración). `normalizar.mjs` las traduce a la expresión `x='clip(…)'` del filtro `crop` de ffmpeg (evalúa `x` por fotograma con `t`; hay que protegerla con comillas simples).
- **Lo que Vision no sabe es qué hay detrás.** En CT14 una tele encendida y dos personas entraban por el borde derecho de la ventana: se vio en el fotograma completo, y la solución fue un tope al borde izquierdo (`AJUSTES`). Un tope de 0,165 sacaba la tele pero dejaba a Isabella al 81 % del ancho, medio cortada: el compromiso (0,185) la deja al 62-71 %. **Se mira el 16:9 entero de cada clip antes de fiarse del seguimiento.**
- Los 1080p suben ×2,13 al cuadro de 1296×2304 (×1,78 al de 1080×1920). Un `unsharp` suave compensa el lanczos; el zoom de esos planos se queda ≤ 1,08. Los 4K bajan al cuadro y sobran.
- La **cámara lenta** de la apertura es real: la fuente es a 60 fps y sus fotogramas se estiran ×2 y salen a 30 fps, uno a uno (`setpts=2.0*PTS,fps=30`), sin interpolar ni mezclar. Cuesta que dure lo que dura el trozo mudo del clip (0,98 s → 2,0 s).

## 2 · «Sube la voz sin saturar» cuando la voz llega a −30 LUFS

- Las voces de `5 Cta` miden −27 a −31 LUFS (Isabella habla a varios metros de un iPhone, de cuerpo entero) con una cresta de 17-20 dB: con ganancia sola, los picos saldrían a +5 dBFS. La cadena de la V9/V1/V2 (compresor desde −26 dBFS) no llegaba (4 dB de limitador en la alcoba); con **compresor 3,5:1 desde −30 dBFS** y la ganancia buscada DESPUÉS del compresor (`herramientas/probar-voz.py`), las seis tomas quedan a −15,0 LUFS (−15,4 la alcoba) con el pico real entre −2,5 y −3,6 dBTP y el limitador quitando ≤ 1 dB (3,7 dB en la alcoba, la que más). Ganancias de +19,6 a +21,9 dB: el ruido de sala entre frases sube de −55 a −48/−53 dBFS, a 33-38 dB bajo la voz.
- **Cada toma de `5 Cta` sigue con otra frase sin pausa** («y se acabará…» a 0,3 s de «la infancia pasa rápido»; «haz clic en el enlace…» tras cada frase corta). Con el hueco de 0,8 s entre tomas esa segunda frase se colaría en la mezcla; además, a +20 dB, una respiración a −33 dB a 0,09 s de la primera palabra (CT01) sería audible. Por eso el WAV tratado es **silencio fuera de [primera sílaba − 70 ms, fin de la frase + 50 ms]**, con una envolvente por muestra (`aeval`, no `afade`: `apad`+`adelay` no devolvían la duración original) y la puerta mide el pico fuera de la ventana (≤ −60 dBFS).
- El fin de la frase se mide en la **envolvente** (`herramientas/envolvente-voz.py`), no con whisper: «cómodos» acaba en 2,66 s y «haz» empieza en 2,86 s (200 ms de hueco), «patrimonio» acaba en 2,92 s y «Asquíquen» empieza en 3,12 s.

## 3 · Subtítulos: el DTW de whisper iba hasta 9 f pronto

Con `trozos-editoriales.mjs --audio` salieron líneas entre 3 y 9 fotogramas antes de su palabra («y privacidad.», 9 f pronto; «su visita.», 3 f tarde; «pasa rápido.», 7 f pronto). La palabra se encontró con `palabras-desde.py` (corta la voz desde un candidato y dice qué palabra oye whisper primero): **el primer candidato que da la palabra «limpia» marca su inicio** (desde 2,16 s oye «alesa y privacidad»; desde 2,20, «y privacidad»). Con la tabla `LINEAS` de `lineas-vs-onsets.py`, 20 de 20 líneas entran entre −0,2 y +2,2 f antes de su palabra.

## 4 · El color: ir un poco más allá de la base sin romper la piel

Todos los planos de esta pieza tienen a Isabella en cuadro, así que los topes de piel (saturación ≤ 1,06, temperatura ≤ 0,06) valen para los siete. Con contraste 1,13, negros −0,08, luces −0,22, temperatura +0,04, saturación 1,06 y `vibrance` 0,03-0,05 (solo en la sala beige, la menos saturada: 0,185) más la exposición de cada plano (−0,14 a +0,10), la saturación media sube de 0,320 a 0,388, la dispersión de luma entre planos baja de σ 8,6 a 6,4, el tono de la piel se mueve < 0,5° y el quemado máximo se queda en 2,0 % (el sol del CTA subió al 2,9 % con exposición −0,05: se bajó a −0,10 y luces −0,36).

## 5 · Proceso

- El worktree propio se hizo desde `origin/main` (no desde el HEAD de otro reel) y se enlazó `remotion/node_modules` y `archivos/whisper` al checkout principal; las skills de estudio (`.claude/skills/{recorrido-luxur,guion-luxur,heygen-motion-graphics}`) están fuera de git y se copiaron de ahí. Ojo con `cd` a otro worktree: cambia el directorio de la sesión.
- zsh: `set -- $variable` no separa palabras (la trampa de siempre); los bucles con varios argumentos van en un script de bash.
- El render de la prueba a escala 1 con `--gl=angle --color-space=bt709 --image-format=png` tarda ≈ 3 min (783 f) y pesa 88 MB; se reduce a 540×960 con ffmpeg etiquetando BT.709 (10 MB).
