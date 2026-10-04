import { Composition } from "remotion";
import { Reel009 } from "./Reel009";
import { DURACION_009 } from "./metraje-009";

/**
 * REGISTRO del proyecto 009. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño y duración): moverlo aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 009 · REEL DE COMIDA ── (src/proyectos/009/Reel009.tsx)
        «Te reto a ver esto sin antojarte»: reel viral para STREET CATS
        (@streetcats.food, Caldas · Antioquia), el negocio que en el 008 salía
        como punto de recolección. Marca nueva: src/marcas/streetcats.ts.

        Es la PRIMERA pieza del repo sin avatar Y sin voz: no hay clip que
        mande el fps ni transcripción que dé las ventanas. Manda el MONTAJE
        (`metraje-009.ts`, 11 cortes sobre 5 planos de b-roll), y de ahí sale
        también la duración — por eso `DURACION_009` se calcula del plan en vez
        de escribirse a mano aquí: alargar un corte reajusta la composición
        sola, sin `calculateMetadata` ni medir ningún medio.
        Artefactos: proyectos/009/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Reel009"
      component={Reel009}
      durationInFrames={DURACION_009}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
