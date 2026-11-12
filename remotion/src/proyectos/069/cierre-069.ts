/**
 * LA TARJETA FINAL DEL 069 — textos, colores y tiempos, como DATOS (la puerta los lee con node).
 *
 * El guion de ellos pide un «TEXTO FINAL EN PANTALLA» con cinco bloques: la frase del fuego, la del amor, la firma «Unidos por Botswana. Unidos por Nelson.», el párrafo de
 * llamado a compartir y la INFORMACIÓN OFICIAL PARA REALIZAR APORTES. REVISIÓN 7 (2026-10-28, pedido de ellos: «utiliza la misma fuente para el texto al final y resúmelo persuasivamente»):
 * TODO el texto va en UNA sola fuente, Montserrat (antes «PERO JAMÁS EL AMOR QUE ALLÍ NACIÓ» iba en Playfair Display cursiva), y el párrafo de 16 palabras («Cada aporte, cada gesto y cada vez que
 * compartes esta historia nos ayuda a reconstruir este sueño.») se resume en una orden y su porqué: «Aporta. Comparte.» + «Ayúdanos a reconstruir este sueño.». Las frases del fuego y del amor y la firma son
 * del guion y no se tocan. Con menos que leer, la orden y los datos de aporte entran antes y la tarjeta se queda 4,0 s con todo en pantalla (antes 3,6). Este último es lo único que no se puede escribir desde aquí: son datos de una cuenta de verdad (banco,
 * nombre del titular, número) y solo los puede poner quien los conoce. Se reserva su sitio y se muestra el rótulo entre corchetes, tal como está en el guion, hasta que
 * `APORTES.lineas` lleve algo. Mientras `APORTES.lineas` esté vacío la puerta avisa, y con `--final` FALLA: no sale una final con el hueco sin llenar.
 *
 * TABLA DE COLOR (R15 — el color dice quién habla):
 *   blanco  `#F5F1EA`  lo que se dice (las frases y la firma)
 *   rojo    `#E5484D`  el amor: la palabra AMOR y el corazón, nada más
 *   ámbar   `#F2A33A`  lo que se le pide al que mira: «Aporta. Comparte.» y el marco de los aportes con su rótulo
 *   gris    `#CFC8C0`  el porqué de la orden (lo que acompaña, no lo que manda)
 * Sobre el negro cálido de la tarjeta (`#0B0908`, el mismo al que funden las fotos de antes) el rojo da 4,9:1 (texto grande) y el ámbar y el blanco, más de 9.
 *
 * LA ESCALERA. Todo entra a su frame (contado desde el inicio de la tarjeta, `INICIO_TARJETA` en `metraje-069.ts`) con un fundido de 14 f y una subida de 18 px; nada sale.
 * Cada bloque entra cuando el anterior ya se leyó: «EL FUEGO PUEDE DESTRUIR UN LUGAR.» a los 8 f, la del amor a los 52, el corazón a los 74, la firma a los 112, la orden de aportar y compartir a los 136 y los
 * aportes a los 166. Con todo en pantalla a los 180 f, la tarjeta se queda 120 f (4,0 s) con el cuadro completo: es lo que se lee y se capta de pantalla para donar.
 *
 * Datos puros, sin React.
 */

export const DUR_TARJETA = 300;

export const COLORES_069 = {
  fondo: "#0B0908",
  blanco: "#F5F1EA",
  rojo: "#E5484D",
  ambar: "#F2A33A",
  gris: "#CFC8C0",
} as const;

/** Cuántos frames tarda un bloque en aparecer y cuántos px sube mientras lo hace. */
export const ENTRADA_BLOQUE = { frames: 14, sube: 18 } as const;

export interface LineaCierre {
  id: string;
  /** Frames desde el inicio de la tarjeta en los que entra. */
  entra: number;
}

export const FRASE_FUEGO = { id: "fuego", entra: 8, lineas: ["EL FUEGO PUEDE", "DESTRUIR UN LUGAR."] } as const;
export const FRASE_AMOR = { id: "amor", entra: 52, lineas: ["PERO JAMÁS EL AMOR", "QUE ALLÍ NACIÓ."], acento: "AMOR" } as const;
export const CORAZON = { id: "corazon", entra: 74, px: 96 } as const;
export const FIRMA = { id: "firma", entra: 112, lineas: ["Unidos por Botswana.", "Unidos por Nelson."] } as const;
/** El resumen persuasivo del párrafo del guion: la orden (en ámbar, dos verbos) y su porqué (en gris). */
export const PARRAFO = {
  id: "parrafo",
  entra: 136,
  orden: "Aporta. Comparte.",
  porque: "Ayúdanos a reconstruir este sueño.",
} as const;

/**
 * LA INFORMACIÓN OFICIAL PARA REALIZAR APORTES. `lineas` vacío = pendiente: se pinta el rótulo del guion entre corchetes. Cuando John e Isabella la entreguen, cada elemento es una
 * línea de la tarjeta (el banco y el tipo de cuenta, el número, el titular, un enlace). Máximo 4 líneas y 30 caracteres cada una (a 38 px de Montserrat 600 caben ≈ 33 en los 760 px útiles del marco).
 * El marco va anclado por ABAJO (`aportesAbajo`): con más líneas crece hacia arriba y no choca con la interfaz de la app; con 4 líneas su borde de arriba cae en y≈1350, bajo la orden de aportar (acaba en y≈1290).
 */
export const APORTES = {
  id: "aportes",
  entra: 166,
  titulo: "Información oficial para realizar aportes",
  lineas: [] as readonly string[],
  maxLineas: 4,
  maxCaracteres: 30,
} as const;

/**
 * Y de cada bloque en px de la composición (1080×1920): la columna va centrada y deja libres los 250 px de arriba y los 280 de abajo, donde cada app pone su interfaz.
 * `aportesAbajo` es la distancia del marco de aportes al borde INFERIOR.
 */
export const POSICION = {
  fuego: 330,
  amor: 520,
  corazon: 740,
  filete: 880,
  firma: 940,
  parrafo: 1160,
  aportesAbajo: 280,
} as const;
