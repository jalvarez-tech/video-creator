import { Composition } from "remotion";
import { DURACION_064, FPS_064 } from "./metraje-064";
import { Recorrido064 } from "./Recorrido064";

/**
 * REGISTRO del proyecto 064. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 064 · RECORRIDO ── (src/proyectos/064/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V46 del Lote en San Vicente
        Ferrer (vereda La Porquera): la aérea del lote, el hook de Isabella, el paseo de dron con música, la
        mitad, el dron y el CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La
        duración sale del plan (`DURACION_064`); el material se repone con `node proyectos/064/normalizar.mjs` y se
        comprueba con `node proyectos/064/revisar-064.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/064/artefactos/ · versiones: proyectos/064/combinaciones.md */}
    <Composition
      id="Recorrido064"
      component={Recorrido064}
      durationInFrames={DURACION_064}
      fps={FPS_064}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
