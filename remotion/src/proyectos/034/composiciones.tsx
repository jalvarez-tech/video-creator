import { Composition } from "remotion";
import { DURACION_034, FPS_034 } from "./metraje-034";
import { Recorrido034 } from "./Recorrido034";

/**
 * REGISTRO del proyecto 034. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 034 · RECORRIDO ── (src/proyectos/034/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_034`); el
        material se repone con `node proyectos/034/normalizar.mjs` y se comprueba
        con `node proyectos/034/revisar-034.mjs`.
        Encargo y plan: proyectos/034/artefactos/ · versiones: proyectos/034/combinaciones.md */}
    <Composition
      id="Recorrido034"
      component={Recorrido034}
      durationInFrames={DURACION_034}
      fps={FPS_034}
      width={1080}
      height={1920}
    />
  </>
);
