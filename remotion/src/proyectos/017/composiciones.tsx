import { Composition } from "remotion";
import { DURACION_017, FPS_017 } from "./metraje-017";
import { Recorrido017 } from "./Recorrido017";

/**
 * REGISTRO del proyecto 017. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 017 · LOS PATIOS · APTO 501 ── (src/proyectos/017/)
        Reel de venta de Propiedades Luxur con Isabella Cadavid (skill
        recorrido-luxur): dron → hook (HK02) → recorrido → mitad (MD09) →
        recorrido → CTA (CT07), con «Time» de Hans Zimmer cortada al compás y
        la música bajando cuando ella habla. Subtítulos editoriales abajo a 90 %
        de opacidad. La duración sale del plan (`DURACION_017`); el material se
        repone con `node proyectos/017/normalizar.mjs` y se comprueba con
        `node proyectos/017/revisar-017.mjs`.
        Artefactos: proyectos/017/artefactos/ · combinaciones: proyectos/017/combinaciones.md */}
    <Composition
      id="Recorrido017"
      component={Recorrido017}
      durationInFrames={DURACION_017}
      fps={FPS_017}
      width={1080}
      height={1920}
    />
  </>
);
