import { Composition } from "remotion";
import { DURACION_077, FPS_077 } from "./metraje-077";
import { Recorrido077 } from "./Recorrido077";

/**
 * REGISTRO del proyecto 077. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 077 · RECORRIDO ── (src/proyectos/077/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V58 de la Suite Go Living
        (El Poblado, con zonas sociales): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_077`); el material se repone con `node proyectos/077/normalizar.mjs` y se
        comprueba con `node proyectos/077/revisar-077.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/077/artefactos/ · versiones: proyectos/077/combinaciones.md */}
    <Composition
      id="Recorrido077"
      component={Recorrido077}
      durationInFrames={DURACION_077}
      fps={FPS_077}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
