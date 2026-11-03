/**
 * LA INFOGRAFÍA DEL 063 — «Lo que sí tiene» (sobre el dron, tras el hook) y los rótulos UBICACIÓN · AGUA · ESCRITURAS (sobre la mitad), como DATOS (textos, tiempos y medidas).
 *
 * ES UN ENCARGO DEL USUARIO (2026-10-22): «si dice "ven, te muestro cómo", puedes crear unos infográficos y resaltar las amenidades». Es una EXCEPCIÓN DECLARADA a la costumbre del formato (un dato grande solo va en el
 * bloque 3, y aquí el bloque 3 ES el dron con la infografía; los subtítulos editoriales siguen como siempre). Como en la 060 (`Infografia060.tsx`): **cifras SIN animar** —cada elemento entra COMPLETO, con un fundido de
 * 8 f, y se queda; no hay recuentos, ni muelles, ni movimientos de caja— y uno a uno, cada uno en un golpe MEDIDO de la canción.
 *
 * LO QUE LA INFOGRAFÍA PUEDE DECIR: SOLO lo que está en la ficha de la web (leída el 2026-10-22). «Amenidades» se traduce en LO QUE EL LOTE SÍ TIENE, que es lo que responde al miedo del hook:
 *     ✔ Derecho de acueducto  (la ficha: «derecho de acueducto incluido»)
 *     ✔ Escrituras al 100 %   (la ficha: «escrituras al 100 %»)
 *     ✔ 3.244 m²              (la ficha: área)
 * Nada de energía, de uso del suelo, de vía de acceso ni de «apto para construir»: la web no lo dice. Tampoco el precio (va al caption y a la versión con ficha).
 *
 * ESCENA 1 · LA INFOGRAFÍA (bloque 3, f323-f539, 7,2 s sobre DR02 con un velo negro del 42 % en los bordes y del 68 % detrás de la lista): el corte del hook al dron (golpe de 13,0 dB) abre el velo y el título «Lo que sí tiene» (letra de acento de la marca, con un filete
 * dorado que se dibuja) y después, una cifra cada 1,4-1,8 s, cada ✔ con su rótulo dorado: INCLUIDO · PAPELES · ÁREA. El último ✔ se lee entero 2,2 s antes de que lo releve la mitad. Un solo héroe a la vez: la pantalla
 * enseña la lista, que se va tras 6 f de fundido, 4 f antes de que empiece la disolvencia a Isabella.
 *
 * ESCENA 2 · LOS RÓTULOS DE LA MITAD (bloque 4): sobre Isabella —que sigue hablando—, UBICACIÓN · AGUA · ESCRITURAS aparecen según las dice (cada uno en el frame de su palabra, 1 f antes, como un subtítulo) y se quedan
 * los tres juntos mientras dice «y este lote empieza con todas esas cosas sobre la mesa». Van en UNA fila centrada, justo encima de los subtítulos y por debajo de sus manos (que llegan a y ≈ 1300; la fila, y 1340-1392), con un velo local y la sombra de texto de la marca.
 * Los subtítulos editoriales de esas palabras siguen en su sitio (el `.srt` las lleva), SIN acento: el énfasis lo llevan los rótulos.
 *
 * ZONA. La lista va CENTRADA en vertical sobre y 960 (la mitad del fotograma y del cuadrado 1:1 del feed, y 420-1500) y toda dentro de y 570-1350 (150 px de margen a cada lado del cuadrado); la fila de rótulos, en
 * y 1190-1400. En la versión con ficha la banda sale mientras salen la infografía y los rótulos (`herramientas/ficha-oculta.mjs`, encargo del usuario en la 060), así que no se pisan.
 *
 * Datos puros: solo `import` de otro archivo de datos (`metraje-063.ts`). La puerta lo carga con node.
 */
import { EN_MITAD_063, GOLPE, golpe } from "./metraje-063";

/** El filete dorado del canal (el de la portada y la ficha). */
export const ORO = "#c6a878";

/** Lo que el lote SÍ tiene, tal como lo dice la ficha. Los rótulos dorados son solo clasificadores («incluido», «papeles», «área»). */
export const ITEMS = [
  { id: "acueducto", rotulo: "Incluido", texto: "Derecho de acueducto", ficha: "derecho de acueducto incluido" },
  { id: "escrituras", rotulo: "Papeles", texto: "Escrituras al 100 %", ficha: "escrituras al 100 %" },
  { id: "area", rotulo: "Área", texto: "3.244 m²", ficha: "3.244 m²" },
] as const;

/** El título de la lista, en la letra de acento de la marca. */
export const TITULO = "Lo que sí tiene";

/** Las tres palabras de la mitad, tal como las dice Isabella. */
export const TRIADA = ["Ubicación", "Agua", "Escrituras"] as const;

/** Cuerpos (px de 1080×1920). La puerta mide cada texto con las tablas de la letra del canal. */
export const PX = {
  titulo: 84,
  rotulo: 28,
  valor: 64,
  triada: 40,
} as const;

/** Interletrado de las versalitas (em): la tabla de avances no lo incluye y la puerta lo suma. */
export const TRACKING_ETIQUETA = 0.16;
/** Interletrado de los rótulos de la mitad (em). */
export const TRACKING_TRIADA = 0.1;
/** El aire (px) a cada lado del punto dorado que separa los rótulos. */
export const GAP_TRIADA = 24;

/** La columna de texto de la lista: 100 px de margen a cada lado; el ✔ ocupa los primeros 72 (44 + 28 de aire). */
export const COLUMNA = { izquierda: 100, ancho: 880 } as const;
export const CHECK = { lado: 44, aire: 28 } as const;

/** La zona segura de la lista y su centro (px de 1080×1920): el cuadrado 1:1 (y 420-1500) con 150 px de margen; el centro del cuadrado y del fotograma es y 960. */
export const ZONA = { arriba: 570, abajo: 1350 } as const;
export const CENTRO_Y = 960;
/** La zona de la fila de rótulos de la mitad: debajo de las manos de Isabella (y ≈ 1190 como mucho) y encima de los subtítulos (y ≥ 1430). */
export const ZONA_TRIADA = { arriba: 1190, abajo: 1400 } as const;

/**
 * El velo de la lista: un degradado negro VERTICAL sobre todo el fotograma —más claro arriba y abajo (`borde`), más oscuro detrás de la lista (`centro`, del 28 % al 72 % del alto: y 538-1382)—, para que el dron
 * se siga viendo en los bordes y el blanco y el oro se lean en el centro (medido con stills: `medidas/legibilidad-infografia.txt`); su rampa de entrada; y el velo local de los rótulos de la mitad.
 */
export const VELO = { lista: { borde: 0.42, centro: 0.68 }, rampa: 8, triada: 0.6 } as const;

/**
 * Los golpes de la canción en que entra cada elemento de la lista (medidos: `musica/golpes-063.json`). El título entra con el corte del hook al dron (`GOLPE.info`); los tres ✔, en golpes de la propia canción
 * a 1,4-1,8 s unos de otros.
 */
export const GOLPES_INFO = {
  titulo: GOLPE.info,
  acueducto: { t: 156.74, db: 9.0 },
  escrituras: { t: 158.561, db: 10.7 },
  area: { t: 159.924, db: 13.7 },
} as const;

/** Frames de la comp en que suena cada uno (el mismo cálculo que los cortes). */
const g = (x: { readonly t: number }): number => golpe(x);

/**
 * La escena 1, en frames absolutos de la composición (30 fps). Cada frame es el del golpe en que el elemento ENTRA (con un fundido de `DUR.entrada` f: sin recuento ni movimiento de las cifras).
 */
export const F = {
  /** El velo y el título entran con el corte al dron. */
  inicio: g(GOLPES_INFO.titulo),
  acueducto: g(GOLPES_INFO.acueducto),
  escrituras: g(GOLPES_INFO.escrituras),
  area: g(GOLPES_INFO.area),
  /** El último frame con texto: acaba 16 f antes de la mitad (su disolvencia empieza 12 f antes de `EN_MITAD_063`), con 4 f de margen. */
  fin: EN_MITAD_063 - 16,
} as const;

/**
 * La escena 2: los frames en que entra cada rótulo de la mitad (la palabra de Isabella, 1 f antes: los mismos que las líneas de los subtítulos, `subtitulos-063.ts`) y el último frame con texto (8 f tras el final de «mesa», 11,52 s: se van antes de la disolvencia al bloque 5).
 * Se calculan con el `en` de la mitad y el `desde` de su plano (96 f): frame = en − 96 + round(s·30).
 */
export const TRIADA_F = {
  ubicacion: EN_MITAD_063 - 96 + Math.round(6.755 * 30) - 1,
  agua: EN_MITAD_063 - 96 + Math.round(7.565 * 30) - 1,
  escrituras: EN_MITAD_063 - 96 + Math.round(8.21 * 30) - 1,
  fin: EN_MITAD_063 - 96 + Math.round(11.52 * 30) + 8,
} as const;

/** Frames que dura cada movimiento. */
export const DUR = {
  /** Una fila, un título, un rótulo: un fundido corto, SIN movimiento ni recuento. */
  entrada: 8,
  /** El filete dorado que separa el título de la lista. */
  filete: 10,
  /** El fundido de salida de la lista y de los rótulos. */
  salida: 6,
} as const;

/**
 * DÓNDE CAE CADA ELEMENTO DE LA LISTA (borde superior en px de 1080×1920 y alto de su caja; `line-height` del título 1,2, de los rótulos 1,2, de las cifras 1,05). La puerta comprueba que ninguno se sale de `ZONA`,
 * que dos elementos no se pisan y que la lista está centrada en `CENTRO_Y` (±12 px: la caja de un texto no es su tinta). Lista: y 673-1247 (centro 960).
 */
export const LAYOUT = [
  { id: "título", arriba: 673, alto: 101 },
  { id: "filete", arriba: 800, alto: 2 },
  { id: "fila acueducto", arriba: 842, alto: 107 },
  { id: "fila escrituras", arriba: 992, alto: 107 },
  { id: "fila área", arriba: 1142, alto: 105 },
] as const;

/** La fila de rótulos de la mitad: borde superior y alto de su caja (centrada en horizontal). */
export const LAYOUT_TRIADA = { arriba: 1340, alto: 52 } as const;

/** Los textos que se pintan, con su estilo y cuerpo: la puerta los mide contra su ancho (uppercase y tracking incluidos). */
export const TEXTOS: readonly { id: string; texto: string; estilo: "base" | "acento" | "dato"; px: number; versalitas?: boolean; ancho: number }[] = [
  { id: "título", texto: TITULO, estilo: "acento", px: PX.titulo, ancho: COLUMNA.ancho },
  ...ITEMS.flatMap((x) => [
    { id: `rótulo ${x.id}`, texto: x.rotulo, estilo: "base" as const, px: PX.rotulo, versalitas: true, ancho: COLUMNA.ancho - CHECK.lado - CHECK.aire },
    { id: `valor ${x.id}`, texto: x.texto, estilo: "dato" as const, px: PX.valor, ancho: COLUMNA.ancho - CHECK.lado - CHECK.aire },
  ]),
];
