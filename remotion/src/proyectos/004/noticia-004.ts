import { toma, type TomaNoticia } from "../../motor/noticias/plan";

/**
 * PROYECTO 004 — «¿Por qué la gente se quiere ir al Valle de San Nicolás?»
 * Fuente: El Colombiano · Víctor Andrés Álvarez Correa · 2026-07-25
 * Artefacto (creencia, fuentes verificadas y decisiones): proyectos/004/artefactos/01-noticia.md
 *
 * LA CREENCIA QUE MUEVE: la gente cree que el Oriente es un boom imparable.
 * En realidad las ventas cayeron 25 % — pero lo que se frenó fue el CRÉDITO,
 * no el deseo de mudarse. La prueba está en que el suelo (+6,7 %) y los
 * negocios (+4,4 %) subieron el mismo año en que las ventas caían.
 *
 * TODAS las cifras salen del artículo. Las tasas de interés se nombran como
 * causa pero NUNCA con un porcentaje: la fuente no lo da y el formato no inventa.
 *
 * COMP: 1080×1920 · 30 fps · 2205 f (73,5 s).
 *
 * ⚠️ FRAMES MEDIDOS, NO ESTIMADOS. Cada ventana sale de la duración REAL de su
 * línea de voz (SKILL §5.4: la voz manda sobre el plan). Los produjo, con la voz
 * GUÍA del sistema (no la definitiva):
 *   bash manuales/video-noticias/scripts/generar-vo.sh proyectos/004/guion-vo.txt \
 *        --motor say --voz Paulina --ppm 178 --pausa 0.38 --fps 30
 * Si cambias el guion o la voz, vuelve a correrlo y pega la tabla aquí: NO
 * ajustes estos números a mano o el corte dejará de caer donde cierra la frase.
 *
 * (El script solo acepta opciones con nombre. La forma posicional que había aquí
 * dejaba GUION="30", y con eso borraba el vo/.partes del directorio actual antes
 * de fallar; ahora valida el guion antes de tocar el disco.)
 */
export const noticia004: TomaNoticia[] = [
  // ══ GANCHO ═════════════════════════════════════════════════════════════════
  // La contradicción necesita el CORTE entre la afirmación y la cifra. En una
  // sola toma, el −25 % se leería como un dato más y no como un desmentido.
  toma(
    "n01-todos",
    "titular",
    "gancho",
    [0, 92],
    {
      registro: "cine",
      kicker: "Oriente antioqueño",
      titular: "Todo el mundo se quiere ir al Oriente",
      soundCueId: "s01-hook",
    },
    "Enuncia la creencia que el vídeo va a romper: sin afirmarla primero, la cifra siguiente no contradice nada"
  ),
  toma(
    "n02-caida",
    "cifra",
    "gancho",
    [92, 230],
    {
      kicker: "Ventas de vivienda · primer semestre",
      de: 0,
      valor: -25,
      sufijo: " %",
      etiqueta: "menos que el mismo periodo del año anterior",
      soundCueId: "s02-caida",
    },
    "La cifra que rompe la creencia: es el choque contra la toma anterior, no un dato suelto"
  ),

  // ══ CONTEXTO ═══════════════════════════════════════════════════════════════
  toma(
    "n03-valle",
    "titular",
    "contexto",
    [230, 361],
    {
      kicker: "De qué hablamos",
      titular: "El Valle de San Nicolás",
      etiqueta: "Nueve municipios a una hora de Medellín",
      soundCueId: "s03-valle",
    },
    "Sitúa la región antes de dar sus cifras: sin geografía, los números no significan nada"
  ),
  toma(
    "n04-oferta",
    "cifra",
    "contexto",
    [361, 492],
    {
      de: 0,
      valor: 19,
      sufijo: " %",
      etiqueta: "de toda la oferta de vivienda de Antioquia está aquí",
      soundCueId: "s04-oferta",
    },
    "Da la escala del fenómeno: justifica que una región de nueve municipios merezca un vídeo"
  ),

  // ══ CONFLICTO — por qué la gente se va ═════════════════════════════════════
  toma(
    "n05-transicion",
    "comparador",
    "conflicto",
    [492, 622],
    {
      titular: "Dejó de ser tierra de fincas",
      items: [
        { label: "Fincas de recreo", glifo: "casa", activo: false },
        { label: "Multifamiliar", glifo: "edificio", activo: true },
      ],
      soundCueId: "s05-chips",
    },
    "Explica el cambio de uso del suelo en una imagen: es lo que convierte 'zona de descanso' en mercado inmobiliario"
  ),
  toma(
    "n06-porque",
    "comparador",
    "conflicto",
    [622, 772],
    {
      titular: "¿Por qué se van?",
      items: [
        { label: "Aire limpio", glifo: "hoja" },
        { label: "Aeropuerto", glifo: "avion" },
        { label: "Teletrabajo", glifo: "rayo" },
      ],
      soundCueId: "s06-chips",
    },
    "Las tres razones del artículo en un golpe de vista: responde la pregunta del titular original"
  ),

  // ══ EXPLICACIÓN — el mecanismo (el bloque que justifica el vídeo) ══════════
  toma(
    "n07-mecanismo",
    "titular",
    "explicacion",
    [772, 896],
    {
      kicker: "Lo que de verdad pasó",
      titular: "No se frenó el deseo",
      etiqueta: "Se frenó el crédito",
      soundCueId: "s07-giro",
    },
    "El giro de la pieza: reinterpreta la caída del 25 % como problema de financiación, no de demanda"
  ),
  toma(
    "n08-quiere-puede",
    "comparador",
    "explicacion",
    [896, 1041],
    {
      titular: "Tasas altas e incertidumbre",
      items: [
        { label: "Quiere comprar", glifo: "casa", activo: true },
        { label: "Puede pagar", glifo: "moneda", activo: false },
      ],
      etiqueta: "El comprador sigue ahí; el crédito, no",
      soundCueId: "s08-negacion",
    },
    "Separa deseo de capacidad de pago: es la distinción que sostiene toda la tesis del vídeo"
  ),
  toma(
    "n09-suelo",
    "cifra",
    "explicacion",
    [1041, 1163],
    {
      kicker: "Y aun así",
      de: 0,
      valor: 6.7,
      sufijo: " %",
      etiqueta: "subió el valor del suelo en el mismo periodo",
      dur: 30,
      soundCueId: "s09-suelo",
    },
    "La prueba del mecanismo: si el suelo sube mientras las ventas caen, el problema no es falta de interés"
  ),

  // ══ DATOS ══════════════════════════════════════════════════════════════════
  toma(
    "n10-valorizacion",
    "medidor",
    "datos",
    [1163, 1321],
    {
      titular: "Dónde más se valorizó",
      medidas: [
        { label: "El Retiro", de: 0, a: 11.6, sufijo: " %", max: 12, decimales: 1 },
        { label: "Alto de Las Palmas", de: 0, a: 7.5, sufijo: " %", max: 12, decimales: 1 },
      ],
      soundCueId: "s10-sliders",
    },
    "Aterriza la valorización en dos lugares concretos: un porcentaje regional no se puede visitar, un municipio sí"
  ),
  toma(
    "n11-negocios",
    "cifra",
    "datos",
    [1321, 1476],
    {
      // El "+4,4 %" va al kicker: dentro de la etiqueta, el salto de línea
      // separaba el "4,4" del "%" y la cifra dejaba de leerse.
      kicker: "Un 4,4 % más que el año anterior",
      de: 0,
      valor: 13540,
      etiqueta: "negocios inmobiliarios cerrados en 2025",
      soundCueId: "s11-negocios",
    },
    "Segunda prueba de que el mercado no se apagó: los negocios crecieron el año de la caída de ventas"
  ),
  toma(
    "n12-stock",
    "cifra",
    "datos",
    [1476, 1619],
    {
      de: 0,
      valor: 3985,
      etiqueta: "viviendas disponibles en 115 proyectos",
      soundCueId: "s12-stock",
    },
    "Cuantifica la oferta parada: es el stock que la caída de ventas deja sin colocar"
  ),
  toma(
    "n13-preventa",
    "cifra",
    "datos",
    [1619, 1731],
    {
      de: 0,
      valor: 77,
      sufijo: " %",
      color: "#111111",
      etiqueta: "de esa oferta todavía está en preventa",
      soundCueId: "s13-preventa",
    },
    "Convierte el stock en riesgo: lo grave no es que haya oferta, es que la mayoría aún no está construida"
  ),

  // ══ CLÍMAX — lo que está en juego ══════════════════════════════════════════
  toma(
    "n14-concentracion",
    "cifra",
    "climax",
    [1731, 1863],
    {
      de: 0,
      valor: 91,
      sufijo: " %",
      color: "#111111",
      etiqueta: "de las ventas se concentra en solo cinco municipios",
      soundCueId: "s14-concentracion",
    },
    "Introduce el riesgo: un crecimiento tan concentrado presiona a unos pocos territorios y deja fuera al resto"
  ),
  toma(
    "n15-territorio",
    "titular",
    "climax",
    [1863, 2010],
    {
      // "El territorio no va al mismo ritmo" caía en 3 líneas con "ritmo" solo
      // en la última. Cinco palabras entran en dos líneas equilibradas.
      titular: "El territorio no aguanta el ritmo",
      etiqueta: "POT desactualizados, vías, servicios públicos y espacio público",
      soundCueId: "s15-riser",
    },
    "Nombra el cuello de botella real: el límite del crecimiento ya no es la oferta, es la planificación"
  ),
  toma(
    "n16-brecha",
    "titular",
    "climax",
    [2010, 2145],
    {
      registro: "cine",
      titular: "Dos regiones en el mismo valle",
      etiqueta: "Crece la brecha entre quien siempre vivió allí y quien acaba de llegar",
      soundCueId: "s16-brecha",
    },
    "Cierra el clímax con el coste social: es lo que convierte un asunto inmobiliario en un asunto de gente"
  ),

  // ══ CIERRE ═════════════════════════════════════════════════════════════════
  // Pregunta, no «Parte 2»: no hay continuación comprometida y el formato
  // prohíbe prometer una que no existe (SKILL §10).
  toma(
    "n17-cierre",
    "cierre",
    "cierre",
    [2145, 2205],
    {
      titular: "¿Alcanza?",
      etiqueta: "El Colombiano · Oriente antioqueño",
      soundCueId: "s17-cierre",
    },
    "Deja la pregunta abierta y acredita la fuente: el formato vive de credibilidad, no de un gancho falso"
  ),
];
