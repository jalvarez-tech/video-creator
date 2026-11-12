import { Composition } from "remotion";
import { DURACION_088, FPS_088 } from "./metraje-088";
import { Recorrido088 } from "./Recorrido088";

/**
 * REGISTRO del proyecto 088. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 088 · RECORRIDO ── (src/proyectos/088/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur), Casa El Retiro · Senderos de Compostela (COP 2.800 M):
        la casa de lejos, el hook de Isabella, dos planos rápidos, la mitad, un recorrido con música y el CTA, con la estructura «lo vendible antes del segundo 10».
        La duración sale del plan (`DURACION_088`); el material se repone con `node proyectos/088/normalizar.mjs` y se comprueba con
        `node proyectos/088/revisar-088.mjs`. `Recorrido088Ficha` (prop `ficha`) = la versión con ficha (`ficha-luxur`).
        Encargo y plan: proyectos/088/artefactos/ · versiones: proyectos/088/combinaciones.md */}
    <Composition
      id="Recorrido088"
      component={Recorrido088}
      durationInFrames={DURACION_088}
      fps={FPS_088}
      width={1080}
      height={1920}
      defaultProps={{ ficha: false }}
    />
    {/* La versión CON FICHA: la misma pieza sin subtítulos y con la ficha (tipo, locación y precio) abajo, dentro del recorte 1:1, desde el hook. */}
    <Composition
      id="Recorrido088Ficha"
      component={Recorrido088}
      durationInFrames={DURACION_088}
      fps={FPS_088}
      width={1080}
      height={1920}
      defaultProps={{ ficha: true }}
    />
  </>
);
