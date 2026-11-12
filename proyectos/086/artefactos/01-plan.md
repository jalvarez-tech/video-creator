# 01 · Plan narrativo — proyecto 086 (V67)

> Variante B de la 077 (`proyectos/077` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 936 f (31,2 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido086`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido086Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 077 → 086 (**V67**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK03 · HK05 · CT04 (la de la 077, sin cambios) · exterior DR04 |
| Canción | «Light Fills the Room», la de la 077 y con la MISMA entrada (178.067 s). **No es una versión nueva de la propiedad sino la variante B de la V58: por eso repite canción (declarado).** |
| Material | El normalizado de la 077 (`remotion/public/recorrido-086/`, clon de `recorrido-077/` y de sus hermanos): DR04 · HK03 · ZS02 · RC08 · HK05 · RC11 · ZS01 · ZS05 · DR05 · CT04 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «Antes de invertir en Airbnb, hay algo que debes saber» → un edificio con operación hotelera establecida

Lo dicho es lo de la 077: Antes de invertir en Airbnb, hay algo que debes saber. · Descubre una suite en un edificio con operación hotelera establecida. · Si quieres más información, contáctame. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,0 | El exterior | la promesa | el edificio | DR04 2,20-5,20 s · solo música: golpe de 18.9 dB en el f3 · SIN texto ni voz |
| 2 | 3,0-7,1 | Hook | la pregunta o la tesis | Isabella | HK03 · «Antes de invertir en Airbnb, hay algo que debes saber.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 7,1-10,0 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | ZS02 + RC08 | ZS02 5,40-6,77 s (1,4 s) → RC08 3,20-4,73 s (1,5 s) · solo música, a corte |
| 4 | 10,0-14,3 | Mitad | la condición, dicha | Isabella | HK05 · «Descubre una suite en un edificio con operación hotelera establecida.» (a corte, antes de los 11 s) |
| 5 | 14,3-26,4 | Recorrido inmersivo | cómo se vive → la vista | DR05 | RC11 → ZS01 → ZS05 → DR05 · solo música; la vista es el plano más largo (3,5 s) |
| 6 | 26,4-31,2 | CTA y cierre | invitar | Isabella | CT04 · «Si quieres más información, contáctame.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f90); la mitad entra en el f301 (10,0 s, antes de los 11 s; `desde` 2 f para que la frase quepa entre este golpe y el del f430) y el CTA, en el mismo golpe de la 077 (f793).
- **Los dos planos rápidos** son ZS02 (1,4 s) y RC08 (1,5 s): empiezan en 7,1 y 8,5 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 4 planos (RC11 → ZS01 → ZS05 → DR05), cada cambio en un golpe medido; la vista (DR05) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -11.9 · dos planos rápidos -12.2 · recorrido -12.3 LUFS de la canción).

## Por confirmar al oído (R31)

1. «Descubre una suite» (HK05 como mitad, f310 = 10,3 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que se oye «nezit».
2. «hotelera» (HK05 como mitad, f381 = 12,7 s del vídeo): whisper la oye con confianza 0,51.
3. «contáctame» (CT04, f837 = 27,9 s del vídeo): whisper oye «contacta a mí» (0,42-0,50).

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
