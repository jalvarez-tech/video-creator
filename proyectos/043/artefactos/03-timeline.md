# 03 · Línea de tiempo — proyecto 043 · Lote en El Carmen de Viboral (Mia), V26

> Paso 3 de 3. Del plan (`remotion/src/proyectos/043/metraje-043.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/043/herramientas/volcar-plan.mjs`.

Composición `Recorrido043`, 1080×1920 a 30 fps, **1108 f (36,93 s)**. TODOS los cambios de plano son cortes secos y caen en un golpe MEDIDO de «Luxury, Elegance, Refined» (≥ 12,7 dB), comprobados sobre el audio del render (`golpes-render.py`, ver `combinaciones.md`). Los tiempos de fuente de los drones son los del MP4 NORMALIZADO (reproducido un 0,1 % más rápido que el original DJI a 29,97 fps).

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | dr203.mp4 | 0 | 100 | 3.33 | 1.80–5.13 | ×1 | apertura 18.6 dB (suena en el f3) | corte |
| c02-hook | 2 | hk06.mp4 | 100 | 167 | 5.57 | 0.30–5.87 | ×1 | hook 17.1 dB | corte |
| c03-vegetacion | 3 | dr211.mp4 | 267 | 70 | 2.33 | 3.50–5.83 | ×1 | paseo 13.6 dB | corte |
| c04-terrazas | 3 | dr207.mp4 | 337 | 98 | 3.27 | 20.50–23.77 | ×1 | terrazas 25.0 dB | corte |
| c05-arbol-y-cabana | 3 | dr203.mp4 | 435 | 81 | 2.70 | 5.20–7.90 | ×1 | cabana 15.4 dB | corte |
| c06-mitad | 4 | md06.mp4 | 516 | 156 | 5.20 | 0.20–5.40 | ×1 | mitad 24.9 dB | corte |
| c07-porton | 5 | rc04.mp4 | 672 | 56 | 1.87 | 0.60–2.47 | ×1 | porton 18.4 dB | corte |
| c08-terrazas-doradas | 5 | dr211.mp4 | 728 | 70 | 2.33 | 18.20–20.53 | ×1 | doradas 12.7 dB | corte |
| c09-vista | 5 | dr207.mp4 | 798 | 139 | 4.63 | 30.80–35.43 | ×1 | vista 22.1 dB | corte |
| c10-cta | 6 | ct03.mp4 | 937 | 111 | 3.70 | 0.30–4.00 | ×1 | cta 17.1 dB | corte |
| c11-cierre | 6 | cierre-oscuro.png | 1048 | 60 | 2.00 | — | ×1 |  | corte |

11 cortes · 1108 f (36,93 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c01-apertura | terrazas, árbol y cabaña | situar y prometer: el lote entero al atardecer, ya en movimiento en el f0 | 16,164 · 18,6 dB (suena en el f3) |
| c02-hook | el talud de hierba | lo práctico, primero: «con agua y energía disponibles» | 19,409 · 17,1 dB |
| c03-vegetacion | vegetación y tejado rojo → terrazas | el campo que rodea; el dron sube despacio y descubre las terrazas | 24,995 · 13,6 dB |
| c04-terrazas | terrazas con el árbol | el lote: lo que hay para construir, en un paneo lento | 27,324 · 25,0 dB |
| c05-arbol-y-cabana | árbol grande y cabaña | lo que ya está, antes de que vuelva ella | 30,574 · 15,4 dB |
| c06-mitad | entre las palmas | lo práctico que cambia el día a día: dos entradas | 33,263 · 24,9 dB |
| c07-porton | el portón de la vereda | la otra entrada, enseñada justo después de decirla | 38,485 · 18,4 dB |
| c08-terrazas-doradas | terrazas bajo el sol | el lote entero, sin vegetación delante: la preparación de la vista | 40,346 · 12,7 dB |
| c09-vista | terrazas y árbol bajo el cielo rosa | el clímax: lo que tendría delante quien tuviera el lote | 42,676 · 22,1 dB |
| c10-cta | la loma con el valle y las montañas | la invitación: «haz clic en el botón y agendemos una visita» | 47,321 · 17,1 dB |
| c11-cierre | tarjeta oscura | logo y web; la música se apaga | — |

## Voz y audio (frames de la composición)

| Toma | Entra (a corte, en golpe) | Primera palabra | Última palabra | Aire hasta el golpe siguiente | Música: baja en… | sube en… |
|---|---|---|---|---|---|---|
| HK06 | f100 | f110,5 (+10,5 f) | f254,5 | 12,5 f | 6 f, acaba 4,5 f antes de hablar | 10 f (hasta 2 f antes del golpe del f267) |
| MD06 | f516 | f526,2 (+10,2 f) | f652,4 | 19,6 f | 6 f, acaba 4,2 f antes | 17 f (hasta 2 f antes del golpe del f672) |
| CT03 | f937 | f949,9 (+12,9 f) | f1021,6 | — | 6 f | se apaga en coseno hasta el f1106 |

La voz: ≈ −15 LUFS en su ventana (medida sobre el WAV tratado: −15,0 · −15,0 · −15,0), pico real −2,5 dBFS. La música sola: −14,7 (apertura) · −15,1 (paseo) · −15,0 (bloque 5) LUFS; bajo la voz, −26 (11 LU).
