# 03 · Línea de tiempo — proyecto 042 · Lote en El Carmen de Viboral (Mia), V25

> Paso 3 de 3. Del plan (`remotion/src/proyectos/042/metraje-042.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/042/herramientas/volcar-plan.mjs`.

Composición `Recorrido042`, 1080×1920 a 30 fps, **1081 f (36,03 s)**. Solo DOS cambios de plano son cortes secos: la entrada del hook (f75, sin golpe: HK01 empieza a hablar 2,25 f después) y la entrada del paseo (f266, en el golpe de 17,4 dB del retorno del piano, comprobado sobre el audio del render con `golpes-render.py`, ver `combinaciones.md`). Los otros ocho disuelven en 12 f (con piano, las disolvencias van libres).

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | dr206.mp4 | 0 | 75 | 2.50 | 3.00–5.50 | ×1 | apertura 12.3 dB (f3) | corte |
| c02-hook | 2 | hk01.mp4 | 75 | 191 | 6.37 | 0.00–6.37 |  ×1 |  | corte |
| c03-palmas | 3 | dr221.mp4 | 266 | 81 | 2.70 | 4.50–7.20 | ×1 | paseo 17.4 dB | corte |
| c04-terrazas | 3 | dr221.mp4 | 347 | 81 | 2.70 | 12.00–14.70 | ×1 |  | disolver |
| c05-pared | 3 | dr221.mp4 | 428 | 81 | 2.70 | 19.50–22.20 | ×1 |  | disolver |
| c06-mitad | 4 | md03.mp4 | 509 | 137 | 4.57 | 0.50–5.07 | ×1 |  | disolver |
| c07-cabana | 5 | dr206.mp4 | 646 | 75 | 2.50 | 7.80–10.30 | ×1 |  | disolver |
| c08-vuelo | 5 | dr228.mp4 | 721 | 75 | 2.50 | 7.50–10.00 | ×1 |  | disolver |
| c09-vista | 5 | dr228.mp4 | 796 | 105 | 3.50 | 14.50–18.00 | ×1 |  | disolver |
| c10-cta | 6 | ct04.mp4 | 901 | 120 | 4.00 | 0.43–4.43 | ×1 |  | disolver |
| c11-cierre | 6 | cierre-oscuro.png | 1021 | 60 | 2.00 | — | ×1 |  | corte |

11 cortes · 1081 f (36,03 s). Los planos que disuelven se ven desde 12 f antes de su `en`: el clip tiene esos 12 f antes de su `desde` (el más justo, MD03 con 15 f y CT04 con 13).

## Lo que hace cada plano ahí (`reason`)

| Plano | Espacio | Función | Música (segundo de la canción) |
|---|---|---|---|
| c01-apertura | el lote entero | situar y prometer: terrazas, tierra roja, árbol grande y cabaña a la hora dorada; ya a velocidad en el f0 | 46,998 · 12,3 dB (suena en el f3); golpe de 9,8 dB en 48,816 (f57); la música baja con curva y acaba en el corte |
| c02-hook | la loma, cielo azul | el hallazgo: «encontré un lote donde puedes tener privacidad, naturaleza y dos accesos, y está en El Carmen de Viboral» | el respiro del piano (−17,7 → −26,1 LUFS en la ventana) hace de ducking natural |
| c03-palmas | palmas, cerca y cabaña | lo primero que se descubre: el dron sube desde las palmas y la cerca y asoma la cabaña | 55,772 · 17,4 dB: el retorno del piano abre el paseo |
| c04-terrazas | terrazas con el cielo rosa | el campo se abre: la tierra roja y el árbol grande sobre un horizonte rosado | — |
| c05-pared | pared de terrazas y nubes | el hallazgo se completa: la pared roja de las terrazas con el cielo rosa y lila | baja con curva (15 f) antes de la mitad |
| c06-mitad | la ladera con el valle | el hallazgo, dicho: «acabas de encontrarlo» | −26 LUFS bajo la voz; sube con curva (24 f) tras «encontrarlo» |
| c07-cabana | la cabaña y el árbol grande | lo construido, a la vista: el dron rodea el árbol grande | — |
| c08-vuelo | terrazas y tierra roja, a ras | el campo, a ras: el vuelo bajo hacia la cresta con los árboles en silueta | — |
| c09-vista | el cielo rosa | el clímax: la vista que tendría delante quien encontrara el lote (3,5 s, el plano más largo del bloque 5) | baja con curva (15 f) antes del CTA |
| c10-cta | la loma, la cabaña y los pinos | la invitación: «escríbeme» | −26 LUFS bajo la voz; se apaga con curva de coseno hasta el f1066 |
| c11-cierre | tarjeta oscura | logo y web; silencio | — (la pista trae un golpe de 19,5 dB en el f1074: la música ya está apagada) |

## Voz y audio (frames de la composición)

| Toma | Entra | Primera palabra | Última palabra | Aire hasta lo siguiente | Música: baja… | sube… |
|---|---|---|---|---|---|---|
| HK01 | f75 (a corte, desclic 2 f) | f77,25 (+2,25 f) | f260 | 6 f hasta el retorno del f266 | curva de coseno de 15 f desde el golpe del f57; acaba en el corte (f75) | rampa de −9 dB a 0 dB entre el f75 y el f228 (el respiro del piano) y a su nivel de paseo en el f262 |
| MD03 | f509 (disolviendo desde el f497; cruce de voz de 6 f) | f509,6 | f631 | 14 f hasta el plano siguiente | 15 f, acaba 3 f antes de hablar | curva de 24 f |
| CT04 | f901 (disolviendo; cruce de voz de 6 f) | f902,1 | f1007 | 14 f de su cara + 60 de tarjeta | 15 f, acaba 3 f antes de hablar | se apaga en coseno hasta el f1066 |

La voz: −15,1 LUFS cada una (probar-voz.py; el render se mide en `combinaciones.md`). La música sola: −15 LUFS por tramos (apertura +0,8 dB, paseo −1,0, bloque 5 −1,5); bajo la voz, ≈ −26 LUFS (11 LU).
