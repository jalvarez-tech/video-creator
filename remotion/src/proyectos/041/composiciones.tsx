import { Composition } from "remotion";
import { DURACION_041, FPS_041 } from "./metraje-041";
import { Recorrido041 } from "./Recorrido041";

/**
 * REGISTRO del proyecto 041. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 041 · RECORRIDO ── (src/proyectos/041/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_041`); el
        material se repone con `node proyectos/041/normalizar.mjs` y se comprueba
        con `node proyectos/041/revisar-041.mjs`.
        Encargo y plan: proyectos/041/artefactos/ · versiones: proyectos/041/combinaciones.md */}
    <Composition
      id="Recorrido041"
      component={Recorrido041}
      durationInFrames={DURACION_041}
      fps={FPS_041}
      width={1080}
      height={1920}
    />
  </>
);
