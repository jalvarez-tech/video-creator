import { Composition } from "remotion";
import { DURACION_039, FPS_039 } from "./metraje-039";
import { Recorrido039 } from "./Recorrido039";

/**
 * REGISTRO del proyecto 039. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 039 · RECORRIDO ── (src/proyectos/039/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_039`); el
        material se repone con `node proyectos/039/normalizar.mjs` y se comprueba
        con `node proyectos/039/revisar-039.mjs`.
        Encargo y plan: proyectos/039/artefactos/ · versiones: proyectos/039/combinaciones.md */}
    <Composition
      id="Recorrido039"
      component={Recorrido039}
      durationInFrames={DURACION_039}
      fps={FPS_039}
      width={1080}
      height={1920}
    />
  </>
);
