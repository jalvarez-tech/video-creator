import { Composition } from "remotion";
import { Avatar014 } from "./Avatar014";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 014. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 014 · AGENTE DE IA ── (src/proyectos/014/)
        «Publica en minutos»: el cliente a cámara presentando su agente de IA
        para creadores (subes el vídeo → subtítulos, imágenes de banco y
        publicación en minutos). Encargo literal: textos + un SFX por cada
        entrada de texto. Sin marca (mensaje personal, declarado), sin
        subtítulos (todo el texto en la banda inferior, R14) y sin cámara
        virtual (selfie de mano). Clip de iPhone en HLG con rotación en la
        matriz (R19 + R21): `bash proyectos/014/normalizar.sh` lo repone a
        1080×1920 nativos · 30 fps · 1471 f, y `calculateMetadata` lee el
        archivo para que la duración no pueda desincronizarse de él.
        Artefactos: proyectos/014/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Avatar014"
      component={Avatar014}
      durationInFrames={1471}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-014.mp4", 30, 1471),
      })}
    />
  </>
);
