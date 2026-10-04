import { Composition } from "remotion";
import { AvatarVertical } from "./AvatarVertical";
import { CamaraDemo } from "./CamaraDemo";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 001. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. Los bloques son los mismos que
 * registraba `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlos aquí
 * no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 001 ── (src/proyectos/001/)
        OJO: `Avatar9x16` y `CamaraDemo` NO son plantillas reutilizables, por
        mucho que el nombre lo sugiera: hardcodean subtitulos-001, cues-001 y
        camara-001. Son el proyecto 001 con dos montajes distintos. Para un
        vídeo nuevo, copia la ESTRUCTURA, no el archivo.
        Clip: 1080x1920 · 25 fps · 43.64 s (1091 frames). */}
    <Composition
      id="Avatar9x16"
      component={AvatarVertical}
      durationInFrames={1091}
      fps={25}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-9x16.mp4", 25, 1091),
      })}
    />
    {/* Mismo clip del 001 dentro de <CamaraVirtual> con su plan de cámara:
        sirve de demo del skill camara-avatar. Manual: manuales/camara-avatar/SKILL.md. */}
    <Composition
      id="CamaraDemo"
      component={CamaraDemo}
      durationInFrames={1091}
      fps={25}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-9x16.mp4", 25, 1091),
      })}
    />
  </>
);
