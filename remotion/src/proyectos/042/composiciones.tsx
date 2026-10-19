import { Composition } from "remotion";
import { DURACION_042, FPS_042 } from "./metraje-042";
import { Recorrido042 } from "./Recorrido042";

/**
 * REGISTRO del proyecto 042. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 042 · RECORRIDO ── (src/proyectos/042/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_042`); el
        material se repone con `node proyectos/042/normalizar.mjs` y se comprueba
        con `node proyectos/042/revisar-042.mjs`.
        Encargo y plan: proyectos/042/artefactos/ · versiones: proyectos/042/combinaciones.md */}
    <Composition
      id="Recorrido042"
      component={Recorrido042}
      durationInFrames={DURACION_042}
      fps={FPS_042}
      width={1080}
      height={1920}
    />
  </>
);
