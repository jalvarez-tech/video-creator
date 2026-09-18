// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, LEY_BLANDA, PIEZAS } from "../../motor/graficos/coreografia";
import { APEX_012 } from "./look-012";

/**
 * PLAN DE GRÁFICOS — proyecto 012 · «Las conexiones correctas».
 * Artefactos: proyectos/012/artefactos/01-plan.md · 03-timeline.md.
 *
 * Clip real de 30 fps · 835 f. Las ventanas salen de la transcripción por
 * PALABRA (whisper.cpp `-ml 1`), no del guion: `f = s × 30`, medido.
 *
 * TODO lo que va sobre el avatar vive en la BANDA INFERIOR (moldes `sello` y
 * `cta`, ancla 69,8 %). Es R14: sin pista de subtítulos ese carril queda libre,
 * y es donde el ojo ya espera leer en un vertical — arriba el texto compite con
 * el fondo real de la toma (el ventanal, el techo blanco) y obliga a un scrim
 * que se come el encuadre.
 *
 * La primera versión de esta pieza tenía TODO en la franja alta, y era correcto
 * entonces: llevaba subtítulos en el 72 % y estos moldes anclan al 69,8 %, así
 * que se habrían pisado. Quitados los subtítulos (petición del cliente), la
 * razón desaparece y el texto baja. El scrim viene ACOPLADO al molde, así que
 * nadie puede olvidarlo.
 *
 * Las DOS tomas a pantalla completa (`g03` y `g05`) son las «imágenes de
 * transición» del encargo. Su fondo lo pinta `FondoApex012`, que llega por el
 * mapa `fondos` de <PistaGraficos> (`molde.fondo === "toma"`): la foto de
 * Cartagena en una, el negro del evento en la otra.
 *
 * Un color = una cosa (R15), tabla en `look-012.ts`: el DORADO es el evento
 * —su nombre, su fecha, sus países— y nada más. Lo que dice él va en blanco.
 */
/**
 * LA LEY DE LA PIEZA: la blanda del canal, con RESERVA DE MAQUETA.
 *
 * El motor la trae en `false` por defecto y avisa de por qué: reservar sitio
 * para algo que aún no se ve «sería mentir sobre la composición» en overlays
 * sobre avatar, que entran y salen de uno en uno. Aquí se activa igual, y no
 * contra ese criterio sino por debajo de él — porque esta pieza tiene DOS tomas
 * a pantalla completa (`g03`, `g05`) con el molde `pantalla`, que ancla al
 * CENTRO.
 *
 * Con ancla al centro, cada elemento que entra cambia la altura del bloque y lo
 * recoloca entero. Medido en la toma de Cartagena: el kicker «CARTAGENA DE
 * INDIAS» saltaba **44 px hacia arriba** entre f308 y f320, al entrar «APEX» y
 * el chip de la sede. Se lee como error de render, no como animación — y es
 * justo lo que reportó el cliente.
 *
 * En las otras cinco tomas la reserva es INOCUA, y por eso se puede poner en la
 * ley (que es del plan entero) en vez de por toma: `sello`, `cta` y `franja`
 * anclan ARRIBA y crecen hacia abajo, así que el hueco reservado para un
 * elemento futuro no desplaza a nadie. El aviso del motor aplica a moldes que
 * centran, que es exactamente donde aquí hace falta.
 *
 * Ninguna toma usa `entra: "escalon"`, que es el caso que la reserva estropea
 * (un corte duro se vería quieto desde el arranque del padre). El único nodo con
 * `ninguna` es el hook, que ya está puesto en f0 a propósito (R23).
 */
const LEY_012 = { ...LEY_BLANDA, reserva: true };

const { pon, col, gfx, plan, tras } = capa(
  dialectoDe({ piezas: PIEZAS, marca: APEX_012, ley: LEY_012 }),
  "gfx-012"
);

/**
 * EL VELO DE LA BANDA, aclarado por petición del cliente.
 *
 * El molde trae el scrim a opacidad 1 y su degradado arranca en 0,94: eso deja
 * la banda casi opaca y se lee como un bloque negro pegado debajo. A 0,72 el
 * vídeo respira por detrás del texto y la banda deja de parecer una caja.
 *
 * NO se baja más, y el número no es de gusto: es el suelo que aguanta el verde.
 * Medido en el render con `signalstats` sobre la franja y=1340-1750 — el mismo
 * sitio donde cae el texto:
 *
 *   | opacidad | luma de la banda | blanco  | verde #34D399 |
 *   |----------|------------------|---------|---------------|
 *   | 1,00     | 37 - 73          | 13,2:1  | 6,9:1         |
 *   | **0,72** | 62 - 96          |  8,3:1  | **4,3:1**     |
 *   | 0,60     | 78 - 110         |  6,9:1  | 3,6:1 ← justo |
 *
 * Es exactamente lo que vigila R13: con el avatar SIN gradar, el scrim aporta
 * todo el contraste, así que aclararlo se valida midiendo el luma real de la
 * franja, no mirando un still y diciendo «se lee».
 */
const VELO_BANDA = { scrim: { opacidad: 0.72 } } as const;

export const graficos012 = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: 835 },
  [
    gfx(
      "g01-hook",
      "sello",
      "gancho",
      [0, 150],
      "hero",
      "El hook, en palabras del cliente. No dice a dónde va él, dice qué se lleva quien mira. Cede en f150 (segundo 5) para que la pregunta se quede sola: un relevo, no dos textos a la vez",
      [
        // `entra: ninguna` VA EN EL GRUPO, no solo en el titular, y es la
        // diferencia entre que el hook exista en el frame 0 o no.
        //
        // Medido: con la entrada sólo en el nodo, el still de f1 salía con el
        // titular al ~25 % de opacidad y el de f0 en blanco. La ley de la pieza
        // (`LEY_BLANDA`) entra con muelle y `rampa: 8`, y esa rampa la aplica el
        // GRUPO — el nodo hijo no puede anularla desde dentro. El frame 0 es la
        // MINIATURA del reel (aprendizaje del 011): un hook que todavía se está
        // montando ahí es un hook que nadie lee. Regla R23.
        col([
          // Las tres líneas van ESCRITAS A MANO (R18): dejadas al maquetador,
          // «correctas» se quedaba sola en la última y una viuda en el hook es
          // lo primero que se ve. El corte respeta la pausa natural de la frase.
          pon("titular", {
            id: "hook",
            rol: "hero",
            px: 62,
            entra: { como: "ninguna" },
            lineas: [
              ["Las grandes oportunidades"],
              ["necesitan"],
              [{ t: "conexiones correctas", tinta: "marca" }],
            ],
          }),
        ], { entra: { como: "ninguna" } }),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g01b-pregunta",
      "sello",
      "gancho",
      [150, 229],
      "hero",
      "La pregunta que filtra, SOLA en pantalla: releva al hook en el segundo 5 en vez de colgarse debajo de él, para que quien mira lea una cosa y no dos",
      [
        // POR QUÉ ES UNA TOMA APARTE Y NO UN HIJO MÁS DEL HOOK.
        //
        // Primero se escribió como un nodo debajo del titular, con `en: 150`, y
        // el resultado eran los DOS textos a la vez el resto de la toma. El
        // cliente pidió el relevo: cuando entra la pregunta, el hook se va.
        //
        // Dos tomas contiguas lo dan exacto y sin trucos — la primera muere en
        // f150, la segunda nace ahí — y además cada una se ancla arriba por su
        // cuenta, así que la pregunta ocupa el sitio del hook en vez de quedarse
        // colgando con un hueco vacío encima. `revisaPlan` comprueba que no haya
        // ni solape ni agujero entre las dos, que es justo lo que podría salir
        // mal al partir una toma en dos.
        //
        // f150 = 5 × 30, el segundo 5 que pidió el cliente. Y no es un número
        // redondo que caiga en cualquier sitio: está DENTRO de «un lote»
        // (f144-172), y la voz sigue con «o oportunidad de inversión» hasta
        // f229. El rótulo y la frase hablada son la misma y van a la vez.
        // ENTRADA DURA (`escalon`), y es lo que hace que esto sea un RELEVO y no
        // un parpadeo. Con la entrada por defecto de la ley (muelle, `rampa: 8`)
        // el hook moría en f150 y la pregunta tardaba ocho frames en verse:
        // medido en los stills, f152 salía CON LA BANDA VACÍA. Un cuarto de
        // segundo de nada donde debía haber un cambio.
        //
        // El corte duro es además el gesto que el sistema ya tiene para esto —
        // es lo que hace una `ranura` entre dos estados que se turnan (el 003).
        // Y aquí es seguro pese al aviso del motor sobre `escalon` bajo
        // `reserva`: ese aviso es para un nodo con RETARDO dentro de su padre, y
        // éste entra con el suyo (sin `en`), así que no hay nada que reservar.
        col([
          // `titular` y no `etiqueta`, por R18: la etiqueta no acepta `lineas` y
          // su ancho se estima por la PALABRA más larga —porque ahí bajar de
          // línea es legal—, así que el validador la aprobó en verde y el frame
          // salió con «inversión?» sola en la segunda. `titular` mide la LÍNEA
          // entera, que es donde R09 vuelve a morder.
          //
          // El corte cae donde la frase se bifurca —«un lote» / «o oportunidad
          // de inversión»—, que son las dos cosas que está preguntando.
          pon("titular", {
            rol: "hero",
            px: 54,
            entra: { como: "escalon" },
            lineas: [["¿Tienes un lote"], [{ t: "o oportunidad de inversión?", tinta: "marca" }]],
          }),
        ], { entra: { como: "escalon" } }),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g02-fecha",
      "sello",
      "mecanismo",
      [232, 297],
      "hero",
      "La fecha en pantalla mientras la dice: es el dato que decide si a quien mira le sirve o no",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "faltan horas" }),
          // f242 = «17» y f250 = «18». La tarjeta aterriza sobre los números.
          pon("titular", {
            rol: "hero",
            px: 68,
            en: 10,
            lineas: [[{ t: "17 y 18", tinta: "marca" }, " de septiembre"]],
          }),
        ]),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g03-evento",
      "pantalla",
      "prueba",
      [297, 368],
      "hero",
      "TRANSICIÓN 1: la foto de Cartagena entra sobre la palabra «Apex» y se queda hasta que termina de decir «en Cartagena». La imagen dice exactamente lo que dice la voz",
      [
        // Tres elementos, no cuatro: la etiqueta «El Wall Street Inmobiliario»
        // se quitó al ver el frame. Entonces era porque se leía tres veces
        // seguidas (hook + esta toma + el subtítulo, que decía «APEX
        // Inmobiliario» justo encima); ahora ni hay subtítulos ni el hook
        // nombra el evento, y aun así se queda fuera — a pantalla completa, con
        // el nombre a 124 px sobre Cartagena, la coletilla sólo resta.
        col([
          pon("kicker", { rol: "contexto", texto: "cartagena de indias · colombia" }),
          pon("titular", {
            id: "apex",
            rol: "hero",
            px: 124,
            en: 8,
            lineas: [[{ t: "APEX", tinta: "marca" }]],
          }),
          // f339 = «Cartagena»: la sede aterriza cuando nombra la ciudad.
          pon("chip", { rol: "apoyo", px: 32, color: "marca", texto: "HOTEL ESTELAR BOCAGRANDE", en: tras("apex", 4) }),
        ]),
      ]
    ),

    gfx(
      "g04-quien",
      "sello",
      "mecanismo",
      [372, 466],
      "hero",
      "Con quién va a estar. Los tres entran cada uno sobre su palabra, no a intervalo regular: la lista la marca él, no una retícula",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "conectando con" }),
          // f396 «brokers» · f421 «speakers» · f457 «empresarios», medidos.
          // `paso` no sirve aquí (los huecos son 25 y 36 f): van con `en` propio.
          pon("lista", {
            rol: "hero",
            px: 44,
            marca: "punto",
            en: 24,
            paso: 28,
            items: [
              { texto: [{ t: "Brokers", enfasis: true }] },
              { texto: [{ t: "Speakers", enfasis: true }] },
              { texto: [{ t: "Empresarios", enfasis: true }] },
            ],
          }),
        ]),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g05-paises",
      "pantalla",
      "prueba",
      [470, 532],
      "hero",
      "TRANSICIÓN 2: los cinco países no tienen referente filmable (director §3h), así que son GRÁFICO y no b-roll. Entra sobre «más de 5 países»",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "inversionistas de" }),
          pon("titular", {
            id: "cinco",
            rol: "hero",
            px: 96,
            en: 6,
            lineas: [[{ t: "5 países", tinta: "marca" }]],
          }),
          // `paso: 3` y no 5: con 5 los cinco países tardaban 25 f en estar
          // puestos y el still de la mitad de la toma (f500) enseñaba TRES, con
          // el tercero a medio entrar. La toma dura 62 f y el dato es la lista
          // entera — si no se lee completa, no dice «cinco países».
          pon("lista", {
            rol: "apoyo",
            px: 38,
            marca: "punto",
            en: tras("cinco", 1),
            paso: 3,
            items: [
              { texto: ["Estados Unidos"] },
              { texto: ["República Dominicana"] },
              { texto: ["Panamá"] },
              { texto: ["Dubái"] },
              { texto: ["Colombia"] },
            ],
          }),
        ]),
      ]
    ),

    gfx(
      "g06-cta",
      "cta",
      "cta",
      [610, 700],
      "hero",
      "La única acción que pide. Entra ANTES de que lo diga (f635) para que quien lee vaya por delante de la voz, no por detrás",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "si tienes algo sobre la mesa" }),
          // f635 = «mándame». El bloque ya está puesto cuando lo pronuncia.
          pon("titular", { rol: "hero", px: 72, en: 18, lineas: [["Mándame un ", { t: "DM", tinta: "marca" }]] }),
        ]),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g07-remate",
      "sello",
      "remate",
      [744, 835],
      "hero",
      "La promesa con la que cierra, en sus palabras. Se queda hasta el último frame: el reel se repite y esto es lo que engancha la segunda vuelta",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "tal vez de una conversación" }),
          // f765 «gran» · f778 «negocio»: el bloque aterriza dentro de la frase.
          pon("titular", {
            rol: "hero",
            px: 70,
            en: 16,
            lineas: [["sale el ", { t: "próximo", tinta: "marca" }], [{ t: "gran negocio", tinta: "marca" }]],
          }),
        ]),
      ],
      { ambiente: VELO_BANDA }
    ),
  ],
  // El dorado del evento en su registro oscuro: todas las tomas van sobre vídeo
  // con velo o sobre el negro de las pantallas.
  { marca: APEX_012.color.acentoOscuro }
);
