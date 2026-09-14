// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, PIEZAS } from "../../motor/graficos/coreografia";
import { CHOCO } from "../../marcas/choco";

/**
 * PLAN DE GRÁFICOS — proyecto 008 · pieza GRACIAS («8 toneladas de puro amor»).
 * Artefactos: proyectos/008/artefactos/01-plan-gracias.md · 03-timeline-gracias.md.
 *
 * Tercera pieza de la campaña «Ayudemos a Chocó». La primera (Noticia008) puso
 * la tesis, la segunda (Avatar008) dio los puntos de recolección; ésta AGRADECE
 * y da parte del avance. Clip real del cliente, 30 fps · 1410 f.
 *
 * Las ventanas salen de la transcripción por PALABRA
 * (proyectos/008/gracias/transcripcion-palabras.json): cada tarjeta entra cuando
 * la voz llega a su idea (f = s×30, medido), nunca antes.
 *
 * TODO el texto vive en la banda inferior (moldes `sello`/`cta`): el clip está
 * grabado al atardecer contra el cielo y la franja alta no tiene scrim — arriba
 * solo va el watermark de campaña, con su propia píldora (02-layout-gracias.md).
 *
 * ── SIMBOLOGÍA DEL COLOR (la decisión de esta pieza) ─────────────────────────
 *
 * El Avatar008 usaba UN color (ámbar = lo operativo) y dejaba `logro` sin tocar
 * a propósito: no había nada logrado todavía. Aquí sí lo hay, y el mérito no es
 * de quien habla, así que el color deja de ser decoración y pasa a repartir
 * autoría. Tres tintas y una ausencia, y ninguna se usa fuera de su significado:
 *
 *   VERDE  `logro`  — LO QUE YA SE LOGRÓ, Y ES DE LA GENTE. Solo aparece cuando
 *                     el mérito es de quien donó: «lo estamos logrando»,
 *                     «GRACIAS», «TODO SUMA», el 8 del remate y el gracias final.
 *   ÁMBAR  `marca`  — LA CAMPAÑA Y LO QUE FALTA POR HACER: qué se recoge, dónde,
 *                     el plazo, el camión, el destino. Es el acento del canal.
 *   BLANCO `texto`  — SU VOZ: el dato neutro, lo que él dice tal cual.
 *   SIN COLOR       — QUIEN RECIBE. La toma de los niños y los adultos mayores
 *                     va en blanco liso y sin un solo acento: en esta marca «el
 *                     dolor no lleva color, lleva silencio» (marcas/choco.ts), y
 *                     decorar al que recibe sería convertirlo en argumento.
 *
 * El plan de sonido dice lo MISMO con otro material: el `impact deep` suena
 * exactamente tres veces y siempre sobre verde (cues-008-gracias.ts), y la toma
 * de quien recibe entra sin un solo pop. Color y sonido no se reparten el
 * trabajo: firman la misma frase.
 *
 * `dato` y `perdida` siguen sin usarse. Un cuarto significado sería un color
 * que el espectador ya no puede aprender en 47 segundos.
 */
const { pon, col, fila, ranura, gfx, plan } = capa(dialectoDe({ piezas: PIEZAS, marca: CHOCO }), "gfx-008g");

export const graficos008g = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: 1410 },
  [
    gfx(
      "g01-logrando",
      "sello",
      "gancho",
      [16, 128],
      "hero",
      "Abre PLANTEANDO la duda con la cifra dentro —«pensamos que 8 toneladas era mucho»— y la sustituye por el logro: el que mira sin sonido tiene que entender en dos segundos que esto no es una petición más, es un parte de avance",
      [
        // Ranura, igual que la objeción de g05 y por el mismo motivo: la duda y
        // su respuesta no son dos ideas, son la MISMA frase cambiando de signo.
        // Ocupan el mismo hueco y la segunda releva a la primera en f80.
        ranura(
          [64],
          [
            // El planteamiento se construye en tres tiempos, cada uno sobre su
            // palabra: «Pensamos que» (f16) · «8 TONELADAS» (f28, exactamente
            // cuando la dice) · «era mucho» (f48). La cifra va de titular y en
            // `lineas` —no como `texto` suelto— para que R09 mida la LÍNEA
            // ENTERA y no la palabra más larga: es lo que impide que «8
            // TONELADAS» se parta en dos (R18).
            col([
              pon("kicker", { rol: "contexto", texto: "Pensamos que" }),
              pon("titular", { rol: "hero", px: 96, lineas: [["8 TONELADAS"]], en: 12 }),
              pon("etiqueta", { rol: "apoyo", texto: "era mucho", en: 32 }),
            ]),
            // f80 = «lo estamos logrando». Primer VERDE de la pieza y primera
            // regla de color: el logro es de quien donó.
            pon("titular", {
              rol: "hero",
              px: 92,
              lineas: [["Lo estamos"], [{ t: "logrando", tinta: "logro" }]],
            }),
          ],
          { rol: "hero" }
        ),
      ]
    ),

    gfx(
      "g02-gracias",
      "sello",
      "remate",
      [130, 204],
      "hero",
      "El motivo del vídeo, en una palabra y a tamaño de titular: si alguien solo ve un frame, que sea éste",
      [
        col([
          pon("titular", { rol: "hero", px: 132, texto: [{ t: "GRACIAS", tinta: "logro" }] }),
          // f150 = «se están uniendo»: la etiqueta nombra a quién se agradece
          // justo cuando él lo dice.
          pon("etiqueta", { rol: "apoyo", texto: "a cada persona que se está uniendo", en: 20 }),
        ]),
      ]
    ),

    gfx(
      "g03-insumos",
      "sello",
      "mecanismo",
      [206, 336],
      "hero",
      "Lo que se recoge es el dato accionable de la pieza y en la voz pasa en tres segundos: en pantalla se puede leer y volver a mirar",
      [
        col([
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "SEGUIMOS RECOLECTANDO" }),
          // en 6 + paso 37 → f212 / f249 / f286 = las tres menciones medidas
          // («kit de aseo», «medicinas básicas», «alimentos no perecederos»).
          // La lista va en BLANCO: es su voz, no la campaña. El ámbar se queda
          // en el chip, que es quien nombra a la campaña.
          pon("lista", {
            rol: "hero",
            px: 42,
            marca: "punto",
            en: 6,
            paso: 37,
            items: [
              { texto: "Kits de aseo" },
              { texto: "Medicinas básicas" },
              { texto: "Alimentos no perecederos" },
            ],
          }),
        ]),
      ]
    ),

    gfx(
      "g04-sedes",
      "sello",
      "mecanismo",
      [342, 440],
      "hero",
      "Los tres puntos ya se dieron con dirección en la pieza anterior: aquí solo hay que recordar que siguen abiertos, y cada uno se enciende cuando lo nombra",
      [
        col([
          pon("kicker", { rol: "contexto", texto: "en nuestras sedes de" }),
          // Ámbar: son puntos de la campaña. f354 · f374 · f411 = sus menciones.
          fila([
            pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "MEDELLÍN", en: 12 }),
            pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "CALDAS", en: 32 }),
          ]),
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "ORIENTE ANTIOQUEÑO", en: 69 }),
        ]),
      ]
    ),

    gfx(
      "g05-tiempo",
      "sello",
      "problema",
      [446, 634],
      "hero",
      "Él plantea una objeción («si todavía no has llevado tu aporte») y la contesta 4,5 s después: una ranura convierte esa distancia en un solo gesto, la pregunta que se vuelve respuesta",
      [
        // La sustitución dura, no dos tarjetas seguidas: es la MISMA frase
        // cambiando de signo. `conmutaEn: 136` = f582, «todavía tenemos tiempo».
        ranura(
          [136],
          [
            pon("titular", { rol: "hero", px: 66, lineas: [["¿Aún no has"], ["llevado tu aporte?"]] }),
            pon("titular", {
              rol: "hero",
              px: 66,
              lineas: [["Todavía"], [{ t: "tenemos tiempo", tinta: "marca" }]],
            }),
          ],
          { rol: "hero" }
        ),
      ]
    ),

    gfx(
      "g06-camion",
      "sello",
      "prueba",
      [645, 786],
      "hero",
      "El plazo y el destino son lo único que convierte «ayudar algún día» en «ayudar esta semana»: van juntos y en ámbar, que es el color de lo que falta por hacer",
      [
        col([
          // f667 = «a fin de ese mes».
          pon("chip", { rol: "apoyo", px: 34, color: "marca", texto: "A FIN DE MES", en: 22 }),
          // f692 = «con el camión»; «a Chocó» cae en f705, dentro de la entrada.
          pon("titular", {
            rol: "hero",
            px: 76,
            lineas: [["El camión sale"], [{ t: "al Chocó", tinta: "marca" }]],
            en: 47,
          }),
          // f737 = «comunidades más necesitadas».
          pon("etiqueta", { rol: "apoyo", texto: "a las comunidades más necesitadas", en: 92 }),
        ]),
      ]
    ),

    // ── 786–888: «ya nos hemos comunicado, nos han pedido…». SIN gráficos y sin
    //    SFX a propósito: es el tramo en que deja de hablar de logística y
    //    empieza a hablar de personas. Lo lleva su cara y el punch-in de cámara.

    gfx(
      "g07-quien-recibe",
      "sello",
      "giro",
      [888, 1000],
      "hero",
      "El dato que cambia la pieza de campaña a encargo: no se pide «ayuda» en abstracto, la pidieron ellos y para alguien concreto",
      [
        col([
          // Corto A PROPÓSITO: a 32 px versalitas, «nos pidieron medicinas
          // puntuales» llegaba borde a borde del ancho seguro (medido en el
          // frame, no estimado — R09 no lo caza porque un kicker puede envolver).
          pon("kicker", { rol: "contexto", texto: "medicinas que nos pidieron" }),
          // SIN COLOR y SIN pops (ver cues-008-gracias.ts). Quien recibe no se
          // decora: es la única toma de la pieza que no lleva un solo acento.
          // f910 = «niños» · f946 = «adultos mayores».
          pon("lista", {
            rol: "hero",
            px: 44,
            marca: "punto",
            en: 22,
            paso: 36,
            items: [{ texto: "Para los niños" }, { texto: "Y los adultos mayores" }],
          }),
        ]),
      ]
    ),

    // ── 1000–1098: «el que quiera vincularse a este proyecto». La cámara abre
    //    plano (make-space) para dejar sitio al remate. Sin tarjeta.

    gfx(
      "g08-todo-suma",
      "sello",
      "giro",
      [1098, 1208],
      "hero",
      "El corazón de la pieza: quien cree que su aporte es demasiado pequeño para importar es exactamente quien no lo lleva. Él lo dice dos veces y la tarjeta late la segunda",
      [
        col([
          // «cualquier ayuda, por menor que sea» partía en dos líneas y dejaba
          // «SEA» sola: R09 no lo caza (mide la palabra más larga, y un kicker
          // SÍ puede bajar de línea), lo cazó el frame. Con su frase corta el
          // bloque se lee de un golpe: «POR MENOR QUE SEA / TODO SUMA».
          pon("kicker", { rol: "contexto", texto: "por menor que sea" }),
          // f1158 = el primer «todo suma». El pulso [21,46] locales cubre el
          // SEGUNDO (f1179–1204): la repetición está en la voz, no se inventa.
          pon("titular", {
            rol: "hero",
            px: 112,
            texto: [{ t: "TODO SUMA", tinta: "logro" }],
            en: 60,
            envolturas: [{ env: "pulso", entre: [21, 46], amplitud: 0.035 }],
          }),
        ]),
      ]
    ),

    gfx(
      "g09-amor",
      "sello",
      "remate",
      [1216, 1290],
      "hero",
      "El 8 vuelve al final convertido en otra cosa: abrió la pieza como meta que parecía grande y cierra como lo que la gente ya puso. Por eso el número va en verde y el destino en ámbar",
      [
        col([
          // f1222 = «vamos a mandar 8 toneladas».
          pon("titular", {
            rol: "hero",
            px: 84,
            lineas: [[{ t: "8", tinta: "logro" }, " toneladas"], ["de puro amor"]],
            en: 6,
          }),
          // f1266 = «hacia el Chocó».
          pon("etiqueta", { rol: "apoyo", color: "marca", texto: "hacia el Chocó", en: 50 }),
        ]),
      ]
    ),

    gfx(
      "g10-cierre",
      "sello",
      "cta",
      [1318, "fin"],
      "hero",
      "Cierra con lo mismo que abrió —gracias— y se queda hasta el último frame: es un vídeo de agradecimiento, así que la última imagen no puede ser una petición",
      [
        col([
          // f1322 = «Dios los bendiga».
          pon("kicker", { rol: "contexto", texto: "Dios los bendiga", en: 4 }),
          // f1374 = «nuevamente muchas gracias». Último verde de la pieza.
          pon("titular", { rol: "hero", px: 124, texto: [{ t: "GRACIAS", tinta: "logro" }], en: 56 }),
          // f1394 = «a todos».
          pon("etiqueta", { rol: "apoyo", texto: "a todos", en: 76 }),
        ]),
      ]
    ),
  ],
  {
    // El acento del canal en registro oscuro (#D97706): las tarjetas van sobre
    // vídeo + scrim carbón, donde el ámbar de papel (#B45309) se apagaría.
    marca: CHOCO.color.acentoOscuro,
    // VERDE MONTE, y no el `logro` de fábrica (#34d399, menta fría): esa menta
    // es de una paleta de dashboard y al lado del ámbar tierra de la campaña
    // canta. Éste comparte la temperatura del acento y da ≈6:1 sobre el scrim,
    // muy por encima del 3:1 que pide un display (misma comprobación que hizo
    // nacer `acentoOscuro` en marcas/choco.ts).
    logro: "#74C46A",
  }
);
