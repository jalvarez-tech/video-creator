import { Composition } from "remotion";
import { Apex015 } from "./Apex015";
import { DURACION_015 } from "./metraje-015";

/**
 * REGISTRO del proyecto 015. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño y duración): moverlo aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 015 · LO QUE APRENDÍ EN APEX ── (src/proyectos/015/)
        Isabella Cadavid (la presentadora del 013) cuenta lo que se lleva del
        primer día de APEX en nueve tomas de iPhone, una frase por toma. Es un
        MONTAJE (director §3i): silencios recortados a 0,5 s entre frases,
        disolvencia de opacidad entre toma y toma, la voz en su propia capa
        con una ganancia por toma, textos en la banda inferior con un SFX por
        entrada y la cuenta @propiedadesluxur al final. Con marca Luxur y el
        verde de APEX. La duración sale del plan (`DURACION_015`); el material
        se repone con `bash proyectos/015/normalizar.sh` y se comprueba con
        `node proyectos/015/revisar-015.mjs`.
        Artefactos: proyectos/015/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Apex015"
      component={Apex015}
      durationInFrames={DURACION_015}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
