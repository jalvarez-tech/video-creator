import { Composition } from "remotion";
import { DURACION_058, FPS_058 } from "./metraje-058";
import { Recorrido058 } from "./Recorrido058";

/**
 * REGISTRO del proyecto 058. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 058 · RECORRIDO ── (src/proyectos/058/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V40 del Apartamento en Palmazera
        (La Ceja): el edificio desde el aire, el hook de Isabella, recorrido con música, la mitad, recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_058`); el material se repone con `node proyectos/058/normalizar.mjs` y se
        comprueba con `node proyectos/058/revisar-058.mjs`. `sinSubtitulos` = la base de la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/058/artefactos/ · versiones: proyectos/058/combinaciones.md */}
    <Composition
      id="Recorrido058"
      component={Recorrido058}
      durationInFrames={DURACION_058}
      fps={FPS_058}
      width={1080}
      height={1920}
      defaultProps={{ sinSubtitulos: false }}
    />
  </>
);
