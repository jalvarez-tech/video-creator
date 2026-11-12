import { Composition } from "remotion";
import { DURACION_084, FPS_084 } from "./metraje-084";
import { Recorrido084 } from "./Recorrido084";

/**
 * REGISTRO del proyecto 084. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 084 · RECORRIDO ── (src/proyectos/084/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V65 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_084`); el material se repone con
        `node proyectos/084/normalizar.mjs` y se comprueba con `node proyectos/084/revisar-084.mjs`. `Recorrido084` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido084Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/084/artefactos/ · versiones: proyectos/084/combinaciones.md */}
    <Composition
      id="Recorrido084"
      component={Recorrido084}
      durationInFrames={DURACION_084}
      fps={FPS_084}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido084Ficha"
      component={Recorrido084}
      durationInFrames={DURACION_084}
      fps={FPS_084}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
