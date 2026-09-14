/**
 * SUBTÍTULOS BILINGÜES — proyecto 010. Español arriba, inglés debajo.
 *
 * LOS TIEMPOS SALEN DE LA TRANSCRIPCIÓN POR PALABRA, no de estimar a ojo:
 * `proyectos/010/vo/transcripcion-palabras.json` (whisper.cpp `-ml 1`). Cada
 * `from`/`to` es el arranque real de una palabra concreta, y por eso los cortes
 * caen en números feos como 17,33 o 40,77. Un subtítulo que entra 150 ms tarde
 * no se lee como retraso: se lee como que el vídeo va mal.
 *
 * DOS TRAMOS NO LLEVAN SUBTÍTULO Y ES A PROPÓSITO — el gancho (0–5,86) y el
 * cierre (64,30–final). En los dos, el encargo pide un RÓTULO grande con esas
 * mismas palabras (`Rotulos010`). Poner el rótulo y además el subtítulo sería
 * escribir la misma frase dos veces en la misma pantalla.
 *
 * LA TRADUCCIÓN ES DE SENTIDO. «granito de arena» no es *grain of sand* para un
 * angloparlante —es *doing our part*—; «mercados» aquí no es *markets* sino
 * *food supplies*; «acción comunal» es la junta de vecinos, *community council*.
 * Traducir palabra por palabra habría sonado a máquina justo en la pieza cuyo
 * único argumento es que la escribió una persona.
 *
 * `destaca` — palabras en ámbar. CUATRO en 74 s, y el encargo dice «discretamente».
 * Va sobre la palabra que carga la frase, nunca sobre el sustantivo obvio: en
 * «reconstruyendo sus hogares» el ámbar está en *reconstruyendo*, porque lo que
 * duele es el gerundio (todavía, ahora, mientras tú ves esto), no la casa.
 */
export interface Cue {
  /** Segundos. */
  from: number;
  to: number;
  es: string;
  en: string;
  /** Palabras del español que van en ámbar (coincidencia exacta, sin signos). */
  destaca?: readonly string[];
}

export const subtitulos010: readonly Cue[] = [
  /* ── LA AYUDA LLEGÓ ── */
  { from: 5.86, to: 10.13, es: "Las ayudas llegaron a comunidades apartadas del Chocó.", en: "The aid reached remote communities in Chocó." },
  { from: 10.13, to: 12.41, es: "Varias chalupas vinieron a recoger mercados,", en: "Riverboats came to pick up food," },
  { from: 12.41, to: 14.88, es: "medicina y elementos esenciales,", en: "medicine and essential supplies," },

  /* ── EL VIAJE ── */
  { from: 14.88, to: 17.33, es: "para llevarlo hasta las familias", en: "to carry it to the families" },
  { from: 17.33, to: 19.99, es: "que difícilmente les llega ayuda.", en: "that aid almost never reaches." },

  /* ── LOS NIÑOS ── */
  { from: 19.99, to: 21.82, es: "También entregamos juguetes a los niños,", en: "We also brought toys to the children,", destaca: ["juguetes"] },
  { from: 21.82, to: 24.62, es: "y verlos sonreír, aunque fuera por un momento,", en: "and seeing them smile, even for a moment," },
  { from: 24.62, to: 27.84, es: "nos recordó que valió la pena cada esfuerzo.", en: "reminded us that every effort was worth it." },

  /* ── GRACIAS ──
   * NOMBRES CONFIRMADOS POR EL CLIENTE (2026-09-07). Whisper oía «monpapitas» y
   * «miloji»; los tres se escriben ahora «Juan Papitas» (lo respalda además el
   * jersey que sale en `c14`), **«Milo G»** (corregido por el cliente: mi
   * lectura era «Mi Loji» y no tenía nada que la respaldase) y «Street Cats»
   * (confirmado contra el proyecto 009, @streetcats.food). */
  { from: 27.84, to: 29.33, es: "Gracias a cada persona que donó,", en: "Thank you to everyone who donated," },
  { from: 29.33, to: 30.6, es: "a cada voluntario,", en: "to every volunteer," },
  { from: 30.6, to: 32.97, es: "a Juan Papitas, Milo G, Street Cats,", en: "to Juan Papitas, Milo G, Street Cats," },
  { from: 32.97, to: 35.05, es: "a la Acción Comunal de Santa Lucía,", en: "to the Santa Lucía community council," },
  { from: 35.05, to: 38.49, es: "a nuestros amigos en México, Costa Rica y Estados Unidos,", en: "to our friends in Mexico, Costa Rica and the United States," },
  { from: 38.49, to: 40.77, es: "también a Paloma, a Morgan y a Donovan,", en: "and also to Paloma, Morgan and Donovan," },
  { from: 40.77, to: 43.22, es: "y especialmente a nuestras familias.", en: "and especially to our families." },

  /* ── NO TERMINA ── */
  { from: 43.22, to: 44.66, es: "Pero esto no termina aquí.", en: "But this doesn't end here." },
  { from: 44.66, to: 47.0, es: "Mientras muchos ya vivimos nuestra rutina,", en: "While many of us are back to our routine," },
  { from: 47.0, to: 49.8, es: "hay familias que todavía están reconstruyendo sus hogares", en: "there are families still rebuilding their homes", destaca: ["reconstruyendo"] },
  { from: 49.8, to: 51.83, es: "y esperando soluciones.", en: "and still waiting for answers." },
  { from: 51.83, to: 53.54, es: "No podemos olvidarlos.", en: "We can't forget them.", destaca: ["olvidarlos"] },

  /* ── PUEBLO UNIDO ── */
  { from: 53.54, to: 55.34, es: "Si apartamos nuestras diferencias,", en: "If we set our differences aside," },
  { from: 55.34, to: 56.84, es: "podemos ser un pueblo unido,", en: "we can be one people,", destaca: ["unido"] },
  { from: 56.84, to: 59.1, es: "una nación que respire solidaridad,", en: "a nation that breathes solidarity," },
  { from: 59.1, to: 60.66, es: "amor y esperanza.", en: "love and hope." },
  { from: 60.66, to: 62.2, es: "Y bajo la guía de Dios,", en: "And with God's guidance," },
  { from: 62.2, to: 64.3, es: "vamos a salir adelante.", en: "we will come through this." },
];

/** Rótulo grande: los dos momentos en que el texto ES la escena, más la franja alta. */
export interface Rotulo {
  from: number;
  to: number;
  es: string;
  en: string;
  /**
   * `abajo` comparte ancla con los subtítulos · `arriba` va en la franja alta ·
   * `centro` se centra verticalmente en el cuadro.
   *
   * `centro` es solo del GANCHO, y rompe a propósito la regla de «todo el texto
   * comparte una línea de base» que sostiene el resto de la pieza (02-layout).
   * Puede permitírselo porque en esos 5,86 s **no hay nada más en pantalla**: no
   * hay subtítulo debajo con el que alinearse, así que no hay salto que evitar
   * — y un titular de apertura centrado se lee como portada, no como pie.
   */
  donde: "abajo" | "arriba" | "centro";
  /** `gancho` y `cierre` son display; `nota` es la franja discreta. */
  tono: "gancho" | "cierre" | "nota";
  /**
   * Segundos de fundido de SALIDA. Defecto 0,3.
   *
   * El último rótulo lo pone a 0 y no es un detalle: con la salida por defecto,
   * el fotograma final llegaba con el texto al 10 % de opacidad —o sea, la
   * pantalla que el encargo pide «mantener aproximadamente 2 segundos» se
   * apagaba justo mientras se mantenía—. No se ve en ningún frame intermedio:
   * solo en el último, que es el que nadie renderiza para revisar.
   */
  salida?: number;
  /**
   * Segundos de fundido de ENTRADA. Defecto 0,35.
   *
   * El gancho lo pone a 0: tiene que estar **desde el primer fotograma**. Con
   * los 0,35 por defecto, la portada del vídeo —el frame que el feed usa como
   * miniatura y lo primero que ve alguien que hace scroll— salía con el titular
   * a opacidad 0. Medio segundo de nada en un formato donde el primer segundo
   * lo decide todo.
   */
  entrada?: number;
}

export const rotulos010: readonly Rotulo[] = [
  {
    from: 0,
    to: 5.86,
    es: "LLEGAMOS DONDE SOLO SE PODÍA LLEGAR POR RÍO",
    en: "WE REACHED COMMUNITIES ONLY ACCESSIBLE BY RIVER",
    donde: "centro",
    tono: "gancho",
    entrada: 0,
  },
  {
    // Franja ALTA para no chocar con el subtítulo de los agradecimientos, que
    // en este tramo está ocupado listando países.
    from: 35.05,
    to: 38.49,
    es: "ESTO LO HICIMOS ENTRE TODOS ❤️",
    en: "WE DID THIS TOGETHER",
    donde: "arriba",
    tono: "nota",
  },
  {
    from: 64.3,
    to: 70.22,
    es: "QUE LA AYUDA NO TERMINE\nCUANDO TERMINA LA NOTICIA",
    en: "LET THE HELP CONTINUE\nEVEN AFTER THE HEADLINES FADE",
    donde: "abajo",
    tono: "cierre",
  },
  {
    // Releva al anterior sobre la MISMA imagen (`c30`, el río del principio) y
    // se queda hasta el final: son los ~2 s de pantalla limpia del encargo.
    from: 70.22,
    to: 74.47,
    es: "Sigamos siendo ese granito de arena ❤️",
    en: "Let's keep doing our part",
    donde: "abajo",
    tono: "cierre",
    salida: 0,
  },
];
