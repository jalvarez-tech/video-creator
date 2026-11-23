import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import { PistaMetraje } from "../../motor/metraje";
import type { LookMetraje } from "../../motor/metraje";
import { PistaAudio } from "../../motor/sound/PistaAudio";
import type { TramoAudio } from "../../motor/sound/tramos";
import { C } from "../097/piezas-097";
import type { Historia } from "./historia";
import { CierreV, KickerV, TiraV } from "./piezas-101";

/**
 * UNA HISTORIA VERTICAL DE MAS (101-104): el componente que comparten las cuatro; cada una le pasa sus datos
 * (`src/proyectos/NNN/historia-NNN.ts`) y su audio ya calculado. Plan de la serie: `proyectos/101/artefactos/`.
 *
 * Z-ORDER (02-layout §1), de atrás a delante:
 *   1. PistaMetraje   los planos, mudos, a pantalla completa (9:16 nativo o la franja vertical del 4K)
 *   2. KickerV        «MAS Estrellitas 2026», arriba, hasta el cierre
 *   3. TiraV arriba   la pregunta (el gancho de f0)
 *   4. TiraV abajo    lo que dicen, trozo a trozo
 *   5. CierreV        el papel del final, a pantalla completa
 *   6. PistaAudio     las voces de las niñas y la música, en la RAÍZ
 *
 * Pieza de un evento de una fundación, no de un canal de `marcas/`: el look se pasa entero y no hay sello. Dosis (OFL)
 * se carga con `FontFace` y el render la espera, como en el 097.
 */

/** El look del 097/098: neutro, con una viñeta muy suave. El material ya llega igualado (HLG → BT.709). */
const LOOK: LookMetraje = {
  saturacion: 1.04,
  contraste: 1.02,
  calido: 0.04,
  colorCalido: "#FFB347",
  grano: 0,
  vineta: 0.14,
  vinetaDesde: 62,
  negro: "#000000",
};

const useDosis = (n: string) => {
  const [handle] = useState(() => delayRender(`Cargando Dosis (${n})`));
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

export const HistoriaMAS: React.FC<{ h: Historia; audio: TramoAudio[] }> = ({ h, audio }) => {
  useDosis(h.numero);
  return (
    <AbsoluteFill style={{ backgroundColor: C.tinta }}>
      <PistaMetraje cortes={h.cortes} look={LOOK} />
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <KickerV sale={h.cierre} />
        {h.arriba.map((t) => (
          <TiraV key={t.id} t={t} zona="arriba" px={64} peso={700} />
        ))}
        {h.abajo.map((t) => (
          <TiraV key={t.id} t={t} zona="abajo" px={60} />
        ))}
      </AbsoluteFill>
      <CierreV en={h.cierre} />
      <PistaAudio tramos={audio} />
    </AbsoluteFill>
  );
};
