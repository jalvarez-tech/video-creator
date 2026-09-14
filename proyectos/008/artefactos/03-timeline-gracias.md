# 03 · Timeline — proyecto 008 · pieza GRACIAS

1080×1920 · **30 fps** · **1410 frames** (47,02 s). Todos los frames son
ABSOLUTOS y salen de `proyectos/008/gracias/transcripcion-palabras.json`
(tokens de whisper `-ojf`, f = s × 30). Ninguno está puesto a ojo.

## Mapa de escenas

| frames | narrativa | cámara | motion graphic | sonido |
|---|---|---|---|---|
| 0–14 | hook | 1.00 → **1.06** *(ease-out)* | — | whoosh light |
| 16–128 | gancho | *reposa* | **g01** `ranura`: «Pensamos que» (f16) / «**8 TONELADAS**» (f28) / «era mucho» (f48) → **releva f80** → «Lo estamos **logrando**» (VERDE) | whoosh light · pop f28 · **whip f80** |
| 130–204 | remate | *reposa* | **g02** «**GRACIAS**» (f130, VERDE) + «a cada persona que se está uniendo» (f150) | **impact deep 1/3** f130 |
| 206–336 | mecanismo | *reposa* | **g03** chip ÁMBAR «SEGUIMOS RECOLECTANDO» + lista blanca: kits de aseo (f212) · medicinas básicas (f249) · alimentos no perecederos (f286), **sobre las FOTOS REALES de lo recogido** (f206 aseo · f249 medicinas · f286 alimentos) | swoosh · 3 pops |
| 342–440 | mecanismo | *reposa* | **g04** «en nuestras sedes de» + chips ÁMBAR MEDELLÍN (f354) · CALDAS (f374) · ORIENTE ANTIOQUEÑO (f411) | whoosh light · 3 click ui |
| 446–634 | problema | *reposa* | **g05** `ranura`: «¿Aún no has llevado tu aporte?» (f446) → **conmuta f582** → «Todavía **tenemos tiempo**» (ÁMBAR) | whoosh light · **whip f582** |
| 645–786 | prueba | *reposa* | **g06** chip «A FIN DE MES» (f667) + «El camión sale **al Chocó**» (f692) + «a las comunidades más necesitadas» (f737) | pop f667 · **swoosh f692** (sale, no llega) |
| **786–888** | — | 1.06 → **1.12** *(punch-in, f800–864)* | **nada** | **silencio** |
| 888–1000 | giro | *reposa a 1.12* | **g07** «medicinas que nos pidieron» + lista **SIN COLOR**: Para los niños (f910) · Y los adultos mayores (f946) | solo el whoosh de entrada — **los ítems no llevan pop** |
| **1000–1098** | — | 1.12 → **1.05** *(make-space, f1006–1052)* | **nada** | — |
| 1098–1208 | giro | *reposa* | **g08** «por menor que sea» + «**TODO SUMA**» (f1158, VERDE) con `pulso` en el segundo «todo suma» (f1179–1204) | whoosh light · **impact deep 2/3** f1158 |
| 1216–1290 | remate | *reposa* | **g09** «**8** toneladas / de puro amor» (f1222; el 8 VERDE) + «hacia el Chocó» (f1266, ÁMBAR) | swoosh f1220 |
| **1292–1316** | — | 1.05 → **1.11** *(ease-out)* | — | — |
| 1318–fin | cta | *reposa* | **g10** «Dios los bendiga» (f1322) + «**GRACIAS**» (f1374, VERDE) + «a todos» (f1394) | whoosh light · **impact deep 3/3** f1374 |

## Los cuatro movimientos de cámara, y por qué son cuatro

Solo caen en **huecos sin tarjeta** (director §3d: bajo un hero la cámara
reposa). Y los huecos de esta pieza son exactamente los cuatro tramos en que él
habla de personas y no de logística:

| id | frames | de → a | intención |
|---|---|---|---|
| `cam-hook` | 0–14 | 1.00 → 1.06 | el clip abre a media frase; el empujón le da un principio *(acortado de 0–20: la tarjeta de apertura se adelantó a f16 para que «8 TONELADAS» caiga en su palabra, y bajo un hero la cámara reposa)* |
| `cam-escucha` | 800–864 | 1.06 → 1.12 | «nos han pedido algunas medicinas»: deja de pedir y transmite un encargo ajeno |
| `cam-aire` | 1006–1052 | 1.12 → 1.05 | «el que quiera vincularse»: el mensaje se abre a todos y el encuadre también |
| `cam-cierre` | 1292–1316 | 1.05 → 1.11 | «Dios los bendiga»: acercarse para despedirse |

El reposo hereda la escala del último cue. Máximo **1.12** — el porqué, en
`02-layout-gracias.md`.

## Las dos `ranura` de la pieza

No es un recurso decorativo repetido: las dos veces que aparece, el guion hace
lo mismo —**plantea algo y lo contradice**— y dos tarjetas seguidas lo contarían
como dos ideas distintas.

| toma | estado 1 | releva en | estado 2 |
|---|---|---|---|
| **g01** | «Pensamos que / **8 TONELADAS** / era mucho» | **f80** («lo estamos logrando») | «Lo estamos **logrando**» (VERDE) |
| **g05** | «¿Aún no has llevado tu aporte?» | **f582** («todavía tenemos tiempo») | «Todavía **tenemos tiempo**» (ÁMBAR) |

Y suenan igual: **`whoosh whip` en el relevo**, las dos. Es la regla de sonido de
la pieza para este gesto (`cues-008-gracias.ts`).

## Anclas de voz usadas (medidas, no estimadas)

| palabra | s | frame |
|---|---|---|
| «8 toneladas» | 0,94 | 28 |
| «logrando» | ~2,85 | ~86 |
| «muchas gracias» | 3,04 | 91 |
| «se están uniendo» | 4,89 | 147 |
| «recolectando» | 6,46 | 194 |
| «kit (de aseo)» | 7,01 | 210 |
| «medicinas» | 8,04 | 241 |
| «alimentos» | 9,55 | 286 |
| «Medellín» | 11,80 | 354 |
| «Caldas» | 12,41 | 372 |
| «Oriente» | 13,70 | 411 |
| «si todavía no ha llevado» | 14,70 | 441 |
| «todavía tenemos tiempo» | 19,22 | 577 |
| «fin de (este) mes» | 21,83 | 655 |
| «camión» | 22,99 | 690 |
| «comunidades» | 24,50 | 735 |
| «puntuales» | 29,58 | 887 |
| «niños» | 30,40 | 912 |
| «adultos mayores» | 31,10 | 933 |
| «cualquier ayuda» | 35,99 | 1080 |
| «todo suma» (1) | 38,54 | 1156 |
| «todo suma» (2) | 39,29 | 1179 |
| «8 toneladas» (2) | 40,77 | 1223 |
| «puro amor» | 41,67 | 1250 |
| «hacia el Chocó» | 42,19 | 1266 |
| «Dios los bendiga» | 44,00 | 1320 |
| «muchas gracias» (2) | 45,82 | 1375 |

## Puertas pasadas

- `node manuales/video-noticias/scripts/revisar-plan.mjs remotion/src/proyectos/008/graficos-008-gracias.ts 30`
  → **Plan limpio** (formato: huecos, solapes, duraciones, reason · sustrato:
  R08, R09, tintas).
- `npx tsc --noEmit` → limpio. `eslint` sobre los ficheros nuevos → limpio.
  *(`npm run lint` sigue en rojo por dos errores PREEXISTENTES en `Noticia008.tsx`,
  ajenos a esta pieza: `@remotion/volume-callback` y `@remotion/from-0`.)*
- Frames reales (R05): 13 stills en `proyectos/008/gracias/vistas-previas/`.
- Prueba 720p: `proyectos/008/pruebas-720p/008-gracias-prueba.mp4`.
