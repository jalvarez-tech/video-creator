import { Composition } from "remotion";
import { DURACION_048, FPS_048 } from "./metraje-048";
import { Recorrido048 } from "./Recorrido048";

/**
 * REGISTRO del proyecto 048. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 048 · RECORRIDO ── (src/proyectos/048/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_048`); el
        material se repone con `node proyectos/048/normalizar.mjs` y se comprueba
        con `node proyectos/048/revisar-048.mjs`.
        Guion: proyectos/048/guion-recorrido.md · artefactos: proyectos/048/artefactos/ */}
    <Composition
      id="Recorrido048"
      component={Recorrido048}
      durationInFrames={DURACION_048}
      fps={FPS_048}
      width={1080}
      height={1920}
    />
  </>
);
