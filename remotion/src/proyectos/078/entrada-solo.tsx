import "../../index.css";
// Las fuentes empaquetadas, como en Root.tsx (se cargan UNA vez, en tiempo de ejecución).
import "../../motor/fuentes";
import { registerRoot } from "remotion";
import { Composiciones } from "./composiciones";

/**
 * ENTRADA SOLO de la 078: registra únicamente `Recorrido078`. Mientras la pieza se montaba, las piezas hermanas (076, 077) se montan a la vez en el mismo
 * checkout y `estudio.tsx` carga TODAS las composiciones de `src/proyectos/*`: una a medias tumba el bundle de todas. Con esta entrada, los renders de la
 * 078 no dependen de las demás (`ENTRADA=src/proyectos/078/entrada-solo.tsx`). `composiciones.tsx` es el nombre que descubre
 * el estudio (`render-final.sh` usa `src/index.ts`); esta entrada sigue sirviendo para renders de la 078 a solas.
 */
registerRoot(() => <Composiciones />);
