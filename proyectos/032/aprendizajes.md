# 032 · aprendizajes

Lo que costó o se descubrió montando la V16, segundo reel de la Casa Campestre de Guarne. Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Elegir el hilo por la confianza de la transcripción, no por cuál suena mejor

- El encargo pedía, ante la duda, «el hilo que tenga todas las palabras con confianza ≥ 0,55». Se transcribieron por palabra las 41 tomas habladas de las tres carpetas (whisper small con un vocabulario de la casa) y se tomó como confianza de una palabra la **menor** `p` de sus tokens. De los cuatro hilos solo uno sale entero: el de la familia de tres generaciones (HK02 · MD01 · CT04). La diáspora, que es el más fuerte, cae en «Extrañas» (0,08-0,21), «Colombia te llama» (0,48-0,50), MD06 (cinco palabras) y el «Haz… agendemos» de su CTA.
- Un hilo se juzga **entero**: «el error» tiene un hook perfecto (HK08, todo ≥ 0,55) y se cae por su mitad y su CTA.
- Ojo con lo que whisper oye CON confianza: MD08/MD09 («Jacuzzi, asado con tu familia…») salen sin palabras bajas porque whisper escribe «ha dado» con confianza alta. La confianza alta de otra palabra no confirma la que se pintaría.
- Sin el vocabulario, las tres tomas elegidas dan lo mismo (todas ≥ 0,58), así que la elección no depende del `--prompt`.

## 2 · El encuadre 9:16: lo que Vision no ve

- En el hook (1080p) Vision no encuentra la cara (Isabella es pequeña) pero sí el cuerpo en los 22 fotogramas, y `encuadre.py` toma la cabeza al 10 % de su alto: basta.
- **Un destello de lente se mueve con la cámara.** El sol del hook deja una línea vertical a la izquierda de Isabella que va de 0,43 a 0,49 del ancho mientras ella pasa de 0,56 a 0,62. Un tope fijo (`izq_min`, nuevo en `encuadre.py`) lo quita al principio, pero quitarlo del todo la dejaría al 19 % de la ventana: se quedó en 0,46 y el destello asoma en el último segundo del hook (declarado).
- **Mirar el último fotograma de cada plano también para lo que entra por el borde**: en el baño (RC14) el inodoro entraba por la izquierda al final del tramo (ventana a 0,62 → 0,66) y en el dron las placas de la camioneta y del Mini entran desde los 12 s (tramo 7,8-11,4 s). En el CTA el Mini con su placa queda fuera porque la ventana sigue a Isabella y su borde no baja de 0,28.

## 3 · El color: igualar antes de embellecer

- Con la base del canal sola la dispersión de luma entre planos EMPEORABA (σ 15,3 → 17,0): sube el contraste de todo por igual. Una exposición por plano (de +0,4 en el hook y la mitad a −0,4 en el comedor; ≈ 44 niveles de luma por paso) la deja en σ 7,5.
- **Una silueta negra no sube con las sombras.** La parrilla a contraluz del mirador seguía casi negra con `shadows` 0,45 y `blacks` 0,05: el corte desde el lavamanos cálido saltaba −23. La salida fue la de la V13 con su alcoba: disolver hasta el golpe (−12 mezclado en 12 f), no oscurecer el cielo.
- La cama de la música bajo la voz tiene que ser RELATIVA al tramo que baja: con el dron +0,8 dB sobre los recorridos y una cama fija, a 2 f de la primera palabra la curva aún no había llegado (la puerta lo pilló).

## 4 · Proceso

- La V15 (031, Lote El Carmen) la estaba haciendo otra sesión: el número libre sale de leer el registro de TODOS los worktrees, no solo el de `main` (que iba por la V10). El registro de este worktree se copió del de la V15.
- Las herramientas se copiaron del 030 (el juego más completo) y el encuadre del 029 (el del material 16:9); las rutas con `"030"` partidas en `path.join` no las cambia un `sed` de `proyectos/030`: `stills-antes.mjs` apuntaba al plan del 030.
- zsh: `set -- $c` no separa (la trampa de siempre); los bucles con varios argumentos van en `bash -c`.
- El disco está al 98 % (20 GB libres): el intermedio de la prueba (168 MB) se borra al acabar.
