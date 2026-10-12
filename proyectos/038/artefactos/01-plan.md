# 01 · Plan narrativo — proyecto 038 · Casa Campestre Guarne (V21)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/038/` · puerta `node proyectos/038/revisar-038.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-09) | «Crea un reel cinematográfico que rompa el scroll para promocionar esta propiedad» con la estructura fija **Dron · Hook · Recorrido · Mitad · Recorrido · CTA**, tres frases de Isabella (hook, mitad, CTA), hilo «ESCAPAR DEL RUIDO», ninguna cifra en el vídeo, ningún plano repetido de la V13, V16, V17, V19 ni V20, voz a −15 LUFS sin saturar, una canción de JAZZ que no esté en ninguna otra versión, color plano a plano al final. Final SOLO con el OK del usuario |
| Ficha | [propiedadesluxur.com · Casa Campestre en Venta con Vista Panorámica a las Montañas](https://propiedadesluxur.com/es/propiedades/guarne/casa-campestre-en-venta-con-vista-panoramica-las-montanas): Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá. **Nada de esto sale en el vídeo**: va en el caption |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/`, todo 16:9 sin rotación y SDR BT.709. Los recorridos y los dos drones son 4K a 29,97/30/31,58 fps; las tres tomas de Isabella, una 4K (la mitad) y dos 1080p a 60 fps (hook y CTA). Se trabaja con COPIAS en `proyectos/038/original/` verificadas por sha256 (`normalizar.mjs`) |
| Composición | `Recorrido038` · 1080×1920 · **30 fps** · 1113 f (37,1 s) |
| Texto | **editorial**, solo mientras habla Isabella, abajo, un acento por frase |
| Marca | Luxur. Reglas fijas: primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Número | V21 / 038. `ls .claude/worktrees/*/proyectos/` y `ps` (2026-10-09, 08:50): ningún otro worktree lo usaba; la V20 (037) y la V19 (036) estaban en marcha |

## El hilo: por qué «TODOS CABEN» y no «ESCAPAR DEL RUIDO»

El encargo daba el hilo «ESCAPAR DEL RUIDO» con las candidatas HK11/HK12, MD08/MD09 y CT05/CT06. Se transcribieron por palabra (whisper small, dos pasadas con y sin vocabulario) y se midió. Entonces apareció un choque que solo el usuario podía resolver (se le preguntó, 2026-10-09):

1. **La V19 (036) ya había reservado ese hilo** (el suyo, «el refugio»: HK11 `IMG_9433`, MD08 `IMG_9514`, CT07, DR75/DR81/DR79, RC17/RC11/RC05, *Begin Again*; reservado a las 08:40-08:50, esta a las 08:57). Con la regla «ningún clip repetido» solo quedaban los dobles HK12 y MD09: la misma frase con otro clip, y HK12 dice «llegas a tocar, no de todo cambia» (no se entiende «a tu hogar»: 5-6 palabras dudosas).
2. **De los 28 recorridos solo quedaba libre uno**: la V13, la V16 y la V17 se habían llevado 21, la V19 tres (RC17, RC11, RC05) y la V20 otros tres (RC01, RC13, RC28).

Decisión del usuario: hilo **«Todos caben»** (el domingo en familia; todo libre y sin frases de otra versión) y **un clip de recorrido puede repetirse si su TRAMO no comparte ni un fotograma con otra versión** (la puerta lo comprueba por tramos; los dos drones y las tres tomas de Isabella siguen sin repetirse como CLIP).

| Pieza | Candidatas | Elegida | Por qué |
|---|---|---|---|
| Hook | HK03 «Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda incómodo?» | **HK03 (`IMG_9406`)** | Libre; una pregunta que selecciona; Isabella camina hacia la cámara por el jardín de papiros. 3 palabras < 0,55: «Domingo» y «primos» se cierran cortando desde su arranque; **«incómodo»** no |
| Mitad | MD05 «Hijos, abuelos, amigos que vienen de visita, todos pueden estar aquí con total comodidad.» | **MD05 (`IMG_9445`)** | Libre; responde al hook (quiénes caben). 4K, la sala con el valle detrás. 3 palabras < 0,55 («Hijos» es la primera de la toma) |
| CTA | CT06 «Recorridos privados disponibles, reserva el tuyo en el enlace.» (la doble CT05 pierde «enlace») | **CT06 (`IMG_9427`)** | Libre; «enlace» ≥ 0,90 en las dos pasadas; Isabella camina hacia la cámara bajo el cielo de nubes. 3 palabras < 0,55 («Recorridos» la primera) |

La lista completa de palabras con confianza < 0,55 y su segundo exacto está en [`../combinaciones.md`](../combinaciones.md) §«Palabras por confirmar». Las candidatas del hilo del ruido (HK11/HK12, MD08/MD09, CT05) quedan descritas allí por si el usuario quiere otra versión.

## Idea en una línea

Esta casa es para la familia que se reúne los domingos y no quiere que nadie quede incómodo: la pregunta (hook), quiénes caben y con qué comodidad (mitad) y la visita que se reserva (CTA).

## Promesa y CTA

- **Promesa (primeros 3,5 s):** el dron pasa despacio por delante de la casa baja en su loma, con el cielo abierto; a corte, Isabella camina hacia la cámara por el jardín de papiros: «Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda incómodo?»
- **Acción:** «Reserva el tuyo en el enlace» (el enlace va en el caption).
- **Lo que NO se cuenta:** precio, metros, alcobas, baños, minutos o kilómetros (ni se oyen ni se leen), rentabilidad ni valorización.

## Bloques

Tres frases de Isabella (13,3 s de voz en 37,1 s); el resto es la casa con música.

| Bloque | Planos | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · dron | c01 | la casa baja en su loma bajo un cielo abierto; el dron pasa despacio (tramo de movimiento uniforme, dispersión 0,030) | — (sin texto ni voz; el frame 0 es la miniatura) | DR73 9,6-12,87 s |
| 2 · hook | c02 | Isabella camina hacia la cámara por el sendero del jardín de papiros | «Domingo en familia: abuelos, tíos, primos. ¿Cuántas veces alguien queda **incómodo?**» | HK03 `IMG_9406` (1080p) |
| 3 · recorrido | c03 c04 c05 c06 | el patio interior → el comedor con su mesa puesta → la terraza de sillones de mimbre → la palmera que se aparta y deja ver la vista | — | RC27 0,0-1,93 · RC24 3,65-4,95 · RC22 0,1-2,03 · RC18 1,7-2,97 |
| 4 · mitad | c07 | Isabella sentada en el puf de la sala, el valle detrás (4K cerrado al 60 %) | «Hijos, abuelos, amigos que vienen de visita, todos pueden estar aquí con **total comodidad.**» | MD05 `IMG_9445` |
| 5 · recorrido | c08 c09 c10 c11 | la cocina con la isla → una alcoba con escritorio → una alcoba de cama blanca → el valle desde el aire (la vista, el plano más largo del bloque) | — | RC15 4,5-5,77 · RC12 3,9-5,87 · RC10 4,4-7,6 · DR77 9,3-12,53 |
| 6 · CTA | c12 c13 | Isabella camina hacia la cámara por el camino de piedra con el cielo; funde a negro; tarjeta | «Recorridos **privados** disponibles, reserva el tuyo en el **enlace.**» | CT06 `IMG_9427` (1080p) |

**Por qué estos planos: una sobremesa.** La pregunta del domingo (hook) se contesta enseñando los sitios donde cabe todo el mundo: el patio, el comedor con la mesa puesta, la terraza. Tras «todos pueden estar aquí con total comodidad», los sitios de cada quién: la cocina donde se junta la familia, el cuarto de unos y la alcoba de otros, y por último lo que comparten todos: el valle. Los planos de interior son tramos de clips que otras versiones usaron en OTRO momento (RC15, RC12, RC10 y RC27/RC24/RC18/RC22): la puerta comprueba que ninguno comparte un fotograma.

**Lo que este reparto cuesta y se declara.**
- El hook y el CTA salen de clips de 1080p: suben ×2,13 al cuadro (con un `unsharp` suave) y salen más blandos que los 4K. La mitad es un 4K cerrado al 60 % (×1,78). Los recorridos y los drones son 4K (×1,07).
- El dron DR73 tiene los coches del garaje a 20 px: ninguna placa legible. DR77 deja fuera, con la ventana a 0,62, el SUV blanco del camino.
- En la mitad hay una tele ENCENDIDA a la derecha de la sala (Super Mario) y en el comedor otra a la izquierda: las ventanas las dejan fuera. En RC12 asoman unos pósters de la pared a 5,35 s: la ventana se desplaza a la derecha.
- La alcoba de RC12 es un cuarto con escritorio: «el cuarto de los hijos» es una lectura del plano, no un dato de la ficha (el plan lo dice así).
- El hook sale a corte 3,7 f tras su última palabra (la toma solo trae 0,46 s de aire): la música no llega a subir antes del corte, el golpe de f272 suena con ella abajo y la subida acaba en el golpe siguiente (declarado en la puerta).

## Música

*I Feel It Coming (The Weeknd, versión de saxofón)* — reservada como V21; no está en ninguna otra versión (jazz, a petición del usuario: de las tres que nombró es la que mejor cae bajo un CTA). Entra en **223,226 s** con un golpe de 10,5 dB en el frame 1; tiene un PULSO de 0,645 s (93 BPM) con golpes de 9-25 dB, y todos los cortes son secos sobre uno medido. Meseta de −10 LUFS hasta los 30 s de la pieza y un fundido natural sin rebote (−14,8 a +31 s, −16,1 a +33, −21,3 a +37, −31,6 a +41) bajo el CTA. Medida, **no oída**; licencia **no verificada**. Alternativas medidas: *The Sky is Crying* (blues de 9 min: entrada 505,767 s, baja 10 dB hacia +36 s y se corta en seco a +42 s) y *L' Amour Toujours* (caída de solo 3,9 dB: descartada).

## Pendientes con el usuario

- Oír las palabras POR CONFIRMAR (lista con segundos en `combinaciones.md`) antes de la final.
- El OK de la prueba (no se exporta la final sin él).
- Oír la canción y confirmar su licencia.
- Que se oiga el golpe de f272 (hook → patio) con la música abajo y el de f640 (mitad → cocina), el más débil (9,0 dB).
