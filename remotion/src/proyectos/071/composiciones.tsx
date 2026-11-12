import { Composition } from "remotion";
import { DURACION_071, FPS_071 } from "./metraje-071";
import { Recorrido071 } from "./Recorrido071";

/**
 * REGISTRO del proyecto 071. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 071 · RECORRIDO ── (src/proyectos/071/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_071`); el material se repone con `node proyectos/071/normalizar.mjs` y se
        comprueba con `node proyectos/071/revisar-071.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/071/artefactos/ · versiones: proyectos/071/combinaciones.md */}
    <Composition
      id="Recorrido071"
      component={Recorrido071}
      durationInFrames={DURACION_071}
      fps={FPS_071}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
