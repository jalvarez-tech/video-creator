import { Composition } from "remotion";
import { DURACION_100, FPS_100 } from "./metraje-100";
import { OtraVez100 } from "./OtraVez100";

/**
 * REGISTRO del proyecto 100. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 100 · «LO HARÁS OTRA VEZ» ── (src/proyectos/100/)
        Un minuto de alegría y esperanza para la Fundación MAS (MAS Estrellitas 2026), 16:9, con el material del 097
        (remotion/public/mas-097/, solo lectura) y «Lo harás otra vez» (Elevation Worship, pista) de corrido.
        La música se repone con `node proyectos/100/normalizar.mjs`. */}
    <Composition id="OtraVez100" component={OtraVez100} durationInFrames={DURACION_100} fps={FPS_100} width={1920} height={1080} />
  </>
);
