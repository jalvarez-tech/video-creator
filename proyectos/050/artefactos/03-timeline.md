# 03 · Línea de tiempo — proyecto 050 · Tierra Grata Bosque Santo (ARRIENDO), V32 «14,8»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/050/metraje-050.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/050/herramientas/volcar-plan.mjs`.

Composición `Recorrido050`, 1080×1920 a 30 fps, **1062 f (35,40 s)**. TODOS los cambios de plano son cortes secos y caen en un golpe MEDIDO de «Spring is Coming» (≥ 11,7 dB), comprobados sobre el audio del render (`golpes-render.py`, ver `combinaciones.md`). La pieza **abre con el hook** (excepción por encargo): el f0 es Isabella y no hay golpe en él; la música ya suena, baja.

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | hk02.mp4 | 0 | 204 | 6.80 | 0.30–7.10 | ×1 | — (la música ya suena, baja) | corte |
| c02-piscina | 3 | rc17.mp4 | 204 | 75 | 2.50 | 3.20–5.70 | ×1 | paseo 16.5 dB | corte |
| c03-gimnasio | 3 | rc14.mp4 | 279 | 78 | 2.60 | 0.00–2.60 | ×1 | gimnasio 13.2 dB | corte |
| c04-social-kitchen | 3 | rc12.mp4 | 357 | 85 | 2.83 | 0.00–2.83 | ×1 | cocina 16.7 dB | corte |
| c05-mitad | 4 | md04.mp4 | 442 | 128 | 4.27 | 0.20–4.47 | ×1 | mitad 13.9 dB | corte |
| c06-alcoba | 5 | rc06.mp4 | 570 | 80 | 2.67 | 0.00–2.67 | ×1 | alcoba 12.3 dB | corte |
| c07-bano | 5 | rc09.mp4 | 650 | 93 | 3.10 | 1.50–4.60 | ×1 | bano 15 dB | corte |
| c08-balcon | 5 | rc02.mp4 | 743 | 101 | 3.37 | 26.00–29.37 | ×1 | balcon 12.9 dB | corte |
| c09-cta | 6 | ct02.mp4 | 844 | 158 | 5.27 | 0.30–5.57 | ×1 | cta 11.7 dB | corte |
| c10-cierre | 6 | cierre-oscuro.png | 1002 | 60 | 2.00 | — | ×1 |  | corte |

10 cortes · 1062 f (35,40 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c01-hook | la terraza común (sentada en el sillón) | prometer: el tiempo vale y aquí se cuida (aseo semanal incluido) | — (la canción entra en su s 34,1) |
| c02-piscina | la unidad: el carril de nado | dónde pasará su tiempo: lo primero que enseña la unidad; entra en el «drop» | 40,857 · 16,5 dB |
| c03-gimnasio | la unidad: el gimnasio | cuidarse; mismo movimiento hacia la derecha | 43,345 · 13,2 dB |
| c04-social-kitchen | la unidad: la Social Kitchen | reunirse y trabajar; el paseo llega adonde espera ella | 45,932 · 16,7 dB |
| c05-mitad | la Social Kitchen (Isabella) | el precio y lo que incluye | 48,767 · 13,9 dB |
| c06-alcoba | el apartamento: alcoba principal | descanso; por fin dentro del apartamento | 53,056 · 12,3 dB |
| c07-bano | el apartamento: baño principal | cuidado: el paso natural del paseo | 55,696 · 15,0 dB |
| c08-balcon | el apartamento: el balcón | el clímax: las camas blancas, la palma y la ciudad en el cristal | 58,821 · 12,9 dB |
| c09-cta | el jardín (Isabella) | la invitación: una sola acción | 62,165 · 11,7 dB |
| c10-cierre | tarjeta oscura | logo y web; la música se apaga | — |

## Voz y audio (frames de la composición)

| Toma | Entra | Primera palabra | Última palabra | Aire hasta el golpe siguiente | Música: baja… | sube… |
|---|---|---|---|---|---|---|
| HK02 | f0 (a corte, sin golpe) | f5 | f187 | 17 f (hasta el «drop» del f204) | sale del silencio en 3 f y se queda baja | 15 f (hasta 2 f antes del golpe del f204) |
| MD04 | f442 (a corte, en golpe) | f453 (+11 f) | f561 | 9 f | 10 f desde el golpe: acaba 1 f antes de hablar | 7 f (hasta 2 f antes del golpe del f570) |
| CT02 | f844 (a corte, en golpe) | f858 (+14 f) | f985 | 17 f (hasta el final de la toma) | 10 f desde el golpe | 14 f hasta su nivel «solo»; se apaga en línea recta bajo la tarjeta (f1060) |

La voz: −15,0 LUFS en su ventana (medida sobre el WAV tratado), pico real −2,5 dBFS. La música sola: ≈ −15 (LUFS de la canción en los 35 s que se usan: −15,2; −16,3 en el paseo de la unidad y −14,2 en el del apartamento); bajo la voz, ≈ −31 (≈ 16 LU bajo ella).
