import { Composition } from "remotion";
import { DURACION_072, FPS_072 } from "./metraje-072";
import { Recorrido072 } from "./Recorrido072";

/**
 * REGISTRO del proyecto 072. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 072 · RECORRIDO ── (src/proyectos/072/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_072`); el material se repone con `node proyectos/072/normalizar.mjs` y se
        comprueba con `node proyectos/072/revisar-072.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/072/artefactos/ · versiones: proyectos/072/combinaciones.md */}
    <Composition
      id="Recorrido072"
      component={Recorrido072}
      durationInFrames={DURACION_072}
      fps={FPS_072}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
