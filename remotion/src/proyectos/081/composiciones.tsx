import { Composition } from "remotion";
import { DURACION_081, FPS_081 } from "./metraje-081";
import { Recorrido081 } from "./Recorrido081";

/**
 * REGISTRO del proyecto 081. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 081 · RECORRIDO ── (src/proyectos/081/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V62 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_081`); el material se repone con
        `node proyectos/081/normalizar.mjs` y se comprueba con `node proyectos/081/revisar-081.mjs`. `Recorrido081` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido081Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/081/artefactos/ · versiones: proyectos/081/combinaciones.md */}
    <Composition
      id="Recorrido081"
      component={Recorrido081}
      durationInFrames={DURACION_081}
      fps={FPS_081}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido081Ficha"
      component={Recorrido081}
      durationInFrames={DURACION_081}
      fps={FPS_081}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
