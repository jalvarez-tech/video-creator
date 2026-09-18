import { MARCA_BASE, type Marca } from "../../motor/marca";
import type { LookMetraje } from "../../motor/metraje";

/**
 * EL ÚNICO COLOR VIVO DE LA PIEZA: VERDE ESMERALDA `emerald 400`.
 *
 * Es el MISMO verde del 012 y del 013, y se reutiliza a propósito: el cliente
 * lo pidió dos veces («un verde profesional») y las dos piezas ya pagaron el
 * coste de medirlo. El 500 (`#10B981`) se quedaba en 3,28:1 sobre una banda
 * aclarada; el 400 dio 4,68:1 allí y 7,87-9,41:1 en el 013 sobre velo a
 * opacidad 1. Aquí el fondo de la banda es el más CLARO de las tres piezas
 * —la americana blanca cae justo en el carril del texto (luma media 108-121
 * medida en el clip normalizado)—, así que el velo va a opacidad 1 y a 900 px,
 * y el contraste se mide en el render, no se hereda (ver 02-layout.md).
 */
const VERDE = "#34D399";

/**
 * EL LOOK DEL 014 — y por qué NO vive en `src/marcas/`.
 *
 * Esto no es un canal: es el registro de UNA pieza. El vídeo es un mensaje
 * PERSONAL del cliente («Hola, mi nombre es…») presentando su propio agente de
 * IA, no contenido de Propiedades Luxur ni de ningún otro canal del repo. No
 * existe fichero de marca para su marca personal, y el encargo («agrégale
 * textos y efectos de sonido») no pide sello. Así que la pieza sale a
 * propósito SIN watermark (`sello.texto` en `null`), igual que el 012, y es una
 * decisión declarada (director §5b), no un olvido. El día que su marca personal
 * tenga fichero en `src/marcas/`, lo que cambia es el parámetro, no esto.
 *
 * Un color = una cosa (R15):
 *
 *   | color            | significa                              | dónde aparece                       |
 *   |------------------|----------------------------------------|-------------------------------------|
 *   | verde `#34D399`  | **lo que el agente te da**: minutos,   | «en minutos», «inteligencia         |
 *   |                  | automatización, tiempo, vida           | artificial», los ✓, «todo»,         |
 *   |                  |                                        | «importante»                        |
 *   | rojo `perdida`   | **lo que deja de hacerse**: las tareas | los tres ✗ de «tras un largo día»   |
 *   |                  | que el agente absorbe                  | (solo la marca, nunca el texto)     |
 *   | blanco           | **su voz**: el problema, la lista      | el resto de titulares y de ítems    |
 *   | sin color        | contexto                               | kickers y chips                     |
 *
 * El rojo es el segundo color simbólico y R15 lo permite justo en este caso:
 * la pieza COMPARA dos listas de signo opuesto (lo que el agente hace por ti /
 * lo que tú dejas de hacer). Aparece solo en los tres glifos ✗, a 40 px, y en
 * ninguna palabra. El verde de los ✓ es la tinta `logro` de la paleta del
 * dialecto, que es literalmente el mismo hex que el acento: no entra un cuarto
 * color.
 */
export const LOOK_014: Marca = {
  ...MARCA_BASE,
  nombre: "014-agente",
  // Sin canal, sin sello. Ver la nota de arriba.
  sello: { texto: null },
  color: {
    ...MARCA_BASE.color,
    acento: VERDE,
    acentoOscuro: VERDE,
    acentoChip: "#6EE7B7",
    // El color del velo. Negro de verdad y no el gris azulado del suelo
    // (#0E1015): con la americana blanca detrás, cada punto de densidad del
    // scrim cuenta, y el 012 ya midió este mismo negro bajo el mismo verde.
    fondoOscuro: "#08090C",
  },
};

/**
 * EL LOOK DE LOS INSERTOS (3.ª pasada). Neutro a propósito: su clip no lleva
 * grano, ni viñeta, ni velo, y un b-roll con look propio se leería como otra
 * pieza pegada dentro de ésta. Lo que acerca cada plano a él es su `grado`
 * (metraje-014.ts), medido; esto solo pone el COLOR del velo cálido que ese
 * `grado.calido` abre en los tres planos fríos (i1, i3, i6), a 0,03 de alfa.
 */
export const LOOK_INSERTOS_014: LookMetraje = {
  saturacion: 1,
  contraste: 1,
  calido: 0,
  colorCalido: "#FFA25C",
  grano: 0,
  vineta: 0,
  negro: "#000000",
};
