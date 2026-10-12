# 033 · aprendizajes

Lo que costó o se descubrió montando la V17, tercer reel de la Casa Campestre de Guarne (hilo de la diáspora). Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Una palabra dudosa se acota midiendo, y a veces hay un dato fuera del repo

- Las dudas se midieron con tres herramientas que ya existían: `palabras-desde.py` (qué oye whisper cortando desde un instante), `sibilantes.py` (¿hay una /s/?) y `formantes.py` (qué vocal es). Ejemplos: «su» frente a «tu» (CT18) es una /s/ de 80 ms sin cierre de /t/; «trabajas seguro» frente a «trabajaste duro» (MD06) muestra una /t/ y una [e] antes de «du-», y dos sílabas, no tres.
- **El disco del rodaje tenía la respuesta escrita**: `VIDEOS EDITADOS/REDES/EXTRANJEROS/EXTRANJEROS 1.mp4` es un reel ya editado (por otra persona) con las mismas tomas de la diáspora subtituladas («trabajaste duro», «agendemos tu visita»). Antes de dar una palabra por imposible, mira si alguien ya la subtituló. No sustituye al oído del usuario: en «su/tu» el reel y la medida no coinciden.
- Con el vocabulario en `--prompt` y la frase ENTERA como prompt, whisper la copia (da «duro» con 0,96 y «seguro» con 1,00): el prompt sirve para los nombres propios, no para decidir una palabra.
- Isabella aspira las eses finales en MD06 («diciembre(s)», «extraña(s)»): no hay /s/ medible, y no se puede cerrar por medida.

## 2 · Entre las dobles, elegir por la palabra CLAVE y no solo por el recuento

HK06/HK07 y CT21 empataban o casi en número de palabras bajo 0,55. La diferencia era cuál: en HK06/HK07 la que falla es «Extrañas», el gancho entero, y whisper nunca la escribe bien; en CT21 fallan «llama», «ya» y «dónde» con 0,44-0,50, pero whisper escribe el guion en las dos pasadas. Una frase cuyo texto coincide con el guion en dos pasadas distintas se cierra antes que una con menos dudas pero con la palabra clave mal escrita.

## 3 · El encuadre: mirar el cuadro COMPLETO con las ventanas dibujadas

- Nuevo `herramientas/ventanas-prueba.py`: el fotograma 16:9 entero en tres instantes del tramo con cinco ventanas 9:16 candidatas dibujadas encima. Así se vio la tele ENCENDIDA (con una película de marca) de la terraza, que sale en RC20, RC22 y MD06 y que un recorte centrado habría metido; en la mitad hizo falta un tope (`izq_max` 0,46) porque la cámara se desliza y la tele se acerca a Isabella.
- El dron se elige midiendo el movimiento sobre el clip 16:9 ENTERO (diferencia media entre fotogramas a 192×108, ventanas de 75 f): DR76 tiene un tramo de 4 s con dispersión 0,013 que no se habría encontrado mirando su primer fotograma.

## 4 · ffmpeg no admite una expresión de `crop` con más de ≈ 100 `if` anidados

Una ventana fija en un clip de 27 s da 108 claves cada 0,25 s, y ffmpeg falla con «Missing ')' or too many args» y deja un MP4 de **0 bytes**. Como existe, `normalizar.mjs` lo habría dado por bueno en la pasada siguiente. Arreglo en `normalizar.mjs`: se quitan las claves colineales antes de escribir la expresión (misma trayectoria). Y siempre se borra la salida rota antes de repetir.

## 5 · La música: una canción que cae SOLA y no deja hueco para apagarla

*Utopia* cae sola bajo el CTA (−8 → −19 → −30 LUFS) pero tiene golpes cada 0,4-0,8 s hasta su silencio: no hay un «antes del siguiente golpe» tras la última palabra. La cama del CTA sigue la caída de la canción y se va a cero en la ÚLTIMA palabra (45 f de coseno, sin audibilidad: la canción ya está a −31/−34 LUFS). Con un `BAJO_CTA` calculado contra un «lecho» estable (la receta de la V16), la cama habría quedado POR ENCIMA del nivel alto y habría hecho sonar golpes tras la palabra.

## 6 · Una disolvencia entre dos planos de geometría fuerte se ve como una doble exposición

Alcoba → claraboya disolvía porque en esos 4 s la canción no tiene golpe ≥ 9 dB: a mitad de la mezcla, el cuadrado azul del cielo flotaba sobre la cama. Se cortó sobre el golpe medio de 8,2 dB (excepción declarada en la puerta, `GOLPE_MEDIO`, que falla si sobra). Antes de dar por buena una disolvencia, se mira su fotograma central (f en − 6).

## 7 · La legibilidad: medir con las líneas ya enteras

`legibilidad.py` cuenta como «fondo» los píxeles de un texto que aún está entrando (luma < 225): medido en el fotograma de entrada del acento, el p99 salió a 1,3 : 1, y con las líneas enteras, 2,8. Mide 10 f después de la última línea del bloque. El velo de la V16 (centro a 0,36) dejaba 2,3-2,5 al p99 sobre el pantalón blanco de Isabella; a 0,42 queda en 2,6-3,3.

## 8 · Proceso

- **Dos sesiones cogieron el mismo número** (V17/033) con diez minutos de diferencia, sin fila todavía en sus registros: el protocolo «reservar y publicar en el acto» choca con «no hagas commit». Se resolvió por mensaje entre sesiones: la otra (Lote El Carmen) pasó a V18/034 por decisión de su usuario. La señal para verlo a tiempo: `ls .claude/worktrees/*/proyectos/NNN` y `ps` buscando `recorrido-NNN`, no solo el registro.
- La puerta de la V16 solo *informaba* del metraje compartido; el encargo de la V17 pedía que lo comprobara: `SIN_REPETIR` hace que falle con el mismo clip aunque sea otro tramo, y también si no encuentra el plan de una versión anterior.
- zsh: `set -- $r` no separa (otra vez); los bucles con varios campos van en `bash -c`.
