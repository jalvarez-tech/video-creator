# 03 · Línea de tiempo — proyecto 055 · Casa en Condominio Los Bravos (La Ceja), V37 «Las mañanas»

> Paso 3 de 3. Del plan (`remotion/src/proyectos/055/metraje-055.ts`) a la tabla, con los números reales. Anterior: [02-layout.md](02-layout.md). La tabla de planos sale de `node proyectos/055/herramientas/volcar-plan.mjs`.

Composición `Recorrido055`, 1080×1920 a **30 fps**, **1201 f (40,03 s)**. **Todos** los cambios de plano son cortes secos y cada uno cae en el frame en que SUENA un golpe medido de la canción (el frame del vídeo es `round((t_canción + 0,012 − INICIO_MUSICA + 0,042) · 30)`: el ataque de 12 ms y el retardo de 42 ms del audio del render). Medido sobre el audio de la prueba (`medidas/golpes-render-prueba.txt`): los 10 cortes secos caen a ≤ 0,5 f de su golpe, de 10,1 a 28,5 dB.

## Los planos

| id | bloque | clip | en | dur (f) | dur (s) | fuente (s) | vel. | golpe en que entra | entra |
|---|---|---|---|---|---|---|---|---|---|
| c01-dron | 1 | dr70.mp4 | 0 | 92 | 3.07 | 14.00–17.07 | ×1 |  | corte |
| c02-hook | 2 | hk02.mp4 | 92 | 166 | 5.53 | 0.40–5.93 | ×1 | hook 15.2 dB | corte |
| c03-sendero | 3 | rc22.mp4 | 258 | 122 | 4.07 | 2.60–6.67 | ×1 | paseo 12.2 dB | corte |
| c04-pergola | 3 | rc23.mp4 | 380 | 81 | 2.70 | 3.00–5.70 | ×1 | jardin 10.3 dB | corte |
| c05-casa | 3 | rc24.mp4 | 461 | 81 | 2.70 | 1.20–3.90 | ×1 | casa 10.2 dB | corte |
| c06-mitad | 4 | md03.mp4 | 542 | 153 | 5.10 | 1.53–6.63 | ×1 | mitad 13 dB | corte |
| c07-cafetera | 5 | rc20.mp4 | 695 | 79 | 2.63 | 3.03–5.66 | ×1 | cocina 19 dB | corte |
| c08-escalera | 5 | rc01.mp4 | 774 | 72 | 2.40 | 1.20–3.60 | ×1 | escalera 11.1 dB | corte |
| c09-puerta | 5 | rc19.mp4 | 846 | 86 | 2.87 | 1.50–4.37 | ×1 | puerta 12.7 dB | corte |
| c10-vista | 5 | rc09.mp4 | 932 | 112 | 3.73 | 4.40–8.13 | ×1 | vista 11.2 dB | corte |
| c11-cta | 6 | ct03.mp4 | 1044 | 97 | 3.23 | 0.17–3.40 | ×1 | cta 27.4 dB | corte |
| c12-cierre | 6 | cierre-oscuro.png | 1141 | 60 | 2.00 | — | ×1 |  | corte |

12 cortes · 1201 f (40.03 s)

La columna «fuente (s)» es el segundo del archivo NORMALIZADO; el dron (`dr70.mp4`) empieza en el segundo 68,0 de `DJI_…0070_D.MP4` y va a 1001/1000: 14,00-17,07 s del archivo = **82,0-85,1 s del original**.

## Mapa maestro (voz · música · texto)

| frames | s | bloque | voz de Isabella (frase real) | música | subtítulo |
|---|---|---|---|---|---|
| 0-92 | 0,0-3,1 | 1 aérea | — | primera nota en el f2; sola, a −15 LUFS (−0,9 dB sobre la fuente) | — (primera toma sin texto ni voz) |
| 92-258 | 3,1-8,6 | 2 hook | 0,675→4,85 s de HK02 (f100-226): «Imagina tus mañanas en este espacio, disfrutando del aire puro del oriente antioqueño.» | el golpe de 15,2 dB suena entero en el f92 y baja con curva en 8 f hasta la 1.ª sílaba (f100); cama de −13,8 a −10,4 dB (−26 LUFS); sube en 24 f tras la última palabra y llega arriba 8 f antes del golpe del f258 | `h01` f99-160 («Imagina tus» / **mañanas** / «en este espacio,») · `h02` f166-232 («disfrutando del» / **aire puro** / «del oriente antioqueño.») |
| 258-542 | 8,6-18,1 | 3 recorrido 1 | — | sola, −1,1 dB | — |
| 542-695 | 18,1-23,2 | 4 mitad | 1,785→4,25 s de MD03 (f550-624): «No es solo una casa, es una declaración de estilo.» | baja en 8 f desde el golpe de 13,0 dB; cama de −10,6 dB; sube en 24 f tras la última palabra | `m01` f549-630 («No es solo una casa,» / «es una» / **declaración de estilo.**) |
| 695-1044 | 23,2-34,8 | 5 recorrido 2 | — | sola, 0 dB sobre la fuente (−15,6 LUFS; a −15,0 sus picos pasarían de −1 dBFS) | — |
| 1044-1141 | 34,8-38,0 | 6 CTA | 0,425→2,95 s de CT03 (f1052-1128): «Si estás pensando en cambiar tu estilo de vida, ¡hablemos!» | el golpe de 27,4 dB suena entero en el f1044; baja en 8 f; cama de −10,9 dB que se apaga con curva de coseno en los 45 f previos a la última palabra y llega a cero EN ella (f1128) | `c01` f1051-1079 («Si estás pensando» / «en cambiar») · `c02` f1080-1134 («tu estilo de vida,» / **¡hablemos!**) |
| 1141-1201 | 38,0-40,0 | 6 cierre | — | silencio | logo (440 px, 60 %) y `PropiedadesLuxur.com` sobre negro liso; la imagen de Isabella funde a negro en f1135-1140 |

## Lo que hace cada plano ahí (`reason`)

- **c01-dron** — La casa vista desde el aire, de lado: su seto en V, su piedra y su cubierta de teja (la promesa). Sale SIN TEXTO NI VOZ: el frame 0 es la miniatura limpia.
- **c02-hook** — Jardín con la pérgola detrás (el hook): Isabella camina hacia cámara y propone imaginar las mañanas aquí, con el aire puro del oriente antioqueño; al decirlo, la cámara se va al césped y al cielo. Entra a corte en el golpe de 15,2 dB y la música baja antes de su primera palabra.
- **c03-sendero** — Sendero lateral y terraza (RC22): del jardín del hook se entra por el sendero de grava, con el sol entre los árboles, hasta las sillas bajo la pérgola; donde se desayunaría. Corta en el golpe de 10,3 dB.
- **c04-pergola** — Bajo la pérgola (RC23): la luz del sol entra entre sus láminas y la cámara sale al césped, a los árboles y a las nubes; el aire abierto de las mañanas. Corta en el golpe de 10,2 dB.
- **c05-casa** — La casa desde el jardín (RC24): ya se vio por dentro de la pérgola y ahora se ve entera, blanca al fondo del césped bajo un cielo abierto; lo que se va a abrir en la puerta. Corta en el golpe de 13,0 dB, donde entra la mitad.
- **c06-mitad** — Puerta de entrada (MD03): Isabella la abre y entra al recibidor diciendo que no es solo una casa, sino una declaración de estilo; la cámara sigue por la sala y su ventanal abierto al jardín. Entra a corte en el golpe de 13,0 dB.
- **c07-cafetera** — Cocina (RC20): la cafetera sobre el mesón, a la luz de la ventana; donde empieza la mañana. Tras la sala de la mitad, la cocina: arranca el segundo recorrido, en el golpe de 19,0 dB.
- **c08-escalera** — Escalera y doble altura (RC01): del pie de la escalera de acero, con su muro de piedra y su baranda de vidrio, la cámara sube hacia las vigas; la casa se abre hacia arriba, donde está la alcoba. Corta en el golpe de 12,7 dB.
- **c09-puerta** — Puerta de la alcoba (RC19): arriba, de la sala de estar a la puerta de madera que se abre sobre un piso bañado de sol; el puente entre la casa y la alcoba. Corta en el golpe de 11,2 dB.
- **c10-vista** — Alcoba y balcón (RC09, la vista): se abre el ventanal corredizo y se sale al balcón, al cielo abierto; el aire de las mañanas, que prometía el hook. El plano más largo del bloque. Corta en el golpe de 27,4 dB, donde entra el CTA.
- **c11-cta** — Cocina (CT03): Isabella, de cara a cámara en la cocina, pide una sola acción: hablar. Entra a corte en el golpe de 27,4 dB de la canción y su imagen funde a negro 13,5 f después de la última palabra.
- **c12-cierre** — Cierre: la imagen de Isabella ya ha fundido a negro y no se congela; una tarjeta de fondo oscuro sostiene el logo y la web en silencio.
