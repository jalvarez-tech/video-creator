import { Composition } from "remotion";
import { DURACION_020, FPS_020 } from "./metraje-020";
import { Recorrido020 } from "./Recorrido020";

/**
 * REGISTRO del proyecto 020. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 020 · LOS PATIOS · APTO 501, CUARTA VERSIÓN ── (src/proyectos/020/)
        Reel de venta de Propiedades Luxur con Isabella Cadavid (skill recorrido-luxur), la
        cuarta del apto 501: la calle y la entrada (limpias) → hook (HK03, la sala del muro de bloques) →
        el pasillo, el espacio abierto y el patio → mitad (MD14, el patio) → la alcoba, el cielo desde la ventana y el
        dron (DR156) → CTA (CT06, el espacio abierto), con «Sax for the Last Customer» (jazz) cortada a sus golpes,
        su acorde final justo tras la última palabra del CTA y la música bajando cuando ella habla. Subtítulos
        editoriales abajo a 90 % de opacidad. La duración sale del plan (`DURACION_020`); el material se repone con
        `node proyectos/020/normalizar.mjs` y se comprueba con `node proyectos/020/revisar-020.mjs`.
        Con `color` por plano, el render lleva `--gl=angle` (R32).
        Artefactos: proyectos/020/artefactos/ · el tablero de variantes: proyectos/017/combinaciones.md y proyectos/020/combinaciones.md */}
    <Composition
      id="Recorrido020"
      component={Recorrido020}
      durationInFrames={DURACION_020}
      fps={FPS_020}
      width={1080}
      height={1920}
    />
  </>
);
