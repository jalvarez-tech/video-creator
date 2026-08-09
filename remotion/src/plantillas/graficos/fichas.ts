/**
 * CATÁLOGO de la biblioteca de gráficos — la fuente de verdad de "qué existe ya".
 *
 * Por qué existe: una biblioteca que no se ve, no se usa. Sin escaparate, dentro
 * de tres proyectos volverás a escribir un contador desde cero porque no
 * recordabas que había uno. Este archivo se consume de dos formas, y las dos
 * salen de aquí (nunca se escriben a mano en dos sitios):
 *
 *   1. La composición `Catalogo` (Catalogo.tsx) → un contact sheet VIVO en el
 *      Studio: cada gráfico animándose de verdad, con su nombre y su ficha.
 *      Se navega arrastrando la cabeza lectora.
 *   2. `node manuales/motion-graphics/scripts/generar-catalogo.mjs` → regenera
 *      manuales/motion-graphics/catalogo-graficos.md para leerlo fuera del Studio.
 *
 * Regla: añadir un gráfico a la biblioteca = añadir su ficha aquí. Si no está
 * aquí, para el sistema no existe.
 */

export type FamiliaGrafico = "texto" | "entrada" | "fondo" | "dato" | "trazo" | "particula" | "3d" | "efecto";

export type FichaGrafico = {
  id: string;
  nombre: string;
  familia: FamiliaGrafico;
  archivo: string;
  /** Qué es, en una frase. */
  que: string;
  /** Cuándo usarlo — y, cuando importa, cuándo NO. */
  cuando: string;
  /** Variante sugerida de sound/cues.ts (la decisión sonora sigue siendo del skill). */
  sonido?: string;
};

export const CATALOGO: FichaGrafico[] = [
  // ── Estructura y entradas ───────────────────────────────────────────────────
  {
    id: "Escena",
    nombre: "Escena",
    familia: "entrada",
    archivo: "Entradas.tsx",
    que: "Ventana temporal (Sequence) que da frames LOCALES a sus hijos.",
    cuando: "Siempre que un bloque tenga principio y fin. Es lo que permite mover una escena entera cambiando un número.",
  },
  {
    id: "Aparece",
    nombre: "Aparece",
    familia: "entrada",
    archivo: "Entradas.tsx",
    que: "Entrada estándar: muelle + rampa de opacidad + desenfoque opcional.",
    cuando: "El gesto por defecto. `desenfoque` solo en el hero: hace que el texto 'llegue' en vez de 'aparecer'.",
    sonido: "whoosh light / pop",
  },
  {
    id: "Barrido",
    nombre: "Barrido",
    familia: "entrada",
    archivo: "Entradas.tsx",
    que: "Entrada por recorte duro de izquierda a derecha, con barra de color en el borde.",
    cuando: "Piezas mecánicas y secas (ley de movimiento del 003). Alternativa al muelle cuando NO quieres materia blanda.",
    sonido: "swoosh / click ui",
  },
  {
    id: "Latido",
    nombre: "Latido",
    familia: "entrada",
    archivo: "Entradas.tsx",
    que: "Oscilación de escala ±2 % mientras un dato se sostiene en pantalla.",
    cuando: "Para que un elemento sostenido no se congele. Amplitudes mayores marean.",
  },
  {
    id: "Ranura",
    nombre: "Ranura",
    familia: "entrada",
    archivo: "Entradas.tsx",
    que: "Posiciona un bloque en una banda horizontal, centrado.",
    cuando: "Encuadre de gráficos sobre el avatar. R08: banda alta o banda de subtítulos, nunca sobre la cara.",
  },

  // ── Tipografía ──────────────────────────────────────────────────────────────
  {
    id: "Kicker",
    nombre: "Kicker",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "Antetítulo en versalitas con tracking amplio.",
    cuando: "Dar contexto o nombrar la sección. Nunca lleva el mensaje.",
  },
  {
    id: "Titular",
    nombre: "Titular",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "El mensaje de la escena.",
    cuando: "Uno por escena. Dos titulares = ningún titular.",
    sonido: "impact deep (en la palabra clave)",
  },
  {
    id: "Cifra",
    nombre: "Cifra",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "El dato como protagonista, con tabular-nums y halo del propio color.",
    cuando: "Cuando el número ES el argumento. Con fondo claro, baja el resplandor a 0.",
    sonido: "data / money",
  },
  {
    id: "Etiqueta",
    nombre: "Etiqueta",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "Frase de apoyo que explica la cifra o remata el titular.",
    cuando: "Siempre por debajo del hero en tamaño; si compite, ya hay dos protagonistas.",
  },
  {
    id: "Sello",
    nombre: "Sello",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "Tarjeta traslúcida para agrupar contenido sobre vídeo.",
    cuando: "Sobre el avatar, cuando el texto necesita fondo. Traslúcida a propósito: una caja opaca se lee como parche.",
  },
  {
    id: "Chip",
    nombre: "Chip",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "Píldora de estado o categoría.",
    cuando: "Etiquetar (antes/después, incluido/excluido). El color es información, no decoración.",
  },
  {
    id: "Tachado",
    nombre: "Tachado",
    familia: "texto",
    archivo: "Texto.tsx",
    que: "Texto con línea que se dibuja encima.",
    cuando: "El 'esto no' de una comparación. Que se dibuje (no que aparezca) es lo que lo convierte en gesto.",
    sonido: "scribble",
  },

  // ── Fondos y atmósfera ──────────────────────────────────────────────────────
  {
    id: "Scrim",
    nombre: "Scrim",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Degradado que oscurece un extremo para que el texto se lea sobre el vídeo.",
    cuando: "Obligatorio con texto en la banda de subtítulos. Entra en 3-4 f y sale de golpe CON el texto.",
  },
  {
    id: "Vineta",
    nombre: "Vineta",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Oscurecimiento de bordes que empuja el ojo al centro.",
    cuando: "Casi siempre, en tomas de gráfico. Se nota al quitarla, no al ponerla.",
  },
  {
    id: "Rejilla",
    nombre: "Rejilla",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Trama técnica tipo blueprint hecha con gradientes (no con divs).",
    cuando: "Sensación de sistema/plano/dato. A 0.04 es textura; a 0.15 ya roba atención.",
  },
  {
    id: "Puntos",
    nombre: "Puntos",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Trama de puntos: la variante suave de la rejilla.",
    cuando: "Cuando la rejilla se ve demasiado técnica para el tono de la pieza.",
  },
  {
    id: "Resplandor",
    nombre: "Resplandor",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Foco de luz de color: 'la sala' donde ocurre la escena.",
    cuando: "Continuidad entre tomas de gráfico: misma sala, distinto ángulo (mover cx/cy). Es la única capa que puede respirar sola.",
  },
  {
    id: "Halo",
    nombre: "Halo",
    familia: "fondo",
    archivo: "Fondos.tsx",
    que: "Luz propia detrás de UN elemento (no de la pantalla).",
    cuando: "Logos, cifras y nodos que deben emitir luz en vez de estar pegados encima.",
  },

  // ── Datos ───────────────────────────────────────────────────────────────────
  {
    id: "Contador",
    nombre: "Contador",
    familia: "dato",
    archivo: "Datos.tsx",
    que: "Número que se forma de A a B con outCubic y golpe opcional al aterrizar.",
    cuando: "Siempre que la MAGNITUD sea el mensaje: el ojo mide el recorrido, no el resultado.",
    sonido: "data (textura) + tick / chime al llegar",
  },
  {
    id: "BarraProgreso",
    nombre: "BarraProgreso",
    familia: "dato",
    archivo: "Datos.tsx",
    que: "Proporción o avance, con umbral opcional.",
    cuando: "Comparar una parte con el todo. Crece lineal: con easing mentiría sobre la velocidad del proceso.",
    sonido: "whoosh light + chime al llegar",
  },
  {
    id: "Barras",
    nombre: "Barras",
    familia: "dato",
    archivo: "Datos.tsx",
    que: "Gráfica de barras con crecimiento escalonado desde la base.",
    cuando: "Comparar 2-5 magnitudes. El ORDEN del array es una decisión narrativa: dirige en qué orden se comparan.",
    sonido: "data por barra",
  },
  {
    id: "ItemLista",
    nombre: "ItemLista",
    familia: "dato",
    archivo: "Datos.tsx",
    que: "Ítem con marca y stagger incorporado por índice.",
    cuando: "Listas de 3-5 puntos. El stagger va dentro: el ritmo entre ítems queda fijado por STAGGER.lista.",
    sonido: "pop por ítem (alterna variantIndex)",
  },
  {
    id: "Regla",
    nombre: "Regla",
    familia: "dato",
    archivo: "Datos.tsx",
    que: "Línea recta que se extiende mecánicamente.",
    cuando: "Subrayado limpio, separador o 'medida'. Para subrayado a mano, usa Subrayado (Trazo).",
  },

  // ── Trazo dibujado ──────────────────────────────────────────────────────────
  {
    id: "Trazo",
    nombre: "Trazo",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Dibuja cualquier path SVG con evolvePath; punta de flecha opcional orientada por la tangente.",
    cuando: "La primitiva de todo lo dibujado. Una línea que se dibuja se lee como alguien señalando.",
    sonido: "scribble",
  },
  {
    id: "Subrayado",
    nombre: "Subrayado",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Subrayado a mano alzada con ondulación determinista.",
    cuando: "Marcar LA palabra de la frase. Uno por escena: subrayar dos cosas es no subrayar.",
    sonido: "scribble",
  },
  {
    id: "Rodea",
    nombre: "Rodea",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Óvalo de rotulador alrededor de una palabra, con exceso al cerrar.",
    cuando: "Más enfático que el subrayado: 'esto de aquí'. Dale el tamaño de la palabra + margen.",
    sonido: "scribble / pen",
  },
  {
    id: "Flecha",
    nombre: "Flecha",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Flecha curva de A a B con la punta siguiendo el trazo.",
    cuando: "Relación causal. Curva = 'esto lleva a esto'; recta = 'de aquí a aquí'.",
    sonido: "swoosh",
  },
  {
    id: "Check",
    nombre: "Check",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Marca de confirmación dibujada en dos tiempos naturales.",
    cuando: "Cerrar una promesa o validar un ítem. El sonido va en el frame en que cierra.",
    sonido: "success / chime",
  },
  {
    id: "Aspa",
    nombre: "Aspa",
    familia: "trazo",
    archivo: "Trazo.tsx",
    que: "Dos trazos que se cruzan en secuencia.",
    cuando: "Descartar. En secuencia (no a la vez) para que se lea como gesto y no como icono.",
    sonido: "error / impact sharp",
  },

  // ── Partículas ──────────────────────────────────────────────────────────────
  {
    id: "Particulas",
    nombre: "Partículas",
    familia: "particula",
    archivo: "Particulas.tsx",
    que: "Sistema determinista con tres modos: estallido, ambiente y lluvia.",
    cuando: "Estallido en el CTA o el dato clave; ambiente como atmósfera; lluvia para 'cae'. 40-80 bastan: 500 tumban el render.",
    sonido: "sparkle (+ pop en el estallido)",
  },

  // ── 3D ──────────────────────────────────────────────────────────────────────
  {
    id: "Escena3D",
    nombre: "Escena3D",
    familia: "3d",
    archivo: "Tarjeta3D.tsx",
    que: "Contenedor con perspective + preserve-3d: la 'lente' de la escena.",
    cuando: "Envuelve TODO lo 3D. Perspectiva baja = gran angular; alta = teleobjetivo.",
  },
  {
    id: "Tarjeta3D",
    nombre: "Tarjeta3D",
    familia: "3d",
    archivo: "Tarjeta3D.tsx",
    que: "Tarjeta de dos caras que se voltea con SPRING.flip.",
    cuando: "'Esto es lo que crees' → giro → 'esto es lo que pasa'. Lineal se leería como PowerPoint.",
    sonido: "whip en el giro + impact al aterrizar",
  },
  {
    id: "Panel3D",
    nombre: "Panel3D",
    familia: "3d",
    archivo: "Tarjeta3D.tsx",
    que: "Panel que llega desde el fondo girado y se endereza, con inclinación residual.",
    cuando: "Presentar un dato con presencia física. El reposo de 3° evita que parezca una captura de pantalla.",
    sonido: "whoosh heavy + impact deep",
  },
  {
    id: "Capas3D",
    nombre: "Capas3D",
    familia: "3d",
    archivo: "Tarjeta3D.tsx",
    que: "Pila de capas separadas en Z con vaivén: paralaje real.",
    cuando: "Diagramas con 'grosor'. 4-6° de giro bastan; más se convierte en carrusel.",
  },

  // ── Efectos ─────────────────────────────────────────────────────────────────
  {
    id: "Glitch",
    nombre: "Glitch",
    familia: "efecto",
    archivo: "Glitch.tsx",
    que: "Corrupción de señal: canales RGB, troceado, temblor y scanlines, por ráfagas.",
    cuando: "Hook, logo o la palabra que rompe la expectativa. 0.3-0.6 s. Continuo cansa en 3 segundos.",
    sonido: "glitch (alterna variantIndex entre ráfagas)",
  },
  {
    id: "Scanlines",
    nombre: "Scanlines",
    familia: "efecto",
    archivo: "Glitch.tsx",
    que: "Trama de líneas de barrido con desplazamiento continuo.",
    cuando: "Textura de pantalla sobre una UI. A 0.5 de opacidad tapa el contenido.",
  },
  {
    id: "Aberracion",
    nombre: "Aberración",
    familia: "efecto",
    archivo: "Glitch.tsx",
    que: "Separación cromática constante y suave, sin troceado.",
    cuando: "El 'glitch de reposo' de un título. Si se nota conscientemente, es demasiado.",
  },
];

/** Familias en el orden en que se muestran en el catálogo y en la doc. */
export const FAMILIAS: { id: FamiliaGrafico; nombre: string }[] = [
  { id: "entrada", nombre: "Estructura y entradas" },
  { id: "texto", nombre: "Tipografía" },
  { id: "fondo", nombre: "Fondos y atmósfera" },
  { id: "dato", nombre: "Datos" },
  { id: "trazo", nombre: "Trazo dibujado" },
  { id: "particula", nombre: "Partículas" },
  { id: "3d", nombre: "3D" },
  { id: "efecto", nombre: "Efectos" },
];

export const porFamilia = (f: FamiliaGrafico): FichaGrafico[] => CATALOGO.filter((c) => c.familia === f);
