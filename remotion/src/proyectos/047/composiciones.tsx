import { Composition } from "remotion";
import { DURACION_047, FPS_047 } from "./metraje-047";
import { Recorrido047 } from "./Recorrido047";

/**
 * REGISTRO del proyecto 047. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 047 · RECORRIDO ── (src/proyectos/047/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur) para
        el ARRIENDO de Tierra Grata: el apartamento, el hook de Isabella, el paseo por
        la unidad, la mitad (dos tomas), el paseo por el apartamento y el CTA. Montaje
        de tomas con la voz en su propia capa y subtítulos editoriales. La duración sale
        del plan (`DURACION_047`); el material se repone con `node proyectos/047/normalizar.mjs`
        y se comprueba con `node proyectos/047/revisar-047.mjs`. `sinSubtitulos` = la base
        de la versión con ficha (`ficha-luxur`).
        Encargo y plan: proyectos/047/artefactos/ · versiones: proyectos/047/combinaciones.md */}
    <Composition
      id="Recorrido047"
      component={Recorrido047}
      durationInFrames={DURACION_047}
      fps={FPS_047}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
