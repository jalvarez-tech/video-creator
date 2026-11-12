/**
 * LOS HUECOS DE LA VOZ EN OFF DEL 069 — dónde va cada locución, como DATOS.
 *
 * La voz en off de John y de Isabella está PENDIENTE de grabarse. Hasta que lleguen, la pieza se monta con estos huecos reservados: cada uno dice quién habla, qué dice
 * (el guion de ellos, palabra por palabra) y en qué frames cabe. El montaje (`metraje-069.ts`) ya está cortado alrededor de ellos.
 *
 * CÓMO SE LLENA UN HUECO. John e Isabella graban cada frase por separado y dejan el archivo en `proyectos/069/voz/` con el id del hueco como nombre (`john-1.wav`,
 * `isabella-1.wav`, `john-2.wav`, `john-3.wav`, `isabella-2.wav`; wav, mp3 o m4a). Luego `node proyectos/069/normalizar.mjs --voz` los pasa a WAV de 48 kHz, los lleva a
 * −15 LUFS con limitador, los copia a `public/` y escribe `voces-069.ts` con la duración medida de cada uno. `audio-069.ts` coloca cada locución en el `en` de su hueco y la puerta
 * (`revisar-069.mjs`) comprueba que CABE: que dura menos que su hueco y que no pisa a la siguiente. Con una locución que no cabe, se mueve el corte del plano que la acompaña (no la voz).
 *
 * REVISIÓN 3 (2026-10-28): con la canción nueva («Softly») y el final de fuego, los huecos se recolocaron otra vez. `john-1` cubre las fotos felices y el incendio (la subida de 7,6 dB cae en el f181,
 * hacia «Y hoy…»), `isabella-1` y `john-2` caen en la escena 3 (20,1 s de plano: 6,1 s del lugar como era y como quedó + 14 s de «lo que el fuego no puede destruir») y `john-3` e `isabella-2` en la 5 (12,6 s,
 * los costales, el fuego y el arco); los dos MOV traen su propia voz y no tienen hueco. Los huecos son la ESTIMACIÓN de una lectura natural (≈ 14-15 caracteres por segundo): se afinan con las voces reales.
 *
 * QUÉ SON `en` Y `hasta`. Frames de la composición (30 fps). Una locución empieza a sonar en `en` y su silencio final puede llegar a `hasta`. Los números salen de una lectura
 * natural a ≈ 14-15 caracteres por segundo con una respiración entre frases: son una ESTIMACIÓN y se afinan con las voces reales. Lo que NO se afina es el reparto por escenas
 * (la escena 2 y la 4 son las tomas de ellos hablando a cámara, con su propia voz).
 *
 * `corteDeTono` es el frame de imagen que SE PEGA a una palabra de la locución (el corte de la felicidad al incendio cae en «Y hoy…»; la foto de la ceremonia, en «el amor que nació aquí»):
 * con la voz real se mueve ese plano a su palabra y se mide con `transcribir.mjs --palabras`.
 *
 * Datos puros: solo tipos. La puerta lo carga con node.
 */

export const FPS_VOZ = 30;

export interface HuecoVoz {
  /** El nombre del archivo que se espera en `proyectos/069/voz/` (sin extensión). */
  id: string;
  quien: "John" | "Isabella";
  /** Qué dice, tal como está en el guion de ellos (con «Botswana» como lo escribe el letrero del lugar). */
  texto: string;
  /** Escena del guion a la que pertenece. */
  escena: 1 | 3 | 5;
  /** Frame de la composición en el que empieza a sonar. */
  en: number;
  /** Último frame en el que puede seguir sonando antes de pisar el hueco siguiente o el cambio de escena. */
  hasta: number;
  /** Qué plano de imagen se pega a una palabra de esta locución, y a cuál. Solo para leer el plan y para afinarlo con la voz real. */
  pega?: { corte: string; palabra: string };
}

export const HUECOS_VOZ: readonly HuecoVoz[] = [
  {
    id: "john-1",
    quien: "John",
    escena: 1,
    texto: "En este lugar vivimos uno de los momentos más felices de nuestra vida… Y hoy, verlo así, nos parte el corazón.",
    en: 6,
    hasta: 305,
    pega: { corte: "c03-incendio-palapa", palabra: "Y hoy" },
  },
  {
    id: "isabella-1",
    quien: "Isabella",
    escena: 3,
    texto: "Hoy, nuestro amigo Nelson está viviendo uno de los momentos más difíciles de su vida.",
    en: 590,
    hasta: 815,
  },
  {
    id: "john-2",
    quien: "John",
    escena: 3,
    texto: "Pero hay algo que el fuego jamás podrá destruir: el amor que nació aquí, las familias que unió y los recuerdos que llevamos en el corazón.",
    en: 825,
    hasta: 1170,
    pega: { corte: "c11-ceremonia", palabra: "el amor que nació aquí" },
  },
  {
    id: "john-3",
    quien: "John",
    escena: 5,
    texto: "Hoy queremos unir nuestros corazones para ayudar a Nelson a reconstruir este sueño.",
    en: 1445,
    hasta: 1615,
  },
  {
    id: "isabella-2",
    quien: "Isabella",
    escena: 5,
    texto: "Porque Botswana merece seguir siendo el lugar donde muchas familias comiencen su historia.",
    en: 1625,
    hasta: 1808,
  },
];
