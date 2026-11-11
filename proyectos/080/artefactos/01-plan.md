# 01 · Plan narrativo — proyecto 080 (V61)

> Variante B de la 071 (`proyectos/071` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 950 f (31,7 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido080`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido080Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 071 → 080 (**V61**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK08 · MD06 · CT09 (la de la 071, sin cambios) · exterior DR08 |
| Canción | «Heaven on Earth», la de la 071 y con la MISMA entrada (178.000 s). **No es una versión nueva de la propiedad sino la variante B de la V52: por eso repite canción (declarado).** |
| Material | El normalizado de la 071 (`remotion/public/recorrido-080/`, clon de `recorrido-071/` y de sus hermanos): DR08 · HK08 · RC08 · RC03 · MD06 · RC09 · RC02 · RC05 · RC06 · RC07 · CT09 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «Tu inversión no debería convertirse en otro trabajo» → una suite hotelera con operadores turísticos listos para ti

Lo dicho es lo de la 071: Tu inversión no debería convertirse en otro trabajo. · Una suite hotelera con operadores turísticos listos para ti. · Hablemos y conoce tus opciones de inversión. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,9 | El exterior | la promesa | el edificio | DR08 0,50-3,37 s · solo música: golpe de 10.2 dB en el f3 · SIN texto ni voz |
| 2 | 2,9-6,9 | Hook | la pregunta o la tesis | Isabella | HK08 · «Tu inversión no debería convertirse en otro trabajo.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,9-10,9 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | RC08 + RC03 | RC08 0,20-2,07 s (1,9 s) → RC03 3,40-5,57 s (2,2 s) · solo música, a corte |
| 4 | 10,9-15,2 | Mitad | la condición, dicha | Isabella | MD06 · «Una suite hotelera con operadores turísticos listos para ti.» (a corte, antes de los 11 s) |
| 5 | 15,2-26,3 | Recorrido inmersivo | cómo se vive → la vista | RC07 | RC09 → RC02 → RC05 → RC06 → RC07 · solo música; la vista es el plano más largo (3,0 s) |
| 6 | 26,3-31,7 | CTA y cierre | invitar | Isabella | CT09 · «Hablemos y conoce tus opciones de inversión.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f86); la mitad entra en el f328 (10,9 s, antes de los 11 s; `desde` 2 f para que la frase quepa entre este golpe y el del f457) y el CTA, en el mismo golpe de la 071 (f790).
- **Los dos planos rápidos** son RC08 (1,9 s) y RC03 (2,2 s): empiezan en 6,9 y 8,8 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 5 planos (RC09 → RC02 → RC05 → RC06 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -13.4 · dos planos rápidos -15.1 · recorrido -13.1 LUFS de la canción).
- **Golpe de entrada más flojo (10.2 dB, heredado de la 071)**: la puerta lo admite declarado (`fuerzaMinEntrada`).

## Por confirmar al oído (R31)

1. «Una suite hotelera» (MD06, f342 = 11,4 s del vídeo): whisper oye «Un asfito atelera» (confianza baja) y solo desde «con» en adelante entiende la frase; la lectura sale del contexto (el anuncio, el CTA de esta suite y la métrica de sílabas: «u-na sui-te ho-te-le-ra» son 7 entre 0,53 y 1,52 s).
2. «todo» en el hook (HK08, f157 = 5,2 s del vídeo): el corte final de whisper oye «en todo otro trabajo»; los cortes parciales oyen «en otro trabajo». Se pintó «convertirse en otro trabajo».

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
