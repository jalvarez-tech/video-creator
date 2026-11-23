/**
 * LOS SFX DEL 098 — los mismos de la familia ORGÁNICA del 097 (destello, campanilla, papel), muy pocos: es una pieza
 * íntima y la música hace casi todo. NINGUNO suena bajo una voz (las niñas hablan de f139 a f1243) ni sobre los
 * respiros de las fotos: el primero es el de la estrella, en la cima de la música.
 *
 * EL GOLPE MEDIDO (R26, medido en el 097 con `sfx.mjs medir`): sparkle 65 ms (2 f) · chime 277 ms (8 f) · paper 546 ms
 * (16 f). Cada cue arranca su golpe ANTES del frame objetivo: `startFrame = objetivo − golpe`.
 *
 * EL ANCLA. La estrellita suena siempre igual (`sparkle`, el mismo archivo), como en el 097: un ancla ES la repetición.
 */
import { cue } from "../../motor/sound/cues";
import type { SoundCue, TipoSonido, VarianteSonido } from "../../motor/sound/cues";
import { CTA, ESTRELLA } from "./textos-098";

const GOLPE: Partial<Record<string, number>> = { sparkle: 2, chime: 8, paper: 16 };

const c = (id: string, type: TipoSonido, variant: VarianteSonido, objetivo: number, dur: number, reason: string, o: { db?: number; sale?: number } = {}): SoundCue => {
  const golpe = GOLPE[variant] ?? 0;
  const base = cue(id, type, variant, objetivo, dur, reason, { startFrame: objetivo - golpe, fadeOutFrames: o.sale ?? 6 });
  return { ...base, volume: base.volume * Math.pow(10, (o.db ?? 0) / 20) };
};

export const cues098: SoundCue[] = [
  c("estrella", "impact", "sparkle", ESTRELLA.aparece, 28, "Aparece la estrella sobre el círculo, en el golpe más alto de la música (71,79 s)", { db: -3 }),
  c("aterriza", "impact", "chime", ESTRELLA.aterriza, 34, "La estrella aterriza en el centro vacío del círculo", { db: -4 }),
  c("hoja", "click", "paper", CTA.hoja, 22, "Entra la hoja amarilla del CTA", { sale: 8 }),
  c("paso-1", "impact", "sparkle", CTA.pasos[0].en, 28, "La estrella 1 (ancla)", { db: -5 }),
  c("paso-2", "impact", "sparkle", CTA.pasos[1].en, 28, "La estrella 2 (cada vez más baja)", { db: -7 }),
  c("paso-3", "impact", "sparkle", CTA.pasos[2].en, 28, "La estrella 3", { db: -9 }),
];
