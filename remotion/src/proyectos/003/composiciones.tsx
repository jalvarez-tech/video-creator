// La sans geométrica del STYLE GUIDE (FuturaGeo, dos `@font-face` con `local()`)
// vivía en `src/index.css`, el CSS global del motor; es del 003 y va con el 003.
// `package.json` declara `sideEffects: ["*.css"]`, así que webpack no la poda,
// y style-loader la inyecta al evaluar este registro, antes de renderizar.
import "./fuentes-003.css";
import { Composition } from "remotion";
import { Avatar003 } from "./Avatar003";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 003. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 003 ── (src/proyectos/003/)
         avatar_2.mp4 + mundo líquido ámbar (STYLE GUIDE del cliente).
        Reglas del sistema: el fps ORIGINAL del clip manda (R01 · avatar 9:16 =
        25 fps) y la comp dura lo que dura el clip (director §5).
        Clip: 1080×1920 · 25 fps · 1153 f (46.12 s). */}
    <Composition
      id="Avatar003"
      component={Avatar003}
      durationInFrames={1153}
      fps={25}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-003.mp4", 25, 1153),
      })}
    />
  </>
);
