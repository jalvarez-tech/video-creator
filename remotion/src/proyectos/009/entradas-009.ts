/**
 * LAS ENTRADAS PROPIAS DEL 009 — whip y flash.
 *
 * No son del formato montaje: son del estilo «redes» de este reel, y ninguna
 * otra pieza las ha usado (el 010 las prohíbe por encargo). Por eso se quedan
 * aquí y llegan a `<PistaMetraje>` por `entradas`, que es como el motor deja a
 * una pieza pintar lo suyo sin copiar el intérprete. Si otro vídeo las pide,
 * suben a `motor/metraje/` (la regla de la casa: al motor sube lo que ya ha
 * servido a más de una pieza).
 *
 * Funciones PURAS del frame del plano. `interpolate` viene de
 * `remotion/no-react` —el mismo, sin React— para que `revisar-009.mjs` las
 * ejecute con `node` y mida el latigazo con la misma curva con la que se pinta.
 */
import { interpolate } from "remotion/no-react";
import { STREETCATS } from "../../marcas/streetcats";
import type { EntradaPropia } from "../../motor/metraje";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** El latigazo: entra desplazado 90 px a la derecha y borroso, y en 7 f está quieto. */
const DUR_WHIP = 7;

const whip: EntradaPropia = (f) => {
  const borron = interpolate(f, [0, DUR_WHIP], [14, 0], CLAMP);
  return {
    x: interpolate(f, [0, DUR_WHIP], [90, 0], CLAMP),
    borron: borron > 0.05 ? borron : 0,
  };
};

/**
 * El flash tiene que leerse como un GOLPE, no como un frame quemado. Medido en
 * el render: a 0,5 de alfa sobre ámbar el fotograma entero se va a amarillo y
 * parece un fallo de codificación, no una transición. 0,38 en 4 f (0,13 s) pega
 * igual y no borra la imagen de debajo.
 */
const flash: EntradaPropia = (f) => ({
  destello: { color: STREETCATS.color.acento, opacidad: interpolate(f, [0, 1, 4], [0.38, 0.2, 0], CLAMP) },
});

export const ENTRADAS_009 = { whip, flash };
