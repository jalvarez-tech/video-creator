/**
 * PROYECTO 006 — «¿Qué hacer si encuentra grietas en su vivienda tras un temblor?»
 *
 * PRIMERA PIEZA ESCRITA NATIVAMENTE EN LA GRAMÁTICA NUEVA. El 004 y el 005 se
 * escribieron con `TomaNoticia[]` y llegan al sustrato por `compilaNoticia`; este
 * plan es ya un `Plan` del núcleo, construido con `capa(NOTICIAS)`. Era la prueba
 * que el diseño se puso a sí mismo: si el 006 no se pudiera escribir así, el tipo
 * nuevo estaría mal y habría que volver al dialecto.
 *
 * Fuente: El Colombiano (Antioquia), Brian Ferney Valencia Ríos, 2026-08-10.
 * Hecho: sismo de magnitud 7,4 en el centro y occidente de Colombia.
 * Artefacto con las decisiones editoriales y el origen de CADA cifra:
 * proyectos/006/artefactos/01-noticia.md
 *
 * POR QUÉ ESTA PIEZA NO USA EL FORMATO ENTERO. El formato abre con un gancho que
 * contradice lo que el espectador cree y sube a un clímax. Con muertos del mismo
 * día, las dos cosas están mal: el gancho enuncia la situación sin adorno, y el
 * clímax BAJA la tensión en vez de subirla — dice lo que el vídeo no puede hacer.
 * No hay CTA de marca: el cierre es la ruta a los canales oficiales.
 *
 * LOS 1740 FRAMES SON UNA ESTIMACIÓN, no una medida: todavía no hay locución.
 * El 005 dejó escrita la regla —el clip manda— así que al medir el WAV hay que
 * recronometrar las 12 ventanas. Mientras tanto salen de ≈2,7 palabras/s.
 */
import { capa, NOTICIAS } from "../../motor/noticias/dialecto";

const { pon, col, fila, gfx, plan, tras } = capa(NOTICIAS, "noticia");

export const noticia006 = plan({ ancho: 1080, alto: 1920, fps: 30, duracion: 1740 }, [
  gfx(
    "n01-sismo",
    "papel",
    "gancho",
    [0, 150],
    "hero",
    "Enuncia la situación sin adorno. El formato pediría contradecir una creencia; con víctimas del mismo día, eso sería usar el desastre como reclamo.",
    [
      col(
        [
          pon("kicker", { texto: "PROPIEDADES LUXUR" }),
          // px 72 y no la escala hero (96): a 96 la línea larga se salía del
          // lienzo por los dos lados y NADA avisaba — `revisaPlan` estima el ALTO
          // del bloque contra el presupuesto del molde, pero no el ANCHO.
          pon("titular", {
            id: "t1",
            rol: "hero",
            px: 72,
            lineas: ["Tras el sismo,", "muchas viviendas", "quedaron con grietas."],
          }),
          pon("etiqueta", { texto: "No todas significan lo mismo.", en: tras("t1", 4) }),
        ],
        { gap: 22 }
      ),
    ]
  ),

  gfx(
    "n02-magnitud",
    "cine",
    "contexto",
    [150, 285],
    "hero",
    "La magnitud da la escala del hecho. Va en registro de cine porque es el dato del suceso, no de la explicación.",
    [
      col(
        [
          pon("kicker", { texto: "CENTRO Y OCCIDENTE DE COLOMBIA", color: "blanco" }),
          // `color: "blanco"` OBLIGATORIO en todo texto de una toma `cine`: el
          // molde trae fondo negro pero NO una tinta por defecto, así que sin
          // esto la pieza sale en tinta carbón sobre negro y no se ve. No avisa
          // nadie. Pasó aquí, en la cifra, en el umbral y en el «123».
          pon("cifra", { id: "mag", rol: "hero", color: "blanco", valor: 7.4, decimales: 1, dur: 34, golpe: true }),
          pon("etiqueta", {
            texto: "de magnitud. Más de 100 personas fallecidas.",
            color: "blanco",
            en: tras("mag", 6),
          }),
        ],
        { gap: 16 }
      ),
    ]
  ),

  gfx(
    "n03-fuente",
    "papel",
    "contexto",
    [285, 420],
    "apoyo",
    "La prueba periodística en pantalla: todo lo que sigue sale de este artículo, y se ve de dónde.",
    [
      col(
        [
          pon("recorte", {
            titular: "¿Qué hacer si encuentra grietas en su vivienda luego de un temblor?",
            fuente: "El Colombiano · 10 de agosto de 2026",
            ancho: 860,
            rotacion: -1.2,
          }),
        ],
        { gap: 20 }
      ),
    ]
  ),

  gfx(
    "n04-no-iguales",
    "papel",
    "explicacion",
    [420, 555],
    "hero",
    "Abre el cuerpo del vídeo: la clasificación por riesgo. Es la promesa de utilidad de la pieza.",
    [
      col(
        [
          pon("kicker", { texto: "SEGÚN EL ARTÍCULO" }),
          pon("titular", {
            rol: "hero",
            px: 84,
            // `acento` y no `resalte`: la paleta dice que el amarillo de resalte
            // «marca sobre la prueba, no colorea texto», y sobre el beige del
            // papel se lee peor que cualquier otra tinta.
            lineas: [["La ", { t: "forma", tinta: "acento", enfasis: true }, " de la grieta"], "dice el riesgo."],
          }),
        ],
        { gap: 20 }
      ),
    ]
  ),

  gfx(
    "n05-fisura",
    "papel",
    "explicacion",
    [555, 700],
    "apoyo",
    "Empieza por el caso benigno para que el espectador sitúe la escala antes de ver los graves.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO BAJO" }),
          pon("titular", { id: "t5", rol: "hero", px: 78, texto: "Fisuras superficiales" }),
          pon("etiqueta", {
            texto: "Del grosor de un cabello. Afectan solo al revoque, el estuco o la pintura.",
            en: tras("t5", 4),
          }),
        ],
        { gap: 18 }
      ),
    ]
  ),

  gfx(
    "n06-vertical",
    "papel",
    "explicacion",
    [700, 845],
    "apoyo",
    "Segundo escalón. El matiz importa: no comprometen de inmediato, pero el artículo pide vigilarlas.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO BAJO A MODERADO" }),
          pon("titular", { id: "t6", rol: "hero", px: 78, texto: "Grietas verticales" }),
          pon("etiqueta", {
            texto: "No comprometen la estabilidad de inmediato, pero hay que vigilar si crecen.",
            en: tras("t6", 4),
          }),
        ],
        { gap: 18 }
      ),
    ]
  ),

  gfx(
    "n07-horizontal",
    "papel",
    "explicacion",
    [845, 995],
    "apoyo",
    "Tercer escalón. Aquí ya cambia el color de la etiqueta de riesgo: el ojo tiene que notar que subimos.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO MODERADO A ALTO", color: "acento" }),
          pon("titular", { id: "t7", rol: "hero", px: 78, texto: "Grietas horizontales" }),
          pon("etiqueta", {
            texto: "En la parte alta de los muros. Significan empujes, deflexiones o deformaciones.",
            en: tras("t7", 4),
          }),
        ],
        { gap: 18 }
      ),
    ]
  ),

  gfx(
    "n08-diagonal",
    "papel",
    "conflicto",
    [995, 1160],
    "hero",
    "El caso grave, y el único con una frase textual del artículo: pueden fallar sin previo aviso. Es lo que justifica llamar a alguien.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO ALTO", color: "acento" }),
          pon("titular", {
            id: "t8",
            rol: "hero",
            px: 78,
            lineas: ["En X, diagonales", "o en escalera"],
          }),
          pon("etiqueta", {
            texto: "Sobre muros, vigas o columnas.",
            en: tras("t8", 3),
          }),
          // La frase más crítica de la pieza va en `tinta`, el MÁXIMO contraste
          // sobre papel — no en un color. Estaba en amarillo de resalte y era la
          // línea menos legible del frame siendo la más importante: exactamente
          // al revés de la regla («reserva el mayor contraste para lo único que
          // importa»). El énfasis lo da el peso, no el color.
          pon("etiqueta", {
            texto: [{ t: "Pueden fallar súbitamente sin dar previo aviso.", tinta: "tinta", enfasis: true }],
            en: tras("t8", 12),
          }),
        ],
        { gap: [14, 14, 26] }
      ),
    ]
  ),

  gfx(
    "n09-umbral",
    "cine",
    "datos",
    [1160, 1320],
    "hero",
    "El único número accionable de la pieza. Va a pantalla completa porque es lo que hay que recordar.",
    [
      col(
        [
          pon("kicker", { texto: "SI EL ANCHO SUPERA", color: "blanco" }),
          pon("titular", { id: "t9", rol: "hero", color: "blanco", px: 150, texto: "2 a 3 mm" }),
          pon("etiqueta", {
            texto: "el artículo pide contactar ya a ingenieros civiles o a los organismos de emergencia.",
            color: "blanco",
            en: tras("t9", 6),
          }),
        ],
        { gap: 18 }
      ),
    ]
  ),

  gfx(
    "n10-senales",
    "papel",
    "datos",
    [1320, 1470],
    "apoyo",
    "Las señales que no son grietas. Van en chips porque son tres cosas del mismo rango, no una secuencia.",
    [
      col(
        [
          pon("kicker", { texto: "TAMBIÉN CUENTAN" }),
          fila(
            [
              pon("chip", { texto: "Puertas", glifo: "caja" }),
              pon("chip", { texto: "Muros", glifo: "casa" }),
              pon("chip", { texto: "Placas", glifo: "edificio" }),
            ],
            { gap: 22, paso: 5 }
          ),
          pon("etiqueta", {
            texto: "Puertas y ventanas que se traban · separación entre muros y marcos · desniveles en placas o techos.",
            px: 38,
          }),
        ],
        { gap: 26 }
      ),
    ]
  ),

  gfx(
    "n11-sin-formula",
    "papel",
    "climax",
    [1470, 1620],
    "hero",
    "El clímax del formato sube la tensión; aquí la BAJA. Es la frase de los expertos en el artículo y el motivo por el que la pieza es una ruta y no un diagnóstico.",
    [
      col(
        [
          pon("kicker", { texto: "LOS EXPERTOS ACLARAN" }),
          pon("titular", {
            id: "t11",
            rol: "hero",
            px: 76,
            lineas: ["No hay fórmula exacta", "para saber a simple vista", "si una estructura es segura."],
          }),
          pon("etiqueta", {
            texto: "Este vídeo no reemplaza una inspección.",
            en: tras("t11", 6),
          }),
        ],
        { gap: 20 }
      ),
    ]
  ),

  gfx(
    "n12-ruta",
    "cine",
    "cierre",
    [1620, 1740],
    "hero",
    "Cierra en lo accionable, no en el miedo: a quién se llama. Sin CTA de marca — pedir un seguimiento sobre esto sería usar el desastre.",
    [
      col(
        [
          pon("kicker", { texto: "LA REVISIÓN SE PIDE ASÍ", color: "blanco" }),
          pon("titular", { id: "t12", rol: "hero", color: "blanco", px: 130, texto: "123" }),
          pon("etiqueta", {
            texto: "Medellín: el DAGRD envía ingenieros y la inspección técnica es gratuita.",
            color: "blanco",
            en: tras("t12", 5),
          }),
          pon("etiqueta", {
            texto: "Resto de Antioquia: Dagran o el cuerpo de bomberos.",
            color: "blanco",
            en: tras("t12", 11),
          }),
        ],
        { gap: [16, 20, 12] }
      ),
    ]
  ),
]);
