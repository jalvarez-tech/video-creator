import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import {
  CIFRAS,
  COLUMNA,
  DUR,
  ETIQUETAS,
  F,
  LAYOUT,
  NOTA,
  ORO,
  PX,
  TRACKING_ETIQUETA,
  UNIDAD,
  VELO,
  decimal,
  pesos,
} from "./infografia-060";

/**
 * LA INFOGRAFÍA DEL 060 (encargo del usuario, 2026-10-22; datos, tiempos y por qué en `infografia-060.ts`): la cuenta de la rentabilidad estimada, tres paneles que caen sobre el bloque 5 justo después de
 * «ven, te muestro cómo». Todo desde `useCurrentFrame()` (determinista).
 *
 * REV. 2 (el usuario: «pasan muy rápido, no hagas animación en los números para que puedan estar más tiempo, solo ponlos uno a uno con el valor completo»): las cifras NO se animan —no hay recuento, ni subida, ni
 * latido—: cada una entra con su valor COMPLETO, con un fundido de `DUR.entrada` f, y se queda hasta que se va su panel. Lo único que se mueve es la barra de la ocupación y el filete dorado (gráficos, no números).
 *
 *   Panel 1 «la cuenta»      tarifa → ocupación (barra al 85 %) → noches → INGRESOS MENSUALES (héroe)
 *   Panel 2 «los gastos»     administración → servicios públicos → TOTAL GASTOS (héroe)
 *   Panel 3 «la utilidad»    UTILIDAD MENSUAL ESTIMADA (héroe único), sobre la vista, con su pie
 *
 * Cada elemento entra en un golpe medido de la canción (`F`). Un solo héroe a la vez: los paneles se relevan con un fundido de `DUR.salida` f. Z-order: sobre los planos y el fundido de cierre, bajo los
 * subtítulos (que aquí no coinciden: ella no habla).
 */

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FRENA = Easing.out(Easing.cubic);

/** Opacidad 0→1 de un elemento que entra en `golpe` (un fundido corto y nada más). */
const entra = (frame: number, golpe: number, dur: number = DUR.entrada): number => interpolate(frame, [golpe, golpe + dur], [0, 1], CLAMP);

/** Opacidad de un panel: 0 antes de su primer frame, 1 mientras vive y 0 tras su fundido de salida. */
const vive = (frame: number, desde: number, hasta: number): number => interpolate(frame, [hasta - DUR.salida, hasta], [1, 0], CLAMP) * (frame >= desde ? 1 : 0);

const letra = letraSubtitulosDe(LUXUR);
/** La sombra de texto del canal: solo en el panel 3, donde el fondo es la vista (en los paneles 1 y 2 lo oscurece el velo del 80 %). */
const SOMBRA = LUXUR.sombra.texto;

const base = { fontFamily: letra.base.familia, fontStyle: "normal", fontSynthesis: "none", color: LUXUR.color.blanco, margin: 0 } as const;
const cifra = { ...base, fontFamily: letra.dato.familia, fontWeight: letra.dato.peso, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", lineHeight: 1.05, whiteSpace: "nowrap" } as const;
const heroe = { ...base, fontFamily: letra.acento.familia, fontWeight: letra.acento.peso, fontStyle: "italic", lineHeight: 1.2, whiteSpace: "nowrap" } as const;

/** Un bloque de la infografía: su caja absoluta, con su fundido de entrada y el de su panel. */
const Caja: React.FC<{ arriba: number; p: number; vida?: number; children: React.ReactNode }> = ({ arriba, p, vida = 1, children }) => (
  <div style={{ position: "absolute", top: arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho, opacity: p * vida }}>{children}</div>
);

const Etiqueta: React.FC<{ children: React.ReactNode; color?: string; px?: number; sombra?: string }> = ({ children, color = ORO, px = PX.etiqueta, sombra }) => (
  <div style={{ ...base, fontWeight: letra.base.peso, fontSize: px, lineHeight: 1.2, letterSpacing: `${TRACKING_ETIQUETA}em`, textTransform: "uppercase", color, whiteSpace: "nowrap", textShadow: sombra }}>{children}</div>
);

/** La cifra de una fila: 88 px. */
const Valor: React.FC<{ children: React.ReactNode; px?: number }> = ({ children, px = PX.valor }) => <div style={{ ...cifra, fontSize: px, marginTop: 6 }}>{children}</div>;

/** El filete dorado que separa: se dibuja de izquierda a derecha. */
const Filete: React.FC<{ arriba: number; p: number; vida: number }> = ({ arriba, p, vida }) => (
  <div style={{ position: "absolute", top: arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho * p, height: 2, backgroundColor: ORO, opacity: vida }} />
);

export const Infografia060: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < F.inicio || frame > F.fin) return null;

  // Los paneles: 1 hasta el panel 2; 2 hasta el panel 3; 3 hasta el final.
  const v1 = vive(frame, F.inicio, F.panel2);
  const v2 = vive(frame, F.panel2, F.panel3);
  const v3 = vive(frame, F.panel3, F.fin + 1);

  // El velo: el negro de los paneles 1 y 2 (rampa de entrada con el corte a la cama; se va con el corte a la vista) y el degradado desde abajo del 3.
  const velo = interpolate(frame, [F.inicio, F.inicio + VELO.rampa], [0, VELO.panel], CLAMP) * (frame < F.panel3 ? 1 : 0);
  const [a0, a1, a2] = VELO.degradadoAbajo;
  const veloAbajo = frame >= F.panel3 ? interpolate(frame, [F.fin - DUR.salida, F.fin + 1], [1, 0], CLAMP) : 0;

  // PANEL 1
  const e1 = entra(frame, F.tarifa);
  const e2 = entra(frame, F.ocupacion);
  const e3 = entra(frame, F.noches);
  const e4 = entra(frame, F.ingresos);
  const barra = interpolate(frame, [F.ocupacion, F.ocupacion + DUR.barra], [0, CIFRAS.ocupacion / 100], { ...CLAMP, easing: FRENA });
  const filete1 = interpolate(frame, [F.ingresos - DUR.filete, F.ingresos], [0, 1], { ...CLAMP, easing: FRENA });

  // PANEL 2
  const g1 = entra(frame, F.panel2);
  const g2 = entra(frame, F.servicios);
  const g3 = entra(frame, F.gastosTotal);
  const filete2 = interpolate(frame, [F.gastosTotal - DUR.filete, F.gastosTotal], [0, 1], { ...CLAMP, easing: FRENA });

  // PANEL 3
  const u1 = entra(frame, F.panel3);
  const u2 = entra(frame, F.unidad);
  const u3 = entra(frame, F.nota);

  const L1 = LAYOUT.panel1;
  const L2 = LAYOUT.panel2;
  const L3 = LAYOUT.panel3;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {velo > 0 && <AbsoluteFill style={{ backgroundColor: LUXUR.color.negro, opacity: velo }} />}
      {veloAbajo > 0 && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(0deg, rgba(0,0,0,${a0}) 0%, rgba(0,0,0,${a1}) 58%, rgba(0,0,0,${a2}) 76%)`,
            opacity: veloAbajo,
          }}
        />
      )}

      {/* ── PANEL 1 · la cuenta ── */}
      {v1 > 0 && (
        <>
          <Caja arriba={L1[0].arriba} p={e1} vida={v1}>
            <Etiqueta>{ETIQUETAS.tarifa}</Etiqueta>
            <Valor>${pesos(CIFRAS.tarifa)}</Valor>
          </Caja>
          <Caja arriba={L1[1].arriba} p={e2} vida={v1}>
            <Etiqueta>{ETIQUETAS.ocupacion}</Etiqueta>
            <Valor>{CIFRAS.ocupacion} %</Valor>
            <div style={{ position: "relative", marginTop: 12, width: COLUMNA.ancho, height: 10, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.22)" }}>
              <div style={{ width: COLUMNA.ancho * barra, height: 10, borderRadius: 5, backgroundColor: ORO }} />
            </div>
          </Caja>
          <Caja arriba={L1[2].arriba} p={e3} vida={v1}>
            <Etiqueta>{ETIQUETAS.noches}</Etiqueta>
            <Valor>{decimal(CIFRAS.noches)}</Valor>
          </Caja>
          <Filete arriba={L1[3].arriba} p={filete1} vida={v1} />
          <Caja arriba={L1[4].arriba} p={e4} vida={v1}>
            <div style={{ ...heroe, fontSize: PX.heroeEtiqueta }}>{ETIQUETAS.ingresos}</div>
            <div style={{ ...cifra, fontSize: PX.heroeValor, marginTop: 4 }}>${pesos(CIFRAS.ingresos)}</div>
          </Caja>
        </>
      )}

      {/* ── PANEL 2 · los gastos ── */}
      {v2 > 0 && (
        <>
          <Caja arriba={L2[0].arriba} p={g1} vida={v2}>
            <Etiqueta>{ETIQUETAS.administracion}</Etiqueta>
            <Valor>−${pesos(CIFRAS.administracion)}</Valor>
          </Caja>
          <Caja arriba={L2[1].arriba} p={g2} vida={v2}>
            <Etiqueta>{ETIQUETAS.servicios}</Etiqueta>
            <Valor>−${pesos(CIFRAS.servicios)}</Valor>
          </Caja>
          <Filete arriba={L2[2].arriba} p={filete2} vida={v2} />
          <Caja arriba={L2[3].arriba} p={g3} vida={v2}>
            <div style={{ ...heroe, fontSize: PX.heroeEtiqueta }}>{ETIQUETAS.gastos}</div>
            <div style={{ ...cifra, fontSize: PX.heroeValor, marginTop: 4 }}>−${pesos(CIFRAS.gastos)}</div>
          </Caja>
        </>
      )}

      {/* ── PANEL 3 · la utilidad, sobre la vista ── */}
      {v3 > 0 && (
        <>
          <Caja arriba={L3[0].arriba} p={u1} vida={v3}>
            <div style={{ ...heroe, fontSize: PX.utilEtiqueta, textShadow: SOMBRA }}>{ETIQUETAS.utilidad}</div>
          </Caja>
          <Caja arriba={L3[1].arriba} p={u1} vida={v3}>
            <div style={{ ...cifra, fontSize: PX.utilValor, marginTop: 4, textShadow: SOMBRA }}>${pesos(CIFRAS.utilidad)}</div>
          </Caja>
          <Caja arriba={L3[2].arriba} p={u2} vida={v3}>
            <Etiqueta color={LUXUR.color.blanco} px={PX.unidad} sombra={SOMBRA}>
              {UNIDAD}
            </Etiqueta>
          </Caja>
          <Caja arriba={L3[3].arriba} p={u3} vida={v3}>
            <div style={{ ...base, fontWeight: letra.base.peso, fontSize: PX.nota, lineHeight: 1.3, opacity: 0.92, textShadow: SOMBRA }}>{NOTA}</div>
          </Caja>
        </>
      )}
    </AbsoluteFill>
  );
};
