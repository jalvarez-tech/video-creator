import { Composition } from "remotion";
import { Noticia006 } from "./Noticia006";
import { noticia006 } from "./noticia-006";
import { framesDePlanYVoz } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 006. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* Noticia006 — la PRIMERA pieza escrita nativamente en la gramática nueva:
        un `Plan` del núcleo montado por <PistaGraficos>, sin pasar por
        `compilaNoticia`. El 004 y el 005 siguen entrando por `TomaNoticia[]`.

        YA TIENE `calculateMetadata`, y eso es lo que cambió: hasta ahora la
        duración salía del plan y era una estimación declarada. Hay locución
        (voz clonada del canal, 94,93 s = 2848 f), las 24 ventanas están
        recronometradas sobre ella y la comp dura lo MAYOR de plan y voz — el
        clip manda (aprendizaje del 002). Los 2850 f del plan cubren los 2848
        del WAV con dos frames de cola. */}
    <Composition
      id="Noticia006"
      component={Noticia006}
      durationInFrames={noticia006.formato.duracion}
      fps={noticia006.formato.fps}
      width={noticia006.formato.ancho}
      height={noticia006.formato.alto}
      calculateMetadata={async () => ({
        durationInFrames: await framesDePlanYVoz(
          "noticias/006-vo.wav",
          noticia006.formato.fps,
          noticia006.formato.duracion
        ),
      })}
    />
  </>
);
