/**
 * MUNDO 003 — "líquido / ámbar eléctrico". Tokens de la dirección de arte.
 *
 * Es el `theme.ts` de este proyecto: una sola fuente de verdad para color,
 * tipografía, tiempos de snap y las VENTANAS de toma (avatar vs gráfico).
 * Guía humana: manuales/director-video/SKILL.md (§3 contrato compartido).
 *
 * Dos velocidades en tensión (la firma de la pieza):
 *   · el FONDO es un degradado PLANO y quieto, con la luz derivando muy despacio
 *   · los VECTORES encima entran de golpe → SNAP = 0.15 s (4 frames @25fps)
 * Nada intermedio: si un elemento no es fondo, entra seco.
 *
 * Determinismo: todo se deriva de useCurrentFrame(). `osc` sustituye a cualquier
 * Math.random(): ruido periódico reproducible entre renders.
 */

/** El mundo: carbón. Nunca cambia. */
export const W = {
  bg: "#0E1015", // carbón oscuro — el vacío del mundo
  accent: "#FFB020", // alias histórico de SIM.dato
  grey: "#8A929E", // alias histórico de SIM.neutro
  greySoft: "rgba(138,146,158,0.62)",
  greyFaint: "rgba(138,146,158,0.34)",
  ink: "rgba(14,16,21,0.92)", // fondo de campo/tarjeta sobre el degradado
} as const;

/**
 * SIMBOLOGÍA DE COLOR — cada color SIGNIFICA una cosa y no se usa para otra.
 *
 * Sustituye al "un solo acento" del STYLE GUIDE por decisión del cliente: el
 * color pasa de ser decoración de marca a ser INFORMACIÓN. La disciplina no
 * desaparece, se mueve: siguen siendo cuatro colores contados y ninguno aparece
 * "porque quedaba bien". Si un elemento no encaja en una de estas cuatro
 * categorías, va en `neutro`.
 *
 * | color | significa | en este guion |
 * |---|---|---|
 * | `perdida` rojo | se va · falla · se descarta | los 95, «buenas ¿precio?», HOY tachado, DESCARTA, "nunca le volviste a hablar" |
 * | `mensaje` verde WhatsApp | el mensaje que llega · el lead que se salva | los 5 que compran, RECUPERA, SE GUARDA, HACE 3 MESES, el campo del CTA |
 * | `dato` ámbar | el dato neutro · lo que pones de tu bolsillo | los 100 clics, 3 COSAS, ORDENA |
 * | `neutro` gris frío | contexto · lo que no pide atención | kickers, descriptores, el eje temporal |
 *
 * El verde es el de WhatsApp (#25D366) a propósito: el espectador ya sabe qué
 * significa ese verde antes de leer nada.
 */
export const SIM = {
  perdida: "#FF453A",
  mensaje: "#25D366",
  dato: "#FFB020",
  neutro: "#8A929E",
} as const;

export type ColorSim = (typeof SIM)[keyof typeof SIM];

/** `#RRGGBB` + alfa → `rgba()`. Para glows, bordes y estados apagados. */
/**
 * Reexportada de `formato.ts`. La copia que había aquí NO expandía el atajo de
 * tres dígitos: `alfa("#FFF", .5)` daba azul en vez de blanco.
 */
export { alfa } from "../../motor/formato";

/**
 * Sans geométrica bold. Futura es la geométrica de referencia; se carga por
 * `local()` en index.css como "FuturaGeo" porque Chrome no la resuelve por
 * nombre de familia. Avenir Next es el plan B (misma escuela).
 */
export const FONT = '"FuturaGeo", "Avenir Next", "Helvetica Neue", Helvetica, sans-serif';

/** 0.15 s @25fps (3.75 → 4). Es el ÚNICO tiempo de entrada de la tipografía. */
export const SNAP = 4;

/** Zona segura 9:16 (11 % → 118 px). */
export const SAFE_X = 118;

/**
 * Franja donde viven los sellos sobre el avatar: la POSICIÓN DE SUBTÍTULO del
 * sistema (y ≈ 70 % de 1920 → 1340 px), no la franja sobre la cabeza.
 *
 * No contradice [R08](../../../manuales/edicion-video/reglas.md): esa regla
 * protege la cara y el subtítulo. Aquí no hay pista de subtítulos, así que esa
 * banda está libre y es donde el ojo ya espera leer en un vertical. Lo que sí
 * exige es un scrim INFERIOR: ahí abajo es donde gesticulan las manos.
 */
export const BANDA_SUB = { top: 1340 } as const;

// ── Helpers deterministas ─────────────────────────────────────────────────────

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/** Escalón duro: 0 antes de `at`, 1 desde `at`. La tipografía NUNCA hace fade. */
export const hard = (f: number, at: number): number => (f >= at ? 1 : 0);

/** Progreso 0→1 del barrido de entrada (clip-path). Lineal: mecánico, sin easing. */
export const wipe = (f: number, at: number, dur: number = SNAP): number =>
  clamp01((f - at) / dur);

/** Ventana viva [from, to) con barrido de entrada; devuelve null si está fuera. */
export const ventana = (
  f: number,
  from: number,
  to: number
): { f: number; len: number } | null => (f >= from && f < to ? { f: f - from, len: to - from } : null);

/** Oscilador periódico determinista (−1…1). Sustituye a cualquier random. */
export const osc = (f: number, periodo: number, fase = 0): number =>
  Math.sin((f / periodo + fase) * Math.PI * 2);

// ── Tomas ─────────────────────────────────────────────────────────────────────

/**
 * Ventanas [inicio, fin) en las que la "cámara" está sobre un GRÁFICO a pantalla
 * completa y el avatar no se ve, con la POSICIÓN DEL FOCO ámbar de cada una.
 *
 * El fondo es siempre el mismo degradado plano ("la sala") y lo que cambia entre
 * tomas es dónde está la luz ("el ángulo de cámara"). Eso es lo que hace que los
 * cortes se lean como cambios de plano dentro de un mismo espacio, sin recurrir a
 * textura en el fondo.
 *
 * La cámara del avatar REPOSA en estas ventanas (camara-avatar §7 · R09) y aquí
 * el avatar se desmonta (la VOZ va aparte, en su propio <Audio>).
 */
export type TomaGrafica = {
  from: number;
  to: number;
  cx: number;
  cy: number;
  /** Color simbólico del foco: el del asunto que se cuenta en la toma. */
  color: ColorSim;
  /** Cambio DURO de simbología a mitad de toma (el asunto cambia de signo). */
  color2?: ColorSim;
  cambiaEn?: number;
};

export const TOMAS_GRAFICAS: readonly TomaGrafica[] = [
  // El dato empieza siendo lo que PAGAS (ámbar) y a los 10.31 s se convierte en
  // lo que PIERDES (rojo): el foco cambia de golpe con los puntos que se apagan.
  { from: 198, to: 313, cx: 50, cy: 42, color: SIM.dato, color2: SIM.perdida, cambiaEn: 258 },
  { from: 433, to: 495, cx: 34, cy: 46, color: SIM.perdida }, // 01 DESCARTA — saca gente fuera
  { from: 539, to: 601, cx: 66, cy: 46, color: SIM.dato }, //    02 ORDENA — clasifica
  { from: 703, to: 764, cx: 50, cy: 38, color: SIM.mensaje }, //  03 RECUPERA — salva
  { from: 819, to: 995, cx: 42, cy: 54, color: SIM.perdida }, //  revelación — el fallo
] as const;

/** La toma de gráfico activa en `f`, o null si en ese frame se ve el avatar. */
export const luzDeToma = (f: number): TomaGrafica | null =>
  TOMAS_GRAFICAS.find((t) => f >= t.from && f < t.to) ?? null;

/** El color simbólico vigente en `f` dentro de su toma (resuelve el cambio duro). */
export const colorDeToma = (f: number, t: TomaGrafica): ColorSim =>
  t.color2 && t.cambiaEn !== undefined && f >= t.cambiaEn ? t.color2 : t.color;

export const enGrafico = (f: number): boolean => luzDeToma(f) !== null;
