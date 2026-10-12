import { Composition } from "remotion";
import { DURACION_023, FPS_023 } from "./metraje-023";
import { Recorrido023 } from "./Recorrido023";

/**
 * REGISTRO del proyecto 023. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 023 · RECORRIDO ── (src/proyectos/023/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_023`); el
        material se repone con `node proyectos/023/normalizar.mjs` y se comprueba
        con `node proyectos/023/revisar-023.mjs`.
        Guion: proyectos/023/guion-recorrido.md · artefactos: proyectos/023/artefactos/ */}
    <Composition
      id="Recorrido023"
      component={Recorrido023}
      durationInFrames={DURACION_023}
      fps={FPS_023}
      width={1080}
      height={1920}
    />
  </>
);
