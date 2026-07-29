import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import { EASE, MG, SPRING } from "./motion";

/**
 * Motion graphics sincronizados al guion (proyecto 001, avatar 9:16, 25fps).
 * Todo en la franja SUPERIOR (ventana, sobre la cara), 1 gráfico a la vez.
 * Frames absolutos de la composición (0..1091). Ver plan en aprendizajes.
 */

const C = {
  ...MG,
  ink: "rgba(11,17,32,0.66)",
  gray: "rgba(148,163,184,0.95)",
};
const SHADOW = "0 2px 12px rgba(0,0,0,0.7)";

const Slot: React.FC<{
  top: number;
  opacity: number;
  translateY?: number;
  scale?: number;
  children: React.ReactNode;
}> = ({ top, opacity, translateY = 0, scale = 1, children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      fontFamily: theme.fontFamily,
    }}
  >
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: C.ink,
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 30,
      padding: "24px 40px",
      boxShadow: "0 12px 44px rgba(0,0,0,0.4)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      ...style,
    }}
  >
    {children}
  </div>
);

const bigNum: React.CSSProperties = {
  fontSize: 150,
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: -2,
  textShadow: SHADOW,
  fontVariantNumeric: "tabular-nums",
};
const labelStyle: React.CSSProperties = {
  fontSize: 34,
  fontWeight: 700,
  color: C.white,
  textShadow: SHADOW,
  marginTop: 6,
  letterSpacing: 1,
};

/* ── Beats 1-3: contador-héroe 0→200→3→0 (f0-508) ── */
const HeroCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 0 || frame > 508) return null;

  let n: number;
  if (frame < 70) n = interpolate(frame, [14, 70], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  else if (frame < 272) n = 200;
  else if (frame < 286) n = interpolate(frame, [272, 286], [200, 3], { easing: EASE.outCubic, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  else if (frame < 392) n = 3;
  else if (frame < 420) n = interpolate(frame, [392, 420], [3, 0], { easing: EASE.inOutCubic, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  else n = 0;
  n = Math.round(n);

  const label = frame < 272 ? "Clics del anuncio" : frame < 392 ? "Leads contestados" : "Visitas agendadas";
  const arrowDown = frame >= 272;
  const color = frame < 272 ? C.green : frame < 392 ? C.white : C.cyan;

  const e = spring({ frame, fps, config: SPRING.contador });
  const enterTy = interpolate(e, [0, 1], [-50, 0]);
  const enterOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const exitOp = interpolate(frame, [490, 508], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitTy = interpolate(frame, [490, 508], [0, -40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const holding = (frame > 72 && frame < 270) || (frame > 300 && frame < 390) || (frame > 436 && frame < 488);
  const pulse = holding ? 1 + 0.02 * Math.sin(frame / 6) : 1;
  const punch3 = frame >= 286 && frame < 300 ? interpolate(spring({ frame: frame - 286, fps, config: SPRING.punch }), [0, 1], [1.18, 1]) : 1;
  const punch0 = frame >= 420 && frame < 436 ? interpolate(spring({ frame: frame - 420, fps, config: SPRING.punch }), [0, 1], [1.14, 1]) : 1;

  return (
    <Slot top={110} opacity={enterOp * exitOp} translateY={enterTy + exitTy} scale={pulse}>
      <Card style={{ minWidth: 360 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, transform: `scale(${punch3 * punch0})` }}>
          <span style={{ fontSize: 56, color, textShadow: SHADOW, transform: "translateY(-6px)" }}>
            {arrowDown ? "▼" : "▲"}
          </span>
          <span style={{ ...bigNum, color }}>{n}</span>
        </div>
        <span style={labelStyle}>{label}</span>
      </Card>
    </Slot>
  );
};

/* ── Beat 4: WhatsApp visto sin respuesta (f515-652) ── */
const ChatBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 515 || frame > 652) return null;
  const f = frame - 515;
  const e = spring({ frame: f, fps, config: SPRING.tarjeta });
  const enterTy = interpolate(e, [0, 1], [48, 0]);
  const enterOp = interpolate(f, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const exitOp = interpolate(frame, [640, 652], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const checkColor = interpolateColors(frame, [537, 560], [C.teal, "#9aa0a6"]);
  const shake = frame > 560 && frame < 630 ? Math.sin(frame / 4) * 3 : 0;

  return (
    <Slot top={120} opacity={enterOp * exitOp} translateY={enterTy}>
      <div style={{ transform: `translateX(${shake}px)`, width: 760 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: C.teal }} />
          <span style={{ color: C.white, fontSize: 30, fontWeight: 700, textShadow: SHADOW }}>Lead nuevo</span>
        </div>
        <div style={{ background: C.white, borderRadius: "6px 24px 24px 24px", padding: "22px 26px", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
          <span style={{ color: "#0b1120", fontSize: 38, fontWeight: 600, lineHeight: 1.25 }}>
            Hola, ¿sigue disponible? Quiero info
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.ink, padding: "8px 18px", borderRadius: 999 }}>
            <span style={{ color: checkColor, fontSize: 30, fontWeight: 800 }}>✓✓</span>
            <span style={{ color: "#e2e8f0", fontSize: 26, fontWeight: 700 }}>Visto · Sin respuesta</span>
          </div>
        </div>
      </div>
    </Slot>
  );
};

/* ── Beat 5: timer 5:00→0:00 + flip TUYO/DE OTRO (f659-795) ── */
const UrgencyTimer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 659 || frame > 795) return null;
  const f = frame - 659;
  const e = spring({ frame: f, fps, config: SPRING.entrada });
  const enterTy = interpolate(e, [0, 1], [-130, 0]);
  const enterOp = interpolate(f, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const exitOp = interpolate(frame, [784, 795], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const secs = Math.round(interpolate(frame, [676, 772], [300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");
  const color = interpolateColors(secs, [0, 30, 120, 300], [C.red, C.amber, C.green, C.teal]);
  const urgency = frame >= 742 ? 1 + 0.03 * Math.sin((frame - 742) / 2) : 1;

  const R = 108;
  const SZ = 250;
  const CIRC = 2 * Math.PI * R;
  const prog = secs / 300;

  const rot = frame >= 770 ? interpolate(spring({ frame: frame - 770, fps, config: SPRING.flip }), [0, 1], [0, 180]) : 0;

  return (
    <Slot top={18} opacity={enterOp * exitOp} translateY={enterTy} scale={urgency}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative", width: SZ, height: SZ }}>
          <svg width={SZ} height={SZ} style={{ position: "absolute", inset: 0 }}>
            <circle cx={SZ / 2} cy={SZ / 2} r={R} stroke="rgba(255,255,255,0.14)" strokeWidth={14} fill="none" />
            <circle
              cx={SZ / 2}
              cy={SZ / 2}
              r={R}
              stroke={color}
              strokeWidth={14}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - prog)}
              transform={`rotate(-90 ${SZ / 2} ${SZ / 2})`}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 82, fontWeight: 800, color, textShadow: SHADOW, fontVariantNumeric: "tabular-nums" }}>
              {mm}:{ss}
            </span>
          </div>
        </div>

        {/* flip chip */}
        <div style={{ perspective: 700, height: 62 }}>
          <div style={{ position: "relative", width: 280, height: 62, transformStyle: "preserve-3d", transform: `rotateX(${rot}deg)` }}>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: C.green, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#08251f", fontSize: 32, fontWeight: 800, letterSpacing: 2 }}>TUYO</span>
            </div>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateX(180deg)", background: C.gray, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#1f2937", fontSize: 32, fontWeight: 800, letterSpacing: 2, textDecoration: "line-through" }}>DE OTRO</span>
            </div>
          </div>
        </div>
      </div>
    </Slot>
  );
};

/* ── Beat 6: contador competencia 0→200 (f795-957) ── */
const CompetidorCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 795 || frame > 957) return null;
  const f = frame - 795;
  const e = spring({ frame: f, fps, config: SPRING.contador });
  const enterTy = interpolate(e, [0, 1], [36, 0]);
  const enterOp = interpolate(f, [0, 17], [0, 1], { extrapolateRight: "clamp" });
  const exitOp = interpolate(frame, [938, 957], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const n = Math.round(interpolate(frame, [812, 870], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic }));
  const pulse = frame >= 868 && frame < 884 ? interpolate(spring({ frame: frame - 868, fps, config: SPRING.pulso }), [0, 1], [1.06, 1]) : 1;

  return (
    <Slot top={120} opacity={enterOp * exitOp} translateY={enterTy} scale={pulse}>
      <Card style={{ minWidth: 360 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 52, color: C.cyan, textShadow: SHADOW, transform: "translateY(-6px)" }}>▲</span>
          <span style={{ ...bigNum, color: C.white }}>{n}</span>
        </div>
        <span style={labelStyle}>Leads captados · tu competencia</span>
      </Card>
    </Slot>
  );
};

/* ── Beat 7: botón Seguir→Siguiendo (f960-fin) ── */
const FollowButton: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 960) return null;
  const f = frame - 960;
  const e = spring({ frame: f, fps, config: SPRING.cta });
  const scaleIn = interpolate(e, [0, 1], [0.85, 1]);
  const enterTy = interpolate(e, [0, 1], [28, 0]);
  const enterOp = interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const fillMix = interpolate(f, [48, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tapScale = f >= 45 && f < 58 ? interpolate(spring({ frame: f - 45, fps, config: SPRING.tap }), [0, 0.5, 1], [1, 0.92, 1]) : 1;
  const seguirOp = interpolate(f, [50, 58], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const siguiendoOp = interpolate(f, [56, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bg = interpolateColors(fillMix, [0, 1], ["rgba(15,118,110,0)", "#0f9e8f"]);
  const borderCol = interpolateColors(fillMix, [0, 1], [C.teal, C.cyan]);
  const burst = f >= 52 && f < 72 ? interpolate(f, [52, 72], [0, 1]) : -1;

  return (
    <Slot top={150} opacity={enterOp} translateY={enterTy} scale={scaleIn}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", transform: `scale(${tapScale})` }}>
          {burst >= 0 ? (
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `3px solid ${C.cyan}`, transform: `scale(${interpolate(burst, [0, 1], [0.9, 1.6])})`, opacity: interpolate(burst, [0, 1], [0.5, 0]) }} />
          ) : null}
          <div style={{ padding: "22px 60px", borderRadius: 999, border: `3px solid ${borderCol}`, background: bg, position: "relative", minWidth: 320, textAlign: "center" }}>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: seguirOp, color: C.white, fontSize: 40, fontWeight: 800, textShadow: SHADOW }}>
              Seguir
            </span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: siguiendoOp, color: C.white, fontSize: 40, fontWeight: 800, textShadow: SHADOW }}>
              Siguiendo ✓
            </span>
          </div>
        </div>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 28, fontWeight: 600, textShadow: SHADOW }}>@jalvarez.tech</span>
      </div>
    </Slot>
  );
};

export const MotionGraphics: React.FC = () => (
  <AbsoluteFill>
    <HeroCounter />
    <ChatBubble />
    <UrgencyTimer />
    <CompetidorCounter />
    <FollowButton />
  </AbsoluteFill>
);
