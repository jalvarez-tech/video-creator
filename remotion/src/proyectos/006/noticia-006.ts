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
 * Hecho: sismo de magnitud 7,4 con epicentro en San José del Palmar (Chocó).
 * Artefacto con las decisiones editoriales y el origen de CADA cifra:
 * proyectos/006/artefactos/01-noticia.md
 *
 * POR QUÉ ESTA PIEZA NO USA EL FORMATO ENTERO. El formato abre con un gancho que
 * contradice lo que el espectador cree y sube a un clímax. Con muertos del mismo
 * día, las dos cosas están mal: el gancho enuncia la situación sin adorno, y el
 * clímax BAJA la tensión en vez de subirla — dice lo que el vídeo no puede hacer.
 * No hay CTA de marca: el cierre es la ruta a los canales oficiales.
 *
 * ── LOS FRAMES YA NO SON UNA ESTIMACIÓN ────────────────────────────────────
 * La versión anterior de este archivo repartía 1740 f a ojo (≈2,7 palabras/s)
 * sobre 12 tomas, y lo decía. Ya hay locución: voz clonada del canal en
 * ElevenLabs con el modelo `eleven_v3`, 80,24 s = 2407 f a 30 fps, medida con
 * `generar-vo.sh`. Las 23 ventanas de abajo salen de esa medición, no de una
 * regla de tres. Los 2409 f del plan le dan dos frames de cola.
 *
 * OJO AL RELOCUTAR: `eleven_v3` NO admite request stitching, así que cada línea
 * se generó sin saber qué va antes ni después. Es el precio del rango emocional
 * y está asumido; si alguna juntura salta de tono, la salida es volver a
 * `eleven_multilingual_v2` (la pista v2 sigue en proyectos/006/vo/, ya pagada),
 * no repetir la v3 esperando otro resultado.
 *
 * ── Y POR QUÉ HAY 23 TOMAS DONDE HABÍA 12 ──────────────────────────────────
 * Ésta es la consecuencia interesante de medir. Al pegar los frames REALES sobre
 * el plan de 12 tomas, NUEVE de las doce pasaban del techo de 6 s del formato:
 * n12 se iba a 14,5 s y n08 a 10,6 s. El plan estimado no lo veía porque la
 * estimación era optimista (aquella voz iba a 2,34 palabras/s, no a 2,7).
 *
 * La salida NO era acelerar la voz ni recortar el guion: la locución es correcta
 * y el contenido ya estaba al hueso. Era que el plan tenía mal el TAMAÑO DE LA
 * UNIDAD. «Una idea por toma» (SKILL §3): una toma que aguanta 10 s es una toma
 * que está contando tres cosas. Así que cada span largo se parte por sus juntas
 * naturales —la frase que ya estaba dentro— y cada trozo se queda con UNA. La
 * voz no cambia ni un frame; lo que cambia es cuántas veces cambia la imagen
 * mientras suena.
 *
 * Las juntas se sitúan por posición de carácter dentro de su línea del guion, que
 * es lo más cerca de la prosodia real a lo que se llega sin alineación forzada.
 * Si alguna cae a destiempo se ve en los frames de control y se mueve a mano: son
 * números, no una estructura.
 */
import { capa, dialectoEditorialDe } from "../../motor/noticias/dialecto";
import { LUXUR } from "../../marcas/luxur";

const { pon, col, fila, gfx, plan, tras } = capa(dialectoEditorialDe(LUXUR), "noticia");

export const noticia006 = plan({ ancho: 1080, alto: 1920, fps: 30, duracion: 2409 }, [
  // ══ GANCHO ═══════════════════════════════════════════════════════════════
  gfx(
    "n01a-sismo",
    "papel",
    "gancho",
    [0, 96],
    "hero",
    "Enuncia la situación sin adorno. El formato pediría contradecir una creencia; con víctimas del mismo día, eso sería usar el desastre como reclamo.",
    [
      col(
        [
          // Era «PROPIEDADES LUXUR» y el sello del pie dice EXACTAMENTE eso, en
          // el mismo frame: la marca aparecía dos veces en la primera imagen del
          // vídeo y ninguna de las dos aportaba nada a la otra. Un kicker es
          // sección o contexto (dialecto: «NUNCA lleva el mensaje»), así que aquí
          // hace de fechador — que es lo que un lector necesita para saber si esto
          // le habla del sismo de esta semana o de uno de hace tres años.
          pon("kicker", { texto: "COLOMBIA · AGOSTO DE 2026" }),
          // px 72 y no la escala hero (96): a 96 la línea larga se salía del
          // lienzo por los dos lados y NADA avisaba — `revisaPlan` estima el ALTO
          // del bloque contra el presupuesto del molde, pero no el ANCHO.
          pon("titular", {
            id: "t1",
            rol: "hero",
            px: 72,
            lineas: ["Tras el sismo,", "muchas viviendas", "quedaron con grietas."],
          }),
        ],
        { gap: 22 }
      ),
    ],
    { sonido: "s01-abre" }
  ),

  // El giro del gancho, ahora en toma propia: era la `etiqueta` de la anterior y
  // se leía como una coletilla. Sola en pantalla es lo que de verdad promete el
  // vídeo — que hay una diferencia que se puede aprender a ver.
  gfx(
    "n01b-no-iguales",
    "papel",
    "gancho",
    [96, 153],
    "hero",
    "Aísla la promesa del vídeo: hay una diferencia entre grietas y se puede reconocer. Como etiqueta de la toma anterior pasaba desapercibida.",
    [
      col([pon("titular", { rol: "hero", px: 88, lineas: ["No todas significan", "lo mismo."] })], { gap: 20 }),
    ],
    { sonido: "s02-giro" }
  ),

  // ══ CONTEXTO ═════════════════════════════════════════════════════════════
  // Sin sufijo «a»: era `n02a-magnitud` y tenía una hermana `n02b-balance` con el
  // recuento de fallecidos. Se quitó (ver abajo), así que el par ya no existe.
  gfx(
    "n02-magnitud",
    "cine",
    "contexto",
    [153, 256],
    "hero",
    "La magnitud da la escala del hecho. Va en registro de cine porque es el dato del suceso, no de la explicación.",
    [
      col(
        [
          pon("kicker", { texto: "CENTRO Y OCCIDENTE DE COLOMBIA", color: "blanco" }),
          // `color: "blanco"` en todo texto de una toma `cine`. Hoy el molde ya
          // trae `tinta: "blanco"` por defecto —lo arregló el dialecto— pero se
          // deja explícito porque es lo que hace legible el plan al leerlo: la
          // toma dice de qué color se pinta sin que haya que ir al molde.
          pon("cifra", { id: "mag", rol: "hero", color: "blanco", valor: 7.4, decimales: 1, dur: 34, golpe: true }),
          pon("etiqueta", { texto: "de magnitud.", color: "blanco", en: tras("mag", 6) }),
        ],
        { gap: 16 }
      ),
    ],
    { sonido: "s03-magnitud" }
  ),

  // AQUÍ HABÍA UNA TOMA CON EL RECUENTO DE FALLECIDOS («Más de 130 personas
  // fallecidas», con su golpe grave `s04-balance`). Se quita a propósito.
  //
  // La pieza es un explicador de servicio de un canal inmobiliario: enseña a leer
  // una grieta en tu propia pared. El número de muertos daba gravedad al encuadre,
  // pero no ayuda a nadie a decidir si llama a un ingeniero — y en un canal que no
  // cubre sucesos, abrir con un recuento de víctimas se acerca más a usar el
  // desastre que a informar sobre él. La restricción editorial del artefacto no
  // cambia por esto: el hecho SIGUE teniendo muertos, y por eso la pieza sigue sin
  // gancho de retención y con un clímax que baja la tensión en vez de subirla.
  //
  // Lo que queda del contexto es la magnitud, que es lo que explica por qué hay
  // grietas nuevas en tantas casas — o sea, lo único del suceso que la pieza
  // necesita para hacer su trabajo.

  gfx(
    "n03-fuente",
    "papel",
    "contexto",
    // La ÚNICA ventana que no coincide con su línea de voz: la locución acaba en
    // 320 y la toma dura hasta 340. La línea pasó a ser «¿Cuándo una grieta es
    // peligrosa?» —32 caracteres— y a esa duración el recorte no da tiempo a
    // leerse. Los 20 f de más los presta `n04-forma`, que se queda en 66 f y le
    // sobran. El recorte aguantando sobre el principio de la respuesta no es un
    // fallo de sincronía: es el artículo contestando la pregunta que acaba de oírse.
    [256, 340],
    "hero",
    "Plantea la pregunta que abre el cuerpo del vídeo y, debajo, la fuente que la contesta. El texto en pantalla dice lo mismo que la voz; el recorte sostiene de dónde sale.",
    [
      col(
        [
          // LA PREGUNTA, EN PANTALLA Y NO SOLO EN LA VOZ. Antes esta toma era solo
          // el recorte: se oía «¿cuándo una grieta es peligrosa?» y se leía otro
          // titular distinto («¿qué hacer si encuentra grietas…?»). Son preguntas
          // parecidas pero no la misma, y el ojo y el oído tirando de dos frases a
          // la vez es exactamente el ruido que el formato evita cuando prohíbe
          // repetir texto — solo que aquí el problema no era repetir, era divergir.
          pon("titular", { rol: "hero", px: 76, lineas: ["¿Cuándo una grieta", "es peligrosa?"] }),
          // 840 y no 860: el molde `papel` da 844 px útiles (1080 − 2×118 de
          // margen) y el recorte del 005, ya publicado, usa 840. Escribir 860
          // metía la tarjeta en la zona segura por los dos lados.
          //
          // El recorte se queda —encogerlo o quitarlo era la otra salida— porque
          // desde que la voz dejó de decir «El Colombiano» ES la única atribución
          // de la pieza. Debajo de la pregunta ya no compite con ella: pasa de ser
          // el mensaje a ser la prueba, que es su papel en el formato.
          pon("recorte", {
            titular: "¿Qué hacer si encuentra grietas en su vivienda luego de un temblor?",
            fuente: "El Colombiano · 10 de agosto de 2026",
            ancho: 840,
            rotacion: -1.2,
          }),
        ],
        // 34 y no los 18-26 del resto de la pieza: aquí lo que se separa no son
        // dos textos sino un texto y una TARJETA, que trae borde y sombra propios.
        // Con el gap de un texto, el descendente de «peligrosa?» queda pegado al
        // canto de la tarjeta y las dos cosas se leen como un bloque.
        { gap: 34 }
      ),
    ],
    { sonido: "s05-recorte" }
  ),

  // ══ EXPLICACIÓN — la clasificación por riesgo ═════════════════════════════
  gfx(
    "n04-forma",
    "papel",
    "explicacion",
    [340, 406],
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
    ],
    { sonido: "s06-forma" }
  ),

  gfx(
    "n05a-fisura",
    "papel",
    "explicacion",
    [406, 506],
    "apoyo",
    "Empieza por el caso benigno para que el espectador sitúe la escala antes de ver los graves.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO BAJO" }),
          pon("titular", { id: "t5", rol: "hero", px: 78, texto: "Fisuras superficiales" }),
          // Los CUATRO diagramas van a 520×340 y en ese orden —nombre, dibujo,
          // explicación— a propósito: son una serie, y una serie que cambia de
          // tamaño entre planos deja de leerse como comparación. Sin `grosor`:
          // `DiagramaGrieta` ya pinta la fisura a 3 px porque el artículo la
          // describe «del grosor de un cabello».
          pon("grieta", { tipo: "fisura", ancho: 520, alto: 340 }),
          pon("etiqueta", { texto: "Del grosor de un cabello.", en: tras("t5", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s07-bajo" }
  ),

  // El remate tranquilizador, separado del nombre: es la mitad de la frase que
  // de verdad contesta «¿tengo que preocuparme?».
  gfx(
    "n05b-superficial",
    "papel",
    "explicacion",
    [506, 609],
    "hero",
    "Contesta la pregunta que la toma anterior deja abierta. Separada, se lee como conclusión y no como matiz.",
    [
      col(
        [
          pon("titular", { id: "t5b", rol: "hero", px: 96, lineas: ["No tocan", "la estructura."] }),
          pon("etiqueta", { texto: "Solo el revoque, el estuco o la pintura.", en: tras("t5b", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s08-superficial" }
  ),

  gfx(
    "n06a-vertical",
    "papel",
    "explicacion",
    [609, 710],
    "apoyo",
    "Segundo escalón. El matiz importa: no comprometen de inmediato, y ése es el dato que tranquiliza.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO BAJO A MODERADO" }),
          pon("titular", { id: "t6", rol: "hero", px: 78, texto: "Grietas verticales" }),
          pon("grieta", { tipo: "vertical", ancho: 520, alto: 340 }),
          pon("etiqueta", { texto: "No comprometen la estabilidad de inmediato.", en: tras("t6", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s09-moderado" }
  ),

  // La segunda mitad del matiz. Va sola porque es la única acción que pide este
  // escalón, y mezclada con «no comprometen» se perdía.
  gfx(
    "n06b-vigilar",
    "papel",
    "explicacion",
    [710, 786],
    "hero",
    "Aísla lo único accionable del escalón: que no sea urgente no quiere decir que se olvide.",
    [
      col(
        [
          pon("titular", { id: "t6b", rol: "hero", px: 96, lineas: ["Pero hay que", "vigilarlas."] }),
          pon("etiqueta", { texto: "Requieren seguimiento por si crecen.", en: tras("t6b", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s10-vigilar" }
  ),

  gfx(
    "n07a-horizontal",
    "papel",
    "explicacion",
    [786, 893],
    "apoyo",
    "Tercer escalón. Aquí ya cambia el color de la etiqueta de riesgo: el ojo tiene que notar que subimos.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO MODERADO A ALTO", color: "acento" }),
          pon("titular", { id: "t7", rol: "hero", px: 78, texto: "Grietas horizontales" }),
          // A partir de aquí el trazo va en `acento`, igual que el kicker: el
          // dibujo escala de color con el riesgo por el mismo canal que el texto.
          // Y el diagrama la sitúa ARRIBA del muro, que es donde el artículo dice
          // que salen — dibujarla a media altura contradiría su propia etiqueta.
          pon("grieta", { tipo: "horizontal", ancho: 520, alto: 340, color: "acento" }),
          pon("etiqueta", { texto: "En la parte alta de los muros.", en: tras("t7", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s11-alto" }
  ),

  gfx(
    "n07b-empujes",
    "papel",
    "explicacion",
    [893, 1001],
    "hero",
    "Qué significan, que es lo que las distingue de las verticales. Sin esto el escalón es solo una orientación de la grieta.",
    [
      col(
        [
          pon("titular", { id: "t7b", rol: "hero", px: 96, lineas: ["Empujes o", "deformaciones."] }),
          pon("etiqueta", { texto: "Y el riesgo sube.", en: tras("t7b", 4) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s12-empujes" }
  ),

  // ══ CONFLICTO — el caso grave ═════════════════════════════════════════════
  gfx(
    "n08a-diagonal",
    "papel",
    "conflicto",
    [1001, 1120],
    "hero",
    "El caso grave. Las tres formas juntas porque el espectador tiene que reconocerlas de un vistazo en su propia pared.",
    [
      col(
        [
          pon("kicker", { texto: "RIESGO ALTO", color: "acento" }),
          pon("titular", { rol: "hero", px: 88, lineas: ["En X, diagonales", "o en escalera"] }),
          // Se dibuja la X y no las tres formas que nombra el titular. Es una
          // decisión, no un olvido: tres diagramas en 4 s no se leen, y la X es
          // el icono de la categoría —las otras dos son variantes de la misma
          // idea (el trazo que CRUZA el muro). La escalera se queda dicha y no
          // dibujada; si algún día hay parte 2, ahí tiene su plano.
          pon("grieta", { tipo: "diagonal", ancho: 520, alto: 340, color: "acento" }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s13-grave" }
  ),

  gfx(
    "n08b-donde",
    "papel",
    "conflicto",
    [1120, 1188],
    "hero",
    "Dónde miran importa tanto como la forma: una diagonal en un muro de relleno no es una diagonal en una columna.",
    [col([pon("titular", { rol: "hero", px: 88, lineas: ["Sobre muros,", "vigas o columnas."] })], { gap: 20 })],
    { sonido: "s14-riser" }
  ),

  // LA FRASE MÁS CRÍTICA DE LA PIEZA, EN TOMA PROPIA. Antes era la tercera línea
  // de una toma con otras tres cosas. Va en `tinta`, el MÁXIMO contraste sobre
  // papel — no en un color. Estuvo en amarillo de resalte y era la línea menos
  // legible del frame siendo la más importante: exactamente al revés de la regla
  // («reserva el mayor contraste para lo único que importa»). El énfasis lo da el
  // peso, no el color.
  gfx(
    "n08c-sin-aviso",
    "papel",
    "conflicto",
    [1188, 1296],
    "hero",
    "Es la frase que justifica llamar a alguien en vez de esperar. Sola en pantalla es lo único que se recuerda de este bloque, y debe serlo.",
    [
      col(
        [
          pon("titular", { id: "t8c", rol: "hero", px: 96, lineas: ["Pueden fallar", "súbitamente."] }),
          pon("etiqueta", {
            texto: [{ t: "Sin dar previo aviso.", tinta: "tinta", enfasis: true }],
            en: tras("t8c", 6),
          }),
        ],
        { gap: 24 }
      ),
    ],
    { sonido: "s15-sin-aviso" }
  ),

  // ══ DATOS ════════════════════════════════════════════════════════════════
  gfx(
    "n09a-umbral",
    "cine",
    "datos",
    [1296, 1424],
    "hero",
    "El único número accionable de la pieza. Va a pantalla completa porque es lo que hay que recordar.",
    [
      col(
        [
          pon("kicker", { texto: "SI EL ANCHO SUPERA", color: "blanco" }),
          pon("titular", { id: "t9", rol: "hero", color: "blanco", px: 150, texto: "2 a 3 mm" }),
          pon("etiqueta", { texto: "de ancho.", color: "blanco", en: tras("t9", 6) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s16-umbral" }
  ),

  // Vuelve a papel para la acción: el número es el suceso (cine) y a quién se
  // llama es la explicación (papel). Es la misma alternancia que sostiene la
  // pieza entera, aplicada dentro de un solo beat.
  gfx(
    "n09b-llamar",
    "papel",
    "datos",
    [1424, 1540],
    "hero",
    "Qué se hace con el umbral. Atribuido al artículo, no dicho como orden nuestra: el canal informa de lo que pide la fuente.",
    [
      col(
        [
          pon("kicker", { texto: "EL ARTÍCULO PIDE" }),
          pon("titular", { id: "t9b", rol: "hero", px: 88, lineas: ["Contactar ya a un", "ingeniero civil"] }),
          pon("etiqueta", { texto: "O a los organismos de emergencia.", en: tras("t9b", 5) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s17-llamar" }
  ),

  gfx(
    "n10a-no-solo",
    "papel",
    "datos",
    [1540, 1633],
    "hero",
    "Reencuadra antes de los chips: quien solo busca grietas se pierde la mitad de las señales.",
    [col([pon("titular", { rol: "hero", px: 96, lineas: ["No todo", "son grietas."] })], { gap: 20 })],
    { sonido: "s18-reencuadre" }
  ),

  gfx(
    "n10b-senales",
    "papel",
    "datos",
    [1633, 1767],
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
    ],
    { sonido: "s19a-chip" }
  ),

  // ══ CLÍMAX — que aquí BAJA la tensión ════════════════════════════════════
  gfx(
    "n11a-sin-formula",
    "papel",
    "climax",
    [1767, 1902],
    "hero",
    "El clímax del formato sube la tensión; aquí la BAJA. Es la frase de los expertos en el artículo y el motivo por el que la pieza es una ruta y no un diagnóstico.",
    [
      col(
        [
          pon("kicker", { texto: "LOS EXPERTOS ACLARAN" }),
          // px 70: a 76 la tercera línea medía ~846 px y rozaba el margen seguro
          // por 1 px. No se cortaba —lo comprobé por columnas de píxeles— pero un
          // plan que avisa siempre enseña a ignorar los avisos, y este validador
          // acaba de nacer. Lo cazó R09; a ojo no se veía.
          pon("titular", {
            rol: "hero",
            px: 70,
            lineas: ["No hay fórmula exacta", "para saber a simple vista", "si una estructura es segura."],
          }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s20-sin-formula" }
  ),

  // El límite del vídeo, en toma propia. Es la línea que impide que la pieza se
  // use como sustituto de una inspección, así que no puede ir de etiqueta debajo
  // de otra cosa.
  gfx(
    "n11b-limite",
    "papel",
    "climax",
    [1902, 2026],
    "hero",
    "Dice explícitamente lo que el vídeo NO puede hacer. En un tema de seguridad estructural esa frase es la más importante de la pieza.",
    [
      col([pon("titular", { rol: "hero", px: 76, lineas: ["Este vídeo no reemplaza", "una inspección."] })], {
        gap: 20,
      })
    ]
  ),

  // ══ CIERRE — la ruta oficial, sin CTA de marca ═══════════════════════════
  gfx(
    "n12a-linea",
    "cine",
    "cierre",
    [2026, 2154],
    "hero",
    "Cierra en lo accionable, no en el miedo: a quién se llama. Sin CTA de marca — pedir un seguimiento sobre esto sería usar el desastre.",
    [
      col(
        [
          pon("kicker", { texto: "ANTE DAÑOS ESTRUCTURALES", color: "blanco" }),
          pon("titular", { id: "t12", rol: "hero", color: "blanco", px: 130, texto: "123" }),
          pon("etiqueta", { texto: "La línea de emergencia.", color: "blanco", en: tras("t12", 5) }),
        ],
        { gap: 16 }
      ),
    ],
    { sonido: "s21-linea" }
  ),

  gfx(
    "n12b-medellin",
    "papel",
    "cierre",
    [2154, 2290],
    "hero",
    "El dato que quita la excusa del coste: en Medellín la inspección no se paga. Es la parte más útil del cierre.",
    [
      col(
        [
          pon("kicker", { texto: "MEDELLÍN" }),
          pon("titular", { id: "t12b", rol: "hero", px: 88, lineas: ["Inspección técnica", "gratuita."] }),
          pon("etiqueta", { texto: "La hace el DAGRD y envía ingenieros.", en: tras("t12b", 5) }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s22-gratuita" }
  ),

  // Última toma en `cine`: la pieza vuelve al negro del que salió. Y cierra en el
  // resto de Antioquia a propósito — el canal es de Medellín, pero una noticia de
  // un sismo regional que solo resuelve la capital deja fuera a media audiencia.
  gfx(
    "n12c-antioquia",
    "cine",
    "cierre",
    [2290, 2409],
    "hero",
    "Cierra cubriendo a quien no vive en la capital. Terminar en Medellín dejaría sin ruta a media audiencia del canal.",
    [
      col(
        [
          pon("kicker", { texto: "RESTO DE ANTIOQUIA", color: "blanco" }),
          pon("titular", { id: "t12c", rol: "hero", color: "blanco", px: 96, lineas: ["Dagran o", "los bomberos."] }),
          pon("etiqueta", {
            texto: "O la oficina local de gestión del riesgo.",
            color: "blanco",
            en: tras("t12c", 5),
          }),
        ],
        { gap: 18 }
      ),
    ],
    { sonido: "s23-cierre" }
  ),
]);
