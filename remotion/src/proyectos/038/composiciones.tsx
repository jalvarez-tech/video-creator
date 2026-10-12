import { Composition } from "remotion";
import { DURACION_038, FPS_038 } from "./metraje-038";
import { Recorrido038 } from "./Recorrido038";

/**
 * REGISTRO del proyecto 038. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 038 · CASA CAMPESTRE GUARNE (V21) ── (src/proyectos/038/)
        Sexto reel de Propiedades Luxur de esta casa, con la estructura del canal (dron · hook · recorrido · mitad ·
        recorrido · CTA) y el hilo «TODOS CABEN» (el domingo en familia): HK03, MD05 y CT06. Material 16:9 encuadrado a 9:16
        (Isabella seguida con Vision; dron y recorridos a mano), voz tratada a −15 LUFS en su propia capa, «I Feel It Coming»
        (sax, que no está en otros vídeos), color por plano y subtítulos editoriales. La duración sale del plan (`DURACION_038`); el
        material se repone con `node proyectos/038/normalizar.mjs` y se comprueba con `node proyectos/038/revisar-038.mjs`.
        Artefactos: proyectos/038/artefactos/ */}
    <Composition
      id="Recorrido038"
      component={Recorrido038}
      durationInFrames={DURACION_038}
      fps={FPS_038}
      width={1080}
      height={1920}
    />
  </>
);
