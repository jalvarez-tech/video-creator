import { Composition } from "remotion";
import { DURACION_097, FPS_097 } from "./metraje-097";
import { Estrellitas097 } from "./Estrellitas097";

/**
 * REGISTRO del proyecto 097. Lo descubre `src/estudio.tsx` por el nombre de este archivo;
 * `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 097 · MAS ESTRELLITAS 2026 ── (src/proyectos/097/)
        «Lo más bonito de un regalo»: vídeo 16:9 de la campaña de Navidad de la Fundación MAS (Casa Sobre la Roca),
        con el material del encuentro del 2026-11-20. Guion y timeline: proyectos/097/artefactos/.
        El material se repone con `node proyectos/097/normalizar.mjs` (sale menores: no entra en git). */}
    <Composition id="Estrellitas097" component={Estrellitas097} durationInFrames={DURACION_097} fps={FPS_097} width={1920} height={1080} />
  </>
);
