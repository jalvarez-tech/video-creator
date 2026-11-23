/**
 * LA CAPA DE GRÁFICOS DEL 100 sobre el metraje: el kicker, las tiras, las pegatinas de los deseos, el grito del lema y el
 * clímax con la estrellita. Overlay FIJO (no se mueve con el plano). Los frames salen de `textos-100.ts`; aquí solo se
 * decide DÓNDE va cada cosa (02-layout §1: arriba, kicker y pegatinas; abajo, la tira; heroes de papel centrados).
 * Las piezas son las del 097, copiadas (`piezas-100.tsx`). Un hero a la vez: cuando hay hero de papel no hay tira.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, DOSIS, Estrellita, HeroPapel, Pegatina, Subraya, TextoAcento, TiraPapel, bordeRasgado, fondoPapel, rampa } from "./piezas-100";
import { DESEOS, GRACIAS, KICKER, MAS_GRITO, TIRAS } from "./textos-100";

const Tiras: React.FC = () => (
  <>
    {TIRAS.map((t) => (
      <TiraPapel key={t.id} en={t.en} sale={t.sale} piel={t.piel} semilla={t.id} centrada={t.centrada}>
        <TextoAcento texto={t.texto} marcas={t.marcas ?? []} />
      </TiraPapel>
    ))}
  </>
);

/** Kicker: etiqueta corta de papel, arriba a la izquierda. Entra antes del f0 para estar puesta en la miniatura. */
const Kicker: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < KICKER.en || frame >= KICKER.sale) return null;
  const abre = rampa(frame, KICKER.en, KICKER.en + 8, 0, 100);
  const op = rampa(frame, KICKER.sale - 6, KICKER.sale, 1, 0);
  return (
    <div style={{ position: "absolute", left: 96, top: 64, opacity: op }}>
      <div style={{ clipPath: `inset(-10px ${100 - abre}% -10px -10px)`, transform: "rotate(-1.5deg)" }}>
        <div style={{ ...fondoPapel(), clipPath: bordeRasgado("kicker-100", 14, 4), padding: "10px 24px 12px" }}>
          <span style={{ ...DOSIS, fontWeight: 700, fontSize: 38, color: C.tinta, letterSpacing: 0.5 }}>{KICKER.texto}</span>
        </div>
      </div>
    </div>
  );
};

/** Las pegatinas de los deseos: se acumulan de izquierda a derecha, cada una en su golpe, y se van juntas al estallar el pleno. */
const Deseos: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < DESEOS.items[0].en || frame >= DESEOS.sale) return null;
  return (
    <div style={{ position: "absolute", left: 96, top: 64, display: "flex", gap: 30, alignItems: "flex-start" }}>
      {DESEOS.items.map((d, i) => (
        <Pegatina key={i} en={d.en} texto={d.texto} giro={d.giro} sale={DESEOS.sale} />
      ))}
    </div>
  );
};

/** HZ08: «¡Misericordia, Amor y Servicio!» con los tres subrayados del lockup (verde, lavanda, rojo), abajo. */
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
    <HeroPapel en={MAS_GRITO.en} sale={MAS_GRITO.sale} semilla="grito-100" px={92} estilo={{ left: 0, right: 0, bottom: 84, display: "flex", justifyContent: "center" }}>
      {palabra(MAS_GRITO.en, "¡Misericordia,", C.verde)} {palabra(MAS_GRITO.amor, "Amor", C.lavanda)} {palabra(MAS_GRITO.servicio, "y Servicio!", C.rojo)}
    </HeroPapel>
  );
};

/** El clímax: hero arriba, centrado; la estrella sube con los brazos hasta arriba a la derecha y se va con el plano. */
const Gracias: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < GRACIAS.en || frame >= GRACIAS.sale + 20) return null;
  const sube = rampa(frame, GRACIAS.ancla, GRACIAS.ancla + 22, 0, 1, EASE.outCubic);
  const x = interpolate(sube, [0, 1], [1380, 1690]);
  const y = interpolate(sube, [0, 1], [250, 120]);
  const tam = interpolate(sube, [0, 1], [70, 120]);
  return (
    <>
      <HeroPapel en={GRACIAS.en} sale={GRACIAS.sale} semilla="gracias-100" px={88} estilo={{ left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
        ¡Gracias a Dios por la Navidad!
      </HeroPapel>
      {frame >= GRACIAS.ancla ? (
        <div style={{ position: "absolute", left: 0, top: 0, opacity: rampa(frame, GRACIAS.sale + 10, GRACIAS.sale + 20, 1, 0) }}>
          <Estrellita en={GRACIAS.ancla} x={x} y={y} tam={tam} />
        </div>
      ) : null}
    </>
  );
};

export const Graficos100: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Tiras />
    <Kicker />
    <Deseos />
    <Grito />
    <Gracias />
  </AbsoluteFill>
);
