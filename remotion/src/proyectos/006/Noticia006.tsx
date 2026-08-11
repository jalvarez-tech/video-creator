import { AbsoluteFill } from "remotion";
import { PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { FONDOS_NOTICIA, MONTADORES_NOTICIA, SelloNoticia } from "../../motor/noticias/montadores";
import { N } from "../../motor/noticias/theme-noticias";
import type { TomaEditorial } from "../../motor/noticias/dialecto";
import { noticia006 } from "./noticia-006";

/**
 * 006 · «¿Qué hacer si encuentra grietas en su vivienda tras un temblor?»
 *
 * La diferencia con Noticia004 y Noticia005 no se ve desde fuera pero es toda la
 * prueba: aquéllas montan `<PistaNoticia tomas={…} />`, que compila un
 * `TomaNoticia[]` al sustrato. Ésta monta `<PistaGraficos>` DIRECTAMENTE con un
 * `Plan` ya escrito en la gramática del núcleo. El formato no pierde nada por el
 * camino —mismos montadores, mismos fondos, mismo sello— y a cambio el plan puede
 * componer cada toma a mano en vez de conformarse con la maqueta por defecto del
 * tipo de toma.
 *
 * PENDIENTE antes de publicar (ver proyectos/006/artefactos/01-noticia.md):
 *   · la LOCUCIÓN: los 1740 f son estimación, no medida. El clip manda.
 *   · sin voz todavía no hay <Audio> ni <PistaSonido>: se añaden como hermanos
 *     de <PistaGraficos>, en ese orden de z, cuando exista el WAV.
 *   · verificar que las cifras del artículo siguen vigentes: es una noticia del
 *     día de un sismo y la cifra de fallecidos es provisional por definición.
 */
export const Noticia006: React.FC = () => (
  <AbsoluteFill>
    <PistaGraficos
      plan={noticia006}
      montadores={MONTADORES_NOTICIA}
      fondos={FONDOS_NOTICIA}
      scrimColor={N.negro}
      encima={(t: TomaEditorial) => <SelloNoticia molde={t.molde} />}
    />
  </AbsoluteFill>
);
