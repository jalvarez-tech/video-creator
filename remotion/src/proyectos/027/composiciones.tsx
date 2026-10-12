import { Composition } from "remotion";
import { DURACION_027, FPS_027 } from "./metraje-027";
import { Recorrido027 } from "./Recorrido027";

/**
 * REGISTRO del proyecto 027. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 027 · RECORRIDO ── (src/proyectos/027/)
        Recorrido con presentadora de Propiedades Luxur (skill recorrido-luxur):
        la casa, el hook de Isabella, recorrido con música, objeciones, recorrido
        con voz en off y CTA. Montaje de tomas con la voz en su propia capa y
        subtítulos editoriales. La duración sale del plan (`DURACION_027`); el
        material se repone con `node proyectos/027/normalizar.mjs` y se comprueba
        con `node proyectos/027/revisar-027.mjs`.
        Guion: proyectos/027/guion-recorrido.md · artefactos: proyectos/027/artefactos/ */}
    <Composition
      id="Recorrido027"
      component={Recorrido027}
      durationInFrames={DURACION_027}
      fps={FPS_027}
      width={1080}
      height={1920}
    />
  </>
);
