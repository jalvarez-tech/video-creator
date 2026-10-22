import { Composition } from "remotion";
import { DURACION_057, FPS_057 } from "./metraje-057";
import { Recorrido057 } from "./Recorrido057";

/**
 * REGISTRO del proyecto 057. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 057 · RECORRIDO ── (src/proyectos/057/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V39 del Apartamento en Palmazera
        (La Ceja): el edificio desde el aire, el hook de Isabella, recorrido con música, la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_057`); el material se repone con `node proyectos/057/normalizar.mjs` y se
        comprueba con `node proyectos/057/revisar-057.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/057/artefactos/ · versiones: proyectos/057/combinaciones.md */}
    <Composition
      id="Recorrido057"
      component={Recorrido057}
      durationInFrames={DURACION_057}
      fps={FPS_057}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
