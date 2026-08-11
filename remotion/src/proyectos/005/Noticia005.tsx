import { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { PistaNoticia } from "../../motor/noticias";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { avisaDelPlan } from "../../motor/avisos";
import { desdeNoticia } from "../../motor/plan/adaptadores";
import { revisaMontaje } from "../../motor/plan/nucleo";
import { cues005 } from "./cues-005";
import { noticia005 } from "./noticia-005";

/**
 * PROYECTO 005 — «Firmaste la escritura. Todavía no eres el dueño.»
 * Plan y fuentes verificadas: proyectos/005/artefactos/01-noticia.md
 *
 * Tres capas hermanas, en el orden de z del director (§3b):
 *   1. <PistaNoticia>  las 16 tomas con su fondo (papel / cine)
 *   2. <Audio>         la voz en off — manda sobre todo lo demás
 *   3. <PistaSonido>   los SFX, por debajo, con ducking de −5 dB
 *
 * La voz va a volumen 1 y los SFX ya vienen calibrados por pico (TARGET_DBFS)
 * más el ducking global: por eso aquí no hay ningún número de mezcla suelto.
 *
 * LA VOZ ES LA DEFINITIVA: locutada con la voz clonada del canal (ElevenLabs,
 * `John Stevans v 0.1`, es-colombian), no una pista guía. Los frames del plan
 * salen de medirla, así que la comp dura lo que dura ella.
 *
 * Sello de marca: «PROPIEDADES LUXUR» (motor/noticias/theme-noticias.ts · MARCA).
 *
 * PENDIENTE: subtítulos sincronizados. El guion ya está segmentado por toma en
 * proyectos/005/guion-vo.txt, así que salen de ahí sin volver a transcribir.
 */
export const Noticia005: React.FC = () => {
  /**
   * VALIDADOR CRUZADO. Cada pista se revisa a sí misma (<PistaNoticia> llama a
   * `revisaNoticia`, <PistaSonido> a `revisaSonido`), pero NADIE cruzaba las dos:
   * los 15 `soundCueId` que este plan rellena no los leía ningún código, así que
   * un id mal escrito o un `targetFrame` que se quedó atrás al recronometrar la
   * voz no decían nada. Aquí se cruzan: la referencia tiene que existir Y caer
   * dentro de la ventana de su toma.
   *
   * La lista de cámara va vacía y es cierto, no un hueco: el formato noticia no
   * tiene avatar ni <CamaraVirtual> (video-noticias/SKILL.md), así que no hay
   * movimiento que pueda quedar tapado por una toma que cubre.
   *
   * En `useMemo` como en <PistaNoticia>: esto se re-renderiza en cada uno de los
   * 1.911 frames y el plan no cambia entre ellos.
   */
  const avisos = useMemo(() => revisaMontaje([desdeNoticia(noticia005)], cues005, []), []);
  avisaDelPlan("montaje", avisos);

  return (
    <AbsoluteFill>
      <PistaNoticia tomas={noticia005} />
      <Audio src={staticFile("noticias/005-vo.wav")} />
      <PistaSonido cues={cues005} duckDb={-5} />
    </AbsoluteFill>
  );
};
