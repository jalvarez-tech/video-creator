import { Composition } from "remotion";
import { DURACION_076, FPS_076 } from "./metraje-076";
import { Recorrido076 } from "./Recorrido076";

/**
 * REGISTRO del proyecto 076. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 076 · RECORRIDO ── (src/proyectos/076/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V57 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_076`); el material se repone con `node proyectos/076/normalizar.mjs` y se
        comprueba con `node proyectos/076/revisar-076.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/076/artefactos/ · versiones: proyectos/076/combinaciones.md */}
    <Composition
      id="Recorrido076"
      component={Recorrido076}
      durationInFrames={DURACION_076}
      fps={FPS_076}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
