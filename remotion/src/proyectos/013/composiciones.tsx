import { Composition } from "remotion";
import { Cobertura013 } from "./Cobertura013";
import { framesDelMedio } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 013. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlo aquí no cambia
 * ningún píxel. En el Studio ahora sale DESPUÉS de Avatar012 (orden de carpeta);
 * en `Root.tsx` iba antes. El orden de la lista no toca el render.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* 013 · cobertura de Propiedades Luxur desde el APEX. Mismo evento que el
        012 y la pieza contraria: aquélla convocaba sin marca, ésta informa
        firmando. `calculateMetadata` lee el clip para que la duración no
        pueda desincronizarse del archivo (383 f medidos). */}
    <Composition
      id="Cobertura013"
      component={Cobertura013}
      durationInFrames={383}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("clip-013.mp4", 30, 383),
      })}
    />
  </>
);
