import { Composition } from "remotion";
import { DURACION_051, FPS_051 } from "./metraje-051";
import { Recorrido051 } from "./Recorrido051";

/**
 * REGISTRO del proyecto 051. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 051 · RECORRIDO ── (src/proyectos/051/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur): «Ven, te muestro», la réplica de `videos editados/01.mp4` de Tierra
        Grata (arriendo): abre con el hook de Isabella, recorre el apartamento y la unidad con la locución en off y música y cierra con el CTA en off
        sobre ella. Montaje de planos con la voz en su propia capa y subtítulos editoriales (`sinSubtitulos` los apaga para la versión con ficha). La duración sale del plan (`DURACION_051`);
        el material se repone con `node proyectos/051/normalizar.mjs` y se comprueba con `node proyectos/051/revisar-051.mjs`.
        Encargo y plan: proyectos/051/artefactos/ · reparto: proyectos/044/reparto-051-053.md */}
    <Composition
      id="Recorrido051"
      component={Recorrido051}
      durationInFrames={DURACION_051}
      fps={FPS_051}
      width={1080}
      height={1920}
    />
  </>
);
