# Mix «The life that God has for me» — análisis de la música

> Analizado el 2026-11-11 · `/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/The life that God has for me.mp3` (MP3 192 kbps, 44,1 kHz estéreo, 61 min 46 s, 89 MB)
> Para los reels de **Casa · El Retiro · Senderos de Compostela** (ver el [catálogo de la propiedad](../material/casa-el-retiro-senderos-de-compostela.md), §11). El audio **no se ha copiado al repo** (público): se queda en el SSD; ver «Decisión pendiente» al final.
> Estado: **medido, sin oír.** Todo lo de aquí sale de decodificar el MP3 entero y medirlo; el género y el sentimiento son inferidos (†). El oído decide.

## 0. Resumen

- **17 pistas** de 3 min 8 s a 4 min 16 s (suma 61 min 35 s), separadas por silencio digital de 0,15 a 1,4 s. Las marcas de la lista que pegaste coinciden con el inicio real: la pista empieza entre 0,3 y 1,1 s después de su marca (la lista redondea hacia abajo).
- **Todas instrumentales:** Whisper no transcribe palabras cantadas en ninguna (un «you» suelto en la pista 7, ruido). Sirven bajo la voz de Isabella sin pelear con una letra.
- **Todas a ≈ 120-123 BPM** (la mediana de los golpes fuertes cae entre 0,48 y 0,50 s). Un detector automático lee 10 de ellas a 82 BPM: es el mismo compás leído a 2:3, no otro tempo.
- **Ninguna tiene un pulso rígido** según la vara del repo (`rejilla.py`: ≥ 70 % de los golpes fuertes a ≤ 15 ms y desvío ≤ 15 ms). La más cercana es la pista 2 (86 % a ≤ 15 ms, pero desvío de 17 ms). El resto van **por frases**: los cortes se anclan en los golpes medidos, no en una recta.
- **Sonoridad muy pareja:** −13,0 a −15,3 LUFS integrados (picos reales de −0,7 a −3,5 dBFS). Bajo la voz de Isabella a −15 LUFS, la música sola a −15 LUFS pide entre +0,3 y −2,0 dB de ganancia (tabla §5).
- **13 de 17 abren a nivel pleno** (a menos de 3 dB de su nivel medio) desde el silencio digital: en 0:00 hay golpe en el frame 0. Las más suaves al arrancar son la 1 (−16 dB bajo su nivel medio), la 2 (−7), la 16 (−5) y la 14 (−4); la 5 y la 14 tienen una intro larga (31 s y 14 s) y la 1, 2, 12, 13 y 16 tardan de 5 a 7 s en llegar al nivel.
- **Estructura de frases de ≈ 31 s** (16 compases a 122 BPM): los cambios de sección caen hacia el 0:31, 1:02, 1:34, 2:04 y 2:36 en la mayoría. Eso da puntos de entrada limpios cada 31 s.

## 1. Las 17 pistas dentro del archivo

`ini` y `fin` son segundos del **archivo del mix** (medidos sobre el audio decodificado; el hueco es el silencio digital de antes de la pista).

| # | Título | Lista | `ini` (s) | `fin` (s) | Duración | Hueco antes |
|---|---|---|---|---|---|---|
| 1 | Rejection Number 87 | 00:00:00 | 0,00 (0:00) | 207,04 (3:27) | 3:27 (207,0 s) | 0,00 s |
| 2 | The Last Light in the Office | 00:03:27 | 207,30 (3:27) | 416,36 (6:56) | 3:29 (209,1 s) | 0,26 s |
| 3 | Selling Dreams to Strangers | 00:06:56 | 416,86 (6:56) | 626,73 (10:26) | 3:29 (209,9 s) | 0,49 s |
| 4 | No Reception in the Weight Room | 00:10:26 | 626,91 (10:26) | 844,90 (14:04) | 3:37 (218,0 s) | 0,18 s |
| 5 | Deadlines & Deadlifts | 00:14:05 | 846,08 (14:06) | 1047,23 (17:27) | 3:21 (201,2 s) | 1,18 s |
| 6 | The Pipeline Doesn’t Pray | 00:17:28 | 1048,60 (17:28) | 1261,93 (21:01) | 3:33 (213,3 s) | 1,37 s |
| 7 | The Gym Opens at Five | 00:21:02 | 1262,25 (21:02) | 1504,30 (25:04) | 4:02 (242,1 s) | 0,32 s |
| 8 | Nobody Claps for the Reps | 00:25:05 | 1505,46 (25:05) | 1712,86 (28:32) | 3:27 (207,4 s) | 1,16 s |
| 9 | Built Different, Billed Different | 00:28:33 | 1713,77 (28:33) | 1920,69 (32:00) | 3:26 (206,9 s) | 0,91 s |
| 10 | Nobody Sees the Follow-Ups | 00:32:01 | 1921,38 (32:01) | 2143,98 (35:43) | 3:42 (222,6 s) | 0,69 s |
| 11 | Six Figures in Airplane Mode | 00:35:44 | 2144,91 (35:44) | 2362,80 (39:22) | 3:37 (217,9 s) | 0,93 s |
| 12 | Rich in Unanswered Emails | 00:39:23 | 2363,31 (39:23) | 2619,72 (43:39) | 4:16 (256,4 s) | 0,51 s |
| 13 | Another Lead, Another Life | 00:43:40 | 2621,07 (43:41) | 2808,96 (46:48) | 3:07 (187,9 s) | 1,35 s |
| 14 | A Calendar Full of Maybes | 00:46:48 | 2809,11 (46:49) | 3030,99 (50:30) | 3:41 (221,9 s) | 0,15 s |
| 15 | My Competition Hit Snooze | 00:50:31 | 3031,70 (50:31) | 3258,36 (54:18) | 3:46 (226,7 s) | 0,71 s |
| 16 | I Was Working When It Happened | 00:54:18 | 3258,53 (54:18) | 3485,80 (58:05) | 3:47 (227,3 s) | 0,16 s |
| 17 | Commission Checks & Calluses | 00:58:06 | 3486,57 (58:06) | 3705,86 (61:45) | 3:39 (219,3 s) | 0,77 s |

## 2. Reglas para usarla

Son las del [catálogo de la biblioteca](../musica/catalogo-musica.md) (§1), con lo propio de este mix:

1. **Decodifica a WAV el mix entero y corta del WAV**, no del MP3 con `-ss` (deja ~20 ms de silencio y el golpe llega tarde). Los tiempos de §3 son **segundos de la pista**; para cortar directamente del WAV del mix, sumar el `ini` de §1 (tabla §4).
2. **`desde` ya lleva 30 ms de colchón** antes del golpe: `entra: 1` frame y no más, como en el catálogo.
3. **Cada pista abre tras 0,15-1,4 s de silencio digital**: si cortas del mix, empieza en el `ini` de §1 (no en la marca de la lista), o el golpe llega tarde.
4. **Sin letra**: no hace falta evitar tramos por palabras; sí por densidad (4-6 golpes por segundo): bajo la voz, la música baja ≈ 15 LU y la melodía no cuenta.
5. **Graves dominantes** (75-84 % de la potencia por debajo de 150 Hz): con la voz a −15 LUFS conviene mirar la mezcla en un altavoz de móvil; un paso alto suave a ≈ 80-100 Hz solo en el lecho bajo la voz es una opción, **sin oír**.
6. **Una pista, una propiedad**: dentro de esta propiedad no se repite ninguna (regla del canal). Hay 17 pistas para 18 guiones: ver §11 del catálogo de la propiedad.

## 3. Puntos de entrada por pista

Como en el catálogo: **`desde`** en segundos de la pista (entre paréntesis, `m:ss`); **★** = calidad del gancho (★★★ ≥ 0,9 · ★★ ≥ 0,75 · ★ menos); **⚠** = la pista abre suave (los primeros 0,5 s a más de 6 dB bajo su nivel medio), no hay golpe que aprovechar; **pico +N s** = segundos desde el inicio del vídeo hasta el clímax de esa ventana. Candidatos: el inicio de la pista y los golpes ≥ 8 dB pegados a un cambio de sección (±0,5 s); puntúa 40 % gancho y 60 % desarrollo, con el clímax hacia el 75 % del vídeo.

| Pista | Desde 0:00 | Vídeo de 30 s | Vídeo de 45 s | Vídeo de 60 s | Vídeo de 80 s |
|---|---|---|---|---|---|
| 1. Rejection Number 87 | ⚠ el nivel tarda 6,0 s en llegar | **123,71** (2:03) ★★★ · pico +22 s | **0,00** (0:00) ★ ⚠ · pico +40 s | **0,00** (0:00) ★ ⚠ · pico +40 s | **0,00** (0:00) ★ ⚠ · pico +74 s |
| 2. The Last Light in the Office | ⚠ el nivel tarda 5,5 s en llegar | **155,98** (2:35) ★★★ · pico +30 s | **6,71** (0:06) ★★★ · pico +39 s | **6,71** (0:06) ★★★ · pico +53 s | **6,71** (0:06) ★★★ · pico +53 s |
| 3. Selling Dreams to Strangers | ✅ sirve | **106,58** (1:46) ★★★ · pico +27 s | **142,38** (2:22) ★★★ · pico +37 s | **106,58** (1:46) ★★★ · pico +34 s | **106,58** (1:46) ★★★ · pico +72 s |
| 4. No Reception in the Weight Room | ✅ sirve | **150,84** (2:30) ★★★ · pico +26 s | **156,44** (2:36) ★★★ · pico +43 s | **150,84** (2:30) ★★★ · pico +48 s | **127,81** (2:07) ★★★ · pico +71 s |
| 5. Deadlines & Deadlifts | ❌ intro baja de 31 s | **143,96** (2:23) ★★ · pico +28 s | **143,18** (2:23) ★★ · pico +38 s | — sin golpe claro (intro baja): refuerza con un SFX | — sin golpe claro (intro baja): refuerza con un SFX |
| 6. The Pipeline Doesn’t Pray | ✅ sirve | **7,47** (0:07) ★★ · pico +29 s | **123,90** (2:03) ★ · pico +35 s | **0,00** (0:00) ★ · pico +48 s | **123,90** (2:03) ★ · pico +75 s |
| 7. The Gym Opens at Five | ✅ sirve | **117,41** (1:57) ★ · pico +28 s | **186,79** (3:06) ★★★ · pico +44 s | **171,29** (2:51) ★★★ · pico +60 s | **92,58** (1:32) ★★★ · pico +59 s |
| 8. Nobody Claps for the Reps | ✅ sirve | **42,98** (0:42) ★★★ · pico +19 s | **141,49** (2:21) ★★★ · pico +36 s | **120,36** (2:00) ★★ · pico +57 s | **120,36** (2:00) ★★ · pico +57 s |
| 9. Built Different, Billed Different | ⚠ el nivel tarda 2,0 s en llegar | **22,30** (0:22) ★★★ · pico +25 s | **0,00** (0:00) ★★ · pico +40 s | **6,83** (0:06) ★★ · pico +48 s | **0,00** (0:00) ★★ · pico +78 s |
| 10. Nobody Sees the Follow-Ups | ✅ sirve | **140,14** (2:20) ★★★ · pico +29 s | **140,14** (2:20) ★★★ · pico +45 s | **148,17** (2:28) ★ · pico +53 s | **28,81** (0:28) ★★ · pico +80 s |
| 11. Six Figures in Airplane Mode | ✅ sirve | **148,40** (2:28) ★★ · pico +30 s | **125,12** (2:05) ★★★ · pico +38 s | **125,12** (2:05) ★★★ · pico +54 s | **125,12** (2:05) ★★★ · pico +75 s |
| 12. Rich in Unanswered Emails | ⚠ el nivel tarda 6,0 s en llegar | **174,85** (2:54) ★ · pico +29 s | **0,00** (0:00) ★ · pico +34 s | **151,84** (2:31) ★★★ · pico +57 s | **151,84** (2:31) ★★★ · pico +80 s |
| 13. Another Lead, Another Life | ⚠ el nivel tarda 6,5 s en llegar | **138,52** (2:18) ★★★ · pico +26 s | **138,52** (2:18) ★★★ · pico +26 s | **73,96** (1:13) ★★★ · pico +60 s | **73,96** (1:13) ★★★ · pico +60 s |
| 14. A Calendar Full of Maybes | ❌ intro baja de 14 s | **122,04** (2:02) ★★★ · pico +24 s | **122,63** (2:02) ★★★ · pico +36 s | **122,04** (2:02) ★★★ · pico +52 s | **122,04** (2:02) ★★★ · pico +77 s |
| 15. My Competition Hit Snooze | ✅ sirve | **0,00** (0:00) ★ · pico +24 s | **116,13** (1:56) ★★ · pico +39 s | **140,91** (2:20) ★★★ · pico +44 s | **116,13** (1:56) ★★ · pico +69 s |
| 16. I Was Working When It Happened | ⚠ el nivel tarda 7,0 s en llegar | **150,33** (2:30) ★★★ · pico +29 s | **126,72** (2:06) ★★ · pico +33 s | **150,33** (2:30) ★★★ · pico +53 s | **126,72** (2:06) ★★ · pico +76 s |
| 17. Commission Checks & Calluses | ✅ sirve | **142,54** (2:22) ★★★ · pico +22 s | **142,54** (2:22) ★★★ · pico +32 s | **59,55** (0:59) ★★ · pico +44 s | **62,49** (1:02) ★★★ · pico +41 s |

Con «Desde 0:00 ✅» la pista arranca ya a nivel desde el silencio digital: el frame 0 del vídeo es el golpe. Con vídeos de 30 s varias entradas caen en la segunda mitad de la pista (2:00-3:00): ahí está el clímax de casi todas.

## 4. Dónde cortar en el archivo del mix

Los mismos `desde` de §3 sumados al `ini` de cada pista, para cortar directamente del WAV del mix (segundos del archivo).

| Pista | 30 s | 45 s | 60 s | 80 s |
|---|---|---|---|---|
| 1. Rejection Number 87 | 123,71 (2:03) | 0,00 (0:00) | 0,00 (0:00) | 0,00 (0:00) |
| 2. The Last Light in the Office | 363,28 (6:03) | 214,01 (3:34) | 214,01 (3:34) | 214,01 (3:34) |
| 3. Selling Dreams to Strangers | 523,44 (8:43) | 559,24 (9:19) | 523,44 (8:43) | 523,44 (8:43) |
| 4. No Reception in the Weight Room | 777,75 (12:57) | 783,35 (13:03) | 777,75 (12:57) | 754,72 (12:34) |
| 5. Deadlines & Deadlifts | 990,04 (16:30) | 989,26 (16:29) | — | — |
| 6. The Pipeline Doesn’t Pray | 1056,07 (17:36) | 1172,50 (19:32) | 1048,60 (17:28) | 1172,50 (19:32) |
| 7. The Gym Opens at Five | 1379,66 (22:59) | 1449,04 (24:09) | 1433,54 (23:53) | 1354,83 (22:34) |
| 8. Nobody Claps for the Reps | 1548,44 (25:48) | 1646,95 (27:26) | 1625,82 (27:05) | 1625,82 (27:05) |
| 9. Built Different, Billed Different | 1736,07 (28:56) | 1713,77 (28:33) | 1720,60 (28:40) | 1713,77 (28:33) |
| 10. Nobody Sees the Follow-Ups | 2061,52 (34:21) | 2061,52 (34:21) | 2069,55 (34:29) | 1950,19 (32:30) |
| 11. Six Figures in Airplane Mode | 2293,32 (38:13) | 2270,03 (37:50) | 2270,03 (37:50) | 2270,03 (37:50) |
| 12. Rich in Unanswered Emails | 2538,16 (42:18) | 2363,31 (39:23) | 2515,15 (41:55) | 2515,15 (41:55) |
| 13. Another Lead, Another Life | 2759,59 (45:59) | 2759,59 (45:59) | 2695,03 (44:55) | 2695,03 (44:55) |
| 14. A Calendar Full of Maybes | 2931,15 (48:51) | 2931,74 (48:51) | 2931,15 (48:51) | 2931,15 (48:51) |
| 15. My Competition Hit Snooze | 3031,70 (50:31) | 3147,83 (52:27) | 3172,61 (52:52) | 3147,83 (52:27) |
| 16. I Was Working When It Happened | 3408,86 (56:48) | 3385,25 (56:25) | 3408,86 (56:48) | 3385,25 (56:25) |
| 17. Commission Checks & Calluses | 3629,11 (60:29) | 3629,11 (60:29) | 3546,12 (59:06) | 3549,06 (59:09) |

## 5. Medido: sonoridad, ritmo y arco de energía

- **LUFS** = sonoridad integrada de la pista (ebur128); **LRA** = rango de sonoridad; **pico** = pico real; **→ −15** = ganancia para dejar la música sola a −15 LUFS (el nivel de la voz de Isabella en el canal).
- **Ritmo**: BPM de los golpes fuertes (mediana de sus intervalos); la rejilla de `rejilla.py` sobre 20-110 s. **Arranque** = nivel de los primeros 0,5 s respecto al nivel medio de la pista.
- **Clímax**: máximo de la curva de volumen suavizada a 4 s (se ignora la intro, los primeros 15 s o el 8 %, y los 3 últimos s); entre paréntesis, el tramo a menos de 1,5 dB del máximo.

| # | Dur. | LUFS | LRA | Pico | → −15 | BPM | Ritmo (`rejilla.py`) | Arranque | Brillo | Percusivo | Clímax | Secciones (s) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 3:27 | −13,7 | 9,4 | −1,4 | −1,3 dB | 120 | frases (41 %, desvío 32 ms) | −16,2 dB | 583 Hz | 20 % | **2:25** (1:07–3:02) · 2.º 3:01 (−0,1 dB) | 32, 124, 128, 153, 160, 184, 192, 200 |
| 2 | 3:29 | −13,1 | 6,1 | −1,5 | −1,9 dB | 120 | casi pulso (86 % a ≤ 15 ms, desvío 17 ms) | −7,4 dB | 721 Hz | 26 % | **3:06** (0:41–3:07) · 2.º 2:25 (−0,2 dB) | 7, 32, 92, 96, 128, 156, 160, 188 |
| 3 | 3:29 | −15,0 | 4,9 | −2,0 | 0,0 dB | 121 | frases (42 %, desvío 75 ms) | −2,8 dB | 593 Hz | 34 % | **2:59** (2:09–3:05) · 2.º 2:20 (−0,6 dB) | 92, 95, 107, 127, 143, 158, 187, 207 |
| 4 | 3:37 | −13,0 | 6,6 | −1,4 | −2,0 dB | 124 | frases (30 %, desvío 81 ms) | −2,2 dB | 799 Hz | 28 % | **3:19** (2:38–3:21) · 2.º 2:57 (−0,8 dB) | 31, 90, 94, 128, 151, 156, 202, 214 |
| 5 | 3:21 | −14,0 | 7,9 | −2,2 | −1,0 dB | 120 | frases (61 %, desvío 34 ms) | −1,9 dB | 650 Hz | 19 % | **3:01** (2:01–3:17) | 32, 58, 63, 144, 160, 184, 192 |
| 6 | 3:33 | −14,0 | 6,3 | −1,8 | −1,0 dB | 122 | frases (19 %, desvío 54 ms) | 0,8 dB | 861 Hz | 25 % | **3:19** (1:56–3:22) · 2.º 2:58 (−0,9 dB) | 5, 8, 31, 59, 63, 124, 156, 203 |
| 7 | 4:02 | −13,9 | 4,2 | −1,5 | −1,1 dB | 123 | frases (12 %, desvío 52 ms) | −0,1 dB | 764 Hz | 36 % | **3:51** (3:15–3:54) · 2.º 3:19 (−0,4 dB) | 31, 93, 118, 124, 172, 186, 214, 218, 234 |
| 8 | 3:27 | −15,2 | 3,7 | −3,2 | 0,2 dB | 122 | frases (23 %, desvío 72 ms) | −2,1 dB | 643 Hz | 37 % | **2:57** (1:29–3:19) · 2.º 2:27 (−0,3 dB) | 43, 47, 75, 79, 110, 121, 142, 200 |
| 9 | 3:26 | −14,6 | 5,4 | −2,3 | −0,4 dB | 122 | frases (31 %, desvío 73 ms) | 3,1 dB | 594 Hz | 46 % | **2:02** (0:33–3:07) · 2.º 2:50 (−0,6 dB) | 7, 19, 22, 31, 125, 156, 188, 204 |
| 10 | 3:42 | −14,5 | 4,2 | −3,3 | −0,5 dB | 123 | frases (37 %, desvío 52 ms) | 0,4 dB | 600 Hz | 38 % | **3:21** (1:41–3:24) · 2.º 2:06 (−0,5 dB) | 29, 32, 101, 140, 148, 156, 172, 204 |
| 11 | 3:37 | −14,0 | 4,5 | −0,8 | −1,0 dB | 122 | frases (40 %, desvío 56 ms) | 3,0 dB | 1064 Hz | 27 % | **3:20** (1:36–3:29) · 2.º 2:59 (−0,7 dB) | 15, 118, 126, 149, 157, 184, 189, 211 |
| 12 | 4:16 | −14,2 | 9,5 | −1,1 | −0,8 dB | 122 | frases (17 %, desvío 80 ms) | 0,2 dB | 881 Hz | 21 % | **2:26** (1:56–3:57) · 2.º 2:01 (−0,9 dB) | 32, 152, 160, 167, 175, 183, 191, 217, 223, 238 |
| 13 | 3:07 | −14,5 | 7,1 | −2,2 | −0,5 dB | 122 | frases (34 %, desvío 87 ms) | −2,0 dB | 649 Hz | 28 % | **2:44** (1:36–2:58) · 2.º 2:13 (−0,6 dB) | 16, 74, 94, 125, 139, 156, 180 |
| 14 | 3:41 | −14,7 | 7,9 | −3,5 | −0,3 dB | 123 | frases (37 %, desvío 44 ms) | −3,9 dB | 697 Hz | 18 % | **3:33** (1:55–3:37) · 2.º 1:57 (−0,9 dB) | 31, 59, 62, 122, 156, 203, 211, 219 |
| 15 | 3:46 | −13,6 | 7,2 | −0,7 | −1,4 dB | 123 | frases (20 %, desvío 56 ms) | −2,8 dB | 1244 Hz | 29 % | **3:05** (1:42–3:14) | 7, 16, 110, 116, 141, 195, 211, 218 |
| 16 | 3:47 | −14,1 | 8,2 | −1,8 | −0,9 dB | 123 | frases (21 %, desvío 63 ms) | −5,3 dB | 553 Hz | 21 % | **3:23** (1:10–3:31) · 2.º 1:58 (−0,0 dB) | 8, 31, 54, 127, 151, 157, 212, 220 |
| 17 | 3:39 | −15,3 | 4,1 | −2,5 | 0,3 dB | 121 | frases (34 %, desvío 59 ms) | −2,6 dB | 662 Hz | 29 % | **1:44** (0:52–3:30) · 2.º 3:12 (−0,1 dB) | 59, 63, 121, 125, 143, 157, 184, 214 |

Dinámica casi plana: con el rango de la curva (del 10 % al 95 %) ≤ 5 dB, las pistas 7 y 10; con LRA < 5 LU (la etiqueta `#dinámica-plana`), las 3, 7, 8, 10, 11 y 17. En ellas el «clímax» es de arreglo y la entrada la decide el brillo, no el volumen: es la parte menos fiable.

## 6. Catálogo: género, sentimiento, BPM y parte más emotiva

Mismo formato que la tabla de la biblioteca. **†** = no identifiqué las piezas ni las escuché: género y sentimiento los inferí de lo medido (modo mayor/menor, brillo, peso de la percusión, graves y dinámica). Las tonalidades son poco fiables (confianza 0,29 a 0,72; la de la pista 3, la más débil).

| Pista · duración · tonalidad | Género † | Sentimiento † | BPM | Tags | Parte más emotiva |
|---|---|---|---|---|---|
| 1. Rejection Number 87<br>3:27 · Do mayor (0,50) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (armonía y pads en primer plano) | luminoso, esperanzado, ascendente | ≈ 120 | #instrumental #120bpm #luminoso #armónico #crescendo | **2:25** (1:07–3:02) · 2.º 3:01 (−0,1 dB) |
| 2. The Last Light in the Office<br>3:29 · Do mayor (0,47) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | luminoso, esperanzado, ascendente | ≈ 120 | #instrumental #120bpm #luminoso | **3:06** (0:41–3:07) · 2.º 2:25 (−0,2 dB) |
| 3. Selling Dreams to Strangers<br>3:29 · Mi menor (0,29) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | nocturno, introspectivo, sobrio | ≈ 121 | #instrumental #120bpm #nocturno #dinámica-plana | **2:59** (2:09–3:05) · 2.º 2:20 (−0,6 dB) |
| 4. No Reception in the Weight Room<br>3:37 · Fa menor (0,41) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | sobrio, tenso, decidido | ≈ 124 | #instrumental #120bpm #sobrio | **3:19** (2:38–3:21) · 2.º 2:57 (−0,8 dB) |
| 5. Deadlines & Deadlifts<br>3:21 · La menor (0,57) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (armonía y pads en primer plano) | sobrio, tenso, decidido | ≈ 120 | #instrumental #120bpm #sobrio #armónico | **3:01** (2:01–3:17) |
| 6. The Pipeline Doesn’t Pray<br>3:33 · Fa menor (0,61) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | sobrio, tenso, decidido | ≈ 122 | #instrumental #120bpm #sobrio | **3:19** (1:56–3:22) · 2.º 2:58 (−0,9 dB) |
| 7. The Gym Opens at Five<br>4:02 · Sol menor (0,36) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (percusión marcada) | sobrio, tenso, decidido | ≈ 123 | #instrumental #120bpm #sobrio #rítmico #dinámica-plana | **3:51** (3:15–3:54) · 2.º 3:19 (−0,4 dB) |
| 8. Nobody Claps for the Reps<br>3:27 · Sol# menor (0,38) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (percusión marcada) | nocturno, introspectivo, sobrio | ≈ 122 | #instrumental #120bpm #nocturno #rítmico #dinámica-plana | **2:57** (1:29–3:19) · 2.º 2:27 (−0,3 dB) |
| 9. Built Different, Billed Different<br>3:26 · Sol# menor (0,36) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (percusión marcada) | nocturno, introspectivo, sobrio | ≈ 122 | #instrumental #120bpm #nocturno #rítmico | **2:02** (0:33–3:07) · 2.º 2:50 (−0,6 dB) |
| 10. Nobody Sees the Follow-Ups<br>3:42 · Fa menor (0,48) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (percusión marcada) | nocturno, introspectivo, sobrio | ≈ 123 | #instrumental #120bpm #nocturno #rítmico #dinámica-plana | **3:21** (1:41–3:24) · 2.º 2:06 (−0,5 dB) |
| 11. Six Figures in Airplane Mode<br>3:37 · Fa menor (0,56) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | brillante, urgente, digital | ≈ 122 | #instrumental #120bpm #brillante #dinámica-plana | **3:20** (1:36–3:29) · 2.º 2:59 (−0,7 dB) |
| 12. Rich in Unanswered Emails<br>4:16 · Do mayor (0,52) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (armonía y pads en primer plano) | luminoso, esperanzado, ascendente | ≈ 122 | #instrumental #120bpm #luminoso #armónico #crescendo | **2:26** (1:56–3:57) · 2.º 2:01 (−0,9 dB) |
| 13. Another Lead, Another Life<br>3:07 · Mi menor (0,45) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | nocturno, introspectivo, sobrio | ≈ 122 | #instrumental #120bpm #nocturno | **2:44** (1:36–2:58) · 2.º 2:13 (−0,6 dB) |
| 14. A Calendar Full of Maybes<br>3:41 · Mi menor (0,65) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (armonía y pads en primer plano) | sobrio, tenso, decidido | ≈ 123 | #instrumental #120bpm #sobrio #armónico | **3:33** (1:55–3:37) · 2.º 1:57 (−0,9 dB) |
| 15. My Competition Hit Snooze<br>3:46 · Fa menor (0,48) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | brillante, urgente, digital | ≈ 123 | #instrumental #120bpm #brillante | **3:05** (1:42–3:14) |
| 16. I Was Working When It Happened<br>3:47 · Mi menor (0,72) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † (armonía y pads en primer plano) | nocturno, introspectivo, sobrio | ≈ 123 | #instrumental #120bpm #nocturno #armónico | **3:23** (1:10–3:31) · 2.º 1:58 (−0,0 dB) |
| 17. Commission Checks & Calluses<br>3:39 · La menor (0,40) | Electrónica instrumental a ≈ 120 BPM, graves dominantes † | sobrio, tenso, decidido | ≈ 121 | #instrumental #120bpm #sobrio #dinámica-plana | **1:44** (0:52–3:30) · 2.º 3:12 (−0,1 dB) |

## 7. Qué está medido y qué está interpretado

- **Medido sobre el audio** (ffmpeg, librosa, scipy y `proyectos/054/herramientas/rejilla.py`): límites de cada pista, duración, sonoridad, BPM, tonalidad, secciones, clímax, puntos de entrada y pulso.
- **Interpretado:** género, sentimiento y tags (†), y la propuesta de qué pista va con qué guion.
- **No comprobado:** el oído. Un golpe medido como fuerte puede no sonar bien como primera nota. **Escucha el primer segundo de cada entrada** antes de darla por buena.
- **Límite de la detección de pulso:** 10 de las 17 pistas se leen a 82 BPM o a 120-123 según el método; la lectura de 120 es la de los golpes fuertes. La pista 2 es la única con rejilla casi utilizable.

## 8. Decisión pendiente

El MP3 (89 MB) sigue **solo en el SSD**. Las 43 pistas de la biblioteca se versionan en este repo porque lo decidió el dueño, aunque es público y no hay licencia verificada. Para este mix **no lo he hecho**: de nuevo sería publicar 89 MB de audio ajeno en un historial permanente. Si se quiere versionar igual, hay que decirlo; mientras tanto, cada reel copia desde el SSD la pista elegida a `proyectos/NNN/original/` y se anota su sha256 en `registro-de-uso.md`.

