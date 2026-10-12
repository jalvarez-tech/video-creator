import { Composition } from "remotion";
import { DURACION_033, FPS_033 } from "./metraje-033";
import { Recorrido033 } from "./Recorrido033";

/**
 * REGISTRO del proyecto 033. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 033 · CASA CAMPESTRE GUARNE (V17) ── (src/proyectos/033/)
        Tercer reel de Propiedades Luxur de esta casa, con la estructura del canal (dron · hook · recorrido · mitad ·
        recorrido · CTA) y el hilo de la DIÁSPORA: CT21 (como hook), MD06 y CT18. Material 16:9 encuadrado a 9:16
        (Isabella seguida con Vision; dron y recorridos a mano), voz tratada a −15 LUFS en su propia capa, «Utopia» (que no
        está en otros vídeos), color por plano y subtítulos editoriales. La duración sale del plan (`DURACION_033`); el
        material se repone con `node proyectos/033/normalizar.mjs` y se comprueba con `node proyectos/033/revisar-033.mjs`.
        Artefactos: proyectos/033/artefactos/ */}
    <Composition
      id="Recorrido033"
      component={Recorrido033}
      durationInFrames={DURACION_033}
      fps={FPS_033}
      width={1080}
      height={1920}
    />
  </>
);
