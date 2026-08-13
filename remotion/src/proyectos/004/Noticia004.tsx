import { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { PistaNoticia } from "../../motor/noticias";
import { LUXUR } from "../../marcas/luxur";
import { noticia004 } from "./noticia-004";
import { cues004 } from "./cues-004";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { avisaDelPlan } from "../../motor/avisos";
import { desdeNoticia } from "../../motor/plan/adaptadores";
import { revisaMontaje } from "../../motor/plan/nucleo";

/**
 * PROYECTO 004 — Valle de San Nicolás (El Colombiano, 2026-07-25).
 * Plan y decisiones: proyectos/004/artefactos/01-noticia.md
 *
 * Tres capas hermanas, en el orden de z del director (§3b):
 *   1. <PistaNoticia>  las 17 tomas con su fondo (papel / cine)
 *   2. <Audio>         la voz en off — manda sobre todo lo demás
 *   3. <PistaSonido>   los SFX, por debajo, con ducking de −5 dB
 *
 * La voz va a volumen 1 y los SFX ya vienen calibrados por pico (TARGET_DBFS)
 * más el ducking global: por eso aquí no hay ningún número de mezcla suelto.
 *
 * ⚠️ La pista de voz es una GUÍA generada con la voz de sistema (Paulina, es_MX,
 * `--motor say`). El motor de voz de este formato es ElevenLabs, no HeyGen
 * (HeyGen solo genera vídeo de avatar; ver video-noticias/SKILL.md §8). Para
 * publicar, relocuta con tu voz clonada y vuelve a correr `generar-vo.sh`, que
 * regenera `public/noticias/004-vo.wav` y recalcula los frames del plan:
 *   python3 manuales/edicion-video/scripts/elevenlabs.py guion \
 *           proyectos/004/guion-vo.txt --salida proyectos/004/vo/partes
 *   bash manuales/video-noticias/scripts/generar-vo.sh proyectos/004/guion-vo.txt \
 *        --motor elevenlabs --partes proyectos/004/vo/partes --fps 30
 *
 * PENDIENTE: subtítulos sincronizados (`subtitulos-004.ts` + <SubtitulosSync
 * yPct={78}>). El guion ya está segmentado por toma en proyectos/004/guion-vo.txt.
 */
export const Noticia004: React.FC = () => {
  /**
   * VALIDADOR CRUZADO — ver el porqué largo en Noticia005.tsx. Aquí importa más
   * todavía: la voz de este proyecto es una GUÍA y está previsto relocutarla, y
   * relocutar mueve TODOS los frames. El día que se corra `generar-vo.sh`, este
   * aviso es lo que dirá qué cues se quedaron en el sitio de la voz vieja, en vez
   * de descubrirlo viendo el render y oyendo un papel que suena a destiempo.
   *
   * Cámara vacía: el formato noticia no lleva avatar ni <CamaraVirtual>.
   * `useMemo` porque esto se re-renderiza en cada frame y el plan no cambia.
   */
  const avisos = useMemo(() => revisaMontaje([desdeNoticia(noticia004)], cues004, []), []);
  avisaDelPlan("montaje", avisos);

  return (
    <AbsoluteFill>
      <PistaNoticia tomas={noticia004} marca={LUXUR} />
      <Audio src={staticFile("noticias/004-vo.wav")} />
      <PistaSonido cues={cues004} duckDb={-5} />
    </AbsoluteFill>
  );
};
