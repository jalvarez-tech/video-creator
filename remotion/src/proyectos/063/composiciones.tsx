import { Composition } from "remotion";
import { DURACION_063, FPS_063 } from "./metraje-063";
import { Recorrido063 } from "./Recorrido063";

/**
 * REGISTRO del proyecto 063. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 063 · RECORRIDO ── (src/proyectos/063/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V45 del Lote en San Vicente
        Ferrer (La Porquera): el lote desde el aire, el hook de Isabella, vuelo de dron con música, la mitad,
        vuelo y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_063`); el material se repone con `node proyectos/063/normalizar.mjs` y se
        comprueba con `node proyectos/063/revisar-063.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/063/artefactos/ · versiones: proyectos/063/combinaciones.md */}
    <Composition
      id="Recorrido063"
      component={Recorrido063}
      durationInFrames={DURACION_063}
      fps={FPS_063}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
