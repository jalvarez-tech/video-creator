import { Composition } from "remotion";
import { DURACION_043, FPS_043 } from "./metraje-043";
import { Recorrido043 } from "./Recorrido043";

/**
 * REGISTRO del proyecto 043. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 043 · RECORRIDO ── (src/proyectos/043/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_043`); el
        material se repone con `node proyectos/043/normalizar.mjs` y se comprueba
        con `node proyectos/043/revisar-043.mjs`.
        Encargo y plan: proyectos/043/artefactos/ · versiones: proyectos/043/combinaciones.md */}
    <Composition
      id="Recorrido043"
      component={Recorrido043}
      durationInFrames={DURACION_043}
      fps={FPS_043}
      width={1080}
      height={1920}
    />
  </>
);
