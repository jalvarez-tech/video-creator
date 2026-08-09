import { AbsoluteFill, Audio, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { CamaraVirtual } from "./CamaraVirtual";
import { camara002 } from "./camara-002";
import { cubreLaPantalla, MotionApple002 } from "./MotionApple002";
import { PistaSonido } from "./sound/PistaSonido";
import { cues002 } from "./cues-002";

/**
 * Proyecto 002 — avatar `avatar_1.mp4` con dirección de arte estilo Apple.
 * Ensamblado por el director-video (manuales/director-video/SKILL.md).
 * Clip: 1080×1920 · 25 fps · 883 frames (35.3 s).
 *
 * Z-ORDER (director §3), de atrás a delante:
 *   fondo negro → AVATAR dentro de <CamaraVirtual> (solo él se reencuadra)
 *   → motion graphics (overlay fijo) → subtítulos (overlay fijo) → sonido.
 * La voz del avatar manda; los SFX van por debajo con ducking (duckDb).
 *
 * LA VOZ va en su propio <Audio> siempre montado, y el vídeo va `muted`: durante
 * las tomas a pantalla completa el <OffthreadVideo> se desmonta —no se ve, así
 * que no hay por qué decodificarlo— pero la narración no puede interrumpirse
 * (R10). Es el mismo patrón que Avatar003; aquí faltaba, y el avatar se
 * decodificaba en los 544 frames (62 %) en que está tapado.
 *
 * Las ventanas las exporta MotionApple002 (`TOMAS_A_PANTALLA_COMPLETA`), que es
 * quien las pinta: así no pueden desincronizarse de las escenas.
 */
export const Avatar002: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {cubreLaPantalla(frame) ? null : (
        <CamaraVirtual cues={camara002}>
          <OffthreadVideo
            src={staticFile("avatar-002.mp4")}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CamaraVirtual>
      )}
      <MotionApple002 />
      {/* Sin subtítulos por decisión del cliente. Para reactivarlos: importar
          SubtitulosKaraoke + subtitulos002 y añadir aquí
          <SubtitulosKaraoke segmentos={subtitulos002} tamanoPx={58} yPct={72} resalte="#86EFAC" /> */}
      {/* La VOZ del avatar, siempre montada e intacta: manda sobre todo lo demás. */}
      <Audio src={staticFile("avatar-002.mp4")} />
      <PistaSonido cues={cues002} duckDb={-5} />
    </AbsoluteFill>
  );
};
