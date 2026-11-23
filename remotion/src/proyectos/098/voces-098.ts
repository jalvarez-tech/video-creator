/**
 * GENERADO por `proyectos/098/herramientas/medir-voces.mjs`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, `limites-voz.py --margen 12`). `audio-098.ts` iguala con esto.
 */
export const VOCES_098: Record<string, { s0: number | null; s1: number | null; lufs: number | null; f0: number | null; f1: number | null }> = {
  "voz-p02a-vt07": {
    "s0": 3.96,
    "s1": 5.4,
    "lufs": -6.88,
    "f0": 144,
    "f1": 187
  },
  "voz-p02b-vt07": {
    "s0": 5.93,
    "s1": 17.93,
    "lufs": -25.71,
    "f0": 203,
    "f1": 563
  },
  "voz-p05a-vt10": {
    "s0": 2.4,
    "s1": 3.91,
    "lufs": -14.68,
    "f0": 607,
    "f1": 652
  },
  "voz-p05b-vt10": {
    "s0": 4.52,
    "s1": 7.37,
    "lufs": -28.68,
    "f0": 671,
    "f1": 756
  },
  "voz-p06-vt06": {
    "s0": 2.83,
    "s1": 4.37,
    "lufs": -13.91,
    "f0": 760,
    "f1": 806
  },
  "voz-p07-vt06": {
    "s0": 4.77,
    "s1": 7.75,
    "lufs": -30.31,
    "f0": 809,
    "f1": 899
  },
  "voz-p10-hz17": {
    "s0": 0.76,
    "s1": 4.35,
    "lufs": -17.42,
    "f0": 1132,
    "f1": 1240
  }
};
