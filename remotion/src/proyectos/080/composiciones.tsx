import { Composition } from "remotion";
import { DURACION_080, FPS_080 } from "./metraje-080";
import { Recorrido080 } from "./Recorrido080";

/**
 * REGISTRO del proyecto 080. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 080 · RECORRIDO ── (src/proyectos/080/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V61 de la Suite Go Living (El Poblado), con la estructura «lo vendible antes del segundo 10»: el exterior, el hook de Isabella,
        dos planos rápidos, la mitad, un recorrido inmersivo y el CTA. Montaje de tomas con la voz en su propia capa. La duración sale del plan (`DURACION_080`); el material se repone con
        `node proyectos/080/normalizar.mjs` y se comprueba con `node proyectos/080/revisar-080.mjs`. `Recorrido080` = la versión normal (subtítulos en una sola fuente, sin ficha);
        `Recorrido080Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`, sin subtítulos).
        Encargo y plan: proyectos/080/artefactos/ · versiones: proyectos/080/combinaciones.md */}
    <Composition
      id="Recorrido080"
      component={Recorrido080}
      durationInFrames={DURACION_080}
      fps={FPS_080}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido080Ficha"
      component={Recorrido080}
      durationInFrames={DURACION_080}
      fps={FPS_080}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
