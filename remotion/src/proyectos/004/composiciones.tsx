import { Composition } from "remotion";
import { Noticia004 } from "./Noticia004";
import { noticia004 } from "./noticia-004";
import { duracionPlan } from "../../motor/noticias";
import { framesDePlanYVoz } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 004. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 004 ── (src/proyectos/004/)
         «¿Por qué la gente se quiere ir al Valle de San Nicolás?»
        El Colombiano · 2026-07-25. 17 tomas, todas gráficas (sin b-roll).
        Frames MEDIDOS con generar-vo.sh sobre la voz GUÍA (say · Paulina), no
        estimados. La duración sale del plan y, si la voz es más larga, de la
        voz — lo resuelve el `calculateMetadata` de justo aquí abajo, con
        `framesDePlanYVoz` (plantillas/duracion.ts). Al relocutar con la voz
        definitiva, vuelve a correr generar-vo.sh y pega la tabla.
        Artefacto: proyectos/004/artefactos/01-noticia.md */}
    <Composition
      id="Noticia004"
      component={Noticia004}
      durationInFrames={duracionPlan(noticia004)}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDePlanYVoz("noticias/004-vo.wav", 30, duracionPlan(noticia004)),
      })}
    />
  </>
);
