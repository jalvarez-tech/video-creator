/**
 * GENERADO por `proyectos/101/herramientas/medir-voces.mjs 104`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, `limites-voz.py --margen 12`). `historia.ts` iguala con esto.
 * Música medida: -20.2 LUFS.
 */
import type { VocesMedidas } from "../101/historia";

export const VOCES_104: VocesMedidas = {
  "voz-bienvenidos": {
    "s0": 0.62,
    "s1": 4.35,
    "lufs": -23.53,
    "f0": 5,
    "f1": 117
  },
  "voz-papito": {
    "s0": 6.06,
    "s1": 7.1,
    "lufs": -23.48,
    "f0": 136,
    "f1": 168
  },
  "voz-agradecer": {
    "s0": 8.15,
    "s1": 11.64,
    "lufs": -30.97,
    "f0": 194,
    "f1": 298
  },
  "voz-perrito": {
    "s0": 48.37,
    "s1": 52.04,
    "lufs": -27.99,
    "f0": 326,
    "f1": 436
  },
  "voz-viaje": {
    "s0": 64.95,
    "s1": 66.94,
    "lufs": -20.59,
    "f0": 458,
    "f1": 518
  }
};
