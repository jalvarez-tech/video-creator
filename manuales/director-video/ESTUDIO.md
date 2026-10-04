# ESTUDIO · director-video — los casos concretos detrás de cada sección

> Este archivo es del **estudio** (el checkout del autor) y **no va al producto**: está en `.gitignore` como `**/ESTUDIO*.md`. Guarda lo que se quitó de `SKILL.md` para que el skill sirva a cualquier canal y a cualquier máquina —números de proyecto, nombres de clips, estado de cuentas, rutas de código privado— sin que el autor pierda el hilo de dónde salió cada regla. Cada entrada dice de qué sección de `SKILL.md` viene.

## Cabecera y frontmatter

- **Raíz del estudio:** el checkout está en la carpeta `Work/jalvarez/video-creator` del Mac del autor. En el producto la raíz es «la carpeta del repo» y no se escribe ninguna ruta absoluta.
- **Disparador quitado:** «proyecto 012» (la convocatoria APEX). En el producto es «retoma el proyecto NNN».

## §1 Mapa de recursos

- **`seedance-20`:** el skill está instalado en el `~/.claude/skills` del autor, pero **no hay suscripción de Seedance (comprobado 2026-08-05)**. Es un pack de prompt-directing, no el modelo: sin suscripción no genera nada. No se propone como alternativa ni se planifica contando con él; si algún día se contrata, vuelve a entrar como motor de respaldo para el caso del techo de 720p (§3h·1).
- **`grok-imagine` y el CLI `runapi`:** también instalados en la máquina del autor y sin uso. El flujo va directo a xAI (`grok.py`) desde que se descartó RunAPI.

## §2 Flujo — «antes del paso 0»

- «Releer cientos de líneas de JSX para mover una escena 8 frames» eran las **781 líneas de `Motion003.tsx`** (proyecto 003): el motivo por el que existen los artefactos.
- `artefactos.sh 004` era el ejemplo del atajo; ahora es `node manuales/director-video/scripts/artefactos.mjs NNN`.

## §3b Z-order

- El ejemplo de composición era el **proyecto 001**: `staticFile("avatar-9x16.mp4")` (el avatar de HeyGen del 001, también registrado en `Root.tsx` como `Avatar9x16`), `graficos001`, `MotionPropio001`, `subtitulos001`, `cues001`. En el producto son placeholders `NNN`.
- «Una noticia puede escribirse ya como `Plan` y montar `<PistaGraficos>` directamente» es lo que hace el **006** (y el 007); el 004 y el 005 usan el DSL de tomas (`TomaNoticia[]`).
- «La idea visual propia de la pieza» era **el mundo líquido del 003** (`Fondo003.tsx`, sustrato líquido que el cliente acabó cambiando por degradados planos, R12).

## §3h B-roll

- «Una noticia sobre un sismo renunció al metraje del sismo y dibujó un esquema»: es el **006** (`proyectos/006/artefactos/01-noticia.md`), el precedente de la regla de honestidad.
- «Una fachada en una ciudad concreta» era «una fachada en Medellín»; los ejemplos de banco (`grieta en la pared`, `obra gris en medellin`, tomas `n08b`/`n11`, la ruta `broll/006/n08b-grieta-en-la-pared.jpg` que citaba el manual) vienen del 006.

## §3i Montaje (todo el bloque salió de 009 · 010 · 011 · 015)

- **Quién marca el tiempo:** la voz → el **010** (los beats salen de la transcripción por palabra) · la voz dentro de las tomas → el **015** (Isabella, nueve tomas, R29) · los golpes de la música → el **011** (`proyectos/011/musica/golpes-011.json`, cada corte a ≤2 f de un golpe) · los propios cortes → el **009** (cada cartel entra y muere con su plano).
- **El fundido audible de 2-3 s con el rótulo del acto** al cambiar de canción es una **preferencia del cliente del 011** (Turning Page → El Preso en el 1:18, con «Y ahora… ¡LA FIESTA!»): un corte limpio en un respiro no le bastó. En el producto va como valor por defecto.
- **Normalización:** las recetas reales son `proyectos/010/normalizar.sh`, `proyectos/011/normalizar.sh` y `proyectos/015/normalizar.sh` (macOS, VideoToolbox). En el producto la receta se cita como `proyectos/NNN/normalizar.mjs`; las del estudio siguen siendo `.sh` y funcionan en el Mac.
- «Las fotos eran más nítidas que los vídeos y por eso sostenían los momentos quietos»: **010** (material del cliente de Chocó).
- «En un documental sobrio, un flash no compila»: en el **010** `Corte<E>` está cerrado a las entradas del encargo.
- **Velos:** 009 arriba · 010 arriba y abajo · 011 ninguno. **Entradas propias de una pieza:** el whip y el flash del **009** (viven en `remotion/src/proyectos/009/`, llegan por `entradas`).
- **Los tres fallos que la revisión por frames no ve:** la franja negra del encuadre → el **009** salió publicado con dos franjas de unos frames (`c04` y `c08`), declaradas en su puerta · la disolvencia sin metraje previo → el **010** repite unos 9 frames al cortar de `c10` a `c11`, publicado y declarado · la velocidad a oído → la paró la puerta del **010** (R20).
- «El frame 0 es la miniatura»: **011**. «La hoja de contactos del render dice cuál es el plano más flojo de treinta»: **010**. «Sin voz no hay ducking y los niveles del motor dejan la pieza muda; se levantan con un factor declarado»: **009**.
- Las frases de encargo del ejemplo de §5 («2 minutos», «la música cambia en el 1:18») son el encargo literal del **011**.
- **Puntos 7 y 8 (versiones y de la prueba a la final):** el **018** es la V2 del reel del **017** (otro hook HK07, otra mitad MD07, otro CTA CT01 y otra canción); el registro de versiones y «cómo cambiar cada pieza» están en `proyectos/018/combinaciones.md` y `proyectos/017/combinaciones.md`. Cambiar la toma de los 30,6 s por RC25 («Exterior edificio4», pedido por el usuario) arrastró la receta de normalizado, el color del plano (luma 156, el más claro) y los nombres de los pulsos (`P.bloques`, `P.cielo`, `P.vista`); y repite ≈ 1,5 s de RC25 y ≈ 3 s de RC07 del 017, que informa la sección 9b de `proyectos/018/revisar-018.mjs`. La final del 018 (2026-10-04, tras «renderiza el video»): CRF 12 `slower` (175 MB) y CRF 16 `slow` (96 MB), con las etiquetas de color arregladas (el master HQ salió sin `colr`; el de CRF 16, completo) y color a ≤ 0,5 niveles del still.

## §5b Marca

- **Marcas del estudio:** `remotion/src/marcas/luxur.ts` (Propiedades Luxur, inmobiliaria en Colombia: 001-007 y 012-015), `choco.ts` (campaña «Ayudemos a Chocó», 008 y 010) y `streetcats.ts` (Street Cats, 009). Las tres están ignoradas en el producto; el producto trae `ejemplo.ts`.
- **Los ejemplos de código de §5b por proyecto:** `<PistaNoticia tomas marca={LUXUR}>` → 004 y 005 · `capa(dialectoEditorialDe(LUXUR), "noticia")` → 006 y 007 · `<PistaMetraje marca={CANAL}>` → 009 (streetcats) y 010 (choco) · `<PistaMetraje look={LOOK_011}>` → la boda de María & Daniel (011), sin sello.
- **`revisar-marca.mjs` del estudio:** importa `marcas/luxur` y `proyectos/004`, `006` y `007` (líneas 60-74 del script) para comprobar los invariantes de Luxur sobre sus noticias. En el producto eso no arranca: el script tiene que partirse en invariantes del motor (contra `ejemplo.ts`) e invariantes del estudio (fichero ignorado). Hasta entonces, en el estudio se sigue lanzando tal cual.
- «Dos tandas del MISMO código ya difieren en los frames con fotos o con blur»: medido **al subir `PistaMetraje` al motor (PR #9)**: 4 de 138 stills cambiaron entre dos tandas idénticas (memoria `verificar-pixel-identico`).

## §6 Formato de respuesta

- «`proyectos/NNN/normalizar.mjs`»: en el estudio, los proyectos 010/011/015 tienen `normalizar.sh`.
