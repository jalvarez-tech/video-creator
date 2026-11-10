import { Composition } from "remotion";
import { DURACION_079, FPS_079 } from "./metraje-079";
import { Recorrido079 } from "./Recorrido079";

/**
 * REGISTRO del proyecto 079. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 079 · RECORRIDO ── (src/proyectos/079/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), V51 de la Suite Go Living
        (El Poblado): el edificio desde el suelo, el hook de Isabella, recorrido con música, la mitad,
        recorrido y CTA. Montaje de tomas con la voz en su propia capa y subtítulos editoriales. La duración
        sale del plan (`DURACION_079`); el material se repone con `node proyectos/079/normalizar.mjs` y se
        comprueba con `node proyectos/079/revisar-079.mjs`. `Recorrido079Ficha` (prop `ficha`) = la versión con
        ficha (`ficha-luxur`).
        Encargo y plan: proyectos/079/artefactos/ · versiones: proyectos/079/combinaciones.md */}
    <Composition
      id="Recorrido079"
      component={Recorrido079}
      durationInFrames={DURACION_079}
      fps={FPS_079}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido079Ficha"
      component={Recorrido079}
      durationInFrames={DURACION_079}
      fps={FPS_079}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
