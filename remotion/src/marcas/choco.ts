/**
 * AYUDEMOS A CHOCÓ — la marca de la campaña humanitaria de Juan Papita
 * (proyecto 008: terremoto en Chocó/Quibdó, 2026-08).
 *
 * NO es un canal comercial: es una campaña, y eso decide dos cosas. El sello
 * es el nombre de la campaña —no el del negocio—, y la paleta baja la voz:
 * papel arena, carbón cálido y UN ámbar tierra que significa «la solidaridad /
 * lo que se hace». El dolor no lleva color: lleva silencio (01-plan.md §color).
 *
 * EL ACENTO PASA CONTRASTE, y es la corrección aprendida del canal Luxur: su
 * naranja #FF5500 da 2,62:1 sobre papel y es tinta de texto en 004–007
 * (memoria `acento-luxur-contraste`). Este #B45309 da ≈4,2:1 sobre este papel:
 * suficiente para display/kickers (≥3:1), que es donde el dialecto lo usa.
 *
 * El METRAJE es el look documental de la pieza: desaturado y con grano — la
 * progresión frío→cálido del brief se hace POR TOMA con `grado`, no aquí.
 *
 * Tipografía: la del suelo (SF del sistema) con sus CUATRO tablas ya medidas —
 * una fuente nueva sin tabla apagaría R09 en silencio (motor/marca.ts).
 */
import { MARCA_BASE } from "../motor/marca";
import type { Marca } from "../motor/marca";

export const CHOCO: Marca = {
  ...MARCA_BASE,
  nombre: "Ayudemos a Chocó (Juan Papita)",
  /** El watermark de todos los frames: la campaña, no el comercio. */
  sello: { texto: "AYUDEMOS A CHOCÓ" },
  color: {
    ...MARCA_BASE.color,
    /** Ámbar tierra: solidaridad/acción. 4,2:1 sobre `papel` (display OK). */
    acento: "#B45309",
    acentoChip: "#D97706",
    /** Papel arena, un punto más cálido que el del suelo del motor. */
    papel: "#EFE9DC",
    hueso: "#F8F4EA",
    /** Carbón cálido, nunca #000 (vibra sobre el arena). */
    tinta: "#161310",
    tintaSuave: "#5C5348",
    linea: "rgba(22,19,16,0.14)",
    /** El mismo ámbar con luz para el registro oscuro (aquí no hay teal). */
    acentoOscuro: "#D97706",
  },
  /** Look documental: desaturado, con grano y viñeta algo más presentes que
   *  el editorial de noticias. El viraje frío→cálido va POR TOMA (`grado`). */
  metraje: { saturacion: 0.8, contraste: 1.06, calido: 0.05, grano: 0.065, vineta: 0.26 },
};
