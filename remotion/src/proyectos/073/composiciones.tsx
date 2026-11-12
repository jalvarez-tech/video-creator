import { Composition } from "remotion";
import { DURACION_073, FPS_073 } from "./metraje-073";
import { Recorrido073 } from "./Recorrido073";

/**
 * REGISTRO del proyecto 073. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 073 · RECORRIDO ── (src/proyectos/073/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_073`); el material se repone con `node proyectos/073/normalizar.mjs` y se
        comprueba con `node proyectos/073/revisar-073.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/073/artefactos/ · versiones: proyectos/073/combinaciones.md */}
    <Composition
      id="Recorrido073"
      component={Recorrido073}
      durationInFrames={DURACION_073}
      fps={FPS_073}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
