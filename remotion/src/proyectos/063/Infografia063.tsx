import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { LUXUR } from "../../marcas/luxur";
import { letraSubtitulosDe } from "../../motor/subtitulos-editoriales";
import {
  CHECK,
  COLUMNA,
  DUR,
  F,
  GAP_TRIADA,
  ITEMS,
  LAYOUT,
  LAYOUT_TRIADA,
  ORO,
  PX,
  TITULO,
  TRACKING_ETIQUETA,
  TRACKING_TRIADA,
  TRIADA,
  TRIADA_F,
  VELO,
} from "./infografia-063";

/**
 * LA INFOGRAFÍA DEL 063 (encargo del usuario, 2026-10-22; datos, tiempos y por qué en `infografia-063.ts`). Dos escenas, las dos desde `useCurrentFrame()` (determinista):
 *
 *   1 · «Lo que sí tiene» sobre el dron, justo después de «ven, te enseño cómo evitar esto»: un velo negro (42 % en los bordes, 68 % detrás de la lista), el título en la letra de acento de la marca con su filete dorado y, uno a uno, tres ✔
 *       (derecho de acueducto · escrituras al 100 % · 3.244 m²), cada uno con su rótulo dorado. Solo datos de la ficha de la web.
 *   2 · UBICACIÓN · AGUA · ESCRITURAS sobre la mitad: una fila por debajo de las manos de Isabella y encima de los subtítulos; cada palabra aparece cuando ella la dice y se quedan las tres hasta el final de la frase.
 *
 * SIN ANIMAR LAS CIFRAS (pedido del usuario en la 060, «no hagas animación en los números, solo ponlos uno a uno con el valor completo»): nada se cuenta, sube, late ni se desliza; cada elemento entra con su valor COMPLETO
 * con un fundido de `DUR.entrada` f y se queda hasta que se va su escena. Lo único que se dibuja es el filete dorado (un gráfico, no un número). Z-order: sobre los planos y el fundido de cierre, bajo los subtítulos.
 */

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FRENA = Easing.out(Easing.cubic);

/** Opacidad 0→1 de un elemento que entra en `golpe` (un fundido corto y nada más). */
const entra = (frame: number, golpe: number, dur: number = DUR.entrada): number => interpolate(frame, [golpe, golpe + dur], [0, 1], CLAMP);

/** Opacidad de una escena: 1 mientras vive y 0 tras su fundido de salida (que acaba en `fin`). */
const vive = (frame: number, fin: number): number => interpolate(frame, [fin - DUR.salida, fin], [1, 0], CLAMP);

const letra = letraSubtitulosDe(LUXUR);
/** La sombra de texto del canal. En la lista la sostiene el velo del 50 %; en los rótulos de la mitad, el velo local y esta sombra. */
const SOMBRA = LUXUR.sombra.texto;

const base = { fontFamily: letra.base.familia, fontStyle: "normal", fontSynthesis: "none", color: LUXUR.color.blanco, margin: 0 } as const;
const cifra = { ...base, fontFamily: letra.dato.familia, fontWeight: letra.dato.peso, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", lineHeight: 1.05, whiteSpace: "nowrap" } as const;
const titulo = { ...base, fontFamily: letra.acento.familia, fontWeight: letra.acento.peso, fontStyle: "italic", lineHeight: 1.2, whiteSpace: "nowrap" } as const;

/** Un bloque de la lista: su caja absoluta, con su fundido de entrada y el de su escena. */
const Caja: React.FC<{ arriba: number; p: number; vida: number; children: React.ReactNode }> = ({ arriba, p, vida, children }) => (
  <div style={{ position: "absolute", top: arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho, opacity: p * vida }}>{children}</div>
);

/** El ✔ dorado: un círculo y su marca, quietos (entran con la fila). */
const Check: React.FC = () => (
  <svg width={CHECK.lado} height={CHECK.lado} viewBox="0 0 44 44" style={{ flex: "none" }}>
    <circle cx="22" cy="22" r="20" fill="none" stroke={ORO} strokeWidth="2.5" />
    <path d="M12.5 23.5 L19.5 30.5 L32 14.5" fill="none" stroke={ORO} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Una fila de la lista: el ✔ a la izquierda, el rótulo dorado en versalitas y el valor en la letra de las cifras. */
const Fila: React.FC<{ rotulo: string; texto: string }> = ({ rotulo, texto }) => (
  <div style={{ display: "flex", alignItems: "center", gap: CHECK.aire }}>
    <Check />
    <div>
      <div style={{ ...base, fontWeight: letra.base.peso, fontSize: PX.rotulo, lineHeight: 1.2, letterSpacing: `${TRACKING_ETIQUETA}em`, textTransform: "uppercase", color: ORO, whiteSpace: "nowrap" }}>{rotulo}</div>
      <div style={{ ...cifra, fontSize: PX.valor, marginTop: 6 }}>{texto}</div>
    </div>
  </div>
);

export const Infografia063: React.FC = () => {
  const frame = useCurrentFrame();
  const enLista = frame >= F.inicio && frame <= F.fin;
  const enTriada = frame >= TRIADA_F.ubicacion && frame <= TRIADA_F.fin;
  if (!enLista && !enTriada) return null;

  // ── ESCENA 1 · la lista ──
  const vida = vive(frame, F.fin + 1);
  const velo = interpolate(frame, [F.inicio, F.inicio + VELO.rampa], [0, 1], CLAMP) * vida;
  const eTitulo = entra(frame, F.inicio);
  const filete = interpolate(frame, [F.inicio, F.inicio + DUR.filete], [0, 1], { ...CLAMP, easing: FRENA });
  const entradas = [entra(frame, F.acueducto), entra(frame, F.escrituras), entra(frame, F.area)];

  // ── ESCENA 2 · los rótulos de la mitad ──
  const vidaT = vive(frame, TRIADA_F.fin + 1);
  const palabras = [entra(frame, TRIADA_F.ubicacion), entra(frame, TRIADA_F.agua), entra(frame, TRIADA_F.escrituras)];
  const veloT = Math.max(...palabras) * vidaT;

  const L = LAYOUT;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {enLista && (
        <>
          {velo > 0 && (
            <AbsoluteFill
              style={{
                background: `linear-gradient(180deg, rgba(0,0,0,${VELO.lista.borde}) 0%, rgba(0,0,0,${VELO.lista.centro}) 28%, rgba(0,0,0,${VELO.lista.centro}) 72%, rgba(0,0,0,${VELO.lista.borde}) 100%)`,
                opacity: velo,
              }}
            />
          )}
          <Caja arriba={L[0].arriba} p={eTitulo} vida={vida}>
            <div style={{ ...titulo, fontSize: PX.titulo }}>{TITULO}</div>
          </Caja>
          <div style={{ position: "absolute", top: L[1].arriba, left: COLUMNA.izquierda, width: COLUMNA.ancho * filete, height: 2, backgroundColor: ORO, opacity: vida }} />
          {ITEMS.map((x, i) => (
            <Caja key={x.id} arriba={L[2 + i].arriba} p={entradas[i]} vida={vida}>
              <Fila rotulo={x.rotulo} texto={x.texto} />
            </Caja>
          ))}
        </>
      )}

      {enTriada && (
        <>
          {/* El velo local: una mancha oscura y suave detrás de la fila, sin caja (la imagen de Isabella sigue debajo). */}
          <div
            style={{
              position: "absolute",
              top: LAYOUT_TRIADA.arriba - 70,
              left: 0,
              width: 1080,
              height: LAYOUT_TRIADA.alto + 140,
              background: `radial-gradient(ellipse 54% 50% at 50% 50%, rgba(0,0,0,${VELO.triada}) 0%, rgba(0,0,0,${VELO.triada * 0.75}) 55%, rgba(0,0,0,0) 100%)`,
              opacity: veloT,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: LAYOUT_TRIADA.arriba,
              left: 0,
              width: 1080,
              height: LAYOUT_TRIADA.alto,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: GAP_TRIADA,
              whiteSpace: "nowrap",
            }}
          >
            {TRIADA.map((palabra, i) => (
              <div key={palabra} style={{ display: "flex", alignItems: "center", gap: GAP_TRIADA }}>
                {i > 0 && <span style={{ ...base, fontSize: PX.triada, color: ORO, opacity: palabras[i] * vidaT, textShadow: SOMBRA }}>·</span>}
                <span
                  style={{
                    ...base,
                    fontWeight: letra.dato.peso,
                    fontSize: PX.triada,
                    lineHeight: 1.2,
                    letterSpacing: `${TRACKING_TRIADA}em`,
                    textTransform: "uppercase",
                    opacity: palabras[i] * vidaT,
                    textShadow: SOMBRA,
                  }}
                >
                  {palabra}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
