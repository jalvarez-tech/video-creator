import { LUXUR } from "../../marcas/luxur";
import type { Marca } from "../../motor/marca";

/**
 * EL ACENTO DE LA PIEZA: VERDE ESMERALDA, por petición del cliente.
 *
 * Es `emerald 400`, el MISMO verde del 012, y se reutiliza a propósito en vez
 * de elegir otro: las dos piezas son del mismo evento y el 012 ya pagó el coste
 * de medir por qué no sirve el 500 (`#10B981`), que es el verde «profesional»
 * que uno escribe por defecto y que allí se quedaba en 3,28:1.
 *
 * MEDIDO AQUÍ TAMBIÉN, sobre el render de esta pieza (mediana por fila del
 * ancho útil, peor frame):
 *
 *   | fila | luma fondo | naranja #FF5500 | verde #34D399 |
 *   |------|------------|-----------------|---------------|
 *   | 1340 |     38     |      4,72:1     |  **7,87:1**   |
 *   | 1680 |     22     |      5,65:1     |  **9,41:1**   |
 *
 * O sea que el cambio no solo no resta contraste: lo casi DUPLICA. Aquí el
 * verde va sobradísimo porque el fondo es oscuro de verdad (velo a opacidad 1);
 * en el 012 andaba más justo (4,33:1) porque allí el cliente había pedido
 * aclarar el velo a 0,72. Mismo color, dos fondos distintos.
 */
const VERDE = "#34D399";

/**
 * EL LOOK DEL 013 — Propiedades Luxur, con UNA corrección medida.
 *
 * Esto NO es un canal nuevo: la pieza es de Propiedades Luxur y hereda su
 * fichero entero (`src/marcas/luxur.ts`), incluido el sello. Lo único que
 * cambia es `acentoOscuro`, y no por gusto.
 *
 * QUÉ ES `acentoOscuro` Y POR QUÉ SE TOCA AQUÍ. Es el acento del registro
 * OSCURO, el que usa la capa de gráficos. `MARCA_BASE` lo trae en teal
 * `#0F766E` —el acento de plantilla que venía de fábrica, distinto del naranja
 * del canal— y `marca.ts` lo declara como DEUDA abierta. Esta pieza lo fija
 * **sólo para ella**, al VERDE que pidió el cliente (arriba), y con una
 * medición: el teal quedaba por debajo de AA en toda la banda.
 *
 * MUEVE DOS COSAS A LA VEZ, y es lo que se quiere: el texto de acento de los
 * rótulos Y el punto del `<SelloCampana>`. Dejar el punto naranja y el texto
 * verde serían dos acentos peleando en el mismo frame, que es justo lo que
 * prohíbe R15 (un color = una cosa). Si algún día se quiere el punto con el
 * naranja del canal, se le pasa una marca aparte al sello — pero entonces hay
 * que decidirlo, no heredarlo.
 *
 * MEDIDO SOBRE EL CLIP REAL, no estimado. Fondo = el vídeo (luma por fila,
 * medida con `signalstats` en los 383 frames) compuesto con el Scrim del motor
 * a `alto: 900` y opacidad 1. Peor frame de cada fila:
 *
 *   | fila (px) | luma fondo | blanco   | naranja #FF5500 | teal #0F766E |
 *   |-----------|------------|----------|-----------------|--------------|
 *   | 1340      |     40     | 14,76:1  |    **4,61:1**   | 2,70:1 ← ✗   |
 *   | 1450      |     26     | 17,41:1  |      5,43:1     | 3,18:1 ← ✗   |
 *   | 1560      |     24     | 17,76:1  |      5,54:1     | 3,24:1 ← ✗   |
 *   | 1680-1750 |     23     | 17,93:1  |      5,59:1     | 3,28:1 ← ✗   |
 *
 * El teal queda **por debajo de AA (4,5:1) en TODA la banda**, y encima es de
 * otra marca: una pieza firmada «PROPIEDADES LUXUR» con el acento de otro canal
 * es exactamente el fallo que `marca.ts` dejó anotado para que se viera. Los
 * dos candidatos que sí valen —el naranja del canal y el verde que se eligió—
 * pasan AA en toda la banda, incluida la fila más alta y más clara, que es
 * donde el degradado todavía se está abriendo.
 *
 * LA MEDICIÓN DEL NARANJA SE DEJA ESCRITA aunque ya no se use, porque contesta
 * una pregunta que se va a volver a hacer: este mismo naranja sobre el papel
 * beige del canal da 2,62:1, y aquí da 4,61. No es que el naranja sea legible o
 * no: es que es tinta de OSCURO. Sobre papel sigue sin estar resuelto, y esto
 * no lo resuelve.
 *
 * Un color = una cosa (R15):
 *
 *   | color            | significa                        | dónde aparece                    |
 *   |------------------|----------------------------------|----------------------------------|
 *   | verde `#34D399`  | **la voz de Luxur**: lo que el   | «no sale en los portales» (hook),|
 *   |                  | canal afirma y lo que pide       | «todo» (remate), el punto del sello |
 *   | blanco           | **el hecho**: quién habla, qué   | Isabella Cadavid, APEX, la fecha |
 *   |                  | evento, qué fecha                |                                  |
 *   | sin color        | contexto                         | los tres kickers                 |
 *
 * Por eso «APEX» va en BLANCO y no en el acento, que es lo que uno escribe por
 * inercia: APEX no es de Luxur. Luxur está ahí, que es otra cosa, y lo dice el
 * sello.
 */
export const LOOK_013: Marca = {
  ...LUXUR,
  nombre: "013-apex-cobertura",
  color: {
    ...LUXUR.color,
    // La única línea que esta pieza cambia del canal. Ver las tablas de arriba.
    acentoOscuro: VERDE,
  },
};
