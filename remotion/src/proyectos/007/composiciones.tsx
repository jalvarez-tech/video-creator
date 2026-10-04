import { Composition } from "remotion";
import { Noticia007 } from "./Noticia007";
import { noticia007 } from "./noticia-007";

/**
 * REGISTRO del proyecto 007. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño y duración): moverlo aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ⚠️ BLOQUE RECONSTRUIDO (2026-08-13). El registro original se perdió al
        revertir Root.tsx con `git checkout` durante el paso 10; era trabajo sin
        commitear. Los datos son los correctos —comprobados contra
        `noticia-007.ts` y contra la duración que registraba el Studio antes de
        perderse (2417 f · 80,57 s)— pero esta prosa NO es la original.

        Sello: PROPIEDADES LUXUR. Artefacto: proyectos/007/artefactos/01-noticia.md */}
    <Composition
      id="Noticia007"
      component={Noticia007}
      durationInFrames={noticia007.formato.duracion}
      fps={noticia007.formato.fps}
      width={noticia007.formato.ancho}
      height={noticia007.formato.alto}
    />
  </>
);
