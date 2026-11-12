import { Composition } from "remotion";
import { DURACION_083, FPS_083 } from "./metraje-083";
import { Recorrido083 } from "./Recorrido083";

/**
 * REGISTRO del proyecto 083. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 083 · RECORRIDO ── (src/proyectos/083/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V64 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_083`); el material se repone con
        `node proyectos/083/normalizar.mjs` y se comprueba con `node proyectos/083/revisar-083.mjs`. `Recorrido083` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido083Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/083/artefactos/ · versiones: proyectos/083/combinaciones.md */}
    <Composition
      id="Recorrido083"
      component={Recorrido083}
      durationInFrames={DURACION_083}
      fps={FPS_083}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido083Ficha"
      component={Recorrido083}
      durationInFrames={DURACION_083}
      fps={FPS_083}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
