import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { audio098 } from "./audio-098";
import { cues098 } from "./cues-098";
import { Graficos098 } from "./Graficos098";
import { metraje098 } from "./metraje-098";
import { Papel098 } from "./Papel098";
import { C } from "./piezas-098";

/**
 * Proyecto 098 — «Tú estás aquí», un minuto 16:9 para la campaña MAS Estrellitas 2026 (Fundación MAS · Casa Sobre la
 * Roca), con «Tu Estás Aquí» (Samy Galí, piano) y lo que dicen las niñas; sin voz en off. Plan y timeline:
 * `proyectos/098/artefactos/`. Material: el del 097 (`proyectos/097/material/analisis-videos.md`).
 *
 * Z-ORDER (02-layout), de atrás a delante:
 *   1. PistaMetraje   los planos, mudos (P01-P11), sin velos: la tira es su propia caja
 *   2. Graficos098    overlay FIJO: el kicker del frame 0, las tiras y la estrella del círculo
 *   3. Papel098       el CTA en papel (P12), a pantalla completa
 *   4. PistaSonido    seis SFX, ninguno bajo una voz
 *   5. PistaAudio     las voces de las niñas y la música, en la RAÍZ
 *
 * Pieza de un evento de una fundación, no de un canal de `marcas/`: el look se pasa entero y no hay sello. La letra
 * (Dosis, OFL) se carga con `FontFace` y el render la espera, como en el 097.
 */

/** El look del 097: neutro, con una viñeta muy suave. El material ya llega igualado (HLG → BT.709). */
const LOOK_098: LookMetraje = {
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
  const [handle] = useState(() => delayRender("Cargando Dosis (098)"));
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

export const TuEstasAqui098: React.FC = () => {
  useDosis();
  return (
    <AbsoluteFill style={{ backgroundColor: C.papel }}>
      <PistaMetraje cortes={metraje098} look={LOOK_098} />
      <Graficos098 />
      <Papel098 />
      <PistaSonido cues={cues098} duckDb={0} />
      <PistaAudio tramos={audio098} />
    </AbsoluteFill>
  );
};
