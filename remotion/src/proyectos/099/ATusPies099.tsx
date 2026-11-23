import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { audio099 } from "./audio-099";
import { cues099 } from "./cues-099";
import { Graficos099 } from "./Graficos099";
import { metraje099 } from "./metraje-099";
import { Papel099 } from "./Papel099";
import { C } from "./piezas-099";

/**
 * Proyecto 099 — «A tus pies», 1 minuto 16:9 para la Fundación MAS (Casa Sobre la Roca, MAS Estrellitas 2026), con el
 * material de la tarde del 2026-11-20 y la canción «A Tus Pies». Sin voz en off: solo la música y lo que dicen las niñas.
 * Plan y timeline: `proyectos/099/artefactos/`. Material y avisos: `proyectos/097/material/analisis-videos.md`.
 *
 * Ángulo: adoración y gratitud. «¿Cuál es la cualidad más bonita de Dios?», la letanía de ocho palabras, «a Cristo en mi
 * vida», el lema, «¡Dios es bueno!», «¡Gracias a Dios por la Navidad!», el círculo y el CTA compacto en papel.
 *
 * Z-ORDER (02-layout), de atrás a delante:
 *   1. PistaMetraje   los planos, mudos, sin velos: la tira es su propia caja
 *   2. Graficos099    overlay FIJO: tiras, kicker, cualidades, heroes de papel, estrellas, corazones
 *   3. Papel099       el CTA en papel, a pantalla completa desde f1482
 *   4. PistaSonido    los SFX, bajo las voces
 *   5. PistaAudio     las voces de las niñas y «A Tus Pies», en la RAÍZ
 *
 * LA LETRA: Dosis (variable 200-800, OFL), servida desde `remotion/public/fuentes/dosis/` y cargada con `FontFace`: el
 * render espera a tenerla (como en el 097).
 */

/** El look del 097: neutro, con una viñeta muy suave. El material ya llega igualado (HLG → BT.709). */
const LOOK_099: LookMetraje = {
  saturacion: 1.04,
  contraste: 1.02,
  calido: 0.04,
  colorCalido: "#FFB347",
  grano: 0,
  vineta: 0.14,
  vinetaDesde: 62,
  negro: "#000000",
};

const useDosis = () => {
  const [handle] = useState(() => delayRender("Cargando Dosis (099)"));
  useEffect(() => {
    if (typeof FontFace === "undefined") {
      continueRender(handle);
      return;
    }
    const cara = new FontFace("Dosis", `url(${staticFile("fuentes/dosis/Dosis-Variable.ttf")}) format("truetype")`, {
      weight: "200 800",
      style: "normal",
    });
    cara
      .load()
      .then((f) => {
        document.fonts.add(f);
        continueRender(handle);
      })
      .catch((e) => {
        console.error("Dosis no cargó", e);
        continueRender(handle);
      });
  }, [handle]);
};

export const ATusPies099: React.FC = () => {
  useDosis();
  return (
    <AbsoluteFill style={{ backgroundColor: C.papel }}>
      <PistaMetraje cortes={metraje099} look={LOOK_099} />
      <Graficos099 />
      <Papel099 />
      <PistaSonido cues={cues099} duckDb={-3} />
      <PistaAudio tramos={audio099} />
    </AbsoluteFill>
  );
};
