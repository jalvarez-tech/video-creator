# 01 · Plan narrativo — proyecto 089 (V70)

> ADAGIOS · guion 01: «Y si tu casa también te ayudara a bajar el ritmo» → ventanales, deck y patio interior que acercan la naturaleza. Reel 9:16 de **Casa El Retiro · Senderos de Compostela** (Propiedades Luxur, COP 2.800 M), montado el 2026-11-11 con el rodaje de ese día. Estilo de música: **piano, adagio sin pulso (Sol menor) — Pieza 2 de «The Most Beautiful 12 Adagios in Rachmaninoff Style»**.

## Cabecera

`9:16 · 1080×1920 · 30 fps · 1158 f (38,6 s) · estilo «Lujo / Redes» del canal Luxur · texto `editorial` en UNA sola fuente, SIN ficha (la versión con ficha va después del visto bueno) · marca Luxur SIN sello`

| | |
|---|---|
| Material | Del rodaje del 2026-11-11 (`archivos/material/casa-el-retiro-senderos-de-compostela.md`): HK01 · MD01 · CT01 (guion 01), DR14, RC33 · RC38 · RC40 · RC29 · RC30 · RC36 · DR12. Normalizado con `proyectos/089/normalizar.mjs` en `remotion/public/recorrido-089/` |
| Canción | «Pieza 2 (adagio)» — Pieza 2 del mix «The Most Beautiful 12 Adagios in Rachmaninoff Style» (3:26), cortada de la COPIA 1 del archivo del mix en 199,10-405,79 s (206,69 s); sin pulso: los «golpes» son los ataques de las notas del piano medidos con `medir-pista.py`. Entra en el segundo 6.067 del corte (golpe de 9.7 dB en el f3). **Sin oír**: el reparto por estilo es por tono medido |
| Destino | Reels |
| Objetivo | Que quien solo mira diez segundos haya visto la casa, a Isabella y dos planos vistosos, y la mitad entre en el segundo 10,4 |

## La estructura («lo vendible antes del segundo 10», `recorrido-luxur` §3)

| # | Bloque | Qué | Tiempo |
|---|---|---|---|
| 1 | Toma inicial | DR14: la casa pegada a las cubiertas. Sin texto ni voz | 0,0-3,3 s |
| 2 | Hook | Isabella (HK01): «Y si tu casa también te ayudara a bajar el ritmo.» | 3,3-6,5 s |
| 3 | Dos planos rápidos | RC33 (1,8 s) · RC38 (2,0 s) | 6,5-10,4 s |
| 4 | Mitad | Isabella (MD01): «Los grandes ventanales, el deck panorámico y el patio interior acercan la naturaleza a cada momento del día.» | 10,4-17,1 s |
| 5 | Recorrido inmersivo | RC40 → RC29 → RC30 → RC36 → DR12 (la vista, el plano más largo) | 17,1-34,4 s |
| 6 | CTA y cierre | Isabella (CT01): «Conoce cómo se vive aquí.» · tarjeta oscura con el logo y la web | 34,4-38,6 s |

## Por qué (decisiones)

- La música es de ADAGIOS (Pieza 2 del mix de Rachmaninoff: íntima y dulce, Sol menor, abre casi a nivel y sube a los 4-6 s): el tono de «bajar el ritmo». No tiene pulso ni percusión: cada corte cae en el ataque de una nota medido (≥ 7 dB), y se entra en el segundo 6,07 de la pieza (ataque de 9,7 dB), pasada la subida de la apertura, en vez de usar la entrada de 30 s del catálogo (sin ataque claro). El piano cae en la banda de la voz: por eso la música baja ≈ 15 LU bajo ella.
- Planos más largos que en la electrónica (3-4,6 s) porque el tema es bajar el ritmo: el recorrido va del pasillo acristalado a la sala de ventanales, al deck, al patio con el jacuzzi y a la vista de toda la casa sobre su ladera (DR12, el plano más largo).
- Apertura con DR14 (pegada a las cubiertas, retrocede y sube); los dos planos rápidos son la sala abierta a las montañas (RC33) y los carrizos a través del cristal (RC38).
- Sin cifras en pantalla: Isabella no dice ninguna en HK01, MD01 ni CT01.

## Reglas del canal que cumple (y la puerta comprueba)

Primera toma sin texto ni voz · nunca el sello · cierre = tarjeta oscura con logo (440 px, 60 %) y web · nada congelado (el CTA funde a negro y no se repite el último fotograma) · una sola fuente en los subtítulos · ficha y subtítulos nunca juntos (esta es la versión normal: sin ficha) ·
voz a −15 LUFS con pico real ≤ −1 dBTP · música sola a −15 LUFS y ≈ 15 LU bajo la voz mientras habla, con curva de coseno que **acaba antes de la primera palabra** · cada corte seco, en un golpe MEDIDO de la canción.

## Supuestos sin confirmar / por decidir

- Los adagios terminan en decaimiento: aquí la música se apaga con curva bajo la tarjeta (no hay cola natural).
- La música se eligió SIN OÍR: el oído decide; alternativa del catálogo, entrar desde 0:00 (abre a −3 dB).
- La versión con ficha, la portada y el .srt se hacen tras el visto bueno de la normal.
- **POR CONFIRMAR AL OÍDO:** «ayudara» (HK01, 2,1 s del vídeo final aprox.): subjuntivo, lo correcto tras «Y si…»; whisper oyó «ayudará» en las tres pasadas y las sílabas no distinguen la tónica.

## Lo que NO se cuenta

Valorización ni rentabilidad; el precio (COP 2.800 M) y las áreas van al caption y a la versión con ficha: Isabella no dice ninguna cifra en estas tres tomas.
