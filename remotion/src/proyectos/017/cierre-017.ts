/**
 * EL CIERRE DEL 017 — la tarjeta oscura con el logo y la web, como DATOS (revisión 6).
 *
 * Pedido del usuario, tras ver la prueba: «El logo debe ser un poco más pequeño y con
 * 40 % de transparencia, y no dejes que el último fotograma se congele: pasa a un fondo
 * oscuro donde pongas la web: PropiedadesLuxur.com».
 *
 * Qué hay en pantalla después de la última palabra de Isabella:
 *   1. su imagen funde a negro (la composición, `FundidoACierre`) y llega a negro EXACTO
 *      en el último fotograma de la toma: NADA se congela;
 *   2. una tarjeta de fondo oscuro (el plano `c12-cierre`: un negro liso) con el LOGO,
 *      más pequeño que en la rev. 5 y al 60 % de opacidad (40 % de transparencia), y,
 *      debajo, la web en blanco: `PropiedadesLuxur.com`.
 *
 * Este archivo son números y textos, sin React, para que la composición (`Recorrido017.tsx`) y la
 * puerta (`revisar-017.mjs`) lean EXACTAMENTE los mismos. Todo en px de la composición
 * (1080×1920) y en frames a 30 fps.
 */

/* ── El logo ─────────────────────────────────────────────────────────────── */

/** El PNG de la marca (blanco sobre transparente), en la carpeta compartida de `remotion/public/`. */
export const LOGO = "marcas/luxur/Propiedade-Luxur-Logo.png";
/** El PNG entero (1000×518) y dónde está el logo EN SÍ dentro de él (monograma y «© Propiedades Luxur»). */
export const LOGO_PNG = { ancho: 1000, alto: 518, x0: 54, x1: 945, y0: 63, y1: 444 } as const;
/** Ancho del PNG entero en la tarjeta. En la rev. 5 eran 560: «un poco más pequeño». */
export const LOGO_ANCHO_REV5 = 560;
export const LOGO_ANCHO = 440;
/** «Con 40 % de transparencia» = 40 % transparente = 60 % de opacidad. Una constante: un solo sitio que cambiar. */
export const LOGO_TRANSPARENCIA = 0.4;
export const LOGO_OPACIDAD = 1 - LOGO_TRANSPARENCIA;
/** Frames que tarda el logo en aparecer, y cuántos después de que empiece la tarjeta. */
export const LOGO_ENTRA = 10;
export const LOGO_RETRASO = 2;

/* ── La web ──────────────────────────────────────────────────────────────── */

/** Tal cual la escribió el usuario: mayúsculas en la P y en la L, sin `www` ni `https`. */
export const WEB = "PropiedadesLuxur.com";
/** Cuerpo de la web (la base de los subtítulos mide 45 px) y alto de su línea. La letra es la base de los subtítulos del canal. */
export const WEB_PX = 54;
export const WEB_ALTO_LINEA = Math.round(WEB_PX * 1.22);
/** Frames que tarda la web en aparecer y cuántos después de que empiece la tarjeta (entra tras el logo). */
export const WEB_ENTRA = 10;
export const WEB_RETRASO = 8;

/* ── La tarjeta ──────────────────────────────────────────────────────────── */

/** El fondo oscuro: un PNG liso (`normalizar.mjs`) del negro de la marca. Es el mismo color al que funde la imagen. */
export const TARJETA = "recorrido-017/cierre-oscuro.png";
/** Frames que dura la tarjeta (2,0 s): la web se lee entera con holgura. Entre 45 y 75 para la puerta. */
export const DUR_TARJETA = 60;
/** Frames que tarda la imagen de Isabella en fundir a negro, contados hacia atrás desde su ÚLTIMO fotograma. */
export const FUNDIDO_A_OSCURO = 6;

/* ── Dónde cae todo (1080×1920) ──────────────────────────────────────────── */

/** El bloque logo + web, centrado en esta y: un poco por encima del centro (abajo, las plataformas ponen su interfaz). */
export const CENTRO_Y = 940;
/** Aire entre el logo en sí y la web. */
export const HUECO_LOGO_WEB = 56;

const escala = LOGO_ANCHO / LOGO_PNG.ancho;
/** Alto de la caja del PNG entero. */
export const LOGO_ALTO = Math.round(LOGO_PNG.alto * escala);
/** Alto del logo EN SÍ, y lo que hay de transparente por encima de él en el PNG. */
const LOGO_CONTENIDO_ALTO = (LOGO_PNG.y1 - LOGO_PNG.y0) * escala;
const LOGO_HUECO_SUPERIOR = LOGO_PNG.y0 * escala;
const ALTO_BLOQUE = LOGO_CONTENIDO_ALTO + HUECO_LOGO_WEB + WEB_ALTO_LINEA;
const TOPE_BLOQUE = CENTRO_Y - ALTO_BLOQUE / 2;

/** Borde superior de la caja del PNG y de la línea de la web, en px. */
export const LOGO_ARRIBA = Math.round(TOPE_BLOQUE - LOGO_HUECO_SUPERIOR);
export const WEB_ARRIBA = Math.round(TOPE_BLOQUE + LOGO_CONTENIDO_ALTO + HUECO_LOGO_WEB);

/** Lo que ocupa el logo EN SÍ (no su caja), para medirlo contra las zonas seguras. */
export const LOGO_ENSI = {
  arriba: LOGO_ARRIBA + LOGO_HUECO_SUPERIOR,
  abajo: LOGO_ARRIBA + LOGO_HUECO_SUPERIOR + LOGO_CONTENIDO_ALTO,
  ancho: (LOGO_PNG.x1 - LOGO_PNG.x0) * escala,
} as const;
