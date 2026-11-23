/**
 * LOS SFX DEL 100 — pocos y bajos: la canción ya golpea en cada corte. Familia ORGÁNICA del 097 (papel, destello, pop).
 * La voz manda: todo va bajo las niñas.
 *
 * EL GOLPE MEDIDO (R26, `sfx.mjs medir`, medido en el 097): sparkle 2 f · pop 18 · pop-02 5 · pop-03 4 · paper 16.
 * Cada cue arranca su golpe ANTES del frame objetivo: `startFrame = objetivo − golpe`.
 */
import { cue } from "../../motor/sound/cues";
import type { SoundCue, TipoSonido, VarianteSonido } from "../../motor/sound/cues";
import { DESEOS, GRACIAS, PAPEL } from "./textos-100";

const GOLPE: Partial<Record<string, number>> = { sparkle: 2, pop: 18, "pop-1": 5, "pop-2": 4, paper: 16 };

const c = (
  id: string,
  type: TipoSonido,
  variant: VarianteSonido,
  objetivo: number,
  dur: number,
  reason: string,
  o: { vi?: number; db?: number; bajoVoz?: boolean; sale?: number } = {}
): SoundCue => {
  const clave = o.vi ? `${variant}-${o.vi}` : variant;
  const golpe = GOLPE[clave] ?? 0;
  const base = cue(id, type, variant, objetivo, dur, reason, {
    variantIndex: o.vi,
    startFrame: objetivo - golpe,
    underDialogue: o.bajoVoz,
    fadeOutFrames: o.sale ?? 6,
  });
  return { ...base, volume: base.volume * Math.pow(10, (o.db ?? 0) / 20) };
};

export const cues100: SoundCue[] = [
  c("deseo-1", "impact", "pop", DESEOS.items[0].en, 26, "Se pega «una radio» (sobre su golpe del redoble)", { bajoVoz: true, db: -6 }),
  c("deseo-2", "impact", "pop", DESEOS.items[1].en, 12, "«un conejito»", { vi: 1, bajoVoz: true, db: -6 }),
  c("deseo-3", "impact", "pop", DESEOS.items[2].en, 12, "«un bafle»", { vi: 2, bajoVoz: true, db: -6 }),
  c("ancla-gracias", "impact", "sparkle", GRACIAS.ancla, 28, "Los brazos arriba en «¡Gracias a Dios por la Navidad!»: la estrellita", { bajoVoz: true }),
  c("hoja", "click", "paper", PAPEL.hoja, 22, "Entra la hoja amarilla del CTA, en la primera nota del outro", { sale: 8 }),
  c("paso-1", "impact", "sparkle", PAPEL.pasos[0], 28, "La estrella 1", { db: -2 }),
  c("paso-2", "impact", "sparkle", PAPEL.pasos[1], 28, "La estrella 2 (cada vez −2 dB)", { db: -4 }),
  c("paso-3", "impact", "sparkle", PAPEL.pasos[2], 28, "La estrella 3", { db: -6 }),
];
