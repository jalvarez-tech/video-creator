import { AbsoluteFill } from "remotion";
import { SubtitulosEditoriales } from "../SubtitulosEditoriales";
import { subtitulosDemo } from "./subtitulos-demo";
import type { Marca } from "../marca";

/**
 * DEMO de los subtítulos editoriales — el plan `subtitulos-demo.ts` montado por
 * su intérprete, sobre un fondo liso.
 *
 * Valida la TIPOGRAFÍA (las tres letras, la acumulación, las tres posiciones),
 * no la legibilidad sobre metraje: eso depende de cada plano y se decide en la
 * composición del proyecto, con el velo de `<PistaMetraje velos={…}>` medido
 * contra lo que haya debajo (R25). Por eso el fondo es un degradado oscuro de
 * la propia marca y no un clip: la demo tiene que salir igual en un clon sin
 * material.
 *
 * En una pieza real esta capa va entre el metraje y el audio:
 *
 *   <PistaMetraje cortes={metrajeNNN} look={…} velos={…} />
 *   <SubtitulosEditoriales bloques={subtitulosNNN} marca={CANAL} />
 *   <PistaAudio tramos={audioNNN} />
 *
 * La marca llega por PROP (la elige `Root.tsx`): `motor/` no conoce ningún canal.
 */
export const SubtitulosDemo: React.FC<{ marca: Marca }> = ({ marca }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(165deg, ${marca.color.acentoOscuro} 0%, ${marca.color.fondoOscuro} 62%, ${marca.color.negro} 100%)`,
    }}
  >
    <SubtitulosEditoriales bloques={subtitulosDemo} marca={marca} />
  </AbsoluteFill>
);
