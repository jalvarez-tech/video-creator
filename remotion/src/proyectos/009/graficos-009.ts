// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, LEY_SECA, PALETA_MARCA, PIEZAS } from "../../motor/graficos/coreografia";
import { STREETCATS } from "../../marcas/streetcats";
import { DURACION_009 } from "./metraje-009";

/**
 * PLAN DE GRÁFICOS — proyecto 009 · Reel de Street Cats (30 fps · 942 f).
 * Artefactos: proyectos/009/artefactos/01-plan.md · 03-timeline.md.
 *
 * SIN VOZ. Las otras piezas del repo cuelgan cada entrada de la transcripción
 * por palabra; aquí no hay nada que transcribir, así que las ventanas son
 * exactamente las del MONTAJE (`metraje-009.ts`): un cartel por plano, entrando
 * con el corte y muriendo con él. Esa es toda la sincronía que hay, y por eso
 * las ventanas de este archivo tienen que seguir a las de aquel — si se mueve un
 * corte, se mueve su cartel.
 *
 * LA PALETA SE PASA A MANO, Y NO ES OPCIONAL. `dialectoDe` acepta `marca`, pero
 * su `paleta` cae por defecto en `PALETA_MARCA`, donde `marca` es
 * `theme.accent` — el TEAL de plantilla, no el ámbar del canal. Es la deuda que
 * `motor/marca.ts` declara en `acentoOscuro` («dos marcas conviviendo sin
 * saberlo»). Sin este override el reel entero sale en verde azulado con el
 * validador diciendo LIMPIO, porque no hay ninguna regla que compare la paleta
 * del dialecto con la marca que se le pasa al lado.
 *
 * LEY_SECA y no LEY_BLANDA: barrido duro de 4 f, sin muelle y sin fundido. Un
 * muelle de 8 f sobre un plano que dura 60 se come el 13 % del cartel en el
 * rebote. El estilo declarado es «redes» (SKILL §4) y ahí las entradas son
 * cortas o no son.
 *
 * MOLDES, y por qué solo dos de los cinco:
 *   · `franja` (y ∈ 117-457) lleva TODO el copy de antojo. Va arriba y no
 *     abajo por una razón que no se ve en el frame: en el feed de Reels la
 *     franja inferior la tapan el texto del post, el avatar y los botones. El
 *     molde `sello` —que es donde va el copy en las piezas con avatar— caería
 *     justo debajo de esa UI.
 *   · `pantalla` lleva la revelación y el CTA, que son las dos únicas tomas que
 *     PUEDEN tapar el metraje porque ya no dependen de él.
 *   · `franja` no trae scrim; el degradado que hace legible su texto lo pinta
 *     `<PistaMetraje>` con `VELOS_009` (Reel009.tsx). Si se mueve el molde, se
 *     mueve el velo.
 */
const { pon, col, gfx, plan } = capa(
  dialectoDe({
    piezas: PIEZAS,
    marca: STREETCATS,
    ley: LEY_SECA,
    paleta: {
      ...PALETA_MARCA,
      marca: STREETCATS.color.acento,
      texto: STREETCATS.color.blanco,
      fondo: STREETCATS.color.fondoOscuro,
    },
  }),
  "gfx-009"
);

export const graficos009 = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: DURACION_009 },
  [
    gfx(
      "g01-reto",
      "franja",
      "gancho",
      [4, 84],
      "hero",
      "El hook es un RETO, no una afirmación sobre el negocio: apuesta sobre quien mira, así que no puede ser falso. Y se parte en dos tiempos porque «TE RETO» solo ya obliga a esperar el resto",
      [
        col([
          pon("titular", { rol: "hero", px: 100, texto: "TE RETO" }),
          // 54 y no 46: en el frame renderizado la segunda línea quedaba tan por
          // debajo del titular que se leía como un pie, y esta línea NO es un
          // pie — es la mitad de la frase que sostiene el hook.
          pon("etiqueta", { rol: "apoyo", px: 54, texto: "a ver esto sin antojarte", en: 18 }),
        ]),
      ]
    ),

    gfx(
      "g02-alitas",
      "franja",
      "prueba",
      [88, 156],
      "hero",
      "La primera mitad de «alitas y papas», dicha sobre el único plano de alitas del lote",
      [
        col([
          pon("titular", { rol: "hero", px: 92, lineas: ["ALITAS", [{ t: "AL CARBÓN", tinta: "marca" }]] }),
        ]),
      ]
    ),

    gfx(
      "g03-momento",
      "franja",
      "prueba",
      [160, 222],
      "hero",
      "Lo que sostiene el plano de las pinzas: alguien lo está cocinando ahora. Es una promesa del negocio, no una afirmación sobre el metraje",
      [col([pon("titular", { rol: "hero", px: 92, lineas: ["HECHAS", "AL MOMENTO"] })])]
    ),

    gfx(
      "g04-papas",
      "franja",
      "mecanismo",
      [226, 288],
      "hero",
      "La otra mitad de la promesa, ya emplatada: cierra el par alitas→papas antes de que llegue la salsa",
      [
        col([
          pon("titular", { rol: "hero", px: 88, lineas: [[{ t: "PAPAS", tinta: "marca" }], "RECIÉN HECHAS"] }),
        ]),
      ]
    ),

    gfx(
      "g05-salsa",
      "franja",
      "mecanismo",
      [292, 354],
      "hero",
      "Describe lo que se VE en el plano (salsa cayendo), no lo que la casa hace: la frontera de honestidad del 01-plan §Honestidad",
      [col([pon("titular", { rol: "hero", px: 92, lineas: ["AHOGADAS", "EN SALSA"] })])]
    ),

    gfx(
      "g06-crujiente",
      "franja",
      "prueba",
      [358, 414],
      "hero",
      "Primera mitad del par de texturas. Van seguidas y con la misma forma para que se lean como una sola frase partida en dos planos",
      [col([pon("titular", { rol: "hero", px: 88, lineas: ["CRUJIENTES", "POR FUERA"] })])]
    ),

    gfx(
      "g07-jugoso",
      "franja",
      "prueba",
      [418, 474],
      "hero",
      "Segunda mitad del par: misma maqueta, plano distinto. La repetición formal es lo que hace que el par funcione",
      [col([pon("titular", { rol: "hero", px: 88, lineas: ["JUGOSAS", "POR DENTRO"] })])]
    ),

    gfx(
      "g08-porciones",
      "franja",
      "prueba",
      [478, 534],
      "hero",
      "El último argumento antes del clímax y el único que no va de sabor sino de CANTIDAD, que es lo que decide un domicilio",
      [
        col([
          pon("titular", { rol: "hero", px: 84, lineas: ["PORCIONES", [{ t: "QUE SÍ LLENAN", tinta: "marca" }]] }),
        ]),
      ]
    ),

    gfx(
      "g09-antojo",
      "franja",
      "giro",
      [540, 630],
      "hero",
      "Se cobra el reto del segundo 0. Es la única pregunta del vídeo y va sobre el plano más goloso: quien conteste «sí» por dentro ya está vendido",
      [
        col([
          pon("titular", { rol: "hero", px: 100, lineas: ["¿YA TE", [{ t: "ANTOJASTE?", tinta: "marca" }]] }),
        ]),
      ]
    ),

    gfx(
      "g10-marca",
      "pantalla",
      "remate",
      [636, 726],
      "hero",
      "EL NOMBRE, y llega en el segundo 21 de 31 a propósito: antes del hambre es publicidad, después del hambre es la respuesta a «¿dónde?». Es la primera toma que puede tapar el metraje porque ya no lo necesita",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "las mejores papas y alitas" }),
          pon("titular", { rol: "hero", px: 116, color: "marca", texto: "STREET CATS" }),
          // En versalitas y no en minúscula: el logo del negocio dice
          // «STREET CATS · ALITAS Y PAPAS» en dos arcos, y esta línea es ese
          // segundo arco. Escribirla en minúscula la convertía en una glosa.
          pon("etiqueta", { rol: "apoyo", px: 46, texto: "ALITAS Y PAPAS", en: 12 }),
        ]),
      ]
    ),

    gfx(
      "g11-cta",
      "pantalla",
      "cta",
      [732, "fin"],
      "hero",
      "La tarjeta se CONSTRUYE en tres tiempos (dirección → domicilio → cuenta) y luego se queda quieta 3 s: es lo que hace falta para leerla y para que a alguien le dé tiempo a hacer captura",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "estamos en" }),
          // UNA sola línea, y va como `lineas` y no como `texto` a propósito:
          // con `texto` el validador mide solo la palabra más larga (porque un
          // texto libre puede bajar de línea), y una dirección que se parte sola
          // por donde le toque es justo lo que no puede pasar aquí. Con
          // `lineas` se mide la línea ENTERA, que es lo que se pinta con
          // `nowrap` — o sea que si a 72 px no cupiera, R09 lo diría.
          //
          // Partirla a mano en dos («Cra 48 # 132A» / «sur - 24») permitía 88 px
          // y se descartó mirando el frame: el corte cae dentro del nomenclátor
          // y se lee como dos datos en vez de como una dirección.
          pon("titular", { rol: "hero", px: 72, lineas: ["Cra 48 # 132A sur-24"] }),
          pon("etiqueta", { rol: "apoyo", px: 50, texto: "Caldas, Antioquia" }),
          pon("chip", { rol: "apoyo", px: 42, color: "marca", texto: "TAMBIÉN A DOMICILIO", en: 46, sep: 30 }),
          pon("etiqueta", { rol: "apoyo", px: 48, color: "marca", texto: "@streetcats.food", en: 84, sep: 16 }),
        ]),
      ]
    ),
  ]
);
