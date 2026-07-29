import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import { EASE, SPRING } from "./motion";

/**
 * Motion graphics del proyecto 002 — dirección de arte estilo Apple.
 * Guía: manuales/motion-graphics/SKILL.md + director-video/SKILL.md.
 *
 * Principios Apple aplicados: mucho espacio negativo, tipografía grande y
 * apretada (tabular-nums en cifras), UNA idea por "statement", fondo casi-negro
 * con spotlight sutil, entradas con blur+escala SIN rebote (SPRING.contador),
 * un solo acento. Cada escena es un CORTE a pantalla completa (el avatar cede)
 * salvo los supers sobre el avatar (hook, mitos, tarjeta de comentario), que
 * viven en la franja superior fuera de la cara (R08).
 *
 * Frames absolutos @25 fps (comp 883 frames). El contenido se mantiene por
 * encima de la banda de subtítulos (y≈72%): las statements centran arriba.
 */

const AP = {
  bg: "#08090B",
  text: "#F5F5F7",
  muted: "rgba(245,245,247,0.60)",
  faint: "rgba(245,245,247,0.32)",
  line: "rgba(245,245,247,0.14)",
  mint: "#5EEAD4", // acento brillante (teal de marca, luminoso)
  amber: "#FF9F0A", // caliente
  cyan: "#64D2FF", // frío
  red: "#FF453A", // pérdida (el 0)
  card: "rgba(22,22,26,0.72)",
} as const;

const FONT = theme.fontFamily;

// ── Primitivos ──────────────────────────────────────────────────────────────

const Statement: React.FC<{ from: number; to: number; glow?: string; children: React.ReactNode }> = ({
  from,
  to,
  glow = "rgba(94,234,212,0.12)",
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const len = to - from;
  const op = interpolate(f, [0, 7, len - 8, len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const e = spring({ frame: f, fps, config: SPRING.contador });
  const scale = interpolate(e, [0, 1], [0.965, 1]);
  const blur = interpolate(f, [0, 9], [9, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: AP.bg, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: `radial-gradient(58% 44% at 50% 34%, ${glow}, transparent 62%)` }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 96, // centrado vertical real (ya no hay subtítulos que esquivar)
          opacity: op,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Col: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 30 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap, textAlign: "center" }}>
    {children}
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = AP.muted }) => (
  <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: 6, textTransform: "uppercase", color }}>
    {children}
  </span>
);

const Label: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = AP.muted }) => (
  <span style={{ fontSize: 46, fontWeight: 600, color, letterSpacing: 0.2 }}>{children}</span>
);

const Huge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = AP.text }) => (
  <span
    style={{
      fontSize: 340,
      fontWeight: 800,
      letterSpacing: -10,
      lineHeight: 0.9,
      color,
      fontVariantNumeric: "tabular-nums",
      textShadow: `0 0 70px ${color}55`,
    }}
  >
    {children}
  </span>
);

/** Degradado inferior sutil: legibilidad de los textos del avatar en el tercio inferior. */
const BottomScrim: React.FC<{ opacity: number; height?: number }> = ({ opacity, height = 620 }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height,
      background: "linear-gradient(0deg, rgba(0,0,0,0.82), rgba(0,0,0,0))",
      opacity,
    }}
  />
);

// ── Escenas ──────────────────────────────────────────────────────────────────

/* S1 · Hook — overline sobre el avatar (franja superior) 12–150 */
const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = 12;
  const to = 150;
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const len = to - from;
  const op = interpolate(f, [0, 10, len - 14, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ty = interpolate(spring({ frame: f, fps, config: SPRING.entrada }), [0, 1], [16, 0]);
  const rule = interpolate(f, [8, 30], [0, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  return (
    <>
      <BottomScrim opacity={op * 0.62} height={560} />
      <div style={{ position: "absolute", top: 1372, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: op, transform: `translateY(${ty}px)`, fontFamily: FONT }}>
        <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: 7, textTransform: "uppercase", color: AP.text, textShadow: "0 2px 18px rgba(0,0,0,0.8)" }}>
          Lo que pasa después del clic
        </span>
        <div style={{ height: 3, width: rule, background: AP.mint, borderRadius: 2, boxShadow: `0 0 22px ${AP.mint}` }} />
      </div>
    </>
  );
};

/* S2 · 200 (entran) 158–250 */
const S2_200: React.FC = () => {
  const frame = useCurrentFrame();
  const from = 158;
  const n = Math.round(interpolate(frame, [from + 8, from + 42], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic }));
  return (
    <Statement from={from} to={250} glow="rgba(94,234,212,0.12)">
      <Col>
        <Kicker>Pagas la pauta</Kicker>
        <Huge>{n}</Huge>
        <Label>personas entran a ver</Label>
      </Col>
    </Statement>
  );
};

/* S3 · 3 (escriben) 250–322 */
const S3_3: React.FC = () => (
  <Statement from={250} to={322} glow="rgba(94,234,212,0.10)">
    <Col gap={22}>
      <span style={{ fontSize: 40, fontWeight: 600, color: AP.faint, textDecoration: "line-through" }}>200 entran</span>
      <Huge color={AP.mint}>3</Huge>
      <Label>escriben por WhatsApp</Label>
    </Col>
  </Statement>
);

/* S4 · 0 (agendan) 322–408 — el golpe */
const S4_0: React.FC = () => (
  <Statement from={322} to={408} glow="rgba(255,69,58,0.16)">
    <Col gap={22}>
      <Kicker color={AP.faint}>y de esos 3…</Kicker>
      <Huge color={AP.red}>0</Huge>
      <Label color="rgba(255,120,112,0.9)">agendan una visita</Label>
    </Col>
  </Statement>
);

/* S5 · Mitos tachados — sobre el avatar (franja superior) 410–486 */
const Myth: React.FC<{ text: string; appear: number; strike: number }> = ({ text, appear, strike }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - appear;
  if (f < 0) return null;
  const op = interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const ty = interpolate(spring({ frame: Math.max(0, f), fps, config: SPRING.entrada }), [0, 1], [14, 0]);
  const sw = interpolate(frame, [strike, strike + 12], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  const dim = interpolate(frame, [strike + 4, strike + 16], [1, 0.42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", opacity: op * dim, transform: `translateY(${ty}px)` }}>
      <span style={{ fontSize: 54, fontWeight: 700, color: AP.text, letterSpacing: -1, textShadow: "0 2px 18px rgba(0,0,0,0.85)" }}>{text}</span>
      <div style={{ position: "absolute", top: "52%", left: 0, height: 5, width: `${sw}%`, background: AP.red, borderRadius: 3, boxShadow: `0 0 16px ${AP.red}` }} />
    </div>
  );
};
const S5Myths: React.FC = () => {
  const frame = useCurrentFrame();
  const from = 410;
  const to = 486;
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const len = to - from;
  const op = interpolate(f, [0, 8, len - 12, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <BottomScrim opacity={op * 0.85} height={640} />
      <div style={{ position: "absolute", top: 1330, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: op, fontFamily: FONT }}>
        <Myth text="No es el algoritmo" appear={from} strike={from + 20} />
        <Myth text="No es la demanda" appear={from + 26} strike={from + 46} />
      </div>
    </>
  );
};

/* S6a · Caliente → Frío 492–575 */
const S6Hot: React.FC = () => {
  const frame = useCurrentFrame();
  const from = 492;
  const to = 575;
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const frio = interpolate(f, [26, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barW = interpolate(f, [10, 46], [0, 420], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  const glow = interpolateColors(frio, [0, 1], ["rgba(255,159,10,0.16)", "rgba(100,210,255,0.16)"]);
  const op = interpolate(f, [0, 7, to - from - 8, to - from], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: AP.bg, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: `radial-gradient(58% 44% at 50% 34%, ${glow}, transparent 62%)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: op }}>
        <Col gap={26}>
          <Kicker>Tú envías tráfico</Kicker>
          <span style={{ fontSize: 118, fontWeight: 800, letterSpacing: -3, color: AP.amber, textShadow: `0 0 50px ${AP.amber}66` }}>CALIENTE</span>
          <div style={{ height: 8, width: barW, borderRadius: 999, background: `linear-gradient(90deg, ${AP.amber}, ${AP.cyan})`, boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }} />
          <span style={{ fontSize: 92, fontWeight: 800, letterSpacing: -2, color: AP.cyan, opacity: frio, transform: `translateY(${interpolate(frio, [0, 1], [10, 0])}px)`, textShadow: `0 0 50px ${AP.cyan}66` }}>
            a un sitio FRÍO
          </span>
        </Col>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S6b · Sin seguimiento 575–640 */
const S6NoFollow: React.FC = () => (
  <Statement from={575} to={640} glow="rgba(255,69,58,0.12)">
    <Col gap={24}>
      <span style={{ fontSize: 128, fontWeight: 800, letterSpacing: -3, color: AP.text, textShadow: "0 0 60px rgba(255,69,58,0.4)" }}>
        SIN SEGUIMIENTO
      </span>
      <Label color={AP.muted}>nadie detrás · el lead se enfría</Label>
    </Col>
  </Statement>
);

/* S7 · Pregunta CTA 645–786 */
const ChatGlyph: React.FC<{ size?: number; color?: string }> = ({ size = 46, color = AP.mint }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ filter: `drop-shadow(0 0 10px ${color}88)` }}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 12.5z" fill={color} />
  </svg>
);
/* La pregunta grande entra JUSTO tras "una pregunta honesta" (voz 640–680), no al
   inicio de la escena. El kicker sí sale con la voz; el big + label revelan en ~678. */
const S7Question: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = 640;
  const to = 786;
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const len = to - from;
  const op = interpolate(f, [0, 7, len - 8, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Reveal de la pregunta grande tras "una pregunta honesta" (frame 678 → f=38).
  const REVEAL = 38;
  const e = spring({ frame: Math.max(0, f - REVEAL), fps, config: SPRING.contador });
  const bigOp = interpolate(f, [REVEAL, REVEAL + 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bigY = interpolate(e, [0, 1], [30, 0]);
  const bigScale = interpolate(e, [0, 1], [0.9, 1]);
  const bigBlur = interpolate(f, [REVEAL, REVEAL + 11], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Label + glyph tras la pregunta.
  const LBL = REVEAL + 15;
  const lblOp = interpolate(f, [LBL, LBL + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lblY = interpolate(f, [LBL, LBL + 10], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });

  return (
    <AbsoluteFill style={{ background: AP.bg, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: "radial-gradient(58% 44% at 50% 34%, rgba(94,234,212,0.14), transparent 62%)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 96, opacity: op }}>
        <Col gap={34}>
          <Kicker>Una pregunta honesta</Kicker>
          <span
            style={{
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: AP.text,
              opacity: bigOp,
              transform: `translateY(${bigY}px) scale(${bigScale})`,
              filter: `blur(${bigBlur}px)`,
              transformOrigin: "center",
            }}
          >
            ¿Cuántos leads
            <br />
            <span style={{ color: AP.mint, textShadow: `0 0 50px ${AP.mint}55` }}>calificados</span>?
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: lblOp, transform: `translateY(${lblY}px)` }}>
            <ChatGlyph />
            <Label>llegan a tu WhatsApp</Label>
          </div>
        </Col>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S8 · Tarjeta de comentario — sobre el avatar (franja superior) 790–870 */
const S8Comment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = 790;
  const to = 870;
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const enter = spring({ frame: f, fps, config: SPRING.tarjeta });
  const ty = interpolate(enter, [0, 1], [26, 0]);
  const sc = interpolate(enter, [0, 1], [0.92, 1]);
  const op = interpolate(f, [0, 9, to - from - 10, to - from], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const caret = Math.floor(f / 9) % 2 === 0 ? 1 : 0; // parpadeo determinista
  const bump = f >= 30 && f < 44 ? interpolate(spring({ frame: f - 30, fps, config: SPRING.tap }), [0, 0.5, 1], [1, 0.94, 1]) : 1;
  return (
    <>
      <BottomScrim opacity={op * 0.78} height={760} />
      <div style={{ position: "absolute", bottom: 250, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, fontFamily: FONT }}>
      <div style={{ width: "100%", maxWidth: 720, background: AP.card, border: `1px solid ${AP.line}`, borderRadius: 30, padding: "30px 34px", boxShadow: "0 24px 60px rgba(0,0,0,0.55)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <ChatGlyph size={30} />
          <span style={{ fontSize: 27, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: AP.muted }}>Comentarios</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: `1px solid ${AP.line}`, borderRadius: 18, padding: "22px 26px" }}>
          <span style={{ fontSize: 42, fontWeight: 600, color: AP.muted }}>Escribe tu número real</span>
          <span style={{ width: 3, height: 44, background: AP.mint, opacity: caret, borderRadius: 2, boxShadow: `0 0 12px ${AP.mint}` }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, transform: `scale(${bump})` }}>
        <span style={{ fontSize: 52 }}>👇</span>
        <span style={{ fontSize: 46, fontWeight: 700, color: AP.text, textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>Déjalo en los comentarios</span>
      </div>
      </div>
    </>
  );
};

// ── Montaje ──────────────────────────────────────────────────────────────────

export const MotionApple002: React.FC = () => (
  <AbsoluteFill>
    <S1Hook />
    <S2_200 />
    <S3_3 />
    <S4_0 />
    <S5Myths />
    <S6Hot />
    <S6NoFollow />
    <S7Question />
    <S8Comment />
  </AbsoluteFill>
);
