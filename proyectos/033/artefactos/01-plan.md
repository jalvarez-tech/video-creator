# 01 · Plan narrativo — proyecto 033 · Casa Campestre Guarne (V17)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/033/` · puerta `node proyectos/033/revisar-033.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-09) | «Crea un reel cinematográfico que rompa el scroll para promocionar esta propiedad» con la estructura fija **Dron · Hook · Recorrido · Mitad · Recorrido · CTA**, tres frases de Isabella (hook, mitad, CTA), el hilo de la **DIÁSPORA** («volver a Colombia y tener a dónde llegar», el que la V16 dejó pendiente), ninguna cifra en el vídeo, ningún plano de la V13 (029) ni de la V16 (032), voz a −15 LUFS sin saturar, una canción que no esté en ninguna otra versión, color plano a plano al final. Final SOLO con el OK del usuario |
| Ficha | [propiedadesluxur.com · Casa Campestre en Venta con Vista Panorámica a las Montañas](https://propiedadesluxur.com/es/propiedades/guarne/casa-campestre-en-venta-con-vista-panoramica-las-montanas) (la leída el 2026-10-08 para la V16): Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá, 15 km del aeropuerto. **Nada de esto sale en el vídeo**: va en el caption |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/`, todo 16:9 sin rotación y SDR BT.709. Se trabaja con COPIAS en `proyectos/033/original/` verificadas por sha256 (`normalizar.mjs`) |
| Composición | `Recorrido033` · 1080×1920 · **30 fps** · 1189 f (39,6 s) |
| Texto | **editorial**, solo mientras habla Isabella, abajo, un acento por frase |
| Marca | Luxur. Reglas fijas: primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Número | V17 / 033 (registro de uso de main y de todos los worktrees). Otra sesión abrió también un 033 para el Lote El Carmen 10 min después; su usuario lo pasó a V18/034 |

## El hilo: la diáspora, y qué toma de cada doble

Antes de montar se transcribieron por palabra las siete tomas candidatas del encargo con whisper small, dos pasadas (con y sin vocabulario), y la confianza de cada palabra es la **menor** de sus tokens. La lista entera, con el segundo exacto de cada palabra, está en [`../combinaciones.md`](../combinaciones.md) §«Palabras por confirmar».

| Pieza | Candidatas | Elegida | Por qué |
|---|---|---|---|
| Hook | HK06/HK07 «¿Extrañas Colombia? Esta es la razón para regresar» · `IMG_9420`/`IMG_9422` «Colombia te llama, ¿ya tienes dónde llegar?» | **CT21 (`IMG_9422`)** | Entre HK06 y HK07, empate (2 dudosas con vocabulario, 3 sin él); entre 9420 y 9422, la 9422 (la 9420 oye «¿Y a quién es dónde llegar?»). Entre los dos hooks: en CT21 whisper escribe las palabras del guion en las dos pasadas y sus dudas son de 0,44-0,50; en HK06/HK07 la palabra clave («Extrañas», 0,05-0,27) no la escribe nunca bien («Extranes», «Extranos») y su arranque está casi susurrado. Además nombra el hilo literalmente («dónde llegar») y deja «extrañas» a la mitad, sin repetirlo |
| Mitad | MD06 (única toma) | **MD06** | «Llevas años en el exterior, trabajaste duro y ahorraste, pero todos los diciembres extrañas lo mismo.» Cinco palabras bajo 0,55; dos se cierran por medida (ver abajo), el resto queda POR CONFIRMAR |
| CTA | CT18/CT19 «Volver no es una idea, es una dirección. Haz clic en el enlace y agendemos su visita. Puede ser virtual o presencial.» | **CT18**, recortada en «…su visita.» | CT18: 3 dudosas con vocabulario (CT19: 4) y la «Haz» y la «su» se cierran por medida. Se quita «Puede ser virtual o presencial» (5,84-7,40 s): menos voz y una sola acción |

**Lo que se cerró midiendo, no oyendo** (una medida no es un oído: todas siguen POR CONFIRMAR):
- MD06 «trabajaste duro»: whisper oye «trabajas seguro». Antes de «du-» hay una /t/ (cierre y explosión a 2,95-3,01 s) y una [e] (F1 ≈ 465, F2 ≈ 1.800), es decir, el «-te» de «trabajaste», y luego dos sílabas, no tres. El reel ya editado `EXTRANJEROS 1` (en el disco del rodaje) lo subtitula «trabajaste duro».
- CT18 «su visita»: /s/ de 80 ms pegada a la vocal, sin cierre de /t/, así que es «su». `EXTRANJEROS 1` escribe «tu»: es la duda que más conviene oír.
- CT18 «Haz»: la vocal y una /s/ débil a 3,24-3,28 s.

**Si una frase no se cierra al oído, propuesta de recorte:** quitar «trabajaste duro y ahorraste,» (2,51-4,04 s de MD06) con un corte y un acercamiento sobre ella (la toma es 4K cerrada: aguanta 1,10). Quedaría «Llevas años en el exterior… pero todos los diciembres extrañas lo mismo.» (≈ 2 s menos).

## Idea en una línea

Esta casa es para quien vive fuera y quiere volver a Colombia teniendo a dónde llegar: Colombia llama (hook), lo que se extraña cada diciembre (mitad) y volver como una dirección, no como una idea (CTA).

## Promesa y CTA

- **Promesa (primeros 4 s):** el dron gira alrededor de la casa en su cerro; a corte, Isabella sentada en el muro del mirador con el valle: «Colombia te llama, ¿ya tienes dónde llegar?»
- **Acción:** «Haz clic en el enlace y agendemos su visita.» (el enlace va en el caption).
- **Lo que NO se cuenta:** precio, metros, alcobas, baños, minutos o kilómetros (ni se oyen ni se leen: «Puede ser virtual o presencial» se recorta, y ninguna toma con cifra entra), rentabilidad ni valorización.

## Bloques

Tres frases de Isabella (≈ 12,8 s de voz en 39,6 s); el resto es la casa con música.

| Bloque | Planos | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · dron | c01 | la casa en su cerro, el dron girando despacio (el tramo de movimiento más uniforme del vuelo) | — (sin texto ni voz; el frame 0 es la miniatura) | DR76 `DJI_20260414173335_0076_D.MP4` |
| 2 · hook | c02 | Isabella sentada en el muro del mirador, el valle detrás | «Colombia te llama, ¿ya tienes **dónde llegar?**» | CT21 `IMG_9422` (1080p) |
| 3 · recorrido | c03 c04 c05 | el sendero de grava hasta la casa → el jacuzzi de la terraza → la sala de la terraza abierta al valle | — | RC26 `IMG_9508` · RC20 `IMG_9495` · RC22 `IMG_9504` |
| 4 · mitad | c06 | Isabella sentada en esa misma sala de la terraza, 4K cerrado al 60 % | «Llevas años en el exterior, trabajaste duro y ahorraste, pero todos los diciembres **extrañas** lo mismo.» | MD06 `IMG_9448` |
| 5 · recorrido | c07 c08 c09 c10 | la alcoba principal con el ventanal → la claraboya abierta al cielo y el vestier → la bañera junto a las plantas → el valle desde la terraza (la vista, el plano más largo del bloque) | — | RC07 `IMG_9467` · RC06 `IMG_9466` · RC04 `IMG_9463` · RC21 `IMG_9497` |
| 6 · CTA | c11 c12 | Isabella camina hacia la cámara en el jardín, con el atardecer; funde a negro; tarjeta | «Volver no es una idea, es una **dirección**. Haz clic en el enlace y **agendemos su visita**.» | CT18 `IMG_9531` (1080p) |

**Por qué estos planos: una llegada.** Para quien vuelve, lo primero es a dónde se llega: el dron enseña la casa en su cerro. El paseo entra como entra alguien que llega: por el sendero del jardín, hasta la terraza donde se sienta Isabella. Después de «extrañas lo mismo», lo propio: la alcoba, la luz del cielo por la claraboya, el baño. Al final, el valle, que es lo que se extrañaba. El CTA, al atardecer en el jardín, cierra el día.

**Ni un plano de la V13 ni de la V16** (lo comprueba la puerta, sección 7b, cargando sus dos planes): la V13 usó DR72, HK04, RC25, RC16, RC15, MD04, RC19, RC03, RC10, RC12 y CT15; la V16, DR78, HK02, RC27, RC24, RC18, MD01, RC08, RC09, RC14, RC23 y CT04.

**Lo que este reparto cuesta y se declara.**
- El hook y el CTA salen de clips de 1080p: suben ×2,13 al cuadro y salen más blandos que los 4K. La mitad es un 4K cerrado al 60 % (×1,78).
- La bañera (RC04) es la misma bañera exenta que salió en la V13 (RC03): otro clip y otro ángulo, no el mismo plano.
- En el dron, frente a la casa hay dos coches blancos aparcados, a pocos píxeles: no se lee ninguna placa.
- La sala de la terraza (RC22, MD06) y el jacuzzi (RC20) tienen una tele ENCENDIDA en la pared del fondo («Sonic 3»): la ventana 9:16 la deja fuera en los tres.
- En CT18 la imagen se corta en la pausa antes de «Puede ser…»: el CTA acaba en «su visita», 0,2 s antes de que ella vuelva a mover los labios.

## Música

*Utopia* (Aleksey Chistilin), reservada como V17: no está en ninguna otra versión. La elegí con `buscar-entrada.py --cta 32 36` sobre las 27 libres. Entra en **141,808 s**, con un golpe de 9,8 dB en el frame 1, y la meseta (−12 a −8 LUFS) tiene golpes de 9-13 dB para cortar. Desde los **31 s** de la pieza cae sin rebote (−19,4 LUFS bajo la primera frase del CTA, −30,4 bajo la segunda): el CTA entra en esa caída y la canción acaba con la pieza. En el catálogo figura como «ensueño, ilusión, esperanza», lo que pide volver. Está medida, **no oída**, y su licencia **no está verificada**.

Alternativas medidas: *Begin Again* (sería «volver a empezar», pero tras su caída rebota a +5 s con un golpe de 20 dB justo bajo el CTA), *Children* (piano, nostalgia; golpe de entrada flojo, 9,7 dB, y solo 10 golpes donde cortar), *Chillin'* (rebota a +37 s; además la reservó la V18). *Overcoming the Impossible* y *Deep Breath* tienen caídas en escalones y tramos de 10 s sin golpe.

## Pendientes con el usuario

- Oír las palabras POR CONFIRMAR (lista con segundos en `combinaciones.md`) antes de la final.
- El OK a la prueba (no se exporta la final sin él).
- Oír la canción y confirmar su licencia.
