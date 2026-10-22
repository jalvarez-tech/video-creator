import { Composition } from "remotion";
import { DURACION_054, FPS_054 } from "./metraje-054";
import { Recorrido054 } from "./Recorrido054";

/**
 * REGISTRO del proyecto 054. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 054 · RECORRIDO ── (src/proyectos/054/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur): la Casa en Condominio Los Bravos (La Ceja), ángulo «privacidad».
        La aérea, el hook de Isabella, un recorrido con música, la mitad, otro recorrido y su CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales (`sinSubtitulos` los apaga para la versión con ficha). La duración sale del plan (`DURACION_054`); el material se
        repone con `node proyectos/054/normalizar.mjs` y se comprueba con `node proyectos/054/revisar-054.mjs`.
        Encargo y plan: proyectos/054/artefactos/ · reparto: proyectos/054/reparto-054-062.md */}
    <Composition
      id="Recorrido054"
      component={Recorrido054}
      durationInFrames={DURACION_054}
      fps={FPS_054}
      width={1080}
      height={1920}
    />
  </>
);
