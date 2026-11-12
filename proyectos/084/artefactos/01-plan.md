# 01 · Plan narrativo — proyecto 084 (V65)

> Variante B de la 075 (`proyectos/075` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 1140 f (38,0 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido084`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido084Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 075 → 084 (**V65**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK06 · MD03 · CT08 (la de la 075, sin cambios) · exterior DR10 |
| Canción | «Street Level Sessions on the Green», la de la 075 y con la MISMA entrada (167.500 s). **No es una versión nueva de la propiedad sino la variante B de la V56: por eso repite canción (declarado).** |
| Material | El normalizado de la 075 (`remotion/public/recorrido-084/`, clon de `recorrido-075/` y de sus hermanos): DR10 · HK06 · RC06 · RC09 · MD03 · RC12 · RC08 · RC02 · RC01 · RC07 · CT08 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «¿Y si tu próxima propiedad también pudiera generar ingresos?» → una suite totalmente equipada, a puerta cerrada

Lo dicho es lo de la 075: ¿Y si tu próxima propiedad también pudiera generar ingresos? · Una suite hotelera, totalmente equipada en El Poblado. · Agendemos una visita y descubre Go Living Suites. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,4 | El exterior | la promesa | el edificio | DR10 0,30-3,73 s · solo música: golpe de 14.6 dB en el f3 · SIN texto ni voz |
| 2 | 3,4-7,3 | Hook | la pregunta o la tesis | Isabella | HK06 · «¿Y si tu próxima propiedad también pudiera generar ingresos?» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 7,3-10,7 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | RC06 + RC09 | RC06 4,40-6,17 s (1,8 s) → RC09 1,80-3,43 s (1,6 s) · solo música, a corte |
| 4 | 10,7-15,0 | Mitad | la condición, dicha | Isabella | MD03 · «Una suite hotelera, totalmente equipada en El Poblado.» (a corte, antes de los 11 s) |
| 5 | 15,0-32,2 | Recorrido inmersivo | cómo se vive → la vista | RC07 | RC12 → RC08 → RC02 → RC01 → RC07 · solo música; la vista es el plano más largo (5,1 s) |
| 6 | 32,2-38,0 | CTA y cierre | invitar | Isabella | CT08 · «Agendemos una visita y descubre Go Living Suites.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f103); la mitad entra en el f322 (10,7 s, antes de los 11 s; `desde` 2 f para que la frase quepa entre este golpe y el del f449) y el CTA, en el mismo golpe de la 075 (f966).
- **Los dos planos rápidos** son RC06 (1,8 s) y RC09 (1,6 s): empiezan en 7,3 y 9,1 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 5 planos (RC12 → RC08 → RC02 → RC01 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -10.7 · dos planos rápidos -9.9 · recorrido -10.9 LUFS de la canción).

## Por confirmar al oído (R31)

1. «Y» inicial del hook (HK06, f113 = 3,8 s del vídeo): whisper la oye con confianza 0,37; sin ella sería «Si tu próxima propiedad…».
2. «hotelera» (MD03, f342 = 11,4 s del vídeo): whisper la oye con confianza 0,13 («hotelera» sale «hotelera» en la toma entera).
3. «Poblado» (MD03, f404 = 13,5 s del vídeo): whisper la oye con confianza 0,20 («Poblado», «polado» o «poblado» según el corte).
4. «Agendemos» (CT08, f977 = 32,6 s del vídeo): whisper oye «Ajenlemos» (0,14).
5. «Go Living Suites» (CT08, f1038 = 34,6 s del vídeo): whisper oye «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
