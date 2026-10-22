import { Composition } from "remotion";
import { DURACION_060, FPS_060 } from "./metraje-060";
import { Recorrido060 } from "./Recorrido060";

/**
 * REGISTRO del proyecto 060. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 060 · RECORRIDO ── (src/proyectos/060/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V42 del Apartaestudio
        Quadrato (Laureles, Medellín): el rooftop con el jacuzzi y la ciudad, el hook de Isabella, recorrido con música,
        la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_060`); el material se repone con `node proyectos/060/normalizar.mjs` y se
        comprueba con `node proyectos/060/revisar-060.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/060/artefactos/ · versiones: proyectos/060/combinaciones.md */}
    <Composition
      id="Recorrido060"
      component={Recorrido060}
      durationInFrames={DURACION_060}
      fps={FPS_060}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
