/**
 * LOS TEXTOS DEL 100 COMO DATOS — qué se lee, cuándo entra y cuándo sale, en frames absolutos a 30 fps. Sale de
 * `proyectos/100/artefactos/03-timeline.md`; los instantes, de la voz medida por energía y de la transcripción por palabra
 * de cada plano (`proyectos/100/musica/palabras-100.json`, de `herramientas/medir-voces.mjs`).
 *
 * Marcado: `*palabra*` = acento (Dosis 800); su trazo va en `marcas` en el mismo orden. Las frases de las niñas van entre «»;
 * la de MAS (piel índigo), sin comillas. SIN voz en off: lo que dice MAS solo se lee.
 */

export interface Tira {
  id: string;
  en: number;
  sale: number;
  texto: string;
  piel?: "papel" | "indigo";
  marcas?: ({ tipo: "subrayado" | "ovalo"; en: number; dur?: number } | null)[];
  centrada?: boolean;
}

export const TIRAS: Tira[] = [
  // «la Nuestra»: el nombre de la casa, POR CONFIRMAR CON MAS (la puerta lo avisa; con --final es error).
  { id: "bienvenida", en: 58, sale: 197, texto: "«¡Bienvenidos a la Nuestra!»" },
  // VT13 por energía: la pregunta 0,8-1,5 s (f209-f230) y la respuesta 2,5-3,1 s (f260-f278).
  { id: "suenos-p", en: 206, sale: 257, texto: "«¿Cuáles son tus sueños?»" },
  { id: "suenos-r", en: 257, sale: 287, texto: "«Ser *policía*.»", marcas: [{ tipo: "subrayado", en: 263 }] },
  // HZ10: «¡Feliz Navidad para todos!» de f538 a f617.
  { id: "feliz", en: 541, sale: 620, texto: "«¡Feliz Navidad para todos!»" },
  // HZ19: «¡Dios es bueno!» de f693 a ≈ f738; la segunda frase no suena ni se lee.
  { id: "bueno", en: 695, sale: 742, texto: "«¡Dios es bueno!»" },
  // La bajada: lo que hace MAS, en la piel índigo (la del 097 para MAS), sobre el cielo del atardecer.
  { id: "mas", en: 1318, sale: 1484, piel: "indigo", texto: "Ellas reciben su regalo gracias a *MAS Estrellitas*." },
];

/** El kicker de la campaña, arriba a la izquierda, puesto YA en el frame 0 (la miniatura). Sin fecha: está por confirmar con MAS. */
export const KICKER = { en: -10, sale: 197, texto: "MAS Estrellitas 2026" } as const;

/** Las pegatinas de los deseos: se pegan en la palabra, sobre un golpe del redoble, y se van cuando estalla el pleno. */
export const DESEOS = {
  items: [
    { en: 333, texto: "una radio", giro: -3 }, // «radio» f333 · golpe f333 (10 dB)
    { en: 414, texto: "un conejito", giro: 2 }, // «conejito» f412 · golpe f414 (13 dB)
    { en: 475, texto: "un bafle", giro: -2 }, // «bafle» f472 · golpe f475 (13 dB)
  ],
  sale: 538,
} as const;

/** El grito de HZ08: tres palabras con el subrayado del trío del lockup («Amor» f648, «Servicio» f661). */
export const MAS_GRITO = { en: 622, amor: 648, servicio: 660, sale: 685 } as const;

/** El clímax: «¡Gracias a Dios por la Navidad!» (f1133-f1230) y la estrella que sube con los brazos (≈ f1235). */
export const GRACIAS = { en: 1134, ancla: 1235, sale: 1272 } as const;

// ── El CTA en papel (f1491-1800), compacto: la meta, los tres pasos, la cuenta y los logos ──
export const PAPEL = {
  hoja: 1491,
  meta: 1499,
  pasos: [1512, 1538, 1566] as const,
  caminos: [1528, 1556] as const,
  cuenta: 1546,
  tuyo: 1592,
  fechas: 1606,
  logos: 1620,
} as const;

export const PASOS = [
  { titulo: "Toma una estrellita del árbol", linea: "en la entrada de la iglesia" },
  { titulo: "Haz tu donación", linea: "en efectivo con los sobres y transferencia" },
  { titulo: "Envía el comprobante", linea: "Cel: 314 520 56 56" },
] as const;

/**
 * LA CUENTA PARA DONAR, copiada de `CUENTA` en `remotion/src/proyectos/097/textos-097.ts` (la dio el usuario el
 * 2026-11-22). Son DATOS QUE MUEVEN DINERO: `proyectos/100/revisar-100.mjs` los compara dígito a dígito con los del usuario
 * y con los del 097.
 */
export const CUENTA = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "928 0000 1770",
  nit: "900 280 179-4",
  celular: "314 520 56 56",
} as const;
