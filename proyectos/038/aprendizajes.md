# 038 · aprendizajes

Lo que costó o se descubrió montando la V21, sexto reel de la Casa Campestre de Guarne (hilo «TODOS CABEN»). Las reglas nuevas, cuando el usuario valide la pieza, van a `manuales/edicion-video/reglas.md` con la siguiente R libre.

## 1 · Cuatro sesiones sobre un mismo pozo de material: mirar los worktrees ANTES de elegir y repartir por mensaje

- A las 08:57 había cuatro reels de esta casa en marcha (V17/033 acabando, V19/036, V20/037 y esta). El encargo daba un hilo («escapar del ruido») y tres candidatas que la V19 ya había reservado a las 08:40-08:50 con su propio hilo, y la V20 se había llevado tres de los siete recorridos libres. La señal para verlo: `ls .claude/worktrees/*/proyectos/` y el `original/` de cada uno (mostraba qué clips estaba mirando cada sesión antes de que escribiera nada en el registro), más `ListAgents` para saber quién estaba vivo.
- **El pozo se agota por una regla literal.** «Ningún plano repetido» leída como «ningún clip» dejaba UN recorrido libre de 28 (la V13, V16 y V17 se llevaron 21; la V19 y la V20, seis más). No se resolvió con ingenio sino parando antes de montar y preguntando; el usuario decidió el criterio (tramo disjunto para los recorridos, clip entero para dron, hook, mitad y CTA) y la puerta lo implementa.
- Mensajes entre sesiones: sirvieron (la V19 contestó en minutos, soltó DR73 y RC02 y avisó del 29,97 fps de los DJI). Funcionó que cada sesión pusiera en su mensaje lo que reservaba y lo que dejaba libre, con los códigos del registro.

## 2 · Entre las dobles, el clip peor dicho cambia el hilo

HK11/HK12, MD08/MD09 y CT05/CT06 eran dobles de la misma frase. Dos pasadas bastaron para ver que HK12 no se entiende en medio («llegas a tocar, no de todo cambia») y que CT05 pierde «enlace»: la doble elegida por confianza (MD09: 1 palabra; CT06: 3) era siempre la buena, y la mala no se salva recortando. Para el hilo de recambio se buscaron tomas con una sola frase por toma y se midió igual.

## 3 · El pulso regular de la canción reparte los planos; el límite lo pone el aire de la toma

- *I Feel It Coming* tiene golpes cada 0,645 s (19,35 f) y la rejilla de cortes sale contando pulsos: 3, 2, 3, 2 en el primer recorrido, 3, 3, 5, 5 en el segundo. Cada corte cae a ≤ 0,7 f de su golpe en el WAV del render. Pero la recta tiene huecos (en f233 el golpe no suena) y el golpe de f640 mide 8,8 dB: se cortó sobre golpes MEDIDOS, no sobre múltiplos.
- **El hook se corta donde la toma se acaba.** HK03 solo trae 0,46 s de aire tras su última palabra (13,8 f): ni cabe una disolvencia (14 f) ni la subida de 24 f de la música. Se cortó seco 3,7 f después de ella (el único golpe de 21,8 dB de esa franja) y la música sube desde la última palabra hasta el golpe siguiente (21 f); declarado en la puerta. Si se quiere un hook más suave, hace falta otra toma o aceptar que el golpe del corte suene con la música abajo.

## 4 · El color se arregla eligiendo el tramo antes que la exposición

Con la exposición sola los empalmes salían de −31 a +25 niveles. Dos cosas lo arreglaron: **mirar la luma de los dos lados de cada corte** (`luma-bordes.py`) y **elegir el tramo donde cada clip está al nivel de sus vecinos** (`luma-clip.py`): RC18 (la palmera) empieza en 73-85 y llega a 124 en 1,2 s: se usa solo su final; RC10 (la alcoba) pasa de 109-118 a 141-150 a los 4,4 s: se usa el tramo luminoso; RC15 (la cocina) es el más oscuro (104-112) y se acorta para no llegar al pilar. Después la exposición de cada plano sube o baja hasta que ningún salto pasa de 8,5. σ de luma entre planos 11,1 → 7,2 y quemado 3,0 → 2,5 %.

## 5 · El encuadre sobre el tramo: el borde de la tele se mueve

El tope que dejaba la tele encendida fuera de MD05 (borde izquierdo ≤ 0,36, luego 0,40) la dejó fuera… y a Isabella cargada a la derecha, porque la tele se aleja hacia la derecha mientras la cámara se desliza (0,61 del ancho a 0,8 s, 0,74 a 5,2 s). Con 0,46 el borde derecho de la ventana no pasa de 0,65 en ningún instante y ella queda centrada. Moraleja: medir dónde está lo que se quiere dejar fuera EN CADA INSTANTE del tramo, no solo al principio. Otro caso: el SUV blanco asomaba por el borde izquierdo del DR77 a 9,3-9,6 s con la ventana en 0,58 y solo se vio en el recorte real (`ver-plano.py`), no en el cuadro entero.

## 6 · Proceso

- **El disco se agota entre sesiones.** El libre fue de 10 GB a 0,56 GB en media hora (muchos worktrees de 6-7 GB, las copias de los originales y los intermedios PNG de Remotion). Lo que ayudó: borrar de `original/` las copias recuperables del SSD (los DJI, 420 MB), renderizar la prueba por TRAMOS de imagen (p1…p3b) y el audio aparte (`--codec=wav`), y juntarlos con `ffmpeg -f concat -c copy`. Un render que muere con `ENOSPC` deja el tramo a medias: se repite solo ese.
- La guarda del entorno rechaza órdenes con variables de shell y bucles en una sola línea dentro de un worktree aislado: los lotes van en un `.py`/`.sh` aparte y las órdenes simples, una por línea.
- `normalizar.mjs` comprueba el sha de TODOS los originales antes de re-codificar uno: si se borra una copia recuperable, hay que volver a copiarla antes de repetir un clip suelto.
- `encuadre.py` y `medir-color.py` guardan las tablas de la pieza anterior: se reescribieron `MANUAL`, `ALTURAS`, `AJUSTES`, `PLANOS` y `EMPALMES` (y `probar-voz.py` `TOMAS`, `medir-sujeto.py` es nuevo) antes de medir nada.
