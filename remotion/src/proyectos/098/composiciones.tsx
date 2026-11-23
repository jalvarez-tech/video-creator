import { Composition } from "remotion";
import { DURACION_098, FPS_098 } from "./metraje-098";
import { TuEstasAqui098 } from "./TuEstasAqui098";

/**
 * REGISTRO del proyecto 098. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 098 · «TÚ ESTÁS AQUÍ» ── (src/proyectos/098/)
        Un minuto 16:9 de la campaña MAS Estrellitas 2026 (Fundación MAS · Casa Sobre la Roca) con «Tu Estás Aquí»
        (Samy Galí, piano): íntimo, la presencia de Dios dicha por las niñas. Plan y timeline: proyectos/098/artefactos/.
        Los vídeos salen de remotion/public/mas-097/ (receta del 097); las fotos y la música, de
        `node proyectos/098/normalizar.mjs` (sale menores: no entra en git). */}
    <Composition id="TuEstasAqui098" component={TuEstasAqui098} durationInFrames={DURACION_098} fps={FPS_098} width={1920} height={1080} />
  </>
);
