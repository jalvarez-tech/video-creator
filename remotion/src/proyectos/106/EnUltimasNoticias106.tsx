import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { audio106 } from "./audio-106";
import { Graficos106 } from "./Graficos106";
import { metraje106 } from "./metraje-106";
import { Papel106 } from "./Papel106";
import { C } from "./piezas-106";

/**
 * Proyecto 106 — «En últimas noticias» en 16:9: la versión horizontal del vídeo vertical 105 para la Fundación MAS (Casa
 * Sobre la Roca, campaña MAS Estrellitas 2026). Las niñas hacen de reporteras y entrevistadoras: de lo que juegan a lo que
 * creen y vuelta a la alegría. Solo tomas que no salen en 097-104. Sin voz en off: lo que dicen las niñas y «Yeshua» de
 * corrido. Plan y timeline: `proyectos/106/artefactos/`.
 *
 * Z-ORDER (de atrás a delante):
 *   1. PistaMetraje   los planos, mudos (P01-P14), sin velos: la tira es su propia caja
 *   2. Graficos106    overlay FIJO: kickers, tiras y el grito del lema
 *   3. Papel106       el CTA compacto del 100, a pantalla completa (f1446-1755)
 *   4. PistaAudio     las voces de las niñas y la música, en la RAÍZ
 * Sin SFX: en el 105 no los había y la mezcla aprobada es esa.
 *
 * LA LETRA: Dosis (variable 200-800, OFL), de `remotion/public/fuentes/dosis/`, cargada con `FontFace` y el render espera.
 */

/** El look de los 16:9 de MAS (097-100): neutro, con una viñeta muy suave (el material ya llega igualado, HLG → BT.709). */
const LOOK_106: LookMetraje = {
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
  const [handle] = useState(() => delayRender("Cargando Dosis (106)"));
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

export const EnUltimasNoticias106: React.FC = () => {
  useDosis();
  return (
    <AbsoluteFill style={{ backgroundColor: C.papel }}>
      <PistaMetraje cortes={metraje106} look={LOOK_106} />
      <Graficos106 />
      <Papel106 />
      <PistaAudio tramos={audio106} />
    </AbsoluteFill>
  );
};
