/**
 * LA CAPA DE GRÁFICOS DEL 097 sobre el metraje (P01-P27): tiras, pegatinas, heroes de papel,
 * la estrellita y los corazones. Overlay FIJO (no se mueve con el plano). Los números salen de
 * `textos-097.ts`; aquí solo se decide DÓNDE va cada cosa (02-layout §1: arriba, pegatinas y
 * kicker; abajo, la tira; en el centro, solo los heroes de papel y en el hueco del plano).
 *
 * Un hero a la vez: cuando hay hero de papel (HZ17, las cualidades, el grito, el clímax, el
 * puente) no hay tira.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import {
  C,
  DOSIS,
  Corazon,
  Estrellita,
  EstrellaSvg,
  HeroPapel,
  Pegatina,
  Subraya,
  TextoAcento,
  TiraPapel,
  bordeRasgado,
  fondoPapel,
  rampa,
  useMuelle,
} from "./piezas-097";
import { CORAZONES, CRISTO, CUALIDADES, DESEOS, GRACIAS, KICKERS, MAS_GRITO, PUENTE, TIRAS } from "./textos-097";

const Tiras: React.FC = () => (
  <>
    {TIRAS.map((t) => (
      <TiraPapel key={t.id} en={t.en} sale={t.sale} piel={t.piel} semilla={t.id} centrada={t.centrada}>
        <TextoAcento texto={t.texto} marcas={t.marcas ?? []} />
      </TiraPapel>
    ))}
  </>
);

/** Kicker: etiqueta corta de papel, arriba a la izquierda. */
const Kicker: React.FC<{ en: number; sale: number; texto: string; semilla: string }> = ({ en, sale, texto, semilla }) => {
  const frame = useCurrentFrame();
  if (frame < en || frame >= sale) return null;
  const abre = rampa(frame, en, en + 8, 0, 100);
  const op = rampa(frame, sale - 6, sale, 1, 0);
  return (
    <div style={{ position: "absolute", left: 96, top: 64, opacity: op }}>
      <div style={{ clipPath: `inset(-10px ${100 - abre}% -10px -10px)`, transform: "rotate(-1.5deg)" }}>
        <div style={{ ...fondoPapel(), clipPath: bordeRasgado(semilla, 14, 4), padding: "10px 24px 12px" }}>
          <span style={{ ...DOSIS, fontWeight: 600, fontSize: 36, color: C.tinta, letterSpacing: 0.5 }}>{texto}</span>
        </div>
      </div>
    </div>
  );
};

const Deseos: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < DESEOS.items[0].en || frame >= DESEOS.sale) return null;
  return (
    <div style={{ position: "absolute", left: 96, top: 64, display: "flex", gap: 30, alignItems: "flex-start" }}>
      {DESEOS.items.map((d, i) => (
        <Pegatina key={i} en={d.en} texto={d.texto} giro={d.giro} apaga={DESEOS.apaga} sale={DESEOS.sale} />
      ))}
    </div>
  );
};

/** HZ17: «a Cristo en mi vida» (Cristo en azul y rodeado) y, después, «y una Biblia muy grande» con «grande» que crece. */
const Cristo: React.FC = () => {
  const frame = useCurrentFrame();
  const l2 = useMuelleSeguro(CRISTO.linea2);
  if (frame < CRISTO.en || frame >= CRISTO.sale) return null;
  return (
    <HeroPapel
      en={CRISTO.en}
      sale={CRISTO.sale}
      semilla="cristo"
      px={96}
      estilo={{ left: 0, right: 0, top: 70, display: "flex", justifyContent: "center" }}
      extra={<Estrellita en={CRISTO.ancla} x={10} y={-6} tam={88} />}
    >
      <div>
        a <TextoAcento texto="*Cristo*" colorAcento={C.azul} marcas={[{ tipo: "ovalo", en: CRISTO.ovalo, dur: 16 }]} /> en mi vida
      </div>
      {frame >= CRISTO.linea2 ? (
        <div style={{ fontSize: 70, fontWeight: 800, marginTop: 6, opacity: Math.min(1, l2 * 1.5), transform: `translateY(${(1 - l2) * 14}px)` }}>
          y una Biblia muy <TextoAcento texto="*grande*" escalaAcento={{ en: CRISTO.grande, dur: 12, hasta: 1.3 }} />
        </div>
      ) : null}
    </HeroPapel>
  );
};

/** `useMuelle` envuelto para poder llamarlo antes del frame de entrada (devuelve 0 hasta entonces). */
const useMuelleSeguro = (en: number) => useMuelle(en, { damping: 15, mass: 0.7 });

/** Las cinco cualidades: la palabra activa grande, a la derecha; al llegar la siguiente pasa a la columna. */
const Cualidades: React.FC = () => {
  const frame = useCurrentFrame();
  const P = CUALIDADES.palabras;
  if (frame < P[0].en || frame >= CUALIDADES.sale) return null;
  const fuera = rampa(frame, CUALIDADES.sale - 8, CUALIDADES.sale, 1, 0);
  return (
    <AbsoluteFill style={{ opacity: fuera, pointerEvents: "none" }}>
      {P.map((p, i) => (
        <Cualidad key={p.texto} i={i} texto={p.texto} en={p.en} siguiente={P[i + 1]?.en} />
      ))}
    </AbsoluteFill>
  );
};

const Cualidad: React.FC<{ i: number; texto: string; en: number; siguiente?: number }> = ({ i, texto, en, siguiente }) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 14, mass: 0.6, stiffness: 160 });
  if (frame < en) return null;
  // grande: centrado en (1300, 760); columna: a la derecha, de arriba abajo.
  const aColumna = siguiente !== undefined ? rampa(frame, siguiente, siguiente + 8, 0, 1, EASE.inOutCubic) : 0;
  const xG = 1300;
  const yG = 760;
  const xC = 1824;
  const yC = 96 + i * 78;
  const x = interpolate(aColumna, [0, 1], [xG, xC]);
  const y = interpolate(aColumna, [0, 1], [yG, yC]);
  const px = interpolate(aColumna, [0, 1], [118, 46]);
  const ancla = interpolate(aColumna, [0, 1], [-50, -100]); // de centrada a pegada a la derecha
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${ancla}%, -50%) rotate(${i % 2 ? 1.5 : -1.5}deg) scale(${interpolate(m, [0, 1], [0.6, 1]).toFixed(4)})`,
        opacity: Math.min(1, m * 1.5),
      }}
    >
      <div style={{ ...fondoPapel(), clipPath: bordeRasgado(`cual-${i}`, 12, 4 + 3 * (1 - aColumna)), padding: `${px * 0.16}px ${px * 0.4}px ${px * 0.22}px` }}>
        <span style={{ ...DOSIS, fontWeight: 800, fontSize: px, color: C.tinta, whiteSpace: "nowrap" }}>{texto}</span>
      </div>
    </div>
  );
};

/** HZ08: «¡Misericordia, Amor y Servicio!» con los tres subrayados del lockup (verde, lavanda, rojo). */
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
    <HeroPapel en={MAS_GRITO.en} sale={MAS_GRITO.sale} semilla="grito" px={92} estilo={{ left: 0, right: 0, bottom: 84, display: "flex", justifyContent: "center" }}>
      {palabra(MAS_GRITO.en, "¡Misericordia,", C.verde)} {palabra(MAS_GRITO.amor, "Amor", C.lavanda)} {palabra(MAS_GRITO.servicio, "y Servicio!", C.rojo)}
    </HeroPapel>
  );
};

/** El clímax: hero arriba, centrado; la estrella sube con los brazos hasta arriba a la derecha. */
const Gracias: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < GRACIAS.en || frame >= GRACIAS.sale + 30) return null;
  const sube = rampa(frame, GRACIAS.ancla, GRACIAS.ancla + 22, 0, 1, EASE.outCubic);
  const x = interpolate(sube, [0, 1], [1380, 1690]);
  const y = interpolate(sube, [0, 1], [250, 120]);
  const tam = interpolate(sube, [0, 1], [70, 120]);
  return (
    <>
      <HeroPapel en={GRACIAS.en} sale={GRACIAS.sale} semilla="gracias" px={88} estilo={{ left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
        ¡Gracias a Dios por la Navidad!
      </HeroPapel>
      {frame >= GRACIAS.ancla ? (
        <div style={{ position: "absolute", left: 0, top: 0, opacity: rampa(frame, GRACIAS.sale + 20, GRACIAS.sale + 30, 1, 0) }}>
          <Estrellita en={GRACIAS.ancla} x={x} y={y} tam={tam} />
        </div>
      ) : null}
    </>
  );
};

/** El puente (DR07): el hero abajo y la estrella que baja del cielo y aterriza en el centro vacío del círculo. */
export const CENTRO_CIRCULO = { x: 960, y: 530 } as const;
const Puente: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < PUENTE.en) return null;
  const baja = rampa(frame, PUENTE.estrella, PUENTE.aterriza, 0, 1, EASE.inOutCubic);
  const y = interpolate(baja, [0, 1], [-120, CENTRO_CIRCULO.y]);
  const tam = interpolate(baja, [0, 1], [70, 150]);
  const giro = interpolate(baja, [0, 1], [-40, 0]);
  return (
    <>
      <HeroPapel en={PUENTE.en} sale={PUENTE.sale} semilla="puente" px={76} estilo={{ left: 0, right: 0, bottom: 80, display: "flex", justifyContent: "center" }}>
        Esta Navidad, esa persona puedes ser <span style={{ color: C.azul }}>tú</span>.
      </HeroPapel>
      {frame >= PUENTE.estrella ? (
        <div style={{ position: "absolute", left: CENTRO_CIRCULO.x - tam / 2, top: y - tam / 2, width: tam, height: tam }}>
          <EstrellaSvg tam={tam} giro={giro} />
          {frame >= PUENTE.aterriza ? <EstrellaAterriza en={PUENTE.aterriza} tam={tam} /> : null}
        </div>
      ) : null}
    </>
  );
};

const EstrellaAterriza: React.FC<{ en: number; tam: number }> = ({ en, tam }) => {
  const frame = useCurrentFrame();
  const anillo = rampa(frame, en, en + 20);
  if (anillo >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: tam / 2 - tam * (0.6 + anillo),
        top: tam / 2 - tam * (0.6 + anillo),
        width: tam * 2 * (0.6 + anillo),
        height: tam * 2 * (0.6 + anillo),
        borderRadius: "50%",
        border: `6px solid ${C.blanco}`,
        opacity: 1 - anillo,
      }}
    />
  );
};

export const Graficos097: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Tiras />
    {KICKERS.map((k) => (
      <Kicker key={k.id} en={k.en} sale={k.sale} texto={k.texto} semilla={k.id} />
    ))}
    <Deseos />
    <Cristo />
    <Cualidades />
    <Grito />
    {CORAZONES.map((c, i) => (
      <Corazon key={i} en={c.en} x={c.x} y={c.y} tam={78} dura={c.dura} />
    ))}
    <Gracias />
    <Puente />
  </AbsoluteFill>
);
