import { Composition } from "remotion";
import { DURACION_031, FPS_031 } from "./metraje-031";
import { Recorrido031 } from "./Recorrido031";

/**
 * REGISTRO del proyecto 031. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 031 · RECORRIDO ── (src/proyectos/031/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_031`); el
        material se repone con `node proyectos/031/normalizar.mjs` y se comprueba
        con `node proyectos/031/revisar-031.mjs`.
        Encargo y plan: proyectos/031/artefactos/ · versiones: proyectos/031/combinaciones.md */}
    <Composition
      id="Recorrido031"
      component={Recorrido031}
      durationInFrames={DURACION_031}
      fps={FPS_031}
      width={1080}
      height={1920}
    />
  </>
);
