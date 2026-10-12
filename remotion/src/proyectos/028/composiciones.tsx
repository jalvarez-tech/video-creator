import { Composition } from "remotion";
import { DURACION_028, FPS_028 } from "./metraje-028";
import { Recorrido028 } from "./Recorrido028";

/**
 * REGISTRO del proyecto 028. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 028 · RECORRIDO ── (src/proyectos/028/)
        Recorrido de Propiedades Luxur en UNA SOLA TOMA (RC14), acelerada en los
        tránsitos y a velocidad 1 donde hay algo que mirar; la voz de Isabella
        (hook y CTA) en su propia capa, la música por golpes y
        subtítulos editoriales. La duración sale del plan (`DURACION_028`); el
        material se repone con `node proyectos/028/normalizar.mjs` y se comprueba
        con `node proyectos/028/revisar-028.mjs`.
        Artefactos: proyectos/028/artefactos/ */}
    <Composition
      id="Recorrido028"
      component={Recorrido028}
      durationInFrames={DURACION_028}
      fps={FPS_028}
      width={1080}
      height={1920}
    />
  </>
);
