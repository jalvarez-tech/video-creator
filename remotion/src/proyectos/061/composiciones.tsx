import { Composition } from "remotion";
import { DURACION_061, FPS_061 } from "./metraje-061";
import { Recorrido061 } from "./Recorrido061";

/**
 * REGISTRO del proyecto 061. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 061 · RECORRIDO ── (src/proyectos/061/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V43 del Apartaestudio
        Quadrato (Laureles): la pérgola de la terraza, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_061`); el material se repone con `node proyectos/061/normalizar.mjs` y se
        comprueba con `node proyectos/061/revisar-061.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/061/artefactos/ · versiones: proyectos/061/combinaciones.md */}
    <Composition
      id="Recorrido061"
      component={Recorrido061}
      durationInFrames={DURACION_061}
      fps={FPS_061}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
