/**
 * LA FICHA DEL 088 — tipo, locación y precio en pantalla, como DATOS (solo la versión CON FICHA, `Recorrido088Ficha`; la normal no la lleva).
 *
 * LOS DATOS son los del anuncio de la propiedad (`archivos/material/casa-el-retiro-senderos-de-compostela.md` §1, leído el 2026-11-11): casa campestre nueva en VENTA, en Senderos de Compostela (Pantanillo, El Retiro, Antioquia),
 * COP 2.800 M. Un precio en pantalla es un dato que se publica: si cambia, se cambia aquí. La versión con ficha se monta DESPUÉS del visto bueno de la normal (`ficha-luxur`).
 *
 * DOS VERSIONES, NUNCA MEZCLADAS (corrección del usuario, 2026-11-10): la NORMAL lleva subtítulos y no lleva ficha; la de FICHA lleva la ficha y no lleva subtítulos.
 *
 * EL DISEÑO es el aprobado de `ficha-luxur` (§1), sin cambios: Montserrat, filete dorado a la izquierda, velo radial sin caja, y EN EL TERCIO DE ABAJO DEL CUADRADO 1:1 (el bloque va de y 1220 a ≈ 1420; el recorte 1:1 es y 420-1500),
 * así que se ve entera cuando Facebook o el feed recortan a cuadrado. Entra con el hook (fundido de 0,5 s desde el frame en que la imagen de Isabella ya es opaca), fija hasta el CTA y fuera, en 0,4 s, antes de que su imagen funda a negro.
 *
 * Datos puros: la puerta lo carga con node.
 */
export const FICHA_088 = {
  tipo: "CASA CAMPESTRE EN VENTA",
  lugar: "El Retiro · Senderos de Compostela",
  precio: "$ 2.800 M",
  moneda: "COP",
} as const;

/** Las medidas de `ficha-luxur/scripts/ficha.mjs` (constante `D`), en px de 1080 × 1920, tal cual. */
export const DISENO_FICHA = {
  izquierda: 96,
  arriba: 1220,
  /** El recorte 1:1 del 9:16: la ficha tiene que caber entera dentro. */
  cuadrado: { arriba: 420, abajo: 1500 },
  sangria: 34,
  filete: 2,
  dorado: "#c6a878",
  tipo: { peso: 500, px: 36, espaciado: 0.28 },
  /** 46 px y no los 54 del diseño: «El Retiro · Senderos de Compostela» a 54 mide ≈ 954 px y se salía del cuadro por la derecha; `ficha.mjs` la baja sola a 46 (813 px, dentro de sus 840 px máximos) y aquí hay que hacerlo a mano. */
  lugar: { peso: 400, px: 46, espaciado: 0.005, separacion: 20 },
  precio: { peso: 500, px: 50, espaciado: 0.03, separacion: 14 },
  moneda: { px: 24, espaciado: 0.3 },
  velo: "radial-gradient(ellipse 72% 52% at 30% 50%, rgba(0,0,0,.6), rgba(0,0,0,.18) 70%, rgba(0,0,0,0) 100%)",
  /** La caja del velo, relativa al bloque: 160 px por encima y 1000 × 520 (como en `ficha.mjs`: y 1060 con el bloque en 1220). */
  veloCaja: { x: 0, dy: -160, ancho: 1000, alto: 520 },
  sombra: "0 1px 2px rgba(0,0,0,.25), 0 2px 18px rgba(0,0,0,.35)",
} as const;

/** Frames del fundido de entrada (0,5 s) y de salida (0,4 s), a 30 fps. */
export const FICHA_ENTRA = 15;
export const FICHA_SALE = 12;
