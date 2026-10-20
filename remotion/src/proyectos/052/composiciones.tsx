import { Composition } from "remotion";
import { DURACION_052, FPS_052 } from "./metraje-052";
import { Recorrido052 } from "./Recorrido052";

/**
 * REGISTRO del proyecto 052. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 052 · RECORRIDO ── (src/proyectos/052/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur): «Pregúntate esto», la réplica de `videos editados/02.mp4` del apartamento
        de Tierra Grata (arriendo): abre con el hook de Isabella, recorre el apartamento y la unidad con la locución en off y cierra con su CTA. Montaje
        de tomas con la voz en su propia capa y subtítulos editoriales (`sinSubtitulos` los apaga para la versión con ficha). La duración sale del plan
        (`DURACION_052`); el material se repone con `node proyectos/052/normalizar.mjs` y se comprueba con `node proyectos/052/revisar-052.mjs`.
        Encargo y plan: proyectos/052/artefactos/ · reparto: proyectos/044/reparto-051-053.md */}
    <Composition
      id="Recorrido052"
      component={Recorrido052}
      durationInFrames={DURACION_052}
      fps={FPS_052}
      width={1080}
      height={1920}
    />
  </>
);
