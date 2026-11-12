import { Composition } from "remotion";
import { DURACION_087, FPS_087 } from "./metraje-087";
import { Recorrido087 } from "./Recorrido087";

/**
 * REGISTRO del proyecto 087. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 087 · RECORRIDO ── (src/proyectos/087/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V68 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_087`); el material se repone con
        `node proyectos/087/normalizar.mjs` y se comprueba con `node proyectos/087/revisar-087.mjs`. `Recorrido087` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido087Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/087/artefactos/ · versiones: proyectos/087/combinaciones.md */}
    <Composition
      id="Recorrido087"
      component={Recorrido087}
      durationInFrames={DURACION_087}
      fps={FPS_087}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido087Ficha"
      component={Recorrido087}
      durationInFrames={DURACION_087}
      fps={FPS_087}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
