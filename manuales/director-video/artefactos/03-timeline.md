# 03 · Timeline — proyecto NNN

> Paso 3 de 3. El frame exacto de cada cosa. Se escribe con la **transcripción
> real** delante (`proyectos/NNN/transcripcion.json`), no con el guion: la voz
> manda y casi nunca cae donde decía el papel.
> De aquí salen, casi copiando: `camara-NNN.ts` · `graficos-NNN.ts` ·
> `cues-NNN.ts` · `subtitulos-NNN.ts`.

**fps de la comp:** 25 → `frame = round(segundo × 25)`. Todos los números de este
archivo son frames absolutos a ese fps.

## Mapa maestro

Una fila por evento. Si una celda está vacía, esa capa **no hace nada** ahí —y eso
es una decisión, no un olvido.

| frames | s | narrativa | voz (frase real) | cámara | gráfico | sonido | subtítulo |
|---|---|---|---|---|---|---|---|
| 0–50 | 0,0–2,0 | hook | "…" | close 1.0→1.16 | `Titular` in | whoosh light | "…" |
| 50–200 | 2,0–8,0 | contexto | "…" | — | — | — | "…" |
| 200–330 | 8,0–13,2 | dato | "…" | *reposa* | `Contador` 0→87 | data + chime | — |
| 330–360 | 13,2–14,4 | — | — | medium 1.08 | `Subrayado` | scribble | — |

## Cues de gráficos (borrador de `graficos-NNN.ts`)

| id | tipo | frames | zona | jerarquía | reason |
|---|---|---|---|---|---|
| `g-hook` | titular | 8–70 | superior | hero | Fija la promesa mientras la voz la enuncia |
| `g-dato` | contador | 200–330 | superior | hero | La magnitud ES el argumento |
| `g-cta` | sello | 640–700 | inferior | hero | Única acción que se pide |

Comprueba el plan antes de renderizar:

```ts
import { revisaPlan } from "./graficos";
console.log(revisaPlan(graficosNNN, 25)); // [] = limpio
```

Detecta dos `hero` solapados, ventanas de menos de medio segundo, `reason`
vacíos e ids repetidos.

## Cues de sonido (borrador de `cues-NNN.ts`)

| id | type | variant | targetFrame | reason |
|---|---|---|---|---|
| `sfx-hook` | whoosh | light | 8 | Acompaña la entrada del titular |
| `sfx-data` | texture | data | 200 | Sostiene el contador mientras sube |
| `sfx-chime` | impact | chime | 330 | Marca la llegada de la cifra |

Recuerda: la sincronía la calcula `cue()` según el `type` (riser termina en el
target, whoosh pica al 65 %, impact/click arrancan en el target).

## Movimientos de cámara (borrador de `camara-NNN.ts`)

| id | frames | plano | de → a | purpose | reason |
|---|---|---|---|---|---|
| `cam-hook` | 0–20 | medium→close | 1.00 → 1.16 | hook | El acercamiento refuerza la pregunta inicial |

## Puertas de control

- [ ] Frames clave revisados (R05): …
- [ ] Prueba 720p aprobada (R06)
- [ ] Final exportado
