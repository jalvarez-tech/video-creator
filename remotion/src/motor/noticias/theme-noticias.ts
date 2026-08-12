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
  sello: "PROPIEDADES LUXUR" as string | null, // null = sin watermark
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
 * Tipografías — la VOZ del canal (decisión de `Propiedades Luxur`, 2026-08-09).
 *
 * Antes el formato firmaba con un SERIF pesado (Georgia): voz de periódico. Se
 * cambió a la geométrica del sistema —San Francisco— buscando el registro de
 * apple.com: elegante por contención, no por adorno. Es coherente con una marca
 * de inmuebles de gama alta, y sigue leyéndose a velocidad de habla.
 *
 * ⚠️ ESTO CAMBIA TAMBIÉN EL 004 si se vuelve a renderizar: el theme es del
 * formato, no del proyecto. Es deliberado (es la voz del canal, y el canal es el
 * mismo), pero si algún día el 004 tiene que conservar el serif, la salida es
 * mover estas dos constantes a `MARCA` y que cada proyecto elija.
 *
 * POR QUÉ `-apple-system` Y NO "SF Pro Display": la SF Pro descargable de Apple
 * NO está instalada; lo que sí hay es `/System/Library/Fonts/SFNS.ttf`, y Chrome
 * solo llega a ella por las palabras clave `-apple-system`/`BlinkMacSystemFont`.
 * Nombrar la familia a pelo caería al genérico sin avisar.
 *
 * ⚠️ DETERMINISMO ENTRE MÁQUINAS: estas palabras clave resuelven a San Francisco
 * en macOS y a otra cosa en Linux. Mientras el render sea local en Mac (que es el
 * caso), la salida es estable. Para renderizar en CI habría que empaquetar la
 * fuente con @remotion/fonts, no confiar en el sistema.
 *
 * Los dos roles siguen la propia división de Apple (Display para lo grande,
 * Text para lo pequeño), que no es cosmética: cambia el tracking óptico.
 */
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const FUENTE = {
  /** Titulares, cifras, palabra de cierre. Lo que se lee de un vistazo. */
  display: SF,
  /** Subtítulos, kickers, labels, chips. Lo que acompaña. */
  texto: SF,
} as const;

/**
 * Escalas tipográficas EN PX A 1080 DE ANCHO (9:16 — el formato del canal).
 * Mismos cuatro roles que `estilos.ts`, en versión clara y con la familia ya
 * decidida por rol. Si necesitas un quinto rol, casi siempre significa que la
 * escena tiene dos protagonistas.
 *
 *   kicker   → antetítulo / sección / fuente de la noticia. Nunca el mensaje.
 *   titular  → el mensaje de la escena. Uno por escena. DISPLAY, tracking negativo.
 *   cifra    → el dato como protagonista. DISPLAY, tabular-nums, muy apretada.
 *   etiqueta → la frase de apoyo que explica el titular o la cifra.
 *   pie      → label pequeño bajo un icono o una foto.
 */
export const T = {
  kicker: {
    fontFamily: FUENTE.texto,
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: 4,
    textTransform: "uppercase" as const,
    color: N.tintaSuave,
  },
  titular: {
    fontFamily: FUENTE.display,
    fontSize: 96,
    fontWeight: 700,
    letterSpacing: -2.6,
    lineHeight: 1.07,
    color: N.tinta,
    /**
     * El `\n` de un titular ES una decisión de maqueta: dónde parte la frase
     * decide qué palabra queda al final de la línea. Sin esto, HTML lo colapsa
     * a un espacio y la decisión se pierde EN SILENCIO — el 005 se renderizó
     * así: `noticia-005.ts` n16-cierre pide dos líneas y salió una corrida.
     * `pre-line` (no `pre`) porque sigue colapsando la sangría del archivo:
     * solo respeta los saltos escritos a propósito.
     */
    whiteSpace: "pre-line" as const,
  },
  cifra: {
    fontFamily: FUENTE.display,
    fontSize: 220,
    fontWeight: 700,
    letterSpacing: -9,
    lineHeight: 1,
    color: N.tinta,
    fontVariantNumeric: "tabular-nums" as const,
  },
  etiqueta: {
    fontFamily: FUENTE.texto,
    fontSize: 44,
    fontWeight: 500,
    letterSpacing: -0.2,
    lineHeight: 1.25,
    color: N.tintaSuave,
  },
  pie: {
    fontFamily: FUENTE.texto,
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: 0.2,
    color: N.tinta,
  },
  /** Subtítulo sincronizado: sans pesada, la línea que sigue a la voz. */
  subtitulo: {
    fontFamily: FUENTE.texto,
    fontSize: 58,
    fontWeight: 700,
    letterSpacing: -1,
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
  /**
   * Alto del `velo`: el 62 % de 1920 en el que el degradado llega a transparente.
   * Es el mismo número que declara `MOLDES_NOTICIA.cine.scrim`, sacado aquí para
   * que molde, compilador, montador y validador no lo escriban cuatro veces.
   */
  veloAlto: 1190,
  /**
   * Lo que cuelga el titular de un `escenario` desde el borde inferior (el
   * `paddingBottom: 560` del intérprete viejo). Con un titular de una línea el
   * texto se apoya en y=1360: 140 px por encima del carril de subtítulos.
   */
  cuelgaCine: 560,
} as const;

/**
 * EL LOOK DEL METRAJE — lo que hace que tres clips de tres autores parezcan una
 * sola pieza.
 *
 * Va en el TEMA y no en el plan porque es del FORMATO: todo el metraje de este
 * canal se ve así, igual que todo el papel es el mismo beige. Lo que sí es por
 * clip es la CORRECCIÓN que lo iguala (`grado` en la pieza `media`), y eso se
 * mide, no se decide.
 *
 * Y el orden importa, que es la parte que se hace mal: primero se corrige cada
 * clip para que todos partan del mismo sitio, y solo después se aplica esto
 * encima. Un look uniforme sobre clips sin igualar no los une — amplifica sus
 * diferencias, porque cada uno viene ya graduado por su autor.
 */
export const METRAJE = {
  /**
   * El único color vivo de una pieza de este formato es el naranja de marca. Un
   * metraje a plena saturación compite con él, y el ojo va a la foto en vez de
   * al dato.
   */
  saturacion: 0.86,
  /** Un pelo de contraste: el material de banco suele venir plano de fábrica. */
  contraste: 1.05,
  /**
   * Velo cálido sobre el metraje, del color del papel. Es lo que casa un clip
   * frío de stock con un formato que es beige y naranja — y de paso el tinte
   * común es, por sí solo, la herramienta de igualado más barata que hay.
   */
  calido: 0.07,
  /**
   * Grano. El MISMO truco que `FondoPapel` (repeating-conic-gradient, sin
   * imágenes ni dependencias, determinista) y por la misma razón: un grano
   * compartido sobre todo el metraje disimula que cada clip viene de una cámara
   * distinta. Es el match más barato que existe.
   */
  grano: 0.055,
  /** Hunde las esquinas y empuja el ojo al centro del plano. Muy leve. */
  vineta: 0.22,
} as const;

/** `#rrggbb` → `rgba(...)`. Igual que `alfa()` de estilos.ts, sin acoplar los dos themes. */
/** Reexportada de `formato.ts` (era una copia literal de `alfa`). */
export { alfa as alfaN } from "../formato";
