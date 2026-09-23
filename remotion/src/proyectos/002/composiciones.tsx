import { Composition } from "remotion";
import { Avatar002 } from "./Avatar002";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 002. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 002 ── (src/proyectos/002/)
         avatar_1.mp4 + motion graphics estilo Apple + cámara + sonido.
        Ensamblado por director-video. Clip: 1080×1920 · 25 fps · 883 frames. */}
    <Composition
      id="Avatar002"
      component={Avatar002}
      durationInFrames={883}
      fps={25}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-002.mp4", 25, 883),
      })}
    />
  </>
);
