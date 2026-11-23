/**
 * HISTORIA 104 — «Mi hogar» (9:16, MAS Estrellitas 2026). Una niña graba y narra un recorrido por la casa (VT33):
 * «Bienvenidos a la Nuestra. Este es mi hogar, donde yo vivo. Gracias a Papito Dios. Y yo hoy quiero agradecerles a todos
 * por tener una gran Navidad… Este es el pasillo de la casa, donde está nuestro perrito… Gracias por acompañarme en este
 * viaje.» Su voz manda; la imagen de su móvil va movida y a oscuras, así que las primeras frases van sobre lo mejor del
 * día (la finca desde el dron, el cielo, el árbol, los regalos) y las dos últimas, sobre SU imagen (el perro y su selfi).
 * Plan: `proyectos/104/artefactos/`.
 *
 * DELICADO (097 §7): «la Nuestra» (nombre de la casa) y «donde yo vivo» dicen que vive allí: MAS tiene que aprobarlo
 * antes de publicar. Lo que se ve de su recorrido no enseña camas, ni el espejo, ni la matrícula (4,8-6,4 s).
 */
import type { Historia } from "../101/historia";
import { audioDeHistoria } from "../101/historia";
import { VOCES_104 } from "./voces-104";

const DJI = 1000 / 1001;

export const HISTORIA_104: Historia = {
  numero: "104",
  composicion: "Historia104",
  titulo: "Mi hogar",
  duracion: 519 + 180,
  cierre: 519,
  cortes: [
    { id: "p01-dr06", src: "mas-101/dr06.mp4", desde: 2.5 * DJI, en: 0, dur: 130, zoom: [1, 1.07], reason: "«Bienvenidos a la Nuestra. Este es mi hogar…»: la finca entera desde el cielo, en órbita lenta, sin una cara; la casa abajo" },
    { id: "p02-ft43", tipo: "foto", src: "mas-101/ft43.jpg", en: 130, dur: 62, zoom: [1, 1.06], reason: "«Gracias a Papito Dios.»: de espaldas, una niña señala el cielo sobre las montañas (sin cara)" },
    { id: "p03-vt22", src: "mas-101/vt22.mp4", desde: 12.0, en: 192, dur: 72, zoom: [1, 1.05], reason: "«Y yo hoy quiero agradecerles a todos…»: el árbol del salón con los regalos y el ventanal a las montañas (12,0-14,4 s, sin nadie)" },
    { id: "p04-hz28", src: "mas-101/hz28.mp4", desde: 0.4, en: 264, dur: 60, zoom: [1, 1.05], reason: "«…por tener una gran Navidad.»: tres niñas levantan sus regalos junto al árbol" },
    { id: "p05-vt33", src: "mas-101/vt33.mp4", desde: 48.3, en: 324, dur: 117, zoom: [1, 1.04], reason: "SU imagen, en sincronía con su voz: «Este es el pasillo de la casa, donde está nuestro perrito.» mientras el golden viene hacia ella (48,3-52,2 s)" },
    { id: "p06-vt33", src: "mas-101/vt33.mp4", desde: 64.38, en: 441, dur: 90, zoom: [1, 1.03], reason: "Y se vuelve hacia sí misma: «Gracias por acompañarme en este viaje.» (64,9-66,92 s), hasta el final de la toma (67,38): entra 0,37 s antes que en la rev. 1 para que la imagen siga 12 f bajo el papel que sube; su voz va aparte (después del «¡Chao!» de 63,4-64,6)" },
  ],
  voces: [
    { id: "voz-bienvenidos", src: "mas-101/vt33.wav", desde: 0.45, en: 0, dur: 118, reason: "«Bienvenidos a la Nuestra. Este es mi hogar, donde yo vivo,» (0,6-4,24 s): acaba en el hueco de 4,24-4,44, ANTES de «donde ya…» (4,48, sin entender)" },
    { id: "voz-papito", src: "mas-101/vt33.wav", desde: 5.95, en: 133, dur: 45, reason: "«Gracias a Papito Dios.» (6,1-7,2 s)" },
    { id: "voz-agradecer", src: "mas-101/vt33.wav", desde: 8.1, en: 192, dur: 132, reason: "«Y yo hoy quiero agradecerles a todos por tener una gran Navidad.» (8,2-12,4 s)" },
    { id: "voz-perrito", src: "mas-101/vt33.wav", desde: 48.3, en: 324, dur: 117, reason: "«Este es el pasillo de la casa, donde está nuestro perrito.» (48,4-52,1 s), con su imagen" },
    { id: "voz-viaje", src: "mas-101/vt33.wav", desde: 64.38 + 8 / 30, en: 449, dur: 70, reason: "«Gracias por acompañarme en este viaje.» (64,9-66,92 s), en sincronía con su imagen (f = 441 + (s − 64,38) × 30); empieza en 64,65, después del «¡Chao!» (63,4-64,6)" },
  ],
  arriba: [
    { id: "a-bienvenidos", en: 0, sale: 519, texto: "«¡Bienvenidos a la Nuestra!»", reason: "Sus primeras palabras (f5-f60), en f0 ya (gancho) y como título hasta el papel. «la Nuestra»: POR CONFIRMAR con MAS" },
  ],
  abajo: [
    { id: "b1", en: 63, sale: 130, texto: "«Este es mi *hogar*, donde yo vivo.»", marcas: [{ tipo: "subrayado", en: 80 }], reason: "este (f65) … vivo (f112-118)" },
    { id: "b2", en: 134, sale: 190, texto: "«Gracias a Papito *Dios*.»", marcas: [{ tipo: "subrayado", en: 162 }], reason: "Gracias (f136) … Dios (f163-168)" },
    { id: "b3", en: 194, sale: 276, texto: "«Y yo hoy quiero agradecerles a *todos*…»", marcas: [{ tipo: "subrayado", en: 261 }], reason: "y yo (f194) … todos (f260). «agradecerles»: POR CONFIRMAR de oído (whisper: «agradecirlos»)" },
    { id: "b4", en: 276, sale: 324, texto: "«…por tener una gran *Navidad*.»", marcas: [{ tipo: "subrayado", en: 302 }], reason: "por (f277) … Navidad (≈ f299-312)" },
    { id: "b5", en: 326, sale: 441, texto: "«Este es el pasillo de la casa, donde está nuestro *perrito*.»", marcas: [{ tipo: "subrayado", en: 423 }], reason: "Este (f326) … perrito (f423-436)" },
    { id: "b6", en: 456, sale: 519, texto: "«Gracias por acompañarme en este *viaje*.»", marcas: [{ tipo: "subrayado", en: 502 }], reason: "Gracias (≈ f458) … viaje (≈ f502-518)" },
  ],
  musica: {
    titulo: "A Tus Pies",
    src: "mas-101/musica-a-tus-pies.wav",
    desde: 89.775,
    lufs: -20.2,
    reason: "«A Tus Pies» (instrumental de adoración; la del 099), rev. 2 (pedido del usuario: las pistas de los vídeos 16:9): un tramo que el 099 no usó (0,42-60,92 s), desde 89,78 s para que su golpe de 107,075 s caiga en f519, cuando sube el papel (y el de 93,23 s, en «Este es mi hogar»)",
  },
};

export const audio104 = audioDeHistoria(HISTORIA_104, VOCES_104);

/** El `Corte[]` suelto, para la puerta genérica del montaje (`revisar-metraje.mjs` busca un export que lo sea). */
export const metraje104 = HISTORIA_104.cortes;
