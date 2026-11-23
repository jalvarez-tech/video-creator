/**
 * LOS TEXTOS DEL 106 COMO DATOS — qué se lee, cuándo entra y cuándo sale, en frames absolutos a 30 fps. Sale de
 * `proyectos/106/artefactos/03-timeline.md`. Las frases y sus instantes son los del 105 (mismos cortes y voces), medidos
 * por energía y por palabra (`proyectos/106/herramientas/medir-voces.mjs` → `proyectos/106/material/palabras-106.json`).
 *
 * El reparto 16:9 (el de 098-100): lo que dicen, ABAJO, en UNA tira a la vez; la pregunta que se queda mientras responden,
 * ARRIBA a la izquierda, en el kicker; el lema, en el grito con el trío del lockup. Las frases de las niñas van entre «»;
 * la de MAS (piel índigo), sin comillas.
 * Marcado: `*palabra*` = acento (Dosis 800); su trazo va en `marcas` en el mismo orden.
 */

export interface Tira {
  id: string;
  en: number;
  sale: number;
  texto: string;
  piel?: "papel" | "indigo";
  marcas?: ({ tipo: "subrayado" | "ovalo"; en: number; dur?: number } | null)[];
  centrada?: boolean;
  /** «POR CONFIRMAR …» cuando una palabra no se ha oído: la puerta lo avisa y con `--final` falla. */
  nota?: string;
}

export const TIRAS: Tira[] = [
  // El gancho YA está puesto en el frame 0 (la miniatura): entra en f−14, así que en f0 la tira está abierta y quieta.
  { id: "noticias", en: -14, sale: 107, texto: "«Hola, en últimas noticias: un lugar *maravilloso*.»", marcas: [{ tipo: "subrayado", en: 80 }] },
  // VT21: lo que gritan después de «¡Bienvenidos…!» no se entiende (whisper: «nuestro canal»): solo va lo seguro.
  { id: "bienvenidos", en: 172, sale: 210, texto: "«¡*Bienvenidos*!»", marcas: [{ tipo: "subrayado", en: 182 }] },
  { id: "club", en: 216, sale: 405, texto: "«Aquí es el club de hablar y de *resolver problemas*.»", marcas: [{ tipo: "subrayado", en: 323 }] },
  { id: "mascota", en: 410, sale: 534, texto: "«Si tendrías una *mascota*, ¿cuál tendrías?»", marcas: [{ tipo: "subrayado", en: 465 }] },
  { id: "animal", en: 534, sale: 588, texto: "«De perro, gato, cualquier *animal*.»", marcas: [{ tipo: "subrayado", en: 573 }] },
  { id: "conejo", en: 590, sale: 644, texto: "«¡Un *conejo*!»", marcas: [{ tipo: "subrayado", en: 600 }] },
  { id: "ave", en: 646, sale: 699, texto: "«Si tendrías un *ave*, ¿cuál tendrías?»", marcas: [{ tipo: "subrayado", en: 668 }] },
  {
    id: "colibri", en: 702, sale: 765, texto: "«Un *colibrí*.»", marcas: [{ tipo: "subrayado", en: 716 }],
    nota: "POR CONFIRMAR de oído: whisper oye «Un cole y un re» (el mapa del 097: «Un coley brín»)",
  },
  { id: "regalo", en: 767, sale: 857, texto: "«¿Qué es lo más bonito de recibir un *regalo*?»", marcas: [{ tipo: "subrayado", en: 836 }] },
  { id: "navidad", en: 864, sale: 892, texto: "«La *Navidad*.»", marcas: [{ tipo: "subrayado", en: 869 }] },
  // La pregunta de la cualidad, abajo mientras la dice (f896-f947); luego sube al kicker y abajo van las respuestas.
  { id: "cualidad", en: 893, sale: 952, texto: "«¿Cuál es la cualidad más bonita de *Dios*?»", marcas: [{ tipo: "subrayado", en: 940 }] },
  { id: "palabra", en: 954, sale: 998, texto: "«La palabra de *Dios*.»", marcas: [{ tipo: "subrayado", en: 978 }] },
  { id: "bondadoso", en: 1003, sale: 1040, texto: "«¡*Bondadoso*!»", marcas: [{ tipo: "subrayado", en: 1010 }] },
  { id: "inmortal", en: 1045, sale: 1106, texto: "«¡Un Dios *inmortal*!»", marcas: [{ tipo: "subrayado", en: 1070 }] },
  { id: "oportunidades", en: 1108, sale: 1189, texto: "«Y para mí es un Dios de *oportunidades*.»", marcas: [{ tipo: "subrayado", en: 1163 }] },
  { id: "feliz", en: 1278, sale: 1328, texto: "«¡Feliz *Navidad* para todos!»", marcas: [{ tipo: "subrayado", en: 1288 }] },
  // La despedida (DR01, sin palabras): lo que hace MAS, en la piel índigo, la frase del 100.
  { id: "mas", en: 1336, sale: 1440, piel: "indigo", texto: "Ellas reciben su regalo gracias a *MAS Estrellitas*." },
];

/** Los kickers, arriba a la izquierda: la campaña en la miniatura, y la pregunta que se queda mientras responden. */
export const KICKERS = [
  { id: "campana", en: -10, sale: 210, texto: "MAS Estrellitas 2026" },
  { id: "cualidad", en: 950, sale: 1189, texto: "«¿Cuál es la cualidad más bonita de Dios?»" },
] as const;

/**
 * El lema de HZ09, en el grito con el trío del lockup (verde, lavanda, rojo): «Amor» f1219, «Servicio» f1230.
 * POR CONFIRMAR de oído el arranque «Misericordia» (097 §6: «Amor y Servicio» se oye claro, el principio no).
 */
export const MAS_GRITO = { en: 1192, amor: 1219, servicio: 1230, sale: 1270, nota: "POR CONFIRMAR de oído: el arranque «Misericordia»" } as const;

// ── El CTA en papel (f1446-1755), el del 100 desplazado: la meta, los tres pasos, la cuenta y los logos ──
const H = 1446;
export const PAPEL = {
  hoja: H,
  meta: H + 8,
  pasos: [H + 21, H + 47, H + 75] as const,
  caminos: [H + 37, H + 65] as const,
  cuenta: H + 55,
  tuyo: H + 101,
  fechas: H + 115,
  logos: H + 129,
} as const;

export const PASOS = [
  { titulo: "Toma una estrellita del árbol", linea: "en la entrada de la iglesia" },
  { titulo: "Haz tu donación", linea: "en efectivo con los sobres y transferencia" },
  { titulo: "Envía el comprobante", linea: "Cel: 314 520 56 56" },
] as const;

/**
 * LA CUENTA PARA DONAR, copiada de `CUENTA` en `remotion/src/proyectos/097/textos-097.ts` (la dio el usuario el
 * 2026-11-22). Son DATOS QUE MUEVEN DINERO: `proyectos/106/revisar-106.mjs` los compara dígito a dígito con los del
 * usuario y con los del 097.
 */
export const CUENTA = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "928 0000 1770",
  nit: "900 280 179-4",
  celular: "314 520 56 56",
} as const;
