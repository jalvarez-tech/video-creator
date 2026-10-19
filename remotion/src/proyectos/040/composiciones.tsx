import { Composition } from "remotion";
import { DURACION_040, FPS_040 } from "./metraje-040";
import { Recorrido040 } from "./Recorrido040";

/**
 * REGISTRO del proyecto 040. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 040 · RECORRIDO ── (src/proyectos/040/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_040`); el
        material se repone con `node proyectos/040/normalizar.mjs` y se comprueba
        con `node proyectos/040/revisar-040.mjs`.
        Guion: proyectos/040/guion-recorrido.md · artefactos: proyectos/040/artefactos/ */}
    <Composition
      id="Recorrido040"
      component={Recorrido040}
      durationInFrames={DURACION_040}
      fps={FPS_040}
      width={1080}
      height={1920}
    />
  </>
);
