/**
 * EL CTA EN PAPEL DEL 106 (f1446-1755, 10,3 s): copia del CTA del 100 (`Papel100.tsx`), la versión COMPACTA del 097, en UNA
 * sola hoja. Entra en el golpe de 324,99 s de «Yeshua» (el mismo en que sube el papel en el 105) y se queda: todo está puesto
 * en f1590 y se lee 5,5 s más (la cuenta, con calma; la deriva del papel hace que nada quede congelado).
 *
 *   izquierda   «Este año, más de 3.000 +1 regalos» · «Uno puede ser el tuyo.» · las fechas de la campaña · los logos CSR | MAS
 *   derecha     los tres pasos con sus estrellas y el camino punteado; bajo el paso 2, la CUENTA (Bancolombia)
 *
 * Los textos son los del 097 (las palabras del usuario del 2026-11-22 y el cartel `proyectos/097/material/referencias/`).
 * La cuenta sale de `CUENTA` (`textos-106.ts`), que la puerta compara dígito a dígito con la que dio el usuario.
 */
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, Camino, DOSIS, Estrellita, MONTSERRAT, PAPEL_URL, rampa, useMuelle } from "./piezas-106";
import { CUENTA, PAPEL, PASOS } from "./textos-106";

const PASO_X = 860;
const PASO_Y = [165, 405, 740] as const;
const PASO_TAM = 150;

/** El papel a pantalla completa: entra deslizando en 10 f y deriva ±4 px (nada congelado). */
const Hoja: React.FC = () => {
  const frame = useCurrentFrame();
  const entra = rampa(frame, PAPEL.hoja, PAPEL.hoja + 10, 1920, 0, EASE.outCubic);
  const dx = Math.sin(frame / 95) * 4;
  const dy = Math.cos(frame / 120) * 3;
  return (
    <AbsoluteFill style={{ transform: `translateX(${entra}px)`, overflow: "hidden", backgroundColor: C.papel }}>
      <Img src={PAPEL_URL} style={{ position: "absolute", left: -144 + dx, top: -81 + dy, width: 2208, height: 1242 }} />
    </AbsoluteFill>
  );
};

/** Aparece subiendo 10 px en 10 f. */
const aparece = (frame: number, en: number): React.CSSProperties => {
  const p = rampa(frame, en, en + 10);
  return { opacity: p, transform: `translateY(${((1 - p) * 10).toFixed(2)}px)` };
};

const Izquierda: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div style={{ position: "absolute", left: 96, top: 150, ...aparece(frame, PAPEL.meta) }}>
        <div style={{ ...DOSIS, fontWeight: 600, fontSize: 44, color: C.tinta }}>Este año, más de</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 140, lineHeight: 1, color: C.azul, letterSpacing: -4 }}>3.000</div>
          <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 74, lineHeight: 1, color: C.azul }}>+1</div>
        </div>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 60, color: C.tinta }}>regalos</div>
      </div>
      <div style={{ position: "absolute", left: 96, top: 490, width: 660, ...DOSIS, fontWeight: 800, fontSize: 58, lineHeight: 1.1, color: C.tinta, ...aparece(frame, PAPEL.tuyo) }}>
        Uno puede ser <span style={{ color: C.azul }}>el tuyo</span>.
      </div>
      <div style={{ position: "absolute", left: 96, top: 640, ...MONTSERRAT, fontWeight: 700, fontSize: 38, lineHeight: 1.25, color: C.tinta, ...aparece(frame, PAPEL.fechas) }}>
        Del 15 de noviembre
        <br />
        al 20 de diciembre
      </div>
      {/* La firma, como en el cartel: Casa Sobre la Roca | MAS, en índigo y con un filete. Un logo no rebota: entra con un fundido. */}
      <div style={{ position: "absolute", left: 96, top: 860, opacity: rampa(frame, PAPEL.logos, PAPEL.logos + 12), display: "flex", alignItems: "center", gap: 30 }}>
        <Img src={staticFile("mas-097/logo-csr-indigo.png")} style={{ height: 52 }} />
        <div style={{ width: 3, height: 86, backgroundColor: C.tinta, borderRadius: 2 }} />
        <Img src={staticFile("mas-097/logo-mas-indigo.png")} style={{ height: 86 }} />
      </div>
    </>
  );
};

const Paso: React.FC<{ i: number; en: number; titulo: string; linea: string; destaca?: boolean }> = ({ i, en, titulo, linea, destaca }) => {
  const frame = useCurrentFrame();
  const t = useMuelle(en + 3, { damping: 16, mass: 0.7 });
  if (frame < en) return null;
  const l = rampa(frame, en + 6, en + 16);
  return (
    <>
      <Estrellita en={en} x={PASO_X} y={PASO_Y[i]} tam={PASO_TAM} numero={i + 1} />
      <div style={{ position: "absolute", left: PASO_X + 110, top: PASO_Y[i] - 70 }}>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 64, color: C.tinta, opacity: Math.min(1, t * 1.4), transform: `translateX(${(1 - t) * 24}px)` }}>{titulo}</div>
        <div style={{ ...MONTSERRAT, fontWeight: destaca ? 700 : 500, fontSize: destaca ? 40 : 34, color: C.tinta, opacity: l, maxWidth: 860, lineHeight: 1.25, fontVariantNumeric: "tabular-nums" }}>
          {linea}
        </div>
      </div>
    </>
  );
};

/** La cuenta: tarjeta blanca con el símbolo de Bancolombia y los datos, grandes, sin giro ni escala (es un dato que se copia). */
const TarjetaCuenta: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < PAPEL.cuenta) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: PASO_X + 110,
        top: PASO_Y[1] + 74,
        opacity: rampa(frame, PAPEL.cuenta, PAPEL.cuenta + 10),
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

const Derecha: React.FC = () => {
  const tramo1 = PASO_Y[1] - PASO_Y[0] - 120;
  const tramo2 = PASO_Y[2] - PASO_Y[1] - 120;
  return (
    <>
      <Camino en={PAPEL.caminos[0]} dur={12} x={PASO_X - 60} y={PASO_Y[0] + 60} ancho={120} alto={tramo1} d={`M 60 0 C -10 ${tramo1 * 0.35}, 120 ${tramo1 * 0.65}, 60 ${tramo1}`} color={C.tinta} />
      <Camino en={PAPEL.caminos[1]} dur={12} x={PASO_X - 60} y={PASO_Y[1] + 60} ancho={120} alto={tramo2} d={`M 60 0 C 130 ${tramo2 * 0.35}, 0 ${tramo2 * 0.65}, 60 ${tramo2}`} color={C.tinta} />
      {PASOS.map((p, i) => (
        <Paso key={i} i={i} en={PAPEL.pasos[i]} titulo={p.titulo} linea={p.linea} destaca={i === 2} />
      ))}
      <TarjetaCuenta />
    </>
  );
};

export const Papel106: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < PAPEL.hoja) return null;
  return (
    <AbsoluteFill>
      <Hoja />
      <Izquierda />
      <Derecha />
    </AbsoluteFill>
  );
};
