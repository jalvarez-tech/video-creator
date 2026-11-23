/**
 * LOS TEXTOS DEL 098 COMO DATOS — qué se lee, cuándo entra y cuándo sale, en frames absolutos a 30 fps. Sale de
 * `proyectos/098/artefactos/03-timeline.md`.
 *
 * Cada frase de una niña lleva su tira entre «», del instante en que empieza a hablar al de su última sílaba (con unos
 * frames de aire). Los instantes salen de la energía de cada WAV y de `proyectos/097/material/palabras-097.json`, pasados
 * a frames del 098 con el `desde` y el `en` de cada plano (`metraje-098.ts`). No hay voz en off: el único texto que no
 * dicen ellas es el del CTA, copiado del 097.
 *
 * Marcado: `*palabra*` = acento (Dosis 800); su trazo va en `marcas`, en el mismo orden.
 */

export interface Tira {
  id: string;
  en: number;
  sale: number;
  texto: string;
  /** Un trazo por acento, en orden (null = acento sin trazo). */
  marcas?: ({ tipo: "subrayado" | "ovalo"; en: number; dur?: number } | null)[];
}

export const TIRAS: Tira[] = [
  // VT07, una sola toma (rev. 2): f = 139 + (s − 3,8) × 30. La pregunta, 3,96-5,25 s.
  { id: "relacion-p", en: 144, sale: 186, texto: "«¿Cómo va tu relación con Cristo?»" },
  // El testimonio, frase a frase (los cortes de frase, los del 097, medidos por energía).
  { id: "t1", en: 202, sale: 297, texto: "«Mi relación con Cristo es un proceso.»" },
  { id: "t2", en: 301, sale: 408, texto: "«Hay veces siento que estamos cerquitas,»" },
  { id: "t3", en: 411, sale: 461, texto: "«pero hay veces siento que me alejo,»" },
  { id: "t4", en: 464, sale: 501, texto: "«entonces trato de aferrarme»" },
  // Ya sobre las manos (FT30, desde f490): su voz sigue en L.
  { id: "t5", en: 504, sale: 572, texto: "«a *la verdad de Cristo*.»", marcas: [{ tipo: "subrayado", en: 534, dur: 16 }] },
  // VT10 · la pregunta entra en J, todavía sobre las manos (2,41-3,91 s; f = 640 + (s − 3,5) × 30)
  { id: "aprendiste", en: 608, sale: 668, texto: "«¿Qué aprendiste de Dios este año?»" },
  { id: "perdonar", en: 671, sale: 756, texto: "«Es saber a *perdonar* a las demás personas.»", marcas: [{ tipo: "subrayado", en: 696 }] },
  // VT06 (f = 756 + (s − 2,7) × 30 y f = 807 + (s − 4,7) × 30)
  { id: "regalo-p", en: 759, sale: 807, texto: "«¿Qué es lo más bonito de recibir un regalo?»" },
  { id: "regalo", en: 810, sale: 902, texto: "«Saber que la persona me lo dio con mucho *cariño y amor*.»", marcas: [{ tipo: "subrayado", en: 869, dur: 18 }] },
  // HZ17 · solo hasta «vida» (f = 1124 + (s − 0,5) × 30; «Cristo», por energía, 3,0-3,65 s)
  { id: "cristo", en: 1130, sale: 1241, texto: "«Yo lo que quiero en Navidad es a *Cristo* en mi vida.»", marcas: [{ tipo: "ovalo", en: 1200, dur: 16 }] },
];

/** El kicker del frame 0 (la miniatura): ya puesto en f0, sin animación de entrada. */
export const KICKER = { en: 0, sale: 132, texto: "MAS Estrellitas 2026" } as const;

/** La estrella sobre el círculo de DR07: aparece en la cima de la música y baja a su centro vacío; en f1478 la recoge el papel. */
export const ESTRELLA = { aparece: 1357, aterriza: 1450, sale: 1478 } as const;

// ── El CTA en papel (P12, f1478-f1794): la versión compacta del CTA del 097 ──
export const CTA = {
  hoja: 1478,
  resumen: 1486,
  // Los tres pasos, con las palabras del usuario (097, rev. 5). La estrellita se entrega cuando se da un regalo o una donación.
  pasos: [
    { en: 1502, titulo: "Toma una estrellita del árbol", linea: "en la entrada de la iglesia" },
    { en: 1524, titulo: "Haz tu donación", linea: "en efectivo con los sobres y transferencia" },
    { en: 1546, titulo: "Envía el comprobante", linea: "Cel: 314 520 56 56" },
  ],
  caminos: [1512, 1534] as const,
  tarjeta: 1532,
  corazones: 1570,
  firma: 1595,
  fechas: 1610,
} as const;

/**
 * LA CUENTA PARA DONAR, tal como la dio el usuario el 2026-11-22 para el 097 (`textos-097.ts`). Son DATOS QUE MUEVEN
 * DINERO: la puerta (`proyectos/098/revisar-098.mjs`) los compara uno a uno con los esperados, para que ningún cambio
 * posterior los altere sin querer.
 */
export const CUENTA = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "928 0000 1770",
  nit: "900 280 179-4",
  celular: "314 520 56 56",
} as const;
