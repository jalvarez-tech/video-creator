import { Composition } from "remotion";
import { DURACION_075, FPS_075 } from "./metraje-075";
import { Recorrido075 } from "./Recorrido075";

/**
 * REGISTRO del proyecto 075. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 075 · RECORRIDO ── (src/proyectos/075/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_075`); el material se repone con `node proyectos/075/normalizar.mjs` y se
        comprueba con `node proyectos/075/revisar-075.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/075/artefactos/ · versiones: proyectos/075/combinaciones.md */}
    <Composition
      id="Recorrido075"
      component={Recorrido075}
      durationInFrames={DURACION_075}
      fps={FPS_075}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
