/**
 * LA CAPA DE GRÁFICOS DEL 106 sobre el metraje (f0-f1446): las tiras, los kickers y el grito del lema. Overlay FIJO (no se
 * mueve con el plano). Los frames salen de `textos-106.ts`; aquí solo se decide DÓNDE va cada cosa
 * (`proyectos/106/artefactos/02-layout.md`: arriba a la izquierda, el kicker; abajo, la tira; el grito, centrado abajo).
 * Copiado y adaptado del 100 (`Graficos100.tsx`) y del 099 (los kickers con texto), no importado.
 * Un hero a la vez: mientras suena el lema (el grito) no hay tira.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, DOSIS, HeroPapel, Subraya, TextoAcento, TiraPapel, bordeRasgado, fondoPapel, rampa } from "./piezas-106";
import { KICKERS, MAS_GRITO, TIRAS } from "./textos-106";

const Tiras: React.FC = () => (
  <>
    {TIRAS.map((t) => (
      <TiraPapel key={t.id} en={t.en} sale={t.sale} piel={t.piel} semilla={t.id} centrada={t.centrada}>
        <TextoAcento texto={t.texto} marcas={t.marcas ?? []} />
      </TiraPapel>
    ))}
  </>
);

/** Kicker: etiqueta corta de papel, arriba a la izquierda. El primero entra antes del f0 para estar puesto en la miniatura. */
const Kicker: React.FC<{ en: number; sale: number; texto: string; semilla: string }> = ({ en, sale, texto, semilla }) => {
  const frame = useCurrentFrame();
  if (frame < en || frame >= sale) return null;
  const abre = rampa(frame, en, en + 8, 0, 100);
  const op = rampa(frame, sale - 6, sale, 1, 0);
  return (
    <div style={{ position: "absolute", left: 96, top: 64, opacity: op }}>
      <div style={{ clipPath: `inset(-10px ${100 - abre}% -10px -10px)`, transform: "rotate(-1.5deg)" }}>
        <div style={{ ...fondoPapel(), clipPath: bordeRasgado(semilla, 14, 4), padding: "10px 24px 12px" }}>
          <span style={{ ...DOSIS, fontWeight: 700, fontSize: 38, color: C.tinta, letterSpacing: 0.5 }}>{texto}</span>
        </div>
      </div>
    </div>
  );
};

/** HZ09: «¡Misericordia, Amor y Servicio!» con los tres subrayados del lockup (verde, lavanda, rojo), abajo y centrado. */
const Grito: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < MAS_GRITO.en || frame >= MAS_GRITO.sale) return null;
  const palabra = (en: number, texto: string, color: string) => {
    const op = rampa(frame, en, en + 5);
    return (
      <span style={{ position: "relative", display: "inline-block", opacity: op, transform: `translateY(${(1 - op) * 10}px)` }}>
        {texto}
        <Subraya en={en + 2} dur={10} color={color} semilla={texto} grosor={10} abajo={-4} />
      </span>
    );
  };
  return (
    <HeroPapel en={MAS_GRITO.en} sale={MAS_GRITO.sale} semilla="grito-106" px={92} estilo={{ left: 0, right: 0, bottom: 84, display: "flex", justifyContent: "center" }}>
      {palabra(MAS_GRITO.en, "¡Misericordia,", C.verde)} {palabra(MAS_GRITO.amor, "Amor", C.lavanda)} {palabra(MAS_GRITO.servicio, "y Servicio!", C.rojo)}
    </HeroPapel>
  );
};

export const Graficos106: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Tiras />
    {KICKERS.map((k) => (
      <Kicker key={k.id} en={k.en} sale={k.sale} texto={k.texto} semilla={`kicker-${k.id}`} />
    ))}
    <Grito />
  </AbsoluteFill>
);
