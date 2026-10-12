import { Composition } from "remotion";
import { DURACION_037, FPS_037 } from "./metraje-037";
import { Recorrido037 } from "./Recorrido037";

/**
 * REGISTRO del proyecto 037. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 037 · CASA CAMPESTRE GUARNE (V20) ── (src/proyectos/037/)
        Quinto reel de Propiedades Luxur de esta casa, con la estructura del canal (dron · hook · recorrido · mitad ·
        recorrido · CTA) y el hilo del ERROR: HK08 (hook), MD10 y CT08. Material 4K 16:9 encuadrado a 9:16 (Isabella seguida
        con Vision; dron y recorridos a mano; las placas de los coches del hook, difuminadas), voz tratada a −15 LUFS en su propia
        capa, «Familiar» (que no está en otros vídeos), color por plano y subtítulos editoriales. La duración sale del plan
        (`DURACION_037`); el material se repone con `node proyectos/037/normalizar.mjs` y se comprueba con
        `node proyectos/037/revisar-037.mjs`.
        Artefactos: proyectos/037/artefactos/ */}
    <Composition
      id="Recorrido037"
      component={Recorrido037}
      durationInFrames={DURACION_037}
      fps={FPS_037}
      width={1080}
      height={1920}
    />
  </>
);
