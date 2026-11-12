import { Composition } from "remotion";
import { DURACION_074, FPS_074 } from "./metraje-074";
import { Recorrido074 } from "./Recorrido074";

/**
 * REGISTRO del proyecto 074. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 074 · RECORRIDO ── (src/proyectos/074/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_074`); el material se repone con `node proyectos/074/normalizar.mjs` y se
        comprueba con `node proyectos/074/revisar-074.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/074/artefactos/ · versiones: proyectos/074/combinaciones.md */}
    <Composition
      id="Recorrido074"
      component={Recorrido074}
      durationInFrames={DURACION_074}
      fps={FPS_074}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
