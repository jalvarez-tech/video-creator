import { Composition } from "remotion";
import { DURACION_082, FPS_082 } from "./metraje-082";
import { Recorrido082 } from "./Recorrido082";

/**
 * REGISTRO del proyecto 082. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 082 · RECORRIDO ── (src/proyectos/082/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V63 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_082`); el material se repone con
        `node proyectos/082/normalizar.mjs` y se comprueba con `node proyectos/082/revisar-082.mjs`. `Recorrido082` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido082Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/082/artefactos/ · versiones: proyectos/082/combinaciones.md */}
    <Composition
      id="Recorrido082"
      component={Recorrido082}
      durationInFrames={DURACION_082}
      fps={FPS_082}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido082Ficha"
      component={Recorrido082}
      durationInFrames={DURACION_082}
      fps={FPS_082}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
