import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { audio097 } from "./audio-097";
import { cues097 } from "./cues-097";
import { Graficos097 } from "./Graficos097";
import { metraje097 } from "./metraje-097";
import { Papel097 } from "./Papel097";
import { C } from "./piezas-097";

/**
 * Proyecto 097 — «Lo más bonito de un regalo», el vídeo 16:9 de la campaña MAS Estrellitas 2026
 * (Fundación MAS · Casa Sobre la Roca). Guion y timeline: `proyectos/097/guion-estrellitas.md` y
 * `proyectos/097/artefactos/`. Material y avisos: `proyectos/097/material/analisis-videos.md`.
 *
 * Una pregunta abre el vídeo («¿Qué es lo más bonito de recibir un regalo?») y la respuesta de una
 * niña lo cierra; en medio, la tarde con ellas: sus deseos, su fe, su alegría. Después, el CTA en
 * el papel del cartel: la meta, los tres pasos y «Miles de corazones unidos por amor.».
 *
 * Z-ORDER (02-layout §5), de atrás a delante:
 *   1. PistaMetraje   los planos, mudos (P01-P27), sin velos: la tira es su propia caja
 *   2. Graficos097    overlay FIJO: tiras, pegatinas, heroes de papel, estrellita, corazones
 *   3. Papel097       las tomas de papel del CTA (P28-P30), a pantalla completa
 *   4. PistaSonido    los SFX, bajo las voces
 *   5. PistaAudio     las voces de las niñas y la música («Yeshua», piano), en la RAÍZ
 *
 * LA LETRA: Dosis (variable 200-800, OFL), servida desde `remotion/public/fuentes/dosis/`. Aún no
 * está empaquetada en el motor; aquí se carga con `FontFace` y el render espera a tenerla.
 */

/** El look: neutro, con una viñeta muy suave. El material ya llega igualado (HLG → BT.709); las niñas no llevan velo cálido encima. */
const LOOK_097: LookMetraje = {
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
  const [handle] = useState(() => delayRender("Cargando Dosis (097)"));
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

export const Estrellitas097: React.FC = () => {
  useDosis();
  return (
    <AbsoluteFill style={{ backgroundColor: C.papel }}>
      <PistaMetraje cortes={metraje097} look={LOOK_097} />
      <Graficos097 />
      <Papel097 />
      <PistaSonido cues={cues097} duckDb={-3} />
      <PistaAudio tramos={audio097} />
    </AbsoluteFill>
  );
};
