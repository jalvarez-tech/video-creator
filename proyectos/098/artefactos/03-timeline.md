# 03 · Timeline — proyecto 098 · «Tú estás aquí»

> Paso 3 de 3. **30 fps**, 1794 f. Frame de la canción: `f = (segundo de la pista − 26,55) × 30`. Los golpes son los
> medidos (`proyectos/098/musica/golpes-6db.json`, subida ≥ 6 dB en 15 ms, banda 80-3000 Hz); los segundos de cada
> voz, los de `palabras-097.json` y la energía de cada WAV. De aquí salen `metraje-098.ts`, `textos-098.ts`,
> `audio-098.ts` y `cues-098.ts`.

## Mapa maestro

| frames | plano (fuente, s) | voz | texto | música (golpe del corte) |
|---|---|---|---|---|
| 0–139 | **P01** VT36 0,40–5,03, el atardecer, sube al cielo | — | kicker «MAS Estrellitas 2026», ya puesto en f0 (miniatura) | la primera nota en f2 (26,61 s) |
| 139–490 | **P02** VT07 3,80–15,50, UNA toma (rev. 2): la pregunta, el barrido hacia la que responde (5,0–5,85) y el testimonio, acercamiento 1→1,05 | «¿Cómo va tu relación con Cristo?» (3,96–5,25, hasta f187) · el testimonio, audio desde 5,63 (f194) hasta 18,1 (f568), con su propia ganancia | pregunta f144–f186 · t1 f202 · t2 f301 · t3 f411 · t4 f464 | **f139** (31,19 s, +7,2 dB) |
| 490–640 | **P04** FT30, las manos (L: sigue su voz) | «…a la verdad de Cristo.» hasta f561 | t5 f504–f572, subrayado | **f490** (42,89 s) sobre «aferrarme» |
| 640–756 | **P05** VT10 3,50–7,37 | J: la pregunta desde 2,37 (f606); la respuesta 4,52–7,37 | pregunta f608–f668 · «perdonar» f670–f756 | **f640** (47,87 s: empieza la parte ligada) |
| 756–807 | **P06** VT06a 2,70–4,40 | «¿Qué es lo más bonito de recibir un regalo?» (2,83–4,36) | f758–f806 | **f756** (51,74 s) |
| 807–902 | **P07** VT06b 4,70–7,87 | «Saber que… con mucho cariño y amor.» (4,77–7,6) | f810–f902, subrayado en f869 | — (barrido de la fuente saltado) |
| 902–1004 | **P08** FT32, el corazón | — | — | **f902** (56,61 s) |
| 1004–1124 | **P09** FT43, señala el cielo | — | — | **f1004** (60,02 s) |
| 1124–1241 | **P10** HZ17 0,50–4,40, acercamiento | «Yo lo que quiero en Navidad es a Cristo en mi vida» (0,7–4,3) | f1130–f1241, óvalo en «Cristo» f1200 (por energía, 3,0–3,65 s) | **f1124** (64,00 s, +9 dB: empieza la subida) |
| 1241–1478 | **P11** DR07 1,45–9,35, el círculo sube | — | la estrella aparece en **f1357** y aterriza en el centro en f1450 (anillo) | **f1241** (67,92 s, +12 dB) · cima f1357 (71,79 s) |
| 1478–1794 | **P12** papel: el CTA | — | ver abajo | **f1478** (75,80 s); última frase f1595 (79,73 s, +12,6 dB); respiro f1794 |

## El CTA (P12)

| f | qué entra |
|---|---|
| 1478 | la hoja de papel barre de derecha a izquierda (10 f); la estrella del círculo viaja a ser la estrella 1 (24 f) |
| 1486 | izquierda: «Este año, más de **3.000 +1** regalos» |
| 1502 · 1524 · 1546 | los pasos 1, 2 y 3 (estrella numerada + título + línea); caminos punteados en f1512 y f1534 |
| 1532 | bajo el paso 2, la tarjeta de la cuenta (Bancolombia · cuenta de ahorros 928 0000 1770 · NIT 900 280 179-4) |
| 1570 | «Miles de corazones unidos por amor.» |
| 1595 | la firma CSR \| MAS (fundido, sin rebote), en el golpe de la última frase |
| 1610 | «Del 15 de noviembre al 20 de diciembre» |
| 1794 | fin, en el respiro de la pieza: nada sale, el último frame es el cartel entero |

## Voces y música

- Cada voz, igualada a −18 LUFS (una ganancia por tramo, `limites-voz.py --margen 12`, tope +18 dB). Las preguntas
  llegan a −6/−15 LUFS y las respuestas a −25/−30: van en tramos aparte.
- La música suena de f0 a f1794 sin un corte: sola a ≈ −21 LUFS, bajo las voces a ≈ −30, con rampas de 8 f según
  las ventanas medidas; fundido coseno en los últimos 54 f (la pieza ya se apaga sola en su respiro). Partida en trozos
  consecutivos del mismo WAV si una envolvente pasa de 60 valores.

## Sonido (cinco SFX, ninguno bajo una voz)

| f | SFX | por qué |
|---|---|---|
| 1357 | `sparkle` | aparece la estrella en la cima de la música |
| 1450 | `chime` | aterriza en el centro del círculo |
| 1478 | `paper` | entra la hoja |
| 1502 · 1524 · 1546 | `sparkle` −4/−6/−8 dB | las estrellas de los pasos |
