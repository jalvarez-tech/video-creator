import { cue, SoundCue } from "./sound/cues";

/**
 * Diseño sonoro del proyecto 001 (avatar 9:16). Cada cue tiene función narrativa.
 * Frames absolutos @25fps. La voz del avatar manda; los SFX van muy por debajo
 * (volúmenes calibrados por familia, SKILL §10). Como el clip tiene narración
 * continua, la composición monta la pista con ducking global: <PistaSonido duckDb={-4.5}/>.
 * Los whooshes repetidos alternan con `variantIndex` para no sonar idénticos (§12).
 * Guía: manuales/diseno-sonoro/SKILL.md
 */
export const cues001: SoundCue[] = [
  // Cortes a escenas (movimiento → whoosh); variantIndex rota el pool `light`
  cue("cut-funnel", "whoosh", "light", 200, 16, "Corte al gráfico de la fuga (cambio de escena)", { variantIndex: 0 }),
  cue("cut-zero", "whoosh", "light", 395, 16, "Corte a «0 visitas»", { variantIndex: 1 }),
  cue("cut-whats", "whoosh", "light", 520, 16, "Corte a la escena de WhatsApp", { variantIndex: 2 }),
  cue("cut-timer", "whoosh", "heavy", 660, 18, "Corte al timer — cambio dramático (más peso)"),
  cue("cut-comp", "whoosh", "light", 800, 16, "Corte a la escena de la competencia", { variantIndex: 0 }),
  cue("cta-in", "whoosh", "light", 965, 16, "Vuelve el avatar y entra el botón Seguir", { variantIndex: 1 }),

  // Puntos de llegada / énfasis (impact) — volumen calibrado del bucket impact (~−27 dBFS)
  cue("drain-hit", "impact", "sharp", 322, 18, "El contador se desploma a 3 — punto de llegada", { priority: "high" }),
  cue("zero-hit", "impact", "sharp", 421, 18, "«0 visitas» y la X roja aterrizan"),
  cue("timer-hit", "impact", "deep", 772, 34, "El timer llega a 0:00 y «DE OTRO» — clímax («ya no es tuyo»)", { priority: "high" }),

  // Anticipación (riser) — Preset 1: Riser → Deep Impact
  cue("timer-riser", "riser", "cymbal", 772, 50, "Riser de tensión hacia el 0:00"),

  // UI / acciones (click)
  cue("msg-send", "click", "msg-send", 346, 12, "Se envía el mensaje «Hola, info»"),
  cue("comp-money", "click", "money", 868, 20, "La competencia capta 200 leads (kaching) — remate"),
  cue("follow-tap", "click", "pop", 1010, 12, "Se pulsa el botón Seguir"),
  cue("follow-ok", "click", "notification", 1022, 16, "Confirmación «Siguiendo ✓»"),
];
