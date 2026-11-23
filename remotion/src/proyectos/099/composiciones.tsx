import { Composition } from "remotion";
import { ATusPies099 } from "./ATusPies099";
import { DURACION_099, FPS_099 } from "./metraje-099";

/**
 * REGISTRO del proyecto 099. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 099 · «A TUS PIES» ── (src/proyectos/099/)
        1 minuto 16:9 para la Fundación MAS (MAS Estrellitas 2026), con la canción «A Tus Pies» y lo que dicen las niñas, sin
        voz en off. Plan y timeline: proyectos/099/artefactos/. Lee el material normalizado del 097 (remotion/public/mas-097/)
        y la música de remotion/public/mas-099/ (`node proyectos/099/normalizar.mjs`); nada de eso entra en git. */}
    <Composition id="ATusPies099" component={ATusPies099} durationInFrames={DURACION_099} fps={FPS_099} width={1920} height={1080} />
  </>
);
