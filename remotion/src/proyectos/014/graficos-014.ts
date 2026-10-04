// Solo el dialecto: un plan es una lista de decisiones, sin JSX (ver graficos-demo).
import { capa, dialectoDe, LEY_BLANDA, PIEZAS } from "../../motor/graficos/coreografia";
import { LOOK_014 } from "./look-014";

/**
 * PLAN DE GRÁFICOS — proyecto 014 · «Publica en minutos».
 * Artefactos: proyectos/014/artefactos/01-plan.md · 03-timeline.md.
 *
 * Clip real de iPhone, 30 fps · 1471 f (49,03 s): el cliente a cámara, en una
 * nave de evento, presentando su agente de IA para creadores de contenido. Las
 * ventanas salen de la transcripción por PALABRA (whisper.cpp `-ojf`), no del
 * guion: `f = s × 30`, medido.
 *
 *   f0     «Hola, mi nombre es…»          → el hook YA está puesto (R23)
 *   f159   «cuello» (de botella)          → el problema
 *   f455   «(he) creado» → f464 «agente»  → la solución
 *   f560   fin de «artificial» + 15 f     → RESPIRO: la banda se limpia
 *   f658   «automáticamente» (f662) − 4   → lo que hace, en tres ✓ sobre su palabra
 *   f958   «después» (de un largo día)    → lo que dejas de hacer, en tres ✗
 *   f1200  «Esto» (lo hace todo por ti)   → el giro
 *   f1318  «para» (que empieces…)         → el remate, hasta el último frame
 *
 * TODO el texto vive en la BANDA INFERIOR (molde `sello`, ancla 69,8 %). Es R14
 * y es la preferencia declarada del cliente en sus piezas de avatar (012, 013):
 * sin subtítulos, el texto donde iban los subtítulos, y un hook de PROMESA en
 * vez de un letrero descriptivo. Los subtítulos existen igualmente
 * (`subtitulos-014.ts`), desconectados, para exportarlos como captions.
 *
 * LA LEY ES LA BLANDA DEL CANAL, SIN RESERVA. R24 pide `ley.reserva` cuando hay
 * un molde que CENTRA con hijos escalonados: aquí las siete tomas anclan
 * arriba y crecen hacia abajo, nadie se recoloca. Y la reserva sería mala:
 * estropea `entra: "escalon"`, que es lo que hace los cinco relevos.
 *
 * LAS LISTAS SON TRES NODOS DE UN ÍTEM, no una `lista` de tres. La pieza
 * `lista` solo sabe escalonar a intervalo fijo (`paso`), y aquí cada ítem
 * aterriza SOBRE SU PALABRA: «subtítulos» f701, «imágenes» f744, «publicarlos»
 * f830 — huecos de 43 y 86 f, que ningún `paso` reproduce. El 012 aproximó con
 * `paso: 28` para huecos de 25 y 36; aquí la diferencia es el doble y se
 * notaría. Tres nodos con su `en` propio cuestan tres líneas y caen exactas.
 */
const { pon, col, gfx, plan } = capa(
  dialectoDe({ piezas: PIEZAS, marca: LOOK_014, ley: LEY_BLANDA }),
  "gfx-014"
);

/**
 * EL VELO DE LA BANDA: el del molde, 70 px MÁS ALTO y SIN rampa.
 *
 * `alto: 900` por lo que midió el 013: con los 830 del molde el degradado
 * todavía se está abriendo en la fila 1340, justo donde ANCLA el bloque, y la
 * primera línea de cada toma se queda sin contraste. Aquí hace más falta que
 * allí: el fondo de la banda es su AMERICANA BLANCA (luma media 108-121 en el
 * clip, medida con `signalstats` sobre y = 1340-1750), el más claro de las tres
 * piezas de avatar. Opacidad 1, sin aclarar: nadie ha pedido ver el vídeo por
 * detrás del texto, y R13 solo permite capas que RESTEN luz sobre una persona.
 * El resultado se mide en el render, fila a fila (02-layout.md).
 *
 * `rampa: 0` es R25: el velo entra cuando NACE, no cuando solo se releva el
 * texto. Con la rampa de 3 f del intérprete, el f0 —la miniatura— salía con el
 * titular sobre el vídeo a pelo (1,04:1 medido en el 013) y cada relevo con
 * `escalon` aclaraba la banda tres frames en el corte duro. Se aplica al hook
 * y a los cinco relevos, que son tomas CONTIGUAS con el mismo velo.
 */
const VELO_BANDA = { scrim: { alto: 900, rampa: 0 } } as const;

/**
 * EL MISMO VELO, PERO ENTRANDO. Solo para `g04-hace`.
 *
 * Llega después de 85 f de respiro con la banda limpia, así que ahí el velo
 * aparece de la nada y la rampa por defecto (3 f) es lo que evita que se vea
 * como un parpadeo negro. Misma decisión que el remate del 013.
 */
const VELO_BANDA_NACE = { scrim: { alto: 900 } } as const;

/** Cuerpo de los ítems de las dos listas: el del 012, que ya se leyó bien. */
const PX_ITEM = 44;

export const graficos014 = plan(
  { ancho: 1080, alto: 1920, fps: 30, duracion: 1471 },
  [
    gfx(
      "g01-hook",
      "sello",
      "gancho",
      [0, 159],
      "hero",
      "El hook es una PROMESA, no un letrero: dice qué se lleva quien mira (publicar en minutos, no editar), que es lo que él tarda 27 s en decir con palabras. Su nombre va de kicker porque se presenta en el primer segundo. Cede en f159, sobre «cuello», para que el problema ocupe su sitio",
      [
        // R23: `entra: ninguna` VA EN EL GRUPO y en los dos hijos. El frame 0
        // es la MINIATURA del reel, y la rampa de la ley la aplica el grupo; un
        // nodo no puede anularla desde dentro. Los hijos la llevan también para
        // que tampoco animen por su cuenta: en el f0 tiene que estar TODO.
        //
        // Y el titular lleva `en: 0` EXPLÍCITO, que es la mitad del arreglo que
        // R23 no cuenta: la ESCALERA de la ley ([0, 6, 12, 18]) retrasa al
        // segundo hijo 6 frames aunque no tenga animación. Medido en el primer
        // render: f0 y f1 con SOLO el kicker; el titular aparecía en f6. Un `en`
        // propio sustituye a la escalera (`resuelveMomentos`), y `en: 0` es
        // «ahora».
        col(
          [
            pon("kicker", { rol: "contexto", texto: "john stevans álvarez", entra: { como: "ninguna" } }),
            // R18: las dos líneas van ESCRITAS A MANO. El corte cae en la coma,
            // que es donde la promesa se bifurca: lo que ganas / lo que te
            // ahorras. Dejado al maquetador, «editando» se quedaba viuda.
            pon("titular", {
              id: "hook",
              rol: "hero",
              px: 56,
              en: 0,
              entra: { como: "ninguna" },
              lineas: [["Publica ", { t: "en minutos", tinta: "marca" }, ","], ["sin pasar horas editando"]],
            }),
          ],
          { entra: { como: "ninguna" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g02-problema",
      "sello",
      "problema",
      [159, 455],
      "hero",
      "El problema, con sus palabras y en BLANCO: entra sobre «cuello» (f159), la palabra que lo nombra. El chip «que sea más fácil» aterriza sobre «más fácil» (f363): es lo que promete arreglar y da movimiento a una toma de casi diez segundos",
      [
        // ENTRADA DURA (`escalon`) en el GRUPO, igual que los relevos del 012 y
        // el 013 y por el mismo motivo medido: con la entrada blanda de la ley
        // el hook muere en f159 y este bloque tarda 8 frames en verse — un
        // cuarto de segundo con la banda VACÍA donde tiene que haber un cambio.
        //
        // Y también en el KICKER, que es lo que esta pieza añade: el grupo a
        // corte no basta, porque cada hijo sigue entrando con su propio muelle
        // (rampa 8) y el primer frame del relevo salía con el kicker al ~10 % y
        // sin titular. Con el kicker a corte, en el frame del relevo ya hay
        // texto nítido en la banda; el titular llega 6 f después con el muelle,
        // que es el movimiento que el whoosh acompaña.
        col(
          [
            pon("kicker", { rol: "contexto", texto: "quiero ayudarte con", entra: { como: "escalon" } }),
            pon("titular", {
              id: "cuello",
              rol: "hero",
              px: 64,
              lineas: [["El cuello de botella"], ["de crear contenido"]],
            }),
            // f356 «sea» · f363 «más» · f374 «fácil». Entra 8 f antes para
            // estar puesto cuando lo dice (el gráfico va por delante de la voz).
            pon("chip", { rol: "apoyo", px: 30, texto: "QUE SEA MÁS FÁCIL", en: 190 }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g03-agente",
      "sello",
      "mecanismo",
      [455, 560],
      "hero",
      "La solución, en VERDE porque es lo que él ofrece: entra sobre «creado» (f455), nueve frames antes de «agente» (f464), y se va 15 f después de terminar «artificial» (f545). Deja la banda limpia mientras dice «tus vídeos como estos», que es cuando señala a cámara",
      [
        col(
          [
            pon("kicker", { rol: "contexto", texto: "por eso he creado", entra: { como: "escalon" } }),
            pon("titular", {
              id: "agente",
              rol: "hero",
              px: 56,
              lineas: [["Un agente de"], [{ t: "inteligencia artificial", tinta: "marca" }]],
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    // ── f560-658: RESPIRO. 98 frames (3,3 s) sin nada en la banda, y es una
    // decisión (checklist §7.8): dice «el cual hace que tus vídeos como estos
    // los subas» señalando la cámara, y es el único tramo en que se le ve
    // entero sin texto encima. En 49 s con siete rótulos, ese aire es lo que
    // impide que la pieza se lea como una plantilla rellenada (013).

    gfx(
      "g04-hace",
      "sello",
      "prueba",
      [658, 958],
      "hero",
      "Lo que hace el agente, en tres ✓ que aterrizan cada uno SOBRE SU PALABRA: «subtítulos» f701, «imágenes» f744, «publicarlos» f830. La lista la marca él, no una retícula. Nace tras el respiro, así que el velo SÍ entra con rampa (R25)",
      [
        col(
          [
            // f662 «automáticamente»: la toma arranca 4 f antes y el kicker
            // entra con ella. Era «subes el vídeo y automáticamente» y en el
            // frame tocaba los DOS márgenes (811 de 844 px útiles): R09 mide la
            // palabra más larga de un kicker, no la línea, así que el plan salía
            // limpio. R18: se acorta el texto, no el cuerpo. «Automáticamente»
            // es la palabra que importa y las tres ✓ dicen el resto.
            pon("kicker", { rol: "contexto", texto: "automáticamente" }),
            // Tres nodos de un ítem, no una lista de tres: ver la cabecera.
            // `estado: "si"` pinta el ✓ con la tinta `logro`, que es el mismo
            // hex que el acento (#34d399): verde = lo que el agente te da.
            // El texto del ítem sigue en blanco (es su lista, dicha por él).
            // Cada `en` va 8 f ANTES de la palabra: el muelle tarda eso en
            // verse, y quien lee va por delante de quien escucha.
            //
            // Van en una columna PROPIA alineada a la izquierda: con el molde
            // (centro) cada ítem se centraba por su cuenta y las tres ✓ salían
            // en tres columnas distintas. La columna interior se centra como
            // bloque y los ítems se alinean entre sí, que es lo que hace que se
            // lean como UNA lista. `gap: 22` es el gap interno de `<ItemLista>`.
            col(
              [
                pon("lista", { id: "subs", rol: "apoyo", px: PX_ITEM, en: 35, items: [{ texto: "Subtítulos", estado: "si" }] }),
                pon("lista", { rol: "apoyo", px: PX_ITEM, en: 78, items: [{ texto: "Imágenes de bancos gratuitos", estado: "si" }] }),
                pon("lista", { rol: "apoyo", px: PX_ITEM, en: 164, items: [{ texto: "Publicado en redes en minutos", estado: "si" }] }),
              ],
              // `en: 0`, o la ESCALERA de la ley retrasa 6 f a este segundo hijo y
              // los `en` de los ítems —que cuentan desde su padre— llegan 6 f tarde.
              // Medido en la tira f693-f709: «Subtítulos» arrancaba en f699, no f693.
              { alinea: "inicio", gap: 22, en: 0, entra: { como: "ninguna" } }
            ),
          ]
        ),
      ],
      { ambiente: VELO_BANDA_NACE }
    ),

    gfx(
      "g05-sin",
      "sello",
      "giro",
      [958, 1200],
      "hero",
      "Lo que DEJAS de hacer, en tres ✗ rojos: la lista espejo de la anterior (R15: dos colores solo cuando se comparan cosas de signo opuesto). Entra sobre «después» (f958) y cada ✗ aterriza sobre su verbo: «editar» f1024, «mirar si la voz» f1057, «mirar si las imágenes» f1114",
      [
        col(
          [
            pon("kicker", { rol: "contexto", texto: "tras un largo día de grabación", entra: { como: "escalon" } }),
            // `estado: "no"` pinta el ✗ con la tinta `perdida` de la paleta del
            // dialecto (rojo). Solo el glifo: el texto sigue en blanco.
            // Misma columna interior alineada a la izquierda que en `g04-hace`.
            col(
              [
                pon("lista", { rol: "apoyo", px: PX_ITEM, en: 58, items: [{ texto: "Editar", estado: "no" }] }),
                pon("lista", { rol: "apoyo", px: PX_ITEM, en: 93, items: [{ texto: "Revisar si la voz quedó bien", estado: "no" }] }),
                pon("lista", { rol: "apoyo", px: PX_ITEM, en: 150, items: [{ texto: "Buscar de dónde sacar imágenes", estado: "no" }] }),
              ],
              // `en: 0`, o la ESCALERA de la ley retrasa 6 f a este segundo hijo y
              // los `en` de los ítems —que cuentan desde su padre— llegan 6 f tarde.
              // Medido en la tira f693-f709: «Subtítulos» arrancaba en f699, no f693.
              { alinea: "inicio", gap: 22, en: 0, entra: { como: "ninguna" } }
            ),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g06-todo",
      "sello",
      "giro",
      [1200, 1318],
      "hero",
      "El giro, sobre «Esto» (f1200): la frase que resuelve las dos listas. «todo» en verde porque es lo que el agente hace por ti. La segunda línea aterriza sobre «ganar mucho tiempo» (f1278)",
      [
        col(
          [
            // A CORTE, como los kickers de los otros relevos: aquí no hay
            // kicker que sostenga la banda mientras el titular entra con muelle,
            // y el primer render enseñó el f1200 con el velo puesto y NADA
            // escrito encima. El corte duro es el gesto del 012 para «¿Tienes
            // un lote…?»: dos textos que se turnan sin un frame vacío en medio.
            pon("titular", {
              id: "todo",
              rol: "hero",
              px: 66,
              entra: { como: "escalon" },
              lineas: [["Lo hace ", { t: "todo", tinta: "marca" }, " por ti"]],
            }),
            // f1278 «ganar» · f1303 «tiempo». `titular` y no `etiqueta` (R18):
            // mide la línea entera, y con rol apoyo lleva el color rebajado.
            pon("titular", { rol: "apoyo", px: 46, en: 70, lineas: [["y ganas mucho tiempo"]] }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),

    gfx(
      "g07-remate",
      "sello",
      "remate",
      [1318, 1471],
      "hero",
      "El remate, con la última línea escrita por el cliente: el kicker releva al giro sobre «para» (f1318) y el titular aterriza sobre «lo más importante» (f1377-1416). Se queda hasta el ÚLTIMO frame: el reel se repite y el f0 ya tiene el hook puesto",
      [
        col(
          [
            pon("kicker", { rol: "contexto", texto: "para que empieces a disfrutar", entra: { como: "escalon" } }),
            // `en: 55` → f1373, cuatro frames antes de «lo más» (f1377).
            //
            // 2.ª PASADA, petición del cliente: «de la vida» → «LA VIDA». Sin la
            // preposición, la segunda línea deja de ser el final de la frase
            // hablada y pasa a ser la RESPUESTA: lo más importante es la vida.
            // Las mayúsculas van escritas tal cual —`titular` no transforma el
            // texto; solo el kicker monta versalitas— y R09 las mide así.
            // «importante» sigue en verde y «LA VIDA» en blanco: el cambio
            // pedido es de texto, no de color. Los captions (`subtitulos-014.ts`,
            // el .srt) NO cambian: transcriben lo que él DICE, «de la vida».
            pon("titular", {
              rol: "hero",
              px: 62,
              en: 55,
              lineas: [["Lo más ", { t: "importante", tinta: "marca" }], ["LA VIDA"]],
            }),
          ],
          { entra: { como: "escalon" } }
        ),
      ],
      { ambiente: VELO_BANDA }
    ),
  ],
  // El verde de la pieza: acento del registro OSCURO (todas las tomas van sobre
  // vídeo con velo). Medición en look-014.ts y 02-layout.md.
  { marca: LOOK_014.color.acentoOscuro }
);
