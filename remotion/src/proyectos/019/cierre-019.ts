/**
 * EL CIERRE DEL RECORRIDO 019 — la tarjeta oscura con el logo y la web, como DATOS.
 *
 * Es el cierre del formato desde el 017 (revisión 6, pedido del usuario: «el logo más pequeño y con
 * 40 % de transparencia, y no dejes que el último fotograma se congele: pasa a un fondo oscuro donde
 * pongas la web»). Qué hay en pantalla después de la última palabra de Isabella:
 *
 *   1. su imagen funde a negro (la composición, `FundidoACierre`) y llega a negro EXACTO en el
 *      último fotograma de la toma: NADA SE CONGELA;
 *   2. una TARJETA de fondo oscuro (el último plano del plan: un negro liso) con el LOGO, pequeño y al
 *      60 % de opacidad (40 % de transparencia), y debajo la web en blanco.
 *
 * Este archivo son números y textos, SIN React, para que la composición (`Recorrido019.tsx`) y la puerta
 * (`revisar-019.mjs`) lean exactamente los mismos. Todo en px de la composición (1080×1920) y en
 * frames a 30 fps. Lo que ES de la pieza, y se cambia aquí: la duración de la tarjeta y, si el
 * canal cambia de web o de logo, esas dos cadenas.
 */

/* ── El logo ─────────────────────────────────────────────────────────────── */

/** El PNG de la marca (blanco sobre transparente), en la carpeta compartida de `remotion/public/` (zona del estudio). */
export const LOGO = "marcas/luxur/Propiedade-Luxur-Logo.png";
/** El PNG entero (1000×518) y dónde está el logo EN SÍ dentro de él (monograma y «© Propiedades Luxur»). */
export const LOGO_PNG = { ancho: 1000, alto: 518, x0: 54, x1: 945, y0: 63, y1: 444 } as const;
/** Ancho del PNG entero en la tarjeta. En el 017 pasó de 560 a 440 («un poco más pequeño»). */
export const LOGO_ANCHO_REF = 560;
export const LOGO_ANCHO = 440;
/** 40 % de transparencia = 60 % de opacidad. Una constante: un solo sitio que cambiar. */
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

/** El fondo oscuro: un PNG liso (`normalizar.sh`) del negro de la marca. Es el mismo color al que funde la imagen. */
export const TARJETA = "recorrido-019/cierre-oscuro.png";
/** Frames que dura la tarjeta (2,0 s): la web se lee entera con holgura. La puerta la quiere entre 45 y 75. */
export const DUR_TARJETA = 60;
/** Frames que tarda la imagen de Isabella en fundir a negro, contados hacia atrás desde su ÚLTIMO fotograma (entre 4 y 8). */
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
