import { Composition } from "remotion";
import { DURACION_018, FPS_018 } from "./metraje-018";
import { Recorrido018 } from "./Recorrido018";

/**
 * REGISTRO del proyecto 018. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 018 · LOS PATIOS · APTO 501, SEGUNDA VERSIÓN ── (src/proyectos/018/)
        Reel de venta de Propiedades Luxur con Isabella Cadavid (skill recorrido-luxur), la
        segunda del apto 501: dron → hook (HK07, el patio) → recorrido → mitad (MD07, la
        terraza) → recorrido → CTA (CT01, el balcón), con «Return to Oasis» de Aleksey Chistilin
        cortada al compás y la música bajando cuando ella habla. Subtítulos editoriales abajo a
        90 % de opacidad. La duración sale del plan (`DURACION_018`); el material se repone con
        `node proyectos/018/normalizar.mjs` y se comprueba con `node proyectos/018/revisar-018.mjs`.
        Con `color` por plano, el render lleva `--gl=angle` (R32).
        Artefactos: proyectos/018/artefactos/ · el tablero de variantes: proyectos/017/combinaciones.md */}
    <Composition
      id="Recorrido018"
      component={Recorrido018}
      durationInFrames={DURACION_018}
      fps={FPS_018}
      width={1080}
      height={1920}
    />
  </>
);
