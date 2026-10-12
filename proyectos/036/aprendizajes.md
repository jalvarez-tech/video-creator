# 036 · aprendizajes

Lo que costó o se descubrió montando la V19, cuarto reel de la Casa Campestre de Guarne y el primero en estilo cinematográfico. Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Cuatro sesiones a la vez sobre la misma casa

- Mientras se hacía esta pieza se abrieron la V20/037 («el error») y la V21/038 (primero «escapar del ruido», el MISMO hilo que esta; luego «todos caben»), cada una en su worktree y con la reserva sin publicar. Las copias del registro no coincidían entre sí (cada una tenía reservas que las otras no). Lo que funcionó: **fusionar todas las copias fila a fila** (un script por clave código + archivo, comprobando que ningún tachado de ninguna copia se pierde), reservar el NÚMERO en el acto, tachar en cuanto se eligen las tomas y avisar por mensaje con la lista exacta de clips y tramos. La V21 cambió de hilo cuando supo que HK11 y la frase del jacuzzi ya estaban cogidos.
- El número de proyecto no lo dice solo el registro: `proyectos/035` lo ocupaba un libreto PRE-rodaje que no tiene fila en él. Mirar `ls -d .claude/worktrees/*/proyectos/0*` además del registro.

## 2 · El DJI a 29,97 fps repite un fotograma al pasar a 30

`fps=30` sobre un clip de 29,97 inserta un fotograma repetido cada 1001 (≈ 33 s del clip). En el DR79 caía en 16,667 s, DENTRO del tramo: una micro-parada en un plano que el encargo pide «sin tirones ni paradas». `movimiento.py` lo enseñaba como una muestra a −20 % en medio de un perfil plano; se confirma buscando diferencias entre fotogramas < 15 % de la mediana. Arreglo en `normalizar.mjs`: `setpts=PTS*1000/1001` antes de `fps=30` en los drones (0,1 % más rápido, cada fotograma sale una vez); el recorte se sigue calculando con el tiempo de la fuente y en el plan el `desde` del dron va × 1000/1001 (`dji()`). La puerta (2e) comprueba que la receta lo hace. Las otras sesiones que usan DJI (V20, V21) lo aplicaron o comprobaron sus tramos.

## 3 · Medir un barrido: `flujo.py`, no `movimiento.py`

- En la órbita (la ventana sigue a la casa mientras el dron gira), `movimiento.py` daba una U (1,7 → 0,8 → 2,0) y parecía «no constante». No era la velocidad: en el centro del tramo la ventana es casi toda cielo y casa (poca textura, poca diferencia entre fotogramas) y en los extremos entra vegetación. Con `flujo.py` el desplazamiento de la casa es 0 ± 1 px en los 104 f. La herramienta ya avisaba de esto para las subidas al cielo; vale igual para un plano con más o menos textura a lo largo del tramo.
- **Una ventana que sigue algo en un giro no va en línea recta**: con la perspectiva, el sujeto se acelera al acercarse al borde del cuadro (0,169 → 0,236 del ancho por segundo). Una recta se desacompasa en los extremos (3,5 → 1,2 → 3,7); la posición MEDIDA (correlación con una plantilla cada 0,1 s + ajuste cúbico, error ≤ 0,004) lo deja fijo.
- **El giro de un dron también acelera** (13 → 17 px por fotograma en la vista, medido a 1080 de ancho). La ventana puede COMPENSARLO: se desplaza en cada instante (velocidad − objetivo) y la velocidad aparente queda constante (17,0 ± 0,7). Ojo con la unidad: `flujo.py` da px POR FOTOGRAMA con una muestra cada `paso` fotogramas; la primera vez compensé un tercio.

## 4 · `buscar-cortes-lp.py` con los planos reales

- Con todos los cortes ≥ 9 dB y la caída estricta (≥ 9 / ≥ 20 dB), 0 soluciones en las 25 canciones: las únicas «caídas completas» eran los fundidos finales, sin golpes. Con la caída tras el clímax (`D1=6 D2=12`) aparecieron siete; de las cinematográficas solo *Begin Again* crece hasta la vista. Después se fijó la caída (`T_F`) y el CTA en su último golpe fuerte (`W=0.5`).
- El hook manda: necesita un tramo exacto (de 8 f antes de su primera sílaba a 3 f después de la última, sin cola para disolver) y eso deja pocas parejas de golpes. Con la vista en 3-4 s no había ninguna rejilla: la vista quedó en 5,4 s (el plano más largo del bloque, como pide el formato).
- La herramienta fallaba con `TIPOS` sin ninguna `c` (`min()` vacío): arreglado en la copia de este proyecto.

## 5 · Un corte sobre un golpe de ataque lento, con la música volviendo de la cama

El corte hook → órbita cae en un golpe de 9,2 dB de ataque lento, justo cuando la música vuelve de la cama (el hook acaba 5 f antes del final de su clip). Con una rampa de subida, `golpes-render.py` veía la rampa o el arranque de la última sílaba de la voz (−4,5 f); con un escalón en el fotograma anterior, −1,1 f; en el posterior, +1,5. Lo que funcionó: mover el CORTE al fotograma del golpe (f280, golpe en 280,5) y poner el escalón de la música en ese mismo fotograma: −0,1 f. Y medir SIEMPRE sobre un WAV recién renderizado: un render de audio que falló por timeout (Chrome ocupado por otras sesiones) dejó el WAV anterior y la primera medida salió de él (se borra el WAV antes de cada render).

## 6 · El color: los saltos que deja el contenido

La base de cine sola no iguala nada (σ 10,9 → 11,2) y la exposición por plano baja la dispersión (→ 9,4), pero tres empalmes siguen a +21/+25: el final de un dron sobre árboles en sombra contra el principio de un interior luminoso. Subir la exposición del dron quema su cielo (14 % en la órbita a +0,3); hay que recogerlo con luces y blancos (hasta −0,6 / −0,3). Los negros del canal a −0,10 aplastaban el bosque de la vista (12,6 % de píxeles ≤ 8): la base de esta pieza va a −0,08.

## 7 · Proceso

- El disco bajó a 3,4 GB libres por las renders de otras sesiones; `stills-multiples.mjs` y `remotion render` borraron sus bundles. El intermedio de la prueba (182 MB) se borra al acabar.
- La plantilla del 033 no aplicaba el 90 % ni la cursiva 8 px menor que pide el encargo: se trajo de la 025 (composición y puerta).
- zsh: un patrón sin coincidencias al final de un comando lo da por fallido (el render había ido bien).
