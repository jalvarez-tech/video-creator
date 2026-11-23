import { Composition } from "remotion";
import { ALTO, ANCHO, FPS_HISTORIAS } from "../101/historia";
import { HistoriaMAS } from "../101/HistoriaMAS";
import { HISTORIA_103, audio103 } from "./historia-103";

const Historia103: React.FC = () => <HistoriaMAS h={HISTORIA_103} audio={audio103} />;

/**
 * REGISTRO del proyecto 103. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 103 · HISTORIA VERTICAL DE MAS ── (src/proyectos/103/)
        Una de las cuatro historias 9:16 para redes de la campaña MAS Estrellitas 2026 (101-104), dicha por las niñas y
        sin voz en off. Molde y piezas comunes en src/proyectos/101/; plan de la serie en proyectos/101/artefactos/.
        Material: `node proyectos/101/normalizar.mjs` (salen menores: no entra en git). */}
    <Composition id={HISTORIA_103.composicion} component={Historia103} durationInFrames={HISTORIA_103.duracion} fps={FPS_HISTORIAS} width={ANCHO} height={ALTO} />
  </>
);
