import { AbsoluteFill, Audio, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { CamaraVirtual } from "../../motor/CamaraVirtual";
import { camara003 } from "./camara-003";
import { cues003 } from "./cues-003";
import { Fondo } from "./Fondo003";
import { Motion003 } from "./Motion003";
import { colorDeToma, luzDeToma, W } from "./mundo-003";
import { PistaSonido } from "../../motor/sound/PistaSonido";

/**
 * Proyecto 003 — "Tu embudo no vende. Descarta.".
 * Ensamblado por el director-video (manuales/director-video/SKILL.md).
 *
 * Clip fuente: `avatar_2.mp4` · 1080×1920 · 25 fps · 1153 f (46.12 s).
 * Comp: 1080×1920 · **25 fps** · **1153 f** — por las reglas del sistema: el fps
 * ORIGINAL del clip manda (R01 · director §3a: avatar 9:16 = 25 fps) y la
 * duración de la comp = los frames del clip (director §5). Sin remuestreo: cada
 * frame de la comp es un frame del clip, así que el lip-sync es exacto.
 *
 * Z-ORDER (director §3), de atrás a delante:
 *   fondo (degradado plano, SOLO en tomas de gráfico) → AVATAR dentro de
 *   <CamaraVirtual> → motion graphics (overlays fijos) → sonido.
 *
 * EL AVATAR VA LIMPIO. Ni grada, ni tinte, ni capas en `screen` encima: color
 * original y exposición original. El clip está bien expuesto (YMAX 237/255, sin
 * altas luces recortadas), así que no hay nada que corregir — cualquier capa que
 * SUME luz encima es lo que lo hacía parecer sobreexpuesto. Lo único que se
 * superpone es el scrim inferior, y solo mientras hay un sello de texto que
 * necesita fondo para leerse (ver Motion003 · ScrimInf).
 *
 * LAS DOS TOMAS. El avatar y los gráficos a pantalla completa se turnan. Entre
 * tomas de gráfico la continuidad la da el reparto de LUZ: mismo degradado base
 * ("la sala") con el foco en distinta posición ("el ángulo") — Fondo003.tsx. El
 * COLOR de ese foco lo dicta la simbología de lo que se cuenta en la toma
 * (mundo-003 · SIM · TOMAS_GRAFICAS.color), no la marca.
 *
 * LA VOZ va en su propio <Audio> siempre montado: durante las tomas de gráfico el
 * <OffthreadVideo> se desmonta (no se ve y no hay que decodificarlo), pero la
 * narración no puede interrumpirse (R10). Por eso el vídeo va `muted`.
 */

export const Avatar003: React.FC = () => {
  const frame = useCurrentFrame();
  const luz = luzDeToma(frame);
  return (
    <AbsoluteFill style={{ backgroundColor: W.bg }}>
      {luz ? (
        <Fondo cx={luz.cx} cy={luz.cy} color={colorDeToma(frame, luz)} />
      ) : (
        <CamaraVirtual cues={camara003}>
          <OffthreadVideo
            src={staticFile("avatar-003.mp4")}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CamaraVirtual>
      )}
      <Motion003 />
      {/* La VOZ del avatar, siempre montada e intacta: manda sobre todo lo demás. */}
      <Audio src={staticFile("avatar-003.mp4")} />
      <PistaSonido cues={cues003} duckDb={-5} />
    </AbsoluteFill>
  );
};
