import { Composition } from "remotion";
import { DURACION_090, FPS_090 } from "./metraje-090";
import { Recorrido090 } from "./Recorrido090";

/**
 * REGISTRO del proyecto 090. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 090 · RECORRIDO ── (src/proyectos/090/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), Casa El Retiro · Senderos de Compostela (COP 2.800 M):
        la casa de lejos, el hook de Isabella, dos planos rápidos, la mitad, un recorrido con música y el CTA, con la estructura «lo vendible antes del segundo 10».
        La duración sale del plan (`DURACION_090`); el material se repone con `node proyectos/090/normalizar.mjs` y se comprueba con
        `node proyectos/090/revisar-090.mjs`. `Recorrido090Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`).
        Encargo y plan: proyectos/090/artefactos/ · versiones: proyectos/090/combinaciones.md */}
    <Composition
      id="Recorrido090"
      component={Recorrido090}
      durationInFrames={DURACION_090}
      fps={FPS_090}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido090Ficha"
      component={Recorrido090}
      durationInFrames={DURACION_090}
      fps={FPS_090}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
