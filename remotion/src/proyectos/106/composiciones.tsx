import { Composition } from "remotion";
import { EnUltimasNoticias106 } from "./EnUltimasNoticias106";
import { DURACION_106, FPS_106 } from "./metraje-106";

/**
 * REGISTRO del proyecto 106. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 106 · «EN ÚLTIMAS NOTICIAS» 16:9 ── (src/proyectos/106/)
        La versión horizontal del vídeo vertical 105 de MAS Estrellitas 2026: las niñas de reporteras, solo tomas que no
        salen en 097-104, «Yeshua» de corrido y el CTA en papel del 100.
        Material: `node proyectos/106/normalizar.mjs` (salen menores: no entra en git). */}
    <Composition id="EnUltimasNoticias106" component={EnUltimasNoticias106} durationInFrames={DURACION_106} fps={FPS_106} width={1920} height={1080} />
  </>
);
