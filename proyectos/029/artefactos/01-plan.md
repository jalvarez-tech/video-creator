# 01 · Plan narrativo — proyecto 029 · Casa Campestre Guarne (V13, rev. 1)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/029/` · puerta `node proyectos/029/revisar-029.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-08) | «Crea un video cinematográfico que rompa el scroll tipo reel para promocionar la propiedad [Casa Campestre en Venta con Vista Panorámica, Guarne]. Los videos están en `5 Cta`, en 16:9, necesito encuadrarlos en 9:16, sube la voz sin saturar y utiliza canciones que no estén en otros videos; al final coloriza.» |
| **Corrección (rev. 1)** | «Tiene muchos diálogos, recuerda la estructura algo como: **Dron, Hook, Recorrido, Mitad, Recorrido y CTA**.» La rev. 0 (solo las 19 tomas de `5 Cta`, seis frases de Isabella en 26 s) se guarda como `pruebas-720p/029-recorrido-rev0.mp4`; su plan está en el commit `1d79608` |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/` (`1 Hooks`, `2 Mitad`, `3 Dron`, `4 Recorrido`, `5 Cta`), **todo 16:9 sin rotación y SDR BT.709**: 1080p a 59,94/60 fps o 4K a 30 (el dron, 4K a 29,97). Las carpetas cambian de contenido mientras el usuario las ordena (`IMG_9411` pasó de `5 Cta` a `Hooks`; `IMG_9516` desapareció): se trabaja con COPIAS en `proyectos/029/original/` verificadas por sha256 |
| Composición | `Recorrido029` · 1080×1920 · **30 fps** · 1137 f (37,9 s) |
| Formato | 9:16 vertical: la estructura de seis bloques del canal sin voz en off |
| Estilo | **Cinematográfico** (director §4): dron al principio, planos largos y quietos de la casa a corte sobre los golpes de la música, empuje lento en las tomas de Isabella, color graduado |
| Texto | **editorial** (el modo de Luxur), solo mientras habla Isabella; los recorridos y el dron, sin texto |
| Marca | Luxur. Reglas fijas (`recorrido-luxur` SKILL.md §0): primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Propiedad (ficha de la web, 2026-10-08) | Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá («30-40 min al centro de Medellín y 15 km al aeropuerto») · jacuzzi, zona BBQ, portería 24 h, pet friendly, rooftop. **Ninguna cifra sale en el vídeo** (la ficha va en el caption) |

## Idea en una línea

Esta casa es para la familia que quiere dejar a sus hijos una infancia que recordar: lo que se recuerda (hook) → la pregunta que obliga a pensarlo (mitad) → lo que dura (patrimonio, CTA).

## Promesa y CTA

- **Promesa (primeros 3 s):** el dron se acerca a la casa en su cerro, llega a su fachada y entra Isabella: «La casa que tu familia va a recordar siempre.»
- **Acción que se pide al final:** «Haz clic en el enlace y agendemos tu visita.» (el enlace es el de la bio).
- **Lo que NO se cuenta:** precio, metros, número de alcobas (ni suenan ni se leen; van en el caption), rentabilidad ni valorización.

## Bloques

Solo hablan tres veces (14 s de voz en 38 s); el resto es la casa con música.

| Bloque | Plano | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · dron | c01 | el dron SE ACERCA a la casa en su cerro y llega a la terraza y al garaje (los últimos 3,3 s del vuelo) | — (sin texto ni voz) | DR72 `DJI_20260414173106_0072_D.MP4` |
| 2 · hook | c02 | Isabella en el jardín, de pie, con el sol entre las hojas | «La casa que tu familia va a **recordar siempre**.» | HK04 `IMG_9407` |
| 3 · recorrido | c03 c04 c05 | sala → comedor → cocina (a corte sobre golpes) | — | RC25 `IMG_9507` · RC16 `IMG_9491` · RC15 `IMG_9490` |
| 4 · mitad | c06 | Isabella sentada en la terraza, plano cerrado al 62 % del 4K | «Pregúntate algo. ¿Qué recuerdos **de infancia** les estamos dando?» | MD04 `IMG_9439` |
| 5 · recorrido | c07 c08 c09 c10 | terraza con el jacuzzi → baño → ventana y cortina → alcoba y su ventanal (la vista) | — | RC19 `IMG_9494` · RC03 `IMG_9462` · RC10 `IMG_9471` · RC12 `IMG_9476` |
| 6 · CTA | c11 c12 | Isabella entra en esa misma alcoba; funde a negro; tarjeta | «Esta no es solo una casa, **es patrimonio**. Haz clic en el enlace y agendemos **tu visita**.» | CT15 `IMG_9523` |

**Por qué este reparto.** Hay dos hilos de guion en el material del usuario: el de la **diáspora** («Extraño Colombia… esta es la razón para regresar» → «Llevas años en el exterior… todos los diciembres extrañas lo mismo» → «Volver no es una idea, es una dirección») y el de la **familia** (el elegido). El de la diáspora es más fuerte pero lleva tres palabras que whisper oye con confianza baja (`Extraño`/`¿Extrañas?` 0,05-0,15, `trabajas duro`/`seguro` 0,45, `diciembres` 0,49) y no se puede cerrar sin oírlas; el de la familia sale con todas las palabras ≥ 0,55. Queda como **V14**. Para la mitad se eligió `IMG_9439` (3,25 s de voz, pregunta clara) frente a `IMG_9438` (misma frase, 0,74 s de silencio al arrancar) y para el CTA `IMG_9523` («patrimonio», con «haz clic» entero) frente a su doble `IMG_9524` (whisper oye «asquíquen el enlace»).

Tomas descartadas: `IMG_9442-9444` (la tele encendida con dibujos animados sale en el encuadre y la frase no se entiende), las tomas con ella muy lejos (`IMG_9437`, `IMG_9513`), `IMG_9429` («en 10 minutos abres la puerta»: lleva cifra y una distancia que la ficha no confirma: 15 km) y las de la diáspora (arriba).

## Música

*Pictures from the Past* (Aleksey Chistilin), reservada en el registro de uso (V13): no está en ninguna otra versión. Entrada en 45,330 s (golpe de 11,7 dB = frame 1), un arco que sube de −15 a −12 dB y, a los 30,0 s, una caída de ≈ 10 dB que cae sobre el principio del CTA. Medida, **no oída**; licencia no verificada (`HAY_MUSICA = false` es la salida si no se puede publicar).

## Pendientes con el usuario

- «**solo**» de «Esta no es solo una casa» (CT15): whisper oye «esta no solo una casa»; en su doble (CT16), «no es la una casa». Sentido y cuenta de sílabas dicen «no es solo»; **sin oír**. La puerta `--final` falla mientras esté la nota.
- Oír la canción y confirmar que encaja (y la licencia).
- La nitidez de los planos que salen de un 1080p: el hook (HK04) y el baño (RC03).
- **El dron cambió el 2026-10-08** («cambia la toma del dron»): el DR71 (la fachada vista desde el aire alejándose, una vez más de frente) pasó a DR72, que se ACERCA a la casa y acaba en su terraza; el DR78 y el DR79 (trucking lateral por la fachada) quedan como alternativas.
- Si quiere el hilo de la diáspora como V14 (hace falta que alguien cierre «Extraño/¿Extrañas?», «trabajas duro/seguro» y «diciembres» al oído).
