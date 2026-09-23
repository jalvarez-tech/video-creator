import { Composition } from "remotion";
import { Boda011 } from "./Boda011";
import { DURACION_011 } from "./metraje-011";

/**
 * REGISTRO del proyecto 011. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño y duración): moverlo aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 011 · BODA ── (src/proyectos/011/)
        Montaje de 2 minutos con TODO el material de la carpeta Boda (27
        vídeos de iPhone en HDR + 1 de mensajería + 1 foto): el primer minuto,
        la boda con «Turning Page»; el segundo, la rumba con «El Preso». Sin
        voz, sin texto y sin marca. El metraje se repone con
        `bash proyectos/011/normalizar.sh` y se comprueba con
        `node proyectos/011/revisar-011.mjs`.
        Artefactos: proyectos/011/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Boda011"
      component={Boda011}
      durationInFrames={DURACION_011}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
