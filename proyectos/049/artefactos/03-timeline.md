# 03 · Línea de tiempo — proyecto 049 · Tierra Grata Bosque Santo (El Poblado), ARRIENDO, V31 «Amenidades»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/049/metraje-049.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/049/herramientas/volcar-plan.mjs` (los nombres de la columna «golpe» son las claves de `GOLPE`).

Composición `Recorrido049`, 1080×1920 a 30 fps, **1401 f (46,70 s)**. TODOS los cambios de plano son cortes secos y caen en un golpe MEDIDO de «In This Together» (7,5-12,7 dB), comprobados sobre el audio del render (`golpes-render.py`, ver `combinaciones.md`). La música entra en el golpe de 161,638 s de la canción (`INICIO_MUSICA` = 161,6 s).

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-apertura | 1 | rc04.mp4 | 0 | 71 | 2.37 | 1.00–3.37 | ×1 |  | corte |
| c02-hook | 2 | hk03.mp4 | 71 | 180 | 6.00 | 0.17–6.17 | ×1 | hook 10.9 dB | corte |
| c03-piscina | 3 | rc17.mp4 | 251 | 93 | 3.10 | 1.00–4.10 | ×1 | piscina 8.1 dB | corte |
| c04-social-kitchen | 3 | rc12.mp4 | 344 | 105 | 3.50 | 3.20–6.70 | ×1 | social 7.5 dB | corte |
| c05-gimnasio | 3 | rc14.mp4 | 449 | 93 | 3.10 | 0.30–3.40 | ×1 | gimnasio 7.5 dB | corte |
| c06-gimnasio-2 | 3 | rc13.mp4 | 542 | 110 | 3.67 | 2.20–5.87 | ×1 | vidrio 8.8 dB | corte |
| c07-mitad | 4 | md05.mp4 | 652 | 126 | 4.20 | 0.17–4.37 | ×1 | mitad 9.5 dB | corte |
| c08-alcoba | 5 | rc06.mp4 | 778 | 105 | 3.50 | 0.10–3.60 | ×1 | alcoba 7.7 dB | corte |
| c09-puerta-bano | 5 | rc08.mp4 | 883 | 100 | 3.33 | 1.70–5.03 | ×1 | puerta 12.7 dB | corte |
| c10-bano | 5 | rc09.mp4 | 983 | 83 | 2.77 | 5.20–7.97 | ×1 | bano 8.5 dB | corte |
| c11-vista | 5 | rc19.mp4 | 1066 | 126 | 4.20 | 0.30–4.50 | ×1 | vista 9.3 dB | corte |
| c12-cta | 6 | ct01.mp4 | 1192 | 149 | 4.97 | 0.20–5.17 | ×1 | cta 8.9 dB | corte |
| c13-cierre | 6 | cierre-oscuro.png | 1341 | 60 | 2.00 | — | ×1 |  | corte |

13 cortes · 1401 f (46.70 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c01-apertura | la sala del apartamento | situar y prometer: el sofá gris, los listones con luz y la mesa con el sol, ya en movimiento en el f0 | 161,638 · 11,2 dB (suena en el f3) |
| c02-hook | las escaleras exteriores | la promesa: «cuando llegas a una ciudad que no es la tuya, el acompañamiento personalizado…» | 163,903 · 10,9 dB |
| c03-piscina | el carril de nado (UNIDAD, fuera) | revelar: la primera amenidad, al aire libre | 169,903 · 8,1 dB |
| c04-social-kitchen | la Social Kitchen (UNIDAD, dentro) | mover: del exterior al edificio; el sitio para estar con otros | 173,002 · 7,5 dB |
| c05-gimnasio | el gimnasio, pared de rayas (UNIDAD) | revelar: el equipo | 176,505 · 7,5 dB |
| c06-gimnasio-2 | el gimnasio, desde la entrada (UNIDAD) | revelar: las máquinas y el rótulo «GIMNASIO»; el sitio donde habla Isabella en el plano siguiente | 179,605 · 8,8 dB |
| c07-mitad | el gimnasio, tras el vidrio | decirlo: «además, esta unidad cuenta con diferentes tipos de amenidades» | 183,294 · 9,5 dB |
| c08-alcoba | la alcoba principal (APARTAMENTO) | cómo se vive: del bullicio de la unidad al descanso | 187,476 · 7,7 dB |
| c09-puerta-bano | la puerta del baño (APARTAMENTO) | llevar a otro espacio: la puerta de vidrio esmerilado con luz | 190,983 · 12,7 dB |
| c10-bano | el baño principal (APARTAMENTO) | cómo se vive: el cuidado, la calma antes de salir | 194,305 · 8,5 dB |
| c11-vista | el deck con el jacuzzi comunal (TERRAZA de la unidad) | el clímax: la madera, el agua redonda, la baranda y la pérgola bajo el cielo de la tarde | 197,082 · 9,3 dB |
| c12-cta | junto al jacuzzi comunal | la invitación: «si quieres un acompañamiento personalizado… contáctanos» | 201,283 · 8,9 dB (donde la canción empieza a caer) |
| c13-cierre | tarjeta oscura | logo y web; la música se apaga | — |

## Voz y audio (frames de la composición)

| Toma | Entra (a corte, en golpe) | Primera palabra | Última palabra | Aire hasta el golpe siguiente | Música: baja en… | sube en… |
|---|---|---|---|---|---|---|
| HK03 | f71 | f83 (+12 f) | f235 | 16 f | 6 f, acaba 6 f antes de hablar | 14 f (hasta 2 f antes del golpe del f251) |
| MD05 | f652 | f665 (+13 f) | f754 | 24 f | 6 f, acaba 7 f antes | 22 f (hasta 2 f antes del golpe del f778) |
| CT01 | f1192 | f1204 (+12 f) | f1322 | — (la toma sigue hasta el f1341) | 6 f | se apaga en coseno hasta el f1399 |

La voz: ≈ −15 LUFS en su ventana (medida sobre el WAV tratado, ver `combinaciones.md`), pico real −2,5 dBFS. La música sola: −15 LUFS por tramos (la canción llega a ≈ −10: la ganancia es de −5,4 · −5,0 · −3,2 dB); bajo la voz, −26 LUFS (11 LU).
