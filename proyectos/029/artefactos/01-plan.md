# 01 · Plan narrativo — proyecto 029 · Casa Campestre Guarne (V13)

> Paso 1 de 3. Siguiente: [02-layout.md](02-layout.md) · [03-timeline.md](03-timeline.md).
> El código sale de aquí: `remotion/src/proyectos/029/` · puerta `node proyectos/029/revisar-029.mjs`.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Encargo (2026-10-08) | «Crea un video cinematográfico que rompa el scroll tipo reel para promocionar la propiedad [Casa Campestre en Venta con Vista Panorámica, Guarne]. Los videos están en `5 Cta`, en 16:9, necesito encuadrarlos en 9:16, sube la voz en off sin saturar y utiliza canciones que no estén en otros videos; al final coloriza.» |
| Material | SOLO las 19 tomas de `Casa Campestre - Duglas Yovana/Videos/5 Cta/` (`IMG_9411`…`IMG_9532`): 16:9 sin rotación, SDR BT.709, 1080p a 59,94/60 fps (10) o 4K a 30 fps (9), con la voz de Isabella en el audio. No hay recorrido mudo, ni dron, ni voz en off |
| Composición | `Recorrido029` · 1080×1920 · **30 fps** · 783 f (26,1 s) |
| Formato | 9:16 vertical. Los 16:9 se encuadran en `normalizar.mjs` con una ventana vertical que SIGUE a Isabella (Vision + `encuadre.py`) |
| Estilo | **Cinematográfico** (director §4): cámara lenta de apertura, empuje lento por plano, disolvencias largas entre frases, color graduado, música con golpe en el frame 1 |
| Texto | **editorial** (el modo de Luxur: Montserrat + Playfair itálica, sin sombra), abajo |
| Marca | Luxur. Reglas fijas (`recorrido-luxur` SKILL.md §0): primera toma sin texto ni voz · nunca el sello · cierre en tarjeta oscura con el logo (440 px, 60 %) y `PropiedadesLuxur.com` · nada se congela |
| Propiedad (ficha de la web, 2026-10-08) | Guarne, Antioquia · lote de 2.413 m² · 5 alcobas · 6 baños · 2 parqueaderos · 2025 · COP 3.000 millones · a 300 m de la autopista Medellín-Bogotá («30-40 min al centro de Medellín y 15 km al aeropuerto») · jacuzzi, zona BBQ, portería 24 h, pet friendly, rooftop. **Ninguna cifra sale en el vídeo** (la ficha va en el caption) |

## Idea en una línea

Esta casa es para la familia que quiere que la infancia de sus hijos pase «respirando distinto» y para quien quiere volver con una dirección.

## Promesa y CTA

- **Promesa (primeros 3 s):** una finca con cielo y montaña, ella llegando a cámara lenta, y su primera frase: «La infancia pasa rápido». El hook es una emoción, no una descripción.
- **Acción que se pide al final:** «Haz clic en el enlace y agendemos su visita. Puede ser virtual o presencial.» (el enlace es el de la bio; la frase es suya, de la toma `IMG_9531`).
- **Lo que NO se cuenta:** precio, metros, número de alcobas (ni suenan ni se leen; van en el caption), rentabilidad ni valorización.

## Escenas (seis frases, una por sitio)

Las frases son de Isabella, las que dijo en `5 Cta`. Se eligieron las que NO son un CTA (los otros 12 clips repiten «haz clic en el enlace…») y se ordenaron por significado, no por el paseo (no hay recorrido que seguir): emoción → promesa → lo que lo hace posible → cómo se vive → lo que vale → la dirección y el clic.

| # | Plano | Sitio | Narrativa | Lo que dice | Clip |
|---|---|---|---|---|---|
| 0 | c01 | camino de la finca, cielo y montaña | hook visual (sin voz ni texto) | — | CT05 `IMG_9426` (0-1 s, ×0,5) |
| 1 | c02 | terraza de la sala (sillón de mimbre) | hook | «La infancia pasa **rápido**.» | CT14 `IMG_9516` |
| 2 | c03 | sala abierta con vidrio | promesa | «Tu familia merece **respirar distinto**.» | CT07 `IMG_9436` |
| 3 | c04 | jardín (palmera, hojas anchas) | explicación | «Diseño moderno, naturaleza **y privacidad**.» | CT01 `IMG_9411` |
| 4 | c05 | sala de la tele (sillón verde) | cómo se vive | «Una casa donde todos caben **cómodos**.» | CT09 `IMG_9441` |
| 5 | c06 | alcoba principal | lo que vale | «Esta no es solo una casa, **es patrimonio**.» | CT16 `IMG_9524` |
| 6 | c07 | jardín con la puesta de sol | revelación + CTA | «Volver no es una idea, **es una dirección**. Haz clic en el enlace y agendemos **su visita**. Puede ser virtual o presencial.» | CT18 `IMG_9531` |
| 7 | c08 | tarjeta oscura | cierre | (silencio) logo + `PropiedadesLuxur.com` | — |

Las tomas descartadas y por qué: CT10-12 (`IMG_9442-9444`): la tele encendida con dibujos animados sale en el encuadre y la frase no se entiende; CT13 (`IMG_9513`): ella lejos, al fondo; CT08: igual; CT03/CT08 «No cometas el mismo error»: sin contexto no dice de qué error; CT15/CT19: dobles de las usadas.

## Música

*Pictures from the Past* (Aleksey Chistilin), reservada en el registro de uso (V13): no está en ninguna otra versión. Golpe de 13,3 dB en su 57,056 s = frame 1, meseta de −12 dB, caída de ≈ 10 dB desde 75 s que cae sobre «haz clic… su visita». Medida, **no oída**; licencia no verificada (`HAY_MUSICA = false` es la salida si no se puede publicar).

## Pendientes con el usuario

- «**solo**» de «Esta no es solo una casa» (CT16): whisper oye «no es la una casa» en esta toma y «no solo una casa» en su doble (CT15). Sentido y cuenta de sílabas dicen «solo»; **sin oír**. La puerta `--final` falla mientras esté la nota.
- Oír la canción y confirmar que encaja (y la licencia).
- Si «canciones» era plural a propósito (otra para el cierre): cambiaría el apagado final.
