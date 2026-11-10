import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import { COLUMNA, DUR, F, LAYOUT, ORO, PX, TEXTOS_INFO, TRACKING_ETIQUETA, VELO } from "./infografia-064";

/**
 * LA INFOGRAFÍA DEL 064 (encargo del usuario, 2026-10-22; datos, tiempos y por qué en `infografia-064.ts`): las distancias del lote —1 hora de Medellín y 15 minutos de la autopista Medellín-Bogotá— que entran sobre el
 * dron tras «ven, te muestro». Todo desde `useCurrentFrame()` (determinista).
 *
 * Las cifras NO se animan (pedido del usuario en el 060: «no hagas animación en los números, solo ponlos uno a uno con el valor completo»): cada una entra con su valor COMPLETO, con un fundido de `DUR.entrada` f, y se
 * queda. Lo único que se mueve es el filete dorado (un gráfico, no un número).
 *
 * Z-order: sobre los planos y el fundido de cierre, bajo los subtítulos (que aquí no coinciden: ella no habla).
 */

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FRENA = Easing.out(Easing.cubic);

/** Opacidad 0→1 de un elemento que entra en `golpe` (un fundido corto y nada más). */
const entra = (frame: number, golpe: number, dur: number = DUR.entrada): number => interpolate(frame, [golpe, golpe + dur], [0, 1], CLAMP);

const letra = letraSubtitulosDe(LUXUR);
/** La sombra de texto de la marca: ayuda al blanco sobre el dron bajo el velo. */
const SOMBRA = LUXUR.sombra.texto;

const base = { fontFamily: letra.base.familia, fontStyle: "normal", fontSynthesis: "none", color: LUXUR.color.blanco, margin: 0 } as const;
const cifra = { ...base, fontFamily: letra.dato.familia, fontWeight: letra.dato.peso, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", lineHeight: 1.05, whiteSpace: "nowrap" } as const;
const heroe = { ...base, fontFamily: letra.acento.familia, fontWeight: letra.acento.peso, fontStyle: "italic", lineHeight: 1.2, whiteSpace: "nowrap" } as const;

/** Un bloque de la infografía: su caja absoluta, con su fundido de entrada y el de toda la infografía. */
const Caja: React.FC<{ arriba: number; p: number; vida: number; children: React.ReactNode }> = ({ arriba, p, vida, children }) => (
  <div style={{ position: "absolute", top: arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho, opacity: p * vida }}>{children}</div>
);

export const Infografia064: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < F.inicio || frame > F.fin) return null;

  // La vida de toda la infografía: 1 mientras dura y 0 tras su fundido de salida.
  const vida = interpolate(frame, [F.fin - DUR.salida, F.fin + 1], [1, 0], CLAMP);
  // El velo: entra con el primer plano de dron (rampa) y se va con la infografía.
  const velo = interpolate(frame, [F.inicio, F.inicio + VELO.rampa], [0, VELO.panel], CLAMP) * vida;
  const alto = VELO.abajo - VELO.arriba;
  const borde = (VELO.borde / alto) * 100;

  const e1 = entra(frame, F.hora);
  const e2 = entra(frame, F.autopista);
  const e3 = entra(frame, F.pie);
  const filete = interpolate(frame, [F.autopista - DUR.filete, F.autopista], [0, 1], { ...CLAMP, easing: FRENA });

  const [fila, linea, hero, pie] = LAYOUT;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {velo > 0 && (
        <div
          style={{
            position: "absolute",
            top: VELO.arriba,
            left: 0,
            width: "100%",
            height: alto,
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,${VELO.panel}) ${borde}%, rgba(0,0,0,${VELO.panel}) ${100 - borde}%, rgba(0,0,0,0) 100%)`,
            opacity: vida * Math.min(1, velo / VELO.panel),
          }}
        />
      )}

      {/* ── la fila: De Medellín · 1 hora ── */}
      <Caja arriba={fila.arriba} p={e1} vida={vida}>
        <div
          style={{
            ...base,
            fontWeight: letra.base.peso,
            fontSize: PX.etiqueta,
            lineHeight: 1.2,
            letterSpacing: `${TRACKING_ETIQUETA}em`,
            textTransform: "uppercase",
            color: ORO,
            whiteSpace: "nowrap",
            textShadow: SOMBRA,
          }}
        >
          {TEXTOS_INFO.etiqueta}
        </div>
        <div style={{ ...cifra, fontSize: PX.valor, marginTop: 6, textShadow: SOMBRA }}>{TEXTOS_INFO.valorHora}</div>
      </Caja>

      {/* ── el filete dorado, de izquierda a derecha ── */}
      <div style={{ position: "absolute", top: linea.arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho * filete, height: 2, backgroundColor: ORO, opacity: vida }} />

      {/* ── el héroe: De la autopista Medellín-Bogotá · 15 minutos ── */}
      <Caja arriba={hero.arriba} p={e2} vida={vida}>
        <div style={{ ...heroe, fontSize: PX.heroeEtiqueta, textShadow: SOMBRA }}>{TEXTOS_INFO.heroe}</div>
        <div style={{ ...cifra, fontSize: PX.heroeValor, marginTop: 4, textShadow: SOMBRA }}>{TEXTOS_INFO.valorMinutos}</div>
      </Caja>

      {/* ── el pie ── */}
      <Caja arriba={pie.arriba} p={e3} vida={vida}>
        <div style={{ ...base, fontWeight: letra.base.peso, fontSize: PX.pie, lineHeight: 1.3, opacity: 0.92, textShadow: SOMBRA }}>{TEXTOS_INFO.pie}</div>
      </Caja>
    </AbsoluteFill>
  );
};
