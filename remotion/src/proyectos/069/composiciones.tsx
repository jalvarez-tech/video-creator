import { Composition } from "remotion";
import { Botswana069 } from "./Botswana069";
import { DURACION_069, FPS_069 } from "./metraje-069";

/**
 * REGISTRO del proyecto 069. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no lo importa.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 069 · «UNIDOS POR BOTSWANA» ── (src/proyectos/069/)
        Vídeo de ayuda para reconstruir el salón de eventos donde John e Isabella se casaron (Cartagena), que se incendió. Montaje sin avatar: fotos de la boda, el incendio, ellos dos
        hablando a cámara en dos tomas y una tarjeta final con los datos para aportar. La voz en off de John y de Isabella está PENDIENTE: sus cinco huecos están reservados
        en `voz-069.ts` y se llenan con `node proyectos/069/normalizar.mjs --voz`. `DURACION_069` sale del plan de montaje.
        Artefactos: proyectos/069/artefactos/0{1,2,3}-*.md */}
    <Composition id="Botswana069" component={Botswana069} durationInFrames={DURACION_069} fps={FPS_069} width={1080} height={1920} />
  </>
);
