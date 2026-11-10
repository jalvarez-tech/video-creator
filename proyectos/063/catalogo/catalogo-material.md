# Catálogo — Lote en San Vicente Ferrer (vereda La Porquera)

> Rodaje de Isabella Cadavid, 2026-09-11. Material en `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote San Vicente Ferrer/Videos/`.
> Catalogado el 2026-10-22 (ffprobe + whisper small). Lo usan **V45 (063)**, **V46 (064)** y **V47 (065)**.
> El reparto manda: [`reparto-063-065.md`](../reparto-063-065.md).
>
> ⚠️ **Actualizado el 2026-10-22 por la tarde**: el usuario dejó en `3 Dron` **solo los cuatro mejores** (quitó cinco, entre ellos los cuatro apaisados) y movió `medio2.mp4` de `2 Mitad` a `1 Hooks` como **`Hook5.mp4`**. Además, `hook4.mp4` resultó ser **copia exacta** de `Hook1.mp4`. Las tablas de abajo ya reflejan el material real.

## La ficha (web, 2026-10-22)

| Campo | Valor |
|---|---|
| Título | Lote en Venta en San Vicente Ferrer con Derecho de Acueducto |
| Negocio | **Venta** |
| Precio | **COP 350 M**, negociable |
| Área | **3.244 m²** |
| Ubicación | Vereda **La Porquera**, San Vicente Ferrer, Antioquia |
| Distancias | ~1 hora de Medellín · **15 minutos de la autopista Medellín-Bogotá** |
| Servicios | **derecho de acueducto incluido**; la web no menciona energía |
| Papeles | **escrituras al 100 %** |
| Topografía | mixta: zonas planas y de ladera |
| Parcelación | abierta, **sin portería** |
| A quién le encaja | quien compra tierra cerca de Medellín, familias que proyectan casa campestre (sujeto a normas y permisos), compradores que valoran papeles claros, inversionistas de tierra |

**Lo que la web NO dice y por tanto no se afirma en pantalla**: energía, uso del suelo y tipo de vía de acceso. El uso «depende de las características del lote y la normativa aplicable»: nada de prometer que se puede construir X.

## Dos cosas de formato que cambian el montaje

**1. No hay recorrido a pie.** No existe la carpeta `4 Recorrido`: en un lote el metraje de la propiedad **es el dron**. Los bloques de «recorrido» del formato se cubren con tramos de dron.

**2. Las tomas de Isabella son ANAMÓRFICAS.** Las 13 (hooks, mitades y CTA) son `1920×1080` con **SAR 81:256**, es decir **verticales comprimidas** de 9:16 reales (607,5×1080 efectivos). **Se escalan enteras con `setsar=1`; NUNCA se recortan**: un crop sobre ellas es un zoom ×3,2 y se ven pixeladas. Mira el SAR en ffprobe antes de decidir cualquier encuadre. Todas van a **30 fps** (`cta3` a 29,97).

Los **drones son 4K a 29,97 fps y sin audio** → `setpts=PTS*1000/1001` antes de `fps=30`. Ojo: **cinco son verticales** (`rotation=90`, 2160×3840 al rotar) y **cuatro son apaisados de verdad** (16:9, sin rotación), que sí hay que encuadrar para el 9:16.

## Hooks (`1 Hooks`) — 5 archivos, **4 frases**

| Código | Clip | Dura | Dice (whisper small) | Ángulo |
|---|---|---|---|---|
| HK01 | `Hook1.mp4` | 12,7 s | «El error no es comprar un lote barato, es comprarlo sin todas las acometidas legales. **Ven, te enseño cómo evitar esto.**» | el error / los papeles |
| HK02 | `Hook2.mp4` | 16,8 s | «¿Un lote cerca de Medellín por 350 millones? Sí, y tiene 3.244 metros cuadrados. **Ven, te muestro.**» | precio y tamaño |
| HK03 | `Hook3.mp4` | 20,8 s | «3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones. **Ven, te muestro.**» | ubicación y precio |
| HK05 | `Hook5.mp4` (era `2 Mitad/medio2.mp4`) | 17,7 s | «No necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados. **Ven, te muestro**, este es un [precio] de lote.» | la distancia |
| ~~HK04~~ | ~~`hook4.mp4`~~ | 12,7 s | **DESCARTADA: es copia exacta de `Hook1.mp4`** — mismos tiempos palabra a palabra, no es otra toma | — |

**Las cuatro frases acaban invitando a mirar** («ven, te muestro» / «ven, te enseño cómo»). Esa coletilla se **corta aparte** y se usa como puente al dron: los tiempos exactos están en el reparto, y los JSON con tiempos por palabra en [`transcripciones/`](transcripciones/).

⚠️ whisper oye «vente enseño», «20 muestros» y «20 maestros»: es «**ven, te enseño**» y «**ven, te muestro**». HK02, HK03 y HK05 **llevan cifras** (3.244 m², 350 M) → si van en pantalla, se escriben.

## Mitades (`2 Mitad`) — **solo queda una**

| Código | Clip | Dura | Dice |
|---|---|---|---|
| MD01 | `Medio3.mp4` | 13,7 s | «Antes de enamorarte de un lote, [fíjate] en tres cosas: **ubicación, agua y escrituras** (6,64-8,80 s). Y este lote empieza con todas esas cosas sobre la mesa.» |

⚠️ whisper oye «empieza con tres cosas»: casi seguro «**fíjate en tres cosas**» → **hay que oírlo**. La enumeración del centro es la que se acompaña con rótulos en la 063.

## CTA (`5 Cta`) — 7 tomas, 6 frases

| Código | Clip | Dura | Dice |
|---|---|---|---|
| CT01 | `cta1.mp4` | 9,5 s | «Comenta "lote" y te envío toda la información para que vengas y lo conozcas.» |
| CT02 | `cta2.mp4` | 11,2 s | «¿Quieres saber si este lote se ajusta a tu presupuesto? Escríbeme y te envío toda la información.» |
| CT03 | `cta3.mp4` | 15,8 s | «Si estás buscando tierra cerca de Medellín, escríbeme y te envío todos los detalles para que conozcas este asombroso lote.» |
| CT04 | `cta4.mp4` | 14,0 s | «Haz clic en el botón y te envío toda la información del lote.» |
| CT05 | `cta5.mp4` | 9,4 s | «¿Lo comprarías para construir o para invertir? Te leo en los comentarios.» |
| CT06 | `cta5 (2).mp4` | 11,6 s | «…y agendemos una visita para que conozcas ese hermoso lote en San Vicente Ferrer.» — **entra cortada**: empieza a media frase |
| CT07 | `cta6.mp4` | 15,3 s | «¿Quieres conocer esta hermosa vista? Haz clic en el botón y agendemos una visita para que conozcas este lote en San Vicente Ferrer.» — **lleva una coletilla delante** («y yo creo que un poquito, oye»): hay que recortarla |

## Drones (`3 Dron`) — los cuatro que dejó el usuario

Hoja de contactos: [`hoja-drones.png`](hoja-drones.png) — cinco momentos de cada clip (10 %, 30 %, 50 %, 70 % y 90 %), una fila por clip, en el orden de [`indice-drones.txt`](indice-drones.txt).

| Código | Clip | Dura | Qué se ve |
|---|---|---|---|
| DR01 | `…0114_D.MP4` | 73,5 s | el más largo: el lote con el **horizonte, las casas y las montañas** al fondo; avanza y baja hasta una casa blanca con patio |
| DR02 | `…0115_D.MP4` | 31,2 s | las **cercas vivas en «V»** y el cultivo en hilera del vecino; plano más cerrado |
| DR03 | `…0125_D.MP4` | 45,1 s | de la **ladera con cultivo** a la **parte plana**; incluye un cenital. Es el que mejor cuenta la «topografía mixta» |
| DR04 | `…0126_D.MP4` | 33,1 s | la parte plana con los **árboles florecidos** (blancos) y la cerca viva: el más bonito |

**Todos son verticales** (`rotation=90`, 2160×3840 al rotar), 4K, **29,97 fps** y sin audio → `setpts=PTS*1000/1001` antes de `fps=30`. Ya **no hay ningún apaisado** que encuadrar: el usuario quitó esos cinco clips.

Son 183 s para tres piezas, así que **DR01 se reparte en tres tramos disjuntos** (ver el reparto). Ninguno está medido: la versión que use un clip mira el tramo y lo anota.
