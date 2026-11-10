import { Composition } from "remotion";
import { DURACION_068, FPS_068 } from "./metraje-068";
import { Recorrido068 } from "./Recorrido068";

/**
 * REGISTRO del proyecto 068. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 068 · RECORRIDO ── (src/proyectos/068/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V50 del Lote en San Cristóbal
        (EOLIA Condominio): la curva del camino desde el aire, el hook de Isabella, recorrido con música, la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_068`); el material se repone con `node proyectos/068/normalizar.mjs` y se
        comprueba con `node proyectos/068/revisar-068.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/068/artefactos/ · versiones: proyectos/068/combinaciones.md */}
    <Composition
      id="Recorrido068"
      component={Recorrido068}
      durationInFrames={DURACION_068}
      fps={FPS_068}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
