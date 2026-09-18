// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, LEY_BLANDA, PIEZAS } from "../../motor/graficos/coreografia";
import { DURACION_015 } from "./metraje-015";
import { LOOK_015 } from "./look-015";

/**
 * PLAN DE GRÁFICOS — proyecto 015 · «Lo que aprendí en APEX».
 * Artefactos: proyectos/015/artefactos/01-plan.md · 03-timeline.md.
 *
 * Doce tomas de texto sobre nueve clips ya montados (`metraje-015.ts`). Todas
 * las ventanas están en frames de la COMP, no de la fuente: se sacan de los
 * límites de voz de cada corte (`voz.s0/s1`) y de la frase dentro de la toma,
 * con `f = en + round(t × 30) − round(desde × 30)`. Cada nodo que cae sobre una
 * palabra lleva su `abs`: si alguien mueve un corte y el texto se queda donde
 * estaba, `revisaPlan` avisa (y la puerta, `revisar-015.mjs`, falla).
 *
 *   f0     «Lo más valioso de APEX…»        → el hook YA está puesto (R23, R27)
 *   f100   entra c02 · «Fueron las ideas…»   → su respuesta, en grande
 *   f197   (dentro de c02) · «tras de cada problema» (f203)
 *   f294   entra c03 · «Hoy aprendimos»      → ✗ f317 «no solo» · ✓ f414 «crear» (c04)
 *   f537   entra c05 · «algo más importante» → f585 «tu red»
 *   f689   entra c06                        → f763 «tus posibilidades» · f797 «escalan»
 *   f825   entra c07 · «una frase…»         → f895 «no siempre gana…»
 *   f970   (dentro de c07)                  → f976 «gana el que…» · f1079 «cómo comunicas»
 *   f1122  entra c08 · «la lección más importante», en grande
 *   f1240  (dentro de c08) · «dejar de preguntarte» → ✗ f1246 · ✓ f1330 «cómo puedes ayudar»
 *   f1376  entra c09 · «Soy Isabella Cadavid»
 *   f1464  el @ de la cuenta, en la pausa antes de «Si te gustó» (f1470), hasta el final
 *
 * TODO EL TEXTO EN LA BANDA INFERIOR (molde `sello`, y `cta` el cierre), SIN
 * SUBTÍTULOS: es la preferencia declarada del cliente en sus piezas de gente a
 * cámara (012, 013, 014) y el molde de la pieza hermana (013). Ella está de
 * cuerpo entero en casi todas las tomas, así que la banda cae sobre el pantalón
 * y el suelo, nunca sobre la cara.
 *
 * UNA IDEA POR TOMA, Y LA BANDA NUNCA ESPERA VACÍA. Cada toma entra a corte
 * (R27) o en el frame en que su clip termina de fundirse o en una pausa de su
 * frase, y dice lo que ella está diciendo en ese momento; lo que tiene que
 * caer sobre una palabra (un titular, un ✗, un ✓) aterriza 6 f antes de ella.
 * La primera pasada dejaba dos tramos de 3-4 s con solo un antetítulo en la
 * banda esperando a la frase clave (la hoja de contactos lo enseñó: c02 y c08);
 * ahora esos dos clips llevan dos tomas cada uno, y la primera es la frase que
 * dice al entrar. La lección de c03-c04 es UNA comparación (✗ / ✓) y cruza su
 * fundido sin relevarse.
 *
 * LA LEY ES LA BLANDA DEL CANAL, SIN RESERVA (moldes anclados arriba: nadie se
 * recoloca; y la reserva estropearía los `escalon` de los relevos, R24).
 *
 * LOS SONIDOS VIVEN EN EL NODO (`sonido`): cada texto que entra declara su
 * efecto y `cues-015.ts` los lee con `anclasDeSonido()`, que devuelve el frame
 * ABSOLUTO ya resuelto. Así, si un texto se mueve, su sonido se mueve con él —
 * en el 014 los frames se copiaban a mano de un archivo a otro—.
 */
const { pon, col, fila, gfx, plan } = capa(
  dialectoDe({ piezas: PIEZAS, marca: LOOK_015, ley: LEY_BLANDA }),
  "gfx-015"
);

/**
 * EL VELO DE LA BANDA: el del molde, 70 px más alto y SIN rampa, en TODAS las
 * tomas. `alto: 900` por lo que midió el 013 (con 830 el degradado todavía se
 * abre en la fila 1340, donde ancla el bloque). `rampa: 0` es R25, y aquí vale
 * para las diez: la primera empieza en el f0 (la miniatura) y las nueve
 * siguientes son relevos CONTIGUOS, así que el velo nace una vez y no se mueve
 * en 52 s. Opacidad 1: nadie ha pedido ver el vídeo detrás del texto, y R13
 * solo permite capas que resten luz sobre una persona.
 */
const VELO = { scrim: { alto: 900, rampa: 0 } } as const;

/** Tres sonidos por texto, a lo sumo, y siempre el mismo para el mismo gesto (ver `cues-015.ts`). */
const RELEVO = (reason: string) => ({ variante: "relevo", reason });
const ATERRIZA = (reason: string) => ({ variante: "aterriza", reason });

/** Cuerpo de los ítems ✗/✓ (el del 014, que ya se leyó bien sobre vídeo). */
const PX_ITEM = 46;

export const graficos015 = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: DURACION_015 },
  [
    gfx(
      "g01-hook",
      "sello",
      "gancho",
      [0, 100],
      "hero",
      "El hook es su propia frase de apertura, y ya es una promesa: dice que lo que se lleva quien mira NO son propiedades, en un canal de propiedades. El kicker convierte la pieza en una lista de aprendizajes antes de que ella lo diga. Está entero en el f0 (la miniatura) y se va con la disolvencia a c02",
      [
        // R23 + R27: `entra: ninguna` en el GRUPO y en los hijos, y `en: 0` en
        // los dos, o la escalera de la ley deja el titular 6 f tarde y el f0
        // sale solo con el kicker (medido en el 014).
        col(
          [
            pon("kicker", { rol: "contexto", texto: "lo que aprendí en apex", en: 0, entra: { como: "ninguna" } }),
            // R18: dos líneas escritas a mano. El giro («no fueron…») va solo en
            // la segunda y en verde: es la lección número cero.
            pon("titular", {
              id: "hook",
              rol: "hero",
              px: 56,
              en: 0,
              entra: { como: "ninguna" },
              lineas: [["Lo más valioso"], [{ t: "no fueron las propiedades", tinta: "marca" }]],
            }),
          ],
          { en: 0, entra: { como: "ninguna" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g02-ideas",
      "sello",
      "prueba",
      [100, 197],
      "hero",
      "La RESPUESTA al hook, en grande y mientras ella la dice («Fueron las ideas, las oportunidades…», f101-f193): es el pago de la curiosidad que abrió el f0 y cae en los segundos 3-6, donde se decide si alguien se queda. Por eso no es un antetítulo esperando a la frase siguiente",
      [
        // Toma de un solo nodo: el titular entra A CORTE (R27), o el primer
        // frame del relevo sería el velo sin nada escrito.
        col(
          [
            pon("titular", {
              id: "ideas",
              rol: "hero",
              px: 58,
              entra: { como: "escalon" },
              abs: 100,
              lineas: [["Fueron las ", { t: "ideas", tinta: "marca" }], ["y las ", { t: "oportunidades", tinta: "marca" }]],
              sonido: RELEVO("Relevo del hook a su respuesta, en el frame en que c02 termina de fundirse."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g03-oportunidad",
      "sello",
      "prueba",
      [197, 294],
      "hero",
      "La frase que se lleva quien mira, relevada DENTRO de c02 sobre «tras de cada problema» (f203) y con «oportunidad» en verde. Es la primera lección y la que conecta con el hook: donde hay un problema, hay negocio",
      [
        col(
          [
            pon("titular", {
              id: "problema",
              rol: "hero",
              px: 56,
              entra: { como: "escalon" },
              abs: 197,
              lineas: [["Detrás de cada problema"], ["hay una ", { t: "oportunidad", tinta: "marca" }]],
              sonido: RELEVO("Releva a la frase clave 6 f antes de «tras» (f203)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g04-estrategias",
      "sello",
      "mecanismo",
      [294, 537],
      "hero",
      "La primera lección es una COMPARACIÓN y se cuenta en dos tomas de vídeo (c03 dice lo que no, c04 lo que sí), así que el texto cruza el fundido sin relevarse: ✗ sobre «no solo» (f323) y ✓ sobre «crear» (f420), cada uno 6 f antes de su palabra",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "hoy aprendimos",
              entra: { como: "escalon" },
              abs: 294,
              sonido: RELEVO("Relevo a la primera lección, al terminar de fundirse c03."),
            }),
            // Columna PROPIA alineada a la izquierda (el ✗ y el ✓ en la misma
            // vertical, como una lista y no como dos rótulos) y con `en: 0`:
            // sin él la escalera la retrasa 6 f y los `en` de los ítems, que
            // cuentan desde aquí, llegan tarde (R27).
            col(
              [
                pon("lista", {
                  rol: "apoyo",
                  px: PX_ITEM,
                  en: 23,
                  abs: 317,
                  items: [{ texto: "Solo resolver problemas", estado: "no" }],
                  sonido: { variante: "tacha", reason: "✗ Solo resolver problemas: un clic seco, tachar. Antes de «no solo» (f323)." },
                }),
                pon("lista", {
                  rol: "apoyo",
                  px: PX_ITEM,
                  en: 120,
                  abs: 414,
                  items: [{ texto: "Crear estrategias", estado: "si" }],
                  sonido: { variante: "acierta", reason: "✓ Crear estrategias: el timbre positivo, 6 f antes de «crear» (f420)." },
                }),
              ],
              { alinea: "inicio", gap: 22, en: 0, entra: { como: "ninguna" } }
            ),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g05-red",
      "sello",
      "giro",
      [537, 689],
      "hero",
      "La segunda lección. El kicker es su anuncio («algo todavía más importante») y deja que su pausa de 0,46 s haga su trabajo; el titular aterriza en «tu red» (f591), con «red» en verde",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "algo todavía más importante",
              entra: { como: "escalon" },
              abs: 537,
              sonido: RELEVO("Relevo a la segunda lección, al terminar de fundirse c05."),
            }),
            pon("titular", {
              id: "red",
              rol: "hero",
              px: 60,
              en: 48,
              abs: 585,
              lineas: [["Tu ", { t: "red", tinta: "marca" }, " cambia"], ["tus oportunidades"]],
              sonido: ATERRIZA("Aterriza «Tu red cambia tus oportunidades», 6 f antes de «tu red» (f591)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g06-escalan",
      "sello",
      "prueba",
      [689, 825],
      "hero",
      "La consecuencia de la lección de la red, en dos tiempos que siguen su frase: «Tus posibilidades» sobre su palabra (f771) y «escalan», más grande y en verde, sobre la suya (f803). El verbo es la promesa: por eso va solo",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "relaciónate con estrategia",
              entra: { como: "escalon" },
              abs: 689,
              sonido: RELEVO("Relevo a la primera toma de fuera (c06), al terminar de fundirse."),
            }),
            pon("titular", {
              id: "posibilidades",
              rol: "hero",
              px: 60,
              en: 74,
              abs: 763,
              lineas: [["Tus posibilidades"]],
              sonido: ATERRIZA("Aterriza «Tus posibilidades», 8 f antes de su palabra (f771)."),
            }),
            // `apoyo` y no un segundo `hero` (uno por toma), con el cuerpo y el
            // verde a mano: es la palabra que se queda.
            pon("titular", {
              id: "escalan",
              rol: "apoyo",
              px: 76,
              en: 108,
              abs: 797,
              lineas: [[{ t: "escalan", tinta: "marca" }]],
              sonido: ATERRIZA("Aterriza «escalan», 6 f antes de que lo diga (f803)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g07-cita",
      "sello",
      "prueba",
      [825, 970],
      "hero",
      "La cita del día, primera mitad. El kicker la presenta mientras ella dice «hubo una frase que me quedó muy marcada», y la frase aterriza entre comillas sobre «no siempre» (f901): es una cita, no una opinión suya, y las comillas lo dicen",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "una frase que me marcó",
              entra: { como: "escalon" },
              abs: 825,
              sonido: RELEVO("Relevo a la cita, al terminar de fundirse c07."),
            }),
            pon("titular", {
              id: "cita1",
              rol: "hero",
              px: 58,
              en: 70,
              abs: 895,
              lineas: [["«No siempre gana"], ["el mejor producto»"]],
              sonido: ATERRIZA("Aterriza la primera mitad de la cita, 6 f antes de «no siempre» (f901)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g08-mercado",
      "sello",
      "giro",
      [970, 1122],
      "hero",
      "La segunda mitad de la cita, relevada DENTRO de c07, en su pausa de 0,47 s tras «producto». El kicker de g07 se repite idéntico y en el mismo sitio (no se ve moverse): lo único que cambia es la frase, que aterriza sobre «gana» (f976). El chip cierra con su conclusión sobre «cómo comunicas» (f1085)",
      [
        col(
          [
            // Mismo texto que el kicker de g07 y mismo sitio (el molde ancla
            // arriba): en el relevo NO se mueve. El sonido va con la frase.
            pon("kicker", { rol: "contexto", texto: "una frase que me marcó", entra: { como: "escalon" }, abs: 970 }),
            pon("titular", {
              id: "cita2",
              rol: "hero",
              px: 58,
              abs: 976,
              lineas: [["«Gana el que el mercado"], [{ t: "entiende mejor", tinta: "marca" }, "»"]],
              sonido: RELEVO("Releva la cita a su segunda mitad justo sobre «gana» (f976)."),
            }),
            pon("chip", {
              rol: "apoyo",
              px: 30,
              texto: "IMPORTA CÓMO COMUNICAS",
              en: 109,
              abs: 1079,
              sonido: ATERRIZA("El chip de la conclusión, 6 f antes de «cómo comunicas» (f1085)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g09-leccion",
      "sello",
      "giro",
      [1122, 1240],
      "hero",
      "El anuncio del cierre, con sus palabras y en grande mientras las dice («la lección más importante del primer día», f1123-f1204): prepara la última comparación en vez de dejar la banda con un antetítulo cuatro segundos",
      [
        col(
          [
            pon("titular", {
              id: "leccion",
              rol: "hero",
              px: 58,
              entra: { como: "escalon" },
              abs: 1122,
              lineas: [["La lección"], [{ t: "más importante", tinta: "marca" }]],
              sonido: RELEVO("Relevo a la última lección, al terminar de fundirse c08."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g10-pregunta",
      "sello",
      "remate",
      [1240, 1376],
      "hero",
      "La lección, con el mismo gesto que la primera (✗ / ✓) para que se lea como su cierre. Las dos preguntas son las que uno se hace a sí mismo, en primera persona: ✗ «¿Qué vendo?» sobre «qué vender» (f1252) y ✓ «¿Cómo puedo ayudar?» sobre «cómo» (f1336)",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "la pregunta correcta",
              entra: { como: "escalon" },
              abs: 1240,
              sonido: RELEVO("Relevo a la pregunta, en «dejar de preguntarte» (f1240)."),
            }),
            col(
              [
                // «¿Qué vendo?» y no su frase literal: whisper la oye «qué ven de
                // él / de ir», y entre «qué vender» y «qué vendes» no hay forma de
                // decidir sin oírla (ver 01-plan.md). La pregunta en primera
                // persona dice lo mismo que las dos y no cita nada dudoso.
                pon("lista", {
                  rol: "apoyo",
                  px: PX_ITEM + 4,
                  en: 6,
                  abs: 1246,
                  items: [{ texto: "¿Qué vendo?", estado: "no" }],
                  sonido: { variante: "tacha", reason: "✗ ¿Qué vendo?: el mismo clic que el primer ✗, 6 f antes de «qué vender» (f1252)." },
                }),
                pon("lista", {
                  rol: "apoyo",
                  px: PX_ITEM + 4,
                  en: 90,
                  abs: 1330,
                  items: [{ texto: "¿Cómo puedo ayudar?", estado: "si" }],
                  sonido: { variante: "acierta", reason: "✓ ¿Cómo puedo ayudar?: el mismo timbre que el primer ✓, 6 f antes de «cómo» (f1336)." },
                }),
              ],
              { alinea: "inicio", gap: 22, en: 0, entra: { como: "ninguna" } }
            ),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g11-firma",
      "sello",
      "remate",
      [1376, 1464],
      "hero",
      "Quién habla, sobre «Soy Isabella Cadavid» (f1377). Solo el nombre, que el cliente confirmó en el 013: lo que dice después («[realtor] de la ciudad de [Medellín]») no se pone en pantalla hasta que alguien lo confirme — un dato propio no se reconstruye de whisper",
      [
        // Toma de un solo nodo: el titular entra A CORTE (R27), o el primer
        // frame del relevo sería el velo sin nada escrito.
        col(
          [
            pon("titular", {
              id: "firma",
              rol: "hero",
              px: 64,
              entra: { como: "escalon" },
              abs: 1376,
              lineas: [["Isabella Cadavid"]],
              sonido: RELEVO("Relevo a la firma, al terminar de fundirse c09 (ella dice su nombre en f1377)."),
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),

    gfx(
      "g12-redes",
      "cta",
      "cta",
      [1464, DURACION_015],
      "hero",
      "El cierre que pidió el cliente: la cuenta @propiedadesluxur y sus redes. Entra en la pausa de 0,7 s antes de «Si te gustó la información» (f1470), con su propio CTA de kicker, y se queda hasta el ÚLTIMO frame: 3,3 s, lo que tarda en decir el suyo y sonreír",
      [
        col(
          [
            pon("kicker", {
              rol: "contexto",
              texto: "escríbeme y hablamos",
              entra: { como: "escalon" },
              abs: 1464,
              sonido: RELEVO("Relevo de la firma al cierre, en la pausa antes de «Si te gustó»."),
            }),
            pon("titular", {
              id: "cuenta",
              rol: "hero",
              px: 62,
              abs: 1470,
              lineas: [[{ t: "@propiedadesluxur", tinta: "marca" }]],
              sonido: { variante: "cuenta", reason: "Aterriza la cuenta: una notificación, que es literalmente lo que se le pide a quien mira (escribir)." },
            }),
            // Instagram, TikTok y Facebook: ⚠️ las tres las da por hechas la
            // pieza, no el cliente (dijo «las redes sociales @propiedadesluxur»).
            // Si la cuenta no está en alguna, se quita su línea y ya.
            fila(
              [
                pon("glifo", { rol: "apoyo", nombre: "instagram", px: 60 }),
                pon("glifo", { rol: "apoyo", nombre: "tiktok", px: 60 }),
                pon("glifo", { rol: "apoyo", nombre: "facebook", px: 60 }),
              ],
              { gap: 44, en: 12, abs: 1476 }
            ),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO }
    ),
  ],
  // El VERDE de la pieza: acento del registro OSCURO (todas las tomas van sobre
  // vídeo con velo). Medición en 02-layout.md.
  { marca: LOOK_015.color.acentoOscuro }
);
