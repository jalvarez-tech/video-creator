import { Composition } from "remotion";
import { DURACION_032, FPS_032 } from "./metraje-032";
import { Recorrido032 } from "./Recorrido032";

/**
 * REGISTRO del proyecto 032. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 032 · CASA CAMPESTRE GUARNE (V16) ── (src/proyectos/032/)
        Segundo reel de Propiedades Luxur de esta casa, con la estructura del canal (dron · hook · recorrido · mitad ·
        recorrido · CTA) y el hilo de la familia de tres generaciones: HK02, MD01 y CT04. Material 16:9 encuadrado a 9:16
        (Isabella seguida con Vision; dron y recorridos a mano), voz tratada a −15 LUFS en su propia capa, «We Are» (que no
        está en otros vídeos), color por plano y subtítulos editoriales. La duración sale del plan (`DURACION_032`); el
        material se repone con `node proyectos/032/normalizar.mjs` y se comprueba con `node proyectos/032/revisar-032.mjs`.
        Artefactos: proyectos/032/artefactos/ */}
    <Composition
      id="Recorrido032"
      component={Recorrido032}
      durationInFrames={DURACION_032}
      fps={FPS_032}
      width={1080}
      height={1920}
    />
  </>
);
