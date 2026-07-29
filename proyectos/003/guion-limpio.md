# Guion limpio — Proyecto 003 · "Tu embudo no vende. Descarta."

## Fuente

| Dato | Valor |
|---|---|
| Clip | `avatar/avatar_2.mp4` → `remotion/public/avatar-003.mp4` |
| Resolución | 1080 × 1920 (9:16) |
| fps del clip | **25** |
| Duración del clip | 46.12 s (1153 frames) |
| Audio | AAC · 48 kHz · estéreo |
| Voz | empieza en **0.02 s**, termina en **45.48 s** (0.64 s de silencio final) |

## Composición

| Dato | Valor | Por qué |
|---|---|---|
| Comp | `Avatar003` · 1080 × 1920 | 9:16 pedido |
| fps | **25** | regla del sistema: el fps original del clip manda (R01 · director §3a). Sin remuestreo → lip-sync exacto |
| Duración | **1153 f = 46.12 s** | regla del sistema: duración de la comp = frames del clip (director §5). La voz acaba en 45.48 s; los últimos 16 f son el silencio del clip |
| Estilo | mundo líquido / ámbar eléctrico | STYLE GUIDE del cliente |

## Guion real (transcripción, no el guion teórico)

`proyectos/003/transcripcion.json` — whisper.cpp `ggml-small`, español, timestamps
por token. **El clip manda**: el texto en pantalla se ajusta a lo que se dice.

Diferencias con el guion enviado (se respeta el clip para el timing y el guion
para la ortografía en pantalla):

| Guion enviado | Lo que dice el clip |
|---|---|
| deshacerte **de** la gente | deshacerte la gente |
| no con "buenas, ¿precio?" | no con "buenas, necesito el precio" |
| nunca le **volviste** a hablar | *(whisper oye "volví")* → en pantalla va **volviste** |
| cómo **se vería** en el tuyo | cómo seguiría el tuyo |

### Bloques y tiempos (segundos → frames @25 fps)

| # | s | frames | narrativa | texto |
|---|---|---|---|---|
| A | 0.02 – 5.52 | 0 – 138 | **hook** | Tu embudo no está hecho para venderle a la gente. Está hecho para **deshacerte** de la gente. |
| B | 5.93 – 12.37 | 148 – 309 | **dato** | Suena feo, pero es literal. De cada **100** clics que pagas, **95** no te compran nunca. |
| C | 12.66 – 17.22 | 317 – 431 | **tesis** | Y el embudo no está para convencerlos. Hace sólo **tres cosas**. |
| D1 | 17.45 – 21.42 | 436 – 536 | **explicación** | **Descarta**: decide quién es el comprador antes de que te escriba. |
| D2 | 21.69 – 28.11 | 542 – 703 | **explicación** | **Ordena**: el que pasa llega con contexto, no con «buenas, ¿precio?». |
| D3 | 28.18 – 32.63 | 705 – 816 | **explicación** | Y **recupera**: el que no está listo hoy no se pierde. **Se guarda**. |
| E | 32.91 – 39.85 | 823 – 996 | **revelación** | Porque el que te compra este mes no te escribió **hoy**. Te escribió **hace 3 meses** y nunca le volviste a hablar. |
| F | 40.08 – 42.52 | 1002 – 1063 | **conclusión** | El embudo no vende. **Descarta**. |
| G | 42.54 – 45.48 | 1064 – 1137 | **cta** | Escríbeme **EMBUDO** y te muestro cómo se vería en el tuyo. |

### Palabras clave con frame exacto @25 fps (anclaje de los gráficos)

| palabra | s | frame |
|---|---|---|
| deshacerte | 4.20 | 105 |
| 100 | 8.45 | 211 |
| 95 | 10.31 | 258 |
| nunca | 12.03 | 301 |
| tres cosas | 16.25 | 406 |
| Descarta | 17.45 | 436 |
| ordena | 21.69 | 542 |
| buenas | 25.20 | 630 |
| recupera | 28.43 | 711 |
| se guarda | 31.98 | 800 |
| no te escribió | 35.34 | 884 |
| hoy | 36.40 | 910 |
| hace tres meses | 37.85 | 946 |
| nunca | 38.46 | 962 |
| descarta (remate) | 41.46 | 1037 |
| Escríbeme | 42.54 | 1064 |
| EMBUDO | 43.18 | 1080 |
