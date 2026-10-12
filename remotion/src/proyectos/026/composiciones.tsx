import { Composition } from "remotion";
import { DURACION_026, FPS_026 } from "./metraje-026";
import { Recorrido026 } from "./Recorrido026";

/**
 * REGISTRO del proyecto 026. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 026 · RECORRIDO ── (src/proyectos/026/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_026`); el
        material se repone con `node proyectos/026/normalizar.mjs` y se comprueba
        con `node proyectos/026/revisar-026.mjs`.
        Guion: proyectos/026/guion-recorrido.md · artefactos: proyectos/026/artefactos/ */}
    <Composition
      id="Recorrido026"
      component={Recorrido026}
      durationInFrames={DURACION_026}
      fps={FPS_026}
      width={1080}
      height={1920}
    />
  </>
);
