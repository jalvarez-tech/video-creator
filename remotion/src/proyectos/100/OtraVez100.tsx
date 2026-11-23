import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { audio100 } from "./audio-100";
import { cues100 } from "./cues-100";
import { Graficos100 } from "./Graficos100";
import { metraje100 } from "./metraje-100";
import { Papel100 } from "./Papel100";
import { C } from "./piezas-100";

/**
 * Proyecto 100 — «Lo harás otra vez»: un minuto de ALEGRÍA y ESPERANZA para la Fundación MAS (Casa Sobre la Roca, campaña
 * MAS Estrellitas 2026), 16:9, con el material del 097 y la canción «Lo harás otra vez» (Elevation Worship, pista), de
 * corrido. Sin voz en off: la música y lo que dicen las niñas. Plan y timeline: `proyectos/100/artefactos/`.
 *
 * La puerta abierta y un sueño («Ser policía»), los deseos pegados en los golpes, la alegría del pleno (tobogán, lema,
 * «¡Dios es bueno!»), los drones que suben hasta «¡Gracias a Dios por la Navidad!», el atardecer y el papel: cómo ayudar.
 *
 * Z-ORDER (de atrás a delante):
 *   1. PistaMetraje   los planos, mudos (P01-P14), sin velos: la tira es su propia caja
 *   2. Graficos100    overlay FIJO: kicker, tiras, pegatinas, el grito, el clímax con la estrellita
 *   3. Papel100       el CTA compacto, a pantalla completa (f1491-1800)
 *   4. PistaSonido    los SFX, pocos y bajos
 *   5. PistaAudio     las voces de las niñas y la música, en la RAÍZ
 *
 * LA LETRA: Dosis (variable 200-800, OFL), de `remotion/public/fuentes/dosis/`, cargada con `FontFace` y el render espera.
 */

/** El look del 097: neutro, con una viñeta muy suave (el material ya llega igualado, HLG → BT.709). */
const LOOK_100: LookMetraje = {
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
  const [handle] = useState(() => delayRender("Cargando Dosis (100)"));
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

export const OtraVez100: React.FC = () => {
  useDosis();
  return (
    <AbsoluteFill style={{ backgroundColor: C.papel }}>
      <PistaMetraje cortes={metraje100} look={LOOK_100} />
      <Graficos100 />
      <Papel100 />
      <PistaSonido cues={cues100} duckDb={-3} />
      <PistaAudio tramos={audio100} />
    </AbsoluteFill>
  );
};
