import { Composition } from "remotion";
import { ALTO, ANCHO, FPS_HISTORIAS } from "./historia";
import { HistoriaMAS } from "./HistoriaMAS";
import { HISTORIA_101, audio101 } from "./historia-101";

const Historia101: React.FC = () => <HistoriaMAS h={HISTORIA_101} audio={audio101} />;

/**
 * REGISTRO del proyecto 101. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 101 · HISTORIA VERTICAL DE MAS ── (src/proyectos/101/)
        Una de las cuatro historias 9:16 para redes de la campaña MAS Estrellitas 2026 (101-104), dicha por las niñas y
        sin voz en off. Molde y piezas comunes en src/proyectos/101/; plan de la serie en proyectos/101/artefactos/.
        Material: `node proyectos/101/normalizar.mjs` (salen menores: no entra en git). */}
    <Composition id={HISTORIA_101.composicion} component={Historia101} durationInFrames={HISTORIA_101.duracion} fps={FPS_HISTORIAS} width={ANCHO} height={ALTO} />
  </>
);
