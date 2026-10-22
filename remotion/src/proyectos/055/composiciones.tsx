import { Composition } from "remotion";
import { DURACION_055, FPS_055 } from "./metraje-055";
import { Recorrido055 } from "./Recorrido055";

/**
 * REGISTRO del proyecto 055. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 055 · RECORRIDO ── (src/proyectos/055/)
        «Casa en Condominio Los Bravos (La Ceja)», V37, ángulo «las mañanas»: la aérea, el hook de Isabella, el primer
        recorrido, su mitad, el segundo recorrido y su CTA, con la música de *Spring is Coming*. Montaje de tomas con la
        voz en su propia capa y subtítulos editoriales. La duración sale del plan (`DURACION_055`); el material se repone
        con `node proyectos/055/normalizar.mjs` y se comprueba con `node proyectos/055/revisar-055.mjs`. `sinSubtitulos`
        = la base de la versión con ficha (`ficha-luxur`). Encargo y plan: proyectos/055/artefactos/ · versiones:
        proyectos/055/combinaciones.md */}
    <Composition
      id="Recorrido055"
      component={Recorrido055}
      durationInFrames={DURACION_055}
      fps={FPS_055}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
