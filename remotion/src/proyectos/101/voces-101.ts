/**
 * GENERADO por `proyectos/101/herramientas/medir-voces.mjs 101`: no se edita a mano.
 * Dónde habla cada tramo (s0/s1, segundos de la FUENTE; f0/f1, frames de la COMP) y a qué sonoridad
 * (LUFS integrados de su ventana de voz, `limites-voz.py --margen 12`). `historia.ts` iguala con esto.
 * Música medida: -11.6 LUFS.
 */
import type { VocesMedidas } from "../101/historia";

export const VOCES_101: VocesMedidas = {
  "voz-pregunta": {
    "s0": 3.96,
    "s1": 5.43,
    "lufs": -7.14,
    "f0": 5,
    "f1": 49
  },
  "voz-testimonio": {
    "s0": 5.93,
    "s1": 17.93,
    "lufs": -25.71,
    "f0": 64,
    "f1": 424
  }
};
