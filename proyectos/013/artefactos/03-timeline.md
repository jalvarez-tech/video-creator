# 013 · Timeline — 383 frames a 30 fps

## La retícula: la VOZ, medida por palabra

`whisper.cpp -ml 1` sobre el audio ya limpiado (`highpass` + `afftdn` +
`dynaudnorm`), `f = s × 30`. El audio es de evento y las PALABRAS no son
fiables; los TIEMPOS sí, y es lo único que se usa de ahí.

```
 f0                                                                    f383
 │                                                                       │
 ├─ g01 hook ───┤                                                         
 0            62                                                          
               ├─ g02 quién ────────┤                                     
               62                 146                                     
                                   ├─ g03 evento ──────────┤              
                                   146                   245              
                                                          ╎ respiro ╎     
                                                          245     300     
                                                                  ├─ g04 ─┤
                                                                  300   383
 voz  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
 f1                                                            f347    f383
```

| frame | palabra | qué pasa |
|---|---|---|
| **0** | «Hola» | el hook ya está PUESTO (R23) — velo incluido (R25) |
| **62** | «nombre» | corte duro: el hook cede y entra Isabella Cadavid · whoosh light |
| ~85 | — | aterriza el chip «EL WALL STREET INMOBILIARIO» (`tras("quien", 3)`) |
| **146** | «APEX» | corte duro: entra el rótulo del evento · whoosh swoosh |
| ~175 | «Cartagena» | aterriza el chip «17 Y 18 DE SEPTIEMBRE» (`tras("apex", 4)`) |
| **245** | — | sale el rótulo; empieza el respiro |
| **300** | «no se pierdan» (f299) | entra el remate, con velo que SÍ sube (nace de la nada) · whoosh light |
| 347 | última palabra | quedan 36 f de cola con el remate puesto |
| 383 | — | fin; el reel vuelve al f0, donde el hook ya está entero |

## Las entradas, y por qué cada una es la que es

| toma | entrada del grupo | velo | por qué |
|---|---|---|---|
| `g01` | `ninguna` | `rampa: 0` | el f0 es la MINIATURA: texto y velo puestos desde el primer frame |
| `g02` | `escalon` | `rampa: 0` | RELEVO: el velo ya está puesto, sólo cambia el texto |
| `g03` | `escalon` | `rampa: 0` | ídem |
| `g04` | la ley (muelle, rampa 8) | rampa 3 (defecto) | NACE tras 55 f de banda limpia: aquí el velo sí tiene que subir, o es un parpadeo negro |

Es la misma decisión en los dos sitios: **el velo entra cuando NACE, no cuando
sólo se releva el texto.**

## Sonido: tres cues, el mismo gesto

| frame | cue | familia | por qué |
|---|---|---|---|
| 62 | `s-quien` | whoosh light | el relevo al rótulo de ella |
| 146 | `s-evento` | whoosh swoosh | el relevo al del evento; más cuerpo porque es el cambio de texto más grande (124 px) |
| 300 | `s-remate` | whoosh light | entra el remate. IGUAL que las otras: es una invitación, no un golpe |

**Ni en el f0 ni en el f245.** En el f0 no entra nada (ya está puesto): un
whoosh sobre algo que no se mueve es decoración. En el f245 el texto SALE, y el
silencio es lo que hace que el respiro se lea como aire y no como un fallo.

Los tres van `underDialogue`, `priority: "low"`, ducking a −4,5 dB. Medido en la
prueba 720p: el nivel es continuo de f1 a f383 sin un solo hueco (R10), pico
global −9,6 dB, medio −28,3 dB.
