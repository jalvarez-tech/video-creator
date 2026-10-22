import { Composition } from "remotion";
import { DURACION_056, FPS_056 } from "./metraje-056";
import { Recorrido056 } from "./Recorrido056";

/**
 * REGISTRO del proyecto 056. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 056 · RECORRIDO ── (src/proyectos/056/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V38 de la Casa en Condominio
        Los Bravos (La Ceja): el conjunto desde el aire, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_056`); el material se repone con `node proyectos/056/normalizar.mjs` y se
        comprueba con `node proyectos/056/revisar-056.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/056/artefactos/ · versiones: proyectos/056/combinaciones.md */}
    <Composition
      id="Recorrido056"
      component={Recorrido056}
      durationInFrames={DURACION_056}
      fps={FPS_056}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
