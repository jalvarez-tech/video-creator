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
 * Motion graphics como CORTES A PANTALLA COMPLETA (fondo plano de marca +
 * animación relacionada). El avatar (y su voz) sigue debajo; cada escena lo
 * cubre en su ventana de frames y vuelve al avatar entre escenas.
 * Frames absolutos @25fps (comp 1091 frames).
 */

const C = {
  ...MG,
  ink: "#0a0f1c",
};
const SHADOW = "0 2px 14px rgba(0,0,0,0.6)";
const FONT = theme.fontFamily;

const Scene: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const f = frame - from;
  const len = to - from;
  const op = interpolate(f, [0, 5, len - 6, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 0.06 + 0.05 * Math.sin(frame / 12);
  return (
    <AbsoluteFill style={{ background: C.ink, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: `radial-gradient(56% 42% at 50% 26%, rgba(52,211,153,${glow}), transparent 62%)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: op, padding: 60 }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

const Big: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color = C.white, size = 210 }) => (
  <span style={{ fontSize: size, fontWeight: 800, color, textShadow: SHADOW, lineHeight: 1, letterSpacing: -3, fontVariantNumeric: "tabular-nums" }}>{children}</span>
);
const Label: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.white }) => (
  <span style={{ fontSize: 46, fontWeight: 700, color, textShadow: SHADOW, letterSpacing: 1, textAlign: "center" }}>{children}</span>
);
const Col: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 34 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap }}>{children}</div>
);

/* ── A · La fuga: 200 → 3 (f200-352) ── */
const SceneFunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame - 200;
  let n: number;
  if (lf < 45) n = interpolate(lf, [0, 45], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
  else if (lf < 100) n = 200;
  else if (lf < 122) n = interpolate(lf, [100, 122], [200, 3], { easing: EASE.outCubic, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  else n = 3;
  n = Math.round(n);
  const active = Math.max(1, Math.round(n / 5));
  const high = n > 10;
  return (
    <Scene from={200} to={330}>
      <Col gap={44}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 20px)", gap: 14, width: 326 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: 999, background: i < active ? C.green : "rgba(255,255,255,0.10)", transform: `scale(${i < active ? 1 : 0.65})` }} />
          ))}
        </div>
        <Col gap={10}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 60, color: high ? C.green : C.cyan, textShadow: SHADOW, transform: "translateY(-8px)" }}>{high ? "▲" : "▼"}</span>
            <Big color={high ? C.green : C.white}>{n}</Big>
          </div>
          <Label>{high ? "clics en tu anuncio" : "te responden de verdad"}</Label>
        </Col>
      </Col>
    </Scene>
  );
};

/* ── A2 · Celular: alguien manda «Hola, info» (f330-395) ── */
const ScenePhone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - 330;
  const chars = Math.round(interpolate(lf, [0, 12], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const typed = "Hola, info".slice(0, chars);
  const sent = lf >= 16;
  const bs = spring({ frame: lf - 16, fps, config: SPRING.entrada });
  const by = interpolate(bs, [0, 1], [70, 0]);
  const bOp = interpolate(lf, [16, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const checkOp = interpolate(lf, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursor = Math.floor(lf / 6) % 2 === 0 ? "|" : " ";
  return (
    <Scene from={330} to={395}>
      <div style={{ width: 470, height: 900, background: "#0f172a", border: "10px solid #1e293b", borderRadius: 58, boxShadow: "0 26px 74px rgba(0,0,0,0.55)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: C.teal, padding: "26px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,0.9)" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: C.white, fontSize: 28, fontWeight: 800 }}>Interesado</span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 20, fontWeight: 600 }}>en línea</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 14, background: "#0b1220" }}>
          {sent ? (
            <div style={{ alignSelf: "flex-end", maxWidth: "82%", transform: `translateY(${by}px)`, opacity: bOp }}>
              <div style={{ background: C.green, color: "#08251f", fontSize: 34, fontWeight: 700, padding: "18px 24px", borderRadius: "22px 22px 6px 22px" }}>Hola, info</div>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginTop: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}>13:52</span>
                <span style={{ color: C.cyan, fontSize: 24, opacity: checkOp }}>✓✓</span>
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ padding: 18, background: "#111827", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, background: "#1f2937", borderRadius: 999, padding: "16px 24px", color: sent ? "rgba(255,255,255,0.35)" : C.white, fontSize: 28, fontWeight: 600, minHeight: 30 }}>
            {sent ? "Mensaje" : typed + cursor}
          </div>
          <div style={{ width: 58, height: 58, borderRadius: 999, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#08251f", fontSize: 30, fontWeight: 900 }}>→</div>
        </div>
      </div>
    </Scene>
  );
};

/* ── B · 0 visitas agendadas (f395-468) ── */
const SceneZero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - 395;
  const n = Math.round(interpolate(lf, [6, 28], [3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOutCubic }));
  const x = spring({ frame: lf - 26, fps, config: SPRING.golpe });
  return (
    <Scene from={395} to={468}>
      <Col gap={40}>
        <div style={{ position: "relative", width: 300, height: 250, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.14)", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ height: 56, background: C.teal }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, padding: 22 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ height: 30, borderRadius: 8, background: "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: "50%", top: "58%", width: 260, height: 12, background: C.red, borderRadius: 999, transform: `translate(-50%,-50%) rotate(45deg) scaleX(${x})`, boxShadow: "0 0 18px rgba(239,68,68,0.6)" }} />
          <div style={{ position: "absolute", left: "50%", top: "58%", width: 260, height: 12, background: C.red, borderRadius: 999, transform: `translate(-50%,-50%) rotate(-45deg) scaleX(${x})`, boxShadow: "0 0 18px rgba(239,68,68,0.6)" }} />
        </div>
        <Col gap={8}>
          <Big color={C.cyan} size={190}>{n}</Big>
          <Label>visitas agendadas</Label>
        </Col>
      </Col>
    </Scene>
  );
};

/* ── C · WhatsApp visto sin respuesta (f520-660) ── */
const SceneWhats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - 520;
  const slide = spring({ frame: lf, fps, config: SPRING.entrada });
  const ty = interpolate(slide, [0, 1], [70, 0]);
  const checkColor = interpolateColors(lf, [45, 75], [C.teal, "#9aa0a6"]);
  const shake = lf > 80 && lf < 120 ? Math.sin(lf / 4) * 4 : 0;
  return (
    <Scene from={520} to={660}>
      <div style={{ width: 840, transform: `translateY(${ty}px) translateX(${shake}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <div style={{ width: 60, height: 60, borderRadius: 999, background: C.teal }} />
          <span style={{ color: C.white, fontSize: 40, fontWeight: 800, textShadow: SHADOW }}>Lead nuevo</span>
        </div>
        <div style={{ background: C.white, borderRadius: "8px 30px 30px 30px", padding: "30px 34px", boxShadow: "0 16px 50px rgba(0,0,0,0.4)" }}>
          <span style={{ color: "#0b1120", fontSize: 46, fontWeight: 600, lineHeight: 1.25 }}>Hola, ¿sigue disponible? Quiero info</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", padding: "12px 22px", borderRadius: 999 }}>
            <span style={{ color: checkColor, fontSize: 38, fontWeight: 800 }}>✓✓</span>
            <span style={{ color: "#e2e8f0", fontSize: 34, fontWeight: 700 }}>Visto · Sin respuesta</span>
          </div>
        </div>
      </div>
    </Scene>
  );
};

/* ── D · Timer 5:00→0:00 + flip TUYO/DE OTRO (f660-800) ── */
const SceneTimer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - 660;
  const secs = Math.round(interpolate(lf, [16, 112], [300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");
  const color = interpolateColors(secs, [0, 30, 120, 300], [C.red, C.amber, C.green, C.teal]);
  const urgency = lf >= 96 && lf < 112 ? 1 + 0.03 * Math.sin(lf / 2) : 1;
  const SZ = 460;
  const R = 205;
  const CIRC = 2 * Math.PI * R;
  const rot = lf >= 112 ? interpolate(spring({ frame: lf - 112, fps, config: SPRING.flip }), [0, 1], [0, 180]) : 0;
  return (
    <Scene from={660} to={800}>
      <Col gap={40}>
        <div style={{ position: "relative", width: SZ, height: SZ, transform: `scale(${urgency})` }}>
          <svg width={SZ} height={SZ} style={{ position: "absolute", inset: 0 }}>
            <circle cx={SZ / 2} cy={SZ / 2} r={R} stroke="rgba(255,255,255,0.12)" strokeWidth={20} fill="none" />
            <circle cx={SZ / 2} cy={SZ / 2} r={R} stroke={color} strokeWidth={20} fill="none" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - secs / 300)} transform={`rotate(-90 ${SZ / 2} ${SZ / 2})`} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 150, fontWeight: 800, color, textShadow: SHADOW, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss}</span>
            <span style={{ fontSize: 32, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: 2 }}>PARA RESPONDER</span>
          </div>
        </div>
        <div style={{ perspective: 900, height: 76 }}>
          <div style={{ position: "relative", width: 340, height: 76, transformStyle: "preserve-3d", transform: `rotateX(${rot}deg)` }}>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: C.green, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#08251f", fontSize: 40, fontWeight: 800, letterSpacing: 3 }}>TUYO</span>
            </div>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateX(180deg)", background: "rgba(148,163,184,0.95)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#1f2937", fontSize: 40, fontWeight: 800, letterSpacing: 3, textDecoration: "line-through" }}>DE OTRO</span>
            </div>
          </div>
        </div>
      </Col>
    </Scene>
  );
};

/* ── E · Competencia capta 200 (f800-905) ── */
const SceneCompetencia: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame - 800;
  const n = Math.round(interpolate(lf, [10, 68], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic }));
  const heights = [0.45, 0.62, 0.55, 0.78, 0.68, 0.95];
  return (
    <Scene from={800} to={905}>
      <Col gap={44}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 260 }}>
          {heights.map((h, i) => {
            const grow = interpolate(lf, [14 + i * 6, 44 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic });
            return <div key={i} style={{ width: 46, height: 260 * h * grow, borderRadius: "10px 10px 0 0", background: `linear-gradient(180deg, ${C.cyan}, ${C.green})` }} />;
          })}
        </div>
        <Col gap={8}>
          <Big color={C.white}>{n}</Big>
          <Label>leads para tu competencia</Label>
        </Col>
      </Col>
    </Scene>
  );
};

/* ── F · CTA OVERLAY sobre el avatar (f965-fin): vuelves a salir tú + botón encima ── */
const SceneFollow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < 965) return null;
  const lf = frame - 965;
  const enter = spring({ frame: lf, fps, config: SPRING.cta });
  const scaleIn = interpolate(enter, [0, 1], [0.85, 1]);
  const ty = interpolate(enter, [0, 1], [24, 0]);
  const enterOp = interpolate(lf, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const fillMix = interpolate(lf, [44, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tapScale = lf >= 40 && lf < 54 ? interpolate(spring({ frame: lf - 40, fps, config: SPRING.tap }), [0, 0.5, 1], [1, 0.9, 1]) : 1;
  const seguirOp = interpolate(lf, [46, 54], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const siguiendoOp = interpolate(lf, [52, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bg = interpolateColors(fillMix, [0, 1], ["rgba(15,118,110,0)", "#0f9e8f"]);
  const borderCol = interpolateColors(fillMix, [0, 1], [C.teal, C.cyan]);
  const burst = lf >= 48 && lf < 74 ? interpolate(lf, [48, 74], [0, 1]) : -1;
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* Overlay en la franja superior: el avatar (debajo) sigue visible */}
      <div style={{ position: "absolute", top: 118, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, opacity: enterOp, transform: `translateY(${ty}px) scale(${scaleIn})` }}>
        <span style={{ fontSize: 58, fontWeight: 800, color: C.white, textShadow: SHADOW }}>@jalvarez.tech</span>
        <div style={{ position: "relative", transform: `scale(${tapScale})` }}>
          {burst >= 0 ? <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `4px solid ${C.cyan}`, transform: `scale(${interpolate(burst, [0, 1], [0.9, 1.6])})`, opacity: interpolate(burst, [0, 1], [0.55, 0]) }} /> : null}
          <div style={{ padding: "24px 68px", borderRadius: 999, border: `4px solid ${borderCol}`, background: bg, position: "relative", minWidth: 360, textAlign: "center", boxShadow: "0 12px 44px rgba(0,0,0,0.5)" }}>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: seguirOp, color: C.white, fontSize: 46, fontWeight: 800, textShadow: SHADOW }}>Seguir</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: siguiendoOp, color: C.white, fontSize: 46, fontWeight: 800, textShadow: SHADOW }}>Siguiendo ✓</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MotionGraphicsFull: React.FC = () => (
  <AbsoluteFill>
    <SceneFunnel />
    <ScenePhone />
    <SceneZero />
    <SceneWhats />
    <SceneTimer />
    <SceneCompetencia />
    <SceneFollow />
  </AbsoluteFill>
);
