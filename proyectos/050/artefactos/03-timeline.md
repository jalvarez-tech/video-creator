# 03 · Línea de tiempo — proyecto 050 · Tierra Grata Bosque Santo (ARRIENDO), V32 «14,8» · rev. 2

> Paso 3 de 3. Del plan (`remotion/src/proyectos/050/metraje-050.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). Generada con `node proyectos/050/herramientas/volcar-plan.mjs`. Rev. 2: con RC20, RC22 y RC10 (pedido del usuario tras ver la rev. 1).

Composición `Recorrido050`, 1080×1920 a 30 fps, **1150 f (38,33 s)**. TODOS los cambios de plano son cortes secos y caen en un golpe MEDIDO de «Spring is Coming» (≥ 10,3 dB), comprobados sobre el audio del render (`golpes-render.py`, ver `combinaciones.md`). La pieza **abre con el hook** (excepción por encargo): el f0 es Isabella y no hay golpe en él; la música ya suena, baja.

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-hook | 2 | hk02.mp4 | 0 | 204 | 6.80 | 0.30–7.10 | ×1 |  | corte |
| c02-piscina | 3 | rc17.mp4 | 204 | 85 | 2.83 | 3.20–6.03 | ×1 | paseo 16.7 dB | corte |
| c03-gimnasio | 3 | rc14.mp4 | 289 | 73 | 2.43 | 0.00–2.43 | ×1 | gimnasio 13.9 dB | corte |
| c04-social-kitchen | 3 | rc12.mp4 | 362 | 86 | 2.87 | 0.00–2.87 | ×1 | cocina 13.9 dB | corte |
| c05-mitad | 4 | md04.mp4 | 448 | 128 | 4.27 | 0.20–4.47 | ×1 | mitad 13.2 dB | corte |
| c06-sala | 5 | rc20.mp4 | 576 | 77 | 2.57 | 6.00–8.57 | ×1 | sala 11.8 dB | corte |
| c07-bar | 5 | rc22.mp4 | 653 | 50 | 1.67 | 1.53–3.20 | ×1 | bar 12.1 dB | corte |
| c08-alcoba | 5 | rc06.mp4 | 703 | 73 | 2.43 | 0.00–2.43 | ×1 | alcoba 11.7 dB | corte |
| c09-bano | 5 | rc09.mp4 | 776 | 70 | 2.33 | 1.70–4.03 | ×1 | bano 10.3 dB | corte |
| c10-jacuzzi | 5 | rc10.mp4 | 846 | 86 | 2.87 | 7.87–10.73 | ×1 | jacuzzi 13 dB | corte |
| c11-cta | 6 | ct02.mp4 | 932 | 158 | 5.27 | 0.30–5.57 | ×1 | cta 10.9 dB | corte |
| c12-cierre | 6 | cierre-oscuro.png | 1090 | 60 | 2.00 | — | ×1 |  | corte |

12 cortes · 1150 f (38,33 s)

## Lo que hace cada plano ahí (`reason`) y de dónde sale su golpe

| Plano | Espacio | Función | Golpe de la canción (s) |
|---|---|---|---|
| c01-hook | la terraza común (sentada en el sillón) | prometer: el tiempo vale y aquí se cuida (aseo semanal incluido) | — (la canción entra en su s 39,2) |
| c02-piscina | la unidad: el carril de nado | dónde pasará su tiempo: lo primero que enseña la unidad; entra en el «drop» | 45,932 · 16,7 dB |
| c03-gimnasio | la unidad: el gimnasio | cuidarse; mismo movimiento hacia la derecha | 48,767 · 13,9 dB |
| c04-social-kitchen | la unidad: la Social Kitchen | reunirse y trabajar; el paseo llega adonde espera ella | 51,203 · 13,9 dB |
| c05-mitad | la Social Kitchen (Isabella) | el precio y lo que incluye | 54,087 · 13,2 dB |
| c06-sala | el apartamento: la sala a la hora azul | estar; por fin dentro del apartamento | 58,349 · 11,8 dB |
| c07-bar | el apartamento: el bar de noche | reunirse; la luz cálida de la noche entre dos planos de día | 60,918 · 12,1 dB |
| c08-alcoba | el apartamento: alcoba principal | descanso | 62,588 · 11,7 dB |
| c09-bano | el apartamento: baño principal | cuidado: el paso natural del paseo | 65,001 · 10,3 dB |
| c10-jacuzzi | el apartamento: el balcón con el jacuzzi privado | el clímax: el argumento de la ficha | 67,35 · 13,0 dB |
| c11-cta | el jardín (Isabella) | la invitación: una sola acción | 70,21 · 10,9 dB |
| c12-cierre | tarjeta oscura | logo y web; la música se apaga | — |

## Voz y audio (frames de la composición)

| Toma | Entra | Primera palabra | Última palabra | Aire hasta el golpe siguiente | Música: baja… | sube… |
|---|---|---|---|---|---|---|
| HK02 | f0 (a corte, sin golpe) | f5 | f187 | 17 f (hasta el «drop» del f204) | sale del silencio en 3 f y se queda baja | 15 f (hasta 2 f antes del golpe del f204) |
| MD04 | f448 (a corte, en golpe) | f459 (+11 f) | f567 | 9 f | 10 f desde el golpe: acaba 1 f antes de hablar | 7 f (hasta 2 f antes del golpe del f576) |
| CT02 | f932 (a corte, en golpe) | f946 (+14 f) | f1073 | 17 f (hasta el final de la toma) | 10 f desde el golpe | 14 f hasta su nivel «solo»; se apaga en línea recta bajo la tarjeta (f1148) |

La voz: −15,0 LUFS en su ventana (medida sobre el WAV tratado), pico real −2,5 dBFS. La música sola: ≈ −15 (LUFS de la canción en los 36,5 s que se usan: −15,0; −16,4 bajo el hook, −14,9 en el paseo de la unidad, −14,0 bajo la mitad, −15,1 en el del apartamento y −13,9 bajo el CTA); bajo la voz, ≈ −31 (≈ 16 LU bajo ella).
