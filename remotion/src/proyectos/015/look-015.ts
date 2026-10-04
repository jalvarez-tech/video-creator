import { LUXUR } from "../../marcas/luxur";
import type { Marca } from "../../motor/marca";
import type { LookMetraje } from "../../motor/metraje";

/**
 * EL ACENTO DE LA PIEZA: el VERDE de las piezas de APEX (`emerald 400`).
 *
 * Es el mismo del 012 y del 013, y el 013 es la pieza hermana de ésta: la misma
 * presentadora, el mismo evento, el mismo canal. Allí el cliente cambió el
 * naranja del canal por este verde y lo medimos sobre la banda con velo a
 * opacidad 1: **7,87-9,41 : 1** (el naranja daba 4,61-5,60). Aquí se hereda la
 * decisión y se vuelve a MEDIR en el render (02-layout.md), porque los fondos
 * de la banda son otros nueve.
 *
 * No se importa de `proyectos/013/`: el linter prohíbe que un proyecto dependa
 * de otro (`no-restricted-imports`), y un color de dos piezas no es todavía
 * un color del canal. Si llega una tercera pieza de APEX con marca, es el
 * momento de subirlo a `marcas/`.
 */
const VERDE = "#34D399";

/**
 * EL LOOK DEL 015 — Propiedades Luxur, con UNA corrección (la del 013).
 *
 * La pieza es del canal: lleva su sello en todos los frames y su cuenta
 * (@propiedadesluxur) en el cierre, que es lo que pidió el cliente. Del canal
 * cambia solo `acentoOscuro`, y eso mueve A LA VEZ el texto de acento de los
 * rótulos y el punto del `<SelloCampana>` — a propósito (R15, ver 013).
 *
 * Un color = una cosa (R15):
 *
 *   | color           | significa                           | dónde aparece                        |
 *   |-----------------|-------------------------------------|--------------------------------------|
 *   | verde `#34D399` | **la lección**: la idea que ella    | «no fueron las propiedades», «opor-  |
 *   |                 | subraya y lo que el canal ofrece    | tunidad», «red», «escalan», «entiende|
 *   |                 |                                     | mejor», los ✓, @propiedadesluxur,    |
 *   |                 |                                     | el punto del sello                   |
 *   | rojo `perdida`  | **lo que se deja de hacer**         | los dos ✗ (solo el glifo)            |
 *   | blanco          | **su voz**: la frase, su nombre     | el resto de titulares e ítems        |
 *   | sin color       | contexto                            | kickers y el chip                    |
 *
 * El rojo es el segundo color simbólico y R15 lo permite justo en este caso:
 * las dos listas COMPARAN dos cosas de signo opuesto («solo resolver problemas»
 * ✗ / «crear estrategias» ✓, «¿qué vendo?» ✗ / «¿cómo puedo ayudar?» ✓). Va
 * solo en los glifos ✗, nunca en una palabra. El verde de los ✓ es la tinta
 * `logro` de la paleta, que es el mismo hex que el acento: no entra otro color.
 */
export const LOOK_015: Marca = {
  ...LUXUR,
  nombre: "015-apex-lecciones",
  color: {
    ...LUXUR.color,
    // La única línea que esta pieza cambia del canal (la del 013).
    acentoOscuro: VERDE,
  },
};

/**
 * EL LOOK DEL METRAJE: NEUTRO, y es una decisión, no un olvido.
 *
 * `<PistaMetraje>` pide `marca` o `look`. El de la marca (`lookDeMarca`) es el
 * del formato noticias —saturación 0,86, velo cálido naranja en soft-light,
 * grano y viñeta 0,22—: sirve para igualar b-roll de tres autores, y aquí haría
 * dos cosas malas a la vez. Pintaría de naranja a una persona (R13: nada que
 * SUME luz sobre ella, y el soft-light suma en las altas luces) y la separaría
 * del 013, donde la misma presentadora sale a sangre, sin ningún look.
 *
 * Los nueve clips son de UNA cámara, el mismo día y ya pasados por el mismo
 * tone-map (`normalizar.sh`): no hay tres cámaras que igualar. Medido con
 * `signalstats`, la luma media va de 94 a 119, pero la marca el FONDO (el
 * photocall oscuro, el jardín de noche), no ella: su piel se ve pareja en la
 * hoja de los nueve (`vistas-previas/normalizados.png`). Por eso tampoco hay
 * `grado` por corte.
 *
 * Lo único que queda es una viñeta suave, que RESTA luz en las esquinas y ayuda
 * a que dos lugares distintos se lean como una pieza mientras se funden.
 */
export const LOOK_METRAJE_015: LookMetraje = {
  saturacion: 1,
  contraste: 1,
  calido: 0,
  colorCalido: "#000000",
  grano: 0,
  vineta: 0.16,
  vinetaDesde: 60,
  negro: LOOK_015.color.negro,
};
