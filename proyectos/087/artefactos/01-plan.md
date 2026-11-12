# 01 · Plan narrativo — proyecto 087 (V68)

> Variante B de la 078 (`proyectos/078` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 991 f (33,0 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido087`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido087Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 078 → 087 (**V68**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK07 · MD02 · CT03 (la de la 078, sin cambios) · exterior DR09 |
| Canción | «Ivory Skyline Reverie», la de la 078 y con la MISMA entrada (157.533 s). **No es una versión nueva de la propiedad sino la variante B de la V59: por eso repite canción (declarado).** |
| Material | El normalizado de la 078 (`remotion/public/recorrido-087/`, clon de `recorrido-078/` y de sus hermanos): DR09 · HK07 · ZS03 · RC11 · MD02 · ZS02 · RC03 · RC05 · RC07 · CT03 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «No se trata solo de comprar una propiedad» → una oportunidad en El Poblado

Lo dicho es lo de la 078: No se trata solo de comprar una propiedad. · No todas las propiedades tienen las mismas condiciones para operar turísticamente. · Conoce esta oportunidad en El Poblado. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,7 | El exterior | la promesa | el edificio | DR09 4,80-7,53 s · solo música: golpe de 13.3 dB en el f3 · SIN texto ni voz |
| 2 | 2,7-6,0 | Hook | la pregunta o la tesis | Isabella | HK07 · «No se trata solo de comprar una propiedad.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,0-10,7 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | ZS03 + RC11 | ZS03 2,80-5,07 s (2,3 s) → RC11 5,55-8,02 s (2,5 s) · solo música, a corte |
| 4 | 10,7-16,0 | Mitad | la condición, dicha | Isabella | MD02 · «No todas las propiedades tienen las mismas condiciones para operar turísticamente.» (a corte, antes de los 11 s) |
| 5 | 16,0-27,8 | Recorrido inmersivo | cómo se vive → la vista | RC07 | ZS02 → RC03 → RC05 → RC07 · solo música; la vista es el plano más largo (3,4 s) |
| 6 | 27,8-33,0 | CTA y cierre | invitar | Isabella | CT03 · «Conoce esta oportunidad en El Poblado.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f82); la mitad entra en el f321 (10,7 s, antes de los 11 s) y el CTA, en el mismo golpe de la 078 (f834).
- **Los dos planos rápidos** son ZS03 (2,3 s) y RC11 (2,5 s): empiezan en 6,0 y 8,2 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 4 planos (ZS02 → RC03 → RC05 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -11.7 · dos planos rápidos -11 · recorrido -11.8 LUFS de la canción).

## Por confirmar al oído (R31)

1. «solo de» (HK07, f104 = 3,5 s del vídeo): whisper oye «sólo hay que» (confianza 0,27 / 0,45) y, en un corte desde 1,585 s, también «sólo hay que»; el catálogo lo lee «solo de». Las dos lecturas tienen 2-3 sílabas en los 0,3 s que hay entre «solo» y «comprar»: la energía no las distingue (`onsets-voz.py`). Si dice «solo hay que comprar una propiedad» el trozo cambia a «solo hay que».
2. «Conoce» (CT03, f845 = 28,2 s del vídeo): whisper oye «Conocer» (0,24) y en un corte aislado «Conocí»; por el contexto («esta oportunidad») es el imperativo «Conoce».

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
