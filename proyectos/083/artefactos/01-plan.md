# 01 · Plan narrativo — proyecto 083 (V64)

> Variante B de la 074 (`proyectos/074` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 1094 f (36,5 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido083`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido083Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 074 → 083 (**V64**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK09 · MD09 · CT12 (la de la 074, sin cambios) · exterior DR06 |
| Canción | «Some Say», la de la 074 y con la MISMA entrada (140.700 s). **No es una versión nueva de la propiedad sino la variante B de la V55: por eso repite canción (declarado).** |
| Material | El normalizado de la 074 (`remotion/public/recorrido-083/`, clon de `recorrido-074/` y de sus hermanos): DR06 · HK09 · ZS01 · DR01 · MD09 · ZS02 · ZS03 · DR07 · DR03 · CT12 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «Las buenas inversiones empiezan con buenas decisiones» → las zonas sociales del edificio

Lo dicho es lo de la 074: Las buenas inversiones empiezan con buenas decisiones. · Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos. · Conoce esto y mucho más en Go Living Suites. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,0 | El exterior | la promesa | el edificio | DR06 0,40-3,40 s · solo música: golpe de 13.1 dB en el f3 · SIN texto ni voz |
| 2 | 3,0-6,9 | Hook | la pregunta o la tesis | Isabella | HK09 · «Las buenas inversiones empiezan con buenas decisiones.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,9-10,1 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | ZS01 + DR01 | ZS01 0,30-2,07 s (1,8 s) → DR01 1,00-2,40 s (1,4 s) · solo música, a corte |
| 4 | 10,1-16,2 | Mitad | la condición, dicha | Isabella | MD09 · «Una ubicación estratégica, amenidades y cercanía a los principales destinos turísticos.» (a corte, antes de los 11 s) |
| 5 | 16,2-31,0 | Recorrido inmersivo | cómo se vive → la vista | DR03 | ZS02 → ZS03 → DR07 → DR03 · solo música; la vista es el plano más largo (4,6 s) |
| 6 | 31,0-36,5 | CTA y cierre | invitar | Isabella | CT12 · «Conoce esto y mucho más en Go Living Suites.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f90); la mitad entra en el f303 (10,1 s, antes de los 11 s) y el CTA, en el mismo golpe de la 074 (f929).
- **Los dos planos rápidos** son ZS01 (1,8 s) y DR01 (1,4 s): empiezan en 6,9 y 8,7 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 4 planos (ZS02 → ZS03 → DR07 → DR03), cada cambio en un golpe medido; la vista (DR03) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -13.7 · dos planos rápidos -12.1 · recorrido -14.4 LUFS de la canción).

## Por confirmar al oído (R31)

1. «estratégica» (MD09, f339 = 11,3 s del vídeo, dentro de «Una ubicación estratégica», que entra en el f321): whisper la oye con confianza 0,24 («estrategica», «técnica» según el corte).
2. «esto» (CT12, f940 = 31,3 s del vídeo): whisper oye «eso» (0,03-0,34); el guion dice «esto».
3. «Go Living Suites» (CT12, f988 = 32,9 s del vídeo): whisper oye «Goblin en Suiz», «Governing suits»…; el anuncio dice «Go Living Suites». Es el nombre propio del edificio.

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
