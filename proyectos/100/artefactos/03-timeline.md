# 03 · Timeline — proyecto 100

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen `metraje-100.ts`, `textos-100.ts`, `audio-100.ts` y `cues-100.ts`.

Comp a 30 fps; frame `f` = segundo `318,641 + f/30` de la pista. Golpes medidos con
`proyectos/100/herramientas/medir-cancion.py` (subidas ≥ 6 dB en 15 ms, 80–3000 Hz; `proyectos/100/musica/golpes-100.json`).
El compás (87 BPM) cae cada 83,6 f: f36 · 120 · 203 · 287 · 371 · 455 · 538 · 622 · 706 · 789 · 873 · 957 · 1041 · 1124 · 1208 · 1292.

## Planos

| # | Frames | Clip · desde (s) | Golpe del corte | Voz / texto |
|---|---|---|---|---|
| P01 | 0–203 | HZ20 · 0,0 | f203 · 12 dB | «¡Bienvenidos a la Nuestra!» (audio 0,4–4,95 s) · kicker «MAS Estrellitas 2026» |
| P02 | 203–287 | VT13 · 0,6 | f287 · 22 dB | «¿Cuáles son tus sueños?» → «Ser *policía*.» |
| P03 | 287–350 | HZ14 · 0,45 | f350 · 16 dB | pegatina «una radio» |
| P04 | 350–433 | HZ15 · 0,4 | f433 · 14 dB | pegatina «un conejito» |
| P05 | 433–507 | HZ16 · 0,45 | f507 · 12 dB | pegatina «un bafle» |
| P06 | 507–538 | HZ28 · 1,4 | f538 · 12 dB | los regalos en alto, risas |
| P07 | 538–622 | HZ10 · 0,75 | f622 · 9 dB | «¡Feliz Navidad para todos!» |
| P08 | 622–685 | HZ08 · 0,65 | f685 · 12 dB | hero «¡Misericordia, Amor y Servicio!» |
| P09 | 685–789 | HZ19 · 0,25 | f789 · 9 dB | «¡Dios es bueno!» (el audio se calla en el hueco de 3,45 s: la 2.ª frase, sin oír, no suena) |
| P10 | 789–873 | DR02 · 9,0 × 1000/1001 | f873 · 10 dB | el grupo saluda al dron |
| P11 | 873–936 | DR04 · 1,2 × 1000/1001 | f936 · 14 dB | el pasillo en rasante |
| P12 | 936–1124 | DR05 · 0,7 × 1000/1001 | f1124 · 12 dB | las caras miran arriba y el dron sube |
| P13 | 1124–1292 | HZ32 · 0,7 | f1292 · 10 dB | hero «¡Gracias a Dios por la Navidad!» · estrellita con los brazos (≈ f1235) |
| P14 | 1292–1495 | VT36 · 0,1 | — (el papel tapa) | tira índigo «Ellas reciben su regalo gracias a MAS Estrellitas.» |
| papel | 1491–1800 | — | f1491 · 11 dB (la nota del outro) | el CTA compacto |

## Música (una sola pista, de corrido)

Ganancia por parte (la canción va masterizada a −10 LUFS en el pleno): sola ≈ −27 (ruptura) · −22,5 (subida) · −21 (pleno) ·
−22 (bajada) · −24,5 (outro). Bajo las voces habladas ×0,4 (−8 dB); bajo los gritos ×0,65 (−3,7 dB). Fundido coseno en los últimos 60 f.

## Voces

Cada plano con su WAV tal cual y una ganancia hasta −18 LUFS (`voces-100.ts`, medido con `limites-voz.py --margen 12`), tope +18 dB.

## SFX (pocos: la canción ya golpea)

Pop bajo en cada pegatina · sparkle en la estrellita del clímax · papel al entrar la hoja · sparkle en cada estrella de los pasos.
