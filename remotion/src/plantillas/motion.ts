/**
 * Motion tokens — el "vocabulario de movimiento" compartido por las plantillas.
 * Equivale a lo que `sound/cues.ts` es al sonido: la DECISIÓN reusable ya tomada.
 * Guía humana: manuales/motion-graphics/SKILL.md (+ referencia.md).
 *
 * Regla maestra: el DISEÑO decide qué se ve; la ANIMACIÓN, cuándo y cómo.
 * Un solo hero-motion a la vez. No pongas spring en todo. Nombra la INTENCIÓN,
 * no el efecto: por eso los muelles se llaman `contador`, `cta`, `flip`… y no
 * `damping14`. Cambia un valor aquí y las plantillas cambian coherentemente.
 *
 * Determinismo: todo se deriva de useCurrentFrame()/useVideoConfig(). Nada de
 * Date.now(), Math.random() sin sembrar, timers ni CSS animation/transition.
 */
import { Easing, interpolate } from "remotion";
import { theme } from "./theme";

/** Config de muelle (structurally `Partial<SpringConfig>` de Remotion). */
export type Muelle = {
  damping?: number;
  mass?: number;
  stiffness?: number;
  overshootClamping?: boolean;
};

/**
 * Muelles nombrados por intención. Úsalos así:
 *   const e = spring({ frame: f, fps, config: SPRING.entrada });
 * Sin rebote visible → `contador`. Rebote sutil → `entrada`/`tarjeta`.
 * Overshoot marcado (pop de una cifra, tap de botón) → `punch`/`tap`.
 */
export const SPRING = {
  entrada: { damping: 14, mass: 0.7 },                  // asentamiento estándar: slides, chips, burbujas
  contador: { damping: 16, mass: 0.7 },                 // más amortiguado: cifras que suben sin rebote
  tarjeta: { damping: 14, mass: 0.7, stiffness: 120 },  // card/burbuja con algo de cuerpo
  cta: { damping: 14, mass: 0.8, stiffness: 120 },      // botón/CTA (un pelo más de masa)
  golpe: { damping: 14 },                               // aparición seca (aspa roja, scaleX)
  flip: { damping: 12 },                                // giro 3D (flip TUYO/DE OTRO)
  pulso: { damping: 8 },                                // latido corto de énfasis
  punch: { damping: 8, stiffness: 220 },                // overshoot fuerte: pop de una cifra
  tap: { damping: 9, stiffness: 200 },                  // compresión de botón al pulsar
} satisfies Record<string, Muelle>;

/**
 * Easings compartidos. `interpolate(..., { easing: EASE.outCubic })`.
 * Entrada/count-up → outCubic (rápido→suave). Reposicionamiento → inOutCubic.
 * Movimiento mecánico continuo (barras, marquees) → Easing.linear.
 */
export const EASE = {
  outCubic: Easing.out(Easing.cubic),
  inOutCubic: Easing.inOut(Easing.cubic),
} as const;

/** segundos → frames al fps de la composición (determinista). */
export const seg = (fps: number, s: number): number => Math.round(s * fps);

/**
 * Duraciones de referencia EN SEGUNDOS (conviértelas con seg(fps, …)).
 * Puntos de partida; ajústalas al ritmo de la voz y la música (skill §Timing).
 */
export const DUR = {
  micro: 0.15,         // microacción (compresión, tick)
  pop: 0.27,           // pop pequeño
  entradaRapida: 0.35, // entrada rápida (redes)
  entrada: 0.5,        // entrada estándar
  tarjeta: 0.6,        // tarjeta / bloque
  hero: 0.8,           // hero motion
  revelacion: 1.4,     // revelación dramática
  ambiente: 2.5,       // movimiento ambiental (loop)
} as const;

/** Desfase (stagger) entre elementos, en frames a ~25–30fps. */
export const STAGGER = { grupo: 3, lista: 4, independiente: 6 } as const;

/** Opacidad de entrada 0→1 (clamp) en `dur` frames desde el inicio local `f`. */
export const rampaEntrada = (f: number, dur = 12): number =>
  interpolate(f, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Opacidad de salida 1→0 (clamp) en los últimos `dur` frames de una ventana de largo `len`. */
export const rampaSalida = (f: number, len: number, dur = 14): number =>
  interpolate(f, [len - dur, len], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Escala de overshoot: arranca en `desde` (>1) y asienta en 1, guiada por el valor de un muelle 0→1. */
export const overshoot = (valorMuelle: number, desde: number): number =>
  interpolate(valorMuelle, [0, 1], [desde, 1]);

/**
 * Paleta de motion graphics (marca). Una sola fuente de verdad:
 * `teal` = theme.accent y `white` = theme.text (cámbialos en theme.ts).
 * `ink` (fondo de tarjeta/escena) es local a cada plantilla porque difiere.
 */
export const MG = {
  teal: theme.accent, // #0F766E
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#f59e0b",
  red: "#ef4444",
  white: theme.text, // #FFFFFF
} as const;
