import { Composition } from "remotion";
import { DURACION_045, FPS_045 } from "./metraje-045";
import { Recorrido045 } from "./Recorrido045";

/**
 * REGISTRO del proyecto 045. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 045 · RECORRIDO ── (src/proyectos/045/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur): el apartamento en
        ARRIENDO de Tierra Grata, «El tiempo» (V27). El apartamento, el hook de Isabella, el paseo por
        la unidad, la mitad, el apartamento y su balcón con el jacuzzi, y el CTA. Montaje de tomas con
        la voz en su propia capa y subtítulos editoriales (`sinSubtitulos` para la versión con ficha). La duración sale del plan (`DURACION_045`); el
        material se repone con `node proyectos/045/normalizar.mjs` y se comprueba
        con `node proyectos/045/revisar-045.mjs`.
        Encargo y plan: proyectos/045/artefactos/ · versiones: proyectos/045/combinaciones.md */}
    <Composition
      id="Recorrido045"
      component={Recorrido045}
      durationInFrames={DURACION_045}
      fps={FPS_045}
      width={1080}
      height={1920}
    />
  </>
);
