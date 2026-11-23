/**
 * LOS TEXTOS DEL 097 COMO DATOS — qué se lee, cuándo entra y cuándo sale, en frames absolutos a
 * 30 fps. Sale de la columna «texto en pantalla» de `proyectos/097/artefactos/03-timeline.md`, recolocada
 * en la rev. 4 (montaje sobre la pista entera: la alegría antes del testimonio; ver `metraje-097.ts`).
 *
 * Los instantes con «≈» en el timeline (la palabra «Cristo», «perdonar»…) están fijados con la
 * transcripción POR PALABRA de cada plano (`proyectos/097/material/palabras-097.json`, de
 * `herramientas/medir-voces.mjs`) y la voz medida por energía; los que
 * dependen de la voz en off, con la estimación del timeline (5 sílabas por segundo) hasta que
 * llegue la locución grabada.
 *
 * Marcado: `*palabra*` = acento (Dosis 800); su trazo va en el campo `marcas` en el mismo orden.
 * Las citas de las niñas van entre «»; las de la voz en off (piel índigo), sin comillas.
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

// ── La puerta ──
export const TIRAS: Tira[] = [
  { id: "bienvenida", en: 58, sale: 206, texto: "«¡Bienvenidos a la Nuestra!»" },
  // ── Acto 3 ──
  { id: "suenos-p", en: 648, sale: 699, texto: "«¿Cuáles son tus sueños?»" },
  { id: "suenos-r", en: 699, sale: 726, texto: "«Ser *policía*.»" },
  { id: "aprendiste", en: 726, sale: 789, texto: "«¿Qué aprendiste de Dios este año?»" },
  // La pregunta y su respuesta, de corrido en VT10 (rev. 9: fuera la respuesta de VT11, pedido del usuario). El «¡Muchas gracias!» del
  // final de la toma va sin tira: es la niña mirando a cámara, y una tira de 0,7 s solo sería un parpadeo.
  { id: "perdonar", en: 791, sale: 880, texto: "«Es saber a *perdonar* a las demás personas.»", marcas: [{ tipo: "subrayado", en: 823 }] },
  { id: "cualidad-p", en: 932, sale: 1000, texto: "«¿Cuál es la cualidad más bonita de Dios?»" },
  { id: "amarnos", en: 1008, sale: 1061, texto: "«En *amarnos*.»", marcas: [{ tipo: "subrayado", en: 1019 }] },
  // ── La alegría (primer cuerpo de la pieza) ──
  { id: "feliz", en: 1322, sale: 1391, texto: "«¡Feliz Navidad para todos!»" },
  { id: "bueno", en: 1399, sale: 1439, texto: "«¡Dios es bueno!»" },
  // ── El testimonio, trozo a trozo, sin prisa (pasaje íntimo de la pieza) ──
  { id: "relacion-p", en: 2188, sale: 2231, texto: "«¿Cómo va tu relación con Cristo?»" },
  { id: "t1", en: 2239, sale: 2335, texto: "«Mi relación con Cristo es un proceso.»" },
  { id: "t2", en: 2338, sale: 2446, texto: "«Hay veces siento que estamos cerquitas,»" },
  { id: "t3", en: 2449, sale: 2498, texto: "«pero hay veces siento que me alejo,»" },
  { id: "t4", en: 2501, sale: 2538, texto: "«entonces trato de aferrarme»" },
  { id: "t5", en: 2541, sale: 2608, texto: "«a *la verdad de Cristo*.»", marcas: [{ tipo: "subrayado", en: 2571, dur: 16 }] },
  // ── La respuesta y la revelación ──
  { id: "respuesta-p", en: 2620, sale: 2668, texto: "«¿Qué es lo más bonito de recibir un *regalo*?»" },
  { id: "respuesta", en: 2671, sale: 2791, texto: "«Saber que la persona me lo dio con mucho *cariño y amor*.»", marcas: [{ tipo: "subrayado", en: 2730, dur: 18 }] },
  { id: "vo2a", en: 2806, sale: 2915, piel: "indigo", texto: "Ellas reciben su regalo gracias a MAS Estrellitas." },
];

/** El kicker de la fecha y el de la agencia (arriba a la izquierda). La fecha, [POR CONFIRMAR CON MAS: si se puede fechar y nombrar la casa]. */
export const KICKERS = [
  { id: "fecha", en: 6, sale: 206, texto: "20 de noviembre de 2026" },
  { id: "agencia", en: 929, sale: 1061, texto: "Ellas mismas hacían las preguntas." },
] as const;

/** Las pegatinas de deseo: se acumulan de izquierda a derecha (antes → después) y se apagan cuando llega «Cristo». */
export const DESEOS = {
  items: [
    { en: 258, texto: "una radio", giro: -3 },
    { en: 342, texto: "un conejito", giro: 2 },
    { en: 403, texto: "un bafle", giro: -2 },
  ],
  apaga: 488,
  sale: 502,
} as const;

/** El hero de HZ17. */
export const CRISTO = {
  en: 504,
  ovalo: 512,
  ancla: 518,
  linea2: 588,
  grande: 620,
  // Sale con el plano y no antes: «grande» crece en sus últimos 22 f y tiene que verse entero.
  sale: 642,
} as const;

/** La columna de cualidades: cada palabra entra grande y, al llegar la siguiente, pasa a la columna. */
export const CUALIDADES = {
  palabras: [
    { en: 1073, texto: "Amoroso" },
    { en: 1118, texto: "Bondadoso" },
    { en: 1154, texto: "Misericordioso" },
    { en: 1205, texto: "Compasivo" },
    { en: 1235, texto: "¡Fiel!" },
  ],
  sale: 1253,
} as const;

/** El grito de HZ08: tres palabras con su subrayado de color (el trío del lockup). */
export const MAS_GRITO = {
  en: 1253,
  amor: 1280,
  servicio: 1292,
  sale: 1319,
} as const;

/** Los tres corazones de HZ19, junto a las manos (4,0 s de la toma: el corazón de las manos). Viven 14 f: se apagan con el plano. */
export const CORAZONES = [
  { en: 1490, x: 1290, y: 350, dura: 14 },
  { en: 1494, x: 1400, y: 290, dura: 14 },
  { en: 1498, x: 1510, y: 350, dura: 14 },
] as const;

/** El clímax: «¡Gracias a Dios por la Navidad!» y la estrella que sube con los brazos. */
export const GRACIAS = { en: 1922, ancla: 2021, sale: 2060 } as const;

/** El puente: hero abajo y la estrella que baja del cielo al centro del círculo (DR07). */
export const PUENTE = { en: 2917, estrella: 2926, aterriza: 3004, sale: 3022 } as const;

// ── El CTA en papel (P28-P30) ──
export const META = { hoja: 3024, linea1: 3036, cuenta: [3042, 3090] as const, linea2: 3093, mas1: 3138, sale: 3204 } as const;
export const PASOS = {
  encoge: 3204,
  // Los tres pasos, con las palabras del usuario (2026-11-22, rev. 5). Contexto que NO va en pantalla: la estrellita
  // se entrega cuando se da un regalo o una donación.
  pasos: [
    { en: 3216, titulo: "Toma una estrellita del árbol", linea: "en la entrada de la iglesia" },
    { en: 3309, titulo: "Haz tu donación", linea: "en efectivo con los sobres y transferencia" },
    { en: 3357, titulo: "Envía el comprobante", linea: "Cel: 314 520 56 56" },
  ],
  caminos: [3294, 3342] as const,
  fechas: 3420,
  // «Miles de corazones unidos por amor.» (rev. 10, en lugar de «¿Estás lejos? Dona en…»).
  corazones: 3486,
  // Rev. 6: 3 s más que antes (la cuenta se lee con calma) y el vídeo acaba donde la pieza cierra su frase.
  sale: 3714,
} as const;
export const CIERRE = { en: 3714, foto: 3720, toma: 3732, pie: 3741, firma: 3756, comparte: 3771 } as const;

/**
 * LA CUENTA PARA DONAR, tal como la dio el usuario el 2026-11-22 (con el logo de Bancolombia que adjuntó). Va bajo el
 * paso 2. Son DATOS QUE MUEVEN DINERO: la puerta (`proyectos/097/revisar-097.mjs`) los compara uno a uno con los que
 * dio el usuario, para que ningún cambio posterior los altere sin querer.
 */
export const CUENTA = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "928 0000 1770",
  nit: "900 280 179-4",
  celular: "314 520 56 56",
} as const;
