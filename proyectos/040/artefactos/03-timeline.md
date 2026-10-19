# 03 · Línea de tiempo — proyecto 040 · Lote en El Carmen de Viboral (Mia), V23 «La vista»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/040/metraje-040.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/040/herramientas/volcar-plan.mjs`.

Composición `Recorrido040`, 1080×1920 a 30 fps, **1118 f (37,27 s)**. TODOS los cambios de plano son cortes secos y caen en un golpe MEDIDO de «Overcoming the Impossible» (de 9,4 a 11,9 dB), comprobados por la puerta (±1 f del frame en que suena) y, sobre el audio de la prueba, con `golpes-render.py` (ver `combinaciones.md`).

El paseo, leído de arriba abajo: el sol bajo sobre el lote → ella en la loma (la promesa) → las terrazas al atardecer → el sol sobre el horizonte → el árbol en contraluz → ella en la loma (la razón) → el cielo rosa sobre las palmas (dos tramos) → la vista, el valle con sus casas → ella en la loma (la invitación) → la tarjeta. Del oro (17:41-17:44) al rosa (17:54), en el orden en que se rodó.

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | dr202.mp4 | 0 | 108 | 3.60 | 1.50–5.10 | ×1 |  | corte |
| c02-hook | 2 | hk05.mp4 | 108 | 197 | 6.57 | 0.00–6.57 | ×1 | hook 10.2 dB | corte |
| c03-terrazas | 3 | dr209.mp4 | 305 | 102 | 3.40 | 13.00–16.40 | ×1 | terrazas 9.6 dB | corte |
| c04-sol | 3 | dr202.mp4 | 407 | 95 | 3.17 | 9.00–12.17 | ×1 | sol 9.5 dB | corte |
| c05-arbol | 3 | dr209.mp4 | 502 | 83 | 2.77 | 19.00–21.77 | ×1 | arbol 10.7 dB | corte |
| c06-mitad | 4 | md04.mp4 | 585 | 124 | 4.13 | 0.63–4.77 | ×1 | mitad 10.2 dB | corte |
| c07-palmas | 5 | dr236.mp4 | 709 | 42 | 1.40 | 7.50–8.90 | ×1 | palmas 9.9 dB | corte |
| c08-palmas | 5 | dr236.mp4 | 751 | 48 | 1.60 | 9.50–11.10 | ×1 | palmas2 11.6 dB | corte |
| c09-vista | 5 | dr234.mp4 | 799 | 136 | 4.53 | 0.00–4.53 | ×1 | vista 9.4 dB | corte |
| c10-cta | 6 | ct02.mp4 | 935 | 123 | 4.10 | 0.10–4.20 | ×1 | cta 11.9 dB | corte |
| c11-cierre | 6 | cierre-oscuro.png | 1058 | 60 | 2.00 | — | ×1 |  | corte |

11 cortes · 1118 f (37.27 s)

## Lo que hace cada plano ahí (`reason`), su movimiento medido y de dónde sale su golpe

| Plano | Espacio | Función | Movimiento (`medir-ventana-040.py`: media · σ/μ · pend. · máx/μ) | Golpe de la canción (s) |
|---|---|---|---|---|
| c01-apertura | el sol bajo sobre las terrazas | situar y prometer: la vista al atardecer, sin texto ni voz | 0,51 · 0,077 · +0,06 · 1,29 | 172,715 · 15,0 dB (suena en el f3) |
| c02-hook | la loma, de día | la promesa: «imagina despertar todos los días con esta vista…» | — | 176,228 · 10,2 dB |
| c03-terrazas | terrazas de tierra roja, cielo dorado | el lote, vista desde el aire | 1,11 · 0,029 · +0,08 · 1,08 | 182,773 · 9,6 dB |
| c04-sol | el sol sobre el horizonte | el momento: la hora de despertar o de despedir el día | 0,81 · 0,086 · −0,26 · 1,17 | 186,183 · 9,5 dB |
| c05-arbol | el árbol en contraluz | la escala: lo que rodea al lote; último plano antes de ella | 1,28 · 0,027 · −0,06 · 1,07 | 189,339 · 10,7 dB |
| c06-mitad | la loma, de día | la razón: «el lote que compras para construir tu casa soñada» | — | 192,111 · 10,2 dB |
| c07-palmas | cielo rosa sobre las palmas | lo de alrededor, ya en el rosa | 0,91 · 0,047 · +0,15 · 1,08 | 196,260 · 9,9 dB |
| c08-palmas | las palmas, más cerca | el descubrimiento: lo que viene es la vista entera | 1,21 · 0,074 · +0,25 · 1,16 | 197,642 · 11,6 dB |
| c09-vista | nubes rosadas sobre el valle y sus casas | el clímax: la vista larga | 0,94 · 0,242 · +0,73 · 1,54 (**acelera despacio**: declarado) | 199,259 · 9,4 dB |
| c10-cta | la loma, pinos y valle | la invitación: «escríbeme lote» | — | 203,775 · 11,9 dB (la caída de la canción) |
| c11-cierre | tarjeta oscura | logo y web; la música se apaga | — | — |

## Voz y audio (frames de la composición)

| Toma | Entra (a corte, en golpe) | Primera sílaba | Última palabra | Aire hasta el golpe siguiente | Música: baja en… | sube en… |
|---|---|---|---|---|---|---|
| HK05 | f108 | f117,2 (+9,2 f) | f279,6 | 25,4 f | 6 f, acaba 3,2 f antes de hablar | 23 f (hasta 2 f antes del golpe del f305) |
| MD04 | f585 | f594,5 (+9,5 f) | f689,9 | 19,1 f | 6 f, acaba 3,5 f antes | 17 f |
| CT02 | f935 | f944 (+9 f) | f1049 | — | 6 f | se apaga en coseno hasta el f1116 |

Voz tratada: ganancias +19,4 · +19,3 · +17,9 dB tras el compresor 3,5:1, limitador a −2,5 dBFS → ≈ −15 LUFS. Música sola a −15 LUFS por tramos (apertura −3,4 dB, paseo −6,1, palmas −5,8, vista −2,0 sobre el archivo: ninguno sube), −26 LUFS bajo la voz (11 LU).

## El texto (frames absolutos)

| bloque | f | líneas | acento |
|---|---|---|---|
| h01 | 116-187 | «Imagina despertar» · «todos los días con» · «esta vista» | **esta vista** |
| h02 | 188-283 | «y tener más de» · «3.000 metros cuadrados» · «para tu proyecto.» | (la única cifra, en base) |
| m01 | 594-645 | «Este es el tipo» · «de lote que compras» | |
| m02 | 646-696 | «para construir tu» · «casa soñada.» | **casa soñada.** |
| c01 | 943-1008 | «Si quieres conocerlo,» · «escríbeme lote» | **escríbeme lote** |
| c02 | 1009-1053 | «y te envío» · «toda la información.» | |

Cada línea entra 0-2 f antes del arranque MEDIDO de su palabra (`onsets-voz.py` + `palabras-desde.py` sobre la voz sola; ver la cabecera de `subtitulos-040.ts`).
