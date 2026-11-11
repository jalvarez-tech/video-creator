# 01 · Plan narrativo — proyecto 081 (V62)

> Variante B de la 072 (`proyectos/072` en el worktree `suite-hotelera-videos-e02d0b`, sin commit) con la estructura «lo vendible antes del segundo 10» (`recorrido-luxur` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe `proyectos/080/herramientas/montar-pieza.mjs` desde `pieza.json`.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 1071 f (35,7 s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (`Recorrido081`: subtítulos en una sola fuente, sin ficha) y con ficha (`Recorrido081Ficha`: sin subtítulos, ficha abajo) · marca Luxur SIN sello`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el 072 → 081 (**V62**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (`.claude/skills/ficha-luxur/propiedades/suite-go-living.json`). |
| Terna de voz | HK11 · MD08 · CT11 (la de la 072, sin cambios) · exterior DR05 |
| Canción | «I Feel It Coming», la de la 072 y con la MISMA entrada (227.700 s). **No es una versión nueva de la propiedad sino la variante B de la V53: por eso repite canción (declarado).** |
| Material | El normalizado de la 072 (`remotion/public/recorrido-081/`, clon de `recorrido-072/` y de sus hermanos): DR05 · HK11 · DR03 · RC13 · MD08 · DR01 · RC03 · RC05 · RC04 · RC07 · CT11 |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: «En inversión inmobiliaria, la ubicación lo cambia todo» → lo que hay a minutos de la suite

Lo dicho es lo de la 072: En inversión inmobiliaria, la ubicación lo cambia todo. · A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala. · Descubre esta suite en El Poblado y déjate asombrar por la ubicación. Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
| 1 | 0,0-2,7 | El exterior | la promesa | el edificio | DR05 0,60-3,27 s · solo música: golpe de 22.5 dB en el f3 · SIN texto ni voz |
| 2 | 2,7-6,3 | Hook | la pregunta o la tesis | Isabella | HK11 · «En inversión inmobiliaria, la ubicación lo cambia todo.» (en la versión con ficha, la ficha entra en este mismo fotograma) |
| 3 | 6,3-9,8 | DOS planos rápidos | lo más vistoso, antes del segundo 10 | DR03 + RC13 | DR03 0,70-2,20 s (1,5 s) → RC13 2,00-3,93 s (1,9 s) · solo música, a corte |
| 4 | 9,8-14,3 | Mitad | la condición, dicha | Isabella | MD08 · «A minutos de Oviedo, Santa Fe, EAFIT y la estación Aguacatala.» (a corte, antes de los 11 s) |
| 5 | 14,3-29,0 | Recorrido inmersivo | cómo se vive → la vista | RC07 | DR01 → RC03 → RC05 → RC04 → RC07 · solo música; la vista es el plano más largo (3,8 s) |
| 6 | 29,0-35,7 | CTA y cierre | invitar | Isabella | CT11 · «Descubre esta suite en El Poblado y déjate asombrar por la ubicación.» → funde a negro → tarjeta con el logo y la web |

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f80); la mitad entra en el f293 (9,8 s, antes de los 11 s; `desde` 2 f para que la frase quepa entre este golpe y el del f429) y el CTA, en el mismo golpe de la 072 (f871).
- **Los dos planos rápidos** son DR03 (1,5 s) y RC13 (1,9 s): empiezan en 6,3 y 7,8 s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de 5 planos (DR01 → RC03 → RC05 → RC04 → RC07), cada cambio en un golpe medido; la vista (RC07) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (`medidas/ventanas-musica.json`: apertura -10.6 · dos planos rápidos -10.7 · recorrido -11.2 LUFS de la canción).
- **Excepción heredada de la 072:** la salida del hook (f190) no cae en un golpe: el clip del hook acaba pocos frames tras su última palabra; la música sube sobre el corte.

## Por confirmar al oído (R31)

1. «Oviedo» (MD08, f324 = 10,8 s del vídeo): whisper oyó «odio» (0,02) y «abierto» en un corte aislado; por el contexto —y el anuncio, que cita el C.C. Oviedo— se lee «Oviedo».
2. «EAFIT» (MD08, f366 = 12,2 s del vídeo): whisper oyó «Eafid» y «Eafit» (0,34). **No está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y se confirma con el usuario.
3. «Aguacatala» (MD08, f386 = 12,9 s del vídeo): whisper oyó «Acuacatala» (0,42); el anuncio escribe «Aguacatala» y su inicio exacto es ambiguo entre «estación» y «Aguacatala».
4. «déjate» (CT11, f935 = 31,2 s del vídeo): whisper oyó «déjate» con 0,05 y «hasta» en cortes aislados.

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
