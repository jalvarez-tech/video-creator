import { Composition } from "remotion";
import { DURACION_021, FPS_021 } from "./metraje-021";
import { Recorrido021 } from "./Recorrido021";

/**
 * REGISTRO del proyecto 021. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 021 · LOS PATIOS · APTO 501, QUINTA VERSIÓN ── (src/proyectos/021/)
        Reel de venta de Propiedades Luxur con Isabella Cadavid (skill recorrido-luxur), la
        quinta del apto 501: el deck (limpio) → hook (HK06, la terraza) → la piscina, el dron (DR154) y la barandilla →
        mitad (MD01, la barandilla) → la corredera y la alcoba hasta su ventanal → CTA (CT02 recortado, el balcón), con «Amélie»
        (piano) cortada a sus golpes, la voz del CTA sobre su decaimiento final y la música bajando cuando ella habla. Subtítulos
        editoriales abajo a 90 % de opacidad. La duración sale del plan (`DURACION_021`); el material se repone con
        `node proyectos/021/normalizar.mjs` y se comprueba con `node proyectos/021/revisar-021.mjs`.
        Con `color` por plano, el render lleva `--gl=angle` (R32).
        Artefactos: proyectos/021/artefactos/ · el tablero de variantes: proyectos/017/combinaciones.md y proyectos/021/combinaciones.md */}
    <Composition
      id="Recorrido021"
      component={Recorrido021}
      durationInFrames={DURACION_021}
      fps={FPS_021}
      width={1080}
      height={1920}
    />
  </>
);
