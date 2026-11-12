# 01 · Plan narrativo — proyecto 085 (V66)

> Variante B de la 076 (`proyectos/076` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 958 f (31,9 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido085`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido085Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 076 → 085 (**V66**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK02 · MD04 · CT06 (la de la 076, sin cambios) · exterior DR10 |
| Canción | «Luxury, Elegance, Refined», la de la 076 y con la MISMA entrada (147.733 s). **No es una versión nueva de la propiedad sino la variante B de la V57: por eso repite canción (declarado).** |
| Material | El normalizado de la 076 (`remotion/public/recorrido-085/`, clon de `recorrido-076/` y de sus hermanos): DR10 · HK02 · ZS01 · RC11 · MD04 · ZS05 · ZS02 · RC08 · RC07 · CT06 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «Una buena inversión empieza por la tranquilidad» → una suite con ubicación estratégica y vocación turística

Lo dicho es lo de la 076: Una buena inversión empieza por la tranquilidad. · Invierte en una suite con vocación turística y ubicación estratégica. · Agenda una visita y descubre su potencial de inversión. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,9 | El exterior | la promesa | el edificio | DR10 4,07-6,97 s · solo música: golpe de 18.5 dB en el f3 · SIN texto ni voz |
| 2 | 2,9-6,3 | Hook | la pregunta o la tesis | Isabella | HK02 · «Una buena inversión empieza por la tranquilidad.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,3-10,6 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | ZS01 + RC11 | ZS01 3,50-5,70 s (2,2 s) → RC11 0,20-2,30 s (2,1 s) · solo música, a corte |
| 4 | 10,6-15,4 | Mitad | la condición, dicha | Isabella | MD04 · «Invierte en una suite con vocación turística y ubicación estratégica.» (a corte, antes de los 11 s) |
| 5 | 15,4-26,1 | Recorrido inmersivo | cómo se vive → la vista | RC07 | ZS05 → ZS02 → RC08 → RC07 · solo música; la vista es el plano más largo (3,5 s) |
| 6 | 26,1-31,9 | CTA y cierre | invitar | Isabella | CT06 · «Agenda una visita y descubre su potencial de inversión.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f87); la mitad entra en el f317 (10,6 s, antes de los 11 s) y el CTA, en el mismo golpe de la 076 (f782).
- **Los dos planos rápidos** son ZS01 (2,2 s) y RC11 (2,1 s): empiezan en 6,3 y 8,5 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 4 planos (ZS05 → ZS02 → RC08 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -15.1 · dos planos rápidos -14.6 · recorrido -15.6 LUFS de la canción).

## Por confirmar al oído (R31)

1. La interjección RECORTADA al principio de HK02 (1,22-1,53 s de la toma, antes del primer plano de esta pieza): whisper la oye «Hoy,» (0,81) y, cortando desde 1,215 s, «Hoy, una buena inversión…». Se quita porque el catálogo da la frase sin ella y el hueco de −60 dB que la separa de «una» (1,57-1,61 s) permite un corte limpio; si Isabella dijo otra cosa y se la quiere oír, hay que cambiar `VENTANA_VOZ` de `normalizar.mjs`.
2. «ubicación» y «estratégica» (MD04, f411 = 13,7 s del vídeo): whisper las oye «y ubicaciones estratégicas» (plural) y «en la educación estratégica» en cortes distintos; la lectura es «ubicación estratégica» (el anuncio la usa: «a unos metros de la Avenida El Poblado»).
3. «Agenda» y «una» (CT06, f794 = 26,5 s del vídeo): whisper oye «Ag» (0,36) y «una» (0,56); la «A» es muy suave (−57 → −40 dB en 20 ms). Sin ella sería «genda una visita».

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
