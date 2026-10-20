import { Composition } from "remotion";
import { DURACION_046, FPS_046 } from "./metraje-046";
import { Recorrido046 } from "./Recorrido046";

/**
 * REGISTRO del proyecto 046. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 046 · RECORRIDO ── (src/proyectos/046/)
        «Ciudad nueva», V28: reel de arriendo de Tierra Grata (El Poblado) con Isabella que ABRE CON EL HOOK
        (excepción declarada), la unidad, la mitad en dos tomas, el apartamento, la terraza al atardecer y el
        CTA, con «Children» (piano) y subtítulos editoriales. La duración sale del plan (`DURACION_046`); el
        material se repone con `node proyectos/046/normalizar.mjs` y se comprueba con
        `node proyectos/046/revisar-046.mjs`. `sinSubtitulos` es la base de la versión «con ficha» (anuncios).
        Encargo y plan: proyectos/046/artefactos/ · versiones: proyectos/046/combinaciones.md */}
    <Composition
      id="Recorrido046"
      component={Recorrido046}
      durationInFrames={DURACION_046}
      fps={FPS_046}
      width={1080}
      height={1920}
    />
  </>
);
