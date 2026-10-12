import { Composition } from "remotion";
import { DURACION_030, FPS_030 } from "./metraje-030";
import { Recorrido030 } from "./Recorrido030";

/**
 * REGISTRO del proyecto 030. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 030 · RECORRIDO ── (src/proyectos/030/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_030`); el
        material se repone con `node proyectos/030/normalizar.mjs` y se comprueba
        con `node proyectos/030/revisar-030.mjs`.
        Guion: proyectos/030/guion-recorrido.md · artefactos: proyectos/030/artefactos/ */}
    <Composition
      id="Recorrido030"
      component={Recorrido030}
      durationInFrames={DURACION_030}
      fps={FPS_030}
      width={1080}
      height={1920}
    />
  </>
);
