import { Composition } from "remotion";
import { DURACION_016, FPS_016 } from "./metraje-016";
import { RD016 } from "./RD016";

/**
 * REGISTRO del proyecto 016. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no se toca.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 016 · REPÚBLICA DOMINICANA 2027 ── (src/proyectos/016/)
        Ejemplo de montaje sobre música con las piezas nuevas del motor: diez
        clips de banco a corte seco en el golpe de «Contact» (Glenn Morrison),
        el titular «República Dominicana 2027», centrado, en subtítulos
        editoriales y la canción como un tramo de PistaAudio. Sin sello.
        El material se repone con `node proyectos/016/normalizar.mjs` y se
        comprueba con `node proyectos/016/revisar-016.mjs`.
        Artefactos: proyectos/016/artefactos/0{1,2,3}-*.md */}
    <Composition id="RD016" component={RD016} durationInFrames={DURACION_016} fps={FPS_016} width={1080} height={1920} />
  </>
);
