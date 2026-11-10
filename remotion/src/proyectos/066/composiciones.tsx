import { Composition } from "remotion";
import { DURACION_066, FPS_066 } from "./metraje-066";
import { Recorrido066 } from "./Recorrido066";

/**
 * REGISTRO del proyecto 066. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 066 · RECORRIDO ── (src/proyectos/066/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V39 del Apartamento en Palmazera
        (La Ceja): el edificio desde el aire, el hook de Isabella, recorrido con música, la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_066`); el material se repone con `node proyectos/066/normalizar.mjs` y se
        comprueba con `node proyectos/066/revisar-066.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/066/artefactos/ · versiones: proyectos/066/combinaciones.md */}
    <Composition
      id="Recorrido066"
      component={Recorrido066}
      durationInFrames={DURACION_066}
      fps={FPS_066}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
