/**
 * PROYECTO 007 — «Cómo reclamar el seguro si tu inmueble está hipotecado»
 * (v3 — hook pedido el 2026-08-11: la voz abre LITERAL con «Si tu inmueble
 * está hipotecado, así se reclama el seguro» y sigue directo con las zonas
 * golpeadas; el amparo obligatorio pasa detrás de la cifra y el recorte de
 * prensa sale de la pieza — su hueco era la frase que el nuevo hook elimina.
 * El tratamiento personal queda en TUTEO, que es el del hook.)
 *
 * Fuentes (cada afirmación con su cita en proyectos/007/artefactos/01-noticia.md):
 *   · EOSF art. 101 — seguro de incendio y terremoto obligatorio en inmuebles
 *     hipotecados con entidades vigiladas (parte destructible, valor comercial).
 *   · C. de Comercio arts. 1075 (aviso: 3 días, ampliable y nunca reducible),
 *     1077 (la carga de la prueba del siniestro y su cuantía es del asegurado),
 *     1080 (un mes para pagar desde que se acredita el derecho; mora = interés
 *     bancario corriente aumentado en la mitad), 1081 (prescripción ordinaria
 *     2 años, extraordinaria 5).
 *   · Ley 1328 de 2009 — Defensor del Consumidor Financiero, gratuito.
 *   · Fasecolda (2026-08-11, vía La República/Infobae/RCN): pasos recomendados
 *     tras el sismo y 442.514 inmuebles asegurados en las zonas de alta
 *     afectación (2.258.594 riesgos asegurados contra terremoto en el país).
 *   · La República (2026-08-11): reclamación ante la aseguradora, banco como
 *     beneficiario a título oneroso hasta el saldo, excedente del deudor.
 *
 * LA CREENCIA A MOVER: «reclamar es un laberinto: la aseguradora responde si
 * quiere y cuando quiere». En realidad la ruta está escrita y los plazos atan
 * a las DOS partes: 3 días para avisar (tuyos), un mes para pagar (de ellos,
 * con mora si se pasan), 2 años de prescripción, y un defensor gratuito.
 *
 * CRITERIO EDITORIAL: el del 006 (hecho con víctimas — sin sonidos de premio,
 * sin CTA de marca) y el jurídico del canal: pasos de Fasecolda y plazos del
 * Código de Comercio SIEMPRE atribuidos; los números de artículo van en
 * etiquetas de pantalla, nunca en la voz. Sin recorte de prensa en v3: la
 * atribución la llevan el kicker FASECOLDA y las referencias de norma.
 *
 * FRAMES MEDIDOS: voz clonada (`eleven_v3`), 80,54 s = 2417 f a 30 fps,
 * `generar-vo.sh` 2026-08-11 (v3). 13 líneas → 25 tomas por juntas de frase.
 *
 * B-ROLL (banco, gradado con la corrección MEDIDA por `bancos.py gradar`):
 *   · n01  vídeo aéreo de conjunto residencial — el sujeto, no el desastre
 *   · n06b foto de manos con recibos — «conservar facturas y soportes» literal
 *   · n12a foto de manos sobre un contrato — leer el certificado individual
 */
import { capa, dialectoEditorialDe } from "../../motor/noticias/dialecto";
import { LUXUR } from "../../marcas/luxur";

const { pon, col, gfx, plan, tras } = capa(dialectoEditorialDe(LUXUR), "noticia");

/** Media a sangre y velo entran quietos (regla `veloProtege`); las tarjetas
 *  de foto se animan solas (ENTRA_SOLA). El fundido va DENTRO de la pieza. */
const QUIETA = { como: "ninguna" } as const;

export const noticia007 = plan({ ancho: 1080, alto: 1920, fps: 30, duracion: 2417 }, [
  // ══ GANCHO ═══════════════════════════════════════════════════════════════
  // El hook, literal en la voz. En pantalla la condición va de kicker (es el
  // alcance, no el mensaje) y el mensaje en display: «así se reclama».
  gfx(
    "n01-gancho",
    "cine",
    "gancho",
    [0, 105],
    "hero",
    "El hook pedido, sin adorno: a quién le habla la pieza (hipotecados) y qué promete (la ruta). El aéreo pone el sujeto sin señalar ningún inmueble.",
    [
      pon("media", {
        src: "broll/007/n01-gancho-edificio-residencial-de-apartamentos.mp4",
        esVideo: true,
        sangre: true,
        grado: { exposicion: 1.25, saturacion: 1.125 },
        en: 0,
        entra: QUIETA,
      }),
      pon("velo", { en: 0, entra: QUIETA }),
      col(
        [
          // px 34: a los 44 por defecto estos 30 caracteres en versalitas con
          // tracking +4 miden ~900 px y el kicker partía en dos líneas.
          pon("kicker", { texto: "SI TU INMUEBLE ESTÁ HIPOTECADO", px: 34, color: "blanco" }),
          pon("titular", { rol: "hero", px: 84, color: "blanco", lineas: ["Así se reclama", "el seguro."] }),
        ],
        { gap: 20 }
      ),
    ],
    {
      ancla: { desde: "centro", pct: 0.5, cuelga: 560 / 1920 },
      sonido: "s01-abre",
    }
  ),

  // ══ CONTEXTO — primero la escala, después la norma ═══════════════════════
  gfx(
    "n02a-zonas",
    "papel",
    "contexto",
    [105, 188],
    "hero",
    "Prepara la cifra: sitúa dónde (las zonas golpeadas por el sismo) antes del cuánto. Los puntos suspensivos son la inhalación antes del dato.",
    [
      col([pon("titular", { rol: "hero", px: 72, lineas: ["En las zonas más", "golpeadas por el sismo…"] })], {
        gap: 20,
      }),
    ],
    { sonido: "s05-zonas" }
  ),

  // La cifra de Fasecolda: escala de SEGUROS, no del sismo (v2 quitó la
  // magnitud a propósito). 442 y «mil»: seis dígitos sin separador no se leen.
  gfx(
    "n02b-cifra",
    "cine",
    "contexto",
    [188, 311],
    "hero",
    "La escala del asunto en registro cine: 442 mil inmuebles asegurados en las zonas de alta afectación (Fasecolda). Es la razón de que esta pieza exista.",
    [
      col(
        [
          pon("kicker", { texto: "FASECOLDA", color: "blanco" }),
          pon("cifra", {
            id: "c442",
            rol: "hero",
            color: "blanco",
            px: 190,
            valor: 442,
            sufijo: " mil",
            dur: 30,
            golpe: true,
          }),
          pon("etiqueta", { texto: "inmuebles asegurados.", color: "blanco", en: tras("c442", 6) }),
        ],
        { gap: 16 }
      ),
    ],
    { sonido: "s06-cifra" }
  ),

  gfx(
    "n03a-amparo",
    "papel",
    "contexto",
    [311, 479],
    "hero",
    "La base de todo, después de la escala: el seguro no hay que contratarlo ahora, ya venía con el crédito. Atribuido a la norma (EOSF art. 101).",
    [
      col(
        [
          pon("kicker", { texto: "EOSF · ARTÍCULO 101" }),
          pon("titular", { id: "t3a", rol: "hero", px: 76, lineas: ["Asegurado contra", "incendio y terremoto."] }),
          pon("etiqueta", {
            texto: "En todo inmueble hipotecado con una entidad vigilada.",
            en: tras("t3a", 5),
          }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s03-amparo" }
  ),

  gfx(
    "n03b-obligatorio",
    "papel",
    "contexto",
    [479, 529],
    "hero",
    "El término exacto de la norma, aislado: es un amparo obligatorio, no un opcional que alguien pudo no marcar.",
    [col([pon("titular", { rol: "hero", px: 96, lineas: ["Un amparo", "obligatorio."] })], { gap: 20 })],
    { sonido: "s04-obligatorio" }
  ),

  // ══ CONFLICTO — la pregunta operativa ════════════════════════════════════
  gfx(
    "n04-pasos",
    "papel",
    "conflicto",
    [529, 605],
    "hero",
    "El pivote de la pieza: deja de describir y empieza el instructivo. Cinco pasos es una promesa de brevedad.",
    [
      col(
        [
          pon("kicker", { texto: "LA RECLAMACIÓN" }),
          pon("titular", { rol: "hero", px: 104, texto: "Cinco pasos." }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s07-pasos" }
  ),

  // ══ EXPLICACIÓN — los pasos 1 a 4 ════════════════════════════════════════
  gfx(
    "n05a-avisar",
    "papel",
    "explicacion",
    [605, 736],
    "hero",
    "Paso 1, y el error más común primero: el aviso va a la aseguradora, no al banco. Es el dato operativo que la gente confunde tras un siniestro.",
    [
      col(
        [
          pon("kicker", { texto: "PASO 1" }),
          pon("titular", { id: "t5a", rol: "hero", px: 68, lineas: ["Avisar a la aseguradora,", "no al banco."] }),
          pon("etiqueta", { texto: "A la que expidió la póliza del crédito.", en: tras("t5a", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s08-paso1" }
  ),

  gfx(
    "n05b-tres-dias",
    "papel",
    "explicacion",
    [736, 835],
    "hero",
    "El primer plazo, en toma propia: tres días desde conocer el daño. El artículo va en la etiqueta — la voz da la idea, la pantalla la referencia.",
    [
      col(
        [
          pon("titular", { id: "t5b", rol: "hero", px: 96, lineas: ["Tres días", "para avisar."] }),
          pon("etiqueta", {
            texto: "Desde que se conoce el daño · art. 1075 del Código de Comercio.",
            en: tras("t5b", 5),
          }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s09-tres-dias" }
  ),

  gfx(
    "n06a-documentar",
    "papel",
    "explicacion",
    [835, 907],
    "hero",
    "Paso 2: documentar. La recomendación es de Fasecolda para este mismo sismo; el obturador del cue es el gesto literal.",
    [
      col(
        [
          pon("kicker", { texto: "PASO 2" }),
          pon("titular", { rol: "hero", px: 84, lineas: ["Documentar con", "fotos y video."] }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s10-paso2" }
  ),

  gfx(
    "n06b-conservar",
    "papel",
    "explicacion",
    [907, 1041],
    "apoyo",
    "La mitad que se olvida del paso 2, con su objeto real: las facturas y soportes que sostienen la cuantía. Manos y recibos, sin rostro.",
    [
      pon("media", {
        src: "broll/007/n06b-conservar-hands-calculator-paying-bills-invoices-h.jpg",
        ancho: 640,
        alto: 700,
        grado: { saturacion: 0.85, calido: -0.022 },
        en: 2,
        entra: QUIETA,
      }),
      pon("titular", { rol: "hero", px: 62, en: 12, lineas: ["Conservar facturas", "y soportes."] }),
    ],
    { gap: 38, sonido: "s11-facturas" }
  ),

  gfx(
    "n07a-reparaciones",
    "papel",
    "explicacion",
    [1041, 1172],
    "hero",
    "Paso 3: no reparar en definitivo todavía. Reparar antes de la inspección puede borrar la prueba del daño — es el paso que protege al 1077.",
    [
      col(
        [
          pon("kicker", { texto: "PASO 3" }),
          pon("titular", { id: "t7a", rol: "hero", px: 84, lineas: ["Sin reparaciones", "definitivas."] }),
          pon("etiqueta", { texto: "Hasta recibir instrucciones de la aseguradora.", en: tras("t7a", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s12-paso3" }
  ),

  gfx(
    "n07b-salvo",
    "papel",
    "explicacion",
    [1172, 1266],
    "hero",
    "La excepción de Fasecolda, en toma propia para que no se lea como permiso general: la vida y evitar daños mayores van primero.",
    [
      col([pon("titular", { rol: "hero", px: 76, lineas: ["Salvo proteger la vida", "o evitar más daños."] })], {
        gap: 20,
      }),
    ],
    { sonido: "s13-salvo" }
  ),

  gfx(
    "n08a-reclamacion",
    "papel",
    "explicacion",
    [1266, 1405],
    "hero",
    "Paso 4: la reclamación formal exige dos cosas — el daño y su valor. Es el corazón procesal de la pieza.",
    [
      col(
        [
          pon("kicker", { texto: "PASO 4" }),
          pon("titular", { rol: "hero", px: 66, lineas: ["Presentar la reclamación:", "el daño y su valor."] }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s14-paso4" }
  ),

  gfx(
    "n08b-prueba",
    "papel",
    "explicacion",
    [1405, 1491],
    "hero",
    "A quién le toca probar, sin eufemismos: al asegurado (art. 1077). Saberlo evita esperar a que la aseguradora arme el expediente por uno.",
    [
      col(
        [
          pon("titular", { id: "t8b", rol: "hero", px: 92, lineas: ["La prueba es", "del asegurado."] }),
          pon("etiqueta", { texto: "Art. 1077 del Código de Comercio.", en: tras("t8b", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s15-prueba" }
  ),

  // ══ DATOS — los plazos que atan a la aseguradora ═════════════════════════
  gfx(
    "n09a-mes",
    "papel",
    "datos",
    [1491, 1595],
    "hero",
    "Paso 5 y el giro de poder: el reloj ahora corre contra la aseguradora. Un mes desde que se acredita el derecho (art. 1080).",
    [
      col(
        [
          pon("kicker", { texto: "PASO 5" }),
          pon("titular", { id: "t9a", rol: "hero", px: 100, lineas: ["Un mes", "para pagar."] }),
          pon("etiqueta", { texto: "Desde que se acredita el derecho · art. 1080.", en: tras("t9a", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s16-paso5" }
  ),

  gfx(
    "n09b-mora",
    "papel",
    "datos",
    [1595, 1680],
    "hero",
    "Qué pasa si se pasan del mes: mora automática. La tasa exacta va en la etiqueta porque es el dato que convierte el plazo en amenaza real.",
    [
      col(
        [
          pon("titular", { id: "t9b", rol: "hero", px: 80, lineas: ["Demorarse cuesta:", "intereses de mora."] }),
          pon("etiqueta", { texto: "Interés bancario corriente aumentado en la mitad.", en: tras("t9b", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s17-mora" }
  ),

  gfx(
    "n10a-saldo",
    "papel",
    "datos",
    [1680, 1788],
    "hero",
    "A dónde va la plata: primero al banco, hasta el saldo. Con el término textual citado en la etiqueta — jerga fuera de la voz, dentro del gráfico.",
    [
      col(
        [
          pon("kicker", { texto: "CUANDO PAGAN" }),
          pon("titular", { id: "t10a", rol: "hero", px: 72, lineas: ["El banco cobra primero,", "hasta el saldo."] }),
          pon("etiqueta", { texto: "Figura como beneficiario «a título oneroso».", en: tras("t10a", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s18-saldo" }
  ),

  gfx(
    "n10b-excedente",
    "papel",
    "datos",
    [1788, 1857],
    "hero",
    "La mitad que nadie cuenta: el excedente es del propietario. Aterriza con pop neutro — buena noticia sin fanfarria sobre un desastre.",
    [col([pon("titular", { rol: "hero", px: 88, lineas: ["El excedente es", "del propietario."] })], { gap: 20 })],
    { sonido: "s19-excedente" }
  ),

  // ══ CLÍMAX — si no responden, y la letra pequeña ═════════════════════════
  gfx(
    "n11a-objetan",
    "papel",
    "climax",
    [1857, 1894],
    "hero",
    "La pregunta que todos se hacen al final del mes: ¿y si no pagan? Abre el bloque de remedios.",
    [col([pon("titular", { rol: "hero", px: 88, texto: "¿Objetan o callan?" })], { gap: 20 })],
    { sonido: "s20-objetan" }
  ),

  gfx(
    "n11b-defensor",
    "papel",
    "climax",
    [1894, 2044],
    "hero",
    "El remedio gratuito primero (criterio del clímax que BAJA la tensión): defensor por Ley 1328, y la Superintendencia detrás.",
    [
      col(
        [
          pon("kicker", { texto: "GRATUITO · LEY 1328 DE 2009" }),
          pon("titular", { id: "t11b", rol: "hero", px: 68, lineas: ["Defensor del Consumidor", "Financiero."] }),
          pon("etiqueta", { texto: "Y la queja ante la Superintendencia Financiera.", en: tras("t11b", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s21-defensor" }
  ),

  // El único golpe grave del cuerpo: el reloj que sí puede quitarle el derecho.
  gfx(
    "n11c-prescribe",
    "papel",
    "climax",
    [2044, 2113],
    "hero",
    "La advertencia que justifica no dormirse: la acción prescribe. Es el único dato de la pieza que puede costar el derecho entero — lleva el golpe grave.",
    [
      col(
        [
          pon("titular", { id: "t11c", rol: "hero", px: 84, lineas: ["La acción prescribe", "en dos años."] }),
          pon("etiqueta", { texto: "Prescripción ordinaria · art. 1081.", en: tras("t11c", 5) }),
        ],
        { gap: 20 }
      ),
    ],
    { sonido: "s22-prescribe" }
  ),

  gfx(
    "n12a-certificado",
    "papel",
    "climax",
    [2113, 2266],
    "apoyo",
    "Dónde está la letra pequeña de TU caso, con el gesto real: manos sobre el contrato, el dedo en la cláusula. Sin rostros.",
    [
      pon("media", {
        src: "broll/007/n12a-certificado-hands-reading-insurance-policy-contract-.jpg",
        ancho: 640,
        alto: 700,
        grado: { exposicion: 0.968 },
        en: 2,
        entra: QUIETA,
      }),
      pon("titular", { id: "t12a", rol: "hero", px: 62, en: 12, texto: "El certificado individual." }),
      pon("etiqueta", { texto: "Deducibles, exclusiones y suma asegurada.", en: tras("t12a", 5) }),
    ],
    { gap: 38, sonido: "s23-certificado" }
  ),

  gfx(
    "n12b-copia",
    "papel",
    "climax",
    [2266, 2312],
    "hero",
    "Lo único accionable del bloque: la copia se puede pedir. Dato de la fuente, no consejo nuestro.",
    [col([pon("titular", { rol: "hero", px: 96, lineas: ["Se puede", "pedir copia."] })], { gap: 20 })],
    { sonido: "s24-copia" }
  ),

  // ══ CIERRE ═══════════════════════════════════════════════════════════════
  // EN SILENCIO (como el n11b del 006): la tesis se separa mejor sin efecto.
  gfx(
    "n13a-ruta",
    "cine",
    "cierre",
    [2312, 2363],
    "hero",
    "La tesis, en negro y en silencio: la ruta ya está escrita. Nada que vender — es la ley, no el canal.",
    [col([pon("titular", { rol: "hero", px: 96, color: "blanco", lineas: ["La ruta ya", "está escrita."] })], { gap: 24 })]
  ),

  gfx(
    "n13b-poliza",
    "cine",
    "cierre",
    [2363, 2417],
    "hero",
    "El remate manda a la única fuente que responde por cada caso, en el tuteo del hook. Sin CTA de marca.",
    [col([pon("titular", { rol: "hero", px: 104, color: "blanco", texto: "Tu póliza." })], { gap: 24 })],
    { sonido: "s25-cierre" }
  ),
]);
