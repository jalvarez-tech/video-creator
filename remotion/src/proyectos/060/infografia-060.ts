/**
 * LA INFOGRAFÍA DEL 060 — la rentabilidad estimada del apartaestudio, como DATOS (cifras, textos, tiempos y medidas).
 *
 * ES UN ENCARGO DEL USUARIO (2026-10-22): «después de que Isabella dice “ven, te muestro cómo”, genera unos infográficos animados con la rentabilidad»
 * y la tabla de abajo. Es una EXCEPCIÓN DECLARADA a dos costumbres del formato: (1) un dato grande solo va en el recorrido del bloque 3 y la vista del
 * bloque 5 «se mira»; (2) en la primera versión del reel la rentabilidad solo vivía en la voz de Isabella. Aquí la pantalla enseña CÓMO sale, con las
 * cifras que dio el usuario, rotuladas como ESTIMADAS (lo son: tarifa, ocupación y utilidad) y con un pie que repite lo que advierte la web: los
 * ingresos de renta corta varían por temporada. Ningún rótulo promete una rentabilidad ni la convierte en acento del subtítulo de la mitad.
 *
 *   Tarifa neta promedio por noche   $190.000        Administración                  −$500.000
 *   Ocupación estimada               85 %            Servicios públicos              −$300.000
 *   Noches promedio ocupadas         25,5            Total gastos contemplados       −$800.000
 *   Ingresos mensuales               $4.845.000      Utilidad mensual estimada       $4.045.000
 *
 * LA CUENTA CUADRA (la puerta lo comprueba): 85 % de 30 noches = 25,5 · $190.000 × 25,5 = $4.845.000 · $500.000 + $300.000 = $800.000 ·
 * $4.845.000 − $800.000 = $4.045.000. Sobre el precio de la ficha (COP 410 M) la utilidad es el 0,99 % mensual: un pelo por DEBAJO del «más del 1 %» que
 * dice Isabella en la mitad (se lo dice al usuario en la entrega; no se toca la voz ni la cifra).
 *
 * LA ESCENA (rev. 2: sin animar los números, uno a uno, con tiempo para leerlos). Cada cifra entra COMPLETA, con un fundido de 8 f y sin recuento, y se queda; la infografía dura 14 s sobre un velo negro del 80 % que cubre cuatro planos
 * de fondo (la cama, la tele, el sofá y el coworking, que se funden entre sí) y, al final, cae sobre la vista:
 *   · PANEL 1 «la cuenta» (f876-f1094): tarifa → ocupación (con su barra al 85 %) → noches → INGRESOS MENSUALES (héroe): una cifra cada 1,3-1,4 s y los ingresos solos 2,9 s antes de que se vaya el panel;
 *   · PANEL 2 «los gastos» (f1094-f1296): administración → servicios públicos → TOTAL GASTOS (héroe): una cifra cada 1,5-2,1 s y el total, 3,1 s;
 *   · PANEL 3 «la utilidad» (f1296-f1406): el velo negro desaparece con el corte a la vista (el clímax sigue siendo la vista) y la utilidad mensual estimada cae sobre ella, 3,7 s, con un degradado desde abajo (del 62 % al
 *     50 % en la zona del texto: medido sobre la vista, con el velo mezclado en sRGB como lo hace el navegador, el blanco queda a ≥ 5,4 : 1 de su fondo más claro; ver `medidas/legibilidad-infografia.txt`) y la sombra
 *     de texto de la marca, como héroe único, y el pie.
 * CADA ELEMENTO ENTRA EN UN GOLPE MEDIDO de la canción (los de abajo, de `musica/golpes-cancion-entera.json`): 25,3 · 17,4 · 23,6 · 13,3 · 13,9 · 11,0 · 18,4 · 10,7 dB. No se añade ni un sonido (las piezas de este canal no llevan
 * whooshes ni impactos). Un solo héroe a la vez.
 *
 * ZONA. Cada panel va CENTRADO en vertical sobre y 960, la mitad del fotograma y del cuadrado 1:1 del feed (y 420-1500; encargo del usuario, 2026-10-22: «centralo a la mitad
 * verticalmente para que en el 1x1 no se recorte arriba»: hasta entonces los paneles 1 y 2 estaban en y 448-1170 y 560-1116, la primera etiqueta a 28 px del borde del recorte). Todo dentro de
 * y 570-1350 (150 px de margen a cada lado del cuadrado). La ficha de la versión 1:1 sale mientras salen las cifras (`herramientas/ficha-oculta.mjs`), así que ya no se pisan. Letra: la del canal (Montserrat 500 para las etiquetas, 700 para las cifras, Playfair Display itálica para el nombre del héroe).
 *
 * Datos puros: solo `import` de otro archivo de datos (`metraje-060.ts`). La puerta lo carga con node.
 */
import { EN_CTA_060, GOLPE, golpe } from "./metraje-060";

/** El filete dorado del canal (el de la portada y la ficha). */
export const ORO = "#c6a878";

/** Las cifras que dio el usuario, en pesos (y 85 en %, 25,5 en noches). */
export const CIFRAS = {
  tarifa: 190000,
  ocupacion: 85,
  noches: 25.5,
  ingresos: 4845000,
  administracion: 500000,
  servicios: 300000,
  gastos: 800000,
  utilidad: 4045000,
} as const;

/** Los nombres, tal como los escribió el usuario. */
export const ETIQUETAS = {
  tarifa: "Tarifa neta promedio por noche",
  ocupacion: "Ocupación estimada",
  noches: "Noches promedio ocupadas",
  ingresos: "Ingresos mensuales",
  administracion: "Administración",
  servicios: "Servicios públicos",
  gastos: "Total gastos contemplados",
  utilidad: "Utilidad mensual estimada",
} as const;

/** El pie: lo que advierte la web y lo que dicen las propias etiquetas («estimada»). */
export const NOTA = "Cifras estimadas: los ingresos de renta corta varían por temporada.";
/** La unidad bajo la utilidad. */
export const UNIDAD = "COP al mes";

/** Cuerpos (px de 1080×1920). La puerta mide cada texto con las tablas de la letra del canal. */
export const PX = {
  etiqueta: 28,
  valor: 88,
  heroeEtiqueta: 56,
  heroeValor: 132,
  utilEtiqueta: 64,
  utilValor: 140,
  unidad: 28,
  nota: 28,
} as const;

/** Interletrado de las etiquetas en versalitas (em): la tabla de avances no lo incluye y la puerta lo suma. */
export const TRACKING_ETIQUETA = 0.16;

/** La columna de texto: 100 px de margen a cada lado. */
export const COLUMNA = { izquierda: 100, ancho: 880 } as const;

/** La zona segura: el cuadrado 1:1 del feed (y 420-1500) con 150 px de margen a cada lado; el centro del cuadrado y del fotograma es y 960. */
export const ZONA = { arriba: 570, abajo: 1350 } as const;

/** El centro vertical (px de 1080×1920) sobre el que se centra cada panel: la mitad del fotograma, que es también la mitad del cuadrado 1:1. */
export const CENTRO_Y = 960;

/** El velo negro de los paneles 1 y 2 y el degradado desde abajo del panel 3. */
export const VELO = { panel: 0.8, rampa: 8, degradadoAbajo: [0.62, 0.5, 0] as const } as const;

/**
 * Los golpes de la canción en que entra cada elemento (medidos: `musica/golpes-cancion-entera.json`). La cama, el coworking y la vista tienen su corte
 * en los suyos (`GOLPE.cama`, `GOLPE.coworking`, `GOLPE.vista`); los demás son golpes de la propia canción entre ellos.
 */
export const GOLPES_INFO = {
  tarifa: { t: 184.077, db: 25.3 },
  ocupacion: { t: 185.525, db: 17.4 },
  noches: { t: 186.79, db: 23.6 },
  ingresos: { t: 188.051, db: 13.3 },
  gastos1: { t: 190.967, db: 13.9 },
  servicios: { t: 192.431, db: 11.0 },
  gastosTotal: { t: 194.532, db: 18.4 },
  utilidad: GOLPE.vista,
} as const;

/** Frames de la comp en que suena cada uno (el mismo cálculo que los cortes). */
const g = (x: { readonly t: number }): number => golpe(x);

/**
 * La escena, en frames absolutos de la composición (30 fps). Cada frame es el del golpe en que el elemento ENTRA (con un fundido de `DUR.entrada` f: sin recuento ni movimiento de las cifras).
 */
export const F = {
  /** El velo entra con el corte a la cama (el frame 876 es el primero del bloque 5). */
  inicio: g(GOLPE.cama),
  /** Panel 1 «la cuenta». */
  tarifa: g(GOLPES_INFO.tarifa),
  ocupacion: g(GOLPES_INFO.ocupacion),
  noches: g(GOLPES_INFO.noches),
  ingresos: g(GOLPES_INFO.ingresos),
  /** Panel 2 «los gastos» (entra cuando el panel 1 sale): la administración y los servicios públicos en sus golpes y el total en el siguiente. */
  panel2: g(GOLPES_INFO.gastos1),
  servicios: g(GOLPES_INFO.servicios),
  gastosTotal: g(GOLPES_INFO.gastosTotal),
  /** Panel 3 «la utilidad»: el corte a la vista. La unidad y el pie entran después (no caen en golpes). */
  panel3: g(GOLPES_INFO.utilidad),
  unidad: g(GOLPES_INFO.utilidad) + 14,
  nota: g(GOLPES_INFO.utilidad) + 40,
  /** El último frame con texto: acaba con 16 f de margen sobre el comienzo de la disolvencia al CTA (el CTA entra en `EN_CTA_060` y su disolvencia empieza 12 f antes). */
  fin: EN_CTA_060 - 16,
} as const;

/** Frames que dura cada movimiento. */
export const DUR = {
  /** Una fila, una etiqueta, un héroe: un fundido corto, SIN movimiento ni recuento de las cifras. */
  entrada: 8,
  /** La barra de la ocupación. */
  barra: 14,
  /** El filete dorado que separa. */
  filete: 10,
  /** El fundido de salida de un panel. */
  salida: 6,
} as const;

/** Moneda colombiana: puntos de millar, sin decimales. Determinista (sin `Intl`: depende del ICU de cada máquina). */
export const pesos = (n: number): string => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Un decimal con coma. */
export const decimal = (n: number): string => (Math.round(n * 10) / 10).toFixed(1).replace(".", ",");

/**
 * DÓNDE CAE CADA ELEMENTO (borde superior en px de 1080×1920 y alto de su caja; `line-height` de las etiquetas 1,2, de las cifras 1,05). La puerta comprueba que
 * ninguno se sale de `ZONA`, que dos elementos de un mismo panel no se pisan y que cada panel está centrado en `CENTRO_Y` (±12 px: la caja de un texto no es su tinta).
 * Dos líneas de pie caben en 73 px. Panel 1: y 599-1321 (centro 960) · panel 2: y 682-1238 (centro 960) · panel 3: y 780-1159 (centro 969,5: ya estaba centrado).
 */
export const LAYOUT = {
  panel1: [
    { id: "fila tarifa", arriba: 599, alto: 132 },
    { id: "fila ocupación (con su barra)", arriba: 751, alto: 154 },
    { id: "fila noches", arriba: 925, alto: 132 },
    { id: "filete", arriba: 1085, alto: 2 },
    { id: "héroe ingresos", arriba: 1111, alto: 210 },
  ],
  panel2: [
    { id: "fila administración", arriba: 682, alto: 132 },
    { id: "fila servicios", arriba: 834, alto: 132 },
    { id: "filete", arriba: 1002, alto: 2 },
    { id: "héroe gastos", arriba: 1028, alto: 210 },
  ],
  panel3: [
    { id: "héroe utilidad (etiqueta)", arriba: 780, alto: 77 },
    { id: "héroe utilidad (cifra)", arriba: 861, alto: 147 },
    { id: "unidad", arriba: 1024, alto: 34 },
    { id: "pie", arriba: 1086, alto: 73 },
  ],
} as const;

/** Los textos que se pintan, con su estilo y cuerpo: la puerta los mide contra `COLUMNA.ancho` (uppercase y tracking incluidos). */
export const TEXTOS: readonly { id: string; texto: string; estilo: "base" | "acento" | "dato"; px: number; versalitas?: boolean }[] = [
  { id: "etiqueta tarifa", texto: ETIQUETAS.tarifa, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta ocupación", texto: ETIQUETAS.ocupacion, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta noches", texto: ETIQUETAS.noches, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta administración", texto: ETIQUETAS.administracion, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "etiqueta servicios", texto: ETIQUETAS.servicios, estilo: "base", px: PX.etiqueta, versalitas: true },
  { id: "héroe ingresos", texto: ETIQUETAS.ingresos, estilo: "acento", px: PX.heroeEtiqueta },
  { id: "héroe gastos", texto: ETIQUETAS.gastos, estilo: "acento", px: PX.heroeEtiqueta },
  { id: "héroe utilidad", texto: ETIQUETAS.utilidad, estilo: "acento", px: PX.utilEtiqueta },
  { id: "valor tarifa", texto: `$${pesos(CIFRAS.tarifa)}`, estilo: "dato", px: PX.valor },
  { id: "valor ocupación", texto: `${CIFRAS.ocupacion} %`, estilo: "dato", px: PX.valor },
  { id: "valor noches", texto: decimal(CIFRAS.noches), estilo: "dato", px: PX.valor },
  { id: "valor administración", texto: `−$${pesos(CIFRAS.administracion)}`, estilo: "dato", px: PX.valor },
  { id: "valor servicios", texto: `−$${pesos(CIFRAS.servicios)}`, estilo: "dato", px: PX.valor },
  { id: "valor ingresos", texto: `$${pesos(CIFRAS.ingresos)}`, estilo: "dato", px: PX.heroeValor },
  { id: "valor gastos", texto: `−$${pesos(CIFRAS.gastos)}`, estilo: "dato", px: PX.heroeValor },
  { id: "valor utilidad", texto: `$${pesos(CIFRAS.utilidad)}`, estilo: "dato", px: PX.utilValor },
  { id: "unidad", texto: UNIDAD, estilo: "base", px: PX.unidad, versalitas: true },
  { id: "pie", texto: NOTA, estilo: "base", px: PX.nota },
];
