/**
 * LA ENTRADA PROPIA DEL 063: registra SOLO `Recorrido063`.
 *
 * Por qué existe. `src/index.ts` registra el estudio entero y `estudio.tsx` monta, en UN mismo árbol, las `composiciones.tsx` de TODOS los proyectos del checkout: si el plan de otro proyecto está a medias
 * (un módulo que lanza al importarse), «Cannot access 'Composiciones' before initialization» tumba también esta composición. Los tres reels del Lote San Vicente Ferrer (063-065) se montan a la vez sobre el MISMO
 * checkout, así que cada uno puede renderizar con su entrada: la misma composición, el mismo CSS y las mismas fuentes que `Root.tsx`, sin los proyectos ajenos.
 *
 *   cd remotion
 *   npx remotion render src/proyectos/063/entrada-063.tsx Recorrido063 …    (en vez de `src/index.ts`)
 *   ENTRADA=proyectos/063/entrada-063.tsx node proyectos/063/herramientas/stills-multiples.mjs Recorrido063 …
 *
 * Los píxeles son los mismos que con `src/index.ts` (se comprueba contra un fotograma cuando el checkout está sano).
 */
import "../../index.css";
// Las fuentes empaquetadas: se cargan UNA vez, aquí, en tiempo de ejecución (igual que en `Root.tsx`).
import "../../motor/fuentes";
import { registerRoot } from "remotion";
import { Composiciones } from "./composiciones";

registerRoot(Composiciones);
