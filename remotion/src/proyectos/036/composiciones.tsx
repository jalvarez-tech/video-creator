import { Composition } from "remotion";
import { DURACION_036, FPS_036 } from "./metraje-036";
import { Recorrido036 } from "./Recorrido036";

/**
 * REGISTRO del proyecto 036. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 036 · CASA CAMPESTRE GUARNE (V19) ── (src/proyectos/036/)
        Cuarto reel de Propiedades Luxur de esta casa y el primero CINEMATOGRÁFICO, con la estructura del canal (dron · hook ·
        recorrido · mitad · recorrido · CTA) y el hilo del REFUGIO: HK11, MD08 y CT07. Material 16:9 encuadrado a 9:16 (Isabella
        seguida con Vision; drones con ventanas medidas a velocidad constante), voz tratada a −15 LUFS en su propia capa, «Begin Again»
        (que no está en otros vídeos), color por plano y subtítulos editoriales. La duración sale del plan (`DURACION_036`); el
        material se repone con `node proyectos/036/normalizar.mjs` y se comprueba con `node proyectos/036/revisar-036.mjs`.
        Artefactos: proyectos/036/artefactos/ */}
    <Composition
      id="Recorrido036"
      component={Recorrido036}
      durationInFrames={DURACION_036}
      fps={FPS_036}
      width={1080}
      height={1920}
    />
  </>
);
