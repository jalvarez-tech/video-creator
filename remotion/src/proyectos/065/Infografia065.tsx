import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import { COLUMNA, DUR, ETIQUETAS, F, LAYOUT, ORO, PX, TRACKING_ETIQUETA, VALORES, VELO } from "./infografia-065";

/**
 * LA INFOGRAFÍA DEL 065 (encargo del usuario, 2026-10-22; datos, tiempos y por qué en `infografia-065.ts`): LA FICHA del lote, un panel que cae sobre el vuelo de DR04 justo después de «ven, te muestro». Todo desde
 * `useCurrentFrame()` (determinista).
 *
 * Como la de la 060 (rev. 2: «no hagas animación en los números para que puedan estar más tiempo, solo ponlos uno a uno con el valor completo»): las cifras NO se animan —no hay recuento, ni subida, ni latido—: cada una
 * entra con su valor COMPLETO, con un fundido de `DUR.entrada` f, y se queda hasta que se va el panel. Lo único que se mueve es el filete dorado (un gráfico, no un número).
 *
 *   ÁREA → PRECIO NEGOCIABLE → DERECHO DE ACUEDUCTO → Escrituras 100 % (héroe)
 *
 * Cada elemento entra en un golpe medido de la canción (`F`). Z-order: sobre los planos y el fundido de cierre, bajo los subtítulos (que aquí no coinciden: ella no habla).
 */

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FRENA = Easing.out(Easing.cubic);

/** Opacidad 0→1 de un elemento que entra en `golpe` (un fundido corto y nada más). */
const entra = (frame: number, golpe: number, dur: number = DUR.entrada): number => interpolate(frame, [golpe, golpe + dur], [0, 1], CLAMP);

const letra = letraSubtitulosDe(LUXUR);

const base = { fontFamily: letra.base.familia, fontStyle: "normal", fontSynthesis: "none", color: LUXUR.color.blanco, margin: 0 } as const;
const cifra = { ...base, fontFamily: letra.dato.familia, fontWeight: letra.dato.peso, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", lineHeight: 1.05, whiteSpace: "nowrap" } as const;
const heroe = { ...base, fontFamily: letra.acento.familia, fontWeight: letra.acento.peso, fontStyle: "italic", lineHeight: 1.2, whiteSpace: "nowrap" } as const;

/** Un bloque de la infografía: su caja absoluta, con su fundido de entrada y el del panel. */
const Caja: React.FC<{ arriba: number; p: number; vida: number; children: React.ReactNode }> = ({ arriba, p, vida, children }) => (
  <div style={{ position: "absolute", top: arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho, opacity: p * vida }}>{children}</div>
);

const Etiqueta: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ ...base, fontWeight: letra.base.peso, fontSize: PX.etiqueta, lineHeight: 1.2, letterSpacing: `${TRACKING_ETIQUETA}em`, textTransform: "uppercase", color: ORO, whiteSpace: "nowrap" }}>{children}</div>
);

/** La cifra de una fila: 88 px. */
const Valor: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ ...cifra, fontSize: PX.valor, marginTop: 6 }}>{children}</div>;

export const Infografia065: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < F.velo || frame > F.fin) return null;

  // El panel vive hasta `fin` y se va con un fundido de `DUR.salida` f.
  const vida = interpolate(frame, [F.fin - DUR.salida, F.fin], [1, 0], CLAMP);
  // El velo: sube hasta la primera cifra y baja con el panel.
  const velo = interpolate(frame, [F.velo, F.area], [0, VELO.panel], CLAMP) * interpolate(frame, [F.fin - VELO.baja, F.fin], [1, 0], CLAMP);

  const e1 = entra(frame, F.area);
  const e2 = entra(frame, F.precio);
  const e3 = entra(frame, F.acueducto);
  const e4 = entra(frame, F.escrituras);
  const filete = interpolate(frame, [F.escrituras - DUR.filete, F.escrituras], [0, 1], { ...CLAMP, easing: FRENA });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {velo > 0 && <AbsoluteFill style={{ backgroundColor: LUXUR.color.negro, opacity: velo }} />}
      <Caja arriba={LAYOUT[0].arriba} p={e1} vida={vida}>
        <Etiqueta>{ETIQUETAS.area}</Etiqueta>
        <Valor>{VALORES.area}</Valor>
      </Caja>
      <Caja arriba={LAYOUT[1].arriba} p={e2} vida={vida}>
        <Etiqueta>{ETIQUETAS.precio}</Etiqueta>
        <Valor>{VALORES.precio}</Valor>
      </Caja>
      <Caja arriba={LAYOUT[2].arriba} p={e3} vida={vida}>
        <Etiqueta>{ETIQUETAS.acueducto}</Etiqueta>
        <Valor>{VALORES.acueducto}</Valor>
      </Caja>
      <div style={{ position: "absolute", top: LAYOUT[3].arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho * filete, height: 2, backgroundColor: ORO, opacity: vida }} />
      <Caja arriba={LAYOUT[4].arriba} p={e4} vida={vida}>
        <div style={{ ...heroe, fontSize: PX.heroeEtiqueta }}>{ETIQUETAS.escrituras}</div>
        <div style={{ ...cifra, fontSize: PX.heroeValor, marginTop: 4 }}>{VALORES.escrituras}</div>
      </Caja>
    </AbsoluteFill>
  );
};
