/**
 * LOS SFX DEL 097 — familia ORGÁNICA (papel, trazo, destello, campanilla, viento), sacados de la
 * tabla de cues de `proyectos/097/artefactos/03-timeline.md`. La voz manda: todo va bajo las niñas,
 * y NINGÚN sonido en el testimonio (rev. 7: f2185-f2617).
 *
 * EL GOLPE MEDIDO (R26): en estos archivos el golpe no cae al principio. `sfx.mjs medir`:
 *   sparkle 65 ms (2 f) · pop 585 ms (18 f) · pop-02 161 ms (5 f) · pop-03 124 ms (4 f) ·
 *   scribble 146 ms (4 f) · chime 277 ms (8 f) · paper 546 ms (16 f) · whoosh-wind, pico a 12 f.
 * Por eso cada cue arranca su golpe ANTES del frame objetivo: `startFrame = objetivo − golpe`.
 *
 * EL ANCLA. La estrellita suena siempre igual (`sparkle`, el mismo archivo): la regla
 * anti-repetición de `diseno-sonoro` §12 se rompe aquí a propósito, porque un ancla ES la
 * repetición (03-timeline §Las anclas).
 *
 * NINGÚN sonido en el testimonio: en la rev. 4 va de f2186 a f2618.
 */
import { cue } from "../../motor/sound/cues";
import type { SoundCue, TipoSonido, VarianteSonido } from "../../motor/sound/cues";
import { CRISTO, DESEOS, GRACIAS, META, PASOS, PUENTE, CIERRE } from "./textos-097";

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

export const cues097: SoundCue[] = [
  c("deseo-1", "impact", "pop", DESEOS.items[0].en, 26, "Se pega la pegatina «una radio»", { bajoVoz: true, db: -3 }),
  c("deseo-2", "impact", "pop", DESEOS.items[1].en, 12, "«un conejito»", { vi: 1, bajoVoz: true, db: -3 }),
  c("deseo-3", "impact", "pop", DESEOS.items[2].en, 12, "«un bafle»", { vi: 2, bajoVoz: true, db: -3 }),
  c("ovalo-cristo", "whoosh", "scribble", CRISTO.ovalo, 20, "El óvalo de rotulador alrededor de «Cristo»", { bajoVoz: true, db: -4 }),
  c("ancla-2", "impact", "sparkle", CRISTO.ancla, 28, "«a Cristo en mi vida»: el ancla", { bajoVoz: true }),
  c("trazo-perdonar", "whoosh", "scribble", 823, 16, "Subrayado bajo «perdonar», muy bajo", { bajoVoz: true, db: -8 }),
  c("trazo-amarnos", "whoosh", "scribble", 1019, 16, "Subrayado bajo «amarnos», muy bajo", { bajoVoz: true, db: -8 }),
  c("trazo-mas", "whoosh", "scribble", 1255, 22, "Los tres subrayados del grito, uno solo, bajo el grito", { bajoVoz: true, db: -6 }),
  c("corazones", "impact", "sparkle", 1490, 22, "Los corazones de HZ19 (otro archivo: no es el ancla)", { vi: 1, bajoVoz: true, db: -4 }),
  c("dron-pasillo", "whoosh", "wind", 1726, 34, "El paso más rápido del dron por el pasillo", { db: -2, sale: 10 }),
  c("ancla-3", "impact", "sparkle", GRACIAS.ancla, 28, "Los brazos arriba en «¡Gracias a Dios por la Navidad!»", { bajoVoz: true, db: 2 }),
  c("ancla-4", "impact", "sparkle", 2762, 28, "«…cariño y amor»: la verdad del vídeo", { bajoVoz: true }),
  c("ancla-5", "impact", "sparkle", PUENTE.estrella, 28, "La estrella aparece sobre el círculo"),
  c("estrella-aterriza", "impact", "chime", PUENTE.aterriza, 34, "Aterriza en el centro del círculo"),
  c("hoja", "click", "paper", META.hoja, 22, "Entra la hoja amarilla del CTA", { sale: 8 }),
  c("contador", "impact", "chime", META.cuenta[1], 34, "El 3.000 aterriza", { db: -2 }),
  c("mas-uno", "impact", "pop", META.mas1, 26, "El «+1»: uno puede ser el tuyo", { db: -2 }),
  c("paso-1", "impact", "sparkle", PASOS.pasos[0].en, 28, "La estrella 1 (ancla)", { db: -2 }),
  c("camino-1", "whoosh", "scribble", PASOS.caminos[0], 18, "Se dibuja el camino punteado", { db: -6 }),
  c("paso-2", "impact", "sparkle", PASOS.pasos[1].en, 28, "La estrella 2 (ancla, cada vez −2 dB)", { db: -4 }),
  c("camino-2", "whoosh", "scribble", PASOS.caminos[1], 18, "El segundo camino", { db: -6 }),
  c("paso-3", "impact", "sparkle", PASOS.pasos[2].en, 28, "La estrella 3", { db: -6 }),
  c("pegatina-foto", "click", "paper", CIERRE.foto, 20, "La foto-pegatina se asienta", { sale: 8 }),
  c("ancla-6", "impact", "sparkle", CIERRE.toma, 28, "«Toma una estrellita.»: la última vez del ancla"),
];
