// Importa de `noticias/plan` y NO de `noticias`: un archivo de DATOS no debe
// arrastrar los componentes React del intérprete. Así el plan se puede validar
// desde node (revisaNoticia) sin montar Remotion.
import { toma, type TomaNoticia } from "./noticias/plan";

/**
 * PLAN DE DEMO — la noticia de referencia montada con el formato.
 * Copia este archivo como `noticia-NNN.ts` en tu proyecto y cambia el contenido.
 *
 * Es el vídeo que originó el formato (Elon Musk vs. Sam Altman / OpenAI),
 * reconstruido con las nueve tomas del sistema. Sirve para tres cosas:
 *   1. ver el look sin generar nada (todas las tomas de papel funcionan vacías),
 *   2. comprobar que el ritmo del formato se sostiene (~1-4 s por toma),
 *   3. tener un plan real que copiar en vez de una plantilla vacía.
 *
 * COMP: 1080×1920 · 30 fps. Todos los frames de aquí abajo están a 30 fps.
 * Si tu voz en off dura otra cosa, re-cronometra: los números son absolutos.
 *
 * Guía: manuales/video-noticias/SKILL.md · artefacto: artefactos/01-noticia.md
 */
export const noticiaDemo: TomaNoticia[] = [
  // ── GANCHO — 0:00-0:04 ─────────────────────────────────────────────────────
  // La afirmación que contradice lo que el espectador cree. Va sobre NEGRO
  // porque aún no estamos explicando nada: estamos plantando una duda.
  toma(
    "n01-gancho",
    "titular",
    "gancho",
    [0, 78],
    {
      registro: "cine",
      kicker: "OpenAI",
      titular: "Sam Altman no fundó OpenAI",
      etiqueta: "Fue Elon Musk.",
      soundCueId: "s-gancho",
    },
    "Contradice la creencia por defecto en los 3 primeros segundos: sin esto no hay retención"
  ),

  // ── CONTEXTO — 0:02.6-0:06 ─────────────────────────────────────────────────
  // Qué quería el fundador real. Pasamos a papel: empieza la explicación.
  toma(
    "n02-proposito",
    "comparador",
    "contexto",
    [78, 186],
    {
      titular: "Lo fundó sin ánimo de lucro",
      items: [
        { label: "Non Profit", glifo: "manos", activo: true },
        { label: "For Profit", glifo: "caja", activo: false },
      ],
      etiqueta: "Para que la IA no acabara en manos de las grandes tecnológicas",
      soundCueId: "s-chips",
    },
    "Fija la premisa original en una imagen: es contra esto que se mide toda la traición posterior"
  ),

  // ── CONFLICTO — 0:06-0:10 ──────────────────────────────────────────────────
  // La prueba de que hoy están enfrentados. El recorte da veracidad.
  toma(
    "n03-demanda",
    "prensa",
    "conflicto",
    [186, 300],
    {
      kicker: "Reuters",
      titular: "Elon Musk demanda a OpenAI y a su CEO Sam Altman por incumplimiento de contrato",
      resaltar: "incumplimiento de contrato",
      soundCueId: "s-prensa",
    },
    "Ancla el conflicto en una fuente real: sin recorte, la afirmación del gancho es solo una opinión"
  ),

  // ── CONFLICTO — 0:10-0:14 ──────────────────────────────────────────────────
  // El viaje al pasado. La dirección (2026 → 2018) es información.
  toma(
    "n04-cronologia",
    "cronologia",
    "conflicto",
    [300, 420],
    {
      kicker: "Todo empieza antes",
      hitos: [
        { año: "2026", texto: "La demanda" },
        { año: "2018", texto: "Elon intenta fusionar OpenAI con Tesla" },
      ],
      soundCueId: "s-tiempo",
    },
    "Explica que el pleito de hoy nace de una decisión de 2018: sin la fecha, la historia no tiene causa"
  ),

  // ── CONFLICTO — 0:14-0:17 ──────────────────────────────────────────────────
  toma(
    "n05-portazo",
    "titular",
    "conflicto",
    [420, 510],
    {
      titular: "Sam dijo que no",
      etiqueta: "Elon se fue, renunció a su participación y retiró toda su financiación",
      soundCueId: "s-portazo",
    },
    "El punto de giro de la historia en una frase: es el momento en que las dos partes se separan"
  ),

  // ── EXPLICACIÓN — 0:17-0:21 ────────────────────────────────────────────────
  // El mecanismo. Es el bloque que justifica que esto sea un vídeo y no un titular.
  toma(
    "n06-capped",
    "titular",
    "explicacion",
    [510, 630],
    {
      kicker: "El modelo que lo cambió todo",
      titular: "Capped profit",
      etiqueta: "Un inversor pone 1 $ y puede ganar 100 $ como máximo",
      soundCueId: "s-modelo",
    },
    "Nombra el mecanismo antes de mostrar sus cifras: sin el nombre, los números siguientes no significan nada"
  ),

  // ── DATOS — 0:21-0:25 ──────────────────────────────────────────────────────
  // El recorrido del contador ES el argumento: se detiene en 100 aunque haya 500.
  toma(
    "n07-tope",
    "cifra",
    "datos",
    [630, 744],
    {
      kicker: "Aunque OpenAI gane 500 $",
      de: 0,
      valor: 100,
      prefijo: "$",
      etiqueta: "El inversor se queda en 100. El resto vuelve al brazo sin ánimo de lucro",
      soundCueId: "s-cifra",
    },
    "El tope es el corazón de la noticia: hay que ver el número frenar para entender la queja de los fondos"
  ),

  // ── CLÍMAX — 0:25-0:29 ─────────────────────────────────────────────────────
  // Lo que reciben los que ponen los miles de millones: nada de poder.
  toma(
    "n08-medidores",
    "medidor",
    "climax",
    [744, 864],
    {
      titular: "Lo que compran los inversores",
      medidas: [
        { label: "Control", de: 60, a: 0, sufijo: " %", max: 100 },
        { label: "Beneficio", de: 500, a: 100, prefijo: "$", max: 500 },
      ],
      soundCueId: "s-sliders",
    },
    "Muestra los dos recorridos a la vez: la frustración de los fondos se entiende viendo bajar ambos"
  ),

  // ── CLÍMAX — 0:29-0:32 ─────────────────────────────────────────────────────
  toma(
    "n09-presion",
    "titular",
    "climax",
    [864, 954],
    {
      titular: "Y OpenAI quema caja sin parar",
      etiqueta: "Los fondos presionan a Sam para reestructurar el modelo",
      soundCueId: "s-presion",
    },
    "Da el motor del presente: es lo que convierte una disputa vieja en una noticia de hoy"
  ),

  // ── CLÍMAX — 0:32-0:35 ─────────────────────────────────────────────────────
  // Metraje real. Registro cine: "esto está pasando".
  toma(
    "n10-politica",
    "escenario",
    "climax",
    [954, 1050],
    {
      titular: "Y la IA ya es política",
      // media: "noticias/altman-casablanca.mp4", esVideo: true,
      soundCueId: "s-archivo",
    },
    "Sube la apuesta del pleito: deja de ser corporativo y pasa a ser poder público"
  ),

  // ── CIERRE — 0:35-0:38 ─────────────────────────────────────────────────────
  toma(
    "n11-cierre",
    "cierre",
    "cierre",
    [1050, 1140],
    {
      titular: "Parte 2",
      etiqueta: "Por qué Elon dice que es una traición",
      soundCueId: "s-cierre",
    },
    "Gancho a la continuación: el formato vive de que la historia no cierre del todo"
  ),
];
