# 01 · Plan narrativo — proyecto 032 · Casa Campestre Guarne (V16)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/032/` · puerta `node proyectos/032/revisar-032.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-08) | «Crea un reel cinematográfico que rompa el scroll para promocionar esta propiedad» con la estructura fija **Dron · Hook · Recorrido · Mitad · Recorrido · CTA**, pocas frases de Isabella (solo hook, mitad y CTA), ninguna cifra, voz a −15 LUFS sin saturar, una canción que no esté en ninguna otra versión, subtítulos editoriales solo mientras habla, el color al final y plano a plano. La propiedad la eligió el usuario: **Casa Campestre Duglas Yovana** (2.º reel de la casa; el 1.º fue la V13, proyecto 029) |
| Ficha | [propiedadesluxur.com · Casa Campestre en Venta con Vista Panorámica a las Montañas](https://propiedadesluxur.com/es/propiedades/guarne/casa-campestre-en-venta-con-vista-panoramica-las-montanas), leída el 2026-10-08: Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños (la ficha dice «cinco» en los destacados) · 2 parqueaderos + visitantes · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá, 15 km del aeropuerto, 30-40 min a Medellín · jacuzzi, BBQ, rooftop, portería 24 h, pet friendly. **Nada de esto sale en el vídeo**: va en el caption |
| Material | Los cinco grupos de `Casa Campestre - Duglas Yovana/Videos/`, todo 16:9 sin rotación y SDR BT.709 (4K a 30 fps o 1080p a 59,94/60; el dron 4K a 29,97). Se trabaja con COPIAS en `proyectos/032/original/` verificadas por sha256 (las carpetas cambian mientras el usuario las ordena) |
| Composición | `Recorrido032` · 1080×1920 · **30 fps** · 1140 f (38,0 s) |
| Formato | 9:16 vertical: la estructura de seis bloques del canal, sin voz en off |
| Estilo | **Cinematográfico** (director §4): dron que pasa en lateral por la fachada, planos de la casa a corte sobre los golpes de la música, empuje lento en las tomas de Isabella, color graduado plano a plano |
| Texto | **editorial** (el modo de Luxur), solo mientras habla Isabella, abajo, un acento por frase; el dron y los recorridos sin texto |
| Marca | Luxur. Reglas fijas (`recorrido-luxur` SKILL.md §0): primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |

## El hilo del guion: cuál y por qué

El encargo dice: «si dudas entre hilos, elige el que tenga todas las palabras con confianza ≥ 0,55». Se transcribieron por palabra las 41 tomas habladas de `1 Hooks`, `2 Mitad` y `5 Cta` (whisper small con vocabulario; la confianza de una palabra es la **menor** probabilidad de sus tokens, el criterio más estricto):

| Hilo | Hook | Mitad | CTA | ¿Pasa? |
|---|---|---|---|---|
| **Familia: de los hijos a la abuela** | HK02 «Tus hijos merecen crecer con montañas, no con tráfico.» (todas ≥ 0,56; la más baja, «con tráfico») | MD01 «La abuela también puede disfrutar de esta casa.» (≥ 0,87) | CT04 «Solicita tu recorrido virtual o presencial.» (≥ 0,85) | **sí, las tres tomas enteras** |
| Diáspora | HK06/HK07 «¿Extrañas Colombia? Esta es la razón para regresar» («Extrañas» 0,08 / 0,21) · `IMG_9420`/`9422` «Colombia te llama, ¿ya tienes dónde llegar?» («llama» 0,48-0,50) | MD06 «Llevas años en el exterior…» (5 palabras bajas: «años» 0,42, «seguro/duro» 0,42, «diciembres» 0,52, «extrañas» 0,30) | CT18 «Volver no es una idea, es una dirección. Haz clic…» («Haz» 0,54, «agendemos» 0,49) | no |
| «El error» | HK08 «El error que cometen las familias al buscar campestre.» (pasa) | MD10 «Compran lejos, se aburren del viaje…» (4 bajas) | CT03/CT08 «No cometas el mismo error…» («error» 0,02-0,43) | no |

**Se elige el de la familia** y **queda para la versión siguiente el de la diáspora**, que es el más fuerte del material: hace falta que alguien oiga «¿Extrañas?», «Colombia te llama», «trabajas duro» y «diciembres», o que Isabella regrabe esas tres frases. La V13 también fue de familia, pero con otro ángulo (los recuerdos y el patrimonio) y otras tomas; esta es la de **las tres generaciones**: los hijos (hook) → la abuela (mitad) → «ven a verla» (CTA).

## Idea en una línea

Esta casa es para la familia en la que caben todos: los hijos crecen con montañas (hook), la abuela también la disfruta (mitad), y se pide un recorrido para verlo (CTA).

## Promesa y CTA

- **Promesa (primeros 4 s):** el dron pasa en lateral por la fachada hasta la terraza; entra Isabella en el jardín: «Tus hijos merecen crecer con montañas, no con tráfico.»
- **Acción que se pide al final:** «Solicita tu recorrido virtual o presencial.» (el enlace y la forma de pedirlo van en el caption). El virtual sirve también a quien vive fuera.
- **Lo que NO se cuenta:** precio, metros, alcobas, baños, minutos o kilómetros (ni suenan ni se leen; van en el caption), rentabilidad ni valorización.

## Bloques

Tres frases de Isabella (≈ 7,6 s de voz en 38 s); el resto es la casa con música.

| Bloque | Planos | Qué es | Lo que dice | Clip |
|---|---|---|---|---|
| 1 · dron | c01 | el dron pasa en lateral por la fachada: del muro de piedra con los papiros a la terraza sobre el garaje | — (sin texto ni voz; el frame 0 es la miniatura) | DR78 `DJI_20260414173436_0078_D.MP4` |
| 2 · hook | c02 | Isabella de pie en el jardín lateral de grava, con la casa a su izquierda | «Tus hijos merecen crecer con **montañas**, no con tráfico.» | HK02 `IMG_9403` (1080p) |
| 3 · recorrido | c03 c04 c05 | el jardín con la palmera → el comedor con la mesa puesta → la sala de la terraza abierta al valle (las montañas del hook) | — | RC27 `IMG_9509` · RC24 `IMG_9506` · RC18 `IMG_9493` |
| 4 · mitad | c06 | Isabella en el sendero de grava junto a la fachada, plano cerrado al 64 % del 4K | «La **abuela** también puede disfrutar de esta casa.» | MD01 `IMG_9428` |
| 5 · recorrido | c07 c08 c09 c10 | el sillón reclinable junto al ventanal → la cama de esa alcoba → el lavamanos de cobre con su jardín interior → el mirador con el telescopio al atardecer (la vista, el plano más largo del bloque) | — | RC08 `IMG_9468` · RC09 `IMG_9469` · RC14 `IMG_9480` · RC23 `IMG_9505` |
| 6 · CTA | c11 c12 | Isabella en la entrada, junto a los papiros del parqueadero; funde a negro; tarjeta | «Solicita tu recorrido **virtual o presencial**.» | CT04 `IMG_9425` (1080p) |

**Por qué estos planos.** Después de «crecer con montañas» el paseo enseña dónde se crece: el jardín, la mesa donde se come junta la familia y la terraza que da al valle. Después de «la abuela también» enseña lo que es suyo: el sillón reclinable con la vista, la cama, un baño que se disfruta, y el mirador del telescopio, donde se juntan nietos y abuela al atardecer. El CTA vuelve a la entrada: es donde empieza una visita. **Ningún plano repite uno de la V13** (la V13 usó DR72, RC25, RC16, RC15, RC19, RC03, RC10 y RC12).

**Lo que este reparto cuesta y se declara.**
- El CTA está en el parqueadero, no en el mejor exterior de la casa (la regla del formato pide el CTA en el exterior, con la casa detrás): es la única toma de CTA cuyas palabras pasan todas el 0,55. Detrás de ella hay un Mini azul con la placa a la vista: la ventana 9:16 lo deja fuera (su borde izquierdo no baja de 0,28 del ancho).
- El hook y el CTA salen de clips de 1080p: suben ×2,13 al cuadro y saldrán más blandos que el resto (4K).
- En el hook el sol deja un destello vertical de lente a la izquierda de Isabella: la ventana no baja de 0,46 del ancho para dejarlo fuera.

## Música

*We Are* (Aleksey Chistilin), reservada en el registro de uso como V16: no está en ninguna otra versión. Elegida con `buscar-entrada.py --cta 29 35` sobre las 28 libres: entrada en **95,248 s** (golpe de 13,9 dB = frame 1), meseta de −10 LUFS con golpes fuertes cada ≈ 1,6 s (para cortar sobre ellos) y una **caída de ≈ 11 LU entre los 30 y los 35 s** de la pieza hasta un lecho de −21 LUFS que sigue con un pulso suave: ahí entra el CTA (33,0 s). El catálogo la describe como «unión, solemnidad», que es lo que dice el hilo. Es de la misma artista que la de la V13 (*Pictures from the Past*), pero otra pista. Medida, **no oída**; licencia no verificada (`HAY_MUSICA = false` es la salida si no se puede publicar).

Las alternativas medidas: *Begin Again* (caída de 18,9 dB a 32,9 s, pero solo 7 dB en LUFS), *Softly* (ternura, caída de 14,7 dB, pero 7 golpes en 30 s: poco donde cortar), *Tony Anderson – Dreamlife* (caída de 11,4 dB a 31,5 s, más baja de nivel).

## Pendientes con el usuario

- El OK a la prueba (no se exporta la final sin él).
- Oír la canción y confirmar que encaja (y la licencia).
- La nitidez del hook y el CTA (1080p ampliado).
