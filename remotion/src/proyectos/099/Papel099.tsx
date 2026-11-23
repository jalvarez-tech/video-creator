/**
 * EL CTA EN PAPEL DEL 099 (f1482-f1815, 11,1 s): la versión COMPACTA del CTA del 097 (`Papel097.tsx`, copiado y
 * recortado, no importado). En el 097 son tres tomas (la meta, los pasos, el cierre con la foto); aquí es UNA hoja que
 * se va llenando y se queda quieta para leerse: a la izquierda el porqué («Este año, más de 3.000 +1 regalos») y quién
 * (la firma CSR | MAS), a la derecha el cómo (los tres pasos, la cuenta y el celular), abajo las fechas.
 *
 * Los textos de los pasos son las palabras del usuario en el 097 (2026-11-22); la cuenta, la de `CUENTA` (la puerta la
 * compara dígito a dígito). La estrella que aterrizó en el círculo de DR07 es la misma que se convierte en la estrella 1.
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, Camino, DOSIS, Destello, EstrellaSvg, Estrellita, MONTSERRAT, PAPEL_URL, rampa, useMuelle } from "./piezas-099";
import { CENTRO_CIRCULO } from "./Graficos099";
import { CUENTA, HOJA, PASOS, RESUMEN } from "./textos-099";

const fmt = (n: number) => Math.round(n).toLocaleString("es-CO").replace(/,/g, ".");

/** El papel a pantalla completa, con una deriva lentísima (±4 px en 10 s): nada congelado. */
const Hoja: React.FC = () => {
  const frame = useCurrentFrame();
  const entra = rampa(frame, HOJA.en, HOJA.en + 10, 1920, 0, EASE.outCubic);
  const dx = Math.sin(frame / 95) * 4;
  const dy = Math.cos(frame / 120) * 3;
  return (
    <AbsoluteFill style={{ transform: `translateX(${entra}px)`, overflow: "hidden", backgroundColor: C.papel }}>
      <Img src={PAPEL_URL} style={{ position: "absolute", left: -144 + dx, top: -81 + dy, width: 2208, height: 1242 }} />
    </AbsoluteFill>
  );
};

const PASO_X = 860;
const PASO_Y = [165, 405, 740] as const;
const PASO_TAM = 150;

/** La estrella: del centro del círculo de DR07 a ser la estrella 1 (llega cuando entra el paso 1). */
const EstrellaGuia: React.FC = () => {
  const frame = useCurrentFrame();
  const va = rampa(frame, HOJA.en, PASOS.pasos[0].en, 0, 1, EASE.inOutCubic);
  const numero = rampa(frame, PASOS.pasos[0].en, PASOS.pasos[0].en + 8);
  const x = interpolate(va, [0, 1], [CENTRO_CIRCULO.x, PASO_X]);
  const y = interpolate(va, [0, 1], [CENTRO_CIRCULO.y, PASO_Y[0]]);
  const tam = interpolate(va, [0, 1], [150, PASO_TAM]);
  const giro = Math.sin(frame / 40) * 3 * (1 - va);
  return (
    <div style={{ position: "absolute", left: x - tam / 2, top: y - tam / 2 }}>
      <EstrellaSvg tam={tam} giro={giro} />
      {numero > 0 ? (
        <div style={{ position: "absolute", inset: 0, opacity: numero }}>
          <EstrellaSvg tam={tam} giro={giro} numero={1} />
        </div>
      ) : null}
    </div>
  );
};

/** El porqué, arriba a la izquierda: «Este año, más de 3.000 +1 regalos», con la cifra que cuenta y el «+1» que se pega. */
const Resumen: React.FC = () => {
  const frame = useCurrentFrame();
  const mas = useMuelle(RESUMEN.mas1, { damping: 12, mass: 0.6 });
  if (frame < RESUMEN.en) return null;
  const op = rampa(frame, RESUMEN.en, RESUMEN.en + 10);
  const n = interpolate(frame, [RESUMEN.cuenta[0], RESUMEN.cuenta[1]], [0, 3000], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  return (
    <div style={{ position: "absolute", left: 96, top: 150, opacity: op, transform: `translateY(${(1 - op) * 10}px)` }}>
      <div style={{ ...DOSIS, fontWeight: 600, fontSize: 40, color: C.tinta }}>Este año, más de</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 120, lineHeight: 1, color: C.azul, letterSpacing: -3, fontVariantNumeric: "tabular-nums" }}>{fmt(n)}</div>
        {frame >= RESUMEN.mas1 ? (
          <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 63, lineHeight: 1, color: C.azul, transform: `scale(${mas.toFixed(4)}) rotate(${(1 - mas) * -12}deg)` }}>+1</div>
        ) : null}
      </div>
      <div style={{ ...DOSIS, fontWeight: 800, fontSize: 54, color: C.tinta }}>regalos</div>
    </div>
  );
};

const Paso: React.FC<{ i: number; en: number; titulo: string; linea: string; destaca?: boolean }> = ({ i, en, titulo, linea, destaca }) => {
  const frame = useCurrentFrame();
  const t = useMuelle(en + 3, { damping: 16, mass: 0.7 });
  if (frame < en) return null;
  const l = rampa(frame, en + 6, en + 16);
  return (
    <div>
      {i > 0 ? <Estrellita en={en} x={PASO_X} y={PASO_Y[i]} tam={PASO_TAM} numero={i + 1} /> : null}
      <div style={{ position: "absolute", left: PASO_X + 110, top: PASO_Y[i] - 70 }}>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 64, color: C.tinta, opacity: Math.min(1, t * 1.4), transform: `translateX(${(1 - t) * 24}px)` }}>{titulo}</div>
        <div style={{ ...MONTSERRAT, fontWeight: destaca ? 700 : 500, fontSize: destaca ? 40 : 34, color: C.tinta, opacity: l, maxWidth: 860, lineHeight: 1.25, fontVariantNumeric: "tabular-nums" }}>
          {linea}
        </div>
      </div>
    </div>
  );
};

/** La cuenta: tarjeta de papel blanco con el símbolo de Bancolombia y los datos, grandes. Sin giro ni rebote: es un dato que se copia. */
const TarjetaCuenta: React.FC<{ en: number }> = ({ en }) => {
  const frame = useCurrentFrame();
  if (frame < en) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: PASO_X + 110,
        top: PASO_Y[1] + 74,
        opacity: rampa(frame, en, en + 10),
        backgroundColor: C.blanco,
        padding: "16px 30px 16px 22px",
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Img src={staticFile("mas-097/logo-bancolombia.svg")} style={{ width: 86, height: 86 }} />
      <div style={{ ...MONTSERRAT, color: C.tinta, fontVariantNumeric: "tabular-nums" }}>
        <div style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.2 }}>
          {CUENTA.banco} · {CUENTA.tipo}
        </div>
        <div style={{ fontWeight: 800, fontSize: 50, lineHeight: 1.1, letterSpacing: 1 }}>{CUENTA.numero}</div>
        <div style={{ fontWeight: 600, fontSize: 28, lineHeight: 1.2 }}>NIT: {CUENTA.nit}</div>
      </div>
    </div>
  );
};

const Pasos: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < PASOS.pasos[0].en - 10) return null;
  const tramo1 = PASO_Y[1] - PASO_Y[0] - 120;
  const tramo2 = PASO_Y[2] - PASO_Y[1] - 120;
  return (
    <AbsoluteFill>
      <Camino en={PASOS.caminos[0]} dur={15} x={PASO_X - 60} y={PASO_Y[0] + 60} ancho={120} alto={tramo1} d={`M 60 0 C -10 ${tramo1 * 0.35}, 120 ${tramo1 * 0.65}, 60 ${tramo1}`} color={C.tinta} />
      <Camino en={PASOS.caminos[1]} dur={15} x={PASO_X - 60} y={PASO_Y[1] + 60} ancho={120} alto={tramo2} d={`M 60 0 C 130 ${tramo2 * 0.35}, 0 ${tramo2 * 0.65}, 60 ${tramo2}`} color={C.tinta} />
      {PASOS.pasos.map((p, i) => (
        <Paso key={i} i={i} en={p.en} titulo={p.titulo} linea={p.linea} destaca={i === 2} />
      ))}
      <TarjetaCuenta en={PASOS.cuenta} />
    </AbsoluteFill>
  );
};

/** La izquierda de abajo: «Miles de corazones unidos por amor.», la firma y las fechas. */
const Pie: React.FC = () => {
  const frame = useCurrentFrame();
  const corazones = rampa(frame, PASOS.corazones, PASOS.corazones + 12);
  const firma = rampa(frame, PASOS.firma, PASOS.firma + 12);
  const fechas = rampa(frame, PASOS.fechas, PASOS.fechas + 12);
  return (
    <>
      {frame >= PASOS.corazones ? (
        <div style={{ position: "absolute", left: 96, top: 430, width: 640, opacity: corazones, transform: `translateY(${(1 - corazones) * 10}px)`, ...DOSIS, fontWeight: 800, fontSize: 56, lineHeight: 1.12, color: C.tinta }}>
          {/* El corte, a mano (como en el 097): «Miles de corazones / unidos por amor.» reparte el peso. */}
          Miles de corazones
          <br />
          unidos por amor.
        </div>
      ) : null}
      {/* La firma, como en el cartel: Casa Sobre la Roca | MAS, en índigo y con un filete. Un logo no rebota: entra con un fundido. */}
      {frame >= PASOS.firma ? (
        <div style={{ position: "absolute", left: 96, top: 640, opacity: firma, display: "flex", alignItems: "center", gap: 34 }}>
          <Img src={staticFile("mas-097/logo-csr-indigo.png")} style={{ height: 58 }} />
          <div style={{ width: 3, height: 96, backgroundColor: C.tinta, borderRadius: 2 }} />
          <Img src={staticFile("mas-097/logo-mas-indigo.png")} style={{ height: 96 }} />
        </div>
      ) : null}
      {frame >= PASOS.fechas ? (
        <div style={{ position: "absolute", left: 96, top: 900, opacity: fechas, ...MONTSERRAT, fontWeight: 700, fontSize: 46, color: C.tinta }}>
          Del 15 de noviembre al 20 de diciembre
        </div>
      ) : null}
    </>
  );
};

export const Papel099: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < HOJA.en) return null;
  return (
    <AbsoluteFill>
      <Hoja />
      <Resumen />
      <Pasos />
      <Pie />
      <EstrellaGuia />
      {frame < HOJA.en + 20 ? (
        <div style={{ position: "absolute", left: CENTRO_CIRCULO.x, top: CENTRO_CIRCULO.y }}>
          <Destello en={HOJA.en} tam={160} color={C.tinta} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
