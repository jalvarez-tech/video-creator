import { Composition } from "remotion";
import { DURACION_065, FPS_065 } from "./metraje-065";
import { Recorrido065 } from "./Recorrido065";

/**
 * REGISTRO del proyecto 065. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 065 · RECORRIDO ── (src/proyectos/065/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V47 del Lote en San
        Vicente Ferrer (vereda La Porquera): el lote desde el dron, el hook de Isabella, tramos de dron con música,
        la mitad, más dron y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_065`); el material se repone con `node proyectos/065/normalizar.mjs` y se
        comprueba con `node proyectos/065/revisar-065.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/065/artefactos/ · versiones: proyectos/065/combinaciones.md */}
    <Composition
      id="Recorrido065"
      component={Recorrido065}
      durationInFrames={DURACION_065}
      fps={FPS_065}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
