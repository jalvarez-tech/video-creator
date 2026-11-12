/**
 * LA FICHA DEL 081 — tipo, locación y precio en pantalla, como DATOS.
 *
 * Pedido del 2026-11-10: «transición a Isabella con el hook, y en ese momento entra la ficha con locación y precio». El cliente solo mira los primeros 10 s: la ficha es lo único que le dice qué se vende, dónde y a
 * cuánto aunque vea sin sonido. Hasta ahora la ficha era una versión APARTE y sin subtítulos (`ficha-luxur`, pintada con ffmpeg sobre la final); aquí va DENTRO de la pieza y convive con los subtítulos editoriales.
 *
 * LOS DATOS son los de `.claude/skills/ficha-luxur/propiedades/suite-go-living.json` (tipo, negocio y lugar del anuncio; precio dicho por el usuario: 539.000.000 COP, el 2026-11-10). Un precio en pantalla es un dato
 * que se publica: si cambia, se cambia allí y aquí.
 *
 * DOS VERSIONES, NUNCA MEZCLADAS (corrección del usuario, 2026-11-10: «para los videos de ficha no deben salir subtítulos… debe ir abajo y que cuando Facebook recorte en 1x1 se alcance a ver completa; para los
 * videos normales debe ir sin ficha»): la NORMAL lleva subtítulos y no lleva ficha; la de FICHA (`Recorrido081Ficha`, prop `ficha`) lleva la ficha y no lleva subtítulos. La primera prueba las juntó, con la ficha
 * arriba, y era un error.
 *
 * EL DISEÑO es el aprobado de `ficha-luxur` (§1), sin cambios: Montserrat, filete dorado a la izquierda, velo radial sin caja, y EN EL TERCIO DE ABAJO DEL CUADRADO 1:1 (el bloque va de y 1220 a ≈ 1420; el recorte
 * 1:1 es y 420-1500), así que se ve entera cuando Facebook o el feed recortan a cuadrado.
 *
 * EL TIEMPO (lo único propio de esta estructura): no entra en el fotograma 0, como en `ficha-luxur`, sino con el hook («transición a Isabella con el hook, y en ese momento entra la ficha»): fundido de 0,5 s
 * desde el frame en que la imagen de Isabella ya es opaca; fija hasta el CTA y fuera, en 0,4 s, antes de que su imagen funda a negro (la tarjeta del cierre sale sin ficha).
 *
 * Datos puros: la puerta lo carga con node.
 */
export const FICHA_081 = {
  tipo: "SUITE HOTELERA EN VENTA",
  lugar: "El Poblado · Go Living Suites",
  precio: "$ 539 M",
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
  lugar: { peso: 400, px: 54, espaciado: 0.005, separacion: 20 },
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
