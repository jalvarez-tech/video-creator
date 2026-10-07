import { Composition } from "remotion";
import { DURACION_025, FPS_025 } from "./metraje-025";
import { Recorrido025 } from "./Recorrido025";

/**
 * REGISTRO del proyecto 025. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 025 · RECORRIDO ── (src/proyectos/025/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_025`); el
        material se repone con `node proyectos/025/normalizar.mjs` y se comprueba
        con `node proyectos/025/revisar-025.mjs`.
        Guion: proyectos/025/guion-recorrido.md · artefactos: proyectos/025/artefactos/ */}
    <Composition
      id="Recorrido025"
      component={Recorrido025}
      durationInFrames={DURACION_025}
      fps={FPS_025}
      width={1080}
      height={1920}
    />
  </>
);
