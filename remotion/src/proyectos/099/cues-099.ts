/**
 * LOS SFX DEL 099 — familia ORGÁNICA del 097 (papel, trazo, destello, campanilla, viento), de la tabla de cues de
 * `proyectos/099/artefactos/03-timeline.md`. La voz manda: todo va bajo las niñas, y en la letanía NO suena nada (las
 * palabras son de ellas; un «pop» por palabra la convertiría en una lista de concurso).
 *
 * EL GOLPE MEDIDO (R26), el mismo del 097 (`sfx.mjs medir`): sparkle 2 f · pop 18 f · pop-02 5 f · pop-03 4 f ·
 * scribble 4 f · chime 8 f · paper 16 f · whoosh-wind, pico a 12 f. Cada cue arranca su golpe ANTES del frame objetivo:
 * `startFrame = objetivo − golpe`.
 *
 * EL ANCLA. La estrellita suena siempre igual (`sparkle`): un ancla ES la repetición.
 */
import { cue } from "../../motor/sound/cues";
import type { SoundCue, TipoSonido, VarianteSonido } from "../../motor/sound/cues";
import { CORAZONES, CRISTO, GRACIAS, HOJA, MAS_GRITO, PASOS, PUENTE, RESUMEN, TIRAS } from "./textos-099";

const GOLPE: Partial<Record<string, number>> = { sparkle: 2, pop: 18, "pop-1": 5, "pop-2": 4, scribble: 4, chime: 8, paper: 16, wind: 12 };

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

const subrayadoAmarnos = TIRAS.find((t) => t.id === "amarnos")?.marcas?.[0]?.en ?? 94;

export const cues099: SoundCue[] = [
  c("trazo-amarnos", "whoosh", "scribble", subrayadoAmarnos, 16, "Subrayado bajo «amarnos», muy bajo", { bajoVoz: true, db: -8 }),
  c("ovalo-cristo", "whoosh", "scribble", CRISTO.ovalo, 20, "El óvalo de rotulador alrededor de «Cristo»", { bajoVoz: true, db: -4 }),
  c("ancla-cristo", "impact", "sparkle", CRISTO.ancla, 28, "«a Cristo en mi vida»: el ancla", { bajoVoz: true }),
  c("trazo-mas", "whoosh", "scribble", MAS_GRITO.en + 2, 22, "Los tres subrayados del lema, uno solo, bajo el grito", { bajoVoz: true, db: -6 }),
  c("corazones", "impact", "sparkle", CORAZONES[0].en, 22, "Los corazones de HZ19 (otro archivo: no es el ancla)", { vi: 1, bajoVoz: true, db: -4 }),
  c("dron-pasillo", "whoosh", "wind", 1164, 34, "El paso más rápido del dron por el pasillo (3,5 s de DR04)", { db: -2, sale: 10 }),
  c("ancla-gracias", "impact", "sparkle", GRACIAS.ancla, 28, "Los brazos arriba en «¡Gracias a Dios por la Navidad!»", { bajoVoz: true, db: 2 }),
  c("ancla-puente", "impact", "sparkle", PUENTE.estrella, 28, "La estrella aparece sobre el círculo"),
  c("estrella-aterriza", "impact", "chime", PUENTE.aterriza, 34, "Aterriza en el centro del círculo"),
  c("hoja", "click", "paper", HOJA.en, 22, "Entra la hoja amarilla del CTA", { sale: 8 }),
  c("contador", "impact", "chime", RESUMEN.cuenta[1], 34, "El 3.000 aterriza", { db: -4 }),
  c("mas-uno", "impact", "pop", RESUMEN.mas1, 26, "El «+1»: uno puede ser el tuyo", { db: -4 }),
  c("paso-1", "impact", "sparkle", PASOS.pasos[0].en, 28, "La estrella 1 (ancla)", { db: -2 }),
  c("camino-1", "whoosh", "scribble", PASOS.caminos[0], 18, "Se dibuja el camino punteado", { db: -6 }),
  c("paso-2", "impact", "sparkle", PASOS.pasos[1].en, 28, "La estrella 2 (ancla, cada vez −2 dB)", { db: -4 }),
  c("camino-2", "whoosh", "scribble", PASOS.caminos[1], 18, "El segundo camino", { db: -6 }),
  c("paso-3", "impact", "sparkle", PASOS.pasos[2].en, 28, "La estrella 3", { db: -6 }),
];
