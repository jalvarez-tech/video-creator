import { Composition } from "remotion";
import { DURACION_067, FPS_067 } from "./metraje-067";
import { Recorrido067 } from "./Recorrido067";

/**
 * REGISTRO del proyecto 067. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 067 · RECORRIDO ── (src/proyectos/067/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V49 del Lote en venta en San Cristóbal
        (EOLIA Condominio): el aéreo, el hook de Isabella, recorrido con música, la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_067`); el material se repone con `node proyectos/067/normalizar.mjs` y se
        comprueba con `node proyectos/067/revisar-067.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/067/artefactos/ · versiones: proyectos/067/combinaciones.md */}
    <Composition
      id="Recorrido067"
      component={Recorrido067}
      durationInFrames={DURACION_067}
      fps={FPS_067}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
