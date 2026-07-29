/**
 * Tokens de ESTILO de la biblioteca de gráficos — el "cómo se ve".
 * Trío de vocabularios del motor, cada uno con su archivo:
 *   theme.ts   → la MARCA (tipografía, acento, texto)
 *   motion.ts  → el MOVIMIENTO (muelles, easings, duraciones, stagger)
 *   estilos.ts → la FORMA (color derivado, sombra, escalas tipográficas)
 *
 * Regla: aquí NO hay nada que dependa del frame. Si algo se mueve, vive en
 * motion.ts o en el componente. Así un gráfico se puede rediseñar sin tocar su
 * coreografía, y re-cronometrar sin tocar su diseño.
 *
 * Guía humana: manuales/motion-graphics/SKILL.md.
 */
import { MG } from "../motion";
import { theme } from "../theme";

/** Tipografía de marca (atajo: casi todos los gráficos la necesitan). */
export const FONT = theme.fontFamily;

/**
 * `#rrggbb` → `rgba(r,g,b,a)`. Acepta también `#rgb`.
 * Los colores de marca son hex; las capas (sombras, scrims, glows) necesitan
 * alfa. Sin este helper acabas escribiendo el rgba a mano y el color deja de
 * salir de theme.ts — que es justo lo que rompe la coherencia.
 */
export const alfa = (hex: string, a: number): string => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/**
 * Paleta de gráficos = la de marca (`MG`) + los neutros de capa.
 * `tinta` es el fondo de tarjeta/sello: casi negro y TRASLÚCIDO, para que el
 * avatar o el fondo sigan leyéndose por debajo (una caja opaca sobre vídeo se
 * lee como parche pegado, no como capa).
 */
export const G = {
  ...MG,
  tinta: "rgba(11,17,32,0.66)",
  tintaSolida: "#0B1120",
  linea: "rgba(255,255,255,0.10)",
  tenue: "rgba(255,255,255,0.32)",
  apagado: "rgba(255,255,255,0.60)",
  gris: "rgba(148,163,184,0.95)",
} as const;

/**
 * Sombras. `texto` es OBLIGATORIA sobre vídeo: sin ella el blanco desaparece
 * en cuanto el avatar lleva camisa clara o el fondo se aclara un frame.
 */
export const SOMBRA = {
  texto: "0 2px 12px rgba(0,0,0,0.70)",
  caja: "0 12px 44px rgba(0,0,0,0.40)",
} as const;

/**
 * Escalas tipográficas EN PX A 1080 DE ANCHO (9:16 vertical, el formato base
 * del sistema). En 16:9 los mismos px se ven más pequeños en proporción: usa
 * `escalaPorAncho(width)` para reescalarlos, no números sueltos.
 *
 * Cuatro roles y nada más. Si necesitas un quinto, casi siempre es que la
 * escena tiene dos protagonistas (SKILL §jerarquía: uno solo).
 *   kicker   → antetítulo, contexto, sección. Nunca es el mensaje.
 *   etiqueta → la frase de apoyo, lo que explica la cifra.
 *   titular  → el mensaje. Uno por escena.
 *   cifra    → el dato como protagonista (tabular-nums: los dígitos no bailan
 *              al contar; sin esto un contador "tiembla" en cada frame).
 */
export const TXT = {
  kicker: {
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: 6,
    textTransform: "uppercase",
    color: G.apagado,
  },
  etiqueta: { fontSize: 46, fontWeight: 600, letterSpacing: 0.2, color: theme.text },
  titular: { fontSize: 92, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05, color: theme.text },
  cifra: {
    fontSize: 210,
    fontWeight: 800,
    letterSpacing: -3,
    lineHeight: 1,
    color: theme.text,
    fontVariantNumeric: "tabular-nums",
  },
} as const;

/**
 * Factor de escala tipográfica para un ancho de composición dado (base 1080).
 * En 1920×1080 devuelve 1.78 — pero ojo: en horizontal el texto suele querer
 * ser MÁS PEQUEÑO en proporción (hay más ancho útil), así que la fórmula
 * satura en 1.35. Es un punto de partida, no una ley.
 */
export const escalaPorAncho = (width: number): number => Math.min(1.35, width / 1080);

/**
 * Márgenes de zona segura, en px, para un ancho de composición.
 * Coincide con `zonaSeguraPct` de presets.ts (9:16 = 11 % ≈ 118 px).
 */
export const margenSeguro = (width: number, pct = 11): number => Math.round((width * pct) / 100);
