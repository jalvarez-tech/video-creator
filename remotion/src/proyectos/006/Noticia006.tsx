import { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { avisaDelPlan } from "../../motor/avisos";
import { aplana, revisaMontaje } from "../../motor/plan/nucleo";
import { fondosNoticiaDe, MONTADORES_NOTICIA, SelloNoticia } from "../../motor/noticias/montadores";
import { LUXUR } from "../../marcas/luxur";
import type { TomaEditorial } from "../../motor/noticias/dialecto";
import { cues006 } from "./cues-006";
import { noticia006 } from "./noticia-006";

/**
 * 006 · «¿Qué hacer si encuentra grietas en su vivienda tras un temblor?»
 * Plan y fuentes verificadas: proyectos/006/artefactos/01-noticia.md
 *
 * La diferencia con Noticia004 y Noticia005 no se ve desde fuera pero es toda la
 * prueba: aquéllas montan `<PistaNoticia tomas={…} />`, que compila un
 * `TomaNoticia[]` al sustrato. Ésta monta `<PistaGraficos>` DIRECTAMENTE con un
 * `Plan` ya escrito en la gramática del núcleo. El formato no pierde nada por el
 * camino —mismos montadores, mismos fondos, mismo sello— y a cambio el plan puede
 * componer cada toma a mano en vez de conformarse con la maqueta por defecto del
 * tipo de toma.
 *
 * Tres capas hermanas, en el orden de z del director (§3b):
 *   1. <PistaGraficos>  las 24 tomas con su fondo (papel / cine)
 *   2. <Audio>          la voz en off — manda sobre todo lo demás
 *   3. <PistaSonido>    los SFX, por debajo, con ducking de −5 dB
 *
 * La voz va a volumen 1 y los SFX ya vienen calibrados por pico (TARGET_DBFS)
 * más el ducking global: por eso aquí no hay ningún número de mezcla suelto.
 *
 * LA VOZ ES LA DEFINITIVA: locutada con la voz clonada del canal (ElevenLabs,
 * `John Stevans v 0.1`, es-colombian), no una pista guía. Los frames del plan
 * salen de medirla (94,93 s = 2848 f), así que la comp dura lo que dura ella.
 *
 * Sello de marca: «PROPIEDADES LUXUR» (motor/noticias/theme-noticias.ts · MARCA).
 *
 * PENDIENTE: subtítulos sincronizados. El guion ya está segmentado por toma en
 * proyectos/006/guion-vo.txt, así que salen de ahí sin volver a transcribir —
 * pero OJO: ahora hay 24 tomas y 12 líneas de guion, así que la correspondencia
 * ya no es 1:1 y los subtítulos van contra el guion, no contra el plan.
 */
export const Noticia006: React.FC = () => {
  /**
   * VALIDADOR CRUZADO. Cada pista se revisa a sí misma (<PistaGraficos> llama a
   * `revisaPlan`, <PistaSonido> a `revisaSonido`), pero NADIE cruza las dos: los
   * 23 `sonido` que este plan rellena no los lee ningún otro código, así que un
   * id mal escrito o un `targetFrame` que se quedó atrás al recronometrar la voz
   * no dirían nada.
   *
   * Aquí se cruzan: la referencia tiene que existir Y caer dentro de la ventana
   * de su toma. No es teórico — al escribir este plan el riser de `n08b-donde`
   * apuntaba a 1456 y la ventana es [1383,1456): el extremo está excluido y el
   * cue se habría quedado colgando de la toma siguiente sin que nada avisara.
   *
   * El 005 hace lo mismo con `desdeNoticia(…)`, que traduce `TomaNoticia[]`.
   * Aquí el plan YA es del núcleo, así que basta `aplana`.
   *
   * La lista de cámara va vacía y es cierto, no un hueco: el formato noticia no
   * tiene avatar ni <CamaraVirtual> (video-noticias/SKILL.md), así que no hay
   * movimiento que pueda quedar tapado por una toma que cubre.
   *
   * En `useMemo` porque esto se re-renderiza en cada uno de los 2.850 frames y
   * el plan no cambia entre ellos.
   */
  const avisos = useMemo(() => revisaMontaje([aplana(noticia006)], cues006, []), []);
  avisaDelPlan("montaje", avisos);

  return (
    <AbsoluteFill>
      <PistaGraficos
        plan={noticia006}
        montadores={MONTADORES_NOTICIA}
        fondos={fondosNoticiaDe(LUXUR)}
        scrimColor={LUXUR.color.negro}
        encima={(t: TomaEditorial) => <SelloNoticia molde={t.molde} marca={LUXUR} />}
      />
      <Audio src={staticFile("noticias/006-vo.wav")} />
      <PistaSonido cues={cues006} duckDb={-5} />
    </AbsoluteFill>
  );
};
