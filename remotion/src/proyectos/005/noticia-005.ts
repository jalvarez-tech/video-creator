import { toma, type TomaNoticia } from "../../motor/noticias/plan";

/**
 * PROYECTO 005 — «Firmaste la escritura. Todavía no eres el dueño.»
 * Disparador: Ciencuadras · Redacción · 2026-07-14
 * Plan y fuentes verificadas: proyectos/005/artefactos/01-noticia.md
 *
 * LA CREENCIA QUE MUEVE: la gente cree que al firmar la escritura en la notaría
 * ya es dueña. No lo es. La notaría da fe de la firma; la propiedad la transfiere
 * la INSCRIPCIÓN en la Oficina de Registro (Código Civil, art. 756). Mientras no
 * se registre, ante terceros el dueño sigue siendo el vendedor — y puede volver
 * a vender el mismo inmueble.
 *
 * EL MECANISMO que no está en el artículo: la escritura es el TÍTULO y la
 * inscripción es el MODO. Sin modo no hay transferencia. Eso es lo que justifica
 * que exista este vídeo y no un titular.
 *
 * ⚠️ EL ARTÍCULO NO SOSTIENE LAS CIFRAS. Es una guía de servicio sin datos duros
 * (su «6 min» es tiempo de lectura). Todo número de aquí sale de la NORMA:
 *   · art. 756 Código Civil        → la inscripción es lo que transfiere
 *   · art. 231 Ley 223 de 1995     → 2 meses en el país, 3 en el exterior
 *   · art. 231 Ley 223 de 1995     → extemporaneidad ⇒ intereses moratorios
 *   · art. 230 Ley 223 de 1995     → impuesto de registro 0,5 %–1 %
 * Costes en pesos y recargos «del 50 al 200 %» NO entran: no se pudieron
 * verificar en la fuente oficial (ver §Fuentes del artefacto).
 *
 * COMP: 1080×1920 · 30 fps · 1911 f (63,6 s).
 *
 * ⚠️ FRAMES MEDIDOS, NO ESTIMADOS. Cada ventana sale de la duración REAL de su
 * línea, locutada con la voz clonada (ElevenLabs, `John Stevans v 0.1`):
 *   python3 manuales/edicion-video/scripts/elevenlabs.py guion \
 *           proyectos/005/guion-vo.txt --salida proyectos/005/vo/partes
 *   bash manuales/video-noticias/scripts/generar-vo.sh proyectos/005/guion-vo.txt \
 *        --motor elevenlabs --partes proyectos/005/vo/partes --fps 30
 * Si cambias el guion, vuelve a correrlo (solo se refactura lo que cambió) y pega
 * la tabla aquí: NO ajustes estos números a mano.
 */
export const noticia005: TomaNoticia[] = [
  // ══ GANCHO ═════════════════════════════════════════════════════════════════
  // Sobre NEGRO y en seco. El desmentido necesita el contraste con todo lo que
  // viene después (papel): primero se te cae la creencia, luego te explican.
  toma(
    "n01-firmaste",
    "titular",
    "gancho",
    [0, 130],
    {
      registro: "cine",
      kicker: "Colombia · compraventa de vivienda",
      titular: "Firmaste la escritura. Todavía no eres el dueño.",
      soundCueId: "s01-golpe",
    },
    "Contradice el momento que todo el mundo vive como «ya es mío»: la firma ante notario"
  ),

  // ══ CONTEXTO ═══════════════════════════════════════════════════════════════
  // Dos tomas y no una: la afirmación y su límite necesitan el CORTE entre medias.
  // Juntas se leerían como un matiz; separadas, la segunda desmiente a la primera.
  toma(
    "n02-notaria",
    "titular",
    "contexto",
    [130, 205],
    { titular: "La notaría da fe de que firmaste.", soundCueId: "s02-entra" },
    "Concede lo que la notaría SÍ hace, para que el desmentido siguiente no suene a bulo"
  ),
  toma(
    "n03-no-basta",
    "titular",
    "contexto",
    [205, 289],
    { titular: "Pero la propiedad no la transfiere una firma.", soundCueId: "s03-corte" },
    "El límite exacto de lo que hace la notaría: es la frase que abre el hueco que explica el vídeo"
  ),

  // ══ EXPLICACIÓN ════════════════════════════════════════════════════════════
  // El mecanismo. Tres frases cortas antes de la norma: primero se entiende, luego
  // se prueba. Al revés, el artículo suena a burocracia y se pierde al espectador.
  toma(
    "n04-registro",
    "titular",
    "explicacion",
    [289, 351],
    { titular: "La transfiere el registro.", etiqueta: "el giro de la pieza", soundCueId: "s04-giro" },
    "La respuesta en cuatro palabras, sola en pantalla: es el punto de inflexión del vídeo"
  ),
  toma(
    "n05-articulo",
    "prensa",
    "explicacion",
    [351, 498],
    {
      titular: "Artículo 756 del Código Civil",
      kicker: "Código Civil de Colombia",
      soundCueId: "s05-papel",
    },
    "La prueba documental: el formato vende credibilidad y aquí es donde se paga"
  ),
  toma(
    "n06-tradicion",
    "prensa",
    "explicacion",
    [498, 670],
    {
      titular: "La propiedad se traspasa inscribiendo el título en la Oficina de Registro",
      kicker: "art. 756 · Código Civil",
      // El rotulador cae sobre el VERBO, que es donde está el mecanismo.
      // `revisaNoticia` comprueba que este fragmento aparezca en el titular.
      resaltar: "inscribiendo el título",
      soundCueId: "s06-rotulador",
    },
    "Subraya el mecanismo (título vs modo), que es lo único que el artículo de prensa no explica"
  ),

  // ══ CONFLICTO ══════════════════════════════════════════════════════════════
  toma(
    "n07-dos-oficinas",
    "comparador",
    "conflicto",
    [670, 842],
    {
      titular: "Dos oficinas distintas",
      // Una palabra por chip: `ChipIcono` no parte líneas (un \n sale como
      // espacio y se lee «Notaría firmas»). El matiz lo pone la voz y la
      // etiqueta de abajo, no la etiqueta del chip.
      items: [
        { label: "Notaría", glifo: "manos" },
        { label: "Registro", glifo: "edificio" },
      ],
      etiqueta: "y solo una te hace propietario",
      soundCueId: "s07-chips",
    },
    "Materializa la separación en dos objetos: es más rápido de entender que cualquier frase"
  ),

  // ══ CLÍMAX ═════════════════════════════════════════════════════════════════
  // Lo que está en juego. La segunda toma es corta a propósito: el golpe se da y
  // se corta, sin dejar que el espectador lo racionalice.
  toma(
    "n08-sigue-siendo",
    "titular",
    "climax",
    [842, 983],
    {
      titular: "Ante terceros, el dueño sigue siendo quien te vendió.",
      kicker: "mientras no registres",
      soundCueId: "s08-riser",
    },
    "Traduce la norma a la consecuencia personal: de dato jurídico pasa a riesgo propio"
  ),
  toma(
    "n09-puede-vender",
    "titular",
    "climax",
    [983, 1052],
    { titular: "Y puede volver a vender el mismo inmueble.", soundCueId: "s09-impacto" },
    "El peor escenario, en una frase y sin adornos: es lo que hace que el vídeo se comparta"
  ),

  // ══ DATOS ══════════════════════════════════════════════════════════════════
  // Las cifras entran DESPUÉS del miedo, no antes: sin el clímax son trámites.
  toma(
    "n10-dos-meses",
    "cifra",
    "datos",
    [1052, 1179],
    {
      valor: 2,
      sufijo: " meses",
      kicker: "plazo para registrar",
      etiqueta: "si la escritura se otorgó en Colombia",
      soundCueId: "s10-dato",
    },
    "El plazo es la primera acción con fecha: convierte el susto en algo que se puede hacer"
  ),
  toma(
    "n11-exterior",
    "cifra",
    "datos",
    [1179, 1257],
    {
      valor: 3,
      sufijo: " meses",
      kicker: "si se otorgó en el exterior",
      soundCueId: "s11-tick",
    },
    "El caso del que compra desde fuera; cabe en dos segundos y evita una duda frecuente"
  ),
  toma(
    "n12-cuanto",
    "medidor",
    "datos",
    [1257, 1434],
    {
      titular: "Impuesto de registro",
      medidas: [
        { label: "mínimo departamental", de: 0, a: 0.5, max: 1, sufijo: " %", decimales: 1 },
        { label: "máximo departamental", de: 0, a: 1, max: 1, sufijo: " %", decimales: 1 },
      ],
      soundCueId: "s12-medidor",
    },
    "Lo que cuesta, como horquilla real: el decimal ES el dato (0,5 redondeado a 1 duplica la cifra)"
  ),
  toma(
    "n13-mora",
    "titular",
    "datos",
    [1434, 1542],
    { titular: "Pasado el plazo, la escritura se sigue pudiendo registrar." },
    "Desactiva el pánico antes de dar la penalización: sin esto, el que ya se pasó deja de ver"
  ),
  toma(
    "n14-intereses",
    "titular",
    "datos",
    [1542, 1650],
    {
      titular: "Pero con intereses de mora por cada mes de retraso.",
      etiqueta: "art. 231 · Ley 223 de 1995",
      soundCueId: "s14-tick",
    },
    "La penalización exacta que sí se pudo verificar en la norma (los recargos del 50-200 % no)"
  ),

  // ══ CIERRE ═════════════════════════════════════════════════════════════════
  toma(
    "n15-pide",
    "titular",
    "cierre",
    [1650, 1790],
    {
      titular: "Pide tu certificado de tradición y libertad.",
      kicker: "antes de vender",
      soundCueId: "s15-accion",
    },
    "La única acción concreta del vídeo, y es gratis de decir: sin ella la pieza solo asusta"
  ),
  toma(
    "n16-cierre",
    "cierre",
    "cierre",
    [1790, 1911],
    {
      registro: "cine",
      titular: "Si tu escritura no está ahí,\nno has vendido nada.",
      etiqueta: "Propiedades Luxur",
      soundCueId: "s16-cierre",
    },
    "Cierra volviendo al negro del gancho y remata con la prueba: el certificado como veredicto"
  ),
];
