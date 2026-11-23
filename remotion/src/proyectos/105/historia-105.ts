/**
 * HISTORIA 105 — «En últimas noticias» (9:16, MAS Estrellitas 2026): el vídeo vertical LARGO de la serie (≈ 54 s), con
 * «Yeshua» (Versión Piano), la pista que sobró al repartir las de los vídeos 16:9 entre 102-104. Plan:
 * `proyectos/105/artefactos/` (la serie, en `proyectos/101/artefactos/`).
 *
 * REV. 2 (2026-11-23, pedido del usuario: «en el último utiliza tomas que no había en los anteriores»): SOLO tomas que
 * no salen en ninguno de los vídeos de MAS (097-104); la puerta lo comprueba (`revisar-historias.mjs`, regla 2). La rev. 1
 * («Preguntas a las niñas») repetía VT06, VT07, HZ17, HZ01, HZ05, HZ06, VT13, DR05, HZ08 y HZ32.
 *
 * Las niñas hacen de reporteras y entrevistadoras, y el vídeo va de lo que juegan a lo que creen y vuelve a la alegría:
 * la reportera en selfi («Hola, en últimas noticias: un lugar maravilloso») → la bienvenida en la puerta → «el club de
 * hablar y de resolver problemas» → la entrevista del banco (mascota → conejo; ave → colibrí) → el regalo («La Navidad»)
 * → la cualidad más bonita de Dios (otra toma: «La palabra de Dios», «Bondadoso», «Un Dios inmortal») → la que pregunta
 * responde a cámara («un Dios de oportunidades», en el tramo más tranquilo de la pieza) → el lema al pie del tobogán →
 * «¡Feliz Navidad para todos!» → el grupo entero saluda al dron → el papel.
 *
 * Los horizontales van en la franja 9:16 de quien HABLA (`proyectos/101/normalizar.mjs`: hz04a/b/c…); los verticales,
 * enteros. Los cortes caen en valles de energía medidos (tramos de 40 ms, 2026-11-23).
 */
import type { Historia } from "../101/historia";
import { audioDeHistoria } from "../101/historia";
import { VOCES_105 } from "./voces-105";

const DJI = 1000 / 1001;
const CIERRE = 1446;

export const HISTORIA_105: Historia = {
  numero: "105",
  composicion: "Historia105",
  titulo: "En últimas noticias",
  duracion: CIERRE + 180,
  cierre: CIERRE,
  cortes: [
    // ── Las reporteras (f0-405) ──
    { id: "p01-hz22", src: "mas-101/hz22.mp4", desde: 0.4, en: 0, dur: 107, zoom: [1, 1.03], reason: "El gancho: la reportera en selfi con la casa detrás, «Hola, en últimas noticias: un lugar maravilloso» (0,56-3,96 s), con la franja que la sigue; sale antes del latigazo de cámara (≈ 4 s)" },
    { id: "p02-vt21", src: "mas-101/vt21.mp4", desde: 0.07, en: 107, dur: 103, zoom: [1, 1.04], reason: "Las dos de la puerta posan y salen corriendo hacia cámara: «¡Bienvenidos…!» (2,44-3,40 s)" },
    { id: "p03-vt29", src: "mas-101/vt29.mp4", desde: 31.1, en: 210, dur: 195, zoom: [1, 1.04], reason: "La reportera del micro de botón ante el corro: «…aquí es el club de hablar y de resolver problemas» (31,3-37,3 s, cámara casi fija). De 10,5 a 17 s la toma enseña a un adulto: no entra" },
    // ── La entrevista del banco (f405-765): la misma toma, sin lo que no se entiende ──
    { id: "p04-vt18", src: "mas-101/vt18.mp4", desde: 26.3, en: 405, dur: 117, zoom: [1, 1.03], reason: "La de trenzas pregunta «Si tendrías una mascota, ¿cuál tendrías?…» y sale de cuadro a 30,2 s (de 30,4 a 32 la cámara se queda en la mesa y alguien cruza delante: no entra)" },
    { id: "p05-vt18", src: "mas-101/vt18.mp4", desde: 32.05, en: 522, dur: 177, zoom: [1.02, 1.06], reason: "DE CORRIDO: la otra escucha el final de la pregunta («…cualquier animal», la voz sigue de 30,2 a 32,4), «¡Un conejo!» (34,36-35,72 s, ya en sincronía: f588 = 34,25 s), el barrido de vuelta (36,0-36,3) y «Si tendrías un ave, ¿cuál tendrías?» (36,24-37,76)" },
    { id: "p06-vt18", src: "mas-101/vt18.mp4", desde: 44.25, en: 699, dur: 66, zoom: [1.02, 1.05], reason: "«Un colibrí» (44,36-46,20 s): fuera los 5 s sin entender de en medio" },
    // ── El regalo y la cualidad más bonita de Dios (f765-1189) ──
    { id: "p07-vt03", src: "mas-101/vt03.mp4", desde: 0, en: 765, dur: 127, zoom: [1, 1.04], reason: "Otra toma de la pregunta del regalo (no la de la 102): «¿Qué es lo más bonito de recibir un regalo?» → «La Navidad.» (3,36-4,0 s); sale antes del «¿Por qué?»" },
    { id: "p08-hz04a", src: "mas-101/hz04a.mp4", desde: 0, en: 892, dur: 106, zoom: [1, 1.04], reason: "Otra toma de la pregunta de la cualidad (no la de 097-105 rev. 1): «¿Cuál es la cualidad más bonita de Dios?» (0,12-1,96 s) → «La palabra de Dios.» (2,04-3,24 s); las dos caben en la franja" },
    { id: "p09-hz04b", src: "mas-101/hz04b.mp4", desde: 7.55, en: 998, dur: 42, zoom: [1, 1.03], reason: "«¡Bondadoso!» (7,76-8,72 s)" },
    { id: "p10-hz04c", src: "mas-101/hz04c.mp4", desde: 11.0, en: 1040, dur: 66, zoom: [1, 1.03], reason: "La pequeña de dos coletas: «¡Un Dios inmortal!» (11,2-13,04 s)" },
    { id: "p11-hz07", src: "mas-101/hz07.mp4", desde: 0.12, en: 1106, dur: 83, zoom: [1, 1.05], reason: "La que pregunta responde a cámara: «Y para mí es un Dios de oportunidades» (0,2-2,84 s). Se corta en el valle de 2,88 s, ANTES de «porque me dio oportunidad en la pobreza» (097 §6-§7: sensible)" },
    // ── La alegría y la despedida (f1189-1446) ──
    { id: "p12-hz09", src: "mas-101/hz09.mp4", desde: 0.75, en: 1189, dur: 81, zoom: [1, 1.04], reason: "Las dos al pie del tobogán azul, a coro: el lema (0,96-3,20 s)" },
    { id: "p13-vt23", src: "mas-101/vt23.mp4", desde: 0.2, en: 1270, dur: 58, zoom: [1, 1.03], reason: "Ante el árbol del salón: «¡Feliz Navidad para todos!» (0,48-2,0 s)" },
    { id: "p14-dr01", src: "mas-101/dr01.mp4", desde: 3.4 * DJI, en: 1328, dur: 130, zoom: [1, 1], reason: "La despedida sin palabras: el grupo entero se junta en la baranda y saluda al dron, que se aleja. Sigue 12 f bajo el papel que sube (solo imagen)" },
  ],
  voces: [
    { id: "voz-noticias", src: "mas-101/hz22.wav", desde: 0.4, en: 0, dur: 107, reason: "«Hola, en últimas noticias: un lugar maravilloso»" },
    { id: "voz-bienvenidos", src: "mas-101/vt21.wav", desde: 0.07, en: 107, dur: 103, reason: "«¡Bienvenidos…!», gritado al salir corriendo" },
    { id: "voz-club", src: "mas-101/vt29.wav", desde: 31.1, en: 210, dur: 195, reason: "«…el club de hablar y de resolver problemas»" },
    { id: "voz-mascota", src: "mas-101/vt18.wav", desde: 26.3, en: 405, dur: 183, reason: "La pregunta de la mascota" },
    { id: "voz-conejo-ave", src: "mas-101/vt18.wav", desde: 34.25, en: 588, dur: 111, entra: 2, reason: "«¡Un conejo!» y la pregunta del ave, de corrido como la imagen" },
    { id: "voz-colibri", src: "mas-101/vt18.wav", desde: 44.25, en: 699, dur: 66, entra: 2, reason: "«Un colibrí»" },
    { id: "voz-regalo-p", src: "mas-101/vt03.wav", desde: 0, en: 765, dur: 96, reason: "La pregunta del regalo (pico −3 dB: 11 dB por encima de la respuesta)" },
    { id: "voz-regalo-r", src: "mas-101/vt03.wav", desde: 3.2, en: 861, dur: 31, reason: "«La Navidad.», con su ganancia" },
    { id: "voz-cualidad", src: "mas-101/hz04.wav", desde: 0, en: 892, dur: 60, reason: "«¿Cuál es la cualidad más bonita de Dios?» (pico −3 dB)" },
    { id: "voz-palabra", src: "mas-101/hz04.wav", desde: 2.0, en: 952, dur: 46, reason: "«La palabra de Dios.», en la misma toma, con su ganancia (pico −10 dB)" },
    { id: "voz-bondadoso", src: "mas-101/hz04.wav", desde: 7.55, en: 998, dur: 42, reason: "«¡Bondadoso!»" },
    { id: "voz-inmortal", src: "mas-101/hz04.wav", desde: 11.0, en: 1040, dur: 66, reason: "«¡Un Dios inmortal!»" },
    { id: "voz-oportunidades", src: "mas-101/hz07.wav", desde: 0.12, en: 1106, dur: 83, sale: 2, reason: "«Y para mí es un Dios de oportunidades»: acaba en el valle de 2,88 s, antes de «porque…»" },
    { id: "voz-lema", src: "mas-101/hz09.wav", desde: 0.75, en: 1189, dur: 81, reason: "El lema a coro" },
    { id: "voz-feliz", src: "mas-101/vt23.wav", desde: 0.2, en: 1270, dur: 58, reason: "«¡Feliz Navidad para todos!»" },
  ],
  arriba: [
    { id: "a-regalo", en: 765, sale: 892, texto: "«¿Qué es lo más bonito de recibir un regalo?»", reason: "La dice en f767-f849; en VT03 las caras van a media altura" },
    { id: "a-cualidad", en: 892, sale: 1189, texto: "«¿Cuál es la cualidad más bonita de Dios?»", reason: "La dice en f896-f951 y se queda como título mientras responden (HZ04 y la respuesta de la que pregunta, HZ07)" },
  ],
  abajo: [
    { id: "b-noticias", en: 0, sale: 107, texto: "«Hola, en últimas noticias: un lugar *maravilloso*.»", marcas: [{ tipo: "subrayado", en: 80 }], reason: "El gancho, entero en f0 (la miniatura). maravilloso (f78-f107)" },
    { id: "b-bienvenidos", en: 172, sale: 210, texto: "«¡*Bienvenidos*!»", marcas: [{ tipo: "subrayado", en: 182 }], reason: "f177-f207. Lo que gritan después no se entiende (whisper: «nuestro canal»; el cartel dice «la Nuestra»): solo va lo seguro" },
    { id: "b-club", en: 216, sale: 405, texto: "«Aquí es el club de hablar y de *resolver problemas*.»", marcas: [{ tipo: "subrayado", en: 323 }], reason: "aquí (f217) … resolver (f323) … problemas (f366)" },
    { id: "b-mascota", en: 410, sale: 534, texto: "«Si tendrías una *mascota*, ¿cuál tendrías?»", marcas: [{ tipo: "subrayado", en: 465 }], reason: "Si (f410) … mascota (f462) … tendrías (f525)" },
    { id: "b-animal", en: 534, sale: 588, texto: "«De perro, gato, cualquier *animal*.»", marcas: [{ tipo: "subrayado", en: 573 }], reason: "De (f538) … animal (f573)" },
    { id: "b-conejo", en: 590, sale: 644, texto: "«¡Un *conejo*!»", marcas: [{ tipo: "subrayado", en: 600 }], reason: "f591-f632 (y su «eh» hasta f640)" },
    { id: "b-ave", en: 646, sale: 699, texto: "«Si tendrías un *ave*, ¿cuál tendrías?»", marcas: [{ tipo: "subrayado", en: 668 }], reason: "f648-f693" },
    { id: "b-colibri", en: 702, sale: 765, texto: "«Un *colibrí*.»", marcas: [{ tipo: "subrayado", en: 716 }], reason: "f702-f758. POR CONFIRMAR de oído: whisper oye «Un cole y un re» (el mapa del 097: «Un coley brín»)" },
    { id: "b-navidad", en: 864, sale: 892, texto: "«La *Navidad*.»", marcas: [{ tipo: "subrayado", en: 869 }], reason: "f866-f885" },
    { id: "b-palabra", en: 954, sale: 998, texto: "«La palabra de *Dios*.»", marcas: [{ tipo: "subrayado", en: 978 }], reason: "La (f954) … Dios (f978)" },
    { id: "b-bondadoso", en: 1003, sale: 1040, texto: "«¡*Bondadoso*!»", marcas: [{ tipo: "subrayado", en: 1010 }], reason: "f1004-f1033" },
    { id: "b-inmortal", en: 1045, sale: 1106, texto: "«¡Un Dios *inmortal*!»", marcas: [{ tipo: "subrayado", en: 1070 }], reason: "Un (f1040) … inmortal (f1067)" },
    { id: "b-oportunidades", en: 1108, sale: 1189, texto: "«Y para mí es un Dios de *oportunidades*.»", marcas: [{ tipo: "subrayado", en: 1163 }], reason: "Y (f1108) … oportunidades (f1163-f1188)" },
    { id: "b-lema", en: 1195, sale: 1270, texto: "«¡Misericordia, *Amor* y Servicio!»", marcas: [{ tipo: "subrayado", en: 1220 }], reason: "a coro, f1190-f1263; Amor (f1219). POR CONFIRMAR de oído: «Amor y Servicio» se oye claro, el arranque «Misericordia» no (097 §6)" },
    { id: "b-feliz", en: 1278, sale: 1328, texto: "«¡Feliz *Navidad* para todos!»", marcas: [{ tipo: "subrayado", en: 1288 }], reason: "Feliz (f1270) … Navidad (f1286) … todos (f1311-f1324)" },
  ],
  musica: {
    titulo: "Yeshua (Versión Piano)",
    src: "mas-101/musica-yeshua.wav",
    desde: 276.79,
    lufs: -13.7,
    reason: "«Yeshua» (Versión Piano; la del 097), la que sobró al repartir las pistas 16:9 (pedido del usuario): un tramo que el 097 no usó (1,3-131 s), desde 276,79 s para que su golpe de 324,99 s (15,7 dB) caiga en f1446, cuando sube el papel. La respuesta más honda (HZ07, f1106-1189) cae en el tramo más tranquilo (−15,5 a −16,7 LUFS a corto plazo)",
  },
};

export const audio105 = audioDeHistoria(HISTORIA_105, VOCES_105);

/** El `Corte[]` suelto, para la puerta genérica del montaje (`revisar-metraje.mjs` busca un export que lo sea). */
export const metraje105 = HISTORIA_105.cortes;
