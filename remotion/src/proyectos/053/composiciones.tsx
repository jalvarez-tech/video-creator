import { Composition } from "remotion";
import { DURACION_053, FPS_053 } from "./metraje-053";
import { Recorrido053 } from "./Recorrido053";

/**
 * REGISTRO del proyecto 053. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 053 · RECORRIDO ── (src/proyectos/053/)
        Réplica de `videos editados/03.mp4` («¿Pagarías 14 millones?») para el ARRIENDO de Tierra Grata:
        Isabella caminando en el balcón, el recorrido en el orden del original con la locución en off, y
        su CTA a cámara. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_053`); el material se repone con `node proyectos/053/normalizar.mjs` y se
        comprueba con `node proyectos/053/revisar-053.mjs`. `sinSubtitulos` = la base de la versión con ficha
        (`ficha-luxur`). Encargo y plan: proyectos/053/artefactos/ · versiones: proyectos/053/combinaciones.md */}
    <Composition
      id="Recorrido053"
      component={Recorrido053}
      durationInFrames={DURACION_053}
      fps={FPS_053}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
