# 03 · Timeline — proyecto 099 · «A tus pies»

> Paso 3 de 3. Frames ABSOLUTOS a 30 fps. De aquí salen `metraje-099.ts`, `textos-099.ts`, `audio-099.ts` y `cues-099.ts`.
> La pista: «A Tus Pies» desde 0,42 s de la canción (su primera nota, 0,449 s, cae en f1): **frame = (segundo de la canción − 0,42) × 30**.
> Golpes medidos con `proyectos/099/herramientas/medir-pista.py` (umbral 4 dB): `proyectos/099/musica/golpes-099.json`.

## Mapa maestro

| f | Plano (clip · desde s) | Dice / se ve | Texto | Golpe en el corte (canción s · dB) |
|---|---|---|---|---|
| 0–72 | HZ01 · 0,0 | «¿Cuál es la cualidad más bonita de Dios?» (0,2–2,0) | tira ya puesta en f0 · kicker «Ellas mismas hacían las preguntas.» | f1 · 0,449 · 51 (primera nota) |
| 72–133 | HZ01 · 2,4 (mismo plano) | «En amarnos.» (2,6–3,95) | tira con subrayado | — (trozo de ganancia) |
| 133–179 | HZ05 · 26,75 | «Amoroso.» | palabra grande → columna | 4,843 · 9,2 |
| 179–222 | HZ05 · 11,97 | «Bondadoso.» | ídem | 6,397 · 4,6 |
| 222–287 | HZ05 · 17,78 | «Misericordioso.» | ídem | 7,833 · 10,8 |
| 287–329 | HZ06 · 0,27 | «Paciente.» | ídem | 9,973 · 11,3 |
| 329–361 | HZ05 · 31,0 | «Compasivo.» | ídem | 11,402 · 4,8 |
| 361–401 | HZ05 · 39,88 | «Amable.» | ídem | 12,459 · 12,1 |
| 401–438 | HZ05 · 51,88 | «Justo.» | ídem | 13,782 · 8,9 |
| 438–458 | HZ06 · 20,35 | «¡Fiel!» | ídem | 15,006 · 7,9 |
| 458–534 | HZ15 · 0,48 | «Yo lo que quiero pedir de Navidad es un conejito.» | tira | **15,682 · 17,7** |
| 534–756 | HZ17 · 0,5 | «Yo lo que quiero en Navidad es a Cristo en mi vida… y también quiero una Biblia muy grande.» | tira → hero «a *Cristo* en mi vida» (f612) + «y una Biblia muy *grande*» (f696) | **18,222 · 21,3** |
| 756–873 | DR05 · 0,1 | caras que miran al dron y saludan; el dron sube | — | 25,629 · 11,8 |
| 873–943 | HZ08 · 0,55 | «¡Misericordia, Amor y Servicio!» | hero con los tres subrayados | **29,528 · 16,1** (la pieza se llena) |
| 943–1095 | HZ19 · 0,4 | «¡Dios es bueno!» + ⚠ «¡Aleluya!» | tira (solo la 1.ª) · corazones f1039 | 31,840 · 11,9 |
| 1095–1192 | DR04 · 1,2 | el dron cruza el pasillo de niñas | — | 36,917 · 13,7 |
| 1192–1372 | HZ32 · 0,7 | «¡Gracias a Dios por la Navidad!», brazos arriba a 4,3 s (f1300) | hero arriba; la estrella sube en f1303 | **40,145 · 15,4** |
| 1372–1482 | DR07 · 5,6 | el círculo desde el cielo | hero «Esta Navidad, dales otra razón para dar gracias.»; la estrella baja y aterriza en f1466 | 46,164 · 11,2 |
| 1482–1815 | papel | el CTA compacto (02-layout) | resumen f1490 · pasos f1506/1545/1595 · cuenta f1553 · fechas f1625 · corazones f1650 · firma f1675 | **49,831 · 15,6** |
| 1815 | — | fin: el fundido coseno de la música acaba aquí | — | 60,919 · 18,3 (no suena) |

## Voces

Cada plano que habla suena con su WAV tal cual (`mas-097/<clip>.wav`) y UNA ganancia que lleva su ventana de voz a −18 LUFS (medida con `limites-voz.py --margen 12`, `herramientas/medir-voces.mjs`). Cortes en J/L donde una sílaba cruza el corte (HZ15 → HZ17, HZ08, HZ19).

## Música

Una sola pista, de corrido (trozos consecutivos de la misma fuente solo por el límite de 60 valores de volumen de ffmpeg). Sola ×0,79 (≈ −22 LUFS); bajo las voces ×0,31 (≈ −30); bajo los gritos (lema, «¡Dios es bueno!», «¡Gracias…!») ×0,55; la letanía es UNA bajada (los huecos < 20 f se funden). Fundido coseno en f1765–f1815.

## Cues de sonido (familia orgánica del 097, todo bajo las voces)

Subrayado «amarnos» f96 · óvalo y destello de «Cristo» f620/f626 · trazo del lema f875 · corazones f1039 · viento del pasillo f1164 · destello de los brazos f1303 · estrella del puente f1388 y su aterrizaje f1466 · hoja f1482 · contador · «+1» · estrellas de los pasos · caminos.

## Puertas de control

1. `npm run lint` en `remotion/`.
2. `node remotion/src/motor/metraje/revisar-metraje.mjs remotion/src/proyectos/099/metraje-099.ts`.
3. `node manuales/diseno-sonoro/scripts/revisar-audio.mjs remotion/src/proyectos/099/audio-099.ts --fps 30 --duracion 1815`.
4. `node proyectos/099/revisar-099.mjs`: nombres de niñas, VT32/VT19, el «¡Tres!» de HZ32, cada corte de acto en su golpe (≤ 2 f), la música de corrido sin huecos, la cuenta dígito a dígito, ni «20 de noviembre» ni «la Nuestra» en pantalla.
5. Stills → prueba 720p (pico < −1 dBFS, la música nunca calla) → el usuario → final.
