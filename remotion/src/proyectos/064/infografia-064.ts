/**
 * LA INFOGRAFÍA DEL 064 — las DISTANCIAS del lote, como DATOS (cifras, textos, tiempos y medidas).
 *
 * ES UN ENCARGO DEL USUARIO (2026-10-22, por la sesión madre; reparto 063-065 rev. 2): «si dice "ven, te muestro cómo", puedes crear unos infográficos y resaltar las amenidades». Aquí, tras «ven, te muestro», entra
 * sobre el dron la infografía de DISTANCIAS con los datos de la ficha: **1 hora de Medellín** y **15 minutos de la autopista Medellín-Bogotá**. Son los números que la voz NO dice (la voz ya dijo 350 millones y 3.244
 * metros en el hook y dirá «tres horas» y 3.244 metros en la mitad): la pantalla AÑADE, no repite. Sin energía, uso del suelo, vía de acceso ni «apto para construir»: la ficha no los da. La ficha dice «~1 hora»: el pie
 * lo declara («Tiempos aproximados»).
 *
 * LA ESCENA (como en el 060, que el usuario aprobó: SIN animar los números, uno a uno, con tiempo para leerlos). Cada cifra entra COMPLETA con un fundido de 8 f y sin recuento, y se queda hasta que se va la infografía:
 *   · FILA «De Medellín · 1 hora» (88 px): entra en el arpegio de 6,3 dB del f390 y se queda 5,1 s;
 *   · HÉROE «De la autopista Medellín-Bogotá · 15 minutos» (132 px, con el nombre en Playfair itálica): entra en el arpegio de 7,9 dB del f434 (1,5 s después), con el filete dorado dibujándose antes, y se lee entero 3,6 s;
 *   · PIE «Tiempos aproximados»: 16 f después del héroe.
 * Va sobre un VELO de la franja central (0,68; no a pantalla completa: el dron se sigue viendo arriba y abajo) que sube con el primer plano de dron y se va con el último fotograma de la infografía. Un solo héroe a la vez.
 *
 * ZONA. Todo CENTRADO en vertical sobre y 960 (la mitad del fotograma y del cuadrado 1:1 del feed, y 420-1500) y dentro de y 570-1350 (150 px de margen a cada lado del cuadrado): lo que el 060 fijó tras el encargo «centralo a
 * la mitad verticalmente para que en el 1x1 no se recorte arriba». La ficha de la versión 1:1 SALE mientras dura la infografía (`herramientas/ficha-oculta.mjs`), así que no se pisan. Letra: la del canal (Montserrat 500 para las
 * etiquetas, 700 para las cifras, Playfair Display itálica para el nombre del héroe); filete dorado `#c6a878`.
 *
 * Datos puros: solo `import` de otro archivo de datos (`metraje-064.ts`). La puerta lo carga con node.
 */
import { EN_INFO_064, EN_MITAD_064, golpe } from "./metraje-064";

/** El filete dorado del canal (el de la portada y la ficha). */
export const ORO = "#c6a878";

/** Las dos cifras de la ficha (la web, leída el 2026-10-22): una hora de Medellín (aprox.) y 15 minutos de la autopista Medellín-Bogotá. */
export const CIFRAS = {
  /** «~1 hora de Medellín» (la ficha dice «aproximadamente»). */
  horaMedellin: 1,
  /** «15 minutos de la autopista Medellín-Bogotá». */
  minutosAutopista: 15,
} as const;

/** Los textos, tal como los pinta la infografía. */
export const TEXTOS_INFO = {
  etiqueta: "De Medellín",
  valorHora: "1 hora",
  heroe: "De la autopista Medellín-Bogotá",
  valorMinutos: "15 minutos",
  pie: "Tiempos aproximados",
} as const;

/** Cuerpos (px de 1080×1920). La puerta mide cada texto con las tablas de la letra del canal. */
export const PX = {
  etiqueta: 28,
  valor: 88,
  heroeEtiqueta: 56,
  heroeValor: 132,
  pie: 28,
} as const;

/** Interletrado de las etiquetas en versalitas (em): la tabla de avances no lo incluye y la puerta lo suma. */
export const TRACKING_ETIQUETA = 0.16;

/** La columna de texto: 100 px de margen a cada lado. */
export const COLUMNA = { izquierda: 100, ancho: 880 } as const;

/** La zona segura: el cuadrado 1:1 del feed (y 420-1500) con 150 px de margen a cada lado; el centro del cuadrado y del fotograma es y 960. */
export const ZONA = { arriba: 570, abajo: 1350 } as const;

/** El centro vertical (px de 1080×1920) sobre el que se centra la infografía. */
export const CENTRO_Y = 960;

/**
 * El velo: una franja central (no a pantalla completa, para que el dron se vea arriba y abajo) con borde suave. `panel` es la opacidad del negro en el centro de la franja; `arriba` y `abajo`, dónde empieza y
 * acaba el degradado; `borde`, lo que tarda en llegar de 0 a `panel`. Se midió contra los planos de fondo (`medidas/legibilidad-infografia.txt`).
 */
export const VELO = { panel: 0.68, rampa: 8, arriba: 500, abajo: 1420, borde: 230 } as const;

/** Los golpes de la canción en que entra cada elemento (medidos: `musica/golpes-cancion-60-127.json`). */
export const GOLPES_INFO = {
  hora: { t: 99.484, db: 6.3 },
  autopista: { t: 100.934, db: 7.9 },
} as const;

/** Frames que dura cada movimiento. */
export const DUR = {
  /** Una fila, una etiqueta, un héroe: un fundido corto, SIN movimiento ni recuento de las cifras. */
  entrada: 8,
  /** El filete dorado que separa. */
  filete: 10,
  /** El fundido de salida de la infografía. */
  salida: 6,
} as const;

/** La escena, en frames absolutos de la composición (30 fps). Cada frame es el del arpegio en que el elemento ENTRA (con un fundido de `DUR.entrada` f). */
export const F = {
  /** El velo entra con el primer plano de dron (opaco en el f378). */
  inicio: EN_INFO_064,
  /** La fila «De Medellín · 1 hora». */
  hora: golpe(GOLPES_INFO.hora),
  /** El héroe «De la autopista Medellín-Bogotá · 15 minutos». */
  autopista: golpe(GOLPES_INFO.autopista),
  /** El pie. */
  pie: golpe(GOLPES_INFO.autopista) + 16,
  /** El último frame con texto: acaba con 16 f de margen sobre el comienzo de la disolvencia a Isabella (la mitad entra en `EN_MITAD_064` y su disolvencia empieza 12 f antes: 4 f de aire). */
  fin: EN_MITAD_064 - 16,
} as const;

/**
 * DÓNDE CAE CADA ELEMENTO (borde superior en px de 1080×1920 y alto de su caja; `line-height` de las etiquetas 1,2, de las cifras 1,05). La puerta comprueba que ninguno se sale de `ZONA`, que dos elementos no se pisan y que
 * el conjunto está centrado en `CENTRO_Y` (±12 px). Conjunto: y 735-1185 (centro 960).
 */
export const LAYOUT = [
  { id: "fila De Medellín · 1 hora", arriba: 735, alto: 132 },
  { id: "filete", arriba: 887, alto: 2 },
  { id: "héroe autopista", arriba: 913, alto: 210 },
  { id: "pie", arriba: 1151, alto: 34 },
] as const;

/** Los textos que se pintan, con su estilo y cuerpo: la puerta los mide contra `COLUMNA.ancho` (uppercase y tracking incluidos). */
export const TEXTOS: readonly { id: string; texto: string; estilo: "base" | "acento" | "dato"; px: number; versalitas?: boolean }[] = [
  { id: "etiqueta De Medellín", texto: TEXTOS_INFO.etiqueta, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "valor 1 hora", texto: TEXTOS_INFO.valorHora, estilo: "dato", px: PX.valor },
  { id: "héroe autopista", texto: TEXTOS_INFO.heroe, estilo: "acento", px: PX.heroeEtiqueta },
  { id: "valor 15 minutos", texto: TEXTOS_INFO.valorMinutos, estilo: "dato", px: PX.heroeValor },
  { id: "pie", texto: TEXTOS_INFO.pie, estilo: "base", px: PX.pie },
];
