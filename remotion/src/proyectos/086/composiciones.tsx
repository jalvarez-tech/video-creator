import { Composition } from "remotion";
import { DURACION_086, FPS_086 } from "./metraje-086";
import { Recorrido086 } from "./Recorrido086";

/**
 * REGISTRO del proyecto 086. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 086 · RECORRIDO ── (src/proyectos/086/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V67 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_086`); el material se repone con
        `node proyectos/086/normalizar.mjs` y se comprueba con `node proyectos/086/revisar-086.mjs`. `Recorrido086` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido086Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/086/artefactos/ · versiones: proyectos/086/combinaciones.md */}
    <Composition
      id="Recorrido086"
      component={Recorrido086}
      durationInFrames={DURACION_086}
      fps={FPS_086}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido086Ficha"
      component={Recorrido086}
      durationInFrames={DURACION_086}
      fps={FPS_086}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
