import { Composition } from "remotion";
import { DURACION_062, FPS_062 } from "./metraje-062";
import { Recorrido062 } from "./Recorrido062";

/**
 * REGISTRO del proyecto 062. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 062 · RECORRIDO ── (src/proyectos/062/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V41 del Apartamento en
        Palmazera (La Ceja): el edificio desde el aire, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_062`); el material se repone con `node proyectos/062/normalizar.mjs` y se
        comprueba con `node proyectos/062/revisar-062.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/062/artefactos/ · versiones: proyectos/062/combinaciones.md */}
    <Composition
      id="Recorrido062"
      component={Recorrido062}
      durationInFrames={DURACION_062}
      fps={FPS_062}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
