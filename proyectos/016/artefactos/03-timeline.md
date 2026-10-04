# 03 · Timeline — proyecto 016

> Paso 3 de 3. Anterior: [02-layout.md](02-layout.md). De aquí salen los `.ts`.

## La rejilla

Medida sobre la canción (ataque del bombo, 100 golpes entre 40 y 90 s,
residuo mediano 25 ms): **golpe k = 60,0696 + k · 0,46979 s** (127,7 BPM; el
golpe 0 es el drop). La música entra en el golpe −16, redondeado a frame
(52,567 s = 1577/30). Y el audio del render llega 42 ms TARDE respecto de su
fuente (medido por correlación en la primera prueba 720p: el corte del drop
caía 2,4 f antes de que sonara el bombo), así que el golpe `j` SUENA en el frame
**round((60,0696 + (j − 16) · 0,46979 + 0,042 − 52,567) · 30)**. Medido en la
segunda prueba: el chasquido del drop suena en el frame 226,6 y el plano entra
en el 226.

## Planos (todos a corte seco, en el golpe)

| # | Clip | Golpes | Frames | `desde` (s) | Por qué |
|---|---|---|---|---|---|
| c01 | 12324911 (mar e islote) | 0-8 | 0-114 | 1,0 | quieto y con cielo limpio: el titular se lee y es la miniatura. `pan: -6` y empuje 1,13→1,17 para que las palmeras queden por debajo del titular centrado |
| c02 | 16111565 (paseo entre palmeras) | 8-12 | 114-170 | 2,0 | llegar: la cámara avanza hacia la playa |
| c03 | 12498515 (velero) | 12-16 | 170-226 | 4,0 | el último plano tranquilo antes del drop |
| c04 | 12992103 (buggy en el agua) | 16-20 | 226-283 | 8,3 | **el drop**: el buggy sale del agua |
| c05 | 14770266 (quad cruzando el río) | 20-24 | 283-339 | 1,4 | el quad se echa encima de la cámara |
| c06 | 15308557 (playa desde el aire) | 24-28 | 339-395 | 2,0 | respiro en movimiento |
| c07 | 19109877 (catamarán) | 28-32 | 395-452 | 1,0 | la fiesta: el «todo incluido» |
| c08 | 16837285 (cascada) | 32-36 | 452-508 | 3,0 | naturaleza |
| c09 | 13007144 (palmera y mar) | 36-40 | 508-565 | 2,0 | el mar otra vez, antes del cierre |
| c10 | 13235242 (quads al atardecer) | 40-48 | 565-677 | 12,0 | el cierre: atardecer, funde a negro los últimos 24 f |

677 f = 22,57 s. El golpe 48 es el final de la frase musical que empieza en el
drop (32 golpes): cortar ahí se lee como un final, no como un tijeretazo.

## Texto

| Bloque | Frames | Posición | Líneas |
|---|---|---|---|
| `titular` | 0-114 (`entrada: 0`) | centro, escala 1,15 | «República Dominicana 2027» |

## Audio

Un tramo: `musica-016.wav` desde el 52,567 s, 677 f, ganancia **0,513** (la
canción suena a −8,2 LUFS en este tramo; se lleva a −14 LUFS, el nivel de las
plataformas, y el pico baja de +0,2 a −5,6 dBTP), entrada de 3 f (desclic) y
salida de 45 f (1,5 s).
