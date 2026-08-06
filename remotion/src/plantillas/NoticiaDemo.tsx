import { AbsoluteFill } from "remotion";
import { PistaNoticia } from "./noticias";
import { noticiaDemo } from "./noticia-demo";

/**
 * DEMO del formato noticias — el plan `noticia-demo.ts` montado por su intérprete.
 * Manual: manuales/video-noticias/SKILL.md
 *
 * Es la plantilla a copiar para un proyecto real. La composición completa lleva
 * cuatro capas hermanas, en este orden de z (director-video §3b):
 *
 *   <PistaNoticia tomas={noticiaNNN} />                    ← las tomas y su fondo
 *   <SubtitulosSync segmentos={subtitulosNNN} yPct={78} /> ← la voz, palabra a palabra
 *   <Audio src={staticFile("noticias/NNN-vo.mp3")} />      ← la voz en off
 *   <PistaSonido cues={cuesNNN} duckDb={-4.5} />           ← SFX bajo la voz
 *
 * Aquí solo va la primera: la demo no tiene voz ni subtítulos porque su función
 * es validar el LOOK, no la narración. En un proyecto real las cuatro van juntas
 * y la duración de la comp la fija la voz, no el plan.
 */
export const NoticiaDemo: React.FC = () => (
  <AbsoluteFill>
    <PistaNoticia tomas={noticiaDemo} />
  </AbsoluteFill>
);
