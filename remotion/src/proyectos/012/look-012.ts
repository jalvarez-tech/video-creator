import { MARCA_BASE, type Marca } from "../../motor/marca";

/**
 * El único color vivo de la pieza: VERDE ESMERALDA. Ver la tabla de abajo.
 *
 * Es `emerald 400` y no el 500 (`#10B981`), que es el verde «profesional» que
 * uno escribe por defecto, y la diferencia se decidió MIDIENDO contra los dos
 * fondos reales de la pieza —el negro de las pantallas y la banda de texto con
 * su velo ya aclarado (petición del cliente)—:
 *
 *   | verde              | sobre #08090C | sobre la banda aclarada |
 *   |--------------------|---------------|-------------------------|
 *   | emerald 500 #10B981|      7,85 : 1 |   **3,28 : 1** ← bajo AA |
 *   | emerald 400 #34D399|     10,36 : 1 |       4,33 : 1          |
 *   | jade      #00A86B  |      6,46 : 1 |   **2,70 : 1** ← peor   |
 *
 * Aclarar el velo y oscurecer el acento a la vez es lo que habría dejado el
 * texto de marca por debajo del mínimo legible sin que ningún validador dijera
 * nada: R09 mide anchos, no contraste.
 */
const VERDE = "#34D399";

/**
 * EL LOOK DEL 012 — y por qué NO vive en `src/marcas/`.
 *
 * Esto no es un canal: es el registro de UNA pieza. El cliente decidió que el
 * vídeo va **sin marca** (director §5b: es una decisión que se declara, no un
 * olvido). Es un mensaje personal a su red —«mándame un DM»—, no contenido de
 * Propiedades Luxur, así que `sello.texto` sigue en `null` y la composición
 * sale a propósito SIN watermark. Si algún día esta pieza fuera de un canal,
 * lo que cambia es el parámetro, no este archivo.
 *
 * DE DÓNDE SALEN LOS COLORES. Del evento al que dice que va: APEX se presenta
 * en negro, tipografía fina y un solo color vivo. La pieza toma ese registro
 * para que la promesa y la forma digan lo mismo (director §4, estilo «lujo»).
 *
 * Un color = una cosa (R15):
 *
 *   | color            | significa                         | dónde aparece          |
 *   |------------------|-----------------------------------|------------------------|
 *   | verde `#34D399`  | **el evento**: su nombre y su dato | «conexiones correctas», la fecha, APEX, los países, el DM |
 *   | blanco           | **su voz**: lo que él dice        | el resto de los titulares |
 *   | sin color        | contexto                          | kickers y apoyos       |
 *
 * No entra ningún cuarto color. `dato`, `logro` y `perdida` de la paleta del
 * dialecto quedan sin usar a propósito: aquí no hay nada que suba ni que baje.
 */
export const APEX_012: Marca = {
  ...MARCA_BASE,
  nombre: "012-apex",
  // Sin canal, sin sello. Ver la nota de arriba.
  sello: { texto: null },
  color: {
    ...MARCA_BASE.color,
    // El verde va SOBRE oscuro siempre (vídeo con velo o fondo negro), que es
    // donde tiene cuerpo: sobre el papel beige del canal editorial se apagaría.
    // Medido contra el fondo de las tomas de pantalla (#08090C): 10,36:1.
    acento: VERDE,
    acentoOscuro: VERDE,
    acentoChip: "#6EE7B7",
    // Negro de verdad para las tomas a pantalla completa: el registro del
    // evento vive de la low-key, y un gris se lee como «fondo por defecto».
    fondoOscuro: "#08090C",
  },
};
