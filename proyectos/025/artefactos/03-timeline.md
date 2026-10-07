# 03 · Timeline — proyecto 025

> Paso 3 de 3. El frame exacto de cada cosa. De aquí salen, casi copiando: `metraje-025.ts` · `audio-025.ts` · `subtitulos-025.ts`. **fps de la comp: 30** → `frame = round(segundo × 30)`; todos los números son frames absolutos de la composición, salvo `desde` (frames del clip fuente).

## La música: golpes medidos (`musica/golpes-025.json`)

*Heaven on Earth* (sha 8 `acd99178`), lounge/chill †, sin pulso. `INICIO_MUSICA` = 5386/30 = 179,533 s (a 50 ms antes del golpe de entrada). El frame en que SUENA un golpe es `round((t + 0,012 − INICIO + 0,042) × 30)`.

| Golpe | t (s de la canción) | dB | frame | Lo que entra |
|---|---|---|---|---|
| apertura | 179,584 | 15,8 | 3 | la casa (frame 0, a corte) |
| hook | 182,995 | 9,2 | 105 | Isabella (la disolvencia acaba aquí) |
| ventanal | 187,159 | 10,8 | 230 | acaba el hook · el paseo (a corte) |
| bloques | 189,490 | 17,9 | 300 | el muro de bloques de vidrio |
| abierto | 191,962 | 14,6 | 374 | el espacio abierto (el plano más largo del paseo) |
| mitad | 195,980 | 10,2 | 495 | Isabella (disolvencia) |
| alcoba | 200,617 | 15,5 | 634 | acaba la mitad (3 f tras su última palabra) · la alcoba (a corte) |
| deck | 202,409 | 10,7 | 688 | el deck |
| vista | 204,287 | 13,6 | 744 | el edificio desde el aire (la vista, el plano más largo del bloque 5) |
| cta | 207,727 | 11,5 | 847 | Isabella con el CTA (a corte) |
| **caída** | **209,5** | | **901** | la canción cae (−13,8 → −24,1 → silencio en tramos de 5 s: 10,3 / 56 dB) dentro de la toma del CTA |

## Los planos

| # | `id` | Bloque | Espacio | Función | Clip · tramo | `en` | `dur` | `desde` (f) | Entrada |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `c01-fachada` | 1 | exterior: la jardinera, los helechos y el camino | situar (llegar) | RC23 · 0,00-3,50 s | 0 | 105 | 0 | corte |
| 2 | `c02-hook` | 2 | INT-VENTANAL | prometer (el filtro) | HK09 | 105 | 125 | 14 | disolver (f93-105) |
| 3 | `c03-ventanal` | 3 | el ventanal | llevar (seguir) | RC04 · 3,00-5,33 s | 230 | 70 | 90 | corte |
| 4 | `c04-bloques` | 3 | el muro de bloques de vidrio | revelar | RC02 · 5,50-7,97 s | 300 | 74 | 165 | corte |
| 5 | `c05-abierto` | 3 | el espacio abierto | revelar (la medida) | RC07 · 7,00-11,03 s | 374 | 121 | 210 | corte |
| 6 | `c06-mitad` | 4 | INT-ABIERTO | seleccionar | MD11 | 495 | 139 | 19 | disolver (f483-495) |
| 7 | `c07-alcoba` | 5 | la alcoba y su ventana | cómo se vive | RC13 · 9,00-10,80 s | 634 | 54 | 270 | corte |
| 8 | `c08-deck` | 5 | el deck | llevar a otro espacio | RC10 · 2,00-3,87 s | 688 | 56 | 60 | corte |
| 9 | `c09-vista` | 5 | el edificio desde el aire | la vista (la recompensa) | DR153 · 3,50-6,93 s | 744 | 103 | 105 | corte |
| 10 | `c10-cta` | 6 | PATIO | invitar | CT03 (2.ª mitad) | 847 | 69 | 111 | corte |
| 11 | `c11-cierre` | 6 | la tarjeta | cerrar | negro liso | 916 | 60 | — | corte |

Total: **976 f (32,5 s)**. La voz de cada toma, en frames de la comp (`en + round((s − desde/30) × 30)`):

| Toma | Su voz en el clip | En la comp | Aire antes de la 1.ª palabra tras el golpe | Aire tras la última antes del corte |
|---|---|---|---|---|
| HK09 (`voz` 0,95-4,12 s · −19,1 LUFS) | f119,5-f215 | 14,5 f | 15 f (corte a f230) |
| MD11 (1,00-5,16 s · −17,9 LUFS) | f506-f631 | 11 f | **3 f** (corte a f634) |
| CT03 (3,96-5,67 s · −19,1 LUFS) | f854,8-f906 | 7,8 f | el resto de la toma (10 f) y la tarjeta |

## La mezcla (`audio-025.ts`)

| Qué | Nivel |
|---|---|
| Voz de Isabella (hook · mitad · CTA) | −21 LUFS (ganancias: −1,9 · −3,1 · −1,9 dB) |
| Música sola | −15 LUFS (meseta de la canción −13,7: ALTO −1,3 dB) |
| Música bajo la voz | ALTO × 0,16 (−15,9 dB): ≈ −31 LUFS, ≥ 9 LU bajo ella (se mide con la sonoridad de la canción EN cada ventana de voz: hook −14,1, mitad −13,1, CTA −16,6) |
| Fundido de bajada | 10 f tras el golpe del hook (acaba en f115, 4,5 f antes de la primera palabra), 8 f tras el de la mitad (acaba en f503, 3 f antes) y 7 f tras el del CTA (acaba en f854, 0,8 f antes) |
| Fundido de subida | 13 f tras el hook (lo que cabe hasta 2 f antes del golpe de f230); **en la mitad no cabe: el golpe de f634 suena con la música abajo y sube después (24 f)**; tras el CTA, 10 f |
| Final | la canción cae sola dentro de la toma del CTA (f901) y se apaga en línea recta bajo la tarjeta hasta f974 |
