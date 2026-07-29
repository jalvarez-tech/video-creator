import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { CamaraVirtual } from "./CamaraVirtual";
import { camara001 } from "./camara-001";
import { SubtitulosSync } from "./SubtitulosSync";
import { subtitulos001 } from "./subtitulos-001";
import { MotionGraphicsFull } from "./MotionGraphicsFull";

/**
 * DEMO de cámara virtual: el mismo avatar 9:16 de AvatarVertical, pero el vídeo va
 * dentro de <CamaraVirtual> con el plan camara-001.ts. Prueba viva del motor
 * (rule #5 del manual: "Instalar ≠ funcionar").
 *
 * Layering clave: el AVATAR se reencuadra; los SUBTÍTULOS y los MOTION GRAPHICS
 * quedan FUERA de la cámara → no se mueven con ella. Cuando el avatar se desplaza
 * para hacer espacio, el gráfico sigue anclado a su franja superior (R08).
 *
 * Se registra como composición aparte (CamaraDemo) para no alterar Avatar9x16,
 * que ya está verificado. El plan de cámara se decide POR proyecto.
 */
export const CamaraDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <CamaraVirtual cues={camara001}>
        <OffthreadVideo
          src={staticFile("avatar-9x16.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </CamaraVirtual>
      {/* Overlays FUERA de la cámara (fijos) */}
      <MotionGraphicsFull />
      <SubtitulosSync segmentos={subtitulos001} tamanoPx={64} yPct={70} />
    </AbsoluteFill>
  );
};
