import { Composition } from "remotion";
import { DURACION_050, FPS_050 } from "./metraje-050";
import { Recorrido050 } from "./Recorrido050";

/**
 * REGISTRO del proyecto 050. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 050 · RECORRIDO ── (src/proyectos/050/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur): «14,8», el reel de arriendo de Tierra Grata que abre con
        el hook de Isabella, recorre la unidad y el apartamento con música y cierra con su CTA. Montaje de tomas con la voz en su propia
        capa y subtítulos editoriales (`sinSubtitulos` los apaga para la versión con ficha). La duración sale del plan (`DURACION_050`);
        el material se repone con `node proyectos/050/normalizar.mjs` y se comprueba con `node proyectos/050/revisar-050.mjs`.
        Encargo y plan: proyectos/050/artefactos/ · reparto: proyectos/044/reparto-045-050.md */}
    <Composition
      id="Recorrido050"
      component={Recorrido050}
      durationInFrames={DURACION_050}
      fps={FPS_050}
      width={1080}
      height={1920}
    />
  </>
);
