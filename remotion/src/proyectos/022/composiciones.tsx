import { Composition } from "remotion";
import { DURACION_022, FPS_022 } from "./metraje-022";
import { Recorrido022 } from "./Recorrido022";

/**
 * REGISTRO del proyecto 022. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 022 · RECORRIDO ── (src/proyectos/022/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_022`); el
        material se repone con `node proyectos/022/normalizar.mjs` y se comprueba
        con `node proyectos/022/revisar-022.mjs`.
        Guion: proyectos/022/guion-recorrido.md · artefactos: proyectos/022/artefactos/ */}
    <Composition
      id="Recorrido022"
      component={Recorrido022}
      durationInFrames={DURACION_022}
      fps={FPS_022}
      width={1080}
      height={1920}
    />
  </>
);
