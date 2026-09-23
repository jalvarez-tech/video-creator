import { Composition } from "remotion";
import { Noticia005 } from "./Noticia005";
import { noticia005 } from "./noticia-005";
import { duracionPlan } from "../../motor/noticias";
import { framesDePlanYVoz } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 005. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 005 ── (src/proyectos/005/)
        «Firmaste la escritura. Todavía no eres el dueño.»
        Disparador: Ciencuadras · 2026-07-14. 16 tomas, todas gráficas.
        Frames MEDIDOS sobre la voz DEFINITIVA (voz clonada del canal), no una
        guía: la duración sale del plan y del audio, lo mayor de los dos.
        Sello: PROPIEDADES LUXUR. Artefacto: proyectos/005/artefactos/01-noticia.md */}
    <Composition
      id="Noticia005"
      component={Noticia005}
      durationInFrames={duracionPlan(noticia005)}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDePlanYVoz("noticias/005-vo.wav", 30, duracionPlan(noticia005)),
      })}
    />
  </>
);
