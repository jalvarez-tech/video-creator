import { Composition } from "remotion";
import { DURACION_059, FPS_059 } from "./metraje-059";
import { Recorrido059 } from "./Recorrido059";

/**
 * REGISTRO del proyecto 059. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 059 · RECORRIDO ── (src/proyectos/059/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V41 del Apartamento en
        Palmazera (La Ceja): el edificio desde el aire, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_059`); el material se repone con `node proyectos/059/normalizar.mjs` y se
        comprueba con `node proyectos/059/revisar-059.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/059/artefactos/ · versiones: proyectos/059/combinaciones.md */}
    <Composition
      id="Recorrido059"
      component={Recorrido059}
      durationInFrames={DURACION_059}
      fps={FPS_059}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
