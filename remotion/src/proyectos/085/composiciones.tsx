import { Composition } from "remotion";
import { DURACION_085, FPS_085 } from "./metraje-085";
import { Recorrido085 } from "./Recorrido085";

/**
 * REGISTRO del proyecto 085. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 085 · RECORRIDO ── (src/proyectos/085/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V66 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_085`); el material se repone con
        `node proyectos/085/normalizar.mjs` y se comprueba con `node proyectos/085/revisar-085.mjs`. `Recorrido085` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido085Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/085/artefactos/ · versiones: proyectos/085/combinaciones.md */}
    <Composition
      id="Recorrido085"
      component={Recorrido085}
      durationInFrames={DURACION_085}
      fps={FPS_085}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido085Ficha"
      component={Recorrido085}
      durationInFrames={DURACION_085}
      fps={FPS_085}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
