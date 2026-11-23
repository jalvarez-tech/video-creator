/**
 * GENERADO por `proyectos/101/herramientas/medir-voces.mjs 102`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, `limites-voz.py --margen 12`). `historia.ts` iguala con esto.
 * Música medida: -16.3 LUFS.
 */
import type { VocesMedidas } from "../101/historia";

export const VOCES_102: VocesMedidas = {
  "voz-regalo-p": {
    "s0": 2.83,
    "s1": 4.34,
    "lufs": -13.9,
    "f0": 1,
    "f1": 46
  },
  "voz-regalo-r": {
    "s0": 4.77,
    "s1": 7.75,
    "lufs": -30.37,
    "f0": 51,
    "f1": 141
  },
  "voz-aprendiste-p": {
    "s0": 2.4,
    "s1": 3.91,
    "lufs": -14.68,
    "f0": 148,
    "f1": 193
  },
  "voz-perdonar": {
    "s0": 4.51,
    "s1": 7.37,
    "lufs": -28.8,
    "f0": 211,
    "f1": 297
  },
  "voz-compasiva": {
    "s0": 7.44,
    "s1": 12.23,
    "lufs": -25.18,
    "f0": 303,
    "f1": 447
  }
};
