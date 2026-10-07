import { Composition } from "remotion";
import { DURACION_019, FPS_019 } from "./metraje-019";
import { Recorrido019 } from "./Recorrido019";

/**
 * REGISTRO del proyecto 019. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 019 · LOS PATIOS · APTO 501, TERCERA VERSIÓN ── (src/proyectos/019/)
        Reel de venta de Propiedades Luxur con Isabella Cadavid (skill recorrido-luxur), la
        tercera del apto 501: la fachada desde el suelo (limpia) → hook (HK05, la baranda) → el dron
        (DR152) y el patio → mitad (MD08, la terraza) → la alcoba, el muro de bloques y la vista → CTA
        (CT05, el muro de bloques), con «Flying Into the Sun» de Aleksey Chistilin cortada a sus golpes
        y la música bajando cuando ella habla. Subtítulos editoriales abajo a 90 % de opacidad. La
        duración sale del plan (`DURACION_019`); el material se repone con
        `node proyectos/019/normalizar.mjs` y se comprueba con `node proyectos/019/revisar-019.mjs`.
        Con `color` por plano, el render lleva `--gl=angle` (R32).
        Artefactos: proyectos/019/artefactos/ · el tablero de variantes: proyectos/017/combinaciones.md */}
    <Composition
      id="Recorrido019"
      component={Recorrido019}
      durationInFrames={DURACION_019}
      fps={FPS_019}
      width={1080}
      height={1920}
    />
  </>
);
