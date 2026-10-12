import { Composition } from "remotion";
import { DURACION_024, FPS_024 } from "./metraje-024";
import { Recorrido024 } from "./Recorrido024";

/**
 * REGISTRO del proyecto 024. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 024 · RECORRIDO ── (src/proyectos/024/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_024`); el
        material se repone con `node proyectos/024/normalizar.mjs` y se comprueba
        con `node proyectos/024/revisar-024.mjs`.
        Guion: proyectos/024/guion-recorrido.md · artefactos: proyectos/024/artefactos/ */}
    <Composition
      id="Recorrido024"
      component={Recorrido024}
      durationInFrames={DURACION_024}
      fps={FPS_024}
      width={1080}
      height={1920}
    />
  </>
);
