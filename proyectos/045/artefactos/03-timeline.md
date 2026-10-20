# 03 · Línea de tiempo — proyecto 045 · Tierra Grata Bosque Santo (arriendo), V27 «El tiempo»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/045/metraje-045.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/045/herramientas/volcar-plan.mjs`.

Composición `Recorrido045`, 1080×1920 a 30 fps, **1318 f (43,93 s)**. Los 8 cortes secos caen en un golpe MEDIDO de «Fortitude (Light Version)» (de 8,3 a 15,5 dB) y las 2 disolvencias ACABAN en uno (8,0 y 6,1 dB); se comprueban sobre el audio del render (`golpes-render.py`, ver `combinaciones.md`). Los recorridos son el recorte vertical (608×1080) de un original horizontal 1920×1080; los tiempos de fuente son los del MP4 NORMALIZADO.

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | rc01.mp4 | 0 | 111 | 3.70 | 3.80–7.50 | ×1 | apertura 11.3 dB (suena en el f3) | corte |
| c02-hook | 2 | hk01.mp4 | 111 | 202 | 6.73 | 0.50–7.23 | ×1 | hook 8 dB | disolver |
| c03-social-kitchen | 3 | rc11.mp4 | 313 | 101 | 3.37 | 0.90–4.27 | ×1 | paseo 6.1 dB | disolver |
| c04-gimnasio | 3 | rc13.mp4 | 414 | 107 | 3.57 | 0.00–3.57 | ×1 | gimnasio 8.8 dB | corte |
| c05-piscina | 3 | rc16.mp4 | 521 | 102 | 3.40 | 3.00–6.40 | ×1 | piscina 8.3 dB | corte |
| c06-mitad | 4 | md01.mp4 | 623 | 146 | 4.87 | 0.30–5.17 | ×1 | mitad 8.3 dB | corte |
| c07-alcoba | 5 | rc05.mp4 | 769 | 94 | 3.13 | 0.30–3.43 | ×1 | alcoba 13.5 dB | corte |
| c08-bano | 5 | rc09.mp4 | 863 | 82 | 2.73 | 2.30–5.03 | ×1 | bano 10.5 dB | corte |
| c09-vista | 5 | rc21.mp4 | 945 | 169 | 5.63 | 5.43–11.07 | ×1 | vista 11.2 dB | corte |
| c10-cta | 6 | ct01.mp4 | 1114 | 144 | 4.80 | 0.37–5.17 | ×1 | cta 15.5 dB | corte |
| c11-cierre | 6 | cierre-oscuro.png | 1258 | 60 | 2.00 | — | ×1 |  | corte |

11 cortes · 1318 f (43.93 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c01-apertura | APTO: cocina (la isla y sus taburetes) | situar y prometer: el apartamento, ordenado, ya en movimiento en el f0 | 9,834 · 11,3 dB (suena en el f3) |
| c02-hook | UNIDAD: terraza común (pérgola, cristal, atardecer) | el tiempo es lo más valioso; el aseo semanal, incluido | 13,435 · 8,0 dB (la disolvencia ACABA ahí) |
| c03-social-kitchen | UNIDAD: Social Kitchen / coworking | trabajar: dónde se gasta el tiempo ganado | 20,180 · 6,1 dB (disolvencia) |
| c04-gimnasio | UNIDAD: gimnasio | cuidarte: el segundo uso del tiempo | 23,548 · 8,8 dB |
| c05-piscina | UNIDAD: el carril de nado | descansar: el tercer uso; acaba mirando hacia la terraza | 27,116 · 8,3 dB |
| c06-mitad | UNIDAD: terraza común (pérgola, ciudad y montañas) | «todo ordenado… lo que eres mejor» | 30,512 · 8,3 dB |
| c07-alcoba | APTO: alcoba principal | todo ordenado: la cama hecha | 35,382 · 13,5 dB |
| c08-bano | APTO: baño principal | cuidado y calma: todo en su sitio | 38,500 · 10,5 dB |
| c09-vista | APTO: balcón al atardecer con el jacuzzi privado | el clímax: las luces de la ciudad y el jacuzzi del balcón | 41,235 · 11,2 dB |
| c10-cta | UNIDAD: terraza, junto al jacuzzi comunal | la invitación: «contáctanos» | 46,873 · 15,5 dB |
| c11-cierre | tarjeta oscura | logo y web; la música se apaga | — |

La columna «espacio» leída de arriba abajo: el apartamento (promesa) → la terraza (Isabella) → la unidad (Social Kitchen, gimnasio, piscina) → la terraza (Isabella) → el apartamento (alcoba, baño, balcón) → la unidad (Isabella). Es el paseo del reparto (§3): sin volver atrás dentro de cada recorrido; la vista (el jacuzzi privado) es lo último que se ve antes del CTA.

## Voz y audio (frames de la composición)

| Toma | Entra | Primera palabra | Última palabra | Aire hasta el golpe siguiente | Música: baja en… | sube en… |
|---|---|---|---|---|---|---|
| HK01 | f111 (disolvencia de 12 f que acaba en el golpe) | f121 (+10 f) | f295 | 18 f | 6 f, acaba 4 f antes de hablar | 16 f (hasta 2 f antes del golpe del f313) |
| MD01 | f623 (a corte, en golpe) | f633 (+10 f) | f756 | 13 f | 6 f, acaba 4 f antes | 11 f (hasta 2 f antes del golpe del f769) |
| CT01 | f1114 (a corte, en golpe) | f1124 (+10 f) | f1239 | — | 6 f | se apaga en coseno hasta el f1316 |

La voz: ≈ −15 LUFS en su ventana (medida sobre el WAV tratado, `combinaciones.md`), pico real −2,5 dBFS. La música sola: −15,0 (apertura) · −15,5 (paseo) · −15,2 (bloque 5) LUFS, con un techo de pico de −0,5 dBFS (la canción es suave: sube de +2,8 a +5,5 dB); bajo la voz, −26 (11 LU).
