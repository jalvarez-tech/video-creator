# 01 · Plan narrativo — proyecto 082 (V63)

> Variante B de la 073 (`proyectos/073` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 1229 f (41,0 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido082`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido082Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 073 → 082 (**V63**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK10 · MD01 · CT10 (la de la 073, sin cambios) · exterior DR09 |
| Canción | «Chillin' (Chillstep Mix)», la de la 073 y con la MISMA entrada (259.167 s). **No es una versión nueva de la propiedad sino la variante B de la V54: por eso repite canción (declarado).** |
| Material | El normalizado de la 073 (`remotion/public/recorrido-082/`, clon de `recorrido-073/` y de sus hermanos): DR09 · HK10 · DR02 · RC10 · MD01 · RC12 · RC02 · RC03 · RC11 · RC06 · RC07 · CT10 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «¿Vives fuera de Colombia y quieres invertir en Medellín?» → una suite hotelera con matrícula independiente

Lo dicho es lo de la 073: ¿Vives fuera de Colombia y quieres invertir en Medellín? · Una suite hotelera, con matrícula independiente, en edificios con reconocimiento. · Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-3,1 | El exterior | la promesa | el edificio | DR09 2,00-5,10 s · solo música: golpe de 22.2 dB en el f3 · SIN texto ni voz |
| 2 | 3,1-6,8 | Hook | la pregunta o la tesis | Isabella | HK10 · «¿Vives fuera de Colombia y quieres invertir en Medellín?» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,8-10,5 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | DR02 + RC10 | DR02 1,00-2,60 s (1,6 s) → RC10 0,00-2,07 s (2,1 s) · solo música, a corte |
| 4 | 10,5-16,2 | Mitad | la condición, dicha | Isabella | MD01 · «Una suite hotelera, con matrícula independiente, en edificios con reconocimiento.» (a corte, antes de los 11 s) |
| 5 | 16,2-33,8 | Recorrido inmersivo | cómo se vive → la vista | RC07 | RC12 → RC02 → RC03 → RC11 → RC06 → RC07 · solo música; la vista es el plano más largo (4,7 s) |
| 6 | 33,8-41,0 | CTA y cierre | invitar | Isabella | CT10 · «Haz clic en el enlace y recibe más información sobre Go Living Suites en Medellín.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f93); la mitad entra en el f315 (10,5 s, antes de los 11 s) y el CTA, en el mismo golpe de la 073 (f1014).
- **Los dos planos rápidos** son DR02 (1,6 s) y RC10 (2,1 s): empiezan en 6,8 y 8,4 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 6 planos (RC12 → RC02 → RC03 → RC11 → RC06 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -12.5 · dos planos rápidos -21.7 · recorrido -15.9 LUFS de la canción).

## Por confirmar al oído (R31)

1. «vives» (HK10, f110 = 3,7 s del vídeo): whisper oye «Vivo» en la toma entera (confianza 0,16-0,14); «¿Vives fuera de Colombia…?» es la lectura por gramática y por la pregunta que sigue. Y «Medellín» (0,36).
2. «en edificios con reconocimiento» (MD01, f405 = 13,5 s del vídeo): una afirmación de Isabella que el anuncio no recoge; hay que confirmarla con el usuario además de oírla. Y «matrícula independiente» (consta en el anuncio).
3. «Haz» (CT10, f1026 = 34,2 s del vídeo): whisper la oye con confianza 0,14 (es la sílaba suelta de 0,62-0,74 s, antes del cierre de la «c»).
4. «Go Living Suites» (CT10, f1108 = 36,9 s del vídeo): whisper oye «StatSuite» (0,04); el anuncio dice «Go Living Suites».

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
