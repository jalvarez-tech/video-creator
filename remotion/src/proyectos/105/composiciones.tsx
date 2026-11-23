import { Composition } from "remotion";
import { ALTO, ANCHO, FPS_HISTORIAS } from "../101/historia";
import { HistoriaMAS } from "../101/HistoriaMAS";
import { HISTORIA_105, audio105 } from "./historia-105";

const Historia105: React.FC = () => <HistoriaMAS h={HISTORIA_105} audio={audio105} />;

/**
 * REGISTRO del proyecto 105. Lo descubre `src/estudio.tsx` por el nombre de este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 105 · HISTORIA VERTICAL DE MAS ── (src/proyectos/105/)
        El vídeo vertical LARGO de la serie de historias 9:16 de MAS Estrellitas 2026 (101-105), dicho por las niñas y
        sin voz en off. Molde y piezas comunes en src/proyectos/101/; plan de la serie en proyectos/101/artefactos/.
        Material: `node proyectos/101/normalizar.mjs` (salen menores: no entra en git). */}
    <Composition id={HISTORIA_105.composicion} component={Historia105} durationInFrames={HISTORIA_105.duracion} fps={FPS_HISTORIAS} width={ANCHO} height={ALTO} />
  </>
);
