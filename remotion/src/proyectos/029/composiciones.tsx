import { Composition } from "remotion";
import { DURACION_029, FPS_029 } from "./metraje-029";
import { Recorrido029 } from "./Recorrido029";

/**
 * REGISTRO del proyecto 029. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 029 · CASA CAMPESTRE GUARNE (V13) ── (src/proyectos/029/)
        Reel de Propiedades Luxur hecho SOLO con las 19 tomas de `5 Cta` (16:9, encuadradas a 9:16 siguiendo a
        Isabella): la finca y ella llegando a cámara lenta, cinco frases suyas —cada una en un sitio— y el CTA con
        la puesta de sol. Voz tratada a −15 LUFS en su propia capa, música que no está en otros vídeos, color por
        plano y subtítulos editoriales. La duración sale del plan (`DURACION_029`); el material se repone con
        `node proyectos/029/normalizar.mjs` y se comprueba con `node proyectos/029/revisar-029.mjs`.
        Artefactos: proyectos/029/artefactos/ */}
    <Composition
      id="Recorrido029"
      component={Recorrido029}
      durationInFrames={DURACION_029}
      fps={FPS_029}
      width={1080}
      height={1920}
    />
  </>
);
