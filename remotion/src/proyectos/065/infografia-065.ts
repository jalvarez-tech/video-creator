/**
 * LA INFOGRAFÍA DEL 065 — LA FICHA del lote, como DATOS (textos, tiempos y medidas).
 *
 * ES UN ENCARGO DEL USUARIO (2026-10-22, reparto rev. 2): «si dice “ven, te muestro” … puedes crear unos infográficos y resaltar las amenidades». Es el modelo de la 060 (cifras SIN animar: cada una entra COMPLETA, con un
 * fundido corto, en un golpe de la canción, y se queda hasta que se va el panel), con UN solo panel: la ficha del lote, la que cae sobre el dron justo después de «ven, te muestro».
 *
 *   ÁREA                    3.244 m²                      (la ficha: «Área 3.244 m²»)
 *   PRECIO NEGOCIABLE       $ 350 M                       (la ficha: «COP 350 M, negociable»)
 *   DERECHO DE ACUEDUCTO    Incluido                      (la ficha: «derecho de acueducto incluido»)
 *   Escrituras              100 %  (héroe)                (la ficha: «escrituras al 100 %»)
 *
 * SOLO LO QUE LA FICHA DE LA WEB DICE (leída por la sesión madre el 2026-10-22). Nada de energía, uso del suelo, tipo de vía de acceso ni «apto para construir»: la propia web dice que el uso depende de la normativa
 * aplicable. «Amenidades» se traduce aquí en lo que el lote SÍ tiene. Un solo héroe a la vez: la escritura es el héroe del panel (la última en entrar) y se queda 2,6 s.
 *
 * LA ESCENA. El velo negro sube sobre el vuelo de DR04 en los 14 f anteriores a la primera cifra (el dron se ve limpio durante el primer segundo: «los datos entran sobre el vuelo») y se va con el panel. Cada elemento entra en un
 * golpe MEDIDO de la canción (los pulsos 33 · 36 · 39 · 42: 13,3 · 15,6 · 18,9 · 22,1 dB, una cifra cada 3 pulsos = 1,41 s). No se añade ni un sonido (las piezas de este canal no llevan whooshes ni impactos).
 *
 * ZONA. El panel va CENTRADO en vertical sobre y 960, la mitad del fotograma y del cuadrado 1:1 del feed (y 420-1500; criterio de la 060, 2026-10-22: «centralo a la mitad verticalmente para que en el 1x1 no se recorte arriba»).
 * Todo dentro de y 570-1350 (150 px de margen a cada lado del cuadrado). La ficha de la versión 1:1 sale mientras hay cifras y vuelve después (`herramientas/ficha-oculta.mjs`). Letra: la del canal (Montserrat 500 para las
 * etiquetas, 700 para las cifras, Playfair Display itálica para la etiqueta del héroe).
 *
 * Datos puros: solo `import` de otro archivo de datos (`metraje-065.ts`). La puerta lo carga con node.
 */
import { EN_MITAD_065, GOLPE, golpe } from "./metraje-065";

/** El filete dorado del canal (el de la portada y la ficha). */
export const ORO = "#c6a878";

/** Los textos, tal como los da la ficha de la web. */
export const ETIQUETAS = {
  area: "Área",
  precio: "Precio negociable",
  acueducto: "Derecho de acueducto",
  escrituras: "Escrituras",
} as const;
export const VALORES = {
  area: "3.244 m²",
  precio: "$ 350 M",
  acueducto: "Incluido",
  escrituras: "100 %",
} as const;

/** Cuerpos (px de 1080×1920). La puerta mide cada texto con las tablas de la letra del canal. */
export const PX = {
  etiqueta: 28,
  valor: 88,
  heroeEtiqueta: 56,
  heroeValor: 132,
} as const;

/** Interletrado de las etiquetas en versalitas (em): la tabla de avances no lo incluye y la puerta lo suma. */
export const TRACKING_ETIQUETA = 0.16;

/** La columna de texto: 100 px de margen a cada lado. */
export const COLUMNA = { izquierda: 100, ancho: 880 } as const;

/** La zona segura: el cuadrado 1:1 del feed (y 420-1500) con 150 px de margen a cada lado; el centro del cuadrado y del fotograma es y 960. */
export const ZONA = { arriba: 570, abajo: 1350 } as const;

/** El centro vertical (px de 1080×1920) sobre el que se centra el panel. */
export const CENTRO_Y = 960;

/** El velo negro: su opacidad, los frames que tarda en subir (hasta la primera cifra) y en bajar (hasta el final del panel). */
export const VELO = { panel: 0.6, sube: 14, baja: 8 } as const;

/** Frames de la comp en que suena cada golpe (el mismo cálculo que los cortes). */
const g = (x: { readonly t: number }): number => golpe(x);

/**
 * La escena, en frames absolutos de la composición (30 fps). Cada frame es el del golpe en que el elemento ENTRA (con un fundido de `DUR.entrada` f: sin recuento ni movimiento de las cifras).
 */
export const F = {
  /** Empieza a subir el velo (acaba en la primera cifra). */
  velo: g(GOLPE.info1) - VELO.sube,
  area: g(GOLPE.info1),
  precio: g(GOLPE.info2),
  acueducto: g(GOLPE.info3),
  escrituras: g(GOLPE.info4),
  /** El último frame con texto: 16 f de margen sobre el comienzo de la disolvencia a la pregunta (la mitad entra en `EN_MITAD_065` y su disolvencia empieza 12 f antes). */
  fin: EN_MITAD_065 - 16,
} as const;

/** Frames que dura cada movimiento. */
export const DUR = {
  /** Una fila, una etiqueta, un héroe: un fundido corto, SIN movimiento ni recuento de las cifras. */
  entrada: 8,
  /** El filete dorado que separa. */
  filete: 10,
  /** El fundido de salida del panel. */
  salida: 6,
} as const;

/**
 * DÓNDE CAE CADA ELEMENTO (borde superior en px de 1080×1920 y alto de su caja; `line-height` de las etiquetas 1,2, de las cifras 1,05). La puerta comprueba que ninguno se sale de `ZONA`, que dos elementos no se pisan y que el
 * panel está centrado en `CENTRO_Y` (±12 px: la caja de un texto no es su tinta). Panel: y 590-1328 (centro 959).
 */
export const LAYOUT = [
  { id: "fila área", arriba: 590, alto: 132 },
  { id: "fila precio", arriba: 762, alto: 132 },
  { id: "fila acueducto", arriba: 934, alto: 132 },
  { id: "filete", arriba: 1092, alto: 2 },
  { id: "héroe escrituras", arriba: 1118, alto: 210 },
] as const;

/** Los textos que se pintan, con su estilo y cuerpo: la puerta los mide contra `COLUMNA.ancho` (uppercase y tracking incluidos). */
export const TEXTOS: readonly { id: string; texto: string; estilo: "base" | "acento" | "dato"; px: number; versalitas?: boolean }[] = [
  { id: "etiqueta área", texto: ETIQUETAS.area, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta precio", texto: ETIQUETAS.precio, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta acueducto", texto: ETIQUETAS.acueducto, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "héroe escrituras", texto: ETIQUETAS.escrituras, estilo: "acento", px: PX.heroeEtiqueta },
  { id: "valor área", texto: VALORES.area, estilo: "dato", px: PX.valor },
  { id: "valor precio", texto: VALORES.precio, estilo: "dato", px: PX.valor },
  { id: "valor acueducto", texto: VALORES.acueducto, estilo: "dato", px: PX.valor },
  { id: "valor escrituras", texto: VALORES.escrituras, estilo: "dato", px: PX.heroeValor },
];
