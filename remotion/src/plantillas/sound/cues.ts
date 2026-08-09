/**
 * Motor de diseño sonoro (guía: manuales/diseno-sonoro/SKILL.md
 * + catálogo por motion graphic: manuales/diseno-sonoro/recetario-motion-graphics.md).
 * Un SoundCue = una decisión de sonido con FUNCIÓN narrativa (reason obligatorio).
 * Los archivos viven en remotion/public/sfx/ (copiados del banco `sonido/`).
 *
 * Regla maestra: usa el efecto MÁS ESPECÍFICO disponible (pop, chime, glitch,
 * scribble, liquid, metal…), no un whoosh genérico para todo. Whoosh/riser/impact/
 * click son el complemento (movimiento, anticipación, llegada, ritmo).
 *
 * MEZCLA (SKILL §10): TODOS los SFX van por DEBAJO de la voz y la música principal.
 * Los whooshes e impacts van aún más bajos (refuerzan el movimiento sin dominar).
 * Los `vol` por defecto están CALIBRADOS por pico real (dBFS) de cada archivo para
 * caer en el objetivo de su familia (ver TARGET_DBFS). Recalcúlalos con copiar-sfx.sh
 * si cambias un archivo. Con narración encima, aplica ducking (DUCK_DIALOGUE_DB).
 */

/**
 * `type` = CLASE DE SINCRONIZACIÓN (cómo se ancla el sonido al targetFrame), no el
 * timbre. El timbre lo elige `variant`. Un mismo type sirve para muchas familias:
 *   whoosh  → movimiento/sweep: el pico cae ~65% dentro, en el targetFrame.
 *   riser   → anticipación: el crescendo TERMINA en el targetFrame.
 *   impact  → llegada/golpe: transiente con cola, empieza en el targetFrame.
 *   click   → ritmo/UI: transiente seco, en el frame exacto del cambio.
 *   texture → loop/ambiente/typing/data: SE EXTIENDE desde el targetFrame (usa fades).
 */
export type TipoSonido = "whoosh" | "riser" | "impact" | "click" | "texture";

export type VarianteSonido =
  // whoosh (movimiento / transición)
  | "light" | "whip" | "heavy" | "wind" | "swoosh" | "swoosh-hero"
  // riser (anticipación)
  | "low-rumble" | "cymbal"
  // impact (llegada / énfasis)
  | "deep" | "sharp" | "boom" | "metal"
  // click / UI (ritmo, interfaz)
  | "camera" | "mouse" | "pen" | "ui"
  // aparición elástica
  | "pop" | "boing"
  // notificación / mensajería / app
  | "notification" | "msg-send"
  // datos / tech / interfaz
  | "data" | "digital" | "glitch" | "electric" | "spin" | "typing"
  // ritmo / conteo
  | "tick"
  // acierto / error / dinero
  | "chime" | "success" | "error" | "money" | "coin"
  // materiales / trazo / partículas
  | "scribble" | "paper" | "liquid" | "sparkle"
  // logo / cierre-inverso / cómico / ambiente
  | "logo" | "reverse" | "cartoon" | "ambient-wind";

// ── Mezcla (SKILL §10) ─────────────────────────────────────────────────────────

/** Conversión dBFS → ganancia lineal para `<Audio volume>` (0–1). −6 dB ≈ 0.5. */
export const dbToGain = (db: number): number => Math.min(1, Math.pow(10, db / 20));

/**
 * Objetivo de PICO (dBFS) por familia de mezcla (más negativo = más bajo).
 * Todos por debajo de la voz/música; whoosh e impact aún más bajos; ambiente el mínimo.
 * (Rangos pedidos: generales −18…−24 · whoosh/impact −24…−30 · ambiente −26…−34.)
 */
export const TARGET_DBFS = { general: -21, whoosh: -27, impact: -27, ambient: -30 } as const;
export type MixBucket = keyof typeof TARGET_DBFS;

/** Reducción EXTRA de los SFX cuando hay narración encima (SKILL §10): 3–6 dB → 4.5. */
export const DUCK_DIALOGUE_DB = -4.5;

export type SoundCue = {
  id: string;
  type: TipoSonido;
  variant: VarianteSonido;
  variantIndex?: number; // elige una alterna del POOL[variant] para no repetir (§12)
  startFrame: number;
  targetFrame: number;
  durationInFrames: number;
  volume: number; // ganancia lineal 0–1 (ya calibrada al objetivo dBFS de la familia)
  underDialogue?: boolean; // el efecto cae sobre la voz → aplica ducking extra
  pan?: number; // metadato: Remotion <Audio> no aplica paneo estéreo nativo
  direction?: "left" | "right" | "up" | "down" | "neutral"; // metadato de dirección
  fadeInFrames?: number;
  fadeOutFrames?: number;
  loopable?: boolean; // el archivo tolera loop (texturas continuas)
  hasLongTail?: boolean; // cola larga que puede invadir la escena siguiente
  priority: "low" | "medium" | "high";
  reason: string; // OBLIGATORIO: si no puedes justificarlo, no lo agregues
};

/**
 * Variante → archivo en public/sfx/ + volumen calibrado + familia de mezcla + banco.
 * `vol` = ganancia lineal para que el PICO del archivo caiga en TARGET_DBFS[bucket]
 *   (derivado del pico real medido con ffmpeg; ver copiar-sfx.sh).
 * `bucket` = familia de mezcla (general | whoosh | impact | ambient).
 * `cat` = FAMILIA del banco donde buscar más variantes de este timbre
 *   (ver sonido/MAPA-SONIDOS.md; el archivo base puede vivir en otra carpeta, p. ej.
 *   37-OTROS — el origen exacto está en copiar-sfx.sh y en el README de public/sfx/).
 * Para cambiar un sonido: copia otro del banco a public/sfx/ con el mismo nombre y
 * recalcula `vol` (copiar-sfx.sh lo mide y sugiere).
 */
export const SFX: Record<VarianteSonido, { file: string; vol: number; bucket: MixBucket; cat: string }> = {
  // whoosh / transición (bucket whoosh → más bajo)
  light: { file: "whoosh-light.wav", vol: 0.062, bucket: "whoosh", cat: "36-WHOOSH" },
  whip: { file: "whoosh-whip.wav", vol: 0.05, bucket: "whoosh", cat: "36-WHOOSH" },
  heavy: { file: "whoosh-heavy.mp3", vol: 0.045, bucket: "whoosh", cat: "36-WHOOSH" },
  wind: { file: "whoosh-wind.wav", vol: 0.06, bucket: "whoosh", cat: "36-WHOOSH" },
  swoosh: { file: "swoosh.mp3", vol: 0.06, bucket: "whoosh", cat: "32-SWOSH" },
  "swoosh-hero": { file: "whoosh-swoosh-07.wav", vol: 0.068, bucket: "whoosh", cat: "36-WHOOSH" }, // Ashish "7. Whoosh Swoosh" (pico ~1.25s)
  // riser (bucket general)
  "low-rumble": { file: "riser-low.mp3", vol: 0.653, bucket: "general", cat: "09-CINEMATICA RISER" },
  cymbal: { file: "riser-cymbal.mp3", vol: 0.155, bucket: "general", cat: "31-RISER" },
  // impact (bucket impact → más bajo)
  deep: { file: "impact-deep.mp3", vol: 0.047, bucket: "impact", cat: "05-BOOM" },
  sharp: { file: "impact-sharp.wav", vol: 0.054, bucket: "impact", cat: "26-METAL SLICE" },
  boom: { file: "impact-deep.mp3", vol: 0.047, bucket: "impact", cat: "05-BOOM" }, // alias grave (comparte archivo con deep)
  metal: { file: "metal.wav", vol: 0.045, bucket: "impact", cat: "26-METAL SLICE" },
  // click / UI (bucket general)
  camera: { file: "click-camera.wav", vol: 0.092, bucket: "general", cat: "07-CAMARA" },
  mouse: { file: "click-mouse.mp3", vol: 0.155, bucket: "general", cat: "10-CLICK" },
  pen: { file: "click-pen.mp3", vol: 0.094, bucket: "general", cat: "10-CLICK" },
  ui: { file: "ui.mp3", vol: 0.2, bucket: "general", cat: "19-EXTRAS (UI)" },
  // aparición elástica
  pop: { file: "pop.mp3", vol: 0.178, bucket: "general", cat: "29-POP" },
  boing: { file: "boing.mp3", vol: 0.089, bucket: "general", cat: "19-EXTRAS (spring)" },
  // notificación / app
  notification: { file: "notification.wav", vol: 0.331, bucket: "general", cat: "37-OTROS (apps)" },
  "msg-send": { file: "msg-send.wav", vol: 0.09, bucket: "general", cat: "37-OTROS (apps)" },
  // datos / tech
  data: { file: "data-count.mp3", vol: 0.26, bucket: "general", cat: "12-DATA" },
  digital: { file: "digital.wav", vol: 0.116, bucket: "general", cat: "37-OTROS (Sci-Fi/Data)" },
  glitch: { file: "glitch.wav", vol: 0.955, bucket: "general", cat: "22-GLITCH" },
  electric: { file: "electric.mp3", vol: 0.107, bucket: "general", cat: "15-ELECTRICO" },
  spin: { file: "spin.wav", vol: 0.335, bucket: "general", cat: "37-OTROS (spin)" },
  typing: { file: "typing.mp3", vol: 0.221, bucket: "general", cat: "37-OTROS (teclado)" },
  // ritmo
  tick: { file: "tick.mp3", vol: 0.151, bucket: "general", cat: "37-OTROS (reloj)" },
  // acierto / error / dinero
  chime: { file: "chime.mp3", vol: 0.164, bucket: "general", cat: "14-DING" },
  success: { file: "success.wav", vol: 0.093, bucket: "general", cat: "14-DING" },
  error: { file: "error.mp3", vol: 0.248, bucket: "general", cat: "16-ERROR" },
  money: { file: "money.mp3", vol: 0.145, bucket: "general", cat: "13-DINERO" },
  coin: { file: "coin.mp3", vol: 0.089, bucket: "general", cat: "27-MONEDA" },
  // materiales / trazo / partículas
  scribble: { file: "scribble.mp3", vol: 0.123, bucket: "general", cat: "37-OTROS (escritura)" },
  paper: { file: "paper.wav", vol: 0.089, bucket: "general", cat: "28-PAPEL" },
  liquid: { file: "liquid.mp3", vol: 0.116, bucket: "general", cat: "24-LIQUIDO" },
  sparkle: { file: "sparkle.mp3", vol: 0.184, bucket: "general", cat: "19-EXTRAS (glitter)" },
  // logo / inverso / cómico / ambiente
  logo: { file: "logo.mp3", vol: 0.115, bucket: "general", cat: "03-ANIMACION LOGO" },
  reverse: { file: "reverse.mp3", vol: 0.148, bucket: "general", cat: "37-OTROS (suction)" },
  cartoon: { file: "cartoon.mp3", vol: 0.38, bucket: "general", cat: "21-FUNNY" },
  "ambient-wind": { file: "ambient-wind.mp3", vol: 0.068, bucket: "ambient", cat: "19-EXTRAS (wind)" },
};

/**
 * Variantes ALTERNAS para NO repetir el mismo archivo en cortes consecutivos (SKILL §12).
 * Índice 0 = archivo base (= SFX[variant]). Cada entrada trae su `vol` ya calibrado.
 * Úsalo con `variantIndex` en el cue (o `rotarPorFamilia` para alternar automáticamente).
 */
export const POOL: Partial<Record<VarianteSonido, { file: string; vol: number }[]>> = {
  pop: [
    { file: "pop.mp3", vol: 0.178 },
    { file: "pop-02.mp3", vol: 0.417 },
    { file: "pop-03.mp3", vol: 0.363 },
  ],
  glitch: [
    { file: "glitch.wav", vol: 0.955 },
    { file: "glitch-02.wav", vol: 0.117 },
    { file: "glitch-03.wav", vol: 0.184 },
  ],
  light: [
    { file: "whoosh-light.wav", vol: 0.062 },
    { file: "whoosh-light-02.wav", vol: 0.056 },
    { file: "whoosh-light-03.wav", vol: 0.048 },
  ],
  swoosh: [
    { file: "swoosh.mp3", vol: 0.06 },
    { file: "swoosh-02.wav", vol: 0.076 },
    { file: "swoosh-03.wav", vol: 0.085 },
  ],
  metal: [
    { file: "metal.wav", vol: 0.045 },
    { file: "metal-02.wav", vol: 0.046 },
    { file: "metal-03.wav", vol: 0.045 },
  ],
  mouse: [
    { file: "click-mouse.mp3", vol: 0.155 },
    { file: "click-mouse-02.mp3", vol: 0.115 },
    { file: "click-mouse-03.mp3", vol: 0.136 },
  ],
  sparkle: [
    { file: "sparkle.mp3", vol: 0.184 },
    { file: "sparkle-02.mp3", vol: 0.138 },
    { file: "sparkle-03.wav", vol: 0.178 },
  ],
  chime: [
    { file: "chime.mp3", vol: 0.164 },
    { file: "chime-02.mp3", vol: 0.209 },
    { file: "chime-03.mp3", vol: 0.089 },
  ],
};

/** Resuelve {file, vol} de una variante, eligiendo del POOL si hay `variantIndex`. */
export function resolveSound(variant: VarianteSonido, variantIndex?: number): { file: string; vol: number } {
  const pool = POOL[variant];
  if (pool && pool.length > 0) {
    const n = pool.length;
    const i = (((variantIndex ?? 0) % n) + n) % n;
    return pool[i];
  }
  const s = SFX[variant];
  return { file: s.file, vol: s.vol };
}

/**
 * Sincroniza el MOMENTO RECONOCIBLE del sonido con el targetFrame (guía §3.1):
 * riser → fin del crescendo = target; whoosh → pico (~65% dentro);
 * impact/click → transiente al inicio; texture → arranca en el target y se extiende
 * (loops, ambientes, typing, data: dale duración larga + fades).
 */
export function startFromTarget(type: TipoSonido, targetFrame: number, durationInFrames: number): number {
  switch (type) {
    case "riser":
      return targetFrame - durationInFrames;
    case "whoosh":
      return targetFrame - Math.round(0.65 * durationInFrames);
    case "impact":
    case "click":
    case "texture":
    default:
      return targetFrame;
  }
}

/** Crea un SoundCue sincronizado al targetFrame (startFrame y volume por defecto). */
export function cue(
  id: string,
  type: TipoSonido,
  variant: VarianteSonido,
  targetFrame: number,
  durationInFrames: number,
  reason: string,
  // `Omit` de lo que ya es posicional: antes era `Partial<SoundCue>` a secas y
  // el `...opts` iba AL FINAL, así que `opts.id`/`opts.type`/`opts.targetFrame`
  // pisaban en silencio al argumento con nombre. Y un `{volume: undefined}`
  // explícito dejaba `volume` en undefined → `<Audio volume={NaN}>`.
  opts: Partial<Omit<SoundCue, "id" | "type" | "variant" | "targetFrame" | "durationInFrames" | "reason">> = {}
): SoundCue {
  return {
    // El spread PRIMERO: los campos de abajo (los del builder) siempre ganan.
    ...opts,
    id,
    type,
    variant,
    targetFrame,
    durationInFrames,
    startFrame: opts.startFrame ?? startFromTarget(type, targetFrame, durationInFrames),
    // volumen ya calibrado al objetivo dBFS de la familia (del POOL si hay variantIndex)
    volume: opts.volume ?? resolveSound(variant, opts.variantIndex).vol,
    priority: opts.priority ?? "medium",
    reason,
  };
}
