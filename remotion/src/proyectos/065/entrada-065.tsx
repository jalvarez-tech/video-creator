/**
 * LA ENTRADA PROPIA DEL 065: registra SOLO `Recorrido065`.
 *
 * Por qué existe. `src/index.ts` registra el estudio entero y `estudio.tsx` monta, en UN mismo árbol, las `composiciones.tsx` de TODOS los proyectos del checkout: si el plan de otro proyecto cambia
 * a mitad de su exportación (063 y 064 se exportan a la vez sobre el MISMO checkout), «Cannot access 'Composiciones' before initialization» o un cambio ajeno tumba también este render. Esta entrada
 * es la misma composición, el mismo CSS y las mismas fuentes que `Root.tsx`, sin los proyectos ajenos (copia de `entrada-063.tsx`).
 *
 *   cd remotion
 *   npx remotion render src/proyectos/065/entrada-065.tsx Recorrido065 …    (en vez de `src/index.ts`)
 */
import "../../index.css";
// Las fuentes empaquetadas: se cargan UNA vez, aquí, en tiempo de ejecución (igual que en `Root.tsx`).
import "../../motor/fuentes";
import { registerRoot } from "remotion";
import { Composiciones } from "./composiciones";

registerRoot(Composiciones);
