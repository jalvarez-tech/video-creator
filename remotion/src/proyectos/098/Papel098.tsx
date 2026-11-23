/**
 * EL CTA EN PAPEL (P12, f1478-f1794): la versión compacta del CTA del 097 (`proyectos/097/Papel097.tsx`), en 10,5 s y una
 * sola hoja. A la izquierda, qué es («Este año, más de 3.000 +1 regalos», «Miles de corazones unidos por amor.», las
 * fechas y la firma CSR | MAS); a la derecha, cómo ayudar: los tres pasos del cartel con sus estrellas numeradas y, bajo
 * el paso 2, la cuenta EXACTA (`CUENTA`, que la puerta compara dígito a dígito). Todos los textos son los del 097, ya
 * aprobados: aquí no se inventa ninguno.
 *
 * La estrella del círculo (DR07) es la misma que la del paso 1: sale del centro y va a su sitio (continuidad causal).
 * Nada sale al final: el último frame es el cartel entero, mientras la música se apaga en su respiro.
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, Camino, DOSIS, Destello, EstrellaSvg, Estrellita, MONTSERRAT, PAPEL_URL, rampa, useMuelle } from "./piezas-098";
import { CENTRO_CIRCULO } from "./Graficos098";
import { CTA, CUENTA } from "./textos-098";

const PASO_X = 860;
const PASO_Y = [196, 430, 790] as const;
const PASO_TAM = 124;

/** El papel a pantalla completa, con una deriva lentísima: nada congelado. */
const Hoja: React.FC = () => {
  const frame = useCurrentFrame();
  const entra = rampa(frame, CTA.hoja, CTA.hoja + 10, 1920, 0, EASE.outCubic);
  const dx = Math.sin(frame / 95) * 4;
  const dy = Math.cos(frame / 120) * 3;
  return (
    <AbsoluteFill style={{ transform: `translateX(${entra}px)`, overflow: "hidden", backgroundColor: C.papel }}>
      <Img src={PAPEL_URL} style={{ position: "absolute", left: -144 + dx, top: -81 + dy, width: 2208, height: 1242 }} />
    </AbsoluteFill>
  );
};

/** La estrella del círculo: del centro a ser la estrella 1, y el número aparece cuando llega. */
const EstrellaGuia: React.FC = () => {
  const frame = useCurrentFrame();
  const va = rampa(frame, CTA.hoja, CTA.pasos[0].en, 0, 1, EASE.inOutCubic);
  const numero = rampa(frame, CTA.pasos[0].en, CTA.pasos[0].en + 8);
  const x = interpolate(va, [0, 1], [CENTRO_CIRCULO.x, PASO_X]);
  const y = interpolate(va, [0, 1], [CENTRO_CIRCULO.y, PASO_Y[0]]);
  const tam = interpolate(va, [0, 1], [150, PASO_TAM]);
  return (
    <div style={{ position: "absolute", left: x - tam / 2, top: y - tam / 2 }}>
      <EstrellaSvg tam={tam} />
      {numero > 0 ? (
        <div style={{ position: "absolute", inset: 0, opacity: numero }}>
          <EstrellaSvg tam={tam} numero={1} />
        </div>
      ) : null}
    </div>
  );
};

/** Izquierda, arriba: la meta en pequeño, como el resumen del 097 («3.000 +1», con el +1 en la misma proporción). */
const Resumen: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CTA.resumen) return null;
  const op = rampa(frame, CTA.resumen, CTA.resumen + 12);
  return (
    <div style={{ position: "absolute", left: 96, top: 128, opacity: op, transform: `translateY(${(1 - op) * 12}px)` }}>
      <div style={{ ...DOSIS, fontWeight: 600, fontSize: 44, color: C.tinta }}>Este año, más de</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 132, lineHeight: 1, color: C.azul, letterSpacing: -3 }}>3.000</div>
        <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 69, lineHeight: 1, color: C.azul }}>+1</div>
      </div>
      <div style={{ ...DOSIS, fontWeight: 800, fontSize: 58, color: C.tinta }}>regalos</div>
    </div>
  );
};

const Paso: React.FC<{ i: number; en: number; titulo: string; linea: string; destaca?: boolean }> = ({ i, en, titulo, linea, destaca }) => {
  const frame = useCurrentFrame();
  const t = useMuelle(en + 3, { damping: 16, mass: 0.7 });
  if (frame < en) return null;
  const l = rampa(frame, en + 6, en + 16);
  return (
    <>
      {i > 0 ? <Estrellita en={en} x={PASO_X} y={PASO_Y[i]} tam={PASO_TAM} numero={i + 1} /> : null}
      <div style={{ position: "absolute", left: PASO_X + 92, top: PASO_Y[i] - 60 }}>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 58, lineHeight: 1.1, color: C.tinta, opacity: Math.min(1, t * 1.4), transform: `translateX(${(1 - t) * 24}px)` }}>
          {titulo}
        </div>
        <div style={{ ...MONTSERRAT, fontWeight: destaca ? 700 : 500, fontSize: destaca ? 40 : 34, color: C.tinta, opacity: l, maxWidth: 860, lineHeight: 1.25, fontVariantNumeric: "tabular-nums" }}>
          {linea}
        </div>
      </div>
    </>
  );
};

/** La cuenta: tarjeta blanca con el símbolo de Bancolombia y los datos. Sin giro ni escala: es un dato que se copia. */
const TarjetaCuenta: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CTA.tarjeta) return null;
  const op = rampa(frame, CTA.tarjeta, CTA.tarjeta + 10);
  return (
    <div
      style={{
        position: "absolute",
        left: PASO_X + 92,
        top: PASO_Y[1] + 72,
        opacity: op,
        backgroundColor: C.blanco,
        padding: "14px 28px 14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 22,
      }}
    >
      <Img src={staticFile("mas-097/logo-bancolombia.svg")} style={{ width: 80, height: 80 }} />
      <div style={{ ...MONTSERRAT, color: C.tinta, fontVariantNumeric: "tabular-nums" }}>
        <div style={{ fontWeight: 600, fontSize: 25, lineHeight: 1.2 }}>
          {CUENTA.banco} · {CUENTA.tipo}
        </div>
        <div style={{ fontWeight: 800, fontSize: 48, lineHeight: 1.1, letterSpacing: 1 }}>{CUENTA.numero}</div>
        <div style={{ fontWeight: 600, fontSize: 27, lineHeight: 1.2 }}>NIT: {CUENTA.nit}</div>
      </div>
    </div>
  );
};

const Pasos: React.FC = () => {
  const tramo1 = PASO_Y[1] - PASO_Y[0] - 110;
  const tramo2 = PASO_Y[2] - PASO_Y[1] - 110;
  return (
    <>
      <Camino en={CTA.caminos[0]} dur={14} x={PASO_X - 60} y={PASO_Y[0] + 55} ancho={120} alto={tramo1} d={`M 60 0 C -10 ${tramo1 * 0.35}, 120 ${tramo1 * 0.65}, 60 ${tramo1}`} color={C.tinta} />
      <Camino en={CTA.caminos[1]} dur={14} x={PASO_X - 60} y={PASO_Y[1] + 55} ancho={120} alto={tramo2} d={`M 60 0 C 130 ${tramo2 * 0.35}, 0 ${tramo2 * 0.65}, 60 ${tramo2}`} color={C.tinta} />
      {CTA.pasos.map((p, i) => (
        <Paso key={i} i={i} en={p.en} titulo={p.titulo} linea={p.linea} destaca={i === 2} />
      ))}
      <TarjetaCuenta />
    </>
  );
};

/** Izquierda, abajo: «Miles de corazones unidos por amor.» (097 rev. 10), las fechas del cartel y la firma CSR | MAS. */
const Pie: React.FC = () => {
  const frame = useCurrentFrame();
  const corazones = rampa(frame, CTA.corazones, CTA.corazones + 12);
  const firma = rampa(frame, CTA.firma, CTA.firma + 14);
  const fechas = rampa(frame, CTA.fechas, CTA.fechas + 12);
  return (
    <>
      {frame >= CTA.corazones ? (
        <div style={{ position: "absolute", left: 96, top: 470, width: 700, opacity: corazones, transform: `translateY(${(1 - corazones) * 10}px)`, ...DOSIS, fontWeight: 800, fontSize: 60, lineHeight: 1.12, color: C.tinta }}>
          Miles de corazones
          <br />
          unidos por amor.
        </div>
      ) : null}
      {frame >= CTA.fechas ? (
        <div style={{ position: "absolute", left: 96, top: 650, opacity: fechas, ...MONTSERRAT, fontWeight: 700, fontSize: 36, lineHeight: 1.25, color: C.tinta }}>
          Del 15 de noviembre
          <br />
          al 20 de diciembre
        </div>
      ) : null}
      {/* La firma, como en el cartel: CSR | MAS en índigo con un filete. Un logo no rebota: entra con un fundido. */}
      <div style={{ position: "absolute", left: 96, top: 850, opacity: firma, display: "flex", alignItems: "center", gap: 34 }}>
        <Img src={staticFile("mas-097/logo-csr-indigo.png")} style={{ height: 58 }} />
        <div style={{ width: 3, height: 96, backgroundColor: C.tinta, borderRadius: 2 }} />
        <Img src={staticFile("mas-097/logo-mas-indigo.png")} style={{ height: 96 }} />
      </div>
    </>
  );
};

export const Papel098: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CTA.hoja) return null;
  return (
    <AbsoluteFill>
      <Hoja />
      <Resumen />
      <Pasos />
      <Pie />
      <EstrellaGuia />
      {frame < CTA.hoja + 20 ? (
        <div style={{ position: "absolute", left: CENTRO_CIRCULO.x, top: CENTRO_CIRCULO.y }}>
          <Destello en={CTA.hoja} tam={160} color={C.tinta} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
