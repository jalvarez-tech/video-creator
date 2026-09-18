// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, LEY_BLANDA, PIEZAS } from "../../motor/graficos/coreografia";
import { LOOK_013 } from "./look-013";

/**
 * PLAN DE GRÁFICOS — proyecto 013 · «Estamos en el APEX».
 * Artefactos: proyectos/013/artefactos/01-plan.md · 03-timeline.md.
 *
 * Clip real de 30 fps · 383 f (12,77 s). Las ventanas salen de la transcripción
 * por PALABRA (whisper.cpp `-ml 1` sobre el audio ya limpiado), no del guion:
 * `f = s × 30`, medido.
 *
 *   f62  «nombre»   (2,07 s)  → entra el rótulo de la presentadora
 *   f67  «Isabella» (2,22 s)
 *   f146 «APEX»     (4,88 s)  → entra el rótulo del evento
 *   f177 «Cartagena»(5,89 s)
 *   f299 «no se pierdan» (9,96 s) → entra el remate
 *   f347 última palabra; quedan 36 f de cola
 *
 * TODO el texto vive en la BANDA INFERIOR (moldes `sello` y `cta`, ancla
 * 69,8 %). Es R14: la pieza no lleva subtítulos —decisión de cliente—, así que
 * ese carril queda libre y es donde el ojo ya espera leer en un vertical.
 * Arriba no cabe discusión, además: la franja alta la ocupa el SELLO de
 * Propiedades Luxur, que va en todos los frames.
 *
 * LA LEY ES LA BLANDA DEL CANAL, SIN RESERVA. R24 pide `ley.reserva` cuando hay
 * un molde que CENTRA (`pantalla`, `capa`) con hijos escalonados: aquí no hay
 * ninguno —las cuatro tomas anclan arriba y crecen hacia abajo—, así que nadie
 * se recoloca al entrar un hijo. Y encima la reserva sería ACTIVAMENTE mala en
 * esta pieza: estropea justo `entra: "escalon"`, que es lo que hace los dos
 * relevos de abajo.
 */
const { pon, col, gfx, plan, tras } = capa(
  dialectoDe({ piezas: PIEZAS, marca: LOOK_013, ley: LEY_BLANDA }),
  "gfx-013"
);

/**
 * EL VELO DE LA BANDA: el del molde, pero 70 px MÁS ALTO.
 *
 * El molde `sello` trae `alto: 830` y ahí el degradado todavía se está abriendo
 * en la fila 1340 —que es justo donde ANCLA el bloque—: la opacidad efectiva
 * cae a 0,736 y el fondo se queda en luma 51 en el peor frame. Medido sobre el
 * clip real (383 frames, `signalstats` fila a fila), eso deja el naranja del
 * canal en **3,95:1**, por debajo de AA, en la primera línea de cada toma. Las
 * demás filas iban sobradas: el problema es de los primeros 60 px y de nadie más.
 *
 *   | alto del scrim | fila 1340, peor frame | naranja #FF5500 |
 *   |----------------|-----------------------|-----------------|
 *   | 830 (el molde) |        luma 51        |  **3,95:1** ✗   |
 *   | **900**        |        luma 40        |    4,61:1 ✓     |
 *
 * Subir 70 px lo arregla ENTERO y no cuesta nada visible: lo que se añade es la
 * cola suave del degradado (de 0,58 a 0 en el último 20 %), que cae sobre la
 * pared oscura del photocall, no sobre las caras.
 *
 * Por qué se toca el ALTO y no la OPACIDAD, que es la palanca que usó el 012:
 * allí el cliente pidió ver el vídeo por detrás del texto y el problema era que
 * la banda parecía un bloque negro pegado. Aquí nadie ha pedido eso y el
 * problema es el contrario —falta velo justo en el borde de arriba—, así que
 * bajar la opacidad iría en la dirección equivocada. R13: sobre una persona,
 * sólo capas que RESTEN luz.
 *
 * Se aplica a las CUATRO tomas, incluida la del molde `cta` (que trae 880 por
 * su cuenta): un mismo plan con dos alturas de velo se ve como un salto del
 * fondo al llegar al remate.
 *
 * Y `rampa: 0`, que es la otra mitad del arreglo y la que costó encontrar (R25).
 * El velo traía una rampa de 3 frames escrita A FUEGO en el intérprete, y eso
 * rompía DOS cosas de esta pieza a la vez, ninguna visible en un still suelto:
 *
 *   · el f0. `entra: { como: "ninguna" }` (R23) pone el TEXTO en el primer
 *     frame, pero el velo seguía su rampa. Medido en el render: fondo de la
 *     banda en luma 141 y el acento en **1,04:1**. En el f4, 5,37:1.
 *     Y el f0 es la miniatura del reel.
 *   · los dos relevos. En f62 y f146 la toma vieja muere —su velo con ella— y
 *     la nueva empieza la rampa desde cero: la banda se ACLARA 3 frames justo
 *     en el corte duro. Medido: 137 y 116 de luma contra los 23-27 de régimen.
 *     O sea que el `escalon`, que existe para que el relevo sea limpio,
 *     producía el parpadeo que la rampa existe para evitar.
 *
 * Con `rampa: 0` el velo está puesto desde el primer frame de cada toma, igual
 * que el texto, y entre tomas contiguas no se mueve en absoluto.
 */
const VELO_BANDA = { scrim: { alto: 900, rampa: 0 } } as const;

/**
 * EL MISMO VELO, PERO ENTRANDO. Sólo para el remate (`g04`).
 *
 * `rampa: 0` es correcto en las tres primeras tomas porque son CONTIGUAS: el
 * velo ya está puesto y lo único que cambia es el texto. En el remate no —
 * llega después de 55 frames de respiro con la banda limpia—, así que ahí el
 * velo aparece de la nada y la rampa por defecto (3 f) es justo lo que evita
 * que se vea como un parpadeo negro. Es la misma decisión en los dos sitios:
 * el velo entra cuando NACE y no cuando sólo se releva el texto.
 */
const VELO_BANDA_ENTRA = { scrim: { alto: 900 } } as const;

export const graficos013 = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: 383 },
  [
    gfx(
      "g01-hook",
      "sello",
      "gancho",
      [0, 62],
      "hero",
      "El hook, y es una PROMESA, no un letrero de dónde estamos: dice qué se lleva quien mira, no qué se ve. Cede en f62, sobre «mi nombre es», para que el rótulo de ella ocupe su sitio en vez de colgarse debajo",
      [
        // R23: `entra: ninguna` VA EN EL GRUPO. El frame 0 es la MINIATURA del
        // reel, y la entrada de la ley (muelle + rampa 8) la aplica el GRUPO —
        // un nodo no puede anular desde dentro la opacidad de su padre. En el
        // 012 el plan salió limpio y el still de f0 estaba en blanco.
        col(
          [
            // R18: las dos líneas van ESCRITAS A MANO. Dejado al maquetador,
            // «portales» se queda solo en la última y una viuda en el hook es
            // lo primero que se ve. El corte respeta la pausa de la frase.
            pon("titular", {
              id: "hook",
              rol: "hero",
              px: 58,
              entra: { como: "ninguna" },
              lineas: [["Lo que pasa aquí"], [{ t: "no sale en los portales", tinta: "marca" }]],
            }),
          ],
          { entra: { como: "ninguna" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g02-quien",
      "sello",
      "mecanismo",
      [62, 146],
      "hero",
      "Quién habla, sobre la palabra en que lo dice (f62 = «nombre»). En cobertura el nombre no es un adorno: es lo que convierte a una desconocida en una fuente",
      [
        // ENTRADA DURA, igual que el relevo del 012 y por el mismo motivo
        // medido: con la entrada blanda de la ley el hook muere en f62 y este
        // bloque tarda 8 frames en verse — un cuarto de segundo con la banda
        // VACÍA donde tiene que haber un cambio. Aquí duele el doble, porque la
        // toma entera dura 84 f.
        col(
          [
            pon("kicker", { rol: "contexto", texto: "en directo desde cartagena" }),
            pon("titular", {
              id: "quien",
              rol: "hero",
              px: 64,
              lineas: [["Isabella Cadavid"]],
            }),
            // BLANCO, no naranja (R15, tabla en look-013.ts): el medio para el
            // que ella trabaja es un HECHO, no la voz de Luxur. El acento en el
            // nombre de otra marca es el error que la tabla existe para parar.
            pon("chip", { rol: "apoyo", px: 30, texto: "EL WALL STREET INMOBILIARIO", en: tras("quien", 3) }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g03-evento",
      "sello",
      "prueba",
      [146, 245],
      "hero",
      "Dónde estamos, entrando EXACTAMENTE sobre la palabra «APEX» (f146). La fecha aterriza después porque es el dato que decide si a quien mira le sirve: el evento es HOY",
      [
        col(
          [
            pon("kicker", { rol: "contexto", texto: "estamos en" }),
            pon("titular", {
              id: "apex",
              rol: "hero",
              px: 124,
              lineas: [["APEX"]],
            }),
            pon("chip", { rol: "apoyo", px: 30, texto: "17 Y 18 DE SEPTIEMBRE", en: tras("apex", 4) }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    // ── f245-300: RESPIRO. 55 frames sin una sola palabra en pantalla, y es
    // una decisión, no un hueco olvidado. Es el único tramo donde se ve la
    // escena entera —ella, el sombrero vueltiao y la palenquera— sin nada
    // encima, y en 12,8 s con cuatro rótulos ese aire es lo que impide que la
    // pieza se lea como una plantilla rellenada. Checklist §7.8: ante la duda,
    // quita.

    gfx(
      "g04-remate",
      "cta",
      "remate",
      [300, 383],
      "hero",
      "El remate, sobre «no se pierdan» (f299). Se queda hasta el ÚLTIMO frame: el reel se repite y esto es lo que engancha la segunda vuelta",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "no te lo pierdas" }),
          pon("titular", {
            rol: "hero",
            px: 68,
            en: 8,
            lineas: [["Te lo contamos ", { t: "todo", tinta: "marca" }]],
          }),
        ]),
      ],
      { ambiente: VELO_BANDA_ENTRA }
    ),
  ],
  // El VERDE de la pieza (petición del cliente), que es el acento del registro
  // OSCURO: las cuatro tomas van sobre vídeo con velo. Medición en look-013.ts.
  { marca: LOOK_013.color.acentoOscuro }
);
