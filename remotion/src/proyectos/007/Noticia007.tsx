import { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { avisaDelPlan } from "../../motor/avisos";
import { aplana, revisaMontaje } from "../../motor/plan/nucleo";
import { fondosNoticiaDe, MONTADORES_NOTICIA, SelloNoticia } from "../../motor/noticias/montadores";
import { LUXUR } from "../../marcas/luxur";
import type { TomaEditorial } from "../../motor/noticias/dialecto";
import { cues007 } from "./cues-007";
import { noticia007 } from "./noticia-007";

/**
 * 007 · «¿Qué hacer si un terremoto daña una vivienda que todavía está
 * pagando al banco?» — La República, 2026-08-11.
 * Plan, fuentes con cita textual y límites editoriales:
 * proyectos/007/artefactos/01-noticia.md
 *
 * Segunda pieza nativa (tras el 006): un `Plan` del núcleo montado por
 * <PistaGraficos>, sin pasar por `compilaNoticia`. Tres capas hermanas, en el
 * orden de z del director (§3b):
 *   1. <PistaGraficos>  las 24 tomas con su fondo (papel / cine) y el b-roll
 *   2. <Audio>          la voz en off — manda sobre todo lo demás
 *   3. <PistaSonido>    los SFX, por debajo, con ducking de −5 dB
 *
 * LA VOZ ES LA DEFINITIVA: voz clonada del canal (ElevenLabs, `eleven_v3`,
 * 78,62 s = 2359 f), medida con generar-vo.sh. La comp dura lo mayor de plan
 * y voz (`calculateMetadata` en Root.tsx).
 *
 * Sello de marca: «PROPIEDADES LUXUR» (theme-noticias.ts · MARCA).
 *
 * SUBTÍTULOS: fuera a propósito en esta pasada (como 004/005/006) — los
 * titulares condensan la voz y un carril literal duplicaría texto (SKILL §8).
 * Anotado en el artefacto como pendiente consciente.
 */
export const Noticia007: React.FC = () => {
  /**
   * Validador cruzado plan ↔ cues: cada `sonido` del plan tiene que existir en
   * cues-007.ts Y disparar dentro de la ventana de su toma. La lista de cámara
   * va vacía porque el formato noticia no tiene avatar ni <CamaraVirtual>.
   */
  const avisos = useMemo(() => revisaMontaje([aplana(noticia007)], cues007, []), []);
  avisaDelPlan("montaje", avisos);

  return (
    <AbsoluteFill>
      <PistaGraficos
        plan={noticia007}
        montadores={MONTADORES_NOTICIA}
        fondos={fondosNoticiaDe(LUXUR)}
        scrimColor={LUXUR.color.negro}
        encima={(t: TomaEditorial) => <SelloNoticia molde={t.molde} marca={LUXUR} />}
      />
      <Audio src={staticFile("noticias/007-vo.wav")} />
      <PistaSonido cues={cues007} duckDb={-5} />
    </AbsoluteFill>
  );
};
