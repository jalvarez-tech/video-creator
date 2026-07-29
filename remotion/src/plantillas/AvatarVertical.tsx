import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { SubtitulosSync } from "./SubtitulosSync";
import { subtitulos001 } from "./subtitulos-001";
import { MotionGraphicsFull } from "./MotionGraphicsFull";
import { PistaSonido } from "./sound/PistaSonido";
import { cues001 } from "./cues-001";

/**
 * Avatar HeyGen 9:16 sobre plantilla vertical (Reels/TikTok/Shorts).
 * Composita remotion/public/avatar-9x16.mp4 + subtítulos SINCRONIZADOS con la voz.
 * Los subtítulos salen de subtitulos-001.ts (transcripción whisper limpiada).
 */
export const AvatarVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo
        src={staticFile("avatar-9x16.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <MotionGraphicsFull />
      <SubtitulosSync segmentos={subtitulos001} tamanoPx={64} yPct={70} />
      {/* Narración continua del avatar → ducking global de los SFX (SKILL §10) */}
      <PistaSonido cues={cues001} duckDb={-4.5} />
    </AbsoluteFill>
  );
};
