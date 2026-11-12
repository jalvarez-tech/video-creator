import { Composition } from "remotion";
import { DURACION_070, FPS_070 } from "./metraje-070";
import { Recorrido070 } from "./Recorrido070";

/**
 * REGISTRO del proyecto 070. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 070 · RECORRIDO ── (src/proyectos/070/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_070`); el material se repone con `node proyectos/070/normalizar.mjs` y se
        comprueba con `node proyectos/070/revisar-070.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/070/artefactos/ · versiones: proyectos/070/combinaciones.md */}
    <Composition
      id="Recorrido070"
      component={Recorrido070}
      durationInFrames={DURACION_070}
      fps={FPS_070}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
