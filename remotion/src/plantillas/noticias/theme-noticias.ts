/**
 * TOKENS DEL FORMATO NOTICIAS — el "look and feel" editorial como código.
 *
 * Cuarto vocabulario del motor, hermano de los tres que ya existen:
 *   theme.ts    → la MARCA del sistema (acento teal, Inter, texto blanco)
 *   motion.ts   → el MOVIMIENTO (muelles, easings, duraciones, stagger)
 *   estilos.ts  → la FORMA de la biblioteca general (sobre fondo OSCURO)
 *   ESTE        → la FORMA del formato noticias (sobre fondo CLARO, editorial)
 *
 * Por qué un theme aparte y no props sueltas: el formato noticias invierte la
 * premisa del resto del sistema. La biblioteca general asume vídeo oscuro con
 * texto blanco encima (`SOMBRA.texto` es obligatoria, `G.tinta` es traslúcida
 * casi negra). Aquí el fondo dominante es PAPEL CLARO y el texto es negro: si
 * reusas `TXT.titular` tal cual, sale blanco sobre beige y no se lee. Este
 * archivo es la contraparte clara, con los mismos cuatro roles tipográficos.
 *
 * Guía humana: manuales/video-noticias/SKILL.md
 *
 * Determinismo: aquí NO hay nada que dependa del frame (misma regla que
 * estilos.ts). Si algo se mueve, vive en motion.ts o en el componente.
 */

/**
 * MARCA — lo único que se toca por canal. Cámbialo aquí y afecta al watermark,
 * al color de acento y a la tipografía de toda la plantilla.
 *
 * `sello` es el texto del watermark persistente (la píldora inferior centrada).
 * Déjalo en null si el canal no lleva sello: la plantilla simplemente no lo
 * monta, sin huecos ni ajustes de layout.
 */
export const MARCA = {
  sello: null as string | null, // p.ej. "TUMARCA.COM" — null = sin watermark
  acento: "#FF5500", // naranja editorial: el ÚNICO color vivo de la pieza
} as const;

/**
 * Paleta editorial. Dos fondos que alternan (papel / negro) y un solo acento.
 *
 * La alternancia papel↔negro NO es decorativa: es la gramática del formato.
 * Negro = "esto pasó" (metraje, retratos, escena reconstruida).
 * Papel = "esto significa" (el gráfico que lo explica).
 * Mezclar los dos registros en una misma escena rompe la lectura.
 */
export const N = {
  /** Fondo dominante: beige cálido tipo papel reciclado premium. */
  papel: "#ECE8DF",
  /** Variante clara para tarjetas y recortes de prensa sobre el papel. */
  hueso: "#F7F5EF",
  /** Fondo cinematográfico: negro puro, no gris. La low-key vive de esto. */
  negro: "#000000",

  /** Texto principal sobre papel. Carbón, nunca #000 (vibra sobre beige). */
  tinta: "#111111",
  /** Texto de apoyo sobre papel: gris CÁLIDO, no azulado. */
  tintaSuave: "#57524A",
  /** Texto sobre negro. */
  blanco: "#FFFFFF",

  /** Acento primario. Bordes de tarjeta, chips, subrayados, énfasis. */
  naranja: MARCA.acento,
  /** El naranja de los chips isométricos: más terroso, con cuerpo. */
  naranjaChip: "#E8863A",
  /** Amarillo de rotulador para resaltar sobre recortes de prensa. */
  resalte: "#FFE24A",

  /** Líneas y separadores sobre papel. */
  linea: "rgba(17,17,17,0.14)",
  /** Sombra proyectada de tarjetas y recortes (15 % — nunca más). */
  sombra: "0 18px 44px rgba(17,17,17,0.15)",
  /** Sombra corta de chips y píldoras. */
  sombraCorta: "0 6px 16px rgba(17,17,17,0.18)",
  /** Sombra de texto SOBRE NEGRO (sobre papel no se usa nunca). */
  sombraTexto: "0 2px 14px rgba(0,0,0,0.75)",
} as const;

/**
 * Tipografías. La decisión de firma del formato: SERIF para lo que afirma,
 * SANS para lo que se lee de pasada.
 *
 * El serif pesado es lo que separa este look de un TikTok genérico: da voz
 * editorial ("un periódico habla") a titulares y cifras. Los subtítulos van en
 * sans porque se leen a velocidad de habla y el serif a 4 palabras/segundo
 * cansa.
 *
 * Sin @remotion/google-fonts instalado, las familias son stacks de sistema:
 * Georgia está en macOS y en el Chrome Headless Shell que usa Remotion. Si un
 * día se instala el paquete, cambia SOLO estas dos constantes.
 */
export const FUENTE = {
  /** Titulares, cifras, palabra de cierre. La voz que afirma. */
  serif: "Georgia, 'Times New Roman', 'Playfair Display', serif",
  /** Subtítulos, kickers, labels, chips. La voz que acompaña. */
  sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
} as const;

/**
 * Escalas tipográficas EN PX A 1080 DE ANCHO (9:16 — el formato del canal).
 * Mismos cuatro roles que `estilos.ts`, en versión clara y con la familia ya
 * decidida por rol. Si necesitas un quinto rol, casi siempre significa que la
 * escena tiene dos protagonistas.
 *
 *   kicker   → antetítulo / sección / fuente de la noticia. Nunca el mensaje.
 *   titular  → el mensaje de la escena. Uno por escena. SERIF.
 *   cifra    → el dato como protagonista. SERIF, tabular-nums.
 *   etiqueta → la frase de apoyo que explica el titular o la cifra.
 *   pie      → label pequeño bajo un icono o una foto.
 */
export const T = {
  kicker: {
    fontFamily: FUENTE.sans,
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 5,
    textTransform: "uppercase" as const,
    color: N.tintaSuave,
  },
  titular: {
    fontFamily: FUENTE.serif,
    fontSize: 96,
    fontWeight: 700,
    letterSpacing: -1.5,
    lineHeight: 1.04,
    color: N.tinta,
  },
  cifra: {
    fontFamily: FUENTE.serif,
    fontSize: 220,
    fontWeight: 700,
    letterSpacing: -4,
    lineHeight: 1,
    color: N.tinta,
    fontVariantNumeric: "tabular-nums" as const,
  },
  etiqueta: {
    fontFamily: FUENTE.sans,
    fontSize: 44,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1.25,
    color: N.tintaSuave,
  },
  pie: {
    fontFamily: FUENTE.sans,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: 0.4,
    color: N.tinta,
  },
  /** Subtítulo sincronizado: sans pesada, la línea que sigue a la voz. */
  subtitulo: {
    fontFamily: FUENTE.sans,
    fontSize: 58,
    fontWeight: 800,
    letterSpacing: -0.5,
    lineHeight: 1.15,
  },
} as const;

/**
 * Geometría del formato en 1080×1920. Son las posiciones que hacen que la pieza
 * se lea igual escena tras escena; cambiarlas por capricho es lo que produce el
 * "salta todo" entre cortes.
 */
export const LAYOUT = {
  /** Margen lateral seguro (11 % — coincide con verticalSocial de presets.ts). */
  margen: 118,
  /** Y del bloque de subtítulos, en px. Encima del watermark. */
  subtituloY: 1500,
  /** Y del watermark (píldora de marca), desde abajo. */
  selloBottom: 250,
  /** Radio de esquina de tarjetas y recortes. */
  radio: 22,
  /** Grosor del borde naranja de las tarjetas de foto. */
  borde: 8,
} as const;

/** `#rrggbb` → `rgba(...)`. Igual que `alfa()` de estilos.ts, sin acoplar los dos themes. */
export const alfaN = (hex: string, a: number): string => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
