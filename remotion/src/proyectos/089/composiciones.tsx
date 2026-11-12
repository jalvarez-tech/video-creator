import { Composition } from "remotion";
import { DURACION_089, FPS_089 } from "./metraje-089";
import { Recorrido089 } from "./Recorrido089";

/**
 * REGISTRO del proyecto 089. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 089 · RECORRIDO ── (src/proyectos/089/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), Casa El Retiro · Senderos de Compostela (COP 2.800 M):
        la casa de lejos, el hook de Isabella, dos planos rápidos, la mitad, un recorrido con música y el CTA, con la estructura «lo vendible antes del segundo 10».
        La duración sale del plan (`DURACION_089`); el material se repone con `node proyectos/089/normalizar.mjs` y se comprueba con
        `node proyectos/089/revisar-089.mjs`. `Recorrido089Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`).
        Encargo y plan: proyectos/089/artefactos/ · versiones: proyectos/089/combinaciones.md */}
    <Composition
      id="Recorrido089"
      component={Recorrido089}
      durationInFrames={DURACION_089}
      fps={FPS_089}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido089Ficha"
      component={Recorrido089}
      durationInFrames={DURACION_089}
      fps={FPS_089}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
