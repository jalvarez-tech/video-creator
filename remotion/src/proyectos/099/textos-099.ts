/**
 * LOS TEXTOS DEL 099 COMO DATOS — qué se lee, cuándo entra y cuándo sale, en frames absolutos a 30 fps. Sale de la
 * columna «Texto» de `proyectos/099/artefactos/03-timeline.md`; los instantes de cada palabra, de la voz medida por
 * energía en cada plano (`proyectos/099/herramientas/medir-voces.mjs`).
 *
 * Sin voz en off: todo lo que se lee lo dicen las niñas (entre «») salvo el kicker, el puente y el CTA.
 * Marcado: `*palabra*` = acento (Dosis 800); su trazo va en el campo `marcas` en el mismo orden.
 *
 * NO salen (por confirmar con MAS): la fecha «20 de noviembre de 2026» ni el nombre de la casa. La puerta lo comprueba.
 */

export interface Tira {
  id: string;
  en: number;
  sale: number;
  texto: string;
  piel?: "papel" | "indigo";
  /** Un trazo por acento, en orden (null = acento sin trazo). */
  marcas?: ({ tipo: "subrayado" | "ovalo"; en: number; dur?: number } | null)[];
  centrada?: boolean;
}

export const TIRAS: Tira[] = [
  // La pregunta YA está puesta en el frame 0 (la miniatura): entra en f−14, así que en f0 la tira está abierta y la frase quieta.
  { id: "cualidad-p", en: -14, sale: 70, texto: "«¿Cuál es la cualidad más bonita de Dios?»" },
  { id: "amarnos", en: 80, sale: 131, texto: "«En *amarnos*.»", marcas: [{ tipo: "subrayado", en: 94 }] },
  // El conejito, para que se LEA el paralelo con la siguiente («Yo lo que quiero… es…»).
  { id: "conejito", en: 461, sale: 533, texto: "«Yo lo que quiero pedir de Navidad es un *conejito*.»" },
  { id: "quiero", en: 541, sale: 606, texto: "«Yo lo que quiero en Navidad es…»" },
  // «¡Dios es bueno!» (0,5-3,2 s de HZ19); la segunda frase (⚠ «¡Aleluya!» o «¡A la lucha!») va sin tira: sin oír.
  { id: "bueno", en: 946, sale: 1027, texto: "«¡Dios es *bueno*!»" },
];

/** El kicker (arriba a la izquierda), con la pregunta: quién preguntaba. */
export const KICKERS = [{ id: "agencia", en: -8, sale: 131, texto: "Ellas mismas hacían las preguntas." }] as const;

/**
 * La letanía: cada palabra entra grande (3 f después de que la niña empieza a decirla) y, al llegar la siguiente, sube a
 * la columna de la derecha. Se van apilando: al final, las ocho juntas.
 */
export const CUALIDADES = {
  palabras: [
    { en: 143, texto: "Amoroso" },
    { en: 189, texto: "Bondadoso" },
    { en: 231, texto: "Misericordioso" },
    { en: 297, texto: "Paciente" },
    { en: 338, texto: "Compasivo" },
    { en: 370, texto: "Amable" },
    { en: 410, texto: "Justo" },
    { en: 445, texto: "¡Fiel!" },
  ],
  sale: 458,
} as const;

/** El hero de HZ17: «a Cristo en mi vida» cuando la niña dice «Cristo» (3,1 s de la toma) y «y una Biblia muy grande». */
export const CRISTO = {
  en: 612,
  ovalo: 620,
  ancla: 626,
  linea2: 696,
  grande: 728,
  // Sale con el plano: «grande» crece en sus últimos frames y tiene que verse entero.
  sale: 756,
} as const;

/** El lema de HZ08: tres palabras con su subrayado de color (el trío del lockup). */
export const MAS_GRITO = {
  en: 873,
  amor: 905,
  servicio: 917,
  sale: 943,
} as const;

/** Los tres corazones de HZ19, sobre las niñas de la derecha que hacen el corazón con las manos (≈ 3,6 s de la toma). Viven 14 f. */
export const CORAZONES = [
  { en: 1039, x: 1360, y: 400, dura: 14 },
  { en: 1043, x: 1470, y: 340, dura: 14 },
  { en: 1047, x: 1580, y: 400, dura: 14 },
] as const;

/** El clímax: «¡Gracias a Dios por la Navidad!» y la estrella que sube con los brazos (4,3 s de HZ32). */
export const GRACIAS = { en: 1204, ancla: 1303, sale: 1342 } as const;

/** El puente (DR07): el hero abajo y la estrella que baja del cielo al centro del círculo. */
export const PUENTE = { en: 1380, estrella: 1388, aterriza: 1466, sale: 1480 } as const;

// ── El CTA en papel, compacto (f1482-f1815): una sola hoja que se va llenando ──
export const HOJA = { en: 1482, fin: 1815 } as const;
export const RESUMEN = { en: 1490, cuenta: [1494, 1518] as const, mas1: 1524 } as const;
export const PASOS = {
  pasos: [
    { en: 1506, titulo: "Toma una estrellita del árbol", linea: "en la entrada de la iglesia" },
    { en: 1545, titulo: "Haz tu donación", linea: "en efectivo con los sobres y transferencia" },
    { en: 1595, titulo: "Envía el comprobante", linea: "Cel: 314 520 56 56" },
  ],
  caminos: [1530, 1580] as const,
  cuenta: 1553,
  fechas: 1625,
  corazones: 1650,
  firma: 1675,
} as const;

/**
 * LA CUENTA PARA DONAR, la misma del 097 (la dio el usuario el 2026-11-22, con el logo de Bancolombia). Son DATOS QUE
 * MUEVEN DINERO: la puerta (`proyectos/099/revisar-099.mjs`) los compara uno a uno con los que dio el usuario.
 */
export const CUENTA = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "928 0000 1770",
  nit: "900 280 179-4",
  celular: "314 520 56 56",
} as const;
