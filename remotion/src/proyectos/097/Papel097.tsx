/**
 * EL CTA EN PAPEL (P28-P30, f2718-f3483): el amarillo del cartel a pantalla completa. Es el cartel
 * de MAS Estrellitas 2026 en movimiento: la meta, los tres pasos con sus estrellas numeradas y el
 * camino punteado, las fechas, «Miles de corazones unidos por amor.» (rev. 10, en lugar de la salida para quien
 * está lejos) y el cierre con la foto del grupo.
 *
 * Los textos de los pasos y las fechas son los del cartel (`proyectos/097/material/referencias/estrellitas-2026.jpg`),
 * salvo los tres pasos, que llevan las palabras del usuario (2026-11-22): «Dona y toma tu estrellita» · «Compra tu regalo y
 * entrégalo en los puntos designados» · «Recibe tu estrellita». Lo que falta de MAS va marcado y a
 * la vista.
 *
 * La estrella del círculo de DR07 (el puente) es la misma que la del CTA: aquí sigue desde donde
 * aterrizó y se va a la izquierda (continuidad causal: 02-layout §4.3).
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE } from "../../motor/motion";
import { C, Camino, DOSIS, Destello, EstrellaSvg, Estrellita, FotoPegatina, MONTSERRAT, PAPEL_URL, rampa, useMuelle } from "./piezas-097";
import { CENTRO_CIRCULO } from "./Graficos097";
import { CIERRE, CUENTA, META, PASOS } from "./textos-097";

const fmt = (n: number) => Math.round(n).toLocaleString("es-CO").replace(/,/g, ".");

/** El papel a pantalla completa, con una deriva lentísima (±4 px en 10 s): nada congelado. */
const Hoja: React.FC = () => {
  const frame = useCurrentFrame();
  const entra = rampa(frame, META.hoja, META.hoja + 10, 1920, 0, EASE.outCubic);
  const dx = Math.sin(frame / 95) * 4;
  const dy = Math.cos(frame / 120) * 3;
  return (
    <AbsoluteFill style={{ transform: `translateX(${entra}px)`, overflow: "hidden", backgroundColor: C.papel }}>
      <Img src={PAPEL_URL} style={{ position: "absolute", left: -144 + dx, top: -81 + dy, width: 2208, height: 1242 }} />
    </AbsoluteFill>
  );
};

/** La estrella: del centro del círculo a la izquierda (P28) y, en P29, a ser la estrella 1. */
const EstrellaGuia: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= PASOS.sale + 10) return null;
  const sale = rampa(frame, PASOS.sale, PASOS.sale + 10, 1, 0);
  const numero = rampa(frame, PASOS.pasos[0].en, PASOS.pasos[0].en + 8);
  const va = rampa(frame, META.hoja, META.hoja + 24, 0, 1, EASE.inOutCubic);
  const aPaso = rampa(frame, PASOS.encoge, PASOS.pasos[0].en, 0, 1, EASE.inOutCubic);
  const x = interpolate(aPaso, [0, 1], [interpolate(va, [0, 1], [CENTRO_CIRCULO.x, 380]), PASO_X]);
  const y = interpolate(aPaso, [0, 1], [interpolate(va, [0, 1], [CENTRO_CIRCULO.y, 540]), PASO_Y[0]]);
  const tam = interpolate(aPaso, [0, 1], [interpolate(va, [0, 1], [150, 380]), PASO_TAM]);
  const giro = Math.sin(frame / 40) * 3 * (1 - aPaso);
  return (
    <div style={{ position: "absolute", left: x - tam / 2, top: y - tam / 2, opacity: sale }}>
      <EstrellaSvg tam={tam} giro={giro} />
      {numero > 0 ? (
        <div style={{ position: "absolute", inset: 0, opacity: numero }}>
          <EstrellaSvg tam={tam} giro={giro} numero={1} />
        </div>
      ) : null}
    </div>
  );
};

/** P28 · la meta: «Este año queremos entregar más de 3.000 regalos…» y el «+1». */
const Meta: React.FC = () => {
  const frame = useCurrentFrame();
  const mas = useMuelle(META.mas1, { damping: 12, mass: 0.6 });
  if (frame < META.linea1 || frame >= META.sale + 12) return null;
  const sale = rampa(frame, META.sale, META.sale + 12, 1, 0);
  const n = interpolate(frame, [META.cuenta[0], META.cuenta[1]], [0, 3000], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  const l1 = rampa(frame, META.linea1, META.linea1 + 10);
  const cifra = rampa(frame, META.cuenta[0], META.cuenta[0] + 8);
  const l2 = rampa(frame, META.linea2, META.linea2 + 12);
  return (
    <div style={{ position: "absolute", left: 700, top: 150, width: 1124, opacity: sale }}>
      <div style={{ ...DOSIS, fontWeight: 600, fontSize: 58, color: C.tinta, opacity: l1, transform: `translateY(${(1 - l1) * 10}px)` }}>Este año queremos entregar más de</div>
      <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: -6 }}>
        <span style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 230, lineHeight: 1, color: C.azul, opacity: cifra, letterSpacing: -6 }}>{fmt(n)}</span>
        {frame >= META.mas1 ? (
          <span style={{ position: "relative", ...MONTSERRAT, fontWeight: 800, fontSize: 120, color: C.azul, transform: `scale(${mas.toFixed(4)}) rotate(${(1 - mas) * -12}deg)`, display: "inline-block" }}>
            +1
          </span>
        ) : null}
      </div>
      <div style={{ ...DOSIS, fontWeight: 600, fontSize: 46, lineHeight: 1.2, color: C.tinta, opacity: l2 }}>
        regalos a niños de las zonas más apartadas
        <br />y pobres del país.
      </div>
      {frame >= META.mas1 + 8 ? (
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 84, color: C.tinta, marginTop: 34, opacity: rampa(frame, META.mas1 + 8, META.mas1 + 20) }}>
          Uno puede ser <span style={{ color: C.azul }}>el tuyo</span>.
        </div>
      ) : null}
    </div>
  );
};

/**
 * P29 · los tres pasos, con las palabras del usuario (rev. 5, 2026-11-22), unidos por el camino punteado. Bajo el
 * paso 2, la CUENTA para donar (Bancolombia, con su logo), sin giro ni animación de escala: es un dato que se copia.
 * Ya no hay QR (pedido del usuario, rev. 5).
 */
const PASO_X = 860;
const PASO_Y = [165, 405, 740] as const;
const PASO_TAM = 150;

const Paso: React.FC<{ i: number; en: number; titulo: string; linea: string; sale: number; destaca?: boolean }> = ({ i, en, titulo, linea, sale, destaca }) => {
  const frame = useCurrentFrame();
  const t = useMuelle(en + 3, { damping: 16, mass: 0.7 });
  if (frame < en) return null;
  const op = rampa(frame, sale, sale + 10, 1, 0);
  const l = rampa(frame, en + 6, en + 16);
  return (
    <div style={{ opacity: op }}>
      {i > 0 ? <Estrellita en={en} x={PASO_X} y={PASO_Y[i]} tam={PASO_TAM} numero={i + 1} /> : null}
      <div style={{ position: "absolute", left: PASO_X + 110, top: PASO_Y[i] - 70 }}>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 64, color: C.tinta, opacity: Math.min(1, t * 1.4), transform: `translateX(${(1 - t) * 24}px)` }}>{titulo}</div>
        <div
          style={{
            ...MONTSERRAT,
            fontWeight: destaca ? 700 : 500,
            fontSize: destaca ? 40 : 34,
            color: C.tinta,
            opacity: l,
            maxWidth: 860,
            lineHeight: 1.25,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {linea}
        </div>
      </div>
    </div>
  );
};

/** La cuenta: tarjeta de papel blanco con el símbolo de Bancolombia (el que dio el usuario) y los datos, grandes. */
const TarjetaCuenta: React.FC<{ en: number; sale: number }> = ({ en, sale }) => {
  const frame = useCurrentFrame();
  if (frame < en) return null;
  const op = rampa(frame, en, en + 10) * rampa(frame, sale, sale + 10, 1, 0);
  return (
    <div
      style={{
        position: "absolute",
        left: PASO_X + 110,
        top: PASO_Y[1] + 74,
        opacity: op,
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
  if (frame < PASOS.encoge || frame >= PASOS.sale + 12) return null;
  const fechas = rampa(frame, PASOS.fechas, PASOS.fechas + 12);
  const corazones = rampa(frame, PASOS.corazones, PASOS.corazones + 12);
  const salen = rampa(frame, PASOS.sale, PASOS.sale + 10, 1, 0);
  // Resumen de la meta, arriba a la izquierda, mientras se leen los pasos.
  const resumen = rampa(frame, PASOS.encoge + 4, PASOS.encoge + 16);
  const tramo1 = PASO_Y[1] - PASO_Y[0] - 120;
  const tramo2 = PASO_Y[2] - PASO_Y[1] - 120;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 96, top: 150, opacity: resumen * salen }}>
        <div style={{ ...DOSIS, fontWeight: 600, fontSize: 40, color: C.tinta }}>Este año, más de</div>
        {/* «3.000 +1», como en la meta (pedido del usuario, rev. 10): el +1 en la misma proporción que allí (230 → 120). */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 120, lineHeight: 1, color: C.azul, letterSpacing: -3 }}>3.000</div>
          <div style={{ ...MONTSERRAT, fontWeight: 800, fontSize: 63, lineHeight: 1, color: C.azul }}>+1</div>
        </div>
        <div style={{ ...DOSIS, fontWeight: 800, fontSize: 54, color: C.tinta }}>regalos</div>
      </div>
      <Camino en={PASOS.caminos[0]} dur={15} x={PASO_X - 60} y={PASO_Y[0] + 60} ancho={120} alto={tramo1} d={`M 60 0 C -10 ${tramo1 * 0.35}, 120 ${tramo1 * 0.65}, 60 ${tramo1}`} color={C.tinta} />
      <Camino en={PASOS.caminos[1]} dur={15} x={PASO_X - 60} y={PASO_Y[1] + 60} ancho={120} alto={tramo2} d={`M 60 0 C 130 ${tramo2 * 0.35}, 0 ${tramo2 * 0.65}, 60 ${tramo2}`} color={C.tinta} />
      {PASOS.pasos.map((p, i) => (
        <Paso key={i} i={i} en={p.en} titulo={p.titulo} linea={p.linea} sale={PASOS.sale} destaca={i === 2} />
      ))}
      <TarjetaCuenta en={PASOS.pasos[1].en + 8} sale={PASOS.sale} />
      <div style={{ position: "absolute", left: 96, top: 900, opacity: fechas * salen, ...MONTSERRAT, fontWeight: 700, fontSize: 46, color: C.tinta }}>
        Del 15 de noviembre al 20 de diciembre
      </div>
      {/* Rev. 10 (pedido del usuario): en el sitio de «¿Estás lejos? Dona en fundamas.org/donaciones». */}
      {frame >= PASOS.corazones ? (
        <div style={{ position: "absolute", left: 96, top: 470, width: 640, opacity: corazones * salen, ...DOSIS, fontWeight: 800, fontSize: 56, lineHeight: 1.12, color: C.tinta }}>
          {/* El corte, a mano: «Miles de corazones / unidos por amor.» reparte el peso; el del ancho dejaba «por amor.» suelto. */}
          Miles de corazones
          <br />
          unidos por amor.
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/** P30 · el cierre: la foto del grupo, «Toma una estrellita.», la firma y la invitación a compartir. */
const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const toma = useMuelle(CIERRE.toma, { damping: 15, mass: 0.7 });
  if (frame < CIERRE.en) return null;
  const firma = rampa(frame, CIERRE.firma, CIERRE.firma + 12);
  const comparte = rampa(frame, CIERRE.comparte, CIERRE.comparte + 12);
  return (
    <AbsoluteFill>
      <FotoPegatina
        en={CIERRE.foto}
        src="mas-097/ft35.jpg"
        ancho={860}
        x={96}
        y={150}
        giro={-3}
        pie="«Gracias por acompañarme en este viaje.»"
        enPie={CIERRE.pie}
      />
      {frame >= CIERRE.toma ? (
        <div style={{ position: "absolute", left: 1040, top: 250, width: 800 }}>
          <div style={{ ...DOSIS, fontWeight: 800, fontSize: 112, lineHeight: 1.02, color: C.tinta, opacity: Math.min(1, toma * 1.4), transform: `translateY(${(1 - toma) * 20}px)` }}>
            Toma una <span style={{ color: C.azul }}>estrellita</span>.
          </div>
          <div style={{ position: "absolute", left: 700, top: -60, width: 1, height: 1 }}>
            <Estrellita en={CIERRE.toma} x={0} y={0} tam={110} />
          </div>
          <div style={{ ...DOSIS, fontWeight: 600, fontSize: 42, lineHeight: 1.2, color: C.tinta, marginTop: 34, opacity: comparte }}>
            Compártelo con quien pueda llevar un regalo.
          </div>
        </div>
      ) : null}
      {/* La firma, como en el cartel: Casa Sobre la Roca | MAS, en índigo y con un filete entre los dos (sin QR desde la rev. 5). Un logo no rebota: entra con un fundido. */}
      <div style={{ position: "absolute", left: 1040, top: 690, opacity: firma, display: "flex", alignItems: "center", gap: 34 }}>
        <Img src={staticFile("mas-097/logo-csr-indigo.png")} style={{ height: 58 }} />
        <div style={{ width: 3, height: 96, backgroundColor: C.tinta, borderRadius: 2 }} />
        <Img src={staticFile("mas-097/logo-mas-indigo.png")} style={{ height: 96 }} />
      </div>
    </AbsoluteFill>
  );
};

export const Papel097: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < META.hoja) return null;
  return (
    <AbsoluteFill>
      <Hoja />
      <Meta />
      <Pasos />
      <Cierre />
      <EstrellaGuia />
      {frame >= META.hoja && frame < META.hoja + 20 ? (
        <div style={{ position: "absolute", left: CENTRO_CIRCULO.x, top: CENTRO_CIRCULO.y }}>
          <Destello en={META.hoja} tam={160} color={C.tinta} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
