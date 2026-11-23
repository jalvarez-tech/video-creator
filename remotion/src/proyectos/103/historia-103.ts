/**
 * HISTORIA 103 — «Lo que quiero en Navidad» (9:16, MAS Estrellitas 2026). En la escalera, una tras otra, piden una
 * radio, un conejito, un bafle… y una pide «a Cristo en mi vida… y una Biblia muy grande», otra «una pista de carreras y
 * a Dios en mi vida», y todas gritan «¡Dios es bueno!». Después, el cierre en papel. Plan: `proyectos/103/artefactos/`.
 *
 * Los horizontales van en su franja 9:16 del 4K (la que habla al centro; `proyectos/101/normalizar.mjs`). El nombre de
 * HZ18 (su nombre, 0,9-4,0 s) queda fuera: su frase entra en «…quiero una pista».
 */
import type { Historia } from "../101/historia";
import { audioDeHistoria } from "../101/historia";
import { VOCES_103 } from "./voces-103";

export const HISTORIA_103: Historia = {
  numero: "103",
  composicion: "Historia103",
  titulo: "Lo que quiero en Navidad",
  duracion: 586 + 180,
  cierre: 586,
  cortes: [
    { id: "p01-hz14", src: "mas-101/hz14.mp4", desde: 0.55, en: 0, dur: 60, zoom: [1.02, 1.06], reason: "«Yo quiero de Navidad una radio.» (0,7-2,5 s), con el perro delante" },
    { id: "p02-hz15", src: "mas-101/hz15.mp4", desde: 0.45, en: 60, dur: 81, zoom: [1, 1.05], reason: "«Yo lo que quiero pedir de Navidad es un conejito.» (0,6-3,1 s)" },
    { id: "p03-hz16", src: "mas-101/hz16.mp4", desde: 0.55, en: 141, dur: 54, zoom: [1.02, 1.06], reason: "«¡Yo quiero un bafle!» (0,7-2,2 s): el último deseo de cosas, corto, antes del giro" },
    { id: "p04-hz17", src: "mas-101/hz17.mp4", desde: 0.55, en: 195, dur: 213, zoom: [1, 1.08], reason: "EL GIRO: «Yo lo que quiero en Navidad es a Cristo en mi vida… y también quiero una Biblia muy grande.» (0,8-7,4 s), entera" },
    { id: "p05-hz18", src: "mas-101/hz18.mp4", desde: 4.85, en: 408, dur: 91, zoom: [1, 1.05], reason: "«…quiero una pista de carreras y a Dios en mi vida.» (5,0-7,84 s): entra después de su nombre (0,9-4,0) y sale en el hueco de 7,88 s, antes del «¡Chao!» (7,96)" },
    { id: "p06-hz19", src: "mas-101/hz19.mp4", desde: 0.4, en: 499, dur: 99, zoom: [1, 1.04], reason: "Todas a coro: «¡Dios es bueno!» (0,52-3,16 s: cuatro golpes, Dios-es-bue-no; sale en 3,3, antes de la segunda frase, que entra en 3,36). La imagen sigue 12 f bajo el papel que sube (su voz no). Solo la primera frase: la segunda («¿Aleluya?», «¿A la lucha?») está sin oír" },
  ],
  voces: [
    { id: "voz-radio", src: "mas-101/hz14.wav", desde: 0.55, en: 0, dur: 60, reason: "«…una radio.»" },
    { id: "voz-conejito", src: "mas-101/hz15.wav", desde: 0.45, en: 60, dur: 81, reason: "«…un conejito.»" },
    { id: "voz-bafle", src: "mas-101/hz16.wav", desde: 0.55, en: 141, dur: 54, reason: "«¡Yo quiero un bafle!»" },
    { id: "voz-cristo", src: "mas-101/hz17.wav", desde: 0.55, en: 195, dur: 213, reason: "«…a Cristo en mi vida… y una Biblia muy grande.»" },
    { id: "voz-pista", src: "mas-101/hz18.wav", desde: 4.85, en: 408, dur: 91, sale: 2, reason: "«…una pista de carreras y a Dios en mi vida.» (hasta 7,88 s: el «¡Chao!» entra en 7,96)" },
    { id: "voz-bueno", src: "mas-101/hz19.wav", desde: 0.4, en: 499, dur: 87, sale: 2, reason: "«¡Dios es bueno!» a coro (0,52-3,16 s); whisper oye detrás «¡A la lucha!», pero en 0,4-3,3 la energía da UNA frase de cuatro golpes: es la segunda (3,36-5,5), que queda fuera" },
  ],
  arriba: [
    { id: "a-navidad", en: 0, sale: 60, texto: "¿Qué quieres para esta Navidad?", piel: "indigo", reason: "La pregunta de MAS (índigo, sin comillas: no la dice nadie en el vídeo): el gancho de f0, solo en el primer plano. En los de la escalera (contrapicado) las caras van arriba y la taparía" },
  ],
  abajo: [
    { id: "b1", en: 3, sale: 60, texto: "«Yo quiero de Navidad una *radio*.»", marcas: [{ tipo: "subrayado", en: 47 }], reason: "Yo (f3) … radio (f46). «de»: la pasada 2 no lo oye" },
    { id: "b2", en: 62, sale: 141, texto: "«Yo lo que quiero pedir de Navidad es un *conejito*.»", marcas: [{ tipo: "subrayado", en: 121 }], reason: "Yo (f64) … conejito (f120)" },
    { id: "b3", en: 146, sale: 195, texto: "«¡Yo quiero un *bafle*!»", marcas: [{ tipo: "subrayado", en: 171 }], reason: "Yo (f146) … bafle (f170)" },
    { id: "b4", en: 200, sale: 312, texto: "«Yo lo que quiero en Navidad es a *Cristo* en mi vida…»", marcas: [{ tipo: "subrayado", en: 270 }], reason: "Yo (f200) … vida (f300)" },
    { id: "b5", en: 314, sale: 408, texto: "«…y también quiero una *Biblia* muy grande.»", marcas: [{ tipo: "subrayado", en: 368 }], reason: "y también (f315) … grande (f391)" },
    { id: "b6", en: 411, sale: 499, texto: "«…quiero una pista de carreras y a *Dios* en mi vida.»", marcas: [{ tipo: "subrayado", en: 469 }], reason: "quiero (f411) … vida (f488). «carreras» o «carros»: POR CONFIRMAR de oído" },
    { id: "b7", en: 501, sale: 586, texto: "«¡Dios es *bueno*!»", marcas: [{ tipo: "subrayado", en: 527 }], reason: "a coro: Dios (f503) … bueno (f525)" },
  ],
  musica: {
    titulo: "Lo harás otra vez",
    src: "mas-101/musica-otra-vez.wav",
    desde: 319.948,
    lufs: -10.7,
    // La ruptura (−25,8 LUFS) +8 dB y la subida (−15,6) +3, igualadas a medias contra el pleno (−10,7): el arco se
    // oye sin que el pleno tape a nadie (la receta del 100). Las rampas, dentro de cada golpe.
    partes: [[0, 8], [244, 8], [248, 3], [495, 3], [499, 0]],
    reason: "«Lo harás otra vez» (Elevation Worship, pista; la del 100), rev. 2 (pedido del usuario: las pistas de los vídeos 16:9): la ruptura bajo la lista de deseos, la SUBIDA (golpe de 22 dB en 328,207 s) en f248, justo antes de «…es a Cristo en mi vida», y el PLENO (336,581 s) en f499, con «¡Dios es bueno!». Es el mismo arco que el 100 usa para sus deseos: aquí lo lleva el giro",
  },
};

export const audio103 = audioDeHistoria(HISTORIA_103, VOCES_103);

/** El `Corte[]` suelto, para la puerta genérica del montaje (`revisar-metraje.mjs` busca un export que lo sea). */
export const metraje103 = HISTORIA_103.cortes;
