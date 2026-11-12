import "../../index.css";
// Las fuentes empaquetadas, como en Root.tsx (se cargan UNA vez, en tiempo de ejecución).
import "../../motor/fuentes";
import { registerRoot } from "remotion";
import { Composiciones } from "./composiciones";

/**
 * ENTRADA SOLO de la 076: registra únicamente `Recorrido076`. Mientras la pieza se monta, otras piezas hermanas
 * (077, 078) se montan a la vez en el mismo checkout y `estudio.tsx` carga TODAS las composiciones de `src/proyectos/*`:
 * una a medias tumba el bundle de todas. Con esta entrada, los renders de la 076 no dependen de las demás
 * (`ENTRADA=src/proyectos/076/entrada-solo.tsx node proyectos/076/herramientas/stills-multiples.mjs …`).
 * `composiciones.tsx` (el nombre que descubre `estudio.tsx`) ya es el definitivo: esta entrada solo evita depender de las piezas hermanas.
 */
registerRoot(() => <Composiciones />);
