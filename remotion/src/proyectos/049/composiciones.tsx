import { Composition } from "remotion";
import { DURACION_049, FPS_049 } from "./metraje-049";
import { Recorrido049 } from "./Recorrido049";

/**
 * REGISTRO del proyecto 049. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 049 · TIERRA GRATA BOSQUE SANTO (V31, «AMENIDADES») ── (src/proyectos/049/)
        Quinto reel de arriendo de Propiedades Luxur en El Poblado (045-050), con la estructura del canal (apartamento · hook · recorrido ·
        mitad · recorrido · CTA): HK03, MD05 y CT01, «In This Together» (cinematic), voz tratada a −15 LUFS en su propia capa, color por plano y
        subtítulos editoriales (`sinSubtitulos` para la versión con ficha). La duración sale del plan (`DURACION_049`); el material se repone con
        `node proyectos/049/normalizar.mjs` y se comprueba con `node proyectos/049/revisar-049.mjs`.
        Encargo y reparto: proyectos/044/reparto-045-050.md · artefactos: proyectos/049/artefactos/ · versiones: proyectos/049/combinaciones.md */}
    <Composition
      id="Recorrido049"
      component={Recorrido049}
      durationInFrames={DURACION_049}
      fps={FPS_049}
      width={1080}
      height={1920}
    />
  </>
);
